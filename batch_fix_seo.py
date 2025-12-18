import os
import re

# --- CONFIGURATION ---
PROJECT_ROOT = r"C:\MyCode\OkidoWiki\HomePage\app"

# --- BATCH A: LINK CORRECTIONS ---
# Replaces broken /technology/ links with the correct /principles/ paths
LINK_FIXES = [
    {
        "file": "sitemap/page.tsx",
        "find": "/technology/ai-alignment",
        "replace": "/principles/ai-alignment"
    },
    {
        "file": "about/page.mdx",
        "find": "/technology/ai-alignment",
        "replace": "/principles/ai-alignment"
    },
    {
        "file": "technology/page.tsx",
        "find": "/technology/ai-alignment",
        "replace": "/principles/ai-alignment"
    },
    {
        "file": "principles/ai-alignment/page.tsx",
        "find": "/technology/ai-alignment/Controle-Et-Personnalisation",
        "replace": "/principles/ai-alignment/controle-et-personnalisation"
    },
    {
        "file": "principles/ai-alignment/page.tsx",
        "find": "/technology/ai-alignment/Meta-Cognition-Et-Resolution",
        "replace": "/principles/ai-alignment/meta-cognition-et-resolution"
    },
    {
        "file": "principles/ai-alignment/page.tsx",
        "find": "/technology/ai-alignment/Creation-De-Chemins",
        "replace": "/principles/ai-alignment/creation-de-chemins"
    },
    {
        "file": "principles/ai-alignment/page.tsx",
        "find": "/technology/ai-alignment/Ethique-Et-Gouvernance",
        "replace": "/principles/ai-alignment/ethique-et-gouvernance"
    },
    {
        "file": "principles/ai-alignment/page.tsx",
        "find": "/technology/ai-alignment/Specifications-Fonctionnelles",
        "replace": "/principles/ai-alignment/specifications-fonctionnelles"
    }
]

# --- BATCH B: MISSING H1 HEADERS ---
# Adds an H1 based on the metadata title if missing
H1_TARGETS = [
    "technology/sentient/page.mdx",
    "platforms/konnaxion/konnected/knowledge/page.mdx",
    "platforms/konnaxion/konnected/certifikation/page.mdx",
    "platforms/konnaxion/ethikos/korum/page.mdx",
    "platforms/konnaxion/ethikos/konsultations/page.mdx",
    "platforms/konnaxion/keenkonnect/konstruct/page.mdx",
    "platforms/konnaxion/keenkonnect/stockage/page.mdx",
    "platforms/konnaxion/kreative/kontact/page.mdx",
    "platforms/konnaxion/kreative/konservation/page.mdx",
    "platforms/konnaxion/kollective-intelligence/ekoh/page.mdx"
]

def run_batch_links():
    print(f"\n🔗 Running BATCH A: Fixing Broken Links...")
    count = 0
    for fix in LINK_FIXES:
        path = os.path.join(PROJECT_ROOT, fix["file"])
        if not os.path.exists(path):
            print(f"  ⚠️ File not found: {fix['file']}")
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if fix["find"] in content:
            new_content = content.replace(fix["find"], fix["replace"])
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✅ Fixed link in: {fix['file']}")
            count += 1
        else:
            print(f"  ℹ️ Link not found (already fixed?): {fix['file']}")
    print(f"  -> Fixed {count} files.")

def run_batch_h1():
    print(f"\n<h1> Running BATCH B: Injecting Missing H1s...")
    count = 0
    for rel_path in H1_TARGETS:
        path = os.path.join(PROJECT_ROOT, rel_path)
        if not os.path.exists(path):
            print(f"  ⚠️ File not found: {rel_path}")
            continue

        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if H1 already exists (simple check for '# ')
        if re.search(r"^#\s+", content, re.MULTILINE):
            print(f"  ℹ️ H1 already exists in: {rel_path}")
            continue

        # Extract title from metadata
        title_match = re.search(r'title:\s*["\'](.*?)["\']', content)
        if title_match:
            title = title_match.group(1)
            # Insert H1 after the metadata block
            # Looking for the closing '};' or similar of the export const metadata
            insert_pos = content.find("};")
            if insert_pos != -1:
                insert_pos += 2 # Move past };
                new_content = content[:insert_pos] + f"\n\n# {title}\n" + content[insert_pos:]
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  ✅ Added H1 '# {title}' to: {rel_path}")
                count += 1
            else:
                print(f"  ⚠️ Could not find metadata end in: {rel_path}")
        else:
            print(f"  ⚠️ Could not extract title from metadata in: {rel_path}")
    print(f"  -> Fixed {count} files.")

if __name__ == "__main__":
    print("Select Batch to Run:")
    print("1. Fix Broken Links (404s)")
    print("2. Fix Missing H1 Headers")
    print("3. Run ALL")
    
    choice = input("\nEnter 1, 2, or 3: ")
    
    if choice == "1" or choice == "3":
        run_batch_links()
    if choice == "2" or choice == "3":
        run_batch_h1()
    
    print("\n✨ Done.")