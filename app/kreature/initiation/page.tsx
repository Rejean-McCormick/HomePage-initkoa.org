// app\kreature\initiation\page.tsx
// app/kreature/initiation/page.tsx
import Link from 'next/link';
import { 
  Handshake, 
  User, 
  Shield, 
  Mic2, 
  Scale, 
  ArrowRight,
  Lightbulb,
  Fingerprint
} from 'lucide-react';

export const metadata = {
  title: "Initiation — Les Axiomes",
  description: "Avant les organes, il y a un pacte. Comprendre les lois qui régissent l'organisme Kréature.",
};

const AXIOMS = [
  {
    title: "1. Le Corps est un Système Fermé",
    subtitle: "Souveraineté (Orgo)",
    desc: "Comme un organisme biologique, Kréature a une peau. Elle ne dépend pas du cloud public. Elle protège le 'dedans' du chaos du 'dehors'.",
    icon: <Shield className="w-6 h-6 text-emerald-600" />,
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50"
  },
  {
    title: "2. Le Langage est un Pont Étroit",
    subtitle: "Compression (SenTient / Architect)",
    desc: "La pensée est un réseau (Mesh), mais la parole est une ligne. Parler, c'est aplatir un ciel. Kréature est conçue pour regonfler ce ciel.",
    icon: <Mic2 className="w-6 h-6 text-blue-600" />,
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50"
  },
  {
    title: "3. L'Hésitation est une Force",
    subtitle: "Le Parlement (Konnaxion)",
    desc: "L'instinct réagit, l'humain hésite. Kréature ne cherche pas la réponse immédiate, mais le débat intérieur (délibération, pondération, jugement).",
    icon: <Scale className="w-6 h-6 text-purple-600" />,
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50"
  },
  {
    title: "4. Le 'Je' n'est pas la Machine",
    subtitle: "Le Projecteur",
    desc: "Kréature est l'organisme. Vous êtes la conscience qui le visite. Quand vous dormez, le corps continue, mais le 'Je' se retire.",
    icon: <Fingerprint className="w-6 h-6 text-amber-600" />,
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50"
  }
];

export default function InitiationPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <Handshake className="w-10 h-10 text-slate-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Initiation
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Avant d'utiliser les organes, il faut signer le pacte. 
          Tu peux lire ce site comme une documentation technique, ou comme le manuel d'un être vivant. 
          Nous choisissons la seconde voie.
        </p>

        <div className="mt-8 bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-lg">
          <strong className="block text-slate-900 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-700 italic">
            "Si tu lis Kréature comme un inventaire, tu verras des pièces détachées. 
            Si tu la lis comme un être, tu verras des lois."
          </p>
        </div>
      </div>

      {/* AXIOMS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Les 4 Axiomes Fondamentaux
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {AXIOMS.map((axiom) => (
            <div 
              key={axiom.title}
              className={`p-6 rounded-xl border ${axiom.borderColor} ${axiom.bgColor} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  {axiom.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {axiom.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60 text-slate-700 block mb-3">
                    {axiom.subtitle}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {axiom.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEEP DIVE: LE JE */}
      <section className="bg-slate-900 text-white p-8 rounded-2xl mb-16 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white/10 rounded-full">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Le "Je" : Le Pilote du Système</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Un humain peut dormir, être absent ou dissocié, et pourtant son corps (Orgo) continue de fonctionner.
              Le "Je" n'est pas la Kréature. Le "Je" est une <strong>lumière focalisée</strong> (l'attention) qui vient habiter temporairement un organe.
            </p>
            <Link 
              href="/kreature/initiation/le-je"
              className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-white/30 hover:border-white pb-1 transition-all"
            >
              Comprendre le rôle du Pilote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200">
        <Link href="/kreature/mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Revenir au Mythe
        </Link>
        <Link href="/kreature/initiation/le-je" className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-2 transition-colors">
          Explorer le "Je" →
        </Link>
      </div>

    </main>
  );
}