INITKOA Context Pack pipeline

Primary AI entrypoint:
- /llms.txt

Context Pack source of truth:
- tools/context_pack_policy.json        corpus selection/classification policy
- public/context-packs/index.json       generated authoritative catalog
- public/context-packs/sitemap.xml      generated crawler discovery surface

Builder:
- tools/context_pack_builder.pyw

Corpus policy documentation:
- docs/context-packs/corpus-policy.md

Build guard:
- scripts/validate-context-packs.mjs
- npm run context-packs:validate

Public build behavior:
- committed Markdown only
- clean Markdown working trees required
- policy exclusions/classification applied before packaging
- exact duplicate Markdown removed by SHA-256
- corpus metrics and policyVersion written into each pack and index.json
- index.json and sitemap.xml generated from the published pack set
- /llms.txt discovers Context Packs from index.json only
- historical public Context Pack URLs redirect permanently to stable URLs
- two legacy general packs are explicitly exempt from builder-format checks until migrated

Generated outputs (never edit manually):
- public/context-packs/*.txt
- public/context-packs/index.json
- public/context-packs/sitemap.xml
- public/llms.txt

Workflow:
1. Update tools/context_pack_policy.json when corpus rules change.
2. Ensure Markdown working trees are clean.
3. Run the builder's Build All (or Build All + Sync).
4. Run npm run context-packs:validate.
5. Commit/push the site code changes and generated Context Pack outputs.
6. Vercel runs the validator before generating AI assets and building Next.js.
