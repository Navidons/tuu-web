"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, FileText, MessageSquare, Activity } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface ApplicationSummary {
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
  comment_count: number
  activity_count: number
  student_id: string | null
  class_admitted: string | null
}

interface OptimizedApplicationsListProps {
  onSelectionChange: (selectedIds: string[]) => void
}

export function OptimizedApplicationsList({ onSelectionChange }: OptimizedApplicationsListProps) {
  const [applications, setApplications] = useState<ApplicationSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("priority")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const ITEMS_PER_PAGE = 20

  // Optimized data fetching using materialized view
  const fetchApplications = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        setLoading(true)

        let query = supabase
          .from("application_summary_mv")
          .select("*")
          .range((pageNum - 1) * ITEMS_PER_PAGE, pageNum * ITEMS_PER_PAGE - 1)

        // Apply filters
        if (statusFilter !== "all") {
          query = query.eq("status", statusFilter)
        }

        // Apply search
        if (searchTerm) {
          query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
        }

        // Apply sorting
        switch (sortBy) {
          case "priority":
            query = query.order("priority_score", { ascending: false })
            break
          case "recent":
            query = query.order("created_at", { ascending: false })
            break
          case "status":
            query = query.order("status_updated_at", { ascending: false })
            break
          case "name":
            query = query.order("full_name", { ascending: true })
            break
        }

        const { data, error } = await query

        if (error) throw error

        if (append) {
          setApplications((prev) => [...prev, ...(data || [])])
        } else {
          setApplications(data || [])
        }

        setHasMore((data || []).length === ITEMS_PER_PAGE)
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    },
    [searchTerm, statusFilter, sortBy],
  )

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      fetchApplications(1, false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, statusFilter, sortBy, fetchApplications])

  // Load more data
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchApplications(nextPage, true)
    }
  }, [page, loading, hasMore, fetchApplications])

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

  // Memoized status color function
  const getStatusColor = useMemo(
    () => (status: string) => {
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
    },
    [],
  )

  // Memoized priority badge
  const getPriorityBadge = useMemo(
    () => (score: number) => {
      if (score >= 80) return <Badge className="bg-red-100 text-red-800">High</Badge>
      if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      return <Badge className="bg-gray-100 text-gray-800">Low</Badge>
    },
    [],
  )

  return (
    <div className="space-y-4">
      {/* Optimized Filters */}
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

      {/* Optimized Applications List */}
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
                      {getPriorityBadge(application.priority_score)}
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{application.email}</span>
                      {application.phone && <span>{application.phone}</span>}
                      <span>{formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}</span>
                    </div>

                    <div className="flex items-center space-x-4 mt-2">
                      {application.documents_count > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <FileText className="h-3 w-3" />
                          <span>{application.documents_count} docs</span>
                        </div>
                      )}

                      {application.comment_count > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-green-600">
                          <MessageSquare className="h-3 w-3" />
                          <span>{application.comment_count} comments</span>
                        </div>
                      )}

                      {application.activity_count > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-purple-600">
                          <Activity className="h-3 w-3" />
                          <span>{application.activity_count} activities</span>
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
                    <div className="font-medium">Score: {application.priority_score}</div>
                    {application.student_id && (
                      <div className="text-xs text-green-600">Enrolled: {application.student_id}</div>
                    )}
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

      {/* Load More */}
      {hasMore && (
        <div className="text-center py-4">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {applications.length === 0 && !loading && (
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
