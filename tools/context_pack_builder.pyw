from __future__ import annotations

import hashlib
import json
import os
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
TOOL_TARGET = INITKOA_REPO / "tools" / "context_pack_builder.pyw"

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
    ("initkoa-docs", MYCODE / "HomePage" / "docs-initkoa-org"),
    ("Freeze-Vote-Rebuild_Operational-Peace-Framework", MYCODE / "FreezeVoteRebuild" / "Freeze-Vote-Rebuild_Operational-Peace-Framework"),
    ("Book-Civilizational_Coherence", MYCODE / "Books" / "Civilisational_Coherence"),
    ("konnaxion-ashoka-systems-change", MYCODE / "Ashoka"),
    ("UCKK_Assets", MYCODE / "UCKK" / "UCKK_Assets"),
    ("kOA_Digital_Ecosystem", MYCODE / "kOA" / "kOA_Digital_Ecosystem"),
    ("SenTient", MYCODE / "SenTient" / "SenTient"),
    ("VotingMachine", MYCODE / "VotingMachine" / "VotingMachine"),
]

COMMIT_MESSAGE = "Update context packs"
CREATE_NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)


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


def github_repo_from_remote(repo: Path, fallback: str) -> str:
    result = git(repo, "remote", "get-url", "origin", check=False)
    if result.returncode != 0:
        return fallback
    url = result.stdout.strip()
    if not url:
        return fallback
    if url.startswith("git@") and ":" in url:
        owner_repo = url.split(":", 1)[1]
    else:
        owner_repo = urlparse(url).path.lstrip("/")
    if owner_repo.endswith(".git"):
        owner_repo = owner_repo[:-4]
    return owner_repo or fallback


def current_commit(repo: Path) -> str:
    result = git(repo, "rev-parse", "HEAD", check=False)
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def markdown_dirty(repo: Path) -> bool:
    result = git(repo, "status", "--porcelain", "--untracked-files=normal", "--", "*.md", check=False)
    return bool(result.stdout.strip())


