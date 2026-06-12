import {
  DOCUMENT_SOURCES,
  type DocumentSource,
  type ReadingSearchParams,
} from "./types";

export const DEFAULT_READING_PAGE = 1;
export const DEFAULT_READING_PAGE_SIZE = 20;
export const MAX_READING_PAGE_SIZE = 100;

export type NormalizedReadingSearchParams = {
  q: string;
  source: DocumentSource | "";
  topic: string;
  language: string;
  page: number;
  pageSize: number;
  offset: number;
};

export type ReadingSearchQueryParams = {
  q?: string | string[];
  source?: string | string[];
  topic?: string | string[];
  language?: string | string[];
  page?: string | string[] | number;
  pageSize?: string | string[] | number;
};

function firstValue(value: string | string[] | number | undefined): string {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  if (typeof value === "number") {
    return String(value);
  }

  return value ?? "";
}

export function normalizeSearchText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

export function normalizeTopic(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizeLanguage(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.trim();

  if (!normalized) {
    return "";
  }

  if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(normalized)) {
    return "";
  }

  return normalized;
}

export function normalizeSource(value: unknown): DocumentSource | "" {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.trim();

  if (DOCUMENT_SOURCES.includes(normalized as DocumentSource)) {
    return normalized as DocumentSource;
  }

  return "";
}

export function normalizePositiveInteger(
  value: unknown,
  fallback: number,
  options?: {
    min?: number;
    max?: number;
  },
): number {
  const min = options?.min ?? 1;
  const max = options?.max ?? Number.MAX_SAFE_INTEGER;

  const parsed =
    typeof value === "number"
      ? value
      : Number.parseInt(typeof value === "string" ? value : "", 10);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const integer = Math.floor(parsed);

  if (integer < min) {
    return min;
  }

  if (integer > max) {
    return max;
  }

  return integer;
}

export function normalizeReadingSearchParams(
  params: ReadingSearchParams | ReadingSearchQueryParams = {},
): NormalizedReadingSearchParams {
  const q = normalizeSearchText(firstValue(params.q));
  const source = normalizeSource(firstValue(params.source));
  const topic = normalizeTopic(firstValue(params.topic));
  const language = normalizeLanguage(firstValue(params.language));

  const page = normalizePositiveInteger(
    firstValue(params.page),
    DEFAULT_READING_PAGE,
    { min: 1 },
  );

  const pageSize = normalizePositiveInteger(
    firstValue(params.pageSize),
    DEFAULT_READING_PAGE_SIZE,
    {
      min: 1,
      max: MAX_READING_PAGE_SIZE,
    },
  );

  return {
    q,
    source,
    topic,
    language,
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
}

export function hasActiveReadingSearchFilters(
  params: Partial<NormalizedReadingSearchParams>,
): boolean {
  return Boolean(params.q || params.source || params.topic || params.language);
}

export function buildReadingSearchPath(
  pathname: string,
  params: Partial<ReadingSearchParams> = {},
): string {
  const normalized = normalizeReadingSearchParams(params);
  const searchParams = new URLSearchParams();

  if (normalized.q) {
    searchParams.set("q", normalized.q);
  }

  if (normalized.source) {
    searchParams.set("source", normalized.source);
  }

  if (normalized.topic) {
    searchParams.set("topic", normalized.topic);
  }

  if (normalized.language) {
    searchParams.set("language", normalized.language);
  }

  if (normalized.page > 1) {
    searchParams.set("page", String(normalized.page));
  }

  if (normalized.pageSize !== DEFAULT_READING_PAGE_SIZE) {
    searchParams.set("pageSize", String(normalized.pageSize));
  }

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function buildReadingPagePath(
  pathname: string,
  params: Partial<ReadingSearchParams>,
  page: number,
): string {
  return buildReadingSearchPath(pathname, {
    ...params,
    page,
  });
}

/**
 * Escapes a search string for safe use with Postgres websearch/plainto
 * style queries.
 *
 * This does not build raw SQL. Use it only as a parameter value for Supabase
 * `.textSearch(...)` or RPC calls.
 */
export function toPostgresSearchQuery(value: string): string {
  return normalizeSearchText(value)
    .replace(/[!'()|&:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Basic relevance fallback for client-side or test usage.
 * Database search should still use Postgres full-text search.
 */
export function documentMatchesSearchText(
  searchText: string,
  fields: Array<string | null | undefined>,
): boolean {
  const query = normalizeSearchText(searchText).toLowerCase();

  if (!query) {
    return true;
  }

  const haystack = fields
    .filter((field): field is string => typeof field === "string")
    .join(" ")
    .toLowerCase();

  return query
    .split(" ")
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function getPageCount(total: number, pageSize: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.ceil(total / pageSize);
}

export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) {
    return 1;
  }

  return Math.min(Math.max(page, 1), pageCount);
}

export function getPaginationRange(options: {
  page: number;
  pageCount: number;
  siblingCount?: number;
}): Array<number | "..."> {
  const { page, pageCount, siblingCount = 1 } = options;

  if (pageCount <= 0) {
    return [];
  }

  const totalVisible = siblingCount * 2 + 5;

  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1,
    );

    return [...leftRange, "...", pageCount];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRangeStart = pageCount - (2 + siblingCount * 2);
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => rightRangeStart + index,
    );

    return [1, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index,
  );

  return [1, "...", ...middleRange, "...", pageCount];
}