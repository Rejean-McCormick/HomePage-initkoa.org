import type { Metadata } from "next";
import Link from "next/link";

import { ReadingCard } from "@/components/reading/ReadingCard";
import { ReadingEmptyState } from "@/components/reading/ReadingEmptyState";
import { ReadingFilters } from "@/components/reading/ReadingFilters";
import { ReadingPagination } from "@/components/reading/ReadingPagination";
import {
  getPublishedReadingDocuments,
  getReadingTopics,
} from "@/lib/reading/queries";

const PAGE_SIZE = 20;

type TopicPageProps = {
  params: {
    topic: string;
  };
  searchParams?: {
    q?: string;
    source?: string;
    language?: string;
    page?: string;
  };
};

function normalizeTopicParam(topic: string) {
  return decodeURIComponent(topic).trim().toLowerCase();
}

function formatTopicLabel(topic: string) {
  return topic
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function parsePage(value?: string) {
  const page = Number(value);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const topic = normalizeTopicParam(params.topic);
  const label = formatTopicLabel(topic);

  return {
    title: `${label} | Reading | initkOA`,
    description: `Published reading documents about ${label}.`,
  };
}

export default async function ReadingTopicPage({
  params,
  searchParams,
}: TopicPageProps) {
  const topic = normalizeTopicParam(params.topic);
  const topicLabel = formatTopicLabel(topic);

  const query = searchParams?.q?.trim() || "";
  const source = searchParams?.source?.trim() || "";
  const language = searchParams?.language?.trim() || "";
  const page = parsePage(searchParams?.page);

  const [result, topicCounts] = await Promise.all([
    getPublishedReadingDocuments({
      topic,
      query,
      source,
      language,
      page,
      pageSize: PAGE_SIZE,
    }),
    getReadingTopics(),
  ]);

  const documents = result.items;
  const total = result.total;
  const totalPages = result.totalPages;

  const topicOptions = topicCounts.map((item) => ({
    value: item.topic,
    label: item.label,
    count: item.count,
  }));

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm">
          <Link href="/reading" className="text-slate-500 hover:text-slate-900">
            Reading
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900">{topicLabel}</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Topic
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            {topicLabel}
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Published reading documents assigned to the{" "}
            <span className="font-medium text-slate-900">{topic}</span> topic.
          </p>
        </div>
      </header>

      <ReadingFilters
        query={query}
        source={source}
        language={language}
        topic={topic}
        topics={topicOptions}
        action={`/reading/topic/${encodeURIComponent(topic)}`}
        showTopic={false}
      />

      {documents.length > 0 ? (
        <div className="space-y-6">
          <div className="text-sm text-slate-500">
            {total === 1 ? "1 document" : `${total} documents`}
          </div>

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

          <ReadingPagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/reading/topic/${encodeURIComponent(topic)}`}
            searchParams={{
              q: query,
              source,
              language,
            }}
          />
        </div>
      ) : (
        <ReadingEmptyState
          title={`No documents found for ${topicLabel}`}
          description={
            query || source || language
              ? "Try changing the search or filters."
              : "No published documents are currently assigned to this topic."
          }
          actionHref="/reading"
          actionLabel="Back to Reading"
        />
      )}
    </section>
  );
}