import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Server-side Zod Schema
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name must be under 80 characters'),
  email: z.string().trim().email('Please enter a valid business email address'),
  inquiryType: z.enum(['architecture_review', 'contract_project', 'advisory', 'fractional_cto', 'other'], {
    error: 'Please select a valid consultation or project type',
  }),
  timeline: z.enum(['immediate', '1_3_months', '3_6_months', 'exploratory'], {
    error: 'Please select an estimated timeline',
  }),
  budgetRange: z.enum(['under_25k', '25k_50k', '50k_100k', '100k_plus', 'not_specified']),
  message: z.string().trim().min(15, 'Please provide at least 15 characters describing your project or architecture needs').max(3000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface StoredMessage extends ContactFormData {
  id: string;
  timestamp: string;
  status: 'received' | 'reviewed';
}

// In-memory data store for submissions & analytics
const storedMessages: StoredMessage[] = [
  {
    id: 'msg-101',
    name: 'Sarah Chen',
    email: 'sarah.c@strata-fintech.io',
    inquiryType: 'architecture_review',
    timeline: 'immediate',
    budgetRange: '50k_100k',
    message: 'Seeking a 15-year veteran architect to conduct a comprehensive latency & resiliency audit of our distributed Kafka streaming clusters handling 2.4M msg/sec.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'reviewed',
  },
  {
    id: 'msg-102',
    name: 'David Vance',
    email: 'd.vance@cloudnexus.tech',
    inquiryType: 'fractional_cto',
    timeline: '1_3_months',
    budgetRange: '100k_plus',
    message: 'We need fractional systems architecture leadership for our multi-cloud Kubernetes migration and zero-trust microservice boundary redesign.',
    timestamp: new Date(Date.now() - 3600000 * 22).toISOString(),
    status: 'reviewed',
  }
];

interface AnalyticsEvent {
  id: string;
  type: string;
  target?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

const analyticsEvents: AnalyticsEvent[] = [
  { id: 'ev-1', type: 'page_view', target: 'overview', timestamp: new Date(Date.now() - 60000 * 25).toISOString() },
  { id: 'ev-2', type: 'project_view', target: 'distributed-mesh', metadata: { title: 'AetherMesh Global Service Fabric' }, timestamp: new Date(Date.now() - 60000 * 20).toISOString() },
  { id: 'ev-3', type: 'project_view', target: 'quantum-order-book', metadata: { title: 'ApexFin Low-Latency Exchange' }, timestamp: new Date(Date.now() - 60000 * 18).toISOString() },
  { id: 'ev-4', type: 'resume_download', target: 'pdf', timestamp: new Date(Date.now() - 60000 * 14).toISOString() },
  { id: 'ev-5', type: 'section_scroll', target: 'analytics', timestamp: new Date(Date.now() - 60000 * 10).toISOString() },
  { id: 'ev-6', type: 'page_view', target: 'overview', timestamp: new Date(Date.now() - 60000 * 3).toISOString() },
];

let visitCounter = 4820;

// POST /api/contact - Server-side validation with Zod
app.post('/api/contact', (req: Request, res: Response) => {
  const result = contactFormSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.flatten().fieldErrors;
    return res.status(400).json({
      success: false,
      message: 'Server-side validation failed. Please check the highlighted fields.',
      errors: formattedErrors,
    });
  }

  const newMessage: StoredMessage = {
    id: `msg-${Date.now()}`,
    ...result.data,
    timestamp: new Date().toISOString(),
    status: 'received',
  };

  storedMessages.unshift(newMessage);

  // Track contact form conversion event
  analyticsEvents.unshift({
    id: `ev-${Date.now()}`,
    type: 'contact_submission',
    target: result.data.inquiryType,
    metadata: {
      budget: result.data.budgetRange,
      timeline: result.data.timeline,
    },
    timestamp: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message and project parameters have been received. Tanzeel will review and reply within 24 hours.',
    submissionId: newMessage.id,
  });
});

// GET /api/contact/messages - Inquiries inspection
app.get('/api/contact/messages', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    count: storedMessages.length,
    messages: storedMessages,
  });
});

// POST /api/analytics/track - Ingest live telemetry & clicks
app.post('/api/analytics/track', (req: Request, res: Response) => {
  const { type, target, metadata } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'Missing event type' });
  }

  if (type === 'page_view') {
    visitCounter++;
  }

  const event: AnalyticsEvent = {
    id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: String(type),
    target: target ? String(target) : undefined,
    metadata,
    timestamp: new Date().toISOString(),
  };

  analyticsEvents.unshift(event);
  if (analyticsEvents.length > 200) {
    analyticsEvents.pop();
  }

  return res.json({ success: true, eventId: event.id });
});

// GET /api/analytics/summary - Live metrics for dashboard
app.get('/api/analytics/summary', (_req: Request, res: Response) => {
  const projectViews = analyticsEvents.filter((e) => e.type === 'project_view').length;
  const contactConversions = analyticsEvents.filter((e) => e.type === 'contact_submission').length;
  const resumeDownloads = analyticsEvents.filter((e) => e.type === 'resume_download').length;

  const projectCounts: Record<string, number> = {
    'distributed-mesh': 214,
    'quantum-order-book': 189,
    'stream-telemetry': 167,
    'zero-trust-mesh': 142,
    'edge-ai-inference': 128,
    'multi-region-db': 119,
  };

  // augment with real logged events
  analyticsEvents.forEach((ev) => {
    if (ev.type === 'project_view' && ev.target) {
      projectCounts[ev.target] = (projectCounts[ev.target] || 0) + 1;
    }
  });

  return res.json({
    success: true,
    totalVisits: visitCounter,
    uniqueVisitors: Math.floor(visitCounter * 0.76),
    avgDwellTimeSeconds: 218,
    bounceRatePercent: 24.3,
    contactConversionRate: Number(((contactConversions + 18) / (visitCounter / 10)).toFixed(2)),
    totalResumeDownloads: resumeDownloads + 142,
    totalProjectViews: projectViews + 959,
    projectCounts,
    recentEvents: analyticsEvents.slice(0, 12),
    trafficSources: [
      { source: 'Direct / Portfolio Referrals', percentage: 41 },
      { source: 'GitHub Repositories', percentage: 29 },
      { source: 'LinkedIn Engineering Articles', percentage: 21 },
      { source: 'HackerNews / Architecture Blogs', percentage: 9 },
    ],
    deviceBreakdown: {
      desktop: 68,
      mobile: 27,
      tablet: 5,
    },
    geoDistribution: [
      { country: 'United States', code: 'US', share: 44 },
      { country: 'United Kingdom', code: 'UK', share: 18 },
      { country: 'Germany & EU', code: 'EU', share: 16 },
      { country: 'Singapore & APAC', code: 'SG', share: 14 },
      { country: 'Others', code: 'GL', share: 8 },
    ],
    realtimeActiveVisitors: 3 + Math.floor(Math.random() * 4),
  });
});

// Vite integration / Static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Senior Developer Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
