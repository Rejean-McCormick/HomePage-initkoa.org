// app\principles\civic-principles-ethics\transparency-and-accountability\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – Transparency & Accountability',
  description: 'Verifiability, open records, oversight, anti-corruption, and enforceable consequences.',
};

const SECTIONS = [
  {
    title: '1. Transparency by default',
    body: 'Public power must be inspectable. Secrecy is exceptional, justified, and time-limited.',
    bullets: [
      'Publish rules, decisions, and rationales in plain language.',
      'Default to open data and open records with privacy redactions.',
      'Time-limit classified decisions and require periodic review.',
    ],
  },
  {
    title: '2. Verifiability and audit trails',
    body: 'Claims and decisions should be checkable. Logging and recordkeeping are civic infrastructure.',
    bullets: [
      'Maintain immutable audit logs for critical actions.',
      'Record who decided what, when, and under which authority.',
      'Enable independent audit access with strong safeguards.',
    ],
  },
  {
    title: '3. Oversight with real power',
    body: 'Oversight bodies must have authority, independence, and resources—otherwise they are performative.',
    bullets: [
      'Independent inspector/auditor functions.',
      'Subpoena-like powers for records and testimony where appropriate.',
      'Protection from political retaliation and capture.',
    ],
  },
  {
    title: '4. Accountability with consequences',
    body: 'Abuse and negligence must lead to predictable consequences, not impunity.',
    bullets: [
      'Clear lines of responsibility and named owners.',
      'Graduated consequences: correction → sanctions → removal → prosecution (as applicable).',
      'No “too big to punish” exceptions.',
    ],
  },
  {
    title: '5. Anti-corruption by design',
    body: 'Reduce temptation and increase detection. Make corruption expensive and risky.',
    bullets: [
      'Conflict-of-interest disclosures and recusal rules.',
      'Transparent procurement and contracting.',
      'Whistleblower protections and secure reporting channels.',
    ],
  },
  {
    title: '6. Public explanation duties',
    body: 'When power acts, it owes reasons. Public justification is a core legitimacy mechanism.',
    bullets: [
      'Explain goals, tradeoffs, and constraints.',
      'Publish what evidence was used and what was rejected.',
      'Document uncertainty and why action was still taken.',
    ],
  },
  {
    title: '7. Privacy-preserving transparency',
    body: 'Transparency must not become surveillance. Protect individuals while opening institutions.',
    bullets: [
      'Redact personal identifiers; publish aggregates where possible.',
      'Limit data retention and access to sensitive records.',
      'Require warrants/authorizations for intrusive investigation.',
    ],
  },
  {
    title: '8. Remedies and repair',
    body: 'When institutions harm people, there must be accessible repair mechanisms.',
    bullets: [
      'Fast complaint handling with response guarantees.',
      'Compensation and restoration where appropriate.',
      'Policy correction and systemic fixes, not only individual settlements.',
    ],
  },
];

export default function TransparencyAccountabilityPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Transparency & Accountability</h1>

      <p className="text-gray-700 mb-8">
        Transparency makes public power inspectable. Accountability ensures that inspection has
        consequences. Together they reduce corruption, increase legitimacy, and improve outcomes.
      </p>

      <div className="space-y-4">
        {SECTIONS.map((s) => (
          <div key={s.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{s.title}</h2>
            <p className="text-gray-700 mb-3">{s.body}</p>
            {s.bullets?.length ? (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
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
          href="/principles/civic-principles-ethics/institutions"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Institutions
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
