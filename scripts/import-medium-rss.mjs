// scripts/import-medium-rss.mjs
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { XMLParser } from "fast-xml-parser";

const RSS_URL =
  process.env.MEDIUM_RSS_URL || "https://medium.com/feed/@boatbuilder610";

const CATALOG_PATH =
  process.env.MEDIUM_CATALOG_PATH || "public/inventory.articles.catalog.json";

const MEDIUM_SOURCE_DIR =
  process.env.MEDIUM_SOURCE_DIR || "content/medium/source";

const IMPORT_LOCAL_MEDIUM_SOURCE =
  process.env.MEDIUM_IMPORT_LOCAL !== "false";

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
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&pi;/g, "π")
    .replace(/&#960;/g, "π")
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function firstMatch(value, patterns) {
  for (const pattern of patterns) {
    const match = String(value).match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

function compactDescriptionFromHtml(html) {
  const summary = firstMatch(html, [
    /<section[^>]*data-field=["']subtitle["'][^>]*>([\s\S]*?)<\/section>/i,
    /<section[^>]*class=["'][^"']*\bp-summary\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<p[^>]*>([\s\S]*?)<\/p>/i,
  ]);

  return stripHtml(summary || html).slice(0, 500);
}

function compactDescriptionFromRss(item) {
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
    .replace(/π/g, "pi")
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
        .replace(/π/g, "pi")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
    )
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function toCatalogItemFromRss(item) {
  const title = text(item.title);
  const url = normalizeMediumUrl(item.link || item.guid);
  const categories = extractCategories(item);

  return {
    title,
    url,
    description: compactDescriptionFromRss(item),
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
    source: "medium_rss",
  };
}

function extractHtmlAttribute(html, tagPattern, attrName) {
  const tag = firstMatch(html, [tagPattern]);
  if (!tag) return "";

  return firstMatch(tag, [
    new RegExp(`${escapeRegExp(attrName)}=["']([^"']+)["']`, "i"),
  ]);
}

function extractLocalMediumHtml(html, filename) {
  const title = stripHtml(
    firstMatch(html, [
      /<h1[^>]*class=["'][^"']*\bp-name\b[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i,
      /<title[^>]*>([\s\S]*?)<\/title>/i,
      /<h3[^>]*class=["'][^"']*\bgraf--title\b[^"']*["'][^>]*>([\s\S]*?)<\/h3>/i,
    ])
  );

  const canonicalUrl = normalizeMediumUrl(
    extractHtmlAttribute(
      html,
      /(<a[^>]+class=["'][^"']*\bp-canonical\b[^"']*["'][^>]*>)/i,
      "href"
    )
  );

  const publishedAt =
    extractHtmlAttribute(
      html,
      /(<time[^>]+class=["'][^"']*\bdt-published\b[^"']*["'][^>]*>)/i,
      "datetime"
    ) ||
    firstMatch(filename, [/^(\d{4}-\d{2}-\d{2})_/]);

  const url = canonicalUrl;
  const description = compactDescriptionFromHtml(html);

  if (!title || !url) {
    return null;
  }

  return {
    title,
    url,
    description,
    type: "medium_article",
    language: DEFAULT_LANGUAGE,
    id: stableId(url, title),
    platform: "medium",
    embed: null,
    topics: DEFAULT_TOPICS,
    level: DEFAULT_LEVEL,
    featured: false,
    sections: DEFAULT_SECTIONS,
    primarySection: DEFAULT_PRIMARY_SECTION,
    publishedAt: publishedAt || undefined,
    source: "medium_local_html",
    localSourcePath: path.join(MEDIUM_SOURCE_DIR, filename).replaceAll("\\", "/"),
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

async function loadRssCatalogItems() {
  try {
    const xml = await fetchMediumFeed();

    const rssItems = parseMediumItems(xml)
      .map(toCatalogItemFromRss)
      .filter((item) => item.title && item.url);

    return {
      items: rssItems,
      read: rssItems.length,
      error: null,
    };
  } catch (error) {
    return {
      items: [],
      read: 0,
      error,
    };
  }
}

async function listLocalMediumHtmlFiles() {
  try {
    const entries = await fs.readdir(MEDIUM_SOURCE_DIR, {
      withFileTypes: true,
    });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function loadLocalMediumCatalogItems() {
  if (!IMPORT_LOCAL_MEDIUM_SOURCE) {
    return {
      items: [],
      read: 0,
      skipped: true,
    };
  }

  const files = await listLocalMediumHtmlFiles();
  const items = [];

  for (const filename of files) {
    const fullPath = path.join(MEDIUM_SOURCE_DIR, filename);
    const html = await fs.readFile(fullPath, "utf8");
    const item = extractLocalMediumHtml(html, filename);

    if (item) {
      items.push(item);
    } else {
      console.warn(`Skipped local Medium export with missing title/url: ${fullPath}`);
    }
  }

  return {
    items,
    read: files.length,
    skipped: false,
  };
}

function dedupeImportedItems(importedItems) {
  const byUrl = new Map();

  for (const item of importedItems) {
    const url = normalizeMediumUrl(item.url);
    if (!url) continue;

    const previous = byUrl.get(url);

    byUrl.set(url, {
      ...previous,
      ...item,
      url,
      description: item.description || previous?.description || "",
      publishedAt: item.publishedAt || previous?.publishedAt,
      topics: unique([...(previous?.topics || []), ...(item.topics || [])]),
      source: unique([previous?.source, item.source]).join("+"),
    });
  }

  return Array.from(byUrl.values());
}

function mergeImportedItems(existingItems, importedItems) {
  const byUrl = new Map();
  const passthrough = [];

  for (const item of existingItems) {
    const url = normalizeMediumUrl(item?.url);

    if (url) {
      byUrl.set(url, item);
    } else {
      passthrough.push(item);
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
      language: previous.language || item.language,
    });

    updated += 1;
  }

  return {
    items: [...passthrough, ...Array.from(byUrl.values())],
    created,
    updated,
  };
}

function countMediumArticles(items) {
  return items.filter((item) => item?.type === "medium_article").length;
}

function sortCatalogItems(items) {
  return [...items].sort((a, b) => {
    const aIsMedium = a?.type === "medium_article";
    const bIsMedium = b?.type === "medium_article";

    if (aIsMedium && bIsMedium) {
      const ad = Date.parse(a.publishedAt || "");
      const bd = Date.parse(b.publishedAt || "");

      if (!Number.isNaN(ad) && !Number.isNaN(bd) && ad !== bd) {
        return bd - ad;
      }

      return String(a.title || "").localeCompare(String(b.title || ""));
    }

    if (aIsMedium !== bIsMedium) {
      return aIsMedium ? -1 : 1;
    }

    return 0;
  });
}

async function main() {
  const catalog = await readCatalog();

  const [rssResult, localResult] = await Promise.all([
    loadRssCatalogItems(),
    loadLocalMediumCatalogItems(),
  ]);

  if (rssResult.error) {
    console.warn(`Medium RSS warning: ${rssResult.error.message}`);
  }

  const importedItems = dedupeImportedItems([
    ...localResult.items,
    ...rssResult.items,
  ]);

  if (!importedItems.length) {
    throw new Error(
      "No Medium articles were imported. Check MEDIUM_RSS_URL and content/medium/source."
    );
  }

  const beforeMediumCount = countMediumArticles(catalog.items);

  const { items, created, updated } = mergeImportedItems(
    catalog.items,
    importedItems
  );

  const sortedItems = sortCatalogItems(items);
  const afterMediumCount = countMediumArticles(sortedItems);

  const nextCatalog = {
    ...catalog,
    generatedAt: new Date().toISOString(),
    items: sortedItems,
  };

  await fs.writeFile(
    CATALOG_PATH,
    `${JSON.stringify(nextCatalog, null, 2)}\n`,
    "utf8"
  );

  console.log("Medium import complete.");
  console.log(`RSS articles read: ${rssResult.read}`);
  console.log(
    `Local Medium HTML files read: ${
      localResult.skipped ? "skipped" : localResult.read
    }`
  );
  console.log(`Unique Medium articles prepared: ${importedItems.length}`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Medium articles before: ${beforeMediumCount}`);
  console.log(`Medium articles after: ${afterMediumCount}`);
  console.log(`Catalog updated: ${CATALOG_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});