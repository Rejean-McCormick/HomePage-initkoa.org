// scripts/generate-ai-assets.mjs
import fs from "node:fs";
import path from "node:path";

// -------------------- ENV / OPTIONS --------------------
const SITE_LABEL = process.env.AI_SITE_LABEL || "initkoa.org";
const PROJECT_TITLE = process.env.AI_PROJECT_TITLE || "kOA INITIATIVE";

// Ex: "/admin,/api"
const EXCLUDE_PREFIXES = (process.env.AI_EXCLUDE_PREFIXES || "/admin,/api")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((p) =>
    p === "/"
      ? "/"
      : p.startsWith("/")
        ? p.replace(/\/+$/, "")
        : `/${p.replace(/\/+$/, "")}`
  );

// default false: skip /[slug] folders (non-concrete)
const INCLUDE_DYNAMIC_SEGMENTS =
  (process.env.AI_INCLUDE_DYNAMIC || "false").toLowerCase() === "true";

// default true: skip pages that still look like code after cleaning
const SKIP_CODELIKE_PAGES =
  (process.env.AI_SKIP_CODELIKE || "true").toLowerCase() === "true";

// default 60: ignore tiny/noise pages
const MIN_CHARS_PER_PAGE = Number(process.env.AI_MIN_CHARS_PER_PAGE || 60) || 60;

// default 0: unlimited
const MAX_CHARS_PER_PAGE = Number(process.env.AI_MAX_CHARS_PER_PAGE || 0) || 0;

// -------------------- PATHS --------------------
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// App Router: a folder is routable when it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILES_PRIORITY = ["page.tsx", "page.ts", "page.js", "page.jsx", "page.mdx"];
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

// Not pages (we ignore these)
const SPECIAL_FILE_RE =
  /^(layout|template|loading|error|global-error|not-found|default)\.(tsx|ts|js|jsx|mdx)$/;

// Common non-route folders people keep under app/
const SKIP_DIRS = new Set(["api", "components", "styles", "fonts", "lib", "utils", "public", "node_modules"]);

// -------------------- URL / ROUTE HELPERS --------------------
function canonicalizeBaseUrl(raw) {
  // Canonical public default
  if (!raw) return "https://initkoa.org";

  let s = String(raw).trim();

  // Add scheme if missing (e.g. VERCEL_URL)
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;

  // Remove trailing slashes
  s = s.replace(/\/+$/, "");

  try {
    const u = new URL(s);
    // Canonicalize www.initkoa.org -> initkoa.org
    if (u.hostname === "www.initkoa.org") u.hostname = "initkoa.org";
    // Force https for canonical
    u.protocol = "https:";
    return u.toString().replace(/\/+$/, "");
  } catch {
    return s
      .replace(/^https?:\/\/www\.initkoa\.org/i, "https://initkoa.org")
      .replace(/\/+$/, "");
  }
}

function getBaseUrl() {
  const env =
    process.env.AI_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? process.env.VERCEL_URL : "");

  return canonicalizeBaseUrl(env);
}

const BASE_URL = getBaseUrl();

function normalizeRoute(routePath) {
  if (!routePath || routePath === "/") return "/";
  return ("/" + routePath.replace(/^\/+/, "")).replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}

function routeToUrl(route) {
  return route === "/" ? BASE_URL : `${BASE_URL}${route}`;
}

function isExcludedRoute(route) {
  if (route === "/" && EXCLUDE_PREFIXES.includes("/")) return true;

  return EXCLUDE_PREFIXES.some((prefix) => {
    if (prefix === "/") return false;
    return route === prefix || route.startsWith(prefix + "/");
  });
}

// -------------------- SEGMENT RULES --------------------
function isRouteGroup(seg) {
  // route groups + intercepting route wrappers are both (...) forms
  return seg.startsWith("(") && seg.endsWith(")");
}

function isParallelRoute(seg) {
  return seg.startsWith("@");
}

function isDynamicSegment(seg) {
  return seg.startsWith("[") && seg.endsWith("]");
}

function isPrivateSegment(seg) {
  if (!seg) return true;
  if (seg.startsWith(".")) return true;
  if (seg.startsWith("_")) return true;
  return false;
}

// Remove intercepting prefixes when they appear in a segment like "(.)foo", "(..)foo", "(...)foo"
function stripInterceptingPrefixFromSegment(seg) {
  // seg could be "(.)foo" or "(..)foo" etc (rare in real trees, but supported)
  return seg.replace(/^\(\.{1,3}\)/, "");
}

