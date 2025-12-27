const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const TARGET_EXTENSIONS = ['.md', '.mdx'];
const IGNORE_DIRS = ['node_modules', '.git', '.next', 'public'];
// strictly target these terms only
const TARGETS = ['atlas', 'theseus']; 

/**
 * PHASE 1: TARGETED FILE & FOLDER RENAMING
 * Only renames if the name is "Atlas" or "Theseus" (case-insensitive) -> "atlas", "theseus"
 */
function processDirectoryStructure(currentPath) {
    let items;
    try {
        items = fs.readdirSync(currentPath);
    } catch (e) { return; }

    for (const item of items) {
        if (IGNORE_DIRS.includes(item)) continue;

        const fullPath = path.join(currentPath, item);
        let stat;
        try { stat = fs.statSync(fullPath); } catch (e) { continue; }

        if (stat.isDirectory()) {
            processDirectoryStructure(fullPath);
        }

        // STRICT CHECK: Is this item one of our targets?
        const lowerName = item.toLowerCase();
        if (TARGETS.includes(lowerName)) {
            // Check if casing is wrong (e.g., "Atlas" instead of "atlas")
            if (item !== lowerName) {
                const newFullPath = path.join(currentPath, lowerName);
                
                // Handle case-insensitive OS collision (Windows/Mac)
                if (fs.existsSync(newFullPath) && item.toLowerCase() === lowerName) {
                    const tempPath = path.join(currentPath, `${lowerName}_temp_${Date.now()}`);
                    fs.renameSync(fullPath, tempPath);
                    fs.renameSync(tempPath, newFullPath);
                } else if (!fs.existsSync(newFullPath)) {
                    fs.renameSync(fullPath, newFullPath);
                }
                console.log(`📁 Renamed targeted item: ${item} -> ${lowerName}`);
            }
        }
    }
}

/**
 * PHASE 2: UPDATE LINKS IN FILES
 * Only looks for links containing "atlas" or "theseus"
 * Fixes casing (Atlas->atlas) and Repetition (atlas/atlas -> atlas)
 */
function processFileContent(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
        if (IGNORE_DIRS.includes(item)) continue;
        
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processFileContent(fullPath);
            continue;
        }

        if (TARGET_EXTENSIONS.includes(path.extname(item))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Regex for Markdown links: [text](url)
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

            const newContent = content.replace(linkRegex, (match, text, url) => {
                // Ignore external/absolute links
                if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) {
                    return match;
                }

                // CHECK: Does this link involve our targets?
                const hasTarget = TARGETS.some(t => url.toLowerCase().includes(t));
                if (!hasTarget) return match;

                let newUrl = url;

                // 1. Fix Casing for targets ONLY (e.g. .../Atlas/... -> .../atlas/...)
                newUrl = newUrl.split('/').map(segment => {
                    if (TARGETS.includes(segment.toLowerCase())) {
                        return segment.toLowerCase();
                    }
                    return segment; 
                }).join('/');

                // 2. Fix Repetition (e.g. .../atlas/atlas -> .../atlas)
                TARGETS.forEach(target => {
                    // Regex looks for /target/target/ and replaces with /target/
                    const repetitionRegex = new RegExp(`(^|\/)${target}\/${target}(\/|$)`, 'g');
                    if (repetitionRegex.test(newUrl)) {
                        newUrl = newUrl.replace(repetitionRegex, `$1${target}$2`);
                    }
                });

                if (newUrl !== url) {
                    console.log(`🔗 Fixing targeted link in ${item}: ${url} -> ${newUrl}`);
                    changed = true;
                    return `[${text}](${newUrl})`;
                }
                return match;
            });

            if (changed) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
            }
        }
    }
}

// --- EXECUTION ---
console.log('🚀 Starting Targeted Fix for: Atlas & Theseus...');

console.log('\n--- Phase 1: Renaming Folders/Files (if matching targets) ---');
processDirectoryStructure(process.cwd());

console.log('\n--- Phase 2: Fixing Links (Casing & Repetition) ---');
processFileContent(process.cwd());

console.log('\n✅ Done.');