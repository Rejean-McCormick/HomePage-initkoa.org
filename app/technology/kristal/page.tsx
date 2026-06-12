// app/technology/kristal/page.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
ArrowRight,
FileCheck2,
Gem,
Globe,
Layers,
Package,
ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
title: 'Kristal — Portable Epistemic Artifacts | kOA',
description:
'Kristal is the portable epistemic artifact system in the kOA ecosystem: scoped validation, explicit certainty, plural authority, reader policies, offline-capable runtime packs, and durable versioning for governable knowledge.',
alternates: { canonical: '/technology/kristal' },
};

export default function KristalPage() {
return ( <main className="max-w-5xl mx-auto px-6 py-12">
{/* Header */} <div className="mb-12"> <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white"> <Gem className="w-4 h-4 text-[#1e6864]" /> <span className="text-xs font-mono">Technology / Kristal</span> </div>


    <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">Kristal</h1>

    <p className="mt-4 text-xl text-slate-600 max-w-3xl leading-relaxed">
      A <strong>Kristal</strong> is a portable, verifiable epistemic artifact. It lets
      knowledge travel across systems while keeping provenance, assertion status, certainty,
      authority, scope, and reader policy explicit. It does not pretend disagreement has
      disappeared; it makes disagreement inspectable.
    </p>

    <div className="mt-8 flex flex-wrap gap-3">
      <Pill icon={<ShieldCheck className="w-4 h-4" />}>Provenance & traceability</Pill>
      <Pill icon={<Package className="w-4 h-4" />}>Portable artifact</Pill>
      <Pill icon={<FileCheck2 className="w-4 h-4" />}>Scoped validation</Pill>
      <Pill icon={<Globe className="w-4 h-4" />}>Offline-capable</Pill>
      <Pill icon={<Layers className="w-4 h-4" />}>Plural authority</Pill>
    </div>

    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <Link
        href="/technology"
        className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
      >
        Back to Technology <ArrowRight className="w-4 h-4 ml-2" />
      </Link>

      <Link
        href="/platforms/konnaxion"
        className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-slate-400 transition-colors"
      >
        See where Kristals are used <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  </div>

  {/* What it does */}
  <section className="mb-14">
    <h2 className="text-2xl font-bold text-slate-900 mb-4">What it does</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard
        icon={<Package className="w-6 h-6 text-[#1e6864]" />}
        title="Makes knowledge portable"
        body="A Kristal can be copied, mirrored, archived, and shared across organizations or communities without losing its declared structure, provenance, or integrity signals."
      />
      <InfoCard
        icon={<ShieldCheck className="w-6 h-6 text-[#1e6864]" />}
        title="Makes status visible"
        body="A Kristal separates artifact integrity from assertion validity, certainty, validation status, authority recognition, and reader visibility."
      />
      <InfoCard
        icon={<FileCheck2 className="w-6 h-6 text-[#1e6864]" />}
        title="Supports scoped validation"
        body="Assertions can be validated under a declared authority channel, scope, certainty level, and validation policy without being presented as universal agreement."
      />
      <InfoCard
        icon={<Globe className="w-6 h-6 text-[#1e6864]" />}
        title="Enables offline operation"
        body="Kristals can ship with Runtime Packs so people can query, browse, and reason with structured knowledge without relying on always-on networks."
      />
    </div>
  </section>

  {/* How it fits in kOA */}
  <section className="mb-14">
    <h2 className="text-2xl font-bold text-slate-900 mb-4">Where it fits in the ecosystem</h2>
    <p className="text-slate-600 max-w-3xl leading-relaxed mb-6">
      Kristals are the memory objects that flow through kOA. They stabilize knowledge so
      deliberation, learning, decision-making, publishing, and runtime systems can work from
      artifacts people can inspect, filter, validate, contest, and preserve.
    </p>

    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <ol className="space-y-4 text-slate-700">
        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
            1
          </span>
          <div>
            <strong>Structure:</strong> signals, drafts, datasets, submissions, or extracted
            claims become Structured Epistemic States.
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
            2
          </span>
          <div>
            <strong>Compile:</strong> those states become portable Working Artifacts that can
            be inspected, reviewed, validated, federated, or rendered.
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
            3
          </span>
          <div>
            <strong>Recognize:</strong> authority channels may recognize artifacts, assertions,
            shards, or policies for declared scopes.
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
            4
          </span>
          <div>
            <strong>Distribute:</strong> Reference Artifacts and Runtime Packs move through
            Konnaxion, Orgo, Architect, and other kOA systems under explicit reader policies.
          </div>
        </li>
      </ol>
    </div>
  </section>

  {/* Core principle */}
  <section className="mb-14">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">The core principle</h2>
      <p className="text-slate-600 max-w-3xl leading-relaxed">
        A Kristal may contain uncertain, disputed, fictional, mythological, speculative,
        incomplete, or erroneous assertions. What it must not do is present an assertion as
        validated beyond the authority channel, scope, certainty level, and validation policy
        that support that status.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <strong className="block text-slate-900 mb-1">Readers choose policy</strong>
          A strict reader may show only recognized references. A research reader may include
          disputed or low-certainty material with labels visible.
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <strong className="block text-slate-900 mb-1">
            Federation preserves disagreement
          </strong>
          Multiple authority channels can coexist without silently merging their claims into
          one flattened answer.
        </div>
      </div>
    </div>
  </section>

  {/* Explore Kristal */}
  <section className="mb-6">
    <h2 className="text-2xl font-bold text-slate-900 mb-4">Explore Kristal</h2>
    <p className="text-slate-600 mb-8 max-w-3xl">
      These pages stay focused on public meaning, outcomes, and guarantees. Deep technical
      details such as JSON Schemas, canonicalization profiles, runtime manifests, and validation
      reports belong in the technical reference docs.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NavTile
        href="/technology/kristal/overview"
        title="Overview"
        desc="The simplest explanation of what a Kristal is, who it’s for, and what it enables."
      />
      <NavTile
        href="/technology/kristal/what-it-does"
        title="What it does"
        desc="Portability, verification, scoped validation, reader policy, and durability expressed as civic outcomes."
      />
      <NavTile
        href="/technology/kristal/trust-and-provenance"
        title="Trust & provenance"
        desc="How Kristals preserve source lineage, authority channels, validation status, certainty, and scope."
      />
      <NavTile
        href="/technology/kristal/portability-and-offline"
        title="Portability & offline"
        desc="How Kristals can be used under degraded conditions while keeping integrity and reader-policy labels available."
      />
      <NavTile
        href="/technology/kristal/distribution-and-versioning"
        title="Distribution & versioning"
        desc="How Kristals move through the ecosystem over time without erasing history, lineage, or disagreement."
      />
      <NavTile
        href="/technology/kristal/integrations"
        title="Integrations"
        desc="Where Kristals plug into SenTient, Architect, Konnaxion, and Orgo as the shared epistemic substrate."
      />
    </div>
  </section>
</main>


);
}

function Pill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
return ( <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white"> <span className="text-slate-400">{icon}</span>
{children} </span>
);
}

function InfoCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
return ( <div className="p-6 rounded-xl border border-slate-200 bg-white"> <div className="mb-3">{icon}</div> <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3> <p className="text-slate-600 leading-relaxed">{body}</p> </div>
);
}

function NavTile({ href, title, desc }: { href: string; title: string; desc: string }) {
return ( <Link
   href={href}
   className="group p-6 rounded-xl border border-slate-200 bg-white hover:border-[#1e6864] hover:shadow-sm transition-all"
 > <div className="flex items-center justify-between gap-4"> <div> <h3 className="text-lg font-bold text-slate-900 group-hover:underline decoration-1 underline-offset-4">
{title} </h3> <p className="mt-2 text-slate-600 leading-relaxed">{desc}</p> </div>


    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#1e6864] transition-colors flex-shrink-0" />
  </div>
</Link>


);
}
