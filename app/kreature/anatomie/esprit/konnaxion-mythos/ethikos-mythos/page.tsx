// app/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/page.tsx
import Link from 'next/link';
import { 
  Scale, 
  MessageSquare, 
  Users, 
  ArrowRight,
  GitMerge, 
  Activity,
  Gavel,
  ShieldAlert
} from 'lucide-react';

export const metadata = {
  title: "Ethikos — La Chambre du Tiraillement",
  description: "Le conflit civilisé. Débats structurés (Korum) et consultations (Konsultations).",
};

const ORGANS = [
  {
    title: "Korum",
    subtitle: "Débats Structurés",
    desc: "L'arène du désaccord civilisé. On ne vote pas 'oui/non', on se positionne sur une échelle de nuance (-3 à +3).",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/korum-mythos",
    icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "Konsultations",
    subtitle: "La Démocratie Cyclique",
    desc: "L'appel au peuple. Des fenêtres de tir 'time-boxed' pour recueillir la voix, suivies d'un impact traçable.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos/konsultations-mythos",
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

const RITUAL_STEPS = [
  "1. Nommer le sujet (Topic)",
  "2. Poser la stance (-3...+3)",
  "3. Argumenter en fils (Threads)",
  "4. Laisser l'expertise éclairer (Cohortes)",
  "5. Attendre le verdict (Smart Vote)"
];

export default function EthikosHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-2xl">
            <Scale className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Ethikos
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a un endroit où l'on ne réagit plus par réflexe. Où l'on dit : "J'entends, je doute, je pèse". 
          Ethikos est la <strong>mécanique du discernement</strong>.
        </p>

        <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
          <strong className="block text-purple-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La vertu n’est pas l’absence de contradiction. La vertu est l’art de traverser la contradiction sans perdre l’âme."
          </p>
        </div>
      </div>

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <GitMerge className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Le Tiraillement Intérieur</h2>
        </div>
        <p className="mb-6 leading-relaxed text-sm">
          Dans l'humain, la conscience débat avant que le jugement ne tranche. Ethikos est cet espace de suspension. Il transforme le conflit (énergie brute) en débat (structure) pour éviter l'inondation.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-xs font-mono text-purple-300">Conscience</span>
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-xs font-mono text-purple-300">Débat</span>
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-xs font-mono text-purple-300">Nuance</span>
        </div>
      </section>

      {/* SUB-MODULES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Activity className="w-6 h-6 text-indigo-600" />
          Les Deux Organes du Débat
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {ORGANS.map((organ) => (
            <Link 
              key={organ.title}
              href={organ.href}
              className={`group block p-8 rounded-2xl border ${organ.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {organ.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-2 underline-offset-4">
                {organ.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                {organ.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {organ.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* MINI RITUAL */}
      <section className="mb-16">
        <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
          <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            Rituel : Débattre sans se perdre
          </h3>
          <ul className="space-y-3">
            {RITUAL_STEPS.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-amber-800 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Konnaxion
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Aller vers Kollective (Trancher) →
        </Link>
      </div>

    </main>
  );
}