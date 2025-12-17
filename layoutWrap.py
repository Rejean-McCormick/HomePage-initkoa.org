import os

# Configuration: The styling wrapper matching your "Principles" page
# (Centered, white background, card look, typography enabled)
LAYOUT_CONTENT = """export default function SectionLayout({ children }) {
  return (
    <div className="max-w-5xl mx-auto my-12 px-6 py-10 bg-white border border-gray-200 rounded-lg shadow-sm prose prose-slate dark:prose-invert">
      {children}
    </div>
  );
}
"""

# The directories that need this formatting
TARGET_DIRS = [
    "app/platforms",
    "app/technology",
    "app/initiatives"
]

def apply_layouts():
    root_dir = os.getcwd()
    
    print(f"🎨 Applying centralized styling layout to {len(TARGET_DIRS)} sections...\n")

    for relative_dir in TARGET_DIRS:
        dir_path = os.path.join(root_dir, relative_dir)
        
        # Check if directory exists
        if not os.path.exists(dir_path):
            print(f"⚠️  Directory not found (skipped): {relative_dir}")
            continue

        layout_path = os.path.join(dir_path, "layout.js")

        # Check if layout already exists to avoid overwriting custom work
        if os.path.exists(layout_path):
            print(f"ℹ️  Layout already exists at: {layout_path}")
            print(f"   (Skipping to prevent overwriting existing logic)")
            continue

        try:
            with open(layout_path, "w", encoding="utf-8") as f:
                f.write(LAYOUT_CONTENT)
            print(f"✅ Created layout: {relative_dir}/layout.js")
        except Exception as e:
            print(f"❌ Error creating {layout_path}: {e}")

    print("\n---------------------------------------------------")
    print("🎉 Done! All sub-pages in these folders now inherit the centralized style.")
    print("   No need to edit individual MDX files.")
    print("---------------------------------------------------")

if __name__ == "__main__":
    apply_layouts()