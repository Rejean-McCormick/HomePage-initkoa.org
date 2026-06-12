#!/usr/bin/env node

/**
 * scripts/validate-reading-import.mjs
 *
 * Validates the Markdown → Supabase Reading import.
 *
 * Checks:
 * - required environment variables
 * - Markdown source files in content/reading-inbox
 * - imported rows in documents
 * - document_topics
 * - document_chunks
 * - slug/status/source/body validity
 * - missing DB records for source Markdown files
 *
 * Usage:
 *   node scripts/validate-reading-import.mjs
 *   node scripts/validate-reading-import.mjs --strict
 *   node scripts/validate-reading-import.mjs --json
 *   node scripts/validate-reading-import.mjs --source=markdown
 *   node scripts/validate-reading-import.mjs --slug=my-document
 *   node scripts/validate-reading-import.mjs --dir=content/reading-inbox
 *   node scripts/validate-reading-import.mjs --skip-files
 *   node scripts/validate-reading-import.mjs --skip-db
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const VALID_SOURCES = new Set([
  "medium",
  "markdown",
  "pdf",
  "manual",
  "imported_html",
]);

const VALID_STATUSES = new Set(["draft", "published", "archived"]);

const SOURCE_LIKE_TOPICS = new Set([
  "medium",
  "medium_article",
  "markdown",
  "md",
  "pdf",
  "manual",
  "imported_html",
]);

const DEFAULT_IMPORT_DIR = "content/reading-inbox";
const PAGE_SIZE = 1000;

main().catch((error) => {
  console.error("\n[FAILED] Unexpected validator crash");
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});

async function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env");

  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const report = createReport(options);

  let markdownFiles = [];

  if (!options.skipFiles) {
    markdownFiles = await validateMarkdownInbox(options, report);
  }

  let dbDocuments = [];

  if (!options.skipDb) {
    const supabase = createSupabaseClient(report);
    if (supabase) {
      dbDocuments = await validateDatabaseImport(
        supabase,
        markdownFiles,
        options,
        report,
      );
    }
  }

  report.summary.markdownFiles = markdownFiles.length;
  report.summary.dbDocuments = dbDocuments.length;

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport(report);
  }

  const hasErrors = report.issues.some((issue) => issue.level === "error");
  const hasWarnings = report.issues.some((issue) => issue.level === "warning");

  if (hasErrors || (options.strict && hasWarnings)) {
    process.exit(1);
  }
}

function parseArgs(args) {
  const options = {
    source: "markdown",
    slug: null,
    dir: process.env.READING_IMPORT_DIR || DEFAULT_IMPORT_DIR,
    strict: false,
    json: false,
    skipFiles: false,
    skipDb: false,
    allSources: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--strict") options.strict = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--skip-files") options.skipFiles = true;
    else if (arg === "--skip-db") options.skipDb = true;
    else if (arg === "--all-sources") options.allSources = true;
    else if (arg.startsWith("--source=")) options.source = arg.slice(9).trim();
    else if (arg.startsWith("--slug=")) options.slug = arg.slice(7).trim();
    else if (arg.startsWith("--dir=")) options.dir = arg.slice(6).trim();
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
validate-reading-import.mjs

Usage:
  node scripts/validate-reading-import.mjs

Options:
  --strict        Treat warnings as failures
  --json          Print JSON report
  --source=NAME   Validate one source, default: markdown
  --all-sources   Validate all document sources
  --slug=SLUG     Validate one document by slug
  --dir=PATH      Markdown inbox path, default: content/reading-inbox
  --skip-files    Do not validate local Markdown files
  --skip-db       Do not validate Supabase rows
  --help          Show this message
`);
}

function createReport(options) {
  return {
    ok: true,
    options,
    summary: {
      markdownFiles: 0,
      dbDocuments: 0,
      topics: 0,
      chunks: 0,
      errors: 0,
      warnings: 0,
    },
    issues: [],
  };
}

function addIssue(report, level, code, message, context = {}) {
  report.issues.push({
    level,
    code,
    message,
    context,
  });

  if (level === "error") {
    report.ok = false;
    report.summary.errors += 1;
  } else if (level === "warning") {
    report.summary.warnings += 1;
  }
}

function loadEnvFile(filePath) {
  // Lightweight .env loader to avoid requiring dotenv.
  // Existing process.env values win.
  return fs
    .readFile(filePath, "utf8")
    .then((raw) => {
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) continue;

        const equalsIndex = trimmed.indexOf("=");
        if (equalsIndex === -1) continue;

        const key = trimmed.slice(0, equalsIndex).trim();
        let value = trimmed.slice(equalsIndex + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    })
    .catch(() => {});
}

function createSupabaseClient(report) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    addIssue(
      report,
      "error",
      "ENV_MISSING_SUPABASE_URL",
      "Missing NEXT_PUBLIC_SUPABASE_URL.",
    );
  }

  if (!serviceRoleKey) {
    addIssue(
      report,
      "error",
      "ENV_MISSING_SERVICE_ROLE",
      "Missing SUPABASE_SERVICE_ROLE_KEY. This script must run server-side only.",
    );
  }

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function validateMarkdownInbox(options, report) {
  const absoluteDir = path.resolve(options.dir);
  const files = await findMarkdownFiles(absoluteDir);

  if (files.length === 0) {
    addIssue(
      report,
      "warning",
      "NO_MARKDOWN_FILES",
      `No Markdown files found in ${options.dir}.`,
      { dir: options.dir },
    );
    return [];
  }

  const parsedFiles = [];
  const slugToFiles = new Map();

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const relativePath = normalizePath(path.relative(process.cwd(), filePath));
    const parsed = parseMarkdownDocument(raw, relativePath);

    parsedFiles.push(parsed);

    if (!parsed.bodyMarkdown.trim()) {
      addIssue(report, "error", "MD_EMPTY_BODY", "Markdown body is empty.", {
        file: relativePath,
      });
    }

    if (!parsed.title) {
      addIssue(
        report,
        "error",
        "MD_MISSING_TITLE",
        "Markdown file is missing a frontmatter title and has no H1 fallback.",
        { file: relativePath },
      );
    }

    if (!parsed.slug) {
      addIssue(report, "error", "MD_MISSING_SLUG", "Could not derive slug.", {
        file: relativePath,
      });
    }

    if (parsed.slug && !isValidSlug(parsed.slug)) {
      addIssue(
        report,
        "error",
        "MD_INVALID_SLUG",
        "Slug must be lowercase kebab-case.",
        { file: relativePath, slug: parsed.slug },
      );
    }

    if (parsed.status && !VALID_STATUSES.has(parsed.status)) {
      addIssue(report, "error", "MD_INVALID_STATUS", "Invalid status.", {
        file: relativePath,
        status: parsed.status,
        valid: [...VALID_STATUSES],
      });
    }

    if (parsed.source && !VALID_SOURCES.has(parsed.source)) {
      addIssue(report, "error", "MD_INVALID_SOURCE", "Invalid source.", {
        file: relativePath,
        source: parsed.source,
        valid: [...VALID_SOURCES],
      });
    }

    if (parsed.canonicalUrl && !isValidUrl(parsed.canonicalUrl)) {
      addIssue(
        report,
        "error",
        "MD_INVALID_CANONICAL_URL",
        "canonical_url must be a valid URL when present.",
        { file: relativePath, canonicalUrl: parsed.canonicalUrl },
      );
    }

    if (parsed.bodyText.length < 50) {
      addIssue(
        report,
        "warning",
        "MD_SHORT_BODY_TEXT",
        "Derived body_text is very short.",
        {
          file: relativePath,
          charCount: parsed.bodyText.length,
        },
      );
    }

    for (const topic of parsed.topics) {
      validateTopic(topic, report, {
        table: "markdown_file",
        file: relativePath,
      });
    }

    if (parsed.slug) {
      const existing = slugToFiles.get(parsed.slug) || [];
      existing.push(relativePath);
      slugToFiles.set(parsed.slug, existing);
    }
  }

  for (const [slug, matches] of slugToFiles.entries()) {
    if (matches.length > 1) {
      addIssue(
        report,
        "error",
        "MD_DUPLICATE_SLUG",
        "Multiple Markdown files resolve to the same slug.",
        { slug, files: matches },
      );
    }
  }

  return parsedFiles;
}

async function validateDatabaseImport(supabase, markdownFiles, options, report) {
  const documents = await fetchDocuments(supabase, options, report);

  validateDocuments(documents, report);

  const documentIds = documents.map((doc) => doc.id).filter(Boolean);

  const topics = await fetchChildRows(
    supabase,
    "document_topics",
    "document_id",
    documentIds,
    report,
  );

  const chunks = await fetchChildRows(
    supabase,
    "document_chunks",
    "document_id",
    documentIds,
    report,
  );

  report.summary.topics = topics.length;
  report.summary.chunks = chunks.length;

  validateDocumentTopics(documents, topics, report);
  validateDocumentChunks(documents, chunks, report);

  if (!options.skipFiles && options.source === "markdown") {
    validateMarkdownFilesWereImported(markdownFiles, documents, report);
  }

  await validateImportObservability(supabase, options, report);

  return documents;
}

async function fetchDocuments(supabase, options, report) {
  const rows = [];
  let from = 0;

  while (true) {
    let query = supabase
      .from("documents")
      .select("*")
      .range(from, from + PAGE_SIZE - 1)
      .order("updated_at", { ascending: false });

    if (options.slug) {
      query = query.eq("slug", options.slug);
    }

    if (!options.allSources && options.source) {
      query = query.eq("source", options.source);
    }

    const { data, error } = await query;

    if (error) {
      addIssue(
        report,
        "error",
        "DB_DOCUMENT_QUERY_FAILED",
        "Failed to query documents.",
        { error: error.message },
      );
      return rows;
    }

    rows.push(...(data || []));

    if (!data || data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  if (rows.length === 0) {
    addIssue(
      report,
      "warning",
      "DB_NO_DOCUMENTS",
      "No documents matched the validation query.",
      {
        source: options.allSources ? "all" : options.source,
        slug: options.slug,
      },
    );
  }

  return rows;
}

async function fetchChildRows(supabase, table, foreignKey, ids, report) {
  if (ids.length === 0) return [];

  const rows = [];

  for (const chunk of chunkArray(ids, 200)) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .in(foreignKey, chunk);

    if (error) {
      addIssue(
        report,
        "error",
        `DB_${table.toUpperCase()}_QUERY_FAILED`,
        `Failed to query ${table}.`,
        { error: error.message },
      );
      continue;
    }

    rows.push(...(data || []));
  }

  return rows;
}

function validateDocuments(documents, report) {
  const slugCounts = new Map();

  for (const doc of documents) {
    const context = {
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
    };

    if (!doc.id) {
      addIssue(report, "error", "DOC_MISSING_ID", "Document is missing id.", {
        title: doc.title,
      });
    }

    if (!doc.title || !String(doc.title).trim()) {
      addIssue(report, "error", "DOC_MISSING_TITLE", "Document is missing title.", context);
    }

    if (!doc.slug || !String(doc.slug).trim()) {
      addIssue(report, "error", "DOC_MISSING_SLUG", "Document is missing slug.", context);
    } else if (!isValidSlug(doc.slug)) {
      addIssue(report, "error", "DOC_INVALID_SLUG", "Slug must be lowercase kebab-case.", context);
    }

    if (doc.slug) {
      slugCounts.set(doc.slug, (slugCounts.get(doc.slug) || 0) + 1);
    }

    if (!doc.body_markdown || !String(doc.body_markdown).trim()) {
      addIssue(
        report,
        "error",
        "DOC_MISSING_BODY_MARKDOWN",
        "Document is missing body_markdown.",
        context,
      );
    }

    if (!doc.body_text || !String(doc.body_text).trim()) {
      addIssue(
        report,
        "error",
        "DOC_MISSING_BODY_TEXT",
        "Document is missing body_text.",
        context,
      );
    }

    if (doc.body_markdown && startsWithFrontmatter(doc.body_markdown)) {
      addIssue(
        report,
        "warning",
        "DOC_BODY_CONTAINS_FRONTMATTER",
        "body_markdown appears to still include frontmatter. Import should store the body only.",
        context,
      );
    }

    if (doc.body_text && String(doc.body_text).length < 50) {
      addIssue(
        report,
        "warning",
        "DOC_SHORT_BODY_TEXT",
        "body_text is very short.",
        {
          ...context,
          charCount: String(doc.body_text).length,
        },
      );
    }

    if (!doc.source || !VALID_SOURCES.has(doc.source)) {
      addIssue(report, "error", "DOC_INVALID_SOURCE", "Invalid document source.", {
        ...context,
        source: doc.source,
        valid: [...VALID_SOURCES],
      });
    }

    if (!doc.status || !VALID_STATUSES.has(doc.status)) {
      addIssue(report, "error", "DOC_INVALID_STATUS", "Invalid document status.", {
        ...context,
        status: doc.status,
        valid: [...VALID_STATUSES],
      });
    }

    if (doc.status === "published") {
      if (!doc.slug) {
        addIssue(
          report,
          "error",
          "PUBLISHED_DOC_MISSING_SLUG",
          "Published documents must have a stable slug.",
          context,
        );
      }

      if ("internal_path" in doc) {
        const expectedPath = `/reading/${doc.slug}`;
        if (doc.internal_path !== expectedPath) {
          addIssue(
            report,
            "error",
            "DOC_INVALID_INTERNAL_PATH",
            "internal_path must match /reading/{slug}.",
            {
              ...context,
              expected: expectedPath,
              actual: doc.internal_path,
            },
          );
        }
      }
    }

    if (doc.canonical_url && !isValidUrl(doc.canonical_url)) {
      addIssue(
        report,
        "error",
        "DOC_INVALID_CANONICAL_URL",
        "canonical_url must be a valid URL when present.",
        {
          ...context,
          canonicalUrl: doc.canonical_url,
        },
      );
    }

    if (!doc.language || !String(doc.language).trim()) {
      addIssue(
        report,
        "warning",
        "DOC_MISSING_LANGUAGE",
        "Document is missing language.",
        context,
      );
    }

    if (doc.word_count != null && doc.body_text) {
      const actualWordCount = countWords(doc.body_text);
      const difference = Math.abs(Number(doc.word_count) - actualWordCount);

      if (difference > Math.max(50, actualWordCount * 0.2)) {
        addIssue(
          report,
          "warning",
          "DOC_WORD_COUNT_MISMATCH",
          "word_count differs significantly from body_text.",
          {
            ...context,
            stored: doc.word_count,
            actual: actualWordCount,
          },
        );
      }
    }
  }

  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      addIssue(
        report,
        "error",
        "DB_DUPLICATE_SLUG",
        "Multiple DB documents share the same slug.",
        { slug, count },
      );
    }
  }
}

function validateDocumentTopics(documents, topics, report) {
  const topicsByDocumentId = groupBy(topics, "document_id");

  for (const doc of documents) {
    const docTopics = topicsByDocumentId.get(doc.id) || [];

    if (doc.status === "published" && docTopics.length === 0) {
      addIssue(
        report,
        "warning",
        "DOC_NO_TOPICS",
        "Published document has no topics.",
        {
          id: doc.id,
          slug: doc.slug,
          title: doc.title,
        },
      );
    }

    const seen = new Set();

    for (const row of docTopics) {
      const topic = row.topic;

      validateTopic(topic, report, {
        table: "document_topics",
        documentId: doc.id,
        slug: doc.slug,
      });

      if (seen.has(topic)) {
        addIssue(
          report,
          "error",
          "DOC_DUPLICATE_TOPIC",
          "Document has duplicate topic rows.",
          {
            documentId: doc.id,
            slug: doc.slug,
            topic,
          },
        );
      }

      seen.add(topic);
    }
  }
}

function validateTopic(topic, report, context) {
  if (!topic || !String(topic).trim()) {
    addIssue(report, "error", "TOPIC_EMPTY", "Topic is empty.", context);
    return;
  }

  if (!isValidTopic(topic)) {
    addIssue(
      report,
      "error",
      "TOPIC_INVALID_FORMAT",
      "Topic must use lowercase snake_case.",
      {
        ...context,
        topic,
      },
    );
  }

  if (SOURCE_LIKE_TOPICS.has(topic)) {
    addIssue(
      report,
      "warning",
      "TOPIC_LOOKS_LIKE_SOURCE",
      "Topic looks like a source/type. Use documents.source for source values.",
      {
        ...context,
        topic,
      },
    );
  }
}

function validateDocumentChunks(documents, chunks, report) {
  const chunksByDocumentId = groupBy(chunks, "document_id");

  for (const doc of documents) {
    const docChunks = chunksByDocumentId.get(doc.id) || [];
    const context = {
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
    };

    if (docChunks.length === 0) {
      addIssue(
        report,
        "error",
        "DOC_MISSING_CHUNKS",
        "Document has no chunks. Importers should generate basic chunks during import.",
        context,
      );
      continue;
    }

    const sortedChunks = [...docChunks].sort(
      (a, b) => Number(a.chunk_index) - Number(b.chunk_index),
    );

    const firstIndex = Number(sortedChunks[0]?.chunk_index);
    const expectedStart = firstIndex === 1 ? 1 : 0;

    for (let i = 0; i < sortedChunks.length; i += 1) {
      const chunk = sortedChunks[i];
      const expectedIndex = expectedStart + i;

      if (Number(chunk.chunk_index) !== expectedIndex) {
        addIssue(
          report,
          "error",
          "CHUNK_INDEX_GAP",
          "Chunk indexes must be sequential.",
          {
            ...context,
            expectedIndex,
            actualIndex: chunk.chunk_index,
          },
        );
      }

      if (!chunk.content || !String(chunk.content).trim()) {
        addIssue(
          report,
          "error",
          "CHUNK_EMPTY_CONTENT",
          "Chunk content is empty.",
          {
            ...context,
            chunkIndex: chunk.chunk_index,
          },
        );
      }

      const charCount = String(chunk.content || "").length;

      if ("char_count" in chunk && chunk.char_count != null) {
        const difference = Math.abs(Number(chunk.char_count) - charCount);

        if (difference > 25) {
          addIssue(
            report,
            "warning",
            "CHUNK_CHAR_COUNT_MISMATCH",
            "Chunk char_count differs from actual content length.",
            {
              ...context,
              chunkIndex: chunk.chunk_index,
              stored: chunk.char_count,
              actual: charCount,
            },
          );
        }
      }

      if ("token_estimate" in chunk && chunk.token_estimate != null) {
        if (Number(chunk.token_estimate) <= 0) {
          addIssue(
            report,
            "warning",
            "CHUNK_INVALID_TOKEN_ESTIMATE",
            "Chunk token_estimate should be positive when present.",
            {
              ...context,
              chunkIndex: chunk.chunk_index,
              tokenEstimate: chunk.token_estimate,
            },
          );
        }
      }
    }
  }
}

function validateMarkdownFilesWereImported(markdownFiles, documents, report) {
  const documentsBySlug = new Map();

  for (const doc of documents) {
    if (doc.slug) documentsBySlug.set(doc.slug, doc);
  }

  for (const file of markdownFiles) {
    if (!file.slug) continue;

    const dbDoc = documentsBySlug.get(file.slug);

    if (!dbDoc) {
      const level = file.frontmatter.slug ? "error" : "warning";

      addIssue(
        report,
        level,
        "MD_FILE_NOT_IMPORTED",
        "Markdown file does not appear to have a matching DB document by slug.",
        {
          file: file.path,
          expectedSlug: file.slug,
          title: file.title,
          note: file.frontmatter.slug
            ? "Explicit frontmatter slug should match DB slug."
            : "Derived slug may differ if importer applied collision hashing.",
        },
      );
      continue;
    }

    const sourcePath =
      dbDoc.source_path ||
      dbDoc.metadata?.source_path ||
      dbDoc.metadata?.sourcePath ||
      null;

    if (sourcePath && normalizePath(sourcePath) !== normalizePath(file.path)) {
      addIssue(
        report,
        "warning",
        "MD_SOURCE_PATH_MISMATCH",
        "DB source path does not match Markdown file path.",
        {
          file: file.path,
          dbSourcePath: sourcePath,
          slug: file.slug,
        },
      );
    }

    const fileHash = hashText(file.bodyMarkdown);
    const dbHash =
      dbDoc.content_hash ||
      dbDoc.body_hash ||
      dbDoc.metadata?.content_hash ||
      dbDoc.metadata?.body_hash ||
      null;

    if (dbHash && dbHash !== fileHash) {
      addIssue(
        report,
        "warning",
        "MD_BODY_HASH_MISMATCH",
        "DB body hash differs from local Markdown body hash.",
        {
          file: file.path,
          slug: file.slug,
          localHash: fileHash,
          dbHash,
        },
      );
    }
  }
}

async function validateImportObservability(supabase, options, report) {
  const { data, error } = await supabase
    .from("import_runs")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(5);

  if (error) {
    addIssue(
      report,
      "warning",
      "DB_IMPORT_RUNS_QUERY_FAILED",
      "Could not query import_runs. If the table is not built yet, create it or remove this check.",
      { error: error.message },
    );
    return;
  }

  if (!data || data.length === 0) {
    addIssue(
      report,
      "warning",
      "NO_IMPORT_RUNS",
      "No import_runs found. Imports should be auditable and repeatable.",
    );
    return;
  }

  const relevantRuns = options.allSources
    ? data
    : data.filter((run) => run.source === options.source || run.importer?.includes(options.source));

  if (relevantRuns.length === 0) {
    addIssue(
      report,
      "warning",
      "NO_RELEVANT_IMPORT_RUNS",
      "No recent import_runs matched this source.",
      {
        source: options.source,
      },
    );
  }
}

async function findMarkdownFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    let entries;

    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") return;
      throw error;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".git" ||
          entry.name === ".next"
        ) {
          continue;
        }

        await walk(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);

  return files.sort();
}

function parseMarkdownDocument(raw, relativePath) {
  const { frontmatter, body } = splitFrontmatter(raw);
  const parsedFrontmatter = parseSimpleFrontmatter(frontmatter);
  const h1Title = extractFirstHeading(body);
  const title = stringOrNull(parsedFrontmatter.title) || h1Title;
  const slug = stringOrNull(parsedFrontmatter.slug) || slugify(title || path.basename(relativePath, ".md"));
  const source = stringOrNull(parsedFrontmatter.source) || "markdown";
  const status = stringOrNull(parsedFrontmatter.status) || "draft";
  const canonicalUrl =
    stringOrNull(parsedFrontmatter.canonical_url) ||
    stringOrNull(parsedFrontmatter.canonicalUrl);

  return {
    path: relativePath,
    frontmatter: parsedFrontmatter,
    title,
    slug,
    source,
    status,
    canonicalUrl,
    topics: normalizeTopics(parsedFrontmatter.topics),
    bodyMarkdown: body.trim(),
    bodyText: markdownToText(body),
    hash: hashText(body.trim()),
  };
}

function splitFrontmatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);

  if (!match) {
    return {
      frontmatter: "",
      body: raw,
    };
  }

  return {
    frontmatter: match[1],
    body: raw.slice(match[0].length),
  };
}

function parseSimpleFrontmatter(raw) {
  const result = {};
  const lines = raw.split(/\r?\n/);

  let currentKey = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const listItemMatch = trimmed.match(/^-\s+(.+)$/);

    if (currentKey && listItemMatch) {
      if (!Array.isArray(result[currentKey])) result[currentKey] = [];
      result[currentKey].push(cleanYamlScalar(listItemMatch[1]));
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!keyValueMatch) {
      currentKey = null;
      continue;
    }

    const key = keyValueMatch[1];
    const value = keyValueMatch[2].trim();

    currentKey = key;

    if (value === "") {
      result[key] = [];
    } else if (value.startsWith("[") && value.endsWith("]")) {
      result[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => cleanYamlScalar(item.trim()))
        .filter(Boolean);
    } else {
      result[key] = cleanYamlScalar(value);
    }
  }

  return result;
}

function cleanYamlScalar(value) {
  let cleaned = String(value).trim();

  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }

  return cleaned.trim();
}

function extractFirstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function markdownToText(markdown) {
  return String(markdown)
    .replace(/^---[\s\S]*?---/m, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTopics(value) {
  if (!value) return [];

  const rawTopics = Array.isArray(value)
    ? value
    : String(value)
        .split(",")
        .map((item) => item.trim());

  return rawTopics
    .map((topic) =>
      String(topic)
        .trim()
        .toLowerCase()
        .replace(/[-\s]+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, ""),
    )
    .filter(Boolean);
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function startsWithFrontmatter(value) {
  return String(value).trimStart().startsWith("---");
}

function isValidSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value));
}

function isValidTopic(value) {
  return /^[a-z0-9]+(?:_[a-z0-9]+)*$/.test(String(value));
}

function isValidUrl(value) {
  try {
    const url = new URL(String(value));
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function stringOrNull(value) {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text : null;
}

function countWords(value) {
  return String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function hashText(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}

function normalizePath(value) {
  return String(value).replaceAll("\\", "/");
}

function groupBy(rows, key) {
  const grouped = new Map();

  for (const row of rows) {
    const groupKey = row[key];
    const group = grouped.get(groupKey) || [];
    group.push(row);
    grouped.set(groupKey, group);
  }

  return grouped;
}

function chunkArray(items, size) {
  const chunks = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
}

function printReport(report) {
  console.log("\nReading import validation");
  console.log("=========================");
  console.log(`Markdown files: ${report.summary.markdownFiles}`);
  console.log(`DB documents:   ${report.summary.dbDocuments}`);
  console.log(`Topics:         ${report.summary.topics}`);
  console.log(`Chunks:         ${report.summary.chunks}`);
  console.log(`Errors:         ${report.summary.errors}`);
  console.log(`Warnings:       ${report.summary.warnings}`);

  if (report.issues.length > 0) {
    console.log("\nIssues");
    console.log("------");

    for (const issue of report.issues) {
      const prefix = issue.level === "error" ? "[ERROR]" : "[WARNING]";
      console.log(`${prefix} ${issue.code}: ${issue.message}`);

      if (issue.context && Object.keys(issue.context).length > 0) {
        console.log(`  ${JSON.stringify(issue.context)}`);
      }
    }
  }

  if (report.ok && report.summary.warnings === 0) {
    console.log("\nResult: OK");
  } else if (report.ok) {
    console.log("\nResult: OK with warnings");
  } else {
    console.log("\nResult: FAILED");
  }
}