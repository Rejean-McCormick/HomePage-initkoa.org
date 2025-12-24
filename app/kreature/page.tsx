// app\kreature\page.tsx
// app/kreature/page.tsx
import Link from 'next/link';
import { 
  Activity, 
  BookOpen, 
  Map, 
  Compass, 
  ArrowRight, 
  Dna,
  Cpu
} from 'lucide-react';

export const metadata = {
  title: "Kréature — L'Organisme Numérique",
  description: "Bienvenue dans le mythe. Anatomie, Rituels et Architecture d'un système communautaire vivant.",
};

const SECTIONS = [
  {
    title: "L'Anatomie",
    subtitle: "La Structure",
    desc: "Disséquez la bête. Découvrez ses organes : Orgo (Corps), Konnaxion (Esprit), SwarmCraft (Mémoire). Comprenez comment les pièces s'assemblent.",
    href: "/kreature/anatomie",
    icon: <Dna className="w-8 h-8 text-rose-600" />,
    color: "bg-rose-50 border-rose-200 hover:border-rose-300"
  },
  {
    title: "Les Rituels",
    subtitle: "La Méthode",
    desc: "Apprenez à vivre avec. La Respiration du Sens, le Parlement Intérieur. Ce ne sont pas des fonctionnalités, ce sont des rythmes.",
    href: "/kreature/rituels",
    icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300"
  },
  {
    title: "Le Parcours",
    subtitle: "Le Guide",
    desc: "Vous êtes perdu ? Choisissez votre porte d'entrée : Ingénieur (Tech), Pratiquant (Usage) ou Philosophe (Mythe).",
    href: "/kreature/parcours",
    icon: <Map className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
  },
  {
    title: "Les Repères",
    subtitle: "Les Outils",
    desc: "Glossaire, FAQ et le Pont Technique. La table de traduction indispensable pour relier la métaphore au code.",
    href: "/kreature/reperes/glossaire", // Direct link to Glossary as a starting point for tools
    icon: <Compass className="w-8 h-8 text-slate-600" />,
    color: "bg-slate-50 border-slate-200 hover:border-slate-300"
  }
];

export default function KreatureLandingPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HERO SECTION */}
      <div className="text-center mb-24 pt-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-full mb-8 shadow-2xl">
          <Activity className="w-12 h-12 text-teal-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Kréature
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Ce n'est pas juste un logiciel.<br/>
          C'est un <strong>organisme vivant</strong> conçu pour faire penser, agir et grandir une communauté.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/kreature/parcours"
            className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Commencer l'Initiation <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/kreature/reperes/pont-technique"
            className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Cpu className="w-5 h-5" />
            Voir le Code
          </Link>
        </div>
      </div>

      {/* PHILOSOPHY BLOCK */}
      <section className="mb-24 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500 uppercase tracking-widest font-bold">
            Le Manifeste
          </span>
        </div>
        
        <div className="mt-12 bg-slate-50 border-l-4 border-slate-900 p-8 rounded-r-xl max-w-3xl mx-auto shadow-sm">
          <strong className="block text-slate-900 font-bold uppercase tracking-widest text-xs mb-4">
            Sceau de King Klown
          </strong>
          <blockquote className="text-xl md:text-2xl font-serif text-slate-800 italic leading-relaxed">
            "On ne code pas une communauté comme on code une machine. Une machine s'use quand on l'utilise. Un organisme se renforce. Kréature est conçu pour l'antifragilité."
          </blockquote>
        </div>
      </section>

      {/* MAIN GRID NAVIGATION */}
      <section className="grid md:grid-cols-2 gap-8">
        {SECTIONS.map((section) => (
          <Link 
            key={section.title} 
            href={section.href}
            className={`group p-8 rounded-2xl border ${section.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {section.title}
            </h2>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4 text-slate-700">
              {section.subtitle}
            </div>
            <p className="text-slate-700 text-base leading-relaxed">
              {section.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* FOOTER NOTE */}
      <div className="mt-24 text-center text-slate-400 text-sm">
        <p>Kréature Community OS — v1.0 (Mythos Edition)</p>
      </div>

    </main>
  );
}