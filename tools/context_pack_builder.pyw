from __future__ import annotations

import hashlib
import json
import os
import fnmatch
import queue
import re
import shutil
import subprocess
import threading
from datetime import datetime
from pathlib import Path
from tkinter import Tk, StringVar, BOTH, END, LEFT, RIGHT, X, Y
from tkinter import messagebox
from tkinter import ttk
from tkinter.scrolledtext import ScrolledText
from urllib.parse import urlparse


MYCODE = Path(r"C:\mycode")
INITKOA_REPO = MYCODE / "HomePage" / "HomePage"
OUTPUT_DIR = INITKOA_REPO / "public" / "context-packs"
MANIFEST_PATH = OUTPUT_DIR / "index.json"
SITEMAP_PATH = OUTPUT_DIR / "sitemap.xml"
CONTEXT_PACK_BASE_URL = "https://initkoa.org/context-packs"
TOOL_TARGET = INITKOA_REPO / "tools" / "context_pack_builder.pyw"
POLICY_TARGET = INITKOA_REPO / "tools" / "context_pack_policy.json"

REPOS = [
    ("Konnaxion", MYCODE / "Konnaxion" / "Konnaxion"),
    ("kOA-Linux", MYCODE / "kOA-Linux" / "koa-linux"),
    ("XKaliber", MYCODE / "XKaliber" / "XKaliber"),
    ("UCKK-Moodle", MYCODE / "UCKK" / "uckk-moodle"),
    ("SemantiK_Architect", MYCODE / "SemantiK_Architect" / "SemantiK_Architect"),
    ("SemantiK-Architect-GF-Zone-Auditor", MYCODE / "SemantiK-Architect-GF-Zone-Auditor" / "SemantiK-Architect-GF-Zone-Auditor"),
    ("science-silk-road-koali", MYCODE / "Science_Silk_Road"),
    ("partners-for-public-good", MYCODE / "PPG"),
    ("Projet_ORPHEE-Walk_Straight", MYCODE / "Orphee" / "orphee-walk-straight"),
    ("Orgo", MYCODE / "Orgo" / "Orgo"),
    ("Omni-Wiki-Rejean-King-Klown", MYCODE / "OmniWiki" / "Omni-Wiki-Rejean-King-Klown"),
    ("MediKristal", MYCODE / "MediKristal" / "MediKristal"),
    ("Ame-Artificielle", MYCODE / "AmeArtificielle" / "Ame-Artificielle"),
    ("Kristal_Farms", MYCODE / "Kristal_Farms" / "kristal-farms-docs"),
    ("kristal-framework", MYCODE / "Kristal" / "kristal-framework"),
    ("Konnaxion_Capsule_Manager", MYCODE / "Konnaxion" / "Konnaxion_Capsule_Manager"),
    ("Konductor", MYCODE / "Konductor" / "Konductor"),
    ("LevelUpDiag-Koa-Linux", MYCODE / "kOA-Linux" / "LevelUpDiag-Koali"),
    ("K-Port", MYCODE / "K-Port" / "K-Port"),
    ("Freeze-Vote-Rebuild_Operational-Peace-Framework", MYCODE / "FreezeVoteRebuild" / "Freeze-Vote-Rebuild_Operational-Peace-Framework"),
    ("Book-Civilizational_Coherence", MYCODE / "Books" / "Civilisational_Coherence"),
    ("konnaxion-ashoka-systems-change", MYCODE / "Ashoka"),
    ("UCKK_Assets", MYCODE / "UCKK" / "UCKK_Assets"),
    ("kOA_Digital_Ecosystem", MYCODE / "kOA" / "kOA_Digital_Ecosystem"),
    ("SenTient", MYCODE / "SenTient" / "SenTient"),
    ("VotingMachine", MYCODE / "VotingMachine" / "VotingMachine"),
]

COMMIT_MESSAGE = "Update context packs"

# Packs intentionally retired from this builder. They are removed from public/context-packs
# before the manifest is regenerated so stale files cannot remain published indefinitely.
RETIRED_PACK_FILES = {
    "initkoa-docs-context-pack.txt",
}

CREATE_NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)


# GitHub owners whose repositories must never be included or synchronized.
# The CSV audit supplied on 2026-08-25 identified MA-Gustave as the owner to exclude.
EXCLUDED_GITHUB_OWNERS = {"ma-gustave"}

# Wiki remotes verified by the supplied github-repos-wikis-clean.csv.
# These are hints/fallbacks only: Sync Wikis still probes GitHub online with git ls-remote,
# so a newly-created or removed wiki is handled correctly at runtime.
VERIFIED_WIKI_REMOTES = {
    str(MYCODE / "AmeArtificielle" / "Ame-Artificielle").casefold(): "https://github.com/Rejean-McCormick/Ame-Artificielle.wiki.git",
    str(MYCODE / "kOA" / "kOA_Digital_Ecosystem").casefold(): "https://github.com/Rejean-McCormick/kOA_Digital_Ecosystem.wiki.git",
    str(MYCODE / "kOA-Linux" / "koa-linux").casefold(): "https://github.com/Rejean-McCormick/kOA-Linux.wiki.git",
    str(MYCODE / "Konnaxion" / "Konnaxion").casefold(): "https://github.com/Rejean-McCormick/Konnaxion.wiki.git",
    str(MYCODE / "Kristal_Farms" / "kristal-farms-docs").casefold(): "https://github.com/Rejean-McCormick/Kristal_Farms.wiki.git",
    str(MYCODE / "Kristal" / "kristal-framework").casefold(): "https://github.com/Rejean-McCormick/kristal-framework.wiki.git",
    str(MYCODE / "MediKristal" / "MediKristal").casefold(): "https://github.com/Rejean-McCormick/MediKristal.wiki.git",
    str(MYCODE / "Orgo" / "Orgo").casefold(): "https://github.com/Rejean-McCormick/Orgo.wiki.git",
    str(MYCODE / "SemantiK_Architect" / "SemantiK_Architect").casefold(): "https://github.com/Rejean-McCormick/SemantiK_Architect.wiki.git",
    str(MYCODE / "SenTient" / "SenTient").casefold(): "https://github.com/Rejean-McCormick/SenTient.wiki.git",
}


