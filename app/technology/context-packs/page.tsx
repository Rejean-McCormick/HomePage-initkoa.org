import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  Download,
  Package,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Context Packs — AI-ready reference bundles | kOA',
  description:
    'Downloadable AI-ready reference bundles: explicit, versioned context packs for retrieval, prompting, and offline use.',
  alternates: { canonical: '/technology/context-packs' },
};

type ContextPackLink = {
  href: string;
  label: string;
};

type ContextPack = {
  slug: string;
  title: string;
  version: string;
  scope: string;
  description: string;
  file: string;
  links?: ContextPackLink[];
};

const PACKS: ContextPack[] = [
  {
    slug: 'kristal',
    title: 'Kristal Context Pack',
    version: 'v4.0',
    scope: 'Contracts, schemas, query semantics',
    description:
      'Normative contracts, schemas, query semantics, and runtime-pack logic for portable, verifiable knowledge artifacts.',
  file: 'kristal-context-pack--contracts-schemas-query--v4.0.txt',
  },
  {
    slug: 'konnaxion',
    title: 'Konnaxion Context Pack',
    version: 'v14.0',
    scope: 'Platform specification',
    description:
      'Full-stack platform specification covering parameters, navigation, modules, and structural references for Konnaxion.',
    file: 'konnaxion-context-pack--platform-specification--v14.0.txt',
    links: [{ href: '/platforms/konnaxion', label: 'Konnaxion' }],
  },
  {
    slug: 'orgo',
    title: 'Orgo Context Pack',
    version: 'v3.0',
    scope: 'Case, task, workflow platform',
    description:
      'Unified workflow reference for case handling, task orchestration, schemas, services, and operational flows.',
    file: 'orgo-context-pack--case-task-workflow-platform--v3.0.txt',
    links: [{ href: '/platforms/orgo', label: 'Orgo' }],
  },
  {
    slug: 'sentient',
    title: 'SenTient Context Pack',
    version: 'v1.0',
    scope: 'Reconciliation architecture',
    description:
      'Entity reconciliation, ingestion, semantic processing, and the upgrade path for structured resolution over messy inputs.',
    file: 'sentient-context-pack--reconciliation-architecture--v1.0.txt',
    links: [{ href: '/technology/sentient', label: 'SenTient' }],
  },
  {
    slug: 'architect',
    title: 'Abstract Wiki Architect Context Pack',
    version: 'v2.5',
    scope: 'Engine and GF integration',
    description:
      'Engine architecture, GF integration, deployment model, and the technical shape of deterministic multilingual rendering.',
    file: 'abstract-wiki-architect-context-pack--engine-and-gf-integration--v2.5.txt',
    links: [{ href: '/technology/architect', label: 'Architect' }],
  },
  {
    slug: 'gf',
    title: 'Grammatical Framework Context Pack',
    version: 'v1.0',
    scope: 'RGL router and reference',
    description:
      'Deterministic constructor routing and reference material for Grammatical Framework and RGL-based generation workflows.',
    file: 'grammatical-framework-context-pack--rgl-router-and-reference--v1.0.txt',
  },
  {
    slug: 'koa-ecosystem',
    title: 'kOA Digital Ecosystem Context Pack',
    version: 'v1.0',
    scope: 'Architecture and contracts',
    description:
      'System-level architecture, artifact contracts, workflow boundaries, and Kristal integration across the ecosystem.',
    file: 'koa-digital-ecosystem-context-pack--architecture-and-contracts--v1.0.txt',
  },
  {
    slug: 'senior-architect',
    title: 'Senior Architect Context Pack',
    version: 'v1.0',
    scope: 'Systems patterns and resilience',
    description:
      'Production patterns for reliability, resilience, structural decoupling, observability, and large-system design.',
    file: 'senior-architect-context-pack--systems-patterns-and-resilience--v1.0.txt',
  },
];

export default function ContextPacksPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
          <Package className="w-4 h-4 text-[#1e6864]" />
          <span className="text-xs font-mono">Technology / Context Packs</span>
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">Context Packs</h1>

        <p className="mt-4 text-xl text-slate-600 max-w-3xl leading-relaxed">
          Downloadable, versioned reference bundles for AI systems. Each pack is shaped to be
          <strong> retrievable</strong>, <strong>explicit</strong>, and <strong>stable enough to pin</strong>
          across prompts, RAG pipelines, and offline workflows.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Pill icon={<ShieldCheck className="w-4 h-4" />}>Versioned & stable</Pill>
          <Pill icon={<Boxes className="w-4 h-4" />}>Modular by domain</Pill>
          <Pill icon={<Sparkles className="w-4 h-4" />}>Explicit scope</Pill>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/technology"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
          >
            Back to Technology <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What these packs are for</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<BookOpenText className="w-6 h-6 text-[#1e6864]" />}
            title="Shared operating context"
            body="A context pack gives an AI system a bounded, named body of reference material instead of a vague pile of notes."
          />
          <InfoCard
            icon={<ShieldCheck className="w-6 h-6 text-[#1e6864]" />}
            title="Stable retrieval surface"
            body="Version numbers make the packs easier to store, pin, compare, and update over time."
          />
          <InfoCard
            icon={<Boxes className="w-6 h-6 text-[#1e6864]" />}
            title="Modular by domain"
            body="A pack can describe a platform, a system component, a method, or a specialized domain without forcing everything into one monolith."
          />
          <InfoCard
            icon={<Package className="w-6 h-6 text-[#1e6864]" />}
            title="Usable online or offline"
            body="The format is simple enough for public download while remaining practical for local AI workflows and home-made RAG setups."
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Available packs</h2>
        <p className="text-slate-600 mb-8 max-w-3xl leading-relaxed">
          Each pack has a clear title, a short statement of scope, and a stable version. The page
          stays human-readable; the download stays machine-usable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKS.map((pack) => (
            <PackCard key={pack.slug} pack={pack} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PackCard({ pack }: { pack: ContextPack }) {
  return (
    <article className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#1e6864] hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{pack.title}</h3>
          <p className="mt-1 text-sm font-mono text-slate-500">{pack.version}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          {pack.scope}
        </span>
      </div>

      <p className="mt-4 text-slate-600 leading-relaxed">{pack.description}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={`/context-packs/${pack.file}`}
          className="inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
        >
          Download <Download className="w-4 h-4 ml-2" />
        </a>

        {pack.links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 text-slate-900 hover:border-slate-400 transition-colors"
          >
            {link.label} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        ))}
      </div>
    </article>
  );
}

function Pill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
      <span className="text-slate-400">{icon}</span>
      {children}
    </span>
  );
}

function InfoCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}