# **POWERED BY GROK**

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/core/central-matrix-runtime-state
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/core/central-matrix-runtime-state/index.html.md
> Route: /technology/swarmcraft/core/central-matrix-runtime-state
> Source: app\technology\swarmcraft\core\central-matrix-runtime-state\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/core/central-matrix-runtime-state)

# Story Bible (Creative Intent)

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

The **Story Bible** is SwarmCraft’s home for **creative intent**: the canonical narrative plan, constraints, and reference material that guide drafting and revision.

It is designed to be:
- **explicit** (no hidden “chat history” requirements)
- **versionable** (text/JSON files under source control)
- **sliceable** (only the relevant subset is injected into prompts)
- **human-editable** (writers can edit directly or through UI)

The Story Bible is distinct from:
- **Matrix** (runtime progress state): **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
- **RAG memory** (retrieved continuity evidence): **RAG Memory System (/technology/swarmcraft/runtime/rag-memory-system)**

## 1) Location and Project Isolation

**Recommended per-project location:**
- `projects/<project_id>/data/story_bible/`

Single-project setups MAY use:
- `data/story_bible/`

The Story Bible is project-scoped. Each project has its own Bible and must not share it implicitly.

See: **Multi-Project Management (/technology/swarmcraft/runtime/multi-project-management)**

## 2) What Lives in the Story Bible

SwarmCraft treats the Story Bible as the canonical source for:

### 2.1 Canonical references
- Characters (bios, arcs, secrets, voice constraints)
- Locations (maps, rules, sensory signatures)
- Lore (history, factions, magic/tech rules)
- Style rules (tone, POV, reading level, taboo list)
- Constraints (hard rules the Editor enforces)

These may be stored in Markdown or JSON, depending on preference and tooling.

### 2.2 The Story Scaffold (New)
The scaffold is part of the Story Bible because it is **creative intent**, not runtime state:

- **Templates:** `templates/<template_id>.json`
Defines threads (Plot, Character Development, etc.), cadence expectations, and default parts/chapter.

- **Outline:** `outline.json`
Defines chapters → parts mapping, per-part thread beats, and per-part “contract”.

Scaffold entry point:
- **Story Scaffold (/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)**

## 3) Recommended Folder Layout

This is a recommendation, not a constraint—projects may reorganize, but the engine must be able to find `outline.json` and the selected `templates/<template_id>.json`.

## 4) Bible vs Matrix vs Memory (Key Separation)

### Story Bible (Intent)

* “What the story *should be*.”
* Edited by humans and the Wizard.
* Used as authoritative instruction.

### Matrix (Runtime)

* “What the system has *done* and what is next.”
* Derived from disk and updated by tools.
* Tracks statuses and active tasks.

See: **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**

### RAG Memory (Evidence)

* “What has been *written before*.”
* Queried to prevent continuity drift.
* Does not define intent; it provides recall.

See: **RAG Memory System (/technology/swarmcraft/runtime/rag-memory-system)**

## 5) How the Bible Is Used in Prompts (Slice-by-Slice)

SwarmCraft never dumps the whole Story Bible into the LLM.

Instead, the orchestrator hydrates prompts by selecting only:

* the target Part’s beats + contract from the Outline
* the minimal character/location/lore references required for that Part
* applicable constraints (style/voice/safety rules)

This reduces repetition, keeps cost stable, and prevents “prompt sprawl.”

See: **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**

## 6) Editing Workflows

The Story Bible supports three editing modes:

1. **Wizard-generated scaffold**
A guided LLM workflow creates the first template selection + outline draft.

2. **Grid editing (human-friendly)**
Outline beats are displayed as a grid (threads × parts), with optional CSV round-trip.

3. **Direct file edits**
Writers can edit Markdown/JSON files directly, then SCAN reconciles changes.

Grid + CSV:

* **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**

## 7) Integrity Rules (Recommended)

The scanner/orchestrator SHOULD validate:

* the chosen template thread list matches the outline beats keys
* every Part referenced in outline has a stable `part_id`
* locks are honored (beats/contract/manuscript)
* no orphan manuscripts exist without a Part mapping (or they are flagged)

## 8) Related Pages

* **Story Scaffold (/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)**
* **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**
* **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**
* **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**
* **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
* **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**
