// app/infrastructures/kin-city/page.tsx
import Link from 'next/link';
import { ArrowRight, Map, Box, Users, Shield, Cpu, Construction } from 'lucide-react';

export const metadata = {
  title: 'Kin City – The Virtual Interface',
  description: 'A living, breathing virtual city where the Mouvement Koa ecosystem comes to life.',
};

export default function KinCityPage() {
  return (
    <main className="min-h-screen bg-neutral-50 selection:bg-[#1e6864] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#1e6864] text-white py-24 overflow-hidden">
        {/* Abstract background element representing the "Mandala" */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-teal-900 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">Welcome to Kin City</h1>
          <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto mb-10 font-light">
            A virtual interface for the Mouvement Koa. Not just a dashboard, but a 
            <strong> living city </strong> where knowledge, ethics, and creativity converge.
          </p>
          
          {/* ROBLOX CTA - Updated for "In Development" status */}
          <div className="bg-white/95 backdrop-blur-sm text-[#1e6864] p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-teal-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-[#1e6864]/10 p-4 rounded-full">
                <Construction className="w-10 h-10 text-[#1e6864]" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">Phase 1: In Construction</h3>
                <p className="text-slate-600 mb-4">
                  We are actively prototyping our vision of a functional civic metaverse. 
                  The initial layout is currently being built for the <strong>Roblox</strong> platform.
                </p>
              </div>
              <div className="bg-slate-100 text-slate-400 font-bold py-3 px-6 rounded-lg cursor-not-allowed flex items-center gap-2">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & ORIGIN */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">The Mandala & The Island</h2>
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
              <Link href="/infrastructures/kin-city/philosophy" className="text-[#1e6864] font-bold hover:underline flex items-center gap-2">
                Read about our Design Philosophy <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
          {/* Placeholder for an image of the René-Levasseur Island or the Kin City Map */}
          <div className="bg-slate-200 h-80 rounded-xl flex items-center justify-center text-slate-400 border border-slate-300">
             [Image: Diagram of René-Levasseur Island / Mandala Layout]
          </div>
        </div>
      </section>

      {/* THE ZONES (Districts) */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif">Explore the Districts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every zone in Kin City corresponds to a major module of the Konnaxion architecture, 
              turning abstract software into a place you can visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Zone 1: KonnectED */}
            <div className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-[#1e6864]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Map className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e6864]">Knowledge District</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-bold">Powered by KonnectED</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                A vast campus of libraries and lecture halls. Access universally accepted knowledge 
                and educational resources in a democratic environment.
              </p>
            </div>

            {/* Zone 2: Ethikos */}
            <div className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-[#1e6864]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e6864]">Ethics Plaza</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-bold">Powered by Ethikos</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The civic heart of the city. A forum for debate, reflection, and collective 
                decision-making, guided by the Ekoh merit system.
              </p>
            </div>

            {/* Zone 3: keenKonnect */}
            <div className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-[#1e6864]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <Cpu className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e6864]">Innovation Park</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-bold">Powered by keenKonnect</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                An open-air R&D campus. Join collaborative labs, view 3D blueprints, 
                and solve real-world problems with global teams.
              </p>
            </div>

             {/* Zone 4: Central Hub */}
             <div className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-[#1e6864]/30 transition-all duration-300 md:col-span-1 lg:col-span-1">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e6864]">Central Hub</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-bold">Powered by Ekoh</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The "City Hall." The governance core where collective wisdom is distilled 
                and community metrics are visualized.
              </p>
            </div>

            {/* Zone 5: Kreative */}
            <div className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-[#1e6864]/30 transition-all duration-300 md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
                <Box className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#1e6864]">Creative Quarter</h3>
              <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider font-bold">Powered by Kreative</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                An arts neighborhood with virtual galleries and theaters. Explore heritage museums, 
                co-create art, and experience culture as a pillar of society.
              </p>
            </div>
          </div>
          
           <div className="mt-12 text-center">
               {/* Link to the deeper Zones sub-page */}
              <Link href="/infrastructures/kin-city/zones" className="inline-flex items-center gap-2 text-[#1e6864] font-bold hover:text-[#154d4b] transition-colors border-b-2 border-[#1e6864]/20 hover:border-[#1e6864] pb-1">
                View Detailed Map & Zone Guide <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
        </div>
      </section>

      {/* TECH STACK & ROADMAP SUMMARY */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 font-serif text-slate-900">From Map to Metaverse</h2>
          <p className="text-lg text-slate-600 mb-12">
            Our development roadmap moves from accessibility to immersion.
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-left">
            
            {/* Step 1 */}
            <div className="flex-1 bg-white p-6 rounded-xl border-l-4 border-[#1e6864] shadow-sm">
              <span className="text-[#1e6864] font-bold text-xl block mb-2">01</span>
              <h4 className="font-bold text-lg text-slate-900">Roblox Prototype</h4>
              <p className="text-slate-500 text-sm mt-2">
                <strong>(Current Stage)</strong> Gamified alpha for community testing and engagement.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 bg-white p-6 rounded-xl border-l-4 border-slate-300 shadow-sm opacity-80">
               <span className="text-slate-400 font-bold text-xl block mb-2">02</span>
              <h4 className="font-bold text-lg text-slate-700">Web Interactive</h4>
              <p className="text-slate-500 text-sm mt-2">
                2D/2.5D browser-based map using Next.js & Mapbox for broader access.
              </p>
            </div>

            {/* Step 3 */}
             <div className="flex-1 bg-white p-6 rounded-xl border-l-4 border-slate-300 shadow-sm opacity-60">
               <span className="text-slate-400 font-bold text-xl block mb-2">03</span>
              <h4 className="font-bold text-lg text-slate-700">Full Immersion</h4>
              <p className="text-slate-500 text-sm mt-2">
                3D WebGL & AR integration for mixed reality experiences.
              </p>
            </div>
          </div>

          {/* ROADMAP CTA */}
          <div className="mt-16">
            <Link 
              href="/infrastructures/kin-city/roadmap" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e6864] text-white font-bold rounded-lg hover:bg-[#154d4b] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View Full Technical Roadmap <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}