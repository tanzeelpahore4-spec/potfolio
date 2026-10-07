import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Telemetry event tracking
  const trackAction = useCallback(async (type: string, target?: string, metadata?: Record<string, any>) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, target, metadata }),
      });
    } catch (e) {
      // Telemetry failure should never disrupt UX
    }
  }, []);

  // Track initial page load
  useEffect(() => {
    trackAction('page_view', 'portfolio_root', { referrer: document.referrer || 'direct' });
  }, [trackAction]);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
    trackAction('click_nav_action', 'contact_scroll');
  };

  const handleOpenResume = () => {
    setResumeOpen(true);
    trackAction('resume_view', 'modal_open');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-150 selection:bg-blue-600 selection:text-white">
        {/* Navigation Bar adhering to Top Bar Contract */}
        <Navbar onOpenContact={handleOpenContact} onOpenResume={handleOpenResume} />

        {/* Main Content Area */}
        <main>
          {/* Hero Section */}
          <Hero
            onOpenContact={handleOpenContact}
            onOpenResume={handleOpenResume}
            onTrackAction={trackAction}
          />

          {/* Selected Works Bento Grid */}
          <ProjectsSection
            onSelectProject={setSelectedProject}
            onTrackAction={trackAction}
          />

          {/* 15-Year Experience Timeline */}
          <ExperienceTimeline />

          {/* Stack & Distributed Systems Mastery Matrix */}
          <ArchitectureMatrix />

          {/* Real-time Engagement Analytics Dashboard */}
          <AnalyticsDashboard onTrackAction={trackAction} />

          {/* Contact Section with React Hook Form + Zod Server Validation */}
          <ContactSection onTrackAction={trackAction} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Deep Dive Case Study Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onTrackAction={trackAction}
        />

        {/* Executive Bio / Resume Viewer Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          onTrackAction={trackAction}
        />
      </div>
    </ThemeProvider>
  );
}
