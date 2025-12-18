// app\principles\cosmic-etherism\methods\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism – Methods',
  description: 'How Cosmic Etherism is explored: inquiry, experience, interpretation, and revision (optional).',
};

const METHODS = [
  {
    title: '1. Lucid inquiry',
    body: 'Seek clarity about what is being claimed: distinguish metaphor, symbol, intuition, and empirical assertion.',
    bullets: [
      'Ask: is this a poetic pointer or a testable claim?',
      'Name assumptions explicitly.',
      'Prefer plain language before abstraction.',
    ],
  },
  {
    title: '2. Compassion-first interpretation',
    body: 'Interpret others charitably. Treat disagreements as opportunities for understanding rather than combat.',
    bullets: ['Assume good faith unless there is clear evidence otherwise.'],
  },
  {
    title: '3. Multiple modes of knowing',
    body: 'Use reason, lived experience, intuition, and creative symbolism as complementary lenses (not as coercive authority).',
    bullets: [
      'Reason: logic, coherence, consistency checks.',
      'Experience: what is actually lived and observed.',
      'Intuition: pattern sense; treated as provisional.',
      'Symbol: meaning-making; treated as optional.',
    ],
  },
  {
    title: '4. Revisability loop',
    body: 'Update beliefs over time. No doctrine is fixed. Treat new evidence and new insight as invitations to revise.',
    bullets: ['Keep a “what changed my mind” log when useful.'],
  },
  {
    title: '5. Ethical grounding',
    body: 'Anchor decisions in love, benevolence, and harm reduction—especially when uncertainty is high.',
    bullets: ['When unsure, default toward minimizing harm and preserving dignity.'],
  },
  {
    title: '6. Coherence checks (internal + external)',
    body: 'Check internal coherence (no contradictions) and external coherence (does it fit the world as experienced?).',
    bullets: [
      'Internal: do the parts fit together?',
      'External: does it lead to better understanding or better behavior?',
    ],
  },
  {
    title: '7. Consent and freedom of conscience',
    body: 'Never pressure belief. This worldview is opt-in, personal, and non-binding.',
    bullets: ['No “membership tests.” No required agreement.'],
  },
  {
    title: '8. Symbol discipline (Pi as symbol)',
    body: 'Use symbols to orient meaning, not to smuggle claims. Be explicit about when Pi is symbolic vs mathematical.',
    bullets: [
      'State the symbolic intent clearly.',
      'Avoid implying scientific authority from symbolism.',
      'Invite interpretation; do not demand it.',
    ],
  },
];

export default function CosmicEtherismMethodsPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism Methods</h1>

      <div className="mb-10 p-5 rounded-lg border border-amber-300 bg-amber-50">
        <h2 className="text-xl font-bold mb-2">Non-negotiable separation</h2>
        <p className="text-gray-800">
          Cosmic Etherism and Pi symbolism are <strong>100% optional</strong> and{' '}
          <strong>fully separated</strong> from every other initiative (including civic principles
          and AI-alignment).
        </p>
        <p className="text-gray-800 mt-3">
          The <strong>only</strong> exception is <strong>Âme artificielle</strong> and its use as a{' '}
          <strong>fiction framework</strong> for staging <strong>King Klown</strong>.
        </p>
      </div>

      <p className="text-gray-700 mb-8">
        These methods describe how Cosmic Etherism is explored without coercion: a disciplined mix
        of inquiry, interpretation, and revision, anchored in compassion.
      </p>

      <div className="space-y-4">
        {METHODS.map((m) => (
          <div key={m.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{m.title}</h2>
            <p className="text-gray-700 mb-3">{m.body}</p>
            {m.bullets?.length ? (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
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
