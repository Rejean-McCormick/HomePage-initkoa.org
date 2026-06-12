const DEFAULT_EXCERPT_LENGTH = 180;

const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const FRONTMATTER_RE = /^---\s*[\s\S]*?\s*---\s*/;
const HTML_TAG_RE = /<[^>]+>/g;
const CODE_BLOCK_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`([^`]+)`/g;

export function stripFrontmatter(input: string) {
  return input.replace(FRONTMATTER_RE, "").trim();
}

export function markdownToPlainText(markdown: string) {
  return normalizeText(
    stripFrontmatter(markdown)
      .replace(CODE_BLOCK_RE, " ")
      .replace(MARKDOWN_IMAGE_RE, "$1")
      .replace(MARKDOWN_LINK_RE, "$1")
      .replace(INLINE_CODE_RE, "$1")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^>\s?/gm, "")
      .replace(/^[-*+]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      .replace(/[*_~]{1,3}/g, "")
      .replace(HTML_TAG_RE, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

export function normalizeText(input: string) {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \u00a0]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

export function getWordCount(input: string) {
  const text = normalizeText(input);

  if (!text) {
    return 0;
  }

  return text.split(/\s+/).filter(Boolean).length;
}

export function estimateReadingTimeMinutes(input: string, wordsPerMinute = 225) {
  const wordCount = getWordCount(input);

  if (wordCount === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function createExcerpt(
  input: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
) {
  const text = normalizeText(input).replace(/\n+/g, " ");

  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace <= 0) {
    return `${truncated}…`;
  }

  return `${truncated.slice(0, lastSpace).trim()}…`;
}

export function createDescriptionFromMarkdown(
  markdown: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
) {
  return createExcerpt(markdownToPlainText(markdown), maxLength);
}

export function estimateTokenCount(input: string) {
  const text = normalizeText(input);

  if (!text) {
    return 0;
  }

  return Math.ceil(text.length / 4);
}

export function createContentHashInput(input: string) {
  return normalizeText(input)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}