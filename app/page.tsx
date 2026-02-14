// app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "kOA — Governable Knowledge-to-Action Infrastructure (Réjean McCormick)",
  description:
    "kOA is a knowledge-to-action initiative: a sociotechnical operating system (the operational spine), a knowledge platform (Konnaxion), and a narrative bridge (King Klown) plus metaphysics and politics as distinct corridors.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1e6864] selection:text-white">
      {/* HERO */}
      <section className="pt-28 pb-14 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 tracking-tight text-slate-900">
            kOA
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mb-8 leading-relaxed font-light">
            A <strong className="text-slate-900 font-semibold">governable knowledge-to-action initiative</strong> for
            civic life:
            <br />
            shared infrastructure that turns <strong>knowledge</strong> into{" "}
            <strong>legitimate decisions</strong>, <strong>executed action</strong>, and{" "}
            <strong>durable public memory</strong>.
          </p>

          <p className="text-base md:text-lg text-slate-500 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            The foundation is a <strong className="text-slate-900 font-semibold">Sociotechnical Operating System</strong>{" "}
            (the operational spine). kOA also includes{" "}
            <strong className="text-slate-900 font-semibold">Konnaxion</strong> (the knowledge platform) and{" "}
            <strong className="text-slate-900 font-semibold">King Klown</strong> (a narrative bridge that illustrates
            the system and explores scenario-based futures—extrapolation, not prophecy). Metaphysics and politics are
            part of kOA as additional corridors for meaning and deployment, but they are not part of the OS runtime.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/why"
              className="px-8 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-[#1e6864] transition-colors duration-300 min-w-[220px]"
            >
              Start with the problem
            </Link>
            <Link
              href="/initiatives"
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[220px]"
            >
              Explore the initiative
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Pill>Offline-capable</Pill>
            <Pill>Fail-closed integrity</Pill>
            <Pill>Auditability by default</Pill>
            <Pill>Determinism where required</Pill>
            <Pill>Non-domination</Pill>
            <Pill>Narrative bridge</Pill>
            <Pill>Scenario futures</Pill>
          </div>
        </div>
      </section>

      {/* MAP / AT A GLANCE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="At a glance"
            title="kOA is one initiative, with clear layers and boundary rules."
            subtitle="Some parts intersect (stories can illustrate the platform), and some parts explicitly do not (fiction does not define the runtime)."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Card title="Operational spine (Sociotechnical OS)">
              <p className="text-slate-600 leading-relaxed">
                The enforceable layer: roles, protocols, decision rights, integrity gates, and auditability—designed to
                convert knowledge → deliberation → decisions → execution → institutional memory.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Governability over hype</li>
                <li>• Explicit rules over invisible authority</li>
                <li>• Evidence trails over vibes</li>
              </ul>
            </Card>

            <Card title="Konnaxion (knowledge platform)">
              <p className="text-slate-600 leading-relaxed">
                The platform layer that operationalizes the spine: spaces for compiling knowledge artifacts, mapping
                issues, coordinating work, deliberating, and publishing results as reusable public memory.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                This is where technical documentation lives: modules, workflows, schemas, and governance primitives that
                can actually be implemented.
              </p>
            </Card>

            <Card title="King Klown (narrative bridge)">
              <p className="text-slate-600 leading-relaxed">
                A communication tool for kOA: mythos, characters, and backstories that make complex governance legible,
                memorable, and emotionally accessible—without claiming prophecy.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Illustrates how the system works (examples, dilemmas, consequences)</li>
                <li>• Explores plausible futures (scenario thinking, not prediction)</li>
                <li>• Invites participation without demanding technical literacy</li>
              </ul>
            </Card>

            <Card title="Corridors: metaphysics + politics">
              <p className="text-slate-600 leading-relaxed">
                These are kOA corridors—ways people enter, interpret, and deploy the initiative.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>
                  • <span className="text-slate-800 font-medium">Metaphysics:</span> meaning, language, symbol, inner
                  transformation (why stories matter).
                </li>
                <li>
                  • <span className="text-slate-800 font-medium">Politics:</span> institutional pilots, policy
                  alignment, real-world strategy (where the OS gets tested).
                </li>
              </ul>
              <p className="mt-4 text-slate-600 leading-relaxed">
                They influence direction and adoption, but they do not replace the runtime rules.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* INTERSECTIONS */}
      <section className="bg-slate-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="How the parts intersect"
              title="The same system can be described in code, in governance, or in story."
              subtitle="kOA is built so different audiences can enter through different corridors, while the operational spine remains consistent."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <Card title="Tech → Story">
                <p className="text-slate-600 leading-relaxed">
                  Konnaxion’s mechanisms and governance primitives become plot material: dilemmas, tradeoffs, failure
                  modes, and “what happens if…” scenes that teach the logic without a manual.
                </p>
              </Card>

              <Card title="Story → Adoption">
                <p className="text-slate-600 leading-relaxed">
                  King Klown lowers the entry barrier: it invites curiosity, provides shared language, and makes the
                  system culturally transmissible—so people can understand before they implement.
                </p>
              </Card>

              <Card title="Politics → Deployment">
                <p className="text-slate-600 leading-relaxed">
                  Political and institutional contexts become testbeds: the OS is validated when it survives real
                  constraints—conflict, incentives, audits, and accountability.
                </p>
              </Card>
            </div>

            <div className="mt-10 rounded-md border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-slate-900">The central conversion loop</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                kOA’s spine is the repeatable loop that matters, regardless of corridor:
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
                <Step label="1" title="Compile">
                  Build verifiable knowledge artifacts with provenance.
                </Step>
                <Step label="2" title="Deliberate">
                  Make disagreements legible; surface tradeoffs and constraints.
                </Step>
                <Step label="3" title="Decide">
                  Produce legitimate decisions with clear authority boundaries.
                </Step>
                <Step label="4" title="Execute">
                  Convert decisions into coordinated action with accountability.
                </Step>
                <Step label="5" title="Remember">
                  Preserve results as durable public memory (reusable, auditable).
                </Step>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOUNDARIES / EXCLUSIONS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="Boundaries (where it excludes)"
            title="kOA keeps narrative power and operational authority separate."
            subtitle="This is the safety mechanism: stories can teach and motivate, but they do not become governance reality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Card title="Allowed intersections">
              <ul className="space-y-3 text-slate-600 leading-relaxed">
                <li>
                  • <span className="text-slate-800 font-medium">Konnaxion appears in stories:</span> illustrated
                  examples, origin arcs, and scenario futures.
                </li>
                <li>
                  • <span className="text-slate-800 font-medium">Metaphysics informs meaning:</span> language and symbols
                  help people orient and commit.
                </li>
                <li>
                  • <span className="text-slate-800 font-medium">Politics enables pilots:</span> real institutions test
                  whether the spine is governable under pressure.
                </li>
              </ul>
            </Card>

            <Card title="Hard exclusions (non-negotiable)">
              <ul className="space-y-3 text-slate-600 leading-relaxed">
                <li>
                  • <span className="text-slate-800 font-medium">King Klown is not inside Konnaxion:</span> it is not a
                  runtime dependency, not a protocol source, not a spec.
                </li>
                <li>
                  • <span className="text-slate-800 font-medium">Fiction does not define governance:</span> operational
                  rules must remain explicit, auditable, and contestable.
                </li>
                <li>
                  • <span className="text-slate-800 font-medium">No prophecy:</span> futures are explored as scenarios
                  and extrapolations, not mystical prediction.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CURRENT STATE */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="Current state"
              title="From ether to here."
              subtitle="So far, much of what’s public is foundation: backstories, language, and architecture. The operational spine is being documented and built alongside it."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <Card title="If you want the why">
                <p className="text-slate-600 leading-relaxed">
                  Start with the failure mode: why modern institutions convert knowledge into noise, incentives into
                  capture, and decisions into unaccountable execution.
                </p>
                <div className="mt-5">
                  <Link
                    href="/why"
                    className="inline-block px-5 py-2 bg-slate-900 text-white rounded-sm font-medium hover:bg-[#1e6864] transition-colors duration-300"
                  >
                    Read the problem statement
                  </Link>
                </div>
              </Card>

              <Card title="If you want the map">
                <p className="text-slate-600 leading-relaxed">
                  Explore the initiative as a system: layers, modules, corridors, and the boundary rules that prevent
                  narrative power from becoming invisible authority.
                </p>
                <div className="mt-5">
                  <Link
                    href="/initiatives"
                    className="inline-block px-5 py-2 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                  >
                    Explore the system
                  </Link>
                </div>
              </Card>

              <Card title="If you want to contribute">
                <p className="text-slate-600 leading-relaxed">
                  Contributions can happen at multiple layers: technical primitives, governance rules, documentation,
                  scenario writing, or institutional pilot design.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  The requirement is the same: keep the spine explicit; keep the narrative a bridge.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- SMALL UI PRIMITIVES ---------- */

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-500 bg-white">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header>
      <p className="text-xs uppercase tracking-widest text-slate-400">{eyebrow}</p>
      <h2 className="mt-3 text-2xl md:text-3xl font-serif font-medium text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">{subtitle}</p>
      ) : null}
    </header>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Step({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-medium">
          {label}
        </span>
        <div className="font-medium text-slate-900">{title}</div>
      </div>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{children}</p>
    </div>
  );
}
