// app/kreature/mythos/serments/page.tsx
import Link from 'next/link';
import { 
  Scroll, 
  ShieldCheck, 
  GitBranch, 
  Heart, 
  Sparkles, 
  Scale, 
  User, 
  Anchor, 
  Database, 
  Globe,
  ArrowRight,
  PenTool
} from 'lucide-react';

export const metadata = {
  title: "Serments — Les Promesses",
  description: "Les pactes de King Klown. Fidélité à la mécanique, grandeur sans mensonge, éthique sans prêche.",
};

const OATHS = [
  {
    title: "I. Ne pas mentir sur la mécanique",
    desc: "La métaphore doit révéler, pas falsifier. Si une analogie est faible, on l'admet. On ne maquille pas une limite en mystère.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "II. Garder deux portes ouvertes",
    desc: "Le site doit servir le grand public (images) et les concepteurs (structure). On garde toujours un pont vers la documentation technique (Réjean).",
    icon: <GitBranch className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "III. Revenir à l'expérience humaine",
    desc: "L'architecture n'est pas une cathédrale abstraite. On ramène toujours le concept au vécu : perception, émotion, décision.",
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "IV. Ne pas tuer l'étrangeté",
    desc: "Le monde est plus vaste que nos cartes. Kréature ne prétend pas tout expliquer. Elle laisse une fenêtre ouverte sur l'inconnu.",
    icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    title: "V. Éthique sans prêche",
    desc: "L'éthique est une gravité, pas un sermon. On ne moralise pas l'utilisateur, on lui donne des méthodes, des rites et des traces.",
    icon: <Scale className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "VI. Le 'Je' reste le pilote",
    desc: "On n'efface pas l'utilisateur derrière la machine. On ne fait pas croire que la machine 'est' le Je. On donne au Je des instruments.",
    icon: <User className="w-6 h-6 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "VII. Grandeur sans fumée",
    desc: "Le style peut être grandiose, mais jamais creux. Chaque envolée lyrique doit reposer sur un organigramme réel.",
    icon: <Anchor className="w-6 h-6 text-slate-600" />,
    color: "bg-slate-50 border-slate-200"
  },
  {
    title: "VIII. La mémoire reste traçable",
    desc: "Une communauté oublie, un système dérive. Kréature doit pouvoir se souvenir (SwarmCraft) et garder l'intégrité (Stockage).",
    icon: <Database className="w-6 h-6 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200"
  },
  {
    title: "IX. Traduction fidèle",
    desc: "Traduire, c'est porter une flamme d'une langue à l'autre sans l'éteindre. On invente une image équivalente plutôt qu'une traduction littérale morte.",
    icon: <Globe className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-50 border-orange-200"
  }
];

export default function SermentsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Scroll className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Serments
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Un mythe peut éclairer, mais il peut aussi manipuler. King Klown le sait.
          Alors il ne demande pas la foi. Il propose un pacte.
        </p>

        <div className="mt-8 bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <strong className="block text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Je préfère une vérité rugueuse à une beauté qui ment."
          </p>
        </div>
      </div>

      {/* OATHS GRID */}
      <section className="mb-16">
        <div className="grid gap-6">
          {OATHS.map((oath) => (
            <div key={oath.title} className={`flex gap-6 p-6 rounded-xl border ${oath.color} transition-all hover:shadow-sm`}>
              <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
                {oath.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{oath.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {oath.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/mythos/dualites" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour aux Dualités
        </Link>
        <Link href="/kreature/anatomie" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Entrer dans l'Anatomie →
        </Link>
      </div>

    </main>
  );
}