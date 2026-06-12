// lib/reading/toc.ts

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type TocHeading = {
  id?: string | null;
  text: string;
  level: number;
};

const HEADING_LINE_RE = /^(#{1,6})\s+(.+?)\s*#*\s*$/gm;
const HTML_TAG_RE = /<[^>]+>/g;
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\([^)]+\)/g;
const MARKDOWN_INLINE_RE = /[*_~`]/g;
const NON_WORD_RE = /[^\p{L}\p{N}\s-]/gu;
const WHITESPACE_RE = /\s+/g;

export function slugifyHeading(value: string): string {
  return value
    .trim()
    .replace(HTML_TAG_RE, "")
    .replace(MARKDOWN_LINK_RE, "$1")
    .replace(MARKDOWN_INLINE_RE, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(NON_WORD_RE, "")
    .replace(WHITESPACE_RE, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function cleanHeadingText(value: string): string {
  return value
    .trim()
    .replace(HTML_TAG_RE, "")
    .replace(MARKDOWN_LINK_RE, "$1")
    .replace(MARKDOWN_INLINE_RE, "")
    .replace(/\s+/g, " ")
    .trim();
}

function makeUniqueId(baseId: string, seen: Map<string, number>): string {
  const fallback = "section";
  const normalizedBaseId = baseId || fallback;
  const count = seen.get(normalizedBaseId) ?? 0;

  seen.set(normalizedBaseId, count + 1);

  if (count === 0) {
    return normalizedBaseId;
  }

  return `${normalizedBaseId}-${count + 1}`;
}

export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const seen = new Map<string, number>();
  const items: TocItem[] = [];

  for (const match of markdown.matchAll(HEADING_LINE_RE)) {
    const marker = match[1];
    const rawText = match[2];

    if (!marker || !rawText) {
      continue;
    }

    const level = marker.length;
    const text = cleanHeadingText(rawText);

    if (!text) {
      continue;
    }

    const id = makeUniqueId(slugifyHeading(text), seen);

    items.push({
      id,
      text,
      level,
    });
  }

  return items;
}

export function normalizeTocHeadings(headings: TocHeading[]): TocItem[] {
  const seen = new Map<string, number>();

  return headings
    .filter((heading) => heading.text.trim().length > 0)
    .map((heading) => {
      const text = cleanHeadingText(heading.text);
      const baseId = heading.id ? slugifyHeading(heading.id) : slugifyHeading(text);

      return {
        id: makeUniqueId(baseId, seen),
        text,
        level: Math.min(Math.max(heading.level, 1), 6),
      };
    });
}

export function hasToc(items: TocItem[], minimumItems = 2): boolean {
  return items.length >= minimumItems;
}

export function getTocMinLevel(items: TocItem[]): number | null {
  if (items.length === 0) {
    return null;
  }

  return Math.min(...items.map((item) => item.level));
}

export function getTocMaxLevel(items: TocItem[]): number | null {
  if (items.length === 0) {
    return null;
  }

  return Math.max(...items.map((item) => item.level));
}