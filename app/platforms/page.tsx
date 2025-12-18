// app\platforms\page.tsx
import Card from '../../components/Card';

export const metadata = {
  title: 'Platforms & Products – King Klown & KOA',
  description: 'The core software suite: Konnaxion, Orgo, Kristal Farms, and Kréature.',
};

export default function PlatformsIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We build civic utilities: shared infrastructure for learning, 
          coordination, and governance.
        </p>
      </div>

      {/* Adjusted grid to handle 4 items nicely if needed, or keep grid-cols-3 and let it wrap */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          title="Konnaxion"
          description="The Public Engine. A unified operating system for collective intelligence, education, and meritocratic governance."
          href="/platforms/konnaxion"
        />
        <Card
          title="Orgo"
          description="The Private Engine. An offline-first organizational tool for role-based task routing and secure coordination."
          href="/platforms/orgo"
        />
        <Card
          title="Kristal Farms"
          description="The Infrastructure. Green AI data centers powering the ecosystem with renewable energy and open knowledge."
          href="/platforms/kristal-farms"
        />
        <Card
          title="Kréature (FR)"
          description="The Mythopoetic Interface. Explore the ecosystem as a living organism through King Klown's narrative lens. (French section)."
          href="/platforms/kreature"
        />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-gray-500 mb-4">Looking for the underlying engines?</p>
        <a href="/technology" className="text-primary font-bold hover:underline">
          View Technology Stack →
        </a>
      </div>
    </main>
  );
}