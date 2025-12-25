// app/sitemap/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Map,
  Landmark,
  Server,
  Share2,
  Cpu,
  TrendingUp,
  Microscope,
  Anchor,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Site Map – King Klown & KOA",
  description: "Complete hierarchical index of the KOA ecosystem.",
};

export default function VisualSitemapPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-10 flex items-center">
        <Map className="w-10 h-10 text-indigo-600 mr-4" />
        Site Map
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-10">
          {/* CONTEXT & DIAGNOSIS */}
          <Section title="Context & Diagnosis" icon={<Landmark className="w-5 h-5" />}>
            <MapLink href="/" label="Home" highlight />
            <MapLink href="/why" label="The Diagnosis (Why KOA?)" />
            <MapLink href="/diagnosis" label="9 Systemic Failures" />
            <MapLink href="/principles" label="Principles Hub" />

            <SubSection title="Domains">
              <MapLink href="/principles/civic-principles-ethics" label="Civic Principles & Ethics" />
              <MapLink href="/principles/logos" label="Logos & Mythos" />
              <MapLink href="/principles/cosmic-etherism" label="Cosmic Etherism" />
            </SubSection>
          </Section>

          {/* RESEARCH */}
          <Section title="Research" icon={<Microscope className="w-5 h-5" />}>
            <MapLink href="/research" label="Research Hub" highlight />
            <MapLink href="/research/pi-theory" label="Pi Theory (Metaphysics)" />
          </Section>

          {/* INFRASTRUCTURE */}
          <Section title="Infrastructure" icon={<Anchor className="w-5 h-5" />}>
            <MapLink href="/infrastructures" label="Infrastructure Hub" />

            <SubSection title="Physical (Kristal Farms)">
              <MapLink href="/infrastructures/kristal-farms" label="Kristal Farms Overview" />
              <MapLink href="/infrastructures/kristal-farms/infrastructure" label="Physical Infrastructure" />
              <MapLink href="/infrastructures/kristal-farms/ecology" label="Ecology & Heat Cycles" />
              <MapLink href="/infrastructures/kristal-farms/governance" label="Governance & Tenancy" />
              <MapLink href="/infrastructures/kristal-farms/nain" label="Project Nain (Pilot)" />
            </SubSection>

            <SubSection title="Virtual (Kin City)">
              <MapLink href="/infrastructures/kin-city" label="Kin City Overview" />
              <MapLink href="/infrastructures/kin-city/zones" label="Zone Guide" />
              <MapLink href="/infrastructures/kin-city/philosophy" label="Philosophy & Design" />
              <MapLink href="/infrastructures/kin-city/roadmap" label="Technical Roadmap" />
            </SubSection>
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
              <MapLink
                href="/initiatives/ukraine-peace-plan"
                label="Ukraine Peace & Reconstruction Plan (Hub)"
              />
              <MapLink
                href="/initiatives/ukraine-peace-plan/summary"
                label="Plan Summary (Table of Contents)"
              />
              <MapLink
                href="/initiatives/ukraine-peace-plan/fvr/start-here/welcome"
                label="Operational Framework (FVR)"
              />
              <MapLink
                href="/initiatives/ukraine-peace-plan/cultural-bridge/start-here"
                label="Cultural Bridge Track"
              />
            </SubSection>
          </Section>
        </div>

        <div className="space-y-10">
          {/* KRÉATURE (Community OS) */}
          <Section title="Kréature (Community OS)" icon={<Heart className="w-5 h-5 text-pink-500" />}>
            <MapLink href="/kreature" label="Kréature Accueil" highlight />
            <MapLink href="/kreature/parcours" label="Le Parcours (Guide)" />

            <SubSection title="Repères">
              <MapLink href="/kreature/reperes/glossaire" label="Glossaire (Vocabulaire)" />
              <MapLink href="/kreature/reperes/faq" label="FAQ" />
              <MapLink href="/kreature/reperes/pont-technique" label="Pont Technique (Devs)" />
            </SubSection>

            <SubSection title="Anatomie (Le Système)">
              <MapLink href="/kreature/anatomie" label="Vue d'ensemble" />
              <MapLink href="/kreature/anatomie/corps/orgo" label="Orgo (Le Corps)" />
              <MapLink href="/kreature/anatomie/memoire/swarmcraft" label="SwarmCraft (Mémoire)" />
              <MapLink href="/kreature/anatomie/sens/sentient" label="SenTient (Sens)" />
              <MapLink href="/kreature/anatomie/voix/architect" label="Architect (Voix)" />
              <MapLink href="/kreature/anatomie/ame/ame-artificielle" label="Âme Artificielle" />
              <MapLink href="/kreature/anatomie/ame/chakras-1-9" label="Chakras 1-9 (Symbolisme)" />
            </SubSection>

            <SubSection title="Konnaxion (L'Esprit)">
              <MapLink href="/kreature/anatomie/esprit/konnaxion" label="Konnaxion Hub" />
              <MapLink href="/kreature/anatomie/esprit/konnaxion/konnected" label="KonnectED (Savoir)" />
              <MapLink href="/kreature/anatomie/esprit/konnaxion/ethikos" label="Ethikos (Débat)" />
              <MapLink href="/kreature/anatomie/esprit/konnaxion/kollective" label="Kollective (Jugement)" />
              <MapLink href="/kreature/anatomie/esprit/konnaxion/keen-konnect" label="KeenKonnect (Action)" />
              <MapLink href="/kreature/anatomie/esprit/konnaxion/kreative" label="Kreative (Culture)" />
            </SubSection>

            <SubSection title="Rituels (L'Usage)">
              <MapLink href="/kreature/rituels" label="Index des Rituels" />
              <MapLink href="/kreature/rituels/respiration-du-sens" label="La Respiration du Sens" />
              <MapLink href="/kreature/rituels/parlement-interieur" label="Le Parlement Intérieur" />
            </SubSection>
          </Section>

          {/* PLATFORMS */}
          <Section title="Platforms (Engines)" icon={<Server className="w-5 h-5" />}>
            <MapLink href="/platforms" label="Platforms Hub" />
            <SubSection title="Core Products">
              <MapLink href="/platforms/konnaxion" label="Konnaxion (Public OS)" />
              <MapLink href="/platforms/orgo" label="Orgo (Private OS)" />
            </SubSection>
          </Section>

          {/* TECHNOLOGY */}
          <Section title="Technology Stack" icon={<Cpu className="w-5 h-5" />}>
            <MapLink href="/technology" label="Tech Overview" />
            <MapLink href="/technology/ariane" label="Ariane (Vision)" />
            <MapLink href="/technology/architect" label="Architect (Output)" />
            <MapLink href="/technology/sentient" label="SenTient (Input)" />
            <MapLink href="/technology/swarmcraft" label="SwarmCraft (Memory)" />
            <MapLink href="/technology/ame-artificielle" label="Âme artificielle (Ethics)" />
            <MapLink href="/technology/voting-machine" label="VM-Engine (Core)" />
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

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="flex items-center text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
        <span className="text-slate-400 mr-2">{icon}</span> {title}
      </h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function MapLink({ href, label, highlight }: { href: string; label: string; highlight?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`block py-1 hover:text-indigo-600 transition-colors ${
          highlight ? "text-indigo-600 font-bold" : "text-slate-600"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}