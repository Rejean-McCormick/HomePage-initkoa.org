// app\kreature\anatomie\esprit\konnaxion-mythos\kreative-mythos\kontact\page.tsx
// app/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/kontact-mythos/page.tsx
import Link from 'next/link';
import { 
  Users, 
  Share2, 
  Contact, 
  Network, 
  Fingerprint, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export const metadata = {
  title: "Kontact — Le Réseau",
  description: "La Gestion des Relations. Profils, Connexions et Groupes. Un système nerveux social, pas un annuaire froid.",
};

const LEVELS = [
  {
    title: "1. L'Identité (Le Je)",
    desc: "Qui est cette personne ? Ce n'est pas juste un email. C'est un profil vivant avec des compétences, une réputation (EkoH) et un rôle.",
    icon: <Fingerprint className="w-5 h-5 text-pink-600" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    title: "2. Le Lien (Le Nous Deux)",
    desc: "Ce qui relie deux points. Ami, collègue, mentor, élève ? Kontact cartographie la nature et la force de la relation.",
    icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-200"
  },
  {
    title: "3. Le Groupe (Le Nous Tous)",
    desc: "Les cercles d'appartenance. Équipes, guildes, projets. C'est là que l'individu devient une tribu.",
    icon: <Users className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  }
];

const DATA_MODELS = [
  "UserProfile (La Personne)",
  "Relationship (Le Trait d'Union)",
  "Group (Le Cercle)",
  "InteractionLog (La Trace)"
];

export default function KontactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-pink-100 rounded-2xl">
            <Contact className="w-10 h-10 text-pink-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Kontact
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Savoir "qui" est aussi important que savoir "quoi". 
          Kontact est l'organe de la <strong>Relation</strong>. Ce n'est pas un annuaire mort, c'est une carte vivante des liens humains.
        </p>

        <div className="mt-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
          <strong className="block text-pink-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Un nom sur une liste est une donnée. Un lien entre deux noms est une histoire. Kontact n'enregistre pas les gens, il enregistre les liens."
          </p>
        </div>
      </div>

      {/* METAPHOR: THE SOCIAL NERVOUS SYSTEM */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold text-white">Le Système d'Adressage de l'Âme</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Pourquoi Kontact est vital pour le reste de Kréature ?
        </p>
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">Orgo :</span>
            <span>Ne peut pas router une tâche s'il ne connaît pas la compétence de la personne.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 font-bold">Smart Vote :</span>
            <span>Ne peut pas pondérer un vote s'il ne connaît pas la réputation (EkoH) du profil.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal-400 font-bold">Konstruct :</span>
            <span>Ne peut pas former une équipe sans connaître les liens existants.</span>
          </li>
        </ul>
      </section>

      {/* 3 LEVELS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 3 Cercles du Lien</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {LEVELS.map((lvl) => (
            <div key={lvl.title} className={`p-6 rounded-xl border ${lvl.color} hover:shadow-md transition-all`}>
              <div className="mb-4 bg-white p-2 rounded-lg w-fit shadow-sm">
                {lvl.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{lvl.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {lvl.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DATA SKELETON */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-slate-500" />
          L'Ossature (Modèles)
        </h2>
        <div className="flex flex-wrap gap-3">
          {DATA_MODELS.map((model, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-sm font-mono text-slate-600">
              {model}
            </span>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Kreative
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kreative-mythos/konservation-mythos" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Visiter le Musée (Konservation) →
        </Link>
      </div>

    </main>
  );
}