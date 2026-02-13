// app/layout.tsx
import './globals.css';
import { Baskervville } from 'next/font/google';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const baskervville = Baskervville({ 
  subsets: ['latin'], 
  weight: '400', 
  display: 'swap' 
});

export const metadata = {
  // 1. Define the base URL (Utilisation du domaine "nu" pour le style commande système)
  metadataBase: new URL('https://initkoa.org'),
  
  // 2. Auto-generate canonical links
  alternates: {
    canonical: './',
  },

  // 3. OPTIMISATION SEO & MARQUE PERSONNELLE
  title: 'The kOA Initiative - Civic Utilities by Réjean McCormick',
  description: 'The official socio-technical architecture initiative led by Réjean McCormick. Building civic utilities, democratic innovation, and the kOA ecosystem.',
  
  // 4. Signaux d'auteur pour Google et les IA
  authors: [{ name: 'Réjean McCormick', url: 'https://initkoa.org' }],
  creator: 'Réjean McCormick',

  icons: {
    icon: '/LogoK.svg',
  },
  
  // (Optionnel) OpenGraph pour les partages LinkedIn/Social
  openGraph: {
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
        {/* === AI & LLM OPTIMIZATION === */}
        <link rel="alternate" type="text/plain" href="/ai-corpus.txt" title="AI Context Corpus" />
        <link rel="help" href="/llms.txt" title="LLM Instructions" />
      </head>
      
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col">
        <Header />
        
        {/* Global Layout Wrapper */}
        <div className="max-w-4xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert flex-grow w-full">
          {children}

          {/* === FOOTER SIGNATURE === */}
          <footer className="mt-24 pt-8 border-t border-slate-100 text-center text-sm text-slate-400 font-sans not-prose">
            <p>
              © {new Date().getFullYear()} The kOA Initiative. 
              Architected by <a href="/about" className="hover:text-[#1e6864] transition-colors font-medium">Réjean McCormick</a>.
            </p>
          </footer>
        </div>
        
      </body>
    </html>
  );
}