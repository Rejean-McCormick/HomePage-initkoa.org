// FILE: page.tsx
// Path: app/platforms/konnaxion/ethikos/page.tsx

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  UsersRound,
  Compass,
  MessageSquareText,
  FileText,
  Scale,
  ShieldCheck,
  ArrowRight,
  Layers,
  MessagesSquare,
} from 'lucide-react';

export const metadata = {
  title: 'ethiKos v2 — Deliberation & Legitimacy (Konnaxion)',
  description:
    'ethiKos v2 is a structured civic deliberation module that turns messy input into decision-ready outcomes: intake, discovery/consultation, deliberation, drafting, decision (Smart Vote), and accountability.',
};

type Step = {
  title: string;
  icon: ReactNode;
  description: string;
};

const steps: Step[] = [
  {
    title: '0) Intake',
    icon: <Compass className="w-6 h-6" />,
    description:
      'Capture issues early: scope, constraints, stakeholders, deduplication, and initial prioritization—before debate becomes noise.',
  },
  {
    title: '1) Discovery',
    icon: <MessageSquareText className="w-6 h-6" />,
    description:
      'Structure consultation inputs: proposals, constraints, clustering/bridges—so convergence becomes visible before escalation.',
  },
  {
    title: '2) Deliberation',
    icon: <UsersRound className="w-6 h-6" />,
    description:
      'Move from reactions to reasons: arguments, objections, and tradeoffs organized into legible threads and comparable claims.',
  },
  {
    title: '3) Drafting',
    icon: <FileText className="w-6 h-6" />,
    description:
      'Turn deliberation into decision-ready text: options, wording, rationale packets, and explicit open questions.',
  },
  {
    title: '4) Decision',
    icon: <Scale className="w-6 h-6" />,
    description:
      'Publish baseline outcomes alongside explicitly declared Smart Vote readings (lenses). Baseline remains visible.',
  },
  {
    title: '5) Accountability',
    icon: <ShieldCheck className="w-6 h-6" />,
    description:
      'Publish what was decided, why, and what happens next—so outcomes remain reviewable, contestable, and actionable.',
  },
];

export default function EthiKosOverviewPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
            <UsersRound className="w-6 h-6" />
          </div>
          <p className="text-xs font-mono text-slate-500">Konnaxion / ethiKos</p>
        </div>

        <div className="flex items-end gap-3 mb-4">
          <h1 className="text-4xl font-bold text-slate-900">ethiKos</h1>
          <span className="text-xs font-mono px-2 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
            v2
          </span>
        </div>

        <p className="text-lg text-slate-600 max-w-3xl">
          ethiKos v2 is the deliberation and decision-formation module of Konnaxion. It converts fragmented, emotional,
          and noisy input into decision-ready outputs that can be reviewed, contested, and implemented—without losing
          legitimacy.
        </p>
      </div>

      {/* Kintsugi / Kompendio quick links */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/platforms/konnaxion/ethikos/kintsugi"
          className="group block p-6 rounded-xl border border-slate-200 hover:border-slate-900 hover:shadow-sm transition-all bg-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Operate layer</p>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Kintsugi (Operate)
              </h2>
              <p className="text-slate-600 mt-2">
                The “under one roof” experience: intake, discovery, deliberation, drafting, and publishable outcomes—
                without tool capture.
              </p>

              <p className="text-sm text-slate-600 mt-3">
                Includes the authoritative <span className="font-semibold text-slate-900">Boundaries & Contracts</span>{' '}
                section for v2.
              </p>

              <span className="inline-flex items-center text-sm font-mono text-slate-900 border-b border-slate-400/40 hover:border-slate-900 mt-3">
                Open Kintsugi <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-1" />
          </div>
        </Link>

        <div className="p-6 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Reference layer</p>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-slate-900">Kompendio (Reference)</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-slate-200 text-slate-500">
                  TBD
                </span>
              </div>
              <p className="text-slate-600 mt-2">
                ethiKos Kompendio is planned but not finalized. Use global Kompendio for now.
              </p>
              <Link
                href="/platforms/konnaxion/kompendio"
                className="inline-flex items-center text-sm font-mono text-slate-900 border-b border-slate-400/40 hover:border-slate-900 mt-3"
              >
                Open global Kompendio <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Core submodules */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Core submodules</h2>
        <p className="text-slate-600 max-w-3xl">
          ethiKos v2 stays clean by keeping strong boundaries: deliberation facts live in Korum, consultation/ballot facts
          live in Konsultations, and outcome readings are published by Smart Vote (Kollective Intelligence).
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/platforms/konnaxion/ethikos/korum"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessagesSquare className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-900 group-hover:underline underline-offset-4">Korum</h3>
            </div>
            <p className="text-sm text-slate-600">
              Structured deliberation: topics, arguments, stance events (−3…+3), moderation, and debate audit trail.
            </p>
          </Link>

          <Link
            href="/platforms/konnaxion/ethikos/konsultations"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageSquareText className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Konsultations
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Intake + discovery + ballots + impact tracking: consultations, suggestions, baseline ballots, and follow-up.
            </p>
          </Link>

          <Link
            href="/platforms/konnaxion/kollective-intelligence"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Smart Vote + EkoH
              </h3>
            </div>
            <p className="text-sm text-slate-600">
              Decision-reading layer: Smart Vote publishes baseline + declared readings; EkoH supplies auditable snapshot
              context when used by a lens.
            </p>
          </Link>
        </div>
      </section>

      {/* Pipeline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">The deliberation pipeline</h2>
        <p className="text-slate-600 max-w-3xl">
          ethiKos treats legitimacy as a workflow. Each stage produces an output the next stage can reuse—so the process
          stays legible, replayable, and improvable over time.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700">{s.icon}</div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
              </div>
              <p className="text-sm text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees (user-facing) */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">What users get (not buzzwords)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Legible outcomes</h3>
            <p className="text-sm text-slate-600">
              Decisions come with reasons, tradeoffs, and a record of what was considered—so people can understand and
              contest them.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Participation without chaos</h3>
            <p className="text-sm text-slate-600">
              Intake and discovery are structured to surface convergence and constraints, instead of rewarding volume and
              outrage.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Accountability by default</h3>
            <p className="text-sm text-slate-600">
              Every outcome can be reviewed later, compared to promised goals, and connected to implementation work.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-600 max-w-3xl">
            The decision interface that publishes baseline results alongside explicit <strong>Smart Vote readings</strong>{' '}
            lives in <span className="font-semibold text-slate-900">Kollective Intelligence</span>. The v2 boundaries and
            contracts live in <span className="font-semibold text-slate-900">ethiKos Kintsugi</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/platforms/konnaxion/kollective-intelligence"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              Open Kollective Intelligence <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/platforms/konnaxion/ethikos/kintsugi#boundaries"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-slate-300 bg-white text-slate-900 hover:border-slate-900 transition-colors text-sm font-medium"
            >
              Boundaries & Contracts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
