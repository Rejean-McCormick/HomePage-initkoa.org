# Offline & Sovereignty

> Canonical HTML: https://initkoa.org/platforms/orgo/offline-sovereignty
> Markdown mirror: https://initkoa.org/platforms/orgo/offline-sovereignty/index.html.md
> Route: /platforms/orgo/offline-sovereignty
> Source: app\platforms\orgo\offline-sovereignty\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/platforms/orgo/offline-sovereignty)

"Run Orgo in a hermetic mode: continue operations without the public internet, keep data under your control, and synchronize safely when you choose."

# Offline & Sovereignty

Orgo is built for organizations that cannot afford to stop functioning when connectivity fails—and that need **full control** over where their data lives.

It supports a **hermetic mode** (a closed-loop deployment): the system can operate inside your perimeter without relying on external services.

## Why this matters

If your workflow depends on the internet, outages become operational failures.
Orgo is designed to keep cases moving even during blackouts and unstable networks.

Some organizations cannot send sensitive operational data to third parties.
Orgo can be deployed inside your infrastructure with local storage and processing.

Offline capability is also political and strategic: no external actor should be able
to unilaterally shut down your coordination layer.

## Operating modes

Orgo supports three practical modes, depending on your environment and risk profile:

### 1) Connected mode
Standard deployment with normal integrations.

### 2) Degraded mode
Intermittent connectivity: Orgo continues locally and synchronizes when possible.

### 3) Hermetic mode (closed loop)
A self-contained deployment (LAN / local servers). Orgo continues to ingest signals, create cases, route work, enforce escalation, and record outcomes without the public internet.

## What “sovereignty” means in Orgo

### You decide where data lives
Deploy on-premise (local servers) when required, or use cloud hosting when appropriate.
Sovereignty is the option to choose—and to switch—without losing the integrity of operations.

### Work continues offline
Core workflows remain available during downtime:
- create cases and tasks
- track reactivity windows and escalation
- record outcomes and decisions
- keep an auditable operational history

### Safe synchronization when connectivity returns
When a connection becomes available, Orgo can synchronize updates.
Synchronization is treated as a controlled process (including conflict handling), not an assumption that connectivity is always present.

### Email can act as a fallback channel
In constrained environments, Orgo can operate in an **email-only** posture:
- external exchange happens through secure email channels
- messages can be queued and processed locally
- updates and notifications can be issued through email as a reliable fallback

> The point is not “email as a product.” The point is: Orgo can keep functioning with minimal infrastructure.

## Who needs this most

- **Hospitals & healthcare:** continuity, privacy, regulatory constraints
- **Local government:** sovereignty, reliability during crises
- **Justice system:** auditability, confidentiality, controlled access
- **NGOs and field operations:** unreliable connectivity, distributed coordination

## Next

href="/platforms/orgo/guarantees"

href="/platforms/orgo/use-cases"
