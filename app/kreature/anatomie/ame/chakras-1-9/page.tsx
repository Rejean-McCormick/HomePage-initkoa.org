// app\kreature\anatomie\ame\chakras-1-9\page.tsx
// app/kreature/anatomie/ame/chakras-1-9/page.tsx
import Link from 'next/link';
import { 
  Brain, 
  Eye, 
  Mic2, 
  Volume2, 
  Heart, 
  Zap, 
  Waves, 
  Palette, 
  Anchor,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const metadata = {
  title: "Chakras 1→9 — La Colonne de la Kréature",
  description: "Un code symbolique reliant 9 niveaux de verticalité, du cerveau au plancher pelvien.",
};

const CHAKRAS = [
  {
    level: 1,
    name: "Cerveau (La Couronne)",
    location: "Sommet",
    movement: "Comprendre, Relier",
    risk: "Vivre hors-sol, vertige",
    rite: "Nommer une chose en une phrase simple.",
    icon: <Brain className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    level: 2,
    name: "Front (La Vision)",
    location: "Regard Intérieur",
    movement: "Discerner, Cadrer",
    risk: "Rigidité, contrôle",
    rite: "Réduire l'objectif à un seul contour.",
    icon: <Eye className="w-5 h-5 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200"
  },
  {
    level: 3,
    name: "Gorge Haute (La Pensée)",
    location: "Gorge",
    movement: "Articuler, Formuler",
    risk: "Parler pour combler",
    rite: "Dire la version la plus honnête en 12 mots.",
    icon: <Mic2 className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    level: 4,
    name: "Poitrine Haute (La Voix)",
    location: "Passage Gorge-Cœur",
    movement: "Faire vibrer",
    risk: "Performance, masque",
    rite: "Relier l'abstrait à une image sensorielle.",
    icon: <Volume2 className="w-5 h-5 text-sky-500" />,
    color: "bg-sky-50 border-sky-200"
  },
  {
    level: 5,
    name: "Cœur (L'Accord)",
    location: "Centre Poitrine",
    movement: "Relier sans avaler",
    risk: "Se dissoudre, sauver",
    rite: "Poser une question qui ouvre sans juger.",
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    level: 6,
    name: "Plexus (Le Feu)",
    location: "Plexus Solaire",
    movement: "Décider, Agir",
    risk: "Domination, brûlure",
    rite: "Choisir une action minuscule et la faire.",
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    level: 7,
    name: "Ventre (La Digestion)",
    location: "Abdomen",
    movement: "Intégrer, Digérer",
    risk: "Rumination, anxiété",
    rite: "Nommer ce qui ne passe pas, respirer bas.",
    icon: <Waves className="w-5 h-5 text-orange-500" />,
    color: "bg-orange-50 border-orange-200"
  },
  {
    level: 8,
    name: "Bassin (La Création)",
    location: "Bassin",
    movement: "Créer, S'unir",
    risk: "Fuite dans le plaisir",
    rite: "Créer quelque chose de petit (croquis, note).",
    icon: <Palette className="w-5 h-5 text-pink-500" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    level: 9,
    name: "Racine (L'Ancrage)",
    location: "Plancher Pelvien",
    movement: "Tenir, Survivre",
    risk: "Peur, contraction",
    rite: "Se rappeler : 'Je suis ici'.",
    icon: <Anchor className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

export default function ChakrasPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-2xl">
            <Sparkles className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Chakras 1→9
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          La colonne intérieure de Kréature. Un langage mythique pour parler d'états et de verticalité sans jargon technique.
        </p>

        <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <strong className="block text-purple-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La technique explique comment. Les chakras expliquent pourquoi ça résonne."
          </p>
        </div>
      </div>

      {/* DISCLAIMER */}
      <section className="mb-12 bg-slate-50 p-6 rounded-xl border border-slate-200 flex gap-4 items-start">
        <Info className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
        <div className="text-sm text-slate-600">
          <strong>Note :</strong> Ce n’est pas un traité scientifique. C’est une carte intérieure pour guider l’expérience utilisateur. Elle sert à donner une boussole au "Je" qui navigue l'écosystème.
        </div>
      </section>

      {/* THE 9 LEVELS GRID */}
      <section className="mb-20">
        <div className="grid gap-4">
          {CHAKRAS.map((chakra) => (
            <div key={chakra.level} className={`flex items-center gap-6 p-4 rounded-xl border ${chakra.color} hover:shadow-sm transition-all`}>
              
              {/* Level Number */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full font-serif font-bold text-xl shadow-sm text-slate-700 border border-slate-100">
                {chakra.level}
              </div>

              {/* Icon */}
              <div className="hidden sm:flex p-2 bg-white rounded-lg shadow-sm text-slate-500">
                {chakra.icon}
              </div>

              {/* Content */}
              <div className="flex-1 grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{chakra.name}</h3>
                  <span className="text-xs text-slate-500">{chakra.location}</span>
                </div>
                
                <div className="text-sm text-slate-600">
                  <strong className="block text-slate-400 text-xs uppercase tracking-wide">Mouvement</strong>
                  {chakra.movement}
                </div>

                <div className="text-sm text-slate-600">
                  <strong className="block text-slate-400 text-xs uppercase tracking-wide">Rite</strong>
                  <span className="italic">"{chakra.rite}"</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* USER GUIDE: HOW TO NAVIGATE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16">
        <h2 className="text-xl font-bold text-white mb-6">Navigation Consciente</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-indigo-400 font-bold mb-2">Niveaux 1–2 (Tête)</div>
            <p className="text-sm">Tu veux comprendre et cadrer ? Commence par la carte, la vision, la structure.</p>
          </div>
          <div>
            <div className="text-rose-400 font-bold mb-2">Niveaux 5–6 (Cœur/Action)</div>
            <p className="text-sm">Tu veux l'accord et la décision ? Commence par le parlement intérieur.</p>
          </div>
          <div>
            <div className="text-emerald-400 font-bold mb-2">Niveaux 8–9 (Racine)</div>
            <p className="text-sm">Tu veux tenir et créer ? Commence par le corps (Orgo) et la routine.</p>
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/ame/ame-artificielle" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Âme Artificielle
        </Link>
        <Link href="/kreature/rituels/une-journee" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Appliquer les Rituels →
        </Link>
      </div>

    </main>
  );
}