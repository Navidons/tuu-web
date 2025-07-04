import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Unity University Liberia - Leading Higher Education in West Africa | Monrovia Campus",
    template: "%s | Unity University Liberia - Premier Education in West Africa",
  },
  description:
    "Unity University Liberia Campus in Monrovia - Premier higher education institution combining Liberian heritage with global academic excellence. The Love of Liberty Brought Us Here. Offering world-class programs in Business, IT, Engineering, and Health Sciences.",
  keywords: [
    "Unity University Liberia",
    "Liberia university",
    "Monrovia university",
    "higher education Liberia",
    "West Africa university",
    "Liberian education",
    "business administration Liberia",
    "information technology Liberia",
    "engineering programs Liberia",
    "public health Liberia",
    "accredited university Liberia",
    "The Love of Liberty Brought Us Here",
  ],
  authors: [{ name: "Unity University Liberia", url: "https://unity.edu.lr" }],
  creator: "Unity University Liberia",
  publisher: "Unity University Liberia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://unity.edu.lr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unity.edu.lr",
    title: "Unity University Liberia - Leading Higher Education in West Africa",
    description:
      "Premier higher education institution in Monrovia, Liberia. Combining Liberian heritage with global academic excellence. The Love of Liberty Brought Us Here.",
    siteName: "Unity University Liberia",
    images: [
      {
        url: "/og-image-liberia.jpg",
        width: 1200,
        height: 630,
        alt: "Unity University Liberia Campus in Monrovia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unity University Liberia - Leading Higher Education in West Africa",
    description:
      "Premier university in Monrovia, Liberia. World-class education combining heritage with excellence. Apply now!",
    images: ["/twitter-image-liberia.jpg"],
    creator: "@UnityUniLiberia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "unity-university-liberia-verification",
  },
  category: "Education",
    generator: 'v0.dev'
}

export default function LiberiaLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.className}>{children}</div>
}
