# Trust, Provenance & Authority

> Canonical HTML: [https://initkoa.org](https://initkoa.org)/technology/kristal/trust-and-provenance
> Markdown mirror: [https://initkoa.org](https://initkoa.org)/technology/kristal/trust-and-provenance/index.html.md
> Route: /technology/kristal/trust-and-provenance
> Source: app\technology\kristal\trust-and-provenance\page.mdx
> Generated: 2026-06-13T00:42:18.184Z

[Open the HTML page]([https://initkoa.org](https://initkoa.org)/technology/kristal/trust-and-provenance)

"How Kristals stay verifiable and accountable: provenance, evidence, signatures, scoped validation, authority channels, reader policies, and preserved disagreement.",

# Trust, Provenance & Authority

A Kristal is designed to be **verifiable without asking you to trust a platform**.

It is not “true because a website says so.” It is useful because it carries the information needed to inspect:

* where an assertion came from,
* what evidence or source material supports it,
* how certain it is,
* which authority channel validated or recognized it,
* what scope that validation applies to,
* and which reader policy made it visible.

Kristal v5 separates **artifact integrity** from **assertion validity**.

A Kristal can be well-formed, signed, content-addressed, and portable while still containing assertions that are hypothetical, disputed, fictional, mythological, low-certainty, rejected by one authority, or recognized by another.

## Provenance: where this came from

Provenance answers:

* **Where did this assertion come from?**
* **Which source, dataset, document, or submission produced it?**
* **What evidence was attached?**
* **What compilation or transformation steps were applied?**
* **What changed since the previous version?**
* **Which prior artifacts does this artifact derive from?**

A Kristal is useful only if those questions remain cheap to answer.

The point is not to force everyone to agree. The point is to make the origin, lineage, and status of knowledge inspectable.

## Integrity: whether this artifact is what it claims to be

When you receive a Kristal, you should be able to verify:

* **Identity:** which artifact it is, through stable identifiers and hashes
* **Integrity:** whether the content has been altered
* **Signatures:** which keys signed it
* **Lineage:** which prior artifact, shard, state, or dataset it descends from
* **Build surface:** which compiler, configuration, recipe, or policy affected it
* **Scope:** which domain, jurisdiction, tenant, language, or time window it applies to

This is **artifact verification**.

It proves that the artifact is the artifact it claims to be.

It does **not** prove that every assertion inside it is universally true.

## Validation: what has been evaluated

Validation answers a different set of questions:

* **What was evaluated?**
* **Which validation policy was applied?**
* **Which authority channel or validator issued the result?**
* **What validation status was assigned?**
* **What certainty level was declared?**
* **What was the assertion validated as?**
* **What scope does the validation apply to?**

An assertion may be validated as:

* a high-confidence fact,
* a sourced claim,
* a hypothesis,
* an institutional reference,
* a publisher declaration,
* a technical specification,
* a legal or policy position,
* a mythological corpus,
* a fictional corpus,
* a symbolic model,
* or a disputed position.

Validated does not always mean “maximum certainty.” It means the assertion satisfies a declared validation policy for a declared scope.

## Trust is not one global score

kOA does not assume one universal truth authority.

Instead, trust is **scoped**, **plural**, and **policy-driven**.

* A health claim and a municipal budget claim do not need the same validators.
* A mythology corpus and a physics reference do not have the same validation mode.
* A publisher declaration and an independent research hypothesis do not claim the same certainty.
* A reader can choose a policy that exposes only selected authority channels.
* Different communities can preserve different positions without silently merging them.

The system’s job is to make trust choices **explicit and inspectable**.

## Authority channels

An authority channel is a scoped source of recognition.

It may represent:

* a person,
* a research collective,
* a community archive,
* a publisher,
* an academic institution,
* a standards body,
* a company,
* a government,
* an intergovernmental organization,
* an AI validator,
* or a hybrid governance structure.

An authority channel can recognize an artifact, assertion, dataset, shard, or policy for a specific scope.

For example:

* a cultural archive can validate a mythological corpus as mythology;
* a scientific authority can validate a scientific reference as high-confidence fact;
* a publisher can validate a system description as a publisher declaration;
* a research group can validate a hypothesis as a hypothesis;
* a local community can recognize a disputed position without making it a global reference.

## Reader policies: what becomes visible

A Kristal may contain more than one kind of material.

A reader policy determines what a reader, interface, query, runtime, or rendering surface is allowed to show.

Common modes include:

* **reference only** — show recognized reference material;
* **validated only** — show material validated under selected authority and scope policies;
* **high certainty only** — show only stronger certainty bands;
* **research** — show lower-certainty and disputed material with labels;
* **creative** — show fictional, mythological, or symbolic material with labels;
* **all with labels** — show broad material while preserving status and scope.

A validated-only reader policy does not mean every visible assertion is a universal fact.

It means every visible assertion satisfies that policy’s filters for validation status, authority channel, certainty level, validated-as mode, and scope.

## Federation: how multiple sources coexist

Kristals can be composed across domains, publishers, and authority channels without pretending disagreement does not exist.

Federation means:

* a system can present a unified experience,
* while preserving **who said what**,
* under which authority channel,
* at what certainty level,
* validated as what,
* for which scope,
* and under which reader policy.

The goal is to avoid silent merging.

If two authority channels disagree, Kristal should preserve the disagreement and make the difference legible.

## Contestability & correction

A trustable system must support:

* **challenge:** flagging an assertion, source, validation, authority decision, or compilation rule;
* **correction:** publishing a revised artifact with explicit lineage;
* **revocation:** marking keys, authorities, validations, or artifacts as revoked;
* **supersession:** replacing an older artifact or assertion with a newer one;
* **recourse:** routing disputes through institutional, community, or expert review;
* **exit:** letting users choose another reader policy, authority channel, fork, or federation.

Kristals are built to make disagreement legible, not to erase it.

## Practical mental model

* **Provenance tells you:** “This is where the assertion came from.”
* **Integrity tells you:** “This artifact has not been silently changed.”
* **Validation tells you:** “This was evaluated under a declared policy.”
* **Authority tells you:** “This channel recognizes it for this scope.”
* **Certainty tells you:** “This is how strong the claim is.”
* **Reader policy tells you:** “This is why you are seeing it.”
* **Federation tells you:** “These sources coexist without being flattened.”

## What this changes

Kristal v5 does not promise that every Kristal contains only perfect truth.

It promises that knowledge can travel with the labels needed to understand it:

* assertion status,
* certainty level,
* validation status,
* authority channel,
* recognition status,
* scope,
* provenance,
* evidence,
* lineage,
* and reader policy.

That is what makes a Kristal trustworthy: not central control, but structured accountability.

## Next pages

* <Link href="/technology/kristal/what-it-does">What Kristals do →</Link>
* <Link href="/technology/kristal/portability-and-offline">Portability & offline use →</Link>
* <Link href="/technology/kristal/distribution-and-versioning">Distribution & versioning →</Link>
* <Link href="/technology/kristal/integrations">Integrations →</Link>
