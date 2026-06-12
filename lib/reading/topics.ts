export type TopicKey = string;

export type TopicOption = {
  key: TopicKey;
  label: string;
  href: string;
};

export const TOPIC_ROUTE_BASE = "/reading/topic";

const TOPIC_SEPARATOR_PATTERN = /[,;|]/g;

const RESERVED_TOPIC_KEYS = new Set([
  "",
  "markdown",
  "md",
  "pdf",
  "medium",
  "medium_article",
  "article",
  "manual",
  "imported_html",
  "html",
]);

/**
 * Canonical topic keys should describe what a document is about,
 * not where it came from.
 *
 * Good:
 *   governance
 *   semantic_systems
 *   knowledge_infrastructure
 *
 * Bad:
 *   markdown
 *   pdf
 *   medium_article
 */
export function normalizeTopic(value: unknown): TopicKey | null {
  if (value === null || value === undefined) return null;

  const topic = String(value)
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_{2,}/g, "_");

  if (!topic) return null;
  if (RESERVED_TOPIC_KEYS.has(topic)) return null;

  return topic;
}

export function normalizeTopics(values: unknown): TopicKey[] {
  const rawTopics = flattenTopicInput(values);
  const normalized = rawTopics
    .map(normalizeTopic)
    .filter((topic): topic is TopicKey => Boolean(topic));

  return [...new Set(normalized)];
}

export function mergeTopics(...topicGroups: unknown[]): TopicKey[] {
  return normalizeTopics(topicGroups.flatMap(flattenTopicInput));
}

export function topicToLabel(topic: string): string {
  return topic
    .split("_")
    .filter(Boolean)
    .map(capitalize)
    .join(" ");
}

export function topicToHref(topic: string): string {
  const key = normalizeTopic(topic);

  if (!key) {
    throw new Error(`Invalid topic: ${topic}`);
  }

  return `${TOPIC_ROUTE_BASE}/${encodeURIComponent(key)}`;
}

export function topicToOption(topic: string): TopicOption | null {
  const key = normalizeTopic(topic);

  if (!key) return null;

  return {
    key,
    label: topicToLabel(key),
    href: topicToHref(key),
  };
}

export function topicsToOptions(topics: unknown): TopicOption[] {
  return normalizeTopics(topics)
    .sort(compareTopics)
    .map((topic) => ({
      key: topic,
      label: topicToLabel(topic),
      href: topicToHref(topic),
    }));
}

export function compareTopics(a: string, b: string): number {
  return topicToLabel(a).localeCompare(topicToLabel(b), "en", {
    sensitivity: "base",
  });
}

export function sortTopics(topics: unknown): TopicKey[] {
  return normalizeTopics(topics).sort(compareTopics);
}

export function isValidTopic(topic: unknown): topic is TopicKey {
  return normalizeTopic(topic) === topic;
}

export function hasTopic(topics: unknown, topic: unknown): boolean {
  const target = normalizeTopic(topic);

  if (!target) return false;

  return normalizeTopics(topics).includes(target);
}

export function removeTopic(topics: unknown, topicToRemove: unknown): TopicKey[] {
  const target = normalizeTopic(topicToRemove);

  if (!target) return normalizeTopics(topics);

  return normalizeTopics(topics).filter((topic) => topic !== target);
}

export function formatTopicList(
  topics: unknown,
  options: {
    emptyLabel?: string;
    separator?: string;
  } = {},
): string {
  const normalized = sortTopics(topics);

  if (!normalized.length) {
    return options.emptyLabel ?? "";
  }

  return normalized.map(topicToLabel).join(options.separator ?? " · ");
}

export function parseTopicParam(value: string | string[] | undefined): TopicKey | null {
  if (Array.isArray(value)) {
    return normalizeTopic(value[0]);
  }

  return normalizeTopic(value);
}

export function parseTopicsParam(value: string | string[] | undefined): TopicKey[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return normalizeTopics(value);
  }

  return normalizeTopics(value);
}

export function serializeTopicsForDb(topics: unknown): TopicKey[] {
  return sortTopics(topics);
}

export function deserializeTopicsFromDb(
  rows:
    | Array<{ topic: string | null }>
    | Array<string | null>
    | null
    | undefined,
): TopicKey[] {
  if (!rows) return [];

  return normalizeTopics(
    rows.map((row) => {
      if (typeof row === "string") return row;
      return row?.topic;
    }),
  );
}

function flattenTopicInput(value: unknown): string[] {
  if (value === null || value === undefined) return [];

  if (Array.isArray(value)) {
    return value.flatMap(flattenTopicInput);
  }

  if (typeof value === "string") {
    return value
      .replace(TOPIC_SEPARATOR_PATTERN, ",")
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean);
  }

  return [String(value)];
}

function capitalize(value: string): string {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
}