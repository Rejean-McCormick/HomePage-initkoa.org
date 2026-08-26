// scripts/ai-assets/constants.mjs

export const DEFAULT_BASE_URL = "https://initkoa.org";

export const DEFAULT_SITE_LABEL = "initkoa.org";
export const DEFAULT_PROJECT_TITLE = "kOA INITIATIVE";
export const DEFAULT_PROJECT_DESCRIPTION =
  "Public documentation for the kOA INITIATIVE by Réjean McCormick: civic utilities for learning, coordination, and governable decision-making (offline-first, auditable).";

export const DEFAULT_EXCLUDE_PREFIXES = Object.freeze([
  "/admin",
  "/api",

  // Excluded from generated AI route corpus and mirrors.
  // Context packs are referenced as external/static resources in /llms.txt,
  // but their content and index route are not duplicated in generated AI assets.
  "/context-packs",
  "/technology/context-packs",

  // Excluded from AI artifacts and compact AI discovery.
  "/kreature",
  "/initiatives/ukraine-peace-plan/fvr",
  "/technology/swarmcraft",
]);

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
// - Context packs are linked from llms.txt as external/static references.
// - Context pack content should not be duplicated into generated AI artifacts.
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

export const AI_SUPPORTING_RESOURCES = Object.freeze([
  {
    fileName: ARTIFACT_NAMES.llmsFull,
    title: "Full LLM context",
    path: `/${ARTIFACT_NAMES.llmsFull}`,
    type: "text/plain",
    purpose:
      "Full aggregated AI context bundle. Use when /llms.txt is not enough.",
  },
  {
    fileName: ARTIFACT_NAMES.aiCorpus,
    title: "AI corpus",
    path: `/${ARTIFACT_NAMES.aiCorpus}`,
    type: "text/plain",
    purpose: "Plain-text corpus extracted from public app routes.",
  },
  {
    fileName: ARTIFACT_NAMES.aiSitemap,
    title: "AI sitemap",
    path: `/${ARTIFACT_NAMES.aiSitemap}`,
    type: "application/json",
    purpose: "JSON route inventory with source paths and Markdown mirror URLs.",
  },
  {
    fileName: ARTIFACT_NAMES.mdManifest,
    title: "Markdown manifest",
    path: `/${ARTIFACT_NAMES.mdManifest}`,
    type: "application/json",
    purpose:
      "JSON index of HTML routes, Markdown mirrors, summaries, sources, and character counts.",
  },
  {
    fileName: ARTIFACT_NAMES.mdSitemap,
    title: "Markdown sitemap",
    path: `/${ARTIFACT_NAMES.mdSitemap}`,
    type: "application/xml",
    purpose: "XML sitemap dedicated to Markdown mirror URLs.",
  },
]);

// Context packs are discovered from the builder-generated manifest at build time.
// This keeps /llms.txt aligned with the actual files published under public/context-packs.
export const CONTEXT_PACK_MANIFEST_RELATIVE_PATH = "context-packs/index.json";

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

export const PAGE_FILE_RE = /^page\.(tsx|ts|js|jsx|mdx|md)$/;

export const SPECIAL_FILE_RE =
  /^(layout|template|loading|error|global-error|not-found|default)\.(tsx|ts|js|jsx|mdx|md)$/;

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
  // Core orientation
  "/",
  "/about",
  "/why",
  "/diagnosis",
  "/reading",
  "/infrastructures",

  // Principles and conceptual map
  "/principles",
  "/principles/map",
  "/principles/glossary",
  "/principles/logos",
  "/principles/civic-principles-ethics",
  "/principles/civic-principles-ethics/rights-and-duties",

  // Civic governance
  "/initiatives",
  "/initiatives/civic-governance",
  "/initiatives/civic-governance/constitution",
  "/initiatives/civic-governance/constitution/rights",
  "/initiatives/civic-governance/constitution/ekoh",
  "/initiatives/civic-governance/modules",
  "/initiatives/civic-governance/modules/economy",
  "/initiatives/civic-governance/modules/education",
  "/initiatives/civic-governance/modules/justice",

  // Ukraine initiative, without FVR
  "/initiatives/ukraine-peace-plan/summary",

  // Platforms
  "/platforms",
  "/platforms/konnaxion",
  "/platforms/konnaxion/modules",
  "/platforms/konnaxion/technical",
  "/platforms/konnaxion/kollective-intelligence",
  "/platforms/konnaxion/kollective-intelligence/smart-vote",
  "/platforms/orgo",
  "/platforms/orgo/workflow",
  "/platforms/orgo/guarantees",

  // Technology
  "/technology",
  "/technology/kristal",
  "/technology/kristal/overview",
  "/technology/kristal/trust-and-provenance",
  "/technology/ariane",
  "/technology/ariane/concepts/glossary",
  "/technology/sentient",

  // Infrastructure detail
  "/infrastructures/kristal-farms",
]);

export const CORPUS_HEADER_LABEL = "AI KNOWLEDGE BASE";
export const LLMS_HEADER_LABEL = "AI ACCESS INDEX";
export const LLMS_FULL_HEADER_LABEL = "Full AI Context";
