// app\kreature\anatomie\esprit\konnaxion-mythos\keen-konnect\konstruct-mythos\page.tsx
// app/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect/konstruct-mythos/page.tsx
import Link from 'next/link';
import { 
  HardHat, 
  Map, 
  Users, 
  CalendarClock, 
  ArrowDown, 
  Shield, 
  Briefcase,
  GitMerge
} from 'lucide-react';

export const metadata = {
  title: "Konstruct — Le Chantier",
  description: "La Gestion de Projet. Transformer la vision (Kollective) en plan. Le pont vers l'exécution (Orgo).",
};

const PILLARS = [
  {
    title: "1. Le Portefeuille (Portfolio)",
    role: "La Vue d'Hélicoptère",
    desc: "Gérer l'ensemble des initiatives. Voir tous les chantiers en cours sans se perdre dans les détails.",
    icon: <Briefcase className="w-5 h-5 text-teal-600" />,
    color: "bg-teal-50 border-teal-200"
  },
  {
    title: "2. Les Jalons (Milestones)",
    role: "Le Rythme",
    desc: "Poser des dates qui comptent. Transformer une ligne de temps infinie en séquences réalisables (Sprints / Phases).",
    icon: <CalendarClock className="w-5 h-5 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "3. La Dynamique d'Équipe",
    role: "L'Assignation",
    desc: "Qui monte dans le bateau ? Définir les rôles et les permissions pour chaque chantier.",
    icon: <Users className="w-5 h-5 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  }
];

export default function KonstructPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-teal-100 rounded-2xl">
            <HardHat className="w-10 h-10 text-teal-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Konstruct
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Une vision, c'est bien. Un plan, c'est mieux. 
          Konstruct est l'organe qui transforme le "pourquoi" en "comment". C'est le chef de chantier de la Kréature.
        </p>

        <div className="mt-8 bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
          <strong className="block text-teal-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une vision sans plan est une hallucination. Konstruct est l'échelle qui permet de descendre du nuage pour toucher le sol."
          </p>
        </div>
      </div>

      {/* THE FLOW DIAGRAM */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <GitMerge className="w-6 h-6 text-slate-700" />
          La Chaîne de Commande
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          
          {/* STEP 1 */}
          <div className="p-6 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col items-center text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Stratégie</div>
            <h3 className="font-bold text-indigo-900 text-lg mb-2">Kollective</h3>
            <p className="text-sm text-indigo-700/80">Décide de la direction ("On va sur la Lune").</p>
          </div>

          {/* ARROW (Hidden on mobile, visible on desktop) */}
          <div className="hidden md:flex items-center justify-center text-slate-300">
            <ArrowDown className="w-6 h-6 -rotate-90" />
          </div>

          {/* STEP 2 (CURRENT) */}
          <div className="p-6 rounded-xl border-2 border-teal-500 bg-white shadow-lg flex flex-col items-center text-center relative">
            <div className="absolute -top-3 px-3 py-1 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Vous êtes ici
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Planification</div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Konstruct</h3>
            <p className="text-sm text-slate-600">Dessine la fusée et planifie le décollage.</p>
          </div>

          {/* ARROW */}
          <div className="hidden md:flex items-center justify-center text-slate-300">
            <ArrowDown className="w-6 h-6 -rotate-90" />
          </div>

          {/* STEP 3 */}
          <div className="p-6 rounded-xl border border-emerald-100 bg-emerald-50/50 flex flex-col items-center text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">Exécution</div>
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Orgo</h3>
            <p className="text-sm text-emerald-700/80">Serre les boulons et allume les moteurs.</p>
          </div>

        </div>
      </section>

      {/* PILLARS GRID */}
      <section className="mb-20">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Les Piliers du Chantier</h2>
        <div className="grid gap-6">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className={`flex gap-6 p-6 rounded-xl border ${pillar.color} transition-all hover:shadow-sm`}>
              <div className="flex-shrink-0 mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{pillar.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISTINCTION: KONSTRUCT vs ORGO */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-6 h-6 text-teal-400" />
          <h2 className="text-2xl font-bold text-white">Distinction Sacrée : Macro vs Micro</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 border-t border-slate-700 pt-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-teal-400 font-bold uppercase text-sm">
              <HardHat className="w-4 h-4" />
              Konstruct (Projet)
            </div>
            <p className="text-sm text-slate-400">
              Gère le "Quoi" et le "Pourquoi". C'est le long terme. <br/>
              <em>Exemple : "Lancer la version 2.0"</em>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase text-sm">
              <Shield className="w-4 h-4" />
              Orgo (Tâche)
            </div>
            <p className="text-sm text-slate-400">
              Gère le "Comment" et le "Maintenant". C'est le réflexe.<br/>
              <em>Exemple : "Réparer le bug #402"</em>
            </p>
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à KeenKonnect
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/keen-konnect/stockage-mythos" className="text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-2 transition-colors">
          Ouvrir l'Armoire (Stockage) →
        </Link>
      </div>

    </main>
  );
}