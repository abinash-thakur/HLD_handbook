import type { MetadataRoute } from "next";
import { getAllConcepts, getAllQuestions, getAllTags } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/concepts` },
    { url: `${BASE_URL}/questions` },
    ...getAllConcepts().map((c) => ({
      url: `${BASE_URL}/concepts/${c.frontmatter.slug}`,
      lastModified: c.frontmatter.lastUpdated,
    })),
    ...getAllQuestions().map((q) => ({
      url: `${BASE_URL}/questions/${q.frontmatter.slug}`,
      lastModified: q.frontmatter.lastUpdated,
    })),
    ...getAllTags().map((tag) => ({
      url: `${BASE_URL}/tags/${encodeURIComponent(tag)}`,
    })),
  ];
}
