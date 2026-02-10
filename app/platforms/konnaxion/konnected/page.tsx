// app/platforms/konnaxion/konnected/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'KonnectED — Competence & Credentials (Konnaxion)',
  description:
    'KonnectED is the competence module of Konnaxion: learn, practice, validate, and certify—so skills become portable, auditable, and usable for coordination and governance.',
};

export default function KonnectEDPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <Link
          href="/platforms/konnaxion"
          className="text-sm font-mono text-slate-500 hover:text-slate-900"
        >
          ← Back to Konnaxion
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-medium mt-6 mb-4 text-slate-900">
          KonnectED
        </h1>

        <h2 className="text-xl text-slate-500 font-light mb-8">
          Competence • Learning Loops • Portable Credentials
        </h2>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            KonnectED is the competence module of Konnaxion. It helps individuals and communities move from
            <strong> learning</strong> to <strong>validated capability</strong>—with outputs that can be reused for
            coordination, hiring, delegation, and governance without relying on unverifiable titles.
          </p>
          <p>
            The focus is not “content consumption.” The focus is a closed loop: learn → practice → evaluate → validate →
            certify → improve.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Competence is portable
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Credentials are auditable
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Validation is explicit
          </span>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* WHAT IT DOES */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What KonnectED enables</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-200 rounded-lg bg-white">
              <h3 className="font-bold text-slate-900 mb-2">Learning paths with outcomes</h3>
              <p className="text-sm text-slate-600">
                Structured learning journeys designed around measurable capabilities—not just attendance or completion.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg bg-white">
              <h3 className="font-bold text-slate-900 mb-2">Evaluation and validation</h3>
              <p className="text-sm text-slate-600">
                Assessments, peer review, and evidence-based validation—so claims of skill can be inspected and trusted.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg bg-white">
              <h3 className="font-bold text-slate-900 mb-2">Portable credentials</h3>
              <p className="text-sm text-slate-600">
                Credentials that can move across contexts (education, work, civic roles) without being trapped inside a
                single platform.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg bg-white">
              <h3 className="font-bold text-slate-900 mb-2">Competence as an input to coordination</h3>
              <p className="text-sm text-slate-600">
                When a process requires expertise, competence signals can inform delegation and review—without turning
                governance into opaque technocracy.
              </p>
            </div>
          </div>
        </section>

        {/* TWO LAYERS */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Two layers</h2>
          <p className="text-slate-600 mb-8">
            KonnectED is expressed through two layers: <strong>Kintsugi</strong> (operate) and <strong>Kompendio</strong>{' '}
            (reference).
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/platforms/konnaxion/konnected/kintsugi"
              className="group block p-8 border border-slate-200 rounded-xl hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="text-xs font-mono text-slate-500 mb-2">Operate</div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:underline">
                Kintsugi
              </h3>
              <p className="text-slate-600 mt-3">
                The integrated user experience: learning paths, evaluations, validation, and credential issuance under
                one roof.
              </p>
              <div className="mt-6 text-sm font-bold text-primary">Open Kintsugi →</div>
            </Link>

            <Link
              href="/platforms/konnaxion/konnected/kompendio"
              className="group block p-8 border border-slate-200 rounded-xl hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="text-xs font-mono text-slate-500 mb-2">Reference</div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:underline">
                Kompendio
              </h3>
              <p className="text-slate-600 mt-3">
                The reference layer: standards, mappings, and charts that make competence portable, interoperable, and
                governable.
              </p>
              <div className="mt-6 text-sm font-bold text-primary">Open Kompendio →</div>
            </Link>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why it changes outcomes</h2>
          <ul className="space-y-3 text-slate-700">
            <li>
              <strong>Less “credential theater”:</strong> focus shifts from titles to demonstrable capability.
            </li>
            <li>
              <strong>More legitimate delegation:</strong> expertise can be recognized and reviewed transparently.
            </li>
            <li>
              <strong>Stronger continuity:</strong> knowledge and competence don’t disappear when people leave.
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}
