//  app/infrastructures/page.tsx
import Card from '@/components/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Infrastructures – The kOA Initiative',
  description:
    'The material and virtual settings for building capabilities together, from renewable computing research to a virtual-city prototype.',
};

export default function InfrastructureIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Infrastructures</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The foundation layer of the ecosystem: resilient systems that make learning, coordination,
          and governance feasible in the real world.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          One part is physical (where intelligence can run efficiently). One part is experiential
          (where communities can navigate knowledge and decisions together).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card
          title="Kristal Farms"
          description="Research into flexible computing near renewable energy, with community demand as a priority."
          href="/infrastructures/kristal-farms"
        />
        <Card
          title="Kin City"
          description="A virtual-city prototype for exploring knowledge, learning, culture and civic participation."
          href="/infrastructures/kin-city"
        />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-gray-500 mb-4">Looking for the software suite?</p>
        <Link href="/platforms" className="text-blue-600 font-bold hover:underline">
          View Platforms & Products →
        </Link>
      </div>
    </main>
  );
}
