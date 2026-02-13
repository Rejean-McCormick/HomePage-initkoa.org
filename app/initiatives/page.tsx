// app/initiatives/page.tsx
import Link from 'next/link';
import {
  Landmark,
  Scroll,
  Cpu,
  Layers,
  Server,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Scale,
} from 'lucide-react';

export const metadata = {
  title: 'Initiatives – kOA',
  description:
    'Three layers of action: Theory (diagnosis and principles), Governance (rules and institutions), and Technology (tools that make coordination auditable and real).',
};

export default function InitiativesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-[#1e6864]">Initiatives</h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          The kOA Initiative is organized as three layers of action:{' '}
          <span className="font-bold text-[#1e6864]">Theory</span> (the diagnosis and guiding principles),{' '}
          <span className="font-bold text-[#1e6864]">Governance</span> (rules and institutions), and{' '}
          <span className="font-bold text-[#1e6864]">Technology</span> (tools that make coordination concrete, verifiable, and scalable).
        </p>
      </div>

      {/* SECTION 1: THEORY */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <div className="bg-[#1e6864]/10 p-3 rounded-full mr-4 border border-[#1e6864]/20">
            <Scroll className="w-8 h-8 text-[#1e6864]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e6864]">Theory</h2>
            <p className="text-slate-500">Why these systems exist, what they solve, and the constraints they must respect.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/why"
            className="group block p-7 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-lg transition-all duration-300 bg-white"
          >
            <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              The Diagnosis
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              The problem statement: fragmentation, low-trust coordination, and institutions that can’t learn fast enough.
            </p>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              Read <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/principles"
            className="group block p-7 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-lg transition-all duration-300 bg-white"
          >
            <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              Principles
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              The axioms and domain separations that keep the project legible, safe, and governable.
            </p>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              Explore <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/research"
            className="group block p-7 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-lg transition-all duration-300 bg-white"
          >
            <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              Research
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Working papers and models behind the ecosystem: governance, knowledge systems, and collective intelligence.
            </p>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              Browse <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 2: CIVIC GOVERNANCE */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <div className="bg-[#1e6864]/10 p-3 rounded-full mr-4 border border-[#1e6864]/20">
            <Landmark className="w-8 h-8 text-[#1e6864]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e6864]">Governance</h2>
            <p className="text-slate-500">Rules, rights, and modules for real-world institutional replacement.</p>
          </div>
        </div>

        <Link
          href="/initiatives/civic-governance"
          className="group relative block p-8 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-xl transition-all duration-300 bg-white"
        >
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 text-slate-900 group-hover:text-[#1e6864] transition-colors">
                Civic Governance Dashboard
              </h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                Access the <strong>Civic Constitution</strong> (the rules) and the active modules for <strong>Education</strong>,{' '}
                <strong>Economy</strong>, and <strong>Justice</strong>.
              </p>

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

      {/* SECTION 3: TECHNOLOGY */}
      <section className="mb-6">
        <div className="flex items-center mb-8">
          <div className="bg-[#1e6864]/10 p-3 rounded-full mr-4 border border-[#1e6864]/20">
            <Cpu className="w-8 h-8 text-[#1e6864]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1e6864]">Technology</h2>
            <p className="text-slate-500">The tools that make governance and coordination auditable, offline-capable, and usable.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/technology"
            className="group block p-8 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-xl transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              Technology Stack
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              System architecture and components (with clear separation between public explanations and technical specifications).
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                <Layers className="w-3 h-3 mr-2" /> Ariane
              </span>
              <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                <Cpu className="w-3 h-3 mr-2" /> Voting Machine
              </span>
              <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                <Server className="w-3 h-3 mr-2" /> SwarmCraft
              </span>
            </div>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              View stack <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/platforms"
            className="group block p-8 border border-slate-200 rounded-2xl hover:border-[#1e6864] hover:shadow-xl transition-all duration-300 bg-white"
          >
            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-[#1e6864] transition-colors">
              Platforms
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Productized “civic utilities” that turn knowledge into coordinated action—public workflows and private operations.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                <Layers className="w-3 h-3 mr-2" /> Konnaxion
              </span>
              <span className="flex items-center text-xs font-bold uppercase tracking-widest bg-[#1e6864]/5 px-3 py-1.5 rounded text-[#1e6864] border border-[#1e6864]/20">
                <Server className="w-3 h-3 mr-2" /> Orgo
              </span>
            </div>
            <div className="flex items-center text-[#1e6864] font-bold group-hover:translate-x-1 transition-transform">
              Explore platforms <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
