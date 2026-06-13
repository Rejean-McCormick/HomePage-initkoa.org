# Verification & Monitoring

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/initiatives/ukraine-peace-plan/fvr/freeze/verification-monitoring
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/initiatives/ukraine-peace-plan/fvr/freeze/verification-monitoring/index.html.md
> Route: /initiatives/ukraine-peace-plan/fvr/freeze/verification-monitoring
> Source: app\initiatives\ukraine-peace-plan\fvr\freeze\verification-monitoring\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/initiatives/ukraine-peace-plan/fvr/freeze/verification-monitoring)

# Verification & Monitoring

The Freeze phase depends on credible verification. This chapter defines what must be monitored, how incidents are classified, and how information becomes actionable.

## Goals
Verification and monitoring should:
- make major violations **hard to deny**,
- reduce escalation driven by ambiguity and misinformation,
- support conditional incentives (“gates”),
- protect civilians and humanitarian operations.

## What to Monitor (Minimum Set)

### 1. Kinetic Activity
- Shelling/strike incidents (time, location, type).
- Drone/UAV activity (where restricted).
- Troop or heavy equipment movements (where restricted).
- Air activity (where restricted).

### 2. Civilian Harm and Protected Infrastructure
- Civilian casualties and mass-casualty events.
- Strikes on protected sites (power, water, hospitals, schools).
- Damage to corridors and repair sites.

### 3. Access and Obstruction
- Monitor access denials.
- Interference or intimidation incidents.
- Corridor closures and aid delays.

### 4. Disinformation Indicators (Operational, Not Rhetorical)
- Fabricated incident reports.
- Manipulated imagery claims.
- Systematic denial of verifiable events.

## Data Sources (Menu)

A robust monitoring design uses multiple sources:
- Field observer reports (with secure comms).
- Hotline and liaison reports.
- Sensor networks where feasible (acoustic, radar, UAV monitoring).
- Satellite imagery and open-source verification (as appropriate).
- Humanitarian/medical reporting channels (protected, privacy-aware).

The architecture should assume adversarial conditions and require corroboration for major claims.

## Incident Reporting Workflow

A minimal workflow:

1. **Intake** (hotline, observer report, sensor trigger).
2. **Triage** (severity/urgency; immediate deconfliction if needed).
3. **Verification** (site visit, sensor confirmation, cross-source checks).
4. **Classification** (apply rubric; record confidence level).
5. **Adjudication** (contested cases go through dispute mechanism).
6. **Publication/Notification** (per reporting policy and security constraints).
7. **Consequence** (trigger escalation ladder or gate rollback if thresholds crossed).

[Image of incident management workflow]

## Incident Classification (Example Rubric)

Classification should be standardized, predictable, and time-bounded.

- **S1 Minor:** Isolated small-arms or low-impact incident; no civilian harm.
- **S2 Serious:** Clear violation with material effect; limited civilian risk.
- **S3 Major:** Significant attack, repeated pattern, or high-risk action.
- **S4 Critical:** Mass-casualty event, strike on protected infrastructure, or deliberate escalation.

- **C1 Low:** Single-source or unverified claim.
- **C2 Medium:** Partial corroboration.
- **C3 High:** Multi-source corroboration / verified observation.

- Tracking repeated violations over time to detect patterns and intent.

This rubric allows “S3/C3” style reporting that is legible to stakeholders and supports gate thresholds.

## Dashboards and Reporting

### Public-Facing Transparency (Where Feasible)
- Aggregate incident counts by category and severity.
- Protected infrastructure incidents.
- Access denials and corridor disruptions.
- Rolling trend lines (7/14/30 days).

### Restricted Reporting (Where Necessary)
- Precise unit locations, sensitive sensor placements.
- Protected personal data (witnesses, victims).
- Tactical details that could enable targeting.

The book’s default preference is: **publish as much as possible without creating new security risks.**

## Verification Gates Linkage

Monitoring outputs feed verification gates:
- **“Freeze Stability Gate”** might require sustained low S3/S4 incidents and full monitor access.
- **“Humanitarian Gate”** might require corridor uptime and repair window compliance.

Gate definitions live in:
**Verification-First Gates (/initiatives/ukraine-peace-plan/fvr/governance/verification-gates)**

## Common Failure Modes and Mitigations

- **Gaming the metrics:** Mitigate by tracking multiple indicators and recurrence patterns.
- **Access denial:** Mitigate with automatic consequences tied to obstruction.
- **Data poisoning:** Mitigate with multi-source corroboration and chain-of-custody.
- **Over-classification secrecy:** Mitigate with a clear publication policy and independent audit.

## Next

- **Protected Infrastructure & Repair Windows (/initiatives/ukraine-peace-plan/fvr/freeze/humanitarian-corridors)**
- **Escalation Ladder & Dispute Handling (/initiatives/ukraine-peace-plan/fvr/governance/escalation-coordination)**
