// scripts/restore-ukraine-metadata-from-dumps.mjs
//
// Restores page.tsx metadata for Ukraine pages using the codedump JSON(s).
// Safe: does NOT modify content.mdx. Only updates page.tsx wrappers.
//
// PowerShell:
//   node .\scripts\restore-ukraine-metadata-from-dumps.mjs --root "C:\MyCode\OkidoWiki\HomePage" --dumpDir "C:\MyCode\OkidoWiki\HomePage\_dumps\ukraine" --backup --verbose
//
// Options:
//   --root     : repo root (default: cwd)
//   --dumpDir  : directory containing the ukraine-peace-plan_*_*.json dump files
//   --backup   : creates page.tsx.bak if missing
//   --dry-run  : no writes
//   --verbose  : logs updated files

import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    root: process.cwd(),
    dumpDir: null,
    dryRun: false,
    backup: false,
    verbose: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") out.root = argv[++i];
    else if (a === "--dumpDir") out.dumpDir = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--backup") out.backup = true;
    else if (a === "--verbose") out.verbose = true;
  }
  return out;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function posixify(p) {
  return p.replace(/\\/g, "/");
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

/**
 * Extracts `export const metadata = { ... }` using brace counting (safe for nested objects).
 * Returns the full source of `export const metadata = ...;` (no trailing whitespace) or null.
 */
function extractMetadataExport(src) {
  const start = src.indexOf("export const metadata");
  if (start === -1) return null;

  // Find first "{"
  const braceStart = src.indexOf("{", start);
  if (braceStart === -1) return null;

  let i = braceStart;
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;

  for (; i < src.length; i++) {
    const ch = src[i];

    if (escape) {
      escape = false;
      continue;
    }
    if (inStr) {
      if (ch === "\\") {
        escape = true;
      } else if (ch === strCh) {
        inStr = false;
        strCh = "";
      }
      continue;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") {
        inStr = true;
        strCh = ch;
        continue;
      }
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) {
          // Try to include trailing semicolon if present
          let end = i + 1;
          while (end < src.length && /\s/.test(src[end])) end++;
          if (src[end] === ";") end++;
          const block = src.slice(start, end).trimEnd();
          return block.endsWith(";") ? block : block + ";";
        }
      }
    }
  }
  return null;
}

/**
 * Removes any existing export const metadata block from a TSX wrapper.
 */
function stripMetadataFromTsx(tsx) {
  const idx = tsx.indexOf("export const metadata");
  if (idx === -1) return tsx;

  const before = tsx.slice(0, idx);

  // Find the end of that export using similar brace counting.
  const braceStart = tsx.indexOf("{", idx);
  if (braceStart === -1) return tsx;

  let i = braceStart;
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;

  for (; i < tsx.length; i++) {
    const ch = tsx[i];

    if (escape) {
      escape = false;
      continue;
    }
    if (inStr) {
      if (ch === "\\") escape = true;
      else if (ch === strCh) {
        inStr = false;
        strCh = "";
      }
      continue;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") {
        inStr = true;
        strCh = ch;
        continue;
      }
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) {
          let end = i + 1;
          while (end < tsx.length && /\s/.test(tsx[end])) end++;
          if (tsx[end] === ";") end++;
          const after = tsx.slice(end);
          return (before + after).replace(/\n{3,}/g, "\n\n");
        }
      }
    }
  }
  return tsx;
}

/**
 * Inserts metadata right after `import Content from "./content.mdx";`
 * (or at top if that import isn't present).
 */
function insertMetadataIntoTsx(tsx, metadataExport) {
  if (!metadataExport) return tsx;

  const importLine = `import Content from "./content.mdx";`;
  const idx = tsx.indexOf(importLine);

  const metaBlock = `${metadataExport}\n\n`;

  if (idx !== -1) {
    const afterImportIdx = idx + importLine.length;
    return tsx.slice(0, afterImportIdx) + "\n\n" + metaBlock + tsx.slice(afterImportIdx).replace(/^\s+/, "");
  }

  // Fallback: put it at file top
  return metaBlock + tsx;
}

/**
 * Load all dump JSONs in dumpDir and build a map:
 *   relDirUnderUkraine (posix) -> metadataExport string
 *
 * Examples:
 *   "summary" -> export const metadata = {...};
 *   ""        -> root page.mdx metadata
 */
async function buildMetadataMapFromDumps(dumpDir) {
  const entries = await fs.readdir(dumpDir, { withFileTypes: true });
  const jsonFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".json"))
    .map((e) => path.join(dumpDir, e.name));

  const map = new Map();

  for (const jf of jsonFiles) {
    const raw = await fs.readFile(jf, "utf8");
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      continue;
    }

    const files = Array.isArray(data?.files) ? data.files : [];
    for (const f of files) {
      const rel = f?.rel_path;
      const content = f?.content;
      if (!rel || typeof content !== "string") continue;
      if (!rel.endsWith("page.mdx")) continue;

      const meta = extractMetadataExport(content);
      if (!meta) continue;

      const relDir = posixify(path.posix.dirname(rel));
      const key = relDir === "." ? "" : relDir;

      // keep first seen; you can change to override-last if desired
      if (!map.has(key)) map.set(key, meta);
    }
  }

  return map;
}

async function main() {
  const args = parseArgs(process.argv);

  const ukDir = path.join(
    args.root,
    "app",
    "initiatives",
    "ukraine-peace-plan"
  );

  if (!(await exists(ukDir))) {
    console.error(`Ukraine dir not found:\n  ${ukDir}`);
    process.exit(1);
  }
  if (!args.dumpDir) {
    console.error(`Missing --dumpDir (directory containing your ukraine *_ROOT/_fvr/_summary dumps).`);
    process.exit(1);
  }
  if (!(await exists(args.dumpDir))) {
    console.error(`Dump dir not found:\n  ${args.dumpDir}`);
    process.exit(1);
  }

  const metaByDir = await buildMetadataMapFromDumps(args.dumpDir);
  if (metaByDir.size === 0) {
    console.error(`No metadata found in dumps. Ensure dump JSONs contain files[].rel_path + files[].content for page.mdx.`);
    process.exit(1);
  }

  const all = await walk(ukDir);
  const wrappers = all.filter((p) => path.basename(p).toLowerCase() === "page.tsx");

  let visited = 0;
  let updated = 0;
  let missing = 0;

  for (const pageTsxAbs of wrappers) {
    visited++;

    const folderAbs = path.dirname(pageTsxAbs);
    const relDir = posixify(path.relative(ukDir, folderAbs));
    const key = relDir === "." ? "" : relDir;

    const meta = metaByDir.get(key);
    if (!meta) {
      missing++;
      continue;
    }

    const orig = await fs.readFile(pageTsxAbs, "utf8");
    const stripped = stripMetadataFromTsx(orig);
    const next = insertMetadataIntoTsx(stripped, meta);

    if (next === orig) continue;

    if (args.backup) {
      const bak = `${pageTsxAbs}.bak`;
      if (!(await exists(bak))) await fs.writeFile(bak, orig, "utf8");
    }

    if (!args.dryRun) await fs.writeFile(pageTsxAbs, next, "utf8");

    updated++;
    if (args.verbose) console.log(`fixed: ${path.relative(args.root, pageTsxAbs)}`);
  }

  console.log("\n=== Restore Ukraine metadata ===");
  console.log(`Wrappers visited: ${visited}`);
  console.log(`Updated:          ${updated}`);
  console.log(`No dump metadata: ${missing}`);
  console.log(`Mode:             ${args.dryRun ? "DRY RUN" : "WRITE"}${args.backup ? " + backups" : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
