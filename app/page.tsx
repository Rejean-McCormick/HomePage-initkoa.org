// app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "kOA — Governable Knowledge-to-Action Infrastructure (Réjean McCormick)",
  description:
    "kOA is shared civic infrastructure for turning knowledge into deliberation, legitimate decisions, coordinated execution, and durable public memory.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1e6864] selection:text-white">
      {/* HERO / INTRODUCTION */}
      <section className="pt-28 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-slate-600">
              Civic utilities for a fragmented world
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-medium mt-6 mb-8 tracking-tight text-slate-900">
              kOA
            </h1>

            <p className="text-2xl md:text-4xl text-slate-900 max-w-5xl mx-auto mb-6 leading-tight font-serif">
              Shared infrastructure for turning knowledge into coordinated action.
            </p>

            <p className="text-lg md:text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-light">
              kOA is a knowledge-to-action initiative for civic life, institutional coordination,
              and collaborative empowerment. It is designed to help communities and organizations
              turn <strong className="text-slate-900 font-semibold">knowledge</strong> into{" "}
              <strong className="text-slate-900 font-semibold">deliberation</strong>,{" "}
              <strong className="text-slate-900 font-semibold">legitimate decisions</strong>,{" "}
              <strong className="text-slate-900 font-semibold">coordinated execution</strong>, and{" "}
              <strong className="text-slate-900 font-semibold">durable public memory</strong>.
            </p>

            <p className="text-base md:text-lg text-slate-600 max-w-4xl mx-auto mt-6 leading-relaxed">
              It begins from a simple diagnosis: modern societies generate enormous volumes of
              information, expertise, reports, testimony, and analysis, yet repeatedly fail to
              convert them into coherent, accountable, and timely action. Knowledge remains siloed.
              Deliberation degrades into noise. Decisions become opaque. Execution drifts. Memory
              disappears. kOA exists to close that loop.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              title="Structured knowledge"
              body="Move beyond scattered documents and disconnected expertise. kOA treats knowledge as infrastructure: portable, verifiable, reusable, and linked to provenance."
            />
            <FeatureCard
              title="Legitimate decisions"
              body="Make procedures, tradeoffs, and decision readings visible. Outcomes should be understandable, contestable, and grounded in explicit rules rather than hidden authority."
            />
            <FeatureCard
              title="Execution with memory"
              body="Turn decisions into accountable work, escalation paths, closure, and institutional learning — so civic energy does not vanish between discussion and follow-through."
            />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/why"
              className="px-8 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-[#1e6864] transition-colors duration-300 min-w-[220px] text-center"
            >
              Start with the problem
            </Link>
            <Link
              href="/platforms"
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[220px] text-center"
            >
              Explore the platforms
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Pill>Governable infrastructure</Pill>
            <Pill>Knowledge → action loop</Pill>
            <Pill>Visible rules</Pill>
            <Pill>Inspectable decisions</Pill>
            <Pill>Offline-capable resilience</Pill>
            <Pill>Durable public memory</Pill>
            <Pill>System of systems</Pill>
            <Pill>Collaborative empowerment</Pill>
          </div>
        </div>
      </section>

      {/* WHY KOA */}
      <section className="px-6 py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              Why this exists
            </h2>
          </div>

          <div className="lg:col-span-8 text-slate-600 text-lg leading-relaxed space-y-5">
            <p>
              We live in a paradox: information is abundant, but our ability to turn knowledge into
              coordinated action remains weak. Expertise is fragmented across disciplines,
              institutions, languages, and platforms. Public participation too often ends as
              commentary instead of outcomes. Once issues reach the stage of real implementation —
              budgets, timelines, responsibilities, escalation, closure — momentum evaporates.
            </p>

            <p>
              kOA is designed as an answer to that structural failure. It does not begin by asking
              how to generate more content, more engagement, or more centralized control. It asks a
              different question: what kind of civic and organizational infrastructure is required
              if knowledge is to become trustworthy enough to act on, deliberation is to remain
              legitimate, execution is to remain accountable, and memory is to remain durable across
              time?
            </p>

            <p>
              The ambition is not only technological. It is social and institutional. kOA aims to
              support shared reference points without erasing pluralism: what is known, what remains
              uncertain, what tradeoffs are real, what has been decided, what is being executed, and
              what must be learned from the results.
            </p>
          </div>
        </div>
      </section>

      {/* OPERATING LOOP */}
      <section className="px-6 py-16 border-b border-gray-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
              The operating loop
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              kOA is built as a closed civic pipeline. It is meant to carry work from the moment a
              problem enters the system to the moment a community can look back and understand what
              was believed, what was decided, what was done, and what happened next.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <FlowStep
              number="01"
              title="Knowledge ingestion"
              body="Sources, reports, data, testimony, and lived experience enter the system as structured inputs rather than disappearing into informal piles."
            />
            <FlowStep
              number="02"
              title="Kristal compilation"
              body="Claims are validated, linked to provenance, structured semantically, versioned, and prepared as portable knowledge artifacts."
            />
            <FlowStep
              number="03"
              title="Deliberation"
              body="Disagreement is organized into legible argument, consultation, synthesis, and drafting instead of endless threads and rhetorical collapse."
            />
            <FlowStep
              number="04"
              title="Decision protocols"
              body="Outcomes are formed through explicit procedures, visible thresholds, and multiple readings where needed — not hidden weighting or opaque authority."
            />
            <FlowStep
              number="05"
              title="Execution in Orgo"
              body="Decisions become assignments, escalations, closures, and logged outcomes inside an accountable execution layer."
            />
            <FlowStep
              number="06"
              title="Preservation and learning"
              body="The resulting record becomes durable institutional memory, reusable for future cases instead of being lost to turnover, drift, or platform decay."
            />
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-6 py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
              A sociotechnical operating system
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              kOA is not just a website, a forum, or a productivity suite. It is designed as a{" "}
              <strong className="text-slate-900 font-semibold">Sociotechnical Operating System</strong>:
              a governable operating layer that joins technology, governance, workflow, and public
              legitimacy into one coherent loop. It is built as a{" "}
              <strong className="text-slate-900 font-semibold">system of systems</strong> because
              real societies already rely on many subsystems, and serious infrastructure must
              integrate without collapsing into capture, monolith, or dependency.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard
              title="Konnaxion"
              body="The public-facing ecosystem for learning, collaboration, deliberation, creation, and shared memory. It links people, projects, knowledge artifacts, and civic processes inside a coherent governance environment."
            />
            <SectionCard
              title="Orgo"
              body="The execution and continuity layer. Orgo turns outcomes into real work: routing, responsibility, escalation, reminders, closure, and accountable follow-through — including operation in more closed or resilient environments."
            />
            <SectionCard
              title="Kristals"
              body="Portable compiled knowledge artifacts with provenance, structure, and versioning. Instead of treating knowledge as loose documents, kOA turns it into reusable units that can be validated, cited, contested, and carried across contexts."
            />
            <SectionCard
              title="Deliberation and decision"
              body="kOA treats deliberation as a staged civic pipeline: consultation, structured argument, drafting, and decision protocols with visible readings. The aim is decision quality without technocracy and legitimacy without noise."
            />
          </div>

          <div className="mt-8 rounded-md border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-medium text-slate-900">A layered stack</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              You can also read kOA as a stack: memory, meaning, legitimacy, coordination, action,
              and preservation. Each layer solves a distinct part of the same civil problem: how to
              help communities build shared reference points, make contestable decisions, and carry
              them through to implementation without losing accountability or pluralism.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="px-6 py-16 border-b border-gray-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
              Design commitments
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              kOA is not neutral about architecture. It is built around a small set of
              non-negotiable commitments intended to preserve legitimacy, prevent domination, and
              keep both institutions and communities able to understand, contest, and govern the
              systems they rely on.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <FeatureCard
              title="Visible rules"
              body="Decision procedures, weighting rules, and transitions should remain explicit. Authority must be inspectable rather than smuggled into black boxes, rankings, or interface defaults."
            />
            <FeatureCard
              title="Contestable outcomes"
              body="A legitimate system must support recourse, revision, multiple readings, and the ability to challenge how conclusions were formed."
            />
            <FeatureCard
              title="Offline-capable resilience"
              body="Communities and organizations should be able to preserve continuity under outages, hostile conditions, infrastructure dependency, or platform failure."
            />
            <FeatureCard
              title="Fail-closed integrity"
              body="When knowledge or artifacts cannot be verified, the system should refuse false confidence. Unknown should remain unknown until integrity can be established."
            />
            <FeatureCard
              title="Auditability by design"
              body="The chain from sources to claims to deliberation to decisions to execution must remain traceable. Logs are not exhaust; they are institutional memory."
            />
            <FeatureCard
              title="AI under governance constraints"
              body="AI can assist with translation, summarization, extraction, and workflow support, but it should remain bounded, replaceable, and never become hidden authority."
            />
          </div>
        </div>
      </section>

      {/* SOCIAL AIM */}
      <section className="px-6 py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              More than a platform
            </h2>
          </div>

          <div className="lg:col-span-8 text-slate-600 text-lg leading-relaxed space-y-5">
            <p>
              kOA is also a social project. The crisis it addresses is not only one of software,
              administration, or data. It is a crisis of fragmentation: incompatible vocabularies,
              siloed expertise, brittle institutions, distrust in systems of knowledge, and the
              repeated loss of public learning between one cycle and the next.
            </p>

            <p>
              The aim is not uniformity. The aim is to create shared reference points strong enough
              to support action without erasing disagreement. People should be able to see what
              claims are supported, where uncertainty remains, what values are in conflict, what
              tradeoffs are real, and what decisions were made and why.
            </p>

            <p>
              That is why kOA is oriented toward collaborative empowerment through knowledge: not the
              mere right to post, but the capacity to co-produce trustworthy public intelligence and
              watch it translate into decisions, implementation, and durable memory.
            </p>
          </div>
        </div>
      </section>

      {/* OPTIONAL CORRIDORS / POSITIONING */}
      <section className="px-6 py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900">
              Scope and interpretive openness
            </h2>

            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              The implementable core of kOA is its governable sociotechnical architecture: the
              knowledge layer, the deliberation and decision layer, the execution layer, the memory
              layer, and the resilience principles that bind them together. That core is usable
              without requiring adherence to any particular mythology, metaphysics, or political
              identity.
            </p>

            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Narrative, symbolic, philosophical, or political framings may help interpret, teach,
              or communicate the project. They can serve as bridges for meaning, pedagogy, and
              mobilization. But they are not the runtime authority of the system. Operational truth,
              specifications, protocols, and governance must remain explicit.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border border-gray-200 bg-slate-50 p-4">
                <h3 className="font-medium text-slate-900">Implementable core</h3>
                <ul className="mt-3 space-y-2 text-slate-600 leading-relaxed">
                  <li>• Governance primitives, legitimacy protocols, and audit trails</li>
                  <li>• Konnaxion as the public-facing knowledge and deliberation environment</li>
                  <li>• Orgo as the execution and continuity layer</li>
                  <li>• Kristals as portable, structured knowledge artifacts</li>
                  <li>• The closed loop from knowledge to memory</li>
                </ul>
              </div>

              <div className="rounded-md border border-gray-200 bg-white p-4">
                <h3 className="font-medium text-slate-900">Interpretive corridors</h3>
                <ul className="mt-3 space-y-2 text-slate-600 leading-relaxed">
                  <li>• Narrative and symbolic framing for pedagogy and public imagination</li>
                  <li>• Philosophical and semantic reflection on meaning, language, and legitimacy</li>
                  <li>• Political pathways for pilots, institutions, and strategic deployment</li>
                  <li>• Cultural production that helps the ecosystem become legible and transmissible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / NAV */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
            Enter the ecosystem
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            Explore the diagnosis, the platforms, the infrastructures, the principles, and the
            initiatives that make up kOA.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/why"
              className="px-8 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-[#1e6864] transition-colors duration-300 min-w-[220px] text-center"
            >
              Read the diagnosis
            </Link>
            <Link
              href="/platforms"
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[220px] text-center"
            >
              See the architecture
            </Link>
            <Link
              href="/initiatives"
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[220px] text-center"
            >
              Browse initiatives
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- SMALL UI PRIMITIVES ---
function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-500 bg-white">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5">
      <h3 className="text-base font-medium text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

function FlowStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5">
      <div className="text-xs tracking-[0.18em] uppercase text-slate-400">{number}</div>
      <h3 className="mt-2 text-base font-medium text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

function SectionCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}