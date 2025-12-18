import os
import json
import re

# ================= CONFIGURATION =================
ROOT_DIR = "./app"
INPUT_JSON = "relative_paths_report.json"
OUTPUT_JSON = "links_to_replace.json"
# =================================================

def build_master_index(root_dir):
    print(f"🔍 Scanning {root_dir} to build Master Index...")
    index = {}
    duplicates = {}

    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            # We look for page files that define a route
            if file.startswith('page.') and file.endswith(('.js', '.jsx', '.ts', '.tsx', '.md', '.mdx')):
                
                # Create the absolute web route
                # Windows path: app\platforms\kreature\page.tsx 
                # Becomes: /platforms/kreature
                rel_path = os.path.relpath(subdir, root_dir).replace('\\', '/')
                
                if rel_path == '.':
                    route = '/'
                else:
                    route = '/' + rel_path

                # The "Key" is the folder name (e.g. 'sentient' or 'ame-artificielle')
                key = os.path.basename(rel_path).lower()

                if key in index:
                    if key not in duplicates:
                        duplicates[key] = [index[key]]
                    duplicates[key].append(route)
                else:
                    index[key] = route

    print(f"✅ Indexed {len(index)} unique pages.")
    
    if duplicates:
        print(f"\n⚠️  DUPLICATE NAMES DETECTED ({len(duplicates)}):")
        print("   The script will use the first one found. Check if this is correct:")
        for name, paths in list(duplicates.items())[:5]: # Show first 5
            print(f"   - '{name}': {paths}")
        print("   (To fix duplicates, rename folders or manually edit the json output)\n")
        
    return index

def process_bad_links(input_file, master_index):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            bad_links = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: Could not find {input_file}.")
        return []

    processed_list = []
    print(f"🔄 Processing {len(bad_links)} broken links...")

    # DEBUG: Print the first item to check structure
    if len(bad_links) > 0:
        print(f"   First item keys: {list(bad_links[0].keys())}")

    for item in bad_links:
        file_path = item.get('file', 'UNKNOWN')
        
        # ROBUST KEY RETRIEVAL (Checks multiple common keys)
        bad_link = item.get('bad_link') or item.get('bad_path') or item.get('pattern') or item.get('found_link')
        
        if not bad_link:
            continue
            
        # Cleanup: Remove anchors (#section)
        clean_link = bad_link.split('#')[0]
        anchor = '#' + bad_link.split('#')[1] if '#' in bad_link else ''
        
        # STRATEGY: Match by Folder Name
        # Link: "../../../sens/sentient" -> Target: "sentient"
        target_name = clean_link.split('/')[-1]
        
        suggestion = None
        
        # 1. Lookup in Master Index
        if target_name.lower() in master_index:
            suggestion = master_index[target_name.lower()]
        
        # 2. Hardcoded Fix for "Ame Artificielle" (Technology vs Principles)
        if 'ame-artificielle' in target_name.lower() and 'ame-artificielle' in master_index:
             suggestion = master_index['ame-artificielle']

        processed_list.append({
            "file": file_path,
            "original_link": bad_link,
            "target_name": target_name,
            "suggested_path": (suggestion + anchor) if suggestion else "NOT_FOUND"
        })

    return processed_list

if __name__ == "__main__":
    # 1. Index Files
    page_index = build_master_index(ROOT_DIR)
    
    # 2. Match Links
    results = process_bad_links(INPUT_JSON, page_index)
    
    if results:
        # 3. Save Output
        with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
            
        found_count = sum(1 for i in results if i['suggested_path'] != "NOT_FOUND")
        print(f"\n🎉 Done! Mapped {found_count} out of {len(results)} links.")
        print(f"📂 Results saved to: {OUTPUT_JSON}")