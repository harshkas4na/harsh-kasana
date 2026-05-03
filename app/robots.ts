import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://harshkasana.dev/sitemap.xml",
    host: "https://harshkasana.dev",
  };
}
