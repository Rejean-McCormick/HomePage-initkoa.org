import './globals.css';
import { Baskervville } from 'next/font/google';
import Header from '../components/Header';

const baskervville = Baskervville({ subsets: ['latin'], weight: '400', display: 'swap' });

export const metadata = {
  title: 'King Klown & KOA',
  description: 'Civic utilities for a fragmented world.',
  // ADD THIS SECTION:
  icons: {
    icon: '/LogoK.svg', // This looks inside the 'public' folder automatically
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={baskervville.className}>
      <body>
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert">
          {children}
        </main>
      </body>
    </html>
  );
}