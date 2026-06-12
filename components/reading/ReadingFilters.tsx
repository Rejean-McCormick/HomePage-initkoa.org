import Link from "next/link";

type FilterOption = {
  value: string;
  label?: string;
  count?: number;
};

type ReadingFiltersProps = {
  query?: string;
  source?: string;
  topic?: string;
  language?: string;

  sources?: FilterOption[];
  topics?: FilterOption[];
  languages?: FilterOption[];

  action?: string;
  className?: string;

  showSource?: boolean;
  showTopic?: boolean;
  showLanguage?: boolean;
};

const DEFAULT_SOURCES: FilterOption[] = [
  { value: "markdown", label: "Markdown" },
  { value: "medium", label: "Medium" },
  { value: "pdf", label: "PDF" },
  { value: "manual", label: "Manual" },
  { value: "imported_html", label: "Imported HTML" },
];

const DEFAULT_LANGUAGES: FilterOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "other", label: "Other" },
];

function formatOptionLabel(option: FilterOption) {
  const label = option.label ?? option.value;

  if (typeof option.count === "number") {
    return `${label} (${option.count})`;
  }

  return label;
}

export function ReadingFilters({
  query = "",
  source = "",
  topic = "",
  language = "",
  sources = DEFAULT_SOURCES,
  topics = [],
  languages = DEFAULT_LANGUAGES,
  action = "/reading",
  className = "",
  showSource = true,
  showTopic = true,
  showLanguage = true,
}: ReadingFiltersProps) {
  const hasActiveFilters = Boolean(query || source || topic || language);

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
      aria-labelledby="reading-filters-title"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="reading-filters-title"
            className="text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            Filter reading library
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Search published documents by title, body, topic, source, or
            language.
          </p>
        </div>

        {hasActiveFilters ? (
          <Link
            href={action}
            className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-950"
          >
            Clear filters
          </Link>
        ) : null}
      </div>

      <form action={action} method="get" className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-5">
          <label
            htmlFor="reading-query"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Search
          </label>
          <input
            id="reading-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search documents..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {showSource ? (
          <div className="md:col-span-2">
            <label
              htmlFor="reading-source"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Source
            </label>
            <select
              id="reading-source"
              name="source"
              defaultValue={source}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">All sources</option>
              {sources.map((option) => (
                <option key={option.value} value={option.value}>
                  {formatOptionLabel(option)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {showTopic ? (
          <div className="md:col-span-2">
            <label
              htmlFor="reading-topic"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Topic
            </label>
            <select
              id="reading-topic"
              name="topic"
              defaultValue={topic}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">All topics</option>
              {topics.map((option) => (
                <option key={option.value} value={option.value}>
                  {formatOptionLabel(option)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {showLanguage ? (
          <div className="md:col-span-2">
            <label
              htmlFor="reading-language"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Language
            </label>
            <select
              id="reading-language"
              name="language"
              defaultValue={language}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">All languages</option>
              {languages.map((option) => (
                <option key={option.value} value={option.value}>
                  {formatOptionLabel(option)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="flex items-end md:col-span-1">
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Apply
          </button>
        </div>
      </form>
    </section>
  );
}