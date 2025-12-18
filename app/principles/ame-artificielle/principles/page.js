// app\principles\ai-alignment\principles\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Âme artificielle – Principles',
  description: 'Core safety and alignment principles for AI systems.',
};

const PRINCIPLES = [
  {
    title: '1. Human agency and consent',
    body: 'Systems must preserve user choice, avoid coercion, and default to asking before taking consequential actions.',
  },
  {
    title: '2. Safety over capability',
    body: 'Increase power only when safety and control mechanisms scale at least as fast as capability.',
  },
  {
    title: '3. Truthfulness and epistemic humility',
    body: 'Prefer accurate, sourced, uncertainty-aware outputs. Admit unknowns and avoid fabricated certainty.',
  },
  {
    title: '4. Robustness to misuse',
    body: 'Assume adversarial pressure. Reduce the blast radius of misuse through layered mitigations and monitoring.',
  },
  {
    title: '5. Alignment to explicit values',
    body: 'Make goals and constraints explicit: what the system is optimizing, what it must not do, and what it should refuse.',
  },
  {
    title: '6. Least privilege and minimization',
    body: 'Grant the minimum access needed (data, tools, permissions). Minimize sensitive data exposure and retention.',
  },
  {
    title: '7. Interpretability and auditability',
    body: 'Prefer designs that can be inspected, tested, logged, and meaningfully audited by internal and external reviewers.',
  },
  {
    title: '8. Continuous evaluation',
    body: 'Treat evaluation as ongoing: pre-release, post-release, and after distribution shifts. Measure what matters.',
  },
  {
    title: '9. Defense-in-depth',
    body: 'Rely on multiple independent safeguards (policy, technical controls, product UX, and oversight), not a single gate.',
  },
  {
    title: '10. Accountability and governance',
    body: 'Tie decisions to named owners, documented rationale, and enforceable review processes with clear rollback authority.',
  },
  {
    title: '11. Privacy and security by design',
    body: 'Protect user data, prevent leakage, and design secure defaults. Security is a core alignment constraint.',
  },
  {
    title: '12. Respect for rights and dignity',
    body: 'Avoid targeted harassment, discrimination, and manipulation. Minimize harmful stereotyping and dehumanization.',
  },
];

export default function AIAlignmentPrinciplesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Âme artificielle Principles</h1>

      <p className="text-gray-700 mb-8">
        These principles define the safety properties we want from AI systems. They are intended to
        be practical: each principle should map to tests, controls, and operational policies.
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
          href="/principles/ame-artificielle"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Back to Âme artificielle
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
