// app/platforms/konnaxion/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Konnaxion – Civic Coordination Platform',
  description:
    'A modular civic platform for learning, deliberation, coordination, and decision-making in the kOA ecosystem.',
};

export default function KonnaxionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-slate-900">
          Konnaxion
        </h1>

        <h2 className="text-xl text-slate-500 font-light mb-8">
          Learning • Deliberation • Coordination • Decisions
        </h2>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            Konnaxion is a civic platform for coordinating people, knowledge, and action through a modular
            architecture. It groups tools for learning, public deliberation, collaboration, and governance
            into one coherent system.
          </p>
          <p>
            This page is an overview. Use the modules below to explore each capability, with clear boundaries
            between education, deliberation, coordination, and decision systems.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="https://konnaxion.com/ekoh/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-primary transition-colors text-center"
          >
            Visit the Dashboard
          </a>
          <a
            href="https://kingklown.wiki/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-center"
          >
            Presentation (KingKlown.wiki)
          </a>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* MODULES */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Modules</h2>
          <p className="text-slate-500 italic mb-8 border-l-2 border-primary pl-4">
            Navigation: open a module to see its purpose, workflows, and related pages.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* KonnectED */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                KonnectED
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/platforms/konnaxion/konnected/knowledge"
                    className="font-bold text-primary hover:underline"
                  >
                    Knowledge
                  </Link>
                  <p className="text-sm text-slate-600">
                    A shared learning library: cataloging, recommendations, co-creation, and forums.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/konnected/certifikation"
                    className="font-bold text-primary hover:underline"
                  >
                    CertifiKation
                  </Link>
                  <p className="text-sm text-slate-600">
                    Skills and certification: learning paths, evaluations, peer validation, and portfolios.
                  </p>
                </li>
              </ul>
            </div>

            {/* Ethikos */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                Ethikos
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/platforms/konnaxion/ethikos/korum"
                    className="font-bold text-primary hover:underline"
                  >
                    Korum
                  </Link>
                  <p className="text-sm text-slate-600">
                    Structured debates: topics, stance scale (-3 to +3), threaded arguments, and expert cohorts.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/ethikos/konsultations"
                    className="font-bold text-primary hover:underline"
                  >
                    Konsultations
                  </Link>
                  <p className="text-sm text-slate-600">
                    Public consultations: time-boxed input windows, citizen proposals, and transparent voting modes.
                  </p>
                </li>
              </ul>
            </div>

            {/* Kreative */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                Kreative
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/platforms/konnaxion/kreative/konservation"
                    className="font-bold text-primary hover:underline"
                  >
                    Konservation
                  </Link>
                  <p className="text-sm text-slate-600">
                    Cultural preservation: digital archives, exhibitions, and improved discovery.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/kreative/kontact"
                    className="font-bold text-primary hover:underline"
                  >
                    Kontact
                  </Link>
                  <p className="text-sm text-slate-600">
                    Collaboration and networking: profiles, matching, and opportunities.
                  </p>
                </li>
              </ul>
            </div>

            {/* keenKonnect */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">
                keenKonnect
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/platforms/konnaxion/keenkonnect/konstruct"
                    className="font-bold text-primary hover:underline"
                  >
                    Konstruct
                  </Link>
                  <p className="text-sm text-slate-600">
                    Project collaboration: workspaces, tasks, coordination, and assistive insights.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/keenkonnect/stockage"
                    className="font-bold text-primary hover:underline"
                  >
                    Stockage
                  </Link>
                  <p className="text-sm text-slate-600">
                    Secure repository: document storage, versioning, indexing, and sync.
                  </p>
                </li>
              </ul>
            </div>

            {/* Kollective Intelligence */}
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                Kollective Intelligence
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence/ekoh"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    EkoH
                  </Link>
                  <p className="text-sm text-slate-600">
                    Domain-specific credibility signals: how competence is recognized, made transparent, and kept accountable.
                  </p>
                </div>
                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence/smart-vote"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    Smart Vote
                  </Link>
                  <p className="text-sm text-slate-600">
                    Decision views that remain legible: see outcomes under different governance modes (e.g., baseline and expertise-informed),
                    without hiding the logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-sm">
          <h2 className="text-xl font-bold text-white mb-4">For implementers</h2>
          <p className="mb-6 text-sm leading-relaxed">
            If you are building or integrating Konnaxion, the technical page covers the architecture, services, data model,
            and real-time infrastructure details.
          </p>
          <Link
            href="/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services"
            className="inline-block px-4 py-2 border border-slate-600 rounded text-white hover:bg-slate-800 text-sm transition-colors"
          >
            Technical specs →
          </Link>
        </section>
      </div>
    </main>
  );
}
