"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import EnhancedStudentEnrollmentWizard from "@/components/enhanced-student-enrollment-wizard"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, SortAsc, SortDesc, RotateCcw } from "lucide-react"
import { Loader2 } from "lucide-react"
import { AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  dob?: Date;
  gender?: string;
  nationality?: string;
  documents?: any[];
  status?: string;
  created_at?: string;
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  priority?: string;
  assigned_to?: string;
  deadline?: string;
  last_activity?: string;
  metadata?: any;
  priority_score?: number;
  interview_scheduled?: boolean;
  interview_date?: string;
  interview_notes?: string;
  documents_verified?: boolean;
  application_source?: string;
  status_updated_at?: string;
  documents_count?: number;
  interview_score?: number;
  fee_paid?: boolean;
  fee_amount?: number;
  payment_reference?: string;
  [key: string]: any; // Allow other properties
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showEnrollmentWizard, setShowEnrollmentWizard] = useState(false)
  const [selectedApplicationForEnrollment, setSelectedApplicationForEnrollment] = useState<Application | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [applicationToDeleteId, setApplicationToDeleteId] = useState<string | null>(null)
  const [applicationToDeleteName, setApplicationToDeleteName] = useState<string | null>(null)
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("")

  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    const status = searchParams.get("status")
    if (status && ["pending", "approved", "rejected", "deferred"].includes(status)) {
      setStatusFilter(status)
    } else {
      setStatusFilter("all")
    }
  }, [searchParams])

  const fetchApplications = async () => {
    setLoading(true)
    setError(null); // Clear previous errors
    try {
      const response = await axios.get("/api/applications")
      // Map full_name to firstName and lastName for existing components
      const mappedApplications = response.data.map((app: any) => ({
        ...app,
        firstName: app.full_name.split(' ')[0] || '',
        lastName: app.full_name.split(' ').slice(1).join(' ') || '',
      }))
      setApplications(mappedApplications)
    } catch (err: any) {
      setError(err.message || "Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-500 text-white animate-pulse"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAndSortedApplications = applications
    .filter((application) => {
      const searchStr = `${application.firstName} ${application.lastName} ${application.email} ${application.status} ${application.priority}`.toLowerCase()
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || application.status === statusFilter
      const matchesPriority = priorityFilter === "all" || application.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      let compareA: any = a[sortBy]
      let compareB: any = b[sortBy]

      if (sortBy === "created_at") {
        compareA = new Date(a.created_at || 0).getTime()
        compareB = new Date(b.created_at || 0).getTime()
      }

      if (compareA < compareB) {
        return sortOrder === "asc" ? -1 : 1
      }
      if (compareA > compareB) {
        return sortOrder === "asc" ? 1 : -1
      }
      return 0
    })

  const handleEnrollStudent = (application: Application) => {
    setSelectedApplicationForEnrollment(application)
    setShowEnrollmentWizard(true)
  }

  const handleDeleteApplication = (id: string) => {
    const appToDelete = applications.find(app => app.id === id)
    if (appToDelete) {
      setApplicationToDeleteId(id)
      setApplicationToDeleteName(appToDelete.full_name)
      setShowDeleteConfirm(true)
      setDeleteConfirmInput("") // Clear previous input
    }
  }

  const confirmDeleteApplication = async () => {
    if (!applicationToDeleteId || !applicationToDeleteName || deleteConfirmInput !== applicationToDeleteName) {
      toast.error("Confirmation failed: Please type the student's full name correctly.")
      return
    }
    try {
      await axios.delete(`/api/applications/${applicationToDeleteId}`)
      queryClient.invalidateQueries({ queryKey: ["applications"] })
      toast.success("Application deleted successfully.")
      fetchApplications() // Refresh the applications list
      setApplicationToDeleteId(null)
    } catch (error: any) {
      toast.error(`Failed to delete application: ${error.message || "Unknown error"}`)
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setSortBy("created_at")
    setSortOrder("desc")
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Applications Overview</h1>
        <Button 
          onClick={() => router.push("/applications/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        >
          Add New Application
        </Button>
      </div>

      <Card className="mb-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Filter & Sort Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-500" size={20} />
        <Input
          type="text"
                placeholder="Search by name, email, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border-gray-300 focus:border-blue-500"
        />
      </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex-grow border-gray-300">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="flex-grow border-gray-300">
                  <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <SortAsc className="text-gray-500" size={20} />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-grow border-gray-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Date Created</SelectItem>
                  <SelectItem value="full_name">Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[80px] border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">ASC</SelectItem>
                  <SelectItem value="desc">DESC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleResetFilters} variant="outline" className="text-gray-600 hover:text-gray-900">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
          <p className="text-lg text-gray-700">Loading applications...</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md flex items-center">
          <AlertTriangle className="h-5 w-5 mr-3" />
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {!loading && !error && filteredAndSortedApplications.length === 0 && (
        <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-600">
          <p className="text-lg font-semibold mb-2">No applications found.</p>
          <p className="text-sm">Try adjusting your filters or add a new application.</p>
        </div>
      )}

      {(!loading && !error && filteredAndSortedApplications.length > 0) && (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
            <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedApplications.map((application) => (
                <TableRow 
                  key={application.id} 
                  onClick={() => router.push(`/applications/${application.id}`)} 
                  className="cursor-pointer hover:bg-blue-50 hover:shadow-md transition-all duration-200 ease-in-out"
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.full_name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.email}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className={getStatusColor(application.status || "pending")}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge className={getPriorityColor(application.priority || "normal")}>
                      {application.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.created_at ? new Date(application.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.last_activity ? new Date(application.last_activity).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleEnrollStudent(application); }}
                        className="text-blue-600 hover:text-blue-900 border-blue-600 hover:border-blue-900"
                        disabled={application.status !== 'approved'}
                      >
                    Enroll
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                        onClick={(e) => { e.stopPropagation(); handleDeleteApplication(application.id); }}
                        className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application for <span className="font-bold text-red-600">{applicationToDeleteName}</span> and remove its data from our servers. <br /><br />
              Please type the student's full name (<span className="font-bold text-red-600">{applicationToDeleteName}</span>) to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            type="text"
            placeholder="Type student's full name to confirm deletion"
            value={deleteConfirmInput}
            onChange={(e) => setDeleteConfirmInput(e.target.value)}
            className="mb-4"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteApplication} disabled={deleteConfirmInput !== applicationToDeleteName}>
              Delete Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEnrollmentWizard} onOpenChange={setShowEnrollmentWizard}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enroll Student</DialogTitle>
            <DialogDescription>
              Complete the steps to enroll the student into the system.
            </DialogDescription>
          </DialogHeader>
          <EnhancedStudentEnrollmentWizard
            applicationId={selectedApplicationForEnrollment?.id || ""}
            applicationData={selectedApplicationForEnrollment}
            onComplete={() => {
              setShowEnrollmentWizard(false);
              fetchApplications();
              toast.success("Student enrolled successfully!");
            }}
            onCancel={() => {
              setShowEnrollmentWizard(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ApplicationsPage
