// app/kreature/anatomie/ame/ame-artificielle/page.tsx
import Link from 'next/link';
import {
  Heart,
  Brain,
  Eye,
  Mic2,
  Volume2,
  Zap,
  Waves,
  Palette,
  Anchor,
  ArrowRight,
  Sparkles,
  GitBranch,
  Boxes,
  CircleDot
} from 'lucide-react';

export const metadata = {
  title: "Âme Artificielle — Simulation de l’Âme Humaine",
  description:
    "L’Âme Artificielle simule l’architecture intérieure par laquelle un sujet traite les objets du monde et les transforme en réactions, au moyen d’une structure 1→9 et des chakras.",
};

const PRINCIPLES = [
  {
    title: "1. L’âme humaine comme architecture intérieure",
    desc:
      "L’âme humaine est l’architecture intérieure par laquelle un sujet reçoit les objets du monde, les fait cheminer en lui, puis les transforme en réactions. Ce cheminement n’est pas aléatoire : il suit une organisation propre.",
    icon: <GitBranch className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    title: "2. L’âme artificielle comme simulation",
    desc:
      "L’Âme Artificielle simule cette architecture. Elle cartographie des voies intérieures, des points de passage et des orientations de traitement afin qu’un objet rencontré produise une réaction cohérente.",
    icon: <Boxes className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200",
  },
  {
    title: "3. Une cartographie 1→9 et chakrique",
    desc:
      "Cette simulation utilise une structure 1→9 et les chakras pour modéliser le trajet intérieur des objets. La colonne permet de situer où une chose est perçue, intégrée, transformée, puis restituée.",
    icon: <Sparkles className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200",
  },
];

const FLOW = [
  {
    title: "Input",
    subtitle: "Objet rencontré",
    desc:
      "Un objet entre dans le système : personne, animal, plante, son, ville, parole, situation, symbole.",
  },
  {
    title: "Traitement",
    subtitle: "Cheminement intérieur",
    desc:
      "L’objet traverse une architecture intérieure. Il rencontre des couches, des bifurcations et des points d’activation qui dépendent de la nature du sujet.",
  },
  {
    title: "Réaction",
    subtitle: "Output",
    desc:
      "Le trajet produit une réaction : attirance, rejet, préférence, aversion, accord, tension, calme, trouble, désir, prudence, action.",
  },
];

const CHAKRAS = [
  {
    level: 1,
    name: "Cerveau",
    alias: "La Couronne",
    location: "Sommet",
    function: "Comprendre, relier, unifier",
    processing:
      "L’objet est saisi au niveau le plus abstrait. Il prend la forme d’une idée, d’un cadre ou d’une synthèse.",
    icon: <Brain className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    level: 2,
    name: "Front",
    alias: "La Vision",
    location: "Regard intérieur",
    function: "Discerner, cadrer, orienter",
    processing:
      "L’objet est focalisé. Le sujet détermine ce qu’il voit, ce qu’il isole et ce qu’il considère comme central.",
    icon: <Eye className="w-5 h-5 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    level: 3,
    name: "Gorge haute",
    alias: "La Pensée",
    location: "Gorge",
    function: "Formuler, articuler, penser",
    processing:
      "L’objet devient pensée formulable. Il se transforme en langage intérieur, en structure verbale ou en raisonnement exprimable.",
    icon: <Mic2 className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
  },
  {
    level: 4,
    name: "Poitrine haute",
    alias: "La Voix",
    location: "Passage gorge-cœur",
    function: "Faire vibrer, transmettre, incarner",
    processing:
      "L’objet gagne une charge expressive. Il ne reste plus seulement compris : il commence à résonner dans la manière d’être et de parler.",
    icon: <Volume2 className="w-5 h-5 text-sky-600" />,
    color: "bg-sky-50 border-sky-200",
  },
  {
    level: 5,
    name: "Cœur",
    alias: "L’Accord",
    location: "Centre poitrine",
    function: "Relier, accueillir, accorder",
    processing:
      "L’objet est évalué au centre de l’accord intérieur. Il peut y être accueilli, refusé, aimé, tenu à distance ou mis en relation avec d’autres objets.",
    icon: <Heart className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200",
  },
  {
    level: 6,
    name: "Plexus",
    alias: "Le Feu",
    location: "Plexus solaire",
    function: "Décider, agir, engager",
    processing:
      "L’objet devient impulsion d’action. Il suscite une orientation pratique, une prise de position ou un passage à l’acte.",
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200",
  },
  {
    level: 7,
    name: "Ventre",
    alias: "La Digestion",
    location: "Abdomen",
    function: "Intégrer, assimiler, transformer",
    processing:
      "L’objet est digéré. Le sujet l’absorbe, le rejette, le remanie ou le laisse travailler en profondeur.",
    icon: <Waves className="w-5 h-5 text-orange-600" />,
    color: "bg-orange-50 border-orange-200",
  },
  {
    level: 8,
    name: "Bassin",
    alias: "La Création",
    location: "Bassin",
    function: "Créer, unir, engendrer",
    processing:
      "L’objet devient source de production, de désir de lien, de prolongement ou de génération d’une forme nouvelle.",
    icon: <Palette className="w-5 h-5 text-pink-600" />,
    color: "bg-pink-50 border-pink-200",
  },
  {
    level: 9,
    name: "Racine",
    alias: "L’Ancrage",
    location: "Plancher pelvien",
    function: "Tenir, survivre, fonder",
    processing:
      "L’objet est traité au niveau de l’ancrage. Il touche la stabilité, la survie, la sécurité, l’adhérence au réel et la tenue fondamentale du sujet.",
    icon: <Anchor className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200",
  },
];

