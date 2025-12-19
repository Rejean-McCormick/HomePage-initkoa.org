// app/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect/stockage-mythos/page.tsx
import Link from 'next/link';
import { 
  FolderOpen, 
  Database, 
  Shield, 
  History, 
  FileText, 
  Users,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Stockage — L'Armoire Commune",
  description: "La Gestion des Ressources. Assets, Versioning et Permissions. L'endroit où la tribu range ses outils.",
};

const FEATURES = [
  {
    title: "1. L'Objet (Asset Management)",
    desc: "Chaque fichier est vivant. Il a un auteur, une date, un contexte. Ce n'est pas juste des bits, c'est un outil identifié.",
    icon: <FileText className="w-5 h-5 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200"
  },
  {
    title: "2. L'Histoire (Versioning)",
    desc: "Le droit à l'erreur. On n'écrase jamais le passé. Stockage garde la mémoire de toutes les versions précédentes.",
    icon: <History className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "3. La Loi (Access Control)",
    desc: "Qui a la clé ? Définir qui peut voir, qui peut toucher, qui peut détruire. La frontière entre Public, Équipe et Privé.",
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

const DATA_MODELS = [
  "Asset (Le Fichier)",
  "Folder (Le Rangement)",
  "AccessControl (La Permission)",
  "Version (La Trace)"
];

export default function StockagePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-cyan-100 rounded-2xl">
            <FolderOpen className="w-10 h-10 text-cyan-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Stockage
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Une tribu ne survit pas si chacun cache son marteau. 
          Stockage est l'organe de la <strong>Propriété Partagée</strong> : l'armoire commune où l'on range les outils et les plans.
        </p>

        <div className="mt-8 bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
          <strong className="block text-cyan-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Posséder, c'est souvent bloquer. Partager, c'est multiplier. Stockage est l'art de garder les choses disponibles sans qu'elles soient volées."
          </p>
        </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Pourquoi dans KeenKonnect ?</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Pourquoi ne pas mettre ça dans "Infrastructure" ? Parce que dans Kréature, le stockage est <strong>relationnel</strong>. 
        </p>
        <p className="text-sm text-slate-400">
          Un fichier seul dans le vide ne sert à rien. Il prend son sens parce qu'il appartient à un <strong>Projet</strong> (Konstruct) ou qu'il est utilisé par une <strong>Équipe</strong>. C'est du tissu social matérialisé.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 3 Fonctions de l'Armoire</h2>
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
          <Database className="w-5 h-5 text-slate-500" />
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
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à KeenKonnect
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kreative" className="text-pink-600 hover:text-pink-800 font-bold flex items-center gap-2 transition-colors">
          Aller vers Kreative (La Culture) →
        </Link>
      </div>

    </main>
  );
}