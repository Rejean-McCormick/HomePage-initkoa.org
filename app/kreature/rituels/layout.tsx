import type { ReactNode } from "react";

export default function OriginalContent({ children }: { children: ReactNode }) {
  return <div lang="fr">{children}</div>;
}
