// app/infrastructure/kin-city/zones/page.tsx
import { 
  Landmark, 
  BookOpen, 
  Cpu, 
  Scale, 
  Palette, 
  Network, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Zone Guide – Kin City Districts',
  description: 'Explore the 5 major districts and infrastructure of the Kin City metaverse.',
};

export default function KinCityZones() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER & BACK LINK */}
        <div className="mb-16">
          <Link 
            href="/infrastructure/kin-city" 
            className="text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to City Overview
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            District Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Each zone in Kin City corresponds to a major module of the Konnaxion architecture. 
            The abstract becomes tangible—you don't just use the platform; you walk through it.
          </p>
        </div>

        {/* ZONES LIST */}
        <div className="space-y-20">

          {/* 1. CENTRAL HUB */}
          <section className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16">
            <div className="bg-yellow-100 p-4 rounded-2xl flex-shrink-0">
              <Landmark className="w-10 h-10 text-yellow-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Central Hub</h2>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  Ekoh Core
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">The Governance Plaza & City Hall</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  The heart of the city, analogous to a "City Hall." Here, the <strong>Ekoh</strong> meritocratic 
                  engine operates as the city's operating system, ensuring that contributions across all zones 
                  are evaluated fairly based on expertise and ethics.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">The Hall of Truth</strong>
                    Where collective knowledge is distilled and "Smart Vote" results are visualized on dynamic scoreboards.
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Golden Pavilion</strong>
                    A symbolic tower of wisdom representing the unification of individual inputs into collective intelligence.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. KNOWLEDGE DISTRICT */}
          <section className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16">
            <div className="bg-blue-100 p-4 rounded-2xl flex-shrink-0">
              <BookOpen className="w-10 h-10 text-blue-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Knowledge District</h2>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  KonnectED
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">The Global Campus</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  A vast educational quarter filled with libraries, lecture halls, and public learning gardens. 
                  This zone democratizes access to universally accepted knowledge, curated for inclusivity.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Grand Library</strong>
                    Browse repositories of scientific facts and ethical principles vetted by experts.
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Repair Cafés</strong>
                    Interactive spaces demonstrating sustainability practices and practical restoration skills.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. INNOVATION PARK */}
          <section className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16">
            <div className="bg-green-100 p-4 rounded-2xl flex-shrink-0">
              <Cpu className="w-10 h-10 text-green-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Innovation Park</h2>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  keenKonnect
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">R&D & Industrial Sector</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  An open-air research campus focused on "action over debate." Here, users co-create 
                  solutions to real-world problems using shared blueprints and prototyping tools.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Makerspace Hall</strong>
                    A 3D blueprint library where users can download or contribute designs for housing, energy, and tools.
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Collaboration Domes</strong>
                    Virtual meeting spaces equipped with live AI translation for cross-border teamwork.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. ETHICS PLAZA */}
          <section className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16">
            <div className="bg-purple-100 p-4 rounded-2xl flex-shrink-0">
              <Scale className="w-10 h-10 text-purple-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Ethics Plaza</h2>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  Ethikos
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">The Civic Forum</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  The civic heart of Kin City. A transparent meeting ground for dialogue, moral deliberation, 
                  and consensus building. Decisions here are visually tracked and filtered by expertise.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Debate Hall</strong>
                    Structured assembly chambers where users debate proposals with nuance (7 levels of agreement).
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Polling Pavilion</strong>
                    An outdoor amphitheater displaying live vote data, filterable by demographics or expertise level.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. CREATIVE QUARTER */}
          <section className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16">
            <div className="bg-pink-100 p-4 rounded-2xl flex-shrink-0">
              <Palette className="w-10 h-10 text-pink-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">Creative Quarter</h2>
                <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  Kreative
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">Arts & Culture Neighborhood</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  A vibrant district of winding streets, galleries, and theaters. This zone emphasizes 
                  emotional expression and cultural preservation as vital counterparts to logic and data.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Global Gallery</strong>
                    A showcase for digital art exhibitions and heritage museums preserving endangered cultural artifacts.
                  </li>
                  <li className="bg-gray-50 p-4 rounded-lg">
                    <strong className="block text-gray-900 mb-1">Mentors' Café</strong>
                    Social spaces connecting emerging artists with veteran creators for guidance.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. INFRASTRUCTURE (ORGO) */}
          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-gray-100 p-4 rounded-2xl flex-shrink-0">
              <Network className="w-10 h-10 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">City Infrastructure</h2>
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">
                  Orgo
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-4">The Nervous System</h3>
              <div className="prose text-gray-600 max-w-none">
                <p className="mb-4">
                  <strong>Orgo</strong> is not a single district but the invisible grid connecting them all. 
                  It acts as the city's telecommunications, security, and transport layer.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-4">
                  <h4 className="font-bold text-gray-900 mb-2">Key Utilities:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Teleportation Portals:</strong> Glowing hubs at street corners allowing instant travel between zones based on access rights.</li>
                    <li><strong>Secure Routing:</strong> Orgo automates message delivery and task routing between users, even in offline-first scenarios.</li>
                    <li><strong>Audit Trails:</strong> The underlying ledger that ensures all city actions are secure, fair, and accountable.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}