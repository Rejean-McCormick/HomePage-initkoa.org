// app/initiatives/civic-governance/constitution/rights/page.tsx
import { Shield, Eye, EyeOff, LogOut, BookOpen, Key, GitPullRequest } from 'lucide-react';

export const metadata = {
  title: 'The Bill of Rights – kOA',
  description:
    'Privacy for people, transparency for power, auditability of decisions, and the right to exit (portability + forkability).',
};

export default function BillOfRightsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 px-6 py-12 selection:bg-emerald-500 selection:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-emerald-900/50 border border-emerald-500/30 rounded-full">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">The Civic Bill of Rights</h1>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed">
            In kOA, rights are not marketing promises. They are{' '}
            <strong>design constraints</strong>: enforced through governance rules, audit trails, and system defaults
            that make violations visible, contestable, and correctable.
          </p>
        </div>

        {/* Article 1: Privacy / Transparency */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <span className="text-sm font-bold bg-white text-slate-900 px-3 py-1 rounded mr-4">ARTICLE I</span>
            <h2 className="text-2xl font-bold text-white">Privacy for People, Transparency for Power</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Person */}
            <div className="p-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4 text-emerald-400">
                <EyeOff className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Privacy of the Person</h3>
              </div>

              <p className="text-slate-300 mb-4">
                <strong>Default: private.</strong>
                <br />
                Personal data is protected by encryption and minimal disclosure. Access requires explicit authorization,
                scoped purpose, and time limits—so “collect it all and decide later” is structurally discouraged.
              </p>

              <ul className="text-sm text-slate-400 space-y-2 mb-5">
                <li>• Minimization: collect only what is necessary</li>
                <li>• Purpose limitation: access must be justified</li>
                <li>• Compartmentalization: reduce blast radius</li>
                <li>• Revocation: permissions can expire and be withdrawn</li>
              </ul>

              <div className="text-xs bg-emerald-900/30 text-emerald-300 p-2 rounded border border-emerald-800 font-mono">
                Default: PRIVATE
              </div>
            </div>

            {/* The Institution */}
            <div className="p-8 bg-slate-950 border border-slate-800 text-white rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 text-blue-400">
                <Eye className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Transparency of Institutions</h3>
              </div>

              <p className="text-slate-400 mb-4">
                <strong>Default: accountable.</strong>
                <br />
                Public power must be legible. Decisions, budgets, procurement, and rule changes should be recorded with
                provenance (who/what/why) so the public can audit outcomes and detect capture.
              </p>

              <ul className="text-sm text-slate-500 space-y-2 mb-5">
                <li>• Public decision trails (inputs → process → outputs)</li>
                <li>• Procurement & spending transparency (with legitimate redactions when needed)</li>
                <li>• Change logs for rules and policies</li>
                <li>• Traceable responsibility (who approved, who executed)</li>
              </ul>

              <div className="text-xs bg-slate-900 text-slate-500 p-2 rounded border border-slate-800 font-mono">
                Default: AUDITABLE
              </div>
            </div>
          </div>
        </section>

        {/* Article 2: The Right to Exit */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <span className="text-sm font-bold bg-white text-slate-900 px-3 py-1 rounded mr-4">ARTICLE II</span>
            <h2 className="text-2xl font-bold text-white">The Right to Exit (Portability & Forkability)</h2>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
            <LogOut className="absolute top-8 right-8 w-24 h-24 text-slate-700 -z-0 opacity-50" />

            <div className="relative z-10">
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                The ultimate check on domination is the ability to leave. In kOA, exit must be realistic: your identity,
                records, and verifiable history cannot be held hostage by a single operator.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 p-1 bg-blue-900/40 rounded text-blue-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Portability</h4>
                    <p className="text-sm text-slate-400">
                      You can export your data, credentials, and participation history in standard formats. No platform
                      lock-in; no “start over from zero” penalty.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="mt-1 mr-3 p-1 bg-purple-900/40 rounded text-purple-400">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Forkability</h4>
                    <p className="text-sm text-slate-400">
                      If governance becomes captured or legitimacy collapses, communities can replicate the open
                      infrastructure and continue under new rules—while preserving verifiable records and continuity.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Article 3: Right to Competence */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <span className="text-sm font-bold bg-white text-slate-900 px-3 py-1 rounded mr-4">ARTICLE III</span>
            <h2 className="text-2xl font-bold text-white">The Right to Competence</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-950/30 border border-blue-900/50 rounded-2xl p-8">
            <BookOpen className="w-16 h-16 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">Capability is a prerequisite for legitimacy</h3>
              <p className="text-slate-300 leading-relaxed">
                A civic system cannot demand good judgment while denying people the means to learn. kOA treats education
                infrastructure—curricula, tools, verification, and multilingual access—as a public capability that
                supports competent participation and responsible governance.
              </p>
            </div>
          </div>
        </section>

        {/* Article 4: Right to Audit & Recourse */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <span className="text-sm font-bold bg-white text-slate-900 px-3 py-1 rounded mr-4">ARTICLE IV</span>
            <h2 className="text-2xl font-bold text-white">The Right to Audit & Recourse</h2>
          </div>

          <div className="p-8 bg-slate-800 border border-slate-700 rounded-2xl">
            <p className="text-slate-300 mb-5 leading-relaxed">
              People must be able to challenge outcomes. kOA requires that important decisions are traceable and that
              there are correction pathways when evidence changes, errors are found, or power is abused.
            </p>

            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Explainability: show how inputs produced the outcome (rules, weighting, provenance)</li>
              <li>• Contestability: structured objections and counter-evidence can be filed</li>
              <li>• Due process: time windows, roles, and thresholds are explicit</li>
              <li>• Repair mechanisms: reversals, amendments, or restitution where appropriate</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
