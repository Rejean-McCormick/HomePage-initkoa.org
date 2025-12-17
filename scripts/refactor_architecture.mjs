import fs from 'fs';
import path from 'path';
import chalk from 'chalk'; // npm install chalk (if you haven't already)

// CONFIGURATION
const ROOT_DIR = process.cwd(); // Run from project root
const APP_DIR = path.join(ROOT_DIR, 'app');

// 1. DEFINE THE MOVES
const MOVES = [
  // { from: 'platforms/SwarmCraft', to: 'technology/swarmcraft' },
  { from: 'platforms/SwarmCraft', to: 'technology/swarmcraft' },
  { from: 'platforms/Ariane', to: 'technology/ariane' },
  { from: 'platforms/SenTient', to: 'technology/sentient' },
  { from: 'platforms/Abstract-Wiki-Architect', to: 'technology/abstract-wiki' },
  { from: 'platforms/Ame-Artificielle', to: 'technology/ai-alignment' }, // Renaming 'Soul' to 'Alignment'
];

// 2. DEFINE THE NEW DASHBOARD CONTENT (New Platforms Page)
const NEW_PLATFORMS_PAGE = `
import Card from '../../components/Card';

export const metadata = {
  title: 'Platforms & Products – King Klown & KOA',
  description: 'The core software suite: Konnaxion, Orgo, and Kristal Farms.',
};

export default function PlatformsIndex() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We build civic utilities: shared infrastructure for learning, 
          coordination, and governance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card
          title="Konnaxion"
          description="The Public Engine. A unified operating system for collective intelligence, education, and meritocratic governance."
          href="/platforms/konnaxion"
        />
        <Card
          title="Orgo"
          description="The Private Engine. An offline-first organizational tool for role-based task routing and secure coordination."
          href="/platforms/orgo"
        />
        <Card
          title="Kristal Farms"
          description="The Infrastructure. Green AI data centers powering the ecosystem with renewable energy and open knowledge."
          href="/platforms/kristal-farms"
        />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-gray-500 mb-4">Looking for the underlying engines?</p>
        <a href="/technology" className="text-primary font-bold hover:underline">
          View Technology Stack →
        </a>
      </div>
    </main>
  );
}
`;

// 3. DEFINE THE TECH INDEX (Optional but good for navigation)
const TECH_INDEX_PAGE = `
import Link from 'next/link';

export const metadata = { title: 'Technology Stack' };

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Technology Stack</h1>
      <div className="grid gap-4">
        <Link href="/technology/swarmcraft" className="p-4 border rounded hover:bg-gray-50">
          <strong>SwarmCraft</strong> – Narrative Engine
        </Link>
        <Link href="/technology/sentient" className="p-4 border rounded hover:bg-gray-50">
          <strong>SenTient</strong> – Semantic Core & NLP
        </Link>
        <Link href="/technology/ariane" className="p-4 border rounded hover:bg-gray-50">
          <strong>Ariane</strong> – Graph State Machine
        </Link>
        <Link href="/technology/abstract-wiki" className="p-4 border rounded hover:bg-gray-50">
          <strong>Abstract Wiki Architect</strong> – Knowledge Graph Specs
        </Link>
        <Link href="/technology/ai-alignment" className="p-4 border rounded hover:bg-gray-50">
          <strong>AI Alignment (OurAI)</strong> – Ethical Guardrails
        </Link>
      </div>
    </main>
  );
}
`;

async function main() {
  console.log(chalk.blue.bold("🚀 Starting Architecture Refactor...\n"));

  // A. ENSURE DESTINATION FOLDERS EXIST
  const technologyDir = path.join(APP_DIR, 'technology');
  if (!fs.existsSync(technologyDir)) {
    fs.mkdirSync(technologyDir, { recursive: true });
    console.log(chalk.green(`✔ Created directory: ${technologyDir}`));
  }

  const aboutDir = path.join(APP_DIR, 'about');
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
    console.log(chalk.green(`✔ Created directory: ${aboutDir}`));
  }

  // B. MOVE THE FOLDERS
  for (const move of MOVES) {
    const srcPath = path.join(APP_DIR, move.from);
    const destPath = path.join(APP_DIR, move.to);

    if (fs.existsSync(srcPath)) {
      try {
        fs.renameSync(srcPath, destPath);
        console.log(`${chalk.green('✔ Moved:')} ${move.from} -> ${chalk.cyan(move.to)}`);
      } catch (err) {
        console.error(chalk.red(`❌ Failed to move ${move.from}: ${err.message}`));
      }
    } else {
      console.warn(chalk.yellow(`⚠ Skipped: Source not found (${move.from})`));
    }
  }

  // C. MOVE BIO (Rejean's Page)
  // We move platforms/page.mdx to about/page.mdx
  const bioSrc = path.join(APP_DIR, 'platforms', 'page.mdx');
  const bioDest = path.join(aboutDir, 'page.mdx');

  if (fs.existsSync(bioSrc)) {
    const bioContent = fs.readFileSync(bioSrc, 'utf8');
    // Optional: Inject a cleaner metadata title if missing
    const updatedBio = bioContent.replace(/title:\s*"Index"/, 'title: "About the Architect"');
    
    fs.writeFileSync(bioDest, updatedBio);
    fs.unlinkSync(bioSrc); // Remove old file
    console.log(`${chalk.green('✔ Moved Bio:')} platforms/page.mdx -> about/page.mdx`);
  } else {
    console.warn(chalk.yellow("⚠ Bio file (platforms/page.mdx) not found."));
  }

  // D. CREATE NEW DASHBOARDS
  // 1. Platforms Dashboard
  fs.writeFileSync(path.join(APP_DIR, 'platforms', 'page.tsx'), NEW_PLATFORMS_PAGE.trim());
  console.log(chalk.green("✔ Created new Platforms Dashboard (page.tsx)"));

  // 2. Technology Index
  fs.writeFileSync(path.join(technologyDir, 'page.tsx'), TECH_INDEX_PAGE.trim());
  console.log(chalk.green("✔ Created Technology Index (page.tsx)"));

  console.log(chalk.blue.bold("\n🎉 Refactor Complete!"));
}

main();