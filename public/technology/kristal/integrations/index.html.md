# Kristal — Integrations

> Canonical HTML: https://initkoa.org/technology/kristal/integrations
> Markdown mirror: https://initkoa.org/technology/kristal/integrations/index.html.md
> Route: /technology/kristal/integrations
> Source: app\technology\kristal\integrations\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/technology/kristal/integrations)

"How Kristals plug into the kOA ecosystem as portable epistemic artifacts with explicit provenance, scope, certainty, authority, validation, and reader-policy labels.",

# Kristal — Integrations

Kristals are not a product feature. They are **shared epistemic substrate**: portable, verifiable knowledge artifacts that other parts of the ecosystem can reference, query, render, distribute, and audit.

A Kristal is not a magic truth object. It is a structured artifact that preserves:

* what is asserted,
* who or what supports it,
* what scope it applies to,
* how certain it is,
* which authority channel recognizes it,
* how it was validated,
* and which reader policy makes it visible.

This page explains **where Kristals show up** in the kOA ecosystem and **what they enable**.

## The integration rule of thumb

A system should use a Kristal when it needs a **portable epistemic reference**:

* a shared base of definitions, assertions, sources, and scopes,
* a verifiable record of what was available at a given time,
* an offline-capable knowledge bundle,
* a durable anchor for audit and accountability,
* or a structured corpus that can be filtered by reader policy.

Kristals do not remove disagreement.

They make disagreement **structured, traceable, scoped, and inspectable**.

## Integration patterns

### 1) Kristal as a reference packet

Use when an action, decision, document, or workflow needs to point to a stable knowledge artifact.

Typical outputs:

* civic dossiers,
* research packets,
* curricula,
* policy bundles,
* case files,
* project briefs,
* operational playbooks.

The point is not to say “this is universally true.”

The point is to say:

> This is the artifact, with this scope, this provenance, this validation status, this certainty level, and this authority context.

### 2) Kristal as an offline pack

Use when knowledge must remain available without always-on infrastructure:

* fieldwork,
* crisis response,
* constrained institutions,
* low-connectivity environments,
* edge deployments,
* local-first civic systems.

A Runtime Pack can make Kristal material queryable offline while preserving source artifact status, validation labels, certainty labels, authority labels, scope, and lineage.

### 3) Kristal as institutional memory

Use when the key requirement is auditability over time:

* What did we rely on?
* Which artifact version was used?
* Which authority channel recognized it?
* What was validated, disputed, rejected, or still under review?
* What changed between versions?
* Which reader policy made this material visible?

Kristals let future reviewers reconstruct not only the content, but also the epistemic state around the content.

### 4) Kristal as a reader-policy surface

Use when different audiences need different views of the same underlying material.

For example:

* public users may see only reference material,
* researchers may see hypotheses and disputed material with labels,
* creative users may see fictional or mythological corpora,
* institutional users may require specific authority channels,
* local users may prioritize local community archives.

The artifact can contain more than a reader is allowed to see.

Reader policy controls visibility.

### 5) Kristal as a federation layer

Use when multiple organizations, communities, or authorities need to contribute to the same broad knowledge space without erasing disagreement.

A federation can preserve:

* source shard identity,
* authority channel,
* validation status,
* certainty level,
* validated-as mode,
* scope,
* provenance,
* conflicts and disagreements.

Federation does not flatten everything into one voice.

It makes plural authority usable.

## Where Kristals integrate in kOA

### Konnaxion — public knowledge, distribution, and legitimacy

Kristals appear as:

* published epistemic artifacts,
* civic dossiers that deliberation can reference,
* structured learning content,
* public documentation,
* offline Runtime Packs,
* reader-policy-selected public views.

**Outcome:** deliberation becomes more grounded and more contestable because users can inspect the artifact, its sources, its authority context, its scope, and the policy that made it visible.

### Orgo — execution, workflow, and continuity

Kristals appear as:

* the context bundle attached to a case or workflow,
* requirements and constraints for operational execution,
* definitions and decision premises,
* evidence and provenance packets,
* repeatable playbooks,
* accountability anchors for reviews and post-mortems.

**Outcome:** work is executed with shared context, and later reviews can reconstruct what was known, assumed, validated, disputed, or excluded.

### SenTient — extraction, resolution, and ambiguity preservation

Kristals appear as:

* structured epistemic states produced from extraction or resolution workflows,
* disambiguated entities and properties,
* normalized claims,
* candidate resolutions,
* unresolved ambiguity that must remain visible until policy or review resolves it.

