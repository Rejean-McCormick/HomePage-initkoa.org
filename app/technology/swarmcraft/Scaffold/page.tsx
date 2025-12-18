// app/technology/swarmcraft/scaffold/page.tsx
import Link from 'next/link';
import { 
  Grid, 
  FileJson, 
  Book, 
  Table, 
  ArrowRight, 
  LayoutTemplate 
} from 'lucide-react';

export const metadata = {
  title: "Story Scaffold & Schema – SwarmCraft",
  description: "Templates, Outlines, and the Grid system for structured narrative planning.",
};

export default function ScaffoldPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Grid className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Story Scaffold & Schema</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The structural backbone of SwarmCraft. Before prose is written, the story exists as a structured <strong>Scaffold</strong> defined by JSON schemas and editable via a Grid interface.
        </p>
      </div>

      {/* 1. CONCEPT & INTENT */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Book className="w-6 h-6 mr-3 text-primary" />
          Creative Intent
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Story Bible */}
          <Link 
            href="/technology/swarmcraft/scaffold/story-bible-creative-intent"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              The Story Bible
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              The canonical home for creative intent. Distinct from runtime state, it holds characters, lore, and the scaffold itself.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Bible Structure <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Story Scaffold */}
          <Link 
            href="/technology/swarmcraft/scaffold/story-scaffold-templates-outline-parts"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary">
              The Scaffold Model
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              How <strong>Templates</strong> (threads/pacing) and <strong>Outlines</strong> (beats/contracts) combine to drive the deterministic engine.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Scaffold Logic <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. SCHEMA DEFINITIONS */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <FileJson className="w-6 h-6 mr-3 text-blue-600" />
          JSON Schemas
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          
          <Link 
            href="/technology/swarmcraft/scaffold/schema-templates"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Schema: Templates
                </h3>
                <p className="text-slate-600 text-sm">
                  Defining thread sets ("Plot", "Theme") and cadence rules.
                </p>
              </div>
              <LayoutTemplate className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link 
            href="/technology/swarmcraft/scaffold/schema-outline"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 mb-2">
                  Schema: Outline
                </h3>
                <p className="text-slate-600 text-sm">
                  Defining chapters, parts, and the "Part Contract" (Goal/Obstacle/Turn).
                </p>
              </div>
              <FileJson className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

        </div>
      </section>

      {/* 3. TOOLS & EDITING */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Table className="w-6 h-6 mr-3 text-emerald-600" />
          Tools & Editing
        </h2>
        
        <div className="grid gap-6">
          <Link 
            href="/technology/swarmcraft/scaffold/outline-grid-csv-round-trip"
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 mb-2">
                  Outline Grid & CSV Round-Trip
                </h3>
                <p className="text-slate-600 text-sm">
                  How the JSON outline is projected into a spreadsheet-like Grid for human editing, and how CSV import/export preserves structure.
                </p>
              </div>
              <Table className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/technology/swarmcraft/core" className="text-slate-500 hover:text-primary">
          ← Back to Core Logic
        </Link>
        <Link href="/technology/swarmcraft/runtime" className="text-slate-500 hover:text-primary">
          Next: Runtime & Ops →
        </Link>
      </div>

    </main>
  );
}