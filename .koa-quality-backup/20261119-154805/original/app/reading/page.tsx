// app/reading/page.tsx

import type { Metadata } from "next";

import { ReadingCard } from "@/components/reading/ReadingCard";
import { ReadingEmptyState } from "@/components/reading/ReadingEmptyState";
import { ReadingFilters } from "@/components/reading/ReadingFilters";
import { ReadingPagination } from "@/components/reading/ReadingPagination";
import { ReadingSearch } from "@/components/reading/ReadingSearch";
import {
  getPublishedReadingDocuments,
  getReadingSources,
  getReadingTopics,
} from "@/lib/reading/queries";

export const metadata: Metadata = {
  title: "Reading | initkOA",
  description: "Full-text documents, essays, notes, and articles from initkOA.",
};

export const revalidate = 300;

const PAGE_SIZE = 20;

type ReadingSearchParams = {
  q?: string | string[];
  source?: string | string[];
  topic?: string | string[];
  language?: string | string[];
  page?: string | string[];
};

type ReadingPageProps = {
  searchParams?: ReadingSearchParams;
};

function getParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getPage(value: string | string[] | undefined): number {
  const raw = getParam(value);
  const page = raw ? Number.parseInt(raw, 10) : 1;

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return page;
}

function normalizeFilterOptions(
  items: Array<{
    source?: string;
    topic?: string;
    label?: string;
    count?: number;
  }>,
) {
  return items
    .map((item) => {
      const value = item.source ?? item.topic;

      if (!value) {
        return null;
      }

      return {
        value,
        label: item.label ?? value,
        count: item.count,
      };
    })
    .filter(Boolean) as Array<{
    value: string;
    label: string;
    count?: number;
  }>;
}

export default async function ReadingIndexPage({
  searchParams,
}: ReadingPageProps) {
  const query = getParam(searchParams?.q)?.trim() || "";
  const source = getParam(searchParams?.source)?.trim() || "";
  const topic = getParam(searchParams?.topic)?.trim() || "";
  const language = getParam(searchParams?.language)?.trim() || "";
  const page = getPage(searchParams?.page);

  const [result, sources, topics] = await Promise.all([
    getPublishedReadingDocuments({
      query,
      source,
      topic,
      language,
      page,
      pageSize: PAGE_SIZE,
    }),
    getReadingSources(),
    getReadingTopics(),
  ]);

  const documents = result.items;
  const totalCount = result.total;
  const totalPages = result.totalPages;
  const hasFilters = Boolean(query || source || topic || language);

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Reading
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Full-text document library
          </h1>

          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Essays, notes, articles, and long-form documents stored in the
            reading database and rendered as accessible server-side pages.
          </p>
        </div>

        <ReadingSearch defaultValue={query} />

        <ReadingFilters
          query={query}
          source={source}
          topic={topic}
          language={language}
          sources={normalizeFilterOptions(sources)}
          topics={normalizeFilterOptions(topics)}
          action="/reading"
        />
      </header>

      <div className="flex items-center justify-between gap-4 border-y border-slate-200 py-4 text-sm text-slate-600">
        <p>
          {totalCount === 1
            ? "1 published document"
            : `${totalCount} published documents`}
        </p>

        {hasFilters ? (
          <a
            href="/reading"
            className="font-medium text-[#1e6864] underline-offset-4 hover:underline"
          >
            Clear filters
          </a>
        ) : null}
      </div>

      {documents.length > 0 ? (
        <div className="grid gap-5">
          {documents.map((document) => (
            <ReadingCard
              key={document.id}
              title={document.title}
              description={document.description}
              href={`/reading/${document.slug}`}
              source={document.source}
              language={document.language}
              publishedAt={document.publishedAt}
              topics={document.topics}
            />
          ))}
        </div>
      ) : (
        <ReadingEmptyState
          title={
            hasFilters
              ? "No documents match this search."
              : "No published documents found."
          }
          description={
            hasFilters
              ? "Try clearing the filters or using a broader search term."
              : "Import Markdown files into the reading database to populate this page."
          }
        />
      )}

      {totalPages > 1 ? (
        <ReadingPagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/reading"
          searchParams={{
            q: query || undefined,
            source: source || undefined,
            topic: topic || undefined,
            language: language || undefined,
          }}
        />
      ) : null}
    </section>
  );
}