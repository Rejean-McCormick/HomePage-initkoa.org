// app/principles/page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Principles — The kOA INITIATIVE',
  description:
    'Three core axioms and two separated domains: Civic Principles & Ethics, and Cosmic Etherism (optional, quarantined).',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles</h1>

      <p className="text-xl text-gray-600 mb-10">
        A small set of design commitments that guide the kOA ecosystem. Two domains are intentionally separated.
      </p>

      {/* CORE AXIOMS */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Core axioms</h2>
        <div className="space-y-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">1. Radical Lucidity</h3>
            <p>Face reality as it is. Prefer evidence, clarity, and honest diagnosis over ideology.</p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">2. Integral Cooperation</h3>
            <p>Design for coordination at scale. Reward collaboration over zero-sum conflict.</p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">3. Open Technology</h3>
            <p>Public infrastructure must be verifiable. Transparency through open systems and auditable rules.</p>
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Domains</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/principles/civic-principles-ethics"
            className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2">Civic Principles & Ethics</h3>
            <p className="text-gray-700">
              Public institutions, rights and duties, accountability, transparency, and operational ethics.
            </p>
          </a>

          <a
            href="/principles/cosmic-etherism"
            className="block p-5 rounded-lg border border-amber-300 bg-amber-50 hover:shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2">Cosmic Etherism (Optional)</h3>
            <p className="text-gray-800">
              A personal worldview track. Explicitly quarantined from civic design and referenced only in fiction.
            </p>
          </a>
        </div>

        <div className="mt-6 p-5 rounded-lg border border-gray-200 bg-white">
          <h3 className="text-lg font-bold mb-2">Related (Technology)</h3>
          <p className="text-gray-700 mb-3">
            AI alignment, meta-cognition, and governance mechanisms are documented under Technology.
          </p>
          <a href="/technology/ame-artificielle" className="text-primary hover:underline font-medium">
            Âme artificielle (Alignement & méta-cognition) →
          </a>
        </div>
      </section>

      {/* UTILITY LINKS */}
      <section className="flex flex-wrap gap-4">
        <a
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Map
        </a>
        <a
          href="/principles/glossary"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Glossary
        </a>
      </section>
    </PageSection>
  );
}
