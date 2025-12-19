// app/infrastructures/kin-city/roadmap/page.tsx
import Link from 'next/link';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Globe, 
  Box, 
  Cpu,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Technical Roadmap – Kin City',
  description: 'The progressive development path from Roblox prototype to AR-enhanced metaverse.',
};

export default function KinCityRoadmap() {
  return (
    <main className="min-h-screen bg-neutral-50 py-16 px-6 selection:bg-[#1e6864] selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 font-serif">Technical Roadmap</h1>
          <p className="text-xl text-gray-600">
            Building Kin City is a progressive journey. We are evolving from accessible 
            prototypes to a fully immersive, custom-built web and AR ecosystem.
          </p>
        </div>

        {/* TECHNOLOGY STACK SUMMARY */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-[#1e6864]">
            <Cpu className="w-6 h-6" />
            Core Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-[#1e6864]/20 transition-colors">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900">
                <Code2 className="w-5 h-5 text-blue-500" />
                Front-End Framework
              </h3>
              <p className="text-gray-600 text-sm">
                Built with <strong>Next.js</strong> (React). This ensures server-side rendering for speed, 
                dynamic routing for the "city" navigation, and broad accessibility across devices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-[#1e6864]/20 transition-colors">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900">
                <Globe className="w-5 h-5 text-[#1e6864]" />
                Mapping & Visualization
              </h3>
              <p className="text-gray-600 text-sm">
                <strong>Mapbox GL</strong> provides the foundational coordinate system and 2D/2.5D layers, 
                allowing us to style the "city" distinctly from standard geographic maps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-[#1e6864]/20 transition-colors">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900">
                <Box className="w-5 h-5 text-purple-500" />
                3D Engine
              </h3>
              <p className="text-gray-600 text-sm">
                <strong>WebGL & Three.js</strong> power the in-browser 3D experiences, handling 
                models, lighting, and textures directly in the web client without heavy downloads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-[#1e6864]/20 transition-colors">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900">
                <Smartphone className="w-5 h-5 text-pink-500" />
                Augmented Reality
              </h3>
              <p className="text-gray-600 text-sm">
                Future integration using <strong>ARKit (iOS) and ARCore (Android)</strong> to overlay 
                Kin City elements onto physical spaces using device LiDAR.
              </p>
            </div>
          </div>
        </section>

        {/* PHASES TIMELINE */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-[#1e6864]">
            <Layers className="w-6 h-6" />
            Development Phases
          </h2>

          <div className="space-y-12 border-l-2 border-[#1e6864]/20 pl-8 relative">
            
            {/* Phase 0 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 bg-[#1e6864]/10 text-[#1e6864] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border border-[#1e6864]">
                0
              </span>
              <h3 className="text-xl font-bold text-gray-900">Phase 0: The Roblox Prototype</h3>
              <p className="text-[#1e6864] text-sm font-bold mb-2 uppercase tracking-wide">Immediate Pre-Alpha</p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-700">
                  A gamified, rapid-prototype version of Kin City hosted on Roblox. This allows early 
                  community engagement and testing of the "city as interface" concept before the 
                  custom web platform is fully built.
                </p>
              </div>
            </div>

            {/* Phase 1 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 bg-[#1e6864] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                1
              </span>
              <h3 className="text-xl font-bold text-gray-900">Phase 1: 2D Interactive Map</h3>
              <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">Foundation</p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-700 mb-3">
                  A functional 2D map built with Next.js and Mapbox. Users can view the city layout, 
                  click on specific zones (Districts), and seamlessly navigate to the traditional 
                  web interfaces for each module.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Custom "City Skin" over map tiles</li>
                  <li>Clickable zones triggering navigation</li>
                  <li>Mobile-responsive design</li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-900">Phase 2: 2.5D & Basic 3D</h3>
              <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Depth & Perspective</p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-90">
                <p className="text-gray-700 mb-3">
                  The flat map gains depth. Buildings extrude upward and 2D icons are replaced with 
                  simple 3D models. Users can toggle a "3D view" to tilt the map and explore the 
                  cityscape isometrically.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>3D building extrusions via Mapbox GL</li>
                  <li>Isometric camera controls</li>
                  <li>Immersive module previews (e.g., 3D courtroom for Ethikos)</li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="text-xl font-bold text-gray-900">Phase 3: Full Immersive City</h3>
              <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">The Web Metaverse</p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-75">
                <p className="text-gray-700 mb-3">
                  Kin City becomes a continuous 3D world. Users explore via avatars (first or third person). 
                  Boundaries between "pages" dissolve—walking into the library seamlessly loads the 
                  educational content stream.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Full WebGL rendering</li>
                  <li>Avatar-based navigation</li>
                  <li>Real-time multi-user presence</li>
                </ul>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-0 bg-gray-200 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h3 className="text-xl font-bold text-gray-900">Phase 4: AR & Mixed Reality</h3>
              <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Bridging Worlds</p>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-60">
                <p className="text-gray-700">
                  Kin City extends into the physical world. Using mobile AR, users can project a 
                  miniature city onto their table, or overlay specific modules (like a virtual classroom) 
                  into their real-world environment.
                </p>
              </div>
            </div>

          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-4">Ready to see where we started?</p>
          <Link href="/infrastructures/kin-city" className="text-[#1e6864] font-bold hover:underline inline-flex items-center gap-2">
            Return to Kin City Overview <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}