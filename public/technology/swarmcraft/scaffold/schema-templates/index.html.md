# Schema Templates

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-templates
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-templates/index.html.md
> Route: /technology/swarmcraft/scaffold/schema-templates
> Source: app\technology\swarmcraft\scaffold\schema-templates\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/schema-templates)

# Schema Templates

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

Templates define the **shape and pacing rules** of the Story Scaffold.

A template file lives at:

- `data/story_bible/templates/<template_id>.json`

It defines:
- thread set (grid rows)
- cadence rules (what must be filled, how often)
- optional style/genre constraints used in prompt hydration

Story scaffold overview: **Story Scaffold (/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)**

## 1) Design Goals

Templates MUST support:
- user-chosen parts/chapter within allowed bounds
- different thread sets per template
- enforceable cadence (required beats per part or per chapter)
- stable projection into a grid and CSV

Templates SHOULD:
- remain small and readable for humans
- avoid storing story-specific content (that belongs in `outline.json`)

## 2) Minimal Template Schema (Recommended)

* `threads` defines the grid rows.
* `parts_per_chapter` defines defaults and bounds; users can override within bounds.
* `cadence` defines what the planner/editor should enforce.
* `prompting` provides reusable style constraints (optional).

## 3) Field Semantics

Stable identifier used by the project config and Story Bible.

Ordered list of thread names.

* Thread names must match outline beat keys (see Schema Outline).

Defines allowed splitting:

* `min`, `max`: permitted bounds for user override

Cadence is enforcement guidance for PLAN/REVIEW.

Recommended keys:

* `per_part_required_threads`: must be non-empty in every part (unless explicitly waived)
* `per_chapter_required_threads`: must appear at least once per chapter (rollup check)
* `soft_threads`: encouraged but optional
* `min_non_empty_cells_per_part`: guard against under-specified parts

Cadence is a rule set for scaffold completeness; it does not guarantee prose quality.

Reusable prompt constraints and references:

* reading level / audience
* tone and voice
* POV and tense
* references into Story Bible Markdown files

If present, prompt hydration can include these in every Part slice.

## 4) Template Variants (Examples)

Typical guidance:

* fewer threads
* tighter cadence (Plot + Emotion required every part)

Typical guidance:

* broader thread set
* encourages symbolism/worldbuilding but doesn’t require every part

Typical guidance:

* strict structure cadence (inciting incident, midpoint, etc.) via outline contract usage

## 5) Validation Rules (Recommended)

A validator SHOULD enforce:

* `threads` is non-empty and has unique strings
* cadence thread names must exist in `threads`
* version is present and numeric

## 6) Relationship to Outline and Grid

* Template defines the *thread rows* and pacing rules.
* Outline defines the *per-part cell content*.

* **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**
* **Outline Grid CSV Round-Trip (/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)**
* **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**
