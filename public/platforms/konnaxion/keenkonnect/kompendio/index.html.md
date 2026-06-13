# Where it fits

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/keenkonnect/kompendio
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/keenkonnect/kompendio/index.html.md
> Route: /platforms/konnaxion/keenkonnect/kompendio
> Source: app\platforms\konnaxion\keenkonnect\kompendio\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/platforms/konnaxion/keenkonnect/kompendio)

'A curated repertory of reference platforms + versioned builder charts, pinned to projects and preserved as reproducible packs.',

# Kompendio (keenKonnect)

**Kompendio is the builder reference layer:** a curated repertory of **reference platforms** plus **versioned reference charts**, connected to projects and preserved as reproducible artifacts.

It does **not** replace external tools or try to mirror the web. It makes reference sources **legible, comparable, and reusable** inside a build workflow.

## Where it fits

keenKonnect is the builder module of Konnaxion, with three parts:

- **Konstruct** — run the build (projects, tasks, coordination)
- **Stockage** — preserve the build (files, releases, bundles)
- **Kompendio** — **guide the build** (reference stack, charts, trust)

Kompendio is the part that answers: **“What should we rely on?”** and **“Can we justify it later?”**

## What Kompendio produces (what builders actually use)

### 1) Reference Platforms (directory)
A structured directory of reference-grade platforms (standards, catalogs, libraries, materials databases, tool ecosystems).

For each platform, Kompendio makes explicit:
- what it’s for (category)
- what it covers (domains/tags)
- how it plugs into real workflows (exports/formats/notes)
- how open/stable it is
- its trust state (**Draft / Reviewed / Trusted**)

### 2) Reference Charts (builder charts)
The high-leverage deliverable: **curated charts** that teams reuse during real work.

Charts are:
- sourced and review-gated
- versioned (v1, v2…) so builds stay reproducible
- easy to pin to projects (“use chart X, version Y”)

Examples (by type, not brand):
- materials comparisons
- tolerances / fasteners / fits
- BOM conventions and naming rules
- safety constraints and checklists
- process templates for specific contexts

### 3) Reference Stacks (context packs)
A “Reference Stack” is a curated set of platforms + chart versions for a specific build context.

- metal fabrication
- CNC build
- PCB + enclosure build
- timber build
- robotics build

You define the contexts; Kompendio standardizes the structure.

- selected platforms
- selected charts + versions
- evidence pointers / snapshots (when needed)
- a manifest for integrity checks

This is how you reuse a reference baseline across teams—and keep work reproducible offline or later.

## Integration modes (stay explicit, avoid crawling)

Every Kompendio entry uses one integration mode:

- **Link-only**
Store canonical entrypoints and notes. No data mirroring.
- **Evidence capture**
Store screenshots/docs links/exports that justify ratings and chart claims.
- **Artifact pinning**
Attach a platform/stack/chart version to a project; preserve artifacts in Stockage.
- **Connector (sidecar)**
Optional integration to an OSS system (inventory, docs, storage, search). Sidecar remains isolated.

This keeps Kompendio useful without turning it into a crawler or creating hidden legal/ToS risk.

## Trust model (simple, strict)

Kompendio uses a rule builders understand:

> **If it can’t be checked, it can’t be published as Trusted.**

So you separate:
- **Draft** — proposed
- **Reviewed** — checked
- **Trusted / Published** — safe to reuse

Disputes are normal: counter-evidence triggers re-review and may produce a new version of a chart or stack.

## v1 “Done” criteria (measurable)

Kompendio v1 is done when:
- you can add a reference platform with proper entrypoints and tags
- you can rate it with evidence (not vibes)
- you can publish a versioned chart (review-gated)
- a Konstruct project can pin a reference stack + chart versions
- Stockage preserves the charts/evidence used for the build

## Boundary with Kintsugi

- **Kintsugi** helps teams **execute and package** the build “under one roof.”
- **Kompendio** helps teams **anchor reference-grade sources** (platforms + charts) without mirroring them.

A project typically uses both:
- Kintsugi to run the work and produce release packs
- Kompendio to pin the references that justify decisions and keep builds reproducible

## Next
