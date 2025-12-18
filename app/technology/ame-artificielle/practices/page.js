// app\principles\ai-alignment\practices\page.js
import PageSection from '@/components/PageSection';

export const metadata = {
  title: 'Âme artificielle – Practices',
  description: 'Day-to-day operational practices for shipping and operating AI systems safely.',
};

const PRACTICES = [
  {
    title: '1. Release gating',
    body: 'No release without passing the current safety bar. Higher capability and higher access require higher scrutiny.',
    bullets: [
      'Define a minimum evaluation suite per release tier.',
      'Block release on critical regressions (privacy, self-harm, violence, fraud, manipulation, tool misuse).',
      'Require explicit sign-off for enabling tools, autonomy, or sensitive domains.',
    ],
  },
  {
    title: '2. Change logs and decision records',
    body: 'Record what changed, why it changed, and who approved it. Preserve the rationale for future audits.',
    bullets: ['Keep a short decision log for each release and each safety exception.'],
  },
  {
    title: '3. Safe defaults',
    body: 'Start locked-down and expand carefully. Defaults should minimize harm without relying on user expertise.',
    bullets: [
      'Default-deny for tools and external actions.',
      'Prefer read-only access over write access.',
      'Prefer explicit confirmation before consequential steps.',
    ],
  },
  {
    title: '4. Least privilege access',
    body: 'Grant the minimum data and permissions required for a task; scope credentials by time, domain, and capability.',
    bullets: [
      'Use short-lived tokens and scoped permissions.',
      'Separate prod vs. staging; separate human vs. automated credentials.',
      'No broad “god mode” for routine use.',
    ],
  },
  {
    title: '5. Monitoring and alerting',
    body: 'Continuously monitor for unsafe behavior, abuse, and drift. Alert on spikes and anomalies.',
    bullets: [
      'Track unsafe content rates, refusal rates, escalation rates, and tool invocation patterns.',
      'Detect prompt injection patterns and jailbreak signatures.',
      'Alert on unusual access to sensitive data and output leakage signals.',
    ],
  },
  {
    title: '6. Incident response drills',
    body: 'Practice before it happens: run tabletop exercises and live drills with clear roles and escalation paths.',
    bullets: [
      'Define severity levels and response playbooks.',
      'Assign an on-call rotation with rollback authority.',
      'Keep postmortems blameless and corrective-action driven.',
    ],
  },
  {
    title: '7. User transparency',
    body: 'Be explicit about limits, uncertainty, and data handling. Avoid misleading anthropomorphism or hidden persuasion.',
    bullets: [
      'Communicate confidence/uncertainty where possible.',
      'Disclose tool usage when it affects outcomes.',
      'Make it easy to report unsafe outputs.',
    ],
  },
  {
    title: '8. Abuse handling and enforcement',
    body: 'Have clear processes for abuse reports, rate limits, bans, and rapid mitigation without overreach.',
    bullets: [
      'Escalate repeat offenders and coordinated abuse.',
      'Apply progressive friction (rate limits → captchas → restriction → ban).',
      'Preserve evidence for investigation while respecting privacy.',
    ],
  },
  {
    title: '9. Data minimization',
    body: 'Collect and store the minimum necessary. Prefer aggregation, redaction, and short retention windows.',
    bullets: [
      'Redact secrets and sensitive identifiers from logs where feasible.',
      'Separate telemetry from content; restrict access to both.',
      'Explicit retention policies with periodic enforcement.',
    ],
  },
  {
    title: '10. Evaluation hygiene',
    body: 'Keep evals trustworthy: avoid leakage, keep datasets versioned, and prevent “teaching to the test” from masking real risk.',
    bullets: [
      'Version eval suites and document changes.',
      'Use held-out adversarial sets.',
      'Triangulate with real-world monitoring feedback.',
    ],
  },
];

export default function AIAlignmentPracticesPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Âme artificielle Practices</h1>

      <p className="text-gray-700 mb-8">
        These are operational norms: what teams do day-to-day to maintain safety, reliability, and
        accountability after the principles and methods are defined.
      </p>

      <div className="space-y-4">
        {PRACTICES.map((p) => (
          <div key={p.title} className="p-5 rounded-lg border border-gray-200 bg-white">
            <h2 className="text-lg font-bold mb-2">{p.title}</h2>
            <p className="text-gray-700 mb-3">{p.body}</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
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
          href="/technology/ame-artificielle/methods"
          className="px-4 py-2 rounded-md border border-gray-200 bg-white hover:shadow-sm"
        >
          Methods
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
