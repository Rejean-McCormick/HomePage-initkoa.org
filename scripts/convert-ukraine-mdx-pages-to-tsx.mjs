// scripts/convert-ukraine-mdx-pages-to-tsx_SAFE.mjs
//
// Converts Ukraine route entrypoints page.mdx -> page.tsx + content.mdx
// Preserves metadata using brace counting (handles nested objects).
//
// PowerShell:
//   node .\scripts\convert-ukraine-mdx-pages-to-tsx_SAFE.mjs --root "C:\MyCode\OkidoWiki\HomePage" --dry-run --verbose
//   node .\scripts\convert-ukraine-mdx-pages-to-tsx_SAFE.mjs --root "C:\MyCode\OkidoWiki\HomePage" --backup --verbose
//
// Options:
//   --dry-run
//   --backup   : writes page.mdx.bak
//   --verbose

import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const out = { root: process.cwd(), dryRun: false, backup: false, verbose: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") out.root = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--backup") out.backup = true;
    else if (a === "--verbose") out.verbose = true;
  }
  return out;
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
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

// Robust extraction of `export const metadata = { ... };` using brace counting
function extractMetadataExport(src) {
  const start = src.indexOf("export const metadata");
  if (start === -1) return null;

  const braceStart = src.indexOf("{", start);
  if (braceStart === -1) return null;

  let i = braceStart;
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;

  for (; i < src.length; i++) {
    const ch = src[i];

    if (escape) { escape = false; continue; }

    if (inStr) {
      if (ch === "\\") escape = true;
      else if (ch === strCh) { inStr = false; strCh = ""; }
      continue;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strCh = ch; continue; }
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) {
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

// Remove the metadata export from MDX and return body
function stripMetadataExport(src) {
  const start = src.indexOf("export const metadata");
  if (start === -1) return src;

  const braceStart = src.indexOf("{", start);
  if (braceStart === -1) return src;

  let i = braceStart;
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;

  for (; i < src.length; i++) {
    const ch = src[i];

    if (escape) { escape = false; continue; }

    if (inStr) {
      if (ch === "\\") escape = true;
      else if (ch === strCh) { inStr = false; strCh = ""; }
      continue;
    } else {
      if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strCh = ch; continue; }
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) {
          let end = i + 1;
          while (end < src.length && /\s/.test(src[end])) end++;
          if (src[end] === ";") end++;
          const before = src.slice(0, start);
          const after = src.slice(end);
          return (before + after).replace(/^\s+/, "");
        }
      }
    }
  }
  return src;
}

function makePageTsx(metadataExport) {
  const meta = metadataExport ? `${metadataExport}\n\n` : "";
  return `import Content from "./content.mdx";

${meta}export default function Page() {
  return <Content />;
}
`;
}

async function main() {
  const args = parseArgs(process.argv);

  const ukDir = path.join(args.root, "app", "initiatives", "ukraine-peace-plan");
  if (!(await exists(ukDir))) {
    console.error(`Ukraine dir not found:\n  ${ukDir}`);
    process.exit(1);
  }

  const all = await walk(ukDir);
  const mdxPages = all.filter((p) => path.basename(p).toLowerCase() === "page.mdx");

  let visited = 0, converted = 0, skipped = 0;

  for (const pageMdxAbs of mdxPages) {
    visited++;

    const dir = path.dirname(pageMdxAbs);
    const pageTsxAbs = path.join(dir, "page.tsx");
    const contentMdxAbs = path.join(dir, "content.mdx");

    // Skip if already TSX route or already converted
    if (await exists(pageTsxAbs)) { skipped++; continue; }
    if (await exists(contentMdxAbs)) { skipped++; continue; }

    const src = await fs.readFile(pageMdxAbs, "utf8");
    const meta = extractMetadataExport(src);
    const body = stripMetadataExport(src).replace(/^\s+/, "");

    if (args.verbose) console.log(`convert: ${path.relative(args.root, pageMdxAbs)}`);

    if (!args.dryRun) {
      if (args.backup) {
        const bak = `${pageMdxAbs}.bak`;
        if (!(await exists(bak))) await fs.writeFile(bak, src, "utf8");
      }

      await fs.writeFile(contentMdxAbs, body, "utf8");
      await fs.unlink(pageMdxAbs);
      await fs.writeFile(pageTsxAbs, makePageTsx(meta), "utf8");
    }

    converted++;
  }

  console.log("\n=== Ukraine MDX -> TSX wrapper conversion (SAFE) ===");
  console.log(`Visited:   ${visited} folders with page.mdx`);
  console.log(`Converted: ${converted}`);
  console.log(`Skipped:   ${skipped} (already had page.tsx or content.mdx)`);
  console.log(`Mode:      ${args.dryRun ? "DRY RUN" : "WRITE"}${args.backup ? " + backups" : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
