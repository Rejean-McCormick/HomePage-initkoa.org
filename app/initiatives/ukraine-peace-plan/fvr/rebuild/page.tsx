// app\initiatives\ukraine-peace-plan\fvr\rebuild\page.tsx
import Link from 'next/link';
import { 
  Hammer, 
  Trophy, 
  FileSearch, 
  Landmark, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const metadata = {
  title: "Phase 3: Rebuild — Performance & Governance",
  description: "Turning verified stability into reconstruction at scale. A strictly governed, performance-based delivery model.",
};

const MECHANISMS = [
  {
    title: "1. Reconstruction Architecture",
    link: "/initiatives/ukraine-peace-plan/fvr/rebuild/architecture",
    desc: "The governance backbone. Independent audit authorities, escrow-based funding models, and strict separation of duties to prevent capture.",
    icon: <Landmark className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "2. Reconstruction Olympics",
    link: "/initiatives/ukraine-peace-plan/fvr/rebuild/construction-olympics",
    desc: "A performance-based delivery model. Contractors and consortia compete on speed, quality, and integrity to unlock future tranches.",
    icon: <Trophy className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-50 border-orange-200"
  },
  {
    title: "3. The Transparency Stack",
    link: "/initiatives/ukraine-peace-plan/fvr/rebuild/accountability",
    desc: "Minimum viable transparency. Public project registries, real-time disbursement ledgers, and audit triggers. No data, no dollars.",
    icon: <FileSearch className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-50 border-yellow-200"
  }
];

export default function RebuildPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <Hammer className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Phase 3: Rebuild
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Reconstruction is not a "reward" for peace; it is the <strong>engine</strong> of stability. 
          But it cannot be a slush fund. Phase 3 transforms vague promises into an operational program with strict conditionality.
        </p>

        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <strong className="block text-amber-800 font-bold uppercase tracking-widest text-xs mb-2">
            The Golden Rule
          </strong>
          <p className="text-slate-800 italic">
            "No reform, no concrete. Funds flow only as fast as integrity is verified."
          </p>
        </div>
      </div>

      {/* CORE OBJECTIVE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Objective: The Marshall Speed</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          The goal is to restart the economy fast enough to make the peace "sticky", without feeding the corruption that undermines legitimacy.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <strong className="block text-amber-400 mb-1">The Sequencer</strong>
            1. Essential Services (Power/Water) [Days]<br/>
            2. Logistics & Demining [Weeks]<br/>
            3. Housing & Schools [Months]<br/>
            4. Industrial Restart [Years]
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <strong className="block text-amber-400 mb-1">The Brake</strong>
            Any attempt to bypass the <strong>Transparency Stack</strong> triggers an automatic freeze of the next tranche.
          </div>
        </div>
      </section>

      {/* MECHANISMS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Hammer className="w-6 h-6 text-slate-700" />
          The Delivery Engines
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
        <Link href="/initiatives/ukraine-peace-plan/fvr/vote" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          ← Phase 2: Vote (Legitimacy)
        </Link>
        <Link href="/initiatives/ukraine-peace-plan/fvr/governance/overview" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          Next: Governance & Gates →
        </Link>
      </div>

    </main>
  );
}