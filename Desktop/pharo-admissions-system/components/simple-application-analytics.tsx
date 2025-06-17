"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Eye, Edit, FileText, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface AnalyticsEvent {
  id: string
  event_type: string
  event_data: any
  created_at: string
  user_id: string
}

interface SimpleApplicationAnalyticsProps {
  applicationId: string
}

export function SimpleApplicationAnalytics({ applicationId }: SimpleApplicationAnalyticsProps) {
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
        .limit(20)

      if (error) {
        console.error("Error fetching analytics:", error)
        return
      }
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "view":
        return <Eye className="h-4 w-4" />
      case "edit":
        return <Edit className="h-4 w-4" />
      case "status_change":
        return <Activity className="h-4 w-4" />
      case "document_upload":
        return <FileText className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "view":
        return "secondary"
      case "edit":
        return "default"
      case "status_change":
        return "destructive"
      case "document_upload":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatEventDescription = (event: AnalyticsEvent) => {
    switch (event.event_type) {
      case "view":
        return "Application viewed"
      case "edit":
        return "Application edited"
      case "status_change":
        return `Status changed to ${event.event_data?.new_status || "unknown"}`
      case "document_upload":
        return `Document uploaded: ${event.event_data?.filename || "file"}`
      default:
        return event.event_type.replace("_", " ")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading activity...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No activity recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-2 border rounded-lg">
                <div className="flex-shrink-0">{getEventIcon(event.event_type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{formatEventDescription(event)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getEventColor(event.event_type) as any} className="text-xs">
                      {event.event_type.replace("_", " ")}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(event.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
