// scripts/ai-assets/constants.mjs

export const DEFAULT_BASE_URL = "[https://initkoa.org](https://initkoa.org)";

export const DEFAULT_SITE_LABEL = "initkoa.org";
export const DEFAULT_PROJECT_TITLE = "kOA INITIATIVE";
export const DEFAULT_PROJECT_DESCRIPTION =
"Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).";

export const DEFAULT_EXCLUDE_PREFIXES = Object.freeze(["/admin", "/api"]);

export const DEFAULT_INCLUDE_DYNAMIC_SEGMENTS = false;
export const DEFAULT_SKIP_CODELIKE_PAGES = true;
export const DEFAULT_GENERATE_MD_MIRRORS = true;

// Keep enabled: llms-full.txt remains an auxiliary machine-readable artifact.
// The public/visible AI entrypoint is llms.txt.
export const DEFAULT_GENERATE_LLMS_FULL = true;

export const DEFAULT_FIX_MOJIBAKE = true;

export const DEFAULT_MIN_CHARS_PER_PAGE = 60;
export const DEFAULT_MAX_CHARS_PER_PAGE = 0;

// llms.txt is the main AI entrypoint, so it should expose enough priority links
// to route agents toward the right artifacts and high-value pages.
export const DEFAULT_MAX_LLMS_PAGE_LINKS = 40;

export const CODELIKE_PAGE_THRESHOLD = 0.12;
export const DEFAULT_SUMMARY_MAX_CHARS = 220;
export const COMPACT_SUMMARY_MAX_CHARS = 180;
export const TITLE_SCAN_LINE_LIMIT = 12;
export const TITLE_MAX_CHARS = 100;

// Optional aliases for downstream compatibility.
export const DEFAULT_CODELIKE_THRESHOLD = CODELIKE_PAGE_THRESHOLD;
export const SUMMARY_MAX_CHARS = DEFAULT_SUMMARY_MAX_CHARS;

// Public AI artifact policy:
// - llms.txt is the primary AI entrypoint.
// - llms-full.txt, ai-corpus.txt, manifests, and sitemaps are auxiliary artifacts.
// - Footer/navigation should normally expose only llms.txt as "AI access".
export const AI_ENTRYPOINT_FILE_NAME = "llms.txt";
export const AI_ENTRYPOINT_LABEL = "AI access";

export const ARTIFACT_NAMES = Object.freeze({
generatedMdState: ".generated-md-mirrors.json",
aiCorpus: "ai-corpus.txt",
llms: "llms.txt",
llmsFull: "llms-full.txt",
aiSitemap: "ai-sitemap.json",
mdManifest: "md-manifest.json",
mdSitemap: "md-sitemap.xml",
});

export const AUXILIARY_AI_ARTIFACTS = Object.freeze([
ARTIFACT_NAMES.llmsFull,
ARTIFACT_NAMES.aiCorpus,
ARTIFACT_NAMES.aiSitemap,
ARTIFACT_NAMES.mdManifest,
ARTIFACT_NAMES.mdSitemap,
ARTIFACT_NAMES.generatedMdState,
]);

export const AI_DISCOVERY_ARTIFACTS = Object.freeze([
ARTIFACT_NAMES.llms,
ARTIFACT_NAMES.llmsFull,
ARTIFACT_NAMES.aiCorpus,
ARTIFACT_NAMES.aiSitemap,
ARTIFACT_NAMES.mdManifest,
ARTIFACT_NAMES.mdSitemap,
]);

// Backward-compatible named export expected by some callers.
export const GENERATED_MD_STATE_FILE_NAME = ARTIFACT_NAMES.generatedMdState;

export const PAGE_FILES_PRIORITY = Object.freeze([
"page.tsx",
"page.ts",
"page.js",
"page.jsx",
"page.mdx",
"page.md",
]);

export const PAGE_FILE_RE = /^page.(tsx|ts|js|jsx|mdx|md)$/;

export const SPECIAL_FILE_RE =
/^(layout|template|loading|error|global-error|not-found|default).(tsx|ts|js|jsx|mdx|md)$/;

export const MARKDOWN_LIKE_EXTENSIONS = Object.freeze([".md", ".mdx"]);

export const JSX_LIKE_EXTENSIONS = Object.freeze([
".tsx",
".ts",
".jsx",
".js",
]);

export const SKIP_DIR_NAMES = Object.freeze([
"api",
"components",
"styles",
"fonts",
"lib",
"utils",
"public",
"node_modules",
]);

// Backward-compatible export for callers that import SKIP_DIRS directly.
export const SKIP_DIRS = new Set(SKIP_DIR_NAMES);

export const MINOR_TITLE_WORDS = new Set([
"a",
"an",
"and",
"as",
"at",
"by",
"for",
"from",
"in",
"into",
"of",
"on",
"or",
"the",
"to",
"vs",
"via",
"with",
]);

export const TITLE_WORD_OVERRIDES = new Map([
["ai", "AI"],
["api", "API"],
["faq", "FAQ"],
["fvr", "FVR"],
["go", "Go"],
["html", "HTML"],
["it", "IT"],
["json", "JSON"],
["kpi", "KPI"],
["kpis", "KPIs"],
["llm", "LLM"],
["llms", "LLMs"],
["md", "Markdown"],
["no", "No"],
["rag", "RAG"],
["tbd", "TBD"],
["ui", "UI"],
["url", "URL"],
["urls", "URLs"],
["ux", "UX"],
["xml", "XML"],
]);

export const PRIORITY_LLMS_ROUTES = Object.freeze([
"/",
"/about",
"/contact",
"/why",
"/diagnosis",
"/principles",
"/research",
"/technology",
"/technology/context-packs",
"/technology/kristal",
"/technology/kristal/overview",
"/technology/kristal/what-it-does",
"/technology/kristal/trust-and-provenance",
"/technology/kristal/portability-and-offline",
"/technology/kristal/distribution-and-versioning",
"/technology/kristal/integrations",
"/platforms",
"/platforms/orgo",
"/platforms/konnaxion",
"/technology/ariane",
"/technology/swarmcraft",
"/infrastructures",
"/initiatives",
"/reading",
]);

export const CORPUS_HEADER_LABEL = "AI KNOWLEDGE BASE";
export const LLMS_HEADER_LABEL = "AI ACCESS INDEX";
export const LLMS_FULL_HEADER_LABEL = "Full AI Context";
