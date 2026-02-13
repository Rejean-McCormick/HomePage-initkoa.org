// app/links/page.js
import Link from "next/link";

export const metadata = {
  title: "Social Links — Réjean McCormick",
  description:
    "Official link inventory for Réjean McCormick (architect) and King Klown (mobilisation persona): hubs, docs, code, channels, publications, and contact.",
};

function LinkCard({ title, href, note }) {
  const isInternal = href.startsWith("/");

  const CardInner = (
    <>
      <strong className="block">{title}</strong>
      {note ? <div className="text-sm text-slate-600 mt-1">{note}</div> : null}
      <div className="text-xs text-slate-500 mt-2 break-all">{href}</div>
    </>
  );

  const className =
    "border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {CardInner}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {CardInner}
    </a>
  );
}

export default function SocialLinksPage() {
  const sections = [
    {
      title: "Start here",
      subtitle: "The authoritative map + documentation corridors.",
      items: [
        {
          title: "kOA INITIATIVE (map + docs)",
          href: "https://initkoa.org/",
          note: "Master inventory + entry corridors (platforms, initiatives, principles, contact).",
        },
        {
          title: "Platforms (Konnaxion / Orgo / Kristal Farms)",
          href: "https://www.initkoa.org/platforms",
          note: "Operational spine: inspectable systems and building blocks.",
        },
        {
          title: "Contact (kOA INITIATIVE)",
          href: "https://www.initkoa.org/contact",
          note: "Primary contact surface published on the ecosystem.",
        },
      ],
    },
    {
      title: "Core hubs (the maze entrances)",
      subtitle: "External domains (each corridor stands alone, but links back to the map).",
      items: [
        {
          title: "Roadmap / movement narrative",
          href: "https://kingklown.xyz/koa",
          note: "Roadmap corridor.",
        },
        {
          title: "General presentation",
          href: "https://kingklown.com/",
          note: "Presentation corridor.",
        },
        {
          title: "Political movement",
          href: "https://kingklown.ca/",
          note: "Political blueprint corridor.",
        },
        {
          title: "Knowledge platform hub",
          href: "https://www.kingklown.wiki/",
          note: "Knowledge hub corridor.",
        },
      ],
    },
    {
      title: "Code & build",
      subtitle: "Repositories and engineering footprint.",
      items: [
        {
          title: "GitHub — Rejean-McCormick",
          href: "https://github.com/Rejean-McCormick/",
          note: "Also links out to other socials from the profile header.",
        },
      ],
    },
    {
      title: "Social & media channels (King Klown)",
      subtitle: "Broadcast corridors.",
      items: [
        {
          title: "YouTube — @KingKlownXYZ",
          href: "https://www.youtube.com/%40KingKlownXYZ",
          note: "Video channel.",
        },
        {
          title: "TikTok — @kingklown.xyz",
          href: "https://www.tiktok.com/%40kingklown.xyz",
          note: "Short-form channel.",
        },
        {
          title: "Tumblr — @kingklownxyz",
          href: "https://www.tumblr.com/kingklownxyz",
          note: "Posts / diffusion layer.",
        },
        {
          title: "X — @KingKlownXYZ",
          href: "https://x.com/KingKlownXYZ",
          note: "Updates / posting corridor.",
        },
        {
          title: "Twitch — @kingklownxyz",
          href: "https://www.twitch.tv/kingklownxyz",
          note: "Live channel.",
        },
      ],
    },
    {
      title: "Audio",
      subtitle: "Podcast / audiobooks corridor.",
      items: [
        {
          title: "Spotify show — King Klown",
          href: "https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4?si=b51cc5d57ab242e8",
          note: "Listed on initkoa.org as the podcast corridor.",
        },
      ],
    },
    {
      title: "Books (Amazon)",
      subtitle: "Publishing footprint examples (as listed).",
      items: [
        {
          title: "The Book of kOA (Amazon Canada)",
          href: "https://www.amazon.ca/Book-kOA-Comprehensive-Collaboration-Merit-Based/dp/B0FHWS687D",
          note: "Core publishing anchor.",
        },
        {
          title: "Konvergence: Échoïsme (Amazon)",
          href: "https://www.amazon.com/Konvergence-%C3%89cho%C3%AFsme-R%C3%A9jean-McCormick/dp/B0F1DGLDJ9",
          note: "English listing.",
        },
        {
          title: "Konvergence (version franco) (Amazon Canada)",
          href: "https://www.amazon.ca/Konvergence-version-franco-R%C3%A9jean-McCormick-ebook/dp/B0F1DNQSTD",
          note: "French listing.",
        },
        {
          title: "King Klown Kronicles: The hidden Manifesto (Amazon)",
          href: "https://www.amazon.com/King-Klown-Kronicles-hidden-Manifesto/dp/B0DZCXT7VP",
          note: "US listing.",
        },
        {
          title: "King Klown Kronicles (Amazon Canada)",
          href: "https://www.amazon.ca/-/fr/R%C3%A9jean-McCormick-ebook/dp/B0DZ76L1N3",
          note: "Canada listing.",
        },
        {
          title: "Empowering AI for Programmers: The Kristal Framework (Amazon)",
          href: "https://www.amazon.com/-/es/Empowering-Programmers-Framework-Human-Centered-Integration/dp/B0DZCQBZZG",
          note: "Kristal Framework.",
        },
      ],
    },
    {
      title: "Academic / legitimacy anchors",
      subtitle: "Public research trails and identity anchors.",
      items: [
        {
          title: "PhilPeople — Réjean McCormick",
          href: "https://philpeople.org/profiles/rejean-mccormick",
          note: "Academic index listing.",
        },
        {
          title: "PhilArchive — Book of kOA record",
          href: "https://philarchive.org/rec/MCCTBO-17",
          note: "Archive anchor (example record).",
        },
        {
          title: "Meta-Wiki — User: Réjean McCormick",
          href: "https://meta.wikimedia.org/wiki/User%3AR%C3%A9jean_McCormick",
          note: "Public legitimacy anchor.",
        },
      ],
    },
    {
      title: "Presentations",
      subtitle: "Public deck corridor.",
      items: [
        {
          title: "Gamma deck — Global Strategic Overview — Why KOA?",
          href: "https://koa-movement-x84fw57.gamma.site/",
          note: "Deck linked from the KOA roadmap corridor.",
        },
      ],
    },
    {
      title: "Store",
      subtitle: "Commerce corridor (staged / ready-to-activate).",
      items: [
        {
          title: "kingklown.store",
          href: "https://kingklown.store",
          note: "Merch corridor (staged).",
        },
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <header className="prose prose-slate max-w-none">
        <h1>Social Links</h1>
        <p className="text-lg text-slate-600">
          Official presence inventory. Start with the map, then choose a corridor (platforms, governance, technology,
          research, or culture). :contentReference[oaicite:2]{index=2}
        </p>
      </header>

      <section className="mt-10 not-prose">
        <div className="border border-slate-200 rounded-lg p-4 bg-white">
          <div className="font-semibold">Direct contact</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>
              <strong>Email (architect):</strong>{" "}
              <a className="underline" href="mailto:rejean.mccormick@initkoa.org">
                rejean.mccormick@initkoa.org
              </a>
            </li>
            <li>
              <strong>Email (movement):</strong>{" "}
              <a className="underline" href="mailto:k@kingklown.com">
                k@kingklown.com
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 space-y-12">
        {sections.map((s) => (
          <section key={s.title}>
            <div className="prose prose-slate max-w-none">
              <h2>{s.title}</h2>
              {s.subtitle ? <p className="text-slate-600">{s.subtitle}</p> : null}
            </div>

            <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
              {s.items.map((it) => (
                <LinkCard key={it.href} title={it.title} href={it.href} note={it.note} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 text-sm text-slate-500">
        Tip: if you want a minimal site-wide surface without a social footer, add a single nav item “Links” → this page.
      </footer>
    </main>
  );
}
