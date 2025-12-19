// app/kreature/anatomie/esprit/konnaxion-mythos/konnected-mythos/page.tsx
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  Library, 
  Brain, 
  ArrowRight,
  Network
} from 'lucide-react';

export const metadata = {
  title: "KonnectED — La Mémoire Vivante",
  description: "L'hippocampe social. Apprendre (Knowledge) et devenir capable (CertifiKation).",
};

const SUB_MODULES = [
  {
    title: "Knowledge",
    subtitle: "L'Hippocampe Social (Curiosité)",
    desc: "Une bibliothèque vivante qui relie et recommande. Elle transforme le chaos d'infos en maillage de savoir.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/konnected-mythos/knowledge",
    icon: <Library className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    title: "CertifiKation",
    subtitle: "La Myéline (Compétence)",
    desc: "Le rite de passage du 'Je sais' au 'Je sais faire'. Des preuves, des seuils, des validations par les pairs.",
    href: "/kreature/anatomie/esprit/konnaxion-mythos/konnected-mythos/certifikation",
    icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-200"
  }
];

export default function KonnectedHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <BookOpen className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            KonnectED
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          La mémoire vivante de Kréature. C'est la force qui refuse l'amnésie et qui transforme des étincelles isolées en un <strong>maillage</strong> (Mesh).
        </p>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <strong className="block text-blue-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Sans apprentissage, pas de discernement. Sans preuves, pas de confiance. KonnectED est la matière première de l'esprit."
          </p>
        </div>
      </div>

      {/* THE TWO HEMISPHERES */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Brain className="w-6 h-6 text-slate-700" />
          Les Deux Hémisphères de la Mémoire
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {SUB_MODULES.map((mod) => (
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

      {/* HUMAN PARALLEL */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Pourquoi KonnectED est "Humain" ?</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Chez l'humain, apprendre n'est pas empiler des faits, c'est <strong>cartographier</strong>. Et devenir compétent n'est pas juste savoir, c'est <strong>incarner</strong> (myéliniser le geste).
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span><strong>Knowledge</strong> construit le Mesh (le réseau d'idées).</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span><strong>CertifiKation</strong> solidifie le Mesh en réflexes et preuves.</span>
          </li>
        </ul>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à Konnaxion
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos/ethikos-mythos" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Aller vers Ethikos (Débattre) →
        </Link>
      </div>

    </main>
  );
}