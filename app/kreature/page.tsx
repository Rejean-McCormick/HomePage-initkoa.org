// app/kreature/page.tsx
import Link from 'next/link';
import {
  Activity,
  BookOpen,
  Map,
  Compass,
  ArrowRight,
  Dna,
  Cpu,
  Sparkles,
  ScrollText,
} from 'lucide-react';

export const metadata = {
  title: "Kréature — L'Organisme Numérique",
  description:
    "Bienvenue dans le mythe. Anatomie, Mythos, Rituels, Repères et Architecture d'un système communautaire vivant.",
};

const SECTIONS = [
  {
    title: "Le Mythos",
    subtitle: "Le Mythe",
    desc: "Le récit fondateur. Les symboles, les noms, la logique poétique qui donne une forme vivante au système.",
    href: "/kreature/mythos",
    icon: <ScrollText className="w-8 h-8 text-violet-700" />,
    color: "bg-violet-50 border-violet-200 hover:border-violet-300",
  },
  {
    title: "L'Anatomie",
    subtitle: "La Structure",
    desc: "Disséquez la bête. Découvrez ses organes : Orgo (Corps), Konnaxion (Esprit), SwarmCraft (Mémoire). Comprenez comment les pièces s'assemblent.",
    href: "/kreature/anatomie",
    icon: <Dna className="w-8 h-8 text-rose-600" />,
    color: "bg-rose-50 border-rose-200 hover:border-rose-300",
  },
  {
    title: "Les Rituels",
    subtitle: "La Méthode",
    desc: "Apprenez à vivre avec. La Respiration du Sens, le Parlement Intérieur. Ce ne sont pas des fonctionnalités, ce sont des rythmes.",
    href: "/kreature/rituels",
    icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300",
  },
  {
    title: "Le Parcours",
    subtitle: "Le Guide",
    desc: "Vous êtes perdu ? Choisissez votre porte d'entrée : Ingénieur (Tech), Pratiquant (Usage) ou Philosophe (Mythe).",
    href: "/kreature/parcours",
    icon: <Map className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
  },
  {
    title: "Les Repères",
    subtitle: "Les Outils",
    desc: "Glossaire, FAQ et le Pont Technique. La table de traduction indispensable pour relier la métaphore au code.",
    href: "/kreature/reperes/glossaire",
    icon: <Compass className="w-8 h-8 text-slate-700" />,
    color: "bg-slate-50 border-slate-200 hover:border-slate-300",
  },
];

export default function KreatureLandingPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* HERO */}
      <div className="text-center mb-20 pt-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-full mb-8 shadow-2xl">
          <Activity className="w-12 h-12 text-teal-400" />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Kréature
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Ce n&apos;est pas juste un logiciel.
          <br />
          C&apos;est un <strong>organisme vivant</strong> conçu pour faire penser, agir et grandir une communauté.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/kreature/parcours"
            className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Commencer l&apos;Initiation <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/kreature/mythos"
            className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Lire le Mythos
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

      {/* MANIFESTE */}
      <section className="mb-20 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200" />
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
            &quot;On ne code pas une communauté comme on code une machine. Une machine s&apos;use quand on l&apos;utilise.
            Un organisme se renforce. Kréature est conçu pour l&apos;antifragilité.&quot;
          </blockquote>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kreature/mythos"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              <ScrollText className="w-4 h-4" />
              Le Mythos
            </Link>
            <Link
              href="/kreature/anatomie"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              <Dna className="w-4 h-4" />
              L&apos;Anatomie
            </Link>
            <Link
              href="/kreature/reperes/glossaire"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              <Compass className="w-4 h-4" />
              Les Repères
            </Link>
          </div>
        </div>
      </section>

      {/* NAV GRID */}
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

            <h2 className="text-2xl font-bold text-slate-900 mb-1">{section.title}</h2>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4 text-slate-700">
              {section.subtitle}
            </div>
            <p className="text-slate-700 text-base leading-relaxed">{section.desc}</p>
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
