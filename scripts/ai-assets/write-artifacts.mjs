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
    aiCorpus: ensureString(
      artifactNames.aiCorpus,
      "config.artifactNames.aiCorpus"
    ),
    llms: ensureString(artifactNames.llms, "config.artifactNames.llms"),
    llmsFull: ensureString(
      artifactNames.llmsFull,
      "config.artifactNames.llmsFull"
    ),
    aiSitemap: ensureString(
      artifactNames.aiSitemap,
      "config.artifactNames.aiSitemap"
    ),
    mdManifest: ensureString(
      artifactNames.mdManifest,
      "config.artifactNames.mdManifest"
    ),
    mdSitemap: ensureString(
      artifactNames.mdSitemap,
      "config.artifactNames.mdSitemap"
    ),
  };

  const generatedMdStateFile =
    typeof config.generatedMdStateFile === "string" &&
    config.generatedMdStateFile
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
  const normalizedText = typeof text === "string" ? text : String(text);

  writeFileSafe(absPath, normalizedText);

  return {
    fileName,
    absPath,
    bytes: Buffer.byteLength(normalizedText, "utf8"),
  };
}

function writeMarkdownMirrors(state, publicDir, generatedMdStateFile) {
  if (!state?.config?.generateMdMirrors) {
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

  const writtenArtifacts = {};

  const aiCorpus = generateAiCorpus(state);
  writtenArtifacts.aiCorpus = writePublicArtifact(
    publicDir,
    artifactNames.aiCorpus,
    aiCorpus
  );

  const markdownMirrorCount = writeMarkdownMirrors(
    state,
    publicDir,
    generatedMdStateFile
  );

  // Primary AI entrypoint.
  //
  // /llms.txt should remain the human/agent-facing starting point.
  // Auxiliary artifacts such as /llms-full.txt, /ai-corpus.txt, manifests,
  // and sitemaps may remain public and fetchable, but they should be linked
  // from the entrypoint or metadata rather than exposed as primary footer nav.
  const llms = generateLlmsTxt(state);
  writtenArtifacts.llms = writePublicArtifact(
    publicDir,
    artifactNames.llms,
    llms
  );

  // Auxiliary full-context bundle.
  //
  // Kept because the Reading AI accessibility docs define a multi-artifact
  // strategy: /llms.txt as the primary entrypoint, /llms-full.txt as optional
  // expanded context, and /reading/[slug] as the canonical full-text route.
  if (config.generateLlmsFull) {
    const llmsFull = generateLlmsFull(state);
    writtenArtifacts.llmsFull = writePublicArtifact(
      publicDir,
      artifactNames.llmsFull,
      llmsFull
    );
  } else {
    const llmsFullPath = path.join(publicDir, artifactNames.llmsFull);
    removeFileIfExists(llmsFullPath);

    writtenArtifacts.llmsFull = {
      fileName: artifactNames.llmsFull,
      absPath: llmsFullPath,
      bytes: 0,
      removed: true,
    };
  }

  const aiSitemap = generateAiSitemap(state);
  writtenArtifacts.aiSitemap = writePublicArtifact(
    publicDir,
    artifactNames.aiSitemap,
    aiSitemap
  );

  const mdManifest = generateMdManifest(state);
  writtenArtifacts.mdManifest = writePublicArtifact(
    publicDir,
    artifactNames.mdManifest,
    mdManifest
  );

  const mdSitemap = generateMdSitemap(state);
  writtenArtifacts.mdSitemap = writePublicArtifact(
    publicDir,
    artifactNames.mdSitemap,
    mdSitemap
  );

  return {
    aiCorpusBytes: writtenArtifacts.aiCorpus.bytes,
    llmsBytes: writtenArtifacts.llms.bytes,
    llmsFullBytes: writtenArtifacts.llmsFull.bytes,
    aiSitemapBytes: writtenArtifacts.aiSitemap.bytes,
    mdManifestBytes: writtenArtifacts.mdManifest.bytes,
    mdSitemapBytes: writtenArtifacts.mdSitemap.bytes,
    markdownMirrorCount,
    writtenArtifacts,
  };
}

export default writeArtifacts;