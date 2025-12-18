// app/sitemap/page.tsx
import Link from 'next/link';
import { 
  Map, 
  Landmark, 
  Server, 
  Share2, 
  Cpu, 
  TrendingUp,
  Microscope // New icon for Research
} from 'lucide-react';

export const metadata = {
  title: "Site Map – King Klown & KOA",
  description: "Complete hierarchical index.",
};

export default function VisualSitemapPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-10 flex items-center">
        <Map className="w-10 h-10 text-primary mr-4" />
        Site Map
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-10">
          
          {/* CONTEXT & DIAGNOSIS */}
          <Section title="Context & Diagnosis" icon={<Landmark className="w-5 h-5" />}>
            <MapLink href="/" label="Home" highlight={true} />
            <MapLink href="/why" label="The Diagnosis" />
            <MapLink href="/diagnosis" label="9 Systemic Failures" />
            <MapLink href="/principles" label="Principles & Ethics" />
          </Section>

          {/* INITIATIVES */}
          <Section title="Initiatives" icon={<TrendingUp className="w-5 h-5" />}>
            <MapLink href="/initiatives" label="Overview" />
            <SubSection title="Civic Governance">
              <MapLink href="/initiatives/civic-governance" label="Governance Hub" />
              <MapLink href="/initiatives/civic-governance/constitution" label="Constitution" />
              <MapLink href="/initiatives/civic-governance/modules/education" label="Education Module" />
              <MapLink href="/initiatives/civic-governance/modules/economy" label="Economy Module" />
              <MapLink href="/initiatives/civic-governance/modules/justice" label="Justice Module" />
            </SubSection>
            <SubSection title="International">
              <MapLink href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/00-welcome" label="Ukraine Peace Plan" />
            </SubSection>
          </Section>
          
          {/* RESEARCH */}
          <Section title="Research" icon={<Microscope className="w-5 h-5" />}>
             <MapLink href="/research/pi-theory" label="Pi Theory (Metaphysics)" />
          </Section>

        </div>

        <div className="space-y-10">
          
          {/* PLATFORMS */}
          <Section title="Platforms" icon={<Server className="w-5 h-5" />}>
            <MapLink href="/platforms" label="Platforms Hub" />
            <SubSection title="Core Products">
              <MapLink href="/platforms/konnaxion" label="Konnaxion (Public OS)" />
              <MapLink href="/platforms/orgo" label="Orgo (Private OS)" />
              <MapLink href="/platforms/kristal-farms" label="Kristal Farms (Infrastructure)" />
            </SubSection>
            <SubSection title="Interface">
              <MapLink href="/platforms/kreature" label="Kréature (Mythopoetic UI)" />
            </SubSection>
          </Section>

          {/* TECHNOLOGY */}
          <Section title="Technology" icon={<Cpu className="w-5 h-5" />}>
            <MapLink href="/technology" label="Tech Overview" />
            <MapLink href="/principles/ame-artificielle" label="Âme artificielle (Âme)" />
            <MapLink href="/technology/architect" label="Abstract Wiki Architect" />
            <MapLink href="/technology/ariane" label="Ariane (UI Graph)" />
            <MapLink href="/technology/sentient" label="SenTient (NLP Engine)" />
            <MapLink href="/technology/swarmcraft" label="SwarmCraft (Narrative Engine)" />
          </Section>

          {/* META */}
          <Section title="Meta" icon={<Share2 className="w-5 h-5" />}>
            <MapLink href="/contact" label="Contact" />
            <MapLink href="/about" label="About the Architect" />
          </Section>
        </div>
      </div>
    </main>
  );
}

// --- Helper Components ---

function Section({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
        <span className="text-slate-400 mr-2">{icon}</span> {title}
      </h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function SubSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function MapLink({ href, label, highlight }: { href: string, label: string, highlight?: boolean }) {
  return (
    <li>
      <Link 
        href={href} 
        className={`block py-1 hover:text-primary transition-colors ${highlight ? 'text-primary font-bold' : 'text-slate-600'}`}
      >
        {label}
      </Link>
    </li>
  );
}