// app/technology/kristal/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Gem,
  ShieldCheck,
  Package,
  Globe,
  Layers,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kristal — Portable, Verifiable Knowledge Artifacts | kOA',
  description:
    'Kristal is the portable knowledge artifact format in the kOA ecosystem: verifiable provenance, offline-capable runtime packs, and durable versioning for governable knowledge.',
};

export default function KristalPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
          <Gem className="w-4 h-4 text-[#1e6864]" />
          <span className="text-xs font-mono">Technology / Kristal</span>
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">Kristal</h1>

        <p className="mt-4 text-xl text-slate-600 max-w-3xl leading-relaxed">
          A <strong>Kristal</strong> is a portable, verifiable knowledge artifact—built to travel across systems,
          survive offline conditions, and remain contestable. It’s not “a document”: it is a structured package whose
          claims can be traced to sources and whose behavior can be reproduced.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Pill icon={<ShieldCheck className="w-4 h-4" />}>Provenance & traceability</Pill>
          <Pill icon={<Package className="w-4 h-4" />}>Portable artifact</Pill>
          <Pill icon={<FileCheck2 className="w-4 h-4" />}>Reproducible builds</Pill>
          <Pill icon={<Globe className="w-4 h-4" />}>Offline-capable</Pill>
          <Pill icon={<Layers className="w-4 h-4" />}>Versioned & compatible</Pill>
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
            body="A Kristal can be copied, mirrored, archived, and shared across organizations or communities without losing integrity."
          />
          <InfoCard
            icon={<ShieldCheck className="w-6 h-6 text-[#1e6864]" />}
            title="Makes knowledge verifiable"
            body="A Kristal carries enough structure to audit: where claims come from, what rules were applied, and what remains uncertain."
          />
          <InfoCard
            icon={<Globe className="w-6 h-6 text-[#1e6864]" />}
            title="Enables offline operation"
            body="Kristals can ship with runtime bundles so people can query, browse, and reason with knowledge without relying on always-on networks."
          />
          <InfoCard
            icon={<Layers className="w-6 h-6 text-[#1e6864]" />}
            title="Supports durability over time"
            body="Kristals are versioned and compatible: upgrades should not silently break past outputs or erase the ability to reproduce prior states."
          />
        </div>
      </section>

      {/* How it fits in kOA */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Where it fits in the ecosystem</h2>
        <p className="text-slate-600 max-w-3xl leading-relaxed mb-6">
          Kristals are the “memory objects” that flow through kOA: they stabilize knowledge so deliberation, decision,
          and execution can be grounded in artifacts people can inspect and contest.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <ol className="space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
                1
              </span>
              <div>
                <strong>Capture & compile:</strong> sources and claims become structured, checkable artifacts (Kristals).
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
                2
              </span>
              <div>
                <strong>Use & deliberate:</strong> platforms consume Kristals to support learning, argument mapping, and
                policy drafts.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold">
                3
              </span>
              <div>
                <strong>Preserve & evolve:</strong> decisions and outcomes produce new Kristals, creating durable public
                memory with versioned history.
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Explore Kristal */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Explore Kristal</h2>
        <p className="text-slate-600 mb-8 max-w-3xl">
          These pages stay focused on outcomes and guarantees. Deep technical details (schemas, internal tooling) should
          live in reference-only pages, not the primary narrative.
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
            desc="Portability, verification, reuse, and durability—expressed as civic outcomes."
          />
          <NavTile
            href="/technology/kristal/trust-and-provenance"
            title="Trust & provenance"
            desc="How Kristals stay contestable: sources, signatures, and publication policies (without mystique)."
          />
          <NavTile
            href="/technology/kristal/portability-and-offline"
            title="Portability & offline"
            desc="How Kristals can be used under degraded conditions and still remain verifiable."
          />
          <NavTile
            href="/technology/kristal/distribution-and-versioning"
            title="Distribution & versioning"
            desc="How Kristals move through the ecosystem over time without breaking history."
          />
          <NavTile
            href="/technology/kristal/integrations"
            title="Integrations"
            desc="Where Kristals plug into Ariane, Konnaxion, and Orgo as the shared knowledge substrate."
          />
        </div>
      </section>
    </main>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
      <span className="text-slate-400">{icon}</span>
      {children}
    </span>
  );
}

function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

function NavTile({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-xl border border-slate-200 bg-white hover:border-[#1e6864] hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:underline decoration-1 underline-offset-4">
            {title}
          </h3>
          <p className="mt-2 text-slate-600 leading-relaxed">{desc}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#1e6864] transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
}
