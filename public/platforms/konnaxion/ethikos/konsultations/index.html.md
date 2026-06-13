# Konsultations

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/konsultations
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/konsultations/index.html.md
> Route: /platforms/konnaxion/ethikos/konsultations
> Source: app\platforms\konnaxion\ethikos\konsultations\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/platforms/konnaxion/ethikos/konsultations)

{/* FILE: page.mdx
Path: app/platforms/konnaxion/ethikos/konsultations/page.mdx */}

# Konsultations

**Konsultations (Public Consultations & Feedback)** — sub-module under **ethiKos**.
Owns intake/discovery artifacts and **baseline ballot facts**. **Smart Vote** publishes outcomes as baseline + declared readings; **EkoH** may be referenced by lenses via snapshot ids.

## Contract (ethiKos v2)

- **Konsultations owns:** consultations, suggestions, ballot capture, impact tracking, and the baseline record.
- **Smart Vote owns:** computation + publication of outcomes as **readings** (baseline + lenses). It does not mutate consultation facts.
- **EkoH owns:** expertise/ethics context used by some lenses (bound via `ekoh_snapshot_id`).
- **Foreign tools (Annex):** may feed Konsultations via adapters (artifacts + projections), never by merging or writing core tables.

### **1) Functional Services (and expected files)**

Code-names map 1:1 to Django service modules; file names follow the `services/<code_name>.py` convention.

| Display name | Code name / service | Purpose / behavior | Likely file or module |
| Public Consultations | `public_consultation` | Create and run time-boxed civic consultations (setup, schedule, close). | `services/public_consultation.py` |
| Citizen Suggestions | `citizen_suggestion` | Intake pipeline for user-proposed ideas/amendments feeding into consultations. | `services/citizen_suggestion.py` |
| Smart Vote ballots + readings | `weighted_consultation_vote` | Cast ballots using Smart Vote modalities; publish baseline + optional declared readings (e.g., EkoH-sourced lens) while keeping baseline visible. | `services/weighted_consultation_vote.py` |
| Results Visualization | `consultation_result_visualization` | Compute/serve KPIs and breakdowns for dashboards. | `services/consultation_result_visualization.py` |
| Impact Tracking | `impact_tracking` | Log follow-up actions and implementation status for adopted proposals. | `services/impact_tracking.py` |

### **2) Backend functionalities**

* **Consultation lifecycle.** CRUD for consultations with scheduling (open/close) and status transitions; business rules on who can launch/manage, exposed via DRF.

* **Suggestion intake → consultation.** Users submit suggestions; moderators/owners triage and link them to an active consultation or backlog for future cycles.

* **Ballots + readings.** Store the **baseline ballot** (`raw_value`) and one or more **Smart Vote readings** computed from an explicit lens configuration.
If a reading uses EkoH, bind it to an **EkoH snapshot id** (auditable + reproducible).

* **Results & dashboards.** Persist snapshot JSONs for totals/segments (baseline + declared readings); serve aggregates to the UI and to the analytics pipeline.

* **Impact follow-through.** Record action items that implement approved proposals; status progression and audit trail.

Actual tables implemented for Konsultations.

| Table / Model | Purpose | Key fields |

**Recommended (non-breaking) additions** to support auditability of readings (if not already present elsewhere):
- `ConsultationVote.ekoh_snapshot_id` (or `weight_context_id`)
- `ConsultationVote.lens_hash` (stable hash of the lens declaration)
- `ConsultationResult.readings_index` (declares which readings are included + how to interpret them)

### **4) Supporting configuration (frozen)**

* **Ballot modalities** (available to consultations via Smart Vote): `approval`, `ranking`, `rating`, `preferential`.

* **Smart Vote thresholds** (used when labeling outcomes, platform-wide): e.g., `CONSENSUS_STRONG_THRESHOLD ≥ 75%` weighted agreement (for readings that use weighting).

* **Route invariants:** `/consult` namespace is owned by **ethiKos** (no other module may claim it).

### **5) Routes & ownership**

* **Primary UI:** `/consult` (**Consultation Hub**) with tabs **Live / Results / Suggest**.

* **Analytics:** `/ethikos/insights` for opinion analytics related to debates/consultations (read-only).

### **6) Integration points**

* **Smart Vote + EkoH.** Smart Vote is the voting/endorsement engine. EkoH is the expertise+ethics ledger that may be referenced by declared Smart Vote lenses to compute advisory readings.

* **Insights (ETL + dashboards).** Voting events flow to the analytics star schema via `etl_smart_vote` (every 10 min) and power `/reports/smart-vote`.

### **7) Realtime & ops**

* **Live updates:** Optional push of result deltas via Django Channels + Redis.

* **Caching:** Use Redis to cache popular result filters/segments to reduce recomputation.

**Summary**
Konsultations provides time-boxed consultations, suggestion intake, baseline ballot capture, and impact tracking. Outcome publication is handled by **Smart Vote** as baseline + declared readings (optionally bound to an **EkoH snapshot id** for auditability). Service code-names remain stable; routing stays fixed at `/consult`.
