// app/reading/layout.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Reading | initkOA",
  description: "Full-text document library for initkOA.",
};

type ReadingLayoutProps = {
  children: ReactNode;
};

export default function ReadingLayout({ children }: ReadingLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
}