// components/reading/ReadingCard.tsx

import Link from "next/link";

export type ReadingCardProps = {
  title: string;
  description?: string | null;
  href: string;
  source?: string | null;
  language?: string | null;
  publishedAt?: string | null;
  topics?: string[];
  readingTimeMinutes?: number | null;
  wordCount?: number | null;
};

function formatDate(value?: string | null) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatSource(value?: string | null) {
  if (!value) return null;

  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ReadingCard({
  title,
  description,
  href,
  source,
  language,
  publishedAt,
  topics = [],
  readingTimeMinutes,
  wordCount,
}: ReadingCardProps) {
  const formattedDate = formatDate(publishedAt);
  const formattedSource = formatSource(source);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {formattedSource ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            {formattedSource}
          </span>
        ) : null}

        {language ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 uppercase text-slate-600">
            {language}
          </span>
        ) : null}

        {formattedDate ? <span>{formattedDate}</span> : null}

        {readingTimeMinutes ? (
          <span>
            {readingTimeMinutes} min read
          </span>
        ) : null}

        {!readingTimeMinutes && wordCount ? (
          <span>
            {wordCount.toLocaleString()} words
          </span>
        ) : null}
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        <Link href={href} className="hover:text-[#1e6864]">
          {title}
        </Link>
      </h2>

      {description ? (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}

      {topics.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <li key={topic}>
              <Link
                href={`/reading/topic/${encodeURIComponent(topic)}`}
                className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:border-slate-300 hover:text-slate-950"
              >
                {topic.replaceAll("_", " ")}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default ReadingCard;