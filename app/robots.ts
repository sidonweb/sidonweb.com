import type { MetadataRoute } from "next";
import { metaData } from "./config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${metaData.baseUrl}/sitemap.xml`,
    host: metaData.baseUrl,
  };
}
