// app/platforms/konnaxion/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Konnaxion — Public Coordination Platform',
  description:
    'The public coordination spine of the kOA ecosystem: learn, deliberate, decide, build, distribute, and preserve public memory through modular civic utilities.',
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
          Learn • Deliberate • Decide • Build • Distribute • Preserve
        </h2>

        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            Konnaxion is the <strong>public coordination spine</strong> of the kOA ecosystem. It brings learning,
            structured deliberation, collective decision interfaces, builder coordination, and durable public memory into
            one coherent civic platform.
          </p>
          <p>
            The goal is simple: help communities move from <strong>knowledge</strong> to{' '}
            <strong>legitimate decisions</strong> to <strong>executed work</strong> and{' '}
            <strong>verifiable public memory</strong>—without turning governance into a black box.
          </p>
          <p>
            In the Kristal v5 stack, Konnaxion is the public distribution and runtime surface: it can expose Kristal
            Exchanges, Runtime Packs, reader policies, authority-scoped references, and preserved disagreement without
            pretending that every visible assertion has the same certainty, authority, or scope.
          </p>
          <p className="text-sm">
            In this stack, <strong>EkoH</strong> is the expertise + ethics ledger (weights + audit context),{' '}
            <strong>Smart Vote</strong> is the decision engine (modalities + readings + publication), and{' '}
            <strong>Kristal</strong> is the portable epistemic artifact layer that preserves provenance, certainty,
            validation, authority, scope, and lineage.
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
            Open Konnaxion
          </a>

          <Link
            href="#modules"
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-center"
          >
            Explore modules
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            One platform, modular utilities
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Reader-policy selected views
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Runtime Packs + offline access
          </span>
          <span className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
            Public coordination + builder continuity
          </span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* KRISTAL ROLE */}
        <section className="bg-slate-50 border border-slate-100 rounded-sm p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-medium text-slate-900">Konnaxion in the Kristal v5 stack</h2>
            <p className="text-slate-500 mt-2">
              Konnaxion is where structured epistemic artifacts become public, usable, navigable, and governable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-sm p-5">
              <h3 className="font-bold text-slate-900 mb-2">Distribution and activation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Konnaxion can distribute Kristal Exchanges and Runtime Packs to users, communities, schools,
                organizations, regions, or low-connectivity deployments. Activation remains separate from artifact
                existence: a pack may exist, verify, and still be hidden by local policy.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-5">
              <h3 className="font-bold text-slate-900 mb-2">Reader policies</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Konnaxion can expose different views of the same Kristal material: reference-only, validated-only,
                high-certainty, research, creative, or all-with-labels. Reader policy decides visibility without erasing
                certainty, authority, validation, or scope labels.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-5">
              <h3 className="font-bold text-slate-900 mb-2">Disagreement preserved</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Federated Kristals can preserve competing authority channels, disputed positions, research hypotheses,
                mythological corpora, fictional corpora, and institutional references without silently merging them into
                one flattened truth layer.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/technology/kristal"
              className="px-5 py-3 bg-white border border-slate-300 text-slate-800 rounded-sm font-medium hover:border-slate-900 transition-colors text-center"
            >
              Open Kristal overview
            </Link>

            <Link
              href="/technology/kristal/integrations"
              className="px-5 py-3 bg-white border border-slate-300 text-slate-800 rounded-sm font-medium hover:border-slate-900 transition-colors text-center"
            >
              Kristal integrations
            </Link>

            <Link
              href="/technology/kristal/portability-and-offline"
              className="px-5 py-3 bg-white border border-slate-300 text-slate-800 rounded-sm font-medium hover:border-slate-900 transition-colors text-center"
            >
              Runtime Packs
            </Link>
          </div>
        </section>

        {/* MODULES */}
        <section id="modules">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-serif font-medium text-slate-900">Modules</h2>
              <p className="text-slate-500 mt-2">
                Each module is a civic utility with clear boundaries. Most modules are expressed through two layers:
                <strong> Kintsugi</strong> (operate “under one roof”) and <strong>Kompendio</strong> (reference /
                integration vocabulary).
              </p>
            </div>
            <div className="hidden sm:flex gap-3">
              <Link
                href="/platforms/konnaxion/technical#kintsugi"
                className="text-sm font-mono text-primary hover:underline"
              >
                What is Kintsugi →
              </Link>
              <Link
                href="/platforms/konnaxion/technical#kompendio"
                className="text-sm font-mono text-primary hover:underline"
              >
                What is Kompendio →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* KonnectED */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">KonnectED</h3>
              <p className="text-sm text-slate-600 mb-6">
                The competence loop: learn, practice, validate, and certify—so participation can be informed and
                competence can be portable.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link href="/platforms/konnaxion/konnected#kintsugi" className="font-bold text-primary hover:underline">
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    The integrated learning experience: one roof for learning paths, evaluation, and verified outcomes.
                  </p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/konnected#kompendio" className="font-bold text-primary hover:underline">
                    Kompendio (Reference)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Standards, mappings, and charts that keep competence legible, auditable, and reusable across modules.
                  </p>
                </li>
              </ul>
            </div>

            {/* ethiKos */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">ethiKos</h3>
              <p className="text-sm text-slate-600 mb-6">
                Structured deliberation and decision formation: turn messy inputs into legible, reviewable outputs and
                accountability trails.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link href="/platforms/konnaxion/ethikos#kintsugi" className="font-bold text-primary hover:underline">
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Run consultations, debates, drafting, and decision workflows in one integrated civic process.
                  </p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/ethikos#kompendio" className="font-bold text-primary hover:underline">
                    Kompendio (Reference)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Patterns, governance charts, and integration vocabulary for deliberation and institutional memory.
                  </p>
                </li>
              </ul>
            </div>

            {/* keenKonnect */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-gray-100 pb-2">keenKonnect</h3>
              <p className="text-sm text-slate-600 mb-6">
                The builder workspace: turn approved decisions into projects, coordinate execution, and preserve outputs
                so they survive turnover.
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/platforms/konnaxion/keenkonnect#kintsugi"
                    className="font-bold text-primary hover:underline"
                  >
                    Kintsugi (Operate)
                  </Link>
                  <p className="text-sm text-slate-600">
                    One roof for building: workspaces, coordination, delivery loops, and continuity.
                  </p>
                </li>
                <li>
                  <Link
                    href="/platforms/konnaxion/keenkonnect#kompendio"
                    className="font-bold text-primary hover:underline"
                  >
                    Kompendio (Reference)
                  </Link>
                  <p className="text-sm text-slate-600">
                    Reference stacks and pinned charts that guide projects and keep dependencies explicit.
                  </p>
                </li>
              </ul>
            </div>

            {/* Kollective Intelligence */}
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Kollective Intelligence
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                The decision interface: keep outcomes legible under complexity by publishing transparent, comparable{' '}
                <strong>Smart Vote readings</strong> (baseline always visible; alternative readings explicitly declared).
              </p>

              <div className="grid gap-6">
                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence#smart-vote"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    Smart Vote
                  </Link>
                  <p className="text-sm text-slate-600">
                    The decision engine: vote modalities + weighting + published readings, with audit artifacts,
                    contestability, and the ability to cite Kristal references as structured evidence or policy context.
                  </p>
                </div>

                <div>
                  <Link
                    href="/platforms/konnaxion/kollective-intelligence#ekoh"
                    className="font-bold text-primary hover:underline block mb-1"
                  >
                    EkoH
                  </Link>
                  <p className="text-sm text-slate-600">
                    The expertise + ethics ledger: domain score vectors, ethics multipliers, privacy levels, and audit
                    context that can weight recognition, visibility, distribution priority, featured packs, and curation
                    status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CROSS-CUTTING HUBS */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-medium text-slate-900">Cross-cutting hubs</h2>
            <p className="text-slate-500 mt-2">
              These pages explain how the modules connect over time: onboarding, preservation, reader-policy selected
              memory, and builder-facing architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/platforms/konnaxion/journeys"
              className="block border border-slate-200 rounded-sm p-6 hover:border-slate-400 transition-colors no-underline"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Journeys</h3>
              <p className="text-sm text-slate-600">
                Role-based pathways through Konnaxion: how a citizen, builder, learner, or coordinator moves through the
                ecosystem without losing context.
              </p>
              <span className="inline-block mt-4 text-sm font-mono text-primary">Open journeys →</span>
            </Link>

            <Link
              href="/platforms/konnaxion/kreative"
              className="block border border-slate-200 rounded-sm p-6 hover:border-slate-400 transition-colors no-underline"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kreative</h3>
              <p className="text-sm text-slate-600">
                The curated commons: preservation, discovery, and reuse of reference artifacts, working artifacts,
                reader-policy selected packs, and civic outputs.
              </p>
              <span className="inline-block mt-4 text-sm font-mono text-primary">Open Kreative →</span>
            </Link>

            <Link
              href="/platforms/konnaxion/technical"
              className="block border border-slate-200 rounded-sm p-6 hover:border-slate-400 transition-colors no-underline"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Technical architecture</h3>
              <p className="text-sm text-slate-600">
                Builder-facing reference for service boundaries, Kintsugi vs Kompendio, Kristal Runtime Packs, reader
                policies, and the operational shape of the platform.
              </p>
              <span className="inline-block mt-4 text-sm font-mono text-primary">Open technical guide →</span>
            </Link>
          </div>
        </section>

        {/* REFERENCE */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-sm">
          <h2 className="text-xl font-bold text-white mb-4">Reference (builders)</h2>
          <p className="mb-6 text-sm leading-relaxed">
            If you are integrating or implementing Konnaxion, use the reference section for service maps, standards,
            Runtime Pack distribution, activation and rollback assumptions, reader-policy behavior, and integration
            vocabulary. This is intentionally separated from the public-facing module pages.
          </p>
          <a
            href="https://github.com/Rejean-McCormick/Konnaxion/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 border border-slate-600 rounded text-white hover:bg-slate-800 text-sm transition-colors"
          >
            Open reference →
          </a>
        </section>
      </div>
    </main>
  );
}