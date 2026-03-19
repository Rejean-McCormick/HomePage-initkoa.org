// scripts/ai-assets/generators/index.mjs

function getPages(state) {
  return Array.isArray(state?.pages) ? state.pages : [];
}

function getConfig(state) {
  return state?.config ?? {};
}

function getNowIso(state, page) {
  return (
    state?.generatedAt ??
    state?.nowIso ??
    page?.generatedAt ??
    new Date().toISOString()
  );
}

function getArtifactNames(state) {
  return state?.config?.artifactNames ?? {};
}

function getPageTitle(page) {
  return page?.title || "Untitled";
}

function getPageRoute(page) {
  return page?.route || "/";
}

function getPageUrl(page) {
  return page?.url || "";
}

function getPageMarkdownUrl(page) {
  return page?.markdownUrl || "";
}

function getPageMarkdownPath(page) {
  if (typeof page?.markdownPath === "string" && page.markdownPath.trim()) {
    return page.markdownPath;
  }

  if (
    typeof page?.markdownRelPath === "string" &&
    page.markdownRelPath.trim()
  ) {
    const rel = page.markdownRelPath.replace(/^\/+/, "");
    return `/${rel}`;
  }

  return "";
}

function getPageSource(page) {
  return (
    page?.sourceRel ||
    page?.source ||
    page?.sourcePath ||
    page?.fileAbsPath ||
    ""
  );
}

function getPageBody(page) {
  return String(
    page?.body ?? page?.cleaned ?? page?.cleanedContent ?? page?.cleanedText ?? ""
  ).trim();
}

