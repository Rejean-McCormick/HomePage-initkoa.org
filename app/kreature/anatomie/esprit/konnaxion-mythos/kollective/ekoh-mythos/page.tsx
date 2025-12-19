// app/kreature/anatomie/esprit/konnaxion-mythos/kollective/ekoh-mythos/page.tsx
import Link from 'next/link';
import { 
  Fingerprint, 
  Hourglass, 
  Scale, 
  TrendingDown, 
  Activity, 
  ShieldAlert,
  Database,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "EkoH — La Conscience & Réputation",
  description: "La mémoire morale. Une trace vivante de fiabilité qui s'érode avec le temps (Decay) pour forcer la vertu active.",
};

const SERVICES = [
  {
    title: "1. Reputation Tracking",
    desc: "Enregistrer la dette de vertu. Chaque action positive (aide, vote, création) laisse une trace.",
    icon: <Activity className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "2. Decay Management",
    desc: "L'érosion temporelle. La réputation n'est pas acquise à vie. Comme un muscle, elle fond si elle n'est pas utilisée.",
    icon: <Hourglass className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Contextual Weighting",
    desc: "Le poids juste. Un expert en code n'a pas de poids bonus en cuisine. La réputation est cloisonnée par domaine.",
    icon: <Scale className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "4. Fraud Detection",
    desc: "L'anti-gaming. Empêcher le 'farming' de réputation artificielle par des boucles de validation complaisantes.",
    icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  }
];

const DATA_MODELS = [
  "EkoHScore (La Valeur Actuelle)",
  "EkoHAction (La Source)",
  "EkoHDecayLog (L'Érosion)"
];

export default function EkohPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <Fingerprint className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            EkoH
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Dans une communauté, la parole de celui qui bâtit pèse plus que celle du passant. 
          EkoH est l'organe qui mesure ce poids. C'est une <strong>mémoire de fiabilité</strong>.
        </p>

        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <strong className="block text-amber-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La gloire passée est une fumée. EkoH mesure le feu présent. Si tu arrêtes d’alimenter le feu, tu perds ta chaleur."
          </p>
        </div>
      </div>

      {/* CORE CONCEPT: DECAY */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl relative overflow-hidden">
        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingDown className="w-32 h-32 text-amber-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Hourglass className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Le Principe Vital : Le Decay</h2>
          </div>
          <p className="mb-6 leading-relaxed text-lg font-light">
            La caractéristique unique d’EkoH est l'érosion. La réputation ne se stocke pas comme de l'or. Elle se maintient comme un <strong>muscle</strong>.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <strong className="block text-amber-400 mb-1">Vertu Active</strong>
              On ne peut pas vivre sur ses rentes morales. Il faut contribuer régulièrement.
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <strong className="block text-amber-400 mb-1">Pardon Automatique</strong>
              Les erreurs passées s'effacent aussi avec le temps. Le système oublie pour permettre le rachat.
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">L'Économie Morale (Services)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.title} className={`p-6 rounded-xl border ${srv.color} hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm h-fit">
                  {srv.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{srv.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
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

      {/* ETHICAL DISCLAIMER */}
      <section className="bg-rose-50 p-6 rounded-xl border border-rose-100 mb-16">
        <h3 className="text-rose-900 font-bold mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Ce n'est pas un Crédit Social
        </h3>
        <p className="text-rose-800 text-sm">
          EkoH ne bloque pas l'accès aux droits fondamentaux. Il module seulement l'influence dans les décisions collectives (Smart Vote) et la visibilité dans les débats (Korum). C'est un outil de méritocratie, pas de contrôle.
        </p>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Kollective
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective/smart-vote-mythos" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Voir Smart Vote (Le Jugement) →
        </Link>
      </div>

    </main>
  );
}