// app/platforms/page.tsx
import Card from '@/components/Card';

export const metadata = {
  title: 'Platforms — kOA',
  description:
    'The governable software platforms of the kOA ecosystem: Konnaxion (public coordination) and Orgo (offline organizational execution).',
};

export default function PlatformsIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Platforms</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          kOA platforms are civic utilities: systems that help communities and organizations move from{' '}
          <strong>knowledge</strong> to <strong>deliberation</strong> to <strong>execution</strong>, while staying{' '}
          <strong>auditable</strong>, <strong>contestable</strong>, and <strong>offline-capable</strong> where needed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card
          title="Konnaxion"
          description="The public coordination platform. A governable operating layer for collective intelligence: roles, deliberation, structured knowledge, and legitimacy-aware decision workflows."
          href="/platforms/konnaxion"
        />
        <Card
          title="Orgo"
          description="The execution platform. Offline-first coordination for teams: role-based task routing, secure workflows, and durable operational memory without dependency on always-on networks."
          href="/platforms/orgo"
        />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-gray-500 mb-4">Want the components behind these platforms?</p>
        <a href="/technology" className="text-primary font-bold hover:underline">
          View Technology Stack →
        </a>
      </div>
    </main>
  );
}
