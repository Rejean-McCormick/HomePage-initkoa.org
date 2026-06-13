# Konnaxion – Technical Architecture & Services

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services/index.html.md
> Route: /platforms/konnaxion/technical/konnaxion-technical-architecture-and-services
> Source: app\platforms\konnaxion\technical\konnaxion-technical-architecture-and-services\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services)

# Konnaxion – Technical Architecture & Services

This page collects the **technical details** of Konnaxion: service code names, core models, configuration parameters, routing invariants, Kristal distribution surfaces, activation rules, and cross-module infrastructure.

It complements:

* the repository README, which focuses on vision, purpose, and high-level modules
* the wiki hub page, which explains civic workflows and navigation
* the individual module pages — Knowledge, CertifiKation, Korum, Konsultations, Konservation, Kontact, Konstruct, Stockage, EkoH, Smart Vote — which describe each sub-module functionally
* the Kristal v5 technical docs, which define portable epistemic artifacts, Runtime Packs, reader policies, authority recognition, validation reports, and federation manifests

Use this page as the reference for development and integration work.

## 1. Platform overview

### 1.1 Konnaxion’s role in kOA

Konnaxion is the kOA platform layer for learning, deliberation, civic participation, collaboration, cultural preservation, project coordination, reputation, and decision support.

In the Kristal v5 architecture, Konnaxion also acts as a distribution and runtime surface for Kristal artifacts.

Konnaxion may:

* receive Working Artifacts and Reference Artifacts
* distribute Exchanges, shards, federation manifests, validation reports, authority registries, reader policies, and Runtime Packs
* enforce required integrity checks for activation
* expose reader-policy-selected views
* preserve labels for validation status, certainty, authority channel, recognition status, scope, dispute, mythology, fiction, and lineage
* support offline access through Runtime Packs
* cache, activate, roll back, and retire artifact versions without erasing history

Konnaxion does not decide universal truth. It distributes, activates, filters, renders, and preserves structured epistemic artifacts according to declared policies.

### 1.2 kOA module map

Konnaxion’s architecture is organized into six top-level modules:

* **KonnectED** – learning, knowledge, certification, and educational pathways
* **Ethikos** – structured debates, civic consultations, and public reasoning
* **Kreative** – culture, preservation, creative archives, and professional networks
* **keenKonnect** – project workspaces, versioned documents, and shared storage
* **Kollective Intelligence** – reputation, voting, scoring, and decision analytics
* **System / Core** – authentication, storage, search, analytics, Kristal integration, activation, verification, and operational services

Each kOA module is implemented as one or more Django apps with:

* **service code names** such as `multidimensional_scoring`, `public_consultation`, or `dynamic_weighted_vote`
* **OLTP models** for transactional platform state
* **configuration parameters** for thresholds, limits, schedules, and routes
* **optional Kristal integration points** for portable state, audit bundles, validated references, Runtime Packs, or exported civic memory

### 1.3 Shared technology stack

Across modules, the technical stack is consistent:

* **Backend:** Django + Django REST Framework
* **Realtime:** Django Channels with Redis (`channels_redis.core.RedisChannelLayer`)
* **Data store:** PostgreSQL with `tsvector` full-text search
* **Background tasks:** Celery for ETL, AI enrichment, packaging, score recomputation, validation tasks, and artifact preparation
* **Object storage:** `/app/media/`, typically backed by S3 or MinIO
* **Frontend:** reserved routes per module, such as `/learn`, `/certs`, `/ethikos/korum`, `/projects`, and `/kollective/konsensus`
* **Artifact layer:** Kristal v5 Exchanges, Runtime Packs, validation reports, reader policies, authority registries, shard manifests, and federation manifests where durable portable knowledge is required

## 2. Kristal v5 integration surface

### 2.1 Core integration model

Konnaxion participates in the Kristal v5 pipeline after structured knowledge has been compiled, validated, recognized, packaged, or prepared for runtime use.

The typical flow is:

Konnaxion is primarily responsible for the last stage:

* distribution
* verification
* activation
* caching
* rollback
* reader policy application
* runtime query surfaces
* user-facing presentation and navigation
* preserving provenance and status labels

### 2.2 Kristal artifact types handled by Konnaxion

Konnaxion may store, index, distribute, or activate the following Kristal v5 artifact types:

* `structured_epistemic_state`
* `working_exchange`
* `reference_exchange`
* `exchange_shard_manifest`
* `exchange_federation_manifest`
* `authority_registry`
* `authority_recognition`
* `validation_report`
* `transparency_log_entry`

