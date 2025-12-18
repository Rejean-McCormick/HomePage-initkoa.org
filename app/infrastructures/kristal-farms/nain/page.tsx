// app/infrastructures/kristal-farms/nain/page.tsx
import Link from 'next/link';
import { 
  Hammer, 
  TrendingUp, 
  MapPin, 
  Timer, 
  ArrowLeft,
  DollarSign,
  Droplets,
  Zap
} from 'lucide-react';

export const metadata = {
  title: 'Project Nain – Labrador Pilot',
  description: 'The implementation plan for the 15MW government-owned export hub in Nain, Labrador.',
};

export default function NainProject() {
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
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">PILOT PROJECT</span>
            <span className="text-slate-400 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" /> Nain, Labrador</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-slate-900">
            Nain AI Compute Export Hub
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A publicly owned, 15MW renewable energy project exporting AI compute capacity 
            via fiber instead of transmitting electricity.
          </p>
        </div>

        {/* 1. PROJECT SCOPE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-900">Scope & Rationale</h2>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="mb-6 text-slate-700">
              The Government of Newfoundland and Labrador is launching a nation-scale tech-energy export initiative. 
              All infrastructure is <strong>publicly funded and owned</strong>.
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <strong className="block text-slate-900 mb-1">Generation</strong>
                <span className="text-sm text-slate-600">New 15–20 MW run-of-river hydro plant on Fraser River.</span>
              </li>
              <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <strong className="block text-slate-900 mb-1">Export Trunk</strong>
                <span className="text-sm text-slate-600">200–1000 Tbps Fiber cable to Goose Bay (300km).</span>
              </li>
              <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <strong className="block text-slate-900 mb-1">Facility</strong>
                <span className="text-sm text-slate-600">Modular container yard at Nain port with serviced slots.</span>
              </li>
              <li className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <strong className="block text-slate-900 mb-1">Business Model</strong>
                <span className="text-sm text-slate-600">Lease "serviced slots" to tenants. No government server ownership.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. CAPEX BREAKDOWN */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-900">Capital Investment (~$200M)</h2>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-slate-100">
              <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                <span className="font-medium text-slate-700">Hydro Plant (15–20 MW)</span>
                <span className="font-mono font-bold text-slate-900">$80–100 M</span>
              </div>
              <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                <span className="font-medium text-slate-700">Fiber Trunk (300km)</span>
                <span className="font-mono font-bold text-slate-900">$40–60 M</span>
              </div>
              <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                <span className="font-medium text-slate-700">Transmission & Road</span>
                <span className="font-mono font-bold text-slate-900">$20–25 M</span>
              </div>
              <div className="p-4 flex justify-between items-center hover:bg-slate-50">
                <span className="font-medium text-slate-700">Harbour & Yard Upgrades</span>
                <span className="font-mono font-bold text-slate-900">$12–15 M</span>
              </div>
              <div className="p-4 bg-slate-50 flex justify-between items-center border-t border-slate-200">
                <span className="font-bold text-slate-900">TOTAL ESTIMATE</span>
                <span className="font-mono text-xl font-bold text-green-700">~$200 M</span>
              </div>
            </div>
            <p className="p-4 text-xs text-slate-400 bg-slate-50 border-t border-slate-100">
              *Estimates based on similar remote hydro/fiber projects (e.g. Culliton Creek, SednaLink).
            </p>
          </div>
        </section>

        {/* 3. PHASING & TIMELINE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Timer className="w-8 h-8 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-900">Timeline (5 Years)</h2>
          </div>
          <div className="border-l-2 border-slate-200 pl-8 space-y-10 relative">
            
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-bold text-lg text-slate-900">Year 0–1: Planning & Enabling</h3>
              <p className="text-sm text-slate-600 mt-1">
                Feasibility studies, environmental assessments, and permits. 
                Road and transmission corridor clearing begins.
              </p>
            </div>

             <div className="relative">
              <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-bold text-lg text-slate-900">Year 2–3: Major Construction</h3>
              <p className="text-sm text-slate-600 mt-1">
                Hydro plant civil works and powerhouse construction. 
                Fiber-optic cable deployment and dock upgrades completed.
              </p>
            </div>

             <div className="relative">
              <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-blue-50">4</span>
              <h3 className="font-bold text-lg text-blue-700">Year 4: Commissioning & Power-On</h3>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Target Milestone:</strong> Hydro plant energized. 
                Facility opens for first tenants. Initial revenue begins in Q4.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">5</span>
              <h3 className="font-bold text-lg text-slate-900">Year 5+: Steady Operations</h3>
              <p className="text-sm text-slate-600 mt-1">
                Ramp-up to full occupancy (15–20 MW load). 
                Annual revenues stabilize between $20–30M.
              </p>
            </div>

          </div>
        </section>

        {/* 4. FINANCIAL VIABILITY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Financial Viability</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Revenue Model</h3>
              <p className="text-sm text-slate-600 mb-4">
                Leasing "serviced slots" (Power + Pipe + Space) to AI/Cloud tenants.
              </p>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="block text-xs text-slate-500 uppercase tracking-wide">Target Rate</span>
                <strong className="text-lg text-slate-900">$120–$150 / kW-month</strong>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Returns (ROI)</h3>
              <p className="text-sm text-slate-600 mb-4">
                Public capital investment yields steady long-term returns.
              </p>
              <ul className="space-y-2 text-sm">
                 <li className="flex justify-between">
                   <span>Annual Revenue:</span>
                   <span className="font-bold">$20–$30 M</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Payback Period:</span>
                   <span className="font-bold">~10 Years</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Asset Life:</span>
                   <span className="font-bold">40+ Years</span>
                 </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. STRATEGIC IMPACT */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-8 h-8 text-teal-600" />
            <h2 className="text-2xl font-bold text-slate-900">Strategic Impact</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 p-5 rounded-xl text-center">
              <span className="block text-3xl font-bold text-slate-900 mb-1">2M+</span>
              <span className="text-sm text-slate-500">Liters of Diesel Avoided / Year</span>
            </div>
            <div className="border border-slate-200 p-5 rounded-xl text-center">
              <span className="block text-3xl font-bold text-slate-900 mb-1">50-100</span>
              <span className="text-sm text-slate-500">Construction Jobs Created</span>
            </div>
             <div className="border border-slate-200 p-5 rounded-xl text-center">
              <span className="block text-3xl font-bold text-slate-900 mb-1">~10%</span>
              <span className="text-sm text-slate-500">Target Annual ROI</span>
            </div>
          </div>
          <p className="mt-6 text-slate-600 italic text-center">
            "By exporting computing, we effectively export high-tech services rather than raw materials, 
            moving up the value chain."
          </p>
        </section>

      </div>
    </main>
  );
}