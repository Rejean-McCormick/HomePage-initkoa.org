// app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "kOA — Governable Knowledge-to-Action Infrastructure (Réjean McCormick)",
  description:
    "kOA is an initiative anchored by a belief-agnostic Sociotechnical OS (Konnaxion + Orgo). King Klown, metaphysics, and politics are optional corridors—not runtime dependencies.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1e6864] selection:text-white">
      {/* HERO SECTION */}
      <section className="pt-28 pb-14 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 tracking-tight text-slate-900">
            kOA
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mb-8 leading-relaxed font-light">
            A <strong className="text-slate-900 font-semibold">knowledge-to-action initiative</strong> for civic life:
            shared infrastructure that turns <strong>knowledge</strong> into <strong>legitimate decisions</strong>,{" "}
            <strong>executed action</strong>, and <strong>durable public memory</strong>.
          </p>

          <div className="max-w-4xl mx-auto text-left">
            <div className="rounded-md border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-medium text-slate-900">Scope, clearly</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                kOA includes an implementable core: a{" "}
                <strong className="text-slate-900 font-semibold">Sociotechnical Operating System</strong> designed for
                governability—offline-capable, auditable, and resistant to invisible authority.
              </p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-md border border-gray-200 bg-slate-50 p-4">
                  <h3 className="font-medium text-slate-900">Required for the OS (runtime)</h3>
                  <ul className="mt-2 space-y-2 text-slate-600 leading-relaxed">
                    <li>• Governance primitives (roles, legitimacy, audit trails, integrity gates)</li>
                    <li>
                      • <span className="text-slate-800 font-medium">Konnaxion</span> (knowledge platform)
                    </li>
                    <li>
                      • <span className="text-slate-800 font-medium">Orgo</span> (execution / sovereignty layer)
                    </li>
                    <li>• The conversion loop: knowledge → deliberation → decisions → execution → memory</li>
                  </ul>
                </div>

                <div className="rounded-md border border-gray-200 bg-white p-4">
                  <h3 className="font-medium text-slate-900">Optional corridors (not required)</h3>
                  <ul className="mt-2 space-y-2 text-slate-600 leading-relaxed">
                    <li>
                      • <span className="text-slate-800 font-medium">King Klown</span>: a narrative bridge that makes the
                      system illustrated and accessible
                    </li>
                    <li>
                      • <span className="text-slate-800 font-medium">Metaphysics</span>: meaning/language/philosophy
                      corridor (no runtime dependency)
                    </li>
                    <li>
                      • <span className="text-slate-800 font-medium">Politics</span>: deployment corridor (pilots,
                      institutions, strategy)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-md border border-gray-200 bg-white p-4">
                <h3 className="font-medium text-slate-900">Boundary rules</h3>
                <ul className="mt-2 space-y-2 text-slate-600 leading-relaxed">
                  <li>
                    • <span className="text-slate-800 font-medium">Belief-agnostic OS:</span> you do not need to love King
                    Klown, accept metaphysics, or share any worldview to use the OS.
                  </li>
                  <li>
                    • <span className="text-slate-800 font-medium">Directionality:</span> Konnaxion can appear in King
                    Klown stories, but King Klown is not inside Konnaxion.
                  </li>
                  <li>
                    • <span className="text-slate-800 font-medium">No prophecy:</span> the mythos explores scenario-based
                    futures—extrapolated possibilities, not mystical prediction.
                  </li>
                  <li>
                    • <span className="text-slate-800 font-medium">Operational authority stays explicit:</span> stories
                    teach and motivate; they do not define specifications, protocols, or governance truth.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/why"
              className="px-8 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-[#1e6864] transition-colors duration-300 min-w-[220px]"
            >
              Start with the problem
            </Link>
            <Link
              href="/initiatives"
              className="px-8 py-3 border border-gray-300 text-slate-600 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-all duration-300 min-w-[220px]"
            >
              Explore the OS + corridors
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Pill>Offline-capable</Pill>
            <Pill>Fail-closed integrity</Pill>
            <Pill>Auditability by default</Pill>
            <Pill>Determinism where required</Pill>
            <Pill>Non-domination</Pill>
            <Pill>Belief-agnostic OS</Pill>
            <Pill>Narrative bridge (optional)</Pill>
            <Pill>Scenario futures</Pill>
          </div>
        </div>
      </section>

      {/* NAVIGATION HUB */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* ... unchanged ... */}
      </section>

      {/* ... rest unchanged ... */}
    </main>
  );
}

// --- SMALL UI PRIMITIVES ---
function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-500 bg-white">
      {children}
    </span>
  );
}
