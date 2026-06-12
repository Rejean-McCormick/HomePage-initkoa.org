#!/usr/bin/env node

/**
 * scripts/import-reading-md-to-db.mjs
 *
 * Imports Markdown files from content/reading-inbox into Supabase.
 *
 * Reads:
 *   Markdown files under content/reading-inbox
 *
 * Writes:
 *   documents
 *   document_topics
 *   document_chunks
 *   import_runs
 *   import_items
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional env:
 *   READING_IMPORT_DIR=content/reading-inbox
 *
 * Usage:
 *   node scripts/import-reading-md-to-db.mjs
 *   node scripts/import-reading-md-to-db.mjs --dry-run
 */

import { createHash } from "node:crypto";
import { promises as fs, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const ROOT_DIR = process.cwd();

loadEnvFile(path.join(ROOT_DIR, ".env.local"));
loadEnvFile(path.join(ROOT_DIR, ".env"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const IMPORT_DIR = process.env.READING_IMPORT_DIR || "content/reading-inbox";

const DRY_RUN = process.argv.includes("--dry-run");
const HELP = process.argv.includes("--help") || process.argv.includes("-h");

const VALID_STATUSES = new Set(["draft", "published", "archived"]);
const VALID_SOURCES = new Set([
  "medium",
  "markdown",
  "pdf",
  "manual",
  "imported_html",
]);

const OPTIONAL_DOCUMENT_COLUMNS = new Set([
  "source_path",
  "content_hash",
  "word_count",
  "reading_time_minutes",
  "metadata",
]);

const OPTIONAL_CHUNK_COLUMNS = new Set([
  "heading",
  "token_estimate",
  "metadata",
]);

if (HELP) {
  printHelp();
  process.exit(0);
}

assertEnv();

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

await main();

async function main() {
  const absoluteImportDir = path.resolve(ROOT_DIR, IMPORT_DIR);

  await fs.mkdir(absoluteImportDir, { recursive: true });

  const files = await findMarkdownFiles(absoluteImportDir);

  console.log(
    `Reading import directory: ${path.relative(ROOT_DIR, absoluteImportDir)}`,
  );
  console.log(`Markdown files found: ${files.length}`);

  if (DRY_RUN) {
    console.log("Mode: dry run. No database writes will be performed.");
  }

  if (files.length === 0) {
    console.log("No Markdown files found.");
    return;
  }

  const run = DRY_RUN
    ? null
    : await createImportRun({
        readCount: files.length,
        importDir: path.relative(ROOT_DIR, absoluteImportDir),
      });

  const counters = {
    read: files.length,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const absoluteFilePath of files) {
    const sourcePath = normalizePath(path.relative(ROOT_DIR, absoluteFilePath));

    try {
      const parsed = await buildDocumentFromMarkdownFile(absoluteFilePath);

      validateParsedDocument(parsed);

      if (DRY_RUN) {
        console.log(`DRY RUN: ${sourcePath}`);
        console.log(`  title: ${parsed.title}`);
        console.log(`  slug: ${parsed.slug}`);
        console.log(`  status: ${parsed.status}`);
        console.log(`  topics: ${parsed.topics.join(", ") || "(none)"}`);
        console.log(`  chunks: ${parsed.chunks.length}`);
        continue;
      }

      const result = await upsertDocument(parsed);

      if (result.action === "created") counters.created += 1;
      if (result.action === "updated") counters.updated += 1;
      if (result.action === "skipped") counters.skipped += 1;

      if (result.action !== "skipped") {
        await syncTopics(result.document.id, parsed.topics);
        await regenerateChunks(result.document.id, parsed.chunks);
      }

      await createImportItem({
        importRunId: run?.id,
        documentId: result.document.id,
        sourcePath,
        action: result.action,
        status: "success",
        title: result.document.title,
        slug: result.document.slug,
      });

      console.log(
        `${result.action.toUpperCase()}: ${sourcePath} → /reading/${result.document.slug}`,
      );
    } catch (error) {
      counters.failed += 1;

      await createImportItem({
        importRunId: run?.id,
        sourcePath,
        action: "failed",
        status: "error",
        errorMessage: error.message,
      });

      console.error(`FAILED: ${sourcePath}`);
      console.error(`  ${error.message}`);
    }
  }

  if (!DRY_RUN) {
    await finishImportRun(run?.id, counters);
  }

  console.log("");
  console.log("Import summary");
  console.log(`  read:    ${counters.read}`);
  console.log(`  created: ${counters.created}`);
  console.log(`  updated: ${counters.updated}`);
  console.log(`  skipped: ${counters.skipped}`);
  console.log(`  failed:  ${counters.failed}`);

  if (counters.failed > 0) {
    process.exitCode = 1;
  }
}

async function buildDocumentFromMarkdownFile(absoluteFilePath) {
  const raw = await fs.readFile(absoluteFilePath, "utf8");
  const sourcePath = normalizePath(path.relative(ROOT_DIR, absoluteFilePath));
  const sourceHash = sha256(raw);

  const { frontmatter, body } = parseFrontmatter(raw);

  const bodyMarkdown = body.trim();
  const bodyText = markdownToPlainText(bodyMarkdown);
  const firstHeading = extractFirstHeading(bodyMarkdown);

  const title =
    cleanString(frontmatter.title) ||
    firstHeading ||
    titleFromFilename(absoluteFilePath);

  const explicitSlug = cleanString(frontmatter.slug);
  const slug = slugify(explicitSlug || title);

  const description =
    cleanString(frontmatter.description) ||
    cleanString(frontmatter.summary) ||
    cleanString(frontmatter.excerpt) ||
    null;

  const author = cleanString(frontmatter.author) || null;
  const language = normalizeLanguage(frontmatter.language);
  const canonicalUrl = normalizeUrl(
    frontmatter.canonical_url ||
      frontmatter.canonicalUrl ||
      frontmatter.url,
  );

  const explicitStatus = cleanString(frontmatter.status);
  const status = normalizeStatus(explicitStatus || "draft");

  const publishedAt = normalizeDate(
    frontmatter.published_at ||
      frontmatter.publishedAt ||
      frontmatter.date ||
      frontmatter.created ||
      null,
  );

  const topics = normalizeTopics([
    ...toArray(frontmatter.topics),
    ...toArray(frontmatter.tags),
  ]);

  const wordCount = countWords(bodyText);
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

  const chunks = chunkMarkdown(bodyMarkdown);

  return {
    title,
    slug,
    description,
    bodyMarkdown,
    bodyText,
    source: "markdown",
    canonicalUrl,
    author,
    language,
    status,
    explicitStatus: Boolean(explicitStatus),
    publishedAt,
    sourcePath,
    contentHash: sha256(bodyMarkdown),
    sourceHash,
    topics,
    wordCount,
    readingTimeMinutes,
    frontmatter,
    chunks,
  };
}

function validateParsedDocument(document) {
  if (!document.title) {
    throw new Error("Missing title. Add frontmatter title or an H1 heading.");
  }

  if (!document.slug) {
    throw new Error(`Could not generate slug for "${document.title}".`);
  }

  if (!document.bodyMarkdown) {
    throw new Error(`Missing body_markdown for "${document.title}".`);
  }

  if (!document.bodyText) {
    throw new Error(`Missing body_text for "${document.title}".`);
  }

  if (!VALID_SOURCES.has(document.source)) {
    throw new Error(`Invalid source: ${document.source}`);
  }

  if (!VALID_STATUSES.has(document.status)) {
    throw new Error(`Invalid status: ${document.status}`);
  }

  if (document.canonicalUrl) {
    try {
      new URL(document.canonicalUrl);
    } catch {
      throw new Error(`Invalid canonical_url: ${document.canonicalUrl}`);
    }
  }
}

async function upsertDocument(parsed) {
  const existing = await findExistingDocument(parsed);

  if (existing?.metadata?.source_hash === parsed.sourceHash) {
    return {
      action: "skipped",
      document: existing,
    };
  }

  const slug =
    existing?.slug || (await resolveUniqueSlug(parsed.slug, parsed.sourceHash));

  const payload = compactObject({
    slug,
    title: parsed.title,
    description: parsed.description ?? existing?.description ?? null,
    body_markdown: parsed.bodyMarkdown,
    body_text: parsed.bodyText,
    source: "markdown",
    canonical_url: existing?.canonical_url || parsed.canonicalUrl,
    author: parsed.author ?? existing?.author ?? null,
    language: parsed.language,
    status: parsed.explicitStatus
      ? parsed.status
      : existing?.status || parsed.status,
    published_at: parsed.publishedAt ?? existing?.published_at ?? null,
    source_path: parsed.sourcePath,
    content_hash: parsed.contentHash,
    word_count: parsed.wordCount,
    reading_time_minutes: parsed.readingTimeMinutes,
    metadata: {
      ...(existing?.metadata || {}),
      importer: "markdown_drop",
      source_path: parsed.sourcePath,
      source_hash: parsed.sourceHash,
      imported_from: IMPORT_DIR,
      frontmatter: parsed.frontmatter,
      last_imported_at: new Date().toISOString(),
    },
  });

  if (existing) {
    const document = await writeDocumentWithColumnFallback({
      mode: "update",
      id: existing.id,
      payload,
    });

    return {
      action: "updated",
      document,
    };
  }

  const document = await writeDocumentWithColumnFallback({
    mode: "insert",
    payload,
  });

  return {
    action: "created",
    document,
  };
}

async function findExistingDocument(parsed) {
  const byCanonicalUrl = await selectOneDocument(
    "canonical_url",
    parsed.canonicalUrl,
  );
  if (byCanonicalUrl) return byCanonicalUrl;

  const bySourcePath = await selectOneDocument("source_path", parsed.sourcePath);
  if (bySourcePath) return bySourcePath;

  const byContentHash = await selectOneDocument(
    "content_hash",
    parsed.contentHash,
  );
  if (byContentHash) return byContentHash;

  const bySlug = await selectOneDocument("slug", parsed.slug);
  if (bySlug) return bySlug;

  return null;
}

async function selectOneDocument(column, value) {
  if (!value) return null;

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq(column, value)
    .limit(1)
    .maybeSingle();

  if (error) {
    if (isMissingColumnError(error)) {
      return null;
    }

    throw dbError(`Failed selecting document by ${column}`, error);
  }

  return data || null;
}

async function resolveUniqueSlug(baseSlug, stableHashInput) {
  const existing = await selectOneDocument("slug", baseSlug);

  if (!existing) {
    return baseSlug;
  }

  const shortHash = sha256(stableHashInput).slice(0, 8);
  const fallbackSlug = `${baseSlug}-${shortHash}`;

  const fallbackExisting = await selectOneDocument("slug", fallbackSlug);

  if (!fallbackExisting) {
    return fallbackSlug;
  }

  let index = 2;

  while (true) {
    const candidate = `${fallbackSlug}-${index}`;
    const candidateExisting = await selectOneDocument("slug", candidate);

    if (!candidateExisting) {
      return candidate;
    }

    index += 1;
  }
}

async function writeDocumentWithColumnFallback({ mode, id, payload }) {
  let safePayload = { ...payload };

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const query =
      mode === "update"
        ? supabase
            .from("documents")
            .update(safePayload)
            .eq("id", id)
            .select("*")
            .single()
        : supabase.from("documents").insert(safePayload).select("*").single();

    const { data, error } = await query;

    if (!error) {
      return data;
    }

    const missingColumn = extractMissingColumn(error);

    if (missingColumn && OPTIONAL_DOCUMENT_COLUMNS.has(missingColumn)) {
      delete safePayload[missingColumn];
      continue;
    }

    throw dbError(`Failed to ${mode} document`, error);
  }

  throw new Error("Failed to write document after removing optional columns.");
}

async function syncTopics(documentId, topics) {
  const normalizedTopics = Array.from(new Set(topics)).filter(Boolean);

  const { error: deleteError } = await supabase
    .from("document_topics")
    .delete()
    .eq("document_id", documentId);

  if (deleteError) {
    throw dbError("Failed deleting old document topics", deleteError);
  }

  if (!normalizedTopics.length) return;

  const rows = normalizedTopics.map((topic) => ({
    document_id: documentId,
    topic,
  }));

  const { error } = await supabase.from("document_topics").insert(rows);

  if (error) {
    throw dbError("Failed inserting document topics", error);
  }
}

async function regenerateChunks(documentId, chunks) {
  const { error: deleteError } = await supabase
    .from("document_chunks")
    .delete()
    .eq("document_id", documentId);

  if (deleteError) {
    throw dbError("Failed deleting old document chunks", deleteError);
  }

  if (!chunks.length) return;

  const rows = chunks.map((chunk, index) => ({
    document_id: documentId,
    chunk_index: index,
    heading: chunk.heading,
    content: chunk.content,
    token_estimate: estimateTokens(chunk.content),
    metadata: {
      source: "markdown",
      generated_by: "import-reading-md-to-db",
    },
  }));

  await insertChunksWithColumnFallback(rows);
}

async function insertChunksWithColumnFallback(rows) {
  let safeRows = rows.map((row) => ({ ...row }));

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const { error } = await supabase.from("document_chunks").insert(safeRows);

    if (!error) return;

    const missingColumn = extractMissingColumn(error);

    if (missingColumn && OPTIONAL_CHUNK_COLUMNS.has(missingColumn)) {
      safeRows = safeRows.map((row) => {
        const next = { ...row };
        delete next[missingColumn];
        return next;
      });
      continue;
    }

    throw dbError("Failed inserting document chunks", error);
  }

  throw new Error("Failed to insert chunks after removing optional columns.");
}

async function createImportRun({ readCount, importDir }) {
  const { data, error } = await supabase
    .from("import_runs")
    .insert({
      importer: "markdown_drop",
      source: "markdown",
      status: "running",
      read_count: readCount,
      metadata: {
        import_dir: importDir,
        started_by: "scripts/import-reading-md-to-db.mjs",
      },
    })
    .select("*")
    .single();

  if (error) {
    console.warn(`Warning: could not create import_runs row: ${error.message}`);
    return null;
  }

  return data;
}

async function finishImportRun(importRunId, counters) {
  if (!importRunId) return;

  const status =
    counters.failed === 0
      ? "success"
      : counters.created + counters.updated + counters.skipped > 0
        ? "partial_success"
        : "failed";

  const { error } = await supabase
    .from("import_runs")
    .update({
      status,
      finished_at: new Date().toISOString(),
      read_count: counters.read,
      created_count: counters.created,
      updated_count: counters.updated,
      skipped_count: counters.skipped,
      error_count: counters.failed,
    })
    .eq("id", importRunId);

  if (error) {
    console.warn(`Warning: could not update import_runs row: ${error.message}`);
  }
}

async function createImportItem({
  importRunId,
  documentId = null,
  sourcePath,
  action,
  status,
  title = null,
  slug = null,
  errorMessage = null,
}) {
  if (!importRunId) return;

  const { error } = await supabase.from("import_items").insert({
    import_run_id: importRunId,
    document_id: documentId,
    external_id: sourcePath,
    source_path: sourcePath,
    action,
    status,
    title,
    slug,
    error_message: errorMessage,
    metadata: {
      importer: "markdown_drop",
    },
  });

  if (error) {
    console.warn(
      `Warning: could not create import_items row for ${sourcePath}: ${error.message}`,
    );
  }
}

async function findMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDirectory(entry.name)) continue;
      files.push(...(await findMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && /\.mdx?$/i.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function shouldSkipDirectory(name) {
  return [".git", ".next", "node_modules", "dist", "build"].includes(name);
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, "");

  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) {
    return {
      frontmatter: {},
      body: normalized,
    };
  }

  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return {
      frontmatter: {},
      body: normalized,
    };
  }

  return {
    frontmatter: parseSimpleYaml(match[1]),
    body: normalized.slice(match[0].length),
  };
}

