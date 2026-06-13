# Hybrid Mapping and Human-Guided Assistants

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/ariane/consumers/hybrid-mapping
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/ariane/consumers/hybrid-mapping/index.html.md
> Route: /technology/ariane/consumers/hybrid-mapping
> Source: app\technology\ariane\consumers\hybrid-mapping\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/ariane/consumers/hybrid-mapping)

# Hybrid Mapping and Human-Guided Assistants

This page describes how Ariane supports a **hybrid approach**:

- Theseus performs **automated exploration** where possible.
- Human operators perform actions in real software where automation is not safe, reliable, or allowed.
- Both kinds of observations are stored in **Atlas** as the same kind of graph (states and transitions), with metadata indicating how they were obtained.

The goal is not full autonomy over “every interface”, but a realistic system where:

- Automation covers standards-based, accessibility-friendly UIs.
- Humans cover the hard parts.
- External tools (including AI agents) can rely on Atlas as a unified, machine-readable reference.

## Why a hybrid approach?

Purely automatic exploration is limited by:

- Anti-bot protections, logins, CAPTCHAs, 2FA, and secure flows.
- High-risk operations (deletion, payments, production changes).
- Combinatorial explosion if you try to explore all possible paths.

On the other hand, purely manual documentation doesn’t give you:

- A consistent data model across apps.
- Programmatic query and pathfinding.
- A shared graph that agents and tools can consume.

The hybrid mode combines both:

- **Automation** for broad coverage of “normal” UI patterns.
- **Human-in-the-loop** for exceptional, sensitive, or complex workflows.
- A single graph in Atlas as the reference.

## Metadata conventions

Hybrid mapping is expressed entirely through existing Atlas records, using conventions in `metadata`.

### Source of observation

- `source = "auto"` – discovered by automated exploration.
- `source = "human"` – recorded while a human operator drove the UI.
