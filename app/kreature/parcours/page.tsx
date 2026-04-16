// app/kreature/parcours/page.tsx
import Link from 'next/link';
import {
  Map,
  Compass,
  BookOpen,
  Activity,
  User,
  ArrowRight,
  GitBranch,
} from 'lucide-react';

export const metadata = {
  title: "Le Parcours — Votre Chemin",
  description:
    "Comment naviguer dans Kréature ? Entrée technique, narrative ou pratique. Choisissez votre porte.",
};

const PATHS = [
  {
    title: "Porte 1 : L'Anatomiste",
    role: 'Comprendre le Système',
    desc: "Vous voulez voir les câbles. Vous cherchez l'architecture, les modules et la logique interne. Vous allez disséquer la bête organe par organe.",
    href: '/kreature/anatomie',
    icon: <Activity className="w-6 h-6 text-indigo-600" />,
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    title: 'Porte 2 : Le Pratiquant',
    role: 'Vivre la Méthode',
    desc: "Vous voulez agir. Vous cherchez les rythmes et les habitudes pour ne pas vous noyer dans le chaos. Apprendre à respirer et à décider.",
    href: '/kreature/rituels',
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    title: "Porte 3 : Le 'Je'",
    role: 'Trouver sa Place',
    desc: "Vous cherchez votre reflet. Kréature est un miroir. Entrez par l'anatomie pour explorer la couche intérieure, les repères et la relation entre vous et la machine.",
    href: '/kreature/anatomie',
    icon: <User className="w-6 h-6 text-amber-600" />,
    color: 'bg-amber-50 border-amber-200',
  },
];

export default function ParcoursPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <Map className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Le Parcours
          </h1>
        </div>

        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kréature est un labyrinthe volontaire. C&apos;est à la fois une
          documentation technique et une mythologie. Vous n&apos;êtes pas obligés de
          tout lire. Vous devez juste choisir votre porte.
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
          <strong className="block text-slate-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            &quot;Il n&apos;y a pas de bon chemin. Il n&apos;y a que le chemin qui vous
            ressemble. Voulez-vous voir les câbles ou voulez-vous voir la
            lumière ?&quot;
          </p>
        </div>
      </div>

      {/* THE PATHS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Compass className="w-6 h-6 text-slate-700" />
          Choisissez votre Porte
        </h2>

        <div className="grid gap-6">
          {PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className={`group block p-8 rounded-2xl border ${path.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {path.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-2 underline-offset-4">
                {path.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {path.role}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed max-w-2xl">
                {path.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* READING GUIDE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Comment lire ce site ?</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Ne confondez pas la carte et le territoire. Ce site fonctionne par
          couches :
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <span className="text-amber-400 font-bold min-w-[80px]">1. Mythos</span>
            <span>
              La couche narrative. Elle explique le &quot;Pourquoi&quot; avec des
              métaphores organiques (ce que vous lisez ici).
            </span>
          </li>
          <li className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <span className="text-indigo-400 font-bold min-w-[80px]">2. Tech</span>
            <span>
              La couche ingénieur. Les liens vers le code, GitHub et les
              spécifications techniques brutes.
            </span>
          </li>
          <li className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <span className="text-emerald-400 font-bold min-w-[80px]">3. UX</span>
            <span>
              La couche expérience. L&apos;application réelle où vous cliquez et
              interagissez.
            </span>
          </li>
        </ul>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
        >
          ← Accueil
        </Link>
        <Link
          href="/kreature/anatomie"
          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 transition-colors"
        >
          Commencer par l&apos;Anatomie →
        </Link>
      </div>
    </main>
  );
}