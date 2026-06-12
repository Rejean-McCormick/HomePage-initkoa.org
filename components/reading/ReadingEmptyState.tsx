// components/reading/ReadingEmptyState.tsx

import Link from "next/link";
import type { ReactNode } from "react";

type ReadingEmptyStateProps = {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
};

export function ReadingEmptyState({
  title = "No documents found.",
  description = "There are no published reading documents matching this view.",
  actionHref = "/reading",
  actionLabel = "Back to reading",
  children,
}: ReadingEmptyStateProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="mx-auto max-w-md">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>

        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}

        {actionHref && actionLabel ? (
          <div className="mt-8">
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}