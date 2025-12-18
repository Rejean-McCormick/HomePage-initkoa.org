// app/infrastructures/kin-city/page.tsx
import Link from 'next/link';
import { ArrowRight, Map, Box, Users, Shield, Cpu } from 'lucide-react'; // Assuming you have lucide-react or similar icons

export const metadata = {
  title: 'Kin City – The Virtual Interface',
  description: 'A living, breathing virtual city where the Mouvement Koa ecosystem comes to life.',
};

export default function KinCityPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      
      {/* HERO SECTION */}
      <section className="relative bg-indigo-900 text-white py-24 overflow-hidden">
        {/* Abstract background element representing the "Mandala" or Concentric Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Kin City</h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10">
            A virtual interface for the Mouvement Koa. Not just a dashboard, but a 
            <strong> living city </strong> where knowledge, ethics, and creativity converge.
          </p>
          
          {/* ROBLOX CTA - Highlighting the "First Version" */}
          <div className="bg-white text-indigo-900 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <Box className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">Phase 1: Kin City Alpha</h3>
                <p className="text-gray-600 mb-4">
                  We are prototyping our vision of a functional civic metaverse. 
                  Explore the initial layout and interact with early concepts on Roblox.
                </p>
              </div>
              <a 
                href="https://www.roblox.com" // Replace with actual Roblox link
                target="_blank" 
                rel="noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                Play on Roblox <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & ORIGIN */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">The Mandala & The Island</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">
                Kin City is not random; it is designed with intention. Inspired by 
                <strong> Île René-Levasseur</strong>—the "Eye of Quebec"—our city follows a 
                concentric mandala layout.
              </p>
              <p>
                Just as a mandala represents unity, Kin City organizes diverse modules—education, 
                governance, art—into a coherent whole. The central hub anchors the city, 
                while districts radiate outward, symbolizing that all knowledge is interconnected.
              </p>
            </div>
            <div className="mt-8">
               {/* Link to the deeper Philosophy sub-page */}
              <Link href="/infrastructures/kin-city/philosophy" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
                Read about our Design Philosophy <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
          {/* Placeholder for an image of the René-Levasseur Island or the Kin City Map */}
          <div className="bg-gray-200 h-80 rounded-xl flex items-center justify-center text-gray-400">
            [Image: Diagram of René-Levasseur Island / Mandala Layout]
          </div>
        </div>
      </section>

      {/* THE ZONES (Districts) */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Explore the Districts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every zone in Kin City corresponds to a major module of the Konnaxion architecture, 
              turning abstract software into a place you can visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Zone 1: KonnectED */}
            <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Knowledge District</h3>
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">Powered by KonnectED</p>
              <p className="text-gray-600">
                A vast campus of libraries and lecture halls. Access universally accepted knowledge 
                and educational resources in a democratic environment.
              </p>
            </div>

            {/* Zone 2: Ethikos */}
            <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ethics Plaza</h3>
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">Powered by Ethikos</p>
              <p className="text-gray-600">
                The civic heart of the city. A forum for debate, reflection, and collective 
                decision-making, guided by the Ekoh merit system.
              </p>
            </div>

            {/* Zone 3: keenKonnect */}
            <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation Park</h3>
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">Powered by keenKonnect</p>
              <p className="text-gray-600">
                An open-air R&D campus. Join collaborative labs, view 3D blueprints, 
                and solve real-world problems with global teams.
              </p>
            </div>

             {/* Zone 4: Central Hub */}
             <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow md:col-span-1 lg:col-span-1">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Central Hub</h3>
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">Powered by Ekoh</p>
              <p className="text-gray-600">
                The "City Hall." The governance core where collective wisdom is distilled 
                and community metrics are visualized.
              </p>
            </div>

            {/* Zone 5: Kreative */}
            <div className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Creative Quarter</h3>
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wide">Powered by Kreative</p>
              <p className="text-gray-600">
                An arts neighborhood with virtual galleries and theaters. Explore heritage museums, 
                co-create art, and experience culture as a pillar of society.
              </p>
            </div>
          </div>
          
           <div className="mt-10 text-center">
               {/* Link to the deeper Zones sub-page */}
              <Link href="/infrastructures/kin-city/zones" className="text-indigo-600 font-bold hover:underline">
                View Detailed Map & Zone Guide →
              </Link>
            </div>
        </div>
      </section>

      {/* TECH STACK & ROADMAP SUMMARY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">From Map to Metaverse</h2>
          <p className="text-lg text-gray-700 mb-12">
            Our development roadmap moves from accessibility to immersion.
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-left">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
              <span className="text-indigo-500 font-bold text-xl">01</span>
              <h4 className="font-bold text-lg mt-2">Roblox Prototype</h4>
              <p className="text-gray-500 text-sm mt-1">
                Gamified alpha for community testing and engagement.
              </p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm opacity-75">
               <span className="text-gray-400 font-bold text-xl">02</span>
              <h4 className="font-bold text-lg mt-2">Web Interactive</h4>
              <p className="text-gray-500 text-sm mt-1">
                2D/2.5D browser-based map using Next.js & Mapbox.
              </p>
            </div>
             <div className="flex-1 bg-white p-6 rounded-lg shadow-sm opacity-75">
               <span className="text-gray-400 font-bold text-xl">03</span>
              <h4 className="font-bold text-lg mt-2">Full Immersion</h4>
              <p className="text-gray-500 text-sm mt-1">
                3D WebGL & AR integration for mixed reality experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}