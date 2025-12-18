// app/infrastructure/kin-city/philosophy/page.tsx
import { 
  Circle, 
  Mountain, 
  Brain, 
  Heart, 
  ArrowLeft, 
  Quote 
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Philosophy & Design – Kin City',
  description: 'The symbolic underpinnings of Kin City: Mandalas, Sacred Geometry, and Spatial Pedagogy.',
};

export default function KinCityPhilosophy() {
  return (
    <main className="min-h-screen bg-neutral-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK LINK & HERO */}
        <div className="mb-12">
          <Link 
            href="/infrastructure/kin-city" 
            className="text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Kin City Overview
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            The Philosophy of Place
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Kin City is not just a user interface; it is a "memory palace" designed to make 
            complex systems intuitive. Our architecture is guided by nature, sacred geometry, 
            and the principles of human connection.
          </p>
        </div>

        {/* SECTION 1: THE ISLAND & MANDALA */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
              <Circle className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">The Mandala & The Eye of Quebec</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  The city's concentric layout is directly inspired by <strong>Île René-Levasseur</strong>, 
                  the "Eye of Quebec." Located in the Manicouagan Reservoir, this circular island is 
                  surrounded by a ring of water, naturally forming a mandala—a symbol of wholeness and unity.
                </p>
                <p>
                  In Kin City, this translates to a design where knowledge is not hierarchical (top-down), 
                  but <strong>radial</strong>. The Central Hub anchors the ecosystem, while distinct zones 
                  (Education, Ethics, Innovation) radiate outward. Just as a mandala guides a meditator 
                  toward the center, our city guides users toward the core values of the movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MOUNT BABEL REIMAGINED */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-stone-100 p-3 rounded-full flex-shrink-0">
              <Mountain className="w-8 h-8 text-stone-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Mount Babel: From Confusion to Communion</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  The highest point on René-Levasseur Island is Mount Babel. In ancient myth, Babel 
                  represented the fragmentation of languages and the loss of shared understanding. 
                  Kin City inverts this myth.
                </p>
                <p>
                  Our central "Tower of Knowledge" stands for <strong>communion</strong>. Through AI-driven 
                  translation and the universal language of ethics (Ethikos), diverse voices are unified 
                  rather than scattered. It is a place where humanity comes together to speak a common language 
                  of progress and preservation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SPATIAL PEDAGOGY */}
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
              <Brain className="w-8 h-8 text-teal-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Why a City? (Spatial Pedagogy)</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  We use a city metaphor because the human brain is evolved for <strong>spatial navigation</strong>. 
                  Flat menus and lists are abstract; places are memorable.
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>
                    <strong>Memory Palaces:</strong> You remember that "Debates" happen in the Plaza 
                    similarly to how you remember where the library is in your hometown.
                  </li>
                  <li>
                    <strong>Contextual Learning:</strong> Knowledge isn't isolated. Seeing the "Innovation Lab" 
                    next to the "Art Gallery" subconsciously teaches that technology and creativity are neighbors.
                  </li>
                  <li>
                    <strong>Serendipity:</strong> In a menu, you only find what you search for. In a city, 
                    you stumble upon new ideas simply by "walking" down the street.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: KINSHIP */}
        <section className="bg-indigo-900 text-white p-8 md:p-12 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 p-4 rounded-full">
              <Heart className="w-12 h-12 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Meaning of "Kin"</h2>
              <p className="text-indigo-100 text-lg leading-relaxed mb-6">
                The name "Kin City" is a reminder that this is not just a platform for users, 
                but a home for a community. It emphasizes <strong>kinship</strong>—the idea that 
                global citizens, experts, and learners are related in their shared pursuit of a better world.
              </p>
              <div className="flex items-center gap-2 text-indigo-300 italic">
                <Quote className="w-5 h-5" />
                <span>Ideally, strangers become neighbors, and neighbors become kin.</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}