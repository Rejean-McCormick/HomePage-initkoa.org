import fs from "fs";
import path from "path";

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) out.push(full);
  }
  return out;
}

function relPosix(fromDir, filePath) {
  return path.relative(fromDir, filePath).split(path.sep).join("/");
}

function readTitleFromMd(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function fixLinks(md) {
  // (foo.md) -> (foo) and keep anchors
  return md.replace(/\(([^)]+?)\.md(#[^)]+)?\)/g, (_, p1, anchor) => `(${p1}${anchor || ""})`);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const routeDirArg = process.argv[2];
  if (!routeDirArg) {
    console.error('Usage: node scripts/md_tree_to_routes_preserve.mjs "C:\\path\\to\\routeDir"');
    process.exit(1);
  }

  const routeDir = path.resolve(routeDirArg);
  if (!fs.existsSync(routeDir) || !fs.statSync(routeDir).isDirectory()) {
    console.error(`Not a directory: ${routeDir}`);
    process.exit(1);
  }

  const mdFilesAbs = walk(routeDir);
  if (mdFilesAbs.length === 0) {
    console.error("No .md files found (recursive).");
    process.exit(1);
  }

  const created = [];

  for (const abs of mdFilesAbs) {
    const rel = relPosix(routeDir, abs); // e.g. "fvr/00-start-here/00-welcome.md"

    // Skip GitBook root helper files unless you want them as pages too
    const base = path.posix.basename(rel);
    if (base === "README.md" || base === "SUMMARY.md") continue;

    const noExt = rel.replace(/\.md$/i, ""); // "fvr/00-start-here/00-welcome"
    const outDir = path.join(routeDir, ...noExt.split("/")); // Windows-safe join
    ensureDir(outDir);

    const raw = fs.readFileSync(abs, "utf8");
    const titleFallback = noExt.split("/").slice(-1)[0];
    const title = readTitleFromMd(raw, titleFallback);
    const content = fixLinks(raw).trim();

    const pageMdx = `export const metadata = {
  title: ${JSON.stringify(title)},
};

<!-- source: ${rel} -->

${content}
`;

    const outPath = path.join(outDir, "page.mdx");
    fs.writeFileSync(outPath, pageMdx, "utf8");

    created.push({ rel, outPath });
  }

  // Landing page: keep existing page.mdx if present; otherwise create one.
  const landingPath = path.join(routeDir, "page.mdx");
  if (!fs.existsSync(landingPath)) {
    const links = created
      .map((x) => x.rel.replace(/\.md$/i, "")) // "fvr/00-start-here/00-welcome"
      .sort((a, b) => a.localeCompare(b))
      .map((sub) => `- [${sub}](/initiatives/ukraine-peace-plan/${sub})`)
      .join("\n");

    const landing = `export const metadata = {
  title: "Ukraine Peace and Reconstruction Plan",
};

# Ukraine Peace and Reconstruction Plan

## Contents

${links}
`;
    fs.writeFileSync(landingPath, landing, "utf8");
    console.log(`Created landing page: ${landingPath}`);
  } else {
    console.log(`Landing page exists (left unchanged): ${landingPath}`);
  }

  console.log(`Created ${created.length} MDX pages preserving structure.`);
}

main();
