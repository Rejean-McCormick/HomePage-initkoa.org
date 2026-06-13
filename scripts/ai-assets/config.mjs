// scripts/ai-assets/config.mjs
import path from "node:path";
import {
  DEFAULT_BASE_URL,
  DEFAULT_EXCLUDE_PREFIXES,
  DEFAULT_FIX_MOJIBAKE,
  DEFAULT_GENERATE_LLMS_FULL,
  DEFAULT_GENERATE_MD_MIRRORS,
  DEFAULT_INCLUDE_DYNAMIC_SEGMENTS,
  DEFAULT_MAX_CHARS_PER_PAGE,
  DEFAULT_MAX_LLMS_PAGE_LINKS,
  DEFAULT_MIN_CHARS_PER_PAGE,
  DEFAULT_PROJECT_DESCRIPTION,
  DEFAULT_PROJECT_TITLE,
  DEFAULT_SITE_LABEL,
  DEFAULT_SKIP_CODELIKE_PAGES,
  ARTIFACT_NAMES,
  PAGE_FILES_PRIORITY,
  PAGE_FILE_RE,
  SPECIAL_FILE_RE,
  SKIP_DIR_NAMES as SKIP_DIRS,
  MINOR_TITLE_WORDS,
  TITLE_WORD_OVERRIDES,
  PRIORITY_LLMS_ROUTES,
  CODELIKE_PAGE_THRESHOLD,
  DEFAULT_SUMMARY_MAX_CHARS,
} from "./constants.mjs";

function parseBooleanEnv(value, fallback) {
  if (value == null || value === "") return fallback;

  const normalized = String(value).trim().toLowerCase();

  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;

  return fallback;
}

