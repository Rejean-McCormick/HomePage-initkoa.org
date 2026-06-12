---
docSet: "reading-db-upgrade"
docStatus: "draft"
project: "initkOA"
repo: "HomePage"
canonicalTermsVersion: "2026-05-25"
title: "99 — AI Drift Guardrails"
description: "Canonical guardrails that prevent AI-assisted branches from redefining the Reading DB upgrade architecture."
docPath: "docs/reading-db-upgrade/99-ai-drift-guardrails.md"
dependsOn: []
relatedDocs:
  - "docs/reading-db-upgrade/00-overview.md"
  - "docs/reading-db-upgrade/01-data-model.md"
  - "docs/reading-db-upgrade/02-import-pipeline.md"
  - "docs/reading-db-upgrade/03-nextjs-reading-ui.md"
  - "docs/reading-db-upgrade/04-ai-accessibility.md"
---

# 99 — AI Drift Guardrails

## Purpose

This document prevents drift across parallel AI-assisted branches and conversations.

It defines the canonical decisions that must remain stable unless explicitly changed by a human maintainer.

The goal is to avoid situations where different AI branches redefine:

- routes;
- database ownership;
- source-of-truth rules;
- terminology;
- import behavior;
- AI accessibility policy;
- `/play` versus `/reading` responsibilities.

This document is the guardrail layer for the `reading-db-upgrade` documentation set.

---

# Authority

This document is authoritative for consistency.

If another document conflicts with this one, use this document as the default source of truth until a human maintainer updates the decision explicitly.

Related docs may add implementation detail, but they should not redefine the decisions below.

---

# Canonical Project Model

```txt
/play    = resource catalog
/reading = full-text document library
```

The upgrade does not replace `/play`.

The upgrade adds `/reading` as a new DB-backed reading system.

---

# Canonical Source of Truth

```txt
Supabase Postgres = central source of truth for readable documents
```

The central DB owns:

```txt
documents
document_topics
document_versions
document_chunks
document_assets
import_runs
import_items
```

The DB, not Markdown files in the repo, is the source of truth for published readable documents.

Markdown, HTML, RSS, PDF, and manual entries are import sources.

---

# Canonical Entity Definitions

## Resource

A resource is a catalog/link item.

Resources belong primarily to:

```txt
/play
```

A resource may point to:

```txt
external URL
video
podcast
book
GitHub page
Medium article
internal reading document
```

A resource is not necessarily full-text readable inside initkOA.

## Document

A document is a full-text readable entity stored in the central DB.

Documents belong primarily to:

```txt
/reading
```

A document must be renderable as a full page from the DB.

## Source

A source identifies the origin or import channel of a document.

Allowed initial values:

```txt
medium
markdown
pdf
manual
imported_html
```

Source is not a topic.

## Topic

A topic describes what a document is about.

Topics use:

```txt
snake_case
```

Good examples:

```txt
governance
semantic_systems
knowledge_infrastructure
data_sovereignty
social_cohesion
```

Avoid as topics:

```txt
medium_article
pdf
markdown
```

Those belong in:

```txt
documents.source
documents.metadata
/play resource type
```

Rule:

```txt
source = where it came from
topic  = what it is about
type   = resource/document classification when needed
```

---

# Canonical Routes

## Public reading routes

```txt
/reading
/reading/[slug]
/reading/source/[source]
/reading/topic/[topic]
```

## Canonical document route

```txt
/reading/[slug]
```

This is the stable internal route for a document.

Do not make source-scoped routes canonical.

Do not use this as the canonical document route:

```txt
/reading/source/[source]/[slug]
```

Source and topic routes are filter/index routes only.

Examples:

```txt
/reading/source/medium
/reading/topic/governance
```

---

# Slug Rules

Slugs are globally unique.

Use:

```txt
lowercase
kebab-case
stable after publication
unique globally
short hash on collision
```

Examples:

```txt
cartographer-of-ideas
cartographer-of-ideas-d362d695
```

Do not scope slugs by source.

Reason:

- simpler URLs;
- easier sharing;
- cleaner AI references;
- one unified reading library.

---

# Canonical URL Policy

`canonical_url` means the original external source URL.

Example:

```txt
https://medium.com/@boatbuilder610/cartographer-of-ideas-d362d695273a
```

