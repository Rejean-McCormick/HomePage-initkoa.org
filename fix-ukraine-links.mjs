import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const TARGET_DIR = 'app/initiatives/ukraine-peace-plan';
const BASE_ROUTE = '/initiatives/ukraine-peace-plan';
const MAP_FILE = 'ukraine-link-map.json';

// --- HELPER: Escape Regex ---
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// --- HELPER: Get All Files ---
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.match(/\.(mdx?|tsx?|jsx?|js|ts)$/)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

// --- MAIN EXECUTION ---
async function run() {
  console.log(`🚀 Starting Aggressive Link Fixer for: ${TARGET_DIR}`);

  if (!fs.existsSync(MAP_FILE)) {
    console.error(`❌ Map file not found: ${MAP_FILE}. Please create it first.`);
    return;
  }

  const linkMap = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
  const files = getAllFiles(path.join(process.cwd(), TARGET_DIR));
  
  console.log(`🔍 Scanning ${files.length} files...`);

  let totalFixes = 0;
  let filesModified = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileFixes = 0;

    // 1. ITERATE MAPPING RULES
    for (const [key, newPath] of Object.entries(linkMap)) {
      // Determine the search pattern. 
      // If the key has a slash (e.g. "concepts/peace-framework"), we check for both:
      // a) The full key "concepts/peace-framework"
      // b) Just the filename "peace-framework" (for sibling links)
      
      const searchKeys = [key];
      if (key.includes('/')) {
        searchKeys.push(key.split('/').pop()); // Add "peace-framework"
      }

      for (const searchKey of searchKeys) {
        // REGEX EXPLANATION:
        // 1. (\[.*?\]\(|href=["'])   -> Capture Link Start: [Text]( OR href="
        // 2. ([^"'\)]*?)             -> Capture (and discard) any path prefix (../, /old-path/, etc)
        // 3. ${escapeRegExp(searchKey)} -> Match the unique filename/key
        // 4. (?:\.mdx?|\.tsx?)?      -> Optional extension (discarded)
        // 5. (#[^"'\)]*)?            -> Capture Anchor (#section)
        // 6. (\)|"|')                -> Capture Link End: ) OR "
        
        const regex = new RegExp(`(\\[.*?\\]\\(|href=["'])([^"'\)]*?)${escapeRegExp(searchKey)}(?:\\.mdx?|\\.tsx?)?(#[^"'\)]*)?(\\)|\"|')`, 'g');

        content = content.replace(regex, (match, linkStart, oldPrefix, anchor, linkEnd) => {
          fileFixes++;
          // Always replace with the ABSOLUTE new path
          const cleanNewPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
          return `${linkStart}${BASE_ROUTE}${cleanNewPath}${anchor || ''}${linkEnd}`;
        });
      }
    }

    // 2. GLOBAL CLEANUP (Catch-all for the old root folder name)
    // This fixes any links that might have been missed by the map but contain the old long slug
    const rootRegex = new RegExp(`ukraine-peace-and-reconstruction-plan`, 'g');
    if (rootRegex.test(content)) {
       const matchCount = (content.match(rootRegex) || []).length;
       content = content.replace(rootRegex, 'ukraine-peace-plan');
       fileFixes += matchCount;
    }

    // 3. FIX ROOT LINKS (../README or ..)
    // Matches ](../../) or ](../README)
    content = content.replace(/\]\(\.\.\/README\)/g, `](/initiatives/ukraine-peace-plan)`);
    content = content.replace(/\]\(\.\.\/+\)/g, `](/initiatives/ukraine-peace-plan)`); // Matches ../ or ../../

    // 4. SAVE
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ ${path.basename(file)}: Fixed ${fileFixes} links`);
      totalFixes += fileFixes;
      filesModified++;
    }
  }

  console.log(`\n🎉 DONE!`);
  console.log(`   - Files Modified: ${filesModified}`);
  console.log(`   - Total Links Fixed: ${totalFixes}`);
}

run();