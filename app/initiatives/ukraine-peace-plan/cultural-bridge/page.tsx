// app\initiatives\ukraine-peace-plan\cultural-bridge\page.tsx
import Link from 'next/link';
import { 
  HeartHandshake, 
  Users, 
  Music, 
  BookOpen, 
  ArrowRight,
  Construction
} from 'lucide-react';

export const metadata = {
  title: "Cultural Bridge — The Human Reconstruction",
  description: "Peace treaties stop the missiles. Culture stops the hate. The parallel track for reconciliation, language, and memory.",
};

const TRACKS = [
  {
    title: "1. Language & Identity",
    desc: "Moving beyond weaponized linguistics. Creating spaces where Ukrainian and Russian speakers interact without political litmus tests.",
    icon: <MessageCircleHeart className="w-6 h-6 text-pink-600" />,
    color: "bg-pink-50 border-pink-200"
  },
  {
    title: "2. The Memory Project",
    desc: "A shared digital archive of the war. Not to agree on one history, but to acknowledge all localized pain.",
    icon: <BookOpen className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-50 border-amber-200"
  },
  {
    title: "3. Art as Diplomacy",
    desc: "Exhibitions and collaborations that bypass the blockage of political dialogue.",
    icon: <Music className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200"
  }
];

// Helper icon
function MessageCircleHeart(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}

export default function CulturalBridgePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-pink-100 rounded-2xl">
            <HeartHandshake className="w-10 h-10 text-pink-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Cultural Bridge
          </h1>
        </div>
        
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The <strong>FVR Framework</strong> (Freeze-Vote-Rebuild) handles the hardware of peace (guns, borders, concrete). 
          <strong>Cultural Bridge</strong> handles the software (people, memory, forgiveness).
        </p>

        <div className="mt-8 bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
          <strong className="block text-pink-800 font-bold uppercase tracking-widest text-xs mb-2">
            The Hypothesis
          </strong>
          <p className="text-slate-800 italic">
            "You cannot legislate brotherhood. But you can design spaces where enemies stop being targets and start being neighbors."
          </p>
        </div>
      </div>

      {/* STATUS BANNER */}
      <section className="mb-12 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-4">
        <Construction className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-slate-900">Work in Progress</h3>
          <p className="text-sm text-slate-600">
            This section is currently being drafted. It draws upon the "Projet du Pape François" variant and non-political reconciliation tracks.
          </p>
        </div>
      </section>

      {/* TRACKS GRID */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Users className="w-6 h-6 text-slate-700" />
          The Reconciliation Tracks
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <div key={track.title} className={`p-6 rounded-xl border ${track.color} hover:shadow-md transition-all`}>
              <div className="mb-4 bg-white p-2 rounded-lg w-fit shadow-sm">
                {track.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{track.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {track.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/initiatives/ukraine-peace-plan/fvr" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Back to FVR Framework
        </Link>
        {/* Placeholder link - assumes content will exist later */}
        <span className="text-slate-300 font-medium cursor-not-allowed flex items-center gap-2">
          Start Track 1 (Coming Soon) →
        </span>
      </div>

    </main>
  );
}