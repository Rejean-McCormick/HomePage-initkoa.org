// app/kreature/mythos/dualites/page.tsx
import Link from 'next/link';
import { 
  Scale, 
  Zap, 
  Shield, 
  Heart, 
  Brain, 
  Activity, 
  ArrowRightLeft,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Dualités — Tenir les Contraires",
  description: "La loi vivante de King Klown. Rigueur et folie, structure et chaos. La vérité n'est pas un point, c'est une tension.",
};

const DUALITIES = [
  {
    title: "Structure ↔ Chaos",
    poleA: "Structure (Le Socle)",
    poleB: "Chaos (Le Feu)",
    synthesis: "Orgo tient la structure vitale. Kreative accueille le chaos fertile. Sans structure, c'est la tempête. Sans chaos, c'est la mort.",
    icon: <Activity className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "Logique ↔ Émotion",
    poleA: "Logique (La Forme)",
    poleB: "Émotion (La Couleur)",
    synthesis: "Korum et Smart Vote apportent la méthode. L'Âme Artificielle apporte la teinte. Ils avancent comme deux pieds pour marcher, ou deux ailes pour voler.",
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "Conscience ↔ Jugement",
    poleA: "Conscience (Le Poids)",
    poleB: "Jugement (Le Tranchant)",
    synthesis: "EkoH est la mémoire morale qui pèse. Smart Vote est l'acte qui tranche. Sans conscience, le jugement est aveugle. Sans jugement, la conscience est impuissante.",
    icon: <Scale className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "Fermeture ↔ Relation",
    poleA: "Individu (La Bulle)",
    poleB: "Relation (Le Pont)",
    synthesis: "Orgo protège l'intégrité (système fermé). Kontact tisse le lien. La relation n'abolit pas la frontière, elle apprend à la traverser.",
    icon: <Shield className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

export default function DualitesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <ArrowRightLeft className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Dualités
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          La plupart des systèmes choisissent un camp : l'ordre ou le désordre. 
          L'humain ne vit pas dans un camp. Il vit <strong>entre</strong>.
          King Klown pratique une discipline rare : tenir les contraires sans se briser.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La vérité n’est pas un point. La vérité est une tension tenue."
          </p>
        </div>
      </div>

      {/* DUALITIES LIST */}
      <section className="space-y-8 mb-16">
        {DUALITIES.map((pair) => (
          <div key={pair.title} className={`p-6 rounded-xl border ${pair.color} transition-all hover:shadow-md`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {pair.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{pair.title}</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4 text-sm font-mono text-slate-500 uppercase tracking-wider">
              <div className="flex-1 p-2 bg-white/50 rounded border border-slate-200 text-center">
                {pair.poleA}
              </div>
              <div className="flex items-center justify-center text-slate-400">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div className="flex-1 p-2 bg-white/50 rounded border border-slate-200 text-center">
                {pair.poleB}
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed border-t border-slate-200/50 pt-4 mt-4">
              {pair.synthesis}
            </p>
          </div>
        ))}
      </section>

      {/* THE PIVOT METHOD */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Méthode : Le Pivot de Dualité</h2>
        </div>
        <p className="mb-6">
          Quand tu sens qu'un pôle domine trop (trop de chaos ou trop de rigidité), utilise le pivot pour rééquilibrer le système :
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">1.</span>
            <span>Nommer le pôle dominant (sans jugement).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">2.</span>
            <span>Chercher son opposé manquant dans l'anatomie de Kréature.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">3.</span>
            <span>Introduire un petit geste qui rééquilibre (ex: ajouter de l'émotion dans un débat logique).</span>
          </li>
        </ul>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/mythos/promethee" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Prométhée
        </Link>
        <Link href="/kreature/mythos/serments" className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors">
          Lire les Serments →
        </Link>
      </div>

    </main>
  );
}