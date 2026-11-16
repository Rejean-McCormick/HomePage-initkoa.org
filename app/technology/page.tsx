import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Boxes, Compass, FileCheck2, Layers, Network, ShieldCheck } from 'lucide-react';
import TechnologyCatalog from './TechnologyCatalog';
import { TECHNOLOGY_CATALOG, TECHNOLOGY_CATEGORIES } from '@/lib/technology-catalog';

export const metadata: Metadata = {
  title: 'Technology & applications — kOA',
  description: 'Explore the systems, applications, tools and research that make up kOA.',
  alternates: { canonical: '/technology' },
};

const PILLARS = [
  {
    number: '01', icon: <Network className="h-6 w-6" aria-hidden="true" />,
    title: 'Connect systems',
    description: 'Document how separately governed systems can exchange knowledge and work.',
    names: 'Koali · Interaction Kernel · Konnaxion · Orgo',
  },
  {
    number: '02', icon: <FileCheck2 className="h-6 w-6" aria-hidden="true" />,
    title: 'Preserve knowledge',
    description: 'Keep sources, uncertainty and provenance visible when knowledge is reviewed, used and published.',
    names: 'Kristal · SenTient · Konstellation · SemantiK',
  },
  {
    number: '03', icon: <Compass className="h-6 w-6" aria-hidden="true" />,
    title: 'Design learning and creative experiences',
    description: 'Connect educational tools, media and research while making the status of each experience clear.',
    names: 'eKole · Kontexte · Kompose · Spek · Kolor',
  },
];

export default function TechnologyOverviewPage() {
  return (
    <main data-technology-overview className="technology-overview not-prose min-h-screen bg-[#f6f8f7] text-slate-900">
      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle at 85% 15%, #32b5a6 0, transparent 33%), radial-gradient(circle at 0% 95%, #276978 0, transparent 40%)' }} />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10">
          <div className="mb-9 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-300" /> kOA / TECHNOLOGY
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Technology and applications
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Find the applications, foundations and research behind the kOA ecosystem.
            Each entry describes a role and links to its documentation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#catalogue" className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-teal-200">
              Explore the catalog <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="https://rejean-mccormick.github.io/kOA-Digital-Ecosystem-GitHub-Audit/#apps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              Engineering audit <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-16 grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
            <div><strong className="block text-3xl font-semibold sm:text-4xl">{TECHNOLOGY_CATALOG.length}</strong><span className="mt-1 block text-sm text-slate-300">projects listed</span></div>
            <div><strong className="block text-3xl font-semibold sm:text-4xl">{TECHNOLOGY_CATEGORIES.length}</strong><span className="mt-1 block text-sm text-slate-300">technology categories</span></div>
            <div><strong className="block text-base font-semibold text-teal-200 sm:text-lg">Sources and scope</strong><span className="mt-1 block text-sm text-slate-300">project documentation and evidence</span></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10" aria-labelledby="pillar-title">
        <div className="mb-9 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">How to read the ecosystem</span>
          <h2 id="pillar-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Responsibilities that work together</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">The catalog distinguishes what each component does and where its authority starts and ends.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {PILLARS.map((item) => (
            <article key={item.number} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between text-teal-800"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">{item.icon}</span><span className="font-mono text-sm text-slate-400">{item.number}</span></div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">{item.description}</p>
              <p className="mt-6 border-t border-slate-100 pt-4 text-sm font-medium leading-6 text-teal-800">{item.names}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white" aria-labelledby="entry-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:px-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-800"><Layers aria-hidden="true" className="h-4 w-4" /> Start here</span>
            <h2 id="entry-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Different roles for working with knowledge</h2>
            <p className="mt-4 leading-7 text-slate-600">Kristal represents knowledge states. SenTient helps interpret inputs, Konstellation provides views, and SemantiK Architect expresses structured content in human languages.</p>
            <Link href="/technology/kristal" className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">Explore Kristal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{name:'Kristal',role:'State & provenance'},{name:'SenTient',role:'Interpretation & matching'},{name:'Konstellation',role:'Navigation & reading'},{name:'SemantiK Architect',role:'Multilingual rendering'}].map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><Boxes className="mb-4 h-5 w-5 text-teal-800" aria-hidden="true" /><strong className="block text-lg text-slate-900">{item.name}</strong><span className="mt-1 block text-sm text-slate-600">{item.role}</span></div>
            ))}
          </div>
        </div>
      </section>

      <TechnologyCatalog />

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div><ShieldCheck className="h-7 w-7 text-teal-300" aria-hidden="true" /><h2 className="mt-4 text-2xl font-semibold">Sources and development status</h2><p className="mt-3 max-w-xl leading-7 text-slate-300">Use the architecture map for responsibilities, the engineering audit for dated evidence and the Context Packs for source-linked documentation.</p></div>
          <div className="flex flex-col justify-center gap-3">
            <Link href="/technology/context-packs" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Context Packs <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
            <Link href="/ecosystem" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Ecosystem architecture <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
            <a href="https://github.com/Rejean-McCormick/kOA-Digital-Ecosystem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Canonical source <ArrowUpRight aria-hidden="true" className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
