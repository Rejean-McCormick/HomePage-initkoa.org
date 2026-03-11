// app/platforms/konnaxion/journeys/page.tsx
import Link from "next/link";
import type { ReactElement } from "react";
import {
  GraduationCap,
  MessagesSquare,
  Vote,
  Hammer,
  Archive,
  ArrowRight,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Journeys — Konnaxion",
  description:
    "What you can do with Konnaxion: learn, deliberate, decide, build, and preserve—end-to-end civic workflows.",
};

type Journey = {
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
  outputs: string[];
  primaryLink: { href: string; label: string };
  secondaryLinks?: { href: string; label: string }[];
  icon: ReactElement;
  status?: "Active" | "TBD";
};

const journeys: Journey[] = [
  {
    title: "Learn → Validate → Certify",
    subtitle: "Competence you can prove",
    description:
      "Build real capability, validate it, and make it portable. The goal is not “content consumption” but measurable competence with durable credentials.",
    steps: ["Learn", "Practice", "Validate", "Certify", "Follow-up"],
    outputs: ["Verified credentials", "Competence profile", "Reusable learning paths"],
    primaryLink: { href: "/platforms/konnaxion/konnected", label: "Open KonnectED" },
    secondaryLinks: [
      { href: "/platforms/konnaxion/konnected/kintsugi", label: "Operate (Kintsugi)" },
      { href: "/platforms/konnaxion/konnected/kompendio", label: "Reference (Kompendio)" },
    ],
    icon: <GraduationCap className="w-7 h-7" />,
    status: "Active",
  },
  {
    title: "Discover → Deliberate → Draft",
    subtitle: "From messy input to legible decisions",
    description:
      "Run a structured process that turns submissions, evidence, and arguments into decision-ready drafts and accountable records.",
    steps: ["Discovery", "Deliberation", "Drafting", "Decision", "Accountability"],
    outputs: ["Decision draft", "Rationale trail", "Public record of outcomes"],
    primaryLink: { href: "/platforms/konnaxion/ethikos", label: "Open ethiKos" },
    secondaryLinks: [{ href: "/platforms/konnaxion/ethikos/kintsugi", label: "Operate (Kintsugi)" }],
    icon: <MessagesSquare className="w-7 h-7" />,
    status: "Active",
  },
  {
    title: "Vote → Compare Readings → Publish Outcome",
    subtitle: "Decision quality without hidden power",
    description:
      "See outcomes in multiple readings (e.g., baseline and quality-weighted) side-by-side. The point is transparency: improve decisions without obscuring legitimacy.",
    steps: ["Ballot", "Baseline tally", "Alternative reading(s)", "Explain", "Publish"],
    outputs: ["Baseline result", "Alternative lens result", "Explainable comparison"],
    primaryLink: { href: "/platforms/konnaxion/kollective-intelligence", label: "Open Kollective Intelligence" },
    secondaryLinks: [
      { href: "/platforms/konnaxion/kollective-intelligence/kintsugi", label: "Operate (Kintsugi)" },
      { href: "/initiatives/civic-governance/constitution/ekoh", label: "EkoH concept" },
    ],
    icon: <Vote className="w-7 h-7" />,
    status: "Active",
  },
  {
    title: "Plan → Execute → Preserve",
    subtitle: "Turn decisions into real work",
    description:
      "Coordinate projects with clear responsibilities, track progress to completion, and preserve outputs so they remain usable beyond the original team.",
    steps: ["Define work", "Route responsibility", "Execute", "Review", "Preserve"],
    outputs: ["Project workspace", "Accountable execution trail", "Versioned artifacts"],
    primaryLink: { href: "/platforms/konnaxion/keenkonnect", label: "Open keenKonnect" },
    secondaryLinks: [
      { href: "/platforms/konnaxion/keenkonnect/kintsugi", label: "Operate (Kintsugi)" },
      { href: "/platforms/konnaxion/keenkonnect/kompendio", label: "Reference (Kompendio)" },
    ],
    icon: <Hammer className="w-7 h-7" />,
    status: "Active",
  },
  {
    title: "Curate → Publish → Preserve Commons",
    subtitle: "A limited library, not a noise feed",
    description:
      "A curated commons for validated artifacts: decisions, methods, curricula, and project outputs. This module is not yet fully developed.",
    steps: ["Select", "Validate", "Publish", "Version", "Preserve"],
    outputs: ["Curated artifacts", "Public catalogue", "Long-term preservation"],
    primaryLink: { href: "/platforms/konnaxion/modules", label: "Back to modules" },
    icon: <Archive className="w-7 h-7" />,
    status: "TBD",
  },
];

function Badge({ status }: { status: "Active" | "TBD" }) {
  const cls =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-amber-50 text-amber-800 border-amber-200";
  return (
    <span className={`text-xs font-mono px-2 py-1 rounded border ${cls}`}>
      {status === "Active" ? "Active" : "TBD"}
    </span>
  );
}

export default function KonnaxionJourneysPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-mono text-slate-500 mb-2">Konnaxion / Journeys</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What you can do with Konnaxion
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Konnaxion is designed around outcomes: learning that produces competence, deliberation that produces
              decisions, decisions that become execution, and execution that becomes preserved public memory.
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-3 items-end">
            <Link
              href="/platforms/konnaxion"
              className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#1e6864] transition-colors"
            >
              Konnaxion overview <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/platforms/konnaxion/modules"
              className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#1e6864] transition-colors"
            >
              Browse modules <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/platforms/konnaxion/kintsugi"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 text-sm text-slate-700"
          >
            <Layers className="w-4 h-4" />
            Kintsugi (Operate)
          </Link>
          <Link
            href="/platforms/konnaxion/kompendio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 text-sm text-slate-700"
          >
            <Layers className="w-4 h-4" />
            Kompendio (Reference)
          </Link>
        </div>
      </div>

      {/* Journeys grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {journeys.map((j) => (
          <section
            key={j.title}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-700">{j.icon}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900">{j.title}</h2>
                    {j.status && <Badge status={j.status} />}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{j.subtitle}</p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-5">{j.description}</p>

            <div className="mb-5">
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Steps</div>
              <div className="flex flex-wrap gap-2">
                {j.steps.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Outputs</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                {j.outputs.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href={j.primaryLink.href}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-[#1e6864] transition-colors text-sm font-semibold"
              >
                {j.primaryLink.label} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              {j.secondaryLinks?.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors text-sm font-semibold text-slate-800"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-14 border-t border-slate-200 pt-10 text-center">
        <p className="text-slate-600 max-w-3xl mx-auto">
          These journeys are designed to be composable: learning produces competence signals; deliberation produces
          decision-ready outputs; decisions become execution; and outputs are preserved for reuse.
        </p>
        <div className="mt-6">
          <Link
            href="/platforms/konnaxion/modules"
            className="inline-flex items-center font-semibold text-slate-900 hover:text-[#1e6864] transition-colors"
          >
            Explore the modules <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </main>
  );
}