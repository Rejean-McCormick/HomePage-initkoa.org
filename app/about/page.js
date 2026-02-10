import Link from 'next/link';

export const metadata = {
  title: 'About the Architect',
  description:
    'Réjean McCormick — socio-technical architect building civic utilities for learning, coordination, and governable decision-making.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 prose prose-slate">
      <h1>Réjean McCormick</h1>
      <h3>Socio-technical Architect</h3>

      <p>
        I design and ship <strong>civic utilities</strong>: shared infrastructure that helps people learn, coordinate, and
        govern together—without depending on fragile platforms or opaque systems.
      </p>

      <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/why"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>The Diagnosis</strong>
          <div className="text-sm text-slate-600">Why these utilities are needed.</div>
        </Link>
        <Link
          href="/initiatives"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Explore the Ecosystem</strong>
          <div className="text-sm text-slate-600">Initiatives, modules, and governance ideas.</div>
        </Link>
        <Link
          href="/platforms"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Products</strong>
          <div className="text-sm text-slate-600">The platforms built for real-world use.</div>
        </Link>
        <Link
          href="/technology"
          className="border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors"
        >
          <strong>Technology</strong>
          <div className="text-sm text-slate-600">Architecture & documentation (builder-focused).</div>
        </Link>
      </div>

      <hr className="my-8 border-slate-200" />

      <h2>What I’m building</h2>
      <p>
        The work spans public governance tools, private coordination tools, and offline-capable infrastructure. If you’re
        new here, start with the platforms—then go deeper into the technology only if you want implementation details.
      </p>

      <h3>Platforms</h3>
      <ul>
        <li>
          <Link href="/platforms/konnaxion">Konnaxion</Link> — a public-facing civic stack for collective intelligence,
          learning, and governable coordination.
        </li>
        <li>
          <Link href="/platforms/orgo">Orgo</Link> — an offline-first organizational system for secure, role-based routing
          of tasks and cases.
        </li>
      </ul>

      <h3>R&amp;D and advanced modules</h3>
      <ul>
        <li>
          <Link href="/technology/ariane">Ariane</Link> — semantic interface mapping and guidance (availability: licensing
          / acquisition discussions).
        </li>
        <li>
          <Link href="/technology/swarmcraft">SwarmCraft</Link> — orchestration and multi-agent runtime research (private
          R&amp;D).
        </li>
        <li>
          <Link href="/technology/ame-artificielle">Âme Artificielle</Link> — alignment and governance primitives for
          human-facing AI behavior (private R&amp;D).
        </li>
      </ul>

      <h3>Builder documentation (optional)</h3>
      <p>
        If you’re here to understand how the systems are implemented, the technical wikis live under Technology:
      </p>
      <ul>
        <li>
          <Link href="/technology/sentient">SenTient</Link> — local signal deconstruction into structured meaning.
        </li>
        <li>
          <Link href="/technology/architect">Abstract Wiki Architect</Link> — patterns for building auditable,
          documentation-driven systems.
        </li>
      </ul>

      <hr className="my-8 border-slate-200" />

      <h2>Full inventory & web presence</h2>

      <h3>Core sites</h3>
      <ul>
        <li>
          <strong>Roadmap</strong>:{' '}
          <a href="https://kingklown.xyz/koa" target="_blank" rel="noopener noreferrer">
            kingklown.xyz/koa
          </a>
        </li>
        <li>
          <strong>General presentation</strong>:{' '}
          <a href="https://kingklown.com/" target="_blank" rel="noopener noreferrer">
            kingklown.com
          </a>
        </li>
        <li>
          <strong>Political blueprint</strong>:{' '}
          <a href="https://kingklown.ca/" target="_blank" rel="noopener noreferrer">
            kingklown.ca
          </a>
        </li>
        <li>
          <strong>Knowledge platform hub</strong>:{' '}
          <a href="https://www.kingklown.wiki/" target="_blank" rel="noopener noreferrer">
            kingklown.wiki
          </a>
        </li>
      </ul>

      <h3>Commercial assets & store</h3>
      <ul>
        <li>
          <strong>Software (licensing / acquisition)</strong>:{' '}
          <a href="https://github.com/Rejean-McCormick/Ariane" target="_blank" rel="noopener noreferrer">
            Ariane (GitHub)
          </a>
        </li>
        <li>
          <strong>Merchandise</strong>: <span>kingklown.store</span> (branded clothes &amp; accessories)
        </li>
      </ul>

      <h3>Intellectual capital: books, music &amp; research</h3>
      <ul>
        <li>
          <strong>Books</strong>:
          <ul>
            <li>
              <em>The Book of kOA</em>:{' '}
              <a
                href="https://www.amazon.ca/Book-kOA-Comprehensive-Collaboration-Merit-Based/dp/B0FHWS687D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon Canada
              </a>
            </li>
            <li>
              <em>Konvergence: Échoïsme</em>:{' '}
              <a
                href="https://www.amazon.com/Konvergence-%C3%89cho%C3%AFsme-R%C3%A9jean-McCormick/dp/B0F1DGLDJ9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon US
              </a>
              {' / '}
              <a
                href="https://www.amazon.ca/Konvergence-version-franco-R%C3%A9jean-McCormick-ebook/dp/B0F1DNQSTD"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon Canada
              </a>
            </li>
            <li>
              <em>King Klown Kronicles</em>:{' '}
              <a
                href="https://www.amazon.com/King-Klown-Kronicles-hidden-Manifesto/dp/B0DZCXT7VP"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon US
              </a>
            </li>
            <li>
              <em>Empowering AI for Programmers</em>:{' '}
              <a
                href="https://www.amazon.com/-/es/Empowering-Programmers-Framework-Human-Centered-Integration/dp/B0DZCQBZZG"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amazon US
              </a>
            </li>
          </ul>
        </li>

        <li>
          <strong>Music &amp; audio</strong>:
          <ul>
            <li>
              Soundtrack for the stage production <em>Ninja Arc-en-Ciel</em> (
              <a
                href="https://soundcloud.com/rejean-mccormick/sets/ninja_arc-en-ciel"
                target="_blank"
                rel="noopener noreferrer"
              >
                SoundCloud
              </a>
              )
            </li>
            <li>
              Lumière Blanche (
              <a
                href="https://soundcloud.com/rejean-mccormick/sets/lumiere_blanche"
                target="_blank"
                rel="noopener noreferrer"
              >
                SoundCloud
              </a>
              )
            </li>
            <li>
              “King Klown” Podcast (
              <a
                href="https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4?si=b51cc5d57ab242e8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              )
            </li>
          </ul>
        </li>

        <li>
          <strong>Research</strong>:
          <ul>
            <li>
              Article:{' '}
              <a
                href="https://medium.com/@boatbuilder610/pi-theory-from-a-circles-cut-to-a-cosmic-sequence-327e675296d0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pi Theory: From a Circle’s Cut to a Cosmic Sequence
              </a>{' '}
              (Medium)
            </li>
            <li>
              Presentation: “Global Strategic Overview — Why kOA?” (
              <a href="https://koa-movement-x84fw57.gamma.site/" target="_blank" rel="noopener noreferrer">
                Gamma Deck
              </a>
              )
            </li>
          </ul>
        </li>
      </ul>

      <h3>Connect, chat &amp; socials</h3>
      <ul>
        <li>
          <strong>Direct contact</strong>:{' '}
          <a href="mailto:k@kingklown.com">k@kingklown.com</a>
        </li>

        <li>
          <strong>Social &amp; chat</strong>:
          <ul>
            <li>
              <strong>Facebook</strong>:{' '}
              <a
                href="https://www.facebook.com/profile.php?id=61566663549235"
                target="_blank"
                rel="noopener noreferrer"
              >
                Réjean McCormick (King Klown)
              </a>
              {' / '}
              <a
                href="https://www.facebook.com/profile.php?id=61567073454490"
                target="_blank"
                rel="noopener noreferrer"
              >
                King Klown XYZ
              </a>
            </li>
            <li>
              <strong>Instagram</strong>:{' '}
              <a href="https://www.instagram.com/kingklown.xyz/" target="_blank" rel="noopener noreferrer">
                @kingklown.xyz
              </a>
            </li>
            <li>
              <strong>X/Twitter</strong>:{' '}
              <a href="https://x.com/KingKlownXYZ" target="_blank" rel="noopener noreferrer">
                @KingKlownXYZ
              </a>
            </li>
            <li>
              <strong>Mastodon</strong>:{' '}
              <a href="https://mastodon.social/@Rejean_McCormick/" target="_blank" rel="noopener noreferrer">
                @Rejean_McCormick
              </a>
            </li>
          </ul>
        </li>

        <li>
          <strong>Professional &amp; code</strong>:
          <ul>
            <li>
              <strong>LinkedIn</strong>:{' '}
              <a
                href="https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Réjean McCormick
              </a>
            </li>
            <li>
              <strong>GitHub</strong>:{' '}
              <a href="https://github.com/Rejean-McCormick/" target="_blank" rel="noopener noreferrer">
                Rejean-McCormick
              </a>
            </li>
            <li>
              <strong>PhilPeople</strong>:{' '}
              <a href="https://philpeople.org/profiles/rejean-mccormick" target="_blank" rel="noopener noreferrer">
                rejean-mccormick
              </a>
            </li>
            <li>
              <strong>Wikimedia Meta-Wiki</strong>:{' '}
              <a
                href="https://meta.wikimedia.org/wiki/User:Réjean_McCormick"
                target="_blank"
                rel="noopener noreferrer"
              >
                User:Réjean_McCormick
              </a>
            </li>
          </ul>
        </li>

        <li>
          <strong>Content channels</strong>:
          <ul>
            <li>
              <strong>YouTube</strong>:{' '}
              <a href="https://www.youtube.com/@KingKlown-XYZ" target="_blank" rel="noopener noreferrer">
                kingklown.life
              </a>{' '}
              (@KingKlown-XYZ)
            </li>
            <li>
              <strong>TikTok</strong>:{' '}
              <a href="https://www.tiktok.com/@kingklown.xyz" target="_blank" rel="noopener noreferrer">
                @kingklown.xyz
              </a>
            </li>
            <li>
              <strong>Tumblr</strong>:{' '}
              <a href="https://www.tumblr.com/kingklownxyz" target="_blank" rel="noopener noreferrer">
                @kingklownxyz
              </a>
            </li>
            <li>
              <strong>Twitch</strong>:{' '}
              <a href="https://www.twitch.tv/kingklownxyz" target="_blank" rel="noopener noreferrer">
                @kingklownxyz
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <h3>Offline &amp; development assets</h3>
      <ul>
        <li>
          <strong>Printed briefs</strong> (sent to key contacts)
        </li>
        <li>
          <strong>Stage show</strong>: <em>Le Ninja Arc-en-ciel</em> (in development) —{' '}
          <a href="https://www.youtube.com/watch?v=Cz7qhJNDzuo" target="_blank" rel="noopener noreferrer">
            View proof of concept
          </a>
        </li>
      </ul>
    </main>
  );
}
