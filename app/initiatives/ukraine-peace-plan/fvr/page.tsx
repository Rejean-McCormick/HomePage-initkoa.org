// app\initiatives\ukraine-peace-plan\fvr\page.tsx
import Link from 'next/link';
import { 
  Snowflake, 
  Vote, 
  Hammer, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  LayoutDashboard,
  Scale,
  AlertTriangle,
  Briefcase,
  Users,
  History,
  FileText,
  Map
} from 'lucide-react';

export const metadata = {
  title: "FVR Framework — The 12-Module Peace Plan",
  description: "A comprehensive operational framework. 3 Phases, 4 Enablers, and 5 Reference Modules.",
};

// 1. THE CORE SEQUENCE (3 Folders)
const PHASES = [
  {
    title: "Phase 1: Freeze",
    subtitle: "Immediate Cessation",
    desc: "Stop the bleeding. Verified separation of forces, digital line-of-contact mapping, and the '4-Hour Loop'.",
    href: "/initiatives/ukraine-peace-plan/fvr/freeze",
    icon: <Snowflake className="w-8 h-8 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200",
    action: "View Protocols"
  },
  {
    title: "Phase 2: Vote",
    subtitle: "Legitimacy Engine",
    desc: "Replace the soldier with the citizen. Internationally supervised plebiscites with digital diaspora voting.",
    href: "/initiatives/ukraine-peace-plan/fvr/vote",
    icon: <Vote className="w-8 h-8 text-purple-600" />,
    color: "bg-purple-50 border-purple-200",
    action: "View Voting Mech"
  },
  {
    title: "Phase 3: Rebuild",
    subtitle: "Performance Delivery",
    desc: "Reconstruction as an incentive. Funding released in tranches based on strict anti-corruption milestones.",
    href: "/initiatives/ukraine-peace-plan/fvr/rebuild",
    icon: <Hammer className="w-8 h-8 text-amber-600" />,
    color: "bg-amber-50 border-amber-200",
    action: "View Roadmap"
  }
];

// 2. THE ENABLERS (4 Folders)
const ENABLERS = [
  {
    title: "Governance & Gates",
    desc: "The 'If/Then' logic connecting the phases. Verification protocols.",
    href: "/initiatives/ukraine-peace-plan/fvr/governance/overview",
    icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />
  },
  {
    title: "Legal Framework",
    desc: "Treaty structures, international mandates, and amnesty pathways.",
    href: "/initiatives/ukraine-peace-plan/fvr/legal/overview",
    icon: <Scale className="w-5 h-5 text-indigo-600" />
  },
  {
    title: "Implementation Toolkit",
    desc: "Operational checklists, KPIs, and communications guides.",
    href: "/initiatives/ukraine-peace-plan/fvr/toolkit/overview",
    icon: <Briefcase className="w-5 h-5 text-indigo-600" />
  },
  {
    title: "Risks & Critiques",
    desc: "The Risk Register. Pre-mortems on what could go wrong.",
    href: "/initiatives/ukraine-peace-plan/fvr/risks/overview",
    icon: <AlertTriangle className="w-5 h-5 text-indigo-600" />
  }
];

// 3. THE CONTEXT & REFERENCE (5 Folders)
const REFERENCE = [
  { 
    label: "Start Here", 
    href: "/initiatives/ukraine-peace-plan/fvr/start-here/how-to-use", 
    icon: <BookOpen className="w-4 h-4" /> 
  },
  { 
    label: "Overview (Deltas)", 
    href: "/initiatives/ukraine-peace-plan/fvr/overview/proposal-at-a-glance", 
    icon: <Map className="w-4 h-4" /> 
  },
  { 
    label: "Stakeholder Playbooks", 
    href: "/initiatives/ukraine-peace-plan/fvr/playbooks/overview", 
    icon: <Users className="w-4 h-4" /> 
  },
  { 
    label: "Background & Origins", 
    href: "/initiatives/ukraine-peace-plan/fvr/background/origins", 
    icon: <History className="w-4 h-4" /> 
  },
  { 
    label: "Appendices & Archives", 
    href: "/initiatives/ukraine-peace-plan/fvr/appendices/source-archive", 
    icon: <FileText className="w-4 h-4" /> 
  }
];

export default function FVRHubPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      
      {/* HERO HEADER */}
      <div className="mb-12 border-b border-gray-200 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-slate-900 rounded-2xl">
            <LayoutDashboard className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">
              Freeze–Vote–Rebuild
            </h1>
            <p className="text-xl text-slate-500 font-light">
              The Operational Peace Framework (FVR)
            </p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700 leading-relaxed max-w-3xl">
          <p className="mb-4">
            A strictly sequenced technical framework to transition Ukraine from active kinetic conflict to verified democratic stability.
          </p>
          <p className="font-medium text-slate-900">
            It replaces "Trust" (which is absent) with "Verification" (which is engineered).
          </p>
        </div>
      </div>

      {/* SECTION 1: THE CORE PHASES (3) */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">The Core Sequence</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PHASES.map((phase, i) => (
            <Link 
              key={i}
              href={phase.href}
              className={`flex flex-col p-6 rounded-2xl border ${phase.color} hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="mb-6 bg-white p-3 rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {phase.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{phase.title}</h2>
              <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4 block text-slate-700">
                {phase.subtitle}
              </span>
              <p className="text-slate-700 text-sm leading-relaxed mb-8 flex-grow">
                {phase.desc}
              </p>
              <div className="flex items-center text-sm font-bold text-slate-900 mt-auto">
                {phase.action} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: THE ENABLERS (4) */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Operational Enablers</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ENABLERS.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-400 hover:shadow-sm transition-all"
            >
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 flex items-center">
                  {item.title}
                  <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: REFERENCE & CONTEXT (5) */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Context & Reference</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {REFERENCE.map((ref, i) => (
            <Link 
              key={i} 
              href={ref.href}
              className="flex flex-col items-center text-center p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="mb-2 text-slate-500">
                {ref.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{ref.label}</span>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}