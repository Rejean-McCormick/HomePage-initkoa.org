# **POWERED BY GROK**

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts/index.html.md
> Route: /technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts
> Source: app\technology\swarmcraft\scaffold\story-scaffold-templates-outline-parts\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)

# Story Scaffold (Templates-Outline-Parts)

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

The **Story Scaffold** is SwarmCraft’s structured planning layer used to generate and maintain narrative coherence. It is designed as a **human-editable grid** and a **machine-usable schema**.

It combines:
- **Templates**: what threads exist and how they should be paced
- **Outline**: chapters → parts mapping + per-part beats + part contracts
- **Parts**: the atomic unit the engine drafts/revises

The Scaffold lives inside the Story Bible:
- `data/story_bible/templates/<template_id>.json`
- `data/story_bible/outline.json`

See: **Story Bible (/technology/swarmcraft/scaffold/story-bible-creative-intent)**

## 1) Why Parts Exist

SwarmCraft drafts and revises **one Part at a time**.

A Part is the atomic unit because it enables:
- stable, small prompt slices
- targeted regeneration (one slice)
- better continuity control
- precise status tracking in Matrix

Chapters are **rollups** over Parts.

- **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
- **Deterministic Pipeline (/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute)**

## 2) Threads (Narrative Lanes)

A template defines the thread set used to structure the story, e.g.:

- Plot
- Character Development
- Philosophy
- Conflict
- Themes
- World-Building
- Emotion
- Symbolism and Imagery
- Structure
- Relationships

Threads are not the final prose. They are **scaffolding lanes** the engine uses to plan and draft.

## 3) Templates: Thread Set + Cadence + Default Parts/Chapter

A **template** defines:
- the thread list (rows in the grid)
- cadence rules (which threads are required per part/chapter, and at what frequency)
- optional genre voice constraints

Schema: **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**

## 4) Outline: Chapters → Parts + Per-Part Beats + Part Contract

The **outline** is the canonical story plan for a project.

It defines:
- chapters and their ordered parts
- for each part:
- beats per thread (grid cells)
- a “part contract” (goal / obstacle / turn / outcome)
- optional locks (protect manual edits)

Schema: **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**

## 5) Grid View (Human Editing)

The UI projects the outline into a grid:

- Rows = Threads (Plot, Character Dev, etc.)
- Cells = the beat for that thread in that part

This is designed to be:
- quick to scan
- easy to edit manually
- compatible with CSV round-trip when needed

Round-trip spec: **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**

## 6) How the Scaffold Drives Writing

During execution, SwarmCraft hydrates prompts with **only the active Part slice**:

- that Part’s thread beats
- that Part’s contract
- minimal continuity (previous part outcome, relevant character/lore snippets)
- style constraints

This prevents the system from “re-summarizing the whole story” every time.

Details: **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**

## 7) Parts/Chapter: User-Configurable Splitting

Templates provide defaults, but the user can override:

- **Children / picture book:** typically `1 part = 1 chapter`
- **Complex long-form:** up to `6 parts/chapter` where needed

Important constraint:
- parts must have stable IDs; changing parts/chapter should preserve existing part IDs wherever possible, or explicitly create new parts with new IDs.

## 8) Orchestration Expectations (Recommended)

The engine SHOULD:
- treat empty cells as “no beat required” unless cadence says otherwise
- enforce cadence at plan-time (PLAN chooses what needs filling)
- use Editor to verify manuscript covers the contract + beats
- lock parts once stable to avoid regressions

## 9) How This Relates to Matrix

- **Outline** is creative intent.
- **Matrix** is runtime progress.

Matrix stores:
- status per Part (EMPTY/DRAFTING/REVIEW_READY/REVISION_NEEDED/LOCKED)
- manuscript paths and metrics
- active_task target

Matrix page: **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**

## 10) Related Pages

- **Story Bible (/technology/swarmcraft/scaffold/story-bible-creative-intent)**
- **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**
- **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**
- **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**
- **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**
- **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
