// app\technology\ariane\concepts\page.tsx
// app/technology/ariane/concepts/page.tsx
import Link from 'next/link';
import { Lightbulb, Book, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Concepts – Ariane",
  description: "Foundational concepts and glossary for the UI Graph engine.",
};

export default function ArianeConceptsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Lightbulb className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Ariane Concepts</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The theoretical foundation of Ariane. Understanding why we treat user interfaces as data structures and the vocabulary used to describe them.
        </p>
      </div>

      {/* LINKS GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Background */}
        <Link 
          href="/technology/ariane/concepts/background-ui-as-data" 
          className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center group-hover:text-primary">
             <Book className="w-5 h-5 mr-2 text-blue-600" />
             Background: UI as Data
          </h3>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            Why we need to treat interfaces as semantic graphs, not just pixels. The bridge between procedural knowledge and machine execution.
          </p>
           <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              Read Background <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>

        {/* Glossary */}
        <Link 
          href="/technology/ariane/concepts/glossary" 
          className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center group-hover:text-primary">
             <FileText className="w-5 h-5 mr-2 text-emerald-600" />
             Glossary
          </h3>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            Definitions for State, Transition, Intent, Fingerprint, and the core vocabulary of the Ariane ontology.
          </p>
           <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Definitions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>

      </div>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 mt-12">
        <Link href="/technology/ariane" className="text-slate-500 hover:text-primary text-sm font-medium">
          ← Back to Ariane Hub
        </Link>
      </div>

    </main>
  );
}