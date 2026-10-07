import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-base font-bold font-display text-neutral-900 dark:text-neutral-100">
              Tanzeel Pahore
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Principal Software Architect & Distributed Systems Engineer · 15 Years of Craft
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
            <a href="#overview" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Overview
            </a>
            <a href="#projects" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Works
            </a>
            <a href="#experience" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Experience
            </a>
            <a href="#architecture" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Stack
            </a>
            <a href="#analytics" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Analytics
            </a>
            <a href="#contact" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Contact
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tabular text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Tanzeel Pahore. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>San Francisco, CA</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tanzeelpahore"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tanzeel-pahore"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PORTFOLIO_OWNER.email}`}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Direct Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
