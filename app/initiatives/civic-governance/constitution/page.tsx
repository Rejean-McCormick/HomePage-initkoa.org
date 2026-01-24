// app\initiatives\civic-governance\constitution\page.tsx
import Link from 'next/link';
import { Scroll, Vote, GitPullRequest, Shield, Scale, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "The Civic Constitution – kOA",
  description: "The Kernel of the Civic Operating System. The rules that govern the rulers.",
};

export default function ConstitutionPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
          <Scroll className="w-8 h-8 text-purple-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          The Civic Constitution
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          If kOA is an Operating System, the Constitution is the <strong>Kernel</strong>.
          It defines the immutable rules of the game. It ensures that the system serves the citizens, and not the other way around.
        </p>
      </div>

      {/* The 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Card 1: Ekoh */}
        <Link 
          href="/initiatives/civic-governance/constitution/ekoh"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <Vote className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            Ekoh: Consensus
          </h3>
          <p className="text-slate-600 mb-6 flex-grow">
            The Voting Protocol. Replacing "One Person, One Vote" with <strong>Liquid Meritocracy</strong> to ensure decisions are made by those with verified competence.
          </p>
          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View Protocol <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Orgo (Link Updated) */}
        <Link 
          href="/platforms/orgo"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <GitPullRequest className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            Orgo: Governance
          </h3>
          <p className="text-slate-600 mb-6 flex-grow">
            The Execution Engine. A dynamic, role-based hierarchy where authority is rented, never owned. No titles, just <strong>Functions</strong>.
          </p>
          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View Engine <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Rights */}
        <Link 
          href="/initiatives/civic-governance/constitution/rights"
          className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4 p-3 bg-purple-50 w-fit rounded-lg group-hover:bg-purple-100 transition-colors">
            <Shield className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700">
            Bill of Rights
          </h3>
          <p className="text-slate-600 mb-6 flex-grow">
            The Social Contract. Defining the absolute boundaries: <strong>Privacy of Person</strong>, <strong>Transparency of State</strong>, and the Right to Exit.
          </p>
          <div className="flex items-center text-sm font-bold text-purple-600 mt-auto">
            View Rights <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      {/* Philosophy Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
        <div className="flex items-start">
          <Scale className="w-8 h-8 mr-4 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              From Ink to Code: Algorithmic Law
            </h2>
            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="mb-4">
                Unlike traditional constitutions which are static text on paper—dependent on human interpretation and susceptible to corruption—the kOA Constitution is <strong>Algorithmic Law</strong>. It is enforced by the network itself.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span><strong>Immutable:</strong> The core rights cannot be suspended by emergency decree.</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span><strong>Transparent:</strong> Every vote, budget allocation, and role assignment is visible on the chain.</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span><strong>Forkable:</strong> If the system fails, citizens have the code-level right to "Fork" the state and leave.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}