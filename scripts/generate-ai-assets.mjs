import fs from "fs";
import path from "path";

// CONFIGURATION
function getBaseUrl() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return (env || "http://localhost:3000").replace(/\/+$/, "");
}

const BASE_URL = getBaseUrl();
const APP_DIR = path.join(process.cwd(), "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// STATE
const pathsFound = new Map(); // route -> url
let fullCorpus = `# OKIDO WIKI - AI KNOWLEDGE BASE\n# Date: ${new Date().toISOString()}\n\n`;

const PAGE_FILE_RE = /^page\.(tsx|mdx|js|jsx|ts)$/;

function isSkippableDir(name) {
  if (!name) return true;
  if (name.startsWith(".")) return true;
  if (name.startsWith("_")) return true;
  if (name.startsWith("(") && name.endsWith(")")) return true; // route groups
  if (name.startsWith("[") && name.endsWith("]")) return true; // dynamic segments
  return ["api", "components", "styles", "fonts"].includes(name);
}

// 1. RECURSIVE SCAN
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const e of entries) {
    const filePath = path.join(dir, e.name);

    if (e.isDirectory()) {
      if (!isSkippableDir(e.name)) scanDirectory(filePath);
      continue;
    }

    if (e.isFile() && PAGE_FILE_RE.test(e.name)) {
      processFile(filePath);
    }
  }
}

// 2. PROCESS FILE CONTENT
function processFile(filePath) {
  // Remove the local APP_DIR path
  let relPath = filePath.replace(APP_DIR, "");
  // Normalize slashes for Windows compatibility
  relPath = relPath.split(path.sep).join("/");

  // Remove the filename to get the route (e.g., /about/page.tsx -> /about)
  let route = relPath.replace(/\/page\.(tsx|mdx|js|jsx|ts)$/, "");
  if (route === "") route = "/";

  const fullUrl = `${BASE_URL}${route}`;

  // Read content
  const content = fs.readFileSync(filePath, "utf8");

  // CLEANING STRATEGY (Optimization for Tokens)
  const cleanText = content
    .replace(/import .*?;/gs, "")
    .replace(/export const metadata = \{.*?\};/gs, "")
    .replace(/export default function .*?\{/g, "")
    .replace(/className=".*?"/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  fullCorpus += `\n==================================================\n`;
  fullCorpus += `PAGE: ${route}\n`;
  fullCorpus += `URL: ${fullUrl}\n`;
  fullCorpus += `==================================================\n`;
  fullCorpus += `${cleanText}\n\n`;

  pathsFound.set(route, fullUrl);
}

// 3. EXECUTION
console.log("🤖 Starting AI Assets Generation...");
console.log(`   🌐 BASE_URL: ${BASE_URL}`);

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

scanDirectory(APP_DIR);

// A. Write Full Corpus
const corpusPath = path.join(PUBLIC_DIR, "ai-corpus.txt");
fs.writeFileSync(corpusPath, fullCorpus);
console.log(
  `   📄 Generated: public/ai-corpus.txt (${(fullCorpus.length / 1024).toFixed(
    2
  )} KB)`
);

// B. Write LLMS.txt
const sortedRoutes = Array.from(pathsFound.keys()).sort((a, b) =>
  a.localeCompare(b)
);

const llmsContent = `# OkidoWiki AI Guide
Title: OkidoWiki Documentation
Description: Documentation and philosophical context for King Klown & KOA.

# Full Context (RAG optimized)
${BASE_URL}/ai-corpus.txt

# Pages Index
${sortedRoutes.map((r) => `- [${r}](${pathsFound.get(r)})`).join("\n")}
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), llmsContent);
console.log("   📄 Generated: public/llms.txt");

// C. Write JSON Sitemap
const json = sortedRoutes.map((r) => ({ route: r, url: pathsFound.get(r) }));
fs.writeFileSync(
  path.join(PUBLIC_DIR, "ai-sitemap.json"),
  JSON.stringify(json, null, 2)
);
console.log("   📄 Generated: public/ai-sitemap.json");

console.log(`✅ Success! Processed ${sortedRoutes.length} pages.`);
