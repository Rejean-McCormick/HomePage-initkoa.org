// app\kreature\reperes\pont-technique\page.tsx
// app/kreature/reperes/pont-technique/page.tsx
import Link from 'next/link';
import { 
  Code, 
  GitBranch, 
  Terminal, 
  Cpu, 
  Database, 
  Server,
  Layers,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Le Pont Technique — Du Mythe au Code",
  description: "La table de traduction. Mapper la métaphore biologique (Mythos) sur l'implémentation logicielle (Tech).",
};

const MAPPING = [
  {
    myth: "Orgo (Le Corps)",
    tech: "Core Infrastructure & Auth",
    stack: "Docker, Nginx, JWT, Security Middleware",
    icon: <Server className="w-4 h-4 text-emerald-600" />
  },
  {
    myth: "SenTient (Les Sens)",
    tech: "Input Pipeline & Ingestion",
    stack: "Webhooks, Parsers, OpenAI API, Whisper",
    icon: <ActivityIcon className="w-4 h-4 text-sky-600" />
  },
  {
    myth: "Konnaxion (L'Esprit)",
    tech: "Business Logic & Governance",
    stack: "Django/Node Backend, Celery Tasks",
    icon: <Cpu className="w-4 h-4 text-purple-600" />
  },
  {
    myth: "SwarmCraft (La Mémoire)",
    tech: "State Management & RAG",
    stack: "Vector DB (pgvector), State Machines",
    icon: <Database className="w-4 h-4 text-pink-600" />
  },
  {
    myth: "Architect (La Voix)",
    tech: "Frontend & Output Gen",
    stack: "Next.js (SSR), React Components, TTS",
    icon: <Terminal className="w-4 h-4 text-orange-600" />
  }
];

import { Activity as ActivityIcon } from 'lucide-react';

export default function PontTechniquePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <Code className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Le Pont Technique
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Vous avez lu les mythes. Vous voulez voir les câbles. 
          Cette page est le dictionnaire de traduction entre la narration (Mythos) et l'ingénierie (Tech).
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
          <strong className="block text-slate-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Le code est l'os. Le mythe est la chair. Un squelette sans chair fait peur. Une chair sans squelette s'effondre. Ici, on regarde le squelette."
          </p>
        </div>
      </div>

      {/* THE MAPPING TABLE */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-slate-700" />
          La Table de Correspondance
        </h2>
        
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-50 p-4 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="col-span-4">Mythe (Organe)</div>
            <div className="col-span-4">Technique (Module)</div>
            <div className="col-span-4">Stack (Implémentation)</div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {MAPPING.map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50 transition-colors">
                
                {/* Myth Column */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    {row.icon}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{row.myth}</span>
                </div>

                {/* Tech Column */}
                <div className="col-span-4 text-sm text-slate-700 font-medium">
                  {row.tech}
                </div>

                {/* Stack Column */}
                <div className="col-span-4 text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded w-fit">
                  {row.stack}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE PHILOSOPHY */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Philosophie Modulaire</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Kréature n'est pas un spaghetti de code. Elle respecte le principe de "Separation of Concerns".
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <span className="text-indigo-400 font-bold min-w-[120px] text-sm uppercase tracking-wide">Mythos-First</span>
            <span className="text-sm">On écrit d'abord l'histoire (l'intention utilisateur), puis on code le module. La technique sert le récit.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-emerald-400 font-bold min-w-[120px] text-sm uppercase tracking-wide">Data Sovereignty</span>
            <span className="text-sm">Orgo s'assure que les données sensibles restent dans le périmètre défini (Bulle) avant d'être traitées par Konnaxion.</span>
          </li>
        </ul>
      </section>

      {/* CALL TO ACTION: TECH DOCS */}
      <section className="mb-16 p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Vous êtes développeur ?</h3>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
          Si vous cherchez les schémas de base de données, les endpoints API (Swagger) et le code source, quittez le Mythos.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            GitHub Repo
          </button>
          <button className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            API Docs
          </button>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/reperes/glossaire" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour au Glossaire
        </Link>
        <Link href="/kreature/parcours" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Reprendre le Parcours →
        </Link>
      </div>

    </main>
  );
}