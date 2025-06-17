"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Phone, Mail, Calendar, MapPin, GraduationCap, DollarSign } from "lucide-react"

interface Student {
  id: string
  student_id: string
  application_id: string
  class_admitted: string
  enrolled_date: string
  guardian_name?: string
  guardian_phone?: string
  guardian_email?: string
  transport_mode?: string
  status?: string
  applications?: {
    full_name: string
    email: string
    phone?: string
    gender?: string
  }
}

interface StudentProfileCardProps {
  student: Student
  onViewDetails?: (studentId: string) => void
  compact?: boolean
}

export function StudentProfileCard({ student, onViewDetails, compact = false }: StudentProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const formatTransportMode = (mode?: string) => {
    if (!mode) return "Not specified"
    return mode.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {getInitials(student.applications?.full_name || "Student")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{student.applications?.full_name}</p>
              <p className="text-xs text-gray-500">{student.student_id}</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-xs">
                {student.class_admitted}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">{student.status || "Active"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                {getInitials(student.applications?.full_name || "Student")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{student.applications?.full_name}</CardTitle>
              <p className="text-sm text-gray-600">{student.student_id}</p>
            </div>
          </div>
          <Badge className={getStatusColor(student.status)}>{student.status || "Active"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="h-4 w-4 text-gray-400" />
            <span className="font-medium">Class:</span>
            <span>{student.class_admitted}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">Enrolled:</span>
            <span>{new Date(student.enrolled_date).toLocaleDateString()}</span>
          </div>

          {student.applications?.email && (
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Email:</span>
              <span className="truncate">{student.applications.email}</span>
            </div>
          )}

          {student.applications?.phone && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Phone:</span>
              <span>{student.applications.phone}</span>
            </div>
          )}

          {student.guardian_name && (
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Guardian:</span>
              <span>{student.guardian_name}</span>
            </div>
          )}

          {student.transport_mode && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Transport:</span>
              <span>{formatTransportMode(student.transport_mode)}</span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewDetails?.(student.id)}>
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <DollarSign className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