Konnaxion should preserve artifact identity, content hashes, signatures, lineage, activation state, and reader policy references.

### 2.3 Artifact status handling

Konnaxion must not collapse all artifacts into one operational class.

Relevant artifact statuses include:

A working artifact may be visible in research, review, drafting, or internal collaboration surfaces.

A reference artifact may be used in stricter reader policies, public reference views, or curated civic memory surfaces.

A revoked artifact should remain auditable but should not be activated for normal reader-policy-selected use unless an explicit historical or audit workflow allows it.

### 2.4 Assertion labels preserved by Konnaxion

When Konnaxion exposes Kristal-derived content, it should preserve or make recoverable the following labels:

* `assertion_status`
* `validation_status`
* `certainty_level`
* `authority_channel`
* `recognition_status`
* `provenance_refs`
* `reader_policy_refs`
* `validation_refs`
* `authority_recognition_refs`

These labels matter because Kristal v5 separates:

Konnaxion user interfaces should not present scoped validation as universal agreement.

### 2.5 Reader policy support

Konnaxion reader surfaces may apply Kristal reader policies such as:

* `reference_only`
* `validated_only`
* `high_certainty_only`
* `all_with_labels`

A reader policy determines what the current user, group, tenant, public surface, or runtime context is allowed to see.

For example:

* a public education surface may use `reference_only`
* a research workspace may use `research`
* a cultural archive may use `creative`
* an internal review queue may use `all_with_labels`
* a civic report may use `validated_only`

A validated-only view does not mean all visible material is universally factual. It means all visible material satisfies that policy’s validation, authority, certainty, and scope filters.

### 2.6 Runtime Pack activation

Konnaxion can activate Runtime Packs for offline or service-backed query surfaces.

A Runtime Pack activation record should track:

* `runtime_pack_id`
* source Exchange or federation reference
* source artifact status
* reader policy references
* query contract reference
* activation environment
* tenant or audience scope
* activation timestamp
* previous active pack
* verification result
* rollback eligibility
* revocation status
* compatibility notes

Activation should be atomic: either the complete selected pack is active, or the previous known-good pack remains active.

### 2.7 Verification expectations

Before activating a Kristal artifact or Runtime Pack, Konnaxion should enforce required verification according to the declared policy.

Relevant checks may include:

* schema validity
* content hash verification
* signature verification
* authority registry lookup
* trust root match
* revocation check
* validation report availability
* reader policy availability
* runtime compatibility
* downgrade and rollback policy compatibility
* source artifact lineage check
* tenant and environment scope match

If a policy declares a check as required, Konnaxion should reject activation when the check fails or required evidence is missing.

### 2.8 Rollback and downgrade behavior

Konnaxion should support safe rollback by preserving previous active activation pointers and previously verified Runtime Packs.

Rollback should preserve:

* artifact identity
* activation reason
* actor or automation that performed the rollback
* timestamp
* previous active Runtime Pack
* new active Runtime Pack
* verification status
* reason code

Downgrade should be policy-gated. It should not silently activate an older artifact when that artifact is revoked, incompatible, superseded by policy, or outside the tenant/environment scope.

## 3. Cross-module infrastructure

### 3.1 Service code-name convention

Every sub-module defines named services that are stable integration points.

* Korum: `structured_debate`, `ai_clone_management`, `comparative_argument_analysis`, `public_debate_archive`, `automated_debate_summary`
* Smart Vote: `dynamic_weighted_vote`, `voting_modalities`, `emerging_expert_detection`, `vote_transparency`, `vote_result_visualization`, `cross_module_vote_integration`
* EkoH: `multidimensional_scoring`, `configuration_weights`, `contextual_analysis`, `privacy_settings`, `score_history`, `score_visualization`, `expertise_field_classification`
* Knowledge: `library_resource_management`, `personalized_recommendation`, `content_co_creation`, `thematic_forum`, `learning_progress_tracking`
* Kristal integration: `artifact_distribution`, `runtime_pack_activation`, `reader_policy_selection`, `authority_registry_resolution`, `validation_report_indexing`, `revocation_tracking`

Service code names map to service modules and are referenced by tasks, API endpoints, configuration, permissions, and audit logs.

### 3.2 Routing invariants

Top-level routes are owned by specific modules and treated as invariants.

Namespacing is enforced for consistency:

