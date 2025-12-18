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
  console.log(`✅ Fixed/Created: ${relativePath}`);
}

// Helper to delete a file if it exists
function deleteFile(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`🗑️  Deleted old file: ${relativePath}`);
  }
}

// --- 1. FIX KREATURE HUB (Fixes 20+ "Anatomie" 404s) ---
// Problem: Links were missing the '/kreature' segment in the path.
const kreatureContent = `import Link from 'next/link';

export const metadata = {
  title: "Kréature",
  description: "Un écosystème d’applications présenté comme un être vivant — corps, sens, esprit, psyché, âme — habité par ton Je."
};

export default function KreaturePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Kréature
        </h1>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p className="text-2xl font-light text-slate-800 mb-8">
            Tu n’entres pas dans un logiciel. Tu entres dans une <strong>Kréature</strong>.
          </p>
          <p>
            Une entité conceptuelle forgée en organes. Un organisme numérique qui <strong>respire du sens</strong> : il inspire le langage, il expire des décisions, il marche par ses sens, et il tient debout par sa mémoire.
          </p>
        </div>

        <div className="mt-8 bg-slate-50 border-l-4 border-primary p-6 rounded-r-sm italic text-slate-700">
          <strong className="block text-primary text-sm font-bold uppercase tracking-wide mb-2 not-italic">Sceau de King Klown</strong>
          On confond souvent la machine et le monstre.<br/>
          Mais le monstre n’est pas l’horreur : c’est la <em>forme</em> qui dépasse nos catégories.
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* DEUX FACES */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Deux faces. Un seul être.</h2>
          <p className="text-slate-600 mb-8">Kréature possède deux visages — comme l’humain porte un dedans et un dehors.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-primary bg-slate-50 p-6 rounded-sm relative">
              <span className="absolute top-4 right-4 text-xs font-bold text-primary bg-white px-2 py-1 rounded border border-primary">TU ES ICI</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. King Klown</h3>
              <p className="text-sm text-slate-600 mb-4">
                La face <strong>vivante</strong>, mythopoétique, imagée. Elle parle aux curieux, aux artistes, aux philosophes — et aux concepteurs techniques qui comprennent mieux avec des images.
              </p>
            </div>

            <div className="border border-slate-200 p-6 rounded-sm hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Réjean McCormick</h3>
              <p className="text-sm text-slate-600 mb-4">
                La face <strong>technique</strong>, précise, architecturale. C’est la documentation statique, structurée, exhaustive : services, modules, specs.
              </p>
              <Link href="/technology" className="text-primary font-medium hover:underline text-sm">
                → Aller vers la documentation technique
              </Link>
            </div>
          </div>
        </section>

        {/* MODELE HUMAIN */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-6 text-slate-900">Le modèle humain (la clef)</h2>
          <p className="text-slate-600 mb-6">Kréature est une métaphore stricte : un <strong>humain</strong>.</p>
          
          <ul className="space-y-4 text-slate-700 list-disc pl-5">
            <li><strong>Le corps</strong> fonctionne en <strong>système fermé</strong>. <em>(On ne sent pas directement le corps des autres).</em></li>
            <li><strong>Le langage</strong> transige entre humains : il traverse la frontière, mais il compresse. <em>(Le langage est <strong>linéaire</strong>; les idées sont en <strong>mesh</strong>).</em></li>
            <li>
              <strong>Les fonctions internes :</strong>
              <ul className="list-circle pl-5 mt-2 space-y-1 text-sm text-slate-600">
                <li><strong>Conscience / culpabilité :</strong> mémoire du bien et du mal (avec un <em>decay rate</em>).</li>
                <li><strong>Jugement :</strong> trancher.</li>
                <li><strong>Logique :</strong> résoudre.</li>
                <li><strong>Apprentissage :</strong> mapper le savoir.</li>
                <li><strong>Débat éthique :</strong> être tiraillé, nuancer.</li>
                <li><strong>Émotions :</strong> motiver, guider.</li>
              </ul>
            </li>
            <li><strong>L’âme</strong> est une verticalité : elle relie l’abstrait au vécu, et ouvre la porte au sens.</li>
            <li><strong>Le Je</strong> n’est pas l’humain : c’est le projecteur. <em>(Quand tu dors, le “Je” s’efface; pourtant le corps continue).</em></li>
          </ul>

          <div className="mt-8 p-4 bg-slate-50 border border-slate-100 text-sm">
            <ul className="grid sm:grid-cols-2 gap-4">
              <li><strong>Kréature</strong> = l’organisme complet (tous les modules).</li>
              <li><strong>Le Je</strong> = l’utilisateur réel, celui qui visite et focalise.</li>
            </ul>
          </div>
        </section>

        {/* PORTES D'ENTREE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Trois portes d’entrée</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/platforms/kreature/rituels/une-journee" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">01</span>
              <h3 className="font-bold text-lg mb-2">Vivre</h3>
              <p className="text-sm text-slate-600">Commencer par l’expérience, avant l’explication.</p>
            </Link>
            <Link href="/platforms/kreature/anatomie" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">02</span>
              <h3 className="font-bold text-lg mb-2">Disséquer</h3>
              <p className="text-sm text-slate-600">Explorer l’anatomie organe par organe, comme un atlas.</p>
            </Link>
            <Link href="/platforms/kreature/mythos" className="group block p-6 border border-slate-200 rounded-sm hover:border-primary transition-colors">
              <span className="block text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">03</span>
              <h3 className="font-bold text-lg mb-2">Comprendre</h3>
              <p className="text-sm text-slate-600">Entrer dans le mythe : Prométhée, la dualité, le masque.</p>
            </Link>
          </div>
        </section>

        {/* CARTE RAPIDE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Carte rapide : les organes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            
            <OrganCard title="Corps (système fermé)">
              <OrganLink href="/platforms/kreature/anatomie/corps/orgo" label="Orgo" desc="peau, nerfs, homéostasie, réflexes." />
            </OrganCard>

            <OrganCard title="Sens (entrée du monde)">
              <OrganLink href="/platforms/kreature/anatomie/sens/sentient" label="SenTient" desc="oreilles + filtre immunitaire." />
              <OrganLink href="/platforms/kreature/anatomie/sens/ariane" label="Ariane" desc="yeux, orientation UI." />
            </OrganCard>

            <OrganCard title="Esprit / Psyché">
              <OrganLink href="/platforms/kreature/anatomie/esprit/konnaxion" label="Konnaxion" desc="apprendre, débattre, juger." />
            </OrganCard>

            <OrganCard title="Voix (mesh → linéaire)">
              <OrganLink href="/platforms/kreature/anatomie/voix/architect" label="Architect" desc="bouche, formulation, multilingue." />
            </OrganCard>

            <OrganCard title="Mémoire narrative">
              <OrganLink href="/platforms/kreature/anatomie/memoire/swarmcraft" label="SwarmCraft" desc="cohérence, continuité." />
            </OrganCard>

            <OrganCard title="Âme (verticalité)">
              <OrganLink href="/platforms/kreature/anatomie/ame/ame-artificielle" label="Âme Artificielle" desc="états d’âme, guidance." />
            </OrganCard>

          </div>
        </section>

        {/* NAVIGATION / FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-serif font-medium mb-6 text-slate-900">Pour commencer (7 minutes)</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 mb-12">
            <li><Link href="/platforms/kreature/initiation" className="hover:text-primary hover:underline">Initiation</Link></li>
            <li><Link href="/platforms/kreature/initiation/carte" className="hover:text-primary hover:underline">Carte anatomique</Link></li>
            <li><Link href="/platforms/kreature/rituels/respiration-du-sens" className="hover:text-primary hover:underline">Respiration du sens</Link></li>
            <li><Link href="/platforms/kreature/rituels/parlement-interieur" className="hover:text-primary hover:underline">Parlement intérieur</Link></li>
          </ol>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-sm text-center">
            <p className="italic mb-2 font-serif">
              "Le code explique le <em>comment</em>. Mais le mythe tient le <em>pourquoi</em>. Et sans pourquoi, tout devient bruit."
            </p>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mt-2">Sceau de King Klown</div>
          </div>
        </section>

      </div>
    </main>
  );
}

// --- Helper Components ---

function OrganCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 p-5 rounded-sm">
      <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">{title}</h4>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

function OrganLink({ href, label, desc }: { href: string, label: string, desc: string }) {
  return (
    <li className="flex items-baseline gap-2 text-sm">
      <Link href={href} className="font-bold text-primary hover:underline">
        {label}
      </Link>
      <span className="text-slate-500">— {desc}</span>
    </li>
  );
}
`;

