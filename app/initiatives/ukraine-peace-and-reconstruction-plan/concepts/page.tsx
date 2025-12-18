// app/initiatives/ukraine-peace-and-reconstruction-plan/concepts/page.tsx
import Link from 'next/link';
import { Lightbulb, Shield, Hammer, Globe, Truck, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Core Concepts – Ukraine Peace Plan",
  description: "The strategic pillars of the Freeze-Vote-Rebuild framework.",
};

export default function UkraineConceptsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Lightbulb className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Strategic Concepts</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The theoretical and operational pillars of the Freeze-Vote-Rebuild framework. These concepts explain <em>why</em> the plan works and <em>how</em> it breaks the geopolitical deadlock.
        </p>
      </div>

      {/* CONCEPTS GRID */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* 1. Peace Framework */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/concepts/peace-framework"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4 text-blue-700">
            <Shield className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-bold group-hover:text-blue-600">The Peace Framework</h3>
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            **Freeze & Vote.** How to stop the fighting immediately using the "Army of the Pope" (neutral monitors) and solve territorial disputes through binding, supervised referendums.
          </p>
          <div className="flex items-center font-bold text-blue-600 text-sm">
            Read Protocol <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 2. Construction Olympics */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/concepts/construction-olympics"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4 text-amber-700">
            <Hammer className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-bold group-hover:text-amber-600">The Construction Olympics</h3>
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            **Gamified Reconstruction.** Replacing bureaucratic aid with a high-velocity global competition. Nations send teams to build housing and infrastructure faster and better.
          </p>
          <div className="flex items-center font-bold text-amber-600 text-sm">
            View Competition Model <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 3. Operational Logistics */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/concepts/operational-logistics"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-slate-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4 text-slate-700">
            <Truck className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-bold group-hover:text-slate-900">Operational Logistics</h3>
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            **The Mechanics of Rebuild.** Organizing thousands of international workers using the "Visual Patch System" (color-coded roles) and the Orgo digital coordination platform.
          </p>
          <div className="flex items-center font-bold text-slate-600 text-sm">
            View Logistics <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* 4. Future Vision */}
        <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/concepts/future-vision"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4 text-purple-700">
            <Globe className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-bold group-hover:text-purple-600">Future Vision</h3>
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            **Terra Internationalis.** Envisioning Ukraine not as a buffer zone, but as a sovereign "Cultural Bridge"—a global hub for innovation where East and West collaborate.
          </p>
          <div className="flex items-center font-bold text-purple-600 text-sm">
            Read Vision <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

         {/* 5. Geopolitical Context */}
         <Link 
          href="/initiatives/ukraine-peace-and-reconstruction-plan/concepts/geopolitical-context"
          className="group block p-8 bg-white border border-slate-200 rounded-xl hover:border-red-500 hover:shadow-md transition-all md:col-span-2"
        >
          <div className="flex items-center mb-4 text-red-700">
            <BookOpen className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-bold group-hover:text-red-600">Geopolitical Context</h3>
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            **Why Neutrality Matters.** An analysis of why current strategies (sanctions, isolation) have failed to stop the war, and why a radical restart based on strict neutrality is required.
          </p>
          <div className="flex items-center font-bold text-red-600 text-sm">
            Read Analysis <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm mt-12">
        <Link href="/initiatives/ukraine-peace-and-reconstruction-plan" className="text-slate-500 hover:text-primary">
          ← Back to Peace Plan Hub
        </Link>
        <Link href="/initiatives/ukraine-peace-and-reconstruction-plan/fvr" className="text-slate-500 hover:text-primary">
          Go to Operational Framework (FVR) →
        </Link>
      </div>

    </main>
  );
}