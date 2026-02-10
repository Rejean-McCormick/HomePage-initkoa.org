// app/platforms/konnaxion/ethikos/page.tsx
import Link from 'next/link';
import {
  UsersRound,
  Compass,
  MessageSquareText,
  FileText,
  Scale,
  ShieldCheck,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'ethiKos — Deliberation & Legitimacy (Konnaxion)',
  description:
    'A structured civic deliberation module that turns messy input into decision-ready outcomes: discovery, consultation, drafting, decision, and accountability.',
};

type Step = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

const steps: Step[] = [
  {
    title: '1) Discovery',
    icon: <Compass className="w-6 h-6" />,
    description:
      'Turn a problem into a shared object: scope, constraints, stakeholders, and what “success” means.',
  },
  {
    title: '2) Consultation',
    icon: <MessageSquareText className="w-6 h-6" />,
    description:
      'Collect proposals and lived constraints in a way that surfaces convergence instead of producing noise.',
  },
  {
    title: '3) Drafting',
    icon: <FileText className="w-6 h-6" />,
    description:
      'Produce decision-ready options with reasons, tradeoffs, and explicit open questions.',
  },
  {
    title: '4) Decision',
    icon: <Scale className="w-6 h-6" />,
    description:
      'Run a legitimate choice process where baseline outcomes remain visible and “quality lenses” are explicit.',
  },
  {
    title: '5) Accountability',
    icon: <ShieldCheck className="w-6 h-6" />,
    description:
      'Publish what was decided, why, and what happens next—so outcomes are contestable and reviewable.',
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
          <p className="text-xs font-mono text-slate-500">
            Konnaxion / ethiKos
          </p>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">ethiKos</h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          ethiKos is the deliberation module of Konnaxion. It exists to convert
          fragmented, emotional, and noisy input into decision-ready outcomes
          that can be reviewed, contested, and implemented.
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
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Operate layer
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Kintsugi (Operate)
              </h2>
              <p className="text-slate-600 mt-2">
                The “under one roof” experience: structured intake, deliberation
                workflows, and publishable outcomes.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-1" />
          </div>
        </Link>

        <div className="p-6 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Reference layer
              </p>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Kompendio (Reference)
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-slate-200 text-slate-500">
                  TBD
                </span>
              </div>
              <p className="text-slate-600 mt-2">
                Module-specific reference charts for ethiKos are planned but not
                published yet. Use the global Kompendio layer in the meantime.
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

      {/* Pipeline */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          The deliberation pipeline
        </h2>
        <p className="text-slate-600 max-w-3xl">
          ethiKos treats legitimacy as a workflow. Each step produces an output
          that the next step can reuse—so the process is legible, replayable, and
          improvable over time.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
              </div>
              <p className="text-sm text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees (user-facing) */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          What users get (not buzzwords)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Legible outcomes
            </h3>
            <p className="text-sm text-slate-600">
              Decisions come with reasons, tradeoffs, and a record of what was
              considered—so people can understand and contest them.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Participation without chaos
            </h3>
            <p className="text-sm text-slate-600">
              Consultation is structured to surface convergence and constraints,
              instead of rewarding volume and outrage.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Accountability by default
            </h3>
            <p className="text-sm text-slate-600">
              Every outcome can be reviewed later, compared to promised goals,
              and connected to implementation work.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-600 max-w-3xl">
            If you want the decision interface that shows baseline results and
            explicit “quality lenses,” that lives in{' '}
            <span className="font-semibold text-slate-900">
              Kollective Intelligence
            </span>
            .
          </p>
          <Link
            href="/platforms/konnaxion/kollective-intelligence"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            Open Kollective Intelligence <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
