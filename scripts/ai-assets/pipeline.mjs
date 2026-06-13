// scripts/ai-assets/pipeline.mjs
import fs from "node:fs";
import path from "node:path";

import {
  routeToUrl,
  routeToMarkdownUrl,
  routeToMarkdownRelativePath,
} from "./route-utils.mjs";
import {
  cleanContent,
  codeLikenessScore,
  extractTitleFromContent,
  summarizeText,
} from "./cleaners/index.mjs";
import { buildMarkdownMirror } from "./generators/index.mjs";

function truncate(text, maxChars) {
  if (!maxChars || maxChars <= 0) return text;
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trim()} …`;
}

function toRelativeFromCwd(absPath) {
  return path.relative(process.cwd(), absPath);
}

function getSourceExt(fileAbsPath) {
  return path.extname(fileAbsPath || "").toLowerCase();
}

function isMarkdownLike(fileAbsPath) {
  const ext = getSourceExt(fileAbsPath);
  return ext === ".md" || ext === ".mdx";
}

function normalizeRoute(route) {
  const value = String(route || "").trim();
  if (!value) return "/";

  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

function normalizeRoutePrefix(prefix) {
  const value = String(prefix || "").trim();
  if (!value || value === "/") return null;

  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return withSlash.replace(/\/+$/, "");
}

function isExcludedRoute(route, excludePrefixes = []) {
  const normalizedRoute = normalizeRoute(route);

  return excludePrefixes
    .map(normalizeRoutePrefix)
    .filter(Boolean)
    .some((prefix) => {
      return (
        normalizedRoute === prefix ||
        normalizedRoute.startsWith(`${prefix}/`)
      );
    });
}

function normalizeWarningList(warnings) {
  return Array.isArray(warnings) ? [...warnings] : [];
}

function createEmptyState({ config, warnings }) {
  const nowIso = new Date().toISOString();

  return {
    config,
    warnings: normalizeWarningList(warnings),
    nowIso,

    pages: [],
    sortedRoutes: [],

    byRoute: new Map(),
    pathsFound: new Map(),
    markdownUrlsFound: new Map(),
    sourceFilesForRoute: new Map(),
    cleanedContentForRoute: new Map(),
    markdownMirrorForRoute: new Map(),
    titlesForRoute: new Map(),
    summariesForRoute: new Map(),
  };
}

function appendDuplicateWarning(state, route, keptAbsPath, ignoredAbsPath) {
  state.warnings.push(
    `⚠ Duplicate route "${route}"\n` +
      `   - Kept: ${toRelativeFromCwd(keptAbsPath)}\n` +
      `   - Ignored: ${toRelativeFromCwd(ignoredAbsPath)}\n`
  );
}

function appendExcludedRouteWarning(state, route, fileAbsPath) {
  state.warnings.push(
    `⚠ Excluded route: ${route} (${toRelativeFromCwd(fileAbsPath)})`
  );
}

function appendCodeLikeWarning(state, route, fileAbsPath) {
  state.warnings.push(
    `⚠ Skipped code-like page: ${route} (${toRelativeFromCwd(fileAbsPath)})`
  );
}

function buildCorpusHeader({ config, nowIso }) {
  return (
    `# ${config.siteLabel} — AI KNOWLEDGE BASE\n` +
    `# Title: ${config.projectTitle}\n` +
    `# Date: ${nowIso}\n` +
    `# Base: ${config.baseUrl}\n` +
    `# Excludes: ${config.excludePrefixes.join(", ") || "(none)"}\n` +
    `# Include dynamic: ${config.includeDynamicSegments}\n` +
    `# Skip code-like: ${config.skipCodeLikePages}\n` +
    `# Generate markdown mirrors: ${config.generateMdMirrors}\n` +
    (config.maxCharsPerPage
      ? `# Max chars per page: ${config.maxCharsPerPage}\n`
      : "") +
    `\n`
  );
}

function buildCorpusForPages({ config, nowIso, pages }) {
  let corpus = buildCorpusHeader({ config, nowIso });

  for (const page of pages) {
    corpus += `==================================================\n`;
    corpus += `PAGE: ${page.route}\n`;
    corpus += `URL: ${page.url}\n`;
    corpus += `MARKDOWN_URL: ${page.markdownUrl}\n`;
    corpus += `SOURCE: ${page.sourceRel}\n`;
    corpus += `TITLE: ${page.title}\n`;
    corpus += `==================================================\n`;
    corpus += `${page.cleaned}\n\n`;
  }

  return corpus;
}

