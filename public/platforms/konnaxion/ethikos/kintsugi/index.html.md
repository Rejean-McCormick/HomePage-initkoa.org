# /platforms/konnaxion/ethikos/kintsugi

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/kintsugi
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/kintsugi/index.html.md
> Route: /platforms/konnaxion/ethikos/kintsugi
> Source: app\platforms\konnaxion\ethikos\kintsugi\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/kintsugi)

{/* FILE: page.mdx
Path: app/platforms/konnaxion/ethikos/kintsugi/page.mdx */}

Compass,
MessagesSquare,
FileText,
Vote,
ClipboardList,
Layers,
ShieldCheck,
ArrowRight,
Scale,

'Kintsugi is how ethiKos v2 delivers a unified civic deliberation pipeline: intake, discovery, deliberation, drafting, decision (Smart Vote), and accountability—without tool capture.',

# Kintsugi (ethiKos v2)

ethiKos is the deliberation and decision-formation module of Konnaxion.
**Kintsugi** is how it becomes *usable in the real world*: the best democratic innovations, delivered **as one coherent experience**.

Not a new “platform for everything.” Not another noisy feed.
A structured pipeline that turns public input into **legible outcomes**.

## What this enables

- **Map the problem space** from thousands of statements without collapsing into chaos.
- **Deliberate with structure** (arguments, evidence, credibility) instead of comment wars.
- **Draft text together** (proposals, amendments, versions) with accountability.
- **Decide with protocols** (clear thresholds, publishable results).
- **Track implementation** so decisions do not evaporate after the vote.

## The unified ethiKos pipeline

description="Collect submissions, deduplicate, and triage—so the community knows what is actually on the table."
href="/platforms/konnaxion/ethikos/konsultations"
description="Collect consultation statements, cluster positions, and extract bridges—so convergence becomes visible before escalation."
href="/platforms/konnaxion/ethikos/konsultations"
description="Structure reasons, objections, and evidence. Make arguments comparable—not just louder."
href="/platforms/konnaxion/ethikos/korum"
description="Turn the best arguments into draft text: options, amendments, and version history."
href="/platforms/konnaxion/ethikos"
description="Run protocol-based votes via Smart Vote and publish outcomes with clear thresholds, a stable record, and declared readings (baseline stays visible)."
href="/platforms/konnaxion/kollective-intelligence"
description="From decision to reality: impact tracking, implementation progress, and public accountability snapshots."
href="/platforms/konnaxion/ethikos/konsultations"

## Boundaries & contracts (v2)

ethiKos v2 stays governable by enforcing **clean limits** between components.
This section is the authoritative contract used by the module pages.

### 1) Ownership (single source of truth)

| Component | Owns (canonical truth) | May write | Must not do |
| **Konsultations** (ethiKos) | Intake, consultations, suggestions, **baseline ballots**, impact tracking | Its own OLTP facts + audit indexes | Compute “final” outcomes by stealth or overwrite baseline |
| **Korum** (ethiKos) | Debate topics, arguments, moderation, **stance events** (−3…+3) | Its own OLTP facts + audit logs | Become a voting engine |
| **Smart Vote** (Kollective Intelligence) | **Readings** (baseline + declared lenses), modality rules, publishable outcomes | **Derived results only** (readings/snapshots/breakdowns) | Mutate Korum/Konsultations fact tables |
| **EkoH** (Kollective Intelligence) | Expertise/ethics context + audit backbone (**snapshot id**) | EkoH ledger + history | Act as the voting engine |

### 2) The “read-only” rule (Smart Vote)
Smart Vote **reads** upstream facts (ballots/stances) and **writes only derived outputs**:
- baseline result snapshots
- lens/readings snapshots (e.g., cohort-filtered, competence-weighted)

It MUST NOT mutate:
- `EthikosStance`, `EthikosArgument`, `ConsultationVote`, `CitizenSuggestion`, etc.

### 3) Canonical objects (shared contracts)
These are the stable “civic objects” ethiKos v2 normalizes to:

- `Constraint` (hard limits / non-negotiables)
- `Argument` (threaded reasons / objections; provenance)
- `BallotEvent` (modality-specific)
- `LensDeclaration` (explicitly declared lens config)

### 4) Foreign tools: Annex vs Mimic (no merges)
Foreign elements integrated via Kintsugi MUST remain isolable.

- **Mimic:** copy the proven pattern natively (preferred when sovereignty and coherence matter).
- **Annex:** connect an external tool as a **sidecar adapter** only.

Annex adapters MUST:
1) store raw outputs as immutable **External Artifacts** (with provenance), and
2) project into canonical objects via explicit mappings (no direct writes to core tables).

### 5) Weighted outcomes are always “readings”
If competence/ethics signals are used:
- the outcome is a **Smart Vote reading**, not a replacement for baseline.
- the reading MUST bind to an explicit `LensDeclaration` and (when applicable) an **EkoH snapshot id**.

## Kintsugi rules (so it stays governable)

Kintsugi is not “connect everything.” It is a disciplined way to integrate what helps citizens **without surrendering sovereignty**.

Guardrails

<strong>One roof experience:</strong> citizens shouldn’t need five separate accounts, five UIs, and five incompatible records to participate.
<strong>Annex vs Mimic:</strong> integrate an external tool as an optional sidecar only when it helps and stays isolable; otherwise, mimic the proven pattern natively to avoid fragmentation and dual truth.
<strong>No platform contamination:</strong> external apps are never merged into the core; they remain bounded and replaceable.
<strong>Smart Vote is read-only on upstream facts:</strong> it publishes derived readings but never mutates debate/consultation records.
<strong>One voting truth:</strong> decision outcomes are anchored in a single authoritative voting record (Smart Vote), so “what passed” is not negotiable after the fact.

## Optional “Parliament mode” (institutional users)

Some institutions need formal assembly mechanics (motions, elections, meeting governance).
Kintsugi supports this as an **optional mode**, not as a mandatory worldview.

Parliament Mode (optional)
Enable institutional meeting governance when needed—without turning ethiKos into a rigid assembly-only system.

## Status note

Kompendio for ethiKos is currently **TBD**. This page covers **Kintsugi (Operate)** only.

## Next links

href="/platforms/konnaxion/ethikos"

href="/platforms/konnaxion/kollective-intelligence"

href="/platforms/konnaxion/modules"
