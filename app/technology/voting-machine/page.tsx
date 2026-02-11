// app/technology/voting-machine/page.tsx
import Link from 'next/link';
import { 
  Cpu, 
  FileJson, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  GitCommit,
  Network
} from 'lucide-react';

export const metadata = {
  title: 'VM-ENGINE – Deterministic Electoral Core',
  description: 'A pure-function component for byte-identical electoral simulation across platforms.',
};

export default function VotingMachineIndex() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO */}
        <div className="mb-20 border-b border-gray-200 pb-10">
          <div className="flex items-center gap-3 text-primary font-mono text-sm font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-5 h-5" />
            <span>Core Component</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            VM-ENGINE
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-8">
            A deterministic electoral simulation core. It is not a "black box" in the opaque sense, 
            but a <strong>pure function</strong>: it accepts canonical inputs and produces 
            byte-identical outputs across any operating system or architecture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/technology/voting-machine/specifications"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary transition-colors"
            >
              View Specifications <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/technology/voting-machine/integration"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold hover:border-slate-900 transition-colors"
            >
              Integration Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* THE PURE FUNCTION DIAGRAM */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The "Pure Function" Contract</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              
              {/* INPUTS */}
              <div className="flex-1 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 font-mono text-sm text-blue-600 mb-2">
                    <FileJson className="w-4 h-4" /> registry.json
                  </div>
                  <p className="text-xs text-slate-500">Universe of units & options</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 font-mono text-sm text-blue-600 mb-2">
                    <FileJson className="w-4 h-4" /> tally.json
                  </div>
                  <p className="text-xs text-slate-500">Votes per unit/option</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 font-mono text-sm text-blue-600 mb-2">
                    <FileJson className="w-4 h-4" /> params.json
                  </div>
                  <p className="text-xs text-slate-500">Algorithm config & variables</p>
                </div>
              </div>

              {/* ENGINE */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-slate-300 mb-2 rotate-90 md:rotate-0" />
                <div className="w-32 h-32 bg-slate-900 rounded-full flex flex-col items-center justify-center text-white shadow-xl ring-4 ring-slate-100">
                  <Cpu className="w-10 h-10 mb-2" />
                  <span className="font-bold text-sm">VM-ENGINE</span>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-300 mt-2 rotate-90 md:rotate-0" />
              </div>

              {/* OUTPUTS */}
              <div className="flex-1 space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 font-mono text-sm text-green-700 mb-2">
                    <FileJson className="w-4 h-4" /> result.json
                  </div>
                  <p className="text-xs text-slate-500">Canonical outcome & labels</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-purple-500">
                  <div className="flex items-center gap-2 font-mono text-sm text-purple-700 mb-2">
                    <ShieldCheck className="w-4 h-4" /> run_record.json
                  </div>
                  <p className="text-xs text-slate-500">Cryptographic audit trail</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* KEY GUARANTEES */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors">
            <Lock className="w-8 h-8 text-slate-900 mb-4" />
            <h3 className="text-xl font-bold mb-3">Byte-Identical Determinism</h3>
            <p className="text-slate-600">
              With identical inputs and seeds, the engine produces outputs that are bit-for-bit identical 
              on any machine. We achieve this by enforcing a strictly canonical JSON format with 
              sorted keys and stable array ordering.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors">
            <Network className="w-8 h-8 text-slate-900 mb-4" />
            <h3 className="text-xl font-bold mb-3">Offline & Hermetic</h3>
            <p className="text-slate-600">
              The engine performs <strong>no network I/O</strong> during official runs. It is a self-contained 
              binary that verifies its own input hashes and fails hard upon any spec violation.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors">
            <GitCommit className="w-8 h-8 text-slate-900 mb-4" />
            <h3 className="text-xl font-bold mb-3">Formula ID (FID)</h3>
            <p className="text-slate-600">
              We separate "outcomes" from "presentation". Outcome-affecting rules are hashed into a 
              <strong>Formula ID</strong>. Changing a visual label does not change the FID; changing a 
              rounding rule does.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors">
            <Cpu className="w-8 h-8 text-slate-900 mb-4" />
            <h3 className="text-xl font-bold mb-3">Pinned Randomness</h3>
            <p className="text-slate-600">
              Tie-breaking is not arbitrary. When <code>random</code> policy is selected, the engine uses a 
              frozen RNG profile seeded once per run. A k-way tie consumes exactly <em>k</em> draws.
            </p>
          </div>
        </section>

        {/* DEEP DIVE LINKS */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/technology/voting-machine/specifications" className="group block bg-slate-900 text-white p-8 rounded-2xl hover:bg-slate-800 transition-all">
            <h3 className="text-2xl font-bold mb-2 group-hover:underline decoration-white underline-offset-4">Technical Specifications</h3>
            <p className="text-slate-400 mb-6">
              The rigorous engineering documentation. Data models, Algorithm Flow, Gates, and the Pipeline State Machine.
            </p>
            <div className="flex items-center text-sm font-bold">
              Read Specs <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link href="/technology/voting-machine/integration" className="group block bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:border-slate-400 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:underline decoration-slate-900 underline-offset-4">Integration & Reporting</h3>
            <p className="text-slate-600 mb-6">
              How to embed VM-ENGINE in a larger system. CLI contracts, read-only reporting templates, and audit verification.
            </p>
            <div className="flex items-center text-sm font-bold text-slate-900">
              View Guide <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}