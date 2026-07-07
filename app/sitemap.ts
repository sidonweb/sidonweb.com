import type { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { projects } from "./work/project-data";
import { metaData } from "./config";

const baseUrl = metaData.baseUrl.replace(/\/$/, "");
const now = new Date();

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticRoutes: SitemapEntry[] = [
  { url: baseUrl, changeFrequency: "monthly", priority: 1, lastModified: now },
  { url: `${baseUrl}/work`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
  { url: `${baseUrl}/blogs`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
  { url: `${baseUrl}/gallery`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
  { url: `${baseUrl}/stack`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
  { url: `${baseUrl}/meditate`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: SitemapEntry[] = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: SitemapEntry[] = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
