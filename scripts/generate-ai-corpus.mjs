// scripts/generate-ai-corpus.mjs
import fs from "node:fs";
import path from "node:path";

// --- Identity / branding ---
const SITE_BRAND = process.env.AI_CORPUS_BRAND || "initkoa.org";
const PROJECT_NAME = process.env.AI_CORPUS_PROJECT || "kOA INITIATIVE";

// Configuration
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "ai-corpus.txt");

// Behavior toggles (safe defaults)
const INCLUDE_DYNAMIC_SEGMENTS =
  (process.env.AI_CORPUS_INCLUDE_DYNAMIC || "false").toLowerCase() === "true";

// If set, trims each page to max chars (token guardrail)
const MAX_CHARS_PER_PAGE =
  Number(process.env.AI_CORPUS_MAX_CHARS_PER_PAGE || 0) || 0;

// Minimum cleaned chars to keep a page (prevents tiny/noise pages)
const MIN_CHARS_PER_PAGE =
  Number(process.env.AI_CORPUS_MIN_CHARS_PER_PAGE || 60) || 60;

// Skip pages that still look like code after cleaning (recommended)
const SKIP_CODELIKE_PAGES =
  (process.env.AI_CORPUS_SKIP_CODELIKE || "true").toLowerCase() === "true";

// Exclude route prefixes (comma-separated). Defaults exclude admin tooling.
const EXCLUDE_PREFIXES = (process.env.AI_CORPUS_EXCLUDE_PREFIXES || "/admin,/api")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Prefer env-based canonical domain (works on Vercel previews too)
function getBaseUrl() {
  const env =
    process.env.AI_CORPUS_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return (env || "http://localhost:3000").replace(/\/+$/, "");
}
const BASE_URL = getBaseUrl();

// Files to include
const PAGE_FILE_RE = /^page\.(mdx|tsx|ts|js|jsx)$/;

// Dirs / route segments to ignore (we do NOT ignore route groups like (marketing))
const IGNORE_DIRS = new Set([
  "api",
  "components",
  "styles",
  "fonts",
  "public",
  "node_modules",
]);

function isRouteGroupSegment(name) {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamicSegment(name) {
  return name.startsWith("[") && name.endsWith("]");
}

function isParallelRouteSegment(name) {
  // Next.js parallel routes use @slot folders and do NOT map to URL segments
  return name.startsWith("@");
}

function isSkippableSegment(name) {
  if (!name) return true;
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith(".")) return true;
  if (name.startsWith("_")) return true;

  // Skip Next parallel route slot folders entirely
  if (isParallelRouteSegment(name)) return true;

  // IMPORTANT: route groups must be traversed (they don't appear in URL)
  if (isRouteGroupSegment(name)) return false;

  // Dynamic segments are optional
  if (isDynamicSegment(name)) return !INCLUDE_DYNAMIC_SEGMENTS;

  return false;
}

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function getAllPageFiles(dirAbs) {
  const out = [];
  const stack = [dirAbs];

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const e of entries) {
      const abs = path.join(current, e.name);

      if (e.isDirectory()) {
        if (!isSkippableSegment(e.name)) stack.push(abs);
        continue;
      }

      if (e.isFile() && PAGE_FILE_RE.test(e.name)) out.push(abs);
    }
  }

  return out.sort((a, b) => a.localeCompare(b));
}

function stripRouteGroups(route) {
  // Remove segments like /(marketing)/ anywhere in the route
  return route.replace(/\/\([^/]+\)/g, "");
}

function stripInterceptingPrefixes(route) {
  // Next intercepting routes can look like /(.)foo or /(..)foo or /(...)foo in folder names
  // They should not appear in URLs; remove the prefix portion.
  return route.replace(/\/\(\.{1,3}\)([^/]+)/g, "/$1");
}

function normalizeDynamicSegments(route) {
  // [slug] -> :slug
  route = route.replace(/\/\[([^\]/]+)\]/g, "/:$1");

  // [...slug] -> :slug*
  route = route.replace(/\/\[\.\.\.([^\]/]+)\]/g, "/:$1*");

  // [[...slug]] -> :slug?
  route = route.replace(/\/\[\[\.\.\.([^\]/]+)\]\]/g, "/:$1?");
  return route;
}

function routeFromFilePath(filePathAbs) {
  const rel = path.relative(APP_DIR, filePathAbs).split(path.sep).join("/");

  // "about/page.tsx" -> "/about"
  let route = "/" + rel.replace(/\/page\.(mdx|tsx|ts|js|jsx)$/, "");
  if (route === "/") route = "/";

  route = stripRouteGroups(route);
  route = stripInterceptingPrefixes(route);
  if (INCLUDE_DYNAMIC_SEGMENTS) route = normalizeDynamicSegments(route);

  // normalize double slashes
  route = route.replace(/\/{2,}/g, "/");
  return route;
}

function isExcludedRoute(route) {
  if (!route || typeof route !== "string") return true;
  return EXCLUDE_PREFIXES.some((p) => p && route.startsWith(p));
}

function truncate(text, maxChars) {
  if (!maxChars || maxChars <= 0) return text;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + " …";
}

// Try to keep only the renderable JSX chunk for TSX/JSX/JS/TS pages
function extractLikelyRenderable(source) {
  const returnIdx = source.search(/\breturn\b/);
  if (returnIdx === -1) return source;

  const start = source.indexOf("<", returnIdx);
  if (start === -1) return source;

  const end = source.lastIndexOf(">");
  if (end === -1 || end <= start) return source;

  return source.slice(start, end + 1);
}

