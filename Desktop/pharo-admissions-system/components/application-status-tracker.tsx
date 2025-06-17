"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertCircle, FileText, Mail } from "lucide-react"
import { format } from "date-fns"

interface ApplicationStatusTrackerProps {
  applicationStatus: string
  createdAt: string
  approvedAt?: string | null
  documents: any[]
  emailSent: boolean
}

export function ApplicationStatusTracker({
  applicationStatus,
  createdAt,
  approvedAt,
  documents,
  emailSent,
}: ApplicationStatusTrackerProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "deferred":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "deferred":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const steps = [
    {
      title: "Application Submitted",
      completed: true,
      date: createdAt,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Documents Uploaded",
      completed: documents.length > 0,
      date: documents.length > 0 ? createdAt : null,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Application Reviewed",
      completed: applicationStatus !== "pending",
      date: approvedAt,
      icon: getStatusIcon(applicationStatus),
    },
    {
      title: "Decision Communicated",
      completed: emailSent,
      date: emailSent ? approvedAt : null,
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Application Progress
          <Badge className={getStatusColor(applicationStatus)}>{applicationStatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${step.completed ? "text-green-600" : "text-gray-400"}`}>{step.icon}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                  {step.title}
                </p>
                {step.date && <p className="text-xs text-gray-500">{format(new Date(step.date), "PPP")}</p>}
              </div>
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
