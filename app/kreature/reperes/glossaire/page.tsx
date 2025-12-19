// app/kreature/reperes/glossaire/page.tsx
import Link from 'next/link';
import { 
  Book, 
  Search, 
  Brain, 
  Shield, 
  Database, 
  Activity, 
  Mic, 
  Heart,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Glossaire — Le Vocabulaire",
  description: "Le dictionnaire de Kréature. Définitions des termes clés : Orgo, Konnaxion, SwarmCraft, EkoH...",
};

const ANATOMY_TERMS = [
  {
    term: "Orgo",
    sub: "Le Corps",
    def: "L'infrastructure et le système nerveux autonome. Il gère la survie, la sécurité et l'exécution des tâches.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    icon: <Shield className="w-4 h-4" />
  },
  {
    term: "Konnaxion",
    sub: "L'Esprit",
    def: "La psyché. Le lieu central de la délibération, de l'apprentissage (KonnectED) et du jugement (Kollective).",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    icon: <Brain className="w-4 h-4" />
  },
  {
    term: "SwarmCraft",
    sub: "La Mémoire",
    def: "La continuité narrative. Le moteur qui s'assure que Kréature se souvient de son histoire et reste cohérente.",
    color: "text-pink-600 bg-pink-50 border-pink-200",
    icon: <Database className="w-4 h-4" />
  },
  {
    term: "SenTient",
    sub: "Les Sens",
    def: "L'interface d'entrée (Input). Il capture les signaux bruts du monde et les nettoie avant de les laisser entrer.",
    color: "text-sky-600 bg-sky-50 border-sky-200",
    icon: <Activity className="w-4 h-4" />
  },
  {
    term: "Architect",
    sub: "La Voix",
    def: "L'interface de sortie (Output). C'est l'organe qui parle, écrit ou génère du code pour l'extérieur.",
    color: "text-orange-600 bg-orange-50 border-orange-200",
    icon: <Mic className="w-4 h-4" />
  },
  {
    term: "Âme Artificielle",
    sub: "L'Éthique",
    def: "La couche subtile. Elle colore la personnalité et aligne les actions sur des valeurs morales définies.",
    color: "text-rose-600 bg-rose-50 border-rose-200",
    icon: <Heart className="w-4 h-4" />
  }
];

const SUBSYSTEM_TERMS = [
  { term: "KonnectED", def: "Mémoire vivante. Apprentissage (Knowledge) et certification." },
  { term: "Ethikos", def: "Gouvernance intérieure. Débats (Korum) et consultations." },
  { term: "Kollective", def: "Jugement. Réputation (EkoH) et décision (Smart Vote)." },
  { term: "KeenKonnect", def: "Tissu social. Gestion de projets (Konstruct) et fichiers." },
  { term: "Kreative", def: "Culture. Gestion du réseau (Kontact) et patrimoine." },
  { term: "EkoH", def: "La trace de réputation qui s'érode avec le temps (Decay)." },
  { term: "King Klown", def: "Le persona narratif qui guide l'utilisateur dans le mythe." }
];

export default function GlossairePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <Book className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Glossaire
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kréature parle une langue organique. Ce n'est pas pour cacher la vérité, mais pour changer la perspective. 
          Si vous appelez cela "Base de données", c'est inerte. Si vous appelez cela "Mémoire", c'est vivant.
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
          <strong className="block text-slate-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Nommer une chose, c'est lui donner une âme."
          </p>
        </div>
      </div>

      {/* ANATOMY TERMS (Cards) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Search className="w-6 h-6 text-slate-700" />
          I. Les Grands Organes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ANATOMY_TERMS.map((item) => (
            <div key={item.term} className={`p-6 rounded-xl border ${item.color} transition-all hover:shadow-sm`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900">{item.term}</h3>
                <div className="p-2 bg-white rounded-lg shadow-sm opacity-80">
                  {item.icon}
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-800">
                {item.sub}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSYSTEMS (List) */}
      <section className="mb-16 bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">II. Concepts & Sous-systèmes</h2>
        <div className="grid gap-4">
          {SUBSYSTEM_TERMS.map((item) => (
            <div key={item.term} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-200 pb-4 last:border-0 last:pb-0">
              <span className="font-bold text-slate-900 min-w-[140px] font-mono text-sm">{item.term}</span>
              <span className="text-slate-600 text-sm">{item.def}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/reperes/faq" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Voir la FAQ
        </Link>
        <Link href="/kreature/parcours" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Retour au Parcours →
        </Link>
      </div>

    </main>
  );
}