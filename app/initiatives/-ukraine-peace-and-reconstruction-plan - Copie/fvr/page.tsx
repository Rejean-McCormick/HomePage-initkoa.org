// app/initiatives/ukraine-peace-and-reconstruction-plan/fvr/page.tsx
import Link from 'next/link';
import { 
  BookOpen, 
  ShieldAlert, 
  Vote, 
  Hammer, 
  Scale, 
  FileText, 
  Users, 
  AlertTriangle,
  ClipboardList
} from 'lucide-react';

export const metadata = {
  title: "Freeze-Vote-Rebuild (FVR) – Operational Framework",
  description: "A comprehensive, verification-first peace plan for Ukraine. Status-neutral, phased, and auditable.",
};

export default function FvrHubPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Freeze–Vote–Rebuild (FVR)
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          A verification-first, status-neutral framework designed to move from active war to a legitimate political settlement and large-scale reconstruction. 
          It separates the problem into three sequenced phases: <strong>Stop the fighting</strong> (Freeze), <strong>Establish legitimacy</strong> (Vote), and <strong>Restore infrastructure</strong> (Rebuild).
        </p>
      </div>

      {/* 1. START HERE */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-primary" />
          Start Here
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/00-welcome"
            title="Welcome & Orientation"
            desc="How to read this book: narrative mode vs. implementation mode."
          />
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/00-start-here/01-one-page-summary"
            title="One-Page Summary"
            desc="The executive overview of the three-phase logic."
          />
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/01-proposal-at-a-glance/00-the-proposal-at-a-glance"
            title="Proposal at a Glance"
            desc="Core principles, red lines, and the theory of change."
          />
        </div>
      </section>

      {/* 2. THE CORE MECHANISM */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <ShieldAlert className="w-6 h-6 mr-3 text-blue-600" />
          The Three Phases
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Phase 1: Freeze */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center mb-4 text-blue-700">
              <ShieldAlert className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-lg">Phase 1: Freeze</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Stabilization, monitoring, and humanitarian access.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/02-freeze/01-ceasefire-architecture" className="hover:underline text-blue-600">Ceasefire Architecture</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/02-freeze/03-verification-monitoring" className="hover:underline text-blue-600">Verification & Monitoring</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/02-freeze/04-humanitarian-corridors-protected-infrastructure" className="hover:underline text-blue-600">Protected Infrastructure</Link></li>
            </ul>
          </div>

          {/* Phase 2: Vote */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center mb-4 text-purple-700">
              <Vote className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-lg">Phase 2: Vote</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Legitimacy, inclusion, and integrity.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/03-vote/02-electorate-definition" className="hover:underline text-purple-600">Electorate Definition</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/03-vote/03-voting-system-design" className="hover:underline text-purple-600">Voting System Design</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/03-vote/05-vote-to-border-mechanics" className="hover:underline text-purple-600">Vote-to-Border (Optional)</Link></li>
            </ul>
          </div>

          {/* Phase 3: Rebuild */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center mb-4 text-emerald-700">
              <Hammer className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-lg">Phase 3: Rebuild</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Reconstruction, transparency, and acceleration.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/04-rebuild/01-reconstruction-architecture" className="hover:underline text-emerald-600">Governance Architecture</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/04-rebuild/02-reconstruction-olympics" className="hover:underline text-emerald-600">Reconstruction Olympics</Link></li>
              <li><Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/04-rebuild/05-accountability-transparency" className="hover:underline text-emerald-600">Accountability Stack</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. GOVERNANCE & LEGAL */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Scale className="w-6 h-6 mr-3 text-slate-700" />
          Governance & Legal Pathways
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/05-governance-and-verification/01-status-neutral-governance-model"
            title="Status-Neutral Governance"
            desc="How to coordinate operations without predetermining political outcomes."
            icon={<FileText className="w-5 h-5" />}
          />
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/05-governance-and-verification/02-verification-first-gates"
            title="Verification Gates"
            desc="The control logic: measurable criteria for advancing phases or unlocking aid."
            icon={<FileText className="w-5 h-5" />}
          />
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/06-legal-and-political-pathways/01-domestic-approvals-gate"
            title="Domestic Approvals Gate"
            desc="Ensuring commitments are legally valid at home before taking effect."
            icon={<Scale className="w-5 h-5" />}
          />
          <HubLink 
            href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/06-legal-and-political-pathways/03-justice-accountability-options"
            title="Justice & Accountability"
            desc="Options for transitional justice and evidence preservation."
            icon={<Scale className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 4. PLAYBOOKS & RISKS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-3 text-amber-600" />
          Stakeholders & Risks
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="grid gap-4">
              <HubLink 
                href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/07-stakeholder-playbooks/00-stakeholder-playbooks-overview"
                title="Stakeholder Playbooks"
                desc="Operational guides for Ukraine, Russia, US/EU, and Civil Society."
                icon={<Users className="w-5 h-5" />}
              />
              <HubLink 
                href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/08-risks-critiques-mitigations/02-risk-register"
                title="Risk Register"
                desc="Structured analysis of failure modes (spoilers, coercion, corruption) and mitigations."
                icon={<AlertTriangle className="w-5 h-5" />}
              />
            </div>
          </div>
          
          {/* Toolkit Box */}
          <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
             <div className="flex items-center mb-4 text-indigo-700">
              <ClipboardList className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-lg">Implementation Toolkit</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/09-implementation-toolkit/01-operational-checklists-by-phase" className="flex items-center hover:text-indigo-600">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                  Operational Checklists
                </Link>
              </li>
              <li>
                <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/09-implementation-toolkit/03-metrics-kpis" className="flex items-center hover:text-indigo-600">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                  Metrics & KPIs
                </Link>
              </li>
              <li>
                <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/09-implementation-toolkit/02-templates" className="flex items-center hover:text-indigo-600">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                  Reporting Templates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER: CONTEXT */}
      <section className="pt-8 border-t border-slate-100">
        <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">Context & History</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/10-background-and-essays/00-background-overview" className="text-slate-600 hover:text-primary underline">
            Background Essays
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/11-appendices/03-decision-log" className="text-slate-600 hover:text-primary underline">
            Decision Log
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr/11-appendices/04-source-text-archive" className="text-slate-600 hover:text-primary underline">
            Source Archives
          </Link>
        </div>
      </section>

    </main>
  );
}

function HubLink({ href, title, desc, icon }: { href: string, title: string, desc: string, icon?: any }) {
  return (
    <Link href={href} className="group block p-5 border border-slate-200 rounded-lg hover:border-primary hover:shadow-sm transition-all bg-white">
      <div className="flex items-center mb-2">
        {icon && <span className="mr-2 text-slate-400 group-hover:text-primary transition-colors">{icon}</span>}
        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-snug">{desc}</p>
    </Link>
  );
}