// scripts/ai-assets/route-walker.mjs
import fs from "node:fs";
import path from "node:path";
import {
  PAGE_FILES_PRIORITY,
  PAGE_FILE_RE,
  SPECIAL_FILE_RE,
  SKIP_DIR_NAMES,
} from "./constants.mjs";
import { normalizeRoute } from "./route-utils.mjs";

/**
 * Candidate page discovered in app/
 * @typedef {Object} RouteCandidate
 * @property {string} route
 * @property {string} fileAbsPath
 * @property {string} fileName
 * @property {string} sourceRel
 */

/**
 * @typedef {Object} WalkRoutesResult
 * @property {RouteCandidate[]} candidates
 * @property {string[]} warnings
 */

const DEFAULT_SKIP_DIRS = new Set(SKIP_DIR_NAMES);

function isRouteGroup(segment) {
  return segment.startsWith("(") && segment.endsWith(")");
}

function isParallelRoute(segment) {
  return segment.startsWith("@");
}

function isDynamicSegment(segment) {
  return segment.startsWith("[") && segment.endsWith("]");
}

function isPrivateSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith(".")) return true;
  if (segment.startsWith("_")) return true;
  return false;
}

function stripInterceptingPrefixFromSegment(segment) {
  return segment.replace(/^(?:\(\.{1,3}\))+/, "");
}

function getSkipDirs(config) {
  if (config?.skipDirs instanceof Set) return config.skipDirs;
  if (Array.isArray(config?.skipDirs)) return new Set(config.skipDirs);
  return DEFAULT_SKIP_DIRS;
}

function shouldSkipDir(segment, config) {
  const skipDirs = getSkipDirs(config);

  if (isPrivateSegment(segment)) return true;
  if (skipDirs.has(segment)) return true;
  if (isParallelRoute(segment)) return true;
  if (isDynamicSegment(segment)) return !config.includeDynamicSegments;
  if (isRouteGroup(segment)) return false;
  return false;
}

function pickPageFile(fileNames) {
  for (const fileName of PAGE_FILES_PRIORITY) {
    if (fileNames.includes(fileName)) return fileName;
  }
  return fileNames[0] ?? null;
}

function safeReadDir(dirAbsPath) {
  try {
    return fs.readdirSync(dirAbsPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

/**
 * Walk app/ and return raw route candidates.
 * Duplicate handling stays in the pipeline layer.
 *
 * @param {ReturnType<import("./config.mjs").getAiAssetConfig>} config
 * @returns {WalkRoutesResult}
 */
export function walkRoutes(config) {
  /** @type {RouteCandidate[]} */
  const candidates = [];
  /** @type {string[]} */
  const warnings = [];

  function walk(currentAbsPath, segments) {
    if (!fs.existsSync(currentAbsPath)) return;

    const entries = safeReadDir(currentAbsPath);
    if (entries.length === 0) return;

    const pageFiles = entries
      .filter((entry) => entry.isFile() && PAGE_FILE_RE.test(entry.name))
      .map((entry) => entry.name);

    // Touch special files only to document intent: they are ignored for routing.
    void entries.filter(
      (entry) => entry.isFile() && SPECIAL_FILE_RE.test(entry.name)
    );

    if (pageFiles.length > 0) {
      const route = normalizeRoute(`/${segments.join("/")}`);
      const pickedPageFile = pickPageFile(pageFiles);

      if (pageFiles.length > 1 && pickedPageFile) {
        warnings.push(
          `⚠ Multiple page files for "${route}": ${pageFiles.join(
            ", "
          )}. Using "${pickedPageFile}".`
        );
      }

      if (pickedPageFile) {
        const fileAbsPath = path.join(currentAbsPath, pickedPageFile);
        candidates.push({
          route,
          fileAbsPath,
          fileName: pickedPageFile,
          sourceRel: path.relative(config.rootDir, fileAbsPath),
        });
      }
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const rawSegment = entry.name;
      if (shouldSkipDir(rawSegment, config)) continue;

      if (isRouteGroup(rawSegment)) {
        walk(path.join(currentAbsPath, rawSegment), segments);
        continue;
      }

      const cleanedSegment = stripInterceptingPrefixFromSegment(rawSegment);
      walk(path.join(currentAbsPath, rawSegment), [...segments, cleanedSegment]);
    }
  }

  walk(config.appDir, []);

  candidates.sort((a, b) => {
    if (a.route !== b.route) return a.route.localeCompare(b.route);
    return a.fileName.localeCompare(b.fileName);
  });

  return { candidates, warnings };
}