// app/platforms/konnaxion/kollective-intelligence/page.tsx
import Link from 'next/link';
import { Layers, Scale, Eye, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Kollective Intelligence — SmartVote + EkoH | Konnaxion',
  description:
    'Kollective Intelligence is Konnaxion’s decision-reading layer: it keeps the baseline visible while offering transparent quality lenses to improve decision reliability without breaking legitimacy.',
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
      {children}
    </span>
  );
}

function Status({ status }: { status: 'available' | 'tbd' }) {
  return status === 'available' ? (
    <span className="inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
      <CheckCircle2 className="w-4 h-4" />
      Available
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
      <Wrench className="w-4 h-4" />
      TBD
    </span>
  );
}

export default function KollectiveIntelligencePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-full mb-6">
          <Layers className="w-8 h-8 text-purple-700" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">Kollective Intelligence</h1>

        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kollective Intelligence is Konnaxion’s <strong>decision-reading layer</strong>.
          <br />
          It protects legitimacy by keeping the <strong>baseline</strong> visible, while also enabling
          <strong> transparent quality lenses</strong> that help communities make better decisions under complexity.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>SmartVote</Badge>
          <Badge>EkoH</Badge>
          <Badge>Multiple readings</Badge>
          <Badge>Explainable legitimacy</Badge>
        </div>
      </div>

      {/* What it does */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
            <Scale className="w-6 h-6 text-purple-700 mr-3" />
            What users get
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li>
              <strong>Baseline outcome stays visible:</strong> the default collective result is never hidden.
            </li>
            <li>
              <strong>Optional “quality readings”:</strong> show additional lenses that account for verified competence
              (or other explicitly-governed signals) without replacing the baseline.
            </li>
            <li>
              <strong>Decision clarity:</strong> rankings and outcomes become easier to explain, compare, and contest.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
            <Eye className="w-6 h-6 text-purple-700 mr-3" />
            The core idea: multiple readings
          </h2>
          <p className="text-slate-700 leading-relaxed">
            When decisions are high-stakes or technically complex, “pure popularity” can be fragile.
            Kollective Intelligence addresses this by presenting results in <strong>side-by-side readings</strong>:
            a baseline (raw) and one or more quality lenses (advisory).
          </p>
          <p className="text-slate-700 leading-relaxed mt-3">
            The goal is not to remove voice — it is to make decision quality and accountability visible.
          </p>
        </div>
      </section>

      {/* Pages in this module */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Pages in this module</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Kintsugi (Operate)</h3>
              <Status status="available" />
            </div>
            <p className="text-slate-700">
              The operational experience: how SmartVote and EkoH appear to users in Konnaxion.
              Focused on outcomes, legitimacy, and clarity — not implementation details.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/kollective-intelligence/kintsugi"
                className="text-purple-700 font-semibold hover:underline"
              >
                Open Kintsugi page →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Kompendio (Reference)</h3>
              <Status status="tbd" />
            </div>
            <p className="text-slate-700">
              TBD. This will be the publishable reference layer: standard definitions of lenses, reporting formats,
              and the “how to read results” charts that can be pinned to civic processes.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/kollective-intelligence/kompendio"
                className="text-purple-700 font-semibold hover:underline"
              >
                View placeholder page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Where it fits */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Where it fits in Konnaxion</h2>
        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
          <p className="text-slate-700 leading-relaxed">
            Kollective Intelligence is most powerful when paired with the rest of the ecosystem:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>
              <strong>Upstream:</strong> competence signals from learning/credentialing (when applicable) can support
              advisory lenses — explicitly governed.
            </li>
            <li>
              <strong>Process:</strong> deliberation workflows turn messy input into structured options before voting.
            </li>
            <li>
              <strong>Downstream:</strong> execution workspaces carry the chosen outcome into real projects and
              preserved outputs.
            </li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/platforms/konnaxion/modules"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-purple-300 hover:shadow-sm transition-all"
            >
              Browse all modules <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/platforms/konnaxion"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Back to Konnaxion <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Why this changes the world</h2>
        <p className="text-slate-700 max-w-3xl">
          Modern governance breaks when decisions become too complex for trust to scale.
          Kollective Intelligence adds a missing capability: a legitimate baseline plus transparent quality readings.
          It upgrades decision reliability without replacing citizen voice.
        </p>
      </section>
    </main>
  );
}
