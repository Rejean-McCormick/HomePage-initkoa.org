// app/technology/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technology — kOA capabilities (public overview)",
  description:
    "What the kOA technology stack enables: verifiable knowledge artifacts (Kristals), guided navigation (Ariane), multilingual output, structured input, deterministic governance computation, offline-first execution, and downloadable AI-ready Context Packs.",
  alternates: { canonical: "/technology" },
};

type SubLink = { href: string; label: string };

type TechItem = {
  href: string;
  title: string;
  tag: string;
  description: string;
  repo?: { href: string; label: string };
  sublinks?: SubLink[];
};

type ResourceItem = {
  href: string;
  title: string;
  tag: string;
  description: string;
  sublinks?: SubLink[];
};

const RESOURCES: ResourceItem[] = [
  {
    href: "/technology/context-packs",
    title: "Context Packs",
    tag: "AI Context",
    description:
      "Downloadable AI-ready reference bundles: structured context for retrieval, orchestration, and constrained generation. Each pack groups a domain corpus into a bounded artifact with stable naming, explicit scope, and versioned files.",
    sublinks: [
      { href: "/technology/context-packs", label: "Browse packs →" },
    ],
  },
];

const ITEMS: TechItem[] = [
  // 1. Kristal
  {
    href: "/technology/kristal",
    title: "Kristal",
    tag: "Verifiable Knowledge",
    description:
      'Portable, verifiable knowledge artifacts. Kristals let communities publish “compiled truth packages” that can be checked, reused, and executed offline—so knowledge can travel without losing provenance.',
    sublinks: [
      { href: "/technology/kristal/what-it-does", label: "What it does →" },
      { href: "/technology/kristal/trust-and-provenance", label: "Trust & provenance →" },
      { href: "/technology/kristal/portability-and-offline", label: "Portability & offline →" },
    ],
  },
  // 2. Architect
  {
    href: "/technology/architect",
    title: "Abstract Wiki Architect",
    tag: "Multilingual Output",
    description:
      "Multilingual output for structured knowledge. Produces consistent, testable language across contexts, with traceable phrasing and reusable patterns.",
    repo: {
      href: "https://github.com/Rejean-McCormick/abstract-wiki-architect",
      label: "Rejean-McCormick/abstract-wiki-architect",
    },
  },
  // 3. SenTient
  {
    href: "/technology/sentient",
    title: "SenTient",
    tag: "Structured Input",
    description:
      "Structured intake from messy text. SenTient helps convert natural language into checkable statements that can be reviewed, corrected, and reused—turning “claims” into accountable knowledge.",
    repo: {
      href: "https://github.com/Rejean-McCormick/SenTient",
      label: "Rejean-McCormick/SenTient",
    },
  },
  // 4. SwarmCraft
  {
    href: "/technology/swarmcraft",
    title: "SwarmCraft",
    tag: "Continuity",
    description:
      "Continuity for long-running work. Helps keep multi-step projects coherent over time, with repeatable scaffolds and durable memory (including offline-friendly workflows when required).",
    repo: {
      href: "https://github.com/Rejean-McCormick/SwarmCraft",
      label: "Rejean-McCormick/SwarmCraft",
    },
  },
  // 5. Ariane
  {
    href: "/technology/ariane",
    title: "Ariane",
    tag: "Guided Navigation",
    description:
      "Guided navigation for complex systems. Ariane turns interfaces into structured maps so assistants can reliably walk users through real workflows—step by step, explainably.",
    repo: {
      href: "https://github.com/Rejean-McCormick/ariane",
      label: "Rejean-McCormick/ariane",
    },
  },
  // 6. Âme Artificielle
  {
    href: "/technology/ame-artificielle",
    title: "Âme artificielle",
    tag: "Guardrails",
    description: "Simulated human personality. An artificial soul.",
    repo: {
      href: "https://github.com/Rejean-McCormick/Ame-Artificielle",
      label: "Rejean-McCormick/Ame-Artificielle",
    },
  },
  // 7. VM-Engine
  {
    href: "/technology/voting-machine",
    title: "Voting Machine (VM-Engine)",
    tag: "Determinism",
    description:
      "Deterministic computation for governance. The same inputs yield the same outputs, enabling verification and reproducibility where legitimacy matters (e.g., ballots, tallies, allocations, simulations).",
    repo: {
      href: "https://github.com/Rejean-McCormick/vm-engine",
      label: "Rejean-McCormick/vm-engine",
    },
  },
];

