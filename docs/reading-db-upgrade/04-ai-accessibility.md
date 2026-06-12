---
docSet: "reading-db-upgrade"
docStatus: "draft"
project: "initkOA"
canonicalTermsVersion: "2026-05-25"
title: "AI Accessibility"
description: "How the Reading DB upgrade makes full-text documents accessible to AI systems, search engines, and internal corpus tooling."
docPath: "docs/reading-db-upgrade/04-ai-accessibility.md"
dependsOn:
  - "docs/reading-db-upgrade/00-overview.md"
  - "docs/reading-db-upgrade/01-data-model.md"
  - "docs/reading-db-upgrade/02-import-pipeline.md"
  - "docs/reading-db-upgrade/03-nextjs-reading-ui.md"
relatedDocs:
  - "docs/reading-db-upgrade/00-overview.md"
  - "docs/reading-db-upgrade/01-data-model.md"
  - "docs/reading-db-upgrade/02-import-pipeline.md"
  - "docs/reading-db-upgrade/03-nextjs-reading-ui.md"
---

# AI Accessibility

## Purpose

The Reading DB upgrade must make initkOA’s full-text documents accessible to:

- human readers;
- search engines;
- AI crawlers;
- internal AI tooling;
- future semantic search and retrieval systems.

The current `/play` section is a resource catalog. It can list Medium articles, books, videos, podcasts, and external links, but it does not provide full-text document access.

The new `/reading` section is the canonical full-text document library.

```txt
/play    = resource catalog
/reading = full-text document library
```

## Core rule

Published documents must be rendered as server-accessible HTML pages.

A document should not require client-side JavaScript to become readable.

```txt
Good:
/reading/cartographer-of-ideas
→ server-rendered HTML with full document text

Bad:
/reading/cartographer-of-ideas
→ empty shell
→ client-side fetch
→ text appears only after React hydration
```

## Target routes

```txt
/reading
/reading/[slug]
/reading/source/[source]
/reading/topic/[topic]
```

The most important route is:

```txt
/reading/[slug]
```

Each published document must have one stable internal URL.

## Source of truth

The source of truth is Supabase Postgres.

Primary table:

```txt
documents
```

Supporting tables:

```txt
document_topics
document_versions
document_chunks
document_assets
import_runs
import_items
```

The `documents` table stores the public document body:

```txt
title
slug
description
body_markdown
body_text
source
canonical_url
language
status
published_at
created_at
updated_at
```

Only documents with:

```txt
status = "published"
```

should be publicly visible.

## Canonical document model

A published document has one canonical internal reading route:

```txt
/reading/[slug]
```

In the database, this is represented as:

```txt
internal_path = /reading/{slug}
```

If the document was imported from an external source, the original source URL is preserved separately:

```txt
canonical_url = original external source, if applicable
```

For Medium imports:

```txt
source = medium
canonical_url = https://medium.com/...
internal_path = /reading/{slug}
```

The internal initkOA page is the readable copy.

The `canonical_url` field preserves attribution and source traceability. It does not replace the internal reading route.

SEO canonical policy may vary by source:

```txt
original initkOA documents → canonical page is /reading/[slug]
copied Medium documents   → canonical_url may be used as rel=canonical if duplicate-content policy requires it
```

For AI accessibility, the stable internal route remains:

```txt
/reading/[slug]
```

## AI visibility requirements

A document is AI-accessible when all of the following are true:

1. The document has `status = "published"`.
2. The document has a stable `slug`.
3. The route `/reading/[slug]` renders the full text server-side.
4. The document body is visible in the initial HTML response.
5. The document is discoverable from `/reading`.
6. The document is eventually referenced by AI discovery artifacts.

## AI discovery artifacts

The site should continue to expose or generate:

```txt
/llms.txt
/ai-corpus.txt
/llms-full.txt
/md-manifest.json
/md-sitemap.xml
```

The Reading DB upgrade should eventually expose `/reading` documents through those artifacts, but artifacts should not become the primary full-text store.

Default behavior:

