// app\principles\cosmic-etherism\practices\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism – Practices',
  description: 'Optional practices for reflection, compassion, harmony-building, and symbolic creativity.',
};

const PRACTICES = [
  {
    title: '1. Daily compassion check',
    body: 'Ask: “Did my actions reduce harm and increase care today?” Keep it small, concrete, and non-performative.',
    bullets: ['Pick one repair action for tomorrow (apology, help, clarity, boundary).'],
  },
  {
    title: '2. Harmony inventory',
    body: 'Scan relationships and responsibilities for friction. Identify one tension and one path to reconciliation.',
    bullets: ['Prefer direct, respectful communication over indirect conflict.'],
  },
  {
    title: '3. Lucidity journal (facts vs meaning)',
    body: 'Write two short lists: (a) what happened (facts), (b) what it meant to you (interpretation). Keep them distinct.',
    bullets: ['Update interpretations when new facts appear.'],
  },
  {
    title: '4. Revisability ritual',
    body: 'Once per week, choose one belief and ask: “What would change my mind?” Then look for real evidence or experience.',
    bullets: ['Treat uncertainty as normal, not as failure.'],
  },
  {
    title: '5. Knowledge devotion (learning practice)',
    body: 'Make learning a steady discipline: read, study, practice a craft, or refine a model of the world.',
    bullets: ['Keep a “questions I’m carrying” list.'],
  },
  {
    title: '6. Symbol work (optional)',
    body: 'Use symbols (including π) as creative anchors: art, writing, meditation prompts, or design motifs—explicitly as symbol, not proof.',
    bullets: [
      'State the symbolic intent.',
      'Invite multiple interpretations.',
      'Avoid turning symbols into authority claims.',
    ],
  },
  {
    title: '7. Benevolence in speech',
    body: 'Practice truth with kindness: be clear, avoid humiliation, and refuse cruelty as entertainment.',
    bullets: ['Correct with respect; disagree without contempt.'],
  },
  {
    title: '8. Service micro-actions',
    body: 'Choose one small action that helps someone without requiring credit: assistance, sharing knowledge, reducing a burden.',
    bullets: ['Prefer consistent micro-actions over rare grand gestures.'],
  },
];

export default function CosmicEtherismPracticesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism Practices</h1>

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
        These practices are optional. They are designed to be low-pressure, concrete, and compatible
        with many belief systems.
      </p>

      <div className="space-y-4">
        {PRACTICES.map((p) => (
          <div key={p.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{p.title}</h2>
            <p className="text-gray-700 mb-3">{p.body}</p>
            {p.bullets?.length ? (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {p.bullets.map((b) => (
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
          href="/principles/cosmic-etherism/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Principles
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
