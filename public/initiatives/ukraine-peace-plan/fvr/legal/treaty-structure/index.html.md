# Treaty Structure & Annexes

> Canonical HTML: https://initkoa.org/initiatives/ukraine-peace-plan/fvr/legal/treaty-structure
> Markdown mirror: https://initkoa.org/initiatives/ukraine-peace-plan/fvr/legal/treaty-structure/index.html.md
> Route: /initiatives/ukraine-peace-plan/fvr/legal/treaty-structure
> Source: app\initiatives\ukraine-peace-plan\fvr\legal\treaty-structure\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/initiatives/ukraine-peace-plan/fvr/legal/treaty-structure)

# Treaty Structure & Annexes

Freeze–Vote–Rebuild is easier to implement when agreements are drafted as **modular instruments**: a core text for high-level commitments, with annexes for technical detail that can be updated without reopening the entire agreement (subject to agreed procedures).

This chapter describes a recommended drafting architecture.

## Objectives
- Reduce veto points by keeping the core instrument lean.
- Make operational details precise through annexes and SOPs.
- Enable updates and learning without renegotiating everything.
- Improve auditability by clearly separating commitments from implementation procedures.

## Recommended Structure

### 1. Core Instrument (The “Political-Legal Spine”)
Should contain:
- Statement of objectives and principles (verification-first, sequencing).
- Definitions of key terms.
- Governance structure and decision rules.
- Verification-first gates concept and certification authority.
- High-level obligations by phase (Freeze, Vote, Rebuild).
- Conditional incentives and rollback logic (at principle level).
- Dispute resolution authority and timelines (high level).
- Entry into force / domestic approvals activation clauses.
- Amendment and annex-update procedures.

**Goal:** Keep it short enough to be ratifiable and readable.

### 2. Technical Annexes (Detailed and Operational)
Attach annexes such as:
- Maps and geographic definitions.
- Prohibited/permitted actions list.
- Incident classification rubric and reporting templates.
- Deconfliction SOP (hotlines, liaison trees).
- Corridor and protected infrastructure registers.
- Vote Rulebook (eligibility, modalities, audits, observation).
- Dispute resolution procedures (filing rules, evidence standards, remedies).
- Reconstruction procurement standards and audit terms.
- Data governance and publication policy.
- KPI definitions and dashboard specs.

### 3. SOPs and Playbooks (Operational Manuals)
These can be annexed or referenced:
- Monitor deployment and security SOPs.
- Election worker SOPs.
- Reconstruction project lifecycle SOPs.
- Fraud response and debarment procedures.

## Annex Update Rules (Critical)
- Who can propose annex updates.
- What approval threshold is required.
- How changes are published and versioned.
- “No surprise” rules (minimum notice periods).
- Emergency change procedures (rare, time-bounded, logged).
- How disputes about annex changes are adjudicated.

**Design Rule:** Core obligations should not be alterable via annex updates; annex updates refine implementation details.

## Version-Locking as a Legal Concept
For Vote-related procedures (and any vote-to-border algorithm if used):
- Publish the version-locked rules *before* execution.
- Define a strict change-control process.
- Record hashes or equivalent identifiers to prove integrity of versions.

## Linking Treaty Structure to Gates
Each annex should map directly to specific gates:
- **Freeze Annexes** $\rightarrow$ Freeze stability gate indicators.
- **Vote Annexes** $\rightarrow$ Vote readiness and certification gates.
- **Rebuild Annexes** $\rightarrow$ Reconstruction tranche and integrity gates.

(See: **Verification-First Gates (/initiatives/ukraine-peace-plan/fvr/governance/verification-gates)**)

## Domestic Approvals Integration
The core instrument should include activation clauses:
- Obligations activate only after certified domestic approvals.
- Incentives activate only when legal authority exists.

(See: **Domestic Approvals Gate (/initiatives/ukraine-peace-plan/fvr/legal/domestic-approvals)**)

## Drafting Note
When populating this chapter with full content, include:
- A sample Table of Contents for the core instrument.
- A sample annex list with “Owned By” and “Update Rule” columns.
- A mapping table from **Annexes $\rightarrow$ Verification Gates $\rightarrow$ Consequences**.
