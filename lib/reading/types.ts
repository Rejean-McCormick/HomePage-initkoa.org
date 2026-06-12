export const DOCUMENT_STATUSES = ["draft", "published", "archived"] as const;

export const DOCUMENT_SOURCES = [
  "markdown",
  "medium",
  "pdf",
  "manual",
  "imported_html",
] as const;

export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export type DocumentSource = (typeof DOCUMENT_SOURCES)[number];

export type ReadingTopic = {
  id: string;
  documentId: string;
  topic: string;
  label: string | null;
  createdAt: string;
};

export type ReadingChunk = {
  id: string;
  documentId: string;
  chunkIndex: number;
  heading: string | null;
  headingPath: string | null;
  content: string;
  tokenEstimate: number | null;
  charCount: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type ReadingDocument = {
  id: string;

  slug: string;
  title: string;
  description: string | null;

  bodyMarkdown: string;
  bodyText: string;

  source: DocumentSource;
  sourcePath: string | null;
  canonicalUrl: string | null;
  internalPath: string;

  author: string | null;
  language: string;
  status: DocumentStatus;

  publishedAt: string | null;

  wordCount: number | null;
  readingTimeMinutes: number | null;

  contentHash: string | null;
  metadata: Record<string, unknown>;

  createdAt: string;
  updatedAt: string;

  topics: ReadingTopic[];
};

export type ReadingIndexItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;

  source: DocumentSource;
  canonicalUrl: string | null;
  internalPath: string;

  author: string | null;
  language: string;
  status: "published";

  publishedAt: string | null;
  updatedAt: string;

  topics: string[];

  wordCount: number | null;
  readingTimeMinutes: number | null;
};

export type ReadingSearchParams = {
  q?: string;
  source?: DocumentSource | "";
  topic?: string;
  language?: string;
  page?: number;
  pageSize?: number;
};

export type ReadingListResult = {
  items: ReadingIndexItem[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export type ReadingFilterOption = {
  value: string;
  label: string;
  count?: number;
};

export type ReadingFiltersData = {
  sources: ReadingFilterOption[];
  topics: ReadingFilterOption[];
  languages: ReadingFilterOption[];
};

export type ReadingFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  published_at?: string;
  author?: string;
  source?: DocumentSource;
  language?: string;
  topics?: string[];
  status?: DocumentStatus;
  slug?: string;
  canonical_url?: string;
  canonicalUrl?: string;
};

export type ReadingImportInput = {
  title: string;
  description?: string | null;

  slug?: string;
  bodyMarkdown: string;
  bodyText: string;

  source: DocumentSource;
  sourcePath?: string | null;
  canonicalUrl?: string | null;

  author?: string | null;
  language?: string;
  status?: DocumentStatus;

  publishedAt?: string | null;

  topics?: string[];
  metadata?: Record<string, unknown>;
};

export type ReadingImportResult = {
  documentId: string | null;
  slug: string | null;
  title: string | null;
  action: "created" | "updated" | "skipped" | "failed";
  status: "success" | "warning" | "error";
  message?: string;
  error?: string;
};

export type ReadingImportRun = {
  id: string;
  importer: string;
  source: string;
  status: "running" | "success" | "partial_success" | "failed";

  startedAt: string;
  finishedAt: string | null;

  readCount: number;
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  errorCount: number;

  metadata: Record<string, unknown>;
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type ChunkInput = {
  bodyMarkdown: string;
  bodyText: string;
  maxWords?: number;
};

export type ChunkResult = {
  chunkIndex: number;
  heading: string | null;
  headingPath: string | null;
  content: string;
  tokenEstimate: number | null;
  metadata?: Record<string, unknown>;
};

export type MarkdownRenderResult = {
  html: string;
  toc: TocItem[];
};

export type DatabaseDocumentRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body_markdown: string;
  body_text: string;
  source: DocumentSource;
  source_path: string | null;
  canonical_url: string | null;
  internal_path: string;
  author: string | null;
  language: string;
  status: DocumentStatus;
  published_at: string | null;
  word_count: number | null;
  reading_time_minutes: number | null;
  content_hash: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type DatabaseTopicRow = {
  id: string;
  document_id: string;
  topic: string;
  label: string | null;
  created_at: string;
};

export type DatabaseChunkRow = {
  id: string;
  document_id: string;
  chunk_index: number;
  heading: string | null;
  heading_path: string | null;
  content: string;
  token_estimate: number | null;
  char_count: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export function isDocumentStatus(value: string): value is DocumentStatus {
  return DOCUMENT_STATUSES.includes(value as DocumentStatus);
}

export function isDocumentSource(value: string): value is DocumentSource {
  return DOCUMENT_SOURCES.includes(value as DocumentSource);
}