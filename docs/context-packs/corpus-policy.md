# Context Pack Corpus Policy

## Purpose

Context Packs are public, machine-readable reference bundles. This policy defines which Markdown files may enter a public pack and how the builder must record corpus quality.

The authoritative executable policy is:

```txt
tools/context_pack_policy.json
```

This document explains that policy. The JSON file controls the builder and validator.

## Public corpus contract

A public Context Pack must be reproducible from committed source material and must not silently mix current canonical material with backups, drafts, proposals, diagnostics, or historical snapshots.

Default rules:

```txt
source selection        = committed Markdown only
working tree Markdown   = clean before public build
exact duplicates        = removed by SHA-256 of normalized file content
canonical               = included
reference               = included unless a repository rule marks it on-demand
proposal                = excluded from the public pack by default
historical              = excluded from the public pack by default
plain non-Git wiki      = ignored for public builds
```

## Authority classes

`canonical`
: Current normative or primary documentation for the repository.

`reference`
: Supporting material that is useful for interpretation but is not itself the primary normative description.

`proposal`
: Planned, TODO, migration, design-option, or future-state material. It must not be presented as current behavior.

`historical`
: Archives, backups, deployment snapshots, replaced versions, diagnostics, and other material retained for history rather than current authority.

Repository rules may classify a path and independently decide whether that path is included in the public pack.

## Selection order

For each repository and its Git-backed wiki, the builder must:

1. refuse a public build when tracked or untracked Markdown changes make the source working tree dirty;
2. enumerate committed Markdown files only;
3. apply global exclusion rules;
4. apply repository-specific classification/include rules;
5. normalize file text to UTF-8/LF;
6. remove exact duplicate content using SHA-256, keeping the first deterministic path;
7. build the pack from the remaining files;
8. record corpus metrics and the policy version in the pack header and manifest.

Untracked Markdown is never included in a public Context Pack. A dirty working tree is still treated as an error because it means the local source state and the committed source state differ.

## Wikis

A GitHub wiki may be folded into its repository Context Pack under the stable `wiki/` prefix when the local wiki directory is a Git repository.

A plain local wiki directory has no commit identity and therefore is not included in a public build. It may be used by other local tooling, but it is not a public Context Pack source.

## Exact deduplication

Deduplication is content-based, not filename-based.

The builder hashes each normalized Markdown file. When two files have identical content, only the first file in deterministic path order is included. The duplicate count is recorded.

Deduplication does not attempt semantic similarity. Near-duplicates require an explicit policy or source-repository cleanup.

## Required metrics

Every generated Context Pack and `public/context-packs/index.json` must expose enough information to audit the corpus:

```txt
policyVersion
sourceFileCount
includedFileCount
excludedFileCount
duplicateFileCount
contentBytes
authorityCounts
```

The manifest also records the final pack SHA-256.

## Size policy

The executable policy defines:

```txt
warningBytes
maxBytes
```

Crossing `warningBytes` produces a builder/validator warning. Crossing `maxBytes` is a validation failure and blocks publication.

Size limits are safety bounds, not a substitute for corpus curation.

## Repository-specific rules

Repository-specific rules belong in `tools/context_pack_policy.json`, not in ad-hoc Python branches.

Examples currently covered include:

```txt
Konnaxion      .kx_deploy_backups/**                         -> historical, excluded
kOA-Linux      _pipeline-plan-diag_*/**                      -> historical, excluded
Kristal Farms  archive/**                                    -> historical, excluded
Orgo           Architecture upgrade(to do)/**                -> proposal, excluded
UCKK Moodle    string_inventory/**                           -> reference/on-demand, excluded
```

The policy file should be updated when a repository introduces a new stable archival, generated, backup, proposal, or on-demand path convention.

## Legacy general packs

Two currently published general-purpose packs are produced by older external pipelines rather than `context_pack_builder.pyw`:

```txt
grammatical-framework-context-pack--rgl-router-and-reference--v1.0.txt
senior-architect-context-pack--systems-patterns-and-resilience--v1.0.txt
```

They are listed explicitly in `legacyExemptFiles` in the executable policy. The site validator still verifies their presence, manifest SHA-256, sitemap membership, and size bound, but does not require builder-specific corpus headers or FILE-section format from them.

This exemption must remain explicit and narrow. Any new general pack should use the current corpus contract, and these two should be migrated if their source pipelines are brought under the Context Pack builder.

## Generated files

These are generated outputs and must not be manually edited:

```txt
public/context-packs/*.txt
public/context-packs/index.json
public/context-packs/sitemap.xml
```

The builder owns them. The validator verifies them before the site build.

## Publication invariant

A Context Pack may be published only when:

```txt
policy is present and valid
source Markdown state is declared clean
pack policyVersion matches the active policy
manifest and files agree
sitemap and manifest agree
no forbidden path is included
no exact duplicate remains
pack size is within the configured maximum
```

If these conditions cannot be verified, publication must fail closed.