* `/certs` → KonnectED / CertifiKation
* `/ethikos/korum`, `/ethikos/insights` → Ethikos / Korum
* `/ethikos/consult` → Ethikos / Konsultations
* `/projects`, `/projects/[slug]` → keenKonnect / Konstruct + Stockage
* `/kollective/konsensus`, `/reports/smart-vote` → Kollective Intelligence / Smart Vote
* `/kristals`, `/kristals/[id]`, `/runtime-packs/[id]` → System / Kristal distribution surface, if enabled

No other module should claim these top-level paths without an explicit routing migration.

### 3.3 Storage and media

The shared media root is:

Storage is typically backed by S3 or MinIO.

File size and type constraints are fixed per context:

* Stockage / Konstruct:

* `MAX_BLUEPRINT_UPLOAD_MB = 150`
* Konservation:

* Kristal distribution:

* Runtime Packs should be content-addressed
* validation reports, authority registries, reader policies, and revocation artifacts should be stored as immutable or versioned records
* activation pointers should be mutable but auditable

### 3.4 Search

Knowledge and Stockage explicitly use PostgreSQL full-text search for library resources and documents.

Tags such as `Tag` and `ArtworkTag` provide a shared taxonomy layer across Kreative and keenKonnect.

Kristal-derived search indexes should preserve:

* source artifact identity
* assertion status
* validation status
* certainty level
* authority channel
* recognition status
* scope
* reader policy filterability

Search should not strip labels that determine whether a result is visible under a reader policy.

### 3.5 Realtime and background jobs

Django Channels + Redis power:

* live stance and result updates in Korum and Konsultations
* real-time tallies in Smart Vote
* project chat, notifications, and document events in Konstruct and Stockage
* collaboration rooms in Kontact
* optional activation status and validation status notifications for Kristal Runtime Packs

Celery tasks and schedules include:

* `etl_smart_vote` every 10 minutes, with approximately 5-year retention for facts
* periodic EkoH score recomputation and leaderboard refresh
* weekly offline packaging for Knowledge, such as `OFFLINE_PACKAGE_CRON = 0 3 * * SUN`
* image rendition, AI enrichment, and partner ingest for Konservation
* optional Runtime Pack import, verification, activation, revocation polling, and index materialization tasks for Kristal

## 4. Module-by-module technical summary

### 4.1 KonnectED

#### 4.1.1 Knowledge – Collaborative Learning Library

**Services**

* `library_resource_management` – CRUD and classify `KnowledgeResource`; enforce type enum
* `personalized_recommendation` – compute `KnowledgeRecommendation` per user
* `content_co_creation` – manage `CoCreationProject` and `CoCreationContribution` drafts
* `thematic_forum` – forums via `ForumTopic` and `ForumPost`
* `learning_progress_tracking` – track `LearningProgress` per user and resource

**Core models**

* `KnowledgeResource(id, title, type, url, author)`
* `KnowledgeRecommendation(user, resource, recommended_at)`
* `LearningProgress(user, resource, progress_percent)`
* `CoCreationProject`
* `CoCreationContribution`

**Key configuration**

* Content types: `article | video | lesson | quiz | dataset`
* `MAX_CONTRIBUTION_DRAFTS = 10` per user
* Search backend: `SEARCH_BACKEND = "postgres"`
* Offline packaging: `OFFLINE_PACKAGE_CRON = 0 3 * * SUN`

**Routes**

* `/learn` – catalog, recommendations, offline download
* `/course/[slug]` – course player, lessons, and progression

**Kristal integration**

Knowledge resources may be exported as Structured Epistemic States or packaged into Kristal artifacts when durable citation, reader-policy filtering, or offline reference use is required.

#### 4.1.2 CertifiKation – Skills & Certification

**Services**

* `certification_path_management` – manage `CertificationPath`
* `peer_validation` – handle `PeerValidation` decisions
* `skills_portfolio` – connect to `Portfolio` and core `Certificate` records
* `certification_interoperability` – manage `InteropMapping` with external LMS or registries

**Core models**

* `CertificationPath(id, name, description)`
* `PeerValidation(evaluation, peer, decision)`
* `Portfolio(user, title, description, items)`
* `InteropMapping(local_certification, external_system, external_id)`

**Key configuration**

* `QUIZ_RETRY_COOLDOWN_MIN = 30` minutes
* Routes reserved: `/certs`

**Kristal integration**

Certification evidence, peer validation, issued certificates, and skill pathways may be represented as scoped assertions with provenance, authority, certainty, and validation metadata.

