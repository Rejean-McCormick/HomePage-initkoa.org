// app\technology\voting-machine\specifications\page.tsx
// app/technology/voting-machine/specifications/page.tsx
import Link from 'next/link';
import { 
  Database, 
  GitBranch, 
  ShieldAlert, 
  Terminal, 
  ArrowLeft,
  FileJson,
  Layers
} from 'lucide-react';

export const metadata = {
  title: 'VM-ENGINE Specifications – Data Models & Algorithms',
  description: 'Normative specifications for the VM-ENGINE: Data models, algorithmic step order, gating logic, and the canonical pipeline.',
};

export default function VMSpecs() {
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
            Technical Specifications
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            The machine operates on a strict set of normative documents (Docs 1–7). 
            Below is the condensed engineering reference for the Data Model, Algorithm, and Pipeline.
          </p>
        </div>

        {/* 1. DATA MODEL (DOC 1) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Database className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">1. Canonical Data Model</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileJson className="w-4 h-4" /> Inputs (Consumed)
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li>
                    <strong>DivisionRegistry:</strong> The stable universe of <code>units</code> and <code>options</code>. Defines the deterministic <code>order_index</code> for every option.
                  </li>
                  <li>
                    <strong>BallotTally:</strong> Votes per unit/option. Must referentially align with the Registry.
                  </li>
                  <li>
                    <strong>ParameterSet:</strong> The configuration map. Must explicitly set all <strong>Included</strong> VM-VARs (outcome-affecting variables).
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileJson className="w-4 h-4" /> Outputs (Produced)
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li>
                    <strong>Result:</strong> The canonical outcome. Contains allocations, aggregates, and the <code>formula_id</code> (FID).
                  </li>
                  <li>
                    <strong>RunRecord:</strong> The cryptographic audit trail. Contains input hashes, engine version, effective variables, and the <code>TieLog</code>.
                  </li>
                  <li>
                    <strong>FrontierMap (Optional):</strong> Per-unit diagnostics for the frontier gating model (if enabled).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ALGORITHM FLOW (DOC 4A) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <GitBranch className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">2. Algorithmic Step Order</h2>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <p className="text-slate-600 text-sm">
                The engine must execute stages in this exact order to guarantee determinism. 
                Ordering of units is always by ascending <code>unit_id</code>.
              </p>
            </div>
            
            <div className="divide-y divide-slate-100">
              <StepRow 
                step="S0" 
                title="Normalize & Seed" 
                desc="Canonicalize inputs. Bind algorithm family constants. Initialize RNG seed (no draws yet)." 
              />
              <StepRow 
                step="S1" 
                title="Per-Unit Tallies" 
                desc="Load votes. Compute raw shares and base metrics required for gating." 
              />
              <StepRow 
                step="S2" 
                title="Gates (Sanity/Eligibility)" 
                desc="Apply Doc 4B gates. If a unit fails, mark Invalid and skip allocation. Record reasons." 
              />
              <StepRow 
                step="S3" 
                title="Frontier Hook" 
                desc="If enabled (VM-VAR-040), apply band/cut logic. Emit diagnostics to FrontierMap." 
              />
              <StepRow 
                step="S4" 
                title="Core Allocation" 
                desc="Compute allocations using the Algorithm Family rules (001-007). Deterministic; no RNG." 
              />
              <StepRow 
                step="S5" 
                title="Tie Resolution" 
                desc="If ties exist: Apply policy (050). If 'random', consume exactly k draws from RNG (052) and log event." 
              />
              <StepRow 
                step="S6" 
                title="Emit Artifacts" 
                desc="Build canonical Result and RunRecord. Compute FID. Self-verify all hashes before exit." 
              />
            </div>
          </div>
        </section>

        {/* 3. GATES & INVALIDATION (DOC 4B) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <ShieldAlert className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-900">3. Gates & Edge Cases</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="prose text-slate-600">
              <p>
                Before allocation, every unit must pass a series of <strong>Gates</strong>. 
                If any gate fails, the unit is marked <code>Invalid</code>, receives no allocation, 
                and the reason is recorded in the <code>RunRecord</code>.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Sanity Gates:</strong> Data plausibility (e.g., votes &le; ballots).</li>
                <li><strong>Eligibility Gates:</strong> Minimum turnout or share thresholds.</li>
                <li><strong>Validity Gates:</strong> Integrity floors (VM-VAR-031).</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-3">The "Invalid" State</h4>
              <p className="text-sm text-orange-800 mb-4">
                There is no "provisional" allocation. A unit is either Valid or Invalid.
              </p>
              <div className="bg-white p-4 rounded border border-orange-200 font-mono text-xs text-slate-700">
                {`{
  "unit_id": "U-001",
  "label": "Invalid",
  "allocations": [],
  "reasons": ["VM-VAR-020:min_turnout"]
}`}
              </div>
            </div>
          </div>
        </section>

        {/* 4. PIPELINE & EXIT CODES (DOC 5) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Terminal className="w-8 h-8 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-900">4. Pipeline Contracts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 p-6 rounded-xl">
              <strong className="block text-lg text-slate-900 mb-2">Exit Code 2</strong>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Validation Error</span>
              <p className="text-sm text-slate-600 mt-2">
                Input schema violation, referential integrity failure, or ordering precondition unmet.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl">
              <strong className="block text-lg text-slate-900 mb-2">Exit Code 3</strong>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Verification Failure</span>
              <p className="text-sm text-slate-600 mt-2">
                Post-run self-check failed. The computed hash of an artifact does not match its embedded ID.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl">
              <strong className="block text-lg text-slate-900 mb-2">Exit Code 5</strong>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Spec Violation</span>
              <p className="text-sm text-slate-600 mt-2">
                Internal determinism breach (e.g., RNG used when policy is not 'random').
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function StepRow({ step, title, desc }: { step: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-6 hover:bg-slate-50 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
        {step}
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}