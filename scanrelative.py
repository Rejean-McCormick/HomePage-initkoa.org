# scanrelative.py
import os
import re
import json

# Set the root directory of your app (where 'app' folder is)
ROOT_DIR = "./app" 

# Regex to find Markdown links [label](../path) and HTML href="../path"
LINK_PATTERN = re.compile(r'(\[.*?\]\((\.\./[^)]+)\)|href=["\'](\.\./[^"\']+)["\'])')

def scan_for_relative_links(root_dir):
    log = []
    print(f"Scanning {root_dir} for relative links...")

    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.md', '.mdx', '.js', '.tsx', '.jsx')):
                filepath = os.path.join(subdir, file)
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Find all matches
                    matches = LINK_PATTERN.findall(content)
                    
                    for full_match, md_url, html_url in matches:
                        # Pick whichever group captured the URL
                        found_url = md_url if md_url else html_url
                        
                        log.append({
                            "file": filepath,
                            "bad_link": found_url,
                            "context": full_match
                        })
                except Exception as e:
                    print(f"Could not read {filepath}: {e}")

    return log

if __name__ == "__main__":
    findings = scan_for_relative_links(ROOT_DIR)
    
    print(f"\nFound {len(findings)} relative links.")
    
    # Save to JSON
    with open("relative_paths_report.json", "w", encoding='utf-8') as f:
        json.dump(findings, f, indent=2)
        
    print("Report saved to 'relative_paths_report.json'")