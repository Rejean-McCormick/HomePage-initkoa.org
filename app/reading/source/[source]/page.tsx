// app/reading/source/[source]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingCard } from "@/components/reading/ReadingCard";
import { ReadingEmptyState } from "@/components/reading/ReadingEmptyState";
import { ReadingFilters } from "@/components/reading/ReadingFilters";
import { ReadingPagination } from "@/components/reading/ReadingPagination";
import {
  getPublishedReadingDocuments,
  getReadingTopics,
} from "@/lib/reading/queries";
import type { DocumentSource } from "@/lib/reading/types";

const PAGE_SIZE = 20;

const VALID_SOURCES: DocumentSource[] = [
  "medium",
  "markdown",
  "pdf",
  "manual",
  "imported_html",
];

type SearchParamsValue = string | string[] | undefined;

type ReadingSourcePageProps = {
  params: {
    source: string;
  };
  searchParams?: {
    q?: SearchParamsValue;
    topic?: SearchParamsValue;
    language?: SearchParamsValue;
    page?: SearchParamsValue;
  };
};

function getParam(value: SearchParamsValue): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function normalizeSourceParam(source: string) {
  return decodeURIComponent(source).trim().toLowerCase();
}

function isValidSource(source: string): source is DocumentSource {
  return VALID_SOURCES.includes(source as DocumentSource);
}

function formatSourceLabel(source: string) {
  const labels: Record<string, string> = {
    medium: "Medium",
    markdown: "Markdown",
    pdf: "PDF",
    manual: "Manual",
    imported_html: "Imported HTML",
  };

  return (
    labels[source] ??
    source
      .replaceAll("_", " ")
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function parsePage(value: SearchParamsValue) {
  const raw = getParam(value);
  const page = raw ? Number.parseInt(raw, 10) : 1;

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export async function generateMetadata({
  params,
}: ReadingSourcePageProps): Promise<Metadata> {
  const source = normalizeSourceParam(params.source);

  if (!isValidSource(source)) {
    return {
      title: "Reading source not found",
    };
  }

  const sourceLabel = formatSourceLabel(source);

  return {
    title: `${sourceLabel} documents | Reading`,
    description: `Browse published ${sourceLabel.toLowerCase()} documents in the Reading library.`,
  };
}

export default async function ReadingSourcePage({
  params,
  searchParams,
}: ReadingSourcePageProps) {
  const source = normalizeSourceParam(params.source);

  if (!isValidSource(source)) {
    notFound();
  }

  const query = getParam(searchParams?.q)?.trim() || "";
  const topic = getParam(searchParams?.topic)?.trim() || "";
  const language = getParam(searchParams?.language)?.trim() || "";
  const page = parsePage(searchParams?.page);

  const [result, topics] = await Promise.all([
    getPublishedReadingDocuments({
      source,
      query,
      topic,
      language,
      page,
      pageSize: PAGE_SIZE,
    }),
    getReadingTopics(),
  ]);

  const sourceLabel = formatSourceLabel(source);
  const basePath = `/reading/source/${encodeURIComponent(source)}`;

  const topicOptions = topics.map((item) => ({
    value: item.topic,
    label: item.label,
    count: item.count,
  }));

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm text-slate-500">
          <Link href="/reading" className="hover:text-slate-900">
            Reading
          </Link>
          <span className="mx-2">/</span>
          <span>Source</span>
          <span className="mx-2">/</span>
          <span>{sourceLabel}</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Reading source
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            {sourceLabel} documents
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Published reading documents imported from{" "}
            <span className="font-medium text-slate-900">{sourceLabel}</span>.
          </p>
        </div>
      </header>

      <ReadingFilters
        query={query}
        topic={topic}
        language={language}
        topics={topicOptions}
        action={basePath}
        showSource={false}
      />

      {result.items.length > 0 ? (
        <div className="space-y-6">
          <div className="text-sm text-slate-500">
            {result.total === 1
              ? `1 ${sourceLabel.toLowerCase()} document`
              : `${result.total} ${sourceLabel.toLowerCase()} documents`}
          </div>

          <div className="grid gap-5">
            {result.items.map((document) => (
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

          <ReadingPagination
            currentPage={result.page}
            totalPages={result.totalPages}
            basePath={basePath}
            searchParams={{
              q: query || undefined,
              topic: topic || undefined,
              language: language || undefined,
            }}
          />
        </div>
      ) : (
        <ReadingEmptyState
          title={`No ${sourceLabel.toLowerCase()} documents found`}
          description={
            query || topic || language
              ? "No published documents match the current filters."
              : `There are no published documents from the ${sourceLabel.toLowerCase()} source yet.`
          }
          actionHref="/reading"
          actionLabel="View all reading"
        />
      )}
    </section>
  );
}