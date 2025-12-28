const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const ROOT_DIR = process.cwd();
const ARIANE_DIR = path.join(ROOT_DIR, 'app', 'technology', 'ariane');

// We define the target structure: "Any of these old names" -> "overview"
const MOVES = [
    {
        folder: 'consumers',
        // We look for these potential existing names
        candidates: ['consumers', 'consumers-overview', 'general-consumers-overview'],
        target: 'overview' // Result: consumers/overview
    },
    {
        folder: 'atlas',
        // Covers the original 'atlas' and the specific one we made earlier
        candidates: ['atlas', 'atlas-ui-graph-and-ontology', 'atlas-overview'], 
        target: 'overview' // Result: atlas/overview
    },
    {
        folder: 'theseus',
        // Covers the original 'theseus' and the specific one we made earlier
        candidates: ['theseus', 'theseus-exploration-engine', 'theseus-overview'], 
        target: 'overview' // Result: theseus/overview
    }
];

const LINK_EXTENSIONS = ['.md', '.mdx', '.tsx', '.ts', '.js', '.json'];
const IGNORE_DIRS = ['node_modules', '.git', '.next', 'out', 'build', '.vscode'];

// --- HELPER: RECURSIVE FILE SCAN ---
function getAllFiles(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(file => {
        if (IGNORE_DIRS.includes(file)) return;
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (LINK_EXTENSIONS.includes(path.extname(file))) {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

// --- CORE LOGIC ---
function run() {
    console.log('🚀 Starting Standardization to /overview ...');

    MOVES.forEach(op => {
        const baseDir = path.join(ARIANE_DIR, op.folder);
        if (!fs.existsSync(baseDir)) return;

        console.log(`\n--- Processing: ${op.folder.toUpperCase()} ---`);
        
        let moved = false;
        const targetPath = path.join(baseDir, op.target);

        // 1. RENAME FOLDERS
        // Try to find any of the candidate folders
        for (const candidate of op.candidates) {
            const currentPath = path.join(baseDir, candidate);
            
            // If the candidate exists AND it's not already the target name
            if (fs.existsSync(currentPath) && candidate !== op.target) {
                if (!fs.existsSync(targetPath)) {
                    console.log(`   📂 Renaming: ${candidate} -> ${op.target}`);
                    fs.renameSync(currentPath, targetPath);
                    moved = true;
                    // We also need to update links for this specific move
                    updateLinks(op.folder, candidate, op.target);
                    break; // Stop after finding the first match
                } else {
                    console.log(`   ⚠️ Target '${op.target}' already exists. Merging content manually recommended if strict.`);
                }
            }
        }
        
        if (!moved && fs.existsSync(targetPath)) {
            console.log(`   ✅ Structure already optimal: .../${op.folder}/${op.target}`);
        } else if (!moved) {
            console.log(`   ℹ️ No matching candidate folders found to rename.`);
        }
    });

    console.log('\n✅ Done.');
}

function updateLinks(folder, oldName, newName) {
    console.log(`   🔗 Updating links in project...`);
    const allFiles = getAllFiles(ROOT_DIR);
    let count = 0;

    // We need to catch links that point to the old folder name
    // Example: /technology/ariane/consumers/overview -> /technology/ariane/consumers/overview
    
    // Regex breakdown:
    // 1. (\/|^)  : Starts with slash or start of string (for relative paths)
    // 2. folder  : "consumers"
    // 3. \/      : slash
    // 4. oldName : "consumers" (or "consumers-overview")
    // 5. Lookahead: (?=[\/#\)\s]|$) : Ends with slash, hash, closing paren, space, or end of line
    
    const regex = new RegExp(`(\\/|^)${folder}\\/${oldName}(?=[\\/#\\)\\s]|$)`, 'g');
    const replacement = `$1${folder}/${newName}`;

    allFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        if (regex.test(content)) {
            const newContent = content.replace(regex, replacement);
            if (newContent !== content) {
                fs.writeFileSync(file, newContent, 'utf8');
                console.log(`      Fixed in: ${path.relative(ROOT_DIR, file)}`);
                count++;
            }
        }
    });
    console.log(`      Updated ${count} files.`);
}

run();