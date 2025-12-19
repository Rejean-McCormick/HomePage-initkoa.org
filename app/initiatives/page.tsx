// app/initiatives/page.tsx
import Link from 'next/link';
import { Landmark, Globe, TrendingUp, Scale, GraduationCap, ArrowRight, Scroll } from 'lucide-react';

export const metadata = {
  title: 'Strategic Initiatives – KOA',
  description: 'The roadmap for a transition to a post-extractive society: Governance, Theory, and Technology.',
};

export default function InitiativesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-16">
        {/* CHANGED: text-slate-900 to text-white */}
        <h1 className="text-5xl font-bold mb-6 text-white">Strategic Initiatives</h1>
        
        {/* CHANGED: text-slate-600 to text-slate-300 for better contrast on dark bg */}
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          The KOA project is divided into three layers of action: <span className="font-semibold text-blue-400">Theory</span> (The Why), <span className="font-semibold text-blue-400">Governance</span> (The How), and <span className="font-semibold text-blue-400">Technology</span> (The Engine).
        </p>
      </div>

      {/* SECTION 1: CIVIC GOVERNANCE (The Active Core) */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <div className="bg-blue-900/30 p-3 rounded-full mr-4 border border-blue-500/30">
            <Landmark className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            {/* CHANGED: text-slate-900 to text-white */}
            <h2 className="text-3xl font-bold text-white">Civic Governance</h2>
            {/* CHANGED: text-slate-500 to text-slate-400 */}
            <p className="text-slate-400">The practical blueprints for replacing broken institutions.</p>
          </div>
        </div>

        {/* Main Dashboard Link */}
        <Link
          href="/initiatives/civic-governance"
          className="group relative block p-8 border border-slate-700 rounded-2xl hover:border-blue-500 hover:shadow-2xl transition-all duration-300 bg-slate-900 text-white"
        >
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                Enter the Governance Dashboard
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
                Access the <strong>Civic Constitution</strong> (The Rules) and the active modules for <strong>Education</strong>, <strong>Economy</strong>, and <strong>Justice</strong>.
              </p>
              
              {/* Module Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-purple-900/50 px-3 py-1.5 rounded text-purple-200 border border-purple-700">
                  <Scroll className="w-3 h-3 mr-2" /> Constitution
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-blue-900/50 px-3 py-1.5 rounded text-blue-200 border border-blue-700">
                  <GraduationCap className="w-3 h-3 mr-2" /> Education
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-amber-900/50 px-3 py-1.5 rounded text-amber-200 border border-amber-700">
                  <TrendingUp className="w-3 h-3 mr-2" /> Economy
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-slate-700/50 px-3 py-1.5 rounded text-slate-300 border border-slate-500">
                  <Scale className="w-3 h-3 mr-2" /> Justice
                </span>
              </div>
            </div>

            <div className="hidden md:flex bg-slate-800 p-5 rounded-full group-hover:bg-blue-600 transition-colors shadow-lg">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>
        </Link>
      </section>

      {/* SECTION 2: INTERNATIONAL STRATEGY */}
      <section>
        <div className="flex items-center mb-8">
          <div className="bg-purple-900/30 p-3 rounded-full mr-4 border border-purple-500/30">
            <Globe className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            {/* CHANGED: text-slate-900 to text-white */}
            <h2 className="text-3xl font-bold text-white">International Strategy</h2>
            {/* CHANGED: text-slate-500 to text-slate-400 */}
            <p className="text-slate-400">Geopolitical frameworks for peace and reconstruction.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          
          {/* International Strategy Link */}
          {/* Note: Kept bg-white here so internal text remains dark, but added explicit border styling for dark mode contexts */}
          <Link
            href="/initiatives/civic-governance/modules/international"
            className="group block h-full p-8 border border-slate-200 rounded-2xl hover:border-purple-500 hover:shadow-lg transition duration-300 bg-white"
          >
            <div className="mb-4 text-purple-600">
               <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-purple-600 transition-colors">
              The Ukraine Plan
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              The "Freeze-Vote-Rebuild" framework. Applying technocratic neutrality and the "Construction Olympics" model to geopolitical conflict resolution.
            </p>
            <div className="flex items-center text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
              View Framework <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}