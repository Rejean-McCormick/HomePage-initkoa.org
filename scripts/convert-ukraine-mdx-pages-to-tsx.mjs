// scripts/convert-ukraine-mdx-pages-to-tsx.mjs
//
// PowerShell usage:
//   node .\scripts\convert-ukraine-mdx-pages-to-tsx.mjs --root "C:\MyCode\OkidoWiki\HomePage" --dry-run --verbose
//   node .\scripts\convert-ukraine-mdx-pages-to-tsx.mjs --root "C:\MyCode\OkidoWiki\HomePage" --backup
//
// Options:
//   --dry-run   : no writes
//   --backup    : keep page.mdx.bak before rename
//   --verbose   : list converted files

import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const out = {
    root: process.cwd(),
    dryRun: false,
    backup: false,
    verbose: false,
  };
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
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
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

function extractMetadataBlock(src) {
  // Very conservative: only matches a top-level `export const metadata = { ... };`
  // near the beginning of the file.
  const re = /^\s*export\s+const\s+metadata\s*=\s*\{[\s\S]*?\}\s*;?\s*/m;
  const m = src.match(re);
  if (!m) return { metadataSrc: null, body: src };
  const metadataSrc = m[0].trimEnd();
  const body = src.slice(m[0].length);
  return { metadataSrc, body: body.replace(/^\s+/, "") }; // remove leading blank space
}

function makePageTsx(metadataSrc) {
  const meta = metadataSrc
    ? `${metadataSrc.endsWith(";") ? metadataSrc : metadataSrc + ";"}

`
    : "";

  return `import Content from "./content.mdx";

${meta}export default function Page() {
  return <Content />;
}
`;
}

async function main() {
  const args = parseArgs(process.argv);

  const ukDir = path.join(
    args.root,
    "app",
    "initiatives",
    "ukraine-peace-and-reconstruction-plan"
  );

  if (!(await exists(ukDir))) {
    console.error(`Ukraine dir not found:\n  ${ukDir}`);
    process.exit(1);
  }

  const files = await walk(ukDir);
  const mdxPages = files.filter((p) => path.basename(p).toLowerCase() === "page.mdx");

  let visited = 0;
  let converted = 0;
  let skipped = 0;

  for (const pageMdxAbs of mdxPages) {
    visited++;

    const dir = path.dirname(pageMdxAbs);
    const pageTsxAbs = path.join(dir, "page.tsx");
    const contentMdxAbs = path.join(dir, "content.mdx");

    // If page.tsx already exists, do not touch this folder.
    if (await exists(pageTsxAbs)) {
      skipped++;
      continue;
    }

    // If content.mdx already exists, also skip (avoid clobbering).
    if (await exists(contentMdxAbs)) {
      skipped++;
      continue;
    }

    const src = await fs.readFile(pageMdxAbs, "utf8");
    const { metadataSrc, body } = extractMetadataBlock(src);

    const tsx = makePageTsx(metadataSrc);

    if (args.verbose) {
      console.log(`convert: ${path.relative(args.root, pageMdxAbs)}`);
    }

    if (!args.dryRun) {
      if (args.backup) {
        const bak = `${pageMdxAbs}.bak`;
        if (!(await exists(bak))) {
          await fs.writeFile(bak, src, "utf8");
        }
      }

      // Write content.mdx first (so we don't lose body if rename fails)
      await fs.writeFile(contentMdxAbs, body, "utf8");

      // Remove page.mdx
      await fs.unlink(pageMdxAbs);

      // Create page.tsx
      await fs.writeFile(pageTsxAbs, tsx, "utf8");
    }

    converted++;
  }

  console.log("\n=== Ukraine MDX -> TSX wrapper conversion ===");
  console.log(`Visited:   ${visited} folders with page.mdx`);
  console.log(`Converted: ${converted}`);
  console.log(`Skipped:   ${skipped} (already had page.tsx or content.mdx)`);
  console.log(`Mode:      ${args.dryRun ? "DRY RUN" : "WRITE"}${args.backup ? " + backups" : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
