// app\principles\civic-principles-ethics\rights-and-duties\page.js
import PageSection from '../../components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – Rights & Duties',
  description: 'Rights that protect dignity and freedom, and duties that protect the commons.',
};

const RIGHTS = [
  {
    title: '1. Right to dignity and bodily autonomy',
    body: 'People must be protected from coercion, abuse, and degrading treatment. Bodily autonomy is fundamental.',
  },
  {
    title: '2. Right to due process',
    body: 'No punishment or deprivation without fair procedure: notice, reasons, hearing, and appeal.',
  },
  {
    title: '3. Right to equal protection',
    body: 'Rules must apply consistently, with remedies for discriminatory harm and unfair treatment.',
  },
  {
    title: '4. Right to freedom of conscience and belief',
    body: 'People may hold and change beliefs without coercion, while respecting boundaries that prevent direct harm to others.',
  },
  {
    title: '5. Right to expression and information',
    body: 'Protect speech and access to information, balanced with limits against direct incitement, targeted harassment, and rights violations.',
  },
  {
    title: '6. Right to privacy',
    body: 'Personal data and intimate life deserve protection. Surveillance must be constrained, justified, and accountable.',
  },
  {
    title: '7. Right to participation',
    body: 'People have meaningful avenues to influence civic decisions and to contest power peacefully.',
  },
];

const DUTIES = [
  {
    title: '1. Duty of non-harm',
    body: 'Do not violate others’ rights. Avoid cruelty, coercion, and preventable harm.',
  },
  {
    title: '2. Duty to uphold the commons',
    body: 'Support shared infrastructure and public goods: environments, institutions, and basic civic systems.',
  },
  {
    title: '3. Duty of honesty in public life',
    body: 'Avoid fraud, corruption, and manipulation; support transparency and truthful public discourse.',
  },
  {
    title: '4. Duty to respect pluralism',
    body: 'Respect others’ conscience and identity. Disagree without dehumanization or persecution.',
  },
  {
    title: '5. Duty to participate (as able)',
    body: 'Contribute to civic life through voting, service, community care, oversight, and constructive engagement.',
  },
  {
    title: '6. Duty of proportional response',
    body: 'Use the least coercive effective means; avoid escalation and collective punishment.',
  },
];

export default function RightsAndDutiesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Rights & Duties</h1>

      <p className="text-gray-700 mb-8">
        Rights protect dignity and freedom. Duties protect the commons and ensure that liberty does
        not become domination.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Core rights</h2>
        <div className="space-y-4">
          {RIGHTS.map((r) => (
            <div key={r.title} className="p-5 rounded-lg border border-gray-200 bg-white">
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-gray-700">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">Core duties</h2>
        <div className="space-y-4">
          {DUTIES.map((d) => (
            <div key={d.title} className="p-5 rounded-lg border border-gray-200 bg-white">
              <h3 className="text-lg font-bold mb-2">{d.title}</h3>
              <p className="text-gray-700">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-5 rounded-lg border border-gray-200 bg-white">
        <h2 className="text-2xl font-bold mb-3 text-primary">Balancing rule</h2>
        <p className="text-gray-700">
          When rights conflict, prefer solutions that preserve dignity, minimize coercion, and use
          proportional measures. The goal is a stable civic order where freedom is real for everyone,
          not only the powerful.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles/civic-principles-ethics"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Civic Domain
        </a>
        <a
          href="/principles/civic-principles-ethics/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Civic Principles
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
