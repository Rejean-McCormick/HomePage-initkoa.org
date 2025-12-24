// app\kreature\anatomie\esprit\konnaxion-mythos\konnected-mythos\certifikation\page.tsx
// app/kreature/anatomie/esprit/konnaxion-mythos/konnected-mythos/certifikation/page.tsx
import Link from 'next/link';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  FileBadge, 
  Route, 
  Lock, 
  ArrowRight,
  Database
} from 'lucide-react';

export const metadata = {
  title: "CertifiKation — Les Rites de Compétence",
  description: "Transformer le savoir en preuve. Chemins, épreuves, pairs et certificats.",
};

const RITE_GATES = [
  {
    title: "1. L'Initiation (Le Chemin)",
    role: "Certification Paths",
    desc: "Un parcours balisé. On ne flâne pas, on avance vers un but défini.",
    icon: <Route className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "2. L'Épreuve (Le Passage)",
    role: "Automated Evaluation",
    desc: "Le moment de vérité. Quiz ou test. Le seuil est dur (80%) pour que la réussite ait un poids.",
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Le Témoin (Le Pair)",
    role: "Peer Validation",
    desc: "La machine compte, mais l'humain valide. Un pair ou un mentor approuve la preuve (artefact).",
    icon: <UserCheck className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "4. Le Sceau (La Trace)",
    role: "Skills Portfolio",
    desc: "La cicatrice utile. Ce qui reste : une preuve visible, un certificat, une compétence acquise.",
    icon: <FileBadge className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

const LAWS = [
  { label: "Seuil de Réussite", val: "80%", desc: "En-dessous, ce n'est pas de la compétence, c'est de l'opinion." },
  { label: "Cooldown", val: "30 min", desc: "Entre deux échecs. Le temps de respirer et de réapprendre." }
];

export default function CertifikationPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <GraduationCap className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            CertifiKation
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a un gouffre entre comprendre et savoir faire. CertifiKation est l'organe de la <strong>Myéline</strong> : transformer l'hésitation en réflexe fiable.
        </p>

        <div className="mt-8 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <strong className="block text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La connaissance est une lumière. La compétence est une flamme qui brûle même dans le vent."
          </p>
        </div>
      </div>

      {/* THE 5 GATES (SERVICES) */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Lock className="w-6 h-6 text-slate-700" />
          Les Portes du Rite
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {RITE_GATES.map((gate) => (
            <div key={gate.title} className={`p-6 rounded-xl border ${gate.color} hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {gate.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{gate.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block text-slate-700">
                    Service Tech : {gate.role}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {gate.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE LAWS (FROZEN PARAMETERS) */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Les Lois Gravées (Paramètres)</h2>
        </div>
        <p className="mb-6 leading-relaxed text-sm">
          Un rite sans règles est un jeu. CertifiKation impose des invariants pour que le sceau ait de la valeur.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {LAWS.map((law) => (
            <div key={law.label} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 font-bold uppercase text-xs tracking-wider">{law.label}</span>
                <span className="text-emerald-400 font-mono font-bold text-lg">{law.val}</span>
              </div>
              <p className="text-slate-500 text-xs">{law.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DATA MODELS */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-slate-500" />
          L'Ossature (Modèles)
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> CertificationPath (Le Programme)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Evaluation (Le Score & Métadonnées)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> PeerValidation (L'Arbitrage)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Portfolio (Les Preuves)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Certificate (Le Sceau Officiel)
          </li>
        </ul>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/konnected-mythos/knowledge" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Apprendre (Knowledge)
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective/ekoh-mythos" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Bâtir sa Réputation (EkoH) →
        </Link>
      </div>

    </main>
  );
}