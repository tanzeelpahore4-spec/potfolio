import React, { useState } from 'react';
import { Briefcase, ChevronRight, Award, Building, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
            Career Progression & Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight">
            15 Years of Distributed Systems Engineering.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            From low-level network protocol programming in C to architecting multi-region enterprise platforms handling billions of transactions per day.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-4">
          {EXPERIENCE_TIMELINE.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 transition-all hover:border-neutral-400 dark:hover:border-neutral-700"
              >
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5">
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-blue-600 dark:text-sky-400">{item.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-neutral-100">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-mono-tabular font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                      {item.scaleMetric}
                    </span>
                    <button
                      className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                      aria-label="Expand role details"
                    >
                      <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800/80 space-y-6">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl">
                      {item.summary}
                    </p>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                        Key Architectural Milestones & Business Impact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.achievements.map((ach, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/60 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs text-neutral-500 font-medium mr-2">Core Tech:</span>
                      {item.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono-tabular bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
