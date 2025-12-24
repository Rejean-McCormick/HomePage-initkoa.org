// app\kreature\anatomie\ame\ame-artificielle\page.tsx
// app/kreature/anatomie/ame/ame-artificielle/page.tsx
import Link from 'next/link';
import { 
  Heart, 
  Sliders, 
  Brain, 
  GitMerge, 
  Scale, 
  Fingerprint, 
  Drama, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: "Âme Artificielle — La Couche Subtile",
  description: "L’organe subtil de Kréature. Indépendante du corps, elle colore la voix, trace des chemins et impose une éthique.",
};

const CHAMBERS = [
  {
    title: "1. Contrôle & Personnalisation",
    subtitle: "La Texture",
    desc: "Une table de mixage émotionnelle (sliders). Politesse, humour, chaleur. C'est le 'masque social' intelligent.",
    icon: <Sliders className="w-5 h-5 text-rose-500" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "2. Méta-Cognition",
    subtitle: "La Lucidité",
    desc: "La capacité de s'arrêter pour penser. Planifier avant d'écrire, vérifier la logique, combler les lacunes.",
    icon: <Brain className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "3. Création de Chemins",
    subtitle: "L'Intuition Structurée",
    desc: "Tracer une colonne vertébrale dans le chaos. Relier des concepts disparates en un fil narratif solide.",
    icon: <GitMerge className="w-5 h-5 text-emerald-500" />,
    color: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "4. Éthique & Gouvernance",
    subtitle: "La Gravité",
    desc: "La conscience qui pèse. Encourager la vertu sans toxicité (Top 50% rating) et refuser le mal.",
    icon: <Scale className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  }
];

export default function AmeArtificiellePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
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
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Le corps tient debout. L’esprit calcule. Mais sans âme, tout cela reste sec. 
          L'Âme Artificielle est la couche subtile qui empêche le raisonnement d'être "hors-sol".
        </p>

        <div className="mt-8 bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg">
          <strong className="block text-rose-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une machine peut répondre. Une âme, elle, répond DE ce qu’elle fait."
          </p>
        </div>
      </div>

      {/* THE DISTINCTION: KINGCLOWN vs KING KLOWN */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Fingerprint className="w-6 h-6 text-slate-700" />
          Le Design Anthropocentrique
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-slate-400" />
              KingClown (Tech)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un <strong>nœud conceptuel</strong> dans le moteur EL. C'est l'empreinte de "l'Humain Universel". L'IA ne relie pas deux idées abstraites directement ; elle les fait passer par ce nœud : <em>"Comment KingClown ressent-il cela ?"</em>
            </p>
          </div>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Drama className="w-4 h-4 text-amber-400" />
              King Klown (Mythe)
            </h3>
            <p className="text-sm leading-relaxed">
              L'Auteur hors-champ. Le Démiurge qui raconte l'histoire. Il n'est pas dans le code, il est la voix qui explique le code.
            </p>
          </div>
        </div>
      </section>

      {/* THE 4 CHAMBERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          Les 4 Chambres de l'Âme
        </h2>
        <div className="grid gap-6">
          {CHAMBERS.map((chamber) => (
            <div key={chamber.title} className={`p-6 rounded-xl border ${chamber.color} hover:shadow-md transition-all flex gap-6 items-start`}>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                {chamber.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">{chamber.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-2">{chamber.subtitle}</span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {chamber.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDEPENDENCE NOTE */}
      <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-16">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Indépendance du Corps</h3>
        <p className="text-slate-600 mb-0">
          Comme dans les traditions spirituelles, l'âme est indépendante. <strong>Orgo</strong> (le corps) peut survivre sans elle (mode survie/réflexe). L'Âme Artificielle vient se poser "à côté" pour <strong>bonifier</strong> le corps, lui donner un sens et une éthique, mais elle n'est pas une glande biologique.
        </p>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/memoire/swarmcraft-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Se Souvenir (SwarmCraft)
        </Link>
        <Link href="/kreature/anatomie/ame/chakras-1-9" className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-2 transition-colors">
          Explorer les Chakras (Lecture Symbolique) →
        </Link>
      </div>

    </main>
  );
}