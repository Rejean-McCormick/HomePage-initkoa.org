export const READING_BASE_PATH = "/reading" as const;

export const READING_ROUTES = {
  index: READING_BASE_PATH,
  document: (slug: string) => `${READING_BASE_PATH}/${slug}`,
  source: (source: string) => `${READING_BASE_PATH}/source/${source}`,
  topic: (topic: string) => `${READING_BASE_PATH}/topic/${topic}`,
} as const;

export const DOCUMENT_SOURCES = [
  "medium",
  "markdown",
  "pdf",
  "manual",
  "imported_html",
] as const;

export const DOCUMENT_STATUSES = [
  "draft",
  "published",
  "archived",
] as const;

export const PUBLIC_DOCUMENT_STATUS = "published" as const;

export const DEFAULT_DOCUMENT_SOURCE = "markdown" as const;
export const DEFAULT_DOCUMENT_STATUS = "draft" as const;
export const DEFAULT_DOCUMENT_LANGUAGE = "en" as const;

export const READING_IMPORT_DEFAULTS = {
  markdownDirectory: "content/reading-inbox",
  source: DEFAULT_DOCUMENT_SOURCE,
  status: DEFAULT_DOCUMENT_STATUS,
  language: DEFAULT_DOCUMENT_LANGUAGE,
} as const;

export const READING_SEARCH_DEFAULTS = {
  page: 1,
  pageSize: 20,
  maxPageSize: 100,
  searchConfig: "simple",
} as const;

export const READING_CHUNK_DEFAULTS = {
  minWords: 100,
  targetWords: 1000,
  maxWords: 1500,
  tokenEstimateRatio: 0.75,
} as const;

export const READING_SLUG_DEFAULTS = {
  maxLength: 96,
  collisionHashLength: 8,
} as const;

export const READING_TABLES = {
  documents: "documents",
  documentTopics: "document_topics",
  documentChunks: "document_chunks",
  importRuns: "import_runs",
  importItems: "import_items",
} as const;

export const READING_ENV_KEYS = {
  databaseUrl: "DATABASE_URL",
  supabaseUrl: "NEXT_PUBLIC_SUPABASE_URL",
  supabaseAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  supabaseServiceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
  readingImportDir: "READING_IMPORT_DIR",
} as const;

export const READING_QUERY_PARAMS = {
  query: "q",
  source: "source",
  topic: "topic",
  language: "language",
  page: "page",
} as const;

export const READING_SORT_OPTIONS = [
  "published_desc",
  "updated_desc",
  "title_asc",
] as const;

export const DEFAULT_READING_SORT = "published_desc" as const;

export const SOURCE_LABELS = {
  medium: "Medium",
  markdown: "Markdown",
  pdf: "PDF",
  manual: "Manual",
  imported_html: "Imported HTML",
} as const;

export const STATUS_LABELS = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
} as const;

export const LANGUAGE_LABELS = {
  en: "English",
  fr: "French",
  other: "Other",
} as const;

export const SOURCE_LIKE_TOPIC_KEYS = [
  "medium",
  "medium_article",
  "markdown",
  "md",
  "pdf",
  "manual",
  "imported_html",
] as const;

export const READING_EMPTY_MESSAGES = {
  noDocuments: "No published documents found.",
  noSearchResults: "No documents match this search.",
  noTopicResults: "No documents found for this topic.",
  noSourceResults: "No documents found for this source.",
  notPublished: "This document is not published.",
} as const;

export const READING_METADATA_DEFAULTS = {
  siteName: "initkOA Reading",
  description: "Full-text documents from the initkOA reading library.",
} as const;

export const READING_AI_INDEX_PATH = "/reading/ai-index.json" as const;

export const READING_PUBLIC_ARTIFACTS = {
  aiIndex: "/reading/ai-index.json",
  llms: "/llms.txt",
  aiCorpus: "/ai-corpus.txt",
  llmsFull: "/llms-full.txt",
  mdManifest: "/md-manifest.json",
  mdSitemap: "/md-sitemap.xml",
} as const;

export const VALID_CANONICAL_URL_PROTOCOLS = ["http:", "https:"] as const;

export type DocumentSource = (typeof DOCUMENT_SOURCES)[number];
export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];
export type ReadingSortOption = (typeof READING_SORT_OPTIONS)[number];

export function isDocumentSource(value: unknown): value is DocumentSource {
  return (
    typeof value === "string" &&
    DOCUMENT_SOURCES.includes(value as DocumentSource)
  );
}

export function isDocumentStatus(value: unknown): value is DocumentStatus {
  return (
    typeof value === "string" &&
    DOCUMENT_STATUSES.includes(value as DocumentStatus)
  );
}

export function isPublicDocumentStatus(
  value: unknown,
): value is typeof PUBLIC_DOCUMENT_STATUS {
  return value === PUBLIC_DOCUMENT_STATUS;
}

export function getSourceLabel(source: string) {
  if (isDocumentSource(source)) {
    return SOURCE_LABELS[source];
  }

  return titleCase(source.replaceAll("_", " "));
}

export function getStatusLabel(status: string) {
  if (isDocumentStatus(status)) {
    return STATUS_LABELS[status];
  }

  return titleCase(status.replaceAll("_", " "));
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}