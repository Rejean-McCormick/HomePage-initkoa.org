// app/platforms/konnaxion/page.tsx
import Link from 'next/link';

export const metadata = {
  title: "Konnaxion â€“ Civic Workflows & Module Interactions"
};

export default function KonnaxionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary selection:text-white pb-24">
      
      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-slate-900">
          Konnaxion
        </h1>
        <h2 className="text-xl text-slate-500 font-light mb-8">
          Civic Workflows & Module Interactions
        </h2>
        
        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed max-w-none">
          <p>
            Konnaxion is a socioâ€‘technical framework for coordinating people, knowledge, and action through an ethical, modular civic architecture built on the kOA model: <strong>KonnectED, Ethikos, Kreative, keenKonnect, EkoH, Smart Vote</strong>.
          </p>
          <p>
            This page is the <strong>hub</strong> for the wiki. It summarizes how modules relate to each other. For implementation details, use the dedicated technical page linked at the end.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a 
            href="https://konnaxion.com/ekoh/dashboard" 
            target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-900 text-white rounded-sm font-medium hover:bg-primary transition-colors text-center"
          >
            Visit the Dashboard
          </a>
          <a 
            href="https://kingklown.wiki/" 
            target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-sm font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-center"
          >
            Presentation (KingKlown.wiki)
          </a>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* WIKI STRUCTURE */}
        <section>
          <h2 className="text-3xl font-serif font-medium mb-8 text-slate-900">Wiki Structure</h2>
          <p className="text-slate-500 italic mb-8 border-l-2 border-primary pl-4">
            Navigation: Click on a module below to view its specific documentation.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* KonnectED */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">KonnectED</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/konnected/knowledge" className="font-bold text-primary hover:underline">Knowledge</Link>
                  <p className="text-sm text-slate-600">Collaborative Learning Library: catalog, recommendations, coâ€‘creation, forums.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/konnected/certifikation" className="font-bold text-primary hover:underline">CertifiKation</Link>
                  <p className="text-sm text-slate-600">Skills & Certification: paths, evaluations, peer validation, portfolios.</p>
                </li>
              </ul>
            </div>

            {/* Ethikos */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Ethikos</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/ethikos/korum" className="font-bold text-primary hover:underline">Korum</Link>
                  <p className="text-sm text-slate-600">Structured Debates: topics, âˆ’3â€¦+3 stances, threaded arguments, expert cohorts.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/ethikos/konsultations" className="font-bold text-primary hover:underline">Konsultations</Link>
                  <p className="text-sm text-slate-600">Public Consultations: timeâ€‘boxed consultations, citizen suggestions, weighted ballots.</p>
                </li>
              </ul>
            </div>

            {/* Kreative */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Kreative</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/kreative/konservation" className="font-bold text-primary hover:underline">Konservation</Link>
                  <p className="text-sm text-slate-600">Cultural Preservation: digital archives, virtual exhibitions, AIâ€‘enriched catalog.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/kreative/kontact" className="font-bold text-primary hover:underline">Kontact</Link>
                  <p className="text-sm text-slate-600">Collaboration & Networking: profiles, intelligent matching, opportunities.</p>
                </li>
              </ul>
            </div>

            {/* keenKonnect */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">keenKonnect</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/platforms/konnaxion/keenkonnect/konstruct" className="font-bold text-primary hover:underline">Konstruct</Link>
                  <p className="text-sm text-slate-600">Project Collaboration: workspaces, tasks, chat, AI insights.</p>
                </li>
                <li>
                  <Link href="/platforms/konnaxion/keenkonnect/stockage" className="font-bold text-primary hover:underline">Stockage</Link>
                  <p className="text-sm text-slate-600">Secure Repository: document storage, versioning, indexing, realâ€‘time sync.</p>
                </li>
              </ul>
            </div>

            {/* Kollective Intelligence */}
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Kollective Intelligence</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Link href="/platforms/konnaxion/kollective-intelligence/ekoh" className="font-bold text-primary hover:underline block mb-1">EkoH</Link>
                  <p className="text-sm text-slate-600">Reputation & Expertise: multidimensional scoring, ethical multipliers, audit trails.</p>
                </div>
                <div>
                  <Link href="/platforms/konnaxion/kollective-intelligence/smart-vote" className="font-bold text-primary hover:underline block mb-1">Smart Vote</Link>
                  <p className="text-sm text-slate-600">Weighted Voting System: EkoHâ€‘weighted voting, emergingâ€‘expert detection.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL */}
        <section className="bg-slate-900 text-slate-300 p-8 rounded-sm">
          <h2 className="text-xl font-bold text-white mb-4">Technical Architecture</h2>
          <p className="mb-6 text-sm leading-relaxed">
            For details about service codeâ€‘names, Django models, configuration parameters (thresholds, limits), and realâ€‘time infrastructure (Channels/Redis):
          </p>
          <Link 
            href="/platforms/konnaxion/technical/konnaxion-technical-architecture-and-services" 
            className="inline-block px-4 py-2 border border-slate-600 rounded text-white hover:bg-slate-800 text-sm transition-colors"
          >
            Technical Specs â†’
          </Link>
        </section>

      </div>
    </main>
  );
}