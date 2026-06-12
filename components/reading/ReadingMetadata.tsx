import Link from "next/link";

export type ReadingMetadataProps = {
  source: string;
  language?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  topics?: string[];
  readingTimeMinutes?: number | null;
  wordCount?: number | null;
};

export function ReadingMetadata({
  source,
  language,
  author,
  publishedAt,
  updatedAt,
  topics = [],
  readingTimeMinutes,
  wordCount,
}: ReadingMetadataProps) {
  const visibleItems = [
    formatSource(source),
    language ? language.toUpperCase() : null,
    author ? `By ${author}` : null,
    publishedAt ? `Published ${formatDate(publishedAt)}` : null,
    !publishedAt && updatedAt ? `Updated ${formatDate(updatedAt)}` : null,
    readingTimeMinutes ? `${readingTimeMinutes} min read` : null,
    wordCount ? `${wordCount.toLocaleString()} words` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-4 text-sm text-slate-600">
      {visibleItems.length > 0 ? (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {visibleItems.map((item, index) => (
            <span key={`${item}-${index}`} className="leading-6">
              {item}
            </span>
          ))}
        </div>
      ) : null}

      {topics.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/reading/topic/${encodeURIComponent(topic)}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {formatTopic(topic)}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function formatSource(source: string) {
  const value = source.trim();

  if (!value) {
    return "Unknown source";
  }

  const labels: Record<string, string> = {
    markdown: "Markdown",
    medium: "Medium",
    pdf: "PDF",
    manual: "Manual",
    imported_html: "Imported HTML",
  };

  return labels[value] ?? titleCase(value.replace(/[_-]/g, " "));
}

function formatTopic(topic: string) {
  return topic.replace(/[_-]/g, " ");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function titleCase(value: string) {
  return value.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}