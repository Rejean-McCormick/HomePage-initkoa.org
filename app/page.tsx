// app/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "kOA — Governable Knowledge-to-Action Infrastructure (Réjean McCormick)",
  description:
    "A sociotechnical operating system designed to convert knowledge → deliberation → decisions → execution → institutional memory, with offline capability, auditability, and non-domination by design.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1e6864] selection:text-white">
      {/* HERO SECTION */}
      <section className="pt-28 pb-14 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 tracking-tight text-slate-900">
            kOA
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            A <strong className="text-slate-900 font-semibold">Sociotechnical Operating System</strong> for civic life:
            shared infrastructure that turns <strong>knowledge</strong> into <strong>legitimate decisions</strong>,{" "}
            <strong>executed action</strong>, and <strong>durable public memory</strong>.
            <br />
            Built for governability: offline-capable, auditable, and resistant to invisible authority.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
              Explore the system
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Pill>Offline-capable</Pill>
            <Pill>Fail-closed integrity</Pill>
            <Pill>Auditability by default</Pill>
            <Pill>Determinism where required</Pill>
            <Pill>Multilingual dignity</Pill>
            <Pill>Non-domination</Pill>
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
