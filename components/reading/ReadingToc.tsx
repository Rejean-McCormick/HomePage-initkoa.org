// components/reading/ReadingToc.tsx

import Link from "next/link";

export type ReadingTocItem = {
  id: string;
  title: string;
  level: number;
};

type ReadingTocProps = {
  items: ReadingTocItem[];
  title?: string;
  minItems?: number;
  maxDepth?: number;
  className?: string;
};

function getIndentClass(level: number) {
  switch (level) {
    case 1:
    case 2:
      return "pl-0";
    case 3:
      return "pl-4";
    case 4:
      return "pl-8";
    case 5:
      return "pl-12";
    default:
      return "pl-16";
  }
}

function normalizeItems(items: ReadingTocItem[], maxDepth: number) {
  return items
    .filter((item) => item.id && item.title)
    .filter((item) => item.level <= maxDepth)
    .map((item) => ({
      ...item,
      title: item.title.trim(),
      level: Math.max(2, Math.min(item.level, 6)),
    }));
}

export function ReadingToc({
  items,
  title = "On this page",
  minItems = 2,
  maxDepth = 4,
  className = "",
}: ReadingTocProps) {
  const tocItems = normalizeItems(items, maxDepth);

  if (tocItems.length < minItems) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={[
        "rounded-2xl border border-slate-200 bg-slate-50/70 p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>

      <ol className="mt-4 space-y-2 text-sm">
        {tocItems.map((item) => (
          <li key={item.id} className={getIndentClass(item.level)}>
            <Link
              href={`#${item.id}`}
              className="block leading-6 text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}