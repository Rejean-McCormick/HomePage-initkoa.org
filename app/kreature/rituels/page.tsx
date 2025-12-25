// app/kreature/rituels/page.tsx
import Link from 'next/link';
import { 
  BookOpen, 
  Wind, 
  Gavel, 
  ArrowRight,
  Repeat,
  Heart
} from 'lucide-react';

export const metadata = {
  title: "Les Rituels — La Méthode",
  description: "L'anatomie ne suffit pas. Il faut le mouvement. Découvrez la Respiration du Sens et le Parlement Intérieur.",
};

const RITUALS = [
  {
    title: "1. La Respiration du Sens",
    subtitle: "L'Entrée (Input)",
    desc: "Comment traiter l'information sans s'étouffer. Apprendre à inspirer le signal, le retenir pour le structurer, et expirer l'action.",
    href: "/kreature/rituels/respiration-du-sens",
    icon: <Wind className="w-6 h-6 text-sky-600" />,
    color: "bg-sky-50 border-sky-200"
  },
  {
    title: "2. Le Parlement Intérieur",
    subtitle: "Le Choix (Decision)",
    desc: "Comment trancher face à l'ambiguïté. Un rituel en trois actes pour convoquer les voix, instruire le dossier et poser un verdict.",
    href: "/kreature/rituels/parlement-interieur",
    icon: <Gavel className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  }
];

export default function RituelsHubPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <BookOpen className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Les Rituels
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          L'Anatomie décrit ce que le système <strong>est</strong>. Les Rituels décrivent ce que le système <strong>fait</strong>.
          Sans rituels, les organes s'atrophient. C'est l'hygiène de vie de la Kréature.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "La machine est inerte. C'est le rite qui lui donne le souffle. Un système sans habitude n'est qu'un tas de ferraille."
          </p>
        </div>
      </div>

      {/* PHILOSOPHY: STRUCTURE VS LIFE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-rose-400" />
          <h2 className="text-2xl font-bold text-white">Structure vs Vie</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Beaucoup d'organisations échouent non pas parce qu'elles manquent d'outils (Anatomie), mais parce qu'elles manquent de <strong>rythme</strong>.
        </p>
        <div className="grid sm:grid-cols-2 gap-8 text-sm">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
            <strong className="block text-slate-400 mb-2 uppercase tracking-wide">L'Anatomie</strong>
            C'est l'espace. Les bases de données, les modules, les interfaces.<br/>
            <em>"Où sont les choses ?"</em>
          </div>
          <div className="p-4 bg-rose-900/30 rounded-lg border border-rose-500/50">
            <strong className="block text-rose-300 mb-2 uppercase tracking-wide">Le Rituel</strong>
            C'est le temps. Quand on ouvre, quand on ferme, quand on décide.<br/>
            <em>"Quand fait-on les choses ?"</em>
          </div>
        </div>
      </section>

      {/* RITUALS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Repeat className="w-6 h-6 text-slate-700" />
          Les 2 Piliers de la Pratique
        </h2>
        
        <div className="grid gap-6">
          {RITUALS.map((ritual) => (
            <Link 
              key={ritual.title}
              href={ritual.href}
              className={`group block p-6 rounded-2xl border ${ritual.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {ritual.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-2 underline-offset-4">
                {ritual.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 text-slate-700">
                {ritual.subtitle}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {ritual.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour à l'Accueil Kréature
        </Link>
        <Link href="/kreature/anatomie" className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-2 transition-colors">
          Voir l'Anatomie (La Structure) →
        </Link>
      </div>

    </main>
  );
}