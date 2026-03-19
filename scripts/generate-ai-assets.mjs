// scripts/generate-ai-assets.mjs
import fs from "node:fs";
import { getAiAssetConfig } from "./ai-assets/config.mjs";
import { walkRoutes } from "./ai-assets/route-walker.mjs";
import { buildAiAssetState } from "./ai-assets/pipeline.mjs";
import { writeArtifacts } from "./ai-assets/write-artifacts.mjs";

function logConfig(config) {
  console.log("🤖 Generating AI assets...");
  console.log(`   🌐 BASE_URL: ${config.baseUrl}`);
  console.log(
    `   🚫 EXCLUDE_PREFIXES: ${config.excludePrefixes.join(", ") || "(none)"}`
  );
  console.log(`   🧩 INCLUDE_DYNAMIC_SEGMENTS: ${config.includeDynamicSegments}`);
  console.log(`   🧽 SKIP_CODELIKE_PAGES: ${config.skipCodeLikePages}`);
  console.log(`   🪞 GENERATE_MD_MIRRORS: ${config.generateMdMirrors}`);
  console.log(`   📚 GENERATE_LLMS_FULL: ${config.generateLlmsFull}`);
  console.log(`   🧬 FIX_MOJIBAKE: ${config.fixMojibake}`);
  console.log(`   📎 MAX_LLMS_PAGE_LINKS: ${config.maxLlmsPageLinks}`);
}

function ensureRequiredDirs(config) {
  if (!fs.existsSync(config.appDir)) {
    console.error(`❌ Missing app directory: ${config.appDir}`);
    process.exit(1);
  }

  fs.mkdirSync(config.publicDir, { recursive: true });
}

async function main() {
  const config = getAiAssetConfig();

  logConfig(config);
  ensureRequiredDirs(config);

  const { candidates, warnings: walkerWarnings } = walkRoutes(config);

  const state = buildAiAssetState({
    config,
    candidates,
    warnings: walkerWarnings,
  });

  for (const warning of state.warnings) {
    console.warn(warning);
  }

  const result = writeArtifacts(state);

  if (result.aiCorpusBytes > 0) {
    console.log(
      `   📄 Wrote: public/${config.artifactNames.aiCorpus} (${(
        result.aiCorpusBytes / 1024
      ).toFixed(2)} KB)`
    );
  }

  if (config.generateMdMirrors) {
    console.log(`   📄 Wrote markdown mirrors: ${result.markdownMirrorCount}`);
  }

  console.log(`   📄 Wrote: public/${config.artifactNames.llms}`);
  if (config.generateLlmsFull) {
    console.log(`   📄 Wrote: public/${config.artifactNames.llmsFull}`);
  }
  console.log(`   📄 Wrote: public/${config.artifactNames.aiSitemap}`);
  console.log(`   📄 Wrote: public/${config.artifactNames.mdManifest}`);
  console.log(`   📄 Wrote: public/${config.artifactNames.mdSitemap}`);
  console.log(`✅ Done. Pages included: ${state.pages.length}`);
}

main().catch((error) => {
  console.error("❌ Failed to generate AI assets.");
  console.error(error);
  process.exit(1);
});