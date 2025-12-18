// app\principles\map\page.js
import PageSection from '../components/PageSection';

export const metadata = {
  title: 'Principles Map – kOA / King Klown',
  description: 'A simple map linking the three axioms to the three domains.',
};

const AXIOMS = [
  { title: 'Radical Lucidity', desc: 'Evidence, clarity, honest diagnosis.' },
  { title: 'Integral Cooperation', desc: 'Coordination, collaboration, shared wins.' },
  { title: 'Open Technology', desc: 'Verifiability, transparency, open systems.' },
];

const DOMAINS = [
  {
    title: 'AI Alignment',
    href: '/principles/ai-alignment',
    desc: 'Technical + governance principles for safe AI.',
  },
  {
    title: 'Civic Principles & Ethics',
    href: '/principles/civic-principles-ethics',
    desc: 'Institutions, rights/duties, accountability, ethics.',
  },
  {
    title: 'Cosmic Etherism (Optional)',
    href: '/principles/cosmic-etherism',
    desc:
      'Personal Pi symbolism + worldview. Fully separated from other initiatives, except Artificial Soul in King Klown fiction.',
    accent: true,
  },
];

const LINKS = {
  // Radical Lucidity
  '0-0': '/principles/ai-alignment/principles',
  '0-1': '/principles/civic-principles-ethics/principles',
  '0-2': '/principles/cosmic-etherism/principles',

  // Integral Cooperation
  '1-0': '/principles/ai-alignment/methods',
  '1-1': '/principles/civic-principles-ethics/institutions',
  '1-2': '/principles/cosmic-etherism/practices',

  // Open Technology
  '2-0': '/principles/ai-alignment/practices',
  '2-1': '/principles/civic-principles-ethics/transparency-and-accountability',
  '2-2': '/principles/cosmic-etherism/symbols/pi',
};

export default function PrinciplesMapPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Principles Map</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {DOMAINS.map((d) => (
          <a
            key={d.href}
            href={d.href}
            className={[
              'block p-5 rounded-lg border hover:shadow-sm',
              d.accent ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            <h2 className="text-lg font-bold mb-2">{d.title}</h2>
            <p className={d.accent ? 'text-gray-800' : 'text-gray-700'}>{d.desc}</p>
          </a>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b border-gray-200">Axiom</th>
              {DOMAINS.map((d) => (
                <th key={d.href} className="text-left p-3 border-b border-gray-200">
                  {d.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AXIOMS.map((a, r) => (
              <tr key={a.title} className="align-top">
                <td className="p-3 border-b border-gray-200">
                  <div className="font-bold">{a.title}</div>
                  <div className="text-gray-600">{a.desc}</div>
                </td>

                {DOMAINS.map((d, c) => {
                  const key = `${r}-${c}`;
                  const href = LINKS[key];
                  const isCosmic = c === 2;
                  return (
                    <td
                      key={key}
                      className={[
                        'p-3 border-b border-gray-200',
                        isCosmic ? 'bg-amber-50' : '',
                      ].join(' ')}
                    >
                      {href ? (
                        <a className="underline" href={href}>
                          Open
                        </a>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Principles
        </a>
        <a
          href="/principles/glossary"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Glossary
        </a>
      </div>
    </PageSection>
  );
}
