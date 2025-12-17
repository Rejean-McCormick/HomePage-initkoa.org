import Link from 'next/link';

export const metadata = {
  title: 'Strategic Initiatives – KOA',
  description: 'Our active projects for systemic change: Ukraine Peace Plan, Political Reform, and Cooperative Transformation.',
};

export default function InitiativesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Strategic Initiatives</h1>

      <div className="grid gap-8 md:grid-cols-3">
        
        {/* KOA Politics */}
        <Link
          href="/initiatives/koa-political-movement"
          className="group block h-full p-8 border border-gray-200 rounded-2xl hover:border-primary hover:shadow-lg transition duration-300 bg-white"
        >
          <div className="mb-4 text-primary text-4xl"></div>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            KOA Political Movement
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A systemic transformation platform founded on collective intelligence, 
            meritocratic voting, and radical transparency to modernize governance, 
            education, and justice.
          </p>
          <div className="mt-6 font-semibold text-primary">Read Roadmap →</div>
        </Link>

        {/* Desjardins */}
        <Link
          href="/initiatives/desjardins-cooperative-transformation"
          className="group block h-full p-8 border border-gray-200 rounded-2xl hover:border-primary hover:shadow-lg transition duration-300 bg-white"
        >
          <div className="mb-4 text-primary text-4xl"></div>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            Cooperative Transformation
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A pilot project to redesign the Desjardins model: volunteer leadership, 
            salary caps, digital direct democracy, and transparent philanthropy 
            to return power to members.
          </p>
          <div className="mt-6 font-semibold text-primary">Explore the Plan →</div>
        </Link>

        {/* Ukraine */}
        <Link
          href="/initiatives/ukraine-peace-and-reconstruction-plan"
          className="group block h-full p-8 border border-gray-200 rounded-2xl hover:border-primary hover:shadow-lg transition duration-300 bg-white"
        >
          <div className="mb-4 text-primary text-4xl"></div>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            Ukraine Peace & Reconstruction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A comprehensive 3-phase framework: <strong>Freeze</strong> (Ceasefire), 
            <strong>Vote</strong> (Self-determination), and <strong>Rebuild</strong> 
            (The Construction Olympics).
          </p>
          <div className="mt-6 font-semibold text-primary">View the Framework →</div>
        </Link>

      </div>
    </main>
  );
}