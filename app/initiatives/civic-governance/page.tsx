// app/initiatives/civic-governance/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Civic Governance Initiatives",
  description:
    "Reinventing governance through modular, open-source systems.",
};

export default function CivicGovernancePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Civic Governance</h1>
      <p>
        The core initiative of kOA is to provide a &quot;Government in a Box&quot; —
        a complete, deployable stack for managing communities.
      </p>

      <h2>The Constitution</h2>
      <p>The rules engine.</p>
      <ul>
        <li>
          <Link href="/initiatives/civic-governance/constitution">
            Read the Constitution
          </Link>
        </li>
      </ul>

      <h2>Modules Overview</h2>
      <p>
        Start with the modules hub to understand how the framework is organized
        before diving into individual domains.
      </p>
      <p>
        <Link href="/initiatives/civic-governance/modules">
          View the Civic Modules hub
        </Link>
      </p>

      <h2>Active Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
        <Link
          href="/initiatives/civic-governance/modules"
          className="block p-4 border rounded hover:bg-slate-50 md:col-span-2"
        >
          <h3 className="font-bold text-lg">Civic Modules Hub</h3>
          <p className="text-sm text-slate-600">
            Overview of the modular governance stack and how each civic function
            fits together.
          </p>
        </Link>

        <Link
          href="/initiatives/civic-governance/modules/education"
          className="block p-4 border rounded hover:bg-slate-50"
        >
          <h3 className="font-bold text-lg">Education</h3>
          <p className="text-sm text-slate-600">
            Kristals model for credentialing.
          </p>
        </Link>

        <Link
          href="/initiatives/civic-governance/modules/economy"
          className="block p-4 border rounded hover:bg-slate-50"
        >
          <h3 className="font-bold text-lg">Economy</h3>
          <p className="text-sm text-slate-600">
            Solidarity economy &amp; resource tracking.
          </p>
        </Link>

        <Link
          href="/initiatives/civic-governance/modules/justice"
          className="block p-4 border rounded hover:bg-slate-50"
        >
          <h3 className="font-bold text-lg">Justice</h3>
          <p className="text-sm text-slate-600">
            AI-assisted dispute resolution.
          </p>
        </Link>

        <Link
          href="/initiatives/civic-governance/modules/international"
          className="block p-4 border rounded hover:bg-slate-50"
        >
          <h3 className="font-bold text-lg">International</h3>
          <p className="text-sm text-slate-600">
            Diplomacy and treaty frameworks.
          </p>
        </Link>
      </div>
    </main>
  );
}