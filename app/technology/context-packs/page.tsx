import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  Download,
  Package,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Context Packs — AI-first reference bundles | kOA',
  description:
    'Context packs meant to be loaded into AI systems first: for understanding, validating, and steering conversations around kOA systems and general design principles.',
  alternates: { canonical: '/technology/context-packs' },
};

type ContextPackLink = {
  href: string;
  label: string;
};

type ManifestPack = {
  slug?: string;
  title?: string;
  file: string;
  repository?: string | null;
  sourceCommit?: string | null;
  fileCount?: number | null;
  sha256?: string | null;
  category?: 'system' | 'general';
};

type ContextPack = {
  slug: string;
  title: string;
  version: string;
  scope: string;
  description: string;
  file: string;
  links?: ContextPackLink[];
  category: 'system' | 'general';
  repository?: string | null;
  fileCount?: number | null;
};

type PackPresentation = Partial<
  Pick<ContextPack, 'title' | 'version' | 'scope' | 'description' | 'links' | 'category'>
>;

const PRESENTATION: Record<string, PackPresentation> = {
  'kristal-framework': {
    title: 'Kristal Context Pack',
    scope: 'Epistemic artifacts, schemas, query, reader policies',
    description:
      'Kristal reference bundle covering Structured Epistemic States, working/reference artifacts, validation, authority recognition, reader policies, query semantics, federation, schemas, and examples.',
    links: [{ href: '/technology/kristal', label: 'Kristal' }],
  },
  konnaxion: {
    title: 'Konnaxion Context Pack',
    scope: 'Platform specification',
    description:
      'Full-stack platform reference covering navigation, modules, public coordination surfaces, distribution flows, and structural references for Konnaxion.',
    links: [{ href: '/platforms/konnaxion', label: 'Konnaxion' }],
  },
  orgo: {
    title: 'Orgo Context Pack',
    scope: 'Case, task, workflow platform',
    description:
      'Workflow reference for case handling, task orchestration, review routing, approvals, schemas, services, and operational flows.',
    links: [{ href: '/platforms/orgo', label: 'Orgo' }],
  },
  sentient: {
    title: 'SenTient Context Pack',
    scope: 'Reconciliation architecture',
    description:
      'Entity reconciliation, ingestion, semantic processing, ambiguity preservation, and structured resolution over messy inputs.',
    links: [{ href: '/technology/sentient', label: 'SenTient' }],
  },
  'semantik-architect': {
    title: 'Semantik Architect Context Pack',
    scope: 'Engine and GF integration',
    description:
      'Engine architecture, GF integration, deployment model, and deterministic multilingual rendering with traceable source labels.',
    links: [{ href: '/technology/architect', label: 'Semantik Architect' }],
  },
  'koa-digital-ecosystem': {
    title: 'kOA Digital Ecosystem Context Pack',
    scope: 'Architecture and contracts',
    description:
      'System-level architecture, artifact contracts, workflow boundaries, distribution, and integration across the kOA ecosystem.',
  },
  'koa-linux': {
    title: 'kOA Linux Context Pack',
    scope: 'Operating system architecture',
    description: 'Architecture, components, contracts, integrations, lifecycle, governance, and operational documentation for kOA Linux.',
  },
  xkaliber: {
    title: 'XKaliber Context Pack',
    scope: 'Competency measurement',
    description: 'Reference bundle for XKaliber architecture, evaluation, governance, integration, product, UX, and supporting research.',
  },
  'uckk-moodle': {
    title: 'UCKK Moodle Context Pack',
    scope: 'Learning platform',
    description: 'Reference bundle for the UCKK Moodle implementation, plugins, course structures, platform extensions, and documentation.',
  },
  'uckk-assets': {
    title: 'UCKK Assets Context Pack',
    scope: 'Canonical assets and learning material',
    description: 'Canonical UCKK assets, nomenclature, courses, branding material, and supporting documentation.',
  },
  'konnaxion-capsule-manager': {
    title: 'Konnaxion Capsule Manager Context Pack',
    scope: 'Capsule packaging and management',
    description: 'Reference bundle for Konnaxion capsule packaging, agent, builder, manager, runtime, security, and UI components.',
  },
  konductor: {
    title: 'Konductor Context Pack',
    scope: 'Agentic AI',
    description: 'Reference bundle for Konductor and its agentic AI architecture and documentation.',
  },
  'levelupdiag-koa-linux': {
    title: 'LevelUpDiag kOA Linux Context Pack',
    scope: 'Development and validation tooling',
    description: 'Reference bundle for LevelUpDiag tooling, launchers, levels, schemas, scripts, tests, and kOA Linux integration.',
  },
  'k-port': {
    title: 'K-Port Context Pack',
    scope: 'Verified intake layer',
    description: 'Reference bundle for K-Port, the EkoH intake layer for verified inputs and associated documentation.',
  },
  'initkoa-docs': {
    title: 'initkOA Docs Context Pack',
    scope: 'Public documentation',
    description: 'Reference bundle generated from the initkOA documentation repository.',
  },
  'freeze-vote-rebuild-operational-peace-framework': {
    title: 'Freeze · Vote · Rebuild Context Pack',
    scope: 'Operational peace framework',
    description: 'Verification-first operational peace framework covering freeze, vote, rebuild, governance, pathways, risks, and implementation.',
  },
  'book-civilizational-coherence': {
    title: 'Civilizational Coherence Context Pack',
    scope: 'Book architecture and research',
    description: 'Reference bundle for the Civilizational Coherence book, its architecture, research, manuscript, scenarios, validation, and working material.',
  },
  'konnaxion-ashoka-systems-change-dossier': {
    title: 'Konnaxion Ashoka Systems Change Dossier',
    scope: 'Systems-change dossier',
    description: 'Public systems-change dossier related to Konnaxion and Ashoka.',
  },
  'partners-for-public-good-pressure-test-koali': {
    title: 'Partners for Public Good Context Pack',
    scope: 'Pressure-test dossier',
    description: 'Partners for Public Good reference dossier and pressure-test material for Koali.',
  },
  'projet-orphee-walk-straight': {
    title: 'Projet ORPHÉE Context Pack',
    scope: 'Inclusive digital learning',
    description: 'Reference bundle for Projet ORPHÉE / Walk Straight and its inclusive multilingual digital learning material.',
  },
  'omni-wiki-rejean-king-klown': {
    title: 'Omni-Wiki Rejean / King Klown Context Pack',
    scope: 'Omni-Wiki knowledge corpus',
    description: 'Reference bundle for the Omni-Wiki corpus covering Rejean, King Klown, Konnaxion, Orgo, SenTient, and related knowledge structures.',
  },
  medikristal: {
    title: 'MediKristal Context Pack',
    scope: 'Semantic medical knowledge',
    description: 'Reference bundle for MediKristal semantic medical knowledge structures and documentation.',
  },
  'kristal-farms': {
    title: 'Kristal Farms Context Pack',
    scope: 'Northern infrastructure',
    description: 'Reference bundle for Kristal Farms strategy, deployment, partner material, site screening, economics, and research.',
  },
  'science-silk-road-koali': {
    title: 'Science Silk Road Koali Context Pack',
    scope: 'Scientific capability research',
    description: 'Research dossier on scientific capability, evidence, references, and related Koali material.',
  },
  'semantik-architect-gf-zone-auditor': {
    title: 'Semantik Architect GF Zone Auditor Context Pack',
    scope: 'GF auditing',
    description: 'Reference bundle for auditing the GF zone of Semantik Architect, including probes, schemas, reports, and tests.',
  },
  votingmachine: {
    title: 'VotingMachine Context Pack',
    scope: 'Voting system',
    description: 'Reference bundle for VotingMachine algorithms, allocation, tabulation, bundles, CI, and implementation documentation.',
  },
  'grammatical-framework': {
    title: 'Grammatical Framework Context Pack',
    version: 'v1.0',
    scope: 'RGL router and reference',
    description: 'Deterministic constructor routing and reference material for Grammatical Framework and RGL-based generation workflows.',
    category: 'general',
  },
  'senior-architect': {
    title: 'Senior Architect Context Pack',
    version: 'v1.0',
    scope: 'Systems patterns and resilience',
    description: 'Production patterns for reliability, resilience, structural decoupling, observability, and large-system design.',
    category: 'general',
  },
};

