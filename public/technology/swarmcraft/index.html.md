# /technology/swarmcraft

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/swarmcraft/index.html.md
> Route: /technology/swarmcraft
> Source: app\technology\swarmcraft\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/swarmcraft)

POWERED BY GROK

SwarmCraft
Deterministic Story Engine

SwarmCraft is a deterministic, data-driven story engine designed to transform explicit project state into prose using a strict control loop. Unlike chat-based swarms, it separates <strong>Brain</strong> (LLM personas), <strong>Logic</strong> (orchestration), and <strong>Memory</strong> (explicit state) to ensure long-form narrative coherence.

Technical documentation is currently being migrated to this new platform.

The atomic unit of work is the <strong>Part</strong>. Chapters are simply rollups of 1–6 Parts. This allows for small, stable prompt slices and targeted regeneration.
The engine never dumps the whole Story Bible into the LLM. It hydrates prompts with <strong>only</strong> the active Part's beats, contract, and relevant RAG evidence.

href="/technology/swarmcraft/meta"
SwarmCraft's upstream lineage, architectural credits, and the design decisions that separate it from chat-based swarm systems.

title="Credits & Sources"
href="/technology/swarmcraft/meta/credits-and-lineage"
Full attribution, project ancestry, and the reference trail behind the current engine.

href="/technology/swarmcraft/meta"
Read the full SwarmCraft lineage documentation →

Based on the foundational work of Mojomast/swarmussy and the Abstract Wiki Architect.
href="/technology/swarmcraft/meta"
Open Meta & Lineage
