// scripts/convert-ukraine-links.mjs
// Usage (PowerShell):
//   node .\scripts\convert-ukraine-links.mjs --root "C:\MyCode\OkidoWiki\HomePage" --dry-run --verbose
//   node .\scripts\convert-ukraine-links.mjs --root "C:\MyCode\OkidoWiki\HomePage" --backup
//
// Optional:
//   --map  "app\initiatives\ukraine-peace-and-reconstruction-plan\ukraine-link-conversion-map.json"

import fs from "node:fs/promises";
import path from "node:path";

const BASE_ROUTE = "/initiatives/ukraine-peace-and-reconstruction-plan";

function parseArgs(argv) {
  const out = {
    root: process.cwd(),
    map: null,
    dryRun: false,
    backup: false,
    verbose: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") out.root = argv[++i];
    else if (a === "--map") out.map = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--backup") out.backup = true;
    else if (a === "--verbose") out.verbose = true;
  }
  return out;
}

async function fileExists(p) {
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

function isInternalLink(href) {
  return !/^(https?:|mailto:|tel:|#)/i.test(href);
}

function splitHref(href) {
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  return { p: m?.[1] ?? href, q: m?.[2] ?? "", h: m?.[3] ?? "" };
}

function posixify(p) {
  return p.replace(/\\/g, "/");
}

function cleanNoTrailingSlash(p) {
  return p.replace(/\/+$/, "");
}

/**
 * Build:
 * - routeTailSet: routes that exist as folders with page.(mdx|tsx) (and also root "")
 * - conceptSlugSet: concepts/*.mdx filenames (since concepts/page.tsx links to /concepts/<slug>)
 */
async function buildRouteIndex(ukDirAbs) {
  const files = await walk(ukDirAbs);
  const routeTailSet = new Set([""]); // root route exists
  const conceptSlugSet = new Set();

  for (const f of files) {
    const rel = posixify(path.relative(ukDirAbs, f));
    const base = path.basename(rel);

    if (base === "page.mdx" || base === "page.tsx") {
      const dir = posixify(path.dirname(rel));
      routeTailSet.add(dir === "." ? "" : dir);
    }

    // concepts/*.mdx treated as slug pages in links (even though file isn't page.mdx)
    if (rel.startsWith("concepts/") && rel.endsWith(".mdx")) {
      const name = path.basename(rel, ".mdx");
      if (name !== "page") conceptSlugSet.add(name);
    }
  }

  return { routeTailSet, conceptSlugSet };
}

/**
 * Determine current "route tail" from a file path under ukDir.
 * - .../page.mdx or .../page.tsx => route tail is directory
 */
function currentRouteTail(relFileUnderUkDir) {
  const rel = posixify(relFileUnderUkDir);
  const base = path.posix.basename(rel);
  if (base === "page.mdx" || base === "page.tsx") {
    const dir = path.posix.dirname(rel);
    return dir === "." ? "" : dir;
  }
  // For completeness; we mostly process page.mdx/tsx anyway
  if (rel.endsWith(".mdx")) return rel.slice(0, -4);
  if (rel.endsWith(".tsx")) return rel.slice(0, -4);
  return "";
}

function toAbsFromTail(tail) {
  const t = cleanNoTrailingSlash(tail);
  return t ? `${BASE_ROUTE}/${t}` : BASE_ROUTE;
}

function normalizeSpecialTargets(p) {
  // README/SUMMARY conventions
  if (p === "README" || p === "./README" || p === "../README" || p === "../../README") return "";
  if (p === "SUMMARY" || p === "./SUMMARY" || p === "../SUMMARY" || p === "../../SUMMARY") return "summary";
  if (p === "summary" || p === "./summary" || p === "../summary" || p === "../../summary") return "summary";
  return null;
}

/**
 * Resolve a relative link target (no leading "/") to a route tail under Ukraine.
 */
function resolveRelativeToTail(relFile, hrefPath) {
  const special = normalizeSpecialTargets(hrefPath);
  if (special !== null) return special;

  // ".." or "../.." etc to hub
  if (/^(\.\.\/?)+$/.test(hrefPath) || hrefPath === "." || hrefPath === "./") {
    return "";
  }

  const baseTail = currentRouteTail(relFile);
  const baseDir = baseTail; // route tail behaves like directory

  // Resolve against current "dir"
  const joined = posixify(path.posix.normalize(path.posix.join(baseDir, hrefPath)));
  // If it climbs above root, skip
  if (joined.startsWith("..")) return null;

  // Remove any leading "./"
  return joined.replace(/^\.\//, "");
}

/**
 * Try to convert an internal href to a new absolute route.
 * Priority:
 *  1) Exact match in JSON map
 *  2) Auto-resolve relative internal link based on file location + route index
 */
function convertHref(hrefRaw, relFile, jsonMap, routeTailSet, conceptSlugSet) {
  const href = hrefRaw.trim();
  if (!isInternalLink(href)) return null;

  const { p, q, h } = splitHref(href);

  // If it's an absolute internal link:
  if (p.startsWith("/")) {
    // normalize SUMMARY casing if someone used /.../SUMMARY
    if (p === `${BASE_ROUTE}/SUMMARY`) return `${BASE_ROUTE}/summary${q}${h}`;

    // If JSON map has it, use it
    const mapped = jsonMap.get(href);
    if (mapped) return mapped;

    // Otherwise, leave as-is (don’t rewrite unknown absolute site routes)
    return null;
  }

  // 1) Exact mapped string
  {
    const mapped = jsonMap.get(href);
    if (mapped) return mapped;
  }

  // 2) Auto-resolve the path part, then check if it’s a known route tail
  const tail = resolveRelativeToTail(relFile, p);
  if (tail === null) return null;

  // Direct match: folder route exists
  if (routeTailSet.has(tail)) return `${toAbsFromTail(tail)}${q}${h}`;

  // Special handling: concepts/<slug> is "valid" if slug exists in concepts/*.mdx
  if (tail.startsWith("concepts/")) {
    const slug = tail.split("/")[1];
    if (slug && conceptSlugSet.has(slug)) {
      return `${toAbsFromTail(`concepts/${slug}`)}${q}${h}`;
    }
  }

  // Cultural bridge: allow tail like "01-russian-literature" from within cultural-bridge/* pages
  // by trying to prefix cultural-bridge/ if unique
  if (/^(0\d)-/.test(tail)) {
    const candidates = [...routeTailSet].filter((t) => t.startsWith(`cultural-bridge/${tail}`));
    if (candidates.length === 1) return `${toAbsFromTail(candidates[0])}${q}${h}`;
  }

  // If not resolvable, leave
  return null;
}

function rewriteContent(content, relFile, jsonMap, routeTailSet, conceptSlugSet, stats, absFileForStats) {
  let changed = false;

  // Markdown links (exclude images: ![alt](...))
  const mdRe = /(^|[^!])(\[[^\]]*?\]\()([^)]+?)(\))/gm;
  content = content.replace(mdRe, (full, prefix, lead, href, tail) => {
    const next = convertHref(href, relFile, jsonMap, routeTailSet, conceptSlugSet);
    if (next && next !== href.trim()) {
      changed = true;
      stats.replacements++;
      stats.byFrom.set(href.trim(), (stats.byFrom.get(href.trim()) || 0) + 1);
      return `${prefix}${lead}${next}${tail}`;
    }
    return full;
  });

  // JSX/TSX href/to
  const attrRe = /\b(href|to)\s*=\s*(["'])([^"']+)(\2)/g;
  content = content.replace(attrRe, (full, attr, quote, val) => {
    const next = convertHref(val, relFile, jsonMap, routeTailSet, conceptSlugSet);
    if (next && next !== val.trim()) {
      changed = true;
      stats.replacements++;
      stats.byFrom.set(val.trim(), (stats.byFrom.get(val.trim()) || 0) + 1);
      return `${attr}=${quote}${next}${quote}`;
    }
    return full;
  });

  // Collect leftovers
  const leftovers = new Set();
  for (const m of content.matchAll(mdRe)) {
    const href = (m[3] ?? "").trim();
    if (isInternalLink(href) && !href.startsWith("/") && !jsonMap.has(href)) leftovers.add(href);
  }
  for (const m of content.matchAll(attrRe)) {
    const href = (m[3] ?? "").trim();
    if (isInternalLink(href) && !href.startsWith("/") && !jsonMap.has(href)) leftovers.add(href);
  }
  if (leftovers.size) stats.leftovers.set(absFileForStats, [...leftovers].sort());

  return { content, changed };
}

async function main() {
  const args = parseArgs(process.argv);

  const ukDir = path.join(args.root, "app", "initiatives", "ukraine-peace-and-reconstruction-plan");
  const defaultMap = path.join(ukDir, "ukraine-link-conversion-map.json");
  const mapPath = args.map
    ? (path.isAbsolute(args.map) ? args.map : path.join(args.root, args.map))
    : defaultMap;

  if (!(await fileExists(ukDir))) {
    console.error(`Ukraine directory not found:\n  ${ukDir}`);
    process.exit(1);
  }
  if (!(await fileExists(mapPath))) {
    console.error(`Mapping JSON not found:\n  ${mapPath}`);
    process.exit(1);
  }

  const mapJson = JSON.parse(await fs.readFile(mapPath, "utf8"));
  const jsonMap = new Map((mapJson?.mappings ?? []).map((m) => [m.from, m.to]));

  const { routeTailSet, conceptSlugSet } = await buildRouteIndex(ukDir);

  const allFiles = await walk(ukDir);
  const targets = allFiles.filter((p) => p.endsWith(".mdx") || p.endsWith(".tsx"));

  const stats = {
    filesVisited: 0,
    filesChanged: 0,
    replacements: 0,
    byFrom: new Map(),
    leftovers: new Map(),
  };

  for (const absFile of targets) {
    stats.filesVisited++;
    const relFile = posixify(path.relative(ukDir, absFile));

    const orig = await fs.readFile(absFile, "utf8");
    const { content: next, changed } = rewriteContent(
      orig,
      relFile,
      jsonMap,
      routeTailSet,
      conceptSlugSet,
      stats,
      absFile
    );

    if (!changed) continue;
    stats.filesChanged++;

    if (args.backup) {
      const bak = `${absFile}.bak`;
      if (!(await fileExists(bak))) await fs.writeFile(bak, orig, "utf8");
    }

    if (!args.dryRun) await fs.writeFile(absFile, next, "utf8");

    if (args.verbose) console.log(`updated: ${path.relative(args.root, absFile)}`);
  }

  console.log("\n=== Ukraine link conversion ===");
  console.log(`Map:   ${path.relative(args.root, mapPath)}`);
  console.log(`Files: ${stats.filesVisited} visited, ${stats.filesChanged} changed`);
  console.log(`Repl:  ${stats.replacements} total`);
  console.log(`Mode:  ${args.dryRun ? "DRY RUN (no writes)" : "WRITE"}${args.backup ? " + backups" : ""}`);

  const top = [...stats.byFrom.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25);
  if (top.length) {
    console.log("\nTop replaced href values:");
    for (const [from, n] of top) console.log(`  ${n}x  ${from}`);
  }

  if (stats.leftovers.size) {
    console.log("\nRemaining internal relative links (not mapped/converted) — review:");
    let shown = 0;
    for (const [fp, hrefs] of stats.leftovers.entries()) {
      console.log(`\n  ${path.relative(args.root, fp)}`);
      for (const h of hrefs.slice(0, 30)) console.log(`    - ${h}`);
      if (hrefs.length > 30) console.log(`    ... +${hrefs.length - 30} more`);
      if (++shown >= 40) {
        console.log("\n  ... (truncated file list)");
        break;
      }
    }
  } else {
    console.log("\nNo leftover internal relative links detected in scanned MDX/TSX.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
