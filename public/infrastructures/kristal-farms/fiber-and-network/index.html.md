# Fiber & Network

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/fiber-and-network
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/fiber-and-network/index.html.md
> Route: /infrastructures/kristal-farms/fiber-and-network
> Source: app\infrastructures\kristal-farms\fiber-and-network\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/fiber-and-network)

"How Kristal Farms exports computation by fiber: resilient connectivity, traffic separation (tenant vs community), monitored performance, and a black-box networking posture.",

# Fiber & Network

Kristal Farms does not export electricity. It exports **results**.

That means **fiber connectivity is a first-class utility**: without reliable network links, the pads can’t deliver value, and the project can’t justify colocating compute in the village.

## Architecture

### NOC + trunk connectivity

A small **Network Operations Center (NOC)** is established at the port site, then a main **trunk line** connects to a regional hub using high-capacity transport.

The network is designed to serve:

- the pad yard (tenant traffic),
- community services (connectivity benefit),
- local facilities (e.g., clinic, school).

### Dual uplinks per pad

Each pad gets **two independent fiber uplinks (A/B)** so a single failure does not take it offline.

### Diverse paths where feasible

Where feasible, the trunk uses **diverse paths / ring-like protection** so a fiber cut does not isolate the site.

### Failover behavior

Failover is validated:

- at the pad edge (A/B),
- and on the backbone (reroute on trunk failure).

## Monitoring

Key metrics include:

- uptime/availability,
- latency,
- throughput,
- packet loss,
- and **error rates**.

These indicators are intended to appear on the **public dashboard** (aggregate, non-sensitive), alongside counts of connected local sites.

## Tenancy boundaries (black-box networking)

The host operates the network up to the pad boundary:

- The host sees infrastructure-level metadata (link up/down, aggregate bandwidth) but not packet content.

A key requirement is that **tenant traffic and community traffic are securely segregated** (e.g., VLAN/firewall separation), with explicit acceptance testing to confirm isolation.

## Community connectivity guarantee

Connectivity benefit can include:

- reserved bandwidth for community services (clinic, school).
- public network dashboard online with the key metrics.

## Next pages
