// app\principles\civic-principles-ethics\principles\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – Principles',
  description: 'Core civic values: legitimacy, rights, duties, fairness, and harm reduction.',
};

const PRINCIPLES = [
  {
    title: '1. Human dignity',
    body: 'Treat every person as intrinsically worthy. Systems must avoid dehumanization, humiliation, and cruelty.',
  },
  {
    title: '2. Legitimacy and consent of the governed',
    body: 'Power requires justification: fair process, public reasoning, and mechanisms for participation and peaceful change.',
  },
  {
    title: '3. Equal protection and non-discrimination',
    body: 'Equal protection under the rules. Avoid discriminatory outcomes and ensure remedies when harms occur.',
  },
  {
    title: '4. Rule of law (not rule of people)',
    body: 'Rules must be public, stable, and consistently applied. Due process and appeal paths are mandatory.',
  },
  {
    title: '5. Rights with duties',
    body: 'Rights protect freedom and dignity; duties protect the commons. Balance liberty with responsibility.',
  },
  {
    title: '6. Harm reduction',
    body: 'Prefer policies and institutions that reduce suffering and prevent avoidable harm, especially for the vulnerable.',
  },
  {
    title: '7. Transparency as default',
    body: 'Public power must be inspectable. Secret governance is a last resort and must be tightly constrained.',
  },
  {
    title: '8. Accountability with consequences',
    body: 'There must be traceable responsibility for decisions, and real consequences for abuse, corruption, and negligence.',
  },
  {
    title: '9. Proportionality',
    body: 'Interventions must be no more restrictive than necessary. Use the least coercive effective means.',
  },
  {
    title: '10. Checks and balances',
    body: 'Distribute power to prevent capture and abuse. Independent oversight and separation of functions are required.',
  },
  {
    title: '11. Public service orientation',
    body: 'Institutions exist to serve the public, not themselves. Measure outcomes that matter, not internal convenience.',
  },
  {
    title: '12. Pluralism and freedom of conscience',
    body: 'Protect plural belief and expression while maintaining limits against direct harm, coercion, or rights violations.',
  },
];

export default function CivicPrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Civic Principles</h1>

      <p className="text-gray-700 mb-8">
        These principles define the civic ethic: how power should be justified, constrained, and
        exercised in ways that protect dignity, rights, and the public good.
      </p>

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
          href="/principles/civic-principles-ethics"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Civic Domain
        </a>
        <a
          href="/principles/civic-principles-ethics/rights-and-duties"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Rights & Duties
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
