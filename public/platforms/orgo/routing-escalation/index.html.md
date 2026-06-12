# Routing & Escalation

> Canonical HTML: https://initkoa.org/platforms/orgo/routing-escalation
> Markdown mirror: https://initkoa.org/platforms/orgo/routing-escalation/index.html.md
> Route: /platforms/orgo/routing-escalation
> Source: app\platforms\orgo\routing-escalation\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/platforms/orgo/routing-escalation)

'How Orgo prevents lost requests: route work to the right function, enforce response windows, and escalate safely when needed.',

# Routing & Escalation

Orgo’s core promise is simple:

**Important work must reach the right function, on time, and with a traceable outcome.**

Routing and escalation are the reliability mechanisms that make that promise true.

## What routing means in Orgo

Routing is how Orgo decides **where a request goes**.

Not “who happens to read the email,” but **which function is responsible** (e.g., Intake, Incident Response, Procurement, Legal Review, Case Management).

### Routing is built around four principles

1) **Function-first ownership**
Work is assigned to responsibilities (functions/roles), so continuity survives turnover and re-orgs.

2) **Triage before discussion**
The first job is to classify and route. Conversation comes after ownership is clear.

3) **Minimal friction**
A request should become a case with as few steps as possible. If the process is heavy, people will bypass it.

4) **Visible responsibility**
Everyone can see which function owns the case and what the next expected action is.

## What escalation means in Orgo

Escalation is what happens when a case is **not** handled within its response window.

Escalation is not punishment. It’s a safety system that prevents silence from becoming policy.

### Escalation is built around three ideas

- **Response windows**
Each case has a time expectation (minutes / hours / days), depending on severity.

- **Escalation ladder**

- **Closure required**
Escalation continues until the case is explicitly closed (resolved, rejected with reason, deferred with a date, etc.).

## Two guarantees (in one view)

description="Requests become cases and are assigned to the correct function, with clear ownership and next action."
href="/platforms/orgo/workflow"
description="If a case isn’t handled within its response window, it escalates automatically—so urgent work can’t be silently ignored."
href="/platforms/orgo/guarantees"

## What people experience (practically)

### For the requester
- You don’t need to know internal structure.
- You send one request.
- You receive status updates because the case has an owner and a timeline.

### For the organization
- No “I thought someone else handled it.”
- No backlog that only exists in private inboxes.
- No invisible failures: if something is overdue, it becomes visible and moves.

## Safe escalation (anti-noise safeguards)

Escalation only works if it doesn’t become spam. Orgo should enforce:

- **Explicit thresholds** (severity → response window → escalation ladder)
- **Bounded notifications** (no infinite loops; escalation changes ownership, not just alerts)
- **Auditability** (what escalated, when, and why)
- **Human override** (authorized roles can defer, merge, split, or reclassify cases—with reasons)

Escalation rules are policy. They encode what your organization treats as urgent, who is accountable, and how
silence is handled. In Orgo, those rules should be explicit, reviewable, and adjustable.

## Three example patterns

Route to Incident Response. Response window: 30 minutes. Escalate to Duty Lead if no action is logged.
Route to Procurement Intake. Response window: 2 business days. Escalate to Operations if the request blocks delivery.
Route to Case Management. Response window: 5 days. Escalate to Service Lead if no update is sent.

## Next

href="/platforms/orgo/workflow"

href="/platforms/orgo/security-audit"

href="/platforms/orgo/offline-sovereignty"
