// app/layout.tsx
import './globals.css';
import { Baskervville } from 'next/font/google';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { getSiteUrl, toAbsoluteUrl } from '@/lib/site-url';

const baskervville = Baskervville({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: './',
  },

  title: 'The kOA Initiative - Civic Utilities by Réjean McCormick',
  description:
    'The official socio-technical architecture initiative led by Réjean McCormick. Building civic utilities, democratic innovation, and the kOA ecosystem.',

  authors: [{ name: 'Réjean McCormick', url: SITE_URL }],
  creator: 'Réjean McCormick',

  icons: {
    icon: '/LogoK.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',

  openGraph: {
    url: SITE_URL,
    title: 'The kOA Initiative by Réjean McCormick',
    description: 'Civic utilities for a fragmented world.',
    type: 'website',
    locale: 'fr_CA',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={baskervville.className}>
      <head>
        {/* Core AI discovery */}
        <link rel="help" href="/llms.txt" title="LLM Instructions" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Full LLM Context"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/ai-corpus.txt"
          title="AI Context Corpus"
        />

        {/* Markdown mirrors */}
        <link
          rel="alternate"
          type="text/markdown"
          href="/index.html.md"
          title="Homepage Markdown Mirror"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/md-manifest.json"
          title="Markdown Mirror Manifest"
        />
        <link
          rel="sitemap"
          type="application/xml"
          href="/md-sitemap.xml"
          title="Markdown Mirror Sitemap"
        />



        {/* Optional machine hints */}
        <meta name="ai:llms" content={toAbsoluteUrl('/llms.txt')} />
        <meta name="ai:llms-full" content={toAbsoluteUrl('/llms-full.txt')} />
        <meta name="ai:corpus" content={toAbsoluteUrl('/ai-corpus.txt')} />
        <meta
          name="ai:markdown-manifest"
          content={toAbsoluteUrl('/md-manifest.json')}
        />
      </head>

      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        <Header />

        <div className="max-w-4xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert flex-grow w-full">
          {children}

          <footer className="mt-24 pt-8 border-t border-slate-100 text-center text-sm text-slate-400 font-sans not-prose">
            <p>
              © {new Date().getFullYear()} The kOA Initiative. Architected by{' '}
              <a
                href="/about"
                className="hover:text-[#1e6864] transition-colors font-medium"
              >
                Réjean McCormick
              </a>
              .
            </p>

            <nav
              aria-label="AI and machine-readable resources"
              className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs"
            >
              <a
                href="/llms.txt"
                className="hover:text-[#1e6864] transition-colors"
              >
                llms.txt
              </a>
              <a
                href="/llms-full.txt"
                className="hover:text-[#1e6864] transition-colors"
              >
                llms-full.txt
              </a>
              <a
                href="/ai-corpus.txt"
                className="hover:text-[#1e6864] transition-colors"
              >
                ai-corpus.txt
              </a>
              <a
                href="/md-manifest.json"
                className="hover:text-[#1e6864] transition-colors"
              >
                md-manifest.json
              </a>
              <a
                href="/md-sitemap.xml"
                className="hover:text-[#1e6864] transition-colors"
              >
                md-sitemap.xml
              </a>
              <a
                href="/index.html.md"
                className="hover:text-[#1e6864] transition-colors"
              >
                index.html.md
              </a>
            </nav>
          </footer>
        </div>

        <Analytics />
      </body>
    </html>
  );
}