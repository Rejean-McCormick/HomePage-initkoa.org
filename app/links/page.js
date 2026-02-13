// app/links/page.js
import Link from "next/link";

export const metadata = {
  title: "Social Links — Réjean McCormick",
  description:
    "Official link inventory for Réjean McCormick and King Klown: identity profiles, social channels, publishing, audio, and reference anchors.",
};

function LinkCard({ title, href, note }) {
  const isInternal = typeof href === "string" && href.startsWith("/");

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
      title: "Réjean McCormick — official profiles",
      subtitle: "Primary identity anchors and long-lived public references.",
      items: [
        {
          title: "LinkedIn",
          href: "https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/",
          note: "Professional profile.",
        },
        {
          title: "Mastodon — @Rejean_McCormick",
          href: "https://mastodon.social/@Rejean_McCormick",
          note: "Federated updates / presence.",
        },
        {
          title: "Facebook — Réjean McCormick",
          href: "https://www.facebook.com/profile.php?id=61566663549235",
          note: "Public profile.",
        },
        {
          title: "Meta-Wiki — User: Réjean McCormick",
          href: "https://meta.wikimedia.org/wiki/User:Réjean_McCormick",
          note: "Wikimedia identity anchor.",
        },
        {
          title: "PhilPeople — Réjean McCormick",
          href: "https://philpeople.org/profiles/rejean-mccormick",
          note: "Academic index listing.",
        },
      ],
    },
    {
      title: "King Klown — channels",
      subtitle: "Broadcast + social corridors for the mobilisation persona.",
      items: [
        {
          title: "Instagram — @kingklown.xyz",
          href: "https://www.instagram.com/kingklown.xyz/",
          note: "Primary visual channel.",
        },
        {
          title: "Facebook — King Klown",
          href: "https://www.facebook.com/profile.php?id=61567073454490",
          note: "Public profile.",
        },
        {
          title: "X — @KingKlownXYZ",
          href: "https://x.com/KingKlownXYZ",
          note: "Updates / posting corridor.",
        },
        {
          title: "TikTok — @kingklown.xyz",
          href: "https://www.tiktok.com/@kingklown.xyz",
          note: "Short-form channel.",
        },
      ],
    },
    {
      title: "Publishing & longform",
      subtitle: "Writing + books (single canonical entry points).",
      items: [
        {
          title: "Medium — @boatbuilder610",
          href: "https://medium.com/@boatbuilder610",
          note: "Articles and longform posts.",
        },
        {
          title: "Amazon author page",
          href: "https://www.amazon.ca/stores/author/B0G3B7DQWG?ingress=0&visitId=2c136ee2-ccf3-47b2-a4c9-c04125871944",
          note: "Books hub (no individual book links here).",
        },
      ],
    },
    {
      title: "Audio",
      subtitle: "Podcast corridor.",
      items: [
        {
          title: "Spotify show — King Klown",
          href: "https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4",
          note: "Official show page.",
        },
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <header className="prose prose-slate max-w-none">
        <h1>Social Links</h1>
        <p className="text-lg text-slate-600">
          Official presence inventory. Pick a corridor (identity, channels, publishing, audio, reference anchors).
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
        Tip: keep this as the single canonical “Links” surface; everything else can point here.
      </footer>
    </main>
  );
}