function parseNumberEnv(value, fallback) {
  if (value == null || value === "") return fallback;

  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizePrefix(prefix) {
  const raw = String(prefix || "").trim();
  if (!raw) return null;
  if (raw === "/") return "/";

  const normalized = raw.startsWith("/") ? raw : "/" + raw;
  return normalized.replace(/\/+$/, "");
}

function parseExcludePrefixes(value) {
  const raw = value ?? DEFAULT_EXCLUDE_PREFIXES;

  if (Array.isArray(raw)) {
    return raw.map((part) => normalizePrefix(part)).filter(Boolean);
  }

  return String(raw)
    .split(",")
    .map((part) => normalizePrefix(part))
    .filter(Boolean);
}

function canonicalizeBaseUrl(raw) {
  if (!raw) return DEFAULT_BASE_URL;

  let value = String(raw).trim();

  if (!/^https?:\/\//i.test(value)) {
    value = "https://" + value;
  }

  value = value.replace(/\/+$/, "");

  try {
    const url = new URL(value);
    url.protocol = "https:";

    if (url.hostname === "www.initkoa.org") {
      url.hostname = "initkoa.org";
    }

    return url.toString().replace(/\/+$/, "");
  } catch {
    return value
      .replace(/^https?:\/\/www\.initkoa\.org/i, DEFAULT_BASE_URL)
      .replace(/\/+$/, "");
  }
}

function resolveBaseUrlFromEnv(env) {
  return canonicalizeBaseUrl(
    env.AI_BASE_URL ||
      env.NEXT_PUBLIC_SITE_URL ||
      env.SITE_URL ||
      env.VERCEL_URL ||
      ""
  );
}

export function getAiAssetConfig() {
  const env = process.env;
  const rootDir = process.cwd();
  const appDir = path.join(rootDir, "app");
  const publicDir = path.join(rootDir, "public");

  const baseUrl = resolveBaseUrlFromEnv(env);
  const generatedMdStateFile = path.join(
    publicDir,
    ARTIFACT_NAMES.generatedMdState
  );

  const generateLlmsFull = parseBooleanEnv(
    env.AI_GENERATE_LLMS_FULL,
    DEFAULT_GENERATE_LLMS_FULL
  );

  const artifactNames = { ...ARTIFACT_NAMES };

  const artifactPaths = {
    aiCorpus: path.join(publicDir, artifactNames.aiCorpus),
    llms: path.join(publicDir, artifactNames.llms),
    llmsFull: path.join(publicDir, artifactNames.llmsFull),
    aiSitemap: path.join(publicDir, artifactNames.aiSitemap),
    mdManifest: path.join(publicDir, artifactNames.mdManifest),
    mdSitemap: path.join(publicDir, artifactNames.mdSitemap),
    generatedMdStateFile,
  };

  const aiAccessPolicy = Object.freeze({
    publicEntrypoint: artifactNames.llms,
    publicEntrypointPath: artifactPaths.llms,
    publicEntrypointPurpose:
      "Primary human and agent entrypoint for AI-readable site discovery.",
    visibleFooterLinks: Object.freeze([
      {
        href: "/" + artifactNames.llms,
        label: "AI access",
      },
    ]),
    auxiliaryArtifacts: Object.freeze([
      artifactNames.aiCorpus,
      artifactNames.llmsFull,
      artifactNames.aiSitemap,
      artifactNames.mdManifest,
      artifactNames.mdSitemap,
      artifactNames.generatedMdState,
    ]),
    footerExposure:
      "Only the primary AI entrypoint should be shown in the visible footer. Auxiliary artifacts may remain public and discoverable through llms.txt, head metadata, manifests, or direct URLs.",
    llmsFullStatus: generateLlmsFull ? "generated_auxiliary" : "disabled",
  });

  const config = {
    rootDir,
    appDir,
    publicDir,

    siteLabel: env.AI_SITE_LABEL || DEFAULT_SITE_LABEL,
    projectTitle: env.AI_PROJECT_TITLE || DEFAULT_PROJECT_TITLE,
    projectDescription:
      env.AI_PROJECT_DESCRIPTION || DEFAULT_PROJECT_DESCRIPTION,

    baseUrl,
    excludePrefixes: parseExcludePrefixes(env.AI_EXCLUDE_PREFIXES),

    includeDynamicSegments: parseBooleanEnv(
      env.AI_INCLUDE_DYNAMIC,
      DEFAULT_INCLUDE_DYNAMIC_SEGMENTS
    ),
    skipCodeLikePages: parseBooleanEnv(
      env.AI_SKIP_CODELIKE,
      DEFAULT_SKIP_CODELIKE_PAGES
    ),
    generateMdMirrors: parseBooleanEnv(
      env.AI_GENERATE_MD_MIRRORS,
      DEFAULT_GENERATE_MD_MIRRORS
    ),
    generateLlmsFull,
    fixMojibake: parseBooleanEnv(
      env.AI_FIX_MOJIBAKE,
      DEFAULT_FIX_MOJIBAKE
    ),

    minCharsPerPage: parseNumberEnv(
      env.AI_MIN_CHARS_PER_PAGE,
      DEFAULT_MIN_CHARS_PER_PAGE
    ),
    maxCharsPerPage: parseNumberEnv(
      env.AI_MAX_CHARS_PER_PAGE,
      DEFAULT_MAX_CHARS_PER_PAGE
    ),
    maxLlmsPageLinks: parseNumberEnv(
      env.AI_MAX_LLMS_PAGE_LINKS,
      DEFAULT_MAX_LLMS_PAGE_LINKS
    ),

    codeLikeThreshold: parseNumberEnv(
      env.AI_CODELIKE_THRESHOLD,
      CODELIKE_PAGE_THRESHOLD
    ),
    summaryMaxChars: parseNumberEnv(
      env.AI_SUMMARY_MAX_CHARS,
      DEFAULT_SUMMARY_MAX_CHARS
    ),

    generatedMdStateFile,

    artifactNames,
    artifactPaths,
    aiAccessPolicy,

    pageFilesPriority: [...PAGE_FILES_PRIORITY],
    pageFileRe: PAGE_FILE_RE,
    specialFileRe: SPECIAL_FILE_RE,

    skipDirs: new Set(SKIP_DIRS),
    minorTitleWords: new Set(MINOR_TITLE_WORDS),
    titleWordOverrides: new Map(TITLE_WORD_OVERRIDES),
    priorityLlmsRoutes: [...PRIORITY_LLMS_ROUTES],
  };

  return Object.freeze(config);
}

export default getAiAssetConfig;