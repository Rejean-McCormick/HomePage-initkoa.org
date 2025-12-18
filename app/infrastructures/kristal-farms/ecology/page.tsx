// app/infrastructures/kristal-farms/ecology/page.tsx
import Link from 'next/link';
import { 
  Leaf, 
  ThermometerSun, 
  Droplets, 
  RefreshCw, 
  ArrowLeft, 
  AlertCircle 
} from 'lucide-react';

export const metadata = {
  title: 'Ecology & Heat Cycles – Kristal Farms',
  description: 'The heat-first engine: Turning server waste heat into community food and warmth.',
};

export default function KFEcology() {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <Link 
            href="/infrastructures/kristal-farms" 
            className="text-slate-500 hover:text-green-600 font-medium flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Kristal Farms Hub
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">ECO-SYSTEM</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-slate-900">
            Ecology & Heat Cycles
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We don't just cool servers; we harvest energy. Our "Heat-First" architecture ensures that 
            every joule of electricity performs work twice: first as computation, then as heat for the community.
          </p>
        </div>

        {/* 1. THE CORE LOGIC */}
        <section className="mb-20 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-900">The Golden Rule: Reuse → Store → Reject</h2>
          </div>
          <p className="text-lg text-slate-700 mb-6">
            Our operating system is hard-coded with a strict hierarchy of thermal management:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Priority 1</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Reuse</h3>
              <p className="text-slate-600 text-sm">
                Direct heat transfer to buildings (winter) or greenhouses (summer). This is the "Heat Utilization Factor" (HUF).
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-yellow-500">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Priority 2</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Store</h3>
              <p className="text-slate-600 text-sm">
                Charge stratified thermal tanks to buffer diurnal peaks and smooth the mismatch between compute load and heat demand.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-500">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Priority 3</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Reject</h3>
              <p className="text-slate-600 text-sm">
                Only when all useful sinks are full do we reject heat to the bay, strictly monitoring environmental impact (ΔT).
              </p>
            </div>
          </div>
        </section>

        {/* 2. LOOP ARCHITECTURE */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ThermometerSun className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Non-Contact Loop Architecture</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-slate-600 mb-4">
                Safety and separation are paramount. We use two completely separate fluid circuits that 
                exchange heat via titanium plate heat exchangers. **Fluids never mix.**
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">A</div>
                  <div>
                    <h4 className="font-bold text-slate-900">The IT Loop (Source)</h4>
                    <p className="text-sm text-slate-600">
                      Closed loop collecting heat from servers. 
                      <br /><strong>Temp:</strong> Inlet 30–45°C → Outlet 45–60°C.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-xs text-green-800">B</div>
                  <div>
                    <h4 className="font-bold text-slate-900">The Building Loop (Sink)</h4>
                    <p className="text-sm text-slate-600">
                      Community district loop. Can be boosted by heat pumps to 65–75°C for legacy radiators if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full md:w-1/3">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" /> Safety Specs
              </h3>
              <ul className="text-sm space-y-3 text-slate-700">
                <li className="border-b border-slate-200 pb-2">
                  <strong>Isolation:</strong> Hydraulic separation via Plate HX.
                </li>
                <li className="border-b border-slate-200 pb-2">
                  <strong>Backup:</strong> Dry coolers activate if loops fail.
                </li>
                <li>
                  <strong>Legionella:</strong> DHW pre-heat includes final safeguards.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. SEASONAL STRATEGY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Leaf className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Seasonal Sinks</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">❄️ Winter Mode</h3>
              <p className="text-slate-600 text-sm mb-4">
                <strong>Primary Sink: Public Buildings.</strong>
                <br/>
                Priority is given to the Clinic, School, and Town Hall. Server heat replaces diesel boilers.
                If 45–60°C is insufficient for old radiators, the central heat pump booster kicks in.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">☀️ Summer Mode</h3>
              <p className="text-slate-600 text-sm mb-4">
                <strong>Primary Sink: Food Security.</strong>
                <br/>
                Heat is directed to large community greenhouses to extend the growing season in the subarctic.
                Thermal storage is used to smooth out nightly demands vs daily heat production.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WATER & ENVIRONMENT */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Droplets className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Water & Environmental Guard</h2>
          </div>
          <div className="prose text-slate-600 max-w-none mb-8">
            <p>
              Traditional data centers consume vast amounts of water for evaporative cooling. 
              Kristal Farms is different. We operate on a <strong>zero-consumption</strong> basis for cooling.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-50 p-6 rounded-xl">
              <strong className="block text-teal-900 mb-2 text-xl">WUE ≈ 0</strong>
              <p className="text-sm text-slate-700">
                Water Usage Effectiveness is near zero. Closed loops mean no evaporation. We borrow cold, we don't consume water.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <strong className="block text-teal-900 mb-2 text-xl">ΔT Compliance</strong>
              <p className="text-sm text-slate-700">
                Automated guards prevent thermal pollution. If discharge water temp variance (ΔT) exceeds limits, compute is throttled.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <strong className="block text-teal-900 mb-2 text-xl">Diesel Avoided</strong>
              <p className="text-sm text-slate-700">
                We track every liter of diesel not burned. This is our primary carbon offset metric, measuring both power and heat savings.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}