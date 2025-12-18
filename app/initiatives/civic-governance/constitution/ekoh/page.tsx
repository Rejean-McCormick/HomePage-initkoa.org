import { Vote, Scale, Users, Award, GitMerge, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: "Ekoh: Liquid Meritocracy – KOA",
  description: "A consensus mechanism based on proven competence. Balancing democratic mandate with technical expertise.",
};

export default function EkohPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Vote className="w-8 h-8 text-indigo-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Ekoh: Liquid Meritocracy</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed">
          Democracy counts heads. Ekoh weighs minds. <br/>
          A consensus protocol designed to solve the "Ignorance of the Crowd" without falling into the "Corruption of the Elite."
        </p>
      </div>

      {/* The Diagnostic Section */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-center mb-4 text-red-800">
            <Users className="w-5 h-5 mr-2" />
            <h3 className="font-bold">The Bug in Democracy</h3>
          </div>
          <p className="text-sm text-red-700 leading-relaxed">
            <strong>The Ignorance of the Crowd.</strong><br/>
            Asking the general public to vote on nuclear reactor safety protocols is dangerous. Pure democracy treats the opinion of a nuclear physicist and a flat-earther as mathematically equal on technical issues.
          </p>
        </div>

        <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl">
          <div className="flex items-center mb-4 text-amber-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <h3 className="font-bold">The Bug in Technocracy</h3>
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>The Corruption of the Elite.</strong><br/>
            Experts often lose touch with reality or serve special interests. A panel of unelected scientists may mandate policies that are technically correct but socially disastrous or inhumane.
          </p>
        </div>
      </section>

      {/* The Solution: Weighted Voting */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
          <Scale className="mr-3 text-indigo-600" />
          The Solution: Weighted Voting
        </h2>
        
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mb-10">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-4">The Formula</p>
          <div className="text-2xl md:text-3xl font-mono font-bold leading-relaxed">
            VoteWeight = <span className="text-indigo-400">Base</span> + (<span className="text-emerald-400">Competence</span> × <span className="text-purple-400">Relevance</span>)
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-indigo-400 font-bold block mb-1">Base (1.0)</span>
              Every citizen has a fundamental right to vote on social values.
            </div>
            <div>
              <span className="text-emerald-400 font-bold block mb-1">Competence</span>
              Derived from your <strong>Kristals</strong> (Verified Skills).
            </div>
            <div>
              <span className="text-purple-400 font-bold block mb-1">Relevance</span>
              Is your skill relevant to <em>this specific vote</em>?
            </div>
          </div>
        </div>

        {/* Example Scenarios */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 font-bold text-slate-700">
            Scenario: Voting on "New Hospital Construction Standards"
          </div>
          <div className="divide-y divide-slate-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-4">Dr</div>
                <div>
                  <div className="font-bold text-slate-900">Alice (Structural Engineer)</div>
                  <div className="text-xs text-slate-500">Kristal: Civil Engineering (Gold)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">5.0x</div>
                <div className="text-xs text-slate-400 uppercase">Weight</div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-4">Nu</div>
                <div>
                  <div className="font-bold text-slate-900">Bob (ER Nurse)</div>
                  <div className="text-xs text-slate-500">Kristal: Healthcare (Silver)</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">3.5x</div>
                <div className="text-xs text-slate-400 uppercase">Weight</div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold mr-4">Ci</div>
                <div>
                  <div className="font-bold text-slate-900">Charlie (Artist)</div>
                  <div className="text-xs text-slate-500">No relevant technical skills</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">1.0x</div>
                <div className="text-xs text-slate-400 uppercase">Weight</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Delegation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
          <GitMerge className="mr-3 text-purple-600" />
          Liquid Delegation
        </h2>
        <div className="prose prose-lg text-slate-600 mb-8">
          <p>
            You do not have time to be an expert in everything. In a traditional democracy, you elect a representative for 4 years and hope for the best. 
            In <strong>Liquid Democracy</strong>, you delegate your vote dynamically by topic.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Granular Trust</h4>
            <p className="text-sm text-purple-800">
              "I trust <strong>Alice</strong> for Environmental Policy, but I trust <strong>Bob</strong> for Economic Policy."
            </p>
          </div>
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Transitive Flow</h4>
            <p className="text-sm text-purple-800">
              If you delegate to Alice, and Alice delegates to Carol, your vote flows to Carol automatically.
            </p>
          </div>
          <div className="p-5 border border-purple-100 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">Instant Recall</h4>
            <p className="text-sm text-purple-800">
              If Alice betrays your trust, you can revoke your delegation instantly via the app. No waiting for elections.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Conclusion */}
      <div className="mt-16 p-8 bg-slate-50 border-t border-slate-200">
        <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
          <Award className="w-6 h-6 mr-3 text-indigo-600" />
          The Result: High-Signal Governance
        </h3>
        <p className="text-slate-600 max-w-2xl">
          Ekoh creates a system where <strong>Influence = Trust + Competence</strong>. 
          It drowns out the noise of populism while preventing the rigidity of dictatorship. 
          It is the operating system for a society that values truth over rhetoric.
        </p>
      </div>

    </main>
  );
}