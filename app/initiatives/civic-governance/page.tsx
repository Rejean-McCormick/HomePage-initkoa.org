import Link from 'next/link';
import { 
  Scroll, 
  GraduationCap, 
  TrendingUp, 
  Gavel, 
  Users, 
  Globe, 
  ArrowRight, 
  Landmark 
} from 'lucide-react';

export const metadata = {
  title: "Civic Governance – KOA",
  description: "A full-stack replacement for obsolete public institutions. The Civic Operating System.",
};

export default function CivicGovernancePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
          <Landmark className="w-8 h-8 text-blue-800" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Civic Governance
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          We are not proposing "reforms." We are building a parallel <strong>Civic Operating System</strong>.
          The KOA Governance model replaces bureaucratic friction with algorithmic coordination, restoring the three pillars of a free society: Competence, Autonomy, and Fairness.
        </p>
      </div>

      {/* SECTION 1: THE KERNEL (Constitution) */}
      <section className="mb-20">
        <div className="flex items-center mb-6">
          <div className="h-px bg-slate-200 flex-grow"></div>
          <span className="px-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Layer 1: The Kernel</span>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>

        <Link 
          href="/initiatives/civic-governance/constitution"
          className="group relative block bg-slate-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center mb-4 text-purple-400">
                <Scroll className="w-6 h-6 mr-2" />
                <span className="font-bold uppercase tracking-wider text-sm">The Rules of the Game</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">The Civic Constitution</h2>
              <p className="text-slate-300 text-lg max-w-2xl">
                The immutable code of law that governs the system. Including <strong>Ekoh</strong> (Weighted Voting), <strong>Orgo</strong> (Dynamic Governance), and the <strong>Bill of Rights</strong>.
              </p>
            </div>
            <div className="flex items-center text-white font-bold bg-white/10 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-all">
              Read the Charter <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        </Link>
      </section>

      {/* SECTION 2: ACTIVE MODULES */}
      <section className="mb-20">
        <div className="flex items-center mb-6">
          <div className="h-px bg-slate-200 flex-grow"></div>
          <span className="px-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Layer 2: Active Modules</span>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Module: Education */}
          <Link 
            href="/initiatives/civic-governance/modules/education"
            className="group block p-8 bg-blue-50 border border-blue-100 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-6 p-3 bg-white w-fit rounded-lg shadow-sm group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700">Education</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Replacing the "Prestige-Diploma" with <strong>Verified Competence</strong>. A modular, AI-generated curriculum that is free for the learner and paid for by the beneficiary.
            </p>
            <span className="text-sm font-bold text-blue-600 flex items-center">
              View Curriculum <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </Link>

          {/* Module: Economy */}
          <Link 
            href="/initiatives/civic-governance/modules/economy"
            className="group block p-8 bg-amber-50 border border-amber-100 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-6 p-3 bg-white w-fit rounded-lg shadow-sm group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-700">Economy</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Restoring "Exit Power" via the <strong>Solidarity Network</strong>. Local production hubs (Food, Repair, Textile) that lower the cost of living and bypass extraction taxes.
            </p>
            <span className="text-sm font-bold text-amber-600 flex items-center">
              View Network <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </Link>

          {/* Module: Justice */}
          <Link 
            href="/initiatives/civic-governance/modules/justice"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-6 p-3 bg-white w-fit rounded-lg shadow-sm group-hover:scale-110 transition-transform">
              <Gavel className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-700">Justice</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              <strong>Augmented Fairness.</strong> Using "Blind AI" to eliminate human bias and reduce trial timelines from years to weeks. Justice that is fast, affordable, and explainable.
            </p>
            <span className="text-sm font-bold text-slate-600 flex items-center">
              View System <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </Link>

        </div>
      </section>

      {/* SECTION 3: IN DEVELOPMENT */}
      <section>
        <div className="flex items-center mb-6">
          <div className="h-px bg-slate-200 flex-grow"></div>
          <span className="px-4 text-sm font-bold text-slate-400 uppercase tracking-widest">In Research / Beta</span>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
          
          {/* Social Module */}
          <div className="p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-slate-400 mr-3" />
              <h3 className="text-lg font-bold text-slate-600">Social Module</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Re-imagining social safety nets not as "welfare," but as a Universal Dividend funded by automated civic assets.
            </p>
            <div className="inline-block text-[10px] font-bold text-white bg-slate-400 px-2 py-1 rounded">RESEARCH PHASE</div>
          </div>

          {/* International Module */}
          <Link href="/initiatives/civic-governance/modules/international" className="block p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-white hover:border-purple-300 transition-colors">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-lg font-bold text-slate-600 group-hover:text-purple-600">International</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              The "Freeze-Vote-Rebuild" framework. Applying technocratic neutrality to geopolitical crises (Ukraine, frozen conflicts).
            </p>
            <div className="inline-block text-[10px] font-bold text-purple-100 bg-purple-500 px-2 py-1 rounded">BETA PILOT</div>
          </Link>

        </div>
      </section>

    </main>
  );
}