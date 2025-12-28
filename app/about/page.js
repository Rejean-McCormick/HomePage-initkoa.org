import Link from 'next/link';

export const metadata = {
  title: "About the Architect"
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Réjean McCormick</h1>
      <h3>Socio-technical Architect</h3>

      <p>
        I design and ship civic utilities: shared infrastructure that helps people learn, coordinate, and govern together.
      </p>

      <hr className="my-8 border-slate-200" />

      {/* --- System Architecture (Internal Next.js Links) --- */}
      <h2>System Architecture (Technical Wikis)</h2>
      
      <h3>The Engines (Core Logic)</h3>
      <ul>
        <li><Link href="/technology/sentient">SenTient: The Deconstructor</Link></li>
        <li><Link href="/technology/architect">Abstract Wiki Architect</Link></li>
      </ul>

      <h3>The Ecosystem: KOA</h3>
      <ul>
        <li><Link href="/platforms/konnaxion">1. Konnaxion (The Open Web)</Link></li>
        <li><Link href="/platforms/orgo">2. Orgo (The Hermetic Bubble)</Link></li>
      </ul>

      <h3>Commercial & Research Modules</h3>
      <ul>
        <li><Link href="/technology/ariane">Ariane (Commercial)</Link></li>
        <li><Link href="/technology/swarmcraft">SwarmCraft</Link></li>
        <li><Link href="/technology/ame-artificielle">Ame-Artificielle (Âme artificielle)</Link></li>
      </ul>

      <hr className="my-8 border-slate-200" />

      {/* --- External Inventory --- */}
      <h2>Full Inventory & Web Presence</h2>

      <h3>Core Sites</h3>
      <ul>
        <li>
          <strong>Roadmap</strong>: {' '}
          <a href="https://kingklown.xyz/koa" target="_blank" rel="noopener noreferrer">
            kingklown.xyz/koa
          </a>
        </li>
        <li>
          <strong>General presentation</strong>: {' '}
          <a href="https://kingklown.com/" target="_blank" rel="noopener noreferrer">
            kingklown.com
          </a>
        </li>
        <li>
          <strong>Political Blueprint</strong>: {' '}
          <a href="https://kingklown.ca/" target="_blank" rel="noopener noreferrer">
            kingklown.ca
          </a>
        </li>
        <li>
          <strong>Knowledge Platform hub</strong>: {' '}
          <a href="https://www.kingklown.wiki/" target="_blank" rel="noopener noreferrer">
            kingklown.wiki
          </a>
        </li>
      </ul>

      <h3>Audio, Music & Podcasts</h3>
      <ul>
        <li>
          <strong>Soundtrack for the stage production Ninja Arc-en-Ciel</strong>:
          <ul>
            <li>
              <a href="https://soundcloud.com/rejean-mccormick/sets/ninja_arc-en-ciel" target="_blank" rel="noopener noreferrer">
                Ninja Arc-en-ciel
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/rejean-mccormick/sets/lumiere_blanche" target="_blank" rel="noopener noreferrer">
                Lumière Blanche
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Spotify show</strong>: {' '}
          <a href="https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4?si=b51cc5d57ab242e8" target="_blank" rel="noopener noreferrer">
            “King Klown” Podcast
          </a>
        <li>
          <strong>YouTube</strong>: {' '}
          <a href="https://www.youtube.com/@KingKlown-XYZ" target="_blank" rel="noopener noreferrer">
            Lyrics video to explore the ecosystem
          </a> (@KingKlown-XYZ)
        </li>
      </ul>

      <h3>Books & Research Writings</h3>
      <ul>
        <li>
          <strong>Research Article</strong>: {' '}
          <a href="https://medium.com/@boatbuilder610/pi-theory-from-a-circles-cut-to-a-cosmic-sequence-327e675296d0" target="_blank" rel="noopener noreferrer">
            Pi Theory: From a Circle’s Cut to a Cosmic Sequence
          </a> (Medium)
        </li>
        <li>
          <strong>The Book of kOA</strong>: {' '}
          <a href="https://www.amazon.ca/Book-kOA-Comprehensive-Collaboration-Merit-Based/dp/B0FHWS687D" target="_blank" rel="noopener noreferrer">
            Amazon Canada
          </a>
        </li>
        <li>
          <strong>Konvergence: Échoïsme + version franco</strong>: {' '}
          <a href="https://www.amazon.com/Konvergence-%C3%89cho%C3%AFsme-R%C3%A9jean-McCormick/dp/B0F1DGLDJ9" target="_blank" rel="noopener noreferrer">
            Amazon US
          </a>{' / '}
          <a href="https://www.amazon.ca/Konvergence-version-franco-R%C3%A9jean-McCormick-ebook/dp/B0F1DNQSTD" target="_blank" rel="noopener noreferrer">
            Amazon Canada
          </a>
        </li>
        <li>
          <strong>King Klown Kronicles: The hidden Manifesto</strong>: {' '}
          <a href="https://www.amazon.com/King-Klown-Kronicles-hidden-Manifesto/dp/B0DZCXT7VP" target="_blank" rel="noopener noreferrer">
            Amazon US
          </a>{' / '}
          <a href="https://www.amazon.ca/-/fr/R%C3%A9jean-McCormick-ebook/dp/B0DZ76L1N3" target="_blank" rel="noopener noreferrer">
            Amazon Canada
          </a>
        </li>
        <li>
          <strong>Empowering AI for Programmers: The Kristal Framework</strong>: {' '}
          <a href="https://www.amazon.com/-/es/Empowering-Programmers-Framework-Human-Centered-Integration/dp/B0DZCQBZZG" target="_blank" rel="noopener noreferrer">
            Amazon US
          </a>
        </li>
      </ul>

      <h3>Social, Professional & Academic Profiles</h3>
      <ul>
        <li>
          <strong>LinkedIn</strong>: {' '}
          <a href="https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/" target="_blank" rel="noopener noreferrer">
            Réjean McCormick
          </a>
        </li>
        <li>
          <strong>PhilPeople</strong>: {' '}
          <a href="https://philpeople.org/profiles/rejean-mccormick" target="_blank" rel="noopener noreferrer">
            rejean-mccormick
          </a>
        </li>
        <li>
          <strong>Wikimedia Meta-Wiki</strong>: {' '}
          <a href="https://meta.wikimedia.org/wiki/User:Réjean_McCormick" target="_blank" rel="noopener noreferrer">
            User:Réjean_McCormick
          </a>
        </li>
        <li>
          <strong>Wikidata</strong>: {' '}
          <a href="https://www.wikidata.org/wiki/Q136893064" target="_blank" rel="noopener noreferrer">
            Item Q136893064
          </a>
        </li>
        <li>
          <strong>Mastodon</strong>: {' '}
          <a href="https://mastodon.social/@Rejean_McCormick/" target="_blank" rel="noopener noreferrer">
            @Rejean_McCormick
          </a>
        </li>

        <li>
          <strong>X/Twitter</strong>: {' '}
          <a href="https://x.com/KingKlownXYZ" target="_blank" rel="noopener noreferrer">
            @KingKlownXYZ
          </a>
        </li>
        <li>
          <strong>Tumblr</strong>: {' '}
          <a href="https://www.tumblr.com/kingklownxyz" target="_blank" rel="noopener noreferrer">
            @kingklownxyz
          </a>
        </li>
        <li>
          <strong>TikTok</strong>: {' '}
          <a href="https://www.tiktok.com/@kingklown.xyz" target="_blank" rel="noopener noreferrer">
            @kingklown.xyz
          </a>
        </li>
        <li>
          <strong>Twitch</strong>: {' '}
          <a href="https://www.twitch.tv/kingklownxyz" target="_blank" rel="noopener noreferrer">
            @kingklownxyz
          </a>
        </li>
        <li>
          <strong>Facebook & Instagram</strong>: Linked via {' '}
          <a href="https://github.com/Rejean-McCormick/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a> profile
        </li>
      </ul>

      <h3>Development</h3>
      <ul>
        <li>
          <strong>GitHub</strong>: {' '}
          <a href="https://github.com/Rejean-McCormick/" target="_blank" rel="noopener noreferrer">
            Rejean‑McCormick
          </a>
        </li>
      </ul>

      <h3>KOA Internal Platforms</h3>
      <ul>
        <li>
          <strong>Konnaxion, Kristal Farms, Orgo</strong> (Accessible via Ecosystem)
        </li>
      </ul>

      <h3>Presentations</h3>
      <ul>
        <li>
          <strong>Gamma deck</strong>: “Global Strategic Overview — Why KOA?” ({' '}
          <a href="https://kingklown.xyz/koa" target="_blank" rel="noopener noreferrer">
            Via Roadmap
          </a>{' / '}
          <a href="https://koa-movement-x84fw57.gamma.site/" target="_blank" rel="noopener noreferrer">
            Direct Link
          </a>
          )
        </li>
      </ul>

      <h3>Store & Contact</h3>
      <ul>
        <li>
          <strong>Branded clothes</strong>: kingklown.store
        </li>
        <li>
          <strong>Email</strong>: {' '}
          <a href="mailto:k@kingklown.com">k@kingklown.com</a>
        </li>
      </ul>


    </main>
  );
}