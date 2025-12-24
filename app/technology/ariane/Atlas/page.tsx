// app\technology\ariane\atlas\page.tsx
// app/technology/ariane/atlas/page.tsx
import Link from 'next/link';
import { 
  Database, 
  Network, 
  FileJson, 
  Tags, 
  ArrowRight,
  Book
} from 'lucide-react';

export const metadata = {
  title: "Atlas – UI Graph & Ontology",
  description: "The storage and semantic layer of Ariane. Where UI states, transitions, and intents are persisted.",
};

export default function AtlasPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Database className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Atlas</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Atlas is the persistent memory of Ariane. It stores the UI graphs discovered by Theseus and enriches them with semantic meaning (intents, patterns, roles) so consumers can query them.
        </p>
      </div>

      {/* 1. CORE MODEL */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Network className="w-6 h-6 mr-3 text-primary" />
          Graph Structure
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overview */}
          <Link 
            href="/technology/ariane/atlas/atlas"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Atlas Overview
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The high-level responsibilities: Graph storage, schema enforcement, semantic enrichment, and versioning.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Architecture <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Graph Model */}
          <Link 
            href="/technology/ariane/atlas/atlas-graph-model"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Graph Model
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Definitions of <strong>Nodes</strong> (States) and <strong>Edges</strong> (Transitions). Directed, labeled, and potentially cyclic.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Model Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. SCHEMA & SEMANTICS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Book className="w-6 h-6 mr-3 text-blue-600" />
          Schema & Semantics
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          
          <Link 
            href="/technology/ariane/atlas/atlas-core-schema"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Core Schema
                </h3>
                <p className="text-slate-600 text-sm">
                  The formal JSON structure for Contexts, States, Elements, and Transitions.
                </p>
              </div>
              <FileJson className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link 
            href="/technology/ariane/atlas/atlas-ontology-vocabulary"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Ontology Vocabulary
                </h3>
                <p className="text-slate-600 text-sm">
                  The standardized vocabulary for UI intents (e.g., "Submit", "Cancel") and patterns (e.g., "Modal").
                </p>
              </div>
              <Tags className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/technology/ariane" className="text-slate-500 hover:text-primary">
          ← Back to Ariane Hub
        </Link>
        <Link href="/technology/ariane/consumers" className="text-slate-500 hover:text-primary">
          Next: Consumers →
        </Link>
      </div>

    </main>
  );
}