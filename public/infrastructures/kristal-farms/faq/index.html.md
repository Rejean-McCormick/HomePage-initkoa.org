# FAQ

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/faq
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/faq/index.html.md
> Route: /infrastructures/kristal-farms/faq
> Source: app\infrastructures\kristal-farms\faq\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/faq)

"Frequently asked questions about Kristal Farms: what it is, who it serves, privacy boundaries, heat reuse, environmental safeguards, governance, and rollout phases.",

# FAQ

## What is Kristal Farms, in one sentence?
A **modular compute site built around heat reuse**: tenants run compute, and the infrastructure captures waste heat to support **district heating and greenhouse production**, under explicit community governance.

## Is this “just a data center”?
No. A conventional data center treats heat as waste and optimizes for compute alone.

Kristal Farms is designed so **compute and useful heat are co-products**, and so priorities (heat, environment, community benefit) are governed rather than left to operator discretion.

## Who is it for?
- **The host community:** heat, infrastructure investment, jobs/training, and long-term resilience.
- **Tenants:** reliable, high-quality compute capacity and network access.
- **Local institutions:** improved connectivity and potentially heat supply for public buildings (phase dependent).

## Do tenants’ workloads become visible to the host?
No by design.

Kristal Farms uses a **black-box tenancy boundary**:
- the **host** provides pad utilities (power, cooling interfaces, fiber) and monitors infrastructure health,
- the **tenant** controls everything inside the module (hardware, software, keys, workloads).

See: <Link href="/infrastructures/kristal-farms/tenancy-model">Tenancy model →</Link>

## Does Kristal Farms require the Kristal technology?
No.

Kristal Farms is **infrastructure**. It can host many kinds of compute tenants.
Kristals are a **separate technology** (verifiable knowledge artifacts) that can optionally be produced/served using available compute.

## What does “heat-first” mean?
Heat-first means the operating model treats **useful heat delivery** as a priority constraint, not a marketing add-on.

When there is a real tradeoff (seasonal demand, storage limits, maintenance), the system follows an explicit policy for:
- which buildings/services are prioritized,
- when curtailment happens,
- and how decisions are reported.

See: <Link href="/infrastructures/kristal-farms/heat-first-design">Heat-first design →</Link>

## How is heat actually reused?
At a high level:
- compute pads generate heat,
- heat is transferred through controlled interfaces into a community heat loop,
- heat is delivered to buildings and/or greenhouse systems,
- storage buffers mismatches between supply and demand.

See: <Link href="/infrastructures/kristal-farms/how-it-works">How it works →</Link>

## What about environmental safety (water, discharge, local ecosystems)?
Environmental safeguards are treated as hard constraints:
- monitoring and limits,
- incident procedures,
- and oversight via governance (not only internal operations).

See: <Link href="/infrastructures/kristal-farms/environment-and-safety">Environment & safety →</Link>

## Who governs the project?
Kristal Farms is governed by named bodies with explicit mandates (steering, heat priorities, environmental limits, and knowledge-council topics if applicable).

The goal is to keep priorities **explicit, measurable, and correctable**.

See: <Link href="/infrastructures/kristal-farms/governance">Governance →</Link>

## How will the public know if it’s working?
Through a published **metrics & dashboard** approach: energy and water performance, useful heat delivered, uptime, network reliability, and community benefit indicators.

See: <Link href="/infrastructures/kristal-farms/metrics-and-dashboard">Metrics & dashboard →</Link>

## What is the rollout plan?
Kristal Farms is intended to scale in phases:
1) prove the loop (pads + heat delivery + monitoring + governance),
2) extend heat distribution and greenhouse capacity,
3) reach steady-state operations and replication.

See: <Link href="/infrastructures/kristal-farms/phasing">Phasing →</Link>

## What are the “Go / No-Go” conditions?
Before expansion (or even initial power-on), the project should meet clear gates:
- community agreements signed,
- infrastructure commissioned and monitored,
- safety and environmental procedures proven,
- governance seated and functioning,
- reporting/dashboards live.

See: <Link href="/infrastructures/kristal-farms/go-no-go">Go / No-Go gates →</Link>

## Can the site be removed or reversed if the project ends?
Reversibility is part of the design intent: modular pads and a restoration plan so the site can be returned without permanent scarring.

See: <Link href="/infrastructures/kristal-farms/reversibility">Reversibility →</Link>

## Is this “AI infrastructure”?
It can host AI workloads, but it is not defined by AI. The defining features are:
- modular compute tenancy,
- heat reuse as a first-class outcome,
- environmental limits,
- explicit governance,
- and public accountability.

## Where do I start if I’m new?
- <Link href="/infrastructures/kristal-farms/overview">Overview →</Link>
- <Link href="/infrastructures/kristal-farms/why-this-exists">Why this exists →</Link>
- <Link href="/infrastructures/kristal-farms/how-it-works">How it works →</Link>

## I want technical details. Where are they?
This site prioritizes **what it does** and **how it is governed**. Technical specifics (interfaces, commissioning checklists, etc.) can live in internal documentation or a separate “Reference” area if needed.

Some previously uploaded reference files in this workspace have expired; if you want me to align wording to earlier documents line-by-line, re-upload them.
