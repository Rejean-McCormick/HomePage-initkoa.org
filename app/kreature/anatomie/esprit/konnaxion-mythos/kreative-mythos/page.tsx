// app\kreature\anatomie\esprit\konnaxion-mythos\kreative-mythos\page.tsx
// app/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/page.tsx
import Link from 'next/link';
import { 
  Palette, 
  Users, 
  Landmark, 
  Gem, 
  HeartHandshake, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Kreative — La Culture & La Création",
  description: "L'espace culturel. Gestion des relations (Kontact) et préservation du patrimoine (Konservation).",
};

const MODULES = [
  {
    title: "Kontact",
    subtitle: "Le Réseau (CRM Vivant)",
    desc: "La carte des vivants. Ce n'est pas un annuaire froid, c'est le système nerveux social. Qui est qui ? Qui connaît qui ? C'est le tissu humain.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/kontact-mythos",
    icon: <Users className="w-6 h-6 text-pink-600" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    title: "Konservation",
    subtitle: "Le Musée (Patrimoine)",
    desc: "La curation de l'âme collective. Contrairement au stockage (outils), ici on garde ce qui est beau, historique et sacré. Les totems de la tribu.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/konservation-mythos",
    icon: <Landmark className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  }
];

export default function KreativePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-pink-100 rounded-2xl">
            <Palette className="w-10 h-10 text-pink-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Kreative
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Une tribu ne vit pas seulement pour bâtir des murs (KeenKonnect) ou juger des lois (Kollective). 
          Elle vit pour se lier et créer. <strong>Kreative</strong> est l'organe de la Culture.
        </p>

        <div className="mt-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
          <strong className="block text-pink-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une machine a des pièces. Une tribu a des liens. Si tu oublies la culture, tu n'as plus qu'une usine."
          </p>
        </div>
      </div>

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <HeartHandshake className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">L'Art d'Être Ensemble</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Dans Kréature, nous faisons une distinction nette :
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600">
            <strong className="block text-teal-400 mb-1">KeenKonnect (Faire)</strong>
            C'est le chantier. On y va pour être productif, pour finir une tâche, pour utiliser un outil.
          </div>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <strong className="block text-pink-400 mb-1">Kreative (Être)</strong>
            C'est le village. On y va pour rencontrer l'autre, pour célébrer l'histoire, pour tisser du sens.
          </div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Gem className="w-6 h-6 text-slate-700" />
          Les Deux Piliers de la Culture
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

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à KeenKonnect
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/kontact-mythos" className="text-pink-600 hover:text-pink-800 font-bold flex items-center gap-2 transition-colors">
          Entrer dans Kontact (Le Réseau) →
        </Link>
      </div>

    </main>
  );
}