class CommandError(RuntimeError):
    pass


def run_command(args, cwd=None, check=True):
    result = subprocess.run(
        [str(x) for x in args],
        cwd=str(cwd) if cwd else None,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        creationflags=CREATE_NO_WINDOW,
    )
    if check and result.returncode != 0:
        command = " ".join(str(x) for x in args)
        details = (result.stderr or result.stdout or "").strip()
        raise CommandError(f"{command}\n{details}")
    return result


def git(repo: Path, *args, check=True):
    return run_command(["git", "-C", repo, *args], check=check)


def is_git_repo(path: Path) -> bool:
    if not path.exists():
        return False
    result = git(path, "rev-parse", "--is-inside-work-tree", check=False)
    return result.returncode == 0 and result.stdout.strip() == "true"


def origin_remote_url(repo: Path) -> str | None:
    result = git(repo, "remote", "get-url", "origin", check=False)
    if result.returncode != 0:
        return None
    url = result.stdout.strip()
    return url or None


def github_repo_from_remote(repo: Path, fallback: str) -> str:
    url = origin_remote_url(repo)
    if not url:
        return fallback
    if url.startswith("git@") and ":" in url:
        owner_repo = url.split(":", 1)[1]
    else:
        owner_repo = urlparse(url).path.lstrip("/")
    if owner_repo.endswith(".git"):
        owner_repo = owner_repo[:-4]
    return owner_repo or fallback


def _github_owner_repo_from_url(url: str | None) -> tuple[str, str] | None:
    """Return (owner, repo) for a GitHub HTTPS/SSH remote, otherwise None."""
    if not url:
        return None
    value = url.strip()
    if value.startswith("git@github.com:"):
        owner_repo = value.split(":", 1)[1]
    else:
        parsed = urlparse(value)
        if parsed.hostname not in {"github.com", "www.github.com"}:
            return None
        owner_repo = parsed.path.lstrip("/")
    owner_repo = owner_repo.rstrip("/")
    if owner_repo.endswith(".git"):
        owner_repo = owner_repo[:-4]
    parts = owner_repo.split("/", 1)
    if len(parts) != 2 or not all(parts):
        return None
    return parts[0], parts[1]


def repo_is_excluded(repo: Path) -> bool:
    """Exclude Gustave-owned repos even if they are accidentally added to REPOS later."""
    # Local path guard handles a missing/broken Git origin.
    parts = {part.casefold() for part in repo.parts}
    if "gustave" in parts:
        return True
    parsed = _github_owner_repo_from_url(origin_remote_url(repo)) if repo.exists() else None
    return bool(parsed and parsed[0].casefold() in EXCLUDED_GITHUB_OWNERS)


def _wiki_remote_from_origin(url: str | None) -> str | None:
    if not url:
        return None
    parsed = _github_owner_repo_from_url(url)
    if not parsed:
        return None
    owner, repo_name = parsed
    if owner.casefold() in EXCLUDED_GITHUB_OWNERS:
        return None
    if url.startswith("git@github.com:"):
        return f"git@github.com:{owner}/{repo_name}.wiki.git"
    return f"https://github.com/{owner}/{repo_name}.wiki.git"


def wiki_remote_from_repo(repo: Path) -> str | None:
    """Resolve the wiki Git remote from the real origin, with CSV-verified fallback hints."""
    if repo_is_excluded(repo):
        return None
    derived = _wiki_remote_from_origin(origin_remote_url(repo))
    if derived:
        return derived
    return VERIFIED_WIKI_REMOTES.get(str(repo).casefold())


def _wiki_repo_name_from_remote(remote: str | None) -> str | None:
    """Extract the GitHub repository name without the trailing .wiki suffix."""
    if not remote:
        return None
    parsed = _github_owner_repo_from_url(remote)
    if not parsed:
        return None
    name = parsed[1]
    if name.casefold().endswith(".wiki"):
        name = name[:-5]
    return name or None


def _normalise_repo_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.casefold())


def wiki_path_for_repo(repo: Path) -> Path:
    """Return the canonical sibling wiki path based on the *GitHub repo name*."""
    remote_name = _wiki_repo_name_from_remote(wiki_remote_from_repo(repo))
    folder_name = f"{remote_name}.wiki" if remote_name else f"{repo.name}.wiki"
    return repo.parent / folder_name


def existing_wiki_path_for_repo(repo: Path) -> Path | None:
    """Find an already-present sibling wiki without renaming, pulling or overwriting it.

    Besides GitHub's canonical ``<repo>.wiki`` name, this recognizes older local
    conventions such as ``<repo>-wiki`` (for example ``koa-linux-wiki``).
    """
    canonical = wiki_path_for_repo(repo)
    candidates = [
        canonical,
        repo.parent / f"{repo.name}.wiki",
        repo.parent / f"{repo.name}-wiki",
        repo.parent / f"{repo.name}_wiki",
    ]
    seen: set[str] = set()
    for candidate in candidates:
        key = str(candidate).casefold()
        if key in seen:
            continue
        seen.add(key)
        if candidate.exists() and candidate.is_dir():
            return candidate

    remote_name = _wiki_repo_name_from_remote(wiki_remote_from_repo(repo)) or repo.name
    wanted = {_normalise_repo_name(remote_name), _normalise_repo_name(repo.name)}
    try:
        siblings = list(repo.parent.iterdir())
    except OSError:
        return None

    for sibling in siblings:
        if not sibling.is_dir() or sibling == repo:
            continue
        name = sibling.name
        base = re.sub(r"(?:\.wiki|-wiki|_wiki)$", "", name, flags=re.IGNORECASE)
        if base == name:
            continue
        if _normalise_repo_name(base) in wanted:
            return sibling
    return None