function slugFromFilename(file: string): string {
  return file
    .replace(/\.txt$/i, '')
    .replace(/-context-pack(?:--.*)?$/i, '')
    .toLowerCase();
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function readManifest(directory: string): ManifestPack[] | null {
  const manifestPath = path.join(directory, 'index.json');
  if (!fs.existsSync(manifestPath)) return null;

  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { packs?: ManifestPack[] };
    if (!Array.isArray(parsed.packs)) return null;
    return parsed.packs.filter((pack) => typeof pack.file === 'string' && pack.file.endsWith('.txt'));
  } catch {
    return null;
  }
}

function discoverContextPacks(): ContextPack[] {
  const directory = path.join(process.cwd(), 'public', 'context-packs');
  if (!fs.existsSync(directory)) return [];

  const manifest = readManifest(directory);
  const discovered: ManifestPack[] = manifest ?? fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.txt'))
    .map((entry) => ({ file: entry.name }));

  return discovered
    .map((entry) => {
      const slug = entry.slug || slugFromFilename(entry.file);
      const presentation = PRESENTATION[slug] ?? {};
      const repositoryName = entry.repository?.split('/').pop();
      const fallbackTitle = repositoryName || titleFromSlug(slug);

      return {
        slug,
        title: presentation.title ?? entry.title ?? `${fallbackTitle} Context Pack`,
        version: presentation.version ?? 'Current',
        scope: presentation.scope ?? 'Repository documentation',
        description:
          presentation.description ??
          `AI-ready reference bundle generated from the ${repositoryName || fallbackTitle} documentation corpus.`,
        file: entry.file,
        links: presentation.links,
        category: presentation.category ?? entry.category ?? 'system',
        repository: entry.repository,
        fileCount: entry.fileCount,
      } satisfies ContextPack;
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
}

export default function ContextPacksPage() {
  const packs = discoverContextPacks();
  const systemPacks = packs.filter((pack) => pack.category === 'system');
  const generalPacks = packs.filter((pack) => pack.category === 'general');

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
          <Package className="w-4 h-4 text-[#1e6864]" />
          <span className="text-xs font-mono">Technology / Context Packs</span>
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">Context Packs</h1>

        <p className="mt-4 text-xl text-slate-600 max-w-3xl leading-relaxed">
          These packs are meant to be given to an <strong>AI system first</strong>. Load a pack
          into an assistant, then question the assistant from that bounded source context.
        </p>

        <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
          The catalog below is generated from the files currently published in
          <code className="mx-1">public/context-packs</code>. New packs appear automatically after
          the builder updates the directory and the site is rebuilt.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Pill icon={<Sparkles className="w-4 h-4" />}>AI-first</Pill>
          <Pill icon={<ShieldCheck className="w-4 h-4" />}>Stable filenames</Pill>
          <Pill icon={<Boxes className="w-4 h-4" />}>Modular by domain</Pill>
          <Pill icon={<BookOpenText className="w-4 h-4" />}>Human-readable, machine-usable</Pill>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/technology"
            className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
          >
            Back to Technology <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How people use them</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<BookOpenText className="w-6 h-6 text-[#1e6864]" />}
            title="Understand a system"
            body="Load a pack, then ask the AI to explain the system in plain language: what it is, what it does, how it is structured, and where its boundaries are."
          />
          <InfoCard
            icon={<ShieldCheck className="w-6 h-6 text-[#1e6864]" />}
            title="Validate an interpretation"
            body="Use the pack to check whether an explanation, plan, or output actually fits the source documentation instead of drifting into invention."
          />
          <InfoCard
            icon={<Boxes className="w-6 h-6 text-[#1e6864]" />}
            title="Supercharge a conversation"
            body="Give the AI a specific pack and tell it to apply that context during the exchange: principles, constraints, architecture patterns, domain rules, or artifact vocabulary."
          />
          <InfoCard
            icon={<Package className="w-6 h-6 text-[#1e6864]" />}
            title="Align the assistant"
            body="Ask the AI to reason inside a specific documented system or use a broader general pack as an operating frame."
          />
        </div>
      </section>

      <PackSection
        title="kOA system packs"
        description="These packs are generated from the retained public repositories and related kOA systems."
        packs={systemPacks}
      />

      {generalPacks.length > 0 ? (
        <PackSection
          title="General packs"
          description="Broader operating frames that are not tied to one specific kOA repository."
          packs={generalPacks}
        />
      ) : null}
    </main>
  );
}

