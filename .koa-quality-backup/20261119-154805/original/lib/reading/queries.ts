import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DocumentSource =
  | "medium"
  | "markdown"
  | "pdf"
  | "manual"
  | "imported_html"
  | string;

export type DocumentStatus = "draft" | "published" | "archived";

export type ReadingIndexItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;

  source: DocumentSource;
  canonicalUrl: string | null;
  canonical_url: string | null;
  internalPath: string;
  internal_path: string;

  author: string | null;
  language: string;
  status: "published";

  publishedAt: string | null;
  published_at: string | null;
  updatedAt: string;
  updated_at: string;

  topics: string[];

  wordCount: number | null;
  word_count: number | null;
  readingTimeMinutes: number | null;
  reading_time_minutes: number | null;
};

export type ReadingDocument = ReadingIndexItem & {
  bodyMarkdown: string;
  body_markdown: string;
  bodyText: string;
  body_text: string;
};

export type ReadingListParams = {
  query?: string | null;
  q?: string | null;
  source?: string | null;
  topic?: string | null;
  language?: string | null;
  page?: number | string | null;
  pageSize?: number | string | null;
};

export type ReadingListResult = {
  items: ReadingIndexItem[];
  documents: ReadingIndexItem[];

  total: number;
  totalCount: number;

  page: number;
  pageSize: number;
  totalPages: number;
  pageCount: number;

  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ReadingTopicSummary = {
  topic: string;
  value: string;
  label: string;
  count: number;
  href: string;
};

export type ReadingSourceSummary = {
  source: string;
  value: string;
  label: string;
  count: number;
  href: string;
};

export type ReadingFilterOption = {
  value: string;
  label: string;
  count?: number;
};

export type ReadingFilterOptions = {
  sources: ReadingFilterOption[];
  topics: ReadingFilterOption[];
  languages: ReadingFilterOption[];
};

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

const INDEX_SELECT = `
  id,
  slug,
  title,
  description,
  source,
  canonical_url,
  internal_path,
  author,
  language,
  status,
  published_at,
  updated_at,
  word_count,
  reading_time_minutes,
  document_topics(topic)
`;

const INDEX_SELECT_WITH_TOPIC_FILTER = `
  id,
  slug,
  title,
  description,
  source,
  canonical_url,
  internal_path,
  author,
  language,
  status,
  published_at,
  updated_at,
  word_count,
  reading_time_minutes,
  document_topics!inner(topic)
`;

const DOCUMENT_SELECT = `
  id,
  slug,
  title,
  description,
  body_markdown,
  body_text,
  source,
  canonical_url,
  internal_path,
  author,
  language,
  status,
  published_at,
  updated_at,
  word_count,
  reading_time_minutes,
  document_topics(topic)
`;

export async function getPublishedReadingDocuments(
  params: ReadingListParams = {},
): Promise<ReadingListResult> {
  const supabase = await createSupabaseServerClient();

  const page = normalizePage(params.page);
  const pageSize = normalizePageSize(params.pageSize);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const queryText = normalizeNullable(params.query ?? params.q);
  const source = normalizeNullable(params.source);
  const topic = normalizeTopicKey(params.topic);
  const language = normalizeNullable(params.language);

  const select = topic ? INDEX_SELECT_WITH_TOPIC_FILTER : INDEX_SELECT;

  let query = supabase
    .from("documents")
    .select(select, { count: "exact" })
    .eq("status", "published");

  if (queryText) {
    query = applySearchFilter(query, queryText);
  }

  if (source) {
    query = query.eq("source", source);
  }

  if (topic) {
    query = query.eq("document_topics.topic", topic);
  }

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error, count } = await query
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(`Failed to fetch reading documents: ${error.message}`);
  }

  return makeReadingListResult({
    items: (data ?? []).map(mapIndexRow),
    total: count ?? 0,
    page,
    pageSize,
  });
}

export async function getPublishedDocumentsByTopic(
  params: ReadingListParams & { topic: string },
): Promise<ReadingListResult> {
  return getPublishedReadingDocuments(params);
}