function buildAiSitemapEntries(pages) {
  return pages.map((page) => ({
    route: page.route,
    title: page.title,
    url: page.url,
    markdown_url: page.markdownUrl,
    markdown_path: `/${page.markdownRelPath}`,
    summary: page.summary,
    source: page.sourceRel,
  }));
}

function buildMdManifestEntries(pages, nowIso) {
  return pages.map((page) => ({
    route: page.route,
    title: page.title,
    url: page.url,
    markdown_url: page.markdownUrl,
    markdown_path: `/${page.markdownRelPath}`,
    summary: page.summary,
    source: page.sourceRel,
    chars: page.cleaned.length,
    generated_at: nowIso,
  }));
}

function buildSinglePage({ config, nowIso, route, fileAbsPath }) {
  const raw = fs.readFileSync(fileAbsPath, "utf8");
  const ext = getSourceExt(fileAbsPath);

  const cleaned = truncate(
    cleanContent(raw, ext, config),
    config.maxCharsPerPage
  );

  if (!cleaned || cleaned.length < config.minCharsPerPage) {
    return null;
  }

  if (
    config.skipCodeLikePages &&
    !isMarkdownLike(fileAbsPath) &&
    codeLikenessScore(cleaned) > config.codeLikeThreshold
  ) {
    return { skippedAsCodeLike: true };
  }

  const sourceRel = toRelativeFromCwd(fileAbsPath);
  const url = routeToUrl(route, config);
  const markdownUrl = routeToMarkdownUrl(route, config);
  const markdownRelPath = routeToMarkdownRelativePath(route, config);
  const title = extractTitleFromContent(cleaned, route, config);
  const summary = summarizeText(cleaned, config.summaryMaxChars);
  const markdownMirror = buildMarkdownMirror({
    route,
    url,
    markdownUrl,
    sourceRel,
    title,
    body: cleaned,
    generatedAt: nowIso,
  });

  return {
    route,
    url,
    markdownUrl,
    markdownRelPath,
    fileAbsPath,
    sourceRel,
    title,
    summary,
    cleaned,
    markdownMirror,
  };
}

function sortPages(pages) {
  return [...pages].sort((a, b) => a.route.localeCompare(b.route));
}

function indexPagesIntoState(state, pages) {
  for (const page of pages) {
    state.byRoute.set(page.route, page);
    state.pathsFound.set(page.route, page.url);
    state.markdownUrlsFound.set(page.route, page.markdownUrl);
    state.sourceFilesForRoute.set(page.route, page.fileAbsPath);
    state.cleanedContentForRoute.set(page.route, page.cleaned);
    state.markdownMirrorForRoute.set(page.route, page.markdownMirror);
    state.titlesForRoute.set(page.route, page.title);
    state.summariesForRoute.set(page.route, page.summary);
  }
}

export function buildAiAssetState({ config, candidates, warnings = [] }) {
  const state = createEmptyState({ config, warnings });

  for (const candidate of candidates) {
    const { route, fileAbsPath } = candidate;

    if (isExcludedRoute(route, config.excludePrefixes)) {
      appendExcludedRouteWarning(state, route, fileAbsPath);
      continue;
    }

    if (state.byRoute.has(route)) {
      appendDuplicateWarning(
        state,
        route,
        state.sourceFilesForRoute.get(route),
        fileAbsPath
      );
      continue;
    }

    const page = buildSinglePage({
      config,
      nowIso: state.nowIso,
      route,
      fileAbsPath,
    });

    if (!page) {
      continue;
    }

    if (page.skippedAsCodeLike) {
      appendCodeLikeWarning(state, route, fileAbsPath);
      continue;
    }

    state.pages.push(page);
  }

  state.pages = sortPages(state.pages);
  state.sortedRoutes = state.pages.map((page) => page.route);

  indexPagesIntoState(state, state.pages);

  state.corpus = buildCorpusForPages({
    config,
    nowIso: state.nowIso,
    pages: state.pages,
  });

  state.aiSitemapEntries = buildAiSitemapEntries(state.pages);
  state.mdManifestEntries = buildMdManifestEntries(state.pages, state.nowIso);

  return state;
}