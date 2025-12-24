// app\initiatives\page.tsx
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
        <h1 className="text-5xl font-bold mb-6 text-[#1e6864]">Strategic Initiatives</h1>
        
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          The KOA project is divided into three layers of action: <span className="font-bold text-[#1e6864]">Theory</span> (The Why), <span className="font-bold text-[#1e6864]">Governance</span> (The How), and <span className="font-bold text-[#1e6864]">Technology</span> (The Engine).
        </p>
      </div>

      {/* SECTION 1: CIVIC GOVERNANCE */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <div className="bg-[#1e6864]/10 p-3 rounded-full mr-4 border border-[#1e6864]/20">
            <Landmark className="w-8 h-8 text-[#1e6864]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e6864]">Civic Governance</h2>
            <p className="text-slate-500">The practical blueprints for replacing broken institutions.</p>
          </div>
        </div>

        {/* Main Dashboard Link */}
        <Link
          href="/initiatives/civic-governance"
          className="group relative block p-8 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-xl transition-all duration-300 bg-white"
        >
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 text-slate-900 group-hover:text-[#1e6864] transition-colors">
                Enter the Governance Dashboard
              </h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                Access the <strong>Civic Constitution</strong> (The Rules) and the active modules for <strong>Education</strong>, <strong>Economy</strong>, and <strong>Justice</strong>.
              </p>
              
              {/* Module Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                  <Scroll className="w-3 h-3 mr-2" /> Constitution
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                  <GraduationCap className="w-3 h-3 mr-2" /> Education
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                  <TrendingUp className="w-3 h-3 mr-2" /> Economy
                </span>
                <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                  <Scale className="w-3 h-3 mr-2" /> Justice
                </span>
              </div>
            </div>

            <div className="hidden md:flex bg-slate-100 p-5 rounded-full group-hover:bg-[#1e6864] transition-colors shadow-sm">
              <ArrowRight className="w-8 h-8 text-slate-400 group-hover:text-white" />
            </div>
          </div>
        </Link>
      </section>

      {/* SECTION 2: INTERNATIONAL STRATEGY */}
      <section>
        <div className="flex items-center mb-8">
          <div className="bg-[#1e6864]/10 p-3 rounded-full mr-4 border border-[#1e6864]/20">
            <Globe className="w-8 h-8 text-[#1e6864]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e6864]">International Strategy</h2>
            <p className="text-slate-500">Geopolitical frameworks for peace and reconstruction.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          
          {/* Ukraine Plan Link - Updated Route */}
          <Link
            href="/initiatives/ukraine-peace-plan"
            className="group block h-full p-8 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="mb-4 text-[#1e6864]">
               <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              The Ukraine Plan
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              The "Freeze-Vote-Rebuild" framework. Applying technocratic neutrality and the "Construction Olympics" model to geopolitical conflict resolution.
            </p>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              View Framework <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}