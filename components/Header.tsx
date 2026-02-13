// components/Header.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  BookOpen,
  Layers,
  Cpu,
  Heart,
  PlayCircle,
  TrendingUp,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react';

// Define navigation structure outside to ensure stability for the search index
const NAV_ITEMS = [
  {
    label: 'Manifesto',
    path: '/principles',
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { label: 'Diagnosis', desc: 'The systemic crisis', path: '/diagnosis' },
      { label: 'Why kOA?', desc: 'Our reason for being', path: '/why' },
      { label: 'Principles', desc: 'Ethics & Civic code', path: '/principles' },
      { label: 'Logos & Mythos', desc: 'The power of language', path: '/principles/logos' },
      { label: 'Research', desc: 'Pi Theory & Deep analysis', path: '/research' },
    ],
  },
  {
    label: 'Initiatives',
    path: '/initiatives',
    icon: <TrendingUp className="w-4 h-4" />,
    children: [
      { label: 'Overview', desc: 'Strategic Roadmap', path: '/initiatives' },
      { label: 'Civic Governance', desc: 'The Operating System', path: '/initiatives/civic-governance' },
      // { label: 'Ukraine Peace Plan', desc: 'Freeze-Vote-Rebuild', path: '/initiatives/ukraine-peace-plan' },
    ],
  },
  {
    label: 'Ecosystem',
    path: '/platforms',
    icon: <Layers className="w-4 h-4" />,
    children: [
      { label: 'Platforms', desc: 'Konnaxion & Orgo (Software)', path: '/platforms' },
      { label: 'Infrastructures', desc: 'Kin City & Kristal Farms', path: '/infrastructures' },
    ],
  },
  {
    label: 'Technology',
    path: '/technology',
    icon: <Cpu className="w-4 h-4" />,
    children: [
      { label: 'Overview', desc: 'The Deep Tech Stack', path: '/technology' },
      { label: 'Kristal', desc: 'Verifiable semantic file format', path: '/technology/kristal' },
      { label: 'Architect', desc: 'Generative Output', path: '/technology/architect' },
      { label: 'SenTient', desc: 'Input Processing', path: '/technology/sentient' },
      { label: 'SwarmCraft', desc: 'Narrative Memory', path: '/technology/swarmcraft' },
      { label: 'Ariane', desc: 'UI Graph & Vision', path: '/technology/ariane' },
      { label: 'Âme Artificielle', desc: 'Simulated human personality. An artificial soul', path: '/technology/ame-artificielle' },
      { label: 'VM-Engine', desc: 'Multi-method vote compiler & simulator', path: '/technology/voting-machine' },
    ],
  },

  // ✅ Kréature with dropdown (keeps the heart icon)
  {
    label: 'Kréature',
    path: '/kreature',
    icon: <Heart className="w-4 h-4 text-pink-500" />,
    highlight: true,
    subtitle: '(Français)',
    children: [
      { label: 'Accueil', desc: "Entrée principale", path: '/kreature' },
      { label: 'Mythos', desc: 'Le récit fondateur', path: '/kreature/mythos' },
      { label: 'Anatomie', desc: 'La structure', path: '/kreature/anatomie' },
      { label: 'Rituels', desc: 'La méthode', path: '/kreature/rituels' },
      { label: 'Parcours', desc: "Portes d'entrée", path: '/kreature/parcours' },

      // Repères
      { label: 'Glossaire', desc: 'Définitions', path: '/kreature/reperes/glossaire' },
      { label: 'Pont Technique', desc: 'Métaphore ↔ code', path: '/kreature/reperes/pont-technique' },
      { label: 'FAQ', desc: 'Questions fréquentes', path: '/kreature/reperes/faq' },
    ],
  },

  // ✅ Play section beside Kréature (no dropdown, orange/gold play-circle)
  {
    label: 'Play',
    path: '/play',
    icon: <PlayCircle className="w-4 h-4 text-amber-500" />,
    accent: 'gold',
    subtitle: '(EN/FR)',
  },
];

