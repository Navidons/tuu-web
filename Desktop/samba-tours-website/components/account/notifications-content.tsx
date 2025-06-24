"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, MessageSquare, Calendar, Plane, Heart, Trash2 } from "lucide-react"

const notificationSettings = [
  {
    category: "Booking Updates",
    icon: Calendar,
    settings: [
      { id: "booking_confirmation", label: "Booking confirmations", email: true, push: true },
      { id: "booking_changes", label: "Booking changes & updates", email: true, push: true },
      { id: "payment_receipts", label: "Payment receipts", email: true, push: false },
      { id: "trip_reminders", label: "Trip reminders", email: true, push: true },
    ],
  },
  {
    category: "Travel Updates",
    icon: Plane,
    settings: [
      { id: "weather_alerts", label: "Weather alerts", email: false, push: true },
      { id: "travel_advisories", label: "Travel advisories", email: true, push: true },
      { id: "flight_updates", label: "Flight updates", email: true, push: true },
      { id: "itinerary_changes", label: "Itinerary changes", email: true, push: true },
    ],
  },
  {
    category: "Marketing",
    icon: Heart,
    settings: [
      { id: "special_offers", label: "Special offers & deals", email: true, push: false },
      { id: "new_destinations", label: "New destinations", email: true, push: false },
      { id: "newsletter", label: "Monthly newsletter", email: true, push: false },
      { id: "personalized_recommendations", label: "Personalized recommendations", email: true, push: false },
    ],
  },
  {
    category: "Social",
    icon: MessageSquare,
    settings: [
      { id: "review_requests", label: "Review requests", email: true, push: false },
      { id: "social_updates", label: "Social media updates", email: false, push: false },
      { id: "community_posts", label: "Community posts", email: false, push: false },
    ],
  },
]

const recentNotifications = [
  {
    id: "1",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your Gorilla Trekking Adventure booking has been confirmed for March 15, 2024",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "offer",
    title: "Special Offer",
    message: "20% off on all safari tours this month. Book now and save!",
    time: "1 day ago",
    read: true,
  },
  {
    id: "3",
    type: "reminder",
    title: "Trip Reminder",
    message: "Your Murchison Falls Safari starts in 3 days. Don't forget to pack!",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "weather",
    title: "Weather Alert",
    message: "Light rain expected in Queen Elizabeth National Park tomorrow",
    time: "3 days ago",
    read: true,
  },
]

export default function NotificationsContent() {
  const [settings, setSettings] = useState(notificationSettings)
  const [notifications, setNotifications] = useState(recentNotifications)

  const updateSetting = (categoryIndex: number, settingIndex: number, type: "email" | "push", value: boolean) => {
    const newSettings = [...settings]
    newSettings[categoryIndex].settings[settingIndex][type] = value
    setSettings(newSettings)
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-forest-600" />
      case "offer":
        return <Heart className="h-5 w-5 text-sunset-600" />
      case "reminder":
        return <Bell className="h-5 w-5 text-earth-600" />
      case "weather":
        return <Plane className="h-5 w-5 text-sky-600" />
      default:
        return <Bell className="h-5 w-5 text-earth-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earth-900">Notifications</h1>
        <p className="text-earth-600 mt-1">Manage your notification preferences and view recent notifications</p>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Notifications</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg border ${
                  !notification.read ? "bg-forest-50 border-forest-200" : "bg-white"
                }`}
              >
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-earth-900">{notification.title}</h4>
                    <div className="flex items-center space-x-2">
                      {!notification.read && <Badge variant="secondary">New</Badge>}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-earth-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-earth-500 mt-2">{notification.time}</p>
                </div>
                {!notification.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      {settings.map((category, categoryIndex) => {
        const Icon = category.icon
        return (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <span>{category.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-earth-600 border-b pb-2">
                  <div>Notification Type</div>
                  <div className="text-center">Email</div>
                  <div className="text-center">Push</div>
                </div>
                {category.settings.map((setting, settingIndex) => (
                  <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <Label htmlFor={`${setting.id}_email`} className="font-medium">
                        {setting.label}
                      </Label>
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        id={`${setting.id}_email`}
                        checked={setting.email}
                        onCheckedChange={(checked) => updateSetting(categoryIndex, settingIndex, "email", checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        id={`${setting.id}_push`}
                        checked={setting.push}
                        onCheckedChange={(checked) => updateSetting(categoryIndex, settingIndex, "push", checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Notification Preferences</Button>
      </div>
    </div>
  )
}
