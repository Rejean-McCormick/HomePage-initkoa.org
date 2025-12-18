// app/infrastructure/kristal-farms/page.tsx
import Link from 'next/link';
import { 
  Snowflake, 
  Flame, 
  Server, 
  Wifi, 
  ArrowRight, 
  Leaf,
  ShieldCheck,
  TrendingUp,
  Anchor
} from 'lucide-react';

export const metadata = {
  title: 'Kristal Farms – Green AI Infrastructure',
  description: 'Co-locating compute with cold hydro. Exporting intelligence, not power.',
};

export default function KristalFarmsHub() {
  return (
    <main className="min-h-screen bg-neutral-50">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Kristal Farms
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 font-light mb-8">
              Export compute, not power. <br/>
              Recycle heat, don't reject it.
            </p>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
              We co-locate modular data centers with renewable hydro in cold climates. 
              Instead of building long transmission lines, we put the compute in the village 
              and turn waste heat into community heating and food security.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/infrastructure/kristal-farms/nain"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                View Nain Pilot Plan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#ecosystem"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                Explore the System <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC ADVANTAGE STACK */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Cost Advantage Stack</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Conventional data centers fight physics and geography. We align with them. 
            By removing the biggest cost drivers, we create a structurally cheaper asset.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 1. Transmission */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ZapIcon className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">No Transmission Lines</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Long HV corridors and substations. <br/>
              <strong>Replacement:</strong> Short medium-voltage feed from dam to village.
            </p>
          </div>

          {/* 2. Cooling */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <Snowflake className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">Natural Cold</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Chillers and cooling towers. <br/>
              <strong>Replacement:</strong> Non-contact plate exchangers using cold bay water.
            </p>
          </div>

          {/* 3. Heat */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-orange-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">Heat as Product</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Heat rejection. <br/>
              <strong>Replacement:</strong> Sell heat to buildings and greenhouses, displacing diesel.
            </p>
          </div>

           {/* 4. Logistics */}
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Anchor className="w-5 h-5 text-indigo-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">Marine Logistics</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Long-haul trucking. <br/>
              <strong>Replacement:</strong> Standard 40ft containers delivered directly to port yard.
            </p>
          </div>

          {/* 5. Security */}
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">Lower Overhead</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Expensive urban land and security. <br/>
              <strong>Replacement:</strong> Remote, secure port yard with lower OPEX.
            </p>
          </div>

          {/* 6. Kristals */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-purple-700" />
            </div>
            <h3 className="text-lg font-bold mb-2">Compute Avoided</h3>
            <p className="text-slate-600 text-sm">
              <strong>Stop paying for:</strong> Re-computing the same answers. <br/>
              <strong>Replacement:</strong> "Kristals" knowledge commons reuses validated intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* NAVIGATION GRID (THE ECOSYSTEM) */}
      <section id="ecosystem" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Explore the Ecosystem</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Module 1: Infrastructure */}
            <Link href="/infrastructure/kristal-farms/infrastructure" className="group block bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <Server className="w-8 h-8 text-slate-700 group-hover:text-blue-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Infrastructure</h3>
              <p className="text-slate-600">
                The "Hard Tech." Deep dive into local grid integration, the modular Pad Yard, 
                and the 200+ Tbps Fiber Trunk that makes export possible.
              </p>
            </Link>

            {/* Module 2: Ecology */}
            <Link href="/infrastructure/kristal-farms/ecology" className="group block bg-white rounded-2xl p-8 border border-slate-200 hover:border-green-500 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-green-50 transition-colors">
                  <Leaf className="w-8 h-8 text-slate-700 group-hover:text-green-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Ecology & Heat</h3>
              <p className="text-slate-600">
                The "Heat-First" engine. How we implement the "Reuse → Store → Reject" hierarchy 
                to heat the village and achieve WUE ≈ 0.
              </p>
            </Link>

            {/* Module 3: Governance */}
            <Link href="/infrastructure/kristal-farms/governance" className="group block bg-white rounded-2xl p-8 border border-slate-200 hover:border-purple-500 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-purple-50 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-slate-700 group-hover:text-purple-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Governance</h3>
              <p className="text-slate-600">
                The Operating Model. Black-box tenancy for security, committee-based governance 
                for community benefit, and the Kristals Knowledge Commons.
              </p>
            </Link>

            {/* Module 4: Nain Pilot */}
            <Link href="/infrastructure/kristal-farms/nain" className="group block bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <Snowflake className="w-8 h-8 text-slate-700 group-hover:text-blue-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Project Nain</h3>
              <p className="text-slate-600">
                The Blueprint. A complete project plan for a 15MW pilot in Labrador: 
                CAPEX (~$200M), Phasing, and ROI analysis.
              </p>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

// Helper Icon for Zap (Lightning) since it wasn't imported in previous files
function ZapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}