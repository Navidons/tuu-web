"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Activity } from "lucide-react"
import { format } from "date-fns"

interface AnalyticsEvent {
  id: string
  event_type: string
  event_data: any
  created_at: string
}

interface ApplicationAnalyticsProps {
  applicationId: string
}

export function ApplicationAnalytics({ applicationId }: ApplicationAnalyticsProps) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [applicationId])

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from("application_analytics")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "created":
        return "📝"
      case "status_changed":
        return "🔄"
      case "document_uploaded":
        return "📎"
      case "email_sent":
        return "📧"
      case "viewed":
        return "👁️"
      default:
        return "📊"
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "created":
        return "bg-blue-100 text-blue-800"
      case "status_changed":
        return "bg-green-100 text-green-800"
      case "document_uploaded":
        return "bg-purple-100 text-purple-800"
      case "email_sent":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading activity...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Recent Activity</span>
          <Badge variant="secondary">{events.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No activity recorded</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <span className="text-lg">{getEventIcon(event.event_type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getEventColor(event.event_type)} variant="secondary">
                      {event.event_type.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-gray-500">{format(new Date(event.created_at), "MMM d, HH:mm")}</span>
                  </div>
                  {event.event_data && (
                    <p className="text-xs text-gray-600">{JSON.stringify(event.event_data, null, 2)}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
