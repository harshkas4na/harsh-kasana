import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harsh Kasana — Solidity & DApp Developer",
    short_name: "Harsh Kasana",
    description:
      "Solidity & DApp Developer at Reactive Network. Building DeFi automation, cross-chain protocols, and AI-powered blockchain products.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#0f0f0f",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
