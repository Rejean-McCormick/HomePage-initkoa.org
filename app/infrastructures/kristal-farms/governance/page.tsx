// app\infrastructures\kristal-farms\governance\page.tsx
// app/infrastructures/kristal-farms/governance/page.tsx
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Database, 
  ArrowLeft,
  Gavel,
  Zap,
  FileCheck
} from 'lucide-react';

export const metadata = {
  title: 'Governance & Operating Model – Kristal Farms',
  description: 'Black-box tenancy, community oversight, and the Kristals Knowledge Commons.',
};

export default function KFGovernance() {
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
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">OPERATING MODEL</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-slate-900">
            Governance & Tenancy
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We operate the utilities; Tenants operate the compute; The Community governs the benefits. 
            Our model splits these responsibilities to ensure privacy, safety, and social value.
          </p>
        </div>

        {/* 1. BLACK BOX TENANCY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-100 p-3 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">"Black-Box" Tenancy</h2>
          </div>
          
          

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            
            <p className="text-lg text-slate-700 mb-6 mt-6">
              The host provides utilities (Power, Cooling, Fiber) up to the pad boundary. 
              We have <strong>no visibility</strong> into tenant data, models, or workloads.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <strong className="block text-green-700 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Host Sees
                </strong>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Power usage (kWh)</li>
                  <li>Coolant ΔT & Flow</li>
                  <li>Aggregate Network Bandwidth</li>
                  <li>Physical Security Alarms</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <strong className="block text-red-700 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Host Does NOT See
                </strong>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Packet Content (DPI)</li>
                  <li>Hard Drive Data</li>
                  <li>Model Weights & Algorithms</li>
                  <li>Application Logs</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">
              *Optional hardware attestation (TEE) is available for tenants requiring higher security assurances.
            </p>
          </div>
        </section>

        {/* 2. GOVERNANCE COMMITTEES */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Community Governance</h2>
          </div>
          <p className="text-slate-600 mb-8">
            The project is overseen by four main bodies to ensure transparency and alignment with local needs.
          </p>
          
          

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-slate-500" /> Project Council
              </h3>
              <p className="text-sm text-slate-600">
                The high-level steering committee including community, owner, operator, and tenant reps. 
                Resolves disputes, approves budgets, and ensures agreement compliance.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-orange-500" /> Heat Committee
              </h3>
              <p className="text-sm text-slate-600">
                Sets seasonal heat priorities (e.g., "Clinic first in winter") and approves greenhouse schedules. 
                Monitors the Heat Utilization Factor (HUF).
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" /> Environment Committee
              </h3>
              <p className="text-sm text-slate-600">
                Guardians of the ecosystem. Monitors cooling water discharge (ΔT) and water quality. 
                Can trigger throttling if environmental limits are approached.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-500" /> Kristals Council
              </h3>
              <p className="text-sm text-slate-600">
                Curates public-interest topics for the Knowledge Commons. Validates AI-generated answers 
                before they are published as "Kristals".
              </p>
            </div>
          </div>
        </section>

        {/* 3. KRISTALS (KNOWLEDGE COMMONS) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">"Kristals" Knowledge Commons</h2>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
             <h3 className="text-xl font-bold text-purple-900 mb-4">Recycling Intelligence</h3>
             <p className="text-slate-700 mb-6">
               "We recycle intelligence the way we recycle heat." Instead of re-computing the same answers repeatedly, 
               we save validated AI outputs as <strong>Kristals</strong>—knowledge capsules on public-interest topics.
             </p>
             <ul className="space-y-4">
               <li className="flex gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm">
                   <Zap className="w-4 h-4 text-yellow-500" />
                 </div>
                 <div>
                   <strong className="text-slate-900 text-sm block">Compute Avoided</strong>
                   <span className="text-slate-600 text-xs">We track the energy saved by serving a cached Kristal instead of running a new GPU inference.</span>
                 </div>
               </li>
               <li className="flex gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm">
                   <FileCheck className="w-4 h-4 text-green-500" />
                 </div>
                 <div>
                   <strong className="text-slate-900 text-sm block">Validated & Open</strong>
                   <span className="text-slate-600 text-xs">Answers are vetted by experts (e.g., local health professionals) and made accessible via API.</span>
                 </div>
               </li>
             </ul>
          </div>
        </section>

        {/* 4. PUBLIC SCORECARD */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Transparency Scorecard</h2>
          </div>
          <p className="mb-6 text-slate-600">
            Trust is built on data. We publish a monthly dashboard with these key metrics.
          </p>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Metric</th>
                  <th className="p-4">Definition</th>
                  <th className="p-4">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-4 font-medium text-slate-900">HUF</td>
                  <td className="p-4">Heat Utilization Factor (% of waste heat reused)</td>
                  <td className="p-4">Seasonal Floor</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">WUE</td>
                  <td className="p-4">Water Usage Effectiveness (Liters / kWh)</td>
                  <td className="p-4">≈ 0 (Closed Loop)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">ΔT Compliance</td>
                  <td className="p-4">% of hours discharge temp is within limits</td>
                  <td className="p-4">100%</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Diesel Avoided</td>
                  <td className="p-4">Fuel saved (Power + Heating)</td>
                  <td className="p-4">Maximized</td>
                </tr>
                 <tr>
                  <td className="p-4 font-medium text-slate-900">Kristals Hit-Rate</td>
                  <td className="p-4">% of queries answered by existing capsules</td>
                  <td className="p-4">Growing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}

// Simple icons for internal use
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function XCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  )
}

function ThermometerSun({ className }: { className?: string }) {
   return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 9a4 4 0 0 0-2 7.5" />
      <path d="M12 3v2" />
      <path d="M6.6 18.4l-1.4 1.4" />
      <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      <path d="M4 13H2" />
      <path d="M6.34 7.34 4.93 5.93" />
    </svg>
   )
}

function Leaf({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
    )
}

function BrainCircuit({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M9 13a4.5 4.5 0 0 0 3-4" />
            <path d="M6.003 5.125A3 3 0 0 1 19.5 13" />
            <path d="M12 18a4 4 0 0 0 4-3.464 4.004 4.004 0 0 0 3.464-4.004A4 4 0 0 0 19.5 3 3 3 0 0 0 12 5" />
            <path d="M21 21v-2" />
            <path d="M21 15v-2" />
            <path d="M18 18h2" />
            <path d="M15 15h2" />
        </svg>
    )
}