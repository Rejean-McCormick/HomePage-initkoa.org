// app/platforms/konnaxion/kintsugi/page.tsx
import Link from 'next/link';
import {
  Layers,
  Link2,
  ShieldCheck,
  Cloud,
  Server,
  Workflow,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Kintsugi — Konnaxion',
  description:
    'Kintsugi is the “one roof” layer: an integrated experience where Konnaxion’s modules behave like one coherent civic utility across hosted, self-hosted, and hybrid deployments.',
};

type CardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tag?: string;
};

function Card({ title, description, href, icon, tag }: CardProps) {
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

export default function KonnaxionKintsugiPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
          <Layers className="w-4 h-4" />
          Konnaxion / Kintsugi
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-serif font-medium text-slate-900">
          Kintsugi: one roof, one product
        </h1>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          Kintsugi is the integration layer that makes Konnaxion feel like a single civic utility—across modules,
          across deployments, and across workflows. It is not “more features”; it is coherence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/platforms/konnaxion"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
          >
            Back to Konnaxion
          </Link>
          <Link
            href="/platforms/konnaxion/kompendio"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-slate-200 text-slate-800 hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            See Kompendio (Reference Layer)
          </Link>
        </div>
      </header>

      {/* What it unlocks */}
      <section className="mb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#1e6864]" />
              What Kintsugi unlocks for users
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>One identity and one navigation</strong> across learning, deliberation, decision, and build.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>One object model</strong>: credentials, proposals, decisions, projects, and artifacts fit together.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>One continuity chain</strong>: outcomes carry forward instead of being lost between tools and committees.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>One standard of accountability</strong>: what happened, why it happened, and what can be contested.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-2xl border border-slate-200 bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1e6864]" />
              What Kintsugi prevents
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Dual truth</strong>: competing records, conflicting dashboards, and “which spreadsheet is correct?”
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Tool fragmentation</strong>: separate logins, separate vocabularies, separate accountability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Institutional amnesia</strong>: decisions that cannot be replayed, audited, or learned from.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#1e6864]" />
                <span>
                  <strong>Locked-in dependency</strong>: when a community cannot migrate, self-host, or fork without collapse.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Deployment posture */}
      <section className="mb-14">
        <div className="p-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-[#1e6864]" />
            Same experience, different deployments
          </h2>
          <p className="text-slate-600 max-w-3xl">
            Kintsugi is designed so a community can run Konnaxion hosted, self-hosted, or in hybrid form—without
            becoming a different product each time.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Cloud className="w-5 h-5 text-[#1e6864]" />
                Hosted
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Fast onboarding and shared upgrades. Ideal for pilots and communities that want immediate capacity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Server className="w-5 h-5 text-[#1e6864]" />
                Self-host
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Strong autonomy and local control. Ideal for institutions with strict governance and sovereignty needs.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="w-5 h-5 text-[#1e6864]" />
                Hybrid
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Combine both: public surfaces where useful, local execution where required—without breaking workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where it shows up */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Where Kintsugi shows up</h2>
        <p className="text-slate-600 max-w-3xl mb-8">
          Kintsugi is not a separate product. It is the coherence layer applied to each module—so outputs move cleanly
          from one stage to the next.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title="KonnectED"
            tag="Competence"
            href="/platforms/konnaxion/konnected/kintsugi"
            icon={<ShieldCheck className="w-5 h-5 text-[#1e6864]" />}
            description="Unifies learning, validation, and credentials into a single, auditable competence loop."
          />
          <Card
            title="ethiKos"
            tag="Deliberation"
            href="/platforms/konnaxion/ethikos/kintsugi"
            icon={<Workflow className="w-5 h-5 text-[#1e6864]" />}
            description="Turns participation into structured outcomes that can be drafted, decided, and held accountable."
          />
          <Card
            title="Kollective Intelligence"
            tag="Decision Readings"
            href="/platforms/konnaxion/kollective-intelligence/kintsugi"
            icon={<Layers className="w-5 h-5 text-[#1e6864]" />}
            description="Presents decision readings in one place so legitimacy and quality can be compared transparently."
          />
          <Card
            title="keenKonnect"
            tag="Build"
            href="/platforms/konnaxion/keen-konnect/kintsugi"
            icon={<Link2 className="w-5 h-5 text-[#1e6864]" />}
            description="Connects decisions to execution workspaces and preserves outputs as durable, reusable artifacts."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Next: Kompendio</h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              If Kintsugi is the unified experience, Kompendio is the public reference layer: integration maps,
              versioned charts, and the documentation that keeps the ecosystem governable.
            </p>
          </div>
          <Link
            href="/platforms/konnaxion/kompendio"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-900 hover:border-slate-900 hover:shadow-sm transition-all"
          >
            Go to Kompendio <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
