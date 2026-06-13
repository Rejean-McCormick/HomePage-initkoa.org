# Schema Outline

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-outline
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-outline/index.html.md
> Route: /technology/swarmcraft/scaffold/schema-outline
> Source: app\technology\swarmcraft\scaffold\schema-outline\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-outline)

# Schema Outline

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

`outline.json` is the canonical **story plan** for a project. It defines:

- chapter ordering
- chapter → parts mapping
- per-part thread beats (grid cells)
- per-part contract (goal / obstacle / turn / outcome)
- locks to protect manual edits

File location:
- `data/story_bible/outline.json`

Story scaffold overview: **Story Scaffold (/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)**

## 1) Design Goals

The outline MUST support:
- user-chosen parts/chapter (within template bounds)
- stable part IDs (critical for tracking and CSV round-trip)
- different template thread sets
- per-part beat editing in a grid UI
- per-part contract strictness for slice-by-slice drafting
- lock scopes (beats / contract / manuscript)

The outline SHOULD:
- be readable to humans
- be resilient to partial data (empty beats allowed)
- be forward-compatible (versioned)

## 2) Minimal Outline Schema (Recommended)

* `chapters[]` defines the ordered reading structure.
* `parts{}` is the canonical per-part content.
* `beats` keys should match template threads.

## 3) Field Semantics

Schema version for migration and validation.

Must match an existing template file in:

Template schema: **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**

### 3.3 `settings.parts_per_chapter` (recommended)

User override of parts/chapter within template bounds.

Ordered list of chapters.

Each chapter SHOULD contain:

* optional `summary`
* `part_ids` ordered list (critical)

Map of Part IDs to Part objects.

Each Part MUST contain:

* `chapter_id` (must match one chapter)
* `order_index` (global or chapter-local; implementation choice)
* `contract` object (recommended)

## 4) Part Contract (Strict Slice Anchor)

The **contract** is the minimum “what must happen” spec for a Part.

Recommended fields:

The orchestrator uses the contract to:

* hydrate slice prompts
* give the Editor a rubric for validation

* **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**

## 5) Beat Keys and Template Compatibility

Beat keys MUST align with the active template’s threads.

Validation SHOULD ensure:

* every `beats` key exists in `template.threads`
* missing keys are treated as empty when projecting to grid/CSV
* extra keys are flagged (or preserved if you support custom threads)

## 6) Locks (Manual Edit Protection)

Locks prevent automation from overwriting human edits.

Recommended lock scopes:

* `beats`: prevents automated changes to beats
* `contract`: prevents automated changes to contract
* `manuscript`: prevents automated changes to prose file

Planner rule:

* PLAN MUST NOT select a part for an action that violates locks.

Matrix mapping:

* locked parts should appear as `LOCKED` (or `locked=true`) in Matrix.

Matrix: **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**

## 7) ID Stability Rules (Critical)

* `chapter_id` and `part_id` MUST be stable once created.
* Grid and CSV round-trip depend on stable `part_id`.
* Changing parts/chapter SHOULD preserve existing part IDs where possible.
* New splits SHOULD create new part IDs instead of renaming existing parts.

## 8) Relationship to Grid and CSV

The outline is projected into a grid for human editing:

* rows = template threads
* columns = parts (ordered by chapters / part_ids)
* cells = outline.parts[part_id].beats[thread_name]

Round-trip rules:

See: **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**

## 9) Relationship to Manuscripts and Matrix

* Outline defines intent (beats + contract).
* Manuscripts contain prose generated for each Part.
* Matrix tracks runtime status and file metrics.

* **Story Bible (/technology/swarmcraft/scaffold/story-bible-creative-intent)**
* **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
* **Deterministic Pipeline (/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute)**
