import React from 'react';
import { X, Printer, Download, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_OWNER, EXPERIENCE_TIMELINE, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackAction: (type: string, target?: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onTrackAction }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    onTrackAction('resume_print', 'cv_modal');
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl shadow-2xl text-neutral-900 dark:text-neutral-100 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">Tanzeel Pahore</span>
            <span>·</span>
            <span>Principal Systems Architect CV</span>
            <span>·</span>
            <span className="text-emerald-600 dark:text-emerald-400">Updated 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-3">
            <h1 className="text-3xl font-extrabold font-display text-neutral-900 dark:text-neutral-100">
              Tanzeel Pahore
            </h1>
            <p className="text-sm font-semibold text-blue-600 dark:text-sky-400">
              Principal Software Architect & Distributed Systems Engineer (15+ Years)
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tabular text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> San Francisco, CA & Remote
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {PORTFOLIO_OWNER.email}
              </span>
              <span>·</span>
              <span>github.com/tanzeelpahore</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {PORTFOLIO_OWNER.summary}
            </p>
          </div>

          {/* Core Career Progression */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              15-Year Engineering & Leadership Track
            </h2>
            <div className="space-y-6">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {item.role}
                      </span>
                      <span className="text-neutral-500 font-medium"> — {item.organization}</span>
                    </div>
                    <span className="font-mono-tabular text-neutral-500 font-semibold">{item.period}</span>
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono-tabular">
                    Scale: {item.scaleMetric}
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Mastery Matrix */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-200 block mb-1">
                  Distributed Systems & Architecture
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Consensus (Raft, Paxos), CRDTs, Event-Driven Architecture (Kafka), eBPF socket routing, Zero-Trust (SPIFFE/SPIRE), Chaos Engineering.
                </p>
              </div>
              <div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-200 block mb-1">
                  Languages & Cloud Platforms
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Go, Rust, TypeScript, C++, Python, Kubernetes, AWS, GCP, ClickHouse, PostgreSQL, Redis, Terraform.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Education & Certifications
            </h2>
            <div className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
              <div className="flex justify-between">
                <span className="font-semibold">B.S. in Computer Science & Distributed Systems</span>
                <span className="font-mono-tabular text-neutral-500">Graduated Magna Cum Laude</span>
              </div>
              <div className="text-neutral-500 text-[11px]">
                AWS Certified Solutions Architect (Professional) · Certified Kubernetes Administrator (CKA)
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono-tabular text-neutral-500">Confidential · Senior Review</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Bio
          </button>
        </div>
      </div>
    </div>
  );
};
