// app/sitemap/page.tsx
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

type Entry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
};

const BASE_URL = getSiteUrl();

function toDisplayDate(v?: string | Date) {
  if (!v) return null;
  const d = typeof v === "string" ? new Date(v) : v;
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toISOString().slice(0, 10);
}

function safeReadJson(): Entry[] {
  const jsonPath = path.join(process.cwd(), "public", "ai-sitemap.json");

  try {
    const raw = fs.readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as Entry[];

    return parsed
      .map((e) => {
        const u = e.url?.startsWith("http")
          ? e.url
          : `${BASE_URL}${e.url?.startsWith("/") ? "" : "/"}${e.url}`;

        return { ...e, url: u };
      })
      .filter((e) => typeof e.url === "string" && e.url.length > 0)
      .sort((a, b) => a.url.localeCompare(b.url));
  } catch {
    return [];
  }
}

export default function SitemapPage() {
  const entries = safeReadJson();

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1>Sitemap</h1>

      {entries.length === 0 ? (
        <p>
          Aucun fichier <code>public/ai-sitemap.json</code> trouvé (ou JSON
          invalide).
        </p>
      ) : (
        <>
          <p>{entries.length} URL(s)</p>
          <ul style={{ lineHeight: 1.65 }}>
            {entries.map((e) => (
              <li key={e.url}>
                <a href={e.url}>{e.url}</a>
                {e.lastModified ? (
                  <span> — {toDisplayDate(e.lastModified)}</span>
                ) : null}
                {typeof e.priority === "number" ? (
                  <span> — prio {e.priority.toFixed(2)}</span>
                ) : null}
                {e.changeFrequency ? <span> — {e.changeFrequency}</span> : null}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}