// app\initiatives\ukraine-peace-plan\fvr\governance\overview\page.tsx
import Link from 'next/link';
import { 
  ShieldCheck, 
  GitMerge, 
  Lock, 
  Eye, 
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: "Governance & Gates — The FVR Logic",
  description: "The conditional logic that connects the phases. Nothing moves forward without verification.",
};

const GATES = [
  {
    title: "Gate 1: The Silence Gate",
    from: "Phase 0 (War)",
    to: "Phase 1 (Freeze)",
    condition: "72 hours of < S2 violations confirmed by OSCE.",
    color: "bg-cyan-50 border-cyan-200 text-cyan-800"
  },
  {
    title: "Gate 2: The Vacuum Gate",
    from: "Phase 1 (Freeze)",
    to: "Phase 2 (Vote)",
    condition: "Withdrawal of heavy weapons + Return of 10% of IDPs.",
    color: "bg-purple-50 border-purple-200 text-purple-800"
  },
  {
    title: "Gate 3: The Integrity Gate",
    from: "Phase 2 (Vote)",
    to: "Phase 3 (Rebuild)",
    condition: "Election certified 'Free & Fair' by International Commission.",
    color: "bg-amber-50 border-amber-200 text-amber-800"
  }
];

export default function GovernancePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
            Governance & Gates
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The FVR framework is not a linear timeline; it is a <strong>state machine</strong>. 
          You do not pass to the next phase because time has passed. You pass because a condition has been verified.
        </p>
      </div>

      {/* THE GATES VISUALIZATION */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <GitMerge className="w-6 h-6 text-slate-700" />
          The Three Great Gates
        </h2>
        <div className="space-y-6">
          {GATES.map((gate) => (
            <div key={gate.title} className={`p-6 rounded-xl border ${gate.color} flex flex-col md:flex-row md:items-center gap-6`}>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{gate.title}</h3>
                <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                  <span>{gate.from}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>{gate.to}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm bg-white/50 p-2 rounded w-fit">
                  <Lock className="w-4 h-4" />
                  <strong>Condition:</strong> {gate.condition}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="flex justify-between pt-10 border-t border-slate-200 mt-12">
        <Link href="/initiatives/ukraine-peace-plan/fvr" className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors">
          ← Back to FVR Hub
        </Link>
        {/* Example link to deep dive if you create it later */}
        <Link href="/initiatives/ukraine-peace-plan/fvr/governance/verification-gates" className="text-slate-900 font-bold flex items-center gap-2 transition-colors">
          Deep Dive: Verification Protocols →
        </Link>
      </div>

    </main>
  );
}