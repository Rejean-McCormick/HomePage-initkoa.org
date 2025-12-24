// app\initiatives\civic-governance\modules\page.tsx
// app/initiatives/civic-governance/modules/page.tsx
import Link from 'next/link';
import { 
  GraduationCap, 
  TrendingUp, 
  Scale, 
  Globe, 
  ArrowRight 
} from 'lucide-react';

export const metadata = {
  title: "Civic Modules Hub – KOA",
  description: "The active functional modules of the Civic Governance framework.",
};

export default function ModulesHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Civic Modules</h1>
        <p className="text-xl text-slate-600">
          These are the active subsystems of the KOA governance model. Each module addresses a specific pillar of civic life with verified, non-extractive logic.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Education */}
        <Link 
          href="/initiatives/civic-governance/modules/education"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700 mr-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700">Education</h2>
          </div>
          <p className="text-slate-600 mb-4">
            The <strong>Kristal System</strong>. Replacing time-based diplomas with verified competence portfolios. Free access, paid by the beneficiary.
          </p>
          <div className="flex items-center text-sm font-bold text-blue-600">
            Explore Curriculum <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Economy */}
        <Link 
          href="/initiatives/civic-governance/modules/economy"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mr-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-amber-700">Economy</h2>
          </div>
          <p className="text-slate-600 mb-4">
            The <strong>Solidarity Network</strong>. A blueprint for non-extractive commerce, circular logistics, and eliminating the "troll tax" on living costs.
          </p>
          <div className="flex items-center text-sm font-bold text-amber-600">
            View Solutions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Justice */}
        <Link 
          href="/initiatives/civic-governance/modules/justice"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700 mr-3">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-700">Justice</h2>
          </div>
          <p className="text-slate-600 mb-4">
            <strong>Augmented Fairness</strong>. Using AI to remove bias, automate administrative churn, and provide free 24/7 legal defense to every citizen.
          </p>
          <div className="flex items-center text-sm font-bold text-slate-600">
            See the Model <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* International */}
        <Link 
          href="/initiatives/civic-governance/modules/international"
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700 mr-3">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700">International</h2>
          </div>
          <p className="text-slate-600 mb-4">
            <strong>Technocratic Neutrality</strong>. Frameworks for peace (Freeze-Vote-Rebuild) and reconstruction (Olympics) that bypass geopolitical deadlock.
          </p>
          <div className="flex items-center text-sm font-bold text-purple-600">
            View Strategy <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <Link href="/initiatives/civic-governance" className="text-slate-500 hover:text-primary text-sm font-medium">
          ← Back to Governance Hub
        </Link>
      </div>
    </main>
  );
}