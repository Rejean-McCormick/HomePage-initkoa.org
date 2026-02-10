// app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

// Use ONE canonical base URL (match redirects / canonical tags)
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.initkoa.org"
).replace(/\/+$/, "");

// Next.js App Router: a folder is a routable page if it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

function isRouteGroup(seg: string): boolean {
  return seg.startsWith("(") && seg.endsWith(")");
}

function isDynamicSegment(seg: string): boolean {
  return seg.startsWith("[") && seg.endsWith("]");
}

// Intercepting routes look like "(.)foo", "(..)foo", "(...)foo", "(..)(..)foo"
function isInterceptingSegment(seg: string): boolean {
  return (
    seg.startsWith("(.)") ||
    seg.startsWith("(..)") ||
    seg.startsWith("(...") ||
    seg.startsWith("(..)(..)")
  );
}

// Skip hidden/private folders + dynamic segments + parallel routes + intercepting routes.
// NOTE: Route groups are NOT skipped; we traverse them but do not add them to the URL path.
function isSkippableSegment(seg: string): boolean {
  if (!seg) return true;
  if (seg.startsWith(".")) return true;
  if (seg.startsWith("_")) return true;

  // Parallel routes (@slot) should not become URL segments
  if (seg.startsWith("@")) return true;

  // Skip dynamic segments (prevents emitting non-concrete URLs)
  if (isDynamicSegment(seg)) return true;

  // Skip intercepting routes (prevents emitting non-canonical URLs)
  if (isInterceptingSegment(seg)) return true;

  return false;
}

function walkForRoutes(appDirAbs: string): string[] {
  const routes = new Set<string>();

  function walk(currentAbs: string, urlSegments: string[]) {
    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    // If this folder contains a page.* file, it maps to a URL path
    const hasPage = entries.some((e) => e.isFile() && PAGE_FILE_RE.test(e.name));
    if (hasPage) {
      const routePath = "/" + urlSegments.join("/");
      routes.add(routePath === "/" ? "/" : routePath);
    }

    // Recurse into subfolders
    for (const e of entries) {
      if (!e.isDirectory()) continue;

      const name = e.name;
      if (isSkippableSegment(name)) continue;

      // Route groups: traverse, but do NOT add to URL path
      const nextUrlSegments = isRouteGroup(name) ? urlSegments : [...urlSegments, name];

      walk(path.join(currentAbs, name), nextUrlSegments);
    }
  }

  walk(appDirAbs, []);
  return Array.from(routes).sort();
}

function depthOf(routePath: string): number {
  return routePath === "/" ? 0 : routePath.split("/").filter(Boolean).length;
}

function priorityFor(routePath: string): number {
  if (routePath === "/") return 1.0;

  // Boost key hubs
  const hubs = new Set([
    "/platforms",
    "/infrastructures",
    "/initiatives",
    "/principles",
    "/research",
    "/technology",
    "/kreature",
  ]);
  if (hubs.has(routePath)) return 0.9;

  // Depth-based fallback
  const d = depthOf(routePath);
  if (d === 1) return 0.8;
  if (d === 2) return 0.7;
  if (d === 3) return 0.64;
  if (d === 4) return 0.58;
  return 0.5;
}

function changeFrequencyFor(
  routePath: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  const d = depthOf(routePath);
  if (routePath === "/") return "weekly";
  if (d <= 1) return "weekly";
  return "monthly";
}

type AiSitemapEntry = {
  url: string; // absolute or path
  lastModified?: string | Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

function toAbsoluteUrl(u: string): string {
  if (u.startsWith("http://") || u.startsWith("https://")) {
    return u.replace(/\/+$/, "");
  }
  const p = u.startsWith("/") ? u : `/${u}`;
  return p === "/" ? BASE_URL : `${BASE_URL}${p}`;
}

function readAiSitemapIfPresent(): AiSitemapEntry[] | null {
  const file = path.join(process.cwd(), "public", "ai-sitemap.json");
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw) as AiSitemapEntry[];

  if (!Array.isArray(data)) return null;
  return data.filter((e) => e && typeof e.url === "string" && e.url.length > 0);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Prefer the generated ai-sitemap.json (your build already creates it)
  const ai = readAiSitemapIfPresent();
  if (ai) {
    return ai
      .map((e) => {
        const url = toAbsoluteUrl(e.url);

        // Avoid listing the human /sitemap page if it exists
        if (url === `${BASE_URL}/sitemap`) return null;

        return {
          url,
          lastModified: e.lastModified ?? now,
          changeFrequency: e.changeFrequency ?? "monthly",
          priority: typeof e.priority === "number" ? e.priority : 0.5,
        } satisfies MetadataRoute.Sitemap[number];
      })
      .filter(Boolean) as MetadataRoute.Sitemap;
  }

  // Fallback: scan /app for page.* routes
  const appDirAbs = path.join(process.cwd(), "app");
  const routePaths = walkForRoutes(appDirAbs);

  return routePaths
    .filter((p) => p !== "/sitemap") // avoid listing a human sitemap page, if present
    .map((routePath) => {
      const url = routePath === "/" ? BASE_URL : `${BASE_URL}${routePath}`;
      return {
        url,
        lastModified: now,
        changeFrequency: changeFrequencyFor(routePath),
        priority: priorityFor(routePath),
      };
    });
}
