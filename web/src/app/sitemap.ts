import { MetadataRoute } from "next";
import { getAllPaperSlugs } from "@/lib/papers";
import { theoryModelsList } from "@/components/TheoryCatalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eigenia.com";

  // Static Routes
  const staticRoutes = [
    "",
    "/mission",
    "/tracks",
    "/physics",
    "/collaborate",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Papers Routes (25 Papers & Treatises)
  const paperSlugs = getAllPaperSlugs();
  const paperRoutes = paperSlugs.map((slug) => ({
    url: `${baseUrl}/papers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Dynamic Theory Routes (9 Applied Physics Models)
  const theoryRoutes = theoryModelsList.map((model) => ({
    url: `${baseUrl}/theory/${model.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...paperRoutes, ...theoryRoutes];
}
