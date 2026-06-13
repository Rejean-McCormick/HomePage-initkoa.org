# Outline Grid CSV Round-Trip

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/outline-grid-csv-round-trip
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/outline-grid-csv-round-trip/index.html.md
> Route: /technology/swarmcraft/scaffold/outline-grid-csv-round-trip
> Source: app\technology\swarmcraft\scaffold\outline-grid-csv-round-trip\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/scaffold/outline-grid-csv-round-trip)

# Outline Grid CSV Round-Trip

> **Architectural Lineage (Credits):**
> SwarmCraft is an **architectural fork and deep rewrite** of the multi-agent swarm engine created by **Mojomast (https://github.com/mojomast)** in **mojomast/swarmussy (https://github.com/mojomast/swarmussy)**.
> SwarmCraft’s deterministic “Architect-style” layering is also **derived from the meta-structure of Abstract Wiki Architect (AWA)**.
> Full details: **Credits & Lineage (/technology/swarmcraft/meta/credits-and-lineage)**

## **POWERED BY GROK**

SwarmCraft supports a **human-friendly grid editor** for the outline and a **CSV round-trip** workflow.

- Humans can edit the scaffold like a spreadsheet.
- Stable Part IDs preserve meaning across edits.

## 1) Grid Model

### 1.1 What the grid shows
- **Columns**: Parts (ordered by chapter then part order)
- **Rows**: Threads (from the active template)
- **Cells**: A thread beat for that Part

Source of truth:
- Threads come from `templates/<template_id>.json`
See: **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**
- Beats come from `outline.json`
See: **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**

- Part contract fields (goal/obstacle/turn/outcome)
These may be shown in a separate panel, side sheet, or a second table export format.
- Manuscripts (prose) are not in the outline grid.

## 2) Canonical Mapping: Outline → Grid

- ordered parts = `for each chapter in chapters[]: chapter.part_ids[]`

Cell mapping:

If the key is missing, treat it as empty when projecting:

## 3) CSV Export Format (Beats Grid)

### 3.1 Shape
- First column: thread name
- Remaining columns: `Part 1`, `Part 2`, … in display order
- Optional second header row: stable `part_id` values (recommended)

The beats-only CSV is a projection of the grid (threads × parts).

### 3.2 Recommended headers (two-row header)
Row 1 (human labels):
- column 1: empty or `Thread`

Row 2 (machine IDs):

This allows the CSV to remain stable even if “Part 3” is moved into a different chapter.

### 3.3 Example

## 4) CSV Import Rules (Beats Grid)

### 4.1 Primary key: part_id row

Import SHOULD use the `part_id` row as the canonical mapping.

* If present, `part_id` row MUST be used.
* If absent, importer MAY fall back to positional mapping (less safe).

### 4.2 Thread name matching

Rows are matched by thread name (first column).

* Exact match is recommended.
* Whitespace trimming is recommended.
* Unknown thread names:

* either reject with validation error, or

### 4.3 Lock compliance (required)

Importer MUST respect outline locks:

Recommended behavior:

* updated cells count
* skipped due to locks
* unknown threads
* unknown part_ids

## 5) Handling Template Changes (Thread Set Changes)

If the user changes template (or template version):

* The grid row set changes (threads list changes)
* The system SHOULD provide a migration layer:

* missing threads: create empty beats
* removed threads: preserve in outline as “orphaned” beats only if explicitly enabled, otherwise drop with confirmation

Recommended: do not silently delete beats.

## 6) Parts/Chapter Changes (Column Reflow)

If the user changes `parts_per_chapter`:

* Part IDs must remain stable.
* The UI may re-group columns under different chapters.

* do not rename existing part IDs when reflowing chapters
* generate new part IDs only when new parts are created

## 7) Optional: Contract CSV Export

Beats CSV is intentionally simple. If you want contract editing in CSV, use a second file:

`outline_contract.csv` (recommended)

## 8) Relationship to Writing and Orchestration

The grid is a scaffold. The engine uses it slice-by-slice:

* during PLAN to detect missing beats (cadence)
* during EXECUTE to inject only the active Part slice
* during REVIEW to validate manuscript coverage of beats + contract

* **Orchestration Slice-by-Slice Prompt Hydration (/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration)**
* **Deterministic Pipeline (/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute)**

## 9) Related Pages

* **Story Scaffold (/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts)**
* **Schema Templates (/technology/swarmcraft/scaffold/schema-templates)**
* **Schema Outline (/technology/swarmcraft/scaffold/schema-outline)**
* **Central Matrix (/technology/swarmcraft/core/central-matrix-runtime-state)**