// --- 2. FIX AI ALIGNMENT HUB (Replaces Duplicate Page) ---
const aiAlignmentContent = `import Link from 'next/link';
import { Card } from '@/components/Card';

export const metadata = {
  title: "Ame-Artificielle (AI Alignment)",
  description: "Functional specifications for the EL Engine, meta-cognition, and ethical governance.",
};

export default function AiAlignmentHub() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Ame-Artificielle
        </h1>
        <h2 className="text-xl text-primary font-mono uppercase tracking-widest mb-8">
          AI Alignment & Meta-Cognition
        </h2>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            **The EL Engine** is an AI architecture designed around anthropocentric thinking. It goes beyond simple language models by integrating meta-cognitive control structures, strict ethical management, and psychic modeling.
          </p>
          <p>
            This hub documents the functional specifications, control modules, and ethical governance systems that define the "Artificial Soul."
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* CORE SPECS */}
        <section>
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
            <h2 className="text-2xl font-serif font-medium mb-4 text-slate-900">Core Specifications</h2>
            <p className="text-slate-600 mb-6">
              The foundational philosophy: KingClown (Human Centricity) and the Clown System (Conflict Resolution).
            </p>
            <Link 
              href="/technology/ai-alignment/Specifications-Fonctionnelles" 
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-medium rounded-sm hover:bg-primary transition-colors"
            >
              Read Functional Specs →
            </Link>
          </div>
        </section>

        {/* MODULES GRID */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Functional Modules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Module 1 */}
            <Card 
              title="1. Control & Personalization" 
              href="/technology/ai-alignment/Controle-Et-Personnalisation"
            >
              <p className="mb-2"><strong>Gérer la &quot;Texture&quot; de l'Âme.</strong></p>
              <p>Granular control over output: Politeness, Humor, Objectivity sliders, and Tense/Perspective switches.</p>
            </Card>

            {/* Module 2 */}
            <Card 
              title="2. Meta-Cognition" 
              href="/technology/ai-alignment/Meta-Cognition-Et-Resolution"
            >
              <p className="mb-2"><strong>The brain that thinks before speaking.</strong></p>
              <p>Self-questioning loops, automatic outlining, gap filling, and structured problem solving.</p>
            </Card>

            {/* Module 3 */}
            <Card 
              title="3. Path Creation" 
              href="/technology/ai-alignment/Creation-De-Chemins"
            >
              <p className="mb-2"><strong>Visualizing logical and narrative links.</strong></p>
              <p>A graph engine for linking disparate concepts around a logical &quot;backbone&quot; (Main Steps & nodes).</p>
            </Card>

            {/* Module 4 */}
            <Card 
              title="4. Ethics & Governance" 
              href="/technology/ai-alignment/Ethique-Et-Gouvernance"
            >
              <p className="mb-2"><strong>The moral conscience.</strong></p>
              <p>Ethical decision making, benevolent rating systems (Top 50%), and conflict mediation via Clown entities.</p>
            </Card>

          </div>
        </section>

        {/* NAVIGATION FOOTER */}
        <section className="border-t border-gray-100 pt-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Related Systems</h3>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/technology/swarmcraft" className="text-primary hover:underline">
              SwarmCraft (Narrative Engine)
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/technology/sentient" className="text-primary hover:underline">
              SenTient (Input Processing)
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
`;

