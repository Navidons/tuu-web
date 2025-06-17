"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { hasPermission, type Permission } from "@/lib/permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle } from "lucide-react"

interface PermissionGuardProps {
  permission: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
  showError?: boolean
}

export function PermissionGuard({ permission, children, fallback, showError = true }: PermissionGuardProps) {
  const { userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userRole || !hasPermission(userRole, permission)) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Access denied. You don't have permission to view this content.</span>
            </div>
          </AlertDescription>
        </Alert>
      )
    }

    return null
  }

  return <>{children}</>
}
