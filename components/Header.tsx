// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, ChevronDown, 
  Search, Globe, 
  BookOpen, Layers, Cpu, Heart
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Handle scroll effect for sticky transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navStructure = [
    {
      label: 'Manifesto',
      path: '/principles',
      icon: <BookOpen className="w-4 h-4" />,
      children: [
        { label: 'Diagnosis', desc: 'The systemic crisis', path: '/diagnosis' },
        { label: 'Why KOA?', desc: 'Our reason for being', path: '/why' },
        { label: 'Principles', desc: 'Ethics & Civic code', path: '/principles' },
        { label: 'Logos & Mythos', desc: 'The power of language', path: '/principles/logos-mythos' },
        { label: 'Research', desc: 'Pi Theory & Deep analysis', path: '/research' },
      ]
    },
    {
      label: 'Ecosystem',
      path: '/platforms',
      icon: <Layers className="w-4 h-4" />,
      children: [
        { label: 'Platforms', desc: 'Konnaxion & Orgo (Software)', path: '/platforms' },
        { label: 'Infrastructures', desc: 'Kin City & Kristal Farms', path: '/infrastructures' },
        { label: 'Initiatives', desc: 'Civic Governance & Peace Plans', path: '/initiatives' },
      ]
    },
    {
      label: 'Technology',
      path: '/technology',
      icon: <Cpu className="w-4 h-4" />,
      children: [
        { label: 'Overview', desc: 'The Deep Tech Stack', path: '/technology' },
        { label: 'Ariane', desc: 'UI Graph & Vision', path: '/technology/ariane' },
        { label: 'Architect', desc: 'Generative Output', path: '/technology/architect' },
        { label: 'SenTient', desc: 'Input Processing', path: '/technology/sentient' },
        { label: 'SwarmCraft', desc: 'Narrative Memory', path: '/technology/swarmcraft' },
        { label: 'Âme Artificielle', desc: 'Alignment & Ethics', path: '/technology/ame-artificielle' },
        { label: 'VM-Engine', desc: 'Deterministic Core', path: '/technology/votingmachine' },
      ]
    },
    {
      label: 'Kréature',
      path: '/kreature',
      icon: <Heart className="w-4 h-4 text-pink-500" />,
      highlight: true
    }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-3' 
          : 'bg-white border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Ensure 'LogoK.svg' is inside your 'public' folder. 
              Example path: public/LogoK.svg 
            */}
            <Image 
              src="/LogoK.svg" 
              alt="King Klown Logo" 
              width={40} 
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 leading-none text-lg tracking-tight group-hover:text-primary transition-colors">
              King Klown
            </span>
            <span className="text-xs text-slate-500 tracking-widest font-medium uppercase">
              & KOA
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navStructure.map((item) => (
            <div 
              key={item.label} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={item.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2
                  ${item.highlight ? 'text-pink-600 hover:text-pink-700' : 'text-slate-600 hover:text-slate-900'}
                `}
              >
                {item.icon}
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />}
              </Link>

              {/* DROPDOWN MENU */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64">
                  <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-2 overflow-hidden ring-1 ring-slate-900/5">
                    {item.children.map((sub) => (
                      <Link 
                        key={sub.path} 
                        href={sub.path}
                        className="block px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="text-sm font-bold text-slate-900 group-hover/item:text-primary">
                          {sub.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {sub.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* UTILITIES (Search / Lang / CTA) */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-slate-200"></div>
          <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
            <Globe className="w-4 h-4" />
            <span>EN</span>
          </button>
          <Link href="/about" className="ml-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md">
            About
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white border-t border-slate-100 p-6 overflow-y-auto pb-20 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-6">
            {navStructure.map((item) => (
              <div key={item.label}>
                <Link 
                  href={item.path} 
                  className={`flex items-center gap-3 text-lg font-bold mb-2
                    ${item.highlight ? 'text-pink-600' : 'text-slate-900'}
                  `}
                >
                  {item.icon} {item.label}
                </Link>
                {item.children && (
                  <div className="pl-7 space-y-3 border-l-2 border-slate-100 ml-2">
                    {item.children.map((sub) => (
                      <Link 
                        key={sub.path} 
                        href={sub.path}
                        className="block text-slate-600 text-sm font-medium hover:text-primary hover:translate-x-1 transition-all"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Link href="/about" className="block w-full py-3 bg-slate-900 text-white text-center rounded-lg font-bold hover:bg-slate-800 transition-colors">
                About the Architect
              </Link>
              <div className="flex justify-center gap-6 text-slate-500">
                <button className="flex items-center gap-2 hover:text-slate-900">
                    <Globe className="w-5 h-5" /> <span>EN</span>
                </button>
                <button className="flex items-center gap-2 hover:text-slate-900">
                    <Search className="w-5 h-5" /> <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}