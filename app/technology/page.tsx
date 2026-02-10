// app/technology/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Technology — kOA capabilities (public overview)",
  description:
    "What the kOA technology stack enables: verifiable knowledge artifacts (Kristals), guided navigation (Ariane), multilingual output, structured input, deterministic governance computation, and offline-first execution.",
};

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Technology</h1>

        <p className="text-xl text-gray-600">
          This stack is organized around <strong>capabilities</strong>—what the system lets communities and
          organizations do—rather than internal technical mechanisms. The focus is:{" "}
          <strong>portable knowledge</strong>, <strong>legitimate decisions</strong>, and{" "}
          <strong>reliable execution</strong>, under real-world constraints (offline, auditable, governable).
        </p>

        <div className="mt-5 p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-sm text-gray-700">
            <strong>Reading guide:</strong> from <em>verifiable knowledge</em> → <em>navigation</em> →{" "}
            <em>decision & verification</em> → <em>execution & continuity</em>.
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-3 font-mono">
          Domain: Réjean McCormick // Goal: Offline-capable + Auditable + Governable
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/why"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Context →
          </Link>
          <Link
            href="/initiatives"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Initiatives →
          </Link>
          <Link
            href="/principles"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Principles →
          </Link>
          <Link
            href="/principles/glossary"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Glossary →
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Kristal (NEW — top of page) */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/kristal" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Kristal</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Verifiable Knowledge</span>
            </div>
            <p className="text-gray-700 mb-4">
              Portable, verifiable knowledge artifacts. Kristals let communities publish “compiled truth packages” that
              can be checked, reused, and executed offline—so knowledge can travel without losing provenance.
            </p>
          </Link>

          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/technology/kristal/what-it-does"
              className="text-sm text-gray-500 hover:text-primary font-mono"
            >
              What it does →
            </Link>
            <Link
              href="/technology/kristal/trust-and-provenance"
              className="text-sm text-gray-500 hover:text-primary font-mono"
            >
              Trust & provenance →
            </Link>
            <Link
              href="/technology/kristal/portability-and-offline"
              className="text-sm text-gray-500 hover:text-primary font-mono"
            >
              Portability & offline →
            </Link>
          </div>
        </div>

        {/* Ariane */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ariane" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Ariane</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Guided Navigation</span>
            </div>
            <p className="text-gray-700 mb-4">
              Guided navigation for complex systems. Ariane turns interfaces into structured maps so assistants can
              reliably walk users through real workflows—step by step, explainably.
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/ariane" label="Rejean-McCormick/ariane" />
        </div>

        {/* Voting Machine / VM-ENGINE */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/voting-machine" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Voting Machine (VM-Engine)</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Determinism</span>
            </div>
            <p className="text-gray-700 mb-4">
              Deterministic computation for governance. The same inputs yield the same outputs, enabling verification and
              reproducibility where legitimacy matters (e.g., ballots, tallies, allocations, simulations).
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/vm-engine" label="Rejean-McCormick/vm-engine" />
        </div>

        {/* SenTient */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/sentient" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SenTient</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Structured Input</span>
            </div>
            <p className="text-gray-700 mb-4">
              Structured intake from messy text. SenTient helps convert natural language into checkable statements that
              can be reviewed, corrected, and reused—turning “claims” into accountable knowledge.
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/SenTient" label="Rejean-McCormick/SenTient" />
        </div>

        {/* Abstract Wiki Architect */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/architect" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Abstract Wiki Architect</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Multilingual Output</span>
            </div>
            <p className="text-gray-700 mb-4">
              Multilingual output for structured knowledge. Produces consistent, testable language across contexts, with
              traceable phrasing and reusable patterns.
            </p>
          </Link>

          <RepoLink
            href="https://github.com/Rejean-McCormick/abstract-wiki-architect"
            label="Rejean-McCormick/abstract-wiki-architect"
          />
        </div>

        {/* SwarmCraft */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/swarmcraft" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SwarmCraft</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Continuity</span>
            </div>
            <p className="text-gray-700 mb-4">
              Continuity for long-running work. Helps keep multi-step projects coherent over time, with repeatable
              scaffolds and durable memory (including offline-friendly workflows when required).
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/SwarmCraft" label="Rejean-McCormick/SwarmCraft" />
        </div>

        {/* Âme artificielle */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ame-artificielle" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Âme artificielle</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Guardrails</span>
            </div>
            <p className="text-gray-700 mb-4">
              Governable behavior and guardrails. A design space for controllable outputs, self-checks, and explicit
              constraints—focused on responsibility rather than mystique.
            </p>
          </Link>

          <RepoLink
            href="https://github.com/Rejean-McCormick/Ame-Artificielle"
            label="Rejean-McCormick/Ame-Artificielle"
          />
        </div>
      </div>
    </main>
  );
}

function RepoLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
    >
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.540-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      {label}
    </a>
  );
}
