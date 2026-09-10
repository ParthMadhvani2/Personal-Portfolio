import type { MetadataRoute } from "next";
import { SITE_URL } from "../data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // No crawl-delay: Google ignores it and Bing reads it as a throttle, which
      // is the opposite of what a five-page site wants.
      // _resp.html is a local responsive-audit harness, not a page.
      { userAgent: "*", allow: "/", disallow: ["/_resp.html"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
