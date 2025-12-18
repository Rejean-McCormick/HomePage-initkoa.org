'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <--- 1. Import Image component

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/platforms', label: 'Platforms' },
    { href: '/platforms/kreature', label: 'Kréature (Français)' },
    { href: '/initiatives', label: 'Initiatives' },
    { href: '/principles', label: 'Principles' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group"> {/* Added flex container */}
              
              {/* 2. Add the Logo Image Here */}
              <Image 
                src="/LogoK.svg" 
                alt="King Klown Logo" 
                width={40} 
                height={40} 
                className="group-hover:scale-110 transition-transform duration-200"
              />

              <span className="text-2xl font-bold text-primary tracking-tight">
                King Klown <span className="text-gray-400">&</span> KOA
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="block text-gray-600 hover:text-primary font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}