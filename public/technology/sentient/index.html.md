# SenTient

> Canonical HTML: https://initkoa.org/technology/sentient
> Markdown mirror: https://initkoa.org/technology/sentient/index.html.md
> Route: /technology/sentient
> Source: app\technology\sentient\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/technology/sentient)

# SenTient

## Semantic Entity Intelligent Transformation

**Version:** 1.0.0-RC2
**Status:** Production Ready — Hybrid Resolution Architecture

## 1. Executive Summary

**SenTient** is the semantic resolution and transformation engine of the Koa ecosystem.

Its role is to bridge messy, ambiguous, multilingual, or semi-structured inputs with structured epistemic artifacts that can later be compiled, validated, federated, queried, and rendered.

SenTient does not decide universal truth.

SenTient helps transform signals into structured candidates, preserve ambiguity when resolution is uncertain, and prepare material for Kristal-compatible epistemic compilation.

In the Kristal v5 model, SenTient may contribute to:

* entity reconciliation;
* relation extraction;
* predicate resolution;
* ambiguity preservation;
* evidence linking;
* confidence scoring;
* normalization;
* candidate ranking;
* projection into **Structured Epistemic State**;
* optional Claim-IR or Resolved Claim-IR profiles when an extractor pipeline uses them.

Claim-IR is not the universal required boundary in Kristal v5. It remains a useful extractor and resolver profile. The normative Kristal v5 input unit is the **Structured Epistemic State**.

## 2. Core Philosophy

SenTient is built as a **Hybrid Orchestration System**.

It combines three technological lineages into a single funnel:

* **Speed:** fast lexical tagging and candidate discovery;
* **Semantics:** contextual NLP, embeddings, and disambiguation;
* **Structure:** durable state, reviewability, traceability, and export into structured epistemic forms.

The goal is not to force every input into a single answer.

The goal is to produce structured, inspectable, traceable candidate states that preserve enough metadata for downstream validation, authority recognition, federation, and reader policy.

## 3. SenTient in the Kristal v5 Pipeline

SenTient sits before or beside Kristal compilation.

A typical v5 flow is:

SenTient may output:

* candidate entities;
* candidate predicates;
* candidate object values;
* evidence spans;
* confidence scores;
* ambiguity markers;
* warnings;
* unresolved candidates;
* provenance references;
* projection-ready assertions.

SenTient should not silently convert ambiguity into fact.

If a surface form such as “Paris” may refer to multiple entities, SenTient should either resolve it with sufficient confidence or preserve the ambiguity explicitly.

## 4. Architectural Overview

SenTient uses a three-layer funnel.

The funnel is broad and fast at the top, then narrower and more precise at the bottom.

The unit of work is the **SmartCell**, a structured working object that carries raw value, candidates, scores, evidence, status, and resolution metadata across the pipeline.

## 5. Layer 1: Ingestion and Fast Tagging

### Component

### Role

Layer 1 performs high-speed identification of surface forms and candidate entities.

It is optimized for breadth and latency, not final judgment.

### Responsibilities

* normalize raw text;
* detect possible entity mentions;
* deduplicate repeated values;
* retrieve candidate entities;
* apply coarse pruning;

### Target behavior

Layer 1 should be fast enough for interactive workflows.

A target latency budget is:

### Process flow

1. **Normalization and fingerprinting**

Java performs client-side deduplication using a key-collision fingerprint strategy:

This minimizes repeated index calls.

2. **Fast candidate discovery**

Normalized text is passed to a tagging index, such as a Solr TaggerHandler backed by finite-state or equivalent lookup structures.

3. **Initial pruning**

Candidates may be pruned using:

* popularity score;
* stop-word filters;
* language constraints;
* domain constraints;
* reader or project context;
* scope hints.

Layer 1 does not validate claims. It only proposes candidates.

## 6. Layer 2: Semantic Resolution

### Component

### Role

Layer 2 performs contextual disambiguation and semantic scoring.

It is responsible for cases where surface-form matching is insufficient.

* “Paris” as Paris, France;
* “Paris” as Paris, Texas;
* “Paris” as a mythological figure;
* “Apple” as a company, fruit, label, or local project name.

### Responsibilities

* analyze context windows;
* generate n-grams;
* remove low-signal terms;
* rank entity candidates;
* rank predicate candidates;
* score semantic compatibility;
* detect ambiguity;
* preserve unresolved states when confidence is insufficient.

### Target behavior

A typical target latency budget is:

This may vary depending on model, hardware, index size, and batch structure.

### Process flow

1. **Preprocessing**

The Falcon layer cleans the signal using stopword pruning, language-specific normalization, and n-gram generation.

2. **Predicate extraction**

SenTient searches candidate predicates, such as Wikidata or Wikibase properties, and estimates which relation best matches the local context.

