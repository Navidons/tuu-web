"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { EnterpriseProtectedLayout } from "@/components/enterprise-protected-layout"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          console.log('Service Worker registered with scope: ', registration.scope);
        }, function(err) {
          console.log('Service Worker registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <AuthProvider>
          <EnterpriseProtectedLayout>{children}</EnterpriseProtectedLayout>
          <Toaster />
        </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
