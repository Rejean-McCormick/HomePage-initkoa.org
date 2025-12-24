// app\kreature\rituels\parlement-interieur\page.tsx
// app/kreature/rituels/parlement-interieur/page.tsx
import Link from 'next/link';
import { 
  Landmark, 
  Scale, 
  BookOpen, 
  Gavel, 
  BrainCircuit, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Le Parlement Intérieur — Le Rituel de Choix",
  description: "Comment Kréature décide. Convoquer les voix, instruire le dossier, trancher.",
};

const RITUAL_ACTS = [
  {
    step: "Acte 1 : Convocation",
    organ: "Ethikos / Korum",
    desc: "Le moment du doute. On admet le désaccord. On ouvre le débat et on laisse les voix (peur, ambition, raison) prendre position via des Stances.",
    icon: <Scale className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  },
  {
    step: "Acte 2 : Instruction",
    organ: "KonnectED",
    desc: "Le moment de vérité. L'émotion ne suffit pas. On interroge la mémoire : 'A-t-on la compétence ? A-t-on déjà échoué ici ?'.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    step: "Acte 3 : Verdict",
    organ: "Kollective / Smart Vote",
    desc: "Le moment de trancher. On ne compte pas les mains, on pèse les âmes (EkoH). La décision tombe, elle devient loi et action.",
    icon: <Gavel className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  }
];

export default function ParlementInterieurPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <Landmark className="w-10 h-10 text-indigo-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Le Parlement Intérieur
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il y a des moments où respirer ne suffit pas. Il faut choisir. 
          Ce rituel s'active face à l'ambiguïté. Ce n'est pas un réflexe, c'est une <strong>délibération</strong>.
        </p>

        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
          <strong className="block text-indigo-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "Décider seul, c'est être le tyran de soi-même. Décider ensemble, à l'intérieur de soi, c'est devenir souverain."
          </p>
        </div>
      </div>

      {/* THE 3 ACTS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-slate-700" />
          La Tragédie en 3 Actes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {RITUAL_ACTS.map((act) => (
            <div key={act.step} className={`p-6 rounded-xl border ${act.color} hover:shadow-md transition-all`}>
              <div className="mb-4 bg-white p-3 rounded-full w-fit shadow-sm">
                {act.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{act.step}</h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700">
                via {act.organ}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO USE */}
      <section className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-16 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Quand ouvrir le Parlement ?</h2>
        </div>
        <p className="mb-6 leading-relaxed">
          Le Parlement coûte de l'énergie (Cognitive Load). Ne l'ouvrez pas pour des détails.
        </p>
        <div className="grid grid-cols-2 gap-8 text-sm text-center">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 opacity-50">
            <strong className="block text-slate-400 mb-1 uppercase tracking-wide">Refuser</strong>
            Choisir la couleur d'un bouton.<br/>
            (Laisser Orgo faire)
          </div>
          <div className="p-4 bg-indigo-900/40 rounded-lg border border-indigo-500/50">
            <strong className="block text-indigo-300 mb-1 uppercase tracking-wide">Accepter</strong>
            Accepter un projet risqué.<br/>
            (Ouvrir Ethikos)
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/rituels/respiration-du-sens" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← La Respiration (L'Entrée)
        </Link>
        <Link href="/kreature/anatomie/esprit/konnaxion-mythos" className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-2 transition-colors">
          Voir l'Esprit (Konnaxion) →
        </Link>
      </div>

    </main>
  );
}