// scripts/generate-ai-corpus.mjs
import fs from "node:fs";
import path from "node:path";

// Configuration
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "ai-corpus.txt");

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

// Dirs / route segments to ignore
const IGNORE_DIRS = new Set([
  "api",
  "components",
  "styles",
  "fonts",
  "public",
  "node_modules",
]);

function isSkippableSegment(name) {
  if (!name) return true;
  if (IGNORE_DIRS.has(name)) return true;
  if (name.startsWith(".")) return true;
  if (name.startsWith("_")) return true;
  if (name.startsWith("(") && name.endsWith(")")) return true; // route groups
  if (name.startsWith("[") && name.endsWith("]")) return true; // dynamic segments
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

function routeFromFilePath(filePathAbs) {
  // Normalize path separators for Windows
  let rel = filePathAbs.replace(APP_DIR, "");
  rel = rel.split(path.sep).join("/");

  // /about/page.tsx -> /about
  let route = rel.replace(/\/page\.(mdx|tsx|ts|js|jsx)$/, "");
  if (route === "") route = "/";
  return route;
}

function cleanContent(content) {
  // Token-saving cleaning while keeping meaning
  return content
    // remove imports
    .replace(/^\s*import\s+[^;]+;\s*$/gm, "")
    // remove export metadata blocks (common in MDX)
    .replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/g, "")
    // remove "use client"
    .replace(/^\s*["']use client["'];\s*$/gm, "")
    // remove className="..."
    .replace(/\sclassName="[^"]*"/g, "")
    // remove JSX/HTML tags
    .replace(/<[^>]*>/g, " ")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

function generateCorpus() {
  console.log("🤖 Generating AI corpus...");
  console.log(`   🌐 BASE_URL: ${BASE_URL}`);

  ensurePublicDir();

  const files = getAllPageFiles(APP_DIR);
  let corpus = `# OKIDOWIKI AI CORPUS\n# Generated: ${new Date().toISOString()}\n# Base URL: ${BASE_URL}\n\n`;

  for (const filePath of files) {
    const route = routeFromFilePath(filePath);
    const url = `${BASE_URL}${route}`;

    let content = "";
    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const cleaned = cleanContent(content);

    corpus += `\n==================================================\n`;
    corpus += `ROUTE: ${route}\n`;
    corpus += `URL: ${url}\n`;
    corpus += `SOURCE: ${filePath.replace(process.cwd(), "").split(path.sep).join("/")}\n`;
    corpus += `==================================================\n`;
    corpus += `${cleaned}\n\n`;
  }

  fs.writeFileSync(OUTPUT_FILE, corpus, "utf8");
  console.log(`✅ Wrote: ${OUTPUT_FILE} (${files.length} pages)`);
}

generateCorpus();
