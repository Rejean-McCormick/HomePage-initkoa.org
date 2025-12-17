import Link from 'next/link';

export const metadata = {
  title: 'King Klown & KOA – Civic Utilities',
  description: 'Shared infrastructure for learning, coordination, and meritocratic governance.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-serif">
            King Klown <span className="text-primary">&</span> KOA
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            We build <strong>civic utilities</strong> for a fragmented world. <br />
            An ecosystem for radical learning, secure coordination, and meaningful governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/platforms" 
              className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition shadow-lg shadow-primary/25"
            >
              Explore the Platforms
            </Link>
            <Link 
              href="/diagnosis" 
              className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-white/20 transition"
            >
              Read the Diagnosis
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent" />
        </div>
      </section>

      {/* THE THREE PILLARS (Navigation Hub) */}
      <section className="max-w-6xl mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Pillar 1: THE CONTEXT */}
          <NavCard 
            title="The Diagnosis"
            subtitle="Global Context"
            icon="🌐"
            description="We cannot fix what we refuse to see. A radical assessment of the 9 systemic failures facing modern society."
            href="/diagnosis"
            accent="border-blue-500"
          />

          {/* Pillar 2: THE SOLUTION */}
          <NavCard 
            title="The Platforms"
            subtitle="Our Ecosystem"
            icon="🛠️"
            description="Tools for the new world: Konnaxion (Public Engine), Orgo (Private Engine), and Kristal Farms (Infrastructure)."
            href="/platforms"
            accent="border-primary"
          />

          {/* Pillar 3: THE SOUL */}
          <NavCard 
            title="Kréature (FR)"
            subtitle="The Interface"
            icon="🎭"
            description="The mythopoetic perspective. Enter the organism through King Klown's narrative lens."
            href="/platforms/kreature"
            accent="border-purple-500"
          />
        </div>
      </section>

      {/* REJEAN'S FOOTER / TECH LINK */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="border-t border-gray-100 pt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Built on Rigorous Engineering</h3>
          <p className="text-gray-500 mb-6">
            Beyond the myth lies the machine. Explore the architectural specifications, invariants, and service definitions.
          </p>
          <Link href="/technology" className="text-sm font-mono text-primary hover:underline bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
            View Technology Stack (Réjean McCormick) →
          </Link>
        </div>
      </section>
    </main>
  );
}

function NavCard({ title, subtitle, icon, description, href, accent }) {
  return (
    <Link href={href} className={`group block bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 ${accent}`}>
      <div className="text-4xl mb-4 group-transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="uppercase tracking-wider text-xs font-bold text-gray-400 mb-2">{subtitle}</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{title}</h2>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 font-semibold text-sm text-primary flex items-center">
        Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}