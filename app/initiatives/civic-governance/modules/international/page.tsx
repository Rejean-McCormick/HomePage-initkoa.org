// app\initiatives\civic-governance\modules\international\page.tsx
// app/initiatives/civic-governance/modules/international/page.tsx
import Link from "next/link";
import { Globe, ArrowRight, Construction } from "lucide-react";

export const metadata = {
  title: "International Strategy – KOA",
  description: "Technocratic neutrality and the Freeze–Vote–Rebuild framework.",
};

export default function InternationalPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
          <Globe className="w-8 h-8 text-purple-700" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">International Strategy</h1>

        <p className="text-xl text-slate-600">
          Applying the KOA operating system to geopolitics. We replace moralizing diplomacy with
          <strong> technocratic neutrality</strong> and <strong> construction competitions</strong>.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Active Frameworks</h2>

      <Link
        href="/initiatives/ukraine-peace-plan"
        className="group block p-8 border border-slate-200 rounded-2xl hover:border-purple-500 hover:shadow-lg transition-all"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600">
              Ukraine Peace &amp; Reconstruction Plan (Freeze–Vote–Rebuild)
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                BETA v4.0
              </span>
              <span className="text-slate-400 text-sm">OkidoWiki</span>
            </div>

            <p className="text-slate-600 mb-6 max-w-xl">
              A comprehensive three-phase framework to exit the war without surrendering sovereignty:
              <strong> Freeze</strong> (monitored ceasefire), <strong> Vote</strong> (legitimacy), and{" "}
              <strong> Rebuild</strong> (the Construction Olympics).
            </p>

            <div className="text-sm text-purple-700 font-semibold">
              Open the plan hub →
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-purple-600" />
        </div>
      </Link>

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 opacity-75">
        <h3 className="flex items-center font-bold text-slate-700 mb-2">
          <Construction className="w-4 h-4 mr-2" />
          Coming Soon
        </h3>
        <p className="text-sm text-slate-500">
          <strong>The Taiwan Protocol:</strong> Applying the “Silicon Shield” theory to distributed
          sovereignty.
        </p>
      </div>
    </main>
  );
}
