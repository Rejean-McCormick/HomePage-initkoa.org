// lib/reading/frontmatter.ts

export type FrontmatterPrimitive = string | number | boolean | null;
export type FrontmatterValue = FrontmatterPrimitive | FrontmatterPrimitive[];

export type RawFrontmatter = Record<string, FrontmatterValue>;

export type ReadingFrontmatter = {
  title?: string;
  slug?: string;
  description?: string | null;
  date?: string | null;
  publishedAt?: string | null;
  author?: string | null;
  source: "markdown" | "medium" | "pdf" | "manual" | "imported_html";
  language: string;
  status: "draft" | "published" | "archived";
  topics: string[];
  canonicalUrl?: string | null;
  metadata: Record<string, FrontmatterValue>;
};

export type ParsedMarkdownWithFrontmatter = {
  frontmatter: ReadingFrontmatter;
  rawFrontmatter: RawFrontmatter;
  bodyMarkdown: string;
};

const FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

const VALID_SOURCES = new Set([
  "markdown",
  "medium",
  "pdf",
  "manual",
  "imported_html",
]);

const VALID_STATUSES = new Set(["draft", "published", "archived"]);

const RESERVED_KEYS = new Set([
  "title",
  "slug",
  "description",
  "date",
  "published_at",
  "publishedAt",
  "author",
  "source",
  "language",
  "lang",
  "status",
  "topics",
  "tags",
  "canonical_url",
  "canonicalUrl",
]);

export function parseMarkdownWithFrontmatter(
  markdown: string,
): ParsedMarkdownWithFrontmatter {
  const normalizedMarkdown = markdown.replace(/^\uFEFF/, "");
  const match = normalizedMarkdown.match(FRONTMATTER_RE);

  if (!match) {
    return {
      frontmatter: normalizeReadingFrontmatter({}),
      rawFrontmatter: {},
      bodyMarkdown: normalizedMarkdown.trimStart(),
    };
  }

  const rawFrontmatterBlock = match[1] ?? "";
  const rawFrontmatter = parseYamlSubset(rawFrontmatterBlock);
  const bodyMarkdown = normalizedMarkdown.slice(match[0].length).trimStart();

  return {
    frontmatter: normalizeReadingFrontmatter(rawFrontmatter),
    rawFrontmatter,
    bodyMarkdown,
  };
}

export function extractFrontmatter(markdown: string): {
  rawFrontmatter: RawFrontmatter;
  bodyMarkdown: string;
} {
  const parsed = parseMarkdownWithFrontmatter(markdown);

  return {
    rawFrontmatter: parsed.rawFrontmatter,
    bodyMarkdown: parsed.bodyMarkdown,
  };
}

export function normalizeReadingFrontmatter(
  raw: RawFrontmatter,
): ReadingFrontmatter {
  const source = normalizeSource(raw.source);
  const status = normalizeStatus(raw.status, source);
  const language = normalizeString(raw.language ?? raw.lang) ?? "en";
  const topics = normalizeTopics(raw.topics ?? raw.tags);

  const known: ReadingFrontmatter = {
    title: normalizeString(raw.title),
    slug: normalizeString(raw.slug),
    description: normalizeNullableString(raw.description),
    date: normalizeDateString(raw.date),
    publishedAt: normalizeDateString(raw.published_at ?? raw.publishedAt),
    author: normalizeNullableString(raw.author),
    source,
    language,
    status,
    topics,
    canonicalUrl: normalizeNullableString(
      raw.canonical_url ?? raw.canonicalUrl,
    ),
    metadata: extractMetadata(raw),
  };

  return known;
}

