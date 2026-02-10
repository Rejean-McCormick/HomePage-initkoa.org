// app/principles/page.js
import Link from 'next/link';
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Principles – kOA',
  description:
    'Three core axioms and four separated domains: Âme artificielle, Civic Principles & Ethics, Logos & Mythos, and Cosmic Etherism (optional).',
};

export default function PrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles</h1>

      <p className="text-xl text-gray-600 mb-6">
        These principles guide how the kOA ecosystem is designed, governed, and communicated.
      </p>

      <div className="mb-10 max-w-3xl space-y-4 text-gray-700">
        <p>
          The key idea is <strong>clarity + separation</strong>:
          civic rules must be legible and contestable, technical systems must be verifiable, and
          personal symbolism must never be confused with public authority.
        </p>

        <div className="p-4 rounded-lg border border-amber-300 bg-amber-50">
          <p className="text-gray-800">
            <strong>Important:</strong> Cosmic Etherism is <strong>optional</strong> and{' '}
            <strong>structurally separated</strong> from civic rights, duties, and decision legitimacy.
          </p>
        </div>
      </div>

      {/* Quick paths */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        <Link
          href="/diagnosis"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
            Context
          </div>
          <div className="font-bold">Diagnosis</div>
          <div className="text-sm text-gray-600">What we’re trying to solve.</div>
        </Link>

        <Link
          href="/initiatives"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
            Response
          </div>
          <div className="font-bold">Initiatives</div>
          <div className="text-sm text-gray-600">Civic modules and governance work.</div>
        </Link>

        <Link
          href="/platforms"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
        >
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
            Tools
          </div>
          <div className="font-bold">Platforms</div>
          <div className="text-sm text-gray-600">Systems you can actually use.</div>
        </Link>
      </div>

      {/* CORE AXIOMS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Core axioms</h2>

        <div className="space-y-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">1. Radical Lucidity</h3>
            <p className="text-gray-700">
              Face reality as it is. Prefer evidence, clear definitions, and honest diagnosis over ideology,
              tribal loyalty, or vibes.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">2. Integral Cooperation</h3>
            <p className="text-gray-700">
              Design for coordination at scale. Reward collaboration, reciprocity, and good-faith contribution
              over zero-sum conflict.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <h3 className="text-lg font-bold mb-2">3. Open Technology</h3>
            <p className="text-gray-700">
              Public infrastructure must be verifiable. Prefer transparent mechanisms, clear accountability,
              and auditable outputs—especially when power is at stake.
            </p>
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Domains</h2>

        <p className="text-gray-600 mb-6 max-w-3xl">
          Each domain has different standards and boundaries. The separation is part of the safety model:
          it prevents category mistakes (e.g., treating fiction as authority, or treating opaque systems as governance).
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 1. Âme Artificielle (Tech/Prototype) */}
          <Link
            href="/technology/ame-artificielle"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-purple-700">Âme artificielle</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Principles for building and deploying AI responsibly: safety, control, oversight, and
              governance-by-design. This is the <strong>prototype / engineering</strong> domain.
            </p>
          </Link>

          {/* 2. Civic Principles (Society/Law) */}
          <Link
            href="/principles/civic-principles-ethics"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-blue-700">Civic Principles &amp; Ethics</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Institutions, rights, duties, due process, and accountability. This is the{' '}
              <strong>law / governance</strong> domain.
            </p>
          </Link>

          {/* 3. Logos & Mythos (Language/Tool) */}
          <Link
            href="/principles/logos"
            className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold mb-2 text-emerald-700">Logos &amp; Mythos</h3>
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
              Personal symbolism and worldview. <strong>Strictly separated</strong> from civic duties,
              decision rights, and public legitimacy. This is the <strong>personal / fictional</strong> domain.
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

        <Link
          href="/technology"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm font-medium"
        >
          Technology (builder docs)
        </Link>
      </section>
    </PageSection>
  );
}