// Included in search results (and used for CTA) without adding a full nav item.
const LINKS_CTA = { label: 'Links', path: '/links' };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // --- SEARCH STATE ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // Add Links CTA to search index
    if (LINKS_CTA.label.toLowerCase().includes(query)) {
      results.push({ ...LINKS_CTA, type: 'Page', desc: 'Full inventory / web presence' });
    }

    NAV_ITEMS.forEach((section: any) => {
      if (section.label.toLowerCase().includes(query)) {
        results.push({ ...section, type: 'Section' });
      }
      if (section.children) {
        section.children.forEach((child: any) => {
          if (child.label.toLowerCase().includes(query) || child.desc.toLowerCase().includes(query)) {
            results.push({ ...child, parent: section.label, type: 'Page' });
          }
        });
      }
    });

    return results;
  }, [searchQuery]);

  const handleSearchNavigate = (path: string) => {
    router.push(path);
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-3' : 'bg-white border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image src="/LogoK.svg" alt="King Klown Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 leading-none text-lg tracking-tight group-hover:text-primary transition-colors">
                The kOA
              </span>
              <span className="text-xs text-slate-500 tracking-widest font-medium uppercase">initiative</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item: any) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.path}
                  className={`flex flex-col items-center text-sm font-medium transition-colors py-2 group ${
                    item.accent === 'gold'
                      ? 'text-amber-600 hover:text-amber-700'
                      : item.highlight
                        ? 'text-pink-600 hover:text-pink-700'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />}
                  </div>
                  {item.subtitle && <span className="text-[10px] font-normal opacity-80 -mt-0.5">{item.subtitle}</span>}
                </Link>

                {/* DROPDOWN */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-2 overflow-hidden ring-1 ring-slate-900/5">
                      {item.children.map((sub: any) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className="block px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="text-sm font-bold text-slate-900 group-hover/item:text-primary">{sub.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{sub.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* UTILITIES */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all group"
              aria-label="Search"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <Link
              href={LINKS_CTA.path}
              className="ml-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Links
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

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-white border-t border-slate-100 p-6 overflow-y-auto pb-20 animate-in slide-in-from-top-2 duration-200 z-40">
            <div className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item: any) => (
                <div key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 text-lg font-bold mb-2 ${
                      item.accent === 'gold'
                        ? 'text-amber-600'
                        : item.highlight
                          ? 'text-pink-600'
                          : 'text-slate-900'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {item.icon} {item.label}
                      </div>
                      {item.subtitle && <span className="text-xs font-normal opacity-70 ml-6">{item.subtitle}</span>}
                    </div>
                  </Link>

                  {item.children && (
                    <div className="pl-7 space-y-3 border-l-2 border-slate-100 ml-2">
                      {item.children.map((sub: any) => (
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
                <Link
                  href={LINKS_CTA.path}
                  className="block w-full py-3 bg-slate-900 text-white text-center rounded-lg font-bold hover:bg-slate-800 transition-colors"
                >
                  Links (Full inventory)
                </Link>

                <div className="flex justify-center gap-6 text-slate-500">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex items-center gap-2 hover:text-slate-900"
                  >
                    <Search className="w-5 h-5" /> <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-slate-100 p-4 gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search documentation, initiatives, concepts..."
                className="flex-1 text-lg outline-none text-slate-900 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400">
                <span className="text-xs font-mono border border-slate-200 px-1.5 py-0.5 rounded">ESC</span>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm">Type to search...</p>
                  <div className="flex justify-center gap-2 mt-4 text-xs">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Manifesto</span>
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Peace Plan</span>
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Pi Theory</span>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchNavigate(result.path)}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 group transition-colors"
                    >
                      <div className="mt-1 p-1.5 bg-slate-100 text-slate-500 rounded group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                        <CornerDownLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{result.label}</span>
                          {result.parent && (
                            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                              {result.parent}
                            </span>
                          )}
                        </div>
                        {result.desc && <p className="text-sm text-slate-500 line-clamp-1">{result.desc}</p>}
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity self-center">
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex justify-between items-center text-xs text-slate-400">
              <span>Search based on site navigation</span>
              <div className="flex gap-2">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
