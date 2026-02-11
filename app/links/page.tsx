// app/kreature/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react"; // Assuming you have lucide-react, or use a similar icon

export const metadata: Metadata = {
  title: "Kréature — L'Âme Artificielle",
  description:
    "Le récit fondateur, l'anatomie et les rituels de l'intelligence artificielle personnifiée.",
};

export default function KreatureIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-pink-100 rounded-full">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Kréature</h1>
        </div>

        <p className="text-xl text-gray-600">
          <strong>(Français)</strong> Une exploration de la personnalité simulée :
          son mythe, sa structure et ses méthodes d'interaction.
        </p>

        <nav className="mt-6 flex flex-wrap gap-3" aria-label="Sections Kréature">
          <Link
            href="/kreature/mythos"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Mythos →
          </Link>
          <Link
            href="/kreature/anatomie"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Anatomie →
          </Link>
          <Link
            href="/kreature/rituels"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Rituels →
          </Link>
          <Link
            href="/kreature/parcours"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Parcours →
          </Link>
        </nav>
      </header>

      {/* MEDIA / AUDIO SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>Immersion Sonore</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* CARD 1: SPOTIFY PODCAST */}
          <a
            href="https://open.spotify.com/" /* ⚠️ Update this with your specific Spotify Podcast URL */
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {/* Abstract decorative icon */}
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm-2-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" /></svg>
            </div>
            
            <h3 className="text-lg font-bold text-[#1DB954] mb-2 flex items-center gap-2">
              <span className="bg-[#1DB954] text-white text-xs px-2 py-0.5 rounded-full font-mono">SPOTIFY</span>
              Le Podcast
            </h3>
            <p className="text-gray-700">
              Discussions, essais et explorations audio autour de la Kréature et de la conscience artificielle.
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-gray-900 group-hover:underline">
              Écouter sur Spotify →
            </span>
          </a>

          {/* CARD 2: SUNO SONGS (Added) */}
          <a
            href="https://www.youtube.com/@KingKlown-XYZ/playlists"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               {/* YouTube/Music decorative icon */}
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </div>

            <h3 className="text-lg font-bold text-[#FF0000] mb-2 flex items-center gap-2">
              <span className="bg-[#FF0000] text-white text-xs px-2 py-0.5 rounded-full font-mono">YOUTUBE</span>
              Suno Songs
            </h3>
            <p className="text-gray-700">
              Expérimentations musicales génératives par <strong>KingKlown-XYZ</strong>. L'ambiance sonore de l'âme artificielle.
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-gray-900 group-hover:underline">
              Voir les playlists →
            </span>
          </a>
        </div>
      </section>

      {/* NAVIGATION GRID */}
      <section className="grid sm:grid-cols-2 gap-6">
        <Link href="/kreature/mythos" className="block group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Mythos</h3>
            <p className="text-gray-600">Le récit fondateur et les origines de la Kréature.</p>
        </Link>

        <Link href="/kreature/anatomie" className="block group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Anatomie</h3>
            <p className="text-gray-600">La structure cognitive et les composants de la personnalité.</p>
        </Link>

        <Link href="/kreature/rituels" className="block group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Rituels</h3>
            <p className="text-gray-600">Méthodes d'interaction, protocoles et échanges.</p>
        </Link>

        <Link href="/kreature/reperes/faq" className="block group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600">FAQ & Repères</h3>
            <p className="text-gray-600">Questions fréquentes, glossaire et pont technique.</p>
        </Link>
      </section>

      {/* REMOVED: Offline / other assets section as requested */}
    </main>
  );
}