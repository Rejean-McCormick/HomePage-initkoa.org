# /technology/swarmcraft/runtime

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime/index.html.md
> Route: /technology/swarmcraft/runtime
> Source: app\technology\swarmcraft\runtime\page.tsx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft/runtime)

Runtime & Operations

The operational layer of SwarmCraft. These modules handle the user interface, project isolation, long-term memory retrieval, and LLM provider integration.

Control Surfaces

Dashboard TUI Reference

The "Mission Control" interface. A terminal UI that observes the engine state (SCAN/PLAN/EXECUTE) without blocking it.

View Layout Specs

Multi-Project Management

How SwarmCraft runs multiple isolated universes (Story Bibles + Matrices) in a single runtime without contamination.

View Isolation Logic

Memory & Integration

RAG Memory System

Long-term continuity. Indexes manuscripts and notes to provide "Evidence" during drafting, preventing character drift.

Slice-by-Slice Prompt Hydration

The anti-sprawl mechanism. Injecting only the active Part's beats and contract into the LLM context.

Provider Adapter: Grok

The normalization layer that keeps the engine model-agnostic while leveraging Grok for execution.

← Back to Core Logic

Next: Scaffold Schema →
