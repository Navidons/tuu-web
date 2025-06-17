"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"
import { AIAssistant } from "@/components/ai-assistant"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, Loader2 } from "lucide-react"

export function EnterpriseProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [sessionValid, setSessionValid] = useState(true)
  const [systemStatus, setSystemStatus] = useState<"online" | "maintenance" | "error">("online")
  const [layoutInitialized, setLayoutInitialized] = useState(false)

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login")
      setLayoutInitialized(true)
    } else if (!loading) {
      setLayoutInitialized(true)
    }
  }, [user, loading, pathname, router])

  useEffect(() => {
    if (user) {
      validateSession()
      updateLastActivity()
    }
  }, [user])

  const validateSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error || !session) {
        setSessionValid(false)
        router.push("/login")
      }
    } catch (error) {
      console.error("Session validation error:", error)
      setSessionValid(false)
    }
  }

  const updateLastActivity = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          last_login: new Date().toISOString(),
          failed_login_attempts: 0,
        })
        .eq("id", user?.id)

      if (error && !error.message.includes("relation") && !error.message.includes("does not exist")) {
        console.error("Error updating last activity:", error)
      }
    } catch (error) {
      console.log("Database not fully configured yet")
    }
  }

  // Loading state
  if (loading || !layoutInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-96 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Pharo Secondary School</h2>
                <p className="text-sm text-gray-600 mt-1">Enterprise Admissions System</p>
              </div>
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Initializing secure session...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Login page
  if (pathname === "/login") {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">{children}</div>
  }

  // Unauthorized access
  if (!user || !sessionValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-96 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
                <p className="text-sm text-gray-600 mt-1">Your session has expired or is invalid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // System maintenance mode
  if (systemStatus === "maintenance") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-96 shadow-xl">
          <CardContent className="pt-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>System is currently under maintenance. Please try again later.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main application layout with mobile responsiveness and AI assistant
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileResponsiveLayout>
        {children}
        <AIAssistant context="general" />
      </MobileResponsiveLayout>

      {/* Security Footer */}
      <div className="border-t bg-white px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>© 2024 Pharo Secondary School</span>
            <span>•</span>
            <span>Enterprise Edition v3.0.0</span>
            <span>•</span>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  )
}
