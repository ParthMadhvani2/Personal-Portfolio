import type { MetadataRoute } from "next";
import { SITE_URL } from "../data/site";
import { products } from "../data/products";
import { articles } from "../data/articles";

/**
 * Generated from the same data the pages render from, so a new product cannot
 * ship unindexed. Replaces the hand-written robots.txt reference to a
 * /sitemap.xml that did not exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/crafts`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/notes`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE_URL}/tech-i-know`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const work: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/notes/${a.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...routes, ...work, ...posts].map((r) => ({
    ...r,
    lastModified: now,
  }));
}
