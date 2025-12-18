// app\principles\civic-principles-ethics\institutions\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – Institutions',
  description: 'Design principles for civic institutions: integrity, service, checks and balances.',
};

const SECTIONS = [
  {
    title: '1. Service-first design',
    body: 'Institutions exist to serve the public. Prioritize measurable public outcomes over internal convenience or prestige.',
    bullets: [
      'Define the public purpose explicitly.',
      'Measure outcomes that matter (wellbeing, safety, access, fairness).',
      'Remove incentives that reward bureaucracy over results.',
    ],
  },
  {
    title: '2. Checks and balances',
    body: 'Distribute power to prevent capture and abuse. Oversight must be independent and empowered.',
    bullets: [
      'Separate roles (execute, audit, adjudicate).',
      'Require multi-party approval for high-impact decisions.',
      'Ensure independent review and meaningful appeal paths.',
    ],
  },
  {
    title: '3. Integrity and anti-corruption',
    body: 'Corruption destroys legitimacy. Build systems that reduce temptation and raise the cost of abuse.',
    bullets: [
      'Clear conflict-of-interest rules and disclosure.',
      'Procurement transparency and competitive processes.',
      'Whistleblower protections and strong audit trails.',
    ],
  },
  {
    title: '4. Transparency by default',
    body: 'Public power must be inspectable. Secrecy is exceptional, justified, and time-limited.',
    bullets: [
      'Open records and public decision rationales.',
      'Accessible reporting and plain-language summaries.',
      'Clear rules for classified or private information with audits.',
    ],
  },
  {
    title: '5. Due process and equal access',
    body: 'People must have predictable rules, fair hearings, and equal access to remedies.',
    bullets: [
      'Publish rules and procedures.',
      'Provide notice, reasons, and appeal mechanisms.',
      'Reduce barriers: language, disability access, affordability.',
    ],
  },
  {
    title: '6. Competence and professionalism',
    body: 'Institutions must be staffed and trained to do the job well. Competence is an ethical requirement.',
    bullets: [
      'Merit-based hiring and transparent promotion.',
      'Continuous training and clear standards.',
      'Accountability for negligence and preventable failure.',
    ],
  },
  {
    title: '7. Resilience and continuity',
    body: 'Systems should handle shocks without collapsing or concentrating power in permanent “emergency mode.”',
    bullets: [
      'Defined emergency powers with sunset clauses.',
      'Redundancy for critical services.',
      'Post-incident reviews and corrective action.',
    ],
  },
  {
    title: '8. Participation and feedback loops',
    body: 'Legitimacy improves when people can participate, be heard, and see corrections happen.',
    bullets: [
      'Public consultation with real impact.',
      'Complaint channels with response guarantees.',
      'Publish what changed and why.',
    ],
  },
];

export default function CivicInstitutionsPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Institutions</h1>

      <p className="text-gray-700 mb-8">
        These principles describe how civic institutions should be designed and operated to remain
        legitimate, effective, and resistant to abuse.
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
          href="/principles/civic-principles-ethics/transparency-and-accountability"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Transparency & Accountability
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
