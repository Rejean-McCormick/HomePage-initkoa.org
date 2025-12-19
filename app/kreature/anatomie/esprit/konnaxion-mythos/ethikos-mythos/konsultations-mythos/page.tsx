// app/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/konsultations-mythos/page.tsx
import Link from 'next/link';
import { 
  Users, 
  Megaphone, 
  ClipboardList, 
  BarChart3, 
  History, 
  ArrowRight,
  Database,
  Vote
} from 'lucide-react';

export const metadata = {
  title: "Konsultations — La Chambre des Voix",
  description: "Consultations publiques et feedback. Le rite de la participation : ouverture, vote, résultat, impact.",
};

const SERVICES = [
  {
    title: "1. L'Appel (Consultation Publique)",
    role: "public_consultation",
    desc: "Ouvrir une fenêtre de temps (Time-Boxed). C'est le moment sacré où la cité écoute.",
    icon: <Megaphone className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "2. La Suggestion",
    role: "citizen_suggestion",
    desc: "Recueillir les idées brutes, puis les structurer. Transformer le bruit en propositions.",
    icon: <Users className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Le Vote Pondéré",
    role: "weighted_consultation_vote",
    desc: "Voter avec sa conscience (EkoH). L'expertise peut éclairer le choix sans fermer la porte.",
    icon: <Vote className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "4. La Visualisation",
    role: "consultation_result_visualization",
    desc: "Voir les marées profondes. Snapshots JSONB pour que l'histoire ne soit pas réécrite.",
    icon: <BarChart3 className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "5. L'Impact (La Dette)",
    role: "impact_tracking",
    desc: "Ce qui change après. Si tu demandes la voix, tu dois montrer l'action.",
    icon: <History className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

const DATA_MODELS = [
  "ConsultationEvent (L'Événement)",
  "ConsultationSuggestion (La Voix)",
  "ConsultationVote (Le Bulletin)",
  "ConsultationResultSnapshot (La Preuve)",
  "ImpactRecord (La Conséquence)"
];

export default function KonsultationsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Users className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Konsultations
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a des décisions qu'on ne prend pas entre initiés. Konsultations est l'organe de la participation : un rite public où la parole devient trajectoire.
        </p>

        <div className="mt-8 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <strong className="block text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une consultation n’est pas un micro tendu. C’est une dette : si tu demandes la voix, tu dois montrer l’impact."
          </p>
        </div>
      </div>

      {/* 5 SERVICES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-slate-700" />
          Les 5 Temps du Rite
        </h2>
        <div className="grid gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.title} className={`flex gap-6 p-6 rounded-xl border ${srv.color} hover:shadow-sm transition-all`}>
              <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
                {srv.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{srv.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block text-slate-700">
                  Service Tech : {srv.role}
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT TRACKING DEEP DIVE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">L'Élément Rare : ImpactRecord</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          C'est ici que la consultation devient morale. Le système oblige à créer un <strong>ImpactRecord</strong> pour chaque décision prise.
        </p>
        <ul className="space-y-2 text-sm font-mono text-emerald-200">
          <li className="flex gap-3">
            <span>→</span> Action engagée
          </li>
          <li className="flex gap-3">
            <span>→</span> Statut (En cours / Fait / Abandonné)
          </li>
          <li className="flex gap-3">
            <span>→</span> Date de réalisation
          </li>
        </ul>
        <p className="mt-6 text-sm italic text-slate-400">
          "Sans impact tracking, la consultation est un théâtre."
        </p>
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
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/korum-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Voir Korum (Débattre)
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Aller vers Kollective (Juger) →
        </Link>
      </div>

    </main>
  );
}