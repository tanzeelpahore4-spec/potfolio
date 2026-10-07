import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { ArchitectureSchematic } from './ArchitectureSchematic';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  onTrackAction: (type: string, target?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenResume, onTrackAction }) => {
  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic presence */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability status line - Clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Principal Architecture & Advisory Roles</span>
              <span aria-hidden="true">·</span>
              <span>Based in SF & Global Remote</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display leading-[1.08] text-balance">
                Distributed Systems Architect with 15 Years of Engineering Craft.
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed pt-2">
                Designing resilient multi-region cloud infrastructures, microsecond event matching engines, and high-throughput distributed data fabrics for mission-critical enterprise scale.
              </p>
            </div>

            {/* Clean Unboxed Metadata with Typographic Separators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono-tabular text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>15+ Years Experience</span>
              </div>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>42 Distributed Systems</span>
              </div>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>99.999% SLA Record</span>
              </div>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <div>
                <span className="text-neutral-900 dark:text-neutral-200 font-semibold">$45M+</span> Saved in Cloud OpEx
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => {
                  onTrackAction('click_cta', 'explore_projects');
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                Inspect Selected Works
              </button>

              <button
                onClick={() => {
                  onTrackAction('click_cta', 'book_consultation');
                  onOpenContact();
                }}
                className="px-5 py-2.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Schedule Architecture Review
              </button>

              <button
                onClick={() => {
                  onTrackAction('resume_download', 'hero');
                  onOpenResume();
                }}
                className="px-4 py-2.5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                View Executive Bio
              </button>
            </div>
          </div>

          {/* Right Column: Interactive System Topology Anchor */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Subtle accent backdrop */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-sky-600/10 blur-xl opacity-70" />

              <div className="relative rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-neutral-400">core-infrastructure.telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                    Active System
                  </span>
                </div>

                <div className="p-4 space-y-4">
                  <ArchitectureSchematic projectId="distributed-mesh" interactive={true} />

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                      <div className="text-[11px] text-neutral-400">Target Scale</div>
                      <div className="text-sm font-semibold text-neutral-100 font-mono-tabular mt-0.5">
                        14.2B req / day
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Zero Failover Drop</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                      <div className="text-[11px] text-neutral-400">Consensus Engine</div>
                      <div className="text-sm font-semibold text-neutral-100 font-mono-tabular mt-0.5">
                        Raft Hierarchy
                      </div>
                      <div className="text-[10px] text-sky-400 mt-0.5">Multi-Region Quorum</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#projects"
            className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            <span>Explore Case Studies</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