```txt
/llms.txt
→ points AI systems to the reading library, manifest, and corpus files

/ai-corpus.txt
→ includes discovery records and summaries for published reading documents

/llms-full.txt
→ may include curated full-text documents when size limits allow

/md-manifest.json
→ indexes published reading routes and metadata

/md-sitemap.xml
→ exposes markdown/document mirrors if implemented
```

Primary full-text access should remain the individual document page:

```txt
/reading/[slug]
```

The default AI artifact policy is:

```txt
all published documents → discoverable through /reading and md-manifest.json
all published documents → summarized or described in ai-corpus.txt
selected high-value docs → optionally included in llms-full.txt
all long documents → chunked internally through document_chunks
```

## Public vs private content

Only public documents should be exposed to AI systems.

```txt
draft     = not public, not in AI artifacts
published = public, included in /reading and AI artifacts
archived  = retained but hidden from normal browsing
```

Rules:

* `draft` documents must not appear in `/reading`.
* `draft` documents must not appear in `ai-corpus.txt`.
* `archived` documents may remain accessible only if explicitly allowed.
* private source files must not be exposed through public routes.

## Rendering rule

The document page should load the document server-side from Postgres.

Example target behavior:

```tsx
// app/reading/[slug]/page.tsx

export default async function ReadingDocumentPage({ params }) {
  const document = await getPublishedDocumentBySlug(params.slug);

  if (!document) {
    notFound();
  }

  return (
    <article>
      <h1>{document.title}</h1>
      <DocumentBody markdown={document.body_markdown} />
    </article>
  );
}
```

The rendered HTML must contain the readable text.

## Metadata rule

Each document page should expose metadata:

```txt
title
description
canonical URL
published date
author
language
source
topics
```

Expected metadata behavior:

```txt
<title>{document.title} | initkOA Reading</title>
<meta name="description" content="{document.description}" />
```

Canonical/source policy:

* The internal `/reading/[slug]` page is the stable initkOA reading route.
* The original Medium or external source remains stored as `canonical_url`.
* A visible "Original source" link should use `canonical_url` when present.
* The SEO `<link rel="canonical">` may point to either the internal route or the external `canonical_url`, depending on source-specific duplicate-content policy.

Topic policy:

```txt
topics use snake_case subject keys
topics describe what the document is about
topics do not describe file format or source type
```

Good topic examples:

```txt
governance
semantic_systems
knowledge_infrastructure
data_sovereignty
social_cohesion
```

Avoid topic examples:

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

## Chunking for AI

Long documents should be split into chunks for AI and search workflows.

Table:

```txt
document_chunks
```

Recommended fields:

```txt
id
document_id
chunk_index
heading_path
content
content_tokens
embedding
created_at
updated_at
```

Initial phase:

```txt
document_chunks.content = plain text chunk
embedding = null
```

Future phase:

```txt
embedding = pgvector embedding
```

Chunking should preserve document order.

Suggested chunk size:

```txt
800 to 1,500 words
```

Hard requirements:

* chunks must reference `document_id`;
* chunks must preserve `chunk_index`;
* chunks must be regenerated when `body_markdown` changes;
* chunks must not exist for unpublished private documents unless access controls are implemented.

## Search phases

### Phase 1 — Postgres full-text search

Search over:

```txt
title
description
body_text
topics
source
author
```

### Phase 2 — Chunk search

Search over:

```txt
document_chunks.content
```

### Phase 3 — Semantic search

Use `pgvector` embeddings on:

```txt
document_chunks.embedding
```

### Phase 4 — Hybrid search

Combine:

```txt
metadata filters
full-text search
vector similarity
document status
source
language
topics
```

## Relationship with `/play`

`/play` remains a resource catalog.

Medium articles and other resources may still appear in `/play`, but if a readable internal copy exists, the preferred URL should become:

```txt
/reading/[slug]
```

The original external link should remain available as:

```txt
canonical_url
source_url
external_url
```

Recommended behavior:

```txt
/play item click
→ /reading/[slug]

reading page
→ includes "Original source" link to Medium or the external source
```

## AI corpus inclusion policy

Not every document must be included in every AI artifact.

Recommended levels:

