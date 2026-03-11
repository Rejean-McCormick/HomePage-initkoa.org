// app/technology/ariane/page.tsx
import Link from 'next/link';
import { Card } from '@/components/Card';

export const metadata = {
  title: "Ariane",
  description: "Semantic infrastructure for treating user interfaces as data.",
};

export default function ArianePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Ariane
        </h1>

        <p className="text-2xl font-light text-slate-600 mb-8 leading-relaxed">
          Semantic infrastructure for treating user interfaces as data.
        </p>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            Ariane defines a universal graph model of software UIs—screens,
            controls, and the actions that connect them—so that external systems
            (such as AI agents or automation tools) can query this graph and use
            it as a reference when guiding users through software.
          </p>

          <p>
            The stack is organized around extraction, graph storage, and shared
            concepts. Start with the engines below, then use the concepts hub to
            understand the common vocabulary behind the model.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* COMPONENTS */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-10 text-slate-900">
            Components
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Theseus */}
            <Card
              title="Theseus (Exploration Engine)"
              href="/technology/ariane/theseus"
            >
              <p className="mb-4">
                The exploratory engine that inspects real software to extract a
                graph of <strong>States</strong> (screens) and{" "}
                <strong>Transitions</strong> (actions).
              </p>
              <span className="text-xs font-mono text-primary hover:underline">
                View Documentation →
              </span>
            </Card>

            {/* Atlas */}
            <Card
              title="Atlas (UI Graph & Ontology)"
              href="/technology/ariane/atlas"
            >
              <p className="mb-4">
                The storage and semantic layer that persists the UI graph. It
                provides the core schema for elements and actions.
              </p>
              <span className="text-xs font-mono text-primary hover:underline">
                View Documentation →
              </span>
            </Card>
          </div>
        </section>

        {/* CONCEPTS */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-10 text-slate-900">
            Concepts
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <Card
              title="Concepts & Glossary"
              href="/technology/ariane/concepts"
            >
              <p className="mb-4">
                Shared definitions for the Ariane model: core concepts,
                terminology, and the reference layer used across the system.
              </p>
              <span className="text-xs font-mono text-primary hover:underline">
                Open Concepts Hub →
              </span>
            </Card>
          </div>
        </section>

        {/* OPTIONAL BREADCRUMB CTA */}
        <section className="border-t border-gray-100 pt-10">
          <Link
            href="/technology"
            className="text-sm font-mono text-primary hover:underline"
          >
            ← Back to Technology
          </Link>
        </section>
      </div>
    </main>
  );
}