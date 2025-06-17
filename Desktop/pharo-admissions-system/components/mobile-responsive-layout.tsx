"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { EnterpriseSidebar } from "@/components/enterprise-sidebar"
import { EnterpriseTopbar } from "@/components/enterprise-topbar"
import { Menu, X, Smartphone, Tablet, Monitor } from "lucide-react"

interface MobileResponsiveLayoutProps {
  children: React.ReactNode
}

export function MobileResponsiveLayout({ children }: MobileResponsiveLayoutProps) {
  const { user, userRole } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    checkDeviceType()
    window.addEventListener("resize", checkDeviceType)

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("resize", checkDeviceType)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstallable(false)
      }
      setDeferredPrompt(null)
    }
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  // Mobile Layout
  if (deviceType === "mobile") {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <div className="h-full">
                <EnterpriseSidebar />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-semibold text-gray-900">Pharo Admin</span>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {getDeviceIcon()}
              <span className="ml-1 capitalize">{deviceType}</span>
            </Badge>
          </div>
        </div>

        {/* PWA Install Banner */}
        {isInstallable && (
          <div className="bg-blue-600 text-white p-3 text-center">
            <div className="flex items-center justify-between">
              <span className="text-sm">Install app for better experience</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" onClick={handleInstallPWA}>
                  Install
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsInstallable(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">{children}</div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="bg-white border-t p-2">
          <div className="flex justify-around">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Monitor className="h-4 w-4 mb-1" />
              <span className="text-xs">Dashboard</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Smartphone className="h-4 w-4 mb-1" />
              <span className="text-xs">Apps</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Tablet className="h-4 w-4 mb-1" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Tablet Layout
  if (deviceType === "tablet") {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Collapsible Sidebar for Tablet */}
        <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <EnterpriseSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 flex flex-col">
          <EnterpriseTopbar />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    )
  }

  // Desktop Layout (default)
  return (
    <div className="flex h-screen bg-gray-50">
      <EnterpriseSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EnterpriseTopbar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
