// app/principles/civic-principles-ethics/page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – Principles',
  description:
    'A practical civic ethics domain: legitimacy, rights and duties, institutional integrity, transparency, and accountability.',
};

export default function CivicPrinciplesEthicsPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Civic Principles & Ethics</h1>

      <p className="text-xl text-gray-600 mb-10">
        A practical domain for civic life: how power is made legitimate, how rights are protected,
        how duties are defined, and how institutions stay accountable.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <a
          href="/principles/civic-principles-ethics/principles"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Principles</h2>
          <p className="text-gray-700">
            The core civic values: legitimacy, fairness, harm reduction, and constraints on power.
          </p>
        </a>

        <a
          href="/principles/civic-principles-ethics/institutions"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Institutions</h2>
          <p className="text-gray-700">
            How systems should be structured: checks and balances, service orientation, integrity,
            and resilience against capture.
          </p>
        </a>

        <a
          href="/principles/civic-principles-ethics/rights-and-duties"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Rights & Duties</h2>
          <p className="text-gray-700">
            Rights, responsibilities, and the boundaries that protect dignity, freedom, and safety.
          </p>
        </a>

        <a
          href="/principles/civic-principles-ethics/transparency-and-accountability"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
        >
          <h2 className="text-lg font-bold mb-2">Transparency & Accountability</h2>
          <p className="text-gray-700">
            Verifiability, open records, independent oversight, anti-corruption, and enforceable
            consequences.
          </p>
        </a>

        <a
          href="/principles/civic-principles-ethics/faq"
          className="block p-5 rounded-lg border border-gray-200 bg-white hover:shadow-sm md:col-span-2"
        >
          <h2 className="text-lg font-bold mb-2">FAQ</h2>
          <p className="text-gray-700">
            Definitions, scope boundaries, and common questions about this civic domain.
          </p>
        </a>
      </div>

      <div className="p-5 rounded-lg border border-gray-200 bg-white">
        <h2 className="text-2xl font-bold mb-3 text-primary">Scope and boundaries</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            This domain covers <strong>civic ethics</strong> and <strong>institutional design</strong>:
            how societies allocate authority, protect rights, define duties, and prevent abuse.
          </li>
          <li>
            It is designed to be usable across political traditions and belief systems. No spiritual
            or symbolic worldview is required.
          </li>
          <li>
            It intersects with <strong>Âme artificielle</strong> where governance concerns overlap
            (oversight, transparency, harm reduction), while remaining a distinct domain focused on
            civic institutions and public legitimacy.
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Principles
        </a>
        <a
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Map
        </a>
      </div>
    </PageSection>
  );
}
