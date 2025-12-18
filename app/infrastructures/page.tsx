// app/infrastructures/page.tsx
import Card from '@/components/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Infrastructure – King Klown & KOA',
  description: 'The physical and virtual foundations: Kristal Farms and Kin City.',
};

export default function InfrastructureIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Infrastructure</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The bedrock of our ecosystem. We build the physical engines for green compute 
          and the virtual cities for community collaboration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card
          title="Kristal Farms"
          description="The Hardware. Green AI data centers co-located with hydro power to export intelligence and recycle heat for food security."
          href="/infrastructures/kristal-farms"
        />
        <Card
          title="Kin City"
          description="The Interface. A virtual city metaverse that organizes knowledge, governance, and community into navigable districts."
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