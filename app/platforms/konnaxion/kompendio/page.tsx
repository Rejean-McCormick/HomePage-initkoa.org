// app/platforms/konnaxion/kompendio/page.tsx
import Link from 'next/link';
import { BookOpen, Map, Layers, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Kompendio — Reference & Integration Layer | Konnaxion',
  description:
    'Kompendio is Konnaxion’s reference and integration layer: a versioned, publishable repertory of standards, maps, and “how things connect” charts that keeps the ecosystem governable.',
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
      {children}
    </span>
  );
}

function Status({ status }: { status: 'available' | 'tbd' }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="w-4 h-4" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
      <Wrench className="w-4 h-4" />
      TBD
    </span>
  );
}

export default function KonnaxionKompendioPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full mb-6">
          <BookOpen className="w-8 h-8 text-indigo-700" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">Kompendio</h1>

        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kompendio is the <strong>reference & integration layer</strong> of Konnaxion: a publishable repertory of
          standards, maps, and versioned “how things connect” charts.
          <br />
          It exists to keep the ecosystem <strong>governable</strong>—so people can understand dependencies, reuse
          proven components, and avoid reinventing everything every time.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>Reference</Badge>
          <Badge>Integration maps</Badge>
          <Badge>Versioned charts</Badge>
          <Badge>Portable knowledge</Badge>
          <Badge>Governable ecosystem</Badge>
        </div>
      </div>

      {/* What it does */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Map className="w-6 h-6 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">What Kompendio does</h2>
          </div>
          <ul className="mt-3 space-y-3 text-slate-700">
            <li>
              <strong>Makes the ecosystem legible:</strong> what exists, what depends on what, and what standards are
              used.
            </li>
            <li>
              <strong>Publishes stable “reference stacks”:</strong> so teams can align on shared building blocks.
            </li>
            <li>
              <strong>Creates versioned charts you can pin to projects:</strong> so a project always has an explicit,
              inspectable foundation.
            </li>
            <li>
              <strong>Supports portability:</strong> by making integrations explicit and repeatable.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-6 h-6 text-indigo-700" />
            <h2 className="text-xl font-bold text-slate-900">Kompendio vs Kintsugi</h2>
          </div>
          <p className="text-slate-700 leading-relaxed mt-3">
            <strong>Kintsugi</strong> is the “one-roof” integration experience (how modules behave like one product).
            <br />
            <strong>Kompendio</strong> is the “reference and maps” layer (how modules remain understandable, auditable,
            and composable over time).
          </p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <Link
              href="/platforms/konnaxion/kintsugi"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-indigo-400 hover:shadow-sm transition-all"
            >
              Explore Kintsugi <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/platforms/konnaxion/modules"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-indigo-400 hover:shadow-sm transition-all"
            >
              Browse modules <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Where it exists today */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Where Kompendio exists today</h2>
        <p className="text-slate-600 mb-6 max-w-3xl">
          Kompendio is being defined per module. Some parts are already documented; others are explicitly marked as
          <strong> TBD</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">KonnectED</h3>
              <Status status="tbd" />
            </div>
            <p className="text-slate-700">
              Competence, credentials, and the public learning layer. The module is public, but its dedicated
              Kompendio reference pack is not yet shipped as a standalone page.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/konnected"
                className="text-indigo-700 font-semibold hover:underline"
              >
                Explore KonnectED →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">keenKonnect — Kompendio</h3>
              <Status status="available" />
            </div>
            <p className="text-slate-700">
              Reference stacks and charts that can be pinned to projects so teams share the same explicit foundation.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/keenkonnect/kompendio"
                className="text-indigo-700 font-semibold hover:underline"
              >
                Open keenKonnect Kompendio →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">ethiKos — Kompendio</h3>
              <Status status="tbd" />
            </div>
            <p className="text-slate-700">
              The module has a clear deliberation workflow, but the Kompendio reference layer is not yet defined as a
              complete, standalone artifact. When it exists, it will publish versioned “how deliberation works” maps.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/ethikos/kompendio"
                className="text-indigo-700 font-semibold hover:underline"
              >
                View placeholder page →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Kollective Intelligence</h3>
              <Status status="tbd" />
            </div>
            <p className="text-slate-700">
              SmartVote and EkoH are defined operationally, but a dedicated Kompendio reference layer (maps, standards,
              published lenses) is not yet shipped as its own module document.
            </p>
            <div className="mt-4">
              <Link
                href="/platforms/konnaxion/kollective-intelligence"
                className="text-indigo-700 font-semibold hover:underline"
              >
                Explore module →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Use Kompendio the right way</h2>
        <p className="text-slate-700 max-w-3xl mb-6">
          Kompendio is not “docs for developers.” It is the civic engineering equivalent of a public ledger:
          publishable maps that make systems inspectable, reusable, and contestable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/platforms/konnaxion"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-indigo-400 hover:shadow-sm transition-all"
          >
            Back to Konnaxion <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/platforms/konnaxion/modules"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Explore modules <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}