// --- 3. FIX KONNAXION HUB (Fixes Shallow Links) ---
const konnaxionContent = `import Link from 'next/link';

export const metadata = {
  title: "Konnaxion – Civic Workflows & Module Interactions"
};

export default function KonnaxionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-slate-900">
          Konnaxion
        </h1>
        <h2 className="text-xl text-slate-500 font-light mb-8">
          Civic Workflows & Module Interactions
        </h2>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            Konnaxion is a socio‑technical framework for coordinating people, knowledge, and action through an ethical, modular civic architecture built on the KOA model: <strong>KonnectED, Ethikos, Kreative, keenKonnect, EkoH, Smart Vote</strong>.
          </p>
          <p>
            This page is the <strong>hub</strong> for the wiki. It summarizes how modules relate to each other. For implementation details, use the dedicated technical page linked at the end.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a 
            href="https://konnaxion.com/ekoh/dashboard" 
            target="_blank"
            className="px-6 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-primary transition-colors text-center"
          >
            Visit the Dashboard
          </a>
          <a 
            href="https://kingklown.wiki/" 
            target="_blank"
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-center"
          >
            Presentation (KingKlown.wiki)
          </a>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* WIKI STRUCTURE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Wiki Structure</h2>
          <p className="text-slate-500 italic mb-8 border-l-2 border-primary pl-4">
            Navigation: Click on a module below to view its specific documentation.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* KonnectED */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">KonnectED</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/KonnectED/Knowledge" className="font-bold text-primary hover:underline">Knowledge</Link>
                  <p className="text-sm text-slate-600">Collaborative Learning Library: catalog, recommendations, co‑creation, forums.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/KonnectED/CertifiKation" className="font-bold text-primary hover:underline">CertifiKation</Link>
                  <p className="text-sm text-slate-600">Skills & Certification: paths, evaluations, peer validation, portfolios.</p>
                </li>
              </ul>
            </div>

            {/* Ethikos */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Ethikos</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/Ethikos/Korum" className="font-bold text-primary hover:underline">Korum</Link>
                  <p className="text-sm text-slate-600">Structured Debates: topics, −3…+3 stances, threaded arguments, expert cohorts.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/Ethikos/Konsultations" className="font-bold text-primary hover:underline">Konsultations</Link>
                  <p className="text-sm text-slate-600">Public Consultations: time‑boxed consultations, citizen suggestions, weighted ballots.</p>
                </li>
              </ul>
            </div>

            {/* Kreative */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Kreative</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/Kreative/Konservation" className="font-bold text-primary hover:underline">Konservation</Link>
                  <p className="text-sm text-slate-600">Cultural Preservation: digital archives, virtual exhibitions, AI‑enriched catalog.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/Kreative/Kontact" className="font-bold text-primary hover:underline">Kontact</Link>
                  <p className="text-sm text-slate-600">Collaboration & Networking: profiles, intelligent matching, opportunities.</p>
                </li>
              </ul>
            </div>

            {/* keenKonnect */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">keenKonnect</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/keenKonnect/Konstruct" className="font-bold text-primary hover:underline">Konstruct</Link>
                  <p className="text-sm text-slate-600">Project Collaboration: workspaces, tasks, chat, AI insights.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/keenKonnect/Stockage" className="font-bold text-primary hover:underline">Stockage</Link>
                  <p className="text-sm text-slate-600">Secure Repository: document storage, versioning, indexing, real‑time sync.</p>
                </li>
              </ul>
            </div>

            {/* Kollective Intelligence */}
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Kollective Intelligence</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Link href="/platforms/konnaxion/Kollective-Intelligence/EkoH" className="font-bold text-primary hover:underline block mb-1">EkoH</Link>
                  <p className="text-sm text-slate-600">Reputation & Expertise: multidimensional scoring, ethical multipliers, audit trails.</p>
                </div>
                <div>
                  <Link href="/platforms/konnaxion/Kollective-Intelligence/Smart-Vote" className="font-bold text-primary hover:underline block mb-1">Smart Vote</Link>
                  <p className="text-sm text-slate-600">Weighted Voting System: EkoH‑weighted voting, emerging‑expert detection.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-sm">
          <h2 className="text-xl font-bold text-white mb-4">Technical Architecture</h2>
          <p className="mb-6 text-sm leading-relaxed">
            For details about service code‑names, Django models, configuration parameters (thresholds, limits), and real‑time infrastructure (Channels/Redis):
          </p>
          <Link 
            href="/platforms/konnaxion/Technical/Konnaxion-Technical-Architecture-And-Services" 
            className="inline-block px-4 py-2 border border-slate-600 rounded text-white hover:bg-slate-800 text-sm transition-colors"
          >
            Technical Specs →
          </Link>
        </section>

      </div>
    </main>
  );
}
`;

