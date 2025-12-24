// app\research\page.js
// app/research/page.js
import Link from 'next/link';
import { 
  Microscope, 
  Globe, 
  BrainCircuit, 
  Binary, 
  Scale 
} from 'lucide-react';

export const metadata = {
  title: 'Research Hub – KOA',
  description:
    'Deep analysis and theoretical frameworks. Open to all perspectives: from sacred geometry to mechanistic materialism.',
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="bg-white border-b border-gray-200 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-blue-600 font-mono text-sm uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Deep Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-slate-900 mb-6">
            Research & Theory
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            This is the laboratory of the KOA project. Here, we explore the fundamental structures 
            that govern our reality—from the mathematics of the cosmos to the dynamics of civilization.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-20 mt-16">

        {/* 1. THE OPEN PERSPECTIVE (Sacred vs Mechanistic) */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-100 rounded-lg text-slate-700 hidden sm:block">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">A Universal Repository</h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  The knowledge presented in this section touches on fundamental constants and deep recurring patterns (such as Pi, the Golden Ratio, and cyclic history). 
                  Because these patterns are so precise, some may feel they are <strong>sacred</strong> or evidence of intelligent design.
                </p>
                <p>
                  However, <strong>KOA imposes no dogma.</strong> We welcome all perspectives:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 list-none pl-0 not-prose my-6">
                  <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <Binary className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-slate-700">The Mechanistic View</span>
                    <span className="text-xs text-slate-500 ml-auto">Pure Math & Physics</span>
                  </li>
                  <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-bold text-slate-700">The Spiritual View</span>
                    <span className="text-xs text-slate-500 ml-auto">Sacred Geometry</span>
                  </li>
                </ul>
                <p>
                  Whether you see these numbers as the handwriting of God, the result of evolutionary efficiency, or simple cosmic coincidence, the data remains valid. 
                  Our goal is <strong>lucidity</strong>, not conversion. Everyone is welcome to analyze these findings through their own cultural or philosophical lens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. RESEARCH TOPICS (Currently only Pi Theory) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Active Research Lines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* PI THEORY CARD */}
            <Link 
              href="/research/pi-theory"
              className="group relative block h-full bg-slate-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
              
              {/* Decorative Circle representing Pi */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 border-4 border-slate-700/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-primary/20 text-primary rounded-lg border border-primary/30">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Foundational
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  Pi Theory
                </h3>
                
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                  An investigation into the number π (Pi) not just as a mathematical constant, but as a potential 
                  blueprint for time, historical cycles, and consciousness structure.
                </p>

                <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                  Read the Theory <span className="text-primary ml-2">→</span>
                </div>
              </div>
            </Link>

            {/* PLACEHOLDER FOR FUTURE RESEARCH */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-100 rounded-xl border border-dashed border-slate-300 text-slate-400 min-h-[300px]">
              <Microscope className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">More research modules coming soon...</p>
              <p className="text-xs mt-2 opacity-70">(Societal Dynamics, Economic Models)</p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}