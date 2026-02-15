import argparse
import os
import re
from pathlib import Path

MD_EXTS = {".mdx", ".md"}

MD_LINK_RE = re.compile(r"\]\(([^)]+)\)")  # markdown (... )
HREF_RE = re.compile(r"""href\s*=\s*(['"])(.+?)\1""", re.IGNORECASE)

def is_relative_link(s: str) -> bool:
    s = s.strip()
    if not s:
        return False
    # Ignore anchors, absolute, schemes, mailto, tel, data, etc.
    if s.startswith("#") or s.startswith("/") or s.startswith(("http://", "https://", "mailto:", "tel:", "data:")):
        return False
    return s.startswith(".")  # we only touch ./ ../ ../../

def clean_link_target(link: str) -> str:
    # Strip query/hash for filesystem checks
    base = link.split("#", 1)[0].split("?", 1)[0]
    return base.strip()

def build_route_index(app_dir: Path):
    """
    Index all routes by scanning app/**/page.mdx.
    Returns:
      routes_by_abs_page: {abs_page_path: "/route"}
      routes_by_slug: {"slug": ["/route1", "/route2", ...]}
    """
    routes_by_abs_page = {}
    routes_by_slug = {}

    for page in app_dir.rglob("page.mdx"):
        rel_dir = page.parent.relative_to(app_dir).as_posix()
        route = "/" + rel_dir  # Next app routes match folder path
        routes_by_abs_page[page.resolve()] = route

        slug = page.parent.name
        routes_by_slug.setdefault(slug, []).append(route)

    return routes_by_abs_page, routes_by_slug

def resolve_to_route(file_path: Path, raw_link: str, app_dir: Path, routes_by_abs_page, routes_by_slug):
    """
    Return replacement route string or None (skip).
    Conservative: only replace when sure.
    """
    raw_link = raw_link.strip()
    if not is_relative_link(raw_link):
        return None

    link_fs = clean_link_target(raw_link)
    # relative link resolved from current file directory
    candidate = (file_path.parent / link_fs)

    # If it points to a directory, expect page.mdx inside
    if candidate.exists() and candidate.is_dir():
        page = (candidate / "page.mdx").resolve()
        route = routes_by_abs_page.get(page)
        if route:
            return route

    # If it points to a file:
    if candidate.exists() and candidate.is_file():
        # If they linked to somefile.mdx, try map to its directory if it's page.mdx
        if candidate.name == "page.mdx":
            route = routes_by_abs_page.get(candidate.resolve())
            if route:
                return route
        # Otherwise: skip (too risky)
        return None

    # If it doesn't exist, try slug matching (ONLY if unique)
    slug = Path(link_fs).name  # last component
    matches = routes_by_slug.get(slug, [])
    if len(matches) == 1:
        return matches[0]

    return None

def replace_in_text(text: str, file_path: Path, app_dir: Path, routes_by_abs_page, routes_by_slug):
    replacements = 0
    changes = []

    # Markdown links
    def md_sub(m):
        nonlocal replacements
        link = m.group(1)
        repl = resolve_to_route(file_path, link, app_dir, routes_by_abs_page, routes_by_slug)
        if repl and repl != link:
            replacements += 1
            changes.append((link, repl))
            return "](" + repl + ")"
        return m.group(0)

    new_text = MD_LINK_RE.sub(md_sub, text)

    # href="..."
    def href_sub(m):
        nonlocal replacements
        quote = m.group(1)
        link = m.group(2)
        repl = resolve_to_route(file_path, link, app_dir, routes_by_abs_page, routes_by_slug)
        if repl and repl != link:
            replacements += 1
            changes.append((link, repl))
            return f'href={quote}{repl}{quote}'
        return m.group(0)

    new_text2 = HREF_RE.sub(href_sub, new_text)

    return new_text2, replacements, changes

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".", help="Project root (where app/ lives)")
    ap.add_argument("--apply", action="store_true", help="Actually write changes (default is dry-run)")
    ap.add_argument("--backup", action="store_true", help="Write .bak copy before modifying")
    ap.add_argument("--max-file-kb", type=int, default=1024, help="Skip files larger than this (KB)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    app_dir = root / "app"
    if not app_dir.exists():
        print(f"ERROR: app/ folder not found under: {root}")
        return 2

    routes_by_abs_page, routes_by_slug = build_route_index(app_dir)
    print(f"Indexed routes: {len(routes_by_abs_page)} (from app/**/page.mdx)")

    changed_files = 0
    total_repls = 0

    for p in root.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() not in MD_EXTS:
            continue
        try:
            if p.stat().st_size > args.max_file_kb * 1024:
                continue
            text = p.read_text(encoding="utf-8")
        except Exception:
            continue

        new_text, reps, changes = replace_in_text(text, p, app_dir, routes_by_abs_page, routes_by_slug)
        if reps == 0:
            continue

        total_repls += reps
        changed_files += 1

        print(f"\nFILE: {p}")
        for (a, b) in changes[:30]:  # cap output
            print(f"  {a}  ->  {b}")
        if len(changes) > 30:
            print(f"  ... +{len(changes)-30} more")

        if args.apply:
            if args.backup:
                bak = p.with_suffix(p.suffix + ".bak")
                if not bak.exists():
                    bak.write_text(text, encoding="utf-8")
            p.write_text(new_text, encoding="utf-8")

    mode = "APPLY" if args.apply else "DRY-RUN"
    print("\n--------------------")
    print(f"Mode: {mode}")
    print(f"Files changed: {changed_files}")
    print(f"Total replacements: {total_repls}")
    print("--------------------")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