export const getPublishedReadingDocumentBySlug = cache(
  async (slug: string): Promise<ReadingDocument | null> => {
    const supabase = await createSupabaseServerClient();
    const normalizedSlug = normalizeSlug(slug);

    if (!normalizedSlug) {
      return null;
    }

    const { data, error } = await supabase
      .from("documents")
      .select(DOCUMENT_SELECT)
      .eq("slug", normalizedSlug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch reading document: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return mapDocumentRow(data);
  },
);

export const getPublishedDocumentBySlug = getPublishedReadingDocumentBySlug;

export const getPublishedReadingDocumentMetadataBySlug = cache(
  async (slug: string): Promise<ReadingIndexItem | null> => {
    const supabase = await createSupabaseServerClient();
    const normalizedSlug = normalizeSlug(slug);

    if (!normalizedSlug) {
      return null;
    }

    const { data, error } = await supabase
      .from("documents")
      .select(INDEX_SELECT)
      .eq("slug", normalizedSlug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to fetch reading document metadata: ${error.message}`,
      );
    }

    if (!data) {
      return null;
    }

    return mapIndexRow(data);
  },
);

export async function getAllPublishedDocumentSlugs(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("documents")
    .select("slug")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch published document slugs: ${error.message}`);
  }

  return (data ?? [])
    .map((row) => normalizeSlug(row.slug))
    .filter(Boolean) as string[];
}

export async function getReadingTopics(
  params: {
    source?: string | null;
    status?: DocumentStatus | "published";
  } = {},
): Promise<ReadingTopicSummary[]> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("documents")
    .select("document_topics(topic)")
    .eq("status", params.status ?? "published");

  if (params.source) {
    query = query.eq("source", params.source);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch reading topics: ${error.message}`);
  }

  const counts = new Map<string, number>();

  for (const row of data ?? []) {
    for (const item of normalizeRelationArray(row.document_topics)) {
      const topic = normalizeTopicKey(item.topic);

      if (!topic) {
        continue;
      }

      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([topic, count]) => ({
      topic,
      value: topic,
      label: formatTopicLabel(topic),
      count,
      href: `/reading/topic/${encodeURIComponent(topic)}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function getReadingTopicCounts(): Promise<ReadingTopicSummary[]> {
  return getReadingTopics();
}

export async function getReadingSources(): Promise<ReadingSourceSummary[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("documents")
    .select("source")
    .eq("status", "published");

  if (error) {
    throw new Error(`Failed to fetch reading sources: ${error.message}`);
  }

  const counts = new Map<string, number>();

  for (const row of data ?? []) {
    const source = normalizeNullable(row.source);

    if (!source) {
      continue;
    }

    counts.set(source, (counts.get(source) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([source, count]) => ({
      source,
      value: source,
      label: formatSourceLabel(source),
      count,
      href: `/reading/source/${encodeURIComponent(source)}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function getReadingLanguages(): Promise<ReadingFilterOption[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("documents")
    .select("language")
    .eq("status", "published");

  if (error) {
    throw new Error(`Failed to fetch reading languages: ${error.message}`);
  }

  const counts = new Map<string, number>();

  for (const row of data ?? []) {
    const language = normalizeNullable(row.language);

    if (!language) {
      continue;
    }

    counts.set(language, (counts.get(language) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([language, count]) => ({
      value: language,
      label: formatLanguageLabel(language),
      count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function getReadingFilterOptions(): Promise<ReadingFilterOptions> {
  const [sources, topics, languages] = await Promise.all([
    getReadingSources(),
    getReadingTopics(),
    getReadingLanguages(),
  ]);

  return {
    sources: sources.map(({ value, label, count }) => ({
      value,
      label,
      count,
    })),
    topics: topics.map(({ value, label, count }) => ({
      value,
      label,
      count,
    })),
    languages,
  };
}

export async function getReadingIndexData(params: ReadingListParams = {}) {
  const [documents, filterOptions] = await Promise.all([
    getPublishedReadingDocuments(params),
    getReadingFilterOptions(),
  ]);

  return {
    documents,
    filterOptions,
    topics: filterOptions.topics,
    sources: filterOptions.sources,
    languages: filterOptions.languages,
  };
}

export function parseReadingListParams(
  searchParams:
    | URLSearchParams
    | Record<string, string | string[] | undefined>
    | undefined,
): ReadingListParams {
  if (!searchParams) {
    return {};
  }

  if (searchParams instanceof URLSearchParams) {
    return {
      query: searchParams.get("q"),
      source: searchParams.get("source"),
      topic: searchParams.get("topic"),
      language: searchParams.get("language"),
      page: searchParams.get("page"),
      pageSize: searchParams.get("pageSize"),
    };
  }

  return {
    query: firstParam(searchParams.q),
    source: firstParam(searchParams.source),
    topic: firstParam(searchParams.topic),
    language: firstParam(searchParams.language),
    page: firstParam(searchParams.page),
    pageSize: firstParam(searchParams.pageSize),
  };
}

function makeReadingListResult({
  items,
  total,
  page,
  pageSize,
}: {
  items: ReadingIndexItem[];
  total: number;
  page: number;
  pageSize: number;
}): ReadingListResult {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    items,
    documents: items,

    total,
    totalCount: total,

    page,
    pageSize,
    totalPages,
    pageCount: totalPages,

    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

function applySearchFilter<QueryBuilder>(query: QueryBuilder, value: string) {
  const safeValue = sanitizeSearchValue(value);

  if (!safeValue) {
    return query;
  }

  const pattern = `%${safeValue}%`;

  return (query as any).or(
    [
      `title.ilike.${pattern}`,
      `description.ilike.${pattern}`,
      `body_text.ilike.${pattern}`,
      `author.ilike.${pattern}`,
      `source.ilike.${pattern}`,
    ].join(","),
  );
}

function mapIndexRow(row: any): ReadingIndexItem {
  const slug = String(row.slug);
  const internalPath = row.internal_path ?? `/reading/${slug}`;
  const canonicalUrl = row.canonical_url ?? null;
  const publishedAt = row.published_at ?? null;
  const updatedAt = row.updated_at ?? "";
  const wordCount = row.word_count ?? null;
  const readingTimeMinutes = row.reading_time_minutes ?? null;

  return {
    id: String(row.id),
    slug,
    title: String(row.title),
    description: row.description ?? null,

    source: row.source,
    canonicalUrl,
    canonical_url: canonicalUrl,
    internalPath,
    internal_path: internalPath,

    author: row.author ?? null,
    language: row.language ?? "en",
    status: "published",

    publishedAt,
    published_at: publishedAt,
    updatedAt,
    updated_at: updatedAt,

    topics: extractTopics(row.document_topics),

    wordCount,
    word_count: wordCount,
    readingTimeMinutes,
    reading_time_minutes: readingTimeMinutes,
  };
}

function mapDocumentRow(row: any): ReadingDocument {
  const bodyMarkdown = row.body_markdown ?? "";
  const bodyText = row.body_text ?? "";

  return {
    ...mapIndexRow(row),
    bodyMarkdown,
    body_markdown: bodyMarkdown,
    bodyText,
    body_text: bodyText,
  };
}

function extractTopics(value: unknown): string[] {
  return normalizeRelationArray(value)
    .map((item) => normalizeTopicKey(item.topic))
    .filter(Boolean)
    .sort() as string[];
}

function normalizeRelationArray(value: unknown): Array<Record<string, any>> {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return [value as Record<string, any>];
  }

  return [];
}

function normalizeNullable(value: unknown): string | null {
  const text = String(value ?? "").trim();
  return text || null;
}

function normalizeSlug(value: unknown): string | null {
  const text = normalizeNullable(value);

  if (!text) {
    return null;
  }

  return text
    .toLowerCase()
    .replace(/^\/reading\//, "")
    .replace(/^\/+|\/+$/g, "");
}

function normalizeTopicKey(value: unknown): string | null {
  const text = normalizeNullable(value);

  if (!text) {
    return null;
  }

  return text
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizePage(value: unknown): number {
  const page = Number.parseInt(String(value ?? "1"), 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return page;
}

function normalizePageSize(value: unknown): number {
  const pageSize = Number.parseInt(String(value ?? DEFAULT_PAGE_SIZE), 10);

  if (!Number.isFinite(pageSize) || pageSize < 1) {
    return DEFAULT_PAGE_SIZE;
  }

  return Math.min(pageSize, MAX_PAGE_SIZE);
}

function sanitizeSearchValue(value: string): string {
  return value
    .trim()
    .replace(/[,%]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function formatTopicLabel(topic: string): string {
  return topic
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatSourceLabel(source: string): string {
  const labels: Record<string, string> = {
    medium: "Medium",
    markdown: "Markdown",
    pdf: "PDF",
    manual: "Manual",
    imported_html: "Imported HTML",
  };

  return labels[source] ?? formatTopicLabel(source);
}

function formatLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    en: "English",
    fr: "French",
  };

  return labels[language] ?? language.toUpperCase();
}
