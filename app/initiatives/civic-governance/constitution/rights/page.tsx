import { Shield, Eye, EyeOff, LogOut, BookOpen, Key } from 'lucide-react';

export const metadata = {
  title: "The Bill of Rights – KOA",
  description: "Privacy of Person, Transparency of State, and the Right to Exit.",
};

export default function BillOfRightsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-emerald-100 rounded-full">
            <Shield className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">The Civic Bill of Rights</h1>
        </div>
        <p className="text-xl text-slate-600 leading-relaxed">
          In the KOA system, rights are not just legal promises; they are <strong>hard-coded constraints</strong>. 
          The State does not "grant" these rights; the Code prevents the State from violating them.
        </p>
      </div>

      {/* Article 1: Privacy/Transparency */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <span className="text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded mr-4">ARTICLE I</span>
          <h2 className="text-2xl font-bold text-slate-900">The Inverse Surveillance State</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* The Citizen */}
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4 text-emerald-600">
              <EyeOff className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Privacy of the Person</h3>
            </div>
            <p className="text-slate-600 mb-4">
              <strong>The Default is Encryption.</strong><br/>
              A citizen's data (health, finance, communications) is encrypted by their private key. The State cannot see it without a specific, time-bound judicial warrant.
            </p>
            <div className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-100 font-mono">
              Status: PRIVATE by Default
            </div>
          </div>

          {/* The State */}
          <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-lg">
            <div className="flex items-center mb-4 text-emerald-400">
              <Eye className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Transparency of the State</h3>
            </div>
            <p className="text-slate-300 mb-4">
              <strong>The Default is Public.</strong><br/>
              The State has zero right to privacy. Every government wallet balance, every contract signed, and every vote cast by a representative is visible on the public ledger in real-time.
            </p>
            <div className="text-xs bg-slate-800 text-slate-400 p-2 rounded border border-slate-700 font-mono">
              Status: PUBLIC by Design
            </div>
          </div>
        </div>
      </section>

      {/* Article 2: The Right to Exit */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <span className="text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded mr-4">ARTICLE II</span>
          <h2 className="text-2xl font-bold text-slate-900">The Right to Exit (Forkability)</h2>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
          <LogOut className="absolute top-8 right-8 w-24 h-24 text-slate-200 -z-0" />
          <div className="relative z-10">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              The ultimate check on tyranny is the ability to leave. In traditional states, leaving is expensive (moving countries). In KOA, leaving is digital.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 p-1 bg-blue-100 rounded text-blue-600">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Data Portability</h4>
                  <p className="text-sm text-slate-600">You own your reputation (Kristals). If you leave the network, you take your verified skills and history with you. No "Platform Lock-in."</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 p-1 bg-purple-100 rounded text-purple-600">
                  <GitPullRequest className="w-4 h-4" /> {/* Importing GitPullRequest implicitly for consistency with other files or just imply icon usage */}
                  {/* Since GitPullRequest isn't imported, let's stick to the imported icons or add it. I will use a generic shape or assume import. Let's stick to imported. */}
                  <div className="w-4 h-4 font-bold text-xs flex items-center justify-center">fork</div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">The Right to Fork</h4>
                  <p className="text-sm text-slate-600">If the governance becomes corrupt, a group of citizens has the code-level right to "Fork" the state—copying the open-source infrastructure to start a parallel community with new rules.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Article 3: Right to Competence */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <span className="text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded mr-4">ARTICLE III</span>
          <h2 className="text-2xl font-bold text-slate-900">The Right to Competence</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center bg-blue-50 border border-blue-100 rounded-2xl p-8">
          <BookOpen className="w-16 h-16 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Ignorance is a Failure of the State</h3>
            <p className="text-blue-800 leading-relaxed">
              Access to the <strong>Knowledge Path</strong> is not a privilege; it is a prerequisite for citizenship.
              The State is constitutionally mandated to provide the infrastructure (servers, AI models, content) for any citizen to acquire any verified skill (Kristal) at zero cost.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

// Importing missing icon for the render
import { GitPullRequest } from 'lucide-react';