import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainHeader } from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "UEDCL Transformer Maintenance System",
  description: "A comprehensive system for managing transformer maintenance operations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

