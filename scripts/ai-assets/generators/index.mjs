// scripts/ai-assets/generators/index.mjs

import fs from "node:fs";
import path from "node:path";

import {
  AI_SUPPORTING_RESOURCES,
  CONTEXT_PACK_MANIFEST_RELATIVE_PATH,
} from "../constants.mjs";

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

function normalizeRouteCase(route) {
  const value = String(route || "").trim();
  if (!value) return "/";

  const normalized = value.startsWith("/") ? value : `/${value}`;

  if (normalized.toLowerCase() === "/technology/ariane/concepts/glossary") {
    return "/technology/ariane/concepts/glossary";
  }

  return normalized;
}

function getPageRoute(page) {
  return normalizeRouteCase(page?.route || "/");
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

function compactText(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcludedPrefixes(config) {
  return Array.isArray(config?.excludePrefixes)
    ? config.excludePrefixes
        .map((prefix) => String(prefix || "").trim())
        .filter(Boolean)
    : [];
}

function lineReferencesExcludedPrefix(line, excludedPrefixes) {
  const value = String(line || "").toLowerCase();

  return excludedPrefixes.some((prefix) => {
    const normalizedPrefix = String(prefix || "").toLowerCase();
    if (!normalizedPrefix) return false;

    return (
      value.includes(normalizedPrefix) ||
      value.includes(encodeURI(normalizedPrefix).toLowerCase())
    );
  });
}

function stripExcludedReferenceLines(text, excludedPrefixes) {
  if (!Array.isArray(excludedPrefixes) || excludedPrefixes.length === 0) {
    return text;
  }

  return String(text || "")
    .split("\n")
    .filter((line) => !lineReferencesExcludedPrefix(line, excludedPrefixes))
    .join("\n")
    .trim();
}

function getPageSummary(page, maxChars = 220, options = {}) {
  const excludedPrefixes = Array.isArray(options.excludedPrefixes)
    ? options.excludedPrefixes
    : [];

  const body = stripExcludedReferenceLines(getPageBody(page), excludedPrefixes);

  const oneLine = body
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

function pushMetadataLine(lines, label, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return;

  lines.push(`- ${label}: ${normalized}`);
}

function pushLinkedResource(lines, title, url, description) {
  if (!url) return;

  lines.push(`- [${title}](${url})`);
  if (description) {
    lines.push(`  - ${description}`);
  }
}

function pushConfiguredResources(lines, resources, baseUrl) {
  if (!Array.isArray(resources) || resources.length === 0) return;

  for (const resource of resources) {
    const title = String(
      resource?.title || resource?.fileName || resource?.path || ""
    ).trim();

    const url = joinUrl(baseUrl, resource?.path || resource?.fileName || "");
    const purpose = compactText(resource?.purpose || "");
    const type = compactText(resource?.type || "");

    if (!title || !url) continue;

    const description = [purpose, type ? `Type: ${type}.` : ""]
      .filter(Boolean)
      .join(" ");

    pushLinkedResource(lines, title, url, description);
  }
}

function contextPackSlugFromFilename(fileName) {
  return String(fileName || "")
    .replace(/\.txt$/i, "")
    .replace(/-context-pack(?:--.*)?$/i, "")
    .toLowerCase();
}

function titleFromSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readContextPackManifest(config) {
  const publicDir = config?.publicDir || path.join(process.cwd(), "public");
  const relativeManifest =
    CONTEXT_PACK_MANIFEST_RELATIVE_PATH || "context-packs/index.json";
  const manifestPath = path.join(publicDir, relativeManifest);

  try {
    if (!fs.existsSync(manifestPath)) return null;
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (!Array.isArray(parsed?.packs)) return null;

    return parsed.packs.filter(
      (pack) => typeof pack?.file === "string" && pack.file.toLowerCase().endsWith(".txt")
    );
  } catch {
    return null;
  }
}

function discoverContextPackResources(config) {
  const discovered = readContextPackManifest(config) ?? [];

  return discovered
    .map((pack) => {
      const file = String(pack?.file || "").trim();
      if (!file) return null;

      const slug = String(pack?.slug || contextPackSlugFromFilename(file)).trim();
      const repository = String(pack?.repository || "").trim();
      const repositoryName = repository ? repository.split("/").pop() : "";
      const fallbackName = repositoryName || titleFromSlug(slug) || file;
      const rawFileCount = pack?.fileCount;
      const fileCount =
        rawFileCount != null && rawFileCount !== "" && Number.isFinite(Number(rawFileCount))
          ? Number(rawFileCount)
          : null;

      const details = [
        repository ? `Source: ${repository}.` : "",
        fileCount != null ? `Files: ${fileCount}.` : "",
      ]
        .filter(Boolean)
        .join(" ");

      return {
        fileName: `context-packs/${file}`,
        title: String(pack?.title || `${fallbackName} Context Pack`).trim(),
        path: `/context-packs/${file}`,
        type: "text/plain",
        purpose: details || "AI-ready context pack published by initkoa.org.",
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
}

export function selectLlmsPages(state) {
  const config = getConfig(state);
  const pages = getPages(state);
  const sortedPages = [...pages].sort((a, b) =>
    getPageRoute(a).localeCompare(getPageRoute(b))
  );

  const maxLinks = Number(config.maxLlmsPageLinks || 28) || 28;
  const priorityRoutes = Array.isArray(config.priorityLlmsRoutes)
    ? config.priorityLlmsRoutes.map(normalizeRouteCase)
    : [];

  const pageByRoute = new Map(
    sortedPages.map((page) => [getPageRoute(page), page])
  );

  const chosen = [];
  const seen = new Set();

  function add(route) {
    const canonicalRoute = normalizeRouteCase(route);
    const page = pageByRoute.get(canonicalRoute);
    if (!page || seen.has(canonicalRoute) || chosen.length >= maxLinks) return;
    seen.add(canonicalRoute);
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
    "",
    `Title: ${config.projectTitle || ""}`,
    `Generated: ${generatedAt}`,
    `Base: ${config.baseUrl || ""}`,
    `Excludes: ${(config.excludePrefixes || []).join(", ") || "(none)"}`,
    `Include dynamic: ${Boolean(config.includeDynamicSegments)}`,
    `Skip code-like: ${Boolean(config.skipCodeLikePages)}`,
    `Generate markdown mirrors: ${Boolean(config.generateMdMirrors)}`,
  ];

  if (config.maxCharsPerPage) {
    lines.push(`Max chars per page: ${config.maxCharsPerPage}`);
  }

  lines.push("");
  lines.push(
    "This file is a plain-text corpus extracted from public app routes. Use /llms.txt as the primary AI entrypoint and the route-specific Markdown mirrors for page-level context."
  );
  lines.push("");

  for (const page of pages) {
    lines.push("==================================================");
    lines.push(`PAGE: ${getPageRoute(page)}`);
    lines.push(`TITLE: ${getPageTitle(page)}`);
    lines.push(`URL: ${getPageUrl(page)}`);
    lines.push(`MARKDOWN_URL: ${getPageMarkdownUrl(page)}`);
    lines.push(`SOURCE: ${getPageSource(page)}`);
    lines.push("==================================================");
    lines.push("");
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
  const generatedAt = getNowIso(state);
  const excludedPrefixes = getExcludedPrefixes(config);

  const llmsFullName = artifactNames.llmsFull || "llms-full.txt";
  const mdManifestName = artifactNames.mdManifest || "md-manifest.json";
  const aiSitemapName = artifactNames.aiSitemap || "ai-sitemap.json";

  const lines = [`# ${config.siteLabel || "site"}`, ""];

  const description = compactText(config.projectDescription || "");
  if (description) {
    lines.push(`> ${description}`, "");
  }

  lines.push("## Purpose");
  lines.push("");
  lines.push(
    "This is the primary AI entrypoint for the site. It gives agents a compact orientation, points to supporting machine-readable artifacts, lists context packs as external references, and exposes important page-level Markdown mirrors."
  );
  lines.push("");
  lines.push(
    "Use this file first. Use auxiliary files only when deeper crawling, full context, structured route discovery, or domain-specific context packs are needed."
  );
  lines.push("");

  lines.push("## Metadata");
  lines.push("");
  pushMetadataLine(lines, "Generated", generatedAt);
  pushMetadataLine(lines, "Site title", config.projectTitle || "");
  pushMetadataLine(lines, "Base URL", config.baseUrl || "");
  pushMetadataLine(lines, "Pages included in generated corpus", String(pages.length));
  lines.push("");

  lines.push("## Supporting machine-readable artifacts");
  lines.push("");
  pushConfiguredResources(lines, AI_SUPPORTING_RESOURCES, config.baseUrl);

  lines.push("");
  lines.push("## Context packs");
  lines.push("");
  lines.push(
    "Context packs are linked here as external/static reference bundles. Their contents are not duplicated into this compact entrypoint or the generated route corpus."
  );
  lines.push("");
  pushConfiguredResources(lines, discoverContextPackResources(config), config.baseUrl);

  lines.push("");
  lines.push("## Important pages");
  lines.push("");

  for (const page of selectedPages) {
    const title = getPageTitle(page);
    const route = getPageRoute(page);
    const htmlUrl = getPageUrl(page);
    const markdownUrl = getPageMarkdownUrl(page);
    const summary = getPageSummary(page, 220, { excludedPrefixes });

    lines.push(`### ${title}`);
    lines.push("");
    pushMetadataLine(lines, "Route", route);
    pushMetadataLine(lines, "HTML", htmlUrl);
    pushMetadataLine(lines, "Markdown mirror", markdownUrl);
    pushMetadataLine(lines, "Source", getPageSource(page));

    if (summary) {
      lines.push("");
      lines.push(summary);
    }

    lines.push("");
  }

  if (omittedCount > 0) {
    lines.push("## Additional pages");
    lines.push("");
    lines.push(
      `${omittedCount} additional page(s) are omitted from this compact entrypoint. Use ${llmsFullName}, ${mdManifestName}, or ${aiSitemapName} for exhaustive discovery.`
    );
    lines.push("");
  }

  return lines.join("\n");
}

export function buildLlmsFull(state) {
  const config = getConfig(state);
  const pages = getPages(state);
  const generatedAt = getNowIso(state);

  const lines = [
    `# ${config.siteLabel || "site"} — Full AI Context`,
    "",
    "## Metadata",
    "",
  ];

  pushMetadataLine(lines, "Title", config.projectTitle || "");
  pushMetadataLine(lines, "Description", compactText(config.projectDescription || ""));
  pushMetadataLine(lines, "Generated", generatedAt);
  pushMetadataLine(lines, "Base URL", config.baseUrl || "");
  pushMetadataLine(lines, "Pages included", String(pages.length));

  lines.push("");
  lines.push("## Usage");
  lines.push("");
  lines.push(
    "This file is the full aggregated AI context bundle. It is auxiliary to /llms.txt, which remains the primary entrypoint."
  );
  lines.push("");
  lines.push("For page-level retrieval, prefer the Markdown mirror URL listed in each page section.");
  lines.push("");
  lines.push("## Pages");
  lines.push("");

  for (const page of pages) {
    lines.push("---");
    lines.push("");
    lines.push(`## ${getPageTitle(page)}`);
    lines.push("");

    pushMetadataLine(lines, "Route", getPageRoute(page));
    pushMetadataLine(lines, "HTML", getPageUrl(page));
    pushMetadataLine(lines, "Markdown mirror", getPageMarkdownUrl(page));
    pushMetadataLine(lines, "Source", getPageSource(page));

    lines.push("");
    lines.push(getPageBody(page));
    lines.push("");
  }

  return lines.join("\n");
}

export function buildAiSitemapPayload(state) {
  const pages = getPages(state);
  const seenRoutes = new Set();

  return pages
    .map((page) => ({
      route: getPageRoute(page),
      title: getPageTitle(page),
      url: getPageUrl(page),
      markdown_url: getPageMarkdownUrl(page),
      markdown_path: getPageMarkdownPath(page),
      summary: getPageSummary(page, 180, {
        excludedPrefixes: getExcludedPrefixes(getConfig(state)),
      }),
      source: getPageSource(page),
    }))
    .filter((page) => {
      if (seenRoutes.has(page.route)) return false;
      seenRoutes.add(page.route);
      return true;
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

export function buildMdManifestPayload(state) {
  const pages = getPages(state);
  const generatedAt = getNowIso(state);
  const seenRoutes = new Set();

  return pages
    .map((page) => ({
      route: getPageRoute(page),
      title: getPageTitle(page),
      url: getPageUrl(page),
      markdown_url: getPageMarkdownUrl(page),
      markdown_path: getPageMarkdownPath(page),
      summary: getPageSummary(page, 180, {
        excludedPrefixes: getExcludedPrefixes(getConfig(state)),
      }),
      source: getPageSource(page),
      chars: getPageBody(page).length,
      generated_at: generatedAt,
    }))
    .filter((page) => {
      if (seenRoutes.has(page.route)) return false;
      seenRoutes.add(page.route);
      return true;
    })
    .sort((a, b) => a.route.localeCompare(b.route));
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