3. **Vector scoring**

The context window is encoded into a vector representation.

Candidate descriptions or labels are compared using similarity metrics such as cosine similarity.

4. **Candidate ranking**

Entity, predicate, and object candidates are ranked using a combination of:

* lexical match;
* context match;
* popularity or usage score;
* property compatibility;
* type compatibility;
* project-specific authority hints;
* prior known mappings.

5. **Ambiguity preservation**

If the top candidate does not satisfy the active threshold or margin policy, SenTient must preserve ambiguity rather than silently choosing a candidate.

## 7. Layer 3: Core Orchestrator

### Component

### Role

Layer 3 performs final orchestration, state management, asynchronous processing, and export preparation.

It does not turn unresolved claims into validated facts.

It decides whether a working value is:

* unresolved;
* ambiguous;
* resolved;
* matched;
* blocked;
* ready for review;
* ready for projection;

### Responsibilities

* run long-running reconciliation jobs;
* manage state transitions;
* normalize scores;
* preserve evidence and provenance;
* persist heavy payloads;
* expose progress to the frontend;
* serialize project state;
* generate projection-ready output.

### Process flow

1. **Async management**

The frontend triggers a command, such as:

The Java core launches a non-blocking long-running process.

The frontend polls progress.

2. **Consensus scoring**

Scores from lexical, semantic, and structural layers are normalized and combined.

A typical scoring model may include:

* lexical similarity;
* candidate popularity;
* semantic context score;
* predicate compatibility;
* string distance;
* type compatibility;
* evidence quality;

3. **Data offload**

Heavy payloads such as embeddings, candidate lists, and score traces may be persisted to a sidecar store such as DuckDB.

Lightweight lifecycle state remains in memory for fast interaction.

4. **History and serialization**

Every data modification should be transaction-like and replayable.

This supports crash recovery, auditability, and reproducibility.

## 8. SmartCell Protocol

The **SmartCell** is the working data contract used across SenTient’s reconciliation pipeline.

It carries raw input, resolution candidates, state, scoring metadata, evidence references, and projection status.

### Core fields

| Logical Field | Type | Description | |
| `raw_value` | `string` | Original user input. It must remain unchanged. | |
| `consensus_score` | `number` | Final calculated confidence score from 0.0 to 1.0. | |
| `match` | `object | null` | The selected candidate if resolved. |
| `candidates` | `array` | Candidate entities, predicates, or object values. | |
| `evidence_refs` | `array` | Evidence pointers, source spans, quotes, or locator references. | |
| `warnings` | `array` | Warnings such as ambiguity, weak evidence, or threshold failure. | |
| `projection_status` | `enum` | Whether the cell can be projected into a Structured Epistemic State. | |

### Candidate telemetry

A candidate may contain a `features` object used for visualization and debugging.

Example features:

* `predicate_compatibility`;
* `levenshtein_distance`;
* `authority_hint`.

These features support transparent scoring and review.

## 9. Projection into Kristal v5

SenTient output may be projected into a Kristal v5 **Structured Epistemic State**.

Projection should preserve:

* raw surface form;
* selected entity, predicate, and object;
* candidate alternatives;
* confidence score;
* evidence references;
* source references;
* ambiguity markers;
* assertion status;
* certainty level;
* validation status;
* provenance;
* warnings and errors.

### Projection statuses

SenTient should distinguish:

| Status | Meaning |
| `projectable` | The item is resolved enough to be projected into a Structured Epistemic State. |
| `requires_review` | The item is retained but should not be projected as a resolved assertion without review. |
| `ambiguous` | Multiple plausible candidates remain. |
| `blocked` | The item violates a policy or lacks required structure. |
| `not_applicable` | The item is not a claim-like assertion. |

### Important rule

A SenTient-resolved claim is not automatically a validated Kristal claim.

Resolution means the pipeline has identified likely structured references.

Validation requires a declared validation policy, scope, evidence, and authority channel.

## 10. Claim-IR and Resolved Claim-IR

SenTient may use **Claim-IR** and **Resolved Claim-IR** as intermediate profiles.

In Kristal v5:

* Claim-IR is useful for extraction workflows;
* Resolved Claim-IR is useful for reconciliation workflows;
* neither is the universal mandatory input boundary;
* both may project into Structured Epistemic State;
* ambiguity must remain explicit when unresolved.

This allows SenTient to serve both:

* lightweight extraction workflows;
* full Kristal v5 epistemic compilation workflows.

## 11. QA, Validation, and Benchmarking

SenTient QA measures whether the resolver improves over time and whether outputs remain structurally safe for downstream use.

QA does not replace Kristal validation.

SenTient QA asks:

