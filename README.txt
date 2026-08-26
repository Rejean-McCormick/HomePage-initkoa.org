initkoa context-pack / llms.txt fix

Files to replace in the HomePage repo:
- tools/context_pack_builder.pyw
- scripts/ai-assets/constants.mjs
- scripts/ai-assets/generators/index.mjs

Behavior:
- stops generating initkoa-docs-context-pack.txt from C:\mycode\HomePage\docs-initkoa-org
- deletes that retired pack before rebuilding the manifest (Build or Sync)
- makes llms.txt discover context packs from public/context-packs/index.json
- falls back to scanning public/context-packs/*.txt if the manifest is unavailable

After replacement, run the builder's "Build All + Sync" and let the site rebuild.