### 4.2 Ethikos

#### 4.2.1 Korum – Structured Debates

**Services**

* `structured_debate`
* `ai_clone_management`
* `comparative_argument_analysis`
* `public_debate_archive`
* `automated_debate_summary`

**Core models**

* `EthikosCategory` – thematic categories
* `EthikosTopic` – debate topic or question
* `EthikosStance(topic, user, value -3…+3)`
* `EthikosArgument(topic, author, content, parent, side)`

**Key configuration**

* Stance scale: `-3 … +3`, where `0` is neutral
* Expert cohort quorum: `12` distinct experts, based on EkoH threshold
* Moderation auto-hide: `3` independent reports

**Routes**

* `/ethikos/korum` – Korum hub
* `/ethikos/insights` – opinion analytics dashboards

**Kristal integration**

Debate topics, stances, arguments, summaries, objections, and validated public positions may be compiled into Kristals as disputed or reviewed assertions, preserving source identity and disagreement.

#### 4.2.2 Konsultations – Public Consultations & Feedback

**Services**

* `public_consultation`
* `citizen_suggestion`
* `weighted_consultation_vote`
* `consultation_result_visualization`
* `impact_tracking`

**Core models**

* `Consultation(id, title, open_date, close_date, status)`
* `CitizenSuggestion(consultation, author, content)`
* `ConsultationVote(user, consultation, raw_value, weighted_value)`
* `ConsultationResult(consultation, results_data JSONB)`
* `ImpactTrack(consultation, action, status, date)`

**Key configuration**

* Ballot modalities: `approval | ranking | rating | preferential`
* Consensus threshold: `>= 75%` weighted agreement
* Route namespace: `/ethikos/consult`

**Routes**

* `/ethikos/consult` – consultation hub
* `/ethikos/insights` – shared with Korum analytics

**Kristal integration**

Consultation inputs, results, impact tracking, minority reports, and authority-recognized summaries may become Kristal artifacts for audit, public memory, and reader-policy-based civic reporting.

### 4.3 Kreative

#### 4.3.1 Konservation – Creative Content & Cultural Preservation

**Services**

* `digital_archive_management`
* `virtual_exhibition`
* `archive_documentation`
* `ai_enriched_catalogue`
* `cultural_partner_integration`

**Core models**

* `KreativeArtwork(id, artist, title, description, media_file, media_type, year, medium, style)`
* `TraditionEntry(title, description, region, media_file, approved, approved_by)`

**Key configuration**

* `VIRTUAL_GALLERY_CAPACITY = 24` artworks per room

**Routes**

* `/kreative` – Creativity hub
* `/archive` – Konservation archive and partners

**Kristal integration**

Cultural corpora, mythology, fictional worlds, creative archives, symbolic models, and partner archives may be represented as Kristals without being misrepresented as physical-world factual claims. Reader policies should preserve mythology, fiction, symbolic, and cultural-corpus labels.

#### 4.3.2 Kontact – Collaboration & Networking

**Services**

* `professional_profile`
* `intelligent_matching`
* `collaboration_workspace`
* `opportunity_announcement`
* `partner_recommendation`

**Core models**

* `CollabSession(id, name, host, session_type, started_at, ended_at, final_artwork)`
* reuses `KreativeArtwork`, `Tag`, and `ArtworkTag` for portfolios and tagging

**Key configuration**

* `COLLAB_CANVAS_MAX_USERS = 6`

**Routes**

* `/connect` – people, opportunities, collaboration workspace
* `/profile/[user]` – public profile and portfolio

**Kristal integration**

Collaboration outputs may be preserved as Working Artifacts, reviewed outputs, or Reference Artifacts depending on policy, provenance, and authority recognition.

### 4.4 keenKonnect

#### 4.4.1 Konstruct – Project Collaboration Spaces

**Services**

* `collaboration_space`
* `project_task_management`
* `real_time_document_editing`
* `integrated_communication`
* `ai_collaboration_analysis`

**Core models**

* `Project(id, title, description, creator, category, status)`
* `ProjectResource(project, title, url, added_by)`
* `ProjectTask(project, title, description, assignee, status, due_date)`
* `ProjectMessage(project, sender, content)`
* `ProjectTeam(project, user, role, joined_at)`
* `ProjectRating(project, user, rating, comment)`

**Key configuration**

