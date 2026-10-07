import React, { useState } from 'react';
import { Cpu, Search, Check, Layers, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const ArchitectureMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section id="architecture" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
              Technical Stack & System Mastery
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight">
              15 Years of Deep Systems Competencies.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Battle-tested competencies across distributed state machines, network protocols, cloud runtimes, and multi-petabyte data engines.
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search stack (e.g., Raft, Rust, Kafka)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, cIdx) => {
            const filteredSkills = cat.skills.filter(
              (s) =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.notableUse.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div
                key={cIdx}
                className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {filteredSkills.length === 0 ? (
                      <div className="text-xs text-neutral-400 py-4 text-center">No matching tools found</div>
                    ) : (
                      filteredSkills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                              {skill.name}
                            </span>
                            <span className="font-mono-tabular text-neutral-500 dark:text-neutral-400">
                              {skill.yearsOfExperience} yrs · {skill.depthLevel}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            {skill.notableUse}
                          </div>
                          {/* Visual proficiency bar */}
                          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="bg-blue-600 dark:bg-sky-500 h-full rounded-full"
                              style={{ width: `${Math.min(100, (skill.yearsOfExperience / 15) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 text-[11px] font-mono-tabular text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>Production Grade</span>
                  <span>Zero Deprecated APIs</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