function codeLikenessScore(text) {
  // heuristic: high punctuation + code keywords relative to letters => "code-like"
  const letters = (text.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  const punct = (text.match(/[{}()[\];<>]/g) || []).length;
  const kw = (text.match(/\b(const|let|var|function|return|export|import|type|interface|useState|useEffect)\b/g) || [])
    .length;

  const denom = Math.max(letters, 1);
  return (punct + kw * 8) / denom;
}

function cleanContent(content, ext) {
  let s = content;

  // remove frontmatter (MD/MDX)
  s = s.replace(/^\s*---[\s\S]*?---\s*/m, "");

  // remove imports (best-effort)
  s = s.replace(/^\s*import\s+[^;]+;\s*$/gm, "");

  // remove common Next export blocks
  s = s
    .replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/g, "")
    .replace(/export\s+const\s+viewport\s*=\s*\{[\s\S]*?\};/g, "")
    .replace(/export\s+const\s+(revalidate|dynamic|runtime|preferredRegion)\s*=\s*[^;]+;/g, "")
    .replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/g, "");

  // remove "use client"
  s = s.replace(/^\s*["']use client["'];\s*$/gm, "");

  // If it's JS/TS/TSX/JSX, attempt to isolate JSX
  if (ext && [".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    s = extractLikelyRenderable(s);
  }

  // MD links/images -> keep visible text + url
  s = s
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  // Strip JSX expressions, but keep simple string literal expressions
  // {"Hello"} -> Hello
  s = s.replace(/\{\s*["'`](.*?)["'`]\s*\}/gs, "$1");
  // Remove remaining { ... } blocks (often code)
  s = s.replace(/\{[\s\S]*?\}/g, " ");

  // remove JS/TS comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");

  // remove fenced code blocks (token-heavy)
  s = s.replace(/```[\s\S]*?```/g, " ");

  // remove inline code ticks but keep text
  s = s.replace(/`([^`]+)`/g, "$1");

  // remove className="..."
  s = s.replace(/\sclassName="[^"]*"/g, "");

  // remove JSX/HTML tags
  s = s.replace(/<[^>]*>/g, " ");

  // collapse whitespace
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

function generateCorpus() {
  console.log("🤖 Generating AI corpus...");
  console.log(`   🏷️  BRAND: ${SITE_BRAND}`);
  console.log(`   🧭 PROJECT: ${PROJECT_NAME}`);
  console.log(`   🌐 BASE_URL: ${BASE_URL}`);
  console.log(`   🧩 INCLUDE_DYNAMIC_SEGMENTS: ${INCLUDE_DYNAMIC_SEGMENTS}`);
  console.log(`   🚫 EXCLUDE_PREFIXES: ${EXCLUDE_PREFIXES.join(", ") || "(none)"}`);
  console.log(`   🧽 SKIP_CODELIKE_PAGES: ${SKIP_CODELIKE_PAGES}`);
  if (MAX_CHARS_PER_PAGE) console.log(`   ✂️  MAX_CHARS_PER_PAGE: ${MAX_CHARS_PER_PAGE}`);

  ensurePublicDir();

  const files = getAllPageFiles(APP_DIR);

  let corpus =
    `# ${SITE_BRAND.toUpperCase()} — AI CORPUS\n` +
    `# Project: ${PROJECT_NAME}\n` +
    `# Generated: ${new Date().toISOString()}\n` +
    `# Base URL: ${BASE_URL}\n` +
    `# Include dynamic segments: ${INCLUDE_DYNAMIC_SEGMENTS}\n` +
    `# Exclude prefixes: ${EXCLUDE_PREFIXES.join(", ") || "(none)"}\n` +
    (MAX_CHARS_PER_PAGE ? `# Max chars per page: ${MAX_CHARS_PER_PAGE}\n` : "") +
    `\n`;

  let totalChars = 0;
  let included = 0;
  let skippedExcluded = 0;
  let skippedEmpty = 0;
  let skippedCodelike = 0;

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const route = routeFromFilePath(filePath);

    if (isExcludedRoute(route)) {
      skippedExcluded += 1;
      continue;
    }

    const url = `${BASE_URL}${route}`;

    let raw = "";
    try {
      raw = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const cleaned = truncate(cleanContent(raw, ext), MAX_CHARS_PER_PAGE);
    if (!cleaned || cleaned.length < MIN_CHARS_PER_PAGE) {
      skippedEmpty += 1;
      continue;
    }

    if (SKIP_CODELIKE_PAGES) {
      const score = codeLikenessScore(cleaned);
      // Heuristic threshold: above this, it’s probably code/UI glue not knowledge
      if (score > 0.12) {
        skippedCodelike += 1;
        continue;
      }
    }

    included += 1;
    totalChars += cleaned.length;

    corpus += `\n==================================================\n`;
    corpus += `ROUTE: ${route}\n`;
    corpus += `URL: ${url}\n`;
    corpus += `SOURCE: ${filePath.replace(process.cwd(), "").split(path.sep).join("/")}\n`;
    corpus += `==================================================\n`;
    corpus += `${cleaned}\n\n`;
  }

  corpus += `\n# SUMMARY\n`;
  corpus += `# Files scanned: ${files.length}\n`;
  corpus += `# Pages included: ${included}\n`;
  corpus += `# Skipped (excluded route): ${skippedExcluded}\n`;
  corpus += `# Skipped (too short/empty): ${skippedEmpty}\n`;
  corpus += `# Skipped (code-like): ${skippedCodelike}\n`;
  corpus += `# Total chars: ${totalChars}\n`;

  fs.writeFileSync(OUTPUT_FILE, corpus, "utf8");
  console.log(`✅ Wrote: ${OUTPUT_FILE} (${included}/${files.length} pages, ${totalChars} chars)`);
}

generateCorpus();
