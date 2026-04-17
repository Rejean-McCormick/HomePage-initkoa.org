// app\kreature\anatomie\esprit\konnaxion\kollective\smart-vote\page.tsx
// app/kreature/anatomie/esprit/konnaxion/kollective/smart-vote/page.tsx
import Link from 'next/link';
import { 
  Vote, 
  Scale, 
  Calculator, 
  GitPullRequest, 
  Target, 
  Database,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Smart Vote — Le Jugement",
  description: "Le Moteur de Décision. Consensus pondéré, vote quadratique et démocratie liquide pour éviter la tyrannie de la majorité.",
};

const MECHANICS = [
  {
    title: "1. Pondération EkoH",
    subtitle: "Contextual Weighting",
    desc: "Le vote n'est pas égalitaire, il est équitable. La voix de l'expert pèse plus lourd dans son domaine. Sur du code, le Senior vaut x5. Sur la couleur du logo, il vaut x1.",
    icon: <Scale className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "2. Vote Quadratique",
    subtitle: "Cost of Intensity",
    desc: "Pour crier fort, il faut payer cher. Le coût du vote augmente au carré de son intensité. Cela force à choisir ses batailles et modère les extrêmes.",
    icon: <Calculator className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "3. Démocratie Liquide",
    subtitle: "Delegation Graph",
    desc: "L'humilité systémique. 'Je ne sais pas, mais je fais confiance à Alice'. On peut déléguer son vote dynamiquement par domaine.",
    icon: <GitPullRequest className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

const DATA_MODELS = [
  "SmartVoteProposal (La Question)",
  "SmartVoteCast (Le Bulletin)",
  "VoteWeightConfig (La Règle du Jeu)",
  "DelegationGraph (Le Réseau de Confiance)"
];

export default function SmartVotePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <Vote className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Smart Vote
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          La démocratie pure ("un homme, une voix") a un défaut : elle ignore la compétence. 
          Smart Vote est un moteur de <strong>consensus pondéré</strong> qui amplifie la pertinence.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La foule est un bruit. Le jugement est une mélodie. Smart Vote est le chef d'orchestre qui baisse le volume du bruit pour entendre la mélodie."
          </p>
        </div>
      </div>

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Le Calcul Intérieur</h2>
        </div>
        <p className="mb-4 leading-relaxed">
          Dans ton propre cerveau, tu pratiques le Smart Vote tous les jours. Face à une décision médicale :
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-rose-400 font-bold">Emotion :</span>
            <span>"J'ai peur" (Poids émotionnel fort, poids technique nul).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">Médecin :</span>
            <span>"Ceci est sans danger" (Poids technique très fort).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 font-bold">Voisin :</span>
            <span>"J'ai lu sur internet..." (Poids nul, filtré).</span>
          </li>
        </ul>
        <p className="mt-6 text-indigo-200 italic text-sm">
          Tu ne comptes pas les voix. Tu pèses la pertinence.
        </p>
      </section>

      {/* 3 MECHANICS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 3 Mécaniques de Justice</h2>
        <div className="grid gap-6">
          {MECHANICS.map((mech) => (
            <div key={mech.title} className={`flex gap-6 p-6 rounded-xl border ${mech.color} hover:shadow-sm transition-all`}>
              <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
                {mech.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{mech.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block text-slate-700">
                  {mech.subtitle}
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {mech.desc}
                </p>
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

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion/kollective/ekoh" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          ← Retour à EkoH
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion/keenkonnect" className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors">
          Passer à l'Action (KeenKonnect) →
        </Link>
      </div>

    </main>
  );
}