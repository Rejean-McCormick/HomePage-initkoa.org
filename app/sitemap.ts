// app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const BASE_URL = getSiteUrl();
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Never index these areas (even if they contain pages)
const EXCLUDED_PREFIXES = ["/admin", "/api", "/private"];

// Next.js App Router: a folder is a routable page if it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

// Public machine-readable assets that should NOT live in the canonical human sitemap
const NON_CANONICAL_PUBLIC_PATHS = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/ai-corpus.txt",
  "/ai-sitemap.json",
  "/md-manifest.json",
  "/md-sitemap.xml",
]);

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

function isExcludedPathname(pathname: string): boolean {
  return EXCLUDED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

// Skip hidden/private folders + dynamic segments + parallel routes + intercepting routes + excluded roots.
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

  // Skip excluded top-level areas
  if (seg === "admin" || seg === "api" || seg === "private") return true;

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
      const nextUrlSegments = isRouteGroup(name)
        ? urlSegments
        : [...urlSegments, name];

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

// Supports BOTH shapes:
// 1) { url: "/about" } or { url: "https://..." }
// 2) { route: "/about", url?: "https://..." }
type AiSitemapEntry = {
  route?: string;
  url?: string;
  lastModified?: string | Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

function normalizePathname(p: string): string {
  const pathname = p.replace(/\/+$/, "") || "/";
  return pathname === "" ? "/" : pathname;
}

function toCanonicalUrlFromPathname(pathname: string): string {
  const p = normalizePathname(pathname);
  return p === "/" ? BASE_URL : `${BASE_URL}${p}`;
}

function entryToPathname(e: AiSitemapEntry): string | null {
  if (typeof e.route === "string" && e.route.length > 0) {
    return normalizePathname(e.route.startsWith("/") ? e.route : `/${e.route}`);
  }

  if (typeof e.url === "string" && e.url.length > 0) {
    // If it's an absolute URL, extract pathname; if it's a path, use it directly
    if (e.url.startsWith("http://") || e.url.startsWith("https://")) {
      try {
        return normalizePathname(new URL(e.url).pathname);
      } catch {
        return null;
      }
    }
    return normalizePathname(e.url.startsWith("/") ? e.url : `/${e.url}`);
  }

  return null;
}

function parseLastModified(
  x: AiSitemapEntry["lastModified"],
  fallback: Date
): Date {
  if (!x) return fallback;
  if (x instanceof Date) return x;
  const d = new Date(x);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

function readAiSitemapIfPresent(): AiSitemapEntry[] | null {
  const file = path.join(PUBLIC_DIR, "ai-sitemap.json");
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw) as unknown;

  if (!Array.isArray(data)) return null;

  return (data as AiSitemapEntry[]).filter(
    (e) =>
      e &&
      (typeof (e as AiSitemapEntry).route === "string" ||
        typeof (e as AiSitemapEntry).url === "string")
  );
}

function isMarkdownMirrorPathname(pathname: string): boolean {
  return pathname === "/index.html.md" || pathname.endsWith(".md");
}

function isMachineAssetPathname(pathname: string): boolean {
  return NON_CANONICAL_PUBLIC_PATHS.has(pathname);
}

function isCanonicalHumanPathname(pathname: string): boolean {
  if (!pathname) return false;
  if (pathname === "/sitemap") return false;
  if (isExcludedPathname(pathname)) return false;
  if (isMarkdownMirrorPathname(pathname)) return false;
  if (isMachineAssetPathname(pathname)) return false;

  // Keep the canonical sitemap focused on human HTML routes only.
  // Exclude other static file-like paths if they appear in ai-sitemap.json.
  if (pathname !== "/" && /\.(txt|xml|json)$/i.test(pathname)) return false;

  return true;
}

function buildRouteMetaMap(
  ai: AiSitemapEntry[] | null,
  now: Date
): Map<
  string,
  {
    lastModified: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  }
> {
  const map = new Map<
    string,
    {
      lastModified: Date;
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
    }
  >();

  if (!ai) return map;

  for (const e of ai) {
    const pathname = entryToPathname(e);
    if (!pathname) continue;
    if (!isCanonicalHumanPathname(pathname)) continue;

    map.set(pathname, {
      lastModified: parseLastModified(e.lastModified, now),
      changeFrequency: e.changeFrequency,
      priority: typeof e.priority === "number" ? e.priority : undefined,
    });
  }

  return map;
}

function collectCanonicalRoutes(now: Date): {
  routes: string[];
  metaByPathname: Map<
    string,
    {
      lastModified: Date;
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
    }
  >;
} {
  const ai = readAiSitemapIfPresent();
  const metaByPathname = buildRouteMetaMap(ai, now);

  if (ai && ai.length > 0) {
    const routes = Array.from(
      new Set(
        ai
          .map((e) => entryToPathname(e))
          .filter((p): p is string => Boolean(p))
          .filter((p) => isCanonicalHumanPathname(p))
      )
    ).sort();

    return { routes, metaByPathname };
  }

  // Fallback: scan /app for page.* routes
  const appDirAbs = path.join(process.cwd(), "app");
  const routes = walkForRoutes(appDirAbs)
    .map((p) => normalizePathname(p))
    .filter((p) => isCanonicalHumanPathname(p));

  return { routes, metaByPathname };
}

function pushEntry(
  out: MetadataRoute.Sitemap,
  seenUrls: Set<string>,
  entry: MetadataRoute.Sitemap[number]
) {
  if (seenUrls.has(entry.url)) return;
  seenUrls.add(entry.url);
  out.push(entry);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const { routes, metaByPathname } = collectCanonicalRoutes(now);

  const out: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  // Canonical human routes only
  for (const routePath of routes) {
    const meta = metaByPathname.get(routePath);

    pushEntry(out, seenUrls, {
      url: toCanonicalUrlFromPathname(routePath),
      lastModified: meta?.lastModified ?? now,
      changeFrequency: meta?.changeFrequency ?? changeFrequencyFor(routePath),
      priority: meta?.priority ?? priorityFor(routePath),
    });
  }

  return out.sort((a, b) => a.url.localeCompare(b.url));
}