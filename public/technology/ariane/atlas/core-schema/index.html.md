# Atlas / Core Schema

> Canonical HTML: https://initkoa.org/technology/ariane/atlas/core-schema
> Markdown mirror: https://initkoa.org/technology/ariane/atlas/core-schema/index.html.md
> Route: /technology/ariane/atlas/core-schema
> Source: app\technology\ariane\atlas\core-schema\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/technology/ariane/atlas/core-schema)

# Atlas / Core Schema

The core schema defines how UI graphs are represented in Atlas as structured data.

It specifies the main object types (context, states, elements, transitions) and the fields they must provide so that:

- Theseus can reliably write data into Atlas.
- Consumers can reliably read and interpret that data.
- Implementations can validate and evolve the data model over time.

This page is schema-oriented and storage-format-agnostic (JSON, RDF, graph DB, etc.).

## Overview of Object Types

Atlas organizes data into four primary object types:

1. **Context** – describes the environment in which a UI graph is valid.
2. **State** – represents a specific UI configuration.
3. **Interactive Element** – represents an actionable control within a state.
4. **Transition** – represents a directed action from one state to another.

Each object type can be extended with implementation-specific fields, but the core fields below should remain stable.

## 1. Context

A **Context** object scopes a UI graph to a particular application and environment.

Typical fields:

"platform": "win32", // e.g. win32, linux, darwin, web, android, ios
