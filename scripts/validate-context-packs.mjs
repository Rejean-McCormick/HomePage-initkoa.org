import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POLICY_PATH = path.join(ROOT, "tools", "context_pack_policy.json");
const PACK_DIR = path.join(ROOT, "public", "context-packs");
const MANIFEST_PATH = path.join(PACK_DIR, "index.json");
const SITEMAP_PATH = path.join(PACK_DIR, "sitemap.xml");
const BASE_URL = "https://initkoa.org";
const FILE_DIVIDER = "=".repeat(96);

function fail(message) {
  throw new Error(`[context-packs] ${message}`);
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`${label} missing: ${path.relative(ROOT, filePath)}`);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label} is invalid JSON: ${error.message}`);
  }
}

function normalizePath(value) {
  return String(value || "").replaceAll("\\", "/").replace(/^\.\//, "");
}

function globToRegExp(glob) {
  const pattern = normalizePath(glob);
  let out = "^";
  for (let i = 0; i < pattern.length; i += 1) {
    const char = pattern[i];
    if (char === "*") {
      if (pattern[i + 1] === "*") {
        i += 1;
        out += ".*";
      } else {
        out += "[^/]*";
      }
    } else if (char === "?") {
      out += "[^/]";
    } else {
      out += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
    }
  }
  return new RegExp(`${out}$`, "i");
}

function matchesAny(rel, patterns) {
  return (patterns || []).some((pattern) => globToRegExp(pattern).test(normalizePath(rel)));
}

function parseHeader(text) {
  const header = {};
  for (const line of text.split(/\r?\n/, 60)) {
    if (line === FILE_DIVIDER) break;
    const match = line.match(/^([a-z0-9_]+):\s*(.*)$/i);
    if (match) header[match[1]] = match[2].trim();
  }
  return header;
}

function parsePackFiles(text) {
  const marker = `\n${FILE_DIVIDER}\nFILE: `;
  const parts = text.split(marker).slice(1);
  return parts.map((part) => {
    const lineEnd = part.indexOf("\n");
    if (lineEnd < 0) fail("Malformed FILE section");
    const rel = normalizePath(part.slice(0, lineEnd).trim());
    const bodyPrefix = `${FILE_DIVIDER}\n\n`;
    const bodyStart = part.indexOf(bodyPrefix, lineEnd);
    if (bodyStart < 0) fail(`Malformed FILE section for ${rel}`);
    const body = part.slice(bodyStart + bodyPrefix.length).replace(/\n+$/, "") + "\n";
    return { rel, body };
  });
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

const policy = readJson(POLICY_PATH, "policy");
if (policy.schemaVersion !== 1) fail(`unsupported policy schemaVersion: ${policy.schemaVersion}`);
if (!policy.policyVersion) fail("policyVersion missing from policy");

const buildPolicy = policy.publicBuild || {};
const maxBytes = Number(buildPolicy.maxBytes || 0);
const warningBytes = Number(buildPolicy.warningBytes || 0);
const globalExclusions = Array.isArray(policy.globalExclusions) ? policy.globalExclusions : [];
const legacyExemptFiles = new Set(
  Array.isArray(policy.legacyExemptFiles) ? policy.legacyExemptFiles.map(String) : []
);

const manifest = readJson(MANIFEST_PATH, "manifest");
if (!Array.isArray(manifest.packs)) fail("manifest.packs must be an array");
if (manifest.policyVersion !== policy.policyVersion) {
  fail(`manifest policyVersion ${manifest.policyVersion || "(missing)"} != ${policy.policyVersion}`);
}

const manifestFiles = manifest.packs.map((pack) => String(pack?.file || "").trim()).filter(Boolean);
if (new Set(manifestFiles).size !== manifestFiles.length) fail("manifest contains duplicate pack filenames");

const diskFiles = fs.existsSync(PACK_DIR)
  ? fs.readdirSync(PACK_DIR).filter((name) => name.toLowerCase().endsWith(".txt")).sort()
  : [];
const manifestSorted = [...manifestFiles].sort();
if (JSON.stringify(diskFiles) !== JSON.stringify(manifestSorted)) {
  fail(`manifest/file mismatch. manifest=${manifestSorted.length}, disk=${diskFiles.length}`);
}

let warnings = 0;
for (const pack of manifest.packs) {
  const file = String(pack.file || "").trim();
  const packPath = path.join(PACK_DIR, file);
  if (!file || !fs.existsSync(packPath)) fail(`missing pack: ${file || "(empty filename)"}`);

  const bytes = fs.readFileSync(packPath);
  const fullSha = crypto.createHash("sha256").update(bytes).digest("hex");
  if (String(pack.sha256 || "") !== fullSha) fail(`${file}: manifest sha256 mismatch`);

  if (maxBytes > 0 && bytes.length > maxBytes) fail(`${file}: ${bytes.length} bytes exceeds maxBytes=${maxBytes}`);
  if (warningBytes > 0 && bytes.length > warningBytes) {
    warnings += 1;
    console.warn(`[context-packs] warning: ${file} is ${bytes.length} bytes (> ${warningBytes})`);
  }

  const text = bytes.toString("utf8");
  const isLegacyExempt = legacyExemptFiles.has(file);

  for (const field of ["sourceFileCount", "includedFileCount", "excludedFileCount", "duplicateFileCount", "contentBytes", "authorityCounts"]) {
    if (!(field in pack)) fail(`${file}: manifest field missing: ${field}`);
  }

  if (isLegacyExempt) {
    if (pack.category !== "general") fail(`${file}: legacy exemption is allowed only for category=general`);
    console.warn(`[context-packs] legacy corpus exemption: ${file}`);
    continue;
  }

  const header = parseHeader(text);
  if (header.policy_version !== policy.policyVersion) {
    fail(`${file}: policy_version ${header.policy_version || "(missing)"} != ${policy.policyVersion}`);
  }
  if (header.working_tree_markdown !== "clean") fail(`${file}: source working tree is not declared clean`);
  if (header.wiki_working_tree_markdown === "dirty") fail(`${file}: wiki working tree is dirty`);

  const files = parsePackFiles(text);
  const declaredIncluded = Number(header.included_files ?? header.files);
  if (!Number.isFinite(declaredIncluded) || declaredIncluded !== files.length) {
    fail(`${file}: included file count header does not match FILE sections`);
  }

  const seenHashes = new Map();
  for (const entry of files) {
    if (matchesAny(entry.rel, globalExclusions)) fail(`${file}: forbidden global path included: ${entry.rel}`);
    const hash = crypto.createHash("sha256").update(entry.body, "utf8").digest("hex");
    if (seenHashes.has(hash)) {
      fail(`${file}: exact duplicate remains: ${entry.rel} == ${seenHashes.get(hash)}`);
    }
    seenHashes.set(hash, entry.rel);
  }

  if (pack.policyVersion !== policy.policyVersion) fail(`${file}: manifest pack policyVersion mismatch`);
}

if (!fs.existsSync(SITEMAP_PATH)) fail("context-pack sitemap missing");
const sitemapUrls = extractSitemapUrls(fs.readFileSync(SITEMAP_PATH, "utf8")).sort();
const expectedUrls = manifestFiles.map((file) => `${BASE_URL}/context-packs/${encodeURI(file)}`).sort();
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) {
  fail(`sitemap/manifest mismatch. sitemap=${sitemapUrls.length}, manifest=${expectedUrls.length}`);
}

console.log(`[context-packs] OK: ${manifest.packs.length} pack(s), ${warnings} size warning(s), policy ${policy.policyVersion}`);