`internal_path` means the initkOA reading route.

Example:

```txt
/reading/cartographer-of-ideas
```

Never confuse the two.

For imported Medium articles:

```txt
source = medium
canonical_url = original Medium URL
internal_path = /reading/[slug]
```

The internal route is the readable initkOA copy.

The canonical URL preserves source traceability and attribution.

SEO canonical behavior may vary by source, but the data-model meaning remains stable:

```txt
canonical_url = original external source
internal_path = initkOA reading route
```

---

# `/play` Integration Policy

`/play` remains a resource catalog.

When a full DB-backed reading copy exists, `/play` should prefer the internal reading URL.

Before Reading DB import:

```txt
/play item url = https://medium.com/...
```

After Reading DB import:

```txt
/play item url = /reading/cartographer-of-ideas
/play item canonicalUrl = https://medium.com/...
```

The original external URL must remain available through:

```txt
canonical_url
source_url
external_url
metadata
```

depending on the layer.

---

# Document Body Storage Policy

Published readable documents must be stored in DB fields:

```txt
documents.body_markdown
documents.body_text
```

`body_markdown` is the canonical readable source used for rendering.

`body_text` is normalized plain text for search, AI, chunks, and summaries.

Original source files should be tracked through:

```txt
document_assets
```

Examples:

```txt
source_md
source_html
source_pdf
image
attachment
other
```

Do not rely on local files as the only source for a published reading page.

The DB must be able to render:

```txt
/reading/[slug]
```

without needing the original local import file.

---

# Medium Import Policy

Medium imports may use:

```txt
Medium RSS
content/medium/source/*.html
```

Medium RSS is useful for discovery and recent metadata.

Local Medium HTML exports are useful for full historical content.

When imported into Reading DB:

```txt
source = medium
canonical_url = original Medium URL
body_markdown = normalized Markdown body
body_text = normalized plain text
asset_type = source_html for original export
```

Do not render raw Medium HTML directly as the primary document body.

Original HTML may be stored or referenced as an asset for auditability.

---

# Markdown Import Policy

Markdown files may be used as import sources.

The target is still the central DB.

Workflow:

```txt
content/reading-inbox/**/*.md
↓
import script
↓
documents
document_topics
document_assets
import_runs
import_items
```

Markdown files are not the long-term public source of truth unless explicitly designated.

---

# PDF Import Policy

PDF files are import sources and assets.

PDF imports must produce:

```txt
body_text = extracted plain text
body_markdown = normalized extracted text, required even if basic/plain
document_assets entry = original PDF
```

Reason:

```txt
documents.body_markdown is required
```

Do not create a public document that only points to a PDF without extracted readable text.

---

# Long Document Policy

Long documents remain one canonical public page in phase 1.

Use:

```txt
/reading/[slug]
```

Do not visually paginate by default.

Support long documents with:

```txt
table of contents
heading anchors
reading width
back-to-top
section navigation
server-rendered HTML
```

Use `document_chunks` for:

```txt
AI retrieval
search
summaries
embeddings
internal navigation
```

Optional future route:

```txt
/reading/[slug]/section/[sectionSlug]
```

Only add section routes later for extremely long or deliberately structured documents.

---

# AI Accessibility Policy

The document body must be visible in server-rendered HTML.

Good:

```txt
Server component fetches document
↓
Markdown rendered to HTML on server
↓
HTML page contains full text
```

Avoid:

```txt
empty shell
client-side fetch
document body injected after hydration
```

Default AI artifact policy:

```txt
all published documents → discoverable through /reading and md-manifest.json
all published documents → summarized or described in ai-corpus.txt
selected high-value docs → optionally included in llms-full.txt
all long documents → chunked internally through document_chunks
```

The primary public full-text location is:

```txt
/reading/[slug]
```

Do not treat `ai-corpus.txt` as the main full-text archive.

---

# Visibility Policy

Only published documents are public.

```txt
draft     = not public
published = public
archived  = retained but hidden by default
```

Public routes and AI artifacts should include only:

```txt
status = published
```

Draft and archived documents may be visible in future admin tools, but not in public reading pages or public AI artifacts by default.

---

# RLS and Security Policy

Supabase Row Level Security should be enabled.

Public anonymous users may read published documents only.

Service-role scripts may insert/update/delete.

