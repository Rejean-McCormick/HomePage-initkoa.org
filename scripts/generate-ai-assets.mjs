import fs from 'fs';
import path from 'path';

// CONFIGURATION
const BASE_URL = 'https://www.initkoa.org'; // Adjust if your domain is different
const APP_DIR = path.join(process.cwd(), 'app');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// STATE
let pathsFound = [];
let fullCorpus = `# OKIDO WIKI - AI KNOWLEDGE BASE\n# Date: ${new Date().toISOString()}\n\n`;

// 1. RECURSIVE SCAN
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignore internal Next.js folders and API routes
      if (!['api', 'layout', 'loading', 'error', 'not-found', 'fonts', 'components', 'styles'].includes(file) && !file.startsWith('(')) {
        scanDirectory(filePath);
      }
    } else {
      // Look for page files
      if (file.match(/^page\.(tsx|mdx|js|jsx|ts)$/)) {
        processFile(filePath);
      }
    }
  });
}

// 2. PROCESS FILE CONTENT
function processFile(filePath) {
  // Calculate public URL
  // Remove the local APP_DIR path
  let relPath = filePath.replace(APP_DIR, '');
  // Normalize slashes for Windows compatibility
  relPath = relPath.split(path.sep).join('/');
  
  // Remove the filename to get the route (e.g., /about/page.tsx -> /about)
  let route = relPath.replace(/\/page\.(tsx|mdx|js|jsx|ts)$/, '');
  
  // Handle root
  if (route === '') route = '/';

  const fullUrl = `${BASE_URL}${route}`;

  // Read content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // CLEANING STRATEGY (Optimization for Tokens)
  const cleanText = content
    // Remove imports
    .replace(/import .*?;/gs, '')
    // Remove export default declarations but keep the component body if needed, or just remove lines starting with export
    .replace(/export default function .*?\{/g, '')
    .replace(/export const metadata = \{.*?\};/gs, '')
    // Remove common JSX syntax noise
    .replace(/className=".*?"/g, '')
    .replace(/<[^>]*>/g, ' ') // Naive HTML tag removal (optional: keep structure if preferred)
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Append to Corpus
  fullCorpus += `\n==================================================\n`;
  fullCorpus += `PAGE: ${route}\n`;
  fullCorpus += `URL: ${fullUrl}\n`;
  fullCorpus += `==================================================\n`;
  fullCorpus += `${cleanText}\n\n`;
  
  // Add to index list
  pathsFound.push({ route, url: fullUrl });
}

// 3. EXECUTION
console.log('🤖 Starting AI Assets Generation...');

// Ensure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

scanDirectory(APP_DIR);

// A. Write Full Corpus
const corpusPath = path.join(PUBLIC_DIR, 'ai-corpus.txt');
fs.writeFileSync(corpusPath, fullCorpus);
console.log(`   📄 Generated: public/ai-corpus.txt (${(fullCorpus.length / 1024).toFixed(2)} KB)`);

// B. Write LLMS.txt (Standard format)
const llmsContent = `# OkidoWiki AI Guide
Title: OkidoWiki Documentation
Description: Documentation and philosophical context for King Klown & KOA.

# Full Context (RAG optimized)
${BASE_URL}/ai-corpus.txt

# Pages Index
${pathsFound.map(p => `- [${p.route}](${p.url})`).join('\n')}
`;

const llmsPath = path.join(PUBLIC_DIR, 'llms.txt');
fs.writeFileSync(llmsPath, llmsContent);
console.log(`   📄 Generated: public/llms.txt`);

// C. Write JSON Sitemap (Programmatic access)
const jsonSitemapPath = path.join(PUBLIC_DIR, 'ai-sitemap.json');
fs.writeFileSync(jsonSitemapPath, JSON.stringify(pathsFound, null, 2));
console.log(`   📄 Generated: public/ai-sitemap.json`);

console.log(`✅ Success! Processed ${pathsFound.length} pages.`);