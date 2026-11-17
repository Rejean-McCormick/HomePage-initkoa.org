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

// The JSX text cleaner discards href attributes. Keep the external CTAs on
// the updated public entry pages discoverable in Markdown and text artifacts.
const LINK_DISCOVERY_ROUTES = new Set([
  "/",
  "/evidence",
  "/ecosystem",
  "/infrastructures/kin-city",
]);

function publicExternalLinks(raw, route, config) {
  if (!LINK_DISCOVERY_ROUTES.has(route)) return [];

  // Read the value rather than duplicating the navigation URL in this generator.
  const navigationSource = fs.readFileSync(
    path.join(config.rootDir, "lib/site-navigation.ts"),
    "utf8"
  );
  const urlConstants = new Map(
    [...navigationSource.matchAll(/export\s+const\s+([A-Z][A-Z_0-9]*)\s*=\s*["'](https?:\/\/[^"']+)["']/g)]
      .map((match) => [match[1], match[2]])
  );

  const links = [];
  const seen = new Set();
  for (const match of raw.matchAll(/<(SiteLink|Link|a)\b([^>]*)>([\s\S]*?)<\/\1>/g)) {
    const attributes = match[2];
    const literalHref = attributes.match(/\bhref\s*=\s*["'](https?:\/\/[^"']+)["']/);
    const namedHref = attributes.match(/\bhref\s*=\s*\{\s*([A-Z][A-Z_0-9]*)\s*\}/);
    const url = literalHref?.[1] || urlConstants.get(namedHref?.[1]);
    if (!url || !/^https?:\/\//.test(url)) continue;

    const label = match[3]
      .replace(/<[^>]*>/g, " ")
      .replace(/\{[^{}]*\}/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!label || seen.has(url)) continue;
    seen.add(url);
    links.push(`- [${label}](${url})`);
  }
  return links;
}

function connectionsDirectoryForDiscovery(route, config) {
  if (route !== "/connections") return "";
  const pathToPublicData = path.join(config.rootDir, "public/data/koa-connections.json");
  if (!fs.existsSync(pathToPublicData)) return "";
  const registry = JSON.parse(fs.readFileSync(pathToPublicData, "utf8"));
  const aliasByRepository = new Map(registry.aliases
    .filter(item => item.entity_id)
    .map(item => [item.entity_id, item.path]));
  const lines = [
    "## Shared navigation registry (snapshot only)",
    "This is navigation, not verification of running integration or repository qualification.",
    `Structured JSON: https://initkoa.org/data/koa-connections.json`,
    `${registry.repositories.length} repositories in target design; ${registry.repositories.filter(r => r.in_audit_reference_inventory).length} in audit reference inventory; ${registry.chains.length} target chains; ${registry.crosswalks.length} proposed editorial mappings.`,
    "### Public audit journeys",
    ...registry.paths.map(p => `- [${p.title_en}](${p.audit_url}) — ${p.summary_en}`),
    "### Application inventory",
    ...registry.repositories.map(r => `- [${r.name}](https://initkoa.org${aliasByRepository.get(r.id) || "/connections"}) — ${r.in_audit_reference_inventory ? "audit reference" : "target design only"}; ${r.target_role}`),
    "### Target functional chains",
    ...registry.chains.map(c => `- [${c.id.replace("chain:", "")} — ${c.title_en}](https://initkoa.org${c.href}) — target design, not qualified`),
    "### Proposed editorial crosswalks",
    ...registry.crosswalks.map(c => `- ${c.from} ↔ ${c.to}: ${c.editorial_note} (editorial proposal, not implementation proof)`),
  ];
  return lines.join("\n");
}

function buildSinglePage({ config, nowIso, route, fileAbsPath }) {
  const raw = fs.readFileSync(fileAbsPath, "utf8");
  const ext = getSourceExt(fileAbsPath);

  const cleanedText = truncate(
    cleanContent(raw, ext, config),
    config.maxCharsPerPage
  );
  const externalLinks = publicExternalLinks(raw, route, config);
  const connectionDirectory = connectionsDirectoryForDiscovery(route, config);
  const cleaned = [cleanedText, externalLinks.length ? `External links\n\n${externalLinks.join("\n")}` : "", connectionDirectory]
    .filter(Boolean).join("\n\n");

  if (!cleaned || cleaned.length < config.minCharsPerPage) {
    return null;
  }

  if (
    config.skipCodeLikePages &&
    !isMarkdownLike(fileAbsPath) &&
    codeLikenessScore(cleaned) > config.codeLikeThreshold &&
    route !== "/connections"
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