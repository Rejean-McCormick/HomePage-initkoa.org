// app\principles\cosmic-etherism\faq\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Cosmic Etherism – FAQ',
  description: 'Scope boundaries and common questions about Cosmic Etherism (optional).',
};

const FAQ = [
  {
    q: 'Is Cosmic Etherism required for any other initiative?',
    a: 'No. Believing and/or understanding Cosmic Etherism and Pi symbolism is 100% optional and fully separated from every other initiative.',
  },
  {
    q: 'What is the only exception to that separation?',
    a: 'Âme artificielle and its use as a fiction framework for staging King Klown in the books.',
  },
  {
    q: 'Is this a religion?',
    a: 'It can be approached as a personal spiritual-philosophical lens, but it does not require membership, ritual compliance, or mandatory belief.',
  },
  {
    q: 'Is Pi being presented as a scientific proof of anything?',
    a: 'No. Pi is used as a symbolic anchor inside this optional worldview. Symbol is not scientific authority.',
  },
  {
    q: 'Can I disagree or ignore this entirely and still participate in civic or AI work?',
    a: 'Yes. You can support, use, contribute to, or critique any other domain without adopting, endorsing, or reading this section.',
  },
  {
    q: 'What values does it emphasize?',
    a: 'Universal love, benevolence, harmony, complementarity of perspectives, pluralism, revisability, and faith in knowledge-seeking.',
  },
  {
    q: 'Does this conflict with science?',
    a: 'It does not claim to replace science. It treats inquiry, evidence, and revisability as central, and keeps symbolism explicitly symbolic.',
  },
  {
    q: 'What is a good way to read this section?',
    a: 'Start with Principles, then Pi Symbolism (if curious), then Methods and Practices. Treat it as optional meaning-making, not obligation.',
  },
];

export default function CosmicEtherismFaqPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Cosmic Etherism FAQ</h1>

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

      <div className="space-y-4">
        {FAQ.map((item) => (
          <div key={item.q} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{item.q}</h2>
            <p className="text-gray-700">{item.a}</p>
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