* `MAX_BLUEPRINT_UPLOAD_MB = 150`
* `COLLAB_SPACE_MEMBER_CAP = 40`
* `VIDEO_SESSION_PROVIDER = "livekit"` via `KC_VIDEO_PROVIDER`

**Routes**

* `/projects` – Project Studio
* `/projects/[slug]` – workspace with overview, tasks, blueprints, chat, AI insights, and settings

**Kristal integration**

Project plans, decisions, design states, technical declarations, review bundles, and deliverables may be compiled into Kristal artifacts for auditability, reuse, or governance.

#### 4.4.2 Stockage – Secure Repository & Versioned Storage

**Services**

* `secure_document_storage`
* `document_versioning`
* `intelligent_indexing`
* `granular_permissions`

**Core models**

* `ProjectResource`

**Key configuration**

* `MAX_BLUEPRINT_UPLOAD_MB = 150`
* realtime layer: `channels_redis.core.RedisChannelLayer`

**Routes**

* exposed inside `/projects/[slug]` as the Blueprints tab

**Kristal integration**

Stockage can store Kristal artifacts and their related evidence, validation reports, signatures, Runtime Packs, and activation records. It should preserve immutable artifact records separately from mutable activation pointers.

### 4.5 Kollective Intelligence

#### 4.5.1 EkoH – Reputation & Expertise

**Services**

* `multidimensional_scoring`
* `configuration_weights`
* `contextual_analysis`
* `privacy_settings`
* `score_visualization`
* `expertise_field_classification`

**Core models**

* `UserExpertiseScore(user, category, raw_score, weighted_score)`
* `UserEthicsScore(user, ethical_score)`
* `ScoreConfiguration(weight_name, weight_value, field)`
* `ContextAnalysisLog(entity_type, entity_id, field, input_metadata, adjustments_applied)`
* `ConfidentialitySetting(user, level)`
* `ScoreHistory(merit_score, old_value, new_value, change_reason)`

**Key configuration**

* Axis weights:

* Ethical multiplier bounds:

* `EXPERTISE_DOMAIN_CHOICES`: 26 ISO-based domains

**Runtime**

Periodic recomputation runs through Celery Beat. Optional realtime pushes of score and leaderboard deltas can use Channels + Redis.

**Kristal integration**

EkoH scores may inform reader policy, weighting, cohort selection, or consultation analysis. They should not be treated as universal authority. When exported into Kristal artifacts, their scope, calculation policy, provenance, and uncertainty should remain explicit.

#### 4.5.2 Smart Vote – Weighted Voting System

**Services**

* `dynamic_weighted_vote`
* `voting_modalities`
* `emerging_expert_detection`
* `vote_transparency`
* `vote_result_visualization`
* `cross_module_vote_integration`

**Core models**

* `Vote(user, target_type, target_id, raw_value, weighted_value)`
* `VoteModality(name, parameters JSON)`
* `EmergingExpert(user, detection_date, score_delta)`
* `VoteResult(target_type, target_id, sum_weighted_value, vote_count)`
* `IntegrationMapping(module_name, context_type, mapping_details)`

**Key configuration**

* Modalities: `approval | ranking | rating | preferential`
* Emerging expert threshold: `+15%` EkoH delta over 30 days
* Strong consensus threshold: `>= 75%` weighted agreement

**Runtime and analytics**

* realtime results through Channels + Redis
* ETL `etl_smart_vote` every 10 minutes into `smart_vote_fact`
* 5-year retention for decision facts
* UI routes:

* `/kollective/konsensus`
* `/reports/smart-vote`

**Kristal integration**

Vote results, ballots, thresholds, weighting policies, minority positions, and final decision summaries may become Kristal assertions or validation evidence. Konnaxion should preserve raw and weighted values separately where both matter.

## 5. Data flows and integration

### 5.1 Reputation-weighted voting

EkoH computes per-user, per-domain expertise and ethics scores with configurable weights and bounds.

Smart Vote reads those scores to weight `Vote` records via `dynamic_weighted_vote`, adjusting tallies per modality.

Korum and Konsultations integrate with Smart Vote to obtain EkoH-weighted stances and ballots:

* Korum aggregates `EthikosStance` using EkoH to compute expert cohort views
* Konsultations uses `weighted_consultation_vote` to store raw and weighted values per ballot

When these outputs are persisted as Kristal artifacts, the weighting policy and scope should remain visible.

### 5.2 Projects and documents

Konstruct manages projects, tasks, chat, and ratings through `Project*` models.

Stockage attaches documents and blueprints as `ProjectResource` records and handles versioning, indexing, and sync.

