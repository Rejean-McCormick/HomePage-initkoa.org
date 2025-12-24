// app\kreature\mythos\page.tsx
// app/kreature/mythos/page.tsx
import Link from 'next/link';
import { 
  Crown, 
  Flame, 
  Scale, 
  Scroll, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: "Mythos — Le Récit-Cadre",
  description: "Les figures et les lois. Le récit qui rend l'architecture lisible.",
};

const MYTHOS_MODULES = [
  {
    title: "King Klown",
    subtitle: "Le Démiurge Masqué",
    desc: "Il n'est pas la machine. Il est la main qui l'oriente vers l'humain. Comprendre la distinction entre l'outil et l'auteur.",
    href: "/kreature/mythos/king-klown",
    icon: <Crown className="w-8 h-8 text-amber-600" />,
    color: "bg-amber-50 border-amber-200 hover:border-amber-400"
  },
  {
    title: "Prométhée",
    subtitle: "Le Feu Volé",
    desc: "Le mythe fondateur : voler la puissance abstraite (la tech) pour la rendre habitable par l'humain (l'expérience).",
    href: "/kreature/mythos/promethee",
    icon: <Flame className="w-8 h-8 text-orange-600" />,
    color: "bg-orange-50 border-orange-200 hover:border-orange-400"
  },
  {
    title: "Dualités",
    subtitle: "Tenir les Contraires",
    desc: "La loi vivante de Kréature. Structure & Chaos, Logique & Émotion. Ne pas choisir un camp, mais habiter la tension.",
    href: "/kreature/mythos/dualites",
    icon: <Scale className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400"
  },
  {
    title: "Serments",
    subtitle: "Les Pactes",
    desc: "Les promesses de King Klown : ne jamais mentir sur la mécanique, toujours revenir à l'expérience, éthique sans prêche.",
    href: "/kreature/mythos/serments",
    icon: <Scroll className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-400"
  }
];

export default function MythosPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <BookOpen className="w-10 h-10 text-slate-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Mythos
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il existe deux façons d’expliquer une machine : par le schéma ou par le mythe. 
          Le schéma répond à <em>comment ça marche</em>. Le mythe répond à <strong>pourquoi ça compte</strong>.
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
          <div className="flex items-center gap-2 mb-2 text-purple-800 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" />
            Sceau de King Klown
          </div>
          <p className="text-slate-800 font-serif italic text-lg">
            "La vérité a besoin d’une forme. Sans forme, la vérité passe comme le vent."
          </p>
        </div>
      </div>

      {/* MODULE GRID */}
      <section className="grid md:grid-cols-2 gap-8 mb-20">
        {MYTHOS_MODULES.map((mod) => (
          <Link 
            key={mod.title}
            href={mod.href}
            className={`group block p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${mod.color}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4">
              {mod.title}
            </h2>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              {mod.subtitle}
            </div>
            <p className="text-slate-700 leading-relaxed">
              {mod.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200">
        <Link href="/kreature" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à l'Accueil Kréature
        </Link>
        <Link href="/kreature/initiation" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Commencer l'Initiation →
        </Link>
      </div>

    </main>
  );
}