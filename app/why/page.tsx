// app/why/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why — The Diagnosis (kOA)",
  description:
    "Why kOA exists: information is abundant, but knowledge rarely becomes legitimate decisions, accountable execution, and institutional memory. kOA is built as a sociotechnical operating system: governable, auditable, offline-capable.",
};

export default function WhyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <header className="mb-10">
        <p className="text-sm font-mono text-slate-500 mb-3">kOA / The Diagnosis</p>

        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-slate-900">
          Why this exists
        </h1>

        <p className="mt-5 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
          We live in a paradox: <strong>information is abundant</strong>, yet our ability to turn it into{" "}
          <strong>coordinated action</strong> stays weak. kOA is an attempt to close the loop:{" "}
          <strong>knowledge → deliberation → decisions → execution → institutional memory</strong>—with governance-grade
          guarantees (auditable, offline-capable, non-capturable by default).
        </p>

        <div className="mt-7 flex flex-wrap gap-3 not-prose">
          <Link
            href="/initiatives"
            className="text-sm px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
          >
            Explore the ecosystem →
          </Link>
          <Link
            href="/platforms"
            className="text-sm px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Platforms →
          </Link>
          <Link
            href="/technology"
            className="text-sm px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Technology →
          </Link>
          <Link
            href="/diagnosis"
            className="text-sm px-4 py-2 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Long-form diagnosis →
          </Link>
        </div>
      </header>

      <section className="prose prose-slate max-w-none">
        <h2>The real failure is not “lack of information”</h2>
        <p>
          Most systems optimize for attention, engagement, and convenience. Civic-grade work needs different properties:
          legitimacy, repeatability, and auditability. When those are missing, societies and organizations experience the
          same failure pattern:
        </p>

        <ul>
          <li>
            <strong>Verification doesn’t scale</strong> — misinformation spreads faster than evidence can be checked.
          </li>
          <li>
            <strong>Deliberation collapses into noise</strong> — endless threads produce heat, not outcomes.
          </li>
          <li>
            <strong>Decisions aren’t legible</strong> — who decided what, why, and under which rules becomes unclear.
          </li>
          <li>
            <strong>Execution drifts</strong> — commitments don’t become tasks, escalation, closure, and traceable
            results.
          </li>
          <li>
            <strong>Memory resets</strong> — each cycle re-learns the same lessons; institutions forget.
          </li>
        </ul>

        <h2>The response: a Sociotechnical Operating System</h2>
        <p>
          kOA is built as an operating layer (not “just a platform”): the fusion of{" "}
          <strong>technology + governance + operational workflow</strong>. A sociotechnical OS must be able to answer,
          reliably:
        </p>

        <ol>
          <li>
            <strong>What is true enough to act on?</strong>
          </li>
          <li>
            <strong>How do we deliberate without devolving into noise?</strong>
          </li>
          <li>
            <strong>How do we decide without erasing legitimacy or competence?</strong>
          </li>
          <li>
            <strong>How do decisions become tasks, escalation, closure, and memory?</strong>
          </li>
          <li>
            <strong>How do we audit the whole chain later?</strong>
          </li>
        </ol>

        <h2>The design constraints (non-negotiables)</h2>
        <div className="not-prose border border-slate-200 rounded-lg p-5 bg-white">
          <ul className="m-0 list-disc pl-5 text-slate-700 text-sm">
            <li>
              <strong>Offline-capable</strong>: core operation must survive outages, censorship, fragile connectivity,
              and perimeter-only deployments.
            </li>
            <li>
              <strong>Fail-closed integrity</strong>: unverified artifacts should be refused, not silently accepted.
            </li>
            <li>
              <strong>Auditability by default</strong>: “trust us” is not a governance model.
            </li>
            <li>
              <strong>Pluralism without capture</strong>: integrate many tools, but protect the core from domination
              (“integration without contamination”).
            </li>
          </ul>
        </div>

        <h2>What the stack actually is</h2>
        <p>The ecosystem is easiest to understand as layered capabilities:</p>

        <ul>
          <li>
            <strong>Verifiable knowledge artifacts</strong> —{" "}
            <Link href="/technology/kristal">Kristals</Link> (portable, checkable units of knowledge).
          </li>
          <li>
            <strong>Public learning + deliberation + decision pipelines</strong> —{" "}
            <Link href="/platforms/konnaxion">Konnaxion</Link> (with staged governance modules).
          </li>
          <li>
            <strong>Legitimacy lenses</strong> — <Link href="/initiatives/civic-governance/constitution/ekoh">EkoH</Link>{" "}
            + <Link href="/platforms/konnaxion/kollective-intelligence/smart-vote">Smart Vote</Link> (decision quality
            without technocracy).
          </li>
          <li>
            <strong>Execution & accountability</strong> — <Link href="/platforms/orgo">Orgo</Link> (signals → cases →
            tasks, with escalation and closure).
          </li>
          <li>
            <strong>Physical/operational resilience</strong> — <Link href="/infrastructures">Infrastructures</Link>{" "}
            (locality, continuity, sustainability).
          </li>
        </ul>

        <h2>How to use this site</h2>
        <p>Suggested reading order:</p>
        <ol>
          <li>
            <Link href="/initiatives">Initiatives</Link> — what is being proposed and why.
          </li>
          <li>
            <Link href="/platforms">Platforms</Link> — what exists as deployable systems (public + private layers).
          </li>
          <li>
            <Link href="/technology">Technology</Link> — architecture and specs (for builders).
          </li>
          <li>
            <Link href="/principles">Principles</Link> — the ethical/governance spine.
          </li>
        </ol>

        <hr />

        <p className="text-sm text-slate-500">
          Contact:{" "}
          <a href="mailto:rejean.mccormick@initkoa.org" className="font-mono">
            rejean.mccormick@initkoa.org
          </a>{" "}
          · Full inventory: <Link href="/links">/links</Link>
        </p>
      </section>
    </main>
  );
}
