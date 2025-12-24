import fs from 'fs';
import path from 'path';

// Target directory: The root of your Ukraine plan
const TARGET_DIR = 'app/initiatives/ukraine-peace-plan';

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Find MDX files that are NOT named 'page.mdx'
      if (file.endsWith('.mdx') && file !== 'page.mdx') {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

async function run() {
  const root = process.cwd();
  const fullTargetDir = path.join(root, TARGET_DIR);
  
  console.log(`📦 Converting MDX structure in: ${TARGET_DIR}`);

  const files = getAllFiles(fullTargetDir);

  for (const file of files) {
    const dir = path.dirname(file);
    const filename = path.basename(file, '.mdx'); 
    
    // Skip if we are somehow processing a file that's already correct
    if (filename === 'page') continue;

    const newDir = path.join(dir, filename);
    const newPath = path.join(newDir, 'page.mdx');

    // 1. Create the folder (e.g. /concepts/peace-framework)
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    // 2. Move file into folder as page.mdx
    if (!fs.existsSync(newPath)) {
      fs.renameSync(file, newPath);
      console.log(`✅ Fixed: ${filename}.mdx -> ${filename}/page.mdx`);
    }
  }
  console.log(`\n🎉 Structural Fix Complete. Links should now work.`);
}

run();