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

      {/* --- SECTION 1: THE ARCHITECTURE (Internal) --- */}
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

      <h2>Full Inventory & Web Presence</h2>

      {/* --- SECTION 2: WEB HUBS --- */}
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

      {/* --- SECTION 3: COMMERCIAL ASSETS (Store) --- */}
      <h3>Commercial Assets & Store</h3>
      <ul>
        <li>
          <strong>Software IP (For Sale)</strong>: {' '}
          <a href="https://github.com/Rejean-McCormick/Ariane" target="_blank" rel="noopener noreferrer">
            Ariane (GitHub)
          </a> — Source code available for acquisition.
        </li>
        <li>
          <strong>Merchandise</strong>: {' '}
          <span>kingklown.store</span> (Branded clothes & accessories)
        </li>
      </ul>

      {/* --- SECTION 4: INTELLECTUAL CAPITAL (Content) --- */}
      <h3>Intellectual Capital: Books, Music & Research</h3>
      <ul>
        <li>
          <strong>Books</strong>:
          <ul>
            <li>
              <em>The Book of kOA</em>: {' '}
              <a href="https://www.amazon.ca/Book-kOA-Comprehensive-Collaboration-Merit-Based/dp/B0FHWS687D" target="_blank" rel="noopener noreferrer">
                Amazon Canada
              </a>
            </li>
            <li>
              <em>Konvergence: Échoïsme</em>: {' '}
              <a href="https://www.amazon.com/Konvergence-%C3%89cho%C3%AFsme-R%C3%A9jean-McCormick/dp/B0F1DGLDJ9" target="_blank" rel="noopener noreferrer">
                Amazon US
              </a>{' / '}
              <a href="https://www.amazon.ca/Konvergence-version-franco-R%C3%A9jean-McCormick-ebook/dp/B0F1DNQSTD" target="_blank" rel="noopener noreferrer">
                Amazon Canada
              </a>
            </li>
            <li>
              <em>King Klown Kronicles</em>: {' '}
              <a href="https://www.amazon.com/King-Klown-Kronicles-hidden-Manifesto/dp/B0DZCXT7VP" target="_blank" rel="noopener noreferrer">
                Amazon US
              </a>
            </li>
            <li>
              <em>Empowering AI for Programmers</em>: {' '}
              <a href="https://www.amazon.com/-/es/Empowering-Programmers-Framework-Human-Centered-Integration/dp/B0DZCQBZZG" target="_blank" rel="noopener noreferrer">
                Amazon US
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Music & Audio</strong>:
          <ul>
            <li>
              Soundtrack for the stage production <em>Ninja Arc-en-Ciel</em> ({' '}
              <a href="https://soundcloud.com/rejean-mccormick/sets/ninja_arc-en-ciel" target="_blank" rel="noopener noreferrer">
                SoundCloud
              </a>
              )
            </li>
            <li>
              Lumière Blanche ({' '}
              <a href="https://soundcloud.com/rejean-mccormick/sets/lumiere_blanche" target="_blank" rel="noopener noreferrer">
                SoundCloud
              </a>
              )
            </li>
            <li>
              “King Klown” Podcast ({' '}
              <a href="https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4?si=b51cc5d57ab242e8" target="_blank" rel="noopener noreferrer">
                Spotify
              </a>
              )
            </li>
            <li>&gt;100 AI‑assisted songs (Suno)</li>
          </ul>
        </li>
        <li>
          <strong>Research</strong>:
          <ul>
            <li>
              Article: {' '}
              <a href="https://medium.com/@boatbuilder610/pi-theory-from-a-circles-cut-to-a-cosmic-sequence-327e675296d0" target="_blank" rel="noopener noreferrer">
                Pi Theory: From a Circle’s Cut to a Cosmic Sequence
              </a> (Medium)
            </li>
            <li>
              Presentation: “Global Strategic Overview — Why KOA?” ({' '}
              <a href="https://koa-movement-x84fw57.gamma.site/" target="_blank" rel="noopener noreferrer">
                Gamma Deck
              </a>
              )
            </li>
          </ul>
        </li>
      </ul>

      {/* --- SECTION 5: CONNECT (Socials & Contact) --- */}
      <h3>Connect, Chat & Socials</h3>
      <ul>
        <li>
          <strong>Direct Contact</strong>: {' '}
          <a href="mailto:k@kingklown.com">k@kingklown.com</a>
        </li>
        <li>
          <strong>Social & Chat</strong>:
          <ul>
            <li>
              <strong>Facebook</strong>: {' '}
              <a href="https://www.facebook.com/profile.php?id=61566663549235" target="_blank" rel="noopener noreferrer">
                Réjean McCormick (King Klown)
              </a>{' / '}
              <a href="https://www.facebook.com/profile.php?id=61567073454490" target="_blank" rel="noopener noreferrer">
                King Klown XYZ
              </a>
            </li>
            <li>
              <strong>Instagram</strong>: {' '}
              <a href="https://www.instagram.com/kingklown.xyz/" target="_blank" rel="noopener noreferrer">
                @kingklown.xyz
              </a>
            </li>
            <li>
              <strong>X/Twitter</strong>: {' '}
              <a href="https://x.com/KingKlownXYZ" target="_blank" rel="noopener noreferrer">
                @KingKlownXYZ
              </a>
            </li>
            <li>
              <strong>Mastodon</strong>: {' '}
              <a href="https://mastodon.social/@Rejean_McCormick/" target="_blank" rel="noopener noreferrer">
                @Rejean_McCormick
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Professional & Code</strong>:
          <ul>
            <li>
              <strong>LinkedIn</strong>: {' '}
              <a href="https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/" target="_blank" rel="noopener noreferrer">
                Réjean McCormick
              </a>
            </li>
            <li>
              <strong>GitHub</strong>: {' '}
              <a href="https://github.com/Rejean-McCormick/" target="_blank" rel="noopener noreferrer">
                Rejean‑McCormick
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
          </ul>
        </li>
        <li>
          <strong>Content Channels</strong>:
          <ul>
            <li>
              <strong>YouTube</strong>: {' '}
              <a href="https://www.youtube.com/@KingKlown-XYZ" target="_blank" rel="noopener noreferrer">
                kingklown.life
              </a> (@KingKlown-XYZ)
            </li>
            <li>
              <strong>TikTok</strong>: {' '}
              <a href="https://www.tiktok.com/@kingklown.xyz" target="_blank" rel="noopener noreferrer">
                @kingklown.xyz
              </a>
            </li>
            <li>
              <strong>Tumblr</strong>: {' '}
              <a href="https://www.tumblr.com/kingklownxyz" target="_blank" rel="noopener noreferrer">
                @kingklownxyz
              </a>
            </li>
            <li>
              <strong>Twitch</strong>: {' '}
              <a href="https://www.twitch.tv/kingklownxyz" target="_blank" rel="noopener noreferrer">
                @kingklownxyz
              </a>
            </li>
          </ul>
        </li>
      </ul>

      {/* --- SECTION 6: OFFLINE / MISC --- */}
      <h3>Offline & Development Assets</h3>
      <ul>
        <li><strong>Printed briefs</strong> (Sent to key contacts)</li>
        <li>
          <strong>Stage show</strong>: <em>Le Ninja Arc‑en‑ciel</em> (In development) —{' '}
          <a href="https://www.youtube.com/watch?v=Cz7qhJNDzuo" target="_blank" rel="noopener noreferrer">
            View proof of concept
          </a>
        </li>
      </ul>

    </main>
  );
}