Realtime events are emitted through Channels + Redis to subscribed project workspaces.

Project outputs that need long-term portability, audit, external review, or public distribution can be compiled into Kristal Working Artifacts or Reference Artifacts.

### 5.3 Culture, archives, and networks

Konservation’s `KreativeArtwork`, `Gallery`, and `TraditionEntry` models store creative and heritage outputs with tag-based discovery.

Kontact reuses those artifacts and tags for profiles and matching, and stores collaboration sessions in `CollabSession`.

AI enrichment and partner ingest tasks update the archive and related metadata in the background.

When exported into Kristal artifacts, mythology, fiction, symbolic models, artistic works, heritage records, and cultural corpora should keep their validated-as mode explicit.

### 5.4 Learning and certification

Knowledge hosts resources, forums, and co-creation spaces, and tracks progression per user/resource.

CertifiKation uses `CertificationPath`, `Evaluation`, and `PeerValidation` to issue `Certificate` records and fill user portfolios.

These activities may feed EkoH through `multidimensional_scoring` as part of the platform-wide reputation engine.

When exported into Kristal artifacts, certificates and learning records should preserve issuing authority, evidence references, validation policy, recognition status, scope, and revocation status.

### 5.5 Kristal distribution and activation

A typical Konnaxion Kristal distribution flow is:

This flow supports public reference surfaces, research workspaces, civic archives, offline learning bundles, and local governance deployments.

## 6. Analytics and insights

Smart Vote ETL is the central pipeline for decision analytics, aggregating changes from OLTP into a fact table with 5-year retention.

Ethikos exposes `/ethikos/insights` to visualize debate stances and consultation outcomes, consuming Smart Vote facts and Korum / Konsultations data.

EkoH retains an audit trail through `ScoreHistory` and `ContextAnalysisLog`, enabling longitudinal analysis of reputation evolution.

Kristal-derived analytics should retain the reader policy and source artifact context used to produce a displayed view. Analytics should not mix results from incompatible reader policies without making that visible.

## 7. Contribution guidelines and invariants

When extending or integrating with Konnaxion, respect these invariants.

### 7.1 Route ownership

Do not change top-level route ownership without updating all dependent modules:

* `/ethikos/consult`
* `/kollective/konsensus`
* `/reports/smart-vote`
* `/kristals`, if enabled
* `/runtime-packs`, if enabled

### 7.2 Service code names

Preserve service code names such as:

* `dynamic_weighted_vote`
* `multidimensional_scoring`
* `structured_debate`
* `public_consultation`
* `runtime_pack_activation`
* `reader_policy_selection`
* `authority_registry_resolution`

Treat them as public, versioned integration points.

### 7.3 Configuration values

Respect declared parameter values when relying on thresholds, caps, retention windows, or schedule timings.

When adding new parameters, document:

* scope
* environment override
* migration impact
* compatibility impact
* whether the parameter affects artifact identity, reader policy, or runtime behavior

### 7.4 Shared infrastructure

Reuse shared infrastructure where possible:

* Channels + Redis
* Celery
* PostgreSQL full-text search
* artifact storage
* structured logs
* activation records
* validation report indexes

### 7.5 Kristal label preservation

Any Konnaxion feature that imports, indexes, renders, or exports Kristal content should preserve labels for:

* assertion status
* validation status
* certainty level
* validated-as mode
* authority channel
* recognition status
* scope
* provenance
* evidence
* lineage
* reader policy

Do not flatten these labels into a single confidence score or a single “accepted” state.

## 8. Operational logging fields

Konnaxion services should use structured logs and include relevant identifiers.

Minimum common fields:

* `user_id`, where allowed
* `correlation_id`

For Kristal-specific events, also include:

* `runtime_pack_id`
* `reader_policy_id`
* `authority_channel_id`
* `validation_report_id`
* `source_artifact_status`
* `activation_status`

## 9. Summary

Konnaxion is the kOA platform surface where civic learning, debate, consultation, collaboration, culture, voting, and reputation meet operational distribution.

In the Kristal v5 ecosystem, Konnaxion is also the layer that makes structured epistemic artifacts usable:

* it receives them
* verifies them
* activates them
* caches them
* rolls them back when needed
* applies reader policies
* exposes selected views
* preserves status, certainty, authority, scope, validation, and lineage labels

This page, together with the module-specific entries, provides the technical context needed to navigate, extend, and integrate the Konnaxion codebase.
