import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tuu.university/somaliland"
  const currentDate = new Date()

  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/academics`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions/apply`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
  ]

  // Academic program pages
  const academicPages = ["undergraduate", "graduate", "professional", "calendar"].map((program) => ({
    url: `${baseUrl}/academics/${program}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Admission pages
  const admissionPages = ["tuition", "financial-aid", "international"].map((page) => ({
    url: `${baseUrl}/admissions/${page}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Research pages
  const researchPages = ["centers", "publications", "partnerships", "support"].map((page) => ({
    url: `${baseUrl}/research/${page}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // About pages
  const aboutPages = ["history", "leadership", "campus-map", "contact"].map((page) => ({
    url: `${baseUrl}/about/${page}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Program-specific landing pages for SEO
  const programLandingPages = [
    "business-administration-somaliland",
    "information-technology-hargeisa",
    "engineering-programs-somaliland",
    "public-health-education-hargeisa",
    "teacher-training-somaliland",
    "agriculture-studies-hargeisa",
  ].map((program) => ({
    url: `${baseUrl}/programs/${program}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  return [...staticPages, ...academicPages, ...admissionPages, ...researchPages, ...aboutPages, ...programLandingPages]
}
