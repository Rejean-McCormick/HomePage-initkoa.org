# How it works

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/how-it-works
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/how-it-works/index.html.md
> Route: /infrastructures/kristal-farms/how-it-works
> Source: app\infrastructures\kristal-farms\how-it-works\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/how-it-works)

"A plain-language walkthrough of how Kristal Farms convert clean power into useful compute and useful heat, with a tenancy model designed for privacy, safety, and reversibility.",

# How it works

Kristal Farms is a **modular compute site designed around heat reuse**.

Instead of treating server heat as waste, the infrastructure is built so that **compute and heat are co-products**:
- tenants run compute workloads,
- the site captures and reuses waste heat for **district heating** and **greenhouse production**,
- and the whole system is operated with **clear, governable priorities**.

## The system in one picture

This is not “a data center near a dam.”
It is **compute modules near heat users**, with a network link to the outside world.

## The three loops

### 1) Power loop (clean electricity → predictable capacity)
**What it does:** provides stable electricity to modular pads.

- A local substation distributes power to multiple pads.
- Pads can be added or removed without redesigning the entire site.
- Operations can sequence pad start/stop to protect stability.

- <Link href="/infrastructures/kristal-farms/power-and-grid">Power & grid →</Link>

### 2) Thermal loop (waste heat → useful heat)
**What it does:** turns server heat into community value.

- Pads run servers using liquid cooling.
- Heat is transferred through **heat exchangers** into a separate “community heat loop” (no mixing).
- Heat is delivered to:
- public buildings (phase 1),
- greenhouses sized to absorb seasonal surplus (phase 2+).
- Thermal storage smooths mismatches between “compute heat supply” and “heat demand.”

**Heat-first rule:** the operating logic prioritizes **useful heat delivery** over maximum compute throughput when there is a conflict.

- <Link href="/infrastructures/kristal-farms/heat-first-design">Heat-first design →</Link>
- <Link href="/infrastructures/kristal-farms/cooling-and-water">Cooling & water →</Link>

### 3) Network loop (local pads → global compute)
**What it does:** exports compute safely and reliably.

- Each pad has redundant fiber connectivity to the site network.
- The site uplinks to a regional hub for external traffic.
- The network is operated as critical infrastructure: uptime, monitoring, and incident response.

- <Link href="/infrastructures/kristal-farms/fiber-and-network">Fiber & network →</Link>

## The tenancy model (privacy by architecture)

Kristal Farms is designed for “black-box” tenancy:

- **The host provides:** the pad, power handoff, cooling/thermal handoff, and fiber handoff.
- **The tenant controls:** everything inside the module (hardware, software, keys, workloads).
- **The host monitors:** physical and infrastructure metrics (power draw, temperatures, flow, alarms), not tenant data.

This is a deliberate boundary: it keeps the infrastructure useful without becoming a surveillance platform.

- <Link href="/infrastructures/kristal-farms/tenancy-model">Tenancy model →</Link>

## Governance: who decides what

A system that blends compute + heat + environment needs explicit governance.

Kristal Farms is designed so decisions about:
- heat priorities,
- environmental limits,
- capacity allocation,
- and community benefits

are made through named committees and a defined operating charter—not ad hoc by operators.

- <Link href="/infrastructures/kristal-farms/governance">Governance →</Link>
- <Link href="/infrastructures/kristal-farms/metrics-and-dashboard">Metrics & dashboard →</Link>

## Resilience, safety, and reversibility

Kristal Farms is treated as infrastructure that must be:
- **safe under failure** (degrade gracefully),
- **transparent in operation** (measured, observable),
- **reversible** (modules removable; site restoration planned).

- <Link href="/infrastructures/kristal-farms/environment-and-safety">Environment & safety →</Link>
- <Link href="/infrastructures/kristal-farms/reversibility">Reversibility →</Link>

## Phasing: how it scales without breaking

The project is intended to scale by adding modules and extending heat distribution:

1. **Phase 1:** prove the loop (pads + heat delivery + basic governance + monitoring)
2. **Phase 2:** expand heat network and greenhouse capacity; add redundancy
3. **Phase 3:** replicate the pattern as a stable operating model

- <Link href="/infrastructures/kristal-farms/phasing">Phasing →</Link>
- <Link href="/infrastructures/kristal-farms/go-no-go">Go / No-Go gates →</Link>

## Why this structure matters

Most compute infrastructure optimizes for compute alone.
Kristal Farms optimizes for **civic outcomes**:

- heat becomes a local public good,
- compute becomes a tenant product,
- and governance makes tradeoffs explicit.

- <Link href="/infrastructures/kristal-farms/why-this-exists">Why this exists →</Link>
