export type ReadingTimeInput = {
  bodyText?: string | null;
  bodyMarkdown?: string | null;
  wordsPerMinute?: number;
};

export type ReadingStats = {
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
  readingTimeLabel: string;
};

export const DEFAULT_WORDS_PER_MINUTE = 225;

/**
 * Returns reading stats from plain text or Markdown.
 *
 * Prefer bodyText when available because it should already be normalized
 * for search and AI workflows. Fall back to bodyMarkdown when needed.
 */
export function getReadingStats({
  bodyText,
  bodyMarkdown,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
}: ReadingTimeInput): ReadingStats {
  const text = normalizeReadingText(bodyText || markdownToReadableText(bodyMarkdown || ""));
  const wordCount = countWords(text);
  const charCount = text.length;
  const readingTimeMinutes = estimateReadingTimeMinutes(
    wordCount,
    wordsPerMinute,
  );

  return {
    wordCount,
    charCount,
    readingTimeMinutes,
    readingTimeLabel: formatReadingTime(readingTimeMinutes),
  };
}

export function estimateReadingTimeMinutes(
  wordCount: number,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
) {
  if (!Number.isFinite(wordCount) || wordCount <= 0) {
    return 0;
  }

  const safeWordsPerMinute =
    Number.isFinite(wordsPerMinute) && wordsPerMinute > 0
      ? wordsPerMinute
      : DEFAULT_WORDS_PER_MINUTE;

  return Math.max(1, Math.ceil(wordCount / safeWordsPerMinute));
}

export function formatReadingTime(minutes: number) {
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "Less than 1 min read";
  }

  if (minutes === 1) {
    return "1 min read";
  }

  return `${minutes} min read`;
}

export function countWords(value: string) {
  const text = normalizeReadingText(value);

  if (!text) {
    return 0;
  }

  const latinWordCount = text.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?:['’.-][A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*/g)
    ?.length ?? 0;

  const cjkCharCount = text.match(/[\u3400-\u9FFF\uF900-\uFAFF]/g)?.length ?? 0;

  /**
   * CJK languages do not always use spaces between words.
   * This rough divisor keeps mixed-language estimates usable without adding
   * a tokenizer dependency.
   */
  const estimatedCjkWords = Math.ceil(cjkCharCount / 2);

  return latinWordCount + estimatedCjkWords;
}

export function normalizeReadingText(value: string) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function markdownToReadableText(markdown: string) {
  return String(markdown || "")
    // Frontmatter
    .replace(/^---\s*[\s\S]*?\s*---\s*/m, " ")

    // Fenced code blocks
    .replace(/```[\s\S]*?```/g, " ")

    // Inline code
    .replace(/`([^`]+)`/g, "$1")

    // Images
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")

    // Links
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")

    // Reference-style links
    .replace(/^\[[^\]]+]:\s+\S+.*$/gm, " ")

    // Headings
    .replace(/^#{1,6}\s+/gm, "")

    // Blockquotes
    .replace(/^>\s?/gm, "")

    // Tables
    .replace(/^\s*\|?[-:| ]+\|[-:| ]+\|?\s*$/gm, " ")

    // HTML tags
    .replace(/<[^>]+>/g, " ")

    // Markdown emphasis / list markers
    .replace(/[*_~]/g, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")

    // Horizontal rules
    .replace(/^\s*---+\s*$/gm, " ")

    .replace(/\s+/g, " ")
    .trim();
}