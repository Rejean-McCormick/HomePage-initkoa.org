// app/technology/swarmcraft/core/page.tsx
import Link from 'next/link';
import { 
  Cpu, 
  GitMerge, 
  Database, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Core Logic – SwarmCraft",
  description: "The deterministic engine: Brain, Logic, and Memory layers.",
};

export default function CoreLogicPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Cpu className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Core Logic</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          SwarmCraft is not a chatbot. It is a state-driven engine that separates <strong>Brain</strong> (LLM personas), <strong>Logic</strong> (orchestration), and <strong>Memory</strong> (explicit state) to ensure deterministic, long-form coherence.
        </p>
      </div>

      {/* 1. ARCHITECTURE OVERVIEW */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <GitMerge className="w-6 h-6 mr-3 text-primary" />
          The Three-Layer Model
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Concept Card */}
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Architecture Overview</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Understand how SwarmCraft prevents hallucinations by separating the "Brain" (stateless personas) from the "Memory" (canonical state).
            </p>
            <Link 
              href="/technology/swarmcraft/core/architecture-overview"
              className="inline-flex items-center font-bold text-primary hover:underline text-sm"
            >
              View Diagram & Layers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Pipeline Card */}
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">The Deterministic Pipeline</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The <strong>SCAN → PLAN → EXECUTE</strong> loop. How the engine recomputes reality from disk before every single action.
            </p>
            <Link 
              href="/technology/swarmcraft/core/deterministic-pipeline-scan-plan-execute"
              className="inline-flex items-center font-bold text-primary hover:underline text-sm"
            >
              Trace the Loop <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATE MANAGEMENT */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Database className="w-6 h-6 mr-3 text-blue-600" />
          State & Runtime
        </h2>
        
        <div className="grid gap-6">
          <Link 
            href="/technology/swarmcraft/core/central-matrix-runtime-state"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Central Matrix (matrix.json)
                </h3>
                <p className="text-slate-600 text-sm">
                  The machine-readable view of "what exists and what is next." Tracks status (EMPTY, DRAFTING, LOCKED) for every Part.
                </p>
              </div>
              <Activity className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/technology/swarmcraft" className="text-slate-500 hover:text-primary">
          ← Back to SwarmCraft Hub
        </Link>
        <Link href="/technology/swarmcraft/scaffold" className="text-slate-500 hover:text-primary">
          Next: Story Scaffold →
        </Link>
      </div>

    </main>
  );
}