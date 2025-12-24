// app/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/page.tsx
import Link from 'next/link';
import { BookOpen, Users, ShieldCheck, TrendingUp, AlertTriangle, Scale } from 'lucide-react';

export const metadata = {
  title: "Cultural Bridge Track – Ukraine Peace Plan",
  description: "A parallel non-military track focused on dignity, cultural resilience, and de-escalation margins.",
};

export default function CulturalBridgePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">The Cultural Bridge Track</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
          This is an <strong>optional, parallel branch</strong> to the main Freeze–Vote–Rebuild framework. It creates non-military "margins for dignity" to reduce dehumanization and support cultural repair without changing core security mechanics.
        </p>
      </div>

      {/* PILLARS */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        
        {/* Pillar 1 */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/01-russian-literature"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700">
            1. Russian Literature Dignity Program
          </h2>
          <p className="text-slate-600 mb-6">
            A curated, independently governed effort to expand access to the best of Russian literature and thought in libraries—explicitly separating culture from state violence.
          </p>
          <div className="flex items-center font-bold text-blue-600 text-sm">
            View Program Design <span className="ml-2">→</span>
          </div>
        </Link>

        {/* Pillar 2 */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/02-ukrainian-language-worldwide"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-yellow-500 hover:shadow-lg transition-all"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-yellow-700">
            2. Ukrainian Language Worldwide
          </h2>
          <p className="text-slate-600 mb-6">
            A large-scale access program for learning Ukrainian globally, employing Ukrainians as instructors and cultural ambassadors to strengthen resilience.
          </p>
          <div className="flex items-center font-bold text-yellow-600 text-sm">
            View Program Design <span className="ml-2">→</span>
          </div>
        </Link>

      </section>

      {/* IMPLEMENTATION & GOVERNANCE */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-3 text-emerald-600" />
          Governance & Operations
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/03-guardrails"
            className="block p-6 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
          >
            <h4 className="font-bold text-slate-900 mb-2">Guardrails & Anti-Propaganda</h4>
            <p className="text-sm text-slate-600">The strict rules that prevent this track from being captured or politicized.</p>
          </Link>

          <Link 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/04-funding-partnerships"
            className="block p-6 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
          >
            <h4 className="font-bold text-slate-900 mb-2">Funding & Partnerships</h4>
            <p className="text-sm text-slate-600">Implementation architecture: who runs it, who funds it, and how it scales.</p>
          </Link>

          <Link 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/05-metrics"
            className="block p-6 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
          >
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 mr-2 text-slate-500" />
              <h4 className="font-bold text-slate-900">Metrics & Evaluation</h4>
            </div>
            <p className="text-sm text-slate-600">Measuring outputs (titles, cohorts) and outcomes (resilience, employment) without sentiment scoring.</p>
          </Link>

          <Link 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/cultural-bridge/06-risks"
            className="block p-6 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 transition-all"
          >
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
              <h4 className="font-bold text-slate-900">Risks & Failsafes</h4>
            </div>
            <p className="text-sm text-slate-600">Responses to common critiques ("rewards Russia", "propaganda laundering") and trigger pauses.</p>
          </Link>
        </div>
      </section>

      {/* CONTEXT FOOTER */}
      <div className="border-t border-slate-200 pt-8 mt-8">
        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Relation to Core Framework</h4>
        <div className="bg-slate-50 p-6 rounded-lg text-sm text-slate-700 leading-relaxed">
          <p className="mb-2">
            <strong>Status:</strong> Optional / additive.
          </p>
          <p>
            This track creates space for dignity and de-escalation but does <strong>not</strong> substitute for security verification, accountability, or legal pathways defined in the main <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/00-welcome" className="text-blue-600 hover:underline">Freeze-Vote-Rebuild</Link> framework.
          </p>
        </div>
      </div>

    </main>
  );
}