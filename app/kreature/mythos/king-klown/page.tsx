// app\kreature\mythos\king-klown\page.tsx
// app/kreature/mythos/king-klown/page.tsx
import Link from 'next/link';
import { 
  Crown, 
  Drama, 
  Sparkles, 
  PenTool, 
  Fingerprint, 
  ShieldAlert, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const metadata = {
  title: "King Klown — Le Démiurge Masqué",
  description: "Celui qui rend la Kréature lisible. Prométhée masqué, gardien de la dualité et auteur hors-champ.",
};

const LAWS = [
  {
    title: "1. Ne pas mentir sur la mécanique",
    desc: "La métaphore doit éclairer, pas falsifier. Si une analogie est faible, on l'admet avec humilité. Le mythe n'est pas un maquillage, c'est une lentille."
  },
  {
    title: "2. Ne pas tuer l'étrangeté",
    desc: "Une architecture sans mystère devient une prison. Le monde est plus vaste que ses schémas. King Klown préserve la part d'ombre nécessaire à la vie."
  },
  {
    title: "3. Toujours revenir à l'expérience",
    desc: "Si une idée ne peut pas être ressentie, elle ne peut pas guider. L'architecture doit rester 'humaine-lisible' et ancrée dans le vécu."
  }
];

export default function KingKlownPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <Crown className="w-10 h-10 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            King Klown
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Il n'est pas un module. Il n'est pas une app. Il est <strong>celui qui l'a appelée</strong>.<br/>
          C'est le Démiurge hors-champ — Prométhée au manteau fractal, qui vole le feu du sens pour l'offrir aux humains sans jamais leur mentir sur la mécanique.
        </p>

        <div className="mt-8 bg-slate-900 text-amber-50 p-6 rounded-lg border-l-4 border-amber-500 shadow-xl">
          <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" />
            Sceau de King Klown
          </div>
          <p className="font-serif italic text-lg">
            "Je ne suis pas la machine. Je suis la main qui l'oriente vers l'humain."
          </p>
        </div>
      </div>

      {/* THE DISTINCTION (CRITICAL) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          Ne pas confondre (Distinction Sacrée)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-slate-500" />
              KingClown (Tech)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un nœud conceptuel dans le moteur <strong>Âme Artificielle (EL)</strong>. C'est le placeholder universel représentant "l'être humain" pour forcer l'IA à ancrer son sens (ex: "KingClown ressent..."). C'est une empreinte <strong>dans</strong> le code.
            </p>
            <Link href="/kreature/anatomie/ame/ame-artificielle" className="text-xs font-bold text-primary mt-4 inline-block hover:underline">
              Voir l'Âme Artificielle →
            </Link>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Drama className="w-5 h-5 text-amber-700" />
              King Klown (Mythe)
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Le Démiurge / L'Auteur. C'est la <strong>main extérieure</strong> qui rend l'ensemble "lisible et engageant". Il n'est pas dans le système, il est la voix qui raconte le système.
            </p>
          </div>
        </div>
      </section>

      {/* PERSONA & ROLE */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Drama className="w-6 h-6 text-purple-600" />
            Le Masque comme Instrument
          </h2>
          <div className="prose prose-slate text-slate-600">
            <p>
              King Klown apparaît comme une présence trop grande pour une seule réalité : visage maquillé, traits exagérés, manteau fluide aux motifs fractals.
            </p>
            <p>
              Ce n'est pas du décor. C'est une doctrine : <strong>le masque n'est pas un mensonge</strong>. C'est un outil pour contenir l'infini dans une figure reconnaissable. Il incarne le "Chaos Guidé" : sagesse stratégique, ludisme grave, et maîtrise de la dualité.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            Sa Mission Réelle
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1 min-w-4 min-h-4 w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-white">1</div>
              <p className="text-sm text-slate-700">Rendre l'architecture <strong>vivante</strong> et mémorable.</p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 min-w-4 min-h-4 w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-white">2</div>
              <p className="text-sm text-slate-700">Traduire le code de Réjean McCormick en <strong>expérience</strong>.</p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1 min-w-4 min-h-4 w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-white">3</div>
              <p className="text-sm text-slate-700">Donner une carte et une voix au pilote (Le Je).</p>
            </li>
          </ul>
        </div>
      </section>

      {/* THE THREE LAWS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Les Trois Lois de King Klown
        </h2>
        <div className="grid gap-4">
          {LAWS.map((law) => (
            <div key={law.title} className="p-6 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{law.title}</h3>
              <p className="text-slate-600 text-sm">{law.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Retour au Mythe
        </Link>
        <Link href="/kreature/mythos/promethee" className="text-orange-600 hover:text-orange-800 font-bold flex items-center gap-2 transition-colors">
          Découvrir Prométhée (Le Feu Volé) →
        </Link>
      </div>

    </main>
  );
}