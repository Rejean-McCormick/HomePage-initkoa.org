// lib/reading/chunk.ts

export type ReadingChunk = {
  chunkIndex: number;
  heading: string | null;
  content: string;
  tokenEstimate: number;
  charCount: number;
  metadata: {
    wordCount: number;
    headingPath: string[];
  };
};

export type ChunkMarkdownOptions = {
  maxWords?: number;
  minWords?: number;
  includeHeadingInContent?: boolean;
};

type MarkdownSection = {
  heading: string | null;
  headingPath: string[];
  body: string;
};

const DEFAULT_MAX_WORDS = 1200;
const DEFAULT_MIN_WORDS = 80;

export function chunkMarkdown(
  markdown: string,
  options: ChunkMarkdownOptions = {},
): ReadingChunk[] {
  const maxWords = options.maxWords ?? DEFAULT_MAX_WORDS;
  const minWords = options.minWords ?? DEFAULT_MIN_WORDS;
  const includeHeadingInContent = options.includeHeadingInContent ?? true;

  const normalizedMarkdown = normalizeWhitespace(markdown);

  if (!normalizedMarkdown) {
    return [];
  }

  const sections = splitMarkdownByHeadings(normalizedMarkdown);

  const chunks: Omit<ReadingChunk, "chunkIndex">[] = [];

  for (const section of sections) {
    const sectionContent = buildSectionContent(section, includeHeadingInContent);
    const plainText = markdownToPlainText(sectionContent);

    if (!plainText) {
      continue;
    }

    const splitChunks = splitTextIntoWordChunks(plainText, maxWords);

    for (const content of splitChunks) {
      chunks.push({
        heading: section.heading,
        content,
        tokenEstimate: estimateTokens(content),
        charCount: content.length,
        metadata: {
          wordCount: countWords(content),
          headingPath: section.headingPath,
        },
      });
    }
  }

  return mergeSmallChunks(chunks, minWords, maxWords).map((chunk, index) => ({
    ...chunk,
    chunkIndex: index,
  }));
}

export function chunkPlainText(
  text: string,
  options: ChunkMarkdownOptions = {},
): ReadingChunk[] {
  const maxWords = options.maxWords ?? DEFAULT_MAX_WORDS;
  const minWords = options.minWords ?? DEFAULT_MIN_WORDS;

  const normalizedText = normalizeWhitespace(text);

  if (!normalizedText) {
    return [];
  }

  const rawChunks = splitTextIntoWordChunks(normalizedText, maxWords).map(
    (content) => ({
      heading: null,
      content,
      tokenEstimate: estimateTokens(content),
      charCount: content.length,
      metadata: {
        wordCount: countWords(content),
        headingPath: [],
      },
    }),
  );

  return mergeSmallChunks(rawChunks, minWords, maxWords).map((chunk, index) => ({
    ...chunk,
    chunkIndex: index,
  }));
}

function splitMarkdownByHeadings(markdown: string): MarkdownSection[] {
  const lines = markdown.split("\n");
  const sections: MarkdownSection[] = [];

  let currentHeading: string | null = null;
  let currentHeadingPath: string[] = [];
  let currentBody: string[] = [];
  const headingStack: { level: number; text: string }[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      flushSection();

      const level = headingMatch[1].length;
      const text = cleanMarkdownInline(headingMatch[2]);

      while (
        headingStack.length > 0 &&
        headingStack[headingStack.length - 1].level >= level
      ) {
        headingStack.pop();
      }

      headingStack.push({ level, text });

      currentHeading = text;
      currentHeadingPath = headingStack.map((heading) => heading.text);
      currentBody = [];

      continue;
    }

    currentBody.push(line);
  }

  flushSection();

  return sections.length > 0
    ? sections
    : [
        {
          heading: null,
          headingPath: [],
          body: markdown,
        },
      ];

  function flushSection() {
    const body = currentBody.join("\n").trim();

    if (!body && !currentHeading) {
      return;
    }

    sections.push({
      heading: currentHeading,
      headingPath: currentHeadingPath,
      body,
    });
  }
}

function buildSectionContent(
  section: MarkdownSection,
  includeHeadingInContent: boolean,
): string {
  if (!includeHeadingInContent || !section.heading) {
    return section.body;
  }

  return `${section.heading}\n\n${section.body}`.trim();
}

function splitTextIntoWordChunks(text: string, maxWords: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return [text.trim()];
  }

  const chunks: string[] = [];

  for (let index = 0; index < words.length; index += maxWords) {
    chunks.push(words.slice(index, index + maxWords).join(" "));
  }

  return chunks;
}

function mergeSmallChunks(
  chunks: Omit<ReadingChunk, "chunkIndex">[],
  minWords: number,
  maxWords: number,
): Omit<ReadingChunk, "chunkIndex">[] {
  const merged: Omit<ReadingChunk, "chunkIndex">[] = [];

  for (const chunk of chunks) {
    const previous = merged[merged.length - 1];

    if (
      previous &&
      chunk.metadata.wordCount < minWords &&
      previous.metadata.wordCount + chunk.metadata.wordCount <= maxWords
    ) {
      const content = `${previous.content}\n\n${chunk.content}`.trim();
      const headingPath =
        previous.metadata.headingPath.length > 0
          ? previous.metadata.headingPath
          : chunk.metadata.headingPath;

      merged[merged.length - 1] = {
        heading: previous.heading ?? chunk.heading,
        content,
        tokenEstimate: estimateTokens(content),
        charCount: content.length,
        metadata: {
          wordCount: countWords(content),
          headingPath,
        },
      };

      continue;
    }

    merged.push(chunk);
  }

  return merged;
}

export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/\|/g, " ")
    .replace(/-{3,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMarkdownInline(value: string): string {
  return markdownToPlainText(value).trim();
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function countWords(value: string): number {
  if (!value.trim()) {
    return 0;
  }

  return value.trim().split(/\s+/).length;
}

export function estimateTokens(value: string): number {
  const wordCount = countWords(value);

  /**
   * Rough English/French estimate.
   * Good enough for import metadata and chunk sizing.
   * Embedding jobs can calculate exact tokenizer counts later.
   */
  return Math.ceil(wordCount * 1.35);
}