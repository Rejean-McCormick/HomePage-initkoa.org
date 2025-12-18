'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Cpu, 
  Server, 
  BookOpen 
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [platOpen, setPlatOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-2xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors">
              King Klown
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            
            {/* Context */}
            <Link href="/why" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Context
            </Link>

            {/* Initiatives */}
            <Link href="/initiatives" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Initiatives
            </Link>

            {/* Platforms Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none"
                onMouseEnter={() => setPlatOpen(true)}
                onMouseLeave={() => setPlatOpen(false)}
              >
                Platforms <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 mt-0 w-56 bg-white border border-slate-100 shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${platOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setPlatOpen(true)}
                onMouseLeave={() => setPlatOpen(false)}
              >
                <div className="py-2">
                  <DropdownLink href="/platforms/konnaxion" label="Konnaxion" icon={<Server className="w-4 h-4" />} />
                  <DropdownLink href="/platforms/orgo" label="Orgo" icon={<Server className="w-4 h-4" />} />
                  <DropdownLink href="/platforms/kristal-farms" label="Kristal Farms" icon={<Server className="w-4 h-4" />} />
                  <div className="border-t border-slate-100 my-1"></div>
                  <DropdownLink href="/platforms/kreature" label="Kréature (Mythos)" icon={<BookOpen className="w-4 h-4" />} />
                </div>
              </div>
            </div>

            {/* Technology Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 focus:outline-none"
                onMouseEnter={() => setTechOpen(true)}
                onMouseLeave={() => setTechOpen(false)}
              >
                Technology <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 mt-0 w-64 bg-white border border-slate-100 shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${techOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setTechOpen(true)}
                onMouseLeave={() => setTechOpen(false)}
              >
                <div className="py-2">
                  <DropdownLink href="/technology/ame-artificielle" label="Âme artificielle" icon={<Cpu className="w-4 h-4 text-rose-500" />} />
                  <DropdownLink href="/technology/architect" label="Abstract Wiki Architect" icon={<Cpu className="w-4 h-4" />} />
                  <DropdownLink href="/technology/ariane" label="Ariane" icon={<Cpu className="w-4 h-4" />} />
                  <DropdownLink href="/technology/sentient" label="SenTient" icon={<Cpu className="w-4 h-4" />} />
                  <DropdownLink href="/technology/swarmcraft" label="SwarmCraft" icon={<Cpu className="w-4 h-4" />} />
                </div>
              </div>
            </div>

            {/* Meta */}
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 shadow-xl absolute w-full">
          <MobileLink href="/why" label="Context / Diagnosis" />
          <MobileLink href="/initiatives" label="Initiatives" />
          <div className="border-t border-slate-100 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Platforms</p>
            <MobileLink href="/platforms/konnaxion" label="Konnaxion" />
            <MobileLink href="/platforms/orgo" label="Orgo" />
            <MobileLink href="/platforms/kreature" label="Kréature" />
          </div>
          <div className="border-t border-slate-100 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Technology</p>
            <MobileLink href="/technology/ame-artificielle" label="Âme artificielle" highlight />
            <MobileLink href="/technology/architect" label="Architect" />
            <MobileLink href="/technology/ariane" label="Ariane" />
            <MobileLink href="/technology/sentient" label="SenTient" />
            <MobileLink href="/technology/swarmcraft" label="SwarmCraft" />
          </div>
          <div className="border-t border-slate-100 pt-2">
             <MobileLink href="/about" label="About" />
             <MobileLink href="/contact" label="Contact" />
          </div>
        </div>
      )}
    </header>
  );
}

// Helper Components - No Typescript annotations here
function DropdownLink({ href, label, icon }) {
  return (
    <Link 
      href={href} 
      className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
    >
      <span className="mr-3 opacity-70">{icon}</span>
      {label}
    </Link>
  );
}

function MobileLink({ href, label, highlight }) {
  return (
    <Link 
      href={href} 
      className={`block text-base font-medium ${highlight ? 'text-rose-600' : 'text-slate-600'} hover:text-slate-900`}
    >
      {label}
    </Link>
  );
}