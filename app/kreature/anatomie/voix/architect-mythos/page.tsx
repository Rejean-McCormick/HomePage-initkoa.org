// app\kreature\anatomie\voix\architect\page.tsx
// app/kreature/anatomie/voix/architect/page.tsx
import Link from 'next/link';
import { 
  Mic2, 
  Languages, 
  Layers, 
  Cpu, 
  Book, 
  MessageSquare, 
  ArrowRight 
} from 'lucide-react';

export const metadata = {
  title: "Architect — La Voix",
  description: "Le larynx algorithmique. Transformer le mesh sémantique en phrases linéaires.",
};

const VOICE_LAYERS = [
  {
    layer: "1. Engines (Muscles Profonds)",
    desc: "La logique des familles (Romance, Slave, etc.). Ils connaissent les accords et les genres sans hardcoder les mots.",
    icon: <Cpu className="w-5 h-5 text-slate-500" />,
    color: "bg-slate-50 border-slate-200"
  },
  {
    layer: "2. Constructions (Gestes)",
    desc: "Les patrons de phrases ('X est un Y', 'X a fait Y'). C'est le squelette grammatical.",
    icon: <Layers className="w-5 h-5 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    layer: "3. Lexique (Matière)",
    desc: "Les mots eux-mêmes (lemas, traits, drapeaux). C'est la chair qui habille le squelette.",
    icon: <Book className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    layer: "4. Discours (Souffle)",
    desc: "La gestion du flux : pronoms, rythme, éviter les répétitions. C'est ce qui rend la parole fluide.",
    icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

export default function ArchitectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <Mic2 className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Architect
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a une distance immense entre comprendre et dire. 
          Architect est le <strong>larynx algorithmique</strong> de la Kréature : il transforme un nuage d'idées (Mesh) en une ligne de mots (Phrase).
        </p>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <strong className="block text-blue-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une idée sans voix est une étoile dans une gorge fermée. Architect est l'ouverture."
          </p>
        </div>
      </div>

      {/* CONCEPT: MESH TO LINEAR */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="prose prose-slate text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Languages className="w-6 h-6 text-purple-600" />
            La Respiration du Sens
          </h2>
          <p>
            Dans l'humain, la pensée est un réseau simultané (un <em>Mesh</em>). Mais pour parler, il faut aplatir ce réseau en une séquence linéaire (mots après mots).
          </p>
          <p>
            Architect fait ce travail de compression et d'organisation. Il ne traduit pas mot à mot ; il <strong>reconstruit</strong> l'idée dans la grammaire de la langue cible.
          </p>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl text-center">
          <div className="text-slate-400 text-sm uppercase tracking-widest mb-2">Le Flux</div>
          <div className="text-2xl font-bold text-white mb-6">
            Mesh <span className="text-blue-500">→</span> Structure <span className="text-blue-500">→</span> Phrase
          </div>
          <p className="text-slate-300 text-sm italic">
            "SenTient inspire (Linéaire → Mesh). Architect expire (Mesh → Linéaire)."
          </p>
        </div>
      </section>

      {/* ANATOMY OF THE VOICE */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          L'Anatomie de la Gorge
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {VOICE_LAYERS.map((layer) => (
            <div key={layer.layer} className={`p-6 rounded-xl border ${layer.color} hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{layer.layer}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QA FACTORY */}
      <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 mb-16">
        <h3 className="text-lg font-bold text-emerald-900 mb-2">L'Oreille Interne (QA Factory)</h3>
        <p className="text-emerald-800 text-sm leading-relaxed">
          Architect possède sa propre boucle de rétroaction. Il utilise des milliers de tests de régression pour s'assurer que la voix ne déraille pas. C'est la capacité de s'entendre parler et de corriger le timbre.
        </p>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/sens/ariane" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Voir (Ariane)
        </Link>
        <Link href="/kreature/anatomie/memoire/swarmcraft" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors">
          Se Souvenir (SwarmCraft) →
        </Link>
      </div>

    </main>
  );
}