import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/", "/_next/", "/static/", "*.json", "/search?*", "/internal/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/", "/internal/*"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/", "/internal/*"],
      },
    ],
    sitemap: "https://tuu.university/somaliland/sitemap.xml",
    host: "https://tuu.university/somaliland",
  }
}