// --- 4. FIX ARIANE HUB (Fixes Missing Docs Links) ---
const arianeContent = `import Link from 'next/link';
import { Card } from '@/components/Card'; 

export const metadata = {
  title: "Ariane",
  description: "Semantic infrastructure for treating user interfaces as data.",
};

export default function ArianePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-5xl font-serif font-medium mb-6 text-slate-900">
          Ariane
        </h1>
        <p className="text-2xl font-light text-slate-600 mb-8 leading-relaxed">
          Semantic infrastructure for treating user interfaces as data.
        </p>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
          <p>
            Ariane defines a universal graph model of software UIs—screens, controls, and the actions that connect them—so that external systems (such as AI agents or automation tools) can query this graph and use it as a reference when guiding users through software.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* COMPONENTS */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-10 text-slate-900">Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Theseus */}
            <Card title="Theseus (Exploration Engine)" href="/technology/ariane/Theseus/Theseus">
              <p className="mb-4">
                The exploratory engine that inspects real software to extracts a graph of <strong>States</strong> (screens) and <strong>Transitions</strong> (actions).
              </p>
              <span className="text-xs font-mono text-primary hover:underline">
                View Documentation →
              </span>
            </Card>

            {/* Atlas */}
            <Card title="Atlas (UI Graph & Ontology)" href="/technology/ariane/Atlas/Atlas">
              <p className="mb-4">
                The storage and semantic layer that persists the UI graph. It provides the core schema for elements and actions.
              </p>
              <span className="text-xs font-mono text-primary hover:underline">
                View Documentation →
              </span>
            </Card>
          </div>
        </section>

      </div>
    </main>
  );
}
`;