Never expose this key to the browser:

```txt
SUPABASE_SERVICE_ROLE_KEY
```

Child table access must follow parent document visibility.

```txt
document_topics  → readable only when parent document is published
document_assets  → readable only when parent document is published and asset is public
document_chunks  → readable only when parent document is published and AI access allows it
```

---

# Search Policy

Phase 1:

```txt
Postgres full-text search
```

Search should cover:

```txt
title
description
body_text
author
source
topics
```

Topic search may use joins or a denormalized topic text field.

Phase 2:

```txt
hybrid search = full-text + metadata filters + pgvector chunks
```

Multilingual search should be documented explicitly.

Initial acceptable behavior:

```txt
default to simple or english search config
```

Future behavior:

```txt
language-aware search config by document language
```

---

# Vector Search Policy

Vector search is not required for phase 1.

Do not make embeddings a blocker for:

```txt
documents table
/reading
/reading/[slug]
Medium import
Markdown import
basic search
```

Vector search belongs to a later phase.

When added, embeddings belong primarily to:

```txt
document_chunks
```

not the root `documents` table.

---

# Import Observability Policy

All non-trivial imports should create:

```txt
import_runs
import_items
```

Track:

```txt
read_count
created_count
updated_count
skipped_count
error_count
status
source
importer
```

Import scripts should be auditable and repeatable.

Repeated imports should be idempotent when possible.

---

# Allowed AI Behavior

AI assistants may:

- add implementation detail that follows these guardrails;
- generate code from these decisions;
- add examples consistent with the route and DB model;
- propose phased implementation plans;
- identify contradictions;
- update docs to align terminology;
- add migration steps;
- refine SQL without changing core route/source-of-truth decisions.

---

# Disallowed AI Behavior

AI assistants must not independently:

- redefine `/play` as the full-text library;
- replace `/reading` with `/library` unless explicitly requested;
- make `/reading/source/[source]/[slug]` the canonical document route;
- make slugs source-scoped by default;
- treat Markdown files as the final public source of truth;
- remove Supabase Postgres as the selected DB without explicit approval;
- store only external links for documents that are supposed to be full-text readable;
- make document body client-only;
- put private/draft documents in public AI artifacts;
- use topic values to encode file format/source type;
- make vector search mandatory for phase 1;
- treat `ai-corpus.txt` as the primary full-text source.

---

# Conflict Resolution Rules

If two docs conflict, resolve in this order:

```txt
1. Human instruction in the current task
2. 99-ai-drift-guardrails.md
3. 00-overview.md
4. 01-data-model.md
5. 02-import-pipeline.md
6. 03-nextjs-reading-ui.md
7. 04-ai-accessibility.md
```

If a requested change contradicts this file, the AI should:

```txt
state the contradiction
ask whether the guardrail should be updated
avoid silently changing the architecture
```

---

# Change Control

This file should change rarely.

Valid reasons to update it:

- human maintainer changes the architecture;
- selected DB/provider changes;
- route model changes;
- source-of-truth model changes;
- visibility/security policy changes;
- AI artifact strategy changes.

Minor implementation details should usually go into the phase docs instead.

---

# Canonical Decision Summary

```txt
/play = resource catalog
/reading = full-text document library
Supabase Postgres = central source of truth
documents = readable full-text DB entities
resources = catalog/link entities
/reading/[slug] = canonical internal document route
/reading/source/[source] = filter/index route only
/reading/topic/[topic] = filter/index route only
slugs = globally unique
canonical_url = original external source URL
internal_path = initkOA reading route
body_markdown + body_text = stored in Postgres
original files = document_assets
topics = subject matter only, snake_case
source = origin/import channel
published documents = public
draft/archived documents = not public by default
document body = server-rendered
AI artifacts = discovery/summaries first
full text = /reading/[slug]
document_chunks = internal AI/search retrieval layer
vector search = future phase
```

---

# Acceptance Criteria

The documentation set is aligned when:

```txt
all docs use /reading/[slug] as the canonical document route
all docs distinguish /play from /reading
all docs treat Supabase Postgres as the document source of truth
all docs preserve canonical_url as the original external source
all docs use topics for subject matter only
all docs keep full text in DB-rendered reading pages
all docs treat AI artifacts as discovery/summaries-first
all docs keep vector search as a future phase
```
