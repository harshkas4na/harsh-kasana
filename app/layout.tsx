import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Harsh Kasana — Full-Stack & Smart Contract Engineer",
  description:
    "Full-Stack & Smart Contract Engineer, ex-Reactive Network. I ship DeFi automation, cross-chain protocols, and AI-powered products end-to-end — now going deep on Go & cloud infrastructure.",
  metadataBase: new URL("https://harshkasana.dev"),
  alternates: { canonical: "/" },
  keywords: [
    "Harsh Kasana", "Full-Stack Engineer", "Smart Contract Engineer", "Backend Engineer",
    "Solidity Developer", "Go", "Cloud Infrastructure", "Reactive Network",
    "DeFi", "Smart Contracts", "Web3", "Cross-chain", "Next.js", "TypeScript",
  ],
  authors: [{ name: "Harsh Kasana", url: "https://harshkasana.dev" }],
  creator: "Harsh Kasana",
  openGraph: {
    title: "Harsh Kasana — Full-Stack & Smart Contract Engineer",
    description:
      "Ex-Reactive Network. $15K+ in grants & prizes, 160 users in 48hrs, featured on CryptoSlate, Chainwire & Blockchain Magazine. Now building in Go & cloud.",
    url: "https://harshkasana.dev",
    siteName: "Harsh Kasana",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kasana — Full-Stack & Smart Contract Engineer",
    description:
      "Ex-Reactive Network. $15K+ in grants & prizes, 160 users in 48hrs. Now building in Go & cloud.",
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
  jobTitle: "Full-Stack & Smart Contract Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIIT Nagpur" },
  sameAs: [
    "https://github.com/harshkas4na",
    "https://x.com/0xkasana",
    "https://www.linkedin.com/in/harsh-kasana-8b6a79258/",
    "https://medium.com/@harshkasana05",
  ],
  knowsAbout: [
    "Solidity", "Smart Contracts", "DeFi", "Reactive Smart Contracts",
    "Cross-chain protocols", "Go", "Docker", "AWS", "Cloud Infrastructure",
    "Next.js", "TypeScript",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
