// app/platforms/konnaxion/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Konnaxion — Public Coordination Platform',
  description:
    'The public spine of the kOA ecosystem: learn, deliberate, decide, build, and preserve—through modular civic utilities.',
};

export default function KonnaxionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-slate-900">
          Konnaxion
        </h1>

        <h2 className="text-xl text-slate-500 font-light mb-8">
          Learn • Deliberate • Decide • Build • Preserve
        </h2>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            Konnaxion is the <strong>public coordination spine</strong> of the kOA ecosystem. It brings learning,
            deliberation, collective decision interfaces, and builder coordination into one coherent civic platform.
          </p>
          <p>
            The goal is simple: help communities move from <strong>knowledge</strong> to <strong>legitimate decisions</strong>{' '}
            to <strong>executed work</strong> and <strong>durable public memory</strong>—without turning governance into a black box.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="https://konnaxion.com/ekoh/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-primary transition-colors text-center"
          >
            Open Konnaxion
          </a>

          <Link
            href="/platforms/konnaxion/modules"
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-center"
          >
            Explore modules
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            One platform, modular utilities
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Contestable outcomes
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Durable institutional memory
          </span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* MODULES */}
        <section>
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-serif font-medium text-slate-900">Modules</h2>
              <p className="text-slate-500 mt-2">
                Each module is a civic utility with clear boundaries. Most modules are expressed through two layers:
                <strong> Kintsugi</strong> (operate “under one roof”) and <strong>Kompendio</strong> (reference/integration layer).
              </p>
            </div>
            <div className="hidden sm:flex gap-3">
              <Link
                href="/platforms/konnaxion/kintsugi"
                className="text-sm font-mono text-primary hover:underline"
              >
                What is Kintsugi →
              </Link>
              <Link
                href="/platforms/konnaxion/kompendio"
                className="text-sm font-mono text-primary hover:underline"
              >
                What is Kompendio →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* KonnectED */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">
                KonnectED
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                The competence loop: learn, practice, validate, and certify—so participation can be informed and competence can be portable.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/platforms/konnaxion/konnected/kintsugi"
                    className="font-bold text-primary hover:underline"
                  >
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    The integrated learning experience: one roof for learning paths, evaluation, and verified outcomes.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/konnected/kompendio"
                    className="font-bold text-primary hover:underline"
                  >
                    Kompendio (Reference)
                  </Link>
                  <p className="text-sm text-slate-600">
                    The reference/integration layer: standards, mappings, and charts that keep competence legible and reusable.
                  </p>
                </li>
              </ul>
            </div>

            {/* ethiKos */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">
                ethiKos
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Structured deliberation and decision formation: turn messy inputs into legible, reviewable outputs and accountability trails.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/platforms/konnaxion/ethikos/kintsugi"
                    className="font-bold text-primary hover:underline"
                  >
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Run consultations, debates, drafting, and decision workflows in one integrated civic process.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/ethikos/kompendio"
                    className="font-bold text-primary hover:underline"
                  >
                    Kompendio (TBD)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Planned reference layer for deliberation patterns, governance charts, and integration standards.
                  </p>
                </li>
              </ul>
            </div>

            {/* keenKonnect */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">
                keenKonnect
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                The builder workspace: turn approved decisions into projects, coordinate execution, and preserve outputs so they survive turnover.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/platforms/konnaxion/keen-konnect/kintsugi"
                    className="font-bold text-primary hover:underline"
                  >
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    One roof for building: workspaces, coordination, delivery loops, and continuity.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/keen-konnect/kompendio"
                    className="font-bold text-primary hover:underline"
                  >
                    Kompendio (Reference)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Reference stacks and pinned charts that guide projects and keep dependencies explicit.
                  </p>
                </li>
              </ul>
            </div>

            {/* Kollective Intelligence */}
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Kollective Intelligence
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                The decision interface: keep outcomes legible under complexity by showing results through transparent, comparable “readings.”
              </p>

              <div className="grid gap-6">
                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence/smartvote"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    SmartVote
                  </Link>
                  <p className="text-sm text-slate-600">
                    The voting surface: readable outcomes and clear comparisons across governance modes (e.g., baseline vs quality-weighted).
                  </p>
                </div>

                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence/ekoh"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    EkoH
                  </Link>
                  <p className="text-sm text-slate-600">
                    The registry of competence signals and audit context: makes “why this reading” visible and contestable.
                  </p>
                </div>
              </div>
            </div>

            {/* Kreative (TBD) */}
            <div className="md:col-span-2 border border-dashed border-slate-200 rounded-sm p-6 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kreative (TBD)</h3>
              <p className="text-sm text-slate-600">
                Not published yet. Intended as the curated commons: preservation and discovery of validated outputs (a limited library, not a feed).
              </p>
            </div>
          </div>
        </section>

        {/* REFERENCE */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-sm">
          <h2 className="text-xl font-bold text-white mb-4">Reference (builders)</h2>
          <p className="mb-6 text-sm leading-relaxed">
            If you are integrating or implementing Konnaxion, use the reference section for maps, standards, and the integration vocabulary.
            This is intentionally separated from the public-facing module pages.
          </p>
          <Link
            href="/platforms/konnaxion/reference"
            className="inline-block px-4 py-2 border border-slate-600 rounded text-white hover:bg-slate-800 text-sm transition-colors"
          >
            Open reference →
          </Link>
        </section>
      </div>
    </main>
  );
}
