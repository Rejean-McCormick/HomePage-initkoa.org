// scripts/generate-ai-assets.mjs
import fs from "node:fs";
import path from "node:path";

// -------------------- ENV / OPTIONS --------------------
const SITE_LABEL = process.env.AI_SITE_LABEL || "initkoa.org";
const PROJECT_TITLE = process.env.AI_PROJECT_TITLE || "kOA INITIATIVE";
const PROJECT_DESCRIPTION =
  process.env.AI_PROJECT_DESCRIPTION ||
  "Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).";

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

// default true: generate /foo.md and /index.html.md static mirrors
const GENERATE_MD_MIRRORS =
  (process.env.AI_GENERATE_MD_MIRRORS || "true").toLowerCase() === "true";

// default true: generate llms-full.txt aggregate
const GENERATE_LLMS_FULL =
  (process.env.AI_GENERATE_LLMS_FULL || "true").toLowerCase() === "true";

// default 60: ignore tiny/noise pages
const MIN_CHARS_PER_PAGE = Number(process.env.AI_MIN_CHARS_PER_PAGE || 60) || 60;

// default 0: unlimited
const MAX_CHARS_PER_PAGE = Number(process.env.AI_MAX_CHARS_PER_PAGE || 0) || 0;

// -------------------- PATHS --------------------
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const GENERATED_MD_STATE_FILE = path.join(PUBLIC_DIR, ".generated-md-mirrors.json");

// App Router: a folder is routable when it contains page.(tsx|ts|js|jsx|mdx|md)
const PAGE_FILES_PRIORITY = [
  "page.tsx",
  "page.ts",
  "page.js",
  "page.jsx",
  "page.mdx",
  "page.md",
];
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx|md)$/;

// Not pages (we ignore these)
const SPECIAL_FILE_RE =
  /^(layout|template|loading|error|global-error|not-found|default)\.(tsx|ts|js|jsx|mdx|md)$/;

// Common non-route folders people keep under app/
const SKIP_DIRS = new Set([
  "api",
  "components",
  "styles",
  "fonts",
  "lib",
  "utils",
  "public",
  "node_modules",
]);

