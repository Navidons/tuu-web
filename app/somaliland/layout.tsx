import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/somaliland/error-boundary"
import { ThemeProvider } from "@/components/somaliland/theme-provider"
import { Analytics } from "@/components/somaliland/analytics"
import { StructuredData } from "@/components/somaliland/structured-data"
import { Suspense } from "react"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Unity University Somaliland - #1 Leading University in Hargeisa | Best Higher Education in Somaliland",
    template: "%s | Unity University Somaliland - Top University in Hargeisa",
  },
  description:
    "Unity University Somaliland is the premier higher education institution in Hargeisa, offering world-class undergraduate, graduate, and professional programs. Best university in Somaliland for Business, IT, Engineering, Health Sciences, and Education. Accredited programs, expert faculty, modern facilities. Apply now for 2024 admission.",
  keywords: [
    // Primary keywords
    "Unity University Somaliland",
    "best university in Somaliland",
    "top university Hargeisa",
    "Somaliland higher education",
    "university in Hargeisa",

    // Location-based keywords
    "Hargeisa university",
    "Somaliland education",
    "Horn of Africa university",
    "East Africa higher education",
    "Berbera campus",

    // Program-specific keywords
    "business administration Somaliland",
    "information technology courses Hargeisa",
    "engineering programs Somaliland",
    "public health education Hargeisa",
    "teacher training Somaliland",
    "agriculture studies Hargeisa",

    // Academic keywords
    "undergraduate programs Somaliland",
    "graduate degrees Hargeisa",
    "master's programs Somaliland",
    "professional development courses",
    "online learning Somaliland",
    "distance education Hargeisa",

    // Quality indicators
    "accredited university Somaliland",
    "quality education Hargeisa",
    "international standards education",
    "research university Somaliland",
    "modern facilities Hargeisa",

    // Career-focused
    "job placement Somaliland",
    "career development Hargeisa",
    "employment opportunities",
    "skills training Somaliland",
    "professional certification",

    // Cultural keywords
    "Somali language education",
    "Islamic education Somaliland",
    "cultural studies Hargeisa",
    "local community engagement",

    // Comparative keywords
    "best education in Horn of Africa",
    "top ranked university East Africa",
    "leading institution Somaliland",
    "premier university Hargeisa",
  ],
  authors: [{ name: "Unity University Somaliland", url: "https://tuu.university" }],
  creator: "Unity University Somaliland",
  publisher: "Unity University Somaliland",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tuu.university"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "so-SO": "/so",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
      url: "https://tuu.university",
    title: "Unity University Somaliland - #1 Leading University in Hargeisa | Best Higher Education",
    description:
      "Discover excellence at Unity University Somaliland, the premier higher education institution in Hargeisa. Offering world-class programs in Business, IT, Engineering, Health Sciences & more. Modern facilities, expert faculty, 95% job placement rate. Apply now!",
    siteName: "Unity University Somaliland",
    images: [
      {
        url: "/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Unity University Somaliland - Leading University in Hargeisa with Modern Campus",
      },
      {
        url: "/og-image-campus.jpg",
        width: 1200,
        height: 630,
        alt: "Unity University Somaliland Campus in Hargeisa - State-of-the-art Facilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unity University Somaliland - #1 University in Hargeisa | Best Higher Education",
    description:
      "Premier university in Somaliland offering world-class education. Modern facilities, expert faculty, 25+ programs. 95% job placement rate. Apply now for 2024 admission!",
    images: ["/twitter-image.jpg"],
    creator: "@UnityUniSomaliland",
    site: "@UnityUniSomaliland",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "unity-university-somaliland-verification",
    yandex: "unity-university-verification",
    yahoo: "unity-university-verification",
  },
  category: "Education",
  classification: "Higher Education Institution",
  other: {
    "geo.region": "SO-WO",
    "geo.placename": "Hargeisa, Somaliland",
    "geo.position": "9.5600;44.0650",
    ICBM: "9.5600, 44.0650",
    "DC.title": "Unity University Somaliland - Leading Higher Education Institution",
    "DC.creator": "Unity University Somaliland",
    "DC.subject": "Higher Education, University, Somaliland, Hargeisa",
    "DC.description": "Premier university in Somaliland offering world-class higher education programs",
    "DC.publisher": "Unity University Somaliland",
    "DC.contributor": "Unity University Faculty and Staff",
    "DC.date": "2024",
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://tuu.university",
    "DC.language": "en",
    "DC.coverage": "Somaliland, Horn of Africa",
    "DC.rights": "Copyright Unity University Somaliland",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className={cn(inter.className, "min-h-screen bg-background")}> 
            <StructuredData />
                {children}
                <Analytics />
              </div>
            </ThemeProvider>
          </ErrorBoundary>
        </Suspense>
  )
}
