// app\platforms\page.tsx
// app/platforms/page.tsx
import Card from '@/components/Card'; // Fixed import alias

export const metadata = {
  title: 'Platforms & Products – The kOA initiative',
  description: 'The core software suite: Konnaxion and Orgo.',
};

export default function PlatformsIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We build civic utilities: shared systems for learning, 
          coordination, and governance.
        </p>
      </div>

      {/* Grid adjusted for 2 items: centered with max-width */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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