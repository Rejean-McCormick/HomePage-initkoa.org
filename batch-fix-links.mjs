import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
// The root directory where your Ukraine plan content lives
const ROOT_DIR = 'app/initiatives/ukraine-peace-plan';
// The base URL prefix for your links
const BASE_URL = '/initiatives/ukraine-peace-plan';

// --- HELPER: Recursively find all page.mdx files ---
function getAllPages(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllPages(fullPath, arrayOfFiles);
    } else {
      // Only target the page.mdx files we created
      if (file === 'page.mdx') {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

// --- FIX LOGIC ---
function fixContent(content, filePath) {
  let newContent = content;

  // 1. Remove Citation Artifacts
  // Removes patterns like [cite: 1] or 
  newContent = newContent.replace(/\.*?(\.|\s)/g, '');
  newContent = newContent.replace(/\[cite_start\]/g, '');

  // 2. Fix Double Paths
  // Replaces: /initiatives/ukraine-peace-plan/initiatives/ukraine-peace-plan...
  // With: /initiatives/ukraine-peace-plan...
  newContent = newContent.replace(
    /\/initiatives\/ukraine-peace-plan\/initiatives\/ukraine-peace-plan/g, 
    '/initiatives/ukraine-peace-plan'
  );

  // 3. Fix Relative Links (The "One Level Deeper" Problem)
  // We look for markdown links: [Text](path)
  // Note: This regex finds standard markdown links.
  newContent = newContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
    
    // Ignore external links, anchors (#), or already absolute links (/)
    if (link.startsWith('http') || link.startsWith('#') || link.startsWith('/')) {
      return match; 
    }

    // Logic: Map known folder keywords to their absolute URL
    // This is safer than calculating relative ../../ paths.
    let absoluteLink = link;
    
    if (link.includes('fvr/')) {
        absoluteLink = path.join(BASE_URL, 'fvr', link.split('fvr/')[1]);
    } else if (link.includes('concepts/')) {
        absoluteLink = path.join(BASE_URL, 'concepts', link.split('concepts/')[1]);
    } else if (link.includes('cultural-bridge/')) {
        absoluteLink = path.join(BASE_URL, 'cultural-bridge', link.split('cultural-bridge/')[1]);
    } else if (link.includes('summary')) {
        absoluteLink = path.join(BASE_URL, 'summary');
    } else {
        // If we can't identify the target folder, leave it alone to avoid breaking it further
        return match;
    }
    
    // Clean up backslashes if on Windows
    absoluteLink = absoluteLink.replace(/\\/g, '/');
    
    // Ensure it starts with /
    if (!absoluteLink.startsWith('/')) absoluteLink = '/' + absoluteLink;

    return `[${text}](${absoluteLink})`;
  });

  return newContent;
}

// --- RUN ---
async function run() {
  const root = process.cwd();
  const fullTargetDir = path.join(root, ROOT_DIR);

  console.log(`🔧 Starting Content Batch Fix...`);
  const files = getAllPages(fullTargetDir);

  let fixedCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const fixed = fixContent(content, file);

    if (content !== fixed) {
      fs.writeFileSync(file, fixed, 'utf8');
      console.log(`Fixed: ${path.relative(root, file)}`);
      fixedCount++;
    }
  }

  console.log(`\n🎉 Processed ${files.length} files.`);
  console.log(`✅ Fixed links/artifacts in ${fixedCount} files.`);
}

run();