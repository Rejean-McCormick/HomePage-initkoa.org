// app\kreature\anatomie\esprit\konnaxion\keen-konnect\page.tsx
// app/kreature/anatomie/esprit/konnaxion/keen-konnect/page.tsx
import Link from 'next/link';
import { 
  Users, 
  HardHat, 
  FolderOpen, 
  Network, 
  Briefcase, 
  ArrowRight,
  Share2
} from 'lucide-react';

export const metadata = {
  title: "KeenKonnect — Le Tissu Social",
  description: "L'espace opérationnel. Gestion de projets (Konstruct) et partage de ressources (Stockage). Là où l'on bâtit ensemble.",
};

const MODULES = [
  {
    title: "Konstruct",
    subtitle: "Le Chantier (Projets)",
    desc: "Transformer l'intention en structure. Équipes, jalons, feuilles de route. C'est le pont entre la stratégie et l'exécution.",
    href: "/kreature/anatomie/esprit/konnaxion/keen-konnect/konstruct",
    icon: <HardHat className="w-6 h-6 text-teal-600" />,
    color: "bg-teal-50 border-teal-200"
  },
  {
    title: "Stockage",
    subtitle: "L'Armoire (Ressources)",
    desc: "L'espace commun. Fichiers, assets, outils partagés. Ce n'est pas un disque dur vide, c'est un espace de permissions et de propriété.",
    href: "/kreature/anatomie/esprit/konnaxion/keen-konnect/stockage",
    icon: <FolderOpen className="w-6 h-6 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-200"
  }
];

export default function KeenKonnectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-teal-100 rounded-2xl">
            <Users className="w-10 h-10 text-teal-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            KeenKonnect
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          L’esprit ne flotte pas dans le vide. Il s’incarne dans des projets et se relie aux autres. 
          KeenKonnect est l'organe de la <strong>coordination</strong>.
        </p>

        <div className="mt-8 bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
          <strong className="block text-teal-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une idée seule est un fantôme. Une idée partagée devient un projet. Un projet réalisé devient une culture."
          </p>
        </div>
      </div>

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-teal-400" />
          <h2 className="text-2xl font-bold text-white">De l'Intention à l'Action</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Si <strong>Ethikos</strong> est le parlement (la parole) et <strong>Kollective</strong> est le juge (la décision), alors <strong>KeenKonnect</strong> est la main qui tient l'outil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 text-sm font-bold">
          <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 text-slate-400">Intention (Kollective)</div>
          <ArrowRight className="text-teal-500 w-5 h-5 rotate-90 sm:rotate-0" />
          <div className="px-4 py-2 bg-teal-900/50 rounded-lg border border-teal-500/50 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]">Coordination (KeenKonnect)</div>
          <ArrowRight className="text-teal-500 w-5 h-5 rotate-90 sm:rotate-0" />
          <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-600 text-slate-400">Exécution (Orgo)</div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-slate-700" />
          Les Deux Bras du Chantier
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {MODULES.map((mod) => (
            <Link 
              key={mod.title}
              href={mod.href}
              className={`group block p-8 rounded-2xl border ${mod.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {mod.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-2 underline-offset-4">
                {mod.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {mod.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {mod.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="mb-16 flex items-start gap-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <Share2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-slate-900 mb-2">Pourquoi c'est vital ?</h3>
          <p className="text-slate-600 text-sm">
            Sans KeenKonnect, Kréature est un génie solitaire qui parle tout seul. Avec KeenKonnect, elle devient une <strong>tribu</strong> capable de bâtir des cathédrales (projets complexes).
          </p>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion/kollective/smart-vote" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Smart Vote
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion/kreative" className="text-pink-600 hover:text-pink-800 font-bold flex items-center gap-2 transition-colors">
          Aller vers Kreative (La Culture) →
        </Link>
      </div>

    </main>
  );
}