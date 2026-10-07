import { Project, ExperienceItem, SkillCategory } from '../types';

export const PORTFOLIO_OWNER = {
  name: 'Tanzeel Pahore',
  title: 'Principal Software Architect & Distributed Systems Engineer',
  yearsOfExperience: 15,
  location: 'San Francisco, CA & Remote Global',
  email: 'tanzeelpahore4@gmail.com',
  github: 'https://github.com/tanzeelpahore',
  linkedin: 'https://linkedin.com/in/tanzeel-pahore',
  summary: '15 years architecting fault-tolerant distributed backends, ultra-low latency streaming systems, and high-performance full-stack applications. Proven track record leading multi-disciplinary engineering organizations, migrating monolithic legacy estates to cloud-native platforms, and scaling systems from inception to millions of transactions per second.',
  coreStats: [
    { label: 'Years Experience', value: '15+' },
    { label: 'Distributed Systems', value: '42' },
    { label: 'Uptime Reliability', value: '99.999%' },
    { label: 'Cloud Spend Saved', value: '$45M+' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'distributed-mesh',
    title: 'AetherMesh Global Service Fabric',
    subtitle: 'Zero-trust multi-region edge mesh routing 14B daily requests with sub-5ms p99 overhead',
    category: 'distributed',
    categoryLabel: 'Distributed Systems',
    year: '2025',
    clientOrDomain: 'Cloud Infrastructure & Global CDN',
    summary: 'A unified service mesh and edge control plane designed to eliminate inter-region latency bottlenecks and automate cross-cloud failover across 28 global points of presence.',
    problemStatement: 'Previous ingress proxies suffered from asymmetric connection drops during multi-cloud failovers and incurred an unacceptable 38ms p99 latency tax during dynamic TLS renegotiation.',
    architectureSolution: 'Architected a custom data-plane proxy in Rust leveraging eBPF socket redirection and ring buffers, managed by a Raft-replicated Go control plane with deterministic configuration distribution.',
    keyMetrics: [
      { label: 'Daily Requests Handled', value: '14.2 Billion' },
      { label: 'p99 Latency Overhead', value: '3.8ms' },
      { label: 'Failover Convergence', value: '< 180ms' },
      { label: 'CPU Overhead Reduction', value: '-42%' },
    ],
    techStack: ['Rust', 'Go', 'eBPF', 'Envoy', 'gRPC', 'Kubernetes', 'Prometheus'],
    engineeringDecisions: [
      {
        decision: 'Adopted eBPF socket bypass over userspace iptables routing',
        rationale: 'Avoided kernel context-switching penalties on high-packet ingress cards.',
        tradeoff: 'Required stringent Linux kernel minimum version requirements across the fleet.'
      },
      {
        decision: 'Segmented Raft clusters into regional hierarchy instead of global consensus',
        rationale: 'Prevented trans-Atlantic network jitter from slowing down localized route discovery.',
        tradeoff: 'Eventual consistency required for cross-region route propagation.'
      }
    ],
    systemTopology: {
      nodes: ['Global DNS Anycast', 'eBPF Ingress Layer', 'Rust Fast-Proxy', 'Raft Consensus Control Plane', 'Telemetry Ring Buffer'],
      throughput: '2.4M req/sec peak',
      latency: '3.8ms p99'
    },
    featured: true,
    githubUrl: 'https://github.com/tanzeelpahore/aethermesh-core',
    liveUrl: 'https://aethermesh.internal.systems',
  },
  {
    id: 'quantum-order-book',
    title: 'ApexFin Low-Latency Exchange Engine',
    subtitle: 'Microsecond deterministic L3 order matching and real-time clearing platform',
    category: 'streaming',
    categoryLabel: 'Real-Time & Fintech',
    year: '2024',
    clientOrDomain: 'Institutional Capital & Derivatives',
    summary: 'High-frequency matching engine with lock-free memory rings, deterministic execution journals, and sub-10 microsecond order matching for institutional liquidity.',
    problemStatement: 'Existing Java-based order matching experienced uncontrollable GC pauses exceeding 120ms during volatile market opens, causing severe slippage and compliance penalties.',
    architectureSolution: 'Designed a zero-allocation single-threaded core matching loop in C++ with memory mapped IPC rings, paired with a Go distributed persistence gateway utilizing append-only Raft logs.',
    keyMetrics: [
      { label: 'Tick-to-Trade Latency', value: '8.4 μs' },
      { label: 'Max Message Throughput', value: '4.8M msg/sec' },
      { label: 'GC Jitter Spikes', value: '0.00ms (Zero GC)' },
      { label: 'Annual Volume Cleared', value: '$840 Billion' },
    ],
    techStack: ['C++20', 'Go', 'Disruptor Pattern', 'ZeroMQ', 'TimescaleDB', 'SIMD'],
    engineeringDecisions: [
      {
        decision: 'Pinned single-threaded matcher to dedicated CPU cores with thread affinity',
        rationale: 'Completely eliminated cache-line invalidation and OS context switching.',
        tradeoff: 'Vertical scaling ceiling per individual order book instrument.'
      },
      {
        decision: 'Direct memory mapping with custom ring buffers over traditional IPC',
        rationale: 'Achieved near-hardware speed data transfer between ingress network threads and the core matcher.',
        tradeoff: 'Requires strict memory boundaries and boundary guard pages.'
      }
    ],
    systemTopology: {
      nodes: ['FIX Protocol Gateway', 'Ring Buffer IPC', 'Single-Core Matcher Engine', 'Journaling WAL', 'WebSocket Market Data Feed'],
      throughput: '4.8M ops/sec',
      latency: '8.4 microseconds p99'
    },
    featured: true,
    githubUrl: 'https://github.com/tanzeelpahore/apexfin-orderbook',
  },
  {
    id: 'stream-telemetry',
    title: 'ChronoStream High-Throughput Observability',
    subtitle: 'Distributed time-series ingestion cluster processing 8.5M events/second',
    category: 'streaming',
    categoryLabel: 'Streaming & Data',
    year: '2024',
    clientOrDomain: 'Hyperscale Cloud Observability',
    summary: 'Tiered event ingestion platform replacing legacy ELK clusters with ClickHouse columnar storage and real-time streaming anomaly detection.',
    problemStatement: 'Log storage costs were ballooning past $300k/month while queries over 30-day timeframes frequently timed out or crashed worker nodes.',
    architectureSolution: 'Built a multi-tiered pipeline using distributed Kafka clusters, custom Go stream processors with sliding window aggregation, and heavily compressed ClickHouse shards.',
    keyMetrics: [
      { label: 'Ingestion Throughput', value: '8.5M events/sec' },
      { label: 'Monthly Cloud Cost Saved', value: '$220,000' },
      { label: '30-Day Query Speed', value: '380ms (down from 45s)' },
      { label: 'Data Compression Ratio', value: '9.2 : 1' },
    ],
    techStack: ['Kafka', 'Go', 'ClickHouse', 'Vector', 'Grafana', 'Apache Arrow'],
    engineeringDecisions: [
      {
        decision: 'Pre-aggregated metrics on ingestion workers rather than query-time calculation',
        rationale: 'Reduced scan volume on columnar storage by 88% for 95% of dashboard queries.',
        tradeoff: 'Small 3-second delay on raw dimension availability.'
      },
      {
        decision: 'Dynamic partition re-balancing using consumer group lag thresholds',
        rationale: 'Prevented hot-partition stalls during unpredictable traffic surges.',
        tradeoff: 'Introduced complex state tracking in consumer rebalance handlers.'
      }
    ],
    systemTopology: {
      nodes: ['Agent Log Ingress', 'Kafka Tier 1 Buffer', 'Go Aggregation Shards', 'ClickHouse Storage Ring', 'Query Federation API'],
      throughput: '8.5M events/sec',
      latency: '45ms ingestion delay'
    },
    featured: true,
    githubUrl: 'https://github.com/tanzeelpahore/chronostream-pipeline',
    liveUrl: 'https://chronostream.internal.metrics',
  },
  {
    id: 'zero-trust-mesh',
    title: 'SentinelGuard Zero-Trust Mesh & Identity Plane',
    subtitle: 'Cryptographic workload identity & automated mTLS certificate rotation for 400+ microservices',
    category: 'cloud',
    categoryLabel: 'Cloud & Security',
    year: '2023',
    clientOrDomain: 'Enterprise Security & Compliance',
    summary: 'A company-wide zero-trust security architecture enforcing SPIFFE/SPIRE cryptographic workload identities, seamless dynamic secret issuance, and fine-grained authorization.',
    problemStatement: 'Secret sprawl across GitHub repos and static API keys created substantial compliance vulnerability and hindered multi-tenant enterprise certification.',
    architectureSolution: 'Implemented short-lived X.509 cert rotation with Envoy mTLS sidecars, integrated HashiCorp Vault dynamic database credentials, and Open Policy Agent (OPA) for microsegmentation.',
    keyMetrics: [
      { label: 'Microservices Enrolled', value: '420+' },
      { label: 'Static Secrets Eliminated', value: '100%' },
      { label: 'Cert Rotation Frequency', value: 'Every 2 Hours' },
      { label: 'SOC2 & ISO 27001 Audit', value: 'Zero Findings' },
    ],
    techStack: ['SPIFFE / SPIRE', 'HashiCorp Vault', 'Open Policy Agent', 'Envoy', 'Go', 'Kubernetes'],
    engineeringDecisions: [
      {
        decision: 'Short-lived 2-hour cert lifetimes over long-lived certificates',
        rationale: 'Completely eliminated the requirement for CRL (certificate revocation lists) distribution.',
        tradeoff: 'Demanded 99.999% availability of internal CA issuers.'
      },
      {
        decision: 'Client-side policy evaluation in Envoy WASM filters rather than centralized auth service',
        rationale: 'Removed auth gateway as a single point of failure and bottleneck.',
        tradeoff: 'WASM memory footprint increased per sidecar container by 18MB.'
      }
    ],
    systemTopology: {
      nodes: ['SPIRE Server Root CA', 'Node Agent DaemonSet', 'Envoy mTLS Interceptor', 'OPA Decision Cache', 'Vault Dynamic Engine'],
      throughput: '950K auth evaluations/sec',
      latency: '0.4ms check'
    },
    featured: false,
    githubUrl: 'https://github.com/tanzeelpahore/sentinelguard-spiffe',
  },
  {
    id: 'edge-ai-inference',
    title: 'TensorScale Edge Inference & Vector Index',
    subtitle: 'Ultra-efficient quantized model serving and vector search reducing GPU requirements by 64%',
    category: 'ai_systems',
    categoryLabel: 'AI & Systems',
    year: '2025',
    clientOrDomain: 'AI Platforms & Applied ML',
    summary: 'Distributed vector indexing and quantized embedding serving pipeline capable of conducting sub-15ms semantic searches across 50 million high-dimensional vectors on commodity CPUs.',
    problemStatement: 'Skyrocketing GPU cloud bills for real-time embedding generation and vector nearest-neighbor search threatened operational margin sustainability.',
    architectureSolution: 'Created an HNSW vector index implementation in Rust utilizing AVX-512 and NEON SIMD intrinsics, with automated dynamic INT8 quantization and LRU memory pooling.',
    keyMetrics: [
      { label: 'GPU Cloud Spend Cut', value: '-64%' },
      { label: 'Vector Index Size', value: '50M+ vectors' },
      { label: 'Search Latency p95', value: '11.2ms' },
      { label: 'Memory Footprint Reduction', value: '72%' },
    ],
    techStack: ['Rust', 'Python', 'SIMD (AVX-512)', 'HNSW', 'ONNX Runtime', 'FastAPI', 'Docker'],
    engineeringDecisions: [
      {
        decision: 'Implemented custom HNSW graph indexing over generic database pgvector plugins',
        rationale: 'Allowed custom memory allocation strategies that kept graph nodes in L3 CPU cache.',
        tradeoff: 'Required developing custom replication and persistence sync protocols.'
      },
      {
        decision: 'Applied asymmetric INT8 scalar quantization',
        rationale: 'Maintained 99.1% recall accuracy while shrinking vector memory footprint by 4x.',
        tradeoff: 'Initial quantization training step added 4 minutes to model deployment cycle.'
      }
    ],
    systemTopology: {
      nodes: ['Embedding API Ingress', 'SIMD Quantization Worker', 'HNSW Graph Memory Pool', 'Query Scoring Engine', 'Async Sync Daemon'],
      throughput: '120K vector queries/sec',
      latency: '11.2ms p95'
    },
    featured: false,
    githubUrl: 'https://github.com/tanzeelpahore/tensorscale-engine',
  },
  {
    id: 'multi-region-db',
    title: 'TerraSync Active-Active CRDT Store',
    subtitle: 'Conflict-free replicated distributed data store with deterministic multi-master resolution',
    category: 'distributed',
    categoryLabel: 'Distributed Systems',
    year: '2023',
    clientOrDomain: 'Collaborative Enterprise SaaS',
    summary: 'A resilient multi-region document and state synchronization engine providing offline-first capabilities and instant global convergence without locks.',
    problemStatement: 'Global enterprise customers experienced data divergence and locking deadlocks when collaborating across US, Europe, and Asia-Pacific offices simultaneously.',
    architectureSolution: 'Implemented state-based CRDTs (Conflict-free Replicated Data Types) paired with an optimized hybrid logical clock (HLC) and gossip-based delta replication protocol in Go and TypeScript.',
    keyMetrics: [
      { label: 'Global Synchronization Delay', value: '< 250ms' },
      { label: 'Data Conflict Merges', value: '100% Deterministic' },
      { label: 'Offline Recovery State', value: 'Zero Data Loss' },
      { label: 'Concurrent Connected Users', value: '250,000+' },
    ],
    techStack: ['Go', 'TypeScript', 'WebSockets', 'RocksDB', 'CRDTs', 'Hybrid Logical Clocks'],
    engineeringDecisions: [
      {
        decision: 'Delta-state CRDT synchronization instead of full-state transmission',
        rationale: 'Saved 94% network bandwidth over cellular and transcontinental links.',
        tradeoff: 'Maintained causal history buffers on edge synchronization brokers.'
      },
      {
        decision: 'Hybrid Logical Clocks over NTP synchronizations',
        rationale: 'Prevented clock drift anomalies from disrupting operation causality ordering.',
        tradeoff: 'Clock message overhead of 16 bytes per transmitted payload.'
      }
    ],
    systemTopology: {
      nodes: ['Client Edge Cache', 'WebSocket Gateway', 'Gossip Sync Mesh', 'RocksDB Local Storage', 'HLC Coordinator'],
      throughput: '850K sync ops/sec',
      latency: '18ms regional / 220ms global'
    },
    featured: false,
    githubUrl: 'https://github.com/tanzeelpahore/terrasync-crdt',
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: '2021 — PRESENT',
    role: 'Principal Software Architect & Infrastructure Director',
    organization: 'Strata Distributed Systems & Cloud Platforms',
    organizationType: 'Enterprise Cloud Platform & Distributed Infrastructure',
    location: 'San Francisco, CA & Remote Global',
    scaleMetric: 'Directing architecture for 14B+ daily events & $60M annual infrastructure estate',
    summary: 'Lead system architecture and engineering strategy across 12 distributed squads. Define the multi-year technology roadmap for zero-trust microservice networks, edge computing fabrics, and real-time event streaming.',
    achievements: [
      'Spearheaded transition to eBPF-based service mesh, reducing fleet-wide p99 latency by 38% and saving $4.2M in compute compute spend in year one.',
      'Authored the corporate distributed systems blueprint and disaster recovery playbooks, sustaining 99.999% SLA across multiple AWS/GCP region outages.',
      'Mentored and guided 6 Staff Engineers and 22 Senior Engineers toward technical leadership excellence and high-craft execution.',
      'Created standardized cross-organizational RFC and Architecture Review Board (ARB) processes adopted by 180+ developers.'
    ],
    technologies: ['Go', 'Rust', 'eBPF', 'Kubernetes', 'AWS', 'GCP', 'Kafka', 'ClickHouse', 'Envoy']
  },
  {
    period: '2017 — 2021',
    role: 'Staff Software Engineer & Platform Tech Lead',
    organization: 'Apex Institutional Capital & FinTech Services',
    organizationType: 'High-Frequency Financial Technologies & Settlement',
    location: 'New York, NY / Remote',
    scaleMetric: 'Orchestrated systems clearing $840B annual transaction volume',
    summary: 'Architected and shipped low-latency order matching infrastructure, real-time risk calculation pipelines, and deterministic state replication protocols for global financial exchanges.',
    achievements: [
      'Engineered lock-free matching engine in C++ and Go, achieving tick-to-trade latency under 10 microseconds and eliminating 100% of JVM stop-the-world pauses.',
      'Designed real-time market data broadcasting protocol over WebSockets and UDP multicast, scaling to 4.8 million messages/second with zero packet drop.',
      'Led the audit compliance and technical certification initiatives for SOC2 Type II, SEC Rule 15c3-5, and FINRA standards.',
      'Pioneered automated chaos engineering practices simulating partition splits, disk corruptions, and packet drops under heavy load.'
    ],
    technologies: ['C++17', 'Go', 'Disruptor Pattern', 'ZeroMQ', 'Kafka', 'PostgreSQL', 'Docker']
  },
  {
    period: '2014 — 2017',
    role: 'Senior Lead Full-Stack & Systems Engineer',
    organization: 'OmniCloud SaaS Technologies',
    organizationType: 'B2B Enterprise SaaS & Collaborative Workspaces',
    location: 'Seattle, WA',
    scaleMetric: 'Scaled userbase from 500k to 12M active enterprise seats',
    summary: 'Spearheaded monolithic Rails/Node estate decompositon into resilient microservices. Built collaborative real-time editing engines and scalable frontend architectures.',
    achievements: [
      'Designed distributed event-driven notification and webhook delivery platform handling 250M daily webhook dispatches with 99.98% delivery success.',
      'Built early CRDT document sync engine powering real-time spreadsheet and document collaboration for multi-tenant organizations.',
      'Introduced TypeScript, React, and strict end-to-end testing standards across 4 frontend teams, slashing regression bugs by 65%.',
      'Established database sharding strategy for PostgreSQL databases, avoiding a catastrophic capacity cliff as dataset grew from 2TB to 45TB.'
    ],
    technologies: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'RabbitMQ', 'AWS ECS']
  },
  {
    period: '2011 — 2014',
    role: 'Senior Software Engineer',
    organization: 'Vanguard Media & High-Volume Content Network',
    organizationType: 'Digital Media & Streaming Distribution',
    location: 'Austin, TX',
    scaleMetric: 'Serving 45M unique monthly visitors with sub-100ms page load budgets',
    summary: 'Focused on high-concurrency API performance, distributed caching hierarchies, and multi-tier edge CDN cache invalidation.',
    achievements: [
      'Engineered multi-layer Varnish & Redis caching tier reducing database hit rates by 89% during breaking news traffic spikes.',
      'Created custom asset compression and progressive image streaming pipelines before modern cloud CDNs popularized edge optimization.',
      'Implemented automated continuous deployment pipeline with zero-downtime rolling deploys across 120 bare-metal Linux servers.'
    ],
    technologies: ['Python', 'Node.js', 'Redis', 'Varnish', 'MySQL', 'Nginx', 'Linux Kernel']
  },
  {
    period: '2009 — 2011',
    role: 'Software Engineer & Systems Developer',
    organization: 'NovaTech Telecom & Distributed Networking',
    organizationType: 'Network Infrastructure & Telecommunications',
    location: 'Boston, MA',
    scaleMetric: 'Low-level protocol parsers & packet inspection on Gigabit interfaces',
    summary: 'Wrote Linux socket servers, protocol converters, and hardware telemetry monitors in C and Python for enterprise telecommunication switches.',
    achievements: [
      'Developed multi-threaded SIP/RTP protocol analyzer running with low memory footprints on embedded systems.',
      'Wrote high-performance Linux daemon services and sysadmin automation tools, cementing foundational mastery in operating system internals.'
    ],
    technologies: ['C', 'Linux (POSIX)', 'Python', 'TCP/IP Sockets', 'Bash', 'GDB']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Distributed Systems & Architecture',
    description: 'High-scale concurrency, consensus protocols, and fault-tolerant topology',
    skills: [
      { name: 'Consensus Protocols (Raft, Paxos)', yearsOfExperience: 10, depthLevel: 'Expert / Staff', notableUse: 'Control planes & state machine replication' },
      { name: 'Event-Driven Architecture (Kafka, Pulsar)', yearsOfExperience: 11, depthLevel: 'Expert / Staff', notableUse: '8.5M event/sec streaming backbones' },
      { name: 'eBPF & Network Fast-Path', yearsOfExperience: 5, depthLevel: 'Advanced', notableUse: 'Kernel-level socket redirection & observability' },
      { name: 'Zero-Trust Security & SPIFFE/SPIRE', yearsOfExperience: 6, depthLevel: 'Expert / Staff', notableUse: 'Automated cryptographic workload mTLS' },
      { name: 'CRDTs & Eventual Consistency', yearsOfExperience: 8, depthLevel: 'Expert / Staff', notableUse: 'Active-active multi-region collaborative stores' },
    ]
  },
  {
    category: 'Languages & Core Runtimes',
    description: 'Systems programming, high-concurrency services, and expressive web apps',
    skills: [
      { name: 'Go (Golang)', yearsOfExperience: 10, depthLevel: 'Expert / Staff', notableUse: 'High-throughput microservices & control planes' },
      { name: 'Rust', yearsOfExperience: 6, depthLevel: 'Advanced', notableUse: 'Memory-safe systems proxies & SIMD algorithms' },
      { name: 'TypeScript & Modern React', yearsOfExperience: 11, depthLevel: 'Expert / Staff', notableUse: 'Complex dashboards, high-density data visualization' },
      { name: 'C / C++ (17/20)', yearsOfExperience: 12, depthLevel: 'Advanced', notableUse: 'Microsecond matching engines & network socket loops' },
      { name: 'Python', yearsOfExperience: 14, depthLevel: 'Expert / Staff', notableUse: 'Automation, ML serving & data engineering' },
    ]
  },
  {
    category: 'Cloud, Storage & Infrastructure',
    description: 'Multi-cloud orchestration, high-speed databases, and FinOps discipline',
    skills: [
      { name: 'Kubernetes & Container Runtimes', yearsOfExperience: 9, depthLevel: 'Expert / Staff', notableUse: 'Multi-cluster multi-cloud production fleets' },
      { name: 'ClickHouse & Time-Series DBs', yearsOfExperience: 6, depthLevel: 'Expert / Staff', notableUse: 'Petabyte-scale analytical log querying' },
      { name: 'PostgreSQL & Sharded SQL', yearsOfExperience: 15, depthLevel: 'Expert / Staff', notableUse: 'ACID transaction design, custom indexing & WAL' },
      { name: 'AWS & Google Cloud Platform', yearsOfExperience: 13, depthLevel: 'Expert / Staff', notableUse: 'Enterprise infrastructure topology & VPC peering' },
      { name: 'Terraform & Infrastructure-as-Code', yearsOfExperience: 8, depthLevel: 'Expert / Staff', notableUse: 'Declarative multi-region environment provisioning' },
    ]
  }
];
