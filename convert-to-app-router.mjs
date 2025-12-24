import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
// The specific folder we want to fix.
const TARGET_DIR = 'app/initiatives/ukraine-peace-plan';

// --- HELPER: Recursively find files ---
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Find all MDX files that are NOT named 'page.mdx'
      if (file.endsWith('.mdx') && file !== 'page.mdx') {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

// --- MAIN ---
async function run() {
  const root = process.cwd();
  const fullTargetDir = path.join(root, TARGET_DIR);

  console.log(`🏗️  Starting App Router Structural Fix...`);
  console.log(`   Target: ${TARGET_DIR}`);

  if (!fs.existsSync(fullTargetDir)) {
    console.error(`❌ Directory not found: ${fullTargetDir}`);
    return;
  }

  const filesToMove = getAllFiles(fullTargetDir);
  let moves = 0;

  for (const filePath of filesToMove) {
    // 1. Get the directory and the filename (without extension)
    const dir = path.dirname(filePath);
    const filename = path.basename(filePath, '.mdx'); // e.g. "construction-olympics"
    
    // 2. Define the new folder and new file path
    // Old: .../concepts/construction-olympics.mdx
    // New Dir: .../concepts/construction-olympics/
    // New File: .../concepts/construction-olympics/page.mdx
    const newDir = path.join(dir, filename);
    const newFilePath = path.join(newDir, 'page.mdx');

    // 3. Create the new folder if it doesn't exist
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    // 4. Move the file
    // Check if destination already exists to prevent overwriting/errors
    if (!fs.existsSync(newFilePath)) {
      fs.renameSync(filePath, newFilePath);
      console.log(`✅ Converted: ${filename}.mdx -> ${filename}/page.mdx`);
      moves++;
    } else {
      console.warn(`⚠️  Skipped: ${newFilePath} already exists.`);
    }
  }

  console.log(`\n🎉 DONE! Converted ${moves} files to Page Routes.`);
  console.log(`   Your 404 errors should now be resolved.`);
}

run();