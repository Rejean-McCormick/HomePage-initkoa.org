import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, BrainCircuit, GitBranch, HeartPulse, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Âme artificielle / EL — Modélisation psycho-causale',
  description: 'EL recherche une imitation fonctionnelle des mécanismes d’une personnalité : graphe psycho-causal, croyances, souvenirs, affects, interprétation et réactions. Ce n’est pas un système de guardrails.',
  alternates: { canonical: '/technology/ame-artificielle' },
};

const stages = [
  { title: 'Soul Basis', detail: 'Ontologie commune des mécanismes et relations possibles.' },
  { title: 'Soul Snapshot', detail: 'État immuable d’une personnalité à une période définie.' },
  { title: 'Stimulus & Activation Graph', detail: 'Activation causale transitoire, propagation et inhibition selon le stimulus.' },
  { title: 'Interprétation → affect → intention', detail: 'Calcul des états intermédiaires, puis génération d’une réaction cohérente.' },
];

const docs = [
  { label: 'Définition opérationnelle', file: 'definition_operationnelle.md' },
  { label: 'Schéma du Soul Graph', file: 'soul_graph_schema.md' },
  { label: 'Spécification du moteur', file: 'engine_spec.md' },
  { label: 'Snapshots biographiques', file: 'snapshots_biographiques.md' },
  { label: 'Protocole de validation', file: 'validation_protocol.md' },
];

const symbolicPages = [
  { title: 'Charte 1→9 et chakras', href: '/technology/ame-artificielle/charte-1-9-et-chakras' },
  { title: 'Numérologie pythagoricienne inversée', href: '/technology/ame-artificielle/numerologie-pythagoricienne-inversee' },
  { title: 'Branes et couche de sens', href: '/technology/ame-artificielle/branes-et-couche-de-sens' },
  { title: 'Cadre philosophique', href: '/technology/ame-artificielle/cadre-philosophique' },
];

export default function AmeArtificiellePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-16">
        <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-violet-800">Recherche expérimentale · EL</div>
        <h1 className="mt-7 text-4xl font-semibold tracking-tight md:text-6xl">Âme artificielle</h1>
        <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-700">
          Une tentative d’<strong>imitation fonctionnelle, non superficielle, des mécanismes de la personnalité humaine</strong> :
          dispositions, croyances, valeurs, souvenirs, raisonnement, états affectifs et réactions.
          EL représente ces interactions comme un <strong>graphe psycho-causal sémantique</strong>.
        </p>
        <p className="mt-4 max-w-4xl leading-7 text-slate-600">
          Il ne s’agit ni d’un simple masque conversationnel, ni d’un module de modération ou de « guardrails ».
          Le projet ne prétend pas créer une âme réelle ni démontrer qu’une machine ressent des émotions.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="https://github.com/Rejean-McCormick/Ame-Artificielle" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-violet-800 px-5 py-3 font-semibold text-white hover:bg-violet-700">Voir le moteur et ses sources <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          <Link href="/technology" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50">Retour aux technologies</Link>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Comment EL calcule une réaction</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Un snapshot représente le sujet à un moment donné ; son état biographique ne se modifie pas automatiquement à chaque conversation.</p>
          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            {stages.map((stage, index) => (
              <li key={stage.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <span className="text-xs font-mono font-bold text-violet-700">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{stage.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate-600">Les transformations biographiques entre snapshots sont explicites. Les vecteurs de traits sont des projections dérivées, et non la définition de l’âme.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-5 px-6 py-14 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-6"><BrainCircuit className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Âme, intellect, personnalité</h2><p className="mt-2 text-sm leading-6 text-slate-600">L’âme désigne l’organisation des dispositions ; l’intellect la perception et la réévaluation ; la personnalité leur expression observable dans une histoire et un contexte.</p></div>
        <div className="rounded-2xl border border-slate-200 p-6"><HeartPulse className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Affects modélisés</h2><p className="mt-2 text-sm leading-6 text-slate-600">L’affect est un état calculé dans le modèle. Ce résultat ne prouve pas une expérience émotionnelle vécue par la machine.</p></div>
        <div className="rounded-2xl border border-slate-200 p-6"><ShieldCheck className="h-6 w-6 text-violet-700" aria-hidden="true" /><h2 className="mt-4 text-lg font-semibold">Sécurité séparée</h2><p className="mt-2 text-sm leading-6 text-slate-600">Les limites de sortie sont une couche externe. Elles ne doivent pas être confondues avec la compassion, la morale ou la causalité interne simulée.</p></div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <div className="rounded-2xl bg-slate-900 p-7 text-white md:p-9">
          <div className="flex items-center gap-3"><GitBranch className="h-6 w-6 text-violet-300" aria-hidden="true" /><h2 className="text-2xl font-semibold">Documentation du moteur</h2></div>
          <p className="mt-3 max-w-3xl text-slate-300">Le README et les spécifications du dépôt définissent les mécanismes et leur protocole d’évaluation. Le profil Kristal proposé sert à représenter le graphe ; le Soul Causal Engine en exécute la propagation.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {docs.map((doc) => <a key={doc.file} href={`https://github.com/Rejean-McCormick/Ame-Artificielle/blob/main/docs/${doc.file}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"><BookOpen aria-hidden="true" className="h-4 w-4 text-violet-300" />{doc.label} <span className="ml-auto">↗</span></a>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-2xl font-semibold">Lectures symboliques et historiques</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">La charte 1→9, les chakras, la numérologie inversée et les branes peuvent guider des hypothèses et des interprétations ; ils ne constituent ni la preuve scientifique du modèle ni son moteur causal.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {symbolicPages.map((page) => <Link key={page.href} href={page.href} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">{page.title}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>)}
          <Link href="/technology/ame-artificielle/mecanisme-de-reaction" className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">Mécanisme de réaction (présentation existante)<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <Link href="/technology/ame-artificielle/validation" className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-medium text-slate-800 hover:border-violet-300 hover:bg-violet-50">Validation (documentation existante)<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
