// app\technology\voting-machine\integration\page.tsx
// app/technology/voting-machine/integration/page.tsx
import Link from 'next/link';
import { 
  Terminal, 
  FileText, 
  Code, 
  CheckCircle,
  ArrowLeft,
  LayoutTemplate
} from 'lucide-react';

export const metadata = {
  title: 'Integration & Reporting – VM-ENGINE',
  description: 'Guide for embedding VM-ENGINE: CLI contracts, read-only reporting templates, and audit verification.',
};

export default function VMIntegration() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16">
          <Link 
            href="/technology/voting-machine" 
            className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to VM-ENGINE Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Integration & Reporting
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            Treat the engine as a pure function. Invoke it via CLI, consume its canonical JSON outputs, 
            and render reports using read-only templates. Never re-compute allocations in the view layer.
          </p>
        </div>

        {/* 1. CLI CONTRACT */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Terminal className="w-8 h-8 text-slate-900" />
            <h2 className="text-2xl font-bold text-slate-900">1. The CLI Contract</h2>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-6 text-slate-200 font-mono text-sm mb-8 shadow-xl">
            <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
              <span className="text-red-400">●</span>
              <span className="text-yellow-400">●</span>
              <span className="text-green-400">●</span>
            </div>
            <p className="mb-4 text-slate-400"># Standard invocation pattern</p>
            <p className="mb-2">
              <span className="text-green-400">vm_cli</span> \
            </p>
            <p className="pl-4 mb-2">
              <span className="text-blue-400">--registry</span> ./inputs/registry.json \
            </p>
            <p className="pl-4 mb-2">
              <span className="text-blue-400">--tally</span>    ./inputs/tally.json \
            </p>
            <p className="pl-4 mb-2">
              <span className="text-blue-400">--params</span>   ./inputs/params.json \
            </p>
            <p className="pl-4 mb-2">
              <span className="text-blue-400">--out</span>      ./outputs/run_01
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 p-5 rounded-lg">
              <strong className="block text-slate-900 mb-2">Exit Code 0</strong>
              <p className="text-sm text-slate-600">Success. All artifacts emitted and hashes verified.</p>
            </div>
            <div className="border border-slate-200 p-5 rounded-lg">
              <strong className="block text-red-600 mb-2">Exit Code 2</strong>
              <p className="text-sm text-slate-600">Validation Error. Input schema or referential integrity failed.</p>
            </div>
            <div className="border border-slate-200 p-5 rounded-lg">
              <strong className="block text-red-600 mb-2">Exit Code 3</strong>
              <p className="text-sm text-slate-600">Verification Failure. Post-run hash check mismatch (critical).</p>
            </div>
          </div>
        </section>

        {/* 2. REPORTING RULES (DOC 7) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">2. Reporting Rules (Doc 7)</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">The "Read-Only" Principle</h3>
              <p className="text-slate-600 mb-6">
                The renderer consumes <code>result.json</code> and <code>run_record.json</code>. 
                It <strong>must not</strong> re-calculate shares, margins, or winners. 
                Visual logic is strictly separated from business logic.
              </p>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700"><strong>Numeric Format:</strong> Percentages show one decimal (e.g., 54.5%). Round half up. No locale-specific separators in raw data.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700"><strong>Ordering:</strong> Allocation tables typically follow Registry order, not vote count, to preserve neutrality.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700"><strong>Presentation Toggles:</strong> Variables 060-062 control labels and language but do <em>not</em> affect the Formula ID (FID).</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4" /> Report Footer Template
              </h3>
              <div className="bg-white p-4 rounded border border-slate-200 text-xs text-slate-500 font-mono space-y-2">
                <p>Formula ID: <span className="text-slate-900">a3f9...8b21</span></p>
                <p>Engine Version: <span className="text-slate-900">v1.2.0</span></p>
                <p>Algorithm Variant: <span className="text-slate-900">v1 (Standard)</span></p>
                <div className="h-px bg-slate-100 my-2"></div>
                <p>Tie Policy: <span className="text-slate-900">random</span></p>
                <p>RNG Seed: <span className="text-slate-900">424242</span> (Event count: 1)</p>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic">
                *Required disclosure block on every official report page.
              </p>
            </div>
          </div>
        </section>

        {/* 3. VERIFICATION */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Code className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">3. Independent Verification</h2>
          </div>
          <p className="text-slate-600 mb-8">
            Any third party can verify a run by re-executing the engine with the provided inputs. 
            Verification succeeds if the output hashes match exactly.
          </p>
          
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 mb-4">Formula ID (FID) Audit</h3>
            <p className="text-sm text-purple-800 mb-4">
              The FID is a hash of the <strong>Normative Manifest</strong> (the algorithm rules + included variables). 
              It proves that the logic wasn't secretly tweaked for a specific run.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="block text-xs text-slate-500 uppercase">Included in FID</strong>
                <span className="text-sm font-mono text-slate-900">Thresholds, Frontier logic, Rounding rules, Tie Policy</span>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="block text-xs text-slate-500 uppercase">Excluded from FID</strong>
                <span className="text-sm font-mono text-slate-900">Visual labels, Language settings, Report layout options</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}