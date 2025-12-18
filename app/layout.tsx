// app/layout.tsx
import './globals.css';
import { Baskervville } from 'next/font/google';
import Header from '@/components/Header'; // Fixed import alias
import { ReactNode } from 'react';

const baskervville = Baskervville({ 
  subsets: ['latin'], 
  weight: '400', 
  display: 'swap' 
});

export const metadata = {
  title: 'King Klown & KOA',
  description: 'Civic utilities for a fragmented world.',
  icons: {
    icon: '/LogoK.svg', // Ensure 'LogoK.svg' is placed in your 'public' folder
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={baskervville.className}>
      <body className="bg-white text-slate-900 antialiased">
        <Header />
        
        {/* Global Layout Wrapper 
          Changed to <div> to avoid nested <main> tags with inner pages.
          Applies the centralized 'prose' typography and width constraints.
        */}
        <div className="max-w-4xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert">
          {children}
        </div>
        
      </body>
    </html>
  );
}