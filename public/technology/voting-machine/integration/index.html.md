# Standard invocation pattern

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/voting-machine/integration
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/voting-machine/integration/index.html.md
> Route: /technology/voting-machine/integration
> Source: app\technology\voting-machine\integration\page.tsx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/voting-machine/integration)

Back to VM-ENGINE Overview

Integration & Reporting

Treat the engine as a pure function. Invoke it via CLI, consume its canonical JSON outputs,
and render reports using read-only templates. Never re-compute allocations in the view layer.

1. The CLI Contract

●
●
●

# Standard invocation pattern

vm_cli \

--registry ./inputs/registry.json \

--tally ./inputs/tally.json \

--params ./inputs/params.json \

--out ./outputs/run_01

Exit Code 0
Success. All artifacts emitted and hashes verified.

Exit Code 2
Validation Error. Input schema or referential integrity failed.

Exit Code 3
Verification Failure. Post-run hash check mismatch (critical).

2. Reporting Rules (Doc 7)

The "Read-Only" Principle

The renderer consumes result.json and run_record.json .
It must not re-calculate shares, margins, or winners.
Visual logic is strictly separated from business logic.

Numeric Format: Percentages show one decimal (e.g., 54.5%). Round half up. No locale-specific separators in raw data.

Ordering: Allocation tables typically follow Registry order, not vote count, to preserve neutrality.

Presentation Toggles: Variables 060-062 control labels and language but do not affect the Formula ID (FID).

Report Footer Template

Formula ID: a3f9...8b21

Engine Version: v1.2.0

Algorithm Variant: v1 (Standard)

Tie Policy: random

RNG Seed: 424242 (Event count: 1)

*Required disclosure block on every official report page.

3. Independent Verification

Any third party can verify a run by re-executing the engine with the provided inputs.
Verification succeeds if the output hashes match exactly.

Formula ID (FID) Audit

The FID is a hash of the Normative Manifest (the algorithm rules + included variables).
It proves that the logic wasn't secretly tweaked for a specific run.

Included in FID
Thresholds, Frontier logic, Rounding rules, Tie Policy

Excluded from FID
Visual labels, Language settings, Report layout options
