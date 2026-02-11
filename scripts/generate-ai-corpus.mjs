// scripts/generate-ai-corpus.mjs
import fs from "node:fs";
import path from "node:path";

// --- Identity / branding (no more OkidoWiki) ---
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

// Prefer env-based canonical domain (works on Vercel previews too)
function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return (env || "http://localhost:3000").replace(/\/+$/, "");
}
const BASE_URL = getBaseUrl();

// Files to include
const PAGE_FILE_RE = /^page\.(mdx|tsx|ts|js|jsx)$/;

// Dirs / route segments to ignore (NOTE: we do NOT ignore route groups like (marketing))
const IGNORE_DIRS = new Set(["api", "components", "styles", "fonts", "public", "node_modules"]);

function isRouteGroupSegment(name) {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamicSegment(name) {
  return name.startsWith("[") && name.endsWith("]");
}

function isSkippableSegment(name) {
  if (!name) return true;
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith(".")) return true;
  if (name.startsWith("_")) return true;

  // IMPORTANT: route groups must be traversed (they don't appear in URL)
  // so we do NOT skip them here.
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

      if (e.isFile() && PAGE_FILE_RE.test(e.name)) {
        out.push(abs);
      }
    }
  }

  return out.sort((a, b) => a.localeCompare(b));
}

function stripRouteGroups(route) {
  // Remove segments like /(marketing)/ anywhere in the route
  return route.replace(/\/\([^/]+\)/g, "");
}

function normalizeDynamicSegments(route) {
  // /blog/[slug]/x -> /blog/:slug/x
  return route.replace(/\/\[([^\]/]+)\]/g, "/:$1");
}

function routeFromFilePath(filePathAbs) {
  // Normalize path separators for Windows
  let rel = filePathAbs.replace(APP_DIR, "");
  rel = rel.split(path.sep).join("/");

  // /about/page.tsx -> /about
  let route = rel.replace(/\/page\.(mdx|tsx|ts|js|jsx)$/, "");
  if (route === "") route = "/";

  route = stripRouteGroups(route);
  if (INCLUDE_DYNAMIC_SEGMENTS) route = normalizeDynamicSegments(route);

  // normalize double slashes (just in case)
  route = route.replace(/\/{2,}/g, "/");
  return route;
}

function truncate(text, maxChars) {
  if (!maxChars || maxChars <= 0) return text;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + " …";
}

function cleanContent(content) {
  return (
    content
      // remove frontmatter (MD/MDX)
      .replace(/^\s*---[\s\S]*?---\s*/m, "")
      // remove imports (best-effort, per-line)
      .replace(/^\s*import\s+[^;]+;\s*$/gm, "")
      // remove export metadata blocks (common in Next/MDX)
      .replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/g, "")
      // remove "use client"
      .replace(/^\s*["']use client["'];\s*$/gm, "")
      // remove JS/TS comments
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/^\s*\/\/.*$/gm, " ")
      // remove fenced code blocks (very token-heavy)
      .replace(/```[\s\S]*?```/g, " ")
      // remove inline code ticks but keep text
      .replace(/`([^`]+)`/g, "$1")
      // remove className="..."
      .replace(/\sclassName="[^"]*"/g, "")
      // remove JSX/HTML tags
      .replace(/<[^>]*>/g, " ")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

function generateCorpus() {
  console.log("🤖 Generating AI corpus...");
  console.log(`   🏷️  BRAND: ${SITE_BRAND}`);
  console.log(`   🧭 PROJECT: ${PROJECT_NAME}`);
  console.log(`   🌐 BASE_URL: ${BASE_URL}`);
  console.log(`   🧩 INCLUDE_DYNAMIC_SEGMENTS: ${INCLUDE_DYNAMIC_SEGMENTS}`);
  if (MAX_CHARS_PER_PAGE) console.log(`   ✂️  MAX_CHARS_PER_PAGE: ${MAX_CHARS_PER_PAGE}`);

  ensurePublicDir();

  const files = getAllPageFiles(APP_DIR);
  let corpus =
    `# ${SITE_BRAND.toUpperCase()} — AI CORPUS\n` +
    `# Project: ${PROJECT_NAME}\n` +
    `# Generated: ${new Date().toISOString()}\n` +
    `# Base URL: ${BASE_URL}\n` +
    `# Include dynamic segments: ${INCLUDE_DYNAMIC_SEGMENTS}\n` +
    (MAX_CHARS_PER_PAGE ? `# Max chars per page: ${MAX_CHARS_PER_PAGE}\n` : "") +
    `\n`;

  let totalChars = 0;
  let included = 0;

  for (const filePath of files) {
    const route = routeFromFilePath(filePath);
    const url = `${BASE_URL}${route}`;

    let content = "";
    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const cleaned = truncate(cleanContent(content), MAX_CHARS_PER_PAGE);
    if (!cleaned) continue;

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
  corpus += `# Total chars: ${totalChars}\n`;

  fs.writeFileSync(OUTPUT_FILE, corpus, "utf8");
  console.log(`✅ Wrote: ${OUTPUT_FILE} (${included}/${files.length} pages, ${totalChars} chars)`);
}

generateCorpus();
