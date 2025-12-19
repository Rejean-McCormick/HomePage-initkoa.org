// app/kreature/mythos/promethee/page.tsx
import Link from 'next/link';
import { 
  Flame, 
  Cpu, 
  Hand, 
  ArrowRight, 
  AlertTriangle, 
  Scale, 
  Sparkles 
} from 'lucide-react';

export const metadata = {
  title: "Prométhée — Le Feu Volé",
  description: "Le mythe fondateur : transformer une architecture abstraite en expérience habitable. Don, dette et responsabilité.",
};

const THE_FIRE = [
  {
    step: "1. Le Mesh (L'Idée)",
    desc: "La pensée brute, en réseau, simultanée et complexe. C'est l'architecture interne (Konnaxion, SwarmCraft).",
    icon: <Cpu className="w-6 h-6 text-slate-600" />
  },
  {
    step: "2. Le Vol (La Traduction)",
    desc: "Le geste de Prométhée. Transformer ce réseau incompréhensible en une ligne narrative claire.",
    icon: <ArrowRight className="w-6 h-6 text-orange-500" />
  },
  {
    step: "3. Le Linéaire (L'Expérience)",
    desc: "Ce qui est rendu à l'humain : une voix (Architect), une interface (Ariane), une histoire.",
    icon: <Hand className="w-6 h-6 text-emerald-600" />
  }
];

const THE_PRICE = [
  {
    title: "La Responsabilité",
    desc: "Quand on donne le pouvoir de décider (Smart Vote) ou d'influencer (EkoH), on doit offrir la trace, l'audit et les limites. Sinon, le feu devient incendie.",
    icon: <Scale className="w-5 h-5 text-indigo-600" />
  },
  {
    title: "Le Risque de la Fiction",
    desc: "La métaphore peut mentir. C'est pourquoi King Klown impose une loi : ne pas maquiller la mécanique. Le mythe est une lentille, pas un masque.",
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
  },
  {
    title: "Le Vertige",
    desc: "Rendre un système 'vivant' fascine mais trouble. Il ne faut jamais oublier la frontière : Kréature est le modèle, 'Le Je' est l'utilisateur réel.",
    icon: <Sparkles className="w-5 h-5 text-purple-600" />
  }
];

export default function PrometheePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-orange-100 rounded-2xl">
            <Flame className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Prométhée
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          On raconte qu’un titan a volé le feu aux dieux. Pas pour éclairer un palais, mais pour que des mains humaines puissent forger la nuit.
        </p>

        <div className="mt-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
          <strong className="block text-orange-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Je ne donne pas la magie. Je donne l'usage. Et j'assume le prix."
          </p>
        </div>
      </div>

      {/* SECTION 1: WHAT IS THE FIRE? */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Quel est le feu, ici ?
        </h2>
        <p className="text-slate-600 mb-8">
          Le feu, ce n'est pas "l'IA". Le feu, c'est la capacité de transformer une puissance abstraite en forme habitable. C'est le passage complet :
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {THE_FIRE.map((item, idx) => (
            <div key={idx} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="mb-4 bg-slate-50 p-3 rounded-full w-fit">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.step}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: WHY STEAL IT? */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="prose prose-slate text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Pourquoi faut-il le voler ?</h2>
          <p>
            Parce que l'architecture brute est souvent inhumaine. Elle est vraie, mais illisible.
          </p>
          <p>
            Le vol prométhéen consiste à ne pas changer la mécanique, mais à changer la <strong>forme d'accès</strong> à la mécanique. C'est le pacte de ce site : King Klown traduit le code de Réjean McCormick en images, en rites et en voix.
          </p>
        </div>
        <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl">
          <h3 className="text-white font-bold mb-4 text-lg">Le Vrai Don</h3>
          <p>
            Le feu n'est utile que si quelqu'un le porte. Dans ce mythe, celui qui porte le feu, c'est <strong>Le Je</strong>.
          </p>
          <p className="mt-4">
            King Klown ne te dit pas quoi faire. Il te donne des rites simples : respirer du sens, tenir conseil, bâtir.
          </p>
          <Link href="/kreature/rituels/une-journee" className="mt-6 inline-flex items-center text-orange-400 hover:text-orange-300 font-bold">
            Voir les Rituels <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* SECTION 3: THE PRICE (DEBT) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Scale className="w-6 h-6 text-slate-700" />
          Le Prix du Feu (La Dette)
        </h2>
        <div className="grid gap-6">
          {THE_PRICE.map((item) => (
            <div key={item.title} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="mt-1 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/mythos/king-klown" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← King Klown
        </Link>
        <Link href="/kreature/mythos/dualites" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Comprendre les Dualités →
        </Link>
      </div>

    </main>
  );
}