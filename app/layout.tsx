import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Kasana — Solidity & DApp Developer",
  description:
    "Solidity & DApp Developer at Reactive Network. I build DeFi automation, cross-chain protocols, and AI-powered blockchain products end-to-end — from ideation to production.",
  metadataBase: new URL("https://harshkasana.dev"),
  alternates: { canonical: "/" },
  keywords: [
    "Harsh Kasana", "Solidity Developer", "DApp Developer", "Reactive Network",
    "DeFi", "Smart Contracts", "Web3", "Blockchain Engineer", "Cross-chain",
    "Reactive Smart Contracts", "Next.js", "TypeScript",
  ],
  authors: [{ name: "Harsh Kasana", url: "https://harshkasana.dev" }],
  creator: "Harsh Kasana",
  openGraph: {
    title: "Harsh Kasana — Solidity & DApp Developer",
    description:
      "Building DeFi infrastructure at Reactive Network. $13K+ in grants, 160 users in 48hrs, featured on CryptoSlate, Chainwire & Blockchain Magazine.",
    url: "https://harshkasana.dev",
    siteName: "Harsh Kasana",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kasana — Solidity & DApp Developer",
    description:
      "Building DeFi infrastructure at Reactive Network. $13K+ in grants, 160 users in 48hrs.",
    creator: "@0xkasana",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Kasana",
  url: "https://harshkasana.dev",
  jobTitle: "Solidity & DApp Developer",
  worksFor: { "@type": "Organization", name: "Reactive Network", url: "https://reactive.network" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIIT Nagpur" },
  sameAs: [
    "https://github.com/harshkas4na",
    "https://x.com/0xkasana",
    "https://www.linkedin.com/in/harsh-kasana-117288258/",
    "https://medium.com/@harshkasana05",
  ],
  knowsAbout: [
    "Solidity", "Smart Contracts", "DeFi", "Reactive Smart Contracts",
    "Cross-chain protocols", "Next.js", "TypeScript",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
