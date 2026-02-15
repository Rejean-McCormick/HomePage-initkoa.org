// scripts/generate-ai-assets.mjs
import fs from "node:fs";
import path from "node:path";

// -------------------- CONFIG --------------------
function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  // Prefer canonical public domain if nothing is set
  return (env || "https://www.initkoa.org").replace(/\/+$/, "");
}

const BASE_URL = getBaseUrl();
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const SITE_LABEL = "initkoa.org";
const PROJECT_TITLE = "kOA INITIATIVE";

// App Router: a folder is routable when it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILES_PRIORITY = ["page.tsx", "page.ts", "page.js", "page.jsx", "page.mdx"];
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

// Files that are NOT pages (but may live in route folders)
const SPECIAL_FILE_RE =
  /^(layout|template|loading|error|global-error|not-found|default)\.(tsx|ts|js|jsx|mdx)$/;

// -------------------- SEGMENT RULES --------------------
function isRouteGroup(seg) {
  // route groups: (group)
  return seg.startsWith("(") && seg.endsWith(")");
}

function isDynamicSegment(seg) {
  return seg.startsWith("[") && seg.endsWith("]");
}

function isParallelRoute(seg) {
  // parallel routes: @slot
  return seg.startsWith("@");
}

function isInterceptingRoute(seg) {
  // intercepting routes are also in parentheses, like (.) (..) (..)(..)
  // our isRouteGroup() already covers these, but keep this helper for readability
  return isRouteGroup(seg);
}

function isPrivateSegment(seg) {
  if (!seg) return true;
  if (seg.startsWith(".")) return true;
  if (seg.startsWith("_")) return true;
  return false;
}

function isSkippableDir(seg) {
  if (isPrivateSegment(seg)) return true;

  // Skip non-concrete URLs
  if (isDynamicSegment(seg)) return true;

  // Skip parallel routes entirely (they are not URL segments)
  if (isParallelRoute(seg)) return true;

  // Common non-route folders people keep under app/
  return ["api", "components", "styles", "fonts", "lib", "utils"].includes(seg);
}

function normalizeRoute(routePath) {
  if (!routePath || routePath === "/") return "/";
  // collapse multiple slashes + trim trailing slash (except root)
  return ("/" + routePath.replace(/^\/+/, "")).replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}

function routeToUrl(route) {
  return route === "/" ? BASE_URL : `${BASE_URL}${route}`;
}

// -------------------- STATE --------------------
const pathsFound = new Map(); // route -> url
const sourceFilesForRoute = new Map(); // route -> fileAbsPath (for debugging)
const warnings = [];

const nowIso = new Date().toISOString();
let fullCorpus =
  `# ${SITE_LABEL} — AI KNOWLEDGE BASE\n` +
  `# Date: ${nowIso}\n` +
  `# Base: ${BASE_URL}\n\n`;

// -------------------- HELPERS --------------------
function pickPageFile(fileNames) {
  for (const f of PAGE_FILES_PRIORITY) {
    if (fileNames.includes(f)) return f;
  }
  return fileNames[0];
}

function cleanForCorpus(content) {
  // Token-optimization heuristic. Keep readable text; remove boilerplate/noise.
  return (
    content
      // remove import lines (JS/TS + MDX)
      .replace(/^\s*import\s+[\s\S]*?;?\s*$/gm, "")
      // remove export blocks commonly found in app pages
      .replace(/export\s+const\s+metadata[\s\S]*?\n\};?\s*/m, "")
      .replace(/export\s+const\s+runtime[\s\S]*?;?\s*$/gm, "")
      .replace(/export\s+const\s+revalidate[\s\S]*?;?\s*$/gm, "")
      // strip obvious JSX tags but keep inner text where possible
      .replace(/<\/?([A-Za-z][A-Za-z0-9:-]*)(\s+[^>]*)?>/g, " ")
      // strip JS/TS comments (best-effort; avoid nuking URLs by being conservative)
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/(^|\s)\/\/(?!\/).*$/gm, " ")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

function writeFileSafe(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text);
}

