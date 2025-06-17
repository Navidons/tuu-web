"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, User, Settings, Shield, Activity, X, AlertCircle, CheckCircle, Clock, Users } from "lucide-react"
import { RealTimeNotifications } from "@/components/real-time-notifications"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  priority: string
  created_at: string
  data?: any
}

export function EnterpriseTopbar() {
  const { user, userRole, signOut } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [loading, setLoading] = useState(false)
  const subscriptionRef = useRef<any>(null)

  useEffect(() => {
    if (user) {
      fetchNotifications()
      setupNotificationSubscription()
    }

    // Cleanup subscription on unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
        subscriptionRef.current = null
      }
    }
  }, [user])

  const fetchNotifications = async () => {
    try {
      // For now, use mock notifications since the notifications table might not exist yet
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "application",
          title: "New Application Received",
          message: "John Doe has submitted a new application",
          read: false,
          priority: "normal",
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: "2",
          type: "approval",
          title: "Application Approved",
          message: "Jane Smith's application has been approved",
          read: false,
          priority: "high",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: "3",
          type: "reminder",
          title: "Pending Applications",
          message: "You have 5 applications pending review",
          read: true,
          priority: "normal",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ]

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.read).length)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  const setupNotificationSubscription = () => {
    // Only create subscription if one doesn't exist
    if (subscriptionRef.current) {
      return
    }

    try {
      // Create a unique channel name to avoid conflicts
      const channelName = `notifications_${user?.id}_${Date.now()}`

      subscriptionRef.current = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "applications",
          },
          (payload) => {
            // Handle new application notifications
            if (payload.new) {
              const newNotification: Notification = {
                id: Date.now().toString(),
                type: "application",
                title: "New Application Received",
                message: `${payload.new.full_name} has submitted a new application`,
                read: false,
                priority: "normal",
                created_at: new Date().toISOString(),
                data: payload.new,
              }
              setNotifications((prev) => [newNotification, ...prev])
              setUnreadCount((prev) => prev + 1)

              // Show browser notification if permission granted
              if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                new Notification(newNotification.title, {
                  body: newNotification.message,
                  icon: "/favicon.ico",
                })
              }
            }
          },
        )
        .subscribe()
    } catch (error) {
      console.error("Error setting up notification subscription:", error)
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setLoading(true)
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteNotification = (notificationId: string) => {
    try {
      const notification = notifications.find((n) => n.id === notificationId)
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))

      if (notification && !notification.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "urgent" ? "text-red-600" : priority === "high" ? "text-orange-600" : "text-blue-600"

    switch (type) {
      case "application":
        return <Users className={`h-4 w-4 ${iconClass}`} />
      case "approval":
        return <CheckCircle className={`h-4 w-4 ${iconClass}`} />
      case "rejection":
        return <X className={`h-4 w-4 ${iconClass}`} />
      case "system":
        return <AlertCircle className={`h-4 w-4 ${iconClass}`} />
      case "reminder":
        return <Clock className={`h-4 w-4 ${iconClass}`} />
      default:
        return <Bell className={`h-4 w-4 ${iconClass}`} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Request notification permission on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Pharo Secondary School</h1>
            <p className="text-xs text-gray-500">Enterprise Admissions Management</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* System Status */}
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">System Online</span>
        </div>

        {/* Real-time Notifications */}
        <RealTimeNotifications />

        {/* User Role Badge */}
        <Badge
          variant="outline"
          className={`capitalize font-medium ${
            userRole === "admin"
              ? "border-red-200 text-red-700 bg-red-50"
              : userRole === "principal"
                ? "border-purple-200 text-purple-700 bg-purple-50"
                : userRole === "clerk"
                  ? "border-blue-200 text-blue-700 bg-blue-50"
                  : "border-gray-200 text-gray-700 bg-gray-50"
          }`}
        >
          <Shield className="h-3 w-3 mr-1" />
          {userRole}
        </Badge>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border-2 border-gray-200">
                <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">{user?.user_metadata?.full_name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {userRole}
              </Badge>
            </div>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Activity className="mr-2 h-4 w-4" />
              <span>Activity Log</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
