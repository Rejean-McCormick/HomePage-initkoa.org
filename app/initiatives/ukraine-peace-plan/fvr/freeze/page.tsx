// app\initiatives\ukraine-peace-plan\fvr\freeze\page.tsx
import Link from 'next/link';
import { 
  Snowflake, 
  Siren, 
  Radio, 
  Eye, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const metadata = {
  title: "Phase 1: Freeze — Immediate Cessation",
  description: "The immediate cessation of kinetic violence. Separation of forces, establishment of the LOC, and the Verification-First protocol.",
};

const MECHANISMS = [
  {
    title: "1. The S-Class Violation System",
    link: "/initiatives/ukraine-peace-plan/fvr/freeze/01-immediate-cessation",
    desc: "Moving beyond binary 'ceasefire' definitions. A graded scale (S1-S4) classifying incidents from small arms fire to heavy artillery, with automated triggers for escalation.",
    icon: <Siren className="w-6 h-6 text-rose-500" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "2. The 4-Hour Loop",
    link: "/initiatives/ukraine-peace-plan/fvr/freeze/02-verification-mechanisms",
    desc: "The Verification-First standard. International monitors must verify any reported incident within 4 hours to prevent propaganda cycles and false flags.",
    icon: <Radio className="w-6 h-6 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Disengagement Zones (ZOD)",
    link: "/initiatives/ukraine-peace-plan/fvr/freeze/03-disengagement-zones",
    desc: "Physical separation of forces. A 15km heavy-weapon-free buffer zone managed by third-party peacekeepers, not belligerents.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-50 border-blue-200"
  }
];

export default function FreezePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-cyan-100 rounded-2xl">
            <Snowflake className="w-10 h-10 text-cyan-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Phase 1: Freeze
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Peace does not start with a treaty; it starts with silence. 
          The <strong>Freeze</strong> phase is not a political solution. It is a purely technical engineering challenge: 
          how to stop the bleeding so the patient can be operated on.
        </p>

        <div className="mt-8 bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
          <strong className="block text-cyan-800 font-bold uppercase tracking-widest text-xs mb-2">
            The Golden Rule
          </strong>
          <p className="text-slate-800 italic">
            "Verification must precede trust. We do not ask the belligerents to trust each other. We ask them to trust the sensors."
          </p>
        </div>
      </div>

      {/* CORE OBJECTIVE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Objective: Static Transparency</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          The goal of Phase 1 is not "Peace" (which is a political state). The goal is <strong>Static Transparency</strong>.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">1. Stop Kinetic Action:</span>
            <span>No shells, no movement, no air sorties.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">2. Fix the Line:</span>
            <span>The Line of Contact (LOC) is digitally mapped and frozen to the meter.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold">3. Isolate Violations:</span>
            <span>When a shot is fired, we know who, when, and from where within minutes.</span>
          </li>
        </ul>
      </section>

      {/* MECHANISMS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Radio className="w-6 h-6 text-slate-700" />
          Operational Mechanisms
        </h2>
        <div className="grid md:grid-cols-1 gap-6">
          {MECHANISMS.map((mech) => (
            <Link 
              key={mech.title}
              href={mech.link}
              className={`group block p-8 rounded-2xl border ${mech.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {mech.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4">
                {mech.title}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {mech.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/initiatives/ukraine-peace-plan/fvr/start-here/how-to-use" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← How to Use This Plan
        </Link>
        <Link href="/initiatives/ukraine-peace-plan/fvr/vote" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Next Phase: Vote (Legitimacy) →
        </Link>
      </div>

    </main>
  );
}