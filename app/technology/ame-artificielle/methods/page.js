// app\principles\ai-alignment\methods\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Âme artificielle – Methods',
  description: 'Methods for evaluating, governing, and operating AI systems safely.',
};

const METHODS = [
  {
    title: '1. Threat modeling (before building)',
    body: 'Define actors, incentives, assets, and failure modes. Identify misuse paths, accident paths, and systemic risks.',
    bullets: ['Misuse: malicious users, prompt injection, jailbreaking, automation abuse.'],
  },
  {
    title: '2. Evaluation ladder (capability → risk)',
    body: 'Gate releases using an evaluation ladder that scales with model capability and real-world access.',
    bullets: ['Escalate tests when tools, autonomy, or sensitive domains are enabled.'],
  },
  {
    title: '3. Red-teaming and adversarial testing',
    body: 'Use internal and external red teams. Test for persuasion, deception, privacy leakage, policy bypass, and unsafe autonomy.',
    bullets: ['Include multilingual and cultural attack coverage.'],
  },
  {
    title: '4. Safety benchmarks and regression testing',
    body: 'Treat safety as a CI pipeline: keep a stable test suite and track regressions across versions.',
    bullets: ['Pin baselines, monitor drift, and block releases on critical regressions.'],
  },
  {
    title: '5. Data governance + provenance',
    body: 'Control training and finetune data sources. Document provenance, consent, and sensitive data handling.',
    bullets: ['Prefer minimal retention; classify and restrict high-risk data.'],
  },
  {
    title: '6. Policy → product translation',
    body: 'Convert written policy into enforceable product behaviors: UX friction, refusals, tool constraints, and logging.',
    bullets: ['Policy must be testable in the product, not only documented.'],
  },
  {
    title: '7. Access control + least privilege tooling',
    body: 'Restrict what the model can do: tool allowlists, scoped permissions, explicit user approvals, and sandboxing.',
    bullets: ['Default-deny; enable capabilities incrementally.'],
  },
  {
    title: '8. Interpretability, inspection, and audits',
    body: 'Prefer mechanisms that allow inspection: trace logs, rationales where safe, and independent audits.',
    bullets: ['Audit for both safety and fairness impacts.'],
  },
  {
    title: '9. Post-deployment monitoring',
    body: 'Monitor real usage: abuse patterns, refusal rates, harmful outputs, data leakage signals, and tool misuse.',
    bullets: ['Ship telemetry that can detect unknown unknowns.'],
  },
  {
    title: '10. Incident response + rollback',
    body: 'Have a practiced playbook: triage, mitigation, comms, and rollback authority. Treat severe incidents like SEVs.',
    bullets: ['Define severity levels and response time goals.'],
  },
  {
    title: '11. Governance checkpoints',
    body: 'Use staged approvals for higher-risk releases: security review, legal/privacy review, external oversight where appropriate.',
    bullets: ['Keep decision logs and named owners.'],
  },
  {
    title: '12. Alignment as continuous improvement',
    body: 'Assume the environment shifts. Keep updating evaluations, mitigations, and policy based on incidents and new capabilities.',
    bullets: ['Reward reporting and corrective action, not concealment.'],
  },
];

export default function AIAlignmentMethodsPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Âme artificielle Methods</h1>

      <p className="text-gray-700 mb-8">
        These methods describe how to operationalize the Âme artificielle principles: planning,
        evaluation, governance, and safe deployment.
      </p>

      <div className="space-y-4">
        {METHODS.map((m) => (
          <div key={m.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{m.title}</h2>
            <p className="text-gray-700 mb-3">{m.body}</p>
            {m.bullets?.length ? (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
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
          href="/principles/ame-artificielle/principles"
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
