export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'distributed' | 'cloud' | 'streaming' | 'ai_systems';
  categoryLabel: string;
  year: string;
  clientOrDomain: string;
  summary: string;
  problemStatement: string;
  architectureSolution: string;
  keyMetrics: { label: string; value: string }[];
  techStack: string[];
  engineeringDecisions: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  systemTopology: {
    nodes: string[];
    throughput: string;
    latency: string;
  };
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  organizationType: string;
  location: string;
  scaleMetric: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    yearsOfExperience: number;
    depthLevel: 'Expert / Staff' | 'Advanced' | 'Proficient';
    notableUse: string;
  }[];
}

export interface AnalyticsSummary {
  success: boolean;
  totalVisits: number;
  uniqueVisitors: number;
  avgDwellTimeSeconds: number;
  bounceRatePercent: number;
  contactConversionRate: number;
  totalResumeDownloads: number;
  totalProjectViews: number;
  projectCounts: Record<string, number>;
  recentEvents: {
    id: string;
    type: string;
    target?: string;
    metadata?: Record<string, any>;
    timestamp: string;
  }[];
  trafficSources: { source: string; percentage: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  geoDistribution: { country: string; code: string; share: number }[];
  realtimeActiveVisitors: number;
}
