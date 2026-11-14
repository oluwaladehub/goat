import type { MetadataRoute } from "next";
import { siteOrigin } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteOrigin && { sitemap: `${siteOrigin}/sitemap.xml` }),
  };
}
