// components/reading/ReadingProse.tsx

import type { ReactNode } from "react";

type ReadingProseProps = {
  children: ReactNode;
};

export function ReadingProse({ children }: ReadingProseProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-[#1e6864] prose-a:underline-offset-4 hover:prose-a:underline prose-img:rounded-lg prose-pre:overflow-x-auto">
      {children}
    </div>
  );
}