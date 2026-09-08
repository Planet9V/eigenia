import { MetadataRoute } from "next";
import { getAllPaperSlugs } from "@/lib/papers";
import { theoryModelsList } from "@/lib/theoryModels";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static Routes
  const staticRoutes = [
    "",
    "/mission",
    "/tracks",
    "/physics",
    "/collaborate",
    "/unified-standard",
    "/wiki",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Papers Routes (one per PAPERS_REGISTRY entry)
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
