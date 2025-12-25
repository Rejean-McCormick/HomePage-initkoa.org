// app\principles\page.js
// app/principles/page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Principles – KOA / King Klown',
  description:
    'Core axioms and the four domains: Âme artificielle, Civic Ethics, Logos & Mythos, and Cosmic Etherism.',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles</h1>

      <p className="text-xl text-gray-600 mb-10">
        Three axioms. Four domains. Clear separation where required.
      </p>

      {/* CORE AXIOMS */}
      <section className="mb-12">
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

      {/* DOMAINS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Domains</h2>

        <div className="grid gap-6 md:grid-cols-2">
          
          {/* 1. Âme Artificielle (Tech/Prototype) */}
          <a
            href="/technology/ame-artificielle"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-purple-700">Âme artificielle</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Technical and governance principles for building and deploying AI safely. The "Prototype" domain.
            </p>
          </a>

          {/* 2. Civic Principles (Society/Law) */}
          <a
            href="/principles/civic-principles-ethics"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-blue-700">Civic Principles & Ethics</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Public institutions, rights, duties, and accountability. The "Law" domain.
            </p>
          </a>

          {/* 3. Logos & Mythos (Language/Tool) - NEW */}
          <a
            href="/principles/logos"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-emerald-700">Logos & Mythos</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              The metaphysics of language. Vibration, speech acts, and the use of political myth for transmutation.
            </p>
          </a>

          {/* 4. Cosmic Etherism (Philosophy/Fiction) */}
          <a
            href="/principles/cosmic-etherism"
            className="block p-6 rounded-lg border border-amber-300 bg-amber-50 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-amber-700">Cosmic Etherism (Optional)</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              Personal Pi symbolism and worldview. 100% separated from civic duties. The "Fiction" domain.
            </p>
          </a>
          
        </div>
      </section>

      <section className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
        <a
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm font-medium"
        >
          View Concept Map
        </a>
        <a
          href="/principles/glossary"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm font-medium"
        >
          Glossary
        </a>
      </section>
    </PageSection>
  );
}