function parseSimpleYaml(yaml) {
  const result = {};
  const lines = yaml.split(/\r?\n/);

  let currentKey = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "  ");
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const listMatch = line.match(/^\s*-\s+(.+)$/);

    if (listMatch && currentKey) {
      if (!Array.isArray(result[currentKey])) {
        result[currentKey] = [];
      }

      result[currentKey].push(parseYamlValue(listMatch[1]));
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!keyMatch) continue;

    const [, key, value] = keyMatch;
    currentKey = key;

    if (value === "") {
      result[key] = [];
      continue;
    }

    result[key] = parseYamlValue(value);
  }

  return result;
}

function parseYamlValue(value) {
  const trimmed = value.trim();

  if (trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => parseYamlValue(item.trim()))
      .filter((item) => item !== "");
  }

  return trimmed;
}

function markdownToPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, (block) =>
      block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, ""),
    )
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\r?\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function chunkMarkdown(markdown) {
  const sections = splitMarkdownByHeadings(markdown);
  const chunks = [];

  for (const section of sections) {
    const text = markdownToPlainText(section.markdown);

    if (!text) continue;

    const parts = splitTextIntoWordChunks(text, 1200);

    for (const part of parts) {
      chunks.push({
        heading: section.heading,
        content: part,
      });
    }
  }

  if (chunks.length === 0) {
    const text = markdownToPlainText(markdown);

    if (text) {
      return splitTextIntoWordChunks(text, 1200).map((content) => ({
        heading: null,
        content,
      }));
    }
  }

  return chunks;
}

