import { GitPullRequest, RefreshCw, Layers, Search, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Orgo: Dynamic Governance – KOA",
  description: "Role-based execution. Authority is rented, never owned. Replacing the Pyramid with the Network.",
};

export default function OrgoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <GitPullRequest className="w-8 h-8 text-blue-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Orgo: Dynamic Governance</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed">
          Traditional organizations are <strong>Pyramids</strong>: static, opaque, and slow. <br/>
          KOA organizations are <strong>Networks</strong>: fluid, transparent, and self-correcting.
        </p>
      </div>

      {/* The Paradigm Shift */}
      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 border border-slate-200 rounded-2xl bg-slate-50 opacity-70">
          <h3 className="text-lg font-bold text-slate-500 mb-4 uppercase tracking-widest">Legacy OS (The Pyramid)</h3>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✖</span>
              <span><strong>Static Titles:</strong> "I am the Director." (Status-based)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✖</span>
              <span><strong>Opaque Power:</strong> Decisions happen behind closed doors.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-2">✖</span>
              <span><strong>Rigid:</strong> Reorgs take 2 years and cost millions.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 border border-blue-200 rounded-2xl bg-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">LIVE</div>
          <h3 className="text-lg font-bold text-blue-700 mb-4 uppercase tracking-widest">Orgo OS (The Network)</h3>
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span><strong>Dynamic Roles:</strong> "I fill the Logistics Role." (Function-based)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span><strong>Open Ledger:</strong> Every decision is recorded on-chain.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span>
              <span><strong>Fluid:</strong> The structure updates instantly based on need.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Core Mechanics */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center">
          <Layers className="mr-3 text-blue-600" />
          The 3 Laws of Orgo
        </h2>

        <div className="space-y-8">
          
          {/* Law 1: Roles */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">1</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Authority is Rented, Not Owned</h3>
              <p className="text-slate-600 leading-relaxed">
                In Orgo, nobody "is" the CEO. People hold <strong>Roles</strong>. A Role is a clear set of accountabilities (e.g., "Ensure trucks are full"). 
                If you stop performing, you are removed from the Role, but you remain a citizen. You do not lose your identity, just your assignment.
              </p>
            </div>
          </div>

          {/* Law 2: The Loop */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">2</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Governance as Software Updates</h3>
              <p className="text-slate-600 leading-relaxed">
                When a citizen notices a problem (a "Tension"), they don't complain; they submit a <strong>Proposal</strong> to update the code of the organization.
                <br/>
                <span className="font-mono text-xs bg-slate-100 p-1 rounded text-slate-500 mt-2 inline-block">
                  INPUT: "Trucks are slow" → PROCESS: Team Vote → OUTPUT: New Rule "Drivers must use GPS"
                </span>
              </p>
            </div>
          </div>

          {/* Law 3: Transparency */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">3</div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">The Open Ledger</h3>
              <p className="text-slate-600 leading-relaxed">
                There are no "closed door meetings." Every budget allocation, every role assignment, and every vote is recorded on the public blockchain.
                If it's not on the chain, it didn't happen.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* The Visual Loop */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center">
        <RefreshCw className="w-12 h-12 text-blue-500 mx-auto mb-6 animate-spin-slow" />
        <h3 className="text-2xl font-bold text-white mb-4">The Self-Correcting Organism</h3>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          Unlike a bureaucracy, which resists change, an Orgo organization <strong>craves</strong> change. Every tension felt by a user is a signal used to optimize the system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Step 1</div>
            <div className="text-white font-bold">Sense Tension</div>
            <div className="text-slate-400 text-sm">"Something isn't working."</div>
          </div>
          <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Step 2</div>
            <div className="text-white font-bold">Propose Update</div>
            <div className="text-slate-400 text-sm">"Let's change the rule."</div>
          </div>
          <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Step 3</div>
            <div className="text-white font-bold">Commit Change</div>
            <div className="text-slate-400 text-sm">New protocol active instantly.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-16 flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div>
          <h4 className="font-bold text-slate-900">Ready to contribute?</h4>
          <p className="text-sm text-slate-600">Find an open Role in the Civic Network.</p>
        </div>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-colors">
          <Search className="w-4 h-4 mr-2" />
          Browse Roles
        </button>
      </div>

    </main>
  );
}