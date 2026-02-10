// app/sitemap.ts
import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

// Use ONE canonical base URL (match your redirects / canonical tags)
const BASE_URL = "https://www.initkoa.org";

// Next.js App Router: a folder is a routable page if it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

// If you want to include dynamic routes in the sitemap, remove the [] check below
function isSkippableSegment(seg: string): boolean {
  // Skip hidden/private folders
  if (!seg) return true;
  if (seg.startsWith(".")) return true;
  if (seg.startsWith("_")) return true;

  // Skip route groups and dynamic segments (prevents emitting non-concrete URLs)
  if ((seg.startsWith("(") && seg.endsWith(")")) || (seg.startsWith("[") && seg.endsWith("]")))
    return true;

  return false;
}

function walkForRoutes(appDirAbs: string): string[] {
  const routes = new Set<string>();

  function walk(currentAbs: string, segments: string[]) {
    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    // If this folder contains a page.* file, it maps to a URL path
    const hasPage = entries.some((e) => e.isFile() && PAGE_FILE_RE.test(e.name));
    if (hasPage) {
      const routePath = "/" + segments.join("/");
      routes.add(routePath === "/" ? "/" : routePath);
    }

    // Recurse into subfolders
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (isSkippableSegment(e.name)) continue;

      walk(path.join(currentAbs, e.name), [...segments, e.name]);
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

export default function sitemap(): MetadataRoute.Sitemap {
  // In Next.js, process.cwd() resolves to the project root (where /app lives)
  const appDirAbs = path.join(process.cwd(), "app");
  const routePaths = walkForRoutes(appDirAbs);

  const now = new Date();

  return routePaths.map((routePath) => {
    const url = routePath === "/" ? BASE_URL : `${BASE_URL}${routePath}`;
    return {
      url,
      lastModified: now,
      changeFrequency: changeFrequencyFor(routePath),
      priority: priorityFor(routePath),
    };
  });
}