function shouldSkipDir(seg) {
  if (isPrivateSegment(seg)) return true;
  if (SKIP_DIRS.has(seg)) return true;
  if (isParallelRoute(seg)) return true;

  // Dynamic segments are optional
  if (isDynamicSegment(seg)) return !INCLUDE_DYNAMIC_SEGMENTS;

  // route groups: DO NOT skip (we traverse, but they don't add to URL)
  if (isRouteGroup(seg)) return false;

  return false;
}

// -------------------- CORPUS CLEANING --------------------
function truncate(text, maxChars) {
  if (!maxChars || maxChars <= 0) return text;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + " …";
}

function extractLikelyRenderable(source) {
  // Best-effort: isolate JSX returned from a page component
  const returnIdx = source.search(/\breturn\b/);
  if (returnIdx === -1) return source;

  const start = source.indexOf("<", returnIdx);
  if (start === -1) return source;

  const end = source.lastIndexOf(">");
  if (end === -1 || end <= start) return source;

  return source.slice(start, end + 1);
}

function codeLikenessScore(text) {
  const letters = (text.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  const punct = (text.match(/[{}()[\];<>]/g) || []).length;
  const kw =
    (text.match(/\b(const|let|var|function|return|export|import|type|interface|useState|useEffect)\b/g) || [])
      .length;

  const denom = Math.max(letters, 1);
  return (punct + kw * 8) / denom;
}

function cleanContent(raw, ext) {
  let s = raw;

  // remove MD/MDX frontmatter
  s = s.replace(/^\s*---[\s\S]*?---\s*/m, "");

  // remove "use client"
  s = s.replace(/^\s*["']use client["'];\s*$/gm, "");

  // remove import lines (best-effort)
  s = s.replace(/^\s*import\s+[\s\S]*?;?\s*$/gm, "");

  // remove common Next exports / metadata blocks
  s = s
    .replace(/export\s+const\s+metadata[\s\S]*?\n\};?\s*/m, "")
    .replace(/export\s+const\s+viewport[\s\S]*?\n\};?\s*/m, "")
    .replace(/export\s+const\s+(revalidate|dynamic|runtime|preferredRegion)\s*=\s*[^;]+;?/g, "")
    .replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/g, "");

  // If it's JS/TS/TSX/JSX, try to isolate the JSX chunk
  if (ext && [".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    s = extractLikelyRenderable(s);
  }

  // Remove fenced code blocks (very token heavy)
  s = s.replace(/```[\s\S]*?```/g, " ");

  // Remove block + line comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|\s)\/\/(?!\/).*$/gm, " ");

  // MD links/images -> keep visible text + url
  s = s
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  // Keep simple string literal expressions: {"Hello"} -> Hello
  s = s.replace(/\{\s*["'`](.*?)["'`]\s*\}/gs, "$1");
  // Remove remaining { ... } blocks (often code)
  s = s.replace(/\{[\s\S]*?\}/g, " ");

  // Remove JSX/HTML tags
  s = s.replace(/<[^>]*>/g, " ");

  // collapse whitespace
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

// -------------------- STATE --------------------
const pathsFound = new Map(); // route -> url
const sourceFilesForRoute = new Map(); // route -> abs
const warnings = [];

const nowIso = new Date().toISOString();
let corpus =
  `# ${SITE_LABEL} — AI KNOWLEDGE BASE\n` +
  `# Title: ${PROJECT_TITLE}\n` +
  `# Date: ${nowIso}\n` +
  `# Base: ${BASE_URL}\n` +
  `# Excludes: ${EXCLUDE_PREFIXES.join(", ") || "(none)"}\n` +
  `# Include dynamic: ${INCLUDE_DYNAMIC_SEGMENTS}\n` +
  `# Skip code-like: ${SKIP_CODELIKE_PAGES}\n` +
  (MAX_CHARS_PER_PAGE ? `# Max chars per page: ${MAX_CHARS_PER_PAGE}\n` : "") +
  `\n`;

// -------------------- ROUTE WALK --------------------
function pickPageFile(fileNames) {
  for (const f of PAGE_FILES_PRIORITY) {
    if (fileNames.includes(f)) return f;
  }
  return fileNames[0];
}

function addPage({ route, fileAbsPath }) {
  if (isExcludedRoute(route)) return;

  // Dedupe route collisions early
  if (pathsFound.has(route)) {
    warnings.push(
      `⚠ Duplicate route "${route}"\n   - Kept: ${sourceFilesForRoute.get(route)}\n   - Ignored: ${fileAbsPath}\n`
    );
    return;
  }

  const url = routeToUrl(route);
  const raw = fs.readFileSync(fileAbsPath, "utf8");
  const ext = path.extname(fileAbsPath).toLowerCase();

  const cleaned = truncate(cleanContent(raw, ext), MAX_CHARS_PER_PAGE);
  if (!cleaned || cleaned.length < MIN_CHARS_PER_PAGE) return;

  if (SKIP_CODELIKE_PAGES) {
    // Heuristic threshold: above this, it’s probably code/UI glue not knowledge
    if (codeLikenessScore(cleaned) > 0.12) return;
  }

  corpus += `==================================================\n`;
  corpus += `PAGE: ${route}\n`;
  corpus += `URL: ${url}\n`;
  corpus += `SOURCE: ${path.relative(process.cwd(), fileAbsPath)}\n`;
  corpus += `==================================================\n`;
  corpus += `${cleaned}\n\n`;

  pathsFound.set(route, url);
  sourceFilesForRoute.set(route, fileAbsPath);
}

function walkForRoutes(appDirAbs) {
  function walk(currentAbs, segments) {
    if (!fs.existsSync(currentAbs)) return;

    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    // page.* file(s) at this level
    const pageFiles = entries
      .filter((e) => e.isFile() && PAGE_FILE_RE.test(e.name))
      .map((e) => e.name);

    // ignore special files (layout/not-found/etc)
    void entries.filter((e) => e.isFile() && SPECIAL_FILE_RE.test(e.name));

    if (pageFiles.length > 0) {
      const routePath = "/" + segments.join("/");
      const route = normalizeRoute(routePath);

      if (pageFiles.length > 1) {
        const picked = pickPageFile(pageFiles);
        warnings.push(
          `⚠ Multiple page files for "${route}": ${pageFiles.join(", ")}. Using "${picked}".`
        );
      }

      const picked = pickPageFile(pageFiles);
      addPage({ route, fileAbsPath: path.join(currentAbs, picked) });
    }

    // recurse
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;

      if (shouldSkipDir(name)) continue;

      // route groups: traverse, but do NOT add to URL
      // intercepting wrappers are also "(...)" — if you have "(.)foo" style, we strip prefix
      if (isRouteGroup(name)) {
        walk(path.join(currentAbs, name), segments);
        continue;
      }

      const cleanedSegment = stripInterceptingPrefixFromSegment(name);
      walk(path.join(currentAbs, name), [...segments, cleanedSegment]);
    }
  }

  walk(appDirAbs, []);
}

// -------------------- WRITE OUTPUTS --------------------
function writeFileSafe(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text);
}

console.log("🤖 Generating AI assets...");
console.log(`   🌐 BASE_URL: ${BASE_URL}`);
console.log(`   🚫 EXCLUDE_PREFIXES: ${EXCLUDE_PREFIXES.join(", ") || "(none)"}`);
console.log(`   🧩 INCLUDE_DYNAMIC_SEGMENTS: ${INCLUDE_DYNAMIC_SEGMENTS}`);
console.log(`   🧽 SKIP_CODELIKE_PAGES: ${SKIP_CODELIKE_PAGES}`);

if (!fs.existsSync(APP_DIR)) {
  console.error(`❌ Missing app directory: ${APP_DIR}`);
  process.exit(1);
}
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

walkForRoutes(APP_DIR);

// Emit warnings
for (const w of warnings) console.warn(w);

const sortedRoutes = Array.from(pathsFound.keys()).sort((a, b) => a.localeCompare(b));

// A) ai-corpus.txt
writeFileSafe(path.join(PUBLIC_DIR, "ai-corpus.txt"), corpus);
console.log(`   📄 Wrote: public/ai-corpus.txt (${(corpus.length / 1024).toFixed(2)} KB)`);

// B) llms.txt
const llms =
  `# ${SITE_LABEL} — AI Guide\n` +
  `Title: ${PROJECT_TITLE} documentation\n` +
  `Description: Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).\n\n` +
  `# Full Context (RAG optimized)\n` +
  `${BASE_URL}/ai-corpus.txt\n\n` +
  `# Pages Index\n` +
  `${sortedRoutes.map((r) => `- [${r}](${pathsFound.get(r)})`).join("\n")}\n`;

writeFileSafe(path.join(PUBLIC_DIR, "llms.txt"), llms);
console.log("   📄 Wrote: public/llms.txt");

// C) ai-sitemap.json
const sitemap = sortedRoutes.map((r) => ({
  route: r,
  url: pathsFound.get(r),
  source: path.relative(process.cwd(), sourceFilesForRoute.get(r) || ""),
}));

writeFileSafe(path.join(PUBLIC_DIR, "ai-sitemap.json"), JSON.stringify(sitemap, null, 2) + "\n");
console.log("   📄 Wrote: public/ai-sitemap.json");

console.log(`✅ Done. Pages included: ${sortedRoutes.length}`);
