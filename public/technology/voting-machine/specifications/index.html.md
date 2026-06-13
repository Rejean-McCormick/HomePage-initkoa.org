# /technology/voting-machine/specifications

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/voting-machine/specifications
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/voting-machine/specifications/index.html.md
> Route: /technology/voting-machine/specifications
> Source: app\technology\voting-machine\specifications\page.tsx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/voting-machine/specifications)

Back to VM-ENGINE Overview

Technical Specifications

The machine operates on a strict set of normative documents (Docs 1–7).
Below is the condensed engineering reference for the Data Model, Algorithm, and Pipeline.

1. Canonical Data Model

Inputs (Consumed)

DivisionRegistry: The stable universe of units and options . Defines the deterministic order_index for every option.

BallotTally: Votes per unit/option. Must referentially align with the Registry.

ParameterSet: The configuration map. Must explicitly set all Included VM-VARs (outcome-affecting variables).

Outputs (Produced)

Result: The canonical outcome. Contains allocations, aggregates, and the formula_id (FID).

RunRecord: The cryptographic audit trail. Contains input hashes, engine version, effective variables, and the TieLog .

FrontierMap (Optional): Per-unit diagnostics for the frontier gating model (if enabled).

2. Algorithmic Step Order

The engine must execute stages in this exact order to guarantee determinism.
Ordering of units is always by ascending unit_id .

3. Gates & Edge Cases

Before allocation, every unit must pass a series of Gates .
If any gate fails, the unit is marked Invalid , receives no allocation,
and the reason is recorded in the RunRecord .

Sanity Gates: Data plausibility (e.g., votes &le; ballots).

Eligibility Gates: Minimum turnout or share thresholds.

Validity Gates: Integrity floors (VM-VAR-031).

The "Invalid" State

There is no "provisional" allocation. A unit is either Valid or Invalid.

4. Pipeline Contracts

Exit Code 2
Validation Error

Input schema violation, referential integrity failure, or ordering precondition unmet.

Exit Code 3
Verification Failure

Post-run self-check failed. The computed hash of an artifact does not match its embedded ID.

Exit Code 5
Spec Violation

Internal determinism breach (e.g., RNG used when policy is not 'random').
