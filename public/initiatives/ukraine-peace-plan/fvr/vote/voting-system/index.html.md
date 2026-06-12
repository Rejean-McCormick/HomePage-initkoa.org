# Voting System Design

> Canonical HTML: https://initkoa.org/initiatives/ukraine-peace-plan/fvr/vote/voting-system
> Markdown mirror: https://initkoa.org/initiatives/ukraine-peace-plan/fvr/vote/voting-system/index.html.md
> Route: /initiatives/ukraine-peace-plan/fvr/vote/voting-system
> Source: app\initiatives\ukraine-peace-plan\fvr\vote\voting-system\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/initiatives/ukraine-peace-plan/fvr/vote/voting-system)

# Voting System Design

This chapter defines the technical and procedural architecture of the Vote. The system is designed to guarantee a secret vote that every eligible person can cast once, prove to the public that ballots were captured and counted as intended, and provide clear, local re-run rules if integrity is at risk.

## Objectives

- **One person, one vote:** Robust identity verification tied to the home district.
- **Secrecy:** Absolute protection of the voter's choice from coercion.
- **Auditability:** End-to-end verification that the cast ballot matches the counted ballot.
- **Resilience:** Ability to operate under cyber threat or power loss.

## Identity and Eligibility

### Two-step verification
Voters prove **who they are** and **their home district** (see **Electorate Definition (/initiatives/ukraine-peace-plan/fvr/vote/electorate-definition)**) using two accepted proofs, at least one showing the home-district address on or before the Reference Date.

### Channels
People may vote at an **Assistance Centre** (in Ukraine or abroad) or remotely. The same identity rules apply to both channels.

### Single-use credential
After eligibility is confirmed, the voter receives a one-time voting credential tied to their home district. Once used, it cannot be used again by any channel.

### Lost documents pathway
Where papers were destroyed, sworn statements with extra community checks may be used (as defined in the Electorate Definition).

## Secrecy and Anti-Coercion Design

### No observer at the booth
No person—including family, employer, landlord, local official, or armed person—may be present at the moment of choice.

### Remote voting safeguards
The system provides a private confirmation channel that does **not** reveal the vote but lets the voter check that a ballot linked to their credential is recorded.

### Help without influence
At Assistance Centres, trained staff help with devices and forms but may not see or suggest choices.

### Coercion remedy
Voters who report pressure may cast a protected replacement ballot at an Assistance Centre; the replacement automatically cancels the earlier ballot. Coercion cases are logged and observed.

## Verification: What the Voter Can Check

1. **Ballot preview:** Voters see a clear preview of their choices before final confirmation.
2. **Receipt:** After casting, the voter receives a short receipt (digital or printed) that allows them to confirm their ballot is **present** in the public record without revealing *how* they voted.
3. **Public bulletin:** An online bulletin lists anonymous ballot entries for each district so that any voter can check that one entry corresponding to their receipt exists.

## Tallying and Independent Verification

### Open counting record
For each district, the election authority publishes a machine-readable, anonymous record of all accepted ballots and a human-readable table of totals.

### Paper cross-check
Assistance Centres produce sealed, anonymous paper records of ballots cast on-site. After polls close, a statistically designed hand count is conducted on a public sample. If the sample shows a risk that the outcome is wrong, the hand count expands until the outcome is confirmed or a full count is triggered.

### Automatic recounts
An automatic recount is triggered if the margin is below **0.5 percentage points**.

## Chain of Custody

- **Separated networks:** Core counting systems run on networks disconnected from the public internet. Public dashboards receive only summarized, signed results.
- **Write-once logs:** System actions are recorded in append-only logs with visible file fingerprints and timestamps.
- **Split control:** Critical actions (opening, closing, exporting results) require the presence of multiple authorized officials from different sides.
- **Sealed media:** Any portable storage is sealed, labelled, witnessed, and logged in and out.

## Software Transparency

- **Published specification:** The full voting and counting specification is public.
- **Open code:** The code used for ballot capture and counting is published with build instructions.
- **Independent testing:** Independent teams test the system for security and reliability; reports are public (redacted for specific vulnerabilities until fixed).
- **Version lock:** Once published for the election, versions are **locked**. Any emergency fix follows a public protocol.

## Localized Re-run Triggers

A re-run is ordered **only** for the smallest affected unit (polling point, Assistance Centre, or sub-district) when verified triggers occur, such as:

1. **Coercion or intimidation** at a location that could have altered the outcome.
2. **Denial of access** to observers or Assistance Centres.
3. **Malware or configuration error** shown by logs.
4. **Ballot secrecy breach** that risks voter safety.
5. **Chain-of-custody break** for digital or paper records.
6. **Unexplained discrepancy** between paper samples and electronic tallies.

## Contingencies

- **Power/Network loss:** Assistance Centres switch to paper capture with later secure upload.
- **Device failure:** Devices replaced from sealed spares; failed units quarantined.
- **Disinformation:** Public bulletin provides a "source of truth" for process status.

## Links to Related Chapters

- **Electorate Definition (/initiatives/ukraine-peace-plan/fvr/vote/electorate-definition)**
- **Integrity & Observation (/initiatives/ukraine-peace-plan/fvr/vote/integrity-observation)**
- **Dispute Resolution (/initiatives/ukraine-peace-plan/fvr/vote/dispute-resolution)**
