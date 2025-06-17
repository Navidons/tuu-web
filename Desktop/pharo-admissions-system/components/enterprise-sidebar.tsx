"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { PermissionGuard } from "@/components/permission-guard"
import { PERMISSIONS } from "@/lib/permissions"
import { useState, useEffect } from "react"
import axios from "axios"
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  Settings,
  GraduationCap,
  BarChart3,
  Shield,
  Activity,
  UserCheck,
  Clock,
  Brain,
  Smartphone,
  Zap,
  Archive,
} from "lucide-react"
import { LucideProps } from "lucide-react"
import { Permission } from "@/lib/permissions"

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  permission: Permission;
  badge?: string;
  dynamicBadge?: boolean;
}

const navigationSections: { title: string; items: NavigationItem[] }[] = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        permission: PERMISSIONS.VIEW_APPLICATIONS
      },
      {
        name: "AI Insights",
        href: "/ai-insights",
        icon: Brain,
        permission: PERMISSIONS.VIEW_REPORTS,
        badge: "AI"
      },
      {
        name: "Reports",
        href: "/reports",
        icon: BarChart3,
        permission: PERMISSIONS.VIEW_REPORTS
      }
    ]
  },
  {
    title: "Applications",
    items: [
      {
        name: "All Applications",
        href: "/applications",
        icon: FileText,
        permission: PERMISSIONS.VIEW_APPLICATIONS
      },
      {
        name: "Pending Review",
        href: "/applications?status=pending",
        icon: Clock,
        permission: PERMISSIONS.VIEW_APPLICATIONS,
        dynamicBadge: true
      },
      {
        name: "Approved",
        href: "/applications?status=approved",
        icon: UserCheck,
        permission: PERMISSIONS.VIEW_APPLICATIONS
      },
      {
        name: "Archived",
        href: "/applications/archived",
        icon: Archive,
        permission: PERMISSIONS.VIEW_APPLICATIONS
      }
    ]
  },
  {
    title: "Management",
    items: [
      {
        name: "Students",
        href: "/students",
        icon: GraduationCap,
        permission: PERMISSIONS.VIEW_STUDENTS
      },
      {
        name: "Letter Templates",
        href: "/letters",
        icon: Mail,
        permission: PERMISSIONS.MANAGE_TEMPLATES
      }
    ]
  },
  {
    title: "Enterprise",
    items: [
      {
        name: "User Management",
        href: "/users",
        icon: Users,
        permission: PERMISSIONS.MANAGE_USERS
      },
      {
        name: "Audit Logs",
        href: "/audit",
        icon: Activity,
        permission: PERMISSIONS.VIEW_AUDIT_LOGS
      },
      {
        name: "PWA Features",
        href: "/pwa",
        icon: Smartphone,
        permission: PERMISSIONS.VIEW_APPLICATIONS,
        badge: "NEW"
      },
      {
        name: "System Settings",
        href: "/settings",
        icon: Settings,
        permission: PERMISSIONS.MANAGE_SETTINGS
      }
    ]
  }
];

export function EnterpriseSidebar() {
  const pathname = usePathname()
  const { userRole } = useAuth()
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get("/api/applications/pending-count")
        setPendingApplicationsCount(response.data.count)
      } catch (error) {
        console.error("Error fetching pending applications count:", error)
        setPendingApplicationsCount(0) // Default to 0 on error
      }
    }

    fetchPendingCount()
    const interval = setInterval(fetchPendingCount, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
      {/* Header */}
      <div className="flex h-16 items-center justify-center bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Pharo Admin</h1>
            <p className="text-xs text-gray-300">Enterprise v3.0</p>
          </div>
        </div>
      </div>

      {/* User Role Indicator */}
      <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Current Role</span>
          <Badge
            variant="outline"
            className={`text-xs font-medium border ${
              userRole === "admin"
                ? "border-red-400 text-red-300 bg-red-900/20"
                : userRole === "principal"
                  ? "border-purple-400 text-purple-300 bg-purple-900/20"
                  : userRole === "clerk"
                    ? "border-blue-400 text-blue-300 bg-blue-900/20"
                    : "border-gray-400 text-gray-300 bg-gray-900/20"
            }`}
          >
            {userRole?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <PermissionGuard key={item.name} permission={item.permission} showError={false}>
                  <NavigationItem 
                    item={item} 
                    pathname={pathname} 
                    pendingApplicationsCount={item.dynamicBadge ? pendingApplicationsCount : undefined}
                  />
                </PermissionGuard>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>System Status: Online</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
          <Zap className="h-3 w-3" />
          <span>AI Assistant: Active</span>
        </div>
        <div className="text-xs text-gray-500">Version 3.0.0 Enterprise</div>
      </div>
    </div>
  )
}

function NavigationItem({
  item,
  pathname,
  pendingApplicationsCount
}: {
  item: NavigationItem;
  pathname: string;
  pendingApplicationsCount?: number | null;
}) {
  const isActive =
    pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href.split("?")[0]))

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          : "text-gray-300 hover:bg-gray-700/50 hover:text-white",
      )}
    >
      <div className="flex items-center">
        <item.icon
          className={cn(
            "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
            isActive ? "text-white" : "text-gray-400 group-hover:text-white",
          )}
        />
        <span>{item.name}</span>
      </div>
      {item.badge && (
        <Badge
          variant="outline"
          className={cn(
            "text-xs border-0 px-1.5 py-0.5",
            item.badge === "urgent"
              ? "bg-red-500 text-white"
              : item.badge === "AI"
                ? "bg-purple-500 text-white"
                : item.badge === "NEW"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white",
          )}
        >
          {item.badge === "urgent" ? "!" : item.badge}
        </Badge>
      )}
      {item.dynamicBadge && pendingApplicationsCount && pendingApplicationsCount > 0 && (
        <Badge
          variant="outline"
          className="text-xs border-0 px-1.5 py-0.5 bg-red-500 text-white"
        >
          {pendingApplicationsCount}
        </Badge>
      )}
    </Link>
  )
}
