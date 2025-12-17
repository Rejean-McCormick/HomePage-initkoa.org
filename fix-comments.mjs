import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET_DIR = path.join(__dirname, 'app');

function getAllMdxFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMdxFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.mdx')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function run() {
  console.log(`🔎 Scanning: ${TARGET_DIR}`);
  
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Error: Directory not found: ${TARGET_DIR}`);
    return;
  }

  const files = getAllMdxFiles(TARGET_DIR);
  let fixedCount = 0;
  let cleanCount = 0;

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      // We use the constructor string to avoid // syntax confusion
      const pattern = new RegExp('', 'g');

      if (pattern.test(content)) {
        const newContent = content.replace(pattern, (match, inner) => {
          return `{/*${inner}*/}`;
        });
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`⚠️  FIXED: ${relativePath}`);
        fixedCount++;
      } else {
        cleanCount++;
      }
    } catch (err) {
      console.error(`❌ Error on ${filePath}: ${err.message}`);
    }
  });

  console.log(`\n================ REPORT ================`);
  console.log(`✅ Files clean: ${cleanCount}`);
  console.log(`🛠️  Files fixed: ${fixedCount}`);
  console.log(`========================================`);

  if (fixedCount === 0) {
    console.log(`\n🚀 ALL CLEAR. Ready to deploy.`);
  } else {
    console.log(`\n⚠️  Repaired ${fixedCount} files. NOW you are ready.`);
  }
}

run();