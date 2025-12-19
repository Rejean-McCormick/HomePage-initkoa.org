// app/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/korum-mythos/page.tsx
import Link from 'next/link';
import { 
  MessageSquare, 
  Flame, 
  GitCommit, 
  ShieldAlert, 
  Users, 
  ArrowRight,
  Database,
  BarChart
} from 'lucide-react';

export const metadata = {
  title: "Korum — Débats Structurés",
  description: "La forge du désaccord. Stances nuancées (-3...+3) et arguments en fils pour rendre le conflit habitable.",
};

const FEATURES = [
  {
    title: "L'Échelle de Stance (-3...+3)",
    desc: "L'humain n'est pas binaire. Korum interdit le 'Oui/Non'. On choisit une nuance : 'Plutôt pour (+1)', 'Absolument contre (-3)', 'Neutre (0)'.",
    icon: <BarChart className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "Arguments en Fils (Threads)",
    desc: "On ne crie pas dans le vide. On répond à un point précis. Le langage devient chirurgie, pas une masse d'arme.",
    icon: <GitCommit className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "Cohorte d'Experts",
    desc: "Une lampe posée sur la compétence. Une fois 12 experts (EkoH) atteints, leur avis est mis en lumière sans masquer la foule.",
    icon: <Users className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "Auto-Masquage",
    desc: "Le système immunitaire du débat. Après 3 signalements indépendants, un argument toxique est masqué. Le corps rejette la toxine.",
    icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  }
];

const MODELS = [
  "EthikosTopic (Le Sujet)",
  "EthikosStance (La Position)",
  "EthikosArgument (La Justification)"
];

export default function KorumPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <MessageSquare className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Korum
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Le désaccord est inévitable, la barbarie est optionnelle. 
          Korum est l'organe qui transforme le conflit en forme. C'est une <strong>forge</strong> où l'on chauffe les idées.
        </p>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <strong className="block text-blue-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Entre le oui et le non, il y a l’humain. Korum protège cet espace."
          </p>
        </div>
      </div>

      {/* METAPHOR: THE FORGE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">La Forge du Désaccord</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Korum n'est pas le tribunal (ça c'est Smart Vote). Korum est l'espace de <strong>suspension</strong> avant le verdict. C'est là où l'on accepte de ne pas savoir encore, de changer d'avis, de nuancer sa position sans se trahir.
        </p>
        <div className="grid grid-cols-7 text-center text-xs font-mono font-bold mt-8 gap-1">
          <div className="p-2 bg-rose-900/50 text-rose-300 rounded">-3</div>
          <div className="p-2 bg-rose-800/50 text-rose-300 rounded">-2</div>
          <div className="p-2 bg-rose-700/50 text-rose-300 rounded">-1</div>
          <div className="p-2 bg-slate-700 text-slate-300 rounded">0</div>
          <div className="p-2 bg-emerald-700/50 text-emerald-300 rounded">+1</div>
          <div className="p-2 bg-emerald-800/50 text-emerald-300 rounded">+2</div>
          <div className="p-2 bg-emerald-900/50 text-emerald-300 rounded">+3</div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2 uppercase tracking-widest">Échelle de Stance</p>
      </section>

      {/* FEATURES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 4 Piliers du Débat Structuré</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feat) => (
            <div key={feat.title} className={`p-6 rounded-xl border ${feat.color} hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm h-fit">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{feat.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {feat.desc}
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
          {MODELS.map((model, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-sm font-mono text-slate-600">
              {model}
            </span>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Ethikos
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/konsultations-mythos" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 transition-colors">
          Voir Konsultations (L'Appel) →
        </Link>
      </div>

    </main>
  );
}