```txt
Level 1: discoverable
- included in /reading
- included in md-manifest.json

Level 2: summarized
- title, description, topics, source, language, and /reading/[slug] URL included in ai-corpus.txt

Level 3: full-text page
- complete body is available at the individual /reading/[slug] page

Level 4: curated full-text artifact
- selected body_text or body_markdown included in llms-full.txt when size limits allow

Level 5: chunked
- document_chunks available for retrieval/search
```

Default policy:

```txt
published documents = Level 2 + Level 3
high-value documents = optional Level 4
all long documents = Level 5 internally
```

Do not treat `ai-corpus.txt` as the main full-text archive.

The full-text source of truth for public reading should remain:

```txt
/reading/[slug]
```

## Size limits

Documents may be 1 to 100 pages.

The system must avoid building one massive page or one massive AI corpus file.

Rules:

* `/reading` index should include metadata only.
* `/reading/[slug]` should include one full document.
* `ai-corpus.txt` should default to discovery records and summaries.
* `llms-full.txt` may include selected full texts, but should remain curated and manageable.
* Long documents should be chunked internally.

## Import pipeline requirements

The import pipeline must produce:

```txt
body_markdown
body_text
description
slug
source
canonical_url
status
topics
```

For Medium:

```txt
source = medium
canonical_url = original Medium URL
body_markdown = converted article body
body_text = plain text body
```

For Markdown:

```txt
source = markdown
body_markdown = original markdown
body_text = markdown stripped to text
```

For PDF:

```txt
source = pdf
body_text = extracted text
body_markdown = normalized extracted text, required even if basic/plain
asset = original PDF
```

PDF imports must always generate `body_markdown` because the `documents` table requires it.

## Access control

Initial phase:

```txt
all published documents are public
all draft documents are private by omission
```

Future phase:

```txt
visibility = public | unlisted | private
```

Child table AI/public access must follow the parent document.

```txt
document_topics  → readable only when parent document is published
document_assets  → readable only when parent document is published and asset is public
document_chunks  → readable only when parent document is published and AI access allows it
```

Service-role imports may write all tables server-side.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

Possible future fields:

```txt
visibility
access_group
is_ai_accessible
is_search_indexed
```

## Robots and indexing

Default:

```txt
published documents are indexable
draft documents are not routed
archived documents are hidden unless explicitly exposed
```

Future per-document controls:

```txt
robots: index | noindex
aiAccess: allowed | disallowed | summary-only
```

## Acceptance criteria

The AI accessibility upgrade is complete when:

* `/reading` lists published documents from the DB.
* `/reading/[slug]` renders full document text server-side.
* Medium articles copied into the DB are readable internally.
* `/play` can link to internal reading pages when a copy exists.
* Draft documents are not publicly visible.
* Published documents have stable slugs.
* Published documents expose title, description, source, language, and topics.
* `body_text` exists for search.
* `document_chunks` can be generated for long documents.
* AI discovery artifacts can reference published reading documents through metadata, summaries, and stable `/reading/[slug]` URLs.

## Non-goals for phase 1

Phase 1 does not require:

* semantic vector search;
* embeddings;
* private user accounts;
* full admin editing UI;
* PDF OCR;
* automatic summarization;
* multi-author permissions;
* paid access control.

These can be added later.

## Phase plan

### Phase 1 — Public readable documents

```txt
documents table
/reading
/reading/[slug]
server-rendered Markdown
published-only visibility
```

### Phase 2 — Imports

```txt
Medium HTML → documents
Markdown files → documents
existing catalog links → internal reading links
```

### Phase 3 — AI artifacts

```txt
reading document metadata in md-manifest.json
reading summaries/discovery records in ai-corpus.txt
selected full texts in llms-full.txt
full text remains primarily available at /reading/[slug]
```

### Phase 4 — Search

```txt
Postgres full-text search
topic/source/language filters
```

### Phase 5 — Chunks and embeddings

```txt
document_chunks
pgvector embeddings
hybrid search
retrieval API
```

## Guiding principle

The Reading DB upgrade should make initkOA’s knowledge base readable at three levels:

```txt
human-readable page
machine-readable metadata
AI-readable corpus/chunks
```

The central rule remains:

```txt
If a document is important enough to preserve, it should have a stable /reading/[slug] page with server-rendered full text.
```
