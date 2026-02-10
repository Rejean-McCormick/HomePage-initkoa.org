// app/principles/glossary/page.js
import Link from 'next/link';
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Glossary – Principles',
  description:
    'Shared vocabulary used across Âme artificielle, Civic Principles & Ethics, Logos & Mythos, and Cosmic Etherism (optional).',
};

const TERMS = [
  {
    term: 'Axiom',
    def: 'A short, foundational principle used to orient decisions and interpretation across domains.',
  },
  {
    term: 'Radical Lucidity',
    def: 'A commitment to clear seeing: evidence, explicit assumptions, honest diagnosis, and avoidance of self-deception.',
  },
  {
    term: 'Integral Cooperation',
    def: 'A commitment to coordination across roles, groups, and incentives—aiming for shared outcomes over factionalism.',
  },
  {
    term: 'Open Technology',
    def: 'A commitment to verifiable systems: transparency by design, auditability, reproducibility, and public accountability.',
  },
  {
    term: 'Domain',
    def: 'A clearly separated area of principles and practices (Âme artificielle, Civic Principles & Ethics, Logos & Mythos, Cosmic Etherism).',
  },
  {
    term: 'Âme artificielle',
    def: 'Work focused on making AI systems safe and beneficial through technical design, evaluation, governance, and deployment constraints.',
  },
  {
    term: 'Civic Principles & Ethics',
    def: 'Norms and structures for society: institutions, rights and duties, legitimacy, accountability, transparency, and public ethics.',
  },
  {
    term: 'Logos & Mythos',
    def: 'Language as infrastructure: meaning, narrative, symbols, and speech acts—used as tools for coordination, with safeguards against manipulation.',
  },
  {
    term: 'Cosmic Etherism (Optional)',
    def: 'A personal spiritual-philosophical lens (including Pi symbolism). Participation and belief are optional and must remain separated from civic authority and technical claims.',
  },
  {
    term: 'Pi (π) Symbolism',
    def: 'A symbolic anchor within Cosmic Etherism used to represent invariance and coherence; not a required scientific, technical, or policy claim.',
  },
  {
    term: 'King Klown (Fiction)',
    def: 'A fictional framework and mythos where some motifs may be staged; not a requirement for civic participation or technical work.',
  },
  {
    term: 'Separation (Non-negotiable)',
    def: 'A rule of scope: optional symbolism and fiction must not be treated as prerequisites, endorsements, or implied commitments for any other initiative.',
  },
  {
    term: 'Verifiability',
    def: 'The property of a claim or system being checkable by others via evidence, logs, audits, replication, or transparent process.',
  },
  {
    term: 'Accountability',
    def: 'Clear responsibility, traceable decisions, and real consequences for misuse or failure—paired with transparent oversight.',
  },
  {
    term: 'Governance',
    def: 'Decision rules and institutions: who can decide what, under which constraints, with which review mechanisms and appeal paths.',
  },
  {
    term: 'Epistemic Humility',
    def: 'A stance that treats knowledge as revisable; encourages correction, uncertainty, and updates rather than rigid certainty.',
  },
  {
    term: 'Open Knowledge Commons',
    def: 'A shared body of information and tools that is accessible, reusable, and maintained with norms for attribution and integrity.',
  },
];

export default function PrinciplesGlossaryPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Glossary</h1>

      <p className="text-gray-700 mb-8 max-w-3xl">
        Definitions for shared terms used throughout the Principles hub. Where a term is labeled “optional,” it is
        explicitly separated from civic authority and technical requirements.
      </p>

      <div className="space-y-4">
        {TERMS.map(({ term, def }) => (
          <div key={term} className="p-5 rounded-lg border border-gray-200 bg-white">
            <div className="font-bold text-lg">{term}</div>
            <div className="text-gray-700 mt-2">{def}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/principles"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Principles
        </Link>
        <Link
          href="/principles/map"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Map
        </Link>
      </div>
    </PageSection>
  );
}
