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
  live: string | null;
  github: string | null;
  bullets: string[];
  metrics?: { value: string; label: string }[];
  press?: { label: string; url: string }[];
  image?: string | null;
  video?: string | null;
  videoPreview?: string | null;
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
    category: "Desktop App",
    hook: "A record → auto-edit → publish pipeline for creators whose main work isn't editing — it edits while you record.",
    badge: "Desktop App",
    badgeColor: "blue",
    tech: ["Electron", "TypeScript", "Next.js"],
    live: null,
    github: "https://github.com/harshkas4na/FocuClone",
    image: "/hero-images/FocuClone-hero.jpeg",
    video: "/intro-videos/FocuClone-intro.mp4",
    featured: true,
    bullets: [
      "Smooth auto zoom in/out that follows your cursor while recording",
      "Auto-cuts unnecessary uhms, ahs, and silences from the timeline",
      "Cursor tracking, auto captions, on-screen keyboard shortcuts, and spotlight effects",
      "Improved PIP camera controls and voice enhancement for clean output",
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
export type More = { slug: string; name: string; desc: string; link: string; tag: string };
export const MORE: More[] = [
  { slug: "rc-debugger",          name: "rc-debugger",         desc: "TUI debugger & monitor for Reactive Network cross-chain flows — 17 health diagnostics", link: "https://github.com/harshkas4na/rc-debugger",          tag: "DevTools" },
  { slug: "walrus-sdk",           name: "Walrus-SDK",          desc: "TypeScript SDK for Walrus decentralized storage (Sui). Published on npm.",              link: "https://walrus-sdk.vercel.app",                        tag: "SDK"      },
  { slug: "provenance",           name: "Provenance",          desc: "On-chain reputation scoring for Citrea (first ZK-Rollup on Bitcoin)",                    link: "https://provenance-jade.vercel.app",                   tag: "DeFi"     },
  { slug: "reactiveflow-lender",  name: "ReactiveFlow-Lender", desc: "Cross-chain lending — deposit ETH on Sepolia, receive MATIC via Reactive Network",      link: "https://reactive-flow-lender.vercel.app",              tag: "DeFi"     },
  { slug: "protocol-pal",         name: "Protocol-Pal",        desc: "AI Web3 assistant that executes blockchain transactions via natural language + MCP",    link: "https://github.com/harshkas4na/Protocol-Pal",          tag: "AI"       },
  { slug: "swartz",               name: "SWARTZ",              desc: "Decentralized social media with TensorFlow content moderation + reactive governance",   link: "https://github.com/harshkas4na/SWARTZ",                tag: "Web3"     },
  { slug: "fiducia",              name: "Fiducia",             desc: "Multi-party wallet + crypto insurance (loan protection, threshold coverage)",           link: "https://fiducia-docs.vercel.app",                      tag: "DeFi"     },
  { slug: "mercado",              name: "Mercado",             desc: "NFT marketplace with constant-product dynamic pricing + MERCAT token economics",        link: "https://github.com/harshkas4na/Mercado",               tag: "NFT"      },
  { slug: "cryptotree",           name: "CryptoTree",          desc: "Interactive mind-map of the blockchain ecosystem — 12 pillars, navigable",              link: "https://crytpo-tree.vercel.app",                       tag: "Web3"     },
  { slug: "reactive-network-dev", name: "reactive-network-dev",desc: "Claude Code skill — teaches Claude to design Reactive Network systems",                 link: "https://github.com/harshkas4na/reactive-network-dev", tag: "DevTools" },
];

// ─── project detail pages (for /projects/[slug]) ─────────────────────────────
export type ProjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  accent: "amber" | "blue" | "purple" | "green" | "rose";
  problem: string;
  mechanism: string;
  outcome: string;
  tech: string[];
  flow?: { step: string; detail: string }[];
  howToUse:
    | { kind: "dev"; lang?: string; steps: string[]; note?: string }
    | { kind: "user"; steps: string[]; note?: string };
  links: { live?: string; github?: string };
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "rc-debugger": {
    slug: "rc-debugger",
    name: "rc-debugger",
    tagline: "Terminal debugger & live monitor for Reactive Network cross-chain flows.",
    icon: "⌁",
    accent: "amber",
    problem: "Debugging Reactive Smart Contracts is fragmented across multiple block explorers and origin/destination chains.",
    mechanism: "Unifies the full lifecycle — origin event → RC react() → callback → destination tx — in one terminal view with revert decoding.",
    outcome: "17 automated health diagnostics. One command tells you exactly which stage of an RC flow broke and why.",
    tech: ["Node.js 18+", "TypeScript", "Viem", "Blessed (TUI)", "Reactive RPC", "Etherscan API"],
    flow: [
      { step: "Origin event",       detail: "Listens on the source chain for the trigger event." },
      { step: "RC react()",         detail: "Decodes the Reactive Smart Contract execution + revert reasons." },
      { step: "Callback",           detail: "Verifies the callback fired with the right payload." },
      { step: "Destination tx",     detail: "Confirms execution on the target chain or surfaces failure." },
    ],
    howToUse: {
      kind: "dev",
      lang: "bash",
      steps: [
        "git clone https://github.com/harshkas4na/rc-debugger.git",
        "cd rc-debugger && npm install && npm link",
        "rc-debug init --rc 0xYourReactiveContract",
        "rc-debug diagnose   # one-shot health check",
        "rc-debug watch      # live cross-chain monitor",
      ],
    },
    links: {
      github: "https://github.com/harshkas4na/rc-debugger",
    },
  },

  "walrus-sdk": {
    slug: "walrus-sdk",
    name: "Walrus-SDK",
    tagline: "Type-safe TypeScript SDK for Walrus decentralized storage on Sui.",
    icon: "🐋",
    accent: "blue",
    problem: "Walrus exposes raw HTTP Publisher/Aggregator endpoints — boilerplate, weak types, awkward error handling.",
    mechanism: "A thin, type-safe wrapper over the Walrus HTTP API: upload, retrieve, and verify blobs with proper TS types.",
    outcome: "Drop-in storage for AI datasets, NFT media, and encrypted user content — published on npm as `walrus-sdk`.",
    tech: ["TypeScript", "Walrus HTTP API", "Sui", "npm"],
    flow: [
      { step: "Install",  detail: "Add walrus-sdk to any TS / Node project." },
      { step: "Upload",   detail: "Pass a Buffer/file → returns a Walrus blob ID." },
      { step: "Retrieve", detail: "Query the aggregator by blob ID to get bytes back." },
    ],
    howToUse: {
      kind: "dev",
      lang: "bash",
      steps: [
        "npm install walrus-sdk",
        "// in your code:",
        "import { WalrusClient } from 'walrus-sdk';",
        "const client = new WalrusClient({ publisher, aggregator });",
        "const { blobId } = await client.upload(fileBuffer);",
        "const bytes = await client.retrieve(blobId);",
      ],
    },
    links: {
      live:   "https://walrus-sdk.vercel.app",
    },
  },

  "provenance": {
    slug: "provenance",
    name: "Provenance",
    tagline: "On-chain reputation scoring on Citrea — the first ZK-Rollup on Bitcoin.",
    icon: "◈",
    accent: "purple",
    problem: "DeFi has identity verification but no behavioral trust signal — there's no answer to 'is this a good counterparty?'",
    mechanism: "Tracks on-chain activity, scores it, and mints the result as a Soulbound Token (SBT) — a non-transferable reputation NFT.",
    outcome: "A DeFi-native credit score on Citrea. Lenders, DAOs, and protocols can read trust without revealing identity.",
    tech: ["Solidity", "Foundry", "Soulbound Tokens", "Citrea Testnet", "Next.js", "Express", "Ethers.js"],
    flow: [
      { step: "User actions",     detail: "Loans, repayments, governance votes, on-chain interactions." },
      { step: "Backend relay",    detail: "Indexes events and computes score deltas." },
      { step: "SBT contract",     detail: "Updates the user's non-transferable reputation NFT on Citrea." },
      { step: "Score readable",   detail: "Any contract can query the SBT for trust-aware logic." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the live demo and connect a wallet on Citrea Testnet.",
        "Trigger a few sample on-chain actions (provided in the UI).",
        "Watch your Soulbound reputation score update in real time.",
        "Inspect the SBT in your wallet — it's non-transferable by design.",
      ],
    },
    links: {
      live:   "https://provenance-jade.vercel.app",
      github: "https://github.com/harshkas4na/Provenance",
    },
  },

  "reactiveflow-lender": {
    slug: "reactiveflow-lender",
    name: "ReactiveFlow-Lender",
    tagline: "Cross-chain lending: ETH collateral on Sepolia → MATIC loan on Kopli, no centralized bridge.",
    icon: "⇄",
    accent: "green",
    problem: "Cross-chain lending typically routes through centralized bridges and custodians.",
    mechanism: "Reactive Smart Contracts watch the deposit on Sepolia and autonomously issue the loan on Kopli — pure on-chain message passing.",
    outcome: "Deposit ETH on one chain, receive MATIC on another, repay to release collateral. Zero off-chain operators.",
    tech: ["Solidity", "Reactive Smart Contracts", "Sepolia", "Kopli", "Chainlink Oracle", "MetaMask"],
    flow: [
      { step: "Deposit ETH",        detail: "Lock collateral via depositCollateral() on Sepolia." },
      { step: "RSC observes",       detail: "A Reactive Smart Contract sees the deposit event." },
      { step: "MATIC issued",       detail: "Loan is automatically minted on Kopli to the same address." },
      { step: "Repay & unlock",     detail: "repayLoan() on Kopli triggers collateral release on Sepolia." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the live demo and connect MetaMask on Sepolia.",
        "Call depositCollateral() with an ETH amount — the UI handles the tx.",
        "Switch your wallet to Kopli; the MATIC loan should already be there.",
        "When ready, call repayLoan() on Kopli to release your ETH back on Sepolia.",
      ],
    },
    links: {
      live:   "https://reactive-flow-lender.vercel.app",
      github: "https://github.com/harshkas4na/ReactiveFlow-Lender",
    },
  },

  "protocol-pal": {
    slug: "protocol-pal",
    name: "Protocol-Pal",
    tagline: "AI Web3 assistant that executes on-chain transactions from natural language.",
    icon: "✦",
    accent: "purple",
    problem: "DEX UIs are dense — picking pairs, slippage, approvals, gas — every swap is a multi-step ordeal.",
    mechanism: "An LLM agent (Gemini 2.5 Flash) parses your intent, plans the calls via MCP tools, and executes through Thirdweb / Ethers.",
    outcome: "Type 'swap 0.01 ETH for USDC' — it routes via Uniswap V2 on Sepolia, handles approvals, and confirms back to you.",
    tech: ["Next.js 16", "Gemini 2.5 Flash", "MCP", "Cloudflare Workers", "Vercel AI SDK", "Thirdweb", "Ethers.js", "Uniswap V2"],
    flow: [
      { step: "Natural language",  detail: "User types an intent in plain English." },
      { step: "Intent parser",     detail: "Gemini extracts action, asset, amount, and routes the plan." },
      { step: "MCP agent",         detail: "Tools approve tokens, build calldata, simulate the tx." },
      { step: "On-chain execute",  detail: "Wallet signs once; the swap lands on Sepolia." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the demo and connect a wallet funded on Sepolia.",
        "Type a command like: \"swap 0.01 ETH for USDC\".",
        "Approve any required token allowance when the agent prompts.",
        "Sign the swap — the agent confirms execution and shows the tx hash.",
      ],
    },
    links: {
      github: "https://github.com/harshkas4na/Protocol-Pal",
    },
  },

  "swartz": {
    slug: "swartz",
    name: "SWARTZ",
    tagline: "Decentralized social media with on-chain governance and ML content moderation.",
    icon: "❖",
    accent: "rose",
    problem: "Centralized platforms own moderation, ranking, and identity. Users don't.",
    mechanism: "Posts live on IPFS, identity is wallet-based, moderation runs on a TensorFlow LSTM, and rules are voted via reactive governance contracts.",
    outcome: "A social platform where the community sets the rules — and an RSC enforces them across the network without a central admin.",
    tech: ["Solidity", "Reactive Smart Contracts", "IPFS / Pinata", "TensorFlow", "Next.js", "Sepolia"],
    flow: [
      { step: "Post to IPFS",      detail: "Content is pinned via Pinata; only the CID hits the chain." },
      { step: "ML moderation",     detail: "An LSTM scores text for harmful content client-side." },
      { step: "Governance vote",   detail: "Token holders vote on policy changes." },
      { step: "RSC enforces",      detail: "A Reactive Smart Contract applies the new policy automatically." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Connect a wallet on Sepolia.",
        "Create a post — it's pinned to IPFS, the CID is stored on-chain.",
        "Vote on a policy proposal with your governance tokens.",
        "Watch the Reactive contract auto-apply the rule once the vote passes.",
      ],
    },
    links: {
      github: "https://github.com/harshkas4na/SWARTZ",
    },
  },

  "fiducia": {
    slug: "fiducia",
    name: "Fiducia",
    tagline: "Multi-party group wallets + crypto insurance with proportional rewards.",
    icon: "◊",
    accent: "blue",
    problem: "Solo crypto positions are fragile. Groups want shared treasuries, but proportional voting and risk-sharing are hard to encode.",
    mechanism: "Group wallets pool capital with on-chain proportional voting. Bolt-on insurance covers loan defaults, price drops, and threshold breaches.",
    outcome: "Pool resources, share risk, and split rewards proportionally — all enforced by smart contracts, not trust.",
    tech: ["Solidity", "Multi-sig patterns", "Insurance primitives", "Next.js", "Ethereum"],
    flow: [
      { step: "Create / join group",  detail: "Members deposit; share is proportional to contribution." },
      { step: "Vote on actions",      detail: "Spending, allocation, and policy require quorum." },
      { step: "Buy coverage",         detail: "Opt the group into insurance against specific risks." },
      { step: "Claim & split",        detail: "Payouts and rewards distribute proportionally." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the live site and connect a wallet.",
        "Create a group wallet or join one with an invite.",
        "Deposit your share — voting power scales with contribution.",
        "Opt into an insurance pool and propose group actions for vote.",
      ],
    },
    links: {
      live:   "https://fiducia-docs.vercel.app",
      github: "https://github.com/harshkas4na/Fiducia",
    },
  },

  "mercado": {
    slug: "mercado",
    name: "Mercado",
    tagline: "NFT marketplace with constant-product dynamic pricing and the MERCAT token economy.",
    icon: "✺",
    accent: "amber",
    problem: "NFT pricing is static, illiquid, and fragmented across geographies and marketplaces.",
    mechanism: "Constant-product dynamic pricing (AMM-style) on every listing, plus the MERCAT token for fees, rewards, and governance.",
    outcome: "Listings re-price as supply/demand shifts. Creators earn MERCAT on activity, not just primary sale.",
    tech: ["Solidity", "Reactive Smart Contracts", "ERC1155", "ERC20 (MERCAT)", "OpenZeppelin", "Foundry", "React", "Spline 3D"],
    flow: [
      { step: "Mint / list",       detail: "Creators list ERC-1155 NFTs with a starting curve." },
      { step: "Curve prices",      detail: "Constant-product math adjusts price per buy/sell." },
      { step: "MERCAT rewards",    detail: "Activity (mints, trades) emits MERCAT to participants." },
      { step: "Governance",        detail: "MERCAT holders vote on curves, fees, and listings." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the marketplace and connect a wallet.",
        "Mint or list an NFT — set the starting bonding curve.",
        "Buy or sell to see prices update along the constant-product curve.",
        "Hold MERCAT to earn fees and vote on marketplace policy.",
      ],
    },
    links: {
      github: "https://github.com/harshkas4na/Mercado",
    },
  },

  "cryptotree": {
    slug: "cryptotree",
    name: "CryptoTree",
    tagline: "Interactive mind-map of the blockchain ecosystem — 12 pillars, fully navigable.",
    icon: "❋",
    accent: "green",
    problem: "Crypto education is fragmented. Learners jump between L2s, MEV, oracles, governance — without seeing how it all connects.",
    mechanism: "A 12-pillar mind-map (Cryptography, DeFi, MEV, L2s, Governance, …) where every node is explorable and progress is tracked.",
    outcome: "Pick any pillar, drill into sub-topics, mark concepts as learned. A structured map of Web3, not a flat reading list.",
    tech: ["React", "Interactive graph UI", "Keyboard navigation", "Progress tracking"],
    flow: [
      { step: "Pick a pillar",     detail: "Choose any of the 12 top-level domains." },
      { step: "Drill in",          detail: "Each pillar opens a sub-graph of concepts." },
      { step: "Mark learned",      detail: "Track 'X / Y learned' per branch as you go." },
      { step: "Cross-link",        detail: "See how MEV connects to L2s, oracles to AMMs, etc." },
    ],
    howToUse: {
      kind: "user",
      steps: [
        "Open the live site — no signup, no wallet.",
        "Click any of the 12 pillar cards on the home view.",
        "Use arrow keys / Enter to navigate, Space to mark a concept learned.",
        "Use the search to jump to any topic by name.",
      ],
    },
    links: {
      live:   "https://crytpo-tree.vercel.app/",
      github: "https://github.com/harshkas4na/CrytpoTree",
    },
  },

  "reactive-network-dev": {
    slug: "reactive-network-dev",
    name: "reactive-network-dev",
    tagline: "A Claude Code skill that teaches Claude to design Reactive Network systems.",
    icon: "◐",
    accent: "amber",
    problem: "Reactive Smart Contracts have a steep learning curve — RC/CC two-contract architecture, cron topic hashes, gas quirks, deployment order.",
    mechanism: "A Claude Code skill that loads canonical RC/CC patterns, 12 real-world gotchas, pre-computed cron hashes, and example protocols on demand.",
    outcome: "Install once. Then ask Claude to scaffold a Reactive Network system — it picks correct patterns, avoids known gotchas, deploys cleanly.",
    tech: ["Claude Code", "Solidity", "Foundry (forge / cast)", "Reactive Mainnet", "Lasna Testnet", "Reactscan"],
    flow: [
      { step: "Install skill",     detail: "Symlink it into ~/.claude/skills/." },
      { step: "Start Claude",      detail: "Skill auto-loads when you mention Reactive Network." },
      { step: "Describe goal",     detail: "Ask for a cross-chain system in plain English." },
      { step: "Get RC + CC",       detail: "Claude scaffolds both contracts with deployment commands." },
    ],
    howToUse: {
      kind: "dev",
      lang: "bash",
      note: "Five commands. After this, any new Claude Code session can design Reactive Network systems for you.",
      steps: [
        "git clone https://github.com/harshkas4na/reactive-network-dev.git",
        "cd reactive-network-dev",
        "mkdir -p ~/.claude/skills",
        "ln -s \"$(pwd)/skills/reactive-network-dev\" ~/.claude/skills/reactive-network-dev",
        "claude   # start a session and type / to verify the skill loaded",
      ],
    },
    links: {
      github: "https://github.com/harshkas4na/reactive-network-dev",
    },
  },
};

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
