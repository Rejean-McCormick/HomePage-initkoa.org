import Link from 'next/link';

export const metadata = {
  title: "Civic Governance Initiatives",
  description: "Reinventing governance through modular, open-source systems."
};

export default function CivicGovernancePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Civic Governance</h1>
      <p>
        The core initiative of KOA is to provide a "Government in a Box" — a complete, deployable stack for managing communities.
      </p>

      <h2>The Constitution</h2>
      <p>The rules engine.</p>
      <ul>
        <li><Link href="/initiatives/civic-governance/constitution">Read the Constitution</Link></li>
      </ul>

      <h2>Active Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
        <Link href="/initiatives/civic-governance/modules/education" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Education</h3>
          <p className="text-sm text-slate-600">Kristals model for credentialing.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/economy" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Economy</h3>
          <p className="text-sm text-slate-600">Solidarity economy & resource tracking.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/justice" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">Justice</h3>
          <p className="text-sm text-slate-600">AI-assisted dispute resolution.</p>
        </Link>
        <Link href="/initiatives/civic-governance/modules/international" className="block p-4 border rounded hover:bg-slate-50">
          <h3 className="font-bold text-lg">International</h3>
          <p className="text-sm text-slate-600">Diplomacy and treaty frameworks.</p>
        </Link>
      </div>
    </main>
  );
}
