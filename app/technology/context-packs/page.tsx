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
  title: 'Context Packs — AI-first reference bundles | kOA',
  description:
    'Versioned context packs meant to be loaded into AI systems first: for understanding, validating, and steering conversations around kOA systems and general design principles.',
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

const SYSTEM_PACKS: ContextPack[] = [
  {
    slug: 'kristal',
    title: 'Kristal Context Pack',
    version: 'v4.0',
    scope: 'Contracts, schemas, query semantics',
    description:
      'Normative contracts, schemas, query semantics, and runtime-pack logic for portable, verifiable knowledge artifacts.',
    file: 'kristal-context-pack--contracts-schemas-query--v4.0.txt',
    links: [{ href: '/technology/kristal', label: 'Kristal' }],
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
    slug: 'semantik-architect',
    title: 'Semantik Architect Context Pack',
    version: 'v2.5',
    scope: 'Engine and GF integration',
    description:
      'Engine architecture, GF integration, deployment model, and the technical shape of deterministic multilingual rendering.',
    file: 'abstract-wiki-architect-context-pack--engine-and-gf-integration--v2.5.txt',
    links: [{ href: '/technology/architect', label: 'Semantik Architect' }],
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
];

const GENERAL_PACKS: ContextPack[] = [
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
          These packs are meant to be given to an <strong>AI system first</strong>. The normal
          workflow is simple: load a pack into an assistant, then question the assistant from that
          context.
        </p>

        <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
          One use is explanatory and verificatory: <em>What is Orgo? How does Konnaxion work? What
          does Kristal require?</em> Another use is operational: ask the AI to apply a relevant
          context pack, align with one of the systems, or reason through a conversation using the
          right principles and constraints.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Pill icon={<Sparkles className="w-4 h-4" />}>AI-first</Pill>
          <Pill icon={<ShieldCheck className="w-4 h-4" />}>Versioned & stable</Pill>
          <Pill icon={<Boxes className="w-4 h-4" />}>Modular by domain</Pill>
          <Pill icon={<BookOpenText className="w-4 h-4" />}>Human-readable, machine-usable</Pill>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How people use them</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<BookOpenText className="w-6 h-6 text-[#1e6864]" />}
            title="Understand a system"
            body="Load a pack, then ask the AI to explain the system in plain language: what it is, what it does, how it is structured, and where its boundaries are."
          />
          <InfoCard
            icon={<ShieldCheck className="w-6 h-6 text-[#1e6864]" />}
            title="Validate an interpretation"
            body="Use the pack to check whether an explanation, plan, or output actually fits the system instead of drifting into invention."
          />
          <InfoCard
            icon={<Boxes className="w-6 h-6 text-[#1e6864]" />}
            title="Supercharge a conversation"
            body="Give the AI a specific pack and tell it to apply that context during the exchange: principles, constraints, architecture patterns, or domain rules."
          />
          <InfoCard
            icon={<Package className="w-6 h-6 text-[#1e6864]" />}
            title="Align the assistant"
            body="Ask the AI to reason as if it were operating inside a specific system: Konnaxion, Orgo, Kristal, or a more general design frame like Senior Architect."
          />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">kOA system packs</h2>
        <p className="text-slate-600 mb-8 max-w-3xl leading-relaxed">
          These packs are tied directly to the kOA ecosystem and its internal systems. They are
          useful when you want an AI assistant to understand, validate, or operate in alignment
          with your stack.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SYSTEM_PACKS.map((pack) => (
            <PackCard key={pack.slug} pack={pack} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">General packs</h2>
        <p className="text-slate-600 mb-8 max-w-3xl leading-relaxed">
          These are not specific to kOA. They are broader operating frames you can load into an AI
          to shape how it reasons, designs, structures, or generates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GENERAL_PACKS.map((pack) => (
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
          download={pack.file}
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