// app/infrastructures/kristal-farms/infrastructures/page.tsx
import Link from 'next/link';
import { 
  Zap, 
  Server, 
  Network, 
  Undo2, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';

export const metadata = {
  title: 'Infrastructure – Kristal Farms',
  description: 'Technical deep dive: Local hydro integration, modular compute pads, and the fiber export trunk.',
};

export default function KFInfrastructure() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <Link 
            href="/infrastructures/kristal-farms" 
            className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Kristal Farms Hub
          </Link>
          <h1 className="text-4xl font-bold mb-6 text-slate-900">
            Physical Infrastructure
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We build the "socket," not the server. Our infrastructure is designed to bridge 
            clean local energy with global compute demand, minimizing transmission losses 
            and maximizing modularity.
          </p>
        </div>

        {/* 1. POWER SUPPLY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Local Energy Integration</h2>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <p className="text-lg text-slate-700 mb-6">
              Instead of building expensive high-voltage transmission lines to export power, 
              we consume it on-site. The grid architecture is hyper-local and efficient.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Short MV Feeder</h3>
                <p className="text-slate-600 text-sm">
                  A medium-voltage (MV) line connects the hydro plant directly to the village 
                  substation. This avoids long corridors, reduces line losses, and simplifies permitting.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Diesel Displacement</h3>
                <p className="text-slate-600 text-sm">
                  The hydro plant becomes the primary power source for the village. 
                  Existing diesel generators are relegated to emergency backup status only.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Smart Sequencing</h3>
                <p className="text-slate-600 text-sm">
                  Pad start-up is coordinated to prevent inrush currents from flickering the 
                  local grid. Protection devices ensure a fault in one pad doesn't trip the substation.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Load Management</h3>
                <p className="text-slate-600 text-sm">
                  Compute loads can be staged or curtailed. New pads are only powered on when 
                  there is confirmed heat sink capacity to absorb the waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. COMPUTE PADS */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-blue-100 p-3 rounded-lg">
              <Server className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">The Modular Pad Yard</h2>
          </div>
          <div className="prose text-slate-600 max-w-none mb-8">
            <p>
              The facility is a paved, secured yard at the port or village edge, designed for 
              standard ISO containers. We provide a turn-key "serviced slot" for tenant hardware.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl p-6">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-2 block">Format</span>
              <h3 className="font-bold text-slate-900 mb-2">40ft ISO Containers</h3>
              <p className="text-sm text-slate-600">
                Standard shipping container dimensions allow for marine delivery and rapid deployment via crane.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-2 block">Interfaces</span>
              <h3 className="font-bold text-slate-900 mb-2">Plug-and-Play</h3>
              <p className="text-sm text-slate-600">
                Each slot has quick-connect hookups for MV Power, Liquid Cooling (Supply/Return), and Fiber.
              </p>
            </div>
             <div className="border border-slate-200 rounded-xl p-6">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-2 block">Density</span>
              <h3 className="font-bold text-slate-900 mb-2">High-Density Ready</h3>
              <p className="text-sm text-slate-600">
                Designed to support high-performance AI hardware, with power delivery up to 1MW per container.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FIBER CONNECTIVITY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-purple-100 p-3 rounded-lg">
              <Network className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Data Export Trunk</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <p className="text-slate-600 mb-4">
                We export compute results, not electricity. A government-owned high-capacity fiber trunk 
                connects the remote site to global backbones.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>DWDM Capacity:</strong> The trunk supports 200–1000 Tbps, ensuring unlimited headroom for AI workloads.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Path Protection:</strong> Physical diversity in routing where feasible to prevent isolation from a single fiber cut.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>Redundant Uplinks:</strong> Each pad gets dual independent fiber drops (A/B) for failover reliability.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span><strong>NOC On-Site:</strong> A local Network Operations Center manages traffic, QoS, and monitoring.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full md:w-1/3 text-center">
               [Image: Diagram of Fiber Trunk connecting Village to Global Hub]
               <p className="text-xs text-slate-400 mt-2 italic">
                 Conceptual connectivity path
               </p>
            </div>
          </div>
        </section>

        {/* 4. REVERSIBILITY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-teal-100 p-3 rounded-lg">
              <Undo2 className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Reversibility & Restoration</h2>
          </div>
          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100">
             <h3 className="text-xl font-bold text-teal-900 mb-4">The "Leave No Trace" Promise</h3>
             <p className="text-slate-700 mb-6">
               Unlike traditional concrete data centers, Kristal Farms is designed to be fully reversible. 
               If the project ends, the site can be returned to its original state.
             </p>
             <div className="grid sm:grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-lg shadow-sm">
                 <strong className="block text-teal-800 mb-1">Modular Removal</strong>
                 <p className="text-xs text-slate-600">
                   Containers are lifted out by crane. No permanent buildings are left behind.
                 </p>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm">
                 <strong className="block text-teal-800 mb-1">Site Restoration</strong>
                 <p className="text-xs text-slate-600">
                   Pads and fencing are removed. The land is restored to baseline conditions defined in the lease.
                 </p>
               </div>
             </div>
          </div>
        </section>

      </div>
    </main>
  );
}