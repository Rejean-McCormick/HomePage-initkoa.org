// app/diagnosis/page.js
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Systemic Diagnosis – The kOA Initiative',
  description:
    'Radical lucidity: a map of the interlocking failures driving fragmentation, captured institutions, and brittle governance—and the design requirements for rebuilding.',
};

const FAILURES = [
  {
    number: '01',
    title: 'Spectacle Over Competence',
    description:
      'Status is increasingly allocated by visibility, narrative control, and platform dynamics—not verified ability or results. This turns public life into performance and rewards shallow signaling.',
  },
  {
    number: '02',
    title: 'Credential Monopolies + Debt Traps',
    description:
      'Education is priced like luxury access while skill formation remains slow, misaligned, and brand-gated. Debt replaces opportunity, and credentials substitute for demonstrated competence.',
  },
  {
    number: '03',
    title: 'Epistemic Fragmentation',
    description:
      'Attention-optimized media breaks shared reality. Micro-targeted feeds amplify outrage, degrade trust, and make collective response to crises slow, polarized, or impossible.',
  },
  {
    number: '04',
    title: 'Workflow Fossilization',
    description:
      'Institutions digitized old bureaucracy instead of redesigning it. Coordination depends on intermediaries, opaque queues, and manual routing—creating delay, waste, and unequal access.',
  },
  {
    number: '05',
    title: 'Regulatory Capture',
    description:
      'Rules grow complex while enforcement remains selective. Those with resources shape constraints, exploit loopholes, and externalize costs—eroding legitimacy and public trust.',
  },
  {
    number: '06',
    title: 'Rent-Seeking Intermediation',
    description:
      'Wherever systems are confusing, middlemen monetize friction. Value is extracted from coordination itself—raising barriers to entry and starving productive work.',
  },
  {
    number: '07',
    title: 'Energy + Material Lock-In',
    description:
      'Economies remain anchored to fossil energy and wasteful material chains. Sunk infrastructure and lobbying prolong harmful trajectories even when alternatives exist.',
  },
  {
    number: '08',
    title: 'Loss of the Commons',
    description:
      'Social ties weaken as shared rituals, local institutions, and civic identity erode. Isolation increases vulnerability to shocks and makes large-scale cooperation harder to sustain.',
  },
  {
    number: '09',
    title: 'The Hyper-Individualist Myth',
    description:
      'A cultural story promises that personal effort alone is sufficient. When reality contradicts it, people oscillate between cynicism, resentment, and disengagement from collective responsibility.',
  },
];

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-primary selection:text-white">
      {/* HEADER SECTION */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-primary opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="uppercase tracking-widest text-xs md:text-sm text-primary mb-6 font-bold">
            Radical Lucidity
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 font-serif leading-tight text-white">
            Global Context & <br />
            Systemic Diagnosis
          </h1>

          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto font-light text-slate-300">
            We cannot fix what we refuse to see. Before proposing solutions, we practice{' '}
            <span className="bg-primary text-slate-900 px-2 py-0.5 font-bold box-decoration-clone">
              Radical Lucidity
            </span>
            : naming failures clearly, without denial, ideology, or optimism bias.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg prose-invert mx-auto text-slate-300">
          <p className="text-xl leading-loose">
            The present century is not facing “one crisis.” It is facing a convergence: fragmented
            information, brittle institutions, degraded trust, and accelerating technological power.
            Incremental reform cannot keep up when the failure modes reinforce each other.
          </p>

          <p>
            Many institutions were built for a slower world—where knowledge moved slowly, decisions
            were local, and coordination scaled gradually. Today, the environment is faster than our
            governance capacity. The result is a set of systemic failures that compound into
            instability.
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
            {FAILURES.map((f) => (
              <FailureCard
                key={f.number}
                number={f.number}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN REQUIREMENTS */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6 text-white font-serif text-center">
          What this diagnosis implies
        </h2>

        <div className="prose prose-lg prose-invert mx-auto text-slate-300">
          <p className="text-xl leading-relaxed">
            Because these failures reinforce each other, solutions must be systemic. That means
            building shared infrastructure that improves learning, coordination, and governance at
            the same time—without requiring blind trust in black boxes.
          </p>

          <h3 className="text-white">Three non-negotiable design requirements</h3>
          <ul>
            <li>
              <strong>Governable knowledge</strong>: shared reference layers that communities can
              audit, version, and govern—so decisions don’t depend on manipulated feeds.
            </li>
            <li>
              <strong>Competence without technocracy</strong>: mechanisms that surface relevant
              expertise while keeping legitimacy and rights intact.
            </li>
            <li>
              <strong>Coordination that scales</strong>: workflows that reduce friction and
              intermediaries, so action is faster, fairer, and less corruptible.
            </li>
          </ul>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            href="/initiatives"
            className="block p-6 rounded-xl border border-slate-700 bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              Response
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Initiatives</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The civic modules and governance experiments that address the failure modes.
            </p>
          </Link>

          <Link
            href="/platforms"
            className="block p-6 rounded-xl border border-slate-700 bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Tools</div>
            <h3 className="text-lg font-bold text-white mb-2">Platforms</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Practical systems for learning, coordination, and decision-making.
            </p>
          </Link>

          <Link
            href="/principles"
            className="block p-6 rounded-xl border border-slate-700 bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              Guardrails
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Principles</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The axioms and boundaries that keep the work legible, civic, and governable.
            </p>
          </Link>
        </div>
      </section>

      {/* CONCLUSION / CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white font-serif">The Path Forward</h2>

        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          This diagnosis is not a mood. It’s a map. The goal is to rebuild shared capacity: to learn
          faster, coordinate better, and govern with clarity—using tools that remain auditable and
          contestable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/initiatives"
            className="px-8 py-4 bg-primary text-slate-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-primary/20"
          >
            Explore the Response
          </Link>

          <Link
            href="/platforms"
            className="px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-lg font-bold hover:border-white hover:text-white hover:bg-slate-800 transition-all"
          >
            See the Tools
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
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
