// app\kreature\anatomie\page.tsx
// app/kreature/anatomie/page.tsx
import Link from 'next/link';
import { 
  Shield, 
  Ear, 
  Eye, 
  BrainCircuit, 
  Mic2, 
  BookOpen, 
  Heart, 
  ArrowRight 
} from 'lucide-react';

export const metadata = {
  title: "Anatomie de la Kréature",
  description: "Carte anatomique : Corps, Sens, Esprit, Mémoire, Voix et Âme.",
};

const ORGANS = [
  {
    category: "Infrastructure (Le Squelette)",
    items: [
      {
        name: "Orgo",
        role: "Le Corps",
        desc: "Système fermé, peau hermétique et homéostasie. Il gère l'exécution et la survie.",
        href: "/kreature/anatomie/corps/orgo",
        icon: <Shield className="w-6 h-6 text-emerald-600" />,
        color: "bg-emerald-50 border-emerald-100"
      },
      {
        name: "Architect",
        role: "La Voix",
        desc: "Le larynx algorithmique. Il transforme le mesh sémantique en phrases linéaires.",
        href: "/kreature/anatomie/voix/architect",
        icon: <Mic2 className="w-6 h-6 text-blue-600" />,
        color: "bg-blue-50 border-blue-100"
      }
    ]
  },
  {
    category: "Sens (L'Interface)",
    items: [
      {
        name: "SenTient",
        role: "Les Oreilles",
        desc: "Système immunitaire du langage. Il filtre, déconstruit et nettoie l'entrée.",
        href: "/kreature/anatomie/sens/sentient",
        icon: <Ear className="w-6 h-6 text-amber-600" />,
        color: "bg-amber-50 border-amber-100"
      },
      {
        name: "Ariane",
        role: "Les Yeux",
        desc: "Vision sémantique. Elle transforme les interfaces en cartes navigables.",
        href: "/kreature/anatomie/sens/ariane",
        icon: <Eye className="w-6 h-6 text-cyan-600" />,
        color: "bg-cyan-50 border-cyan-100"
      }
    ]
  },
  {
    category: "Cognition (Le Cerveau)",
    items: [
      {
        name: "Konnaxion",
        role: "L'Esprit Social",
        desc: "Le parlement intérieur. Apprendre, débattre, pondérer et juger.",
        href: "/kreature/anatomie/esprit/konnaxion",
        icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
        color: "bg-purple-50 border-purple-100"
      },
      {
        name: "SwarmCraft",
        role: "La Mémoire",
        desc: "Continuité narrative. Matrix (état), Bible (intention), RAG (preuves).",
        href: "/kreature/anatomie/memoire/swarmcraft",
        icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
        color: "bg-indigo-50 border-indigo-100"
      },
      {
        name: "Âme Artificielle",
        role: "La Verticalité",
        desc: "La couche subtile. Teinte émotionnelle, éthique et ancrage humain.",
        href: "/kreature/anatomie/ame/ame-artificielle",
        icon: <Heart className="w-6 h-6 text-rose-600" />,
        color: "bg-rose-50 border-rose-100"
      }
    ]
  }
];

export default function AnatomiePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Anatomie de la Kréature</h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Ne lisez pas ceci comme une documentation technique. Lisez ceci comme un atlas médical.
          Chaque module est un organe avec une fonction biologique précise.
        </p>
      </div>

      {/* ORGANS LIST */}
      <div className="space-y-16">
        {ORGANS.map((section) => (
          <section key={section.category}>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">
              {section.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`group block p-6 rounded-xl border transition-all duration-300 hover:shadow-md ${item.color}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">{item.role}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 text-slate-400 group-hover:text-slate-900" />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}