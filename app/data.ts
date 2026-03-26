// ─── press links (filled from verified sources) ───────────────────────────
export const PRESS = {
  chainwire: "https://chainwire.org/2025/04/14/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/",
  cryptoslate: "https://cryptoslate.com/press-releases/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/",
  blockchainmag: "https://blockchainmagazine.com/press-release/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation",
};

// ─── featured projects ───────────────────────────────────────────────────────
export const FEATURED = [
  {
    name: "REACTOR / ReacDEFI",
    category: "DeFi Automation",
    hook: "No-code DeFi automation platform — stop-loss, liquidation protection, AI conversational setup",
    badge: "$9K grant",
    badgeColor: "green",
    tech: ["Solidity", "Next.js", "Convex", "Gemini AI", "wagmi/viem", "Base Mainnet"],
    live: "https://reacdefi.app",
    github: "https://github.com/harshkas4na/reacdefi",
    bullets: [
      "First production DApp on Reactive Network — featured on Chainwire, CryptoSlate & Blockchain Magazine",
      "AI assistant lets users deploy on-chain automations through natural language conversation",
      "Autonomous RSCs monitor Aave health factors and Uniswap prices 24/7 without bots or oracles",
    ],
    press: [
      { label: "Chainwire", url: "https://chainwire.org/2025/04/14/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
      { label: "CryptoSlate", url: "https://cryptoslate.com/press-releases/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
      { label: "Blockchain Magazine", url: "https://blockchainmagazine.com/press-release/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation" },
      { label: "BlockTelegraph", url: "https://blocktelegraph.io/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
    ],
  },
  {
    name: "Hashtro",
    category: "AI × Solana",
    hook: "AI astrology on Solana — trade-verified horoscopes via Flash perpetual protocol",
    badge: "160 users / 48hrs",
    badgeColor: "blue",
    tech: ["Solana", "Next.js 15", "FastAPI", "Gemini", "Flash SDK", "Supabase", "Swiss Ephemeris"],
    live: "https://hashtro.fun",
    github: "https://github.com/harshkas4na/Hashtro",
    bullets: [
      "Vedic-Hellenistic chart calculation generates personalized readings with cosmic-derived trade parameters",
      "30-second leveraged trades on Flash/Drift verify predictions — direction, leverage & ticker from chart data",
      "3-service microarchitecture with Privy wallet auth, 24h TTL caching, rate limiting & Supabase RLS",
    ],
    press: [],
  },
  {
    name: "rc-agents",
    category: "AI Agents × DeFi",
    hook: "AI agents that autonomously pay for DeFi protection via x402 micropayments",
    badge: "x402 + RSC",
    badgeColor: "purple",
    tech: ["TypeScript", "x402 Protocol", "Reactive Smart Contracts", "Aave", "USDC"],
    live: "https://rc-agents.vercel.app",
    github: "https://github.com/harshkas4na/rc-agents",
    bullets: [
      "An AI agent pays $0.30 USDC for 24-hour Aave liquidation protection — no accounts, no human in the loop",
      "Marketplace where autonomous agents discover, purchase and deploy DeFi protection services",
      "Combines x402 micropayment protocol with Reactive Smart Contracts for fully autonomous agent-to-contract commerce",
    ],
    press: [],
  },
  {
    name: "MetroDiaries",
    category: "Consumer App",
    hook: "Commuter matching for Delhi Metro — real-time chat, KYC verification, 250+ stations",
    badge: "32 users pre-launch",
    badgeColor: "orange",
    tech: ["Next.js", "React 19", "Supabase", "WebSocket", "Surepass KYC", "Resend"],
    live: "https://metrodiaries.in",
    github: null,
    bullets: [
      "Matches riders by route overlap and ±45-min time window across 250+ stations on 12 metro lines",
      "Real-time WebSocket chat, connection management, trip groups with join requests",
      "Mandatory face-detection onboarding + PAN/Aadhaar KYC for user safety, Supabase RLS on all tables",
    ],
    press: [],
  },
  {
    name: "MONARC",
    category: "NFT Protocol",
    hook: "Sovereign NFT royalty enforcement using Reactive Smart Contracts across chains",
    badge: "Cross-chain",
    badgeColor: "purple",
    tech: ["Solidity", "Reactive Smart Contracts", "TypeScript", "Next.js"],
    live: "https://dynaroyal.vercel.app",
    github: "https://github.com/harshkas4na/MONARC",
    bullets: [
      "Addresses $1.8B in annual lost royalties by autonomously monitoring NFT sales across networks",
      "Dynamic royalty management — rates adjust based on market conditions via reactive contracts",
      "Enforces royalties cross-chain without requiring marketplace cooperation",
    ],
    press: [],
  },
];

// ─── more projects ────────────────────────────────────────────────────────────
export const MORE = [
  { name: "rc-debugger", desc: "TUI debugger & monitor for Reactive Network cross-chain flows — 17 health diagnostics", link: "https://github.com/harshkas4na/rc-debugger", tag: "DevTools" },
  { name: "Walrus-SDK", desc: "TypeScript SDK for Walrus decentralized storage (Sui). Published on npm.", link: "https://walrus-sdk.vercel.app", tag: "SDK" },
  { name: "Provenance", desc: "On-chain reputation scoring for Citrea (first ZK-Rollup on Bitcoin)", link: "https://provenance-jade.vercel.app", tag: "DeFi" },
  { name: "ReactiveFlow-Lender", desc: "Cross-chain lending — deposit ETH on Sepolia, receive MATIC via Reactive Network", link: "https://reactive-flow-lender.vercel.app", tag: "DeFi" },
  { name: "Protocol-Pal", desc: "AI Web3 assistant that executes blockchain transactions via natural language + MCP", link: "https://github.com/harshkas4na/Protocol-Pal", tag: "AI" },
  { name: "SWARTZ", desc: "Decentralized social media with TensorFlow content moderation + reactive governance", link: "https://github.com/harshkas4na/SWARTZ", tag: "Web3" },
  { name: "Fiducia", desc: "Multi-party wallet + crypto insurance (loan protection, threshold coverage)", link: "https://fiducia-docs.vercel.app", tag: "DeFi" },
  { name: "Mercado", desc: "NFT marketplace with constant-product dynamic pricing + MERCAT token economics", link: "https://github.com/harshkas4na/Mercado", tag: "NFT" },
  { name: "CryptoTree", desc: "Crypto visualization and exploration app", link: "https://crytpo-tree.vercel.app", tag: "Web3" },
  { name: "reactive-network-dev", desc: "Claude Code skill — teaches Claude to design Reactive Network systems", link: "https://github.com/harshkas4na/reactive-network-dev", tag: "DevTools" },
];

// ─── timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    title: "Junior Solidity Developer",
    org: "Reactive Network",
    date: "Jul 2025 — present",
    active: true,
    desc: "Building production smart contract systems and DeFi tools on Reactive Network. Currently working on Liquidation Protection for ReacDEFI.",
  },
  {
    title: "Blockchain Developer Intern",
    org: "Reactive Network",
    date: "Apr — Jul 2025",
    active: false,
    desc: "Developed cross-chain automation protocols and contributed to core infrastructure.",
  },
  {
    title: "$9K Grant + Press Coverage",
    org: "Reactive Network",
    date: "Mar 2025",
    active: false,
    desc: "REACTOR featured on Chainwire, CryptoSlate, and Blockchain Magazine.",
  },
  {
    title: "1st + 2nd Place — International Reactive Hackathon",
    org: "Hackathon",
    date: "Nov 2024",
    active: false,
    desc: "Won two placements in the same hackathon with separate cross-chain protocol submissions.",
  },
  {
    title: "$1,000 — US Blockchain Bounty Program",
    org: "Bounties",
    date: "2024",
    active: false,
    desc: "$400 + $600 from two separate blockchain protocol bounties.",
  },
  {
    title: "B.Tech ECE — CGPA 8.37",
    org: "IIIT Nagpur",
    date: "2022 — 2026",
    active: false,
    desc: "Electronics and Communication Engineering with focus on distributed systems.",
  },
];

// ─── skills ───────────────────────────────────────────────────────────────────
export const SKILLS = [
  "Solidity", "TypeScript", "JavaScript", "Rust", "Python", "C++",
  "Next.js", "React", "Node.js", "FastAPI",
  "Hardhat", "Foundry", "wagmi/viem",
  "Supabase", "PostgreSQL", "Docker",
  "Solana", "Ethereum", "Reactive Network",
];