function PackSection({
  title,
  description,
  packs,
}: {
  title: string;
  description: string;
  packs: ContextPack[];
}) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <p className="text-slate-600 mb-8 max-w-3xl leading-relaxed">{description}</p>

      {packs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packs.map((pack) => (
            <PackCard key={pack.file} pack={pack} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No Context Packs are currently published.</p>
      )}
    </section>
  );
}

function PackCard({ pack }: { pack: ContextPack }) {
  return (
    <article className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#1e6864] hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{pack.title}</h3>
          <p className="mt-1 text-sm font-mono text-slate-500">{pack.version}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          {pack.scope}
        </span>
      </div>

      <p className="mt-4 text-slate-600 leading-relaxed">{pack.description}</p>

      {typeof pack.fileCount === 'number' ? (
        <p className="mt-3 text-xs font-mono text-slate-400">{pack.fileCount} Markdown files</p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={`/context-packs/${pack.file}`}
          download={pack.file}
          className="inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors"
        >
          Download <Download className="w-4 h-4 ml-2" />
        </a>

        {pack.links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 text-slate-900 hover:border-slate-400 transition-colors"
          >
            {link.label} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        ))}
      </div>
    </article>
  );
}

function Pill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-600 bg-white">
      <span className="text-slate-400">{icon}</span>
      {children}
    </span>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
