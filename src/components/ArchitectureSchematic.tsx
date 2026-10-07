import React, { useState, useEffect } from 'react';
import { Network, Activity, ShieldCheck, Cpu, Database, Server, RefreshCw } from 'lucide-react';

interface ArchitectureSchematicProps {
  projectId: string;
  className?: string;
  interactive?: boolean;
}

export const ArchitectureSchematic: React.FC<ArchitectureSchematicProps> = ({
  projectId,
  className = '',
  interactive = false,
}) => {
  const [pulseTick, setPulseTick] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [simulatedLoad, setSimulatedLoad] = useState(78);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  if (projectId === 'distributed-mesh') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 ${className}`}>
        {/* Schematic Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Mesh Ingress & eBPF Routing Topology
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-tabular text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>28 POPs Active</span>
            </span>
            <span className="text-neutral-500">·</span>
            <span>p99: 3.8ms</span>
          </div>
        </div>

        {/* SVG Mesh Diagram */}
        <div className="relative h-44 w-full">
          <svg className="w-full h-full" viewBox="0 0 540 160" fill="none">
            {/* Background Grid */}
            <pattern id="grid-mesh" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="540" height="160" fill="url(#grid-mesh)" />

            {/* Connecting Lines */}
            <line x1="80" y1="80" x2="200" y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="80" y1="80" x2="200" y2="115" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="200" y1="45" x2="340" y2="80" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
            <line x1="200" y1="115" x2="340" y2="80" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
            <line x1="340" y1="80" x2="460" y2="45" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
            <line x1="340" y1="80" x2="460" y2="115" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />

            {/* Ingress Edge */}
            <g transform="translate(45, 60)" className="cursor-pointer" onClick={() => setSelectedNode('Ingress')}>
              <rect width="70" height="40" rx="6" fill="#171717" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="35" y="24" fill="#f5f5f5" fontSize="10" fontWeight="600" textAnchor="middle">Anycast DNS</text>
            </g>

            {/* eBPF Proxies */}
            <g transform="translate(165, 25)" className="cursor-pointer" onClick={() => setSelectedNode('eBPF Ingress')}>
              <rect width="75" height="38" rx="6" fill="#171717" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="37" y="23" fill="#93c5fd" fontSize="9.5" fontWeight="600" textAnchor="middle">eBPF Ring 1</text>
            </g>
            <g transform="translate(165, 95)" className="cursor-pointer" onClick={() => setSelectedNode('eBPF Ingress')}>
              <rect width="75" height="38" rx="6" fill="#171717" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="37" y="23" fill="#93c5fd" fontSize="9.5" fontWeight="600" textAnchor="middle">eBPF Ring 2</text>
            </g>

            {/* Raft Control Plane */}
            <g transform="translate(305, 60)" className="cursor-pointer" onClick={() => setSelectedNode('Raft Plane')}>
              <rect width="75" height="42" rx="6" fill="#1e1e2e" stroke="#38bdf8" strokeWidth="2" />
              <text x="37" y="25" fill="#e0f2fe" fontSize="10" fontWeight="700" textAnchor="middle">Raft Plane</text>
            </g>

            {/* Regional Clusters */}
            <g transform="translate(425, 25)">
              <rect width="80" height="38" rx="6" fill="#171717" stroke="#34d399" strokeWidth="1.5" />
              <text x="40" y="23" fill="#6ee7b7" fontSize="9.5" fontWeight="600" textAnchor="middle">US-East Pods</text>
            </g>
            <g transform="translate(425, 95)">
              <rect width="80" height="38" rx="6" fill="#171717" stroke="#34d399" strokeWidth="1.5" />
              <text x="40" y="23" fill="#6ee7b7" fontSize="9.5" fontWeight="600" textAnchor="middle">EU-West Pods</text>
            </g>

            {/* Animated Traffic Particle */}
            <circle cx={100 + (pulseTick * 3.4) % 340} cy={80 + Math.sin(pulseTick * 0.3) * 15} r="3" fill="#38bdf8" />
          </svg>
        </div>

        {interactive && (
          <div className="mt-2 pt-2 border-t border-neutral-800 text-xs flex items-center justify-between text-neutral-400">
            <span>Click any node to inspect telemetry</span>
            <span className="font-mono-tabular text-sky-400">{selectedNode ? `Inspecting: ${selectedNode}` : 'Live Telemetry Stable'}</span>
          </div>
        )}
      </div>
    );
  }

  if (projectId === 'quantum-order-book') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 ${className}`}>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              L3 Deterministic Matcher & Ring Buffer
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-tabular text-neutral-400">
            <span className="text-emerald-400">8.4 μs Latency</span>
            <span className="text-neutral-500">·</span>
            <span>4.8M msg/sec</span>
          </div>
        </div>

        {/* Depth & Buffer Visual */}
        <div className="grid grid-cols-2 gap-4 h-44 items-center">
          <div className="space-y-1.5 font-mono-tabular text-xs">
            <div className="text-[10px] text-neutral-500 uppercase font-semibold">Bids (Aggressive Queue)</div>
            <div className="flex justify-between items-center bg-emerald-950/40 border border-emerald-900/50 px-2 py-1 rounded">
              <span className="text-emerald-400">64,281.50</span>
              <span className="text-neutral-300">14.820 BTC</span>
            </div>
            <div className="flex justify-between items-center bg-emerald-950/30 px-2 py-1 rounded">
              <span className="text-emerald-400">64,280.00</span>
              <span className="text-neutral-400">28.450 BTC</span>
            </div>
            <div className="text-[10px] text-neutral-500 uppercase font-semibold pt-1">Asks (Liquidity Depth)</div>
            <div className="flex justify-between items-center bg-rose-950/40 border border-rose-900/50 px-2 py-1 rounded">
              <span className="text-rose-400">64,282.00</span>
              <span className="text-neutral-300">9.140 BTC</span>
            </div>
            <div className="flex justify-between items-center bg-rose-950/30 px-2 py-1 rounded">
              <span className="text-rose-400">64,283.50</span>
              <span className="text-neutral-400">32.100 BTC</span>
            </div>
          </div>

          <div className="bg-neutral-950/80 rounded-lg p-3 border border-neutral-800 text-xs font-mono-tabular flex flex-col justify-between h-full">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold flex items-center justify-between">
              <span>Disruptor Ring Buffer</span>
              <span className="text-emerald-400">Zero GC</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">Sequence Cursor</span>
                <span className="text-neutral-200">#491,082,104</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">Cache Invalidation</span>
                <span className="text-emerald-400">0.00%</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">Thread Affinity</span>
                <span className="text-neutral-200">Core 3 (Pinned)</span>
              </div>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${60 + (pulseTick % 30)}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'stream-telemetry') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 ${className}`}>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Kafka Sharding to ClickHouse Ingestion Engine
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono-tabular text-neutral-400">
            <span className="text-purple-400">8.5M Evt/Sec</span>
            <span className="text-neutral-500">·</span>
            <span>9.2:1 Compression</span>
          </div>
        </div>

        <div className="h-44 flex flex-col justify-between">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Agents</div>
              <div className="font-semibold text-neutral-200 mt-1">45,000+</div>
              <div className="text-[9.5px] text-neutral-400 mt-0.5">Raw Ingress</div>
            </div>
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-purple-900/40">
              <div className="text-[10px] text-neutral-500 uppercase">Kafka</div>
              <div className="font-semibold text-purple-300 mt-1">64 Topics</div>
              <div className="text-[9.5px] text-neutral-400 mt-0.5">Partition Mesh</div>
            </div>
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
              <div className="text-[10px] text-neutral-500 uppercase">Go Aggregator</div>
              <div className="font-semibold text-neutral-200 mt-1">Sliding Win</div>
              <div className="text-[9.5px] text-neutral-400 mt-0.5">Arrow Format</div>
            </div>
            <div className="bg-neutral-950 p-2.5 rounded-lg border border-emerald-900/40">
              <div className="text-[10px] text-neutral-500 uppercase">ClickHouse</div>
              <div className="font-semibold text-emerald-400 mt-1">380ms Scan</div>
              <div className="text-[9.5px] text-neutral-400 mt-0.5">Petabyte Core</div>
            </div>
          </div>

          <div className="bg-neutral-950/70 p-3 rounded-lg border border-neutral-800/80 font-mono-tabular text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-neutral-500 animate-spin" />
              <span className="text-neutral-400">Batch Buffer State: Flush interval 250ms</span>
            </div>
            <span className="text-emerald-400 font-medium">99.999% Durability</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback architectural blueprint for other projects
  return (
    <div className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 p-5 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
        <div className="flex items-center gap-2">
          {projectId === 'zero-trust-mesh' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ) : projectId === 'edge-ai-inference' ? (
            <Cpu className="w-4 h-4 text-amber-400" />
          ) : (
            <Database className="w-4 h-4 text-sky-400" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            System Topology Blueprint
          </span>
        </div>
        <span className="text-xs font-mono-tabular text-neutral-400">Production Verified</span>
      </div>

      <div className="h-44 flex flex-col justify-center items-center text-center p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/60">
        <div className="w-12 h-12 rounded-full bg-neutral-800/70 border border-neutral-700/80 flex items-center justify-center mb-3">
          <Activity className="w-6 h-6 text-sky-400" />
        </div>
        <h4 className="text-sm font-semibold text-neutral-200">High-Concurrency Distributed Architecture</h4>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm">
          Fault-tolerant state replication, automatic boundary fencing, and deterministic recovery.
        </p>
      </div>
    </div>
  );
};
