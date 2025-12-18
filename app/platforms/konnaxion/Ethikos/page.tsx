// app/platforms/konnaxion/ethikos/page.tsx
import Link from 'next/link';
import { Scale, MessageSquare, Users, BarChart3, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Ethikos Hub – Konnaxion",
  description: "The governance chamber for structured deliberation. Where conflict is transformed into productive disagreement.",
};

export default function EthikosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Ethikos</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The chamber of deliberation. Ethikos is the governance engine where signals are debated, structured, and weighed before decisions are solidified. It transforms raw disagreement into navigable data.
        </p>
      </div>

      {/* 1. THE TWO CHAMBERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Scale className="w-6 h-6 mr-3 text-primary" />
          The Two Chambers
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Korum */}
          <Link 
            href="/platforms/konnaxion/ethikos/korum"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Korum
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **Structured Debates.** Move beyond binary "Yes/No" arguments. Korum uses a -3 to +3 stance scale and threaded arguments to map the nuance of disagreement.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Debate Engine <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Konsultations */}
          <Link 
            href="/platforms/konnaxion/ethikos/konsultations"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Konsultations
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **Public Consultations.** Time-boxed, accountable participation cycles. Features weighted voting (EkoH integration) and mandatory impact tracking.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Consultation Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. ANALYTICS & INSIGHTS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
          Opinion Analytics
        </h2>
        
        <div className="p-6 bg-white border border-slate-200 rounded-xl">
          <p className="text-slate-600 mb-4">
            Both chambers feed into the <strong>Ethikos Insights</strong> engine (<code>/ethikos/insights</code>). This layer visualizes consensus health, polarization metrics, and expert cohort analysis in real-time.
          </p>
          <div className="flex gap-4 text-sm font-mono text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded">Consensus Metrics</span>
            <span className="bg-slate-100 px-2 py-1 rounded">Stance Distribution</span>
            <span className="bg-slate-100 px-2 py-1 rounded">Expert Weighting</span>
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/platforms/konnaxion" className="text-slate-500 hover:text-primary">
          ← Back to Konnaxion Hub
        </Link>
        <Link href="/platforms/konnaxion/kollective-intelligence" className="text-slate-500 hover:text-primary">
          Next: Kollective Intelligence →
        </Link>
      </div>

    </main>
  );
}