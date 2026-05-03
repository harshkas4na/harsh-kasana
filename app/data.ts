// ─── press links ──────────────────────────────────────────────────────────────
export const PRESS = [
  {
    name: "Chainwire",
    url: "https://chainwire.org/2025/04/14/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/",
    logo: "/logo/chainwire_logo-200x200.jpg",
  },
  {
    name: "CryptoSlate",
    url: "https://cryptoslate.com/press-releases/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/",
    logo: "/logo/cryptoslate.webp",
  },
  {
    name: "Blockchain Magazine",
    url: "https://blockchainmagazine.com/press-release/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation",
    logo: "/logo/blockchain-magzine.png",
  },
  {
    name: "BlockTelegraph",
    url: "https://blocktelegraph.io/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/",
    logo: "/logo/blocktelegraph-logo.png",
  },
];

// ─── projects ────────────────────────────────────────────────────────────────
// `id` is a stable key used by PRESETS to reorder featured projects.
// `featured` controls whether it shows in the main projects section by default.
// `image` / `video` are optional — cards gracefully fall back when missing.
export type Project = {
  id: string;
  name: string;
  category: string;
  hook: string;
  badge: string;
  badgeColor: "green" | "blue" | "purple" | "orange";
  tech: string[];
  live: string;
  github: string | null;
  bullets: string[];
  metrics?: { value: string; label: string }[];
  press?: { label: string; url: string }[];
  image?: string | null;
  video?: string | null;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "reactor",
    name: "REACTOR / ReacDEFI",
    category: "DeFi Automation",
    hook: "No-code DeFi automation platform — stop-loss, liquidation protection, AI conversational setup",
    badge: "$9K grant",
    badgeColor: "green",
    tech: ["Solidity", "Next.js", "Convex", "Gemini AI", "wagmi/viem", "Base Mainnet"],
    live: "https://reacdefi.app",
    github: "https://github.com/harshkas4na/reacdefi",
    image: "/hero-images/reacdefi-hero.png",
    video: "/intro-videos/ReacDEFI-intro.mp4",
    featured: true,
    bullets: [
      "First production DApp on Reactive Network — featured on Chainwire, CryptoSlate & Blockchain Magazine",
      "AI assistant lets users deploy on-chain automations through natural language conversation",
      "Autonomous RSCs monitor Aave health factors and Uniswap prices 24/7 without bots or oracles",
    ],
    metrics: [
      { value: "$9K", label: "grant" },
      { value: "4", label: "press features" },
      // TODO: add concrete on-chain numbers — txns, automations deployed, $ TVL protected
    ],
    press: [
      { label: "Chainwire",            url: "https://chainwire.org/2025/04/14/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
      { label: "CryptoSlate",          url: "https://cryptoslate.com/press-releases/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
      { label: "Blockchain Magazine",  url: "https://blockchainmagazine.com/press-release/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation" },
      { label: "BlockTelegraph",       url: "https://blocktelegraph.io/reactor-launches-on-reactive-network-pioneering-the-future-of-no-code-defi-automation/" },
    ],
  },
  {
    id: "hashtro",
    name: "Hashtro",
    category: "AI × Solana",
    hook: "AI astrology on Solana — trade-verified horoscopes via Flash perpetual protocol",
    badge: "160 users / 48hrs",
    badgeColor: "blue",
    tech: ["Solana", "Next.js 15", "FastAPI", "Gemini", "Flash SDK", "Supabase", "Swiss Ephemeris"],
    live: "https://hashtro.fun",
    github: "https://github.com/harshkas4na/Hashtro",
    image: "/hero-images/hashtro-hero.png",
    video: "/intro-videos/Hastro-intro.mp4",
    featured: true,
    bullets: [
      "Vedic-Hellenistic chart calculation generates personalized readings with cosmic-derived trade parameters",
      "30-second leveraged trades on Flash/Drift verify predictions — direction, leverage & ticker from chart data",
      "3-service microarchitecture with Privy wallet auth, 24h TTL caching, rate limiting & Supabase RLS",
    ],
    metrics: [
      { value: "160",  label: "users / 48hrs" },
      { value: "3",    label: "microservices" },
      // TODO: trades executed, total leverage volume
    ],
  },
  {
    id: "rc-agents",
    name: "rc-agents",
    category: "AI Agents × DeFi",
    hook: "AI agents that autonomously pay for DeFi protection via x402 micropayments",
    badge: "x402 + RSC",
    badgeColor: "purple",
    tech: ["TypeScript", "x402 Protocol", "Reactive Smart Contracts", "Aave", "USDC"],
    live: "https://rc-agents.vercel.app",
    github: "https://github.com/harshkas4na/rc-agents",
    image: null,
    video: "/intro-videos/rc-agents-intro.mp4",
    featured: true,
    bullets: [
      "An AI agent pays $0.30 USDC for 24-hour Aave liquidation protection — no accounts, no human in the loop",
      "Marketplace where autonomous agents discover, purchase and deploy DeFi protection services",
      "Combines x402 micropayment protocol with Reactive Smart Contracts for fully autonomous agent-to-contract commerce",
    ],
    metrics: [
      { value: "$0.30", label: "per protection" },
      { value: "24h",   label: "coverage window" },
    ],
  },
  {
    id: "metrodiaries",
    name: "MetroDiaries",
    category: "Consumer App",
    hook: "Commuter matching for Delhi Metro — real-time chat, KYC verification, 250+ stations",
    badge: "32 users pre-launch",
    badgeColor: "orange",
    tech: ["Next.js", "React 19", "Supabase", "WebSocket", "Surepass KYC", "Resend"],
    live: "https://metrodiaries.in",
    github: null,
    image: "/hero-images/metroDiaries-hero.png",
    video: "/intro-videos/metroDiaries-intro.mp4",
    featured: true,
    bullets: [
      "Matches riders by route overlap and ±45-min time window across 250+ stations on 12 metro lines",
      "Real-time WebSocket chat, connection management, trip groups with join requests",
      "Mandatory face-detection onboarding + PAN/Aadhaar KYC for user safety, Supabase RLS on all tables",
    ],
    metrics: [
      { value: "250+", label: "stations" },
      { value: "12",   label: "metro lines" },
      { value: "32",   label: "pre-launch users" },
    ],
  },
  {
    id: "focuclone",
    name: "FocuClone",
    category: "Productivity", // TODO: confirm category
    hook: "Desktop app for Auto Edit while recording with auto zoom in/out, cursor tracking, and more", // ← fill this in
    badge: "Live",
    badgeColor: "blue",
    tech: ["Next.js", "TypeScript"], // TODO: real stack
    live: "#", // TODO: real URL
    github: null, // TODO: github link
    image: "/hero-images/FocuClone-hero.jpeg",
    video: "/intro-videos/FocuClone-intro.mp4",
    featured: true,
    bullets: [
      "TODO: bullet 1",
      "TODO: bullet 2",
      "TODO: bullet 3",
    ],
    metrics: [],
  },
  {
    id: "monarc",
    name: "MONARC",
    category: "NFT Protocol",
    hook: "Sovereign NFT royalty enforcement using Reactive Smart Contracts across chains",
    badge: "Cross-chain",
    badgeColor: "purple",
    tech: ["Solidity", "Reactive Smart Contracts", "TypeScript", "Next.js"],
    live: "https://dynaroyal.vercel.app",
    github: "https://github.com/harshkas4na/MONARC",
    image: null,
    video: null,
    featured: false, // older project — surface via preset when relevant
    bullets: [
      "Addresses $1.8B in annual lost royalties by autonomously monitoring NFT sales across networks",
      "Dynamic royalty management — rates adjust based on market conditions via reactive contracts",
      "Enforces royalties cross-chain without requiring marketplace cooperation",
    ],
    metrics: [
      { value: "$1.8B", label: "addressable problem" },
    ],
  },
];

// FEATURED is computed once — order in PROJECTS is the default order.
export const FEATURED = PROJECTS.filter((p) => p.featured);

// ─── presets ─────────────────────────────────────────────────────────────────
// Use ?preset=ai (or defi/fullstack/backend) to reorder featured projects when
// applying to a specific role. Unknown id → falls back to default order.
export const PRESETS: Record<string, string[]> = {
  defi:      ["reactor", "rc-agents", "monarc", "hashtro", "metrodiaries"],
  ai:        ["hashtro", "rc-agents", "reactor", "focuclone", "metrodiaries"],
  fullstack: ["metrodiaries", "reactor", "hashtro", "focuclone", "rc-agents"],
  backend:   ["reactor", "rc-agents", "hashtro", "metrodiaries", "monarc"],
};

export function applyPreset(preset?: string | null): Project[] {
  if (!preset || !PRESETS[preset]) return FEATURED;
  const order = PRESETS[preset];
  const map = new Map(PROJECTS.map((p) => [p.id, p]));
  return order.map((id) => map.get(id)).filter((p): p is Project => Boolean(p));
}

// ─── more projects ────────────────────────────────────────────────────────────
export const MORE = [
  { name: "rc-debugger",         desc: "TUI debugger & monitor for Reactive Network cross-chain flows — 17 health diagnostics", link: "https://github.com/harshkas4na/rc-debugger",          tag: "DevTools" },
  { name: "Walrus-SDK",          desc: "TypeScript SDK for Walrus decentralized storage (Sui). Published on npm.",              link: "https://walrus-sdk.vercel.app",                        tag: "SDK"      },
  { name: "Provenance",          desc: "On-chain reputation scoring for Citrea (first ZK-Rollup on Bitcoin)",                    link: "https://provenance-jade.vercel.app",                   tag: "DeFi"     },
  { name: "ReactiveFlow-Lender", desc: "Cross-chain lending — deposit ETH on Sepolia, receive MATIC via Reactive Network",      link: "https://reactive-flow-lender.vercel.app",              tag: "DeFi"     },
  { name: "Protocol-Pal",        desc: "AI Web3 assistant that executes blockchain transactions via natural language + MCP",    link: "https://github.com/harshkas4na/Protocol-Pal",          tag: "AI"       },
  { name: "SWARTZ",              desc: "Decentralized social media with TensorFlow content moderation + reactive governance",   link: "https://github.com/harshkas4na/SWARTZ",                tag: "Web3"     },
  { name: "Fiducia",             desc: "Multi-party wallet + crypto insurance (loan protection, threshold coverage)",           link: "https://fiducia-docs.vercel.app",                      tag: "DeFi"     },
  { name: "Mercado",             desc: "NFT marketplace with constant-product dynamic pricing + MERCAT token economics",        link: "https://github.com/harshkas4na/Mercado",               tag: "NFT"      },
  { name: "CryptoTree",          desc: "Crypto visualization and exploration app",                                                link: "https://crytpo-tree.vercel.app",                       tag: "Web3"     },
  { name: "reactive-network-dev",desc: "Claude Code skill — teaches Claude to design Reactive Network systems",                  link: "https://github.com/harshkas4na/reactive-network-dev", tag: "DevTools" },
];

// ─── timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    title: "Solidity & DApp Developer",
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
    desc: "REACTOR featured on Chainwire, CryptoSlate, Blockchain Magazine, and BlockTelegraph.",
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
  // TODO: expand to your full 6 hackathon wins — name, date, prize, project
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

// ─── testimonials ─────────────────────────────────────────────────────────────
// Add real quotes here once collected. Section auto-hides if empty.
export const TESTIMONIALS: { quote: string; author: string; role: string }[] = [
  // {
  //   quote: "Harsh ships production-quality DeFi infra at a pace I rarely see at any level.",
  //   author: "TODO",
  //   role:   "Manager, Reactive Network",
  // },
];

// ─── X / Twitter analytics (manually updated) ────────────────────────────────
// Snapshot — refresh from x.com/0xkasana/analytics periodically.
export const X_STATS = {
  handle: "0xkasana",
  url: "https://x.com/0xkasana",
  followers: "730",          // e.g. "1.2K"
  impressions30d: "13K",     // e.g. "85K"
  topPost: {
    text: "Creativity is not a gift! It's a skill you obtain... You observe, You try, You observe, You execute. In the end, you got the eyes  that no one has !!",
    url: "https://x.com/0xkasana",
    likes: "100",
  },
};

// ─── published articles (Medium + others) ────────────────────────────────────
export type Article = {
  title: string;
  platform: "Medium" | "Other";
  url: string;
  impressions?: string;  // e.g. "12K reads"
  date: string;          // free-form, e.g. "Mar 2025"
};
export const ARTICLES: Article[] = [
  // Stats from Medium analytics — refresh manually.
  // url: TODO replace each with the specific Medium post URL when handy;
  // for now they all link to the profile.
  { title: "Who is Correct? The Intellectual vs. The “Normal” Mind",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "75 views", date: "Sep 17, 2025" },
  { title: "How to Treat AI Like a Teammate?",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "82 views", date: "Aug 28, 2025" },
  { title: "The Dark Forest: A Builder’s Guide to MEV Protection",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "94 views", date: "Jul 23, 2025" },
  { title: "The Librarians of Web3: A Builder’s Guide to The Graph",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "72 views", date: "Jul 19, 2025" },
  { title: "The Unbreakable Bridge: A Builder’s Guide to Oracles and Chainlink",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "97 views", date: "Jul 9, 2025" },
  { title: "The Great DeFi Navigator: A Builder’s Guide to DEX Aggregator Architecture",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "279 reads", date: "Jul 5, 2025" },
  { title: "The DeFi Banks: An Architectural Showdown Between Aave and Compound",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "90 views", date: "Jun 25, 2025" },
  { title: "AMMs: The Math Trick That Killed Wall Street Middlemen",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "59 views", date: "Jun 21, 2025" },
  { title: "I Used to Hate DeFi Math. Then I Realized It’s a Story, Not Just Formulas.",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "—", date: "Jun 15, 2025" },
  { title: "The DNA of Digital Assets: A Builder’s Guide to Token Standards",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "114 views", date: "Jun 11, 2025" },
  { title: "The DeFi Engine Room: A Deep Dive into Liquidity, Yield, and the Hard Truths",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "153 views", date: "Jun 7, 2025" },
  { title: "Web3 Interaction — More Than Just Clicking Buttons",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "88 views", date: "Jun 5, 2025" },
  { title: "Ethereum & Smart Contracts: More Than Just Code, It’s a Mindset Shift",
    platform: "Medium", url: "https://medium.com/@harshkasana05",
    impressions: "78 views", date: "Jun 1, 2025" },
];

// ─── special project highlights (right-rail summary) ─────────────────────────
// projectId references PROJECTS[].id so a rename anywhere keeps these in sync.
export type ProjectHighlight = { projectId: string; metric: string; label: string };
export const PROJECT_HIGHLIGHTS: ProjectHighlight[] = [
  { projectId: "reactor",      metric: "$9K",  label: "Reactive grant + 4 press features" },
  { projectId: "hashtro",      metric: "160",  label: "users in first 48 hours" },
  { projectId: "rc-agents",    metric: "x402", label: "first AI-agent ↔ DeFi micropayments" },
  { projectId: "metrodiaries", metric: "250+", label: "metro stations / 12 lines mapped" },
];

// ─── what I'm looking for ─────────────────────────────────────────────────────
export const LOOKING_FOR = {
  roles:     ["Solidity / Smart Contract Engineer", "Full-Stack Web3", "DeFi Protocol Engineer"],
  stage:     "Seed → Series B (early enough to own real surface area)",
  location:  "Remote, or relocate for the right team",
  available: "Full-time from June 2026 (graduating May 2026)",
  note:      "Open to founding-engineer roles where the team is okay with someone growing into the title.",
};
