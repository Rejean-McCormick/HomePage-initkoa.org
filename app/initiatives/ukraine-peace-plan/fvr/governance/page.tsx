// app\initiatives\ukraine-peace-plan\fvr\governance\page.tsx
import Link from 'next/link';
import { 
  ShieldCheck, 
  GitMerge, 
  Lock, 
  Database, 
  Scale, 
  ArrowRight,
  GanttChart
} from 'lucide-react';

export const metadata = {
  title: "Governance & Verification — FVR Operating System",
  description: "The decision structures, verification gates, and data policies that make the framework executable.",
};

const MODULES = [
  {
    title: "Verification-First Gates",
    desc: "Measurable criteria (S1-S4) required to advance from one phase to the next or unlock aid.",
    href: "/initiatives/ukraine-peace-plan/fvr/governance/verification-gates",
    icon: <Lock className="w-6 h-6 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "Escalation & Coordination",
    desc: "Hotlines, joint incident rooms, and the pre-committed ladder of consequences for violations.",
    href: "/initiatives/ukraine-peace-plan/fvr/governance/escalation-coordination",
    icon: <GitMerge className="w-6 h-6 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "Status-Neutral Model",
    desc: "Institutional design for operational control without pre-judging final political outcomes.",
    href: "/initiatives/ukraine-peace-plan/fvr/governance/status-neutral-model",
    icon: <Scale className="w-6 h-6 text-slate-600" />,
    color: "bg-slate-50 border-slate-200"
  },
  {
    title: "Data & Privacy",
    desc: "Publication policies and security controls for incident reports, voter rolls, and audit data.",
    href: "/initiatives/ukraine-peace-plan/fvr/governance/data-privacy",
    icon: <Database className="w-6 h-6 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200"
  }
];

export default function GovernanceHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Governance
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Freeze–Vote–Rebuild is not a linear timeline; it is a <strong>state machine</strong> controlled by data. 
          This section defines the decision structures and verification loops that make the framework resilient to spoilers.
        </p>
      </div>

      {/* CORE LOGIC BLOCK */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <GanttChart className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">The Governance Control Loop</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm font-bold">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            1. DATA FUSION<br/>
            <span className="text-[10px] font-normal opacity-70">(Monitoring & Audits)</span>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="text-indigo-500 hidden md:block" />
            <ArrowRight className="text-indigo-500 md:hidden rotate-90" />
          </div>
          <div className="p-4 bg-indigo-900/50 rounded-lg border border-indigo-500/50 text-indigo-200">
            2. GATE CERTIFICATION<br/>
            <span className="text-[10px] font-normal opacity-70">(Governance Decision)</span>
          </div>
          <div className="flex items-center justify-center md:hidden">
             <ArrowRight className="text-indigo-500 rotate-90" />
          </div>
          <div className="hidden md:flex items-center justify-center col-span-3">
             <ArrowRight className="text-indigo-500 rotate-90" />
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600 md:col-start-2">
            3. TRUNCED UNLOCKS<br/>
            <span className="text-[10px] font-normal opacity-70">(Incentives or Rollback)</span>
          </div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {MODULES.map((mod) => (
            <Link 
              key={mod.title}
              href={mod.href}
              className={`group block p-8 rounded-2xl border ${mod.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {mod.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4">
                {mod.title}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {mod.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/initiatives/ukraine-peace-plan/fvr" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Back to FVR Overview
        </Link>
        <Link href="/initiatives/ukraine-peace-plan/fvr/governance/verification-gates" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          View Verification Gates →
        </Link>
      </div>

    </main>
  );
}