function splitMarkdownByHeadings(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];

  let currentHeading = null;
  let currentLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);

    if (
      headingMatch &&
      currentLines.some((existingLine) => existingLine.trim())
    ) {
      sections.push({
        heading: currentHeading,
        markdown: currentLines.join("\n"),
      });

      currentHeading = cleanHeading(headingMatch[2]);
      currentLines = [line];
      continue;
    }

    if (headingMatch && !currentHeading) {
      currentHeading = cleanHeading(headingMatch[2]);
    }

    currentLines.push(line);
  }

  if (currentLines.some((line) => line.trim())) {
    sections.push({
      heading: currentHeading,
      markdown: currentLines.join("\n"),
    });
  }

  return sections;
}

function splitTextIntoWordChunks(text, maxWords) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks = [];
  let current = [];
  let currentWordCount = 0;

  for (const paragraph of paragraphs) {
    const paragraphWordCount = countWords(paragraph);

    if (paragraphWordCount > maxWords) {
      if (current.length) {
        chunks.push(current.join("\n\n"));
        current = [];
        currentWordCount = 0;
      }

      const words = paragraph.split(/\s+/);

      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
      }

      continue;
    }

    if (currentWordCount + paragraphWordCount > maxWords && current.length) {
      chunks.push(current.join("\n\n"));
      current = [];
      currentWordCount = 0;
    }

    current.push(paragraph);
    currentWordCount += paragraphWordCount;
  }

  if (current.length) {
    chunks.push(current.join("\n\n"));
  }

  return chunks;
}

function extractFirstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? cleanHeading(match[1]) : null;
}

function cleanHeading(value) {
  return value.replace(/\s+#*$/, "").replace(/[`*_~]/g, "").trim();
}

function titleFromFilename(filePath) {
  const base = path.basename(filePath).replace(/\.mdx?$/i, "");

  return base
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value) {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || "untitled";
}

function normalizeTopics(values) {
  const topics = values
    .flatMap((value) => {
      if (Array.isArray(value)) return value;

      if (typeof value === "string") {
        return value.split(",");
      }

      return [];
    })
    .map((topic) =>
      String(topic)
        .trim()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .replace(/_{2,}/g, "_"),
    )
    .filter(Boolean);

  return [...new Set(topics)];
}

function normalizeStatus(value) {
  const status = cleanString(value)?.toLowerCase() || "draft";

  if (!VALID_STATUSES.has(status)) {
    throw new Error(
      `Invalid status "${value}". Use draft, published, or archived.`,
    );
  }

  return status;
}

function normalizeLanguage(value) {
  const language = cleanString(value)?.toLowerCase();

  if (!language) return "en";

  if (language.startsWith("fr")) return "fr";
  if (language.startsWith("en")) return "en";

  return language;
}

function normalizeDate(value) {
  const cleaned = cleanString(value);

  if (!cleaned) return null;

  const date = new Date(cleaned);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return date.toISOString();
}

function normalizeUrl(value) {
  const cleaned = cleanString(value);

  if (!cleaned) return null;

  const url = new URL(cleaned);
  url.hash = "";

  return url.toString();
}

function cleanString(value) {
  if (value === null || value === undefined) return null;

  const cleaned = String(value).trim();

  return cleaned || null;
}

function toArray(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function countWords(text) {
  const matches = String(text || "").trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

function estimateTokens(text) {
  return Math.ceil(countWords(text) * 1.33);
}

function sha256(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

function compactObject(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  );
}

function assertEnv() {
  const missing = [];

  if (!SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length) {
    throw new Error(`Missing required env variables: ${missing.join(", ")}`);
  }
}

function loadEnvFile(filePath) {
  try {
    const text = requireReadFileSync(filePath);

    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(
        /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,
      );

      if (!match) continue;

      const [, key, rawValue] = match;

      if (process.env[key] !== undefined) continue;

      process.env[key] = stripEnvQuotes(rawValue.trim());
    }
  } catch {
    // Missing .env files are fine.
  }
}

function requireReadFileSync(filePath) {
  return readFileSync(filePath, "utf8");
}

function stripEnvQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function extractMissingColumn(error) {
  const message = `${error?.message || ""} ${error?.details || ""} ${
    error?.hint || ""
  }`;

  const patterns = [
    /Could not find the '([^']+)' column/i,
    /column "([^"]+)" does not exist/i,
    /column ([a-zA-Z0-9_]+) does not exist/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function isMissingColumnError(error) {
  return Boolean(extractMissingColumn(error));
}

function dbError(context, error) {
  const message = [context, error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(": ");

  const wrapped = new Error(message);
  wrapped.cause = error;
  return wrapped;
}

function printHelp() {
  console.log(`
Import Markdown files into the Reading DB.

Usage:
  node scripts/import-reading-md-to-db.mjs
  node scripts/import-reading-md-to-db.mjs --dry-run

Env:
  NEXT_PUBLIC_SUPABASE_URL       Required
  SUPABASE_SERVICE_ROLE_KEY      Required
  READING_IMPORT_DIR             Optional, defaults to content/reading-inbox

Markdown frontmatter:
  ---
  title: "Document Title"
  description: "Short summary."
  date: "2026-05-01"
  author: "Author Name"
  language: "en"
  topics:
    - governance
    - knowledge
  status: "published"
  canonical_url: "https://example.com/original"
  ---

Default status for Markdown is draft unless frontmatter sets status.
`);
}