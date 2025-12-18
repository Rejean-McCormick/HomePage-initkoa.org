// app\principles\civic-principles-ethics\faq\page.js
import PageSection from '../../components/PageSection';

export const metadata = {
  title: 'Civic Principles & Ethics – FAQ',
  description: 'Common questions and scope boundaries for the Civic Principles & Ethics domain.',
};

const FAQ = [
  {
    q: 'What is the goal of the Civic Principles & Ethics domain?',
    a: 'To define civic values and institutional design principles that protect dignity, rights, and the public good: legitimacy, rule of law, accountability, transparency, and harm reduction.',
  },
  {
    q: 'Is this a partisan political platform?',
    a: 'No. It is an ethical and institutional framework. It can be applied across parties and ideologies, and it is designed to be compatible with pluralism.',
  },
  {
    q: 'Does it require any spiritual or symbolic belief system?',
    a: 'No. It is independent from Cosmic Etherism and Pi symbolism.',
  },
  {
    q: 'How do you balance rights and public safety?',
    a: 'Use proportionality and due process: protect core rights, prefer the least coercive effective means, and require transparent justification and independent oversight.',
  },
  {
    q: 'What does “transparency by default” mean in practice?',
    a: 'Publish rules, decisions, rationales, budgets, and outcomes in plain language, with privacy-preserving redactions and clear exceptions that are time-limited and audited.',
  },
  {
    q: 'What prevents corruption and abuse of power?',
    a: 'Defense in depth: conflict-of-interest rules, open procurement, audit trails, independent oversight with real power, whistleblower protections, and enforceable consequences.',
  },
  {
    q: 'What is the relationship to AI Alignment?',
    a: 'They overlap in governance: oversight, accountability, transparency, and rights protection. AI Alignment adds technical controls and evaluation methods specific to AI systems.',
  },
  {
    q: 'What is the relationship to the King Klown fiction universe?',
    a: 'None required. Fiction may explore themes, but civic principles are written to stand alone as civic ethics.',
  },
];

export default function CivicFaqPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Civic Principles & Ethics FAQ</h1>

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
