// app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

const BASE_URL = getSiteUrl();
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Never index these areas (even if they contain pages)
const EXCLUDED_PREFIXES = [
  "/admin",
  "/api",
  "/private",
  "/initiatives/ukraine-peace-plan",
  "/kreature",
];
// App Router: a folder is routable when it contains page.(tsx|ts|js|jsx|mdx|md)
const PAGE_FILES_PRIORITY = [
  "page.tsx",
  "page.ts",
  "page.js",
  "page.jsx",
  "page.mdx",
  "page.md",
] as const;

const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx|md)$/;

// Public machine-readable assets that should NOT live in the canonical human sitemap
const NON_CANONICAL_PUBLIC_PATHS = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/ai-corpus.txt",
  "/ai-sitemap.json",
  "/md-manifest.json",
  "/md-sitemap.xml",
]);

// Common non-route / internal folders people keep under app/
const SKIP_DIR_NAMES = new Set([
  "components",
  "lib",
  "utils",
  "styles",
  "fonts",
  "node_modules",
]);

type SitemapEntry = MetadataRoute.Sitemap[number];

type AiSitemapEntry = {
  route?: string;
  url?: string;
  lastModified?: string | Date;
  changeFrequency?: SitemapEntry["changeFrequency"];
  priority?: number;
};

type RouteScan = {
  routes: string[];
  lastModifiedByPathname: Map<string, Date>;
};

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

function normalizePathname(p: string): string {
  if (!p || p === "/") return "/";
  return ("/" + p.replace(/^\/+/, ""))
    .replace(/\/{2,}/g, "/")
    .replace(/\/+$/, "");
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

  // Skip common internal folders
  if (SKIP_DIR_NAMES.has(seg)) return true;

  return false;
}

function pickPageFile(fileNames: string[]): string | null {
  for (const name of PAGE_FILES_PRIORITY) {
    if (fileNames.includes(name)) return name;
  }
  return fileNames[0] ?? null;
}

function safeReadDir(absPath: string): fs.Dirent[] {
  try {
    return fs.readdirSync(absPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function safeStatMtime(absPath: string): Date | null {
  try {
    return fs.statSync(absPath).mtime;
  } catch {
    return null;
  }
}

function walkForRoutes(appDirAbs: string): RouteScan {
  const routes = new Set<string>();
  const lastModifiedByPathname = new Map<string, Date>();

  function walk(currentAbs: string, urlSegments: string[]) {
    const entries = safeReadDir(currentAbs);
    if (entries.length === 0) return;

    const pageFiles = entries
      .filter((e) => e.isFile() && PAGE_FILE_RE.test(e.name))
      .map((e) => e.name);

    // If this folder contains a page.* file, it maps to a URL path
    if (pageFiles.length > 0) {
      const routePath = normalizePathname("/" + urlSegments.join("/"));
      const pickedPageFile = pickPageFile(pageFiles);

      routes.add(routePath);

      if (pickedPageFile) {
        const mtime = safeStatMtime(path.join(currentAbs, pickedPageFile));
        if (mtime) {
          lastModifiedByPathname.set(routePath, mtime);
        }
      }
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

  return {
    routes: Array.from(routes).sort(),
    lastModifiedByPathname,
  };
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

function changeFrequencyFor(routePath: string): SitemapEntry["changeFrequency"] {
  const d = depthOf(routePath);
  if (routePath === "/") return "weekly";
  if (d <= 1) return "weekly";
  return "monthly";
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

  try {
    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw) as unknown;

    if (!Array.isArray(data)) return null;

    return (data as AiSitemapEntry[]).filter(
      (e) =>
        e &&
        (typeof (e as AiSitemapEntry).route === "string" ||
          typeof (e as AiSitemapEntry).url === "string")
    );
  } catch {
    return null;
  }
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
  fallbackLastModified: Map<string, Date>,
  now: Date
): Map<
  string,
  {
    lastModified: Date;
    changeFrequency?: SitemapEntry["changeFrequency"];
    priority?: number;
  }
> {
  const map = new Map<
    string,
    {
      lastModified: Date;
      changeFrequency?: SitemapEntry["changeFrequency"];
      priority?: number;
    }
  >();

  if (!ai) return map;

  for (const e of ai) {
    const pathname = entryToPathname(e);
    if (!pathname) continue;
    if (!isCanonicalHumanPathname(pathname)) continue;

    const fallback = fallbackLastModified.get(pathname) ?? now;

    map.set(pathname, {
      lastModified: parseLastModified(e.lastModified, fallback),
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
      changeFrequency?: SitemapEntry["changeFrequency"];
      priority?: number;
    }
  >;
  fallbackLastModifiedByPathname: Map<string, Date>;
} {
  const appDirAbs = path.join(process.cwd(), "app");
  const scanned = walkForRoutes(appDirAbs);
  const ai = readAiSitemapIfPresent();

  const fallbackLastModifiedByPathname = new Map<string, Date>();

  scanned.lastModifiedByPathname.forEach((mtime, pathname) => {
    if (isCanonicalHumanPathname(pathname)) {
      fallbackLastModifiedByPathname.set(pathname, mtime);
    }
  });

  const metaByPathname = buildRouteMetaMap(
    ai,
    fallbackLastModifiedByPathname,
    now
  );

  // Source of truth = union of real app routes + ai-sitemap entries.
  // This prevents ai-sitemap omissions from dropping valid pages out of the XML sitemap.
  const routes = new Set<string>();

  for (const route of scanned.routes) {
    const pathname = normalizePathname(route);
    if (isCanonicalHumanPathname(pathname)) {
      routes.add(pathname);
    }
  }

  if (ai) {
    for (const e of ai) {
      const pathname = entryToPathname(e);
      if (!pathname) continue;
      if (!isCanonicalHumanPathname(pathname)) continue;
      routes.add(pathname);
    }
  }

  return {
    routes: Array.from(routes).sort(),
    metaByPathname,
    fallbackLastModifiedByPathname,
  };
}

function pushEntry(
  out: MetadataRoute.Sitemap,
  seenUrls: Set<string>,
  entry: SitemapEntry
) {
  if (seenUrls.has(entry.url)) return;
  seenUrls.add(entry.url);
  out.push(entry);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const { routes, metaByPathname, fallbackLastModifiedByPathname } =
    collectCanonicalRoutes(now);

  const out: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  // Canonical human routes only
  for (const routePath of routes) {
    const meta = metaByPathname.get(routePath);
    const fallbackLastModified =
      fallbackLastModifiedByPathname.get(routePath) ?? now;

    pushEntry(out, seenUrls, {
      url: toCanonicalUrlFromPathname(routePath),
      lastModified: meta?.lastModified ?? fallbackLastModified,
      changeFrequency: meta?.changeFrequency ?? changeFrequencyFor(routePath),
      priority: meta?.priority ?? priorityFor(routePath),
    });
  }

  return out.sort((a, b) => a.url.localeCompare(b.url));
}
