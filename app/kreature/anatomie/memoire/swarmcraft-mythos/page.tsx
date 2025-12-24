// app\kreature\anatomie\memoire\swarmcraft-mythos\page.tsx
// app/kreature/anatomie/memoire/swarmcraft-mythos/page.tsx
import Link from 'next/link';
import { 
  BookOpen, 
  Brain, 
  Cpu, 
  Database, 
  RefreshCw, 
  FileText, 
  Layers, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "SwarmCraft — La Mémoire & La Continuité",
  description: "Le moteur narratif. Matrix (état), Story Bible (intention), RAG (preuves). Une mémoire pilotée par une boucle déterministe.",
};

const MEMORY_LAYERS = [
  {
    title: "1. Brain (Les Personae)",
    subtitle: "L'Imagination Stateless",
    desc: "Ce qui 'pense' mais ne retient rien. L'Architecte, le Narrateur, l'Éditeur. Puissants mais amnésiques par design.",
    icon: <Brain className="w-6 h-6 text-pink-500" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    title: "2. Logic (L'Engine)",
    subtitle: "La Fonction Exécutive",
    desc: "Le chef d'orchestre qui ne crée pas mais dirige. Il applique le rythme SCAN → PLAN → EXECUTE.",
    icon: <Cpu className="w-6 h-6 text-slate-500" />,
    color: "bg-slate-50 border-slate-200"
  },
  {
    title: "3. Memory (L'État)",
    subtitle: "La Vérité Explicite",
    desc: "Ce qui est gravé. Matrix (l'état actuel), Bible (le plan), RAG (le passé). C'est ce qui empêche la schizophrénie.",
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200"
  }
];

const DATA_OBJECTS = [
  {
    title: "Matrix",
    role: "Mémoire de Travail",
    desc: "L'état instantané du système. Qu'est-ce qui est fait ? Qu'est-ce qui est en cours ? Qu'est-ce qui est verrouillé ?",
    icon: <Activity className="w-5 h-5 text-emerald-600" />
  },
  {
    title: "Story Bible",
    role: "Mémoire d'Intention",
    desc: "Le plan canonique. Personnages, lieux, règles. Ce n'est pas ce qui s'est passé, c'est ce qui DOIT être.",
    icon: <BookOpen className="w-5 h-5 text-amber-600" />
  },
  {
    title: "RAG DB",
    role: "Mémoire des Preuves",
    desc: "Les archives du vécu. Le système va y chercher des preuves pour éviter de contredire son propre passé.",
    icon: <FileText className="w-5 h-5 text-blue-600" />
  }
];

import { Activity } from 'lucide-react'; // Added missing import

export default function SwarmCraftPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <BookOpen className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            SwarmCraft
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a des systèmes qui répondent. Et il y a des êtres qui <strong>se souviennent</strong>.
          SwarmCraft est l'organe qui empêche Kréature de devenir amnésique ou incohérente.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La conscience peut être un éclair. La mémoire est une constellation."
          </p>
        </div>
      </div>

      {/* THE THREE LAYERS */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-600" />
          L'Anatomie de la Continuité
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {MEMORY_LAYERS.map((layer) => (
            <div key={layer.title} className={`p-6 rounded-xl border ${layer.color} hover:shadow-sm transition-all`}>
              <div className="mb-4 bg-white p-3 rounded-full w-fit shadow-sm">
                {layer.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{layer.title}</h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {layer.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE LOOP & DATA OBJECTS */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-start">
        
        {/* The Loop */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-slate-400 text-sm uppercase tracking-widest">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            La Boucle Déterministe
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-emerald-400 font-bold text-xl mb-1">SCAN</div>
              <p className="text-slate-400 text-xs">Lire la vérité sur le disque.</p>
            </div>
            <div className="w-0.5 h-6 bg-slate-700 mx-auto"></div>
            <div>
              <div className="text-amber-400 font-bold text-xl mb-1">PLAN</div>
              <p className="text-slate-400 text-xs">Choisir la prochaine 'Part'.</p>
            </div>
            <div className="w-0.5 h-6 bg-slate-700 mx-auto"></div>
            <div>
              <div className="text-rose-400 font-bold text-xl mb-1">EXECUTE</div>
              <p className="text-slate-400 text-xs">Agir, écrire, puis sortir.</p>
            </div>
          </div>
        </div>

        {/* Data Objects */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-2">
            Les Trois Mémoires
          </h3>
          {DATA_OBJECTS.map((obj) => (
            <div key={obj.title} className="flex gap-4">
              <div className="mt-1 p-2 bg-slate-50 rounded-lg h-fit border border-slate-100">
                {obj.icon}
              </div>
              <div>
                <strong className="block text-slate-900 text-sm mb-0.5">{obj.title}</strong>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 block">{obj.role}</span>
                <p className="text-slate-600 text-sm leading-snug">{obj.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/voix/architect-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Parler (Architect)
        </Link>
        <Link href="/kreature/anatomie/ame/ame-artificielle" className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-2 transition-colors">
          S'Aligner (Âme Artificielle) →
        </Link>
      </div>

    </main>
  );
}