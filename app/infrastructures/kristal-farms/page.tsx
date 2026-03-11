// app/infrastructures/kristal-farms/page.tsx
import Link from "next/link";
import {
  Snowflake,
  Flame,
  Server,
  Wifi,
  ArrowRight,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Anchor,
} from "lucide-react";

export const metadata = {
  title: "Kristal Farms — Heat-first compute infrastructure",
  description:
    "Cold-climate, hydro-powered compute placed in the village: export data by fiber, recycle waste heat into community heating and food.",
};

export default function KristalFarmsHub() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO */}
      <section className="bg-[#1e6864] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Kristal Farms
            </h1>

            <p className="text-2xl md:text-3xl text-teal-100 font-light mb-8">
              Compute for the world. <br />
              Heat for the village.
            </p>

            <p className="text-lg text-teal-50/90 mb-10 max-w-2xl leading-relaxed">
              Kristal Farms is an infrastructure pattern: place modular compute
              next to renewable hydro in cold climates, export results by
              fiber, and treat waste heat as a local public resource—heating
              buildings and supporting greenhouse food production.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/infrastructures/kristal-farms/overview"
                className="bg-white hover:bg-teal-50 text-[#1e6864] font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                Read overview <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#explore"
                className="bg-[#144a47] hover:bg-[#0f3836] text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                Explore the system <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/infrastructures/kristal-farms/go-no-go"
                className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg transition-all border border-white/30 flex items-center gap-2"
              >
                Go / No-Go checklist <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm text-teal-50/90">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 mt-0.5 text-teal-100" />
                <span>
                  <strong>Heat-first operations:</strong> reuse → store → reject.
                  Community heat needs come first.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 mt-0.5 text-teal-100" />
                <span>
                  <strong>Black-box tenancy:</strong> tenants keep data private;
                  operators manage only infrastructure.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Wifi className="w-5 h-5 mt-0.5 text-teal-100" />
                <span>
                  <strong>Export by fiber:</strong> ship computation as data,
                  not electricity as transmission lines.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Anchor className="w-5 h-5 mt-0.5 text-teal-100" />
                <span>
                  <strong>Reversible footprint:</strong> modular pads designed
                  to be removed and the site restored.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT DELIVERS */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What Kristal Farms delivers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            This isn’t a “data center theme.” It’s a package of outcomes:
            reliable compute capacity, local heat security, improved
            connectivity, and a governance model designed for legitimacy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            icon={<Server className="w-5 h-5 text-[#1e6864]" />}
            title="Compute capacity (modular)"
            desc="Plug-ready pads leased to tenants. Capacity scales in phases without rebuilding the whole site."
          />
          <Card
            icon={<Flame className="w-5 h-5 text-[#1e6864]" />}
            title="District heat + greenhouse support"
            desc="Waste heat becomes a local service: building heat and food security instead of heat rejection."
          />
          <Card
            icon={<Snowflake className="w-5 h-5 text-[#1e6864]" />}
            title="Cold-climate efficiency"
            desc="Use natural cold and closed-loop heat exchange to reduce cooling overhead and improve reliability."
          />
          <Card
            icon={<Wifi className="w-5 h-5 text-[#1e6864]" />}
            title="Fiber connectivity for the community"
            desc="A fiber trunk and local feeder links can also connect clinics, schools, and public services."
          />
          <Card
            icon={<ShieldCheck className="w-5 h-5 text-[#1e6864]" />}
            title="Privacy-safe hosting (black-box tenancy)"
            desc="Operators deliver utilities and physical security—without inspecting tenant models, data, or packets."
          />
          <Card
            icon={<TrendingUp className="w-5 h-5 text-[#1e6864]" />}
            title="Public accountability"
            desc="A dashboard approach: publish operational indicators and community benefit metrics in a legible way."
          />
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            A simple mental model
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-sm text-slate-700">
            <Step
              n="1"
              title="Hydro → village"
              desc="Use a short local feed instead of building long transmission."
            />
            <Step
              n="2"
              title="Pads run compute"
              desc="Tenants operate inside the pad; host stays outside the box."
            />
            <Step
              n="3"
              title="Heat becomes service"
              desc="Capture heat for buildings and storage, then reject only if needed."
            />
            <Step
              n="4"
              title="Fiber exports results"
              desc="Move computation as data; reserve capacity for local services."
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-600">
          Kristal Farms can also host community knowledge programs (e.g., a
          Kristal publishing workflow).{" "}
          <Link
            href="/technology/kristal"
            className="text-[#1e6864] font-mono hover:underline"
          >
            See Kristal →
          </Link>
        </div>
      </section>

      {/* EXPLORE */}
      <section
        id="explore"
        className="bg-slate-50 py-20 border-t border-slate-200"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Explore the system
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl">
                Each page is written as “what it does and why it matters,” with
                implementation details only where they clarify guarantees.
              </p>
            </div>

            <Link
              href="/infrastructures/kristal-farms/faq"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 transition-colors text-slate-800 font-bold"
            >
              FAQ <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ExploreCard
              href="/infrastructures/kristal-farms/overview"
              icon={<Server className="w-8 h-8" />}
              title="Overview"
              desc="What Kristal Farms is, what it provides, and how the pieces fit together."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/why-this-exists"
              icon={<Leaf className="w-8 h-8" />}
              title="Why this exists"
              desc="The problem it targets: cost, resilience, energy waste, and legitimacy."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/heat-first-design"
              icon={<Flame className="w-8 h-8" />}
              title="Heat-first design"
              desc="Reuse → store → reject, and what “heat as a public resource” means in practice."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/power-and-grid"
              icon={<Anchor className="w-8 h-8" />}
              title="Power & grid"
              desc="Village-sited power handoff, staged scaling, and why this avoids long HV buildouts."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/cooling-and-water"
              icon={<Snowflake className="w-8 h-8" />}
              title="Cooling & water"
              desc="Closed-loop cooling, non-contact exchange, and environmental compliance."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/fiber-and-network"
              icon={<Wifi className="w-8 h-8" />}
              title="Fiber & network"
              desc="Export compute by fiber, reserve capacity for community services, and keep traffic isolated."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/tenancy-model"
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Tenancy model"
              desc="Black-box tenancy, what the host can/cannot see, and why this matters for privacy."
            />
            <ExploreCard
              href="/infrastructures/kristal-farms/governance"
              icon={<TrendingUp className="w-8 h-8" />}
              title="Governance & accountability"
              desc="Committees, decision boundaries, and the public dashboard approach."
            />
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <MiniLink
              href="/infrastructures/kristal-farms/metrics-and-dashboard"
              label="Metrics & dashboard"
            />
            <MiniLink
              href="/infrastructures/kristal-farms/phasing"
              label="Phasing"
            />
            <MiniLink
              href="/infrastructures/kristal-farms/reversibility"
              label="Reversibility"
            />
          </div>

          <div className="mt-16">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Strategic extensions
              </h3>
              <p className="text-slate-600 mt-2 max-w-2xl">
                These pages cover adjacent questions that deserve direct entry
                points from the main Kristal Farms hub.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ExploreCard
                href="/infrastructures/kristal-farms/ecology"
                icon={<Leaf className="w-8 h-8" />}
                title="Ecology"
                desc="Wetlands, habitat stewardship, thermal impacts, and how the site stays legible to environmental review."
              />
              <ExploreCard
                href="/infrastructures/kristal-farms/infrastructure"
                icon={<Server className="w-8 h-8" />}
                title="Infrastructure"
                desc="Pads, utilities, service boundaries, and the physical architecture that makes the model deployable."
              />
              <ExploreCard
                href="/infrastructures/kristal-farms/nain"
                icon={<Anchor className="w-8 h-8" />}
                title="Project Nain"
                desc="A Labrador pilot framing: why this model fits the geography, energy context, and local public-interest case."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-[#1e6864]/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-mono text-slate-500 mb-2">Step {n}</div>
      <div className="font-bold text-slate-900 mb-1">{title}</div>
      <div className="text-slate-700">{desc}</div>
    </div>
  );
}

function ExploreCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#1e6864] transition-all hover:shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-[#1e6864]/10 transition-colors text-slate-700 group-hover:text-[#1e6864]">
          {icon}
        </div>
        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-[#1e6864]" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </Link>
  );
}

function MiniLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-slate-200 px-5 py-4 hover:border-[#1e6864] hover:shadow-md transition-all flex items-center justify-between"
    >
      <span className="font-bold text-slate-900">{label}</span>
      <ArrowRight className="w-5 h-5 text-slate-300" />
    </Link>
  );
}