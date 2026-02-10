// app/principles/page.js
import Link from 'next/link';
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Principles – kOA',
  description:
    'Three core axioms and four clearly separated domains: Âme artificielle, Civic Principles & Ethics, Logos & Mythos, and Cosmic Etherism (optional).',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles</h1>

      <p className="text-xl text-gray-600 mb-6">
        These principles guide how the kOA ecosystem is designed, governed, and communicated.
      </p>
      <p className="text-gray-600 mb-10 max-w-3xl">
        The key idea is <strong>clarity + separation</strong>: civic rules must be legible and auditable, technical systems must be verifiable, and
        personal symbolism must never be confused with public authority.
      </p>

      {/* CORE AXIOMS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Core axioms</h2>
        <div className="space-y-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">1. Radical Lucidity</h3>
            <p className="text-gray-700">
              Face reality as it is. Prefer evidence, clear definitions, and honest diagnosis over ideology or vibes.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">2. Integral Cooperation</h3>
            <p className="text-gray-700">
              Design for coordination at scale. Reward collaboration and good-faith contribution over zero-sum conflict.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">3. Open Technology</h3>
            <p className="text-gray-700">
              Public infrastructure must be verifiable. Prefer transparent systems, clear accountability, and auditable outputs.
            </p>
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Domains</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 1. Âme Artificielle (Tech/Prototype) */}
          <Link
            href="/technology/ame-artificielle"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-purple-700">Âme artificielle</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Principles for building and deploying AI responsibly: safety, control, oversight, and governance-by-design.
              This is the <strong>prototype / engineering</strong> domain.
            </p>
          </Link>

          {/* 2. Civic Principles (Society/Law) */}
          <Link
            href="/principles/civic-principles-ethics"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-blue-700">Civic Principles & Ethics</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Institutions, rights, duties, due process, and accountability. This is the <strong>law / governance</strong> domain.
            </p>
          </Link>

          {/* 3. Logos & Mythos (Language/Tool) */}
          <Link
            href="/principles/logos"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-emerald-700">Logos & Mythos</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Language as infrastructure: narratives, symbols, speech acts, and how meaning shapes coordination.
              Used as a <strong>tool</strong>, with safeguards against manipulation.
            </p>
          </Link>

          {/* 4. Cosmic Etherism (Optional) */}
          <Link
            href="/principles/cosmic-etherism"
            className="block p-6 rounded-lg border border-amber-300 bg-amber-50 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-amber-700">Cosmic Etherism (Optional)</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              Personal symbolism and worldview. <strong>Strictly separated</strong> from civic duties, decision rights, and public legitimacy.
              This is the <strong>personal / fictional</strong> domain.
            </p>
          </Link>
        </div>
      </section>

      <section className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
        <Link
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm font-medium"
        >
          View Concept Map
        </Link>
        <Link
          href="/principles/glossary"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm font-medium"
        >
          Glossary
        </Link>
      </section>
    </PageSection>
  );
}
