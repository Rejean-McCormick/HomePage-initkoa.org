// app\kreature\anatomie\esprit\konnaxion-mythos\kollective\page.tsx
// app/kreature/anatomie/esprit/konnaxion-mythos/kollective/page.tsx
import Link from 'next/link';
import { 
  Gavel, 
  Brain, 
  Scale, 
  Activity, 
  ArrowRight,
  Fingerprint,
  Vote
} from 'lucide-react';

export const metadata = {
  title: "Kollective Intelligence — Conscience & Jugement",
  description: "L'endroit où l'on tranche. EkoH (Conscience) et Smart Vote (Jugement).",
};

const ORGANS = [
  {
    title: "EkoH (La Conscience)",
    subtitle: "Mémoire Morale & Réputation",
    desc: "Qui parle ? EkoH est la trace vivante de la fiabilité. Elle s'érode avec le temps (Decay) pour forcer la vertu active.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/kollective/ekoh-mythos",
    icon: <Fingerprint className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "Smart Vote (Le Jugement)",
    subtitle: "Décision & Consensus Pondéré",
    desc: "Comment décider ? Smart Vote utilise le poids d'EkoH pour trancher. Il cherche le consensus qualifié, pas la tyrannie de la majorité.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/kollective/smart-vote",
    icon: <Vote className="w-6 h-6 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200"
  }
];

export default function KollectiveHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <Gavel className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Kollective Intelligence
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Après le savoir (KonnectED) et le débat (Ethikos), il faut bien finir par <strong>trancher</strong>. 
          Kollective Intelligence est le siège du verdict.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Une décision sans conscience est une chute. Une conscience sans décision est une paralysie."
          </p>
        </div>
      </div>

      {/* THE TWO HEADS */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Brain className="w-6 h-6 text-slate-700" />
          Les Deux Têtes du Verdict
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
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

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Le Parallèle Humain</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Dans l'humain, le jugement n'est pas un calcul froid. Il est coloré par la mémoire ("cette source est fiable") et l'urgence de l'instant.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <strong className="block text-white text-sm">L'Expérience (EkoH)</strong>
              <span className="text-slate-400 text-xs">"Je sais ce que tu as fait hier."</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Gavel className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <strong className="block text-white text-sm">L'Acte (Smart Vote)</strong>
              <span className="text-slate-400 text-xs">"Je décide maintenant, avec le poids de ce savoir."</span>
            </div>
          </li>
        </ul>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Ethikos
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/kollective/ekoh-mythos" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Explorer EkoH (Conscience) →
        </Link>
      </div>

    </main>
  );
}