// app\technology\ariane\theseus\page.tsx
// app/technology/ariane/theseus/page.tsx
import Link from 'next/link';
import { 
  Compass, 
  Search, 
  Fingerprint, 
  Terminal, 
  ArrowRight,
  ScanSearch
} from 'lucide-react';

export const metadata = {
  title: "Theseus – Exploration Engine",
  description: "The engine that explores software to discover UI states and transitions.",
};

export default function TheseusPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Theseus</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The exploration engine of Ariane. Theseus inspects real software, discovers distinct UI states, and records the transitions that connect them.
        </p>
      </div>

      {/* 1. CORE LOGIC */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Search className="w-6 h-6 mr-3 text-primary" />
          Exploration Logic
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overview */}
          <Link 
            href="/technology/ariane/theseus/theseus"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Theseus Overview
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The high-level architecture: separating platform-agnostic logic from specific drivers to build a consistent graph.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Architecture <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Exploration Engine */}
          <Link 
            href="/technology/ariane/theseus/theseus-exploration-engine"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              Exploration Engine
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The core loop: Action Selection, Traversal Strategy (DFS), and Safety Management to map the UI without breaking it.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Engine Logic <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. MECHANICS & DRIVERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <ScanSearch className="w-6 h-6 mr-3 text-blue-600" />
          Mechanics
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          
          <Link 
            href="/technology/ariane/theseus/theseus-state-identification"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  State Identification
                </h3>
                <p className="text-slate-600 text-sm">
                  How Theseus decides "Where am I?" using structural, visual, and semantic fingerprints.
                </p>
              </div>
              <Fingerprint className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link 
            href="/technology/ariane/theseus/theseus-drivers"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Drivers
                </h3>
                <p className="text-slate-600 text-sm">
                  Platform-specific adapters (Web, Desktop, Mobile) that normalize the UI into a tree Theseus can understand.
                </p>
              </div>
              <Terminal className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
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