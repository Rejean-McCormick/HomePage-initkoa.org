// app/technology/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Technology — kOA stack (public overview)",
  description:
    "A public overview of the core software components behind the kOA ecosystem: input → structure → navigation → output, plus auditable governance primitives.",
};

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Technology</h1>

        <p className="text-xl text-gray-600">
          The kOA ecosystem is built as <strong>governable infrastructure</strong>: systems that can run offline, stay
          auditable, and remain understandable to humans. This page is a plain-language map of the main building blocks,
          with links to code and deeper documentation where available.
        </p>

        <div className="mt-5 p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-sm text-gray-700">
            <strong>Reading guide:</strong> we move from <em>input</em> → <em>structure</em> → <em>navigation</em> →{" "}
            <em>output</em>, with a deterministic core for verification.
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-3 font-mono">
          Domain: Réjean McCormick // Goal: Offline + Auditable + Governable
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/why"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Start with context →
          </Link>
          <Link
            href="/initiatives"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            See initiatives →
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
        {/* Ariane */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ariane" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Ariane</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Navigation</span>
            </div>
            <p className="text-gray-700 mb-4">
              A “UI-as-data” layer. Ariane models software interfaces as structured graphs so assistants can guide people
              through complex apps in a reliable, explainable way (instead of guessing clicks).
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/ariane" label="Rejean-McCormick/ariane" />
        </div>

        {/* Abstract Wiki Architect */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/architect" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Abstract Wiki Architect</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Output</span>
            </div>
            <p className="text-gray-700 mb-4">
              A multilingual output toolkit for structured knowledge: lexica, constructions, and QA pipelines to keep
              language consistent, traceable, and reusable across contexts.
            </p>
          </Link>

          <RepoLink
            href="https://github.com/Rejean-McCormick/abstract-wiki-architect"
            label="Rejean-McCormick/abstract-wiki-architect"
          />
        </div>

        {/* SenTient */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/sentient" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SenTient</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Input</span>
            </div>
            <p className="text-gray-700 mb-4">
              A structured intake pipeline. Turns messy natural language into clean, verifiable statements that can be
              checked, stored, and reused (think “from text to accountable knowledge”).
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/SenTient" label="Rejean-McCormick/SenTient" />
        </div>

        {/* SwarmCraft */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/swarmcraft" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SwarmCraft</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Continuity</span>
            </div>
            <p className="text-gray-700 mb-4">
              A workflow and continuity engine for long-running work: repeatable scaffolds, orchestration, and grounded
              memory so multi-step outputs stay coherent over time (and can run offline when needed).
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/SwarmCraft" label="Rejean-McCormick/SwarmCraft" />
        </div>

        {/* Âme artificielle */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ame-artificielle" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Âme artificielle</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Alignment</span>
            </div>
            <p className="text-gray-700 mb-4">
              A design space for governable AI behavior: controllable outputs, meta-cognitive checks, and explicit
              guardrails. The goal is consistency and responsibility—not mystique.
            </p>
          </Link>

          <RepoLink
            href="https://github.com/Rejean-McCormick/Ame-Artificielle"
            label="Rejean-McCormick/Ame-Artificielle"
          />
        </div>

        {/* VM-ENGINE */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/voting-machine" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Voting Machine (VM-Engine)</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Verification</span>
            </div>
            <p className="text-gray-700 mb-4">
              A deterministic computation core for governance workflows: identical inputs produce identical results,
              enabling verification, reproducibility, and auditability where legitimacy matters.
            </p>
          </Link>

          <RepoLink href="https://github.com/Rejean-McCormick/vm-engine" label="Rejean-McCormick/vm-engine" />
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
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      {label}
    </a>
  );
}
