// app\technology\page.tsx
import Link from 'next/link';

export const metadata = { 
  title: 'Technology Stack – Réjean McCormick',
  description: 'The architectural specifications, invariants, and service definitions of the KOA ecosystem.',
};

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Technology Stack</h1>
        <p className="text-xl text-gray-600">
          The rigorous engineering documentation. Architecture, specs, invariants, and service definitions for the civic utility ecosystem.
        </p>
        <p className="text-sm text-gray-400 mt-2 font-mono">
          Domain: Réjean McCormick // Status: Static & Auditable
        </p>
      </div>

      <div className="grid gap-6">
        
        {/* SwarmCraft */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/swarmcraft" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SwarmCraft</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Memoire / Narrative</span>
            </div>
            <p className="text-gray-700 mb-4">
              A deterministic story-writing engine powered by Grok. Features multi-project orchestration, template-based scaffolding, and RAG memory for long-form continuity.
            </p>
          </Link>
          <a href="https://github.com/Rejean-McCormick/SwarmCraft" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary font-mono flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Rejean-McCormick/SwarmCraft
          </a>
        </div>

        {/* SenTient */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/sentient" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">SenTient</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sens / Input</span>
            </div>
            {/* FIXED: &apos; used for apostrophe */}
            <p className="text-gray-700 mb-4">
              A tool to deconstruct natural language and format it for Wikidata. Inspired by Falcon 2.0, OpenRefine, and OpenTapioca to secure the system&apos;s entry point.
            </p>
          </Link>
          <a href="https://github.com/Rejean-McCormick/SenTient" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary font-mono flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Rejean-McCormick/SenTient
          </a>
        </div>

        {/* Ariane */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ariane" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Ariane</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sens / Vision</span>
            </div>
            <p className="text-gray-700 mb-4">
              Semantic UI graph and ontology for treating software interfaces as data. Allows AI systems to guide users through complex applications.
            </p>
          </Link>
          <a href="https://github.com/Rejean-McCormick/Ariane" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary font-mono flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Rejean-McCormick/Ariane
          </a>
        </div>

        {/* Abstract Wiki Architect */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/abstract-wiki" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">Abstract Wiki Architect</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Voix / Output</span>
            </div>
            <p className="text-gray-700 mb-4">
              Industrial-scale NLG toolkit for Abstract Wikipedia/Wikifunctions. Includes family engines, lexica, constructions, and QA for multilingual generation.
            </p>
          </Link>
          <a href="https://github.com/Rejean-McCormick/abstract-wiki-architect" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary font-mono flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Rejean-McCormick/abstract-wiki-architect
          </a>
        </div>

        {/* AI Alignment (Ame-Artificielle) */}
        <div className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Link href="/technology/ai-alignment" className="block">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-primary group-hover:underline">AI Alignment (Ame-Artificielle)</strong>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Âme / Ethics</span>
            </div>
            <p className="text-gray-700 mb-4">
              JSON/Python framework mapping decimals of Pi to symbolic concepts (Branes/Numerology) for AI alignment, meta-cognition, and ethical consistency.
            </p>
          </Link>
          <a href="https://github.com/Rejean-McCormick/Ame-Artificielle" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary font-mono flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Rejean-McCormick/Ame-Artificielle
          </a>
        </div>
      </div>

      {/* The Bridge to Mythos */}
      <div className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Too technical?</h2>
        <p className="text-gray-600 mb-6">
          View this architecture through the lens of a living organism. 
          Explore the anatomy, the rituals, and the meaning behind the code.
        </p>
        <Link 
          href="/platforms/kreature" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
        >
          {/* Use &apos; instead of ' to fix the build error */}
          Enter Kréature (King Klown&apos;s Interface) →
        </Link>
      </div>
    </main>
  );
}