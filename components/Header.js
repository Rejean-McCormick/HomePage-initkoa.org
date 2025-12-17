"use client";
import { useState } from 'react';
import Link from 'next/link';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          King Klown & KOA
        </Link>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-gray-700" 
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav>
          <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6`}>
            <li>
              <Link href="/" className="text-gray-800 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/platforms" className="text-gray-800 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Plateformes
              </Link>
            </li>
            <li>
              <Link href="/initiatives" className="text-gray-800 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Initiatives
              </Link>
            </li>
            <li>
              <Link href="/principles" className="text-gray-800 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Principes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-800 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
