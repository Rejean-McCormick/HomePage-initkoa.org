// app\kreature\anatomie\sens\sentient\page.tsx
// app/kreature/anatomie/sens/sentient/page.tsx
import Link from 'next/link';
import { 
  Ear, 
  ShieldCheck, 
  Filter, 
  Network, 
  Lock, 
  ArrowRight, 
  FileText, 
  Scissors, 
  CheckCircle, 
  Database,
  Activity
} from 'lucide-react';

export const metadata = {
  title: "SenTient — Les Oreilles & L'Immunité",
  description: "Le système immunitaire du langage. Déconstruit le texte humain (linéaire) en concepts (mesh) sûrs et structurés.",
};

const PIPELINE_STEPS = [
  {
    step: "1. Écoute (Ingestion)",
    desc: "Le signal arrive 'sale' : emails, messages, textes ambigus. C'est du linéaire bruyant.",
    icon: <FileText className="w-6 h-6 text-slate-500" />
  },
  {
    step: "2. Déconstruction",
    desc: "On ne lit pas, on dissèque. Extraction des entités, repérage des 'formes de surface'.",
    icon: <Scissors className="w-6 h-6 text-orange-500" />
  },
  {
    step: "3. Réconciliation",
    desc: "Le moment de vérité. 'Paris' est-il la ville ou la personne ? Le contexte tranche.",
    icon: <CheckCircle className="w-6 h-6 text-blue-500" />
  },
  {
    step: "4. Mesh (Structure)",
    desc: "Le mot devient un ID unique (Wikidata). Ce n'est plus du langage, c'est de la donnée pure.",
    icon: <Database className="w-6 h-6 text-emerald-500" />
  }
];

const LAYERS = [
  {
    title: "Couche 1 : Le Tamis (Vitesse)",
    desc: "Repérage ultra-rapide. Attraper large, filtrer le bruit évident.",
    icon: <Activity className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "Couche 2 : Le Linguiste (Sens)",
    desc: "Résolution sémantique. Comprendre l'intention derrière l'ambiguïté.",
    icon: <Network className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "Couche 3 : Le Greffier (État)",
    desc: "Enregistrement auditable. Le 'sens' devient stable et exportable.",
    icon: <ShieldCheck className="w-5 h-5 text-slate-600" />,
    color: "bg-slate-50 border-slate-200"
  }
];

export default function SenTientPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <Ear className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            SenTient
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Le monde entre par la peau, mais il infecte par les mots. 
          SenTient est l'organe qui écoute sans se laisser contaminer. 
          Il transforme le langage en structure.
        </p>

        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <strong className="block text-amber-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Les mots ne sont pas des vérités. Les mots sont des vecteurs. SenTient est l'anticorps."
          </p>
        </div>
      </div>

      {/* CORE FUNCTION: IMMUNITY */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          Le Pacte d'Immunité
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose prose-slate text-slate-600">
            <p>
              Sans SenTient, Kréature avalerait le monde "tel quel". Et le monde est plein d'ambiguïtés, de charges émotionnelles et de poisons sociaux.
            </p>
            <p>
              SenTient garantit la <strong>Souveraineté</strong>. Il permet à Orgo de fonctionner sans dépendre d'APIs externes (Google, OpenAI) pour comprendre le texte. Le sens est traité en local, dans la bulle.
            </p>
          </div>
          <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              Pourquoi c'est vital ?
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Contre l'ambiguïté (Les identités qui se mélangent)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Contre le bruit (Mots creux, signatures)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Contre la dépendance (Souveraineté des données)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* THE PIPELINE VISUALIZATION */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Filter className="w-6 h-6 text-blue-600" />
          La Digestion du Sens (Le Pipeline)
        </h2>
        
        <div className="space-y-4">
          {PIPELINE_STEPS.map((step, index) => (
            <div key={index} className="relative flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm z-10">
              <div className="p-3 bg-slate-50 rounded-full border border-slate-100">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{step.step}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
              {index < PIPELINE_STEPS.length - 1 && (
                <div className="absolute left-9 top-16 h-8 w-0.5 bg-slate-200 -z-10 md:hidden"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LAYERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Mécanique Interne (L'Entonnoir)
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {LAYERS.map((layer) => (
            <div key={layer.title} className={`p-6 rounded-xl border ${layer.color}`}>
              <div className="mb-4 bg-white p-2 rounded-lg w-fit shadow-sm">
                {layer.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                {layer.title}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MINI RITUAL */}
      <section className="bg-amber-50 p-8 rounded-2xl border border-amber-100 mb-16">
        <h3 className="text-lg font-bold text-amber-900 mb-4">Mini-Rituel : "Nettoyer l'Entrée"</h3>
        <p className="text-amber-800 mb-4 text-sm">
          Quand un signal arrive, ne le laisse pas entrer tel quel.
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-amber-900 text-sm font-medium">
          <li>Ne crois pas la phrase (Linéaire).</li>
          <li>Demande les entités (Qui ? Quoi ?).</li>
          <li>Demande l'intention (Pourquoi ?).</li>
          <li>Seulement ensuite, laisse le corps (Orgo) agir.</li>
        </ol>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à l'Anatomie
        </Link>
        <Link href="/kreature/anatomie/sens/ariane" className="text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-2 transition-colors">
          Ouvrir les Yeux (Ariane) →
        </Link>
      </div>

    </main>
  );
}