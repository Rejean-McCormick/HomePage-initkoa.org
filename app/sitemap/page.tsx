import Link from 'next/link';
import { 
  Map, 
  Home, 
  Landmark, 
  Book, 
  Server, 
  Share2, 
  FileText, 
  Shield, 
  Scale, 
  GraduationCap, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

export const metadata = {
  title: "Site Map – King Klown & KOA",
  description: "Complete hierarchical index of the King Klown & KOA ecosystem.",
};

export default function VisualSitemapPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-100 rounded-full">
            <Map className="w-8 h-8 text-slate-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Site Map</h1>
        </div>
        <p className="text-xl text-slate-600">
          The complete hierarchical index of the KOA ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* COLUMN 1: CORE & GOVERNANCE */}
        <div className="space-y-12">
          
          {/* Section: Root */}
          <Section title="Foundation" icon={<Home />}>
            <MapLink href="/" label="Home" />
            <MapLink href="/why" label="The Diagnosis (Global Context)" />
            <MapLink href="/about" label="The Architect (Réjean McCormick)" />
            <MapLink href="/principles" label="Core Principles" />
          </Section>

          {/* Section: Civic Governance */}
          <Section title="Civic Governance" icon={<Landmark />}>
            <MapLink href="/initiatives/civic-governance" label="Governance Dashboard" highlight />
            
            <SubSection title="The Kernel (Constitution)">
              <MapLink href="/initiatives/civic-governance/constitution" label="Constitution Hub" />
              <MapLink href="/initiatives/civic-governance/constitution/ekoh" label="Ekoh (Voting Protocol)" />
              <MapLink href="/initiatives/civic-governance/constitution/orgo" label="Orgo (Governance Engine)" />
              <MapLink href="/initiatives/civic-governance/constitution/rights" label="Bill of Rights" />
            </SubSection>

            <SubSection title="Active Modules">
              <MapLink href="/initiatives/civic-governance/modules/education" label="Education (Competence)" />
              <MapLink href="/initiatives/civic-governance/modules/economy" label="Economy (Solidarity)" />
              <MapLink href="/initiatives/civic-governance/modules/justice" label="Justice (Fairness)" />
            </SubSection>
          </Section>

        </div>

        {/* COLUMN 2: STRATEGY, TECH & MEDIA */}
        <div className="space-y-12">

          {/* Section: Strategy */}
          <Section title="Strategy & Theory" icon={<Book />}>
            <MapLink href="/initiatives" label="Initiatives Roadmap" highlight />
            <MapLink href="/initiatives/pi-theory" label="PI Theory (Political Intelligence)" />
            <MapLink href="/initiatives/civic-governance/modules/international" label="International (Ukraine Plan)" />
          </Section>

          {/* Section: Technology */}
          <Section title="Technology" icon={<Server />}>
            <MapLink href="/technology" label="Engineering Overview" />
            <MapLink href="/platforms" label="Platform Specs (Konnaxion, Orgo)" />
            <MapLink href="/technology/sentient" label="SenTient (NLP Engine)" />
            <MapLink href="/technology/abstract-wiki" label="Abstract Wiki Architect" />
          </Section>

          {/* Section: Connect */}
          <Section title="Connect" icon={<Share2 />}>
            <MapLink href="/media" label="Media (Books & Podcasts)" />
            <MapLink href="/contact" label="Contact & Inventory" />
            <MapLink href="/docs" label="Documentation Hub" />
          </Section>

        </div>
      </div>

    </main>
  );
}

// --- Components ---

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
        <span className="text-slate-400 mr-2">{icon}</span> {title}
      </h2>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

function SubSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

function MapLink({ href, label, highlight }: { href: string, label: string, highlight?: boolean }) {
  return (
    <li>
      <Link 
        href={href} 
        className={`block text-sm transition-colors ${
          highlight 
            ? 'font-bold text-primary hover:text-slate-900' 
            : 'text-slate-600 hover:text-primary'
        }`}
      >
        {label}
      </Link>
    </li>
  );
}