// app/initiatives/civic-governance/modules/page.tsx
import Link from 'next/link';
import { GraduationCap, TrendingUp, Scale, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Civic Modules — kOA',
  description:
    'Education (competence), Economy (solidarity), and Justice (fairness): the active modules of the Civic Governance framework.',
};

export default function ModulesHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Civic Modules</h1>
        <p className="text-xl text-slate-600">
          The Civic Governance framework is organized into modules that map to core civic functions. Each module is
          designed to be <strong>auditable</strong>, <strong>contestable</strong>, and implementable without relying on
          opaque authority.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Pill>Competence</Pill>
          <Pill>Solidarity</Pill>
          <Pill>Fairness</Pill>
          <Pill>Auditability</Pill>
          <Pill>Recourse</Pill>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/initiatives/civic-governance/constitution"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 border-b border-slate-200 hover:border-slate-900 transition-colors"
          >
            Read the Constitution →
          </Link>
          <Link
            href="/initiatives/civic-governance/constitution/rights"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 border-b border-slate-200 hover:border-slate-900 transition-colors"
          >
            Rights & guarantees →
          </Link>
          <Link
            href="/initiatives/civic-governance/constitution/ekoh"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 border-b border-slate-200 hover:border-slate-900 transition-colors"
          >
            EkoH (competence signals) →
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <Link
          href="/initiatives/civic-governance/modules/education"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700 mr-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700">Education</h2>
          </div>
          <p className="text-slate-600 mb-4">
            <strong>Competence-first education.</strong> Replace time-based credentials with verified skill portfolios,
            peer validation, and portable proof of learning—designed to remain usable even when institutions fail.
          </p>
          <div className="flex items-center text-sm font-bold text-blue-600">
            Explore module <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Economy */}
        <Link
          href="/initiatives/civic-governance/modules/economy"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mr-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-amber-700">Economy</h2>
          </div>
          <p className="text-slate-600 mb-4">
            <strong>Solidarity-through-coordination.</strong> Mechanisms for non-extractive exchange, cooperative logistics,
            and cost reduction—focused on turning collective decisions into executed work with clear accountability.
          </p>
          <div className="flex items-center text-sm font-bold text-amber-600">
            Explore module <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Justice */}
        <Link
          href="/initiatives/civic-governance/modules/justice"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-500 hover:shadow-md transition-all md:col-span-2"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700 mr-3">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-700">Justice</h2>
          </div>
          <p className="text-slate-600 mb-4">
            <strong>Procedural fairness at scale.</strong> A governable pipeline for discovery, deliberation, drafting,
            decision, and accountability—prioritizing due process, audit trails, and real recourse over black-box outcomes.
          </p>
          <div className="flex items-center text-sm font-bold text-slate-600">
            Explore module <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <Link href="/initiatives/civic-governance" className="text-slate-500 hover:text-primary text-sm font-medium">
          ← Back to Governance Hub
        </Link>
      </div>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
      {children}
    </span>
  );
}
