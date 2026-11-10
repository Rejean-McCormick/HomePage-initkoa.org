# Public kOA target-architecture pages

**Owner:** HomePage-initkoa.org. **Status:** `TARGET_DESIGN` public reading interface, *not* a product integration or a deployment receipt.

Source metadata lives in `content/final-system/public-architecture.v1.json`, exported from the C0 owner by `scripts/export_public_architecture.py`. It contains 24 functional capabilities, 53 public owner roles, 26 design-only boundary endpoints and explicit design evidence classification. It must not include Windows roots, private source archives, test reports, personal details, source credentials or inferred production states.

- `/ecosystem/` displays a readable target-system overview.
- `/ecosystem/functional-chains/` lists the 24 bounded capabilities.
- `/ecosystem/functional-chains/FC-01` through `/FC-24` display the intended outcome and owner responsibilities.
- Global navigation exposes the new public pages without replacing existing initiatives/technology routes.

**Refresh:** after a reviewed change to the canonical target, copy only the generated public JSON and run `npm run architecture:validate`, then the existing site build/test suite. This action **does not** grant automatic public-site publication permission. Validate links, content and privacy, then deploy under the site's own owner workflow. The canonical architecture remains in the C0 repository and the substantive owner contracts remain in their products.

Do not call a chain **implemented** or **deployed** merely because it appears on this page. If a product becomes qualified for a real environment, keep its exact evidence under the owner/C0 maturity record; a separate public-safe projection can be reviewed and adopted later.
