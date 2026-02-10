// app/research/page.js
import Link from 'next/link';
import { Microscope, BrainCircuit, Binary, Scale } from 'lucide-react';

export const metadata = {
  title: 'Research Hub – kOA',
  description:
    'Working papers and theoretical foundations for governable knowledge-to-action infrastructure, collective intelligence, and civic coordination.',
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white pb-24">
      {/* HERO SECTION */}
      <section className="bg-white border-b border-gray-200 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-sm uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Working Theory
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-slate-900 mb-6">
            Research & Theory
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            The research layer of kOA: models, arguments, and design constraints behind a governable
            knowledge-to-action ecosystem—built to be auditable, domain-bounded, and usable in real institutions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-50 border border-slate-200 text-slate-600">
              <Binary className="w-4 h-4" /> Evidence & Models
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-50 border border-slate-200 text-slate-600">
              <Scale className="w-4 h-4" /> Governance & Legitimacy
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-50 border border-slate-200 text-slate-600">
              <Microscope className="w-4 h-4" /> Design Constraints
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-20 mt-16">
        {/* 1) RESEARCH STANCE */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-100 rounded-lg text-slate-700 hidden sm:block">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Research stance</h2>
              <div className="prose prose-lg text-slate-600 max-w-none">
                <p>
                  kOA research is not a doctrine. It is a set of testable claims, design proposals, and governance
                  constraints meant to be challenged, revised, and improved.
                </p>

                <ul className="grid md:grid-cols-2 gap-4 list-none pl-0 not-prose my-6">
                  <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <Binary className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-slate-700">Empirical layer</span>
                    <span className="text-xs text-slate-500 ml-auto">data • evaluation • replication</span>
                  </li>
                  <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-700">Normative layer</span>
                    <span className="text-xs text-slate-500 ml-auto">rights • legitimacy • constraints</span>
                  </li>
                </ul>

                <p>
                  Where a line of work is labeled <strong>optional</strong>, it is explicitly separated from civic duties,
                  decision rights, and technical requirements. See{' '}
                  <Link href="/principles" className="font-bold text-primary hover:underline">
                    Principles
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2) ACTIVE RESEARCH */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Active research lines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* PI THEORY CARD (kept, but scoped as optional) */}
            <Link
              href="/research/pi-theory"
              className="group relative block h-full bg-slate-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>

              <div className="absolute -right-10 -bottom-10 w-64 h-64 border-4 border-slate-700/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-primary/20 text-primary rounded-lg border border-primary/30">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Optional</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  Pi Theory
                </h3>

                <p className="text-slate-400 leading-relaxed mb-6 flex-grow">
                  A speculative research thread exploring π as a recurring structure across patterns and models. This is
                  a personal/interpretive line of inquiry and is kept separate from civic legitimacy and technical requirements.
                </p>

                <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                  Read <span className="text-primary ml-2">→</span>
                </div>
              </div>
            </Link>

            {/* PLACEHOLDER FOR FUTURE RESEARCH */}
            <div className="flex flex-col items-start justify-between p-8 bg-slate-100 rounded-xl border border-dashed border-slate-300 text-slate-600 min-h-[300px]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Microscope className="w-10 h-10 opacity-60" />
                  <div>
                    <div className="font-bold text-slate-800">More modules coming</div>
                    <div className="text-xs text-slate-500">as pages are migrated from technical drafts</div>
                  </div>
                </div>

                <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
                  <li>Semantic sovereignty & offline knowledge infrastructure</li>
                  <li>Domain-bounded collective intelligence (merit, safety, scale)</li>
                  <li>Governable knowledge-to-action systems (auditability, legitimacy)</li>
                  <li>Institutional design: rights, due process, accountability mechanisms</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/technology"
                  className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:shadow-sm font-medium"
                >
                  Technology
                </Link>
                <Link
                  href="/initiatives/civic-governance"
                  className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:shadow-sm font-medium"
                >
                  Governance
                </Link>
                <Link
                  href="/principles"
                  className="px-4 py-2 rounded-md border border-slate-300 bg-white hover:shadow-sm font-medium"
                >
                  Principles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
