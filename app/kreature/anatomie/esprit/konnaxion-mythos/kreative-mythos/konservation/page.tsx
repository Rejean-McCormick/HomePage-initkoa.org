// app/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/konservation-mythos/page.tsx
import Link from 'next/link';
import { 
  Landmark, 
  Gem, 
  Archive, 
  History, 
  FolderOpen, 
  ArrowRight,
  Scroll
} from 'lucide-react';

export const metadata = {
  title: "Konservation — Le Musée",
  description: "La Mémoire Culturelle. Curation, Collections et Expositions. La différence entre stocker et se souvenir.",
};

const FEATURES = [
  {
    title: "1. La Curation (Le Choix)",
    desc: "L'accumulation est l'ennemie de la mémoire. Konservation ne garde pas tout. Il choisit les pièces maîtresses qui racontent l'histoire de la tribu.",
    icon: <Gem className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "2. L'Exposition (Le Récit)",
    desc: "Un objet seul est muet. L'exposition (Exhibit) le met en scène, lui donne un contexte et une légende pour qu'il parle aux générations futures.",
    icon: <Landmark className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "3. La Préservation (L'Éternité)",
    desc: "S'assurer que le sens survit au format. Garder les artéfacts lisibles et accessibles, loin de la pourriture numérique (bit rot).",
    icon: <Scroll className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  }
];

const DATA_MODELS = [
  "Artifact (L'Objet Précieux)",
  "Collection (Le Thème)",
  "Exhibit (La Mise en Scène)"
];

export default function KonservationPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <Landmark className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Konservation
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          On peut tout garder et ne rien se rappeler. L'accumulation n'est pas la mémoire. 
          Konservation est l'organe de la <strong>Curation</strong> : choisir ce qui mérite de traverser le temps.
        </p>

        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <strong className="block text-amber-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Un entrepôt se remplit jusqu'à craquer. Un musée choisit ce qui doit rester. Konservation est l'acte de choisir ce qui nous définit."
          </p>
        </div>
      </div>

      {/* DISTINCTION: WAREHOUSE VS MUSEUM */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">L'Utile vs Le Sacré</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 border-t border-slate-700 pt-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold uppercase text-sm">
              <FolderOpen className="w-4 h-4" />
              Stockage (L'Armoire)
            </div>
            <p className="text-sm text-slate-400">
              C'est fonctionnel. On y cherche la dernière version du fichier, la facture, l'outil.<br/>
              <em>"Où est le marteau ?"</em>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold uppercase text-sm">
              <Landmark className="w-4 h-4" />
              Konservation (Le Musée)
            </div>
            <p className="text-sm text-slate-400">
              C'est identitaire. On y cherche l'origine, le totem, la vision fondatrice.<br/>
              <em>"Qui a bâti la première maison ?"</em>
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 3 Salles du Musée</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feat) => (
            <div key={feat.title} className={`p-6 rounded-xl border ${feat.color} hover:shadow-md transition-all`}>
              <div className="mb-4 bg-white p-2 rounded-lg w-fit shadow-sm">
                {feat.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DATA SKELETON */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Archive className="w-5 h-5 text-slate-500" />
          L'Ossature (Modèles)
        </h2>
        <div className="flex flex-wrap gap-3">
          {DATA_MODELS.map((model, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-sm font-mono text-slate-600">
              {model}
            </span>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/kontact-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Kontact
        </Link>
        <Link href="/kreature/anatomie" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Retour à l'Anatomie (Vue Globale) →
        </Link>
      </div>

    </main>
  );
}