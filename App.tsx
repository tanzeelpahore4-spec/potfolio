import React, { useState } from 'react';
import {
  Mail,
  Settings2,
  Check,
  X,
  ExternalLink,
  Send,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Database,
  TrendingUp,
  FileSpreadsheet,
  Share2,
  Copy,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  Linkedin,
  Download
} from 'lucide-react';

interface SampleLead {
  company: string;
  domain: string;
  industry: string;
  location: string;
  headcount: string;
  contactName: string;
  title: string;
  email: string;
  linkedin: string;
  status: 'Verified (99.8%)' | 'SMTP Valid' | 'Catch-All Safe';
}

export default function App() {
  const DEFAULT_FB_URL = 'https://www.facebook.com/profile.php?id=61594253950017&sk=about';
  const DEFAULT_INSTA_URL = 'https://www.instagram.com/tanzeel_bilal07/';
  const DEFAULT_LINKEDIN_URL = 'https://www.linkedin.com/in/tanzeel-bilal';

  // Social Links state (persisted in localStorage)
  const [facebookUrl, setFacebookUrl] = useState(() => {
    return localStorage.getItem('tanzeel_fb_url') || DEFAULT_FB_URL;
  });
  const [instagramUrl, setInstagramUrl] = useState(() => {
    return localStorage.getItem('tanzeel_insta_url') || DEFAULT_INSTA_URL;
  });
  const [linkedinUrl, setLinkedinUrl] = useState(() => {
    const saved = localStorage.getItem('tanzeel_linkedin_url');
    if (saved && saved !== 'https://www.linkedin.com/in/tanzeel-ahmad-leadgen') {
      return saved;
    }
    return DEFAULT_LINKEDIN_URL;
  });

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [tempFb, setTempFb] = useState(facebookUrl);
  const [tempInsta, setTempInsta] = useState(instagramUrl);
  const [tempLinkedin, setTempLinkedin] = useState(linkedinUrl);
  const [saveToast, setSaveToast] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  // Sample Leads viewer state
  const [activeIndustryFilter, setActiveIndustryFilter] = useState<string>('all');
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  // Direct Contact message state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderService, setSenderService] = useState('B2B Lead Generation & Prospecting');
  const [senderMessage, setSenderMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Handle saving social links
  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanFb = tempFb.trim();
    let cleanInsta = tempInsta.trim();
    let cleanLinkedin = tempLinkedin.trim();

    if (cleanFb && !cleanFb.startsWith('http://') && !cleanFb.startsWith('https://')) {
      cleanFb = `https://${cleanFb}`;
    }
    if (cleanInsta && !cleanInsta.startsWith('http://') && !cleanInsta.startsWith('https://')) {
      cleanInsta = `https://${cleanInsta}`;
    }
    if (cleanLinkedin && !cleanLinkedin.startsWith('http://') && !cleanLinkedin.startsWith('https://')) {
      cleanLinkedin = `https://${cleanLinkedin}`;
    }

    setFacebookUrl(cleanFb);
    setInstagramUrl(cleanInsta);
    setLinkedinUrl(cleanLinkedin);
    localStorage.setItem('tanzeel_fb_url', cleanFb);
    localStorage.setItem('tanzeel_insta_url', cleanInsta);
    localStorage.setItem('tanzeel_linkedin_url', cleanLinkedin);

    setIsSocialModalOpen(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  // Copy portfolio link for LinkedIn / FB sharing
  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  // Handle direct inquiry send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    setMessageStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          inquiryType: 'contract_project',
          timeline: 'immediate',
          budgetRange: 'under_25k',
          message: `[Service: ${senderService}] ${senderMessage}`,
        }),
      });

      if (res.ok) {
        setMessageStatus('success');
        setSenderName('');
        setSenderEmail('');
        setSenderMessage('');
        setTimeout(() => {
          setIsMessageModalOpen(false);
          setMessageStatus('idle');
        }, 2200);
      } else {
        setMessageStatus('error');
      }
    } catch {
      setMessageStatus('error');
    }
  };

  const getDisplayValue = (url: string, defaultFallback: string) => {
    try {
      const clean = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      return clean || defaultFallback;
    } catch {
      return defaultFallback;
    }
  };

  // Anonymized sample leads for work proof with complete standard B2B columns
  const sampleLeads: SampleLead[] = [
    {
      company: 'Apex Cloud Solutions',
      domain: 'apexcloud.io',
      industry: 'SaaS & Cloud',
      location: 'Austin, TX, USA',
      headcount: '150-250',
      contactName: 'David K. Miller',
      title: 'VP of Engineering',
      email: 'd.miller@apexcloud.io',
      linkedin: 'https://linkedin.com/in/david-miller-apex',
      status: 'Verified (99.8%)'
    },
    {
      company: 'Vanguard Logistics Group',
      domain: 'vanguardlog.com',
      industry: 'Supply Chain',
      location: 'Chicago, IL, USA',
      headcount: '500-1000',
      contactName: 'Sarah Jenkins',
      title: 'Director of Procurement',
      email: 's.jenkins@vanguardlog.com',
      linkedin: 'https://linkedin.com/in/sarah-jenkins-logistics',
      status: 'Verified (99.8%)'
    },
    {
      company: 'Beacon FinTech Partners',
      domain: 'beaconfin.org',
      industry: 'FinTech',
      location: 'New York, NY, USA',
      headcount: '80-150',
      contactName: 'Marcus Thorne',
      title: 'Managing Director',
      email: 'm.thorne@beaconfin.org',
      linkedin: 'https://linkedin.com/in/marcus-thorne-fintech',
      status: 'SMTP Valid'
    },
    {
      company: 'Helios Real Estate Advisors',
      domain: 'heliosre.com',
      industry: 'Real Estate',
      location: 'Miami, FL, USA',
      headcount: '45-90',
      contactName: 'Elena Rostova',
      title: 'Head of Acquisitions',
      email: 'elena@heliosre.com',
      linkedin: 'https://linkedin.com/in/elena-rostova-re',
      status: 'Verified (99.8%)'
    },
    {
      company: 'Nordic Health Systems',
      domain: 'nordichealth.co',
      industry: 'HealthTech',
      location: 'Boston, MA, USA',
      headcount: '200-400',
      contactName: 'Alexander Lind',
      title: 'Chief Commercial Officer',
      email: 'a.lind@nordichealth.co',
      linkedin: 'https://linkedin.com/in/alex-lind-health',
      status: 'Verified (99.8%)'
    },
    {
      company: 'Lumina Digital Commerce',
      domain: 'luminad2c.com',
      industry: 'E-Commerce',
      location: 'London, UK',
      headcount: '60-120',
      contactName: 'Charlotte Vance',
      title: 'Founder & CMO',
      email: 'c.vance@luminad2c.com',
      linkedin: 'https://linkedin.com/in/charlotte-vance-ecom',
      status: 'Catch-All Safe'
    }
  ];

  const handleDownloadCSV = () => {
    const headers = 'Company Name,Website Domain,Industry,Headquarters,Company Size,Decision Maker,Job Title,Verified Email,LinkedIn URL,Verification Status\\n';
    const rows = sampleLeads.map(l =>
      `"${l.company}","${l.domain}","${l.industry}","${l.location}","${l.headcount}","${l.contactName}","${l.title}","${l.email}","${l.linkedin}","${l.status}"`
    ).join('\\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Tanzeel_Bilal_B2B_Prospect_List_Sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSamples = activeIndustryFilter === 'all'
    ? sampleLeads
    : sampleLeads.filter(l => l.industry.toLowerCase().includes(activeIndustryFilter.toLowerCase()));

  return (
    <>
      {/* Grain overlay for luxury editorial atmosphere */}
      <div className="grain" />

      {/* Top Notification Toast */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#131519] border border-[#c6a15b] text-[#ece7dc] px-4 py-3 rounded shadow-2xl flex items-center gap-3">
          <Check className="w-4 h-4 text-[#c6a15b]" />
          <span className="text-xs font-medium">Links kamyabi se update ho gaye hain!</span>
        </div>
      )}

      {copyToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#131519] border border-[#c6a15b] text-[#ece7dc] px-4 py-3 rounded shadow-2xl flex items-center gap-3">
          <Check className="w-4 h-4 text-[#c6a15b]" />
          <span className="text-xs font-medium">Portfolio link copy ho gaya! Ab LinkedIn ya Facebook par share karein.</span>
        </div>
      )}

      {/* Topbar */}
      <header className="topbar">
        <a href="#top" className="brand flex items-center gap-2">
          <span>T.<span className="brand-dot">B</span></span>
          <span className="hidden md:inline-block text-[11px] text-[#9a988f] font-sans font-normal tracking-wider pl-2 border-l border-[#202329]">
            B2B Lead Generation &amp; Digital Marketing
          </span>
        </a>
        <nav className="topnav items-center">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#samples">Samples</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>

          {/* Social Links Settings */}
          <button
            onClick={() => {
              setTempFb(facebookUrl);
              setTempInsta(instagramUrl);
              setTempLinkedin(linkedinUrl);
              setIsSocialModalOpen(true);
            }}
            className="text-xs uppercase tracking-wider text-[#c6a15b] hover:text-[#d9b878] border border-[rgba(198,161,91,0.35)] hover:border-[#c6a15b] px-2.5 py-1 rounded transition-colors ml-2 cursor-pointer flex items-center gap-1.5"
            title="Update Social Links"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Links</span>
          </button>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          {/* Availability Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="hero-index mb-0">01 — Introduction</div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(198,161,91,0.08)] border border-[rgba(198,161,91,0.25)] text-xs text-[#d9b878]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for B2B Lead Gen Contracts &amp; Remote Roles</span>
            </div>
          </div>

          <div className="hero-grid">
            <div className="hero-main">
              <p className="eyebrow">B2B Lead Generation Specialist &amp; Digital Marketing Strategist</p>
              <h1 className="hero-name">
                Tanzeel<br />Bilal
              </h1>
              <p className="hero-tagline">
                <em>researching the businesses that matter</em>
              </p>

              {/* Quick Profile Badges for Social Media visitors */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[rgba(198,161,91,0.15)] text-xs text-[#9a988f]">
                <span>Multan, Pakistan</span>
                <span className="text-[#c6a15b]">·</span>
                <span>Global Remote Delivery</span>
                <span className="text-[#c6a15b]">·</span>
                <span className="text-[#ece7dc] font-medium">98%+ Deliverability Standard</span>
              </div>
            </div>

            <div className="hero-side">
              <p className="hero-intro">
                I help B2B companies, agencies, and entrepreneurs build targeted prospect pipelines that convert.
                From laser-focused list building and verified C-Suite prospecting to data-driven Meta ad campaigns,
                I treat every outreach project as an evidence-based research initiative.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn btn-solid">
                  Hire / Get in Touch
                </a>
                <a href="#samples" className="btn btn-outline">
                  View Sample Lists
                </a>
                <button
                  onClick={handleCopyShareLink}
                  className="btn btn-outline gap-1.5 cursor-pointer"
                  title="Copy portfolio link to share on LinkedIn or Facebook"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Share Profile</span>
                </button>
              </div>

              {/* Direct Social Links bar */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#202329] text-xs">
                <span className="text-[#9a988f]">Connect:</span>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c6a15b] hover:text-[#d9b878] transition-colors"
                >
                  Facebook
                </a>
                <span className="text-[#202329]">/</span>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c6a15b] hover:text-[#d9b878] transition-colors"
                >
                  Instagram
                </a>
                <span className="text-[#202329]">/</span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c6a15b] hover:text-[#d9b878] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Value Metrics Band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-[#202329]">
            <div className="p-4 rounded bg-[#131519] border border-[#202329]">
              <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Deliverability</span>
              </div>
              <div className="text-2xl font-semibold font-display text-[#ece7dc] mt-1.5">98%+ Guaranteed</div>
              <p className="text-[11px] text-[#9a988f] mt-1">Multi-step SMTP &amp; MX verification</p>
            </div>

            <div className="p-4 rounded bg-[#131519] border border-[#202329]">
              <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Decision Makers</span>
              </div>
              <div className="text-2xl font-semibold font-display text-[#ece7dc] mt-1.5">C-Suite &amp; Founders</div>
              <p className="text-[11px] text-[#9a988f] mt-1">Direct verified business emails</p>
            </div>

            <div className="p-4 rounded bg-[#131519] border border-[#202329]">
              <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                <span>Data Hygiene</span>
              </div>
              <div className="text-2xl font-semibold font-display text-[#ece7dc] mt-1.5">Zero Duplication</div>
              <p className="text-[11px] text-[#9a988f] mt-1">Clean format ready for CRM import</p>
            </div>

            <div className="p-4 rounded bg-[#131519] border border-[#202329]">
              <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Turnaround SLA</span>
              </div>
              <div className="text-2xl font-semibold font-display text-[#ece7dc] mt-1.5">24 — 48 Hours</div>
              <p className="text-[11px] text-[#9a988f] mt-1">Rapid pipeline delivery</p>
            </div>
          </div>

          <div className="rule rule-hero" />
        </section>

        {/* SERVICES OFFERED */}
        <section className="section" id="services">
          <div className="section-head">
            <span className="section-index">02</span>
            <h2 className="section-title">Core Services &amp; Capabilities</h2>
          </div>
          <p className="section-note">
            <em>Specialized solutions designed to generate measurable revenue opportunities.</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded bg-[#131519] border border-[#202329] hover:border-[rgba(198,161,91,0.4)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#c6a15b] font-medium block mb-2">01. Service</span>
                <h3 className="text-xl font-medium font-display text-[#ece7dc] mb-3">
                  B2B Prospect List Building
                </h3>
                <p className="text-xs text-[#9a988f] leading-relaxed mb-4">
                  Custom targeted prospect sourcing tailored to your Ideal Customer Profile (ICP). Filtering by industry, headcount, revenue bracket, geography, and niche keywords.
                </p>
              </div>
              <ul className="text-xs text-[#ece7dc] space-y-1.5 pt-4 border-t border-[#202329]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Verified Work Emails &amp; LinkedIn URLs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Zero Generic "info@" Addresses</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded bg-[#131519] border border-[#202329] hover:border-[rgba(198,161,91,0.4)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#c6a15b] font-medium block mb-2">02. Service</span>
                <h3 className="text-xl font-medium font-display text-[#ece7dc] mb-3">
                  Lead Sourcing &amp; Net Listing
                </h3>
                <p className="text-xs text-[#9a988f] leading-relaxed mb-4">
                  Multi-channel prospect discovery leveraging LinkedIn Sales Navigator, Google Advanced Search Operators, business directories, and industry databases.
                </p>
              </div>
              <ul className="text-xs text-[#ece7dc] space-y-1.5 pt-4 border-t border-[#202329]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Decision-Maker Title Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Spam-Trap &amp; Hard-Bounce Scrubbing</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded bg-[#131519] border border-[#202329] hover:border-[rgba(198,161,91,0.4)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#c6a15b] font-medium block mb-2">03. Service</span>
                <h3 className="text-xl font-medium font-display text-[#ece7dc] mb-3">
                  Digital Marketing &amp; Meta Ads
                </h3>
                <p className="text-xs text-[#9a988f] leading-relaxed mb-4">
                  End-to-end campaign structuring across Meta Business Suite (Facebook &amp; Instagram Ads). Audience targeting, creative A/B testing, and conversion tracking.
                </p>
              </div>
              <ul className="text-xs text-[#ece7dc] space-y-1.5 pt-4 border-t border-[#202329]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>Laser-Focused Lookalike &amp; Custom Audiences</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a15b]" />
                  <span>SEO &amp; Content Distribution Basics</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rule" />
        </section>

        {/* WORK SAMPLES & DELIVERABLES */}
        <section className="section" id="samples">
          <div className="section-head flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="section-index">03</span>
              <h2 className="section-title">Sample Deliverable Format</h2>
            </div>
            <div className="text-xs text-[#9a988f]">
              <span className="text-[#c6a15b]">Standard:</span> Clean, CRM-Ready Google Sheets / CSV
            </div>
          </div>
          <p className="section-note">
            <em>Interactive preview showing standard prospecting data structure and accuracy metrics.</em>
          </p>

          <div className="rounded bg-[#131519] border border-[#202329] overflow-hidden">
            <div className="p-4 bg-[#0c0d10] border-b border-[#202329] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#c6a15b]" />
                <span className="font-medium text-[#ece7dc]">Standard B2B Deliverable Prospect List (CRM Ready)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#9a988f]">Filter:</span>
                {['all', 'SaaS', 'Supply Chain', 'FinTech', 'Real Estate', 'E-Commerce'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveIndustryFilter(tab)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      activeIndustryFilter === tab
                        ? 'bg-[#c6a15b] text-[#0c0d10] font-semibold'
                        : 'text-[#9a988f] hover:text-[#ece7dc] border border-[#202329]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={handleDownloadCSV}
                  className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#131519] border border-[rgba(198,161,91,0.35)] hover:border-[#c6a15b] text-[#c6a15b] hover:text-[#d9b878] rounded text-[11px] transition-colors cursor-pointer"
                  title="Download sample spreadsheet as CSV"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Sample CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#202329] text-[#c6a15b] uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 font-medium">Company &amp; Domain</th>
                    <th className="p-3.5 font-medium">Industry &amp; Headcount</th>
                    <th className="p-3.5 font-medium">Location (HQ)</th>
                    <th className="p-3.5 font-medium">Decision Maker</th>
                    <th className="p-3.5 font-medium">Job Title</th>
                    <th className="p-3.5 font-medium">Verified Email</th>
                    <th className="p-3.5 font-medium">LinkedIn</th>
                    <th className="p-3.5 font-medium">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#202329]">
                  {filteredSamples.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="p-3.5 font-medium text-[#ece7dc]">
                        <div>{row.company}</div>
                        <a
                          href={`https://${row.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#c6a15b] hover:underline flex items-center gap-0.5 mt-0.5"
                        >
                          <span>{row.domain}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                      <td className="p-3.5 text-[#9a988f]">
                        <div className="text-[#ece7dc]">{row.industry}</div>
                        <span className="text-[10px] text-[#9a988f]">{row.headcount} emp</span>
                      </td>
                      <td className="p-3.5 text-[#9a988f]">{row.location}</td>
                      <td className="p-3.5 text-[#ece7dc] font-medium">{row.contactName}</td>
                      <td className="p-3.5 text-[#9a988f]">{row.title}</td>
                      <td className="p-3.5 font-mono text-emerald-400/90">{row.email}</td>
                      <td className="p-3.5">
                        <a
                          href={row.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#c6a15b] hover:text-[#d9b878]"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>Profile</span>
                        </a>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#c6a15b] bg-[rgba(198,161,91,0.1)] px-2 py-0.5 rounded border border-[rgba(198,161,91,0.25)]">
                          <Check className="w-2.5 h-2.5" />
                          <span>{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#0c0d10] border-t border-[#202329] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9a988f]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>100% Manual &amp; Automated Cross-Verification · Zero Honeypot Guarantee</span>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="text-[#c6a15b] hover:text-[#d9b878] flex items-center gap-1 cursor-pointer"
              >
                <span>Request Custom Sample for Your Specific ICP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="rule" />
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section-head">
            <span className="section-index">04</span>
            <h2 className="section-title">About &amp; Career Objective</h2>
          </div>
          <div className="about-grid">
            <div className="about-summary">
              <p className="lede">
                I'm a Multan-based professional in Digital Marketing &amp; Lead Generation, combining my
                Intermediate in Computer Science with practical, research-backed demand generation.
              </p>
              <p>
                My interest sits at the intersection of research and outreach — reading a market before writing to
                it. I spend my time building verified prospect lists, studying ad performance, and learning the tools that
                turn scattered data into a working pipeline. I'm deliberate about execution: every skill I pick up gets
                tested on a real list, a real page, or a real campaign brief before I call it learned.
              </p>
              <p>
                Whether partnering with marketing agencies, international SaaS startups, or e-commerce brands, I maintain
                strict data hygiene standards and zero tolerance for generic spam lists.
              </p>
            </div>
            <div className="quote-box">
              <span className="quote-mark">&ldquo;</span>
              <p className="quote-text">
                To become a dependable lead generation and digital marketing professional — one who
                finds the right businesses, understands what they need, and helps them grow through
                research-driven outreach and honest marketing.
              </p>
              <span className="quote-label">Professional Objective</span>
            </div>
          </div>
          <div className="rule" />
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="section-head">
            <span className="section-index">05</span>
            <h2 className="section-title">Technical Skills &amp; Stack</h2>
          </div>
          <p className="section-note">
            <em>Tools and disciplines currently in daily professional practice.</em>
          </p>
          <div className="skills-grid">
            <div className="skill-group">
              <h3 className="skill-group-title">Net Listing &amp; Lead Generation</h3>
              <div className="chips">
                <span className="chip">Lead Prospecting</span>
                <span className="chip">B2B List Building</span>
                <span className="chip">Cold Email Outreach</span>
                <span className="chip">CRM Data Entry</span>
                <span className="chip">LinkedIn Sales Navigator</span>
                <span className="chip">Email Verification</span>
                <span className="chip">Apollo.io Sourcing</span>
                <span className="chip">Boolean Search Queries</span>
                <span className="chip">ICP &amp; TAM Mapping</span>
                <span className="chip">Account-Based Prospecting (ABM)</span>
                <span className="chip">Data Scrubbing &amp; De-duplication</span>
                <span className="chip">Catch-All Email Testing</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">Digital Marketing</h3>
              <div className="chips">
                <span className="chip">Facebook &amp; Instagram Ads</span>
                <span className="chip">Audience Segmentation &amp; Lookalikes</span>
                <span className="chip">Meta Pixel &amp; Conversion API (CAPI)</span>
                <span className="chip">SEO Fundamentals</span>
                <span className="chip">Lead Generation Funnels</span>
                <span className="chip">Cold Email Copywriting</span>
                <span className="chip">Content Marketing</span>
                <span className="chip">Email Marketing</span>
                <span className="chip">A/B Creative Testing</span>
                <span className="chip">Market Research &amp; Competitor Analysis</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group-title">Tools &amp; Platforms</h3>
              <div className="chips">
                <span className="chip">LinkedIn Sales Navigator</span>
                <span className="chip">Apollo.io</span>
                <span className="chip">Google Sheets (Advanced)</span>
                <span className="chip">Meta Business Suite</span>
                <span className="chip">Hunter.io</span>
                <span className="chip">NeverBounce</span>
                <span className="chip">ZeroBounce</span>
                <span className="chip">ChatGPT (AI Prompt Engineering)</span>
                <span className="chip">Canva Pro</span>
                <span className="chip">Lusha</span>
                <span className="chip">HubSpot CRM</span>
                <span className="chip">Notion Databases</span>
              </div>
            </div>
          </div>
          <div className="rule" />
        </section>

        {/* EDUCATION */}
        <section className="section" id="education">
          <div className="section-head">
            <span className="section-index">06</span>
            <h2 className="section-title">Education &amp; Training</h2>
          </div>
          <ol className="timeline">
            <li className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-dot timeline-dot-active" />
              </div>
              <div className="timeline-content">
                <div className="timeline-top">
                  <h3 className="timeline-title">
                    Intermediate — ICS <span className="badge">Currently Studying</span>
                  </h3>
                </div>
                <p className="timeline-meta">Computer Science · Multan Region</p>
              </div>
            </li>
            <li className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">Digital Marketing</h3>
                <p className="timeline-meta">
                  Applied training in B2B lead generation, digital marketing fundamentals, and campaign analytics tools
                </p>
              </div>
            </li>
          </ol>
          <div className="rule" />
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="section-head flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="section-index">07</span>
              <h2 className="section-title">Contact &amp; Connect</h2>
            </div>
            <button
              onClick={() => {
                setTempFb(facebookUrl);
                setTempInsta(instagramUrl);
                setTempLinkedin(linkedinUrl);
                setIsSocialModalOpen(true);
              }}
              className="text-xs text-[#c6a15b] hover:text-[#d9b878] flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Change Insta / FB / LinkedIn Links</span>
            </button>
          </div>
          <p className="section-note">
            <em>Open to freelance projects, agency contracts, and remote collaborations.</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Email Card */}
            <a className="contact-card" href="mailto:tanzeelpahore4@gmail.com">
              <div className="contact-card-inner">
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path d="M4 6.5L12 13L20 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">tanzeelpahore4@gmail.com</span>
                </div>
                <span className="contact-visit">Visit</span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              className="contact-card group"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card-inner">
                <span className="contact-icon" aria-hidden="true">
                  <Linkedin className="w-4 h-4 text-[#c6a15b]" />
                </span>
                <div className="contact-text">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">{getDisplayValue(linkedinUrl, 'linkedin.com/in/tanzeel-bilal')}</span>
                </div>
                <span className="contact-visit">Visit</span>
              </div>
            </a>

            {/* Facebook Card */}
            <a
              className="contact-card group"
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card-inner">
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 8.5H16.5V5H14C11.7909 5 10 6.79086 10 9V11.5H8V15H10V21H13.5V15H16L16.5 11.5H13.5V9C13.5 8.72386 13.7239 8.5 14 8.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="contact-text">
                  <span className="contact-label">Facebook</span>
                  <span className="contact-value">{getDisplayValue(facebookUrl, 'facebook.com/profile.php?id=61594253950017')}</span>
                </div>
                <span className="contact-visit">Visit</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              className="contact-card group"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card-inner">
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
                  </svg>
                </span>
                <div className="contact-text">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">{getDisplayValue(instagramUrl, 'instagram.com/tanzeel_bilal07')}</span>
                </div>
                <span className="contact-visit">Visit</span>
              </div>
            </a>
          </div>

          {/* Quick Message / Direct Collaboration Form Box */}
          <div className="mt-8 p-6 sm:p-8 rounded bg-[#131519] border border-[#202329] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#ece7dc] font-display">
                Need high-accuracy prospect lists or campaign execution?
              </h3>
              <p className="text-xs text-[#9a988f]">
                Send your targeting criteria (Industry, Title, Target Location) directly to Tanzeel.
              </p>
            </div>
            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="btn btn-solid text-xs py-2.5 px-6 cursor-pointer whitespace-nowrap"
            >
              Send Direct Inquiry
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="rule" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-[#9a988f]">
            <p className="m-0 text-center sm:text-left">
              Tanzeel Bilal <span className="footer-sep">·</span> <em>researching the businesses that matter</em>
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyShareLink}
                className="text-[#c6a15b] hover:text-[#d9b878] flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Shareable URL</span>
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal: Change Instagram, Facebook & LinkedIn Links */}
      {isSocialModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-md bg-[#131519] border border-[#202329] rounded p-6 shadow-2xl text-[#ece7dc]">
            <div className="flex items-center justify-between pb-4 border-b border-[#202329] mb-5">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[#c6a15b]" />
                <h3 className="text-base font-semibold font-display">Social Links Update Karein</h3>
              </div>
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className="text-[#9a988f] hover:text-[#ece7dc] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-4">
              <div>
                <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                  Facebook Profile Link
                </label>
                <input
                  type="text"
                  placeholder="https://facebook.com/your-username"
                  value={tempFb}
                  onChange={(e) => setTempFb(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                  Instagram Profile Link
                </label>
                <input
                  type="text"
                  placeholder="https://instagram.com/your-username"
                  value={tempInsta}
                  onChange={(e) => setTempInsta(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                  LinkedIn Profile Link
                </label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/your-username"
                  value={tempLinkedin}
                  onChange={(e) => setTempLinkedin(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#202329] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSocialModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#9a988f] hover:text-[#ece7dc] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-solid text-xs py-2 px-5 cursor-pointer"
                >
                  Save Links
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Direct Contact Inquiry */}
      {isMessageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-lg bg-[#131519] border border-[#202329] rounded p-6 sm:p-8 shadow-2xl text-[#ece7dc]">
            <div className="flex items-center justify-between pb-4 border-b border-[#202329] mb-5">
              <div>
                <h3 className="text-lg font-bold font-display">Contact Tanzeel Bilal</h3>
                <p className="text-xs text-[#9a988f] mt-0.5">
                  Direct inquiry for B2B lead generation &amp; marketing projects
                </p>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="text-[#9a988f] hover:text-[#ece7dc] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {messageStatus === 'success' ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[rgba(198,161,91,0.15)] text-[#c6a15b] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold font-display">Inquiry Transmitted!</h4>
                <p className="text-xs text-[#9a988f]">
                  Thank you! Tanzeel will review your requirement and reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                {messageStatus === 'error' && (
                  <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded">
                    Message delivery error. Please email directly at tanzeelpahore4@gmail.com
                  </div>
                )}

                <div>
                  <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera (Growth Lead)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                    Your Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                    Service Required
                  </label>
                  <select
                    value={senderService}
                    onChange={(e) => setSenderService(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  >
                    <option value="B2B Lead Generation & Prospecting">B2B Lead Generation &amp; Prospecting</option>
                    <option value="C-Suite Verified List Building">C-Suite Verified List Building</option>
                    <option value="Meta (Facebook & Instagram) Ad Campaign">Meta (Facebook &amp; Instagram) Ad Campaign</option>
                    <option value="Data Cleaning & CRM Enrichment">Data Cleaning &amp; CRM Enrichment</option>
                    <option value="Other Consultation">Other Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#c6a15b] uppercase tracking-wider block font-medium mb-1">
                    Project Scope / Target Audience
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify target niche, desired job titles, geographic area, and volume of leads..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0c0d10] border border-[#202329] rounded text-[#ece7dc] focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                <div className="pt-3 border-t border-[#202329] flex items-center justify-between">
                  <span className="text-[11px] text-[#9a988f]">
                    Sent securely to tanzeelpahore4@gmail.com
                  </span>
                  <button
                    type="submit"
                    disabled={messageStatus === 'sending'}
                    className="btn btn-solid text-xs py-2 px-5 cursor-pointer disabled:opacity-50"
                  >
                    {messageStatus === 'sending' ? 'Transmitting...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