function addPageToCorpus({ route, fileAbsPath }) {
  const fullUrl = routeToUrl(route);
  const content = fs.readFileSync(fileAbsPath, "utf8");
  const cleanText = cleanForCorpus(content);

  fullCorpus += `\n==================================================\n`;
  fullCorpus += `PAGE: ${route}\n`;
  fullCorpus += `URL: ${fullUrl}\n`;
  fullCorpus += `SOURCE: ${path.relative(process.cwd(), fileAbsPath)}\n`;
  fullCorpus += `==================================================\n`;
  fullCorpus += `${cleanText}\n\n`;

  // Dedupe route collisions (can happen with groups/intercepts/parallel slots)
  if (pathsFound.has(route)) {
    warnings.push(
      `⚠ Duplicate route "${route}" found.\n   - Kept: ${sourceFilesForRoute.get(route)}\n   - Ignored: ${fileAbsPath}\n`
    );
    return;
  }

  pathsFound.set(route, fullUrl);
  sourceFilesForRoute.set(route, fileAbsPath);
}

// -------------------- ROUTE WALK --------------------
function walkForRoutes(appDirAbs) {
  function walk(currentAbs, segments) {
    if (!fs.existsSync(currentAbs)) return;

    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    // Collect page.* file(s) at this level
    const pageFiles = entries
      .filter((e) => e.isFile() && PAGE_FILE_RE.test(e.name))
      .map((e) => e.name);

    // Ignore special files (layout, not-found, etc.)
    const specialFiles = entries
      .filter((e) => e.isFile() && SPECIAL_FILE_RE.test(e.name))
      .map((e) => e.name);
    if (specialFiles.length) {
      // Not an error; just useful when debugging why something appears missing
      // (we intentionally do nothing)
    }

    if (pageFiles.length > 0) {
      const routePath = "/" + segments.join("/");
      const normalizedRoute = normalizeRoute(routePath);

      if (pageFiles.length > 1) {
        const picked = pickPageFile(pageFiles);
        warnings.push(
          `⚠ Multiple page files for route "${normalizedRoute}": ${pageFiles.join(", ")}. Using "${picked}". Delete the others.`
        );
      }

      const picked = pickPageFile(pageFiles);
      const fileAbs = path.join(currentAbs, picked);
      addPageToCorpus({ route: normalizedRoute, fileAbsPath: fileAbs });
    }

    // Recurse into subfolders
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;

      if (isSkippableDir(name)) continue;

      // Route groups + intercepting segments: traverse, but do NOT add to URL path
      const nextSegments = isRouteGroup(name) || isInterceptingRoute(name) ? segments : [...segments, name];
      walk(path.join(currentAbs, name), nextSegments);
    }
  }

  walk(appDirAbs, []);
}

// -------------------- EXECUTION --------------------
console.log("🤖 Starting AI Assets Generation...");
console.log(`   🌐 BASE_URL: ${BASE_URL}`);

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

if (!fs.existsSync(APP_DIR)) {
  console.error(`❌ Missing app directory: ${APP_DIR}`);
  process.exit(1);
}

walkForRoutes(APP_DIR);

// Emit warnings (route collisions / multiple page.*)
for (const w of warnings) console.warn(w);

// Sort routes
const sortedRoutes = Array.from(pathsFound.keys()).sort((a, b) => a.localeCompare(b));

// A) Full corpus
const corpusPath = path.join(PUBLIC_DIR, "ai-corpus.txt");
writeFileSafe(corpusPath, fullCorpus);
console.log(`   📄 Generated: public/ai-corpus.txt (${(fullCorpus.length / 1024).toFixed(2)} KB)`);

// B) llms.txt
const llmsContent =
  `# ${SITE_LABEL} — AI Guide\n` +
  `Title: ${PROJECT_TITLE} documentation\n` +
  `Description: Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).\n\n` +
  `# Full Context (RAG optimized)\n` +
  `${BASE_URL}/ai-corpus.txt\n\n` +
  `# Pages Index\n` +
  `${sortedRoutes.map((r) => `- [${r}](${pathsFound.get(r)})`).join("\n")}\n`;

writeFileSafe(path.join(PUBLIC_DIR, "llms.txt"), llmsContent);
console.log("   📄 Generated: public/llms.txt");

// C) ai-sitemap.json
const json = sortedRoutes.map((r) => ({
  route: r,
  url: pathsFound.get(r),
  source: path.relative(process.cwd(), sourceFilesForRoute.get(r) || ""),
}));
writeFileSafe(path.join(PUBLIC_DIR, "ai-sitemap.json"), JSON.stringify(json, null, 2));
console.log("   📄 Generated: public/ai-sitemap.json");

console.log(`✅ Success! Processed ${sortedRoutes.length} pages.`);