function getPageSummary(page, maxChars = 220) {
  const oneLine = getPageBody(page)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^#{1,6}\s+/.test(line))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (oneLine.length <= maxChars) return oneLine;
  return `${oneLine.slice(0, maxChars).trim()}…`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function joinUrl(baseUrl, fileName) {
  const base = String(baseUrl || "").replace(/\/+$/, "");
  const file = String(fileName || "").replace(/^\/+/, "");

  if (!base) return file ? `/${file}` : "";
  return file ? `${base}/${file}` : base;
}

export function selectLlmsPages(state) {
  const config = getConfig(state);
  const pages = getPages(state);
  const sortedPages = [...pages].sort((a, b) =>
    getPageRoute(a).localeCompare(getPageRoute(b))
  );

  const maxLinks = Number(config.maxLlmsPageLinks || 28) || 28;
  const priorityRoutes = Array.isArray(config.priorityLlmsRoutes)
    ? config.priorityLlmsRoutes
    : [];

  const pageByRoute = new Map(
    sortedPages.map((page) => [getPageRoute(page), page])
  );

  const chosen = [];
  const seen = new Set();

  function add(route) {
    const page = pageByRoute.get(route);
    if (!page || seen.has(route) || chosen.length >= maxLinks) return;
    seen.add(route);
    chosen.push(page);
  }

  for (const route of priorityRoutes) {
    add(route);
  }

  for (const page of sortedPages) {
    const route = getPageRoute(page);
    const depth = route === "/" ? 0 : route.split("/").filter(Boolean).length;

    if (depth <= 1) {
      add(route);
    }

    if (chosen.length >= maxLinks) {
      break;
    }
  }

  return chosen.slice(0, maxLinks);
}

export function buildMarkdownMirror(page, state) {
  const generatedAt = getNowIso(state, page);
  const url = getPageUrl(page);
  const markdownUrl = getPageMarkdownUrl(page);

  const lines = [
    `# ${getPageTitle(page)}`,
    "",
    `> Canonical HTML: ${url}`,
    `> Markdown mirror: ${markdownUrl}`,
    `> Route: ${getPageRoute(page)}`,
    `> Source: ${getPageSource(page)}`,
    `> Generated: ${generatedAt}`,
    "",
  ];

  if (url) {
    lines.push(`[Open the HTML page](${url})`, "");
  }

  lines.push(getPageBody(page), "");

  return lines.join("\n");
}

export function buildAiCorpus(state) {
  const config = getConfig(state);
  const pages = getPages(state);
  const generatedAt = getNowIso(state);

  const lines = [
    `# ${config.siteLabel || "site"} — AI KNOWLEDGE BASE`,
    `# Title: ${config.projectTitle || ""}`,
    `# Date: ${generatedAt}`,
    `# Base: ${config.baseUrl || ""}`,
    `# Excludes: ${(config.excludePrefixes || []).join(", ") || "(none)"}`,
    `# Include dynamic: ${Boolean(config.includeDynamicSegments)}`,
    `# Skip code-like: ${Boolean(config.skipCodeLikePages)}`,
    `# Generate markdown mirrors: ${Boolean(config.generateMdMirrors)}`,
  ];

  if (config.maxCharsPerPage) {
    lines.push(`# Max chars per page: ${config.maxCharsPerPage}`);
  }

  lines.push("");

  for (const page of pages) {
    lines.push("==================================================");
    lines.push(`PAGE: ${getPageRoute(page)}`);
    lines.push(`URL: ${getPageUrl(page)}`);
    lines.push(`MARKDOWN_URL: ${getPageMarkdownUrl(page)}`);
    lines.push(`SOURCE: ${getPageSource(page)}`);
    lines.push(`TITLE: ${getPageTitle(page)}`);
    lines.push("==================================================");
    lines.push(getPageBody(page));
    lines.push("");
  }

  return lines.join("\n");
}

export function buildLlmsTxt(state) {
  const config = getConfig(state);
  const artifactNames = getArtifactNames(state);
  const pages = getPages(state);
  const selectedPages = selectLlmsPages(state);
  const omittedCount = Math.max(pages.length - selectedPages.length, 0);

  const lines = [
    `# ${config.siteLabel || "site"}`,
    "",
    `> ${config.projectDescription || ""}`,
    "",
    "## Key resources",
    "",
    `- [${artifactNames.llmsFull || "llms-full.txt"}](${joinUrl(
      config.baseUrl,
      artifactNames.llmsFull || "llms-full.txt"
    )}): Full aggregated AI context bundle.`,
    `- [${artifactNames.aiCorpus || "ai-corpus.txt"}](${joinUrl(
      config.baseUrl,
      artifactNames.aiCorpus || "ai-corpus.txt"
    )}): Plain-text extracted corpus from app routes.`,
    `- [${artifactNames.mdManifest || "md-manifest.json"}](${joinUrl(
      config.baseUrl,
      artifactNames.mdManifest || "md-manifest.json"
    )}): JSON index of HTML routes and Markdown mirrors.`,
    `- [${artifactNames.mdSitemap || "md-sitemap.xml"}](${joinUrl(
      config.baseUrl,
      artifactNames.mdSitemap || "md-sitemap.xml"
    )}): Sitemap dedicated to Markdown mirror URLs.`,
    `- [${artifactNames.aiSitemap || "ai-sitemap.json"}](${joinUrl(
      config.baseUrl,
      artifactNames.aiSitemap || "ai-sitemap.json"
    )}): Route inventory with source paths and mirror URLs.`,
    "",
    "## Important pages",
    "",
  ];

  for (const page of selectedPages) {
    lines.push(
      `- [${getPageTitle(page)}](${getPageMarkdownUrl(page)}): Mirror for ${getPageRoute(page)} (${getPageUrl(page)}). ${getPageSummary(page, 180)}`
    );
  }

  if (omittedCount > 0) {
    lines.push("");
    lines.push(
      `Additional pages omitted here for brevity: ${omittedCount}. Use ${
        artifactNames.llmsFull || "llms-full.txt"
      } or ${artifactNames.mdManifest || "md-manifest.json"} for the exhaustive index.`
    );
  }

  lines.push("");
  return lines.join("\n");
}

export function buildLlmsFull(state) {
  const config = getConfig(state);
  const pages = getPages(state);
  const generatedAt = getNowIso(state);

  const lines = [
    `# ${config.siteLabel || "site"} — Full AI Context`,
    "",
    `Title: ${config.projectTitle || ""}`,
    `Description: ${config.projectDescription || ""}`,
    `Generated: ${generatedAt}`,
    `Base: ${config.baseUrl || ""}`,
    "",
  ];

  for (const page of pages) {
    lines.push("==================================================");
    lines.push(`TITLE: ${getPageTitle(page)}`);
    lines.push(`ROUTE: ${getPageRoute(page)}`);
    lines.push(`URL: ${getPageUrl(page)}`);
    lines.push(`MARKDOWN_URL: ${getPageMarkdownUrl(page)}`);
    lines.push(`SOURCE: ${getPageSource(page)}`);
    lines.push("==================================================");
    lines.push(getPageBody(page));
    lines.push("");
  }

  return lines.join("\n");
}

export function buildAiSitemapPayload(state) {
  const pages = getPages(state);

  return pages.map((page) => ({
    route: getPageRoute(page),
    title: getPageTitle(page),
    url: getPageUrl(page),
    markdown_url: getPageMarkdownUrl(page),
    markdown_path: getPageMarkdownPath(page),
    summary: getPageSummary(page, 180),
    source: getPageSource(page),
  }));
}

export function buildMdManifestPayload(state) {
  const pages = getPages(state);
  const generatedAt = getNowIso(state);

  return pages.map((page) => ({
    route: getPageRoute(page),
    title: getPageTitle(page),
    url: getPageUrl(page),
    markdown_url: getPageMarkdownUrl(page),
    markdown_path: getPageMarkdownPath(page),
    summary: getPageSummary(page, 180),
    source: getPageSource(page),
    chars: getPageBody(page).length,
    generated_at: generatedAt,
  }));
}

export function buildAiSitemapJson(state) {
  return `${JSON.stringify(buildAiSitemapPayload(state), null, 2)}\n`;
}

export function buildMdManifestJson(state) {
  return `${JSON.stringify(buildMdManifestPayload(state), null, 2)}\n`;
}

export function buildMdSitemapXml(state) {
  const pages = getPages(state);
  const generatedAt = getNowIso(state);

  const body = pages
    .filter((page) => Boolean(getPageMarkdownUrl(page)))
    .map((page) =>
      [
        "  <url>",
        `    <loc>${escapeXml(getPageMarkdownUrl(page))}</loc>`,
        `    <lastmod>${escapeXml(generatedAt)}</lastmod>`,
        "  </url>",
      ].join("\n")
    )
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    body,
    `</urlset>`,
    "",
  ].join("\n");
}

export function buildGeneratedMarkdownMirrors(state) {
  const pages = getPages(state);

  return pages.map((page) => ({
    route: getPageRoute(page),
    markdownPath: getPageMarkdownPath(page).replace(/^\/+/, ""),
    content: buildMarkdownMirror(page, state),
  }));
}

export const generateAiCorpus = buildAiCorpus;
export const generateLlmsTxt = buildLlmsTxt;
export const generateLlmsFull = buildLlmsFull;
export const generateAiSitemap = buildAiSitemapJson;
export const generateMdManifest = buildMdManifestJson;
export const generateMdSitemap = buildMdSitemapXml;

export default {
  selectLlmsPages,
  buildMarkdownMirror,
  buildAiCorpus,
  buildLlmsTxt,
  buildLlmsFull,
  buildAiSitemapPayload,
  buildMdManifestPayload,
  buildAiSitemapJson,
  buildMdManifestJson,
  buildMdSitemapXml,
  buildGeneratedMarkdownMirrors,
  generateAiCorpus,
  generateLlmsTxt,
  generateLlmsFull,
  generateAiSitemap,
  generateMdManifest,
  generateMdSitemap,
};