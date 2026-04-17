// scripts/ai-assets/write-artifacts.mjs
import fs from "node:fs";
import path from "node:path";
import {
  routeToMarkdownFilePath,
  routeToMarkdownRelativePath,
} from "./route-utils.mjs";
import {
  generateAiCorpus,
  generateLlmsTxt,
  generateLlmsFull,
  generateAiSitemap,
  generateMdManifest,
  generateMdSitemap,
} from "./generators/index.mjs";

function safeJsonRead(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeFileSafe(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, "utf8");
}

function removeFileIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath, { force: true });
    }
  } catch {
    // ignore cleanup errors
  }
}

function ensureString(value, label) {
  if (typeof value !== "string") {
    throw new TypeError(`${label} must be a string.`);
  }
  return value;
}

function ensureArray(value, label) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${label} must be an array.`);
  }
  return value;
}

function normalizeRouteCase(route) {
  const value = String(route || "").trim();
  if (!value) return "/";

  const normalized = value.startsWith("/") ? value : `/${value}`;

  if (normalized.toLowerCase() === "/technology/ariane/concepts/glossary") {
    return "/technology/ariane/concepts/glossary";
  }

  return normalized;
}

function getRequiredConfig(state) {
  const config = state?.config;
  if (!config) {
    throw new Error("writeArtifacts(state) requires state.config.");
  }

  const publicDir = ensureString(config.publicDir, "config.publicDir");
  const artifactNames = config.artifactNames;
  if (!artifactNames || typeof artifactNames !== "object") {
    throw new Error("config.artifactNames is required.");
  }

  const requiredArtifactNames = {
    aiCorpus: ensureString(artifactNames.aiCorpus, "config.artifactNames.aiCorpus"),
    llms: ensureString(artifactNames.llms, "config.artifactNames.llms"),
    llmsFull: ensureString(artifactNames.llmsFull, "config.artifactNames.llmsFull"),
    aiSitemap: ensureString(artifactNames.aiSitemap, "config.artifactNames.aiSitemap"),
    mdManifest: ensureString(artifactNames.mdManifest, "config.artifactNames.mdManifest"),
    mdSitemap: ensureString(artifactNames.mdSitemap, "config.artifactNames.mdSitemap"),
  };

  const generatedMdStateFile =
    typeof config.generatedMdStateFile === "string" && config.generatedMdStateFile
      ? config.generatedMdStateFile
      : path.join(publicDir, ".generated-md-mirrors.json");

  return {
    config,
    publicDir,
    artifactNames: requiredArtifactNames,
    generatedMdStateFile,
  };
}

function getSortedPages(state) {
  const pages = ensureArray(state?.pages ?? [], "state.pages");

  return [...pages].sort((a, b) => {
    const routeA = normalizeRouteCase(String(a?.route ?? ""));
    const routeB = normalizeRouteCase(String(b?.route ?? ""));
    return routeA.localeCompare(routeB);
  });
}

function cleanupOldGeneratedMirrors(generatedMdStateFile, publicDir) {
  const oldFiles = safeJsonRead(generatedMdStateFile, []);
  if (!Array.isArray(oldFiles)) return;

  for (const rel of oldFiles) {
    if (!rel || typeof rel !== "string") continue;
    removeFileIfExists(path.join(publicDir, rel));
  }
}

function getPageRoute(page) {
  const route = page?.route;
  if (!route || typeof route !== "string") {
    throw new Error("Each page must include a string route.");
  }
  return normalizeRouteCase(route);
}

function getPageMarkdownMirror(page) {
  const text =
    page?.markdownMirror ??
    page?.markdownMirrorText ??
    page?.mirrorMarkdown ??
    page?.mdMirror;

  if (typeof text !== "string") {
    throw new Error(
      `Missing markdown mirror content for route "${String(page?.route ?? "")}".`
    );
  }

  return text;
}

function writePublicArtifact(publicDir, fileName, text) {
  const absPath = path.join(publicDir, fileName);
  writeFileSafe(absPath, typeof text === "string" ? text : String(text));
  return absPath;
}

function writeMarkdownMirrors(state, publicDir, generatedMdStateFile) {
  if (!state.config.generateMdMirrors) {
    removeFileIfExists(generatedMdStateFile);
    return 0;
  }

  cleanupOldGeneratedMirrors(generatedMdStateFile, publicDir);

  const pages = getSortedPages(state);
  const generatedRelativePaths = [];
  const seenRoutes = new Set();

  for (const page of pages) {
    const route = getPageRoute(page);
    if (seenRoutes.has(route)) continue;
    seenRoutes.add(route);

    const mdText = getPageMarkdownMirror(page);
    const mdRel = routeToMarkdownRelativePath(route);
    const mdAbs = routeToMarkdownFilePath(route, publicDir);

    writeFileSafe(mdAbs, mdText);
    generatedRelativePaths.push(mdRel);
  }

  writeFileSafe(
    generatedMdStateFile,
    JSON.stringify(generatedRelativePaths, null, 2) + "\n"
  );

  return generatedRelativePaths.length;
}

export function writeArtifacts(state) {
  const { config, publicDir, artifactNames, generatedMdStateFile } =
    getRequiredConfig(state);

  fs.mkdirSync(publicDir, { recursive: true });

  const aiCorpus = generateAiCorpus(state);
  writePublicArtifact(publicDir, artifactNames.aiCorpus, aiCorpus);

  const markdownMirrorCount = writeMarkdownMirrors(
    state,
    publicDir,
    generatedMdStateFile
  );

  const llms = generateLlmsTxt(state);
  writePublicArtifact(publicDir, artifactNames.llms, llms);

  if (config.generateLlmsFull) {
    const llmsFull = generateLlmsFull(state);
    writePublicArtifact(publicDir, artifactNames.llmsFull, llmsFull);
  } else {
    removeFileIfExists(path.join(publicDir, artifactNames.llmsFull));
  }

  const aiSitemap = generateAiSitemap(state);
  writePublicArtifact(publicDir, artifactNames.aiSitemap, aiSitemap);

  const mdManifest = generateMdManifest(state);
  writePublicArtifact(publicDir, artifactNames.mdManifest, mdManifest);

  const mdSitemap = generateMdSitemap(state);
  writePublicArtifact(publicDir, artifactNames.mdSitemap, mdSitemap);

  return {
    aiCorpusBytes: Buffer.byteLength(aiCorpus, "utf8"),
    markdownMirrorCount,
  };
}

export default writeArtifacts;