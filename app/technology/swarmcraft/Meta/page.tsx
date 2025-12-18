// app/technology/swarmcraft/meta/page.tsx
import Link from 'next/link';
import { Info, GitBranch, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: "Meta & Lineage – SwarmCraft",
  description: "Credits, history, and architectural lineage of the engine.",
};

export default function SwarmCraftMetaPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Info className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Meta & Lineage</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          SwarmCraft is not built in a vacuum. It is an architectural fork with a specific lineage. This section documents the credits, upstream origins, and the meta-structural decisions that define the engine.
        </p>
      </div>

      {/* CONTENT GRID */}
      <section className="grid gap-6">
        
        {/* Credits Link */}
        <Link 
          href="/technology/swarmcraft/meta/credits-and-lineage"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-primary transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-start">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl mr-6 group-hover:bg-blue-100 transition-colors">
              <GitBranch className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                Credits & Architectural Lineage
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Acknowledging the **upstream foundation** (Mojomast/swarmussy) and the **meta-structural influence** of the Abstract Wiki Architect. This page details exactly what was reused, what was rewritten, and how the "Brain/Logic/Memory" separation evolved.
              </p>
              <div className="flex items-center font-bold text-blue-600 text-sm uppercase tracking-wide">
                Read Full Credits <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 mt-12 flex justify-between text-sm">
        <Link href="/technology/swarmcraft" className="text-slate-500 hover:text-primary flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          Back to SwarmCraft Hub
        </Link>
      </div>

    </main>
  );
}