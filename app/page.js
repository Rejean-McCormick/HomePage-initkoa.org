// app/page.js
import Card from '../components/Card';

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            King Klown & KOA
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            A socio-technical movement merging surrealist narrative with 
            concrete innovation to solve systemic crises and transform global governance.
          </p>
        </div>
      </section>

      {/* ===== PLATFORMS (The Core Ecosystem) ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Technology Stack</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Konnaxion"
            description="A knowledge-sharing platform designed to amplify collective intelligence and verify global insights."
            href="/platforms/konnaxion"
          />
          <Card
            title="Kristal Farms"
            description="Green AI infrastructure powered by clean energy to provide sustainable and open-access computing."
            href="/platforms/kristal-farms"
          />
          <Card
            title="Orgo"
            description="Our open-source organizational framework for agile, role-based management and transparent coordination."
            href="/platforms/orgo"
          />
          <Card
            title="Ekoh"
            description="A meritocratic voting system where influence is weighted by validated competence and ethical alignment."
            href="/platforms/ekoh"
          />
        </div>
      </section>

      {/* ===== INITIATIVES (Strategic Impact) ===== */}
      <section className="bg-gray-50 border-y border-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Active Initiatives</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card
              title="Ukraine Peace & Reconstruction"
              description="A 3-phase geopolitical roadmap: Freeze (Peace), Vote (Self-determination), and Rebuild (Construction Olympics)."
              href="/initiatives/ukraine-peace-plan"
            />
            <Card
              title="KOA Political Movement"
              description="Modernizing public policy through technology, radical transparency, and collaborative governance."
              href="/initiatives/koa-political-movement"
            />
            <Card
              title="Cooperative Transformation"
              description="Redesigning the Desjardins model into a digital direct democracy with volunteer leadership."
              href="/initiatives/desjardins-cooperative-transformation"
            />
            <Card
              title="The Surreal"
              description="Our core methodology: Transforming surrealist fiction into tangible social and political leverage."
              href="/initiatives/surreal"
            />
          </div>
        </div>
      </section>

      {/* ===== GLOBAL ECOSYSTEM (External Links) ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Global Ecosystem</h2>
        
        <div className="grid gap-12 md:grid-cols-3">
          {/* Group 1: Strategic & Development */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-wider">Strategy & Code</h3>
            <ul className="space-y-3">
              <NavLink url="https://kingklown.xyz/koa" label="Roadmap & Plans" />
              <NavLink url="https://github.com/Rejean-McCormick/" label="GitHub (Source Code)" />
              <NavLink url="https://www.kingklown.wiki" label="Konnaxion Wiki" />
            </ul>
          </div>

          {/* Group 2: Media & Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-wider">Media & Social</h3>
            <ul className="space-y-3">
              <NavLink url="https://www.youtube.com/@KingKlownXYZ" label="YouTube Channel" />
              <NavLink url="https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4?si=69f66bdd97e34071" label="Mythos Podcast" />
              <NavLink url="https://x.com/KingKlownXYZ" label="X (Twitter)" />
              <NavLink url="https://www.tiktok.com/@kingklown.xyz" label="TikTok" />
            </ul>
          </div>

          {/* Group 3: Contact & Commerce */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-wider">Network</h3>
            <ul className="space-y-3">
              <NavLink url="https://kingklown.store" label="Branded Apparel" />
              <NavLink url="mailto:k@kingklown.com" label="Contact k@kingklown.com" isMail />
              <NavLink url="https://kingklown.com" label="Main Presentation" />
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper component for clean link management
function NavLink({ url, label, isMail = false }) {
  return (
    <li>
      <a
        href={url}
        target={isMail ? '_self' : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
        className="text-primary hover:underline font-medium transition duration-200"
      >
        {label}
      </a>
    </li>
  );
}