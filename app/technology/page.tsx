import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Boxes, Compass, FileCheck2, Layers, Network, ShieldCheck } from 'lucide-react';
import TechnologyCatalog from './TechnologyCatalog';
import { TECHNOLOGY_CATALOG, TECHNOLOGY_CATEGORIES } from '@/lib/technology-catalog';

export const metadata: Metadata = {
  title: 'Technologies & applications — kOA',
  description: 'Explorer les systèmes, applications, outils et recherches de kOA : Koali, Konnaxion, Orgo, Kristal, eKole, SenTient, SemantiK, et leurs composants.',
  alternates: { canonical: '/technology' },
};

const PILLARS = [
  {
    number: '01', icon: <Network className="h-6 w-6" aria-hidden="true" />,
    title: 'Relier les systèmes',
    description: 'Des frontières d’autorité explicites et des échanges documentés, plutôt qu’une plateforme qui prétend tout contrôler.',
    names: 'Koali · Interaction Kernel · Konnaxion · Orgo',
  },
  {
    number: '02', icon: <FileCheck2 className="h-6 w-6" aria-hidden="true" />,
    title: 'Préserver les connaissances',
    description: 'Séparer les sources, les états de connaissance, leur lecture et leur publication. Garder l’incertitude et la provenance visibles.',
    names: 'Kristal · SenTient · Konstellation · SemantiK',
  },
  {
    number: '03', icon: <Compass className="h-6 w-6" aria-hidden="true" />,
    title: 'Concevoir des expériences',
    description: 'Relier outils pédagogiques, médias, création et recherche sans confondre prototype, contenu et service exploitable.',
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
            <span className="inline-block h-2 w-2 rounded-full bg-teal-300" /> kOA / TECHNOLOGIE
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Un écosystème.<br /><span className="text-teal-300">Bien plus qu’une liste d’outils.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Des applications concrètes, des fondations techniques, des outils de connaissance et des recherches.
            Chaque projet a son rôle, ses limites et sa documentation — sans confondre présence sur GitHub et validation en production.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#catalogue" className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-teal-200">
              Explorer le catalogue <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="https://rejean-mccormick.github.io/kOA-Digital-Ecosystem-GitHub-Audit/#apps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
              Audit des applications <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-16 grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
            <div><strong className="block text-3xl font-semibold sm:text-4xl">{TECHNOLOGY_CATALOG.length}</strong><span className="mt-1 block text-sm text-slate-300">projets présentés</span></div>
            <div><strong className="block text-3xl font-semibold sm:text-4xl">{TECHNOLOGY_CATEGORIES.length}</strong><span className="mt-1 block text-sm text-slate-300">familles de technologies</span></div>
            <div><strong className="block text-base font-semibold text-teal-200 sm:text-lg">Sources et limites explicites</strong><span className="mt-1 block text-sm text-slate-300">documentation plutôt que promesses</span></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10" aria-labelledby="pillar-title">
        <div className="mb-9 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Comment lire l’écosystème</span>
          <h2 id="pillar-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Des fonctions qui se complètent</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Le catalogue distingue les responsabilités. Un outil de lecture ne devient pas une autorité de vérité ; une simulation ne devient pas un service déployé.</p>
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
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-800"><Layers aria-hidden="true" className="h-4 w-4" /> Point d’entrée</span>
            <h2 id="entry-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">La connaissance n’est pas un bloc monolithique.</h2>
            <p className="mt-4 leading-7 text-slate-600">Kristal représente des états de connaissance ; SenTient aide à interpréter ; Konstellation propose des vues ; SemantiK Architect articule le contenu dans les langues humaines. Ces rôles sont distincts et complémentaires.</p>
            <Link href="/technology/kristal" className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">Explorer Kristal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{name:'Kristal',role:'État & provenance'},{name:'SenTient',role:'Interprétation & rapprochement'},{name:'Konstellation',role:'Navigation & lecture'},{name:'SemantiK Architect',role:'Articulation multilingue'}].map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><Boxes className="mb-4 h-5 w-5 text-teal-800" aria-hidden="true" /><strong className="block text-lg text-slate-900">{item.name}</strong><span className="mt-1 block text-sm text-slate-600">{item.role}</span></div>
            ))}
          </div>
        </div>
      </section>

      <TechnologyCatalog />

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div><ShieldCheck className="h-7 w-7 text-teal-300" aria-hidden="true" /><h2 className="mt-4 text-2xl font-semibold">Sources, état des travaux et limites</h2><p className="mt-3 max-w-xl leading-7 text-slate-300">L’inventaire rassemble des références issues des dépôts documentés. Les niveaux de maturité et les responsabilités effectives doivent être vérifiés dans leurs sources. La carte d’architecture, l’audit public et les Context Packs remplissent des rôles différents.</p></div>
          <div className="flex flex-col justify-center gap-3">
            <Link href="/technology/context-packs" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Context Packs <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
            <Link href="/ecosystem" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Architecture de l’écosystème <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
            <a href="https://github.com/Rejean-McCormick/kOA-Digital-Ecosystem" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-xl border border-white/25 p-4 font-semibold hover:bg-white/10">Source canonique <ArrowUpRight aria-hidden="true" className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
