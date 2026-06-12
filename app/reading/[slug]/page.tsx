// app/reading/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReadingMetadata } from "@/components/reading/ReadingMetadata";
import { ReadingProse } from "@/components/reading/ReadingProse";
import { ReadingSourceLink } from "@/components/reading/ReadingSourceLink";
import { ReadingToc } from "@/components/reading/ReadingToc";
import { getPublishedReadingDocumentBySlug } from "@/lib/reading/queries";
import { renderMarkdownToHtml } from "@/lib/reading/markdown";
import { extractTocFromMarkdown } from "@/lib/reading/toc";

type ReadingDocumentPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: ReadingDocumentPageProps): Promise<Metadata> {
  const document = await getPublishedReadingDocumentBySlug(params.slug);

  if (!document) {
    return {
      title: "Document not found | Reading",
    };
  }

  const title = `${document.title} | Reading`;
  const description =
    document.description ??
    document.bodyText?.slice(0, 155) ??
    "A document from the reading library.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: document.publishedAt ?? undefined,
      modifiedTime: document.updatedAt ?? undefined,
      authors: document.author ? [document.author] : undefined,
    },
    alternates: document.canonicalUrl
      ? {
          canonical: document.canonicalUrl,
        }
      : undefined,
  };
}

export default async function ReadingDocumentPage({
  params,
}: ReadingDocumentPageProps) {
  const document = await getPublishedReadingDocumentBySlug(params.slug);

  if (!document) {
    notFound();
  }

  const html = await renderMarkdownToHtml(document.bodyMarkdown);
  const toc = extractTocFromMarkdown(document.bodyMarkdown);

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <ReadingMetadata
          source={document.source}
          author={document.author}
          language={document.language}
          publishedAt={document.publishedAt}
          updatedAt={document.updatedAt}
          topics={document.topics}
        />

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          {document.title}
        </h1>

        {document.description ? (
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {document.description}
          </p>
        ) : null}

        {document.canonicalUrl ? (
          <div className="mt-6">
            <ReadingSourceLink
              canonicalUrl={document.canonicalUrl}
              source={document.source}
            />
          </div>
        ) : null}
      </header>

      {toc.length > 0 ? (
        <aside className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <ReadingToc items={toc} />
        </aside>
      ) : null}

      <ReadingProse>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ReadingProse>
    </article>
  );
}