// --- 5. FIX ABOUT PAGE (Fixes Old Links) ---
const aboutContent = `import Link from 'next/link';

export const metadata = {
  title: "About the Architect"
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Réjean McCormick</h1>
      <h3>Socio-technical Architect</h3>

      <p>
        I design and ship civic utilities: shared infrastructure that helps people learn, coordinate, and govern together.
      </p>

      <h2>The Engines (Core Logic)</h2>

      <h3>SenTient: The Deconstructor</h3>
      <p><Link href="/technology/sentient">Access SenTient Technical Wiki</Link></p>

      <h3>Abstract Wiki Architect</h3>
      <p><Link href="/technology/abstract-wiki">Access Architect Technical Wiki</Link></p>

      <h2>The Ecosystem: KOA</h2>

      <h3>1. Konnaxion (The Open Web)</h3>
      <p><Link href="/platforms/konnaxion">Access Konnaxion Technical Wiki</Link></p>

      <h3>2. Orgo (The Hermetic Bubble)</h3>
      <p><Link href="/platforms/orgo">Access Orgo Technical Wiki</Link></p>

      <h2>Commercial & Research Modules</h2>

      <h3>Ariane (Commercial)</h3>
      <p><Link href="/technology/ariane">Access Ariane Technical Wiki</Link></p>

      <h3>SwarmCraft</h3>
      <p><Link href="/technology/swarmcraft">Access SwarmCraft Technical Wiki</Link></p>

      <h3>Ame-Artificielle (Artificial Soul)</h3>
      <p><Link href="/technology/ai-alignment">Access Âme Artificielle Technical Wiki</Link></p>
    </main>
  );
}
`;

