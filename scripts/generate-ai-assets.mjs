// scripts/generate-ai-assets.mjs
import fs from "node:fs";
import path from "node:path";

// -------------------- CONFIG --------------------
function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  // If nothing is set (CI misconfig / local), prefer the canonical public domain
  return (env || "https://www.initkoa.org").replace(/\/+$/, "");
}

const BASE_URL = getBaseUrl();
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const SITE_LABEL = "initkoa.org";
const PROJECT_TITLE = "kOA INITIATIVE";

// Next.js App Router: a folder is routable when it contains page.(tsx|ts|js|jsx|mdx)
const PAGE_FILES_PRIORITY = ["page.tsx", "page.ts", "page.js", "page.jsx", "page.mdx"];
const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx)$/;

function isRouteGroup(seg) {
  return seg.startsWith("(") && seg.endsWith(")");
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

function isSkippableDir(seg) {
  if (isPrivateSegment(seg)) return true;
  if (isDynamicSegment(seg)) return true; // skip non-concrete URLs
  // note: route groups are NOT skipped; we traverse them but do not add to URL
  return ["api", "components", "styles", "fonts"].includes(seg);
}

// -------------------- STATE --------------------
const pathsFound = new Map(); // route -> url
let fullCorpus = `# ${SITE_LABEL} — AI KNOWLEDGE BASE\n# Date: ${new Date().toISOString()}\n\n`;

// -------------------- HELPERS --------------------
function pickPageFile(fileNames) {
  for (const f of PAGE_FILES_PRIORITY) {
    if (fileNames.includes(f)) return f;
  }
  return fileNames[0];
}

function cleanForCorpus(content) {
  // Keep this intentionally simple; this is a token-optimization heuristic.
  return content
    // remove import lines (JS/TS + MDX)
    .replace(/^\s*import\s+[\s\S]*?;?\s*$/gm, "")
    // remove "export const metadata ..." blocks (js/ts/tsx/mdx)
    .replace(/export\s+const\s+metadata[\s\S]*?\n\};?\s*/m, "")
    // remove obvious JSX tags
    .replace(/<[^>]*>/g, " ")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

function writeFileSafe(filePath, text) {
  fs.writeFileSync(filePath, text);
}

// -------------------- ROUTE WALK --------------------
function walkForRoutes(appDirAbs) {
  const warnings = [];

  function walk(currentAbs, segments) {
    if (!fs.existsSync(currentAbs)) return;

    const entries = fs.readdirSync(currentAbs, { withFileTypes: true });

    // If this folder contains page.* file(s), it maps to a URL path
    const pageFiles = entries
      .filter((e) => e.isFile() && PAGE_FILE_RE.test(e.name))
      .map((e) => e.name);

    if (pageFiles.length > 0) {
      const routePath = "/" + segments.join("/");
      const normalizedRoute = routePath === "/" ? "/" : routePath.replace(/\/+$/, "");

      // Warn if multiple page.* exist in same folder (zombi risk)
      if (pageFiles.length > 1) {
        const picked = pickPageFile(pageFiles);
        warnings.push(
          `⚠ Multiple page files for route "${normalizedRoute}": ${pageFiles.join(", ")}. Using "${picked}". Delete the others.`
        );
      }

      const picked = pickPageFile(pageFiles);
      const fileAbs = path.join(currentAbs, picked);
      processFile(fileAbs, normalizedRoute);
    }

    // Recurse into subfolders
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;

      if (isSkippableDir(name)) continue;

      // Route groups: traverse, but do NOT add segment to URL path
      const nextSegments = isRouteGroup(name) ? segments : [...segments, name];
      walk(path.join(currentAbs, name), nextSegments);
    }
  }

  walk(appDirAbs, []);

  return warnings;
}

function processFile(fileAbsPath, route) {
  const fullUrl = route === "/" ? BASE_URL : `${BASE_URL}${route}`;

  const content = fs.readFileSync(fileAbsPath, "utf8");
  const cleanText = cleanForCorpus(content);

  fullCorpus += `\n==================================================\n`;
  fullCorpus += `PAGE: ${route}\n`;
  fullCorpus += `URL: ${fullUrl}\n`;
  fullCorpus += `==================================================\n`;
  fullCorpus += `${cleanText}\n\n`;

  pathsFound.set(route, fullUrl);
}

// -------------------- EXECUTION --------------------
console.log("🤖 Starting AI Assets Generation...");
console.log(`   🌐 BASE_URL: ${BASE_URL}`);

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

const warnings = walkForRoutes(APP_DIR);
for (const w of warnings) console.warn(w);

// A) Full corpus
const corpusPath = path.join(PUBLIC_DIR, "ai-corpus.txt");
writeFileSafe(corpusPath, fullCorpus);
console.log(`   📄 Generated: public/ai-corpus.txt (${(fullCorpus.length / 1024).toFixed(2)} KB)`);

// B) llms.txt
const sortedRoutes = Array.from(pathsFound.keys()).sort((a, b) => a.localeCompare(b));

const llmsContent = `# ${SITE_LABEL} — AI Guide
Title: ${PROJECT_TITLE} documentation
Description: Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).

# Full Context (RAG optimized)
${BASE_URL}/ai-corpus.txt

# Pages Index
${sortedRoutes.map((r) => `- [${r}](${pathsFound.get(r)})`).join("\n")}
`;

writeFileSafe(path.join(PUBLIC_DIR, "llms.txt"), llmsContent);
console.log("   📄 Generated: public/llms.txt");

// C) ai-sitemap.json
const json = sortedRoutes.map((r) => ({ route: r, url: pathsFound.get(r) }));
writeFileSafe(path.join(PUBLIC_DIR, "ai-sitemap.json"), JSON.stringify(json, null, 2));
console.log("   📄 Generated: public/ai-sitemap.json");

console.log(`✅ Success! Processed ${sortedRoutes.length} pages.`);
