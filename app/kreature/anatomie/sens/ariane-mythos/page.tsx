// app/kreature/anatomie/sens/ariane-mythos/page.tsx
import Link from 'next/link';
import { 
  Eye, 
  Map, 
  Compass, 
  Search, 
  ArrowRight, 
  LayoutGrid, 
  Navigation,
  Footprints,
  MousePointer2
} from 'lucide-react';

export const metadata = {
  title: "Ariane — Les Yeux & L'Orientation",
  description: "Vision sémantique des interfaces. Elle ne voit pas des pixels, elle voit des portes.",
};

const COMPONENTS = [
  {
    title: "Theseus (L'Exploration)",
    subtitle: "Le Mouvement du Regard",
    desc: "Il balaie l'interface comme une pièce inconnue. Il repère ce qui est cliquable, ce qui est une impasse, ce qui est une issue.",
    icon: <Search className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-50 border-orange-200"
  },
  {
    title: "Atlas (La Mémoire Spatiale)",
    subtitle: "La Carte Vivante",
    desc: "L'hippocampe spatial. Il retient les chemins visités pour ne jamais se perdre deux fois dans le même menu.",
    icon: <Map className="w-6 h-6 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  }
];

const VISION_LAYERS = [
  {
    layer: "1. Surface (Pixels)",
    desc: "Ce que voient les yeux humains distraits. Des couleurs, des formes, du bruit visuel.",
    icon: <LayoutGrid className="w-5 h-5 text-slate-400" />
  },
  {
    layer: "2. Structure (Affordances)",
    desc: "Ce que voit Theseus. Des boutons, des champs, des leviers d'action.",
    icon: <MousePointer2 className="w-5 h-5 text-blue-500" />
  },
  {
    layer: "3. Territoire (Graphe)",
    desc: "Ce que stocke Atlas. Un réseau d'états et de transitions. 'Si je clique ici, je vais là'.",
    icon: <Navigation className="w-5 h-5 text-emerald-500" />
  }
];

export default function ArianePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-cyan-100 rounded-2xl">
            <Eye className="w-10 h-10 text-cyan-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Ariane
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Une interface peut être belle et pourtant trompeuse. Ariane ne "voit" pas des pixels. 
          Elle voit des <strong>portes</strong>. Elle transforme l'écran en territoire navigable.
        </p>

        <div className="mt-8 bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
          <strong className="block text-cyan-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La plupart des yeux voient des surfaces. Les yeux d’Ariane voient des issues."
          </p>
        </div>
      </div>

      {/* CORE CONCEPT: UI AS DATA */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="prose prose-slate text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">UI-as-Data : Voir le Territoire</h2>
          <p>
            Ariane ne se contente pas de dire "il y a un bouton rouge". Elle demande : "Si je clique, où cela mène-t-il ?"
          </p>
          <p>
            Elle transforme le labyrinthe d'écrans en une <strong>carte d'états</strong> (State Graph). C'est la proprioception numérique de la Kréature : savoir "où je suis" sans avoir à tout relire.
          </p>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            La Profondeur de Champ
          </h3>
          <ul className="space-y-6">
            {VISION_LAYERS.map((v, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-1 p-1.5 bg-slate-800 rounded-lg h-fit border border-slate-700">
                  {v.icon}
                </div>
                <div>
                  <strong className="block text-cyan-100 text-sm mb-1">{v.layer}</strong>
                  <span className="text-slate-400 text-sm leading-snug">{v.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ANATOMY: THESEUS & ATLAS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Footprints className="w-6 h-6 text-slate-700" />
          Les Deux Organes de la Vue
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {COMPONENTS.map((comp) => (
            <div key={comp.title} className={`p-6 rounded-xl border ${comp.color} hover:shadow-md transition-shadow`}>
              <div className="mb-4 bg-white p-3 rounded-full w-fit shadow-sm">
                {comp.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{comp.title}</h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {comp.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/sens/sentient-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Écouter (SenTient)
        </Link>
        <Link href="/kreature/anatomie/voix/architect-mythos" className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 transition-colors">
          Parler (Architect) →
        </Link>
      </div>

    </main>
  );
}