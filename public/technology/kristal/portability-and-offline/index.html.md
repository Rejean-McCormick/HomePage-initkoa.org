# Portability & Offline

> Canonical HTML: https://initkoa.org/technology/kristal/portability-and-offline
> Markdown mirror: https://initkoa.org/technology/kristal/portability-and-offline/index.html.md
> Route: /technology/kristal/portability-and-offline
> Source: app\technology\kristal\portability-and-offline\page.mdx
> Generated: 2026-06-12T23:26:14.521Z

[Open the HTML page](https://initkoa.org/technology/kristal/portability-and-offline)

'How Kristals stay usable under weak networks: portable epistemic artifacts, offline runtime packs, verifiable provenance, integrity checks, and explicit reader-policy labels.',

# Portability & Offline

A Kristal is designed to **travel**, to remain **verifiable**, and to keep working under degraded conditions.

That means two things:

1. **Portability:** the artifact can move between systems, teams, places, and runtimes without losing identity, provenance, or integrity.
2. **Offline capability:** readers can browse, query, inspect, and use packaged knowledge even when the network is weak—or absent.

Offline use does not mean blind trust. It means the artifact carries enough structure for local verification, explicit status labels, and reader-policy-controlled visibility.

## What “portable” means in practice

A Kristal can be copied, mirrored, archived, shared, or carried into another environment. It does not depend on one
central server to remain meaningful.

When you receive a Kristal from somewhere else, you can verify its identity, hashes, signatures, provenance, and
declared source references locally before relying on it.

## What travels with the artifact

A portable Kristal is not just a data dump. It preserves the labels needed to understand what the information is and how it should be read.

A Kristal may carry:

* source and lineage references;
* assertion status;
* certainty levels;
* validation status;
* authority-channel recognition;
* scope and domain labels;
* evidence and provenance references;
* reader-policy references;

This is what makes the artifact portable without flattening everything into a single “truth” label.

## Offline capability: what users actually get

Offline does not mean “no functionality.” It means the core functions continue to work without network dependency.

<li><strong>Browse and search</strong> packaged knowledge locally.</li>
<li><strong>Inspect provenance and evidence</strong> that are included with the artifact or Runtime Pack.</li>
<li><strong>Use stable references</strong> such as IDs, versions, hashes, and source pointers.</li>
<li><strong>Preserve labels</strong> for validation, certainty, authority, scope, and reader policy.</li>
<li><strong>Defer network operations</strong> such as updates, federation, publishing, or external synchronization until connectivity returns.</li>

## Exchange artifacts and Runtime Packs

To make offline use practical, Kristal separates compiled artifacts from runtime-optimized packages.

* **Exchange artifact:** the compiled Kristal artifact. It preserves structured epistemic content, provenance, status labels, validation references, authority references, and lineage.
* **Runtime Pack:** a local, read-optimized bundle derived from an Exchange or federation. It is built for browsing, querying, caching, offline use, and controlled activation.

A Runtime Pack must not erase the meaning of the source artifact. It should preserve the labels needed by reader policies: assertion status, certainty level, validation status, authority channel, recognition status, scope, provenance, and lineage.

## Reader policy still applies offline

Offline access does not mean all packaged material becomes visible by default.

A reader policy may expose only:

* reference material;
* validated material;
* high-certainty material;
* research material;
* fictional, mythological, or symbolic corpora;
* all material with labels;
* a custom view.

For example, a `validated_only` reader policy does not mean every visible assertion is universally true. It means every visible assertion satisfies that policy’s validation, authority, certainty, and scope filters.

A Runtime Pack should therefore preserve enough metadata for the local reader to know:

* validated as what;
* under which authority channel;
* with what certainty;
* for which scope;
* under which reader policy.

## Integrity-aware degraded mode

Offline systems can be dangerous if they silently drift into unverified state.

kOA uses a simple rule:

Users may still inspect what is locally available, but the interface should clearly mark what is verified, what is
stale, what is outside the active reader policy, and what cannot be relied on until required checks succeed.

Integrity checks protect the artifact boundary. They do not decide that every assertion inside the artifact is universally true.

## How updates work

Offline-capable does not mean “never updates.” It means updates are explicit, inspectable, and checkable.

You always know which artifact, Runtime Pack, or reader policy you are using. “What changed?” remains answerable.

Updates are not accepted merely because they arrived. Identity, integrity, signatures, revocation state, and policy
compatibility can be checked before activation.

Updates can travel through local mirrors, removable media, air-gapped transfer, peer distribution, or normal online
synchronization.

## Typical scenarios

### 1) Field or crisis conditions

A team needs reliable procedures and references while connectivity is intermittent.

* They carry a Runtime Pack locally.
* They can browse and query without network access.
* They apply updates only when required checks succeed.
* They keep stale or unverified material visibly labeled.

### 2) Institutional memory without platform lock-in

An organization wants durable knowledge that outlives vendors and tools.

* Kristals act as portable epistemic artifacts.
* Migration is “copy + verify,” not “rebuild everything.”
* Provenance, validation, authority, and scope labels remain attached.

### 3) Community distribution

A community distributes curated knowledge packs for education, local services, culture, or research.

* The bundle is usable offline.
* Authority and validation labels remain visible.
* Reader policies can show different views for different audiences.

### 4) Plural authority and federation

Different groups may publish or recognize different shards.

* Federation can preserve disagreement.
* Reader policies decide what is visible.
* Offline Runtime Packs can still carry authority-channel and certainty labels.

## Quick answers

**Does offline mean “no accountability”?**
No. Offline use increases the importance of clear verification status, versioning, provenance, and visible labels.

**Can two people have different versions?**
Yes, temporarily. That is why versions, source references, hashes, and provenance must remain visible.

**Can offline users see unvalidated material?**
Only if the active reader policy allows it. If shown, the material should keep its assertion status, certainty level, validation status, authority channel, and scope labels.

**Does verification mean every assertion is true?**
No. Verification means the artifact is technically the artifact it claims to be. Assertion truth, certainty, validation, authority recognition, and reader visibility remain separate.

The system should behave well in both modes: online when available, offline when needed.

## Next

* **Trust & provenance:** how integrity, provenance, authority channels, and validation labels make Kristals inspectable.
* **Distribution & versioning:** how Kristals evolve over time without losing identity, lineage, or reader-policy meaning.
