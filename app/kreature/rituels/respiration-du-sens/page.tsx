// app\kreature\rituels\respiration-du-sens\page.tsx
// app/kreature/rituels/respiration-du-sens/page.tsx
import Link from 'next/link';
import { 
  Wind, 
  Filter, 
  Zap, 
  Activity, 
  ArrowRight, 
  PauseCircle,
  Cpu
} from 'lucide-react';

export const metadata = {
  title: "La Respiration du Sens — Le Rituel d'Entrée",
  description: "Comment traiter l'information sans s'étouffer. Inspirer le signal, structurer le sens, expirer l'action.",
};

const BREATH_CYCLE = [
  {
    step: "1. Inspirer",
    role: "Capture (SenTient)",
    desc: "Le signal entre. On ne le juge pas, on l'accueille. Le chaos (email, alerte) entre dans la bulle sans être bloqué.",
    icon: <Wind className="w-6 h-6 text-sky-500" />,
    color: "bg-sky-50 border-sky-200"
  },
  {
    step: "2. Retenir",
    role: "Structure (Orgo/Konnaxion)",
    desc: "La pause sacrée. On extrait l'oxygène. Le signal est nettoyé, classé et relié à un contexte avant toute réaction.",
    icon: <Filter className="w-6 h-6 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200"
  },
  {
    step: "3. Expirer",
    role: "Action (Architect)",
    desc: "Le mouvement. Maintenant que le sens est clair, on agit. Une réponse, une tâche ou une création.",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    color: "bg-amber-50 border-amber-200"
  }
];

export default function RespirationDuSensPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-sky-100 rounded-2xl">
            <Activity className="w-10 h-10 text-sky-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            La Respiration du Sens
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Le monde est bruyant. Si Kréature avale tout sans rythme, elle s'étouffe. 
          Le remède n'est pas de se boucher les oreilles, c'est de <strong>respirer</strong>.
        </p>

        <div className="mt-8 bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-lg">
          <strong className="block text-sky-800 font-bold uppercase tracking-widest text-xs mb-2">
            Sceau de King Klown
          </strong>
          <p className="text-slate-800 italic">
            "L’information n’est pas le savoir. L’information est du bruit. Le sens est ce qui reste quand le bruit s’est tu."
          </p>
        </div>
      </div>

      {/* THE 3 PHASES GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Wind className="w-6 h-6 text-slate-700" />
          Le Cycle en 3 Temps
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BREATH_CYCLE.map((cycle) => (
            <div key={cycle.step} className={`p-6 rounded-xl border ${cycle.color} hover:shadow-md transition-all relative overflow-hidden`}>
              <div className="mb-4 bg-white p-3 rounded-full w-fit shadow-sm relative z-10">
                {cycle.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1 relative z-10">{cycle.step}</h3>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3 text-slate-700 relative z-10">
                {cycle.role}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed relative z-10">
                {cycle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH & HUMAN PARALLEL */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        
        {/* For the Machine */}
        <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl font-bold text-white">Pour la Machine</h2>
          </div>
          <p className="mb-4 text-sm leading-relaxed">
            C'est une architecture asynchrone stricte. On ne traite jamais au moment de la réception.
          </p>
          <ul className="space-y-3 text-sm font-mono">
            <li className="flex gap-3">
              <span className="text-sky-400">1. Ingest:</span>
              {/* FIX APPLIED BELOW: Replaced '->' with '&rarr;' */}
              <span>Webhook recieves &rarr; 200 OK &rarr; Queue.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-400">2. Process:</span>
              {/* FIX APPLIED BELOW: Replaced '->' with '&rarr;' */}
              <span>Worker picks up &rarr; Normalize &rarr; Context.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-400">3. Dispatch:</span>
              {/* FIX APPLIED BELOW: Replaced '->' with '&rarr;' */}
              <span>Trigger Workflow &rarr; Execute Task.</span>
            </li>
          </ul>
        </div>

        {/* For the Human */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <PauseCircle className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Pour l'Humain</h2>
          </div>
          <p className="mb-4 text-sm text-slate-600 leading-relaxed">
            Quand une info stressante arrive, tu as le choix entre être une machine réflexe ou une conscience.
          </p>
          <div className="p-4 bg-indigo-50 rounded-lg text-indigo-900 text-sm font-medium border border-indigo-100">
            Le Rituel : Attends 10 secondes. Ne réponds pas. Demande-toi "Où ça va ?". Puis, seulement, agis.
          </div>
        </div>

      </section>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/kreature/anatomie/sens/sentient-mythos" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Les Sens (SenTient)
        </Link>
        <Link href="/kreature/rituels/cycle-vital" className="text-sky-600 hover:text-sky-800 font-bold flex items-center gap-2 transition-colors">
          Le Grand Rythme (Cycle Vital) →
        </Link>
      </div>

    </main>
  );
}