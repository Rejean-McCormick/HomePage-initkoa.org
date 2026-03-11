// app/platforms/konnaxion/technical/page.tsx
import Link from "next/link";
import type { ReactElement } from "react";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Boxes,
  Cable,
  CheckCircle2,
  Database,
  FileStack,
  Layers,
  Lock,
  Network,
  ServerCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata = {
  title: "Technical — Konnaxion",
  description:
    "Technical entry point for Konnaxion: architecture, service boundaries, integration logic, governance constraints, and the operating model behind the platform.",
};

type Pillar = {
  title: string;
  description: string;
  bullets: string[];
  href: string;
  cta: string;
  icon: ReactElement;
};

const pillars: Pillar[] = [
  {
    title: "Architecture and services",
    description:
      "Read the full technical architecture, service model, and platform boundary decisions behind Konnaxion.",
    bullets: [
      "System decomposition and service responsibilities",
      "Governance-aware platform boundaries",
      "Hosted, hybrid, and self-hostable operating assumptions",
    ],
    href: "/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services",
    cta: "Open architecture document",
    icon: <ServerCog className="w-6 h-6" />,
  },
  {
    title: "Operate layer (Kintsugi)",
    description:
      "Understand how Kintsugi provides unified permissions, provenance, packaging, and execution coherence across modules.",
    bullets: [
      "One-roof operator experience",
      "Shared audit and release surfaces",
      "Stable lifecycle for operational artifacts",
    ],
    href: "/platforms/konnaxion/kintsugi",
    cta: "See operate layer",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: "Reference layer (Kompendio)",
    description:
      "See how Kompendio turns fragmented documentation and civic knowledge into a stable, queryable reference surface.",
    bullets: [
      "Reference discipline over document sprawl",
      "Legible knowledge surfaces",
      "Reusable context for governance and execution",
    ],
    href: "/platforms/konnaxion/kompendio",
    cta: "See reference layer",
    icon: <BookOpen className="w-6 h-6" />,
  },
];

const principles = [
  {
    title: "Governance before convenience",
    text: "Konnaxion is not just workflow software. It is designed so roles, approvals, legitimacy, and public accountability remain visible in the technical system.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: "Composable, not monolithic",
    text: "Modules solve different civic jobs, but they should still feel like one governable environment with shared identity, audit, and artifact logic.",
    icon: <Blocks className="w-5 h-5" />,
  },
  {
    title: "Artifacts over vague state",
    text: "What matters must become durable outputs: records, decisions, credentials, release packs, and preserved public memory.",
    icon: <FileStack className="w-5 h-5" />,
  },
  {
    title: "Operational clarity over hidden automation",
    text: "Technical power should increase legibility, traceability, and reproducibility—not bury decisions inside opaque infrastructure.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

const capabilities = [
  {
    title: "Identity and permissions",
    text: "Shared access logic across modules so publication, moderation, approval, and execution remain coherent.",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    title: "Integration contracts",
    text: "Modules and tools exchange data through explicit contracts instead of brittle, invisible coupling.",
    icon: <Cable className="w-5 h-5" />,
  },
  {
    title: "Artifact lifecycle",
    text: "Work produces stable outputs that can be versioned, packaged, audited, and reused.",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Cross-module workflows",
    text: "Learning, deliberation, voting, and execution can connect without collapsing into a single undifferentiated product.",
    icon: <Workflow className="w-5 h-5" />,
  },
];

const hubLinks = [
  {
    title: "Journeys",
    text: "See how different roles move across Konnaxion without losing context, permissions, or traceability.",
    href: "/platforms/konnaxion/journeys",
    icon: <Network className="w-5 h-5" />,
  },
  {
    title: "Kreative",
    text: "Explore the curated commons for preservation, discovery, and reuse of validated outputs.",
    href: "/platforms/konnaxion/kreative",
    icon: <Boxes className="w-5 h-5" />,
  },
];

export default function KonnaxionTechnicalPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-14">
        <p className="text-sm font-mono text-slate-500 mb-2">
          Konnaxion / Technical
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
          Technical foundations of Konnaxion
        </h1>

        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          This section is the entry point for the technical side of Konnaxion:
          the architecture, service boundaries, integration rules, and operating
          assumptions that make the platform governable, auditable, and usable
          across real civic workflows.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors text-sm font-semibold"
          >
            Read the architecture <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <Link
            href="/platforms/konnaxion"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
          >
            Konnaxion overview
          </Link>

          <Link
            href="/platforms/konnaxion/modules"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
          >
            Browse modules
          </Link>

          <Link
            href="/platforms/konnaxion/journeys"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
          >
            See journeys
          </Link>

          <Link
            href="/platforms/konnaxion/kreative"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
          >
            Open Kreative
          </Link>
        </div>
      </div>

      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-700">
                  {pillar.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {pillar.title}
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed mb-5">
                {pillar.description}
              </p>

              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mb-6">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <Link
                href={pillar.href}
                className="inline-flex items-center font-semibold text-slate-900 hover:text-[#1e6864] transition-colors"
              >
                {pillar.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
            Design principles
          </p>
          <div className="space-y-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="border border-slate-200 rounded-xl p-5 bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-700">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
            What the technical layer must support
          </p>
          <div className="space-y-4">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="border border-slate-200 rounded-xl p-5 bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-700">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
            Related hubs
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Technical context across the platform
          </h2>
          <p className="text-slate-600 max-w-3xl leading-relaxed">
            The technical layer is not isolated. It supports how people move
            through the platform, how outputs are preserved, and how modules stay
            legible as one coordinated environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block border border-slate-200 rounded-2xl p-6 bg-white hover:border-slate-300 hover:shadow-sm transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-3 text-slate-700">
                {item.icon}
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">{item.text}</p>
              <span className="inline-flex items-center font-semibold text-slate-900 hover:text-[#1e6864] transition-colors">
                Open {item.title} <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700">
            <Boxes className="w-6 h-6" />
          </div>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Where to go next
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Start with the architecture document if you want the full system
              picture. Then use the operate and reference layers to understand
              how Konnaxion keeps workflows coherent across modules without
              becoming an opaque monolith.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link
                href="/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors text-sm font-semibold"
              >
                Architecture and services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/platforms/konnaxion/kintsugi"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
              >
                Operate layer
              </Link>

              <Link
                href="/platforms/konnaxion/kompendio"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
              >
                Reference layer
              </Link>

              <Link
                href="/platforms/konnaxion/journeys"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
              >
                Journeys
              </Link>

              <Link
                href="/platforms/konnaxion/kreative"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
              >
                Kreative
              </Link>

              <Link
                href="/technology"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
              >
                Broader technology stack
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}