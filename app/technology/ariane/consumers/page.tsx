// app\technology\ariane\consumers\page.tsx
// app/technology/ariane/consumers/page.tsx
import Link from 'next/link';
import { 
  Users, 
  Bot, 
  Layers, 
  Search, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Consumers – Ariane",
  description: "How external systems (AI agents, automation tools, humans) use the UI graph.",
};

export default function ConsumersPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Consumers</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Ariane is a data source. Theseus builds the graph, Atlas stores it, and <strong>Consumers</strong> query it to understand how to operate software.
        </p>
      </div>

      {/* 1. USAGE PATTERNS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Bot className="w-6 h-6 mr-3 text-primary" />
          Integration Patterns
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Agents */}
          <Link 
            href="/technology/ariane/consumers/consumers-ai-agent-integration"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              AI Agent Integration
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              How agents use Atlas to turn high-level goals ("Export to PDF") into concrete UI paths. State recognition, intent lookup, and planning.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Agent Flow <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Hybrid / Human */}
          <Link 
            href="/technology/ariane/consumers/hybrid-mapping-and-human-guided-assistants"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Hybrid Mapping
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Combining automated exploration with human-guided recording for complex or sensitive workflows.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Hybrid Model <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. CONCEPTS & FUTURE */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Layers className="w-6 h-6 mr-3 text-blue-600" />
          Concepts & Future
        </h2>
        
        <div className="grid gap-6">
          <Link 
            href="/technology/ariane/consumers/consumers-future-overlay-client"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Overlay Client (Concept)
                </h3>
                <p className="text-slate-600 text-sm">
                  A theoretical consumer that draws guidance (arrows, highlights) directly on top of existing applications.
                </p>
              </div>
              <Search className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link 
            href="/technology/ariane/consumers/consumers"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  General Consumers Overview
                </h3>
                <p className="text-slate-600 text-sm">
                  The broad categories of systems that read Atlas: Agents, Automation scripts, and Analysis tools.
                </p>
              </div>
              <Users className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/technology/ariane" className="text-slate-500 hover:text-primary">
          ← Back to Ariane Hub
        </Link>
        <Link href="/technology/ariane/atlas" className="text-slate-500 hover:text-primary">
          View Atlas (Storage) →
        </Link>
      </div>

    </main>
  );
}