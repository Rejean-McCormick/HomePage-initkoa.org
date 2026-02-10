// scripts/generate-ai-corpus.mjs
import fs from "node:fs";
import path from "node:path";

// Configuration
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "ai-corpus.txt");

// Optional tuning
const MAX_CHARS_PER_PAGE = Number(process.env.AI_CORPUS_MAX_CHARS || 12000);
// By default we *exclude* parallel routes folders (e.g. @modal) from route computation & traversal
const INCLUDE_PARALLEL_ROUTES = process.env.AI_CORPUS_INCLUDE_PARALLEL === "1";

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

// Dirs to ignore during traversal
const IGNORE_DIRS = new Set([
  "api",
  "components",
  "styles",
  "fonts",
  "public",
  "node_modules",
]);

const isRouteGroup = (name) => name.startsWith("(") && name.endsWith(")");
const isDynamicSegment = (name) => name.startsWith("[") && name.endsWith("]");
const isParallelRoute = (name) => name.startsWith("@");

function shouldSkipDir(name) {
  if (!name) return true;
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith(".")) return true;
  if (name.startsWith("_")) return true;

  // IMPORTANT CHANGE:
  // - we DO traverse route groups (e.g. (marketing)) because they don't affect the URL
  // - we DO traverse dynamic segments (e.g. [slug]) because they may contain real pages
  // - we optionally skip parallel routes (e.g. @modal) to avoid noisy/duplicated content
  if (isParallelRoute(name) && !INCLUDE_PARALLEL_ROUTES) return true;

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
        if (!shouldSkipDir(e.name)) stack.push(abs);
        continue;
      }

      if (e.isFile() && PAGE_FILE_RE.test(e.name)) {
        out.push(abs);
      }
    }
  }

  return out.sort((a, b) => a.localeCompare(b));
}

function routeFromFilePath(filePathAbs) {
  // Relative to app/, normalize separators
  const rel = path.relative(APP_DIR, filePathAbs).split(path.sep).join("/");
  const parts = rel.split("/").filter(Boolean);

  // remove trailing page.xxx
  parts.pop();

  // Remove route groups from the URL path, and optionally parallel routes
  const urlParts = parts.filter((seg) => {
    if (isRouteGroup(seg)) return false;
    if (isParallelRoute(seg) && !INCLUDE_PARALLEL_ROUTES) return false;
    return true; // keep dynamic segments ([slug]) in ROUTE
  });

  const route = "/" + urlParts.join("/");
  return route === "/" ? "/" : route.replace(/\/+/g, "/");
}

function urlFromRoute(route) {
  // Make the URL a bit more readable for dynamic segments
  // [slug] -> :slug
  // [...slug] -> :slug*
  // [[...slug]] -> :slug*?
  let p = route;

  p = p.replace(/\[\[\.\.\.([^\]]+)\]\]/g, ":$1*?"); // optional catch-all
  p = p.replace(/\[\.\.\.([^\]]+)\]/g, ":$1*"); // catch-all
  p = p.replace(/\[([^\]]+)\]/g, ":$1"); // single segment

  return `${BASE_URL}${p}`;
}

function extractMeta(content) {
  // Very lightweight heuristics: frontmatter and/or exported metadata
  let title = "";
  let description = "";

  // Frontmatter (MDX)
  const fm = content.match(/^\s*---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (fm?.[1]) {
    const fmBody = fm[1];
    const t = fmBody.match(/^\s*title\s*:\s*(.+)\s*$/m);
    const d = fmBody.match(/^\s*(description|summary)\s*:\s*(.+)\s*$/m);
    if (t?.[1]) title = t[1].trim().replace(/^["']|["']$/g, "");
    if (d?.[2]) description = d[2].trim().replace(/^["']|["']$/g, "");
  }

  // Next.js metadata export (TS/JS)
  const md = content.match(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/);
  if (md?.[0]) {
    const block = md[0];
    const t = block.match(/\btitle\s*:\s*["'`](.+?)["'`]\s*,?/);
    const d = block.match(/\bdescription\s*:\s*["'`](.+?)["'`]\s*,?/);
    if (!title && t?.[1]) title = t[1].trim();
    if (!description && d?.[1]) description = d[1].trim();
  }

  return { title, description };
}

function cleanContent(content) {
  let s = content;

  // Remove MDX frontmatter
  s = s.replace(/^\s*---\s*\n[\s\S]*?\n---\s*\n?/g, "");

  // Remove imports + export metadata blocks
  s = s.replace(/^\s*import\s+[^;]+;\s*$/gm, "");
  s = s.replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/g, "");

  // Remove "use client"
  s = s.replace(/^\s*["']use client["'];\s*$/gm, "");

  // Remove JS/TS comments + JSX comments
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, " "); // JSX comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " "); // block comments
  s = s.replace(/(^|\s)\/\/.*$/gm, " "); // line comments (best-effort)

  // Remove common noisy JSX attributes
  s = s.replace(/\sclassName="[^"]*"/g, "");
  s = s.replace(/\sclassName=\{[^}]*\}/g, "");

  // Remove JSX expressions {...} (best-effort)
  s = s.replace(/\{[\s\S]*?\}/g, " ");

  // Markdown: images and links
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1"); // keep alt text
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // keep link label

  // Remove fenced code blocks, keep nothing (token saving)
  s = s.replace(/```[\s\S]*?```/g, " ");

  // Inline code: keep the inside
  s = s.replace(/`([^`]+)`/g, "$1");

  // Remove JSX/HTML tags
  s = s.replace(/<[^>]*>/g, " ");

  // Remove leftover markdown syntax (light touch)
  s = s.replace(/[#>*_~]+/g, " ");

  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();

  // Truncate (optional)
  if (MAX_CHARS_PER_PAGE > 0 && s.length > MAX_CHARS_PER_PAGE) {
    s = s.slice(0, MAX_CHARS_PER_PAGE).trim() + " … [TRUNCATED]";
  }

  return s;
}

function generateCorpus() {
  console.log("🤖 Generating AI corpus...");
  console.log(`   🌐 BASE_URL: ${BASE_URL}`);
  console.log(`   ✂️  MAX_CHARS_PER_PAGE: ${MAX_CHARS_PER_PAGE}`);
  console.log(`   🧩 INCLUDE_PARALLEL_ROUTES: ${INCLUDE_PARALLEL_ROUTES}`);

  ensurePublicDir();

  const files = getAllPageFiles(APP_DIR);

  let corpus =
    `# OKIDOWIKI AI CORPUS\n` +
    `# Generated: ${new Date().toISOString()}\n` +
    `# Base URL: ${BASE_URL}\n` +
    `# Pages: ${files.length}\n\n`;

  for (const filePath of files) {
    const route = routeFromFilePath(filePath);
    const url = urlFromRoute(route);

    let raw = "";
    try {
      raw = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const meta = extractMeta(raw);
    const cleaned = cleanContent(raw);

    corpus += `\n==================================================\n`;
    corpus += `ROUTE: ${route}\n`;
    corpus += `URL: ${url}\n`;
    corpus += `SOURCE: ${filePath
      .replace(process.cwd(), "")
      .split(path.sep)
      .join("/")}\n`;
    if (meta.title) corpus += `TITLE: ${meta.title}\n`;
    if (meta.description) corpus += `DESCRIPTION: ${meta.description}\n`;
    corpus += `==================================================\n`;
    corpus += `${cleaned}\n\n`;
  }

  fs.writeFileSync(OUTPUT_FILE, corpus, "utf8");
  console.log(`✅ Wrote: ${OUTPUT_FILE} (${files.length} pages)`);
}

generateCorpus();
