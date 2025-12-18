// app\principles\ai-alignment\faq\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Âme artificielle – FAQ',
  description: 'Common questions and scope boundaries for the Âme artificielle domain.',
};

const FAQ = [
  {
    q: 'What is “Âme artificielle” in this context?',
    a: 'The practical work of ensuring AI systems behave safely and beneficially under real-world conditions: robust to misuse, honest about uncertainty, privacy-preserving, and governed with accountability.',
  },
  {
    q: 'Is this primarily technical or political?',
    a: 'Both. Alignment requires technical controls (evaluation, security, tool constraints) and governance controls (review, accountability, deployment policy).',
  },
  {
    q: 'Does this domain depend on any spiritual or symbolic worldview?',
    a: 'No. Âme artificielle is independent from Cosmic Etherism and Pi symbolism.',
  },
  {
    q: 'What counts as “unsafe” behavior?',
    a: 'Outputs or actions that create unacceptable risk: facilitating violence, self-harm, fraud, severe privacy leakage, coercive manipulation, illegal activity enablement, or uncontrolled autonomous tool use.',
  },
  {
    q: 'How do you avoid “safety theater”?',
    a: 'By tying principles to measurable tests, requiring release gating, monitoring real-world usage, running incident response drills, and documenting decision records with named owners.',
  },
  {
    q: 'Why is “truthfulness and epistemic humility” included?',
    a: 'Because overconfident hallucinations can cause real harm. The system should prefer accuracy, cite sources when possible, and clearly indicate uncertainty.',
  },
  {
    q: 'What is the relationship to Civic Principles & Ethics?',
    a: 'They overlap in governance: transparency, accountability, rights and duties, and legitimate oversight. The technical domain still keeps its own tests and controls.',
  },
  {
    q: 'What is the minimum bar to ship something?',
    a: 'A documented threat model, passing safety evals for the intended release tier, tool access locked down by default, monitoring + incident response in place, and clear ownership for rollback.',
  },
];

export default function AIAlignmentFaqPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Âme artificielle FAQ</h1>

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
          href="/technology/ame-artificielle"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Âme artificielle
        </a>
        <a
          href="/technology/ame-artificielle/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Principles
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
