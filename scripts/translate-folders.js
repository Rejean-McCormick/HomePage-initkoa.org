// scripts\translate-folders.js
const fs = require('fs');
const path = require('path');

// ==========================================
// CONFIGURATION
// ==========================================
// Pointing specifically to the AI Alignment folder
const TARGET_DIR = path.join(process.cwd(), 'app/technology/ai-alignment');

const DRY_RUN = true; // ⚠️ Set to false to apply changes

// DICTIONARY: [French Source] : [English Target]
const TRANSLATIONS = {
  'controle-et-personnalisation': 'control-and-customization',
  'creation-de-chemins': 'path-creation',
  'ethique-et-gouvernance': 'ethics-and-governance',
  'Meta-Cognition-Et-Resolution': 'metacognition-and-resolution',
  'Specifications-Fonctionnelles': 'functional-specifications'
};

// ==========================================
// LOGIC
// ==========================================
function main() {
  console.log(`🔍 Scanning: ${TARGET_DIR}`);
  console.log(`🛡️  Mode: ${DRY_RUN ? 'DRY RUN (No changes made)' : 'LIVE (Writing changes)'}\n`);

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Error: Directory not found: ${TARGET_DIR}`);
    return;
  }

  const items = fs.readdirSync(TARGET_DIR);
  let changeCount = 0;

  for (const item of items) {
    // Only process if we have a translation for it
    if (TRANSLATIONS[item]) {
      const oldPath = path.join(TARGET_DIR, item);
      const newPath = path.join(TARGET_DIR, TRANSLATIONS[item]);
      
      console.log(`📝 Translate: ${item.padEnd(30)} → ${TRANSLATIONS[item]}`);
      changeCount++;

      if (!DRY_RUN) {
        try {
          fs.renameSync(oldPath, newPath);
        } catch (err) {
          console.error(`❌ Failed to rename ${item}:`, err.message);
        }
      }
    }
  }

  console.log(`\n-------------------------------------------`);
  console.log(`✅ Complete. Found ${changeCount} folders to translate.`);
  if (DRY_RUN && changeCount > 0) {
    console.log(`⚠️  ACTION REQUIRED: Set 'const DRY_RUN = false' in the script to execute.`);
  }
}

main();