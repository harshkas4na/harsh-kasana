import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Kasana — Blockchain Developer",
  description:
    "Junior Solidity Developer at Reactive Network. I build DeFi automation tools, cross-chain protocols, and AI-powered blockchain products end-to-end — from ideation to shipping.",
  metadataBase: new URL("https://harshkasana.dev"),
  colorScheme: "dark",
  openGraph: {
    title: "Harsh Kasana — Blockchain Developer",
    description:
      "Building DeFi infrastructure at Reactive Network. $13K+ in grants, 160 users in 48hrs, featured on CryptoSlate.",
    url: "https://harshkasana.dev",
    siteName: "Harsh Kasana",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kasana — Blockchain Developer",
    description: "Building DeFi infrastructure at Reactive Network.",
    creator: "@0xkasana",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
