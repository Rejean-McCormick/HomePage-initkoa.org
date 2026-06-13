# /infrastructures/kristal-farms/go-no-go

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/go-no-go
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/go-no-go/index.html.md
> Route: /infrastructures/kristal-farms/go-no-go
> Source: app\infrastructures\kristal-farms\go-no-go\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/infrastructures/kristal-farms/go-no-go)

ClipboardCheck,
CheckCircle2,
AlertTriangle,
Users,
ShieldCheck,
Flame,
Wifi,
Leaf,
Server,
Anchor,
Activity,

"A practical readiness gate for commissioning: community agreements, safety, compliance, heat-first operations, network reliability, and governance.",

Evidence required

# Go / No-Go checklist

This page is a **commissioning gate**: a simple, auditable way to decide whether a Kristal Farms site is ready to move from “build” to “operate.”

A **Go** is not optimism. It is evidence that the system can run **safely**, **compliantly**, and **legitimately**, including when conditions degrade.

## How to use this checklist

- Each item is **pass/fail** with required evidence.
- If any **No-Go** item fails, you either:
- delay launch, or
- operate in a reduced mode that stays inside constraints (never “ship now, fix later” on safety/compliance).
- The goal is a site that can be trusted by:
- the community,
- the operator,
- tenants,
- and regulators.

## Minimum Go (Phase 1 readiness)

You can launch Phase 1 when the site can reliably deliver <strong>compute</strong>, <strong>heat recovery</strong>, and <strong>connectivity</strong>
while proving <strong>environmental compliance</strong> and <strong>governance legitimacy</strong>.

## Go / No-Go gates

### 1) Community legitimacy (non-negotiable)

title="Consent + benefit agreement executed"
pass="Signed agreements are in place (community benefit, local priorities, dispute mechanisms)."
"Signed agreements and governance charter",
"Defined community services (heat endpoints, connectivity commitments where applicable)",
"Named liaisons and escalation path",
title="Operating boundaries agreed"
pass="Clear limits on what the operator can and cannot do/see (tenancy boundaries, privacy, monitoring scope)."
"Tenancy model + monitoring policy (black-box boundary)",
"Site access policy (roles, approvals, logs)",
"Incident response commitments (who is contacted, when, and how)",

### 2) Site, safety, and compliance

title="Safety systems commissioned"
pass="Fire safety, emergency procedures, and physical security are tested and documented."
"Commissioning reports (fire suppression, alarms, egress, power cutover)",
"Emergency response plan + drill record",
"Physical security plan (perimeter, cameras, access control, visitor process)",
title="Environmental controls proven"
pass="Monitoring is live, thresholds are enforced, and compliance-first behavior is demonstrated."
"Monitoring plan (temperatures, discharge limits, flow, alarms)",
"Proof of compliance operating modes (load shedding / mode switching)",
"Incident runbooks and escalation path for environmental events",

### 3) Power & grid readiness

title="Power handoff commissioned"
pass="The site has stable power with metering, protection, and documented start/stop sequencing."
"Commissioning report (substation / feeder / protection / metering)",
"Power-quality baseline (voltage/frequency tolerance, harmonics where relevant)",
"Pad sequencing procedure (safe ramp-up, safe shutdown)",
title="Fail-safe behavior validated"
pass="If constraints are breached (overheat, telemetry loss), the site degrades safely."
"Test record: sensor failure → conservative mode",
"Test record: heat-demand mismatch → storage/reject compliant mode",
"Test record: utility outage → controlled shutdown / restart procedure",

### 4) Heat-first operations (the central promise)

title="Heat recovery loop operational"
pass="Heat is captured and routed to real endpoints (buildings/storage/greenhouse), not just “planned.”"
"Commissioning report: heat exchangers + district loop",
"Confirmed live endpoints (at least one building loop or equivalent)",
"Thermal storage behavior verified (charge/discharge tests)",
title="Curtailment policy defined"
pass="If heat cannot be recovered compliantly, compute load is curtailed or shifted by policy."
"Heat-first operating policy (reuse → store → reject)",
"Curtailment decision authority (who decides, thresholds, logs)",
"Tenant communication protocol for curtailment events",

title="Fiber trunk live + tested"
pass="Export capacity is active, performance is measured, and failover is validated where promised."
"Fiber acceptance test (latency, throughput, packet loss baselines)",
"Failover test record (if dual path is claimed)",
"NOC monitoring live with alerting thresholds",
title="Isolation & tenancy boundaries enforced"
pass="Tenant traffic is isolated; operator tooling does not create backdoor visibility."
"Network segmentation plan + verification",
"Access logs and privileged account controls",
"Policy: what telemetry is collected (infrastructure only) and retention rules",

### 6) Governance is seated (so “benefit” is not optional)

Kristal Farms is not only a technical asset. It is a community-coupled infrastructure project. Governance must exist
on day one.

Governance & accountability →

## “No-Go” triggers (stop conditions)

<li><strong>Environmental compliance cannot be proven</strong> (monitoring missing, thresholds undefined, or unsafe discharge behavior).</li>
<li><strong>Heat-first promise is not operational</strong> (no working recovery path; no curtailment policy).</li>
<li><strong>Safety systems are uncommissioned</strong> (fire, emergency response, access control).</li>
<li><strong>Tenancy boundaries are unclear</strong> (operator has excessive visibility; privacy claims are not enforceable).</li>
<li><strong>Governance does not exist</strong> (no decision bodies, no recourse, no accountable owners).</li>

## Next pages
