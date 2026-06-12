# /technology/voting-machine

> Canonical HTML: https://initkoa.org/technology/voting-machine
> Markdown mirror: https://initkoa.org/technology/voting-machine/index.html.md
> Route: /technology/voting-machine
> Source: app\technology\voting-machine\page.tsx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/technology/voting-machine)

Core Component

VM-ENGINE

A deterministic electoral simulation core. It is not a "black box" in the opaque sense,
but a pure function : it accepts canonical inputs and produces
byte-identical outputs across any operating system or architecture.

View Specifications

Integration Guide

The "Pure Function" Contract

registry.json

Universe of units & options

tally.json

Votes per unit/option

params.json

Algorithm config & variables

VM-ENGINE

result.json

Canonical outcome & labels

run_record.json

Cryptographic audit trail

Byte-Identical Determinism

With identical inputs and seeds, the engine produces outputs that are bit-for-bit identical
on any machine. We achieve this by enforcing a strictly canonical JSON format with
sorted keys and stable array ordering.

Offline & Hermetic

The engine performs no network I/O during official runs. It is a self-contained
binary that verifies its own input hashes and fails hard upon any spec violation.

Formula ID . Changing a visual label does not change the FID; changing a
rounding rule does.

Pinned Randomness

Tie-breaking is not arbitrary. When random policy is selected, the engine uses a
frozen RNG profile seeded once per run. A k-way tie consumes exactly k draws.

Technical Specifications

The rigorous engineering documentation. Data models, Algorithm Flow, Gates, and the Pipeline State Machine.

Read Specs

Integration & Reporting

How to embed VM-ENGINE in a larger system. CLI contracts, read-only reporting templates, and audit verification.

View Guide
