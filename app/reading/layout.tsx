// app/reading/layout.tsx

import type { ReactNode } from "react";

// Metadata for individual routes lives with each route, not the shared layout.

type ReadingLayoutProps = {
  children: ReactNode;
};

export default function ReadingLayout({ children }: ReadingLayoutProps) {
  return (
    <main className="koa-reading min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
}