def git_markdown_files(repo: Path) -> list[Path]:
    result = subprocess.run(
        ["git", "-C", str(repo), "ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "*.md"],
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


def make_pack(label: str, repo: Path):
    if not repo.exists():
        raise FileNotFoundError(f"Dossier absent : {repo}")
    if not is_git_repo(repo):
        raise RuntimeError(f"Ce dossier n'est pas un repo Git : {repo}")

    markdown_files = git_markdown_files(repo)
    remote_name = github_repo_from_remote(repo, label)
    commit = current_commit(repo)
    dirty = markdown_dirty(repo)

    file_entries = []
    hash_material = bytearray()
    for path in markdown_files:
        rel = path.relative_to(repo).as_posix()
        content = read_markdown(path)
        file_entries.append((rel, content))
        hash_material.extend(rel.encode("utf-8"))
        hash_material.extend(b"\0")
        hash_material.extend(content.encode("utf-8"))
        hash_material.extend(b"\0")

    content_hash = hashlib.sha256(bytes(hash_material)).hexdigest()
    output_path = OUTPUT_DIR / f"{slugify(remote_name)}-context-pack.txt"

    if existing_pack_hash(output_path) == content_hash:
        return {"label": label, "remote": remote_name, "output": output_path, "files": len(file_entries), "changed": False, "hash": content_hash}

    generated_at = datetime.now().astimezone().isoformat(timespec="seconds")
    lines = [
        "# INITKOA CONTEXT PACK",
        "",
        f"repository: {remote_name}",
        f"source_path: {repo}",
        f"source_commit: {commit}",
        f"working_tree_markdown: {'dirty' if dirty else 'clean'}",
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
        for index, (rel, _) in enumerate(file_entries, 1):
            lines.append(f"{index:0{width}d}. {rel}")
    else:
        lines.append("(aucun fichier Markdown)")

    lines.extend(["", ""])
    for rel, content in file_entries:
        lines.extend(["=" * 96, f"FILE: {rel}", "=" * 96, "", content.rstrip("\n"), "", ""])

    final_text = "\n".join(lines).rstrip() + "\n"
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    temp_path = output_path.with_suffix(output_path.suffix + ".tmp")
    temp_path.write_text(final_text, encoding="utf-8", newline="\n")
    temp_path.replace(output_path)

    return {"label": label, "remote": remote_name, "output": output_path, "files": len(file_entries), "changed": True, "hash": content_hash}



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
                }:
                    header[key] = value.strip()
    except OSError:
        pass
    return header


def write_manifest(log=None) -> bool:
    """Generate public/context-packs/index.json from the actual published .txt files."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    packs = []

    for pack_path in sorted(OUTPUT_DIR.glob("*.txt"), key=lambda p: p.name.lower()):
        header = read_pack_header(pack_path)
        slug = pack_slug_from_filename(pack_path.name)
        file_count = None
        try:
            if header.get("files"):
                file_count = int(header["files"])
        except ValueError:
            file_count = None

        full_sha256 = hashlib.sha256(pack_path.read_bytes()).hexdigest()
        category = "general" if slug in {"grammatical-framework", "senior-architect"} else "system"

        packs.append(
            {
                "slug": slug,
                "file": pack_path.name,
                "repository": header.get("repository"),
                "sourceCommit": header.get("source_commit"),
                "generatedAt": header.get("generated_at"),
                "fileCount": file_count,
                "sha256": full_sha256,
                "category": category,
            }
        )

    core = {"schemaVersion": 1, "packs": packs}

    if MANIFEST_PATH.exists():
        try:
            existing = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
            if {
                "schemaVersion": existing.get("schemaVersion"),
                "packs": existing.get("packs"),
            } == core:
                if log:
                    log("Manifest : identique.")
                return False
        except (OSError, json.JSONDecodeError, TypeError):
            pass

    payload = {
        "schemaVersion": 1,
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


def build_all(log):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if install_self_into_initkoa():
        log(f"Builder copié dans : {TOOL_TARGET}")
    results = []
    for index, (label, repo) in enumerate(REPOS, 1):
        log(f"[{index}/{len(REPOS)}] {label}")
        try:
            result = make_pack(label, repo)
            results.append(result)
            marker = "MODIFIÉ" if result["changed"] else "identique"
            log(f"    {result['files']} .md -> {result['output'].name} [{marker}]")
        except Exception as exc:
            results.append({"label": label, "path": repo, "error": str(exc), "files": 0, "changed": False})
            log(f"    ERREUR : {exc}")
    write_manifest(log)
    return results


def sync_initkoa(log, pull_first=True):
    if not is_git_repo(INITKOA_REPO):
        raise RuntimeError(f"Repo initkoa introuvable ou non Git : {INITKOA_REPO}")

    install_self_into_initkoa()
    if pull_first:
        log("Git : pull --rebase --autostash...")
        git(INITKOA_REPO, "pull", "--rebase", "--autostash")

    relative_output = OUTPUT_DIR.relative_to(INITKOA_REPO).as_posix()
    relative_tool = TOOL_TARGET.relative_to(INITKOA_REPO).as_posix()

    log("Git : staging des Context Packs et du builder...")
    git(INITKOA_REPO, "add", "--", relative_output, relative_tool)
    diff = git(INITKOA_REPO, "diff", "--cached", "--quiet", "--", relative_output, relative_tool, check=False)

    if diff.returncode == 0:
        log("Git : aucun changement à committer.")
    elif diff.returncode == 1:
        stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M")
        message = f"{COMMIT_MESSAGE} ({stamp})"
        log(f"Git : commit « {message} »")
        git(INITKOA_REPO, "commit", "--only", "-m", message, "--", relative_output, relative_tool)
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
        ttk.Button(buttons, text="Ouvrir les packs", command=self.open_output).pack(side=RIGHT)
        ttk.Button(buttons, text="Actualiser", command=self.refresh_repo_status).pack(side=RIGHT, padx=(0, 8))

        table_frame = ttk.Frame(self, padding=(12, 0, 12, 8))
        table_frame.pack(fill=BOTH, expand=True)
        columns = ("repo", "path", "md", "status")
        self.tree = ttk.Treeview(table_frame, columns=columns, show="headings", height=17)
        for col, text in [("repo", "Repo"), ("path", "Chemin local"), ("md", ".md"), ("status", "État")]:
            self.tree.heading(col, text=text)
        self.tree.column("repo", width=250, minwidth=180)
        self.tree.column("path", width=560, minwidth=300)
        self.tree.column("md", width=70, anchor="center", stretch=False)
        self.tree.column("status", width=150, minwidth=100)
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
        for label, repo in REPOS:
            repo_display = label
            if not repo.exists():
                md_count, status = "-", "ABSENT"
            elif not is_git_repo(repo):
                md_count, status = "-", "PAS GIT"
            else:
                try:
                    md_count = str(len(git_markdown_files(repo)))
                    repo_display = github_repo_from_remote(repo, label)
                    status = "OK"
                except Exception:
                    md_count, status = "?", "ERREUR"
            self.tree.insert("", END, values=(repo_display, str(repo), md_count, status))
        self.status_var.set(f"{len(REPOS)} repos configurés. Destination : {OUTPUT_DIR}")

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
