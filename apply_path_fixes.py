import json
import os

# --- CONFIGURATION ---
# The path to your JSON configuration file
JSON_FILE_PATH = r"C:\MyCode\OkidoWiki\HomePage\pathReplace.json"

# The root directory where your source files are located
# Based on your previous context, the files listed in JSON are inside the 'app' folder
PROJECT_ROOT = r"C:\MyCode\OkidoWiki\HomePage\app"

def main():
    print(f"🚀 Starting automated fix process...")
    print(f"📂 Reading configuration from: {JSON_FILE_PATH}")
    print(f"📂 Target Project Root: {PROJECT_ROOT}\n")

    # 1. Load the JSON configuration
    try:
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
            fix_list = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: The JSON file was not found at {JSON_FILE_PATH}")
        return
    except json.JSONDecodeError:
        print(f"❌ Error: Failed to decode JSON. Please check the file format.")
        return

    success_count = 0
    skip_count = 0
    error_count = 0

    # 2. Iterate through each fix entry
    for entry in fix_list:
        rel_path = entry.get("Source File")
        target_str = entry.get("Target Path")
        new_str = entry.get("New Path Needed")

        # Construct the full absolute path to the file
        file_path = os.path.join(PROJECT_ROOT, rel_path)

        try:
            # Check if file exists
            if not os.path.exists(file_path):
                print(f"⚠️  File Not Found: {rel_path}")
                error_count += 1
                continue

            # Read the file content
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if the target string exists in the file
            if target_str in content:
                # Perform the replacement
                new_content = content.replace(target_str, new_str)

                # Write the changes back to the file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

                print(f"✅ Fixed: {rel_path}")
                print(f"   └─ Replaced: '{target_str}'  ->  '{new_str}'")
                success_count += 1
            else:
                # String not found (likely already fixed)
                print(f"ℹ️  Skipped: {rel_path} (Target string not found)")
                skip_count += 1

        except Exception as e:
            print(f"❌ Error processing {rel_path}: {str(e)}")
            error_count += 1

    # 3. Final Summary
    print("\n" + "="*40)
    print(f"🎉 OPERATION COMPLETE")
    print(f"✅ Successful Fixes: {success_count}")
    print(f"ℹ️  Skipped (Already done): {skip_count}")
    print(f"❌ Errors/Not Found: {error_count}")
    print("="*40)

if __name__ == "__main__":
    main()