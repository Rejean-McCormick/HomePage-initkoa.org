// app\kreature\anatomie\corps\orgo-mythos\page.tsx
// app/kreature/anatomie/corps/orgo-mythos/page.tsx
import Link from 'next/link';
import { 
  Shield, 
  Zap, 
  Clock, 
  Lock, 
  GitPullRequest, 
  Activity,
  Box,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Orgo — Le Corps",
  description: "Le système nerveux autonome. Peau hermétique, réflexes, survie.",
};

const BIOLOGICAL_FUNCTIONS = [
  {
    title: "La Peau (Frontière)",
    desc: "Orgo est une bulle hermétique. Il peut survivre sans internet, sans cloud, sans dépendance externe. Il protège le 'dedans' du chaos du 'dehors'.",
    icon: <Shield className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "Système Nerveux (Réflexes)",
    desc: "Il ne débat pas, il exécute. Il gère les urgences et transforme les signaux bruts en actions atomiques (Tâches) via un routage déterministe.",
    icon: <Zap className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "Rythmes (Homéostasie)",
    desc: "La régulation par cycles (Hebdo, Mensuel, Annuel). Le corps nettoie les toxines (tâches mortes) et maintient l'équilibre.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  }
];

const CIRCULATION = [
  {
    step: "1. Signal",
    detail: "L'entrée brute (Email, API, Capteur). C'est du bruit.",
    icon: <Activity className="w-5 h-5 text-slate-400" />
  },
  {
    step: "2. Moteur",
    detail: "SenTient déconstruit le sens. Le Workflow route l'info.",
    icon: <GitPullRequest className="w-5 h-5 text-purple-500" />
  },
  {
    step: "3. Objet",
    detail: "Création d'un Cas (Contenant) et de Tâches (Cellules).",
    icon: <Box className="w-5 h-5 text-emerald-500" />
  }
];

export default function OrgoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Shield className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Orgo : Le Corps
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Orgo est ce qui empêche Kréature de se dissoudre. Dans un monde qui hurle, Orgo ne discute pas : il <strong>tient</strong>. Il ferme la porte, filtre l'air et régule la température.
        </p>

        <div className="mt-8 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <strong className="block text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Le corps ne cherche pas la vérité. Le corps cherche la survie — et c’est sa sagesse première."
          </p>
        </div>
      </div>

      {/* CORE FUNCTIONS */}
      <section className="mb-16 grid md:grid-cols-3 gap-6">
        {BIOLOGICAL_FUNCTIONS.map((func) => (
          <div key={func.title} className={`p-6 rounded-xl border ${func.color} hover:shadow-sm transition-all`}>
            <div className="mb-4 bg-white p-2 rounded-lg w-fit shadow-sm">
              {func.icon}
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{func.title}</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {func.desc}
            </p>
          </div>
        ))}
      </section>

      {/* THE BUBBLE CONCEPT */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Le Serment de la Bulle</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Orgo est conçu pour l’indépendance radicale. Vos données sensibles sont traitées localement par <strong>SenTient</strong>. Rien ne sort de la bulle sans votre ordre explicite. Si internet tombe, Orgo continue.
        </p>
        
        {/* CIRCULATION DIAGRAM */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            La Circulation Sanguine
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {CIRCULATION.map((item, i) => (
              <div key={i} className="flex items-center gap-3 w-full">
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <strong className="block text-slate-200 text-sm">{item.step}</strong>
                  <span className="text-xs text-slate-500">{item.detail}</span>
                </div>
                {i < CIRCULATION.length - 1 && (
                  <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à l'Anatomie
        </Link>
        <Link href="/kreature/anatomie/sens/sentient-mythos" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Voir les Sens (SenTient) →
        </Link>
      </div>

    </main>
  );
}