const CARD =
  "group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors";
const PILL = "text-xs font-mono bg-gray-100 px-2 py-1 rounded";

export default function TechIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Technology</h1>

        <p className="text-xl text-gray-600">
          This stack is organized around <strong>capabilities</strong>—what the system lets
          communities and organizations do—rather than internal technical mechanisms. The focus
          is: <strong>portable knowledge</strong>, <strong>legitimate decisions</strong>, and{" "}
          <strong>reliable execution</strong>, under real-world constraints (offline, auditable,
          governable).
        </p>

        <div className="mt-5 p-4 rounded-md border border-gray-200 bg-white">
          <p className="text-sm text-gray-700">
            <strong>Reading guide:</strong> from <em>verifiable knowledge</em> →{" "}
            <em>navigation</em> → <em>decision & verification</em> → <em>execution & continuity</em>.
          </p>
        </div>

        <p className="text-sm text-gray-400 mt-3 font-mono">
          Domain: Réjean McCormick // Goal: Offline-capable + Auditable + Governable
        </p>

        <nav className="mt-6 flex flex-wrap gap-3" aria-label="Related sections">
          <Link
            href="/why"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Context →
          </Link>
          <Link
            href="/initiatives"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Initiatives →
          </Link>
          <Link
            href="/principles"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Principles →
          </Link>
          <Link
            href="/principles/glossary"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Glossary →
          </Link>
        </nav>
      </header>

      <section className="mb-12" aria-label="AI-ready documentation resources">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">AI-ready documentation</h2>
          <p className="text-gray-600 mt-2">
            Structured reference bundles intended for AI use: retrieval, orchestration, constrained
            generation, and durable machine-readable context.
          </p>
        </div>

        <div className="grid gap-6">
          {RESOURCES.map((item) => (
            <div key={item.href} className={CARD}>
              <Link href={item.href} className="block">
                <div className="flex justify-between items-center mb-2 gap-3">
                  <strong className="text-xl text-primary group-hover:underline">{item.title}</strong>
                  <span className={PILL}>{item.tag}</span>
                </div>
                <p className="text-gray-700 mb-4">{item.description}</p>
              </Link>

              {item.sublinks?.length ? (
                <div className="mt-3 flex flex-wrap gap-3">
                  {item.sublinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="text-sm text-gray-500 hover:text-primary font-mono"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6" aria-label="Technology capabilities">
        {ITEMS.map((item) => (
          <div key={item.href} className={CARD}>
            <Link href={item.href} className="block">
              <div className="flex justify-between items-center mb-2 gap-3">
                <strong className="text-xl text-primary group-hover:underline">{item.title}</strong>
                <span className={PILL}>{item.tag}</span>
              </div>
              <p className="text-gray-700 mb-4">{item.description}</p>
            </Link>

            {item.sublinks?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {item.sublinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-sm text-gray-500 hover:text-primary font-mono"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ) : null}

            {item.repo ? (
              <div className="mt-3">
                <RepoLink href={item.repo.href} label={item.repo.label} />
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </main>
  );
}

function RepoLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-500 hover:text-primary font-mono flex items-center"
      aria-label={`Open repository: ${label}`}
    >
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.087-.75.075-.735.075-.735 1.2.09 1.83 1.245 1.83 1.245 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.540-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
      {label}
    </a>
  );
}