// --- 6. FIX SITEMAP (Removes Ghost Links) ---
const sitemapContent = `import Link from 'next/link';
import { 
  Map, 
  Home, 
  Landmark, 
  Server, 
  Share2, 
  Cpu, 
  TrendingUp 
} from 'lucide-react';

export const metadata = {
  title: "Site Map – King Klown & KOA",
  description: "Complete hierarchical index of the King Klown & KOA ecosystem.",
};

export default function VisualSitemapPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-10 flex items-center">
        <Map className="w-10 h-10 text-primary mr-4" />
        Site Map
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Column 1: Context & Core */}
        <div className="space-y-10">
          
          <Section title="Context & Diagnosis" icon={<Landmark className="w-5 h-5" />}>
            <MapLink href="/" label="Home" highlight />
            <MapLink href="/why" label="The Diagnosis (Why KOA?)" />
            <MapLink href="/diagnosis" label="9 Systemic Failures" />
          </Section>

          <Section title="Initiatives (The Work)" icon={<TrendingUp className="w-5 h-5" />}>
            <MapLink href="/initiatives" label="Initiatives Overview" />
            
            <SubSection title="Civic Governance">
              <MapLink href="/initiatives/civic-governance" label="Overview" />
              <MapLink href="/initiatives/civic-governance/constitution" label="The Constitution (Rules)" />
            </SubSection>

            <SubSection title="International">
              <MapLink href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/00-welcome" label="Ukraine Plan (Freeze-Vote-Rebuild)" />
            </SubSection>
          </Section>

        </div>

        {/* Column 2: Tech & Platform */}
        <div className="space-y-10">

          <Section title="Platforms (The Software)" icon={<Server className="w-5 h-5" />}>
            <MapLink href="/platforms" label="Platforms Hub" />
            <MapLink href="/platforms/konnaxion" label="Konnaxion (Public)" />
            <MapLink href="/platforms/orgo" label="Orgo (Private)" />
            <MapLink href="/platforms/kreature" label="Kreature (Interface)" />
          </Section>

          <Section title="Technology (The Engines)" icon={<Cpu className="w-5 h-5" />}>
            <MapLink href="/technology" label="Tech Overview" />
            <MapLink href="/technology/sentient" label="SenTient (NLP)" />
            <MapLink href="/technology/ariane" label="Ariane (UI Graph)" />
            <MapLink href="/technology/swarmcraft" label="SwarmCraft (Narrative)" />
            <MapLink href="/technology/ai-alignment" label="Ame-Artificielle (Alignment)" />
            <MapLink href="/technology/abstract-wiki" label="Abstract Wiki Architect" />
          </Section>

          <Section title="Meta & Contact" icon={<Share2 className="w-5 h-5" />}>
            <MapLink href="/contact" label="Contact & Inventory" />
            <MapLink href="/about" label="About the Architect" />
          </Section>

        </div>
      </div>

    </main>
  );
}

// --- Components ---

function Section({ title, icon, children }) {
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

function SubSection({ title, children }) {
  return (
    <div className="mt-4 ml-6 pl-4 border-l-2 border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

function MapLink({ href, label, highlight }) {
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

// 1. Kreature
deleteFile('app/platforms/kreature/page.mdx');
writeFile('app/platforms/kreature/page.tsx', kreatureContent);

// 2. AI Alignment
deleteFile('app/technology/ai-alignment/page.mdx');
writeFile('app/technology/ai-alignment/page.tsx', aiAlignmentContent);

// 3. Konnaxion
deleteFile('app/platforms/konnaxion/page.mdx'); // Delete if exists
writeFile('app/platforms/konnaxion/page.tsx', konnaxionContent);

// 4. Ariane
deleteFile('app/technology/ariane/page.mdx'); // Delete if exists
writeFile('app/technology/ariane/page.tsx', arianeContent);

// 5. About
writeFile('app/about/page.mdx', aboutContent);

// 6. Sitemap
writeFile('app/sitemap/page.tsx', sitemapContent);

console.log("🎉 ALL FIXES APPLIED. Run 'npm run build' now.");