function parseYamlSubset(input: string): RawFrontmatter {
  const result: RawFrontmatter = {};
  const lines = input.replace(/\r\n/g, "\n").split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line || isIgnorableYamlLine(line)) {
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);

    if (!keyValue) {
      continue;
    }

    const key = keyValue[1];
    const value = keyValue[2] ?? "";

    if (value.trim() !== "") {
      result[key] = parseYamlScalarOrInlineArray(value);
      continue;
    }

    const arrayValues: FrontmatterPrimitive[] = [];
    let cursor = i + 1;

    while (cursor < lines.length) {
      const nextLine = lines[cursor];

      if (!nextLine.trim()) {
        cursor += 1;
        continue;
      }

      const listItem = nextLine.match(/^\s*-\s+(.*)$/);

      if (!listItem) {
        break;
      }

      arrayValues.push(parseYamlScalar(listItem[1] ?? ""));
      cursor += 1;
    }

    if (arrayValues.length > 0) {
      result[key] = arrayValues;
      i = cursor - 1;
    } else {
      result[key] = null;
    }
  }

  return result;
}

function parseYamlScalarOrInlineArray(value: string): FrontmatterValue {
  const trimmed = stripInlineComment(value.trim());

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();

    if (!inner) {
      return [];
    }

    return splitInlineArray(inner).map(parseYamlScalar);
  }

  return parseYamlScalar(trimmed);
}

function parseYamlScalar(value: string): FrontmatterPrimitive {
  const trimmed = stripInlineComment(value.trim());

  if (!trimmed || trimmed === "null" || trimmed === "~") {
    return null;
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return unquote(trimmed);
}

function splitInlineArray(value: string): string[] {
  const items: string[] = [];
  let current = "";
  let quote: `"` | `'` | null = null;

  for (const char of value) {
    if ((char === `"` || char === `'`) && quote === null) {
      quote = char;
      current += char;
      continue;
    }

    if (char === quote) {
      quote = null;
      current += char;
      continue;
    }

    if (char === "," && quote === null) {
      items.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    items.push(current.trim());
  }

  return items;
}

function normalizeSource(
  value: FrontmatterValue | undefined,
): ReadingFrontmatter["source"] {
  const source = normalizeString(value);

  if (source && VALID_SOURCES.has(source)) {
    return source as ReadingFrontmatter["source"];
  }

  return "markdown";
}

function normalizeStatus(
  value: FrontmatterValue | undefined,
  source: ReadingFrontmatter["source"],
): ReadingFrontmatter["status"] {
  const status = normalizeString(value);

  if (status && VALID_STATUSES.has(status)) {
    return status as ReadingFrontmatter["status"];
  }

  return source === "medium" ? "published" : "draft";
}

function normalizeTopics(value: FrontmatterValue | undefined): string[] {
  const rawValues = Array.isArray(value) ? value : value ? [value] : [];

  return Array.from(
    new Set(
      rawValues
        .map((item) => normalizeString(item))
        .filter((item): item is string => Boolean(item))
        .map(toTopicKey)
        .filter(Boolean),
    ),
  );
}

function toTopicKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeString(value: FrontmatterValue | undefined): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return undefined;
}

function normalizeNullableString(
  value: FrontmatterValue | undefined,
): string | null | undefined {
  if (value === null) {
    return null;
  }

  return normalizeString(value);
}

function normalizeDateString(
  value: FrontmatterValue | undefined,
): string | null | undefined {
  const raw = normalizeNullableString(value);

  if (!raw) {
    return raw;
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return date.toISOString();
}

function extractMetadata(raw: RawFrontmatter): Record<string, FrontmatterValue> {
  return Object.fromEntries(
    Object.entries(raw).filter(([key]) => !RESERVED_KEYS.has(key)),
  );
}

function stripInlineComment(value: string): string {
  let quote: `"` | `'` | null = null;

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];

    if ((char === `"` || char === `'`) && quote === null) {
      quote = char;
      continue;
    }

    if (char === quote) {
      quote = null;
      continue;
    }

    if (char === "#" && quote === null) {
      const previous = value[i - 1];

      if (!previous || /\s/.test(previous)) {
        return value.slice(0, i).trim();
      }
    }
  }

  return value;
}

function unquote(value: string): string {
  if (
    (value.startsWith(`"`) && value.endsWith(`"`)) ||
    (value.startsWith(`'`) && value.endsWith(`'`))
  ) {
    return value.slice(1, -1).trim();
  }

  return value.trim();
}

function isIgnorableYamlLine(line: string): boolean {
  const trimmed = line.trim();

  return !trimmed || trimmed.startsWith("#");
}