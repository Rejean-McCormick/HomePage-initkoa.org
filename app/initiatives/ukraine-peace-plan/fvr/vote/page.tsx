// app\initiatives\ukraine-peace-plan\fvr\vote\page.tsx
import Link from 'next/link';
import { 
  Vote, 
  Users, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Fingerprint
} from 'lucide-react';

export const metadata = {
  title: "Phase 2: Vote — The Legitimacy Engine",
  description: "Moving from kinetic control to political legitimacy. Internationally supervised plebiscites with digital voting rights for the diaspora.",
};

const MECHANISMS = [
  {
    title: "1. The Diaspora Ballot",
    link: "/initiatives/ukraine-peace-plan/fvr/vote/01-diaspora-ballot",
    desc: "Refugees must vote. A secure, blockchain-backed digital identity system allows displaced citizens to vote from Warsaw, Berlin, or Toronto. No legitimacy without their voice.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "2. The Security Vacuum",
    link: "/initiatives/ukraine-peace-plan/fvr/vote/02-security-vacuum",
    desc: "Guns out before boxes open. A mandatory 6-month 'cooling off' period where heavy weapons are withdrawn and replaced by UN/OSCE policing before campaigning begins.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "3. International Super-Vision",
    link: "/initiatives/ukraine-peace-plan/fvr/vote/03-international-supervision",
    desc: "Not just 'observers'. The electoral commission is chaired by non-aligned international bodies (UN/OSCE) with full executive power over the count.",
    icon: <Users className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  }
];

export default function VotePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-2xl">
            <Vote className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Phase 2: Vote
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Silence (Freeze) is not a solution; it is just a pause. The conflict is political. 
          Therefore, the resolution must be <strong>democratic</strong>, but not under the gun. 
          Phase 2 replaces the soldier with the citizen.
        </p>

        <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <strong className="block text-purple-800 font-bold uppercase tracking-widest text-xs mb-2">
            The Core Principle
          </strong>
          <p className="text-slate-800 italic">
            "Territory does not belong to the tank that sits on it. It belongs to the people who live—and used to live—there."
          </p>
        </div>
      </div>

      {/* CORE OBJECTIVE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Fingerprint className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Objective: Indisputable Legitimacy</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          A referendum conducted at gunpoint is a farce. Phase 2 is engineered to produce a result that even the loser must accept.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <strong className="block text-purple-300 mb-1">The Participant</strong>
            Not just current residents (under occupation). The electorate includes <strong>100% of the 2021 census</strong> population, regardless of current location.
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <strong className="block text-purple-300 mb-1">The Question</strong>
            Not a binary "Join Russia/Ukraine". A nuanced ballot allowing for degrees of autonomy, federalization, or independence, agreed upon by the Contact Group.
          </div>
        </div>
      </section>

      {/* MECHANISMS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Vote className="w-6 h-6 text-slate-700" />
          The Machinery of Legitimacy
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
        <Link href="/initiatives/ukraine-peace-plan/fvr/freeze" className="text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-2 transition-colors">
          ← Phase 1: Freeze
        </Link>
        <Link href="/initiatives/ukraine-peace-plan/fvr/rebuild" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Next Phase: Rebuild (Incentive) →
        </Link>
      </div>

    </main>
  );
}