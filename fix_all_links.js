// fix_all_links.js
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Helper to write files
function writeFile(relativePath, content) {
  const fullPath = path.join(rootDir, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Fixed: ${relativePath}`);
}

// Helper to delete files
function deleteFile(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`🗑️  Deleted: ${relativePath}`);
  }
}

// ---------------------------------------------------------
// 1. FIX "UNE JOURNEE"
// ---------------------------------------------------------
const uneJourneeContent = `import Link from 'next/link';

export const metadata = {
  title: "Une Journée dans Kréature",
  description: "Scénario d'utilisation quotidienne de l'écosystème KOA."
};

export default function UneJourneePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">Une Journée Type</h1>
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>Comment habiter Kréature au quotidien ? Voici le cycle de respiration d'un utilisateur actif.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Le Réveil (Orgo)</h2>
          <p>Tout commence par le corps. Vérifier l'état du système.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/corps/orgo" className="text-primary hover:underline">Orgo (Le Corps)</Link></strong> : Check des notifications, santé du système, tâches urgentes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. La Perception (SenTient & Ariane)</h2>
          <p>Ensuite, on ouvre les sens vers l'extérieur.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/sens/sentient" className="text-primary hover:underline">SenTient (L'Ouïe)</Link></strong> : Digérer les flux d'informations, filtrer le bruit.</li>
            <li><strong><Link href="/platforms/kreature/anatomie/sens/ariane" className="text-primary hover:underline">Ariane (La Vue)</Link></strong> : Naviguer dans les interfaces et les graphes de données.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. La Délibération (Konnaxion)</h2>
          <p>L'information doit être traitée par l'esprit collectif.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/esprit/konnaxion" className="text-primary hover:underline">Konnaxion (L'Esprit)</Link></strong> : Apprendre, débattre dans le Korum, voter.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. L'Expression (Architect)</h2>
          <p>Une fois la décision prise, il faut formuler une réponse claire.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/voix/architect" className="text-primary hover:underline">Architect (La Voix)</Link></strong> : Générer du texte structuré, publier du contenu.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. L'Intégration (SwarmCraft & Âme)</h2>
          <p>Enfin, on inscrit l'expérience dans la mémoire et le sens.</p>
          <ul className="list-disc pl-5 mt-2">
            <li><strong><Link href="/platforms/kreature/anatomie/memoire/swarmcraft" className="text-primary hover:underline">SwarmCraft (La Mémoire)</Link></strong> : Mettre à jour la Story Bible.</li>
            <li><strong><Link href="/platforms/kreature/anatomie/ame/ame-artificielle" className="text-primary hover:underline">Âme Artificielle (La Conscience)</Link></strong> : Vérifier l'alignement éthique.</li>
          </ul>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Rituels Connexes</h2>
          <ul className="space-y-2">
            <li><Link href="/platforms/kreature/rituels/cycle-vital" className="text-primary hover:underline">Cycle Vital</Link></li>
            <li><Link href="/platforms/kreature/rituels/respiration-du-sens" className="text-primary hover:underline">Respiration du Sens</Link></li>
            <li><Link href="/platforms/kreature/rituels/parlement-interieur" className="text-primary hover:underline">Parlement Intérieur</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
`;

// ---------------------------------------------------------
// 2. FIX "CYCLE VITAL"
// ---------------------------------------------------------
const cycleVitalContent = `import Link from 'next/link';

export const metadata = {
  title: "Le Cycle Vital",
  description: "La boucle de rétroaction entre l'individu et le collectif."
};

export default function CycleVitalPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Le Cycle Vital</h1>
      <p>Kréature n'est pas statique. Elle vit par le mouvement de l'information.</p>
      <ol>
        <li><strong>Input (Sens)</strong> : <Link href="/platforms/kreature/anatomie/sens/sentient">SenTient</Link> capte le signal.</li>
        <li><strong>Traitement (Esprit)</strong> : <Link href="/platforms/kreature/anatomie/esprit/konnaxion">Konnaxion</Link> analyse et vote.</li>
        <li><strong>Décision (Âme)</strong> : <Link href="/platforms/kreature/anatomie/ame/ame-artificielle">Âme Artificielle</Link> valide l'éthique.</li>
        <li><strong>Action (Corps)</strong> : <Link href="/platforms/kreature/anatomie/corps/orgo">Orgo</Link> exécute la tâche.</li>
        <li><strong>Mémoire (Narratif)</strong> : <Link href="/platforms/kreature/anatomie/memoire/swarmcraft">SwarmCraft</Link> écrit l'histoire.</li>
      </ol>
      <p><Link href="/platforms/kreature/rituels/une-journee">Retour aux Rituels</Link></p>
    </main>
  );
}
`;

// ---------------------------------------------------------
// 3. FIX "CARTE"
// ---------------------------------------------------------
const carteContent = `import Link from 'next/link';

