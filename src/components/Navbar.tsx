import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-neutral-950/90 dark:bg-neutral-950/90 bg-white/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <a
          href="#overview"
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-display hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Tanzeel Pahore
        </a>

        {/* Zone 2: Nav Links - 4-6 text links with clean hover styling */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#overview"
            className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            Overview
          </a>
          <a
            href="#projects"
            className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            Selected Works
          </a>
          <a
            href="#experience"
            className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            Experience
          </a>
          <a
            href="#architecture"
            className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            Stack & Systems
          </a>
          <a
            href="#analytics"
            className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Live Analytics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Quick Action */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Primary Consultation Action */}
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            Consultation
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            aria-label="Open mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 dark:bg-neutral-950/95 bg-white/98 border-b border-neutral-200 dark:border-neutral-800 px-5 py-4 space-y-3">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Overview
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Selected Works
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            15-Year Timeline
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Stack & Systems
          </a>
          <a
            href="#analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Live Analytics
          </a>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 text-xs font-semibold text-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
            >
              View CV
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-2 text-xs font-semibold text-center rounded-lg bg-blue-600 text-white"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
