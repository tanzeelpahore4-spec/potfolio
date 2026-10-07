import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Activity, Terminal } from 'lucide-react';
import { Project } from '../types';
import { ArchitectureSchematic } from './ArchitectureSchematic';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onTrackAction: (type: string, target?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onTrackAction }) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simMetrics, setSimMetrics] = useState<{ p99: string; dropped: string; activeNodes: number } | null>(null);

  if (!project) return null;

  const runSystemSimulation = () => {
    setSimulationRunning(true);
    onTrackAction('project_simulation_run', project.id);
    setTimeout(() => {
      setSimMetrics({
        p99: (Math.random() * 2 + 2.5).toFixed(2) + 'ms',
        dropped: '0.000%',
        activeNodes: 28,
      });
      setSimulationRunning(false);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl text-neutral-100 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-neutral-950/90 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              {project.categoryLabel}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono-tabular text-neutral-400">{project.year}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">{project.clientOrDomain}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Header Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Topology Visualizer */}
          <div>
            <ArchitectureSchematic projectId={project.id} interactive={true} />
          </div>

          {/* Quantitative Impact Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.keyMetrics.map((metric, i) => (
              <div key={i} className="bg-neutral-950/80 border border-neutral-800 p-3.5 rounded-xl">
                <div className="text-xs text-neutral-400">{metric.label}</div>
                <div className="text-lg font-bold font-mono-tabular text-neutral-100 mt-1">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Problem vs Architecture Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                Engineering Challenge
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Architectural Solution
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.architectureSolution}
              </p>
            </div>
          </div>

          {/* Core Engineering Trade-offs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Principal Engineering Decisions & Trade-Offs
            </h3>
            <div className="space-y-3">
              {project.engineeringDecisions.map((item, idx) => (
                <div key={idx} className="bg-neutral-950/90 border border-neutral-800/90 rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    <span className="text-sm font-semibold text-neutral-200">{item.decision}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 pl-6">
                    <div>
                      <span className="text-neutral-500 font-medium">Rationale: </span>
                      <span className="text-neutral-300">{item.rationale}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-medium">Trade-off Accepted: </span>
                      <span className="text-amber-400/90">{item.tradeoff}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack List - Clean unboxed text tags */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
              Production Stack & Technologies
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-neutral-300">
              {project.techStack.map((tech, i) => (
                <span key={i} className="bg-neutral-800/80 px-2.5 py-1 rounded text-neutral-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Topology Stress Test Simulator */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 justify-center sm:justify-start">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Simulate High-Concurrency Chaos Injection</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Trigger mock network partition and examine zero-data-loss failover metrics.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {simMetrics && (
                <div className="text-xs font-mono-tabular text-emerald-400 flex items-center gap-2">
                  <span>p99: {simMetrics.p99}</span>
                  <span>·</span>
                  <span>Drops: {simMetrics.dropped}</span>
                </div>
              )}
              <button
                onClick={runSystemSimulation}
                disabled={simulationRunning}
                className="px-3.5 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                {simulationRunning ? 'Simulating Fault...' : 'Inject Chaos Test'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-950/90 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-xs font-mono-tabular text-neutral-400">
            <span>Verified Case Study</span>
            <span>·</span>
            <span>Archived Architecture Spec</span>
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => onTrackAction('github_click', project.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Architecture Repo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