def _run_git_network(args, cwd=None):
    """Run a non-interactive Git network command used only for optional wikis."""
    env = os.environ.copy()
    env.setdefault("GIT_TERMINAL_PROMPT", "0")
    return subprocess.run(
        [str(x) for x in args],
        cwd=str(cwd) if cwd else None,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        creationflags=CREATE_NO_WINDOW,
        env=env,
    )


def sync_wiki_for_repo(label: str, repo: Path, log=None) -> dict:
    """Clone a missing wiki beside its repo. Existing local wiki folders are never touched."""
    if repo_is_excluded(repo):
        if log:
            log("    Repo MA-Gustave : exclu")
        return {"label": label, "path": None, "status": "excluded", "changed": False}

    existing = existing_wiki_path_for_repo(repo)
    if existing is not None:
        if log:
            log(f"    Wiki local présent : {existing.name} [conservé, aucun overwrite]")
        return {"label": label, "path": existing, "status": "existing", "changed": False}

    wiki_path = wiki_path_for_repo(repo)
    if not is_git_repo(repo):
        return {"label": label, "path": wiki_path, "status": "repo-unavailable", "changed": False}

    wiki_remote = wiki_remote_from_repo(repo)
    if not wiki_remote:
        return {"label": label, "path": wiki_path, "status": "no-origin", "changed": False}

    # Always query GitHub/Git online. Repositories without a wiki are optional and ignored.
    probe = _run_git_network(["git", "ls-remote", "--exit-code", wiki_remote, "HEAD"])
    if probe.returncode != 0 or not probe.stdout.strip():
        if log:
            log("    Wiki distant : aucun / inaccessible [ignoré]")
        return {"label": label, "path": wiki_path, "status": "missing", "changed": False}

    temp_path = repo.parent / f".{wiki_path.name}.context-pack-clone-tmp"
    if temp_path.exists():
        shutil.rmtree(temp_path, ignore_errors=True)

    clone = _run_git_network(["git", "clone", "--quiet", wiki_remote, temp_path])
    if clone.returncode != 0:
        shutil.rmtree(temp_path, ignore_errors=True)
        if log:
            log("    Wiki distant détecté mais clone impossible [ignoré]")
        return {"label": label, "path": wiki_path, "status": "clone-failed", "changed": False}

    # Never overwrite if any recognized local wiki appeared while cloning.
    appeared = existing_wiki_path_for_repo(repo)
    if appeared is not None:
        shutil.rmtree(temp_path, ignore_errors=True)
        if log:
            log(f"    Wiki local apparu pendant le clone : {appeared.name} [conservé]")
        return {"label": label, "path": appeared, "status": "existing", "changed": False}

    temp_path.rename(wiki_path)
    if log:
        log(f"    Wiki cloné : {wiki_path}")
    return {"label": label, "path": wiki_path, "status": "cloned", "changed": True}

def included_repos():
    """Configured repositories minus explicitly excluded GitHub owners (MA-Gustave)."""
    return [(label, repo) for label, repo in REPOS if not repo_is_excluded(repo)]


def sync_all_wikis(log):
    results = []
    active = included_repos()
    excluded_count = len(REPOS) - len(active)
    log("SYNC WIKIS (query Git en ligne; clone seulement si absent localement)")
    if excluded_count:
        log(f"Repos MA-Gustave exclus : {excluded_count}")
    for index, (label, repo) in enumerate(active, 1):
        log(f"[{index}/{len(active)}] {label}")
        try:
            results.append(sync_wiki_for_repo(label, repo, log))
        except Exception as exc:
            # Wiki support is optional: never block Context Pack generation.
            results.append({"label": label, "path": wiki_path_for_repo(repo), "status": "error", "changed": False, "error": str(exc)})
            log(f"    Wiki : erreur ignorée : {exc}")
    cloned = sum(1 for r in results if r.get("status") == "cloned")
    existing = sum(1 for r in results if r.get("status") == "existing")
    log(f"Wikis : {cloned} cloné(s), {existing} déjà présent(s); absents distants ignorés.")
    return results


def current_commit(repo: Path) -> str:
    result = git(repo, "rev-parse", "HEAD", check=False)
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def markdown_dirty(repo: Path) -> bool:
    result = git(
        repo,
        "status",
        "--porcelain",
        "--untracked-files=normal",
        "--",
        ":(glob)**/*.md",
        check=False,
    )
    return bool(result.stdout.strip())


