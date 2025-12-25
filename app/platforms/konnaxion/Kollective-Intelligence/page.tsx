// app/platforms/konnaxion/kollective-intelligence/page.tsx
import Link from "next/link";
import { BrainCircuit, Star, Vote, ArrowRight, Activity } from "lucide-react";

export const metadata = {
  title: "Kollective Intelligence Hub – Konnaxion",
  description:
    "The conscience and judgment engine: Reputation (EkoH) and Voting (Smart Vote).",
};

// Deployed route casing is case-sensitive on Linux.
// These work in prod:
// /platforms/konnaxion/Kollective-Intelligence/ekoh
// /platforms/konnaxion/Kollective-Intelligence/smart-vote
const BASE = "/platforms/konnaxion/Kollective-Intelligence";

export default function KollectivePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Kollective Intelligence
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The mind of the system. Kollective Intelligence is where raw data
          becomes decision. It combines <strong>EkoH</strong> (the conscience
          that weighs expertise and ethics) with <strong>Smart Vote</strong> (the
          judgment that reaches consensus).
        </p>
      </div>

      {/* 1. THE TWO HEMISPHERES */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-primary" />
          The Two Hemispheres
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* EkoH */}
          <Link
            href={`${BASE}/ekoh`}
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-yellow-500 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-700 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-600" />
              EkoH
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **The Conscience.** A multidimensional reputation engine. It tracks
              expertise, consistency, and ethics over time—with a "decay rate" to
              ensure influence is rented, never owned.
            </p>
            <div className="inline-flex items-center font-bold text-yellow-700 text-sm">
              View Reputation Engine{" "}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Smart Vote */}
          <Link
            href={`${BASE}/smart-vote`}
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 flex items-center">
              <Vote className="w-5 h-5 mr-2 text-purple-600" />
              Smart Vote
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **The Judgment.** A weighted decision engine. It supports multiple
              voting modalities (Approval, Quadratic, Ranking) and integrates
              EkoH scores to weigh votes by competence.
            </p>
            <div className="inline-flex items-center font-bold text-purple-700 text-sm">
              View Voting Specs{" "}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/platforms/konnaxion" className="text-slate-500 hover:text-primary">
          ← Back to Konnaxion Hub
        </Link>
        <Link href="/platforms/konnaxion/keenkonnect" className="text-slate-500 hover:text-primary">
          Next: keenKonnect (Coordination) →
        </Link>
      </div>
    </main>
  );
}