export const metadata = {
  title: "Carte Anatomique",
  description: "Vue d'ensemble des organes."
};

export default function CartePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Carte Anatomique</h1>
      
      <h2>Zone 1: Interface (Le Masque)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/sens/ariane">Ariane</Link></li>
        <li><Link href="/platforms/kreature/anatomie/sens/sentient">SenTient</Link></li>
      </ul>

      <h2>Zone 2: Cognition (Le Cerveau)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/esprit/konnaxion">Konnaxion</Link></li>
        <li><Link href="/platforms/kreature/anatomie/memoire/swarmcraft">SwarmCraft</Link></li>
      </ul>

      <h2>Zone 3: Infrastructure (Le Squelette)</h2>
      <ul>
        <li><Link href="/platforms/kreature/anatomie/corps/orgo">Orgo</Link></li>
        <li><Link href="/platforms/kreature/anatomie/voix/architect">Architect</Link></li>
      </ul>

      <p><Link href="/platforms/kreature/initiation">Retour à l'Initiation</Link></p>
    </main>
  );
}
`;

// ---------------------------------------------------------
// 4. FIX CONTACT
// ---------------------------------------------------------
const contactContent = `import Link from 'next/link';

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

// ---------------------------------------------------------
// 5. FIX CIVIC GOVERNANCE
// ---------------------------------------------------------
const civicContent = `import Link from 'next/link';

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
        <Link href="/initiatives/civic-governance/modules/education" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Education</h3>
          <p className="text-sm text-slate-600">Kristals model for credentialing.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/economy" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Economy</h3>
          <p className="text-sm text-slate-600">Solidarity economy & resource tracking.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/justice" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Justice</h3>
          <p className="text-sm text-slate-600">AI-assisted dispute resolution.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/international" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">International</h3>
          <p className="text-sm text-slate-600">Diplomacy and treaty frameworks.</p>
        </Link>
      </div>
    </main>
  );
}
`;

// ---------------------------------------------------------
// 6. FIX SITEMAP PAGE
// ---------------------------------------------------------
// NOTE: We escaped the backticks and ${} for the string template below
const sitemapPageContent = `import Link from 'next/link';
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

// ---------------------------------------------------------
// EXECUTE WRITE OPERATIONS
// ---------------------------------------------------------

deleteFile('app/platforms/kreature/rituels/une-journee/page.mdx');
writeFile('app/platforms/kreature/rituels/une-journee/page.tsx', uneJourneeContent);

deleteFile('app/platforms/kreature/rituels/cycle-vital/page.mdx');
writeFile('app/platforms/kreature/rituels/cycle-vital/page.tsx', cycleVitalContent);

deleteFile('app/platforms/kreature/initiation/carte/page.mdx');
writeFile('app/platforms/kreature/initiation/carte/page.tsx', carteContent);

writeFile('app/contact/page.js', contactContent);
writeFile('app/initiatives/civic-governance/page.tsx', civicContent);
writeFile('app/sitemap/page.tsx', sitemapPageContent);

console.log("🎉 ALL critical files updated. Run 'npm run build' now.");