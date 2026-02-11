// app/platforms/konnaxion/modules/page.tsx
import Link from 'next/link';
import {
  GraduationCap,
  UsersRound,
  Vote,
  Hammer,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Konnaxion Modules — The kOA INITIATIVE',
  description:
    'The four civic modules of Konnaxion: competence, deliberation, collective decision, and execution—plus the cross-cutting Kintsugi and Kompendio layers.',
};

type ModuleCard = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  kintsugiHref?: string;
  kompendioHref?: string;
  kompendioStatus?: 'Available' | 'TBD';
};

const modules: ModuleCard[] = [
  {
    title: 'KonnectED',
    subtitle: 'Competence',
    description:
      'A learning and credential loop that turns training into verified capability: learn, validate, certify, and improve—without vendor lock-in.',
    href: '/platforms/konnaxion/konnected',
    icon: <GraduationCap className="w-7 h-7" />,
    kintsugiHref: '/platforms/konnaxion/konnected/kintsugi',
    kompendioHref: '/platforms/konnaxion/konnected/kompendio',
    kompendioStatus: 'Available',
  },
  {
    title: 'ethiKos',
    subtitle: 'Deliberation',
    description:
      'A structured civic process that converts messy input into decision-ready outcomes: discovery, deliberation, drafting, decision, and accountability.',
    href: '/platforms/konnaxion/ethikos',
    icon: <UsersRound className="w-7 h-7" />,
    kintsugiHref: '/platforms/konnaxion/ethikos/kintsugi',
    // kompendio is explicitly TBD in your current planning
    kompendioStatus: 'TBD',
  },
  {
    title: 'Kollective Intelligence',
    subtitle: 'Decision Readings',
    description:
      'Collective decision interfaces (SmartVote + EkoH) that keep baseline legitimacy visible while enabling transparent “quality lenses” for complex choices.',
    href: '/platforms/konnaxion/kollective-intelligence',
    icon: <Vote className="w-7 h-7" />,
    kintsugiHref: '/platforms/konnaxion/kollective-intelligence/kintsugi',
    // no Kompendio file exists for this module in the current set
    kompendioStatus: 'TBD',
  },
  {
    title: 'keenKonnect',
    subtitle: 'Build & Execute',
    description:
      'A builder workspace for real delivery: coordination, artifacts, and preservation—so decisions become implemented work with durable outputs.',
    href: '/platforms/konnaxion/keen-konnect',
    icon: <Hammer className="w-7 h-7" />,
    kintsugiHref: '/platforms/konnaxion/keen-konnect/kintsugi',
    kompendioHref: '/platforms/konnaxion/keen-konnect/kompendio',
    kompendioStatus: 'Available',
  },
];

export default function KonnaxionModulesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
            <Layers className="w-6 h-6" />
          </div>
          <p className="text-xs font-mono text-slate-500">
            Konnaxion / Modules
          </p>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Konnaxion modules
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Four civic utilities that share one principle: focus on outcomes, keep
          legitimacy visible, and make the system governable (auditable,
          contestable, portable).
        </p>
      </div>

      {/* Cross-cutting layers */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/platforms/konnaxion/kintsugi"
          className="group block p-6 rounded-xl border border-slate-200 hover:border-slate-900 hover:shadow-sm transition-all bg-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Cross-cutting layer
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Kintsugi (Operate)
              </h2>
              <p className="text-slate-600 mt-2">
                “Under one roof.” How modules feel like one product: coherent
                journeys, shared trust surfaces, and integrated workflows.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-1" />
          </div>
        </Link>

        <Link
          href="/platforms/konnaxion/kompendio"
          className="group block p-6 rounded-xl border border-slate-200 hover:border-slate-900 hover:shadow-sm transition-all bg-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Cross-cutting layer
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 group-hover:underline underline-offset-4">
                Kompendio (Reference)
              </h2>
              <p className="text-slate-600 mt-2">
                The reference + integration repertory: versioned charts, pinned
                standards, and explicit dependencies—so governance stays
                inspectable.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors mt-1" />
          </div>
        </Link>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div
            key={m.title}
            className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                  {m.icon}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                    {m.subtitle}
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    <Link
                      href={m.href}
                      className="hover:underline underline-offset-4"
                    >
                      {m.title}
                    </Link>
                  </h3>
                </div>
              </div>

              <Link
                href={m.href}
                className="text-sm font-mono text-slate-500 hover:text-slate-900"
                aria-label={`Open ${m.title}`}
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-slate-600 mt-4">{m.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {m.kintsugiHref ? (
                <Link
                  href={m.kintsugiHref}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-slate-200 text-slate-700 hover:border-slate-900 transition-colors"
                >
                  Kintsugi
                </Link>
              ) : null}

              {m.kompendioHref ? (
                <Link
                  href={m.kompendioHref}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-slate-200 text-slate-700 hover:border-slate-900 transition-colors"
                >
                  Kompendio
                </Link>
              ) : (
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-slate-200 text-slate-500">
                  Kompendio: {m.kompendioStatus ?? 'TBD'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 p-6 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Commons (Kreative)</span>{' '}
          is not developed yet. When it ships, it will hold the curated commons:
          a limited library of validated outputs, preserved for reuse.
        </p>
      </div>
    </main>
  );
}
