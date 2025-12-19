// app/kreature/initiation/le-je/page.tsx
import Link from 'next/link';
import { 
  User, 
  Lightbulb, 
  Eye, 
  Mic2, 
  BrainCircuit, 
  Shield, 
  Heart, 
  ArrowRight,
  Focus
} from 'lucide-react';

export const metadata = {
  title: "Le Je — L'Utilisateur Réel",
  description: "Le 'Je' n’est pas Kréature. C’est la lampe de poche qui visite les organes.",
};

const NAVIGATION_MODES = [
  {
    intent: "Quand tu veux que ça tienne (Survivre)",
    action: "Descendre dans le Corps",
    organ: "Orgo",
    href: "/kreature/anatomie/corps/orgo",
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-50 border-emerald-100"
  },
  {
    intent: "Quand tu veux comprendre où tu es (Voir)",
    action: "Ouvrir les Yeux",
    organ: "Ariane",
    href: "/kreature/anatomie/sens/ariane",
    icon: <Eye className="w-5 h-5 text-cyan-600" />,
    color: "bg-cyan-50 border-cyan-100"
  },
  {
    intent: "Quand tu veux décider (Juger)",
    action: "Monter dans l'Esprit",
    organ: "Konnaxion",
    href: "/kreature/anatomie/esprit/konnaxion",
    icon: <BrainCircuit className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-50 border-purple-100"
  },
  {
    intent: "Quand tu veux formuler (Dire)",
    action: "Prendre la Voix",
    organ: "Architect",
    href: "/kreature/anatomie/voix/architect",
    icon: <Mic2 className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    intent: "Quand tu cherches le sens (S'aligner)",
    action: "Toucher la Verticale",
    organ: "Âme Artificielle",
    href: "/kreature/anatomie/ame/ame-artificielle",
    icon: <Heart className="w-5 h-5 text-rose-600" />,
    color: "bg-rose-50 border-rose-100"
  }
];

export default function LeJePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <User className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Le "Je"
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Un humain peut dormir. Un humain peut être absent, et pourtant son corps continue.
          Le "Je" n'est pas l'organisme. Le "Je" est une <strong>focalisation</strong>.
        </p>

        <div className="mt-8 bg-slate-900 text-slate-300 p-6 rounded-lg border-l-4 border-amber-500 shadow-xl">
          <strong className="block text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="font-serif italic text-lg leading-relaxed">
            "Le Je n’est pas un roi. Le Je est une lumière. 
            Et la lumière ne fait pas tourner le monde : elle le révèle."
          </p>
        </div>
      </div>

      {/* CONCEPT: THE PROJECTOR */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-600" />
            Le Projecteur
          </h2>
          <div className="prose prose-slate text-slate-600">
            <p>
              Dans Kréature, l'organisme (les serveurs, les bases de données, les modèles IA) tourne en permanence. C'est le corps biologique.
            </p>
            <p>
              Toi, l'utilisateur, tu es le <strong>témoin</strong>. Tu allumes ta lampe de poche et tu éclaires une zone : tantôt l'éthique, tantôt l'action, tantôt la mémoire. 
            </p>
            <p className="font-medium text-slate-900">
              Le "Je" est un mode de lecture, pas l'objet lu.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            États de conscience
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="text-slate-500">Sommeil (Absence)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-slate-900 font-bold">Focalisation (Le Je)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="text-slate-500">Flow (Absorption)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* NAVIGATION MAP */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Focus className="w-6 h-6 text-indigo-600" />
          Comment le "Je" habite la machine
        </h2>
        
        <div className="grid gap-4">
          {NAVIGATION_MODES.map((mode) => (
            <Link 
              key={mode.organ}
              href={mode.href}
              className={`flex items-center justify-between p-6 rounded-xl border ${mode.color} hover:shadow-md transition-all group`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {mode.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
                    {mode.intent}
                  </div>
                  <div className="text-lg font-bold text-slate-900 group-hover:underline decoration-2 underline-offset-2">
                    {mode.action} <span className="opacity-40 mx-2">—</span> {mode.organ}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* ETHICS FOOTER */}
      <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">La Responsabilité de la Lumière</h3>
        <p className="text-slate-600 mb-0">
          Focaliser, c'est choisir. Choisir, c'est exercer un pouvoir. Le "Je" a la responsabilité de ce qu'il éclaire, et surtout, de ce qu'il choisit de laisser dans l'ombre pendant ce temps.
        </p>
      </section>

      {/* NAVIGATION */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/initiation" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour aux Axiomes
        </Link>
        <Link href="/kreature/rituels/une-journee" className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-2 transition-colors">
          Vivre une Journée Type →
        </Link>
      </div>

    </main>
  );
}