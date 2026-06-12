#!/usr/bin/env node

/**
 * Generate public Reading AI index.
 *
 * Output:
 *   public/reading/ai-index.json
 *
 * Purpose:
 *   Lightweight discovery artifact for published Reading documents.
 *
 * This does NOT generate a full-text corpus.
 * Full document text should remain available at:
 *   /reading/[slug]
 */

import { config as loadDotEnv } from "dotenv";
import { mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const ROOT_DIR = process.cwd();

loadDotEnv({
  path: path.join(ROOT_DIR, ".env.local"),
  override: false,
});

loadDotEnv({
  path: path.join(ROOT_DIR, ".env"),
  override: false,
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "");
const OUTPUT_PATH =
  process.env.READING_AI_INDEX_PATH || "public/reading/ai-index.json";

const PAGE_SIZE = 500;

if (!SUPABASE_URL) {
  fail("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  fail("Missing SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function main() {
  const documents = await fetchPublishedDocuments();
  const topicsByDocumentId = await fetchTopicsForDocuments(
    documents.map((document) => document.id),
  );

  const records = documents.map((document) =>
    serializeDocument(document, topicsByDocumentId.get(document.id) || []),
  );

  const index = {
    schema: "initkoa.reading.ai-index.v1",
    generated_at: new Date().toISOString(),
    source: "supabase.documents",
    visibility: "public",
    policy: {
      includes: "published documents only",
      excludes: ["draft", "archived"],
      full_text_location: "/reading/[slug]",
      note: "This index is for discovery and metadata. It is not the canonical full-text corpus.",
    },
    routes: {
      reading_index: withSiteUrl("/reading"),
      document_pattern: withSiteUrl("/reading/[slug]"),
    },
    counts: {
      documents: records.length,
      topics: countUniqueTopics(records),
      sources: countUniqueSources(records),
      languages: countUniqueLanguages(records),
    },
    documents: records,
  };

  await writeJsonFile(OUTPUT_PATH, index);

  console.log(
    `Generated ${OUTPUT_PATH} with ${records.length} published document(s).`,
  );
}

async function fetchPublishedDocuments() {
  const rows = [];
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("documents")
      .select(
        [
          "id",
          "slug",
          "title",
          "description",
          "source",
          "canonical_url",
          "author",
          "language",
          "status",
          "published_at",
          "updated_at",
          "body_text",
        ].join(","),
      )
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (error) {
      fail(`Failed to fetch published documents: ${error.message}`);
    }

    if (!data || data.length === 0) {
      break;
    }

    rows.push(...data);

    if (data.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return rows;
}

async function fetchTopicsForDocuments(documentIds) {
  const topicsByDocumentId = new Map();

  if (documentIds.length === 0) {
    return topicsByDocumentId;
  }

  for (const batch of chunkArray(documentIds, 200)) {
    const { data, error } = await supabase
      .from("document_topics")
      .select("document_id, topic")
      .in("document_id", batch)
      .order("topic", { ascending: true });

    if (error) {
      fail(`Failed to fetch document topics: ${error.message}`);
    }

    for (const row of data || []) {
      if (!topicsByDocumentId.has(row.document_id)) {
        topicsByDocumentId.set(row.document_id, []);
      }

      topicsByDocumentId.get(row.document_id).push(row.topic);
    }
  }

  return topicsByDocumentId;
}

function serializeDocument(document, topics) {
  const bodyText = normalizeText(document.body_text || "");
  const internalPath = `/reading/${document.slug}`;
  const wordCount = countWords(bodyText);

  return {
    id: document.id,
    slug: document.slug,
    title: document.title,
    description: nullIfEmpty(document.description),
    summary: buildSummary(document.description, bodyText),
    source: document.source,
    language: document.language || "en",
    author: nullIfEmpty(document.author),
    topics: normalizeTopics(topics),
    status: "published",
    internal_path: internalPath,
    url: withSiteUrl(internalPath),
    canonical_url: nullIfEmpty(document.canonical_url),
    published_at: document.published_at,
    updated_at: document.updated_at,
    word_count: wordCount,
    reading_time_minutes: estimateReadingTimeMinutes(wordCount),
    content_hash: hashText(bodyText),
  };
}

function buildSummary(description, bodyText) {
  const cleanDescription = normalizeText(description || "");

  if (cleanDescription) {
    return truncate(cleanDescription, 320);
  }

  return truncate(bodyText, 320);
}

function normalizeTopics(topics) {
  return Array.from(
    new Set(
      topics
        .map((topic) => String(topic || "").trim().toLowerCase())
        .filter(Boolean),
    ),
  ).sort();
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength) {
  const text = normalizeText(value);

  if (text.length <= maxLength) {
    return text || null;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function countWords(value) {
  const text = normalizeText(value);

  if (!text) {
    return 0;
  }

  return text.split(/\s+/).filter(Boolean).length;
}

function estimateReadingTimeMinutes(wordCount) {
  if (!wordCount) {
    return null;
  }

  return Math.max(1, Math.ceil(wordCount / 225));
}

function hashText(value) {
  const text = normalizeText(value);

  if (!text) {
    return null;
  }

  return crypto.createHash("sha256").update(text).digest("hex");
}

function nullIfEmpty(value) {
  const text = normalizeText(value || "");
  return text || null;
}

function withSiteUrl(route) {
  if (!SITE_URL) {
    return route;
  }

  return `${SITE_URL}${route}`;
}

function normalizeSiteUrl(value) {
  return String(value || "").replace(/\/+$/, "");
}

function countUniqueTopics(records) {
  return new Set(records.flatMap((record) => record.topics)).size;
}

function countUniqueSources(records) {
  return new Set(records.map((record) => record.source).filter(Boolean)).size;
}

function countUniqueLanguages(records) {
  return new Set(records.map((record) => record.language).filter(Boolean)).size;
}

function chunkArray(array, size) {
  const chunks = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}

async function writeJsonFile(outputPath, data) {
  const absolutePath = path.resolve(process.cwd(), outputPath);
  const directory = path.dirname(absolutePath);
  const tempPath = `${absolutePath}.tmp`;

  await mkdir(directory, { recursive: true });
  await writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tempPath, absolutePath);
}

function fail(message) {
  console.error(`generate-reading-ai-index: ${message}`);
  process.exit(1);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});