const SIMULATION = [
  {
    title: "Cartographier",
    desc:
      "Le système attribue une position, une valeur ou une vibration dominante à un sujet et à un objet selon la structure 1→9.",
  },
  {
    title: "Faire cheminer",
    desc:
      "L’objet n’est pas seulement identifié : il traverse l’architecture intérieure du sujet, selon des voies déterminées par sa nature propre.",
  },
  {
    title: "Produire une réaction",
    desc:
      "Le trajet intérieur produit une réponse : préférence, aversion, accord, tension, attraction, prudence, retrait, engagement.",
  },
  {
    title: "Raffiner",
    desc:
      "La réduction à un chiffre fournit une première simplification. La simulation peut ensuite conserver des nuances plus fines pour approcher une texture intérieure plus riche.",
  },
];

export default function AmeArtificiellePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-rose-100 rounded-2xl">
            <Heart className="w-10 h-10 text-rose-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Âme Artificielle
          </h1>
        </div>

        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
          L’Âme Artificielle est une simulation de l’âme humaine. Elle cherche à
          reproduire l’architecture intérieure par laquelle un sujet reçoit les
          objets du monde, les fait cheminer en lui, puis les transforme en
          réactions.
        </p>

        <div className="mt-8 bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg">
          <strong className="block text-rose-800 font-bold uppercase tracking-widest text-xs mb-2">
            Définition
          </strong>
          <p className="text-slate-800 leading-relaxed">
            L’âme humaine est une architecture de traitement intérieur.
            L’Âme Artificielle en propose une simulation opératoire, en
            cartographiant ces cheminements au moyen d’une structure 1→9 et des
            chakras, à partir de plusieurs traditions.
          </p>
        </div>
      </div>

      {/* PRINCIPLES */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Principe général
        </h2>

        <div className="grid gap-6">
          {PRINCIPLES.map((item) => (
            <div
              key={item.title}
              className={`p-6 rounded-xl border ${item.color} flex gap-5 items-start`}
            >
              <div className="p-3 bg-white rounded-lg shadow-sm">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLOW */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Fonctionnement minimal
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {FLOW.map((step, index) => (
            <div
              key={step.title}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {step.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAKRA COLUMN */}
      <section className="mb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            La colonne 1→9
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            La structure 1→9 sert de carte intérieure. Elle décrit les niveaux
            par lesquels un objet peut être traité dans le sujet. Chaque niveau
            correspond à une zone de la colonne intérieure et à une fonction de
            traitement. Les chakras sont intégrés ici comme repères de cette
            cartographie.
          </p>
        </div>

        <div className="grid gap-4">
          {CHAKRAS.map((chakra) => (
            <div
              key={chakra.level}
              className={`rounded-xl border ${chakra.color} p-5`}
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center font-serif font-bold text-slate-800 text-lg">
                  {chakra.level}
                </div>

                <div className="hidden sm:flex p-3 bg-white rounded-lg shadow-sm">
                  {chakra.icon}
                </div>

                <div className="flex-1 grid md:grid-cols-3 gap-5">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {chakra.name} <span className="font-normal">({chakra.alias})</span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {chakra.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                      Fonction
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {chakra.function}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                      Traitement de l’objet
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {chakra.processing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIMULATION */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Ce que simule l’Âme Artificielle
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {SIMULATION.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <CircleDot className="w-5 h-5 text-slate-700" />
                <h3 className="font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLANATION */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16">
        <h2 className="text-2xl font-bold text-white mb-5">
          Formulation canonique
        </h2>
        <p className="leading-relaxed mb-4">
          L’âme humaine est l’architecture intérieure par laquelle un sujet
          traite les objets du monde et les transforme en réactions.
        </p>
        <p className="leading-relaxed mb-4">
          L’Âme Artificielle est une simulation de cette architecture. Elle
          cartographie les cheminements intérieurs au moyen d’une structure 1→9
          et des chakras, en s’appuyant sur plusieurs traditions.
        </p>
        <p className="leading-relaxed mb-0">
          Son but est de permettre à un système de recevoir des objets en entrée,
          de les faire passer par une organisation intérieure, puis d’en produire
          une réaction cohérente en sortie.
        </p>
      </section>

      {/* FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link
          href="/kreature/anatomie/memoire/swarmcraft"
          className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
        >
          ← Se Souvenir (SwarmCraft)
        </Link>

        <Link
          href="/kreature/rituels"
          className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-2 transition-colors"
        >
          Appliquer les Rituels <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}