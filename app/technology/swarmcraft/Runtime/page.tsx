// app/technology/swarmcraft/runtime/page.tsx
import Link from 'next/link';
import { 
  Terminal, 
  Layers, 
  BrainCircuit, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';

export const metadata = {
  title: "Runtime & Operations – SwarmCraft",
  description: "Dashboard TUI, Multi-Project Management, RAG Memory, and Provider Adapters.",
};

export default function RuntimePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Terminal className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Runtime & Operations</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The operational layer of SwarmCraft. These modules handle the user interface, project isolation, long-term memory retrieval, and LLM provider integration.
        </p>
      </div>

      {/* 1. DASHBOARD & CONTROL */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Terminal className="w-6 h-6 mr-3 text-primary" />
          Control Surfaces
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Dashboard */}
          <Link 
            href="/technology/swarmcraft/runtime/dashboard-tui-reference"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Dashboard TUI Reference
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The "Mission Control" interface. A terminal UI that observes the engine state (SCAN/PLAN/EXECUTE) without blocking it.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Layout Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Multi-Project */}
          <Link 
            href="/technology/swarmcraft/runtime/multi-project-management"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Multi-Project Management
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              How SwarmCraft runs multiple isolated universes (Story Bibles + Matrices) in a single runtime without contamination.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Isolation Logic <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. MEMORY & ORCHESTRATION */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Database className="w-6 h-6 mr-3 text-blue-600" />
          Memory & Integration
        </h2>
        
        <div className="grid gap-6">
          
          {/* RAG Memory */}
          <Link 
            href="/technology/swarmcraft/runtime/rag-memory-system"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  RAG Memory System
                </h3>
                <p className="text-slate-600 text-sm">
                  Long-term continuity. Indexes manuscripts and notes to provide "Evidence" during drafting, preventing character drift.
                </p>
              </div>
              <BrainCircuit className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          {/* Prompt Hydration */}
          <Link 
            href="/technology/swarmcraft/runtime/orchestration-slice-by-slice-prompt-hydration"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Slice-by-Slice Prompt Hydration
                </h3>
                <p className="text-slate-600 text-sm">
                  The anti-sprawl mechanism. Injecting <em>only</em> the active Part's beats and contract into the LLM context.
                </p>
              </div>
              <Layers className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          {/* Provider Adapter */}
          <Link 
            href="/technology/swarmcraft/runtime/provider-adapter-grok"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Provider Adapter: Grok
                </h3>
                <p className="text-slate-600 text-sm">
                  The normalization layer that keeps the engine model-agnostic while leveraging Grok for execution.
                </p>
              </div>
              <Cpu className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/technology/swarmcraft/core" className="text-slate-500 hover:text-primary">
          ← Back to Core Logic
        </Link>
        <Link href="/technology/swarmcraft/scaffold" className="text-slate-500 hover:text-primary">
          Next: Scaffold Schema →
        </Link>
      </div>

    </main>
  );
}