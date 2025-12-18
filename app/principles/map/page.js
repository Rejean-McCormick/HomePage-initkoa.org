// app/principles/page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Principles – King Klown & KOA',
  description:
    'Core axioms and the domains: Civic Principles & Ethics, and Cosmic Etherism (optional).',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles</h1>

      <p className="text-xl text-gray-600 mb-10">
        Three axioms. Two distinct domains. Clear separation where required.
      </p>

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
            <p>Public infrastructure must be verifiable. Transparency through open systems.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Domains</h2>

        {/* Adjusted grid to 2 columns since Âme is moved to Technologies */}
        <div className="grid gap-6 md:grid-cols-2">
          
          <a
            href="/principles/civic-principles-ethics"
            className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2">Civic Principles & Ethics</h3>
            <p className="text-gray-700">
              Public institutions, rights and duties, accountability, transparency, and ethics.
            </p>
          </a>

          <a
            href="/principles/cosmic-etherism"
            className="block p-5 rounded-lg border border-amber-300 bg-amber-50 hover:shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2">Cosmic Etherism (Optional)</h3>
            <p className="text-gray-800">
              Personal Pi symbolism and worldview. 100% separated from all other initiatives,
              referenced only in King Klown fiction.
            </p>
          </a>
        </div>
      </section>

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