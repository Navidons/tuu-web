import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import LiveChat from "@/components/ui/live-chat"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Samba Tours & Travel - Discover Uganda & East Africa",
  description:
    "Experience the beauty of Uganda and East Africa with our tailored and group travel packages. Book your adventure today!",
  keywords: "Uganda tours, East Africa travel, safari, gorilla trekking, wildlife, tourism",
  openGraph: {
    title: "Samba Tours & Travel - Discover Uganda & East Africa",
    description: "Experience the beauty of Uganda and East Africa with our tailored and group travel packages.",
    images: ["/images/hero-uganda.jpg"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-inter bg-background text-earth-900">
        <ThemeProvider
          defaultTheme="light"
        >
          {children}
          <LiveChat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
