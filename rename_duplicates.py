import os
import re

# ================= CONFIGURATION =================
ROOT_DIR = "./app"

# List of folders to rename. 
# Format: { "path_suffix": "new_name" }
# We look for these paths inside 'app/platforms/kreature/anatomie/...'
# You can verify these paths match your structure.
RENAMES = [
    # -- Deepest items first --
    
    # 1. Konnaxion Sub-modules
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/kollective/ekoh", "new_name": "ekoh-mythos"},
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/ethikos/korum", "new_name": "korum-mythos"},
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/ethikos/konsultations", "new_name": "konsultations-mythos"},
    
    # 2. Konnaxion Modules
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/ethikos", "new_name": "ethikos-mythos"},
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/konnected", "new_name": "konnected-mythos"},
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/kreative", "new_name": "kreative-mythos"},
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/keen-konnect/konstruct", "new_name": "konstruct-mythos"}, # Assuming path
    {"path": "platforms/kreature/anatomie/esprit/konnaxion/keen-konnect/stockage", "new_name": "stockage-mythos"},   # Assuming path

    # 3. Main Organs (Parent Folders)
    {"path": "platforms/kreature/anatomie/esprit/konnaxion", "new_name": "konnaxion-mythos"},
    {"path": "platforms/kreature/anatomie/corps/orgo", "new_name": "orgo-mythos"},
    {"path": "platforms/kreature/anatomie/sens/ariane", "new_name": "ariane-mythos"},
    {"path": "platforms/kreature/anatomie/sens/sentient", "new_name": "sentient-mythos"},
    {"path": "platforms/kreature/anatomie/voix/architect", "new_name": "architect-mythos"},
    {"path": "platforms/kreature/anatomie/memoire/swarmcraft", "new_name": "swarmcraft-mythos"},
]
# =================================================

def update_parent_links(parent_dir, old_name, new_name):
    """
    Scans the parent directory for page.mdx/tsx/js and updates links.
    """
    # Find the page file
    page_file = None
    for f in os.listdir(parent_dir):
        if f.startswith('page.') and f.endswith(('.md', '.mdx', '.tsx', '.js', '.jsx')):
            page_file = os.path.join(parent_dir, f)
            break
            
    if not page_file:
        print(f"   ⚠️  No parent page found in {parent_dir} to update.")
        return

    print(f"   📝 Updating parent page: {os.path.basename(page_file)}...")
    
    with open(page_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find links to the old folder
    # Matches: [Label](oldname), [Label](./oldname), href="oldname", href="./oldname"
    # We use boundary \b or / to ensure we don't replace "oldname-extra"
    
    # Pattern 1: Markdown/Href links ending with the name
    # e.g. ](ekoh) or ](./ekoh) or "ekoh" or "./ekoh"
    # We look for the exact string or prefixed with ./
    
    # Simple replace is safer for this specific task as long as names are unique enough
    # We replace "](old_name)" with "](new_name)"
    
    new_content = content
    
    patterns = [
        (f"]({old_name})", f"]({new_name})"),
        (f"](./{old_name})", f"](./{new_name})"),
        (f"href=\"{old_name}\"", f"href=\"{new_name}\""),
        (f"href=\"./{old_name}\"", f"href=\"./{new_name}\""),
        (f"href='{old_name}'", f"href='{new_name}'"),
        (f"href='./{old_name}'", f"href='./{new_name}'"),
    ]

    count = 0
    for old_str, new_str in patterns:
        if old_str in new_content:
            count += new_content.count(old_str)
            new_content = new_content.replace(old_str, new_str)
            
    if count > 0:
        with open(page_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"      ✅ Replaced {count} links.")
    else:
        print("      ℹ️  No direct links found to update.")


def run_rename():
    # Sort by path length DESCENDING (Deepest first)
    # This prevents renaming a parent before its child
    sorted_renames = sorted(RENAMES, key=lambda x: len(x['path']), reverse=True)

    print(f"🚀 Starting Rename Process for {len(sorted_renames)} items...\n")

    for item in sorted_renames:
        full_old_path = os.path.join(ROOT_DIR, item['path']).replace('\\', '/')
        parent_dir = os.path.dirname(full_old_path)
        old_folder_name = os.path.basename(full_old_path)
        new_folder_name = item['new_name']
        full_new_path = os.path.join(parent_dir, new_folder_name).replace('\\', '/')

        print(f"📂 Processing: {old_folder_name}")

        if not os.path.exists(full_old_path):
            print(f"   ❌ Folder not found: {full_old_path} (Skipping)")
            continue
            
        try:
            # 1. Rename the folder
            os.rename(full_old_path, full_new_path)
            print(f"   ✨ Renamed to: {new_folder_name}")

            # 2. Update parent page
            update_parent_links(parent_dir, old_folder_name, new_folder_name)
            
        except Exception as e:
            print(f"   🔥 Error: {e}")
        
        print("")

if __name__ == "__main__":
    run_rename()
    print("\n🏁 Rename complete. Now run 'generate_link_map_v3.py' to map the rest of the broken links!")