* Did the resolver select the right entity?
* Did it preserve ambiguity when required?
* Did it avoid unsupported assertions?
* Did it preserve provenance?
* Did it produce projection-ready structure?
* Did latency remain within operational targets?

Kristal validation asks:

* Is the assertion validated under a declared policy?
* Which authority channel recognizes it?
* What certainty level applies?
* What is it validated as?
* What scope applies?
* Which evidence and provenance support the status?

## 12. Scrutinizers

Scrutinizers are runtime validation rules for working data.

### Integrity scrutinizers

Block export or projection when the internal structure is logically corrupt.

* matched cell has no entity ID;
* chosen predicate is missing;
* evidence reference is malformed;
* object datatype cannot be normalized.

### Constraint scrutinizers

Detect Wikidata/Wikibase or project-specific violations.

* single-value constraint conflict;
* invalid property for entity type;
* impossible datatype;
* missing qualifier.

### Consensus scrutinizers

Detect statistical anomalies in scores.

* high popularity but weak context score;
* high lexical match but wrong type;
* selected predicate conflicts with context;
* ambiguous candidates too close in score.

Scrutinizers may block export, warn, or require review depending on policy.

## 13. Golden Standard Datasets

Accuracy may be measured against benchmark datasets and project-specific gold datasets.

Common external benchmarks include:

* **LC-QuAD 2.0** for complex relation extraction;
* **SimpleQuestions** for simple entity spotting and relation tasks;
* **WebQSP** for ambiguous surface forms and question-to-graph grounding.

Project-specific gold datasets should also be maintained because public benchmarks rarely capture local authority rules, domain terminology, or project-specific ambiguity.

## 14. Benchmarking Targets

The `evaluate_falcon_api.py` script may run the full pipeline.

Example operational targets:

| Metric | Target | Acceptable Range |
| Precision | 0.85 | > 0.80 |
| Latency p95 | 200ms | < 500ms |

### Deployment rule

If precision drops by more than 2% after a model, index, or scoring update, deployment should be rejected or held for review.

If ambiguity preservation drops significantly, deployment should also be held.

A system that becomes more confident by silently choosing ambiguous matches is not improving.

## 15. Wiring and Configuration

### Network topology

All local development services should bind to:

Example port map:

| Service | Port | Protocol | Notes |
| Java Core | `3333` | HTTP/1.1 | Orchestration API |
| Falcon Python Service | `5005` | HTTP/1.1 | Semantic scoring and NLP |
| Solr / Tapioca-style Index | `8983` | HTTP/2 or HTTP/1.1 | Candidate tagging |
| ElasticSearch | `9200` | HTTP/TCP | Candidate and property lookup |
| DuckDB Sidecar | local file | embedded | Heavy payload and batch storage |

### Configuration

Central configuration may live under:

Additional configuration may include:

## 16. Security and Privacy

SenTient may process sensitive text.

Deployments should consider:

* local-only service binding;
* tenant isolation;
* data minimization;
* redaction before indexing;
* audit logs;
* encryption at rest for sidecar stores;
* model input logging policy;
* deletion policy;
* source licensing;
* evidence retention rules.

A resolver should not leak one tenant’s context into another tenant’s scoring or candidate history.

## 17. Relationship to Koa Ecosystem Components

### Kristal

Kristal compiles Structured Epistemic States into portable, verifiable epistemic artifacts.

SenTient helps produce and resolve structured candidates before Kristal compilation.

### Orgo

Orgo coordinates workflow, intake, review routing, approvals, audit, lifecycle control, and operational governance.

SenTient may be called by Orgo during ingestion, review, or correction workflows.

### Konnaxion

Konnaxion handles distribution, offline access, Runtime Pack activation, caching, rollback, and reader surfaces.

SenTient may support Konnaxion search, semantic enrichment, and user-facing reconciliation flows.

### Architect

Architect renders outputs deterministically from Kristal query results under reader policy.

SenTient may provide the semantic structure that later makes Architect rendering traceable and label-preserving.

## 18. Conformance Expectations

A SenTient-compatible implementation should:

* preserve raw values;
* preserve candidate alternatives;
* preserve ambiguity when thresholds are not met;
* expose scoring features for review;
* preserve evidence and provenance references;
* distinguish resolution from validation;
* support projection into Structured Epistemic State;
* avoid silently upgrading sourced or resolved material into validated claims;
* support deterministic or reproducible resolution where the declared profile requires it;
* produce warnings when projection requires review.

## 19. Summary

SenTient is the semantic resolution layer that helps transform messy inputs into structured, reviewable, ambiguity-aware epistemic material.

It does not replace Kristal validation.

It prepares material so Kristal can compile, validate, federate, distribute, query, and render epistemic artifacts while preserving provenance, certainty, authority, scope, and reader policy.
