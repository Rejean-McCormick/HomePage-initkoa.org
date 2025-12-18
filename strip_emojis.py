#!/usr/bin/env python3
# strip_emojis.py
"""
Strip icons (emoji/pictographs) from MD, MDX, JS, TS, JSX, and TSX files recursively.

Usage:
  python strip_icons.py          # Runs in current dir, writes changes
  python strip_icons.py --dry-run # Runs in current dir, only shows what would happen
  python strip_icons.py /my/path # Runs in specific path
"""

from __future__ import annotations
import argparse
import os
import re
from pathlib import Path

# Broad emoji / pictograph coverage (keeps accents/normal unicode letters).
EMOJI_RE = re.compile(
    "["
    # Emoticons
    "\U0001F600-\U0001F64F"
    # Misc Symbols and Pictographs
    "\U0001F300-\U0001F5FF"
    # Transport and Map
    "\U0001F680-\U0001F6FF"
    # Supplemental Symbols and Pictographs
    "\U0001F900-\U0001F9FF"
    # Symbols and Pictographs Extended-A
    "\U0001FA70-\U0001FAFF"
    # Flags
    "\U0001F1E6-\U0001F1FF"
    # Misc symbols + Dingbats (☑ ✓ ✨ etc.)
    "\u2600-\u26FF"
    "\u2700-\u27BF"
    # Variation selectors, ZWJ, keycap combining mark
    "\uFE0F"  # VS16
    "\u200D"  # ZWJ
    "\u20E3"  # keycap
    "]"
)

SKIN_TONE_RE = re.compile("[\U0001F3FB-\U0001F3FF]")

# Dirs to ignore to prevent wasting time or breaking libs
DEFAULT_SKIP_DIRS = {
    ".git", ".hg", ".svn",
    "node_modules", "dist", "build", "out",
    "_book", ".next", ".cache",
    ".venv", "venv", "__pycache__",
}

# File extensions to process
TARGET_EXTENSIONS = {".md", ".mdx", ".js", ".jsx", ".ts", ".tsx"}

def strip_icons(text: str) -> str:
    """Removes emojis and skin tone modifiers from text."""
    text = EMOJI_RE.sub("", text)
    text = SKIN_TONE_RE.sub("", text)
    return text

def process_file(path: Path, dry_run: bool) -> bool:
    """Reads a file, strips icons, and writes back if changed."""
    try:
        original = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        # Skip binary files or weird encodings silently
        return False
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return False

    cleaned = strip_icons(original)
    
    # If no emojis found, do nothing
    if cleaned == original:
        return False

    if not dry_run:
        path.write_text(cleaned, encoding="utf-8")

    return True

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Recursively remove emojis from source files (.md, .mdx, .js, .tsx, etc)."
    )
    
    # 'nargs="?"' makes the argument optional. 
    # 'default="."' means it defaults to the current folder if not provided.
    parser.add_argument(
        "root", 
        nargs="?", 
        default=".", 
        type=str, 
        help="Root folder to process (defaults to current directory)"
    )
    
    parser.add_argument(
        "--dry-run", 
        action="store_true", 
        help="Show what would change without actually writing to files"
    )
    
    args = parser.parse_args()

    # Resolve the path (handles relative paths like '.')
    root = Path(args.root).resolve()
    
    print(f"Scanning directory: {root}")
    print(f"Targeting extensions: {', '.join(TARGET_EXTENSIONS)}")
    
    if args.dry_run:
        print("--- DRY RUN MODE (No changes will be saved) ---")

    changed = 0
    scanned = 0

    for dirpath, dirnames, filenames in os.walk(root):
        # Modify dirnames in-place to skip unwanted directories
        dirnames[:] = [d for d in dirnames if d not in DEFAULT_SKIP_DIRS]

        for fn in filenames:
            p = Path(dirpath) / fn
            
            # Check extension
            if p.suffix.lower() not in TARGET_EXTENSIONS:
                continue
            
            scanned += 1
            
            if process_file(p, args.dry_run):
                changed += 1
                status = "DRY RUN (Would Change)" if args.dry_run else "CLEANED"
                # Print relative path for cleaner output
                try:
                    rel_path = p.relative_to(root)
                except ValueError:
                    rel_path = p
                print(f"[{status}] {rel_path}")

    print("-" * 40)
    print(f"Done.")
    print(f"Scanned files:  {scanned}")
    print(f"Modified files: {changed}")
    
    return 0

if __name__ == "__main__":
    raise SystemExit(main())