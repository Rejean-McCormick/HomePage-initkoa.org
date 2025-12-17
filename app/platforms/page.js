import Card from '../../components/Card';

export const metadata = {
  title: 'Our Platforms – King Klown & KOA',
  description: 'The technological tools powering our socio-technical movement: Konnaxion, Kristal Farms, Orgo, and Ekoh.',
};

export default function PlatformsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Technological Platforms</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We don't just propose policies; we build the tools to implement them.
          These four platforms form the backbone of the KOA ecosystem.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card
          title="Konnaxion"
          description="The Global Knowledge Graph. A Wikipedia-scale platform designed to map, verify, and interconnect human knowledge, amplifying collective intelligence."
          href="/platforms/konnaxion"
        />
        <Card
          title="Kristal Farms"
          description="Green AI Infrastructure. A decentralized network of clean-energy computing centers that democratizes access to artificial intelligence."
          href="/platforms/kristal-farms"
        />
        <Card
          title="Orgo"
          description="Agile Governance. An open-source organizational operating system that replaces hierarchy with dynamic, role-based coordination."
          href="/platforms/orgo"
        />
        <Card
          title="Ekoh"
          description="Meritocratic Voting. A 'Smart Vote' system where decision-making power is weighted by validated competence and ethical alignment."
          href="/platforms/ekoh"
        />
      </div>
    </main>
  );
}