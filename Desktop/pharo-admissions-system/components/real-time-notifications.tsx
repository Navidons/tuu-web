"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface RealTimeNotification {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function RealTimeNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<RealTimeNotification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const subscriptionRef = useRef<any>(null)

  useEffect(() => {
    if (user) {
      setupRealTimeSubscriptions()
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [user])

  const setupRealTimeSubscriptions = () => {
    if (subscriptionRef.current) return

    const channelName = `realtime_${user?.id}_${Date.now()}`

    subscriptionRef.current = supabase
      .channel(channelName)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "applications" }, (payload) => {
        const newNotification: RealTimeNotification = {
          id: `app_${payload.new.id}`,
          type: "info",
          title: "New Application Received",
          message: `${payload.new.full_name} has submitted a new application`,
          timestamp: new Date(),
          read: false,
          actionUrl: `/applications/${payload.new.id}`,
        }

        addNotification(newNotification)
        showToast(newNotification)
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "applications" }, (payload) => {
        if (payload.old.status !== payload.new.status) {
          const newNotification: RealTimeNotification = {
            id: `status_${payload.new.id}`,
            type:
              payload.new.status === "approved" ? "success" : payload.new.status === "rejected" ? "error" : "warning",
            title: "Application Status Updated",
            message: `${payload.new.full_name}'s application has been ${payload.new.status}`,
            timestamp: new Date(),
            read: false,
            actionUrl: `/applications/${payload.new.id}`,
          }

          addNotification(newNotification)
          showToast(newNotification)
        }
      })
      .subscribe()
  }

  const addNotification = (notification: RealTimeNotification) => {
    setNotifications((prev) => [notification, ...prev.slice(0, 49)]) // Keep last 50
    setUnreadCount((prev) => prev + 1)
  }

  const showToast = (notification: RealTimeNotification) => {
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === "error" ? "destructive" : "default",
    })

    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
        tag: notification.id,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-96 max-h-[32rem] shadow-xl z-50 border-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Real-time Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="w-fit">
                {unreadCount} unread
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm">No notifications yet</p>
                  <p className="text-xs text-gray-400 mt-1">You'll see real-time updates here</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors group ${
                        !notification.read ? `${getTypeColor(notification.type)} border-l-4` : ""
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-gray-400">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