**Outcome:** extracted knowledge can enter the Kristal pipeline without pretending every claim is already validated or unambiguous.

SenTient may help produce or refine Structured Epistemic States, but Claim-IR is not the universal input boundary for Kristal v5.

### Architect — deterministic rendering

Kristals appear as:

* source artifacts for generated pages,
* traceable summaries,
* explainable cards,
* articles,
* reports,
* multilingual renderings,
* public or private views selected by reader policy.

**Outcome:** rendered content can remain deterministic and traceable. Architect should not invent facts or flatten labels. A rendered statement should never appear more certain, more validated, more recognized, or more universal than the Kristal input and reader policy support.

### Ariane — semantic navigation and assistance

Kristals appear as:

* stable meaning layers,
* definitions,
* entities,
* structured descriptions,
* domain packets,
* queryable context surfaces.

**Outcome:** assistance becomes more explainable and reproducible because it can point back to portable, verifiable epistemic artifacts instead of relying only on transient model context.

### Deterministic decision workflows

Kristals appear as:

* reference packets for a decision,
* scoped inputs and constraints,
* versioned evidence bundles,
* authority-recognized positions,
* audit trails for what was considered,
* reader-policy-selected views for different participants.

**Outcome:** decisions can be audited and challenged without collapsing into semantic chaos.

The decision can be disputed, but the artifact trail remains inspectable.

## Typical lifecycle

1. **Represent**
Material is structured as a Structured Epistemic State or projected into one from another ingestion surface.

2. **Compile**
The state is compiled into a Working Artifact.

3. **Validate**
Assertions, artifacts, shards, datasets, or policies are evaluated under declared validation policies.

4. **Recognize**
Authority channels may recognize artifacts or assertions for declared scopes.

5. **Distribute**
Artifacts, shards, federations, and Runtime Packs are published, cached, mirrored, or carried offline.

6. **Consume**
Platforms reference, query, render, or activate artifacts under reader policy.

7. **Update**
New versions, shards, validation reports, authority recognitions, or reader policies are published.

8. **Compare**
Users can inspect what changed, why, who recognized it, and which policy affects visibility.

## What a good integration exposes

When someone opens a dossier, case, curriculum, workflow, decision, or public knowledge page, they should be able to inspect:

* which Kristal artifacts are referenced,
* which version or content hash was used,
* who published or signed them,
* which authority channels recognize them,
* what scope they cover,
* what certainty levels apply,
* which validation statuses apply,
* what material is disputed or excluded,
* which reader policy selected the visible view,
* and how to contest, replace, fork, or update the reference.

If users cannot inspect or contest the knowledge base, the integration is incomplete.

## Examples

### Example A — civic project dossier

A city project page references:

* a project facts Kristal,
* a community feedback Kristal,
* a constraints and budget Kristal,
* a validation report,
* and a reader policy for the public view.

Discussions remain grounded because participants can inspect what the dossier uses, which sources support it, and which parts are disputed or scoped.

### Example B — operational incident response

A team uses an offline Runtime Pack during an outage:

* procedures remain accessible,
* definitions remain stable,
* decisions reference the same artifact version,
* actions remain traceable after recovery.

The pack does not need live infrastructure to preserve operational context.

### Example C — education module packet

A curriculum is shipped as Kristals:

* concepts are structured,
* learning outcomes are explicit,
* local adaptations can be tracked,
* versions are comparable,
* authority-recognized material can be separated from local notes or experimental content.

A reader policy can expose only validated educational reference content to students while allowing researchers or curriculum designers to inspect broader material.

### Example D — plural authority federation

A public issue has material from:

* an intergovernmental organization,
* a local community archive,
* an independent research collective,
* a cultural heritage archive,
* and a technical publisher.

A federation can preserve all of these channels without pretending they have the same scope, certainty, or authority.

Different reader policies can then expose different views.

## What Kristal integration should avoid

A Kristal integration should not:

* present scoped validation as universal truth,
* hide uncertainty or disagreement,
* erase the authority channel behind a claim,
* merge incompatible claims without labels,
* treat a technical signature as epistemic authority,
* expose material without applying the active reader policy,
* strip provenance or lineage from rendered output,
* confuse a Working Artifact with a Reference Artifact.

## Next pages

* **Trust & provenance:** how authority, validation, certainty, and contestability work.
* **Distribution & versioning:** how Kristals evolve without breaking auditability.
* **Portability & offline:** what offline-capable Kristal operation means in practice.
