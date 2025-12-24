# rename_ame_artificielle.py
import os

# --- CONFIGURATION ---
PROJECT_ROOT = r"C:\MyCode\OkidoWiki\HomePage\app"

# 1. FOLDER RENAMES (Safe for Code/URLs: No accents, no spaces)
FOLDER_MOVES = [
    {
        "old_path": os.path.join(PROJECT_ROOT, "principles", "ai-alignment"),
        "new_path": os.path.join(PROJECT_ROOT, "principles", "ame-artificielle"),
    },
    {
        "old_path": os.path.join(PROJECT_ROOT, "technology", "ai-alignment"),
        "new_path": os.path.join(PROJECT_ROOT, "technology", "ame-artificielle"),
    }
]

# 2. TEXT REPLACEMENTS (Content & Code)
TEXT_REPLACEMENTS = [
    # Fix the URLs/Imports (Safe version: ame-artificielle)
    {
        "find": "/principles/ai-alignment",
        "replace": "/principles/ame-artificielle"
    },
    {
        "find": "/technology/ai-alignment",
        "replace": "/technology/ame-artificielle"
    },
    # Fix the Human Labels (Accented version: Âme artificielle)
    {
        "find": "AI Alignment",
        "replace": "Âme artificielle"
    },
    {
        "find": "Artificial Soul",
        "replace": "Âme artificielle"
    },
    # Fix Metadata/Titles specifically
    {
        "find": "title: 'AI Alignment",
        "replace": "title: 'Âme artificielle"
    }
]

def update_file_content(file_path):
    """Reads a file, applies replacements, and saves if changed."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        modified = False
        
        for rep in TEXT_REPLACEMENTS:
            if rep["find"] in new_content:
                new_content = new_content.replace(rep["find"], rep["replace"])
                modified = True
        
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"📝 Updated text in: {file_path}")
            
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")

def main():
    print("🚀 Starting Rename: AI Alignment -> Âme artificielle\n")

    # STEP 1: Rename Folders (Using safe slug 'ame-artificielle')
    for move in FOLDER_MOVES:
        if os.path.exists(move["old_path"]):
            try:
                os.rename(move["old_path"], move["new_path"])
                print(f"wm Moved Folder: {move['old_path']}\n   -> {move['new_path']}")
            except Exception as e:
                print(f"❌ Error moving folder: {e}")
        elif os.path.exists(move["new_path"]):
            print(f"ℹ️  Folder already exists: {move['new_path']}")
        else:
            print(f"⚠️  Source folder not found: {move['old_path']}")

    print("\n🔍 Scanning files to update text...")

    # STEP 2: Update Content in All Files
    for root, dirs, files in os.walk(PROJECT_ROOT):
        for file in files:
            # Process code and text files
            if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.mdx', '.json', '.css')):
                file_path = os.path.join(root, file)
                update_file_content(file_path)

    print("\n✨ Done. 'AI Alignment' is now 'Âme artificielle'.")

if __name__ == "__main__":
    main()