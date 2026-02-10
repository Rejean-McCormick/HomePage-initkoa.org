// app/initiatives/civic-governance/constitution/ekoh/page.tsx
import { Vote, Scale, Users, Award, GitMerge, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'EkoH — Competence Signals & Liquid Delegation | kOA',
  description:
    'A governable way to consult domain competence without replacing democratic legitimacy: multiple transparent vote readings, topic-based delegation, and auditability by design.',
};

export default function EkohPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Vote className="w-8 h-8 text-indigo-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">EkoH</h1>
        </div>

        <p className="text-xl text-slate-600 leading-relaxed">
          Democracy decides <strong>values</strong>. EkoH helps communities consult <strong>competence</strong>—by domain—without
          sliding into technocracy.
          <br />
          It works by showing <strong>multiple transparent “readings”</strong> of the same vote, so differences are visible and
          governable.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-600 bg-white">
            Baseline legitimacy preserved
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-600 bg-white">
            Domain-bounded competence
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-600 bg-white">
            Auditability & recourse
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-600 bg-white">
            Optional liquid delegation
          </span>
        </div>
      </div>

      {/* Tension: legitimacy vs quality */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center mb-4 text-slate-800">
            <Users className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Legitimacy constraint</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Some decisions are about shared values and lived impact. Everyone must retain a baseline right to participate,
            even when the topic is technical.
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center mb-4 text-slate-800">
            <Scale className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Quality constraint</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Some decisions require domain knowledge to avoid predictable failure. EkoH adds an advisory layer so competence
            can be consulted—openly—without becoming hidden authority.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
          <CheckCircle className="mr-3 text-indigo-600" />
          How EkoH works
        </h2>

        <div className="space-y-6">
          <div className="p-6 border border-slate-200 rounded-xl bg-white">
            <h3 className="font-bold text-slate-900 mb-2">1) Everyone gets a baseline vote</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The baseline result is always computable and always visible. This is the legitimacy anchor.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl bg-white">
            <h3 className="font-bold text-slate-900 mb-2">2) Competence is domain-bounded</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Competence is not a single global “rank.” It is expressed as signals tied to domains (e.g., civil engineering,
              public health, procurement). Communities decide what counts as evidence and how it is verified.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl bg-white">
            <h3 className="font-bold text-slate-900 mb-2">3) Relevance is explicit, not implicit</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              For any vote, the system can map which domains are relevant. This mapping is a governance choice—reviewable,
              adjustable, and debatable.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl bg-white">
            <h3 className="font-bold text-slate-900 mb-2">4) The app shows multiple vote “readings”</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instead of hiding expertise in a single opaque output, EkoH presents several side-by-side views (baseline,
              competence-informed advisory view, and optional delegation view). If views diverge, the divergence becomes
              discussable.
            </p>
          </div>

          <div className="p-6 border border-slate-200 rounded-xl bg-white">
            <h3 className="font-bold text-slate-900 mb-2">5) Auditability and recourse are part of the design</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rules, mappings, and results must be traceable. People need clear ways to contest errors, challenge misuse,
              and revise governance settings.
            </p>
          </div>
        </div>
      </section>

      {/* Decision readings (instead of formula) */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
          <Scale className="mr-3 text-indigo-600" />
          Decision readings (what users actually see)
        </h2>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mb-10">
          <p className="text-slate-300 text-sm uppercase tracking-widest font-bold mb-4">A transparent output, not a black box</p>

          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white">Reading A — Baseline</div>
              <div className="text-sm text-slate-200 mt-1">One-person-one-vote result (always shown).</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white">Reading B — Advisory competence view</div>
              <div className="text-sm text-slate-200 mt-1">
                A competence-informed lens for the specific topic (domain-bounded, relevance-explicit, governable rules).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white">Reading C — Optional delegation view</div>
              <div className="text-sm text-slate-200 mt-1">
                If you delegated on this topic, you can see exactly where your vote flowed—and revoke instantly.
              </div>
            </div>
          </div>
        </div>

        {/* Example scenario (no numeric multipliers) */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 font-bold text-slate-700">
            Example: Vote on “New hospital construction standards”
          </div>

          <div className="divide-y divide-slate-100">
            <div className="p-4 flex items-start justify-between gap-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-4">
                  SE
                </div>
                <div>
                  <div className="font-bold text-slate-900">Alice (Structural Engineer)</div>
                  <div className="text-xs text-slate-500">Domain signal: Civil engineering (high relevance)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">Baseline + advisory shown</div>
                <div className="text-xs text-slate-400 uppercase">No hidden weighting</div>
              </div>
            </div>

            <div className="p-4 flex items-start justify-between gap-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-4">
                  RN
                </div>
                <div>
                  <div className="font-bold text-slate-900">Bob (ER Nurse)</div>
                  <div className="text-xs text-slate-500">Domain signal: Healthcare practice (medium relevance)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">Baseline + advisory shown</div>
                <div className="text-xs text-slate-400 uppercase">Contestable rules</div>
              </div>
            </div>

            <div className="p-4 flex items-start justify-between gap-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold mr-4">
                  CI
                </div>
                <div>
                  <div className="font-bold text-slate-900">Charlie (Community member)</div>
                  <div className="text-xs text-slate-500">No domain signal for this topic (baseline still applies)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">Baseline remains equal</div>
                <div className="text-xs text-slate-400 uppercase">Values preserved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Delegation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
          <GitMerge className="mr-3 text-purple-600" />
          Topic-based delegation (optional)
        </h2>

        <div className="prose prose-lg text-slate-600 mb-8">
          <p>
            People can’t specialize in everything. EkoH supports <strong>liquid delegation</strong>: you can delegate your
            vote by topic to someone you trust, and revoke it at any time. Delegation is visible in the output as a
            separate reading—never hidden inside the baseline result.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Granular trust</h4>
            <p className="text-sm text-purple-800">
              Delegate differently by domain (e.g., urban planning vs budgeting), without handing over everything.
            </p>
          </div>
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Transitive flow (optional)</h4>
            <p className="text-sm text-purple-800">
              Delegation can flow through trusted networks if the governance rules allow it—always traceable.
            </p>
          </div>
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Instant recall</h4>
            <p className="text-sm text-purple-800">
              Change your mind? Revoke delegation instantly. No waiting cycles, no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Guardrails */}
      <section className="mt-16 p-8 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
          <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
          Guardrails (to prevent elite capture)
        </h3>
        <ul className="text-slate-600 space-y-2 text-sm list-disc pl-5">
          <li>
            <strong>Baseline remains visible</strong>: advisory competence never replaces the baseline result.
          </li>
          <li>
            <strong>Domain-bounded signals</strong>: no global “influence score” across unrelated topics.
          </li>
          <li>
            <strong>Transparent mappings</strong>: relevance rules are explicit and contestable.
          </li>
          <li>
            <strong>Audit + recourse</strong>: communities must be able to challenge errors and revise governance settings.
          </li>
          <li>
            <strong>Optionality</strong>: delegation and advisory views can be enabled/disabled by legitimate governance decisions.
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/initiatives/civic-governance/constitution"
            className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
          >
            Back to Constitution →
          </a>
          <a
            href="/initiatives/civic-governance/constitution/rights"
            className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
          >
            Rights & guarantees →
          </a>
        </div>
      </section>

      {/* Conclusion */}
      <div className="mt-16 p-8 bg-white border border-slate-200 rounded-xl">
        <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
          <Award className="w-6 h-6 mr-3 text-indigo-600" />
          Outcome
        </h3>
        <p className="text-slate-600 max-w-2xl">
          EkoH aims for higher-signal governance while keeping legitimacy intact: competence can be consulted,
          disagreements become visible, and the rules stay governable.
        </p>
      </div>
    </main>
  );
}
