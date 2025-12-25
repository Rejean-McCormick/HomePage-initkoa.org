// app/kreature/anatomie/esprit/konnaxion/konnected/page.tsx
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
    href: "/kreature/anatomie/esprit/konnaxion/konnected/knowledge",
    icon: <Library className="w-6 h-6 text-blue-400" />,
    borderColor: "border-blue-500/30",
    hoverBorder: "group-hover:border-blue-400",
    bgHover: "group-hover:bg-blue-900/10"
  },
  {
    title: "CertifiKation",
    subtitle: "La Myéline (Compétence)",
    desc: "Le rite de passage du 'Je sais' au 'Je sais faire'. Des preuves, des seuils, des validations par les pairs.",
    href: "/kreature/anatomie/esprit/konnaxion/konnected/certifikation",
    icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
    borderColor: "border-emerald-500/30",
    hoverBorder: "group-hover:border-emerald-400",
    bgHover: "group-hover:bg-emerald-900/10"
  }
];

export default function KonnectedHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* HEADER */}
        <div className="mb-16 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-900/30 rounded-2xl border border-blue-800/50">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100">
              KonnectED
            </h1>
          </div>
          
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            La mémoire vivante de Kréature. C'est la force qui refuse l'amnésie et qui transforme des étincelles isolées en un <strong className="text-slate-200">maillage</strong> (Mesh).
          </p>

          <div className="mt-8 bg-slate-900/50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <strong className="block text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">
              Sceau de King Klown
            </strong>
            <p className="text-slate-300 italic">
              "Sans apprentissage, pas de discernement. Sans preuves, pas de confiance. KonnectED est la matière première de l'esprit."
            </p>
          </div>
        </div>

        {/* THE TWO HEMISPHERES */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-2">
            <Brain className="w-6 h-6 text-slate-400" />
            Les Deux Hémisphères de la Mémoire
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {SUB_MODULES.map((mod) => (
              <Link 
                key={mod.title}
                href={mod.href}
                className={`group block p-8 rounded-2xl border bg-slate-900/50 ${mod.borderColor} ${mod.hoverBorder} ${mod.bgHover} hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-950 rounded-xl shadow-sm border border-slate-800 group-hover:scale-110 transition-transform">
                    {mod.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-slate-200 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:underline decoration-2 underline-offset-4 decoration-slate-500">
                  {mod.title}
                </h3>
                <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-400">
                  {mod.subtitle}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {mod.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* HUMAN PARALLEL */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Pourquoi KonnectED est "Humain" ?</h2>
          </div>
          <p className="mb-6 leading-relaxed text-slate-300">
            Chez l'humain, apprendre n'est pas empiler des faits, c'est <strong className="text-white">cartographier</strong>. Et devenir compétent n'est pas juste savoir, c'est <strong className="text-white">incarner</strong> (myéliniser le geste).
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
              <span><strong className="text-blue-200">Knowledge</strong> construit le Mesh (le réseau d'idées).</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
              <span><strong className="text-emerald-200">CertifiKation</strong> solidifie le Mesh en réflexes et preuves.</span>
            </li>
          </ul>
        </section>

        {/* NAVIGATION FOOTER */}
        <div className="flex justify-between pt-10 border-t border-slate-800 mt-12">
          <Link href="/kreature/anatomie/esprit/konnaxion" className="text-slate-500 hover:text-slate-200 font-medium flex items-center gap-2 transition-colors">
            ← Retour à Konnaxion
          </Link>
          <Link href="/kreature/anatomie/esprit/konnaxion/ethikos" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-2 transition-colors">
            Aller vers Ethikos (Débattre) →
          </Link>
        </div>

      </div>
    </main>
  );
}