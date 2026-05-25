// scripts/import-medium-rss.mjs
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { XMLParser } from "fast-xml-parser";

const RSS_URL =
  process.env.MEDIUM_RSS_URL || "https://medium.com/feed/@boatbuilder610";

const CATALOG_PATH =
  process.env.MEDIUM_CATALOG_PATH || "public/inventory.articles.catalog.json";

const DEFAULT_LANGUAGE = process.env.MEDIUM_DEFAULT_LANGUAGE || "en";
const DEFAULT_LEVEL = process.env.MEDIUM_DEFAULT_LEVEL || "intermediate";
const DEFAULT_PRIMARY_SECTION =
  process.env.MEDIUM_PRIMARY_SECTION || "research";

const DEFAULT_SECTIONS = parseCsvEnv(
  process.env.MEDIUM_SECTIONS,
  [DEFAULT_PRIMARY_SECTION]
);

const DEFAULT_TOPICS = parseCsvEnv(process.env.MEDIUM_TOPICS, [
  "academic_paper_and_article",
  "rejean_mccormick",
]);

function parseCsvEnv(value, fallback) {
  if (!value || !String(value).trim()) return fallback;

  return String(value)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value) {
  if (value == null) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }

  if (typeof value === "object" && typeof value["#text"] === "string") {
    return value["#text"].trim();
  }

  return "";
}

function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html) {
  return decodeHtmlEntities(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactDescription(item) {
  const raw =
    text(item.description) ||
    text(item["content:encoded"]) ||
    text(item.encoded) ||
    "";

  return stripHtml(raw).slice(0, 500);
}

function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function stableId(url, title) {
  const baseSlug = slugify(title) || "untitled";

  const hash = crypto
    .createHash("sha1")
    .update(String(url || title || Date.now()))
    .digest("hex")
    .slice(0, 8);

  return `medium_article-${baseSlug}-${hash}`;
}

function normalizeMediumUrl(value) {
  const raw = text(value);
  if (!raw) return "";

  try {
    const url = new URL(raw);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return raw.split("?")[0].split("#")[0];
  }
}

function extractCategories(item) {
  return asArray(item.category)
    .map(text)
    .filter(Boolean)
    .map((category) =>
      category
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
    )
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function toCatalogItem(item) {
  const title = text(item.title);
  const url = normalizeMediumUrl(item.link || item.guid);
  const categories = extractCategories(item);

  return {
    title,
    url,
    description: compactDescription(item),
    type: "medium_article",
    language: DEFAULT_LANGUAGE,
    id: stableId(url, title),
    platform: "medium",
    embed: null,
    topics: unique([...DEFAULT_TOPICS, ...categories]),
    level: DEFAULT_LEVEL,
    featured: false,
    sections: DEFAULT_SECTIONS,
    primarySection: DEFAULT_PRIMARY_SECTION,
    publishedAt: text(item.pubDate || item.isoDate) || undefined,
  };
}

async function readCatalog() {
  const raw = await fs.readFile(CATALOG_PATH, "utf8");
  const catalog = JSON.parse(raw);

  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new Error(`${CATALOG_PATH} is not a JSON object.`);
  }

  if (!Array.isArray(catalog.items)) {
    throw new Error(`${CATALOG_PATH} must contain an items array.`);
  }

  return catalog;
}

async function fetchMediumFeed() {
  const response = await fetch(RSS_URL, {
    headers: {
      "User-Agent": "initkoa-medium-rss-import/1.0",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Medium RSS fetch failed: HTTP ${response.status}`);
  }

  return response.text();
}

function parseMediumItems(xml) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "#text",
    trimValues: false,
  });

  const parsed = parser.parse(xml);
  return asArray(parsed?.rss?.channel?.item);
}

function mergeImportedItems(existingItems, importedItems) {
  const byUrl = new Map();

  for (const item of existingItems) {
    const url = normalizeMediumUrl(item?.url);

    if (url) {
      byUrl.set(url, item);
    }
  }

  let created = 0;
  let updated = 0;

  for (const item of importedItems) {
    const previous = byUrl.get(item.url);

    if (!previous) {
      byUrl.set(item.url, item);
      created += 1;
      continue;
    }

    byUrl.set(item.url, {
      ...previous,
      ...item,

      // Preserve manual curation when it already exists.
      id: previous.id || item.id,
      topics:
        Array.isArray(previous.topics) && previous.topics.length
          ? previous.topics
          : item.topics,
      level: previous.level || item.level,
      featured: previous.featured ?? item.featured,
      sections:
        Array.isArray(previous.sections) && previous.sections.length
          ? previous.sections
          : item.sections,
      primarySection: previous.primarySection || item.primarySection,
    });

    updated += 1;
  }

  return {
    items: Array.from(byUrl.values()),
    created,
    updated,
  };
}

async function main() {
  const catalog = await readCatalog();
  const xml = await fetchMediumFeed();

  const importedItems = parseMediumItems(xml)
    .map(toCatalogItem)
    .filter((item) => item.title && item.url);

  const { items, created, updated } = mergeImportedItems(
    catalog.items,
    importedItems
  );

  const nextCatalog = {
    ...catalog,
    generatedAt: new Date().toISOString(),
    items,
  };

  await fs.writeFile(
    CATALOG_PATH,
    `${JSON.stringify(nextCatalog, null, 2)}\n`,
    "utf8"
  );

  console.log(
    `Medium import complete: ${importedItems.length} read, ${created} created, ${updated} updated.`
  );
  console.log(`Catalog updated: ${CATALOG_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});