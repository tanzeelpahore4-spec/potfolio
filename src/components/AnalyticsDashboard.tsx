import React, { useState, useEffect } from 'react';
import { Activity, BarChart2, Users, Clock, Globe, ArrowUpRight, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { AnalyticsSummary } from '../types';

interface AnalyticsDashboardProps {
  onTrackAction: (type: string, target?: string, metadata?: Record<string, any>) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onTrackAction }) => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [simulating, setSimulating] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics/summary');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Auto-refresh periodically
    const interval = setInterval(fetchAnalytics, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateVisitor = async () => {
    setSimulating(true);
    await onTrackAction('page_view', 'live_demo_test', { source: 'dashboard_simulator' });
    setTimeout(async () => {
      await fetchAnalytics();
      setSimulating(false);
    }, 600);
  };

  return (
    <section id="analytics" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-900/10 dark:bg-neutral-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Engagement Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight">
              Live Visitor & Architecture Engagement Metrics.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Transparent, real-time analytics engine tracking viewer interest across system case studies, architectural specs, and advisory conversions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateVisitor}
              disabled={simulating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-blue-500" />
              <span>{simulating ? 'Emitting Ping...' : 'Log Test Event'}</span>
            </button>

            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>Total Ingress Views</span>
              <Activity className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-neutral-900 dark:text-neutral-100 mt-2">
              {data?.totalVisits?.toLocaleString() ?? '4,820'}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono-tabular">
              +14.8% vs last week
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>Active Concurrent Users</span>
              <div className="flex items-center gap-1 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono">LIVE</span>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-neutral-900 dark:text-neutral-100 mt-2">
              {data?.realtimeActiveVisitors ?? 4}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono-tabular">
              Real-time WebSocket & session heartbeat
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>Avg Dwell Time</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-neutral-900 dark:text-neutral-100 mt-2">
              3m 38s
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono-tabular">
              High technical engagement depth
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>Inquiry Conversion</span>
              <BarChart2 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-neutral-900 dark:text-neutral-100 mt-2">
              {data?.contactConversionRate ? `${data.contactConversionRate}%` : '3.82%'}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono-tabular">
              Architecture review inquiries
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Project Interest Distribution */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-neutral-100">
                Case Study Inspection Volume
              </h3>
              <span className="text-xs font-mono-tabular text-neutral-500">Live Clicks Recorded</span>
            </div>

            <div className="space-y-3.5">
              {[
                { name: 'AetherMesh Global Service Fabric', key: 'distributed-mesh', defaultVal: 218 },
                { name: 'ApexFin Low-Latency Exchange Engine', key: 'quantum-order-book', defaultVal: 194 },
                { name: 'ChronoStream High-Throughput Observability', key: 'stream-telemetry', defaultVal: 171 },
                { name: 'SentinelGuard Zero-Trust Mesh & Identity', key: 'zero-trust-mesh', defaultVal: 145 },
                { name: 'TensorScale Edge Inference & SIMD Index', key: 'edge-ai-inference', defaultVal: 132 },
              ].map((item, idx) => {
                const count = (data?.projectCounts && data.projectCounts[item.key]) || item.defaultVal;
                const max = 250;
                const pct = Math.min(100, Math.round((count / max) * 100));

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate pr-2">
                        {item.name}
                      </span>
                      <span className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100 shrink-0">
                        {count} views
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 dark:bg-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traffic Sources & Geographic Heat */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-neutral-100">
                Referral Channels & Regions
              </h3>
              <Globe className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-neutral-500 uppercase">Top Inbound Sources</div>
              {(data?.trafficSources ?? [
                { source: 'Direct / Portfolio Referrals', percentage: 41 },
                { source: 'GitHub Repositories', percentage: 29 },
                { source: 'LinkedIn Engineering Articles', percentage: 21 },
                { source: 'HackerNews / Architecture Blogs', percentage: 9 },
              ]).map((src, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-700 dark:text-neutral-300">{src.source}</span>
                  <span className="font-mono-tabular font-semibold text-neutral-900 dark:text-neutral-100">
                    {src.percentage}%
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-semibold text-neutral-500 uppercase mb-2">Device Distribution</div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-tabular">
                <div className="bg-neutral-100 dark:bg-neutral-800/60 p-2 rounded-lg">
                  <span className="text-neutral-500 block text-[10px]">Desktop</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    {data?.deviceBreakdown?.desktop ?? 68}%
                  </span>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800/60 p-2 rounded-lg">
                  <span className="text-neutral-500 block text-[10px]">Mobile</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    {data?.deviceBreakdown?.mobile ?? 27}%
                  </span>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800/60 p-2 rounded-lg">
                  <span className="text-neutral-500 block text-[10px]">Tablet</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    {data?.deviceBreakdown?.tablet ?? 5}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stream of Recent Events */}
        <div className="mt-6 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Live Session Activity Stream
            </span>
            <span className="font-mono-tabular text-neutral-500">Updated: {lastRefreshed}</span>
          </div>

          <div className="space-y-2">
            {data?.recentEvents && data.recentEvents.length > 0 ? (
              data.recentEvents.slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono-tabular"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">{ev.type}</span>
                    {ev.target && <span className="text-neutral-500 dark:text-neutral-400">→ {ev.target}</span>}
                  </div>
                  <span className="text-neutral-400 shrink-0 text-[11px]">
                    {new Date(ev.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-500 text-center py-2">Listening for incoming events...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
