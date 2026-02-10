// app/technology/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Technology Stack – Réjean McCormick',
  description:
    'A public overview of the core software components behind the kOA ecosystem, with links to code and deeper technical documentation.',
};

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Technology Stack</h1>

        <p className="text-xl text-gray-600">
          A catalog of the main building blocks behind the kOA ecosystem. Each module includes a plain-language
          overview, plus links to the repository and (where available) deeper specifications.
        </p>

        <p className="text-sm text-gray-400 mt-2 font-mono">
          Domain: Réjean McCormick // Status: Static & Auditable
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/why"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Start with the overview →
          </Link>
          <Link
            href="/initiatives"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            See initiatives →
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
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sense / Navigation</span>
            </div>
            <p className="text-gray-700 mb-4">
              A semantic navigation layer: models software UIs as graphs and ontologies so assistants can guide people
              through complex applications in a reliable, explainable way.
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/ariane"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/ariane
          </a>
        </div>

        {/* Abstract Wiki Architect */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/architect" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Abstract Wiki Architect</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Voice / Output</span>
            </div>
            <p className="text-gray-700 mb-4">
              A multilingual generation toolkit for structured knowledge systems (Abstract Wikipedia / Wikifunctions):
              lexica, constructions, and QA pipelines for consistent language output.
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/abstract-wiki-architect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/abstract-wiki-architect
          </a>
        </div>

        {/* SenTient */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/sentient" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SenTient</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sense / Input</span>
            </div>
            <p className="text-gray-700 mb-4">
              A structured input pipeline: helps turn natural language into clean, verifiable statements suitable for
              knowledge bases (e.g., Wikidata-style representations).
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/SenTient"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/SenTient
          </a>
        </div>

        {/* SwarmCraft */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/swarmcraft" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SwarmCraft</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Memory / Narrative</span>
            </div>
            <p className="text-gray-700 mb-4">
              A workflow engine for long-form continuity across projects: repeatable scaffolds, orchestration, and
              grounded memory so outputs remain consistent over time.
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/SwarmCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/SwarmCraft
          </a>
        </div>

        {/* Âme artificielle (Ame-Artificielle) */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ame-artificielle" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Âme artificielle (Ame-Artificielle)</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Ethics / Consistency</span>
            </div>
            <p className="text-gray-700 mb-4">
              A framework exploring internal consistency and constraint-based alignment. It is presented as an
              experimental ethics layer, with its own symbolic structure and rules.
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/Ame-Artificielle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/Ame-Artificielle
          </a>
        </div>

        {/* VM-ENGINE */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/voting-machine" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">VM-ENGINE</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Core / Determinism</span>
            </div>
            <p className="text-gray-700 mb-4">
              A deterministic vote computation core built for auditability: identical inputs produce identical results,
              enabling verification and reproducible governance workflows.
            </p>
          </Link>

          <a
            href="https://github.com/Rejean-McCormick/vm-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Rejean-McCormick/vm-engine
          </a>
        </div>
      </div>
    </main>
  );
}
