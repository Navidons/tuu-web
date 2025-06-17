"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Application {
  id: string
  full_name: string
  email: string
  phone: string | null
  status: string
  priority_score: number
  created_at: string
  status_updated_at: string
  documents_count: number
  interview_scheduled: boolean
  documents_verified: boolean
  fee_paid: boolean
}

interface SimpleApplicationsListProps {
  onSelectionChange: (selectedIds: string[]) => void
}

export function SimpleApplicationsList({ onSelectionChange }: SimpleApplicationsListProps) {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("priority")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Fetch applications with fallback to direct table query
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true)

      // Try materialized view first, fallback to direct table query
      let query = supabase.from("application_summary_mv").select("*")

      // If materialized view doesn't exist, use direct table query
      let { data, error } = await query

      if (error && error.code === "42P01") {
        // Materialized view doesn't exist, use direct query
        query = supabase.from("applications").select(`
            id,
            full_name,
            email,
            phone,
            status,
            priority_score,
            created_at,
            status_updated_at,
            documents_count,
            interview_scheduled,
            documents_verified,
            fee_paid
          `)

        const result = await query
        data = result.data
        error = result.error
      }

      if (error) throw error

      let filteredData = data || []

      // Apply filters
      if (statusFilter !== "all") {
        filteredData = filteredData.filter((app) => app.status === statusFilter)
      }

      // Apply search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        filteredData = filteredData.filter(
          (app) =>
            app.full_name?.toLowerCase().includes(searchLower) ||
            app.email?.toLowerCase().includes(searchLower) ||
            app.phone?.toLowerCase().includes(searchLower),
        )
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        switch (sortBy) {
          case "priority":
            return (b.priority_score || 0) - (a.priority_score || 0)
          case "recent":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          case "status":
            return (
              new Date(b.status_updated_at || b.created_at).getTime() -
              new Date(a.status_updated_at || a.created_at).getTime()
            )
          case "name":
            return (a.full_name || "").localeCompare(b.full_name || "")
          default:
            return 0
        }
      })

      setApplications(filteredData)
    } catch (error) {
      console.error("Error fetching applications:", error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }, [searchTerm, statusFilter, sortBy])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, statusFilter, sortBy, fetchApplications])

  // Handle selection changes
  const handleSelectionChange = useCallback(
    (applicationId: string, checked: boolean) => {
      const newSelection = checked ? [...selectedIds, applicationId] : selectedIds.filter((id) => id !== applicationId)

      setSelectedIds(newSelection)
      onSelectionChange(newSelection)
    },
    [selectedIds, onSelectionChange],
  )

  const handleSelectAll = useCallback(() => {
    const allIds = applications.map((app) => app.id)
    const newSelection = selectedIds.length === applications.length ? [] : allIds
    setSelectedIds(newSelection)
    onSelectionChange(newSelection)
  }, [applications, selectedIds, onSelectionChange])

  // Status color function
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

  // Priority badge
  const getPriorityBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-red-100 text-red-800">High</Badge>
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
    return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="deferred">Deferred</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority Score</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="status">Status Updated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{applications.length} applications</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Selection */}
      {applications.length > 0 && (
        <div className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg">
          <Checkbox
            checked={selectedIds.length === applications.length && applications.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-gray-600">
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select all"}
          </span>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-2">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedIds.includes(application.id)}
                    onCheckedChange={(checked) => handleSelectionChange(application.id, checked as boolean)}
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{application.full_name}</h3>
                      {getPriorityBadge(application.priority_score || 50)}
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{application.email}</span>
                      {application.phone && <span>{application.phone}</span>}
                      <span>{formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}</span>
                    </div>

                    <div className="flex items-center space-x-4 mt-2">
                      {(application.documents_count || 0) > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <FileText className="h-3 w-3" />
                          <span>{application.documents_count} docs</span>
                        </div>
                      )}

                      {application.interview_scheduled && (
                        <Badge variant="outline" className="text-xs">
                          Interview Scheduled
                        </Badge>
                      )}

                      {application.documents_verified && (
                        <Badge variant="outline" className="text-xs text-green-600">
                          Docs Verified
                        </Badge>
                      )}

                      {application.fee_paid && (
                        <Badge variant="outline" className="text-xs text-blue-600">
                          Fee Paid
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right text-sm">
                    <div className="font-medium">Score: {application.priority_score || 50}</div>
                  </div>

                  <Link href={`/applications/${application.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        </div>
      )}
    </div>
  )
}
