const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Helper to write file content
function writeFile(relativePath, content) {
  const fullPath = path.join(rootDir, relativePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Fixed: ${relativePath}`);
}

// --- 1. FIX "UNE JOURNEE" (Source of 20+ 404s) ---
// Issue: Links were pointing to /platforms/anatomie... instead of /platforms/kreature/anatomie...
const uneJourneeContent = `
import Link from 'next/link';

export const metadata = {
  title: "Une Journée dans Kréature",
  description: "Scénario d'utilisation quotidienne de l'écosystème KOA."
};

# Une Journée Type

Comment habiter Kréature au quotidien ? Voici le cycle de respiration d'un utilisateur actif.

## 1. Le Réveil (Orgo)
Tout commence par le corps. Vérifier l'état du système.
* **[Orgo (Le Corps)](/platforms/kreature/anatomie/corps/orgo)** : Check des notifications, santé du système, tâches urgentes.

## 2. La Perception (SenTient & Ariane)
Ensuite, on ouvre les sens vers l'extérieur.
* **[SenTient (L'Ouïe)](/platforms/kreature/anatomie/sens/sentient)** : Digérer les flux d'informations, filtrer le bruit.
* **[Ariane (La Vue)](/platforms/kreature/anatomie/sens/ariane)** : Naviguer dans les interfaces et les graphes de données.

## 3. La Délibération (Konnaxion)
L'information doit être traitée par l'esprit collectif.
* **[Konnaxion (L'Esprit)](/platforms/kreature/anatomie/esprit/konnaxion)** : Apprendre, débattre dans le Korum, voter.

## 4. L'Expression (Architect)
Une fois la décision prise, il faut formuler une réponse claire.
* **[Architect (La Voix)](/platforms/kreature/anatomie/voix/architect)** : Générer du texte structuré, publier du contenu.

## 5. L'Intégration (SwarmCraft & Âme)
Enfin, on inscrit l'expérience dans la mémoire et le sens.
* **[SwarmCraft (La Mémoire)](/platforms/kreature/anatomie/memoire/swarmcraft)** : Mettre à jour la Story Bible.
* **[Âme Artificielle (La Conscience)](/platforms/kreature/anatomie/ame/ame-artificielle)** : Vérifier l'alignement éthique.

---

## Rituels Connexes
* [Cycle Vital](/platforms/kreature/rituels/cycle-vital)
* [Respiration du Sens](/platforms/kreature/rituels/respiration-du-sens)
* [Parlement Intérieur](/platforms/kreature/rituels/parlement-interieur)
`;

// --- 2. FIX "AI SPECS" (Source of AI 404s) ---
// Issue: Links were relative (../) failing to resolve deep nesting.
const aiSpecsContent = `
import Link from 'next/link';

export const metadata = {
  title: "Spécifications Fonctionnelles - Âme Artificielle",
  description: "Détails techniques des modules de l'Âme."
};

# Spécifications Fonctionnelles

L'architecture de l'Âme Artificielle repose sur quatre piliers d'alignement.

## Modules Principaux

### 1. Contrôle et Personnalisation
Gérer la "texture" de la personnalité (politesse, humour, distance).
* **[Voir les specs : Contrôle](/technology/ai-alignment/Controle-Et-Personnalisation)**

### 2. Méta-Cognition
La capacité du modèle à s'observer penser et à résoudre des conflits logiques.
* **[Voir les specs : Méta-Cognition](/technology/ai-alignment/Meta-Cognition-Et-Resolution)**

### 3. Création de Chemins
Le moteur de graphe qui relie les concepts entre eux (Nœuds et Arcs).
* **[Voir les specs : Chemins](/technology/ai-alignment/Creation-De-Chemins)**

### 4. Éthique et Gouvernance
Le système de jugement moral et les garde-fous (Clown System).
* **[Voir les specs : Éthique](/technology/ai-alignment/Ethique-Et-Gouvernance)**
`;

// --- 3. FIX "ATLAS" HUB (Source of Ariane 404s) ---
// Issue: Missing links to sub-pages.
const atlasContent = `
import Link from 'next/link';

export const metadata = {
  title: "Atlas: UI Graph & Ontology",
  description: "Documentation for the Atlas component of Ariane."
};

# Atlas

Atlas is the storage and semantic layer of Ariane. It persists the UI graph produced by Theseus.

## Documentation Modules

* **[Atlas Graph Model](/technology/ariane/Atlas/Atlas-Graph-Model)** Definitions of Nodes, Edges, and Properties in the UI graph.

* **[Core Schema](/technology/ariane/Atlas/Atlas-Core-Schema)** The JSON schema used for validating UI states.

* **[Ontology Vocabulary](/technology/ariane/Atlas/Atlas-Ontology-Vocabulary)** The standardized vocabulary for UI intents (e.g., "Submit", "Cancel", "Navigate").

---

[Back to Ariane Hub](/technology/ariane)
`;

// --- 4. FIX CONTACT PAGE (Removes broken Store link) ---
const contactContent = `
import Link from 'next/link';

export const metadata = {
  title: "Contact & Inventory",
  description: "Connect with the Architect."
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Contact & Inventory</h1>
      
      <p>The ecosystem is vast. Here are the primary entry points.</p>

      <h2>Digital Presence</h2>
      <ul>
        <li><strong>X (Twitter):</strong> <a href="https://x.com/KingKlownXYZ">@KingKlownXYZ</a></li>
        <li><strong>GitHub:</strong> <a href="https://github.com/Rejean-McCormick">Rejean-McCormick</a></li>
        <li><strong>Email:</strong> k@kingklown.com</li>
      </ul>

      <h2>Domains</h2>
      <ul>
        <li><strong>KingKlown.wiki:</strong> The Knowledge Base.</li>
        <li><strong>Okido.wiki:</strong> This Documentation Site.</li>
        <li><strong>KingKlown.ca:</strong> The Political Movement.</li>
      </ul>
    </main>
  );
}
`;

// --- 5. FIX CIVIC GOVERNANCE (Fixes missing module links) ---
const civicContent = `
import Link from 'next/link';

export const metadata = {
  title: "Civic Governance Initiatives",
  description: "Reinventing governance through modular, open-source systems."
};

export default function CivicGovernancePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Civic Governance</h1>
      <p>
        The core initiative of KOA is to provide a "Government in a Box" — a complete, deployable stack for managing communities.
      </p>

      <h2>The Constitution</h2>
      <p>The rules engine.</p>
      <ul>
        <li><Link href="/initiatives/civic-governance/constitution">Read the Constitution</Link></li>
      </ul>

      <h2>Active Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
        <a href="/initiatives/civic-governance/modules/education" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Education</h3>
          <p className="text-sm text-slate-600">Kristals model for credentialing.</p>
        </a>
        <a href="/initiatives/civic-governance/modules/economy" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Economy</h3>
          <p className="text-sm text-slate-600">Solidarity economy & resource tracking.</p>
        </a>
        <a href="/initiatives/civic-governance/modules/justice" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Justice</h3>
          <p className="text-sm text-slate-600">AI-assisted dispute resolution.</p>
        </a>
        <a href="/initiatives/civic-governance/modules/international" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">International</h3>
          <p className="text-sm text-slate-600">Diplomacy and treaty frameworks.</p>
        </a>
      </div>
    </main>
  );
}
`;

// --- 6. FIX SITEMAP PAGE (Visual Sitemap - Fixes Type Error & Dead Links) ---
const sitemapPageContent = `
import Link from 'next/link';
import { 
  Map, 
  Landmark, 
  Server, 
  Share2, 
  Cpu, 
  TrendingUp 
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
          <Section title="Context & Diagnosis" icon={<Landmark className="w-5 h-5" />}>
            <MapLink href="/" label="Home" highlight={true} />
            <MapLink href="/why" label="The Diagnosis" />
            <MapLink href="/diagnosis" label="9 Systemic Failures" />
          </Section>

          <Section title="Initiatives" icon={<TrendingUp className="w-5 h-5" />}>
            <MapLink href="/initiatives" label="Overview" />
            <SubSection title="Civic Governance">
              <MapLink href="/initiatives/civic-governance" label="Governance Hub" />
              <MapLink href="/initiatives/civic-governance/constitution" label="Constitution" />
            </SubSection>
            <SubSection title="International">
              <MapLink href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/00-welcome" label="Ukraine Plan" />
            </SubSection>
          </Section>
        </div>

        <div className="space-y-10">
          <Section title="Platforms" icon={<Server className="w-5 h-5" />}>
            <MapLink href="/platforms" label="Platforms Hub" />
            <MapLink href="/platforms/konnaxion" label="Konnaxion" />
            <MapLink href="/platforms/orgo" label="Orgo" />
            <MapLink href="/platforms/kreature" label="Kreature" />
          </Section>

          <Section title="Technology" icon={<Cpu className="w-5 h-5" />}>
            <MapLink href="/technology" label="Tech Overview" />
            <MapLink href="/technology/ai-alignment" label="AI Alignment" />
            <MapLink href="/technology/ariane" label="Ariane" />
            <MapLink href="/technology/swarmcraft" label="SwarmCraft" />
          </Section>

          <Section title="Meta" icon={<Share2 className="w-5 h-5" />}>
            <MapLink href="/contact" label="Contact" />
            <MapLink href="/about" label="About" />
          </Section>
        </div>
      </div>
    </main>
  );
}

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
        className={\`block py-1 hover:text-primary transition-colors \${highlight ? 'text-primary font-bold' : 'text-slate-600'}\`}
      >
        {label}
      </Link>
    </li>
  );
}
`;

// --- EXECUTE WRITES ---

// 1. Kreature: Une Journée
writeFile('app/platforms/kreature/rituels/une-journee/page.mdx', uneJourneeContent);

// 2. AI Alignment: Specs
writeFile('app/technology/ai-alignment/Specifications-Fonctionnelles/page.mdx', aiSpecsContent);

// 3. Ariane: Atlas
writeFile('app/technology/ariane/Atlas/Atlas/page.mdx', atlasContent);

// 4. Contact (Remove store)
writeFile('app/contact/page.js', contactContent);

// 5. Civic Governance (Fix module links)
writeFile('app/initiatives/civic-governance/page.tsx', civicContent);

// 6. Sitemap (Fix Type Error)
writeFile('app/sitemap/page.tsx', sitemapPageContent);

console.log("🎉 All content links fixed. Run 'npm run build' now.");