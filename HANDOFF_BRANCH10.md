# HANDOFF — Branch 10: public HomePage application

**Role:** public, read-only explanation and navigation for the final-system design, never a source of canonical state. **Status:** STATIC_MANIFEST_VALIDATED, Next.js build not run.

## Input and output

- **Input:** `content/final-system/public-architecture.v1.json`, exact copy of C0 export.
- **Pages:** `/ecosystem`, `/ecosystem/functional-chains`, `/ecosystem/functional-chains/[id]` (24 generated FC-01..FC-24 routes).
- **UI:** added menu links in `components/Header.tsx` without changing existing public content sections.
- **Validator:** `node scripts/validate-final-system.mjs`, run by `npm run architecture:validate` and prepended to `npm run build`.

## Runtime and permission boundary

The JSON exposes public-safe names, owner roles and proposed boundaries only; it has no local checkout paths, source archives, private bytes, tests-as-pass flags or deployment claims. Pages are English and explicitly marked as target design. Publishing site content still requires editorial/rights review and a site-owner release.

## Blockers

No Node dependencies were present in the snapshot, so a full Next.js compile/build could not be run. Confirm `npm ci`, Next build, accessibility and route smoke tests in CI before deployment; confirm exact C0 source/ref and the portal's public URLs.
