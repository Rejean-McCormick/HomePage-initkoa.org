'use client';

// app/links/page.js
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Music2,
  Book,
  FileText,
  GraduationCap,
  IdCard,
  Bot,
  Globe,
  Link as LinkIcon,
  PlayCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Social Links — Réjean McCormick',
  description:
    'Official link inventory for Réjean McCormick and King Klown: identity profiles, social channels, publishing, audio, and reference anchors.',
};

// favicon-style logo (browser tab icon)
function faviconUrl(domainOrUrl, size = 64) {
  const u = domainOrUrl.includes('://') ? domainOrUrl : `https://${domainOrUrl}`;
  return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${encodeURIComponent(u)}`;
}

function platformMetaFromHref(href) {
  const mk = (domainOrUrl, alt, icon) => ({
    logoSrc: faviconUrl(domainOrUrl, 64),
    alt,
    icon,
  });

  const safe = typeof href === 'string' ? href : '';
  let host = '';
  try {
    host = new URL(safe).hostname.replace(/^www\./, '');
  } catch {
    // ignore
  }

  // Host-based routing
  if (host.includes('linkedin.com')) return mk('linkedin.com', 'LinkedIn', <Linkedin className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('instagram.com')) return mk('instagram.com', 'Instagram', <Instagram className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('facebook.com')) return mk('facebook.com', 'Facebook', <Facebook className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host === 'x.com' || host.includes('twitter.com')) return mk('x.com', 'X', <Twitter className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('tiktok.com')) return mk('tiktok.com', 'TikTok', <PlayCircle className="w-4 h-4 text-slate-500" aria-hidden />);

  if (host.includes('mastodon.social')) return mk('mastodon.social', 'Mastodon', <Globe className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('meta.wikimedia.org')) return mk('meta.wikimedia.org', 'Wikimedia', <Globe className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('philpeople.org')) return mk('philpeople.org', 'PhilPeople', <GraduationCap className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('orcid.org')) return mk('orcid.org', 'ORCID', <IdCard className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('scholar.google.com')) return mk('scholar.google.com', 'Google Scholar', <GraduationCap className="w-4 h-4 text-slate-500" aria-hidden />);

  if (host.includes('medium.com')) return mk('medium.com', 'Medium', <FileText className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('amazon.')) return mk(host, 'Amazon', <Book className="w-4 h-4 text-slate-500" aria-hidden />);

  if (host.includes('open.spotify.com')) return mk('open.spotify.com', 'Spotify', <Music2 className="w-4 h-4 text-slate-500" aria-hidden />);
  if (host.includes('soundcloud.com')) return mk('soundcloud.com', 'SoundCloud', <Music2 className="w-4 h-4 text-slate-500" aria-hidden />);

  if (host.includes('huggingface.co')) return mk('huggingface.co', 'Hugging Face', <Bot className="w-4 h-4 text-slate-500" aria-hidden />);

  if (host) return mk(host, host, <LinkIcon className="w-4 h-4 text-slate-500" aria-hidden />);
  return mk('example.com', 'Link', <LinkIcon className="w-4 h-4 text-slate-500" aria-hidden />);
}

function LinkCard({ title, href, note }) {
  const isInternal = typeof href === 'string' && href.startsWith('/');
  const meta = useMemo(() => platformMetaFromHref(href), [href]);
  const [logoOk, setLogoOk] = useState(true);

  const className =
    'border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors';

  const CardInner = (
    <div className="flex items-start gap-3 min-w-0">
      <div className="mt-0.5 shrink-0">
        {logoOk ? (
          <img
            src={meta.logoSrc}
            alt={meta.alt}
            className="w-4 h-4"
            loading="lazy"
            decoding="async"
            onError={() => setLogoOk(false)}
          />
        ) : (
          meta.icon
        )}
      </div>

      <div className="min-w-0 flex-1">
        <strong className="block text-slate-900">{title}</strong>
        {note ? <div className="text-sm text-slate-600 mt-1">{note}</div> : null}
        <div className="text-xs text-slate-500 mt-2 break-all">{href}</div>
      </div>
    </div>
  );

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
      title: 'Réjean McCormick — official profiles',
      subtitle: 'Primary identity anchors and long-lived public references.',
      items: [
        {
          title: 'LinkedIn',
          href: 'https://www.linkedin.com/in/r%C3%A9jean-mccormick-51403a37b/',
          note: 'Professional profile.',
        },
        {
          title: 'Mastodon — @Rejean_McCormick',
          href: 'https://mastodon.social/@Rejean_McCormick',
          note: 'Federated presence.',
        },
        {
          title: 'Facebook — Réjean McCormick',
          href: 'https://www.facebook.com/profile.php?id=61566663549235',
          note: 'Public profile.',
        },
        {
          title: 'ORCID',
          href: 'https://orcid.org/0009-0001-2086-854X',
          note: 'Researcher identifier.',
        },
        {
          title: 'Google Scholar',
          href: 'https://scholar.google.com/citations?user=oVZ3n9kAAAAJ&hl=en',
          note: 'Citation / publication index.',
        },
        {
          title: 'Meta-Wiki — User: Réjean McCormick',
          href: 'https://meta.wikimedia.org/wiki/User:Réjean_McCormick',
          note: 'Wikimedia identity anchor.',
        },
        {
          title: 'PhilPeople — Réjean McCormick',
          href: 'https://philpeople.org/profiles/rejean-mccormick',
          note: 'Academic index listing.',
        },
      ],
    },
    {
      title: 'King Klown — channels',
      subtitle: 'Broadcast + social corridors for the mobilisation persona.',
      items: [
        {
          title: 'Instagram — @kingklown.xyz',
          href: 'https://www.instagram.com/kingklown.xyz/',
          note: 'Primary visual channel.',
        },
        {
          title: 'Facebook — King Klown',
          href: 'https://www.facebook.com/profile.php?id=61567073454490',
          note: 'Public profile.',
        },
        {
          title: 'X — @KingKlownXYZ',
          href: 'https://x.com/KingKlownXYZ',
          note: 'Updates / posting corridor.',
        },
        {
          title: 'TikTok — @kingklown.xyz',
          href: 'https://www.tiktok.com/@kingklown.xyz',
          note: 'Short-form channel.',
        },
        {
          title: 'Hugging Face — KingKlown',
          href: 'https://huggingface.co/KingKlown',
          note: 'Models / artifacts hub.',
        },
      ],
    },
    {
      title: 'Publishing & longform',
      subtitle: 'Writing + books (single canonical entry points).',
      items: [
        {
          title: 'Medium — @boatbuilder610',
          href: 'https://medium.com/@boatbuilder610',
          note: 'Articles and longform posts.',
        },
        {
          title: 'Amazon author page',
          href: 'https://www.amazon.ca/stores/author/B0G3B7DQWG?ingress=0&visitId=2c136ee2-ccf3-47b2-a4c9-c04125871944',
          note: 'Books hub (no individual book links here).',
        },
      ],
    },
    {
      title: 'Audio',
      subtitle: 'Podcast + audio corridors.',
      items: [
        {
          title: 'Spotify show — King Klown',
          href: 'https://open.spotify.com/show/2hMamhJENVfWsULSuUVEG4',
          note: 'Official show page.',
        },
        {
          title: 'SoundCloud — Réjean McCormick',
          href: 'https://soundcloud.com/rejean-mccormick',
          note: 'Audio uploads.',
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
              <strong>Email (architect):</strong>{' '}
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
