import React, { useState } from 'react';
import { ArrowUpRight, Filter, Layers, Zap } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ArchitectureSchematic } from './ArchitectureSchematic';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onTrackAction: (type: string, target?: string, metadata?: Record<string, any>) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, onTrackAction }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Architectures' },
    { id: 'distributed', label: 'Distributed Systems' },
    { id: 'streaming', label: 'Streaming & FinTech' },
    { id: 'cloud', label: 'Cloud & Security' },
    { id: 'ai_systems', label: 'AI & Systems' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleCardClick = (project: Project) => {
    onTrackAction('project_view', project.id, { title: project.title });
    onSelectProject(project);
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
              Selected Works & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight">
              Production Systems Shipped at Scale.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              High-throughput architectures, consensus algorithms, and zero-downtime platforms engineered to handle billions of transactions reliably.
            </p>
          </div>

          {/* Interactive Filter Tabs - Functional buttons */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  onTrackAction('filter_change', cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0 || index === 1;
            const colSpan = isFeatured ? 'lg:col-span-6' : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className={`${colSpan} group relative rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 p-6 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md`}
              >
                <div>
                  {/* Schematic / Blueprint Preview Container */}
                  <div className="mb-5 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-neutral-950">
                    <ArchitectureSchematic projectId={project.id} />
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-neutral-500 dark:text-neutral-400 mb-2.5">
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[150px]">{project.clientOrDomain}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* Primary Highlight Metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800/60 text-xs font-mono-tabular">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Scale</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {project.keyMetrics[0]?.value}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Efficiency</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {project.keyMetrics[1]?.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono-tabular text-neutral-600 dark:text-neutral-400 truncate max-w-[70%]">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-neutral-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-neutral-400 self-center">+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
