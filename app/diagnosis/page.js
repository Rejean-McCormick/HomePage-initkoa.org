// app/diagnosis/page.js
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Systemic Diagnosis – King Klown & KOA',
  description: 'A radical lucidity assessment of the interlocking crises facing modern society: the 9 systemic failures we must solve.',
};

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-primary selection:text-white">
      
      {/* HEADER SECTION */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden border-b border-slate-800">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-primary opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="uppercase tracking-widest text-xs md:text-sm text-primary mb-6 font-bold">
            The Manifesto
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 font-serif leading-tight text-white">
            Global Context & <br />
            Systemic Diagnosis
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto font-light text-slate-300">
            We cannot fix what we refuse to see. Before proposing solutions, we must practice{' '}
            <span className="bg-primary text-slate-900 px-2 py-0.5 font-bold box-decoration-clone">
              Radical Lucidity
            </span>
            : facing the harsh reality of our interlocking crises without illusion or optimism bias.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg prose-invert mx-auto text-slate-300">
          <p className="text-xl leading-loose">
            The contemporary world faces an unprecedented convergence of crises. 
            Social fragmentation, ecological instability, and rapid technological upheaval 
            have created an environment where traditional reforms—incremental, isolated, 
            or technocratic—are no longer sufficient.
          </p>
          <p>
            Our institutions were designed for a slower, more stable century. Today, 
            they are buckling under the weight of nine specific, mutually reinforcing failures.
          </p>
        </div>
      </section>

      {/* THE 9 SYSTEMIC FAILURES */}
      <section className="bg-slate-800/50 py-20 px-6 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white font-serif">
            The 9 Systemic Failures
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Failure 1 */}
            <FailureCard 
              number="01"
              title="Image-Over-Substance"
              description="Politics and business now prioritize visibility, charisma, and narrative control over competence. Metrics like follower counts overshadow evidence-based track records, creating a feedback loop of spectacle."
            />
            {/* Failure 2 */}
            <FailureCard 
              number="02"
              title="Debt-Laden Education"
              description="The prevailing model ties credential value to institutional brands while financing itself through crushing student debt. Curricula lag behind reality, perpetuating barriers to mobility."
            />
            {/* Failure 3 */}
            <FailureCard 
              number="03"
              title="Fragmented Information"
              description="Digital ecosystems prioritize engagement over truth. Algorithms amplify conflict and micro-target realities, making shared public discourse and crisis response nearly impossible."
            />
            {/* Failure 4 */}
            <FailureCard 
              number="04"
              title="Legacy Workflow Drag"
              description="Institutions remain anchored to outdated processes that have been digitized but not redesigned. Hierarchical bottlenecks create opacity and inequity for those without intermediaries."
            />
            {/* Failure 5 */}
            <FailureCard 
              number="05"
              title="Elite Capture of Regulation"
              description="Complex regulations and selective enforcement benefit incumbents. Wealth shapes the design of rules, eroding public trust and reinforcing systemic asymmetries."
            />
            {/* Failure 6 */}
            <FailureCard 
              number="06"
              title="Rent-Extracting Intermediaries"
              description="Wherever friction exists, middlemen arise to monetize it without adding value. This diverts resources from productive use and raises barriers to entry for creators."
            />
            {/* Failure 7 */}
            <FailureCard 
              number="07"
              title="Fossil-Centric Lock-In"
              description="Our economy remains physically anchored to fossil energy and plastics. Sunk-cost infrastructure and lobbying slow the transition, prioritizing short-term profit over survival."
            />
            {/* Failure 8 */}
            <FailureCard 
              number="08"
              title="Social Fragmentation"
              description="The decline of shared civic rituals and the rise of hyper-mobility have weakened social ties. This isolation weakens collective action and increases vulnerability to shocks."
            />
            {/* Failure 9 */}
            <FailureCard 
              number="09"
              title="The Hyper-Individualist Myth"
              description="A cultural narrative that celebrates personal aspiration detached from community. This inflates expectations and leads to disillusionment when individual effort fails to overcome structural barriers."
            />
          </div>
        </div>
      </section>

      {/* CONCLUSION / CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white font-serif">The Path Forward</h2>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          These failures are interconnected; they cannot be solved in isolation. 
          This diagnosis sets the stage for{' '}
          <span className="bg-white text-slate-900 px-2 py-0.5 font-bold box-decoration-clone">
            King Klown & KOA
          </span>
          : a systemic response built on radical openness, meritocratic governance, and constructive radicalism.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/principles" 
            className="px-8 py-4 bg-primary text-slate-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20"
          >
            Explore Our Principles
          </Link>
          <Link 
            href="/platforms" 
            className="px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-lg font-bold hover:border-white hover:text-white hover:bg-slate-800 transition-all"
          >
            See the Solutions
          </Link>
        </div>
      </section>
    </main>
  );
}

// Helper Component for the Grid
function FailureCard({ number, title, description }) {
  return (
    <div className="group bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="text-5xl font-bold text-slate-700 mb-6 font-serif group-hover:text-primary/20 transition-colors">
        {number}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}