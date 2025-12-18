// app\principles\cosmic-etherism\principles\page.js
import PageSection from '../../components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism – Principles',
  description: 'Founding principles of Cosmic Etherism (optional).',
};

const PRINCIPLES = [
  {
    title: '1. Love and Benevolence',
    body: 'Universal love, compassion, and benevolence are treated as primary ethical aims. Harm reduction and care come first.',
  },
  {
    title: '2. Harmony',
    body: 'Seek coherence between self, others, and the wider world. Prefer reconciliation, balance, and constructive alignment over domination.',
  },
  {
    title: '3. Complementarity',
    body: 'Different perspectives can be simultaneously valuable. Reason, experience, intuition, and creativity can complement one another.',
  },
  {
    title: '4. Plurality and Respect',
    body: 'Multiple interpretations are allowed. Respect freedom of conscience and reject coercion, mandatory belief, or ideological enforcement.',
  },
  {
    title: '5. Revisability',
    body: 'All ideas remain revisable. Update beliefs with new evidence, better reasoning, deeper experience, or clearer insight.',
  },
  {
    title: '6. Faith in Knowledge',
    body: 'Treat knowledge-seeking as a core discipline: curiosity, learning, and honest inquiry are sacred in practice (not enforced as dogma).',
  },
];

export default function CosmicEtherismPrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism Principles</h1>

      <div className="mb-10 p-5 rounded-lg border border-amber-300 bg-amber-50">
        <h2 className="text-xl font-bold mb-2">Non-negotiable separation</h2>
        <p className="text-gray-800">
          Cosmic Etherism and Pi symbolism are <strong>100% optional</strong> and <strong>fully separated</strong>{' '}
          from every other initiative (including civic principles and AI-alignment).
        </p>
        <p className="text-gray-800 mt-3">
          The <strong>only</strong> exception is <strong>Artificial Soul</strong> and its use as a{' '}
          <strong>fiction framework</strong> for staging <strong>King Klown</strong>.
        </p>
      </div>

      <div className="space-y-4">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{p.title}</h2>
            <p className="text-gray-700">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles/cosmic-etherism"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Cosmic Etherism
        </a>
        <a
          href="/principles/cosmic-etherism/symbols/pi"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Pi Symbolism
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
