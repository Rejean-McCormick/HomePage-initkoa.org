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
          The rigorous engineering documentation. Architecture, specs, invariants, and service definitions.
        </p>
        <p className="text-sm text-gray-400 mt-2 font-mono">
          Domain: Réjean McCormick // Status: Static & Auditable
        </p>
      </div>

      <div className="grid gap-4">
        <Link href="/technology/swarmcraft" className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <strong className="text-lg text-primary group-hover:underline">SwarmCraft</strong>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Memoire / Narrative</span>
          </div>
          <p className="text-gray-600 mt-1">Deterministic Narrative Engine, Matrix State, & Story Bible.</p>
        </Link>

        <Link href="/technology/sentient" className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <strong className="text-lg text-primary group-hover:underline">SenTient</strong>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sens / Input</span>
          </div>
          <p className="text-gray-600 mt-1">Semantic Core, Entity Reconciliation & Language Immunity.</p>
        </Link>

        <Link href="/technology/ariane" className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <strong className="text-lg text-primary group-hover:underline">Ariane</strong>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Sens / Vision</span>
          </div>
          <p className="text-gray-600 mt-1">UI-as-Data interpretation, Graph State Machine & Spatial Navigation.</p>
        </Link>

        <Link href="/technology/abstract-wiki" className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <strong className="text-lg text-primary group-hover:underline">Abstract Wiki Architect</strong>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Voix / Output</span>
          </div>
          <p className="text-gray-600 mt-1">Multilingual NLG, Constructors, and Knowledge Graph Specifications.</p>
        </Link>

        <Link href="/technology/ai-alignment" className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <strong className="text-lg text-primary group-hover:underline">AI Alignment (OurAI)</strong>
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Âme / Ethics</span>
          </div>
          <p className="text-gray-600 mt-1">Ethical Guardrails, EL Engine, and Anthropocentric Anchoring.</p>
        </Link>
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