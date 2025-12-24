import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const TARGET_DIR = 'app/initiatives/ukraine-peace-plan';

// The incorrect double path pattern to find
const BAD_PATTERN = '/initiatives/ukraine-peace-plan/initiatives/ukraine-peace-plan';

// The correct single path to replace it with
const GOOD_PATH = '/initiatives/ukraine-peace-plan';

// --- HELPER: Recursive File Finder ---
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Process content files
      if (file.match(/\.(mdx?|tsx?|jsx?|js|ts|json)$/)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

// --- MAIN EXECUTION ---
async function run() {
  const root = process.cwd();
  const fullTargetDir = path.join(root, TARGET_DIR);

  console.log(`🧹 Starting Double-Link Cleanup...`);
  console.log(`   Target: ${TARGET_DIR}`);
  
  if (!fs.existsSync(fullTargetDir)) {
    console.error(`❌ Target directory not found: ${TARGET_DIR}`);
    return;
  }

  const files = getAllFiles(fullTargetDir);
  let totalFixes = 0;
  let filesChanged = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Create a global regex for the bad pattern
    const regex = new RegExp(BAD_PATTERN, 'g');

    if (regex.test(content)) {
      const count = (content.match(regex) || []).length;
      content = content.replace(regex, GOOD_PATH);
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${count} error(s) in: ${path.basename(file)}`);
      totalFixes += count;
      filesChanged++;
    }
  }

  console.log(`\n🎉 DONE!`);
  console.log(`   - Files Scanned: ${files.length}`);
  console.log(`   - Files Modified: ${filesChanged}`);
  console.log(`   - Total Links Fixed: ${totalFixes}`);
}

run();