// -------------------- URL / ROUTE HELPERS --------------------
function canonicalizeBaseUrl(raw) {
  if (!raw) return "https://initkoa.org";

  let s = String(raw).trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  s = s.replace(/\/+$/, "");

  try {
    const u = new URL(s);
    if (u.hostname === "www.initkoa.org") u.hostname = "initkoa.org";
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
  return ("/" + routePath.replace(/^\/+/, ""))
    .replace(/\/{2,}/g, "/")
    .replace(/\/+$/, "");
}

function routeToUrl(route) {
  return route === "/" ? BASE_URL : `${BASE_URL}${route}`;
}

// llms.txt proposal recommends same URL + .md; for home use index.html.md
function routeToMarkdownRelativePath(route) {
  if (route === "/") return "index.html.md";
  return `${route.replace(/^\/+/, "")}.md`;
}

function routeToMarkdownUrl(route) {
  const rel = routeToMarkdownRelativePath(route);
  return `${BASE_URL}/${rel}`;
}

function routeToMarkdownFilePath(route) {
  return path.join(PUBLIC_DIR, routeToMarkdownRelativePath(route));
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

function stripInterceptingPrefixFromSegment(seg) {
  return seg.replace(/^\(\.{1,3}\)/, "");
}

function shouldSkipDir(seg) {
  if (isPrivateSegment(seg)) return true;
  if (SKIP_DIRS.has(seg)) return true;
  if (isParallelRoute(seg)) return true;
  if (isDynamicSegment(seg)) return !INCLUDE_DYNAMIC_SEGMENTS;
  if (isRouteGroup(seg)) return false;
  return false;
}

// -------------------- TEXT / MARKDOWN HELPERS --------------------
function truncate(text, maxChars) {
  if (!maxChars || maxChars <= 0) return text;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + " …";
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeMarkdownText(s) {
  return String(s).replace(/([\\`*_{}\[\]()#+\-.!|>])/g, "\\$1");
}

function safeJsonRead(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeFileSafe(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text);
}

function removeFileIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.rmSync(filePath, { force: true });
  } catch {
    // ignore cleanup errors
  }
}

function cleanupOldGeneratedMirrors() {
  const oldFiles = safeJsonRead(GENERATED_MD_STATE_FILE, []);
  if (!Array.isArray(oldFiles)) return;

  for (const rel of oldFiles) {
    if (!rel || typeof rel !== "string") continue;
    removeFileIfExists(path.join(PUBLIC_DIR, rel));
  }
}

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
  const letters = (text.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  const punct = (text.match(/[{}()[\];<>]/g) || []).length;
  const kw =
    (text.match(
      /\b(const|let|var|function|return|export|import|type|interface|useState|useEffect|className)\b/g
    ) || []).length;

  const denom = Math.max(letters, 1);
  return (punct + kw * 8) / denom;
}

function stripCommonBoilerplate(source) {
  let s = source;

  // MD/MDX frontmatter
  s = s.replace(/^\s*---[\s\S]*?---\s*/m, "");

  // "use client"
  s = s.replace(/^\s*["']use client["'];\s*$/gm, "");

  // imports
  s = s.replace(/^\s*import\s+[\s\S]*?;?\s*$/gm, "");

  // common Next exports / metadata
  s = s
    .replace(/export\s+const\s+metadata[\s\S]*?\n\};?\s*/gm, "")
    .replace(/export\s+const\s+viewport[\s\S]*?\n\};?\s*/gm, "")
    .replace(/export\s+const\s+(revalidate|dynamic|runtime|preferredRegion)\s*=\s*[^;]+;?/g, "")
    .replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/gm, "");

  return s;
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanContent(raw, ext) {
  let s = String(raw || "").replace(/\r\n?/g, "\n");
  s = stripCommonBoilerplate(s);

  if (ext && [".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    s = extractLikelyRenderable(s);
  }

  // Remove fenced code blocks
  s = s.replace(/```[\s\S]*?```/g, "\n\n");

  // Remove block + line comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|\s)\/\/(?!\/).*$/gm, " ");

  // MD images/links -> keep visible text + URL
  s = s
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  // Convert some block boundaries before removing tags
  s = s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|main|header|footer|aside|nav|ul|ol|li|h1|h2|h3|h4|h5|h6|blockquote|pre)>/gi, "\n\n");

  // Keep simple string literal expressions: {"Hello"} -> Hello
  s = s.replace(/\{\s*["'`](.*?)["'`]\s*\}/gs, "$1");

  // Remove remaining { ... } blocks (often code / props / expressions)
  s = s.replace(/\{[\s\S]*?\}/g, " ");

  // Remove JSX/HTML tags
  s = s.replace(/<[^>]*>/g, " ");

  s = decodeHtmlEntities(s);

  // Normalize line-by-line to preserve paragraph structure
  s = s
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // If it still looks like one huge line, gently reflow punctuation
  if (!s.includes("\n")) {
    s = s.replace(/([.!?])\s+(?=[A-ZÀ-Ÿ])/g, "$1\n\n");
  }

  return s.trim();
}

function routeToTitle(route) {
  if (route === "/") return "Home";

  const last = route.split("/").filter(Boolean).at(-1) || "Page";
  return last
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (part.length <= 3) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function summarizeText(text, maxChars = 220) {
  const oneLine = String(text || "").replace(/\s+/g, " ").trim();
  if (oneLine.length <= maxChars) return oneLine;
  return oneLine.slice(0, maxChars).trim() + "…";
}

function buildMarkdownMirror({ route, url, markdownUrl, sourceRel, title, body, generatedAt }) {
  const cleanBody = body.trim();
  return [
    `# ${title}`,
    "",
    `> Canonical HTML: ${url}`,
    `> Markdown mirror: ${markdownUrl}`,
    `> Route: ${route}`,
    `> Source: ${sourceRel}`,
    `> Generated: ${generatedAt}`,
    "",
    `[Open the HTML page](${url})`,
    "",
    cleanBody,
    "",
  ].join("\n");
}

// -------------------- STATE --------------------
const pathsFound = new Map(); // route -> html url
const markdownUrlsFound = new Map(); // route -> md url
const sourceFilesForRoute = new Map(); // route -> abs path
const cleanedContentForRoute = new Map(); // route -> cleaned text
const markdownMirrorForRoute = new Map(); // route -> mirror markdown
const titlesForRoute = new Map(); // route -> title
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
  `# Generate markdown mirrors: ${GENERATE_MD_MIRRORS}\n` +
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

  if (pathsFound.has(route)) {
    warnings.push(
      `⚠ Duplicate route "${route}"\n   - Kept: ${sourceFilesForRoute.get(route)}\n   - Ignored: ${fileAbsPath}\n`
    );
    return;
  }

  const url = routeToUrl(route);
  const markdownUrl = routeToMarkdownUrl(route);
  const raw = fs.readFileSync(fileAbsPath, "utf8");
  const ext = path.extname(fileAbsPath).toLowerCase();
  const cleaned = truncate(cleanContent(raw, ext), MAX_CHARS_PER_PAGE);

  if (!cleaned || cleaned.length < MIN_CHARS_PER_PAGE) return;

  if (SKIP_CODELIKE_PAGES && codeLikenessScore(cleaned) > 0.12) return;

  const sourceRel = path.relative(process.cwd(), fileAbsPath);
  const title = routeToTitle(route);
  const mirrorMarkdown = buildMarkdownMirror({
    route,
    url,
    markdownUrl,
    sourceRel,
    title,
    body: cleaned,
    generatedAt: nowIso,
  });

  corpus += `==================================================\n`;
  corpus += `PAGE: ${route}\n`;
  corpus += `URL: ${url}\n`;
  corpus += `MARKDOWN_URL: ${markdownUrl}\n`;
  corpus += `SOURCE: ${sourceRel}\n`;
  corpus += `TITLE: ${title}\n`;
  corpus += `==================================================\n`;
  corpus += `${cleaned}\n\n`;

  pathsFound.set(route, url);
  markdownUrlsFound.set(route, markdownUrl);
  sourceFilesForRoute.set(route, fileAbsPath);
  cleanedContentForRoute.set(route, cleaned);
  markdownMirrorForRoute.set(route, mirrorMarkdown);
  titlesForRoute.set(route, title);
}

function walkForRoutes(appDirAbs) {
  function walk(currentAbs, segments) {
    if (!fs.existsSync(currentAbs)) return;

    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    const pageFiles = entries
      .filter((e) => e.isFile() && PAGE_FILE_RE.test(e.name))
      .map((e) => e.name);

    // Ignore special files silently
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

    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;

      if (shouldSkipDir(name)) continue;

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

// -------------------- GENERATORS --------------------
function writeMarkdownMirrors(sortedRoutes) {
  if (!GENERATE_MD_MIRRORS) return [];

  cleanupOldGeneratedMirrors();

  const generatedRelativePaths = [];

  for (const route of sortedRoutes) {
    const mdRel = routeToMarkdownRelativePath(route);
    const mdAbs = routeToMarkdownFilePath(route);
    const mdText = markdownMirrorForRoute.get(route) || "";

    writeFileSafe(mdAbs, mdText);
    generatedRelativePaths.push(mdRel);
  }

  writeFileSafe(
    GENERATED_MD_STATE_FILE,
    JSON.stringify(generatedRelativePaths, null, 2) + "\n"
  );

  return generatedRelativePaths;
}

function writeLlmsTxt(sortedRoutes) {
  const lines = [];
  lines.push(`# ${SITE_LABEL}`);
  lines.push("");
  lines.push(`> ${PROJECT_DESCRIPTION}`);
  lines.push("");
  lines.push("## Key resources");
  lines.push("");
  lines.push(`- [llms-full.txt](${BASE_URL}/llms-full.txt): Full aggregated AI context bundle.`);
  lines.push(`- [ai-corpus.txt](${BASE_URL}/ai-corpus.txt): Plain-text extracted corpus from app routes.`);
  lines.push(`- [md-manifest.json](${BASE_URL}/md-manifest.json): JSON index of HTML routes and Markdown mirrors.`);
  lines.push(`- [md-sitemap.xml](${BASE_URL}/md-sitemap.xml): Sitemap dedicated to Markdown mirror URLs.`);
  lines.push(`- [ai-sitemap.json](${BASE_URL}/ai-sitemap.json): Route inventory with source paths and mirror URLs.`);
  lines.push("");
  lines.push("## Pages");
  lines.push("");

  for (const route of sortedRoutes) {
    const title = titlesForRoute.get(route) || routeToTitle(route);
    const htmlUrl = pathsFound.get(route);
    const mdUrl = markdownUrlsFound.get(route);
    const summary = summarizeText(cleanedContentForRoute.get(route), 180);
    lines.push(`- [${title}](${mdUrl}): Mirror for ${route} (${htmlUrl}). ${summary}`);
  }

  lines.push("");
  return lines.join("\n");
}

function writeLlmsFull(sortedRoutes) {
  const lines = [];
  lines.push(`# ${SITE_LABEL} — Full AI Context`);
  lines.push("");
  lines.push(`Title: ${PROJECT_TITLE}`);
  lines.push(`Description: ${PROJECT_DESCRIPTION}`);
  lines.push(`Generated: ${nowIso}`);
  lines.push(`Base: ${BASE_URL}`);
  lines.push("");

  for (const route of sortedRoutes) {
    const title = titlesForRoute.get(route) || routeToTitle(route);
    lines.push("==================================================");
    lines.push(`TITLE: ${title}`);
    lines.push(`ROUTE: ${route}`);
    lines.push(`URL: ${pathsFound.get(route)}`);
    lines.push(`MARKDOWN_URL: ${markdownUrlsFound.get(route)}`);
    lines.push(`SOURCE: ${path.relative(process.cwd(), sourceFilesForRoute.get(route) || "")}`);
    lines.push("==================================================");
    lines.push(cleanedContentForRoute.get(route) || "");
    lines.push("");
  }

  return lines.join("\n");
}

function writeMdManifest(sortedRoutes) {
  const payload = sortedRoutes.map((route) => ({
    route,
    title: titlesForRoute.get(route) || routeToTitle(route),
    url: pathsFound.get(route),
    markdown_url: markdownUrlsFound.get(route),
    markdown_path: `/${routeToMarkdownRelativePath(route)}`,
    source: path.relative(process.cwd(), sourceFilesForRoute.get(route) || ""),
    chars: (cleanedContentForRoute.get(route) || "").length,
    generated_at: nowIso,
  }));

  return JSON.stringify(payload, null, 2) + "\n";
}

function writeMdSitemap(sortedRoutes) {
  const body = sortedRoutes
    .map((route) => {
      const mdUrl = markdownUrlsFound.get(route);
      return [
        "  <url>",
        `    <loc>${escapeXml(mdUrl)}</loc>`,
        `    <lastmod>${escapeXml(nowIso)}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    body,
    `</urlset>`,
    "",
  ].join("\n");
}

// -------------------- RUN --------------------
console.log("🤖 Generating AI assets...");
console.log(`   🌐 BASE_URL: ${BASE_URL}`);
console.log(`   🚫 EXCLUDE_PREFIXES: ${EXCLUDE_PREFIXES.join(", ") || "(none)"}`);
console.log(`   🧩 INCLUDE_DYNAMIC_SEGMENTS: ${INCLUDE_DYNAMIC_SEGMENTS}`);
console.log(`   🧽 SKIP_CODELIKE_PAGES: ${SKIP_CODELIKE_PAGES}`);
console.log(`   🪞 GENERATE_MD_MIRRORS: ${GENERATE_MD_MIRRORS}`);
console.log(`   📚 GENERATE_LLMS_FULL: ${GENERATE_LLMS_FULL}`);

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

// B) static Markdown mirrors
const generatedMdFiles = writeMarkdownMirrors(sortedRoutes);
if (GENERATE_MD_MIRRORS) {
  console.log(`   📄 Wrote markdown mirrors: ${generatedMdFiles.length}`);
}

// C) llms.txt
const llms = writeLlmsTxt(sortedRoutes);
writeFileSafe(path.join(PUBLIC_DIR, "llms.txt"), llms);
console.log(`   📄 Wrote: public/llms.txt`);

// D) llms-full.txt
if (GENERATE_LLMS_FULL) {
  const llmsFull = writeLlmsFull(sortedRoutes);
  writeFileSafe(path.join(PUBLIC_DIR, "llms-full.txt"), llmsFull);
  console.log(`   📄 Wrote: public/llms-full.txt`);
}

// E) ai-sitemap.json
const aiSitemap = sortedRoutes.map((route) => ({
  route,
  title: titlesForRoute.get(route) || routeToTitle(route),
  url: pathsFound.get(route),
  markdown_url: markdownUrlsFound.get(route),
  markdown_path: `/${routeToMarkdownRelativePath(route)}`,
  source: path.relative(process.cwd(), sourceFilesForRoute.get(route) || ""),
}));

writeFileSafe(
  path.join(PUBLIC_DIR, "ai-sitemap.json"),
  JSON.stringify(aiSitemap, null, 2) + "\n"
);
console.log(`   📄 Wrote: public/ai-sitemap.json`);

// F) md-manifest.json
writeFileSafe(path.join(PUBLIC_DIR, "md-manifest.json"), writeMdManifest(sortedRoutes));
console.log(`   📄 Wrote: public/md-manifest.json`);

// G) md-sitemap.xml
writeFileSafe(path.join(PUBLIC_DIR, "md-sitemap.xml"), writeMdSitemap(sortedRoutes));
console.log(`   📄 Wrote: public/md-sitemap.xml`);

console.log(`✅ Done. Pages included: ${sortedRoutes.length}`);