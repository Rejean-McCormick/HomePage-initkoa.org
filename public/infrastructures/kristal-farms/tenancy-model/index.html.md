# Tenancy model

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/tenancy-model
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/tenancy-model/index.html.md
> Route: /infrastructures/kristal-farms/tenancy-model
> Source: app\infrastructures\kristal-farms\tenancy-model\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/tenancy-model)

"How Kristal Farms hosts compute without becoming a surveillance platform: the black-box boundary, what the host provides, what the tenant controls, and how contracts enforce safety and public benefit.",

# Tenancy model

Kristal Farms is designed to host compute **without owning the tenant’s data** and without turning the site operator into a surveillance authority.

The tenancy model is simple:

**The host provides utilities up to the pad. The tenant controls everything inside.**

This is called the **black-box tenancy model**.

## The boundary (what “black-box” means)

A compute pad is treated as an **opaque container**:

- The tenant installs and controls their **hardware, operating system, software, models, and data**.
- The host operates the **site infrastructure** (power, cooling interfaces, heat export loop, fiber connectivity, physical security).

The host does **not** access tenant data, logs, model weights, or internal telemetry.
The host does **not** inspect network payloads.

## What the host provides (the pad interfaces)

Each pad is delivered with a small set of standardized interfaces:

- **Power handoff** (metered, capacity-defined)
- **Cooling / heat exchange interface** (non-contact heat transfer boundary)
- **Dual fiber uplinks** (A/B connectivity)
- **Physical site services** (yard access rules, security perimeter, safety systems)

These interfaces make the site **modular**: pads can be installed, removed, replaced, or upgraded without rebuilding the entire facility.

## What the tenant controls

Inside the pad, the tenant controls:

- compute stack selection (GPU/CPU, storage, networking)
- all software and orchestration
- security posture and encryption
- workload scheduling and priorities
- model and data lifecycle

If a tenant wants maximum confidentiality, they can run **end-to-end encryption** and keep operational details private by default.

## What the host is allowed to monitor (and why)

To operate infrastructure safely and fairly, the host monitors **only physical / utility-layer metrics**, such as:

- power draw / energy consumption
- cooling flow and temperature differential across the heat exchanger
- pad availability (heartbeat/power draw)
- network link status and aggregate bandwidth usage
- alarms (over-temperature, hardware fault signals, fiber drop, etc.)

This is monitoring of **infrastructure health**, not monitoring of tenant activity.

## Optional: higher assurance onboarding

For tenants with extremely sensitive workloads, the model can support **optional hardware attestation** (proof that the pad is in a known secure state at turn-up).

This is **not required by default**. The baseline model relies on isolation + encryption + strict boundary enforcement.

## Contract structure (lease + SLA)

Tenancy is enforced through clear contracts:

### Lease defines capacity + interfaces
A lease typically specifies:

- IT power capacity (kW) and power quality expectations
- fiber ports and connectivity expectations
- physical access rules and safety requirements

### SLA defines reliability + response
The SLA commits the host to:

- infrastructure availability targets (power/cooling/network)
- response times for incidents
- scheduled maintenance windows and notification practices

If the host fails to meet SLA targets, **credits/penalties** apply.

## The heat-first clause (public value built into the lease)

Kristal Farms is not a “compute-first” project.

It is governed as a **heat-first** system:

- waste heat is directed to local uses (district heating, greenhouse heating) whenever possible
- seasonal priorities exist (e.g., critical buildings in winter)

Contracts include a clause requiring tenants to **cooperate with heat reuse**.

In rare conditions, the host may request—or contractually enforce—**non-essential workload curtailment** to stay within environmental limits or to maintain safe operations.

Important: curtailment is **infrastructure-level** (power/thermal signaling), never data access.

## Step-in rights (only for safety and contract breaches)

The host cannot interfere with tenant workloads except under predefined conditions:

- safety emergencies
- breach of agreed caps (e.g., exceeding power draw)
- refusal to connect to required infrastructure interfaces
- environmental compliance constraints that are explicitly defined in advance

These rules are designed to prevent arbitrary control while still protecting the site and community.

## Public transparency without tenant surveillance

Kristal Farms can publish a public dashboard with:

- aggregate energy use
- aggregate heat recovered / delivered
- site uptime metrics
- environmental compliance indicators
- high-level network performance

But public reporting is **aggregated and anonymized**:
no tenant-specific operational details and no content visibility.

## Related pages

- <Link href="/infrastructures/kristal-farms/how-it-works">How it works →</Link>
- <Link href="/infrastructures/kristal-farms/fiber-and-network">Fiber & network →</Link>
- <Link href="/infrastructures/kristal-farms/heat-first-design">Heat-first design →</Link>
- <Link href="/infrastructures/kristal-farms/governance">Governance →</Link>
- <Link href="/infrastructures/kristal-farms/metrics-and-dashboard">Metrics & dashboard →</Link>
