// app\platforms\konnaxion\keenkonnect\page.tsx
// app/platforms/konnaxion/keenkonnect/page.tsx
import Link from 'next/link';
import { Network, FolderKanban, Archive, ArrowRight, Layers } from 'lucide-react';

export const metadata = {
  title: "keenKonnect Hub – Konnaxion",
  description: "The limbs of the organism. Project workspaces, task coordination, and secure storage.",
};

export default function KeenKonnectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="mb-16 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Network className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">keenKonnect</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The limbs of the organism. keenKonnect is where intention becomes coordination. It transforms abstract decisions into projects, tasks, and artifacts.
        </p>
      </div>

      {/* 1. THE TWO WORKBENCHES */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Layers className="w-6 h-6 mr-3 text-primary" />
          The Two Workbenches
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Konstruct */}
          <Link 
            href="/platforms/konnaxion/keenkonnect/konstruct"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <FolderKanban className="w-5 h-5 mr-2 text-orange-600" />
              Konstruct
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **The Construction Site.** Project workspaces, task management, and collaborative planning. It turns the "what" (decision) into the "how" (execution).
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Project Engine <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Stockage */}
          <Link 
            href="/platforms/konnaxion/keenkonnect/stockage"
            className="group block p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary flex items-center">
              <Archive className="w-5 h-5 mr-2 text-slate-600" />
              Stockage
            </h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              **Secure Repository.** The solid memory of the system. Versioned storage, encryption, and audit trails for assets that must not be lost or altered.
            </p>
            <div className="inline-flex items-center font-bold text-slate-700 text-sm">
              View Storage Specs <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER NAV */}
      <div className="pt-8 border-t border-slate-100 flex justify-between text-sm">
        <Link href="/platforms/konnaxion" className="text-slate-500 hover:text-primary">
          ← Back to Konnaxion Hub
        </Link>
        <Link href="/platforms/konnaxion/kreative" className="text-slate-500 hover:text-primary">
          Next: Kreative (Culture) →
        </Link>
      </div>

    </main>
  );
}