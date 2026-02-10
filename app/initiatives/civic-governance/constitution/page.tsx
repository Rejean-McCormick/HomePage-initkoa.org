// app/initiatives/civic-governance/constitution/page.tsx
import Link from 'next/link';
import { Scroll, Vote, GitPullRequest, Shield, Scale, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Civic Constitution — kOA',
  description:
    'The enforceable guarantees of the civic operating system: non-domination, auditability, offline-capable integrity, and rights to contest and exit.',
};

export default function ConstitutionPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
          <Scroll className="w-8 h-8 text-purple-700" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          The Civic Constitution
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          If kOA is an operating system, the Constitution is the <strong>kernel</strong>: the rules that bind power.
          It exists to prevent capture—so the system serves the public, not the operators.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Non-domination
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Auditability
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Offline-capable integrity
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Contestability
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Right to exit
          </span>
        </div>
      </div>

      {/* The 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Card 1: EkoH */}
        <Link
          href="/initiatives/civic-governance/constitution/ekoh"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <Vote className="text-purple-600 w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            EkoH: Decision Readings
          </h3>

          <p className="text-slate-600 mb-6 flex-grow">
            A transparent way to compare multiple readings of the same vote (e.g., baseline and competence-aware)
            without replacing democratic legitimacy. Rules are explicit and contestable.
          </p>

          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View EkoH <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Orgo */}
        <Link
          href="/platforms/orgo"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <GitPullRequest className="text-purple-600 w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            Orgo: Execution & Accountability
          </h3>

          <p className="text-slate-600 mb-6 flex-grow">
            The operational layer that turns decisions into routed work with closure, traceability, and durable memory.
            Authority is functional and reviewable—never silent, never permanent.
          </p>

          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View Orgo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Rights */}
        <Link
          href="/initiatives/civic-governance/constitution/rights"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <Shield className="text-purple-600 w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            Bill of Rights
          </h3>

          <p className="text-slate-600 mb-6 flex-grow">
            The social contract for participants: privacy of persons, transparency of institutions, the right to audit,
            the right to contest outcomes, and the right to exit.
          </p>

          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View Rights <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Philosophy Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
        <div className="flex items-start">
          <Scale className="w-8 h-8 mr-4 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              From text to enforceable guarantees
            </h2>

            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="mb-4">
                A constitution that cannot be verified becomes a story. kOA treats constitutional principles as
                <strong> enforceable constraints</strong>: decisions, delegations, and allocations must remain
                inspectable; critical functions must continue under degraded conditions; and power must remain
                contestable.
              </p>

              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                  <span>
                    <strong>Auditability:</strong> outcomes can be traced to inputs, rules, and authorized roles—no
                    invisible authority.
                  </span>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                  <span>
                    <strong>Fail-closed integrity:</strong> if verification fails, the system must degrade safely rather
                    than silently corrupting outcomes.
                  </span>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                  <span>
                    <strong>Contestability & exit:</strong> people can challenge decisions and, if needed, leave with
                    their data and ruleset (forkability as a last-resort safeguard).
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/initiatives/civic-governance/constitution/rights"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-purple-500 hover:shadow-sm transition-all"
                >
                  Read the Bill of Rights <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link
                  href="/initiatives/civic-governance/constitution/ekoh"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-purple-500 hover:shadow-sm transition-all"
                >
                  See EkoH decision readings <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
