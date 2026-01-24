// app\page.tsx
// app/page.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'The kOA initiative – Civic Utilities',
  description: 'Shared infrastructure for learning, coordination, and meritocratic governance.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 tracking-tight text-slate-900">
            The kOA initiative
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Building <strong>civic utilities</strong> for a fragmented world. <br />
            Shared infrastructure for radical learning, secure coordination, and meaningful governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/initiatives" 
              className="px-8 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-primary transition-colors duration-300 min-w-[200px]"
            >
              Explore Ecosystem
            </Link>
            <Link 
              href="/why" 
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[200px]"
            >
              The Diagnosis
            </Link>
          </div>
        </div>
      </section>

      {/* NAVIGATION HUB */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Adjusted grid to 4 columns to include Infrastructure */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Pillar 1: CONTEXT */}
          <NavCard 
            href="/why"
            title="The Diagnosis"
            subtitle="Global Context"
            description="We cannot fix what we refuse to see. A radical assessment of the systemic failures facing modern society."
            icon={<IconGlobe />}
          />

          {/* Pillar 2: SOLUTION */}
          <NavCard 
            href="/initiatives/civic-governance"
            title="Civic Governance"
            subtitle="The Operating System"
            description="The active modules: Education (Competence), Economy (Solidarity), Justice (Fairness), and the Constitution."
            icon={<IconStack />}
          />

          {/* Pillar 3: INFRASTRUCTURE (New) */}
          <NavCard 
            href="/infrastructures"
            title="Infrastructures"
            subtitle="The Foundation"
            description="The physical and virtual bedrock. Green AI data centers (Kristal Farms) and the civic metaverse (Kin City)."
            icon={<IconAnchor />}
          />

          {/* Pillar 4: STRATEGY */}
          <NavCard 
            href="/initiatives"
            title="Strategic Initiatives"
            subtitle="The Roadmap"
            description="Political Theory (PI), International Peace Plans (Ukraine), and the Cooperative Transformation."
            icon={<IconEye />}
          />
        </div>
      </section>

      {/* TECHNICAL FOOTER */}
      <section className="bg-slate-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Engineering & Specs</h3>
          
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto font-serif italic">
            &quot;Beyond the myth lies the machine.&quot;
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              href="/initiatives/civic-governance/constitution" 
              className="text-sm font-mono text-primary hover:text-slate-900 border-b border-primary/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              The Rules (Constitution)
            </Link>
            
            <span className="text-slate-300 hidden md:inline">|</span>
            
            <Link 
              href="/platforms" 
              className="text-sm font-mono text-primary hover:text-slate-900 border-b border-primary/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              The Engine (Tech Specs)
            </Link>

            <span className="text-slate-300 hidden md:inline">|</span>

            <Link 
              href="/sitemap" 
              className="text-sm font-mono text-primary hover:text-slate-900 border-b border-primary/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- TYPES & COMPONENTS ---

interface NavCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: ReactNode;
}

function NavCard({ title, subtitle, description, href, icon }: NavCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="mb-6 text-slate-300 group-hover:text-primary transition-colors duration-300">
        {icon}
      </div>
      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
        {subtitle}
      </div>
      <h2 className="text-3xl font-serif font-medium text-slate-900 mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-slate-300">
        {title}
      </h2>
      <p className="text-slate-600 leading-relaxed text-sm">
        {description}
      </p>
    </Link>
  );
}

// --- ICONS ---

function IconGlobe() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
}

function IconStack() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function IconAnchor() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <circle cx="12" cy="5" r="3"></circle>
      <line x1="12" y1="22" x2="12" y2="8"></line>
      <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
    </svg>
  );
}