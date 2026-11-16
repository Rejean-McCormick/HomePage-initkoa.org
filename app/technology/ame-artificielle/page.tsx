import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, BrainCircuit, GitBranch, HeartPulse, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Âme artificielle / EL — Psycho-causal modelling',
  description: 'EL is research into functional models of personality mechanisms, including beliefs, memories, affect and responses.',
  alternates: { canonical: '/technology/ame-artificielle' },
};

const stages = [
  { title: 'Soul Basis', detail: 'Shared ontology of mechanisms and relationships.' },
  { title: 'Soul Snapshot', detail: 'An immutable representation of a personality at a given time.' },
  { title: 'Stimulus & Activation Graph', detail: 'Temporary causal activation, propagation and inhibition in response to a stimulus.' },
  { title: 'Interpretation → affect → intention', detail: 'Compute intermediate states and generate a consistent response.' },
];

const docs = [
  { label: 'Operational definition', file: 'definition_operationnelle.md' },
  { label: 'Soul Graph schema', file: 'soul_graph_schema.md' },
  { label: 'Engine specification', file: 'engine_spec.md' },
  { label: 'Biographical snapshots', file: 'snapshots_biographiques.md' },
  { label: 'Validation protocol', file: 'validation_protocol.md' },
];

const symbolicPages = [
  { title: '1–9 framework and chakras (French)', href: '/technology/ame-artificielle/charte-1-9-et-chakras' },
  { title: 'Inverted Pythagorean numerology (French)', href: '/technology/ame-artificielle/numerologie-pythagoricienne-inversee' },
  { title: 'Branes and meaning (French)', href: '/technology/ame-artificielle/branes-et-couche-de-sens' },
  { title: 'Philosophical framework (French)', href: '/technology/ame-artificielle/cadre-philosophique' },
];

export default function AmeArtificiellePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-16">
        <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-violet-800">Experimental research · EL</div>
        <h1 className="mt-7 text-4xl font-semibold tracking-tight md:text-6xl">Âme artificielle</h1>
        <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-700">
          EL explores functional models of human personality. It represents how dispositions, beliefs, values, memories, reasoning, affect and responses interact in a psycho-causal graph.
        </p>
        <p className="mt-4 max-w-4xl leading-7 text-slate-600">
          The model is evaluated by its behaviour and structure. Claims about subjective experience and moderation fall outside that evaluation.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="https://github.com/Rejean-McCormick/Ame-Artificielle" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-violet-800 px-5 py-3 font-semibold text-white hover:bg-violet-700">See the engine and sources <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          <Link href="/technology" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50">Back to technology</Link>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">How EL computes a response</h2>
          <p className="mt-3 max-w-3xl text-slate-600">A snapshot represents a subject at a specific time. Updating biographical state is a separate operation.</p>
          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            {stages.map((stage, index) => (
              <li key={stage.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <span className="text-xs font-mono font-bold text-violet-700">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{stage.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-600">Changes between biographical snapshots are explicit. Trait vectors are derived projections.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-5 px-6 py-14 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-6"><BrainCircuit className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Dispositions, reasoning and personality</h2><p className="mt-2 text-sm leading-6 text-slate-600">The model distinguishes the organization of dispositions, perception and reassessment, and their observable expression in context.</p></div>
        <div className="rounded-2xl border border-slate-200 p-6"><HeartPulse className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Modelled affect</h2><p className="mt-2 text-sm leading-6 text-slate-600">Affect is a computed state in the model.</p></div>
        <div className="rounded-2xl border border-slate-200 p-6"><ShieldCheck className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">External safeguards</h2><p className="mt-2 text-sm leading-6 text-slate-600">Output constraints are applied in a separate layer from the simulated causal graph.</p></div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <div className="rounded-2xl bg-slate-900 p-7 text-white md:p-9">
          <div className="flex items-center gap-3"><GitBranch className="h-6 w-6 text-violet-300" aria-hidden="true" /><h2 className="text-2xl font-semibold">Engine documentation</h2></div>
          <p className="mt-3 max-w-3xl text-slate-300">The repository describes the mechanisms and how they are evaluated. The proposed Kristal profile represents the graph, and the Soul Causal Engine runs propagation.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {docs.map((doc) => <a key={doc.file} href={`https://github.com/Rejean-McCormick/Ame-Artificielle/blob/main/docs/${doc.file}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><BookOpen aria-hidden="true" className="h-4 w-4 text-violet-300" />{doc.label} <span className="ml-auto">↗</span></a>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-2xl font-semibold">Symbolic and historical readings</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">These source texts describe symbolic interpretations and hypotheses. The technical documentation describes the graph and how the model is evaluated.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {symbolicPages.map((page) => <Link key={page.href} href={page.href} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">{page.title}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>)}
          <Link href="/technology/ame-artificielle/mecanisme-de-reaction" className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">Response mechanism (French original)<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <Link href="/technology/ame-artificielle/validation" className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">Validation notes (French original)<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
