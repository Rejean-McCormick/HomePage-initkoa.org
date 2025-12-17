import Link from 'next/link';

export const metadata = { title: 'Technology Stack' };

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Technology Stack</h1>
      <div className="grid gap-4">
        <Link href="/technology/swarmcraft" className="p-4 border rounded hover:bg-gray-50">
          <strong>SwarmCraft</strong> – Narrative Engine
        </Link>
        <Link href="/technology/sentient" className="p-4 border rounded hover:bg-gray-50">
          <strong>SenTient</strong> – Semantic Core & NLP
        </Link>
        <Link href="/technology/ariane" className="p-4 border rounded hover:bg-gray-50">
          <strong>Ariane</strong> – Graph State Machine
        </Link>
        <Link href="/technology/abstract-wiki" className="p-4 border rounded hover:bg-gray-50">
          <strong>Abstract Wiki Architect</strong> – Knowledge Graph Specs
        </Link>
        <Link href="/technology/ai-alignment" className="p-4 border rounded hover:bg-gray-50">
          <strong>AI Alignment (OurAI)</strong> – Ethical Guardrails
        </Link>
      </div>
    </main>
  );
}