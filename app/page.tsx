// app/page.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'kOA — Governable Knowledge-to-Action Infrastructure (Réjean McCormick)',
  description:
    'A sociotechnical operating system designed to convert knowledge → deliberation → decisions → execution → institutional memory, with offline capability, auditability, and non-domination by design.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#1e6864] selection:text-white">
      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 tracking-tight text-slate-900">
            kOA
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            A <strong className="text-slate-900 font-semibold">Sociotechnical Operating System</strong> for civic life:
            shared infrastructure that turns <strong>knowledge</strong> into <strong>legitimate decisions</strong>,{' '}
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

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Pill>Offline-capable</Pill>
            <Pill>Fail-closed integrity</Pill>
            <Pill>Auditability by default</Pill>
            <Pill>Determinism where required</Pill>
            <Pill>Multilingual dignity</Pill>
            <Pill>Non-domination</Pill>
          </div>

          <p className="text-xs text-slate-400 mt-8">
            An initiative by <span className="text-slate-600">Réjean McCormick</span>
          </p>
        </div>
      </section>

      {/* NAVIGATION HUB */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Pillar 1: CONTEXT */}
          <NavCard
            href="/why"
            title="Diagnosis"
            subtitle="Why this exists"
            description="Fragmentation, low verification throughput, semantic conflict, opaque decisions, weak execution, and institutional memory loss."
            icon={<IconGlobe />}
          />

          {/* Pillar 2: LEGITIMACY */}
          <NavCard
            href="/initiatives/civic-governance"
            title="Civic Governance"
            subtitle="Legitimacy layer"
            description="Deliberation and decision support designed to improve accuracy without replacing democratic legitimacy—transparent, contestable, and auditable."
            icon={<IconStack />}
          />

          {/* Pillar 3: INFRASTRUCTURE */}
          <NavCard
            href="/infrastructures"
            title="Infrastructures"
            subtitle="Resilience layer"
            description="Offline-capable, sovereignty-aligned foundations: distributed compute and durable knowledge services designed to survive crisis conditions."
            icon={<IconAnchor />}
          />

          {/* Pillar 4: ARCHITECTURE */}
          <NavCard
            href="/technology"
            title="Technology"
            subtitle="System components"
            description="The modules that make the guarantees real: knowledge artifacts, semantic tooling, multilingual rendering, deterministic computation, and execution workflows."
            icon={<IconEye />}
          />
        </div>
      </section>

      {/* FOOTER LINKS */}
      <section className="bg-slate-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
            Governance & Architecture
          </h3>

          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto font-serif italic">
            &quot;Build systems people can verify, contest, and govern.&quot;
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              href="/initiatives/civic-governance/constitution"
              className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              Constitution (rules)
            </Link>

            <span className="text-slate-300 hidden md:inline">|</span>

            <Link
              href="/platforms"
              className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              Platforms
            </Link>

            <span className="text-slate-300 hidden md:inline">|</span>

            <Link
              href="/research"
              className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              Research
            </Link>

            <span className="text-slate-300 hidden md:inline">|</span>

            <Link
              href="/sitemap"
              className="text-sm font-mono text-[#1e6864] hover:text-slate-900 border-b border-[#1e6864]/30 hover:border-slate-900 transition-colors pb-0.5"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </section>
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

// --- TYPES & COMPONENTS ---

interface NavCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: ReactNode;
}

function NavCard({ title, subtitle, description, href, icon }: NavCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="mb-6 text-slate-300 group-hover:text-[#1e6864] transition-colors duration-300">
        {icon}
      </div>
      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
        {subtitle}
      </div>
      <h2 className="text-3xl font-serif font-medium text-slate-900 mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-slate-300">
        {title}
      </h2>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </Link>
  );
}

// --- ICONS ---

function IconGlobe() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
}

function IconStack() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  );
}

function IconEye() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function IconAnchor() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <circle cx="12" cy="5" r="3"></circle>
      <line x1="12" y1="22" x2="12" y2="8"></line>
      <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
    </svg>
  );
}
