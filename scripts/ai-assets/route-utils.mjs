// scripts/ai-assets/route-utils.mjs
import path from "node:path";

function getBaseUrl(config) {
  const raw = String(config?.baseUrl || "").trim();
  if (!raw) return "";
  return raw.replace(/\/+$/, "");
}

export function normalizeRoute(route = "/") {
  let value = String(route ?? "").trim();

  if (!value) return "/";

  // Normalize slashes
  value = value.replace(/\\/g, "/");
  value = value.replace(/\/{2,}/g, "/");

  // Ensure leading slash
  if (!value.startsWith("/")) {
    value = `/${value}`;
  }

  // Remove query/hash if ever passed in by mistake
  value = value.split("#")[0].split("?")[0];

  // Remove trailing slash except root
  if (value.length > 1) {
    value = value.replace(/\/+$/, "");
  }

  return value || "/";
}

export function routeToUrl(route, config = {}) {
  const normalizedRoute = normalizeRoute(route);
  const baseUrl = getBaseUrl(config);

  if (!baseUrl) return normalizedRoute;
  if (normalizedRoute === "/") return baseUrl;

  return `${baseUrl}${normalizedRoute}`;
}

export function routeToMarkdownRelativePath(route) {
  const normalizedRoute = normalizeRoute(route);

  if (normalizedRoute === "/") {
    return "index.html.md";
  }

  const clean = normalizedRoute.replace(/^\/+/, "");
  return `${clean}/index.html.md`;
}

export function routeToMarkdownUrl(route, config = {}) {
  const relPath = routeToMarkdownRelativePath(route);
  const baseUrl = getBaseUrl(config);

  if (!baseUrl) return `/${relPath}`;
  return `${baseUrl}/${relPath}`;
}

export function routeToMarkdownFilePath(route, publicDir) {
  if (!publicDir || typeof publicDir !== "string") {
    throw new TypeError("publicDir must be a string.");
  }

  const relPath = routeToMarkdownRelativePath(route);
  return path.join(publicDir, ...relPath.split("/"));
}

export default {
  normalizeRoute,
  routeToUrl,
  routeToMarkdownRelativePath,
  routeToMarkdownUrl,
  routeToMarkdownFilePath,
};