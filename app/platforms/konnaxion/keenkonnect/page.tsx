// app/platforms/konnaxion/keenkonnect/page.tsx
import Link from 'next/link';
import {
  Hammer,
  Boxes,
  BookOpen,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Package,
  Link2,
} from 'lucide-react';

export const metadata = {
  title: 'keenKonnect — Konnaxion',
  description:
    'keenKonnect is the builder module of Konnaxion: turn decisions into projects, coordinate execution, and preserve outputs as durable, reusable artifacts.',
};

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tag?: string;
};

function FeatureCard({ title, description, href, icon, tag }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-[#1e6864] hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-[#1e6864]/30 group-hover:bg-[#1e6864]/5 transition-colors">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1e6864] transition-colors">
            {title}
          </h3>
        </div>
        {tag ? (
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-500">
            {tag}
          </span>
        ) : null}
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

      <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#1e6864]">
        Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default function KeenKonnectPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
          <Hammer className="w-4 h-4" />
          Konnaxion / keenKonnect
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-serif font-medium text-slate-900">
          keenKonnect: from decision to delivery
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          keenKonnect is the part of Konnaxion that helps people build. It turns approved intentions into coordinated
          work, and preserves outcomes so they can be reused, audited, and carried forward.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/platforms/konnaxion"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
          >
            Back to Konnaxion
          </Link>

          <Link
            href="/platforms/konnaxion/keenkonnect/kintsugi"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-slate-200 text-slate-800 hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            See Kintsugi (One Roof Layer)
          </Link>
        </div>
      </header>

      <section className="mb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-[#1e6864]" />
              What users can do with keenKonnect
            </h2>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  Turn a decision into a <strong>project</strong> with clear scope, roles, deliverables, and timelines.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  Coordinate execution with <strong>work routing</strong>, accountability, and closure signals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  Preserve outputs as <strong>versioned artifacts</strong> (so work survives turnover).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  Publish reference charts and dependency maps so others can <strong>reuse</strong> the work safely.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1e6864]" />
              The outputs it produces
            </h2>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Deliverables</strong>: documents, datasets, software, playbooks, templates, public reports.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Releases</strong>: packaged outputs you can distribute, audit, and version.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Provenance</strong>: what changed, why it changed, and who was responsible for the change.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Reference charts</strong>: versioned maps that explain dependencies and safe reuse.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Submodules</h2>
        <p className="text-slate-600 max-w-3xl mb-8">
          keenKonnect stays simple: execution, preservation, and reference. Each part is user-facing and outcome-driven.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Konstruct"
            tag="Execute"
            href="/platforms/konnaxion/keenkonnect/kintsugi"
            icon={<Hammer className="w-5 h-5 text-[#1e6864]" />}
            description="The build workspace: projects, roles, routing, and closure. Convert intent into coordinated action."
          />
          <FeatureCard
            title="Stockage"
            tag="Preserve"
            href="/platforms/konnaxion/keenkonnect/kintsugi"
            icon={<Boxes className="w-5 h-5 text-[#1e6864]" />}
            description="The artifact vault: versioned outputs, packaging, releases, and durable records of what was produced."
          />
          <FeatureCard
            title="Kompendio"
            tag="Reference"
            href="/platforms/konnaxion/keenkonnect/kompendio"
            icon={<BookOpen className="w-5 h-5 text-[#1e6864]" />}
            description="The guide layer: pinned charts, dependency maps, and integration references that keep projects reusable and governable."
          />
        </div>
      </section>

      <section className="mb-14">
        <div className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Link2 className="w-6 h-6 text-[#1e6864]" />
            How it connects inside Konnaxion
          </h2>
          <p className="text-slate-600 max-w-3xl">
            keenKonnect is most powerful when it is downstream of deliberation and upstream of preservation: decisions
            become projects; projects become artifacts; artifacts become reusable civic capacity.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900">Upstream</h3>
              <p className="mt-2 text-sm text-slate-600">
                Decisions and mandates created in deliberation can be instantiated as scoped projects, with explicit
                accountability and delivery expectations.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/platforms/konnaxion/ethikos"
                  className="text-sm font-semibold text-[#1e6864] hover:underline"
                >
                  ethiKos →
                </Link>
                <Link
                  href="/platforms/konnaxion/kollective-intelligence"
                  className="text-sm font-semibold text-[#1e6864] hover:underline"
                >
                  Kollective Intelligence →
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <h3 className="font-bold text-slate-900">Downstream</h3>
              <p className="mt-2 text-sm text-slate-600">
                Outputs and artifacts can be curated into shared commons, enabling safe reuse and long-term institutional
                memory.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/platforms/konnaxion/kompendio"
                  className="text-sm font-semibold text-[#1e6864] hover:underline"
                >
                  Kompendio →
                </Link>
                <Link
                  href="/platforms/konnaxion/modules"
                  className="text-sm font-semibold text-[#1e6864] hover:underline"
                >
                  Modules index →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Next: keenKonnect Kompendio</h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              Explore how reference charts, dependency maps, and pinned integration notes make projects governable and
              reusable over time.
            </p>
          </div>
          <Link
            href="/platforms/konnaxion/keenkonnect/kompendio"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-slate-900 hover:shadow-sm transition-all"
          >
            Go to keenKonnect Kompendio <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}