// scripts\fix-casing.js
const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURATION
// ==========================================
const TARGET_DIR = path.join(process.cwd(), 'app');
const DRY_RUN = false; // ⚠️ Set to false to apply changes

// SPECIFIC EXCEPTIONS (The "Branded" words)
// If a folder matches a key here, it uses the value exactly.
const CUSTOM_OVERRIDES = {
  'EkoH': 'ekoh',
  'Smart-Vote': 'smartvote',
  'CertifiKation': 'certifikation',
  'KonnectED': 'konnected',
  'keenKonnect': 'keenkonnect',
  'Ethikos': 'ethikos', // Ensuring simple lowercase
  'Korum': 'korum',
};

// ==========================================
// LOGIC
// ==========================================

// Utility: Standard Kebab Case (CamelCase -> camel-case)
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Split CamelCase (e.g., SmartVote -> Smart-Vote)
    .replace(/[\s_]+/g, '-')             // Replace spaces/underscores with hyphens
    .toLowerCase();
}

// Utility: Master Naming Function
function getNewName(oldName) {
  // 1. Check Overrides first
  if (CUSTOM_OVERRIDES[oldName]) {
    return CUSTOM_OVERRIDES[oldName];
  }
  
  // 2. Fallback to standard kebab-case
  return toKebabCase(oldName);
}

// Recursive function to get all file paths
function getAllPaths(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      fileList.push({
        fullPath: filePath,
        dir: dir,
        name: file,
        isDir: stat.isDirectory()
      });

      if (stat.isDirectory()) {
        getAllPaths(filePath, fileList);
      }
    });
  } catch (e) {
    console.error(`Skipping ${dir}: ${e.message}`);
  }
  return fileList;
}

async function main() {
  console.log(`🔍 Scanning: ${TARGET_DIR}`);
  console.log(`🛡️  Mode: ${DRY_RUN ? 'DRY RUN (No changes made)' : 'LIVE (Writing changes)'}\n`);

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Error: Directory not found: ${TARGET_DIR}`);
    return;
  }

  // 1. Get all paths
  const allPaths = getAllPaths(TARGET_DIR);

  // 2. Sort by depth (Deepest first) to avoid renaming parents before children
  allPaths.sort((a, b) => {
    const depthA = a.fullPath.split(path.sep).length;
    const depthB = b.fullPath.split(path.sep).length;
    return depthB - depthA;
  });

  let changeCount = 0;

  // 3. Process renames
  for (const item of allPaths) {
    const oldName = item.name;
    const newName = getNewName(oldName);

    // Skip if name is already correct
    if (oldName === newName) continue;

    const oldPath = item.fullPath;
    const newPath = path.join(item.dir, newName);

    // Skip special Next.js files if they are just capitalized normally (optional)
    // But for this cleanup, we want strictly lowercase.
    
    console.log(`📝 Rename: ${oldName.padEnd(30)} → ${newName}`);
    changeCount++;

    if (!DRY_RUN) {
      try {
        // Windows Step 1: Rename to temp (avoids "Source and dest are same" error)
        const tempPath = path.join(item.dir, `${newName}_TEMP_${Date.now()}`);
        fs.renameSync(oldPath, tempPath);
        
        // Windows Step 2: Rename to final
        fs.renameSync(tempPath, newPath);
      } catch (err) {
        console.error(`❌ Failed to rename ${oldName}:`, err.message);
      }
    }
  }

  console.log(`\n-------------------------------------------`);
  console.log(`✅ Complete. Found ${changeCount} items to rename.`);
  if (DRY_RUN && changeCount > 0) {
    console.log(`⚠️  ACTION REQUIRED: Set 'const DRY_RUN = false' in the script to execute.`);
  }
}

main();