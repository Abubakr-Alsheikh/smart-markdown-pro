import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your final deployed URL
  const baseUrl = "https://smart-markdown-pro.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // If you add more pages later (e.g., /about, /blog), add them here
  ];
}