def git_markdown_files(repo: Path) -> list[Path]:
    """Return committed Markdown only for public Context Pack builds."""
    result = subprocess.run(
        ["git", "-C", str(repo), "ls-files", "-z", "--cached", "--", ":(glob)**/*.md"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        creationflags=CREATE_NO_WINDOW,
    )
    if result.returncode != 0:
        err = result.stderr.decode("utf-8", errors="replace").strip()
        raise CommandError(f"Impossible de lister les Markdown dans {repo}\n{err}")
    raw_paths = [x.decode("utf-8", errors="surrogateescape") for x in result.stdout.split(b"\0") if x]
    relative_paths = sorted(set(raw_paths), key=lambda s: (s.lower(), s))
    return [repo / Path(rel) for rel in relative_paths if (repo / Path(rel)).is_file()]


def markdown_files_in_folder(folder: Path) -> list[Path]:
    """List Markdown from a Git checkout, or recursively from a plain local wiki folder."""
    if not folder.exists() or not folder.is_dir():
        return []
    if is_git_repo(folder):
        return git_markdown_files(folder)
    files = [p for p in folder.rglob("*.md") if p.is_file() and ".git" not in p.parts]
    return sorted(files, key=lambda p: (p.relative_to(folder).as_posix().lower(), p.relative_to(folder).as_posix()))


def load_context_pack_policy() -> dict:
    if not POLICY_TARGET.exists():
        raise FileNotFoundError(f"Politique Context Pack absente : {POLICY_TARGET}")
    try:
        policy = json.loads(POLICY_TARGET.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"Politique Context Pack invalide : {exc}") from exc
    if policy.get("schemaVersion") != 1:
        raise RuntimeError(f"schemaVersion de politique non supportée : {policy.get('schemaVersion')}")
    if not str(policy.get("policyVersion") or "").strip():
        raise RuntimeError("policyVersion manquante dans context_pack_policy.json")
    return policy


def _policy_repo_entry(policy: dict, label: str, remote_name: str) -> dict:
    repositories = policy.get("repositories") or {}
    wanted = {label.casefold(), remote_name.casefold(), remote_name.split("/")[-1].casefold()}
    merged: dict = {}
    merged_rules: list[dict] = []
    for key, value in repositories.items():
        if str(key).casefold() not in wanted or not isinstance(value, dict):
            continue
        merged.update({k: v for k, v in value.items() if k != "rules"})
        if isinstance(value.get("rules"), list):
            merged_rules.extend(x for x in value["rules"] if isinstance(x, dict))
    if merged_rules:
        merged["rules"] = merged_rules
    return merged


def _matches_policy_pattern(rel: str, pattern: str) -> bool:
    rel_norm = rel.replace("\\", "/").casefold()
    pattern_norm = str(pattern or "").replace("\\", "/").casefold()
    return bool(pattern_norm) and fnmatch.fnmatchcase(rel_norm, pattern_norm)


def classify_policy_path(policy: dict, repo_policy: dict, rel: str) -> tuple[str, bool, str]:
    for pattern in policy.get("globalExclusions") or []:
        if _matches_policy_pattern(rel, pattern):
            return "historical", False, f"global:{pattern}"

    authority = "canonical"
    included_authorities = set(policy.get("publicBuild", {}).get("includedAuthorities") or ["canonical", "reference"] )
    include = authority in included_authorities
    reason = "default"

    for rule in repo_policy.get("rules") or []:
        pattern = rule.get("pattern")
        if not pattern or not _matches_policy_pattern(rel, pattern):
            continue
        authority = str(rule.get("authority") or authority).strip().lower() or authority
        include = bool(rule.get("include")) if "include" in rule else authority in included_authorities
        reason = f"repo:{pattern}"

    return authority, include, reason


def slugify(value: str) -> str:
    repo_name = value.rstrip("/").split("/")[-1].removesuffix(".git")
    return re.sub(r"[^A-Za-z0-9]+", "-", repo_name).strip("-").lower() or "context"


def read_markdown(path: Path) -> str:
    raw = path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        text = raw.decode("utf-8-sig")
    else:
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError:
            text = raw.decode("cp1252", errors="replace")
    return text.replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"


def existing_pack_hash(path: Path):
    if not path.exists():
        return None
    try:
        with path.open("r", encoding="utf-8", errors="replace") as f:
            for _ in range(30):
                line = f.readline()
                if not line:
                    break
                if line.startswith("content_sha256:"):
                    return line.split(":", 1)[1].strip()
    except OSError:
        return None
    return None


def make_pack(label: str, repo: Path, policy: dict | None = None):
    if not repo.exists():
        raise FileNotFoundError(f"Dossier absent : {repo}")
    if not is_git_repo(repo):
        raise RuntimeError(f"Ce dossier n'est pas un repo Git : {repo}")

    policy = policy or load_context_pack_policy()
    policy_version = str(policy["policyVersion"])
    build_policy = policy.get("publicBuild") or {}
    require_clean = bool(build_policy.get("requireCleanMarkdown", True))

    remote_name = github_repo_from_remote(repo, label)
    repo_policy = _policy_repo_entry(policy, label, remote_name)
    commit = current_commit(repo)
    dirty = markdown_dirty(repo)
    if require_clean and dirty:
        raise RuntimeError("Working tree Markdown dirty : commit/stash requis avant un build public.")

    repo_markdown_files = git_markdown_files(repo)
    wiki_path = existing_wiki_path_for_repo(repo) or wiki_path_for_repo(repo)
    wiki_is_git = is_git_repo(wiki_path)
    wiki_dirty = markdown_dirty(wiki_path) if wiki_is_git else False
    if require_clean and wiki_dirty:
        raise RuntimeError(f"Wiki Markdown dirty : {wiki_path}")

    warnings: list[str] = []
    if wiki_path.exists() and not wiki_is_git:
        plain_mode = str(build_policy.get("plainWikiMode") or "ignore").lower()
        if plain_mode == "error":
            raise RuntimeError(f"Wiki local non-Git interdit pour un build public : {wiki_path}")
        wiki_markdown_files: list[Path] = []
        warnings.append(f"Wiki non-Git ignoré : {wiki_path}")
    else:
        wiki_markdown_files = git_markdown_files(wiki_path) if wiki_is_git else []

    wiki_commit = current_commit(wiki_path) if wiki_is_git else ("ignored-non-git" if wiki_path.exists() else "none")

    candidates: list[tuple[str, Path, str]] = []
    for path in repo_markdown_files:
        candidates.append((path.relative_to(repo).as_posix(), path, "repo"))
    for path in wiki_markdown_files:
        candidates.append((f"wiki/{path.relative_to(wiki_path).as_posix()}", path, "wiki"))
    candidates.sort(key=lambda item: (item[0].casefold(), item[0]))

    source_file_count = len(candidates)
    file_entries: list[tuple[str, str, str]] = []
    excluded_records: list[tuple[str, str, str]] = []
    duplicate_records: list[tuple[str, str]] = []
    hash_material = bytearray()
    seen_content: dict[str, str] = {}
    authority_counts: dict[str, int] = {}
    content_bytes = 0

    for pack_rel, path, _source_kind in candidates:
        authority, include, reason = classify_policy_path(policy, repo_policy, pack_rel)
        if not include:
            excluded_records.append((pack_rel, authority, reason))
            continue

        content = read_markdown(path)
        content_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()
        if content_hash in seen_content:
            duplicate_records.append((pack_rel, seen_content[content_hash]))
            continue
        seen_content[content_hash] = pack_rel

        file_entries.append((pack_rel, content, authority))
        authority_counts[authority] = authority_counts.get(authority, 0) + 1
        encoded = content.encode("utf-8")
        content_bytes += len(encoded)
        hash_material.extend(pack_rel.encode("utf-8"))
        hash_material.extend(b"\0")
        hash_material.extend(authority.encode("utf-8"))
        hash_material.extend(b"\0")
        hash_material.extend(encoded)
        hash_material.extend(b"\0")

    content_hash = hashlib.sha256(bytes(hash_material)).hexdigest()
    output_path = OUTPUT_DIR / f"{slugify(remote_name)}-context-pack.txt"
    excluded_file_count = len(excluded_records) + len(duplicate_records)
    duplicate_file_count = len(duplicate_records)

    result_base = {
        "label": label,
        "remote": remote_name,
        "output": output_path,
        "files": len(file_entries),
        "repo_files": len(repo_markdown_files),
        "wiki_files": len(wiki_markdown_files),
        "wiki_path": wiki_path,
        "hash": content_hash,
        "source_file_count": source_file_count,
        "excluded_file_count": excluded_file_count,
        "duplicate_file_count": duplicate_file_count,
        "content_bytes": content_bytes,
        "authority_counts": authority_counts,
        "warnings": warnings,
    }

    existing_header = read_pack_header(output_path) if output_path.exists() else {}
    if (
        existing_header.get("content_sha256") == content_hash
        and existing_header.get("policy_version") == policy_version
    ):
        return {**result_base, "changed": False}

    generated_at = datetime.now().astimezone().isoformat(timespec="seconds")
    lines = [
        "# INITKOA CONTEXT PACK",
        "",
        f"repository: {remote_name}",
        f"source_path: {repo}",
        f"source_commit: {commit}",
        f"working_tree_markdown: {'dirty' if dirty else 'clean'}",
        f"wiki_source_path: {wiki_path if wiki_path.exists() else 'none'}",
        f"wiki_source_commit: {wiki_commit}",
        f"wiki_working_tree_markdown: {'dirty' if wiki_dirty else ('clean' if wiki_is_git else ('not-git' if wiki_path.exists() else 'none'))}",
        f"policy_version: {policy_version}",
        f"repo_files: {len(repo_markdown_files)}",
        f"wiki_files: {len(wiki_markdown_files)}",
        f"source_files: {source_file_count}",
        f"included_files: {len(file_entries)}",
        f"excluded_files: {excluded_file_count}",
        f"duplicate_files: {duplicate_file_count}",
        f"content_bytes: {content_bytes}",
        f"authority_counts: {json.dumps(authority_counts, ensure_ascii=False, sort_keys=True, separators=(',', ':'))}",
        f"generated_at: {generated_at}",
        f"files: {len(file_entries)}",
        f"content_sha256: {content_hash}",
        "",
        "=" * 96,
        "FILE INDEX",
        "=" * 96,
        "",
    ]

    if file_entries:
        width = len(str(len(file_entries)))
        for index, (rel, _, authority) in enumerate(file_entries, 1):
            lines.append(f"{index:0{width}d}. [{authority}] {rel}")
    else:
        lines.append("(aucun fichier Markdown)")

    if excluded_records or duplicate_records:
        lines.extend(["", "", "=" * 96, "EXCLUDED FILES", "=" * 96, ""] )
        for rel, authority, reason in excluded_records:
            lines.append(f"- [{authority}] {rel} ({reason})")
        for rel, kept in duplicate_records:
            lines.append(f"- [duplicate] {rel} (same content as {kept})")

    lines.extend(["", ""])
    for rel, content, authority in file_entries:
        lines.extend(["=" * 96, f"FILE: {rel}", f"AUTHORITY: {authority}", "=" * 96, "", content.rstrip("\n"), "", ""])

    final_text = "\n".join(lines).rstrip() + "\n"
    pack_bytes = len(final_text.encode("utf-8"))
    warning_bytes = int(build_policy.get("warningBytes") or 0)
    max_bytes = int(build_policy.get("maxBytes") or 0)
    if max_bytes and pack_bytes > max_bytes:
        raise RuntimeError(f"Pack trop volumineux : {pack_bytes} octets > maxBytes={max_bytes}")
    if warning_bytes and pack_bytes > warning_bytes:
        warnings.append(f"Pack volumineux : {pack_bytes} octets > warningBytes={warning_bytes}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    temp_path = output_path.with_suffix(output_path.suffix + ".tmp")
    temp_path.write_text(final_text, encoding="utf-8", newline="\n")
    temp_path.replace(output_path)

    return {**result_base, "pack_bytes": pack_bytes, "warnings": warnings, "changed": True}



def pack_slug_from_filename(filename: str) -> str:
    name = re.sub(r"\.txt$", "", filename, flags=re.IGNORECASE)
    name = re.sub(r"-context-pack(?:--.*)?$", "", name, flags=re.IGNORECASE)
    return name.lower()


def read_pack_header(path: Path) -> dict[str, str]:
    header: dict[str, str] = {}
    try:
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for _ in range(40):
                line = handle.readline()
                if not line:
                    break
                stripped = line.strip()
                if not stripped or stripped.startswith("#") or stripped.startswith("="):
                    continue
                if ":" not in stripped:
                    continue
                key, value = stripped.split(":", 1)
                key = key.strip()
                if key in {
                    "repository",
                    "source_commit",
                    "generated_at",
                    "files",
                    "content_sha256",
                    "policy_version",
                    "source_files",
                    "included_files",
                    "excluded_files",
                    "duplicate_files",
                    "content_bytes",
                    "authority_counts",
                }:
                    header[key] = value.strip()
    except OSError:
        pass
    return header


def _header_int(header: dict[str, str], key: str) -> int | None:
    try:
        value = header.get(key)
        return int(value) if value not in {None, ""} else None
    except (TypeError, ValueError):
        return None


def write_manifest(log=None, policy: dict | None = None) -> bool:
    """Generate public/context-packs/index.json from the actual published .txt files."""
    policy = policy or load_context_pack_policy()
    policy_version = str(policy["policyVersion"])
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    packs = []

    for pack_path in sorted(OUTPUT_DIR.glob("*.txt"), key=lambda p: p.name.lower()):
        header = read_pack_header(pack_path)
        slug = pack_slug_from_filename(pack_path.name)
        full_sha256 = hashlib.sha256(pack_path.read_bytes()).hexdigest()
        category = "general" if slug in {"grammatical-framework", "senior-architect"} else "system"
        try:
            authority_counts = json.loads(header.get("authority_counts") or "{}")
            if not isinstance(authority_counts, dict):
                authority_counts = {}
        except json.JSONDecodeError:
            authority_counts = {}

        packs.append(
            {
                "slug": slug,
                "file": pack_path.name,
                "repository": header.get("repository"),
                "sourceCommit": header.get("source_commit"),
                "generatedAt": header.get("generated_at"),
                "fileCount": _header_int(header, "files"),
                "sha256": full_sha256,
                "category": category,
                "policyVersion": header.get("policy_version"),
                "sourceFileCount": _header_int(header, "source_files"),
                "includedFileCount": _header_int(header, "included_files"),
                "excludedFileCount": _header_int(header, "excluded_files"),
                "duplicateFileCount": _header_int(header, "duplicate_files"),
                "contentBytes": _header_int(header, "content_bytes"),
                "authorityCounts": authority_counts,
            }
        )

    core = {"schemaVersion": 2, "policyVersion": policy_version, "packs": packs}

    if MANIFEST_PATH.exists():
        try:
            existing = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
            if {
                "schemaVersion": existing.get("schemaVersion"),
                "policyVersion": existing.get("policyVersion"),
                "packs": existing.get("packs"),
            } == core:
                if log:
                    log("Manifest : identique.")
                return False
        except (OSError, json.JSONDecodeError, TypeError):
            pass

    payload = {
        "schemaVersion": 2,
        "policyVersion": policy_version,
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "packs": packs,
    }
    temp_path = MANIFEST_PATH.with_suffix(".json.tmp")
    temp_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    temp_path.replace(MANIFEST_PATH)
    if log:
        log(f"Manifest : {len(packs)} pack(s) -> {MANIFEST_PATH.name}")
    return True


def write_context_pack_sitemap(log=None) -> bool:
    if not MANIFEST_PATH.exists():
        raise RuntimeError(f"Manifest absent : {MANIFEST_PATH}")
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    files = [str(pack.get("file") or "").strip() for pack in manifest.get("packs") or []]
    files = sorted(file for file in files if file.lower().endswith(".txt"))
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for file_name in files:
        # Builder filenames are URL-safe slugs; keep them stable and human-readable.
        lines.extend([
            "  <url>",
            f"    <loc>{CONTEXT_PACK_BASE_URL}/{file_name}</loc>",
            "  </url>",
        ])
    lines.append("</urlset>")
    content = "\n".join(lines) + "\n"
    if SITEMAP_PATH.exists() and SITEMAP_PATH.read_text(encoding="utf-8") == content:
        if log:
            log("Sitemap Context Packs : identique.")
        return False
    temp = SITEMAP_PATH.with_suffix(".xml.tmp")
    temp.write_text(content, encoding="utf-8", newline="\n")
    temp.replace(SITEMAP_PATH)
    if log:
        log(f"Sitemap Context Packs : {len(files)} URL(s) -> {SITEMAP_PATH.name}")
    return True


def cleanup_retired_packs(log=None) -> int:
    """Delete context packs that are no longer managed/published by this builder."""
    removed = 0
    for file_name in sorted(RETIRED_PACK_FILES):
        path = OUTPUT_DIR / file_name
        if not path.exists():
            continue
        try:
            path.unlink()
            removed += 1
            if log:
                log(f"Pack retiré : {file_name}")
        except OSError as exc:
            raise RuntimeError(f"Impossible de retirer le pack obsolète {path}: {exc}") from exc
    return removed


def install_self_into_initkoa():
    source = Path(__file__).resolve()
    TOOL_TARGET.parent.mkdir(parents=True, exist_ok=True)
    try:
        if source == TOOL_TARGET.resolve():
            return False
    except OSError:
        pass
    source_bytes = source.read_bytes()
    if TOOL_TARGET.exists() and TOOL_TARGET.read_bytes() == source_bytes:
        return False
    TOOL_TARGET.write_bytes(source_bytes)
    return True


def install_policy_into_initkoa():
    source = Path(__file__).resolve().with_name("context_pack_policy.json")
    if not source.exists():
        if POLICY_TARGET.exists():
            return False
        raise FileNotFoundError(f"Politique Context Pack absente à côté du builder : {source}")
    POLICY_TARGET.parent.mkdir(parents=True, exist_ok=True)
    try:
        if source == POLICY_TARGET.resolve():
            return False
    except OSError:
        pass
    source_bytes = source.read_bytes()
    if POLICY_TARGET.exists() and POLICY_TARGET.read_bytes() == source_bytes:
        return False
    POLICY_TARGET.write_bytes(source_bytes)
    return True


def build_all(log):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if install_self_into_initkoa():
        log(f"Builder copié dans : {TOOL_TARGET}")
    if install_policy_into_initkoa():
        log(f"Politique copiée dans : {POLICY_TARGET}")
    policy = load_context_pack_policy()
    log(f"Politique corpus : {policy['policyVersion']}")

    # Optional GitHub wikis are materialized once, beside each repository.
    # Existing local wiki directories are deliberately never pulled or overwritten.
    sync_all_wikis(log)

    results = []
    active = included_repos()
    for index, (label, repo) in enumerate(active, 1):
        log(f"[{index}/{len(active)}] {label}")
        try:
            result = make_pack(label, repo, policy)
            results.append(result)
            marker = "MODIFIÉ" if result["changed"] else "identique"
            log(f"    {result['files']} .md -> {result['output'].name} [{marker}]")
            for warning in result.get("warnings") or []:
                log(f"    AVERTISSEMENT : {warning}")
        except Exception as exc:
            results.append({"label": label, "path": repo, "error": str(exc), "files": 0, "changed": False})
            log(f"    ERREUR : {exc}")
    cleanup_retired_packs(log)
    write_manifest(log, policy)
    write_context_pack_sitemap(log)
    return results


def sync_initkoa(log, pull_first=True):
    if not is_git_repo(INITKOA_REPO):
        raise RuntimeError(f"Repo initkoa introuvable ou non Git : {INITKOA_REPO}")

    install_self_into_initkoa()
    install_policy_into_initkoa()
    policy = load_context_pack_policy()
    if pull_first:
        log("Git : pull --rebase --autostash...")
        git(INITKOA_REPO, "pull", "--rebase", "--autostash")

    # Keep the published directory and manifest coherent even when the user runs Sync only.
    cleanup_retired_packs(log)
    write_manifest(log, policy)
    write_context_pack_sitemap(log)

    relative_output = OUTPUT_DIR.relative_to(INITKOA_REPO).as_posix()
    relative_tool = TOOL_TARGET.relative_to(INITKOA_REPO).as_posix()
    relative_policy = POLICY_TARGET.relative_to(INITKOA_REPO).as_posix()

    log("Git : staging des Context Packs, du builder et de la politique...")
    git(INITKOA_REPO, "add", "--", relative_output, relative_tool, relative_policy)
    diff = git(INITKOA_REPO, "diff", "--cached", "--quiet", "--", relative_output, relative_tool, relative_policy, check=False)

    if diff.returncode == 0:
        log("Git : aucun changement à committer.")
    elif diff.returncode == 1:
        stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M")
        message = f"{COMMIT_MESSAGE} ({stamp})"
        log(f"Git : commit « {message} »")
        git(INITKOA_REPO, "commit", "--only", "-m", message, "--", relative_output, relative_tool, relative_policy)
    else:
        raise CommandError("Impossible de déterminer les changements Git.")

    log("Git : push...")
    git(INITKOA_REPO, "push")
    log("Git : sync terminé.")


class ContextPackApp(Tk):
    def __init__(self):
        super().__init__()
        self.title("INITKOA Context Pack Builder")
        self.geometry("1120x760")
        self.minsize(850, 560)
        self.work_queue = queue.Queue()
        self.is_working = False
        self.status_var = StringVar(value="Prêt.")
        self._build_ui()
        self.after(100, self._process_queue)
        self.after(250, self.refresh_repo_status)

    def _build_ui(self):
        top = ttk.Frame(self, padding=12)
        top.pack(fill=X)
        ttk.Label(top, text="INITKOA Context Pack Builder", font=("Segoe UI", 15, "bold")).pack(side=LEFT)
        ttk.Label(top, text=str(OUTPUT_DIR), font=("Segoe UI", 9)).pack(side=LEFT, padx=(18, 0))

        buttons = ttk.Frame(self, padding=(12, 0, 12, 8))
        buttons.pack(fill=X)
        self.build_sync_button = ttk.Button(buttons, text="Build All + Sync", command=self.build_and_sync)
        self.build_sync_button.pack(side=LEFT)
        self.build_button = ttk.Button(buttons, text="Build All", command=self.build_only)
        self.build_button.pack(side=LEFT, padx=(8, 0))
        self.sync_button = ttk.Button(buttons, text="Sync initkoa", command=self.sync_only)
        self.sync_button.pack(side=LEFT, padx=(8, 0))
        self.wiki_button = ttk.Button(buttons, text="Sync Wikis", command=self.sync_wikis_only)
        self.wiki_button.pack(side=LEFT, padx=(8, 0))
        ttk.Button(buttons, text="Ouvrir les packs", command=self.open_output).pack(side=RIGHT)
        ttk.Button(buttons, text="Actualiser", command=self.refresh_repo_status).pack(side=RIGHT, padx=(0, 8))

        table_frame = ttk.Frame(self, padding=(12, 0, 12, 8))
        table_frame.pack(fill=BOTH, expand=True)
        columns = ("repo", "path", "md", "wiki", "status")
        self.tree = ttk.Treeview(table_frame, columns=columns, show="headings", height=17)
        for col, text in [("repo", "Repo"), ("path", "Chemin local"), ("md", "Repo .md"), ("wiki", "Wiki .md"), ("status", "État")]:
            self.tree.heading(col, text=text)
        self.tree.column("repo", width=235, minwidth=180)
        self.tree.column("path", width=500, minwidth=280)
        self.tree.column("md", width=75, anchor="center", stretch=False)
        self.tree.column("wiki", width=75, anchor="center", stretch=False)
        self.tree.column("status", width=180, minwidth=120)
        scroll_y = ttk.Scrollbar(table_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scroll_y.set)
        self.tree.pack(side=LEFT, fill=BOTH, expand=True)
        scroll_y.pack(side=RIGHT, fill=Y)

        log_frame = ttk.LabelFrame(self, text="Journal", padding=8)
        log_frame.pack(fill=BOTH, expand=True, padx=12, pady=(0, 8))
        self.log_box = ScrolledText(log_frame, height=12, wrap="word", font=("Consolas", 9))
        self.log_box.pack(fill=BOTH, expand=True)
        ttk.Label(self, textvariable=self.status_var, padding=(12, 0, 12, 10)).pack(fill=X)

    def log(self, text):
        self.work_queue.put(("log", str(text)))

    def _append_log(self, text):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_box.insert(END, f"[{timestamp}] {text}\n")
        self.log_box.see(END)

    def _set_working(self, value):
        self.is_working = value
        state = "disabled" if value else "normal"
        self.build_sync_button.configure(state=state)
        self.build_button.configure(state=state)
        self.sync_button.configure(state=state)
        self.wiki_button.configure(state=state)

    def _run_background(self, name, function):
        if self.is_working:
            return
        self._set_working(True)
        self.status_var.set(name)
        def worker():
            try:
                result = function()
                self.work_queue.put(("done", (name, result, None)))
            except Exception as exc:
                self.work_queue.put(("done", (name, None, exc)))
        threading.Thread(target=worker, daemon=True).start()

    def _process_queue(self):
        try:
            while True:
                kind, payload = self.work_queue.get_nowait()
                if kind == "log":
                    self._append_log(payload)
                elif kind == "done":
                    name, result, error = payload
                    self._set_working(False)
                    if error:
                        self.status_var.set(f"Erreur : {error}")
                        self._append_log(f"ERREUR : {error}")
                        messagebox.showerror("Erreur", str(error))
                    else:
                        self.status_var.set(f"{name} terminé.")
                        self._append_log(f"{name} terminé.")
                    self.refresh_repo_status()
        except queue.Empty:
            pass
        self.after(100, self._process_queue)

    def refresh_repo_status(self):
        if self.is_working:
            return
        for item in self.tree.get_children():
            self.tree.delete(item)
        active = included_repos()
        for label, repo in active:
            repo_display = label
            wiki_path = existing_wiki_path_for_repo(repo) or wiki_path_for_repo(repo)
            wiki_count = "-"
            if not repo.exists():
                md_count, status = "-", "ABSENT"
            elif not is_git_repo(repo):
                md_count, status = "-", "PAS GIT"
            else:
                try:
                    md_count = str(len(git_markdown_files(repo)))
                    repo_display = github_repo_from_remote(repo, label)
                    if wiki_path.exists():
                        wiki_count = str(len(markdown_files_in_folder(wiki_path)))
                        status = "OK + WIKI"
                    else:
                        status = "OK"
                except Exception:
                    md_count, wiki_count, status = "?", "?", "ERREUR"
            self.tree.insert("", END, values=(repo_display, str(repo), md_count, wiki_count, status))
        excluded_count = len(REPOS) - len(active)
        suffix = f"; {excluded_count} MA-Gustave exclu(s)" if excluded_count else ""
        self.status_var.set(f"{len(active)} repos inclus{suffix}. Destination : {OUTPUT_DIR}")

    def build_only(self):
        def task():
            self.log("=" * 72)
            self.log("BUILD ALL")
            results = build_all(self.log)
            changed = sum(1 for r in results if r.get("changed"))
            errors = sum(1 for r in results if r.get("error"))
            self.log(f"Build terminé : {changed} pack(s) modifié(s), {errors} erreur(s).")
            return results
        self._run_background("Build", task)

    def build_and_sync(self):
        def task():
            self.log("=" * 72)
            self.log("BUILD ALL + SYNC")
            if not is_git_repo(INITKOA_REPO):
                raise RuntimeError(f"Repo initkoa introuvable ou non Git : {INITKOA_REPO}")
            self.log("Git : pull --rebase --autostash...")
            git(INITKOA_REPO, "pull", "--rebase", "--autostash")
            results = build_all(self.log)
            changed = sum(1 for r in results if r.get("changed"))
            errors = sum(1 for r in results if r.get("error"))
            self.log(f"Build terminé : {changed} pack(s) modifié(s), {errors} erreur(s).")
            if errors:
                self.log("Sync annulé : au moins un repo a échoué.")
                raise RuntimeError(f"{errors} repo(s) en erreur; aucun push automatique.")
            sync_initkoa(self.log, pull_first=False)
            return results
        self._run_background("Build + Sync", task)

    def sync_wikis_only(self):
        def task():
            self.log("=" * 72)
            results = sync_all_wikis(self.log)
            cloned = sum(1 for r in results if r.get("status") == "cloned")
            self.log(f"Sync Wikis terminé : {cloned} nouveau(x) wiki(s) cloné(s).")
            return results
        self._run_background("Sync Wikis", task)

    def sync_only(self):
        def task():
            self.log("=" * 72)
            self.log("SYNC INITKOA")
            sync_initkoa(self.log, pull_first=True)
        self._run_background("Sync", task)

    def open_output(self):
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        try:
            os.startfile(str(OUTPUT_DIR))
        except Exception as exc:
            messagebox.showerror("Erreur", str(exc))


def main():
    if shutil.which("git") is None:
        root = Tk()
        root.withdraw()
        messagebox.showerror("Git introuvable", "Git n'est pas disponible dans le PATH Windows.")
        root.destroy()
        return
    ContextPackApp().mainloop()


if __name__ == "__main__":
    main()
