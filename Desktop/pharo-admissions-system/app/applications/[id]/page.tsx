"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, XCircle, Clock, CalendarIcon, Loader2, AlertTriangle } from 'lucide-react'
import { format } from "date-fns"
import { EmailService } from "@/components/email-service"
import { ApplicationStatusTracker } from "@/components/application-status-tracker"
import { StudentEnrollmentWizard } from "@/components/student-enrollment-wizard"
import { DocumentUpload } from "@/components/document-upload"
import { SimpleApplicationComments } from "@/components/simple-application-comments"
import { SimpleApplicationAnalytics } from "@/components/simple-application-analytics"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import axios from "axios"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import EnhancedStudentEnrollmentWizard from "@/components/enhanced-student-enrollment-wizard"
import { ApplicationComments } from "@/components/application-comments"
import { History, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Application {
  id: string
  full_name: string
  email: string
  phone: string | null
  dob: string | null
  gender: string | null
  nationality: string | null
  status: string
  created_at: string
  approved_by: string | null
  approved_at: string | null
  notes: string | null
  documents: any[] | null
  priority?: string
  assigned_to?: string | null
  deadline?: string | null
  last_activity?: string
  metadata?: any
  priority_score?: number
  interview_scheduled?: boolean
  interview_date?: string | null
  interview_notes?: string | null
  documents_verified?: boolean
  application_source?: string | null
  status_updated_at?: string
  documents_count?: number
  interview_score?: number | null
  fee_paid?: boolean
  fee_amount?: number | null
  payment_reference?: string | null
}

const formSchema = z.object({
  interview_date: z.date().optional().nullable(),
  interview_notes: z.string().optional().nullable(),
})

type ApplicationFormValues = z.infer<typeof formSchema>

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userRole } = useAuth()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [notes, setNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [message, setMessage] = useState("")
  const [documents, setDocuments] = useState<any[]>([])
  const [showEnrollment, setShowEnrollment] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [archiveReason, setArchiveReason] = useState("")

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interview_date: null,
      interview_notes: null,
    },
  })

  useEffect(() => {
    if (params.id) {
      fetchApplication()
    }
  }, [params.id])

  useEffect(() => {
    if (application) {
      form.reset({
        interview_date: application.interview_date ? new Date(application.interview_date) : null,
        interview_notes: application.interview_notes || null,
      });
      setNotes(application.notes || "");
      setNewStatus(application.status);
      setDocuments(application.documents || []);
    }
  }, [application]);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(`/api/applications/${params.id}`)
      setApplication(response.data)
    } catch (err: any) {
      setError(err.message || "Failed to fetch application details")
    } finally {
      setLoading(false)
    }
  }

  const updateApplication = async () => {
    if (!application || !user) return

    setUpdating(true)
    try {
      const updates: any = {
        status: newStatus,
        notes: notes.trim() || null,
      }

      if (newStatus !== application.status && newStatus !== "pending") {
        updates.approved_by = user.id
        updates.approved_at = new Date().toISOString()
      }

      const { error } = await supabase.from("applications").update(updates).eq("id", application.id)

      if (error) throw error

      setMessage("Application updated successfully")
      fetchApplication()

      // If approved, create student record
      if (newStatus === "approved" && application.status !== "approved") {
        await createStudentRecord()
      }
    } catch (error) {
      console.error("Error updating application:", error)
      setMessage("Error updating application")
    } finally {
      setUpdating(false)
    }
  }

  const createStudentRecord = async () => {
    if (!application) return

    try {
      const studentId = `PSS${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

      const { error } = await supabase.from("students").insert({
        application_id: application.id,
        student_id: studentId,
        class_admitted: "Grade 9", // Default, can be customized
      })

      if (error) throw error
    } catch (error) {
      console.error("Error creating student record:", error)
    }
  }

  const sendAcceptanceLetter = async () => {
    // This would integrate with your email service
    setMessage("Acceptance letter sent successfully")
  }

  const handleUpdateInterviewDetails = async (values: ApplicationFormValues) => {
    if (!application) return;
    setUpdating(true);
    try {
      const updates = {
        interview_date: values.interview_date?.toISOString() || null,
        interview_notes: values.interview_notes || null,
      };
      const { error } = await supabase.from("applications").update(updates).eq("id", application.id);
      if (error) throw error;
      toast.success("Interview details updated successfully!");
      fetchApplication();
    } catch (error: any) {
      console.error("Error updating interview details:", error);
      toast.error(`Failed to update interview details: ${error.message || "Unknown error"}`);
    } finally {
      setUpdating(false);
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "deferred":
        return <History className="h-5 w-5 text-yellow-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const canUpdateStatus = userRole === "admin" || userRole === "principal"

  const handleDelete = async () => {
    if (!application || !user) return;

    try {
      const response = await axios.delete(`/api/applications/${application.id}`, {
        data: { archived_by: user.id, archived_reason: archiveReason || null },
      });

      if (response.status === 200) {
        toast.success("Application archived successfully!");
        router.push("/applications"); // Redirect to applications list
      } else {
        toast.error(`Failed to archive application: ${response.data.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error archiving application:", error);
      toast.error(`Failed to archive application: ${error.response?.data?.error || error.message || "Unknown error"}`);
    } finally {
      setShowDeleteConfirm(false); // Close dialog
      setArchiveReason(""); // Clear reason
    }
  }

  const handleEnrollStudent = () => {
    setShowEnrollment(true)
  }

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      await axios.put(`/api/applications/${params.id}`, values);
      toast.success("Application updated successfully!");
      router.push("/applications");
    } catch (error: any) {
      toast.error(`Failed to update application: ${error.message || "Unknown error"}`);
      console.error("Error updating application:", error);
    }
  };

  const updateApplicationStatusAndNotes = async () => {
    if (!application) return;
    setUpdating(true);
    try {
      const updatedData = {
        status: newStatus,
        notes: notes,
        status_updated_at: new Date().toISOString(),
        // Only set approved_at if status is changing to 'approved'
        ...(newStatus === 'approved' && application.status !== 'approved' && { approved_at: new Date().toISOString(), approved_by: userRole }),
      };

      await axios.put(`/api/applications/${params.id}`, updatedData);
      toast.success("Application status and notes updated!");
      fetchApplication(); // Re-fetch data to update UI
    } catch (error: any) {
      toast.error(`Failed to update status: ${error.message || "Unknown error"}`);
      console.error("Error updating application status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDocumentsUpdate = () => {
    fetchApplication();
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading application details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/applications")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Alert>
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>Application not found.</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/applications")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => router.push("/applications")}
          variant="outline"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          Application Details
        </h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowEnrollment(true)}
            className="bg-green-600 hover:bg-green-700 text-white shadow-md"
            disabled={application?.status !== "approved"}
          >
            Enroll Student
          </Button>
          <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Application</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently archive the application
                  and all associated data (comments, notifications). You can optionally provide a reason for archiving.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="archiveReason">Reason for Archiving (Optional)</Label>
                <Textarea
                  id="archiveReason"
                  placeholder="e.g., Duplicate entry, incorrect submission, user request"
                  value={archiveReason}
                  onChange={(e) => setArchiveReason(e.target.value)}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Archive Application</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
          <p className="text-lg text-gray-700">Loading application details...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md flex items-center">
          <AlertTriangle className="h-5 w-5 mr-3" />
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {!loading && !error && !application && (
        <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-600">
          <p className="text-lg font-semibold mb-2">Application not found.</p>
          <p className="text-sm">The application you are looking for does not exist or has been deleted.</p>
        </div>
      )}

      {!loading && !error && application && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Application Overview & Actions */}
        <div className="lg:col-span-2 space-y-6">
            {/* Application Info Card */}
            <Card className="shadow-lg bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">{application.full_name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  {application.priority && (
                    <Badge className={getPriorityColor(application.priority)}>{application.priority}</Badge>
                  )}
                </div>
            </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <p className="font-medium text-gray-800">{application.email}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Phone</Label>
                  <p className="font-medium text-gray-800">{application.phone || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Date of Birth</Label>
                  <p className="font-medium text-gray-800">{application.dob ? format(new Date(application.dob), "PPP") : 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Gender</Label>
                  <p className="font-medium text-gray-800">{application.gender || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Nationality</Label>
                  <p className="font-medium text-gray-800">{application.nationality || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Application Source</Label>
                  <p className="font-medium text-gray-800">{application.application_source || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Created At</Label>
                  <p className="font-medium text-gray-800">{application.created_at ? format(new Date(application.created_at), "PPP") : 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Last Activity</Label>
                  <p className="font-medium text-gray-800">{application.last_activity ? format(new Date(application.last_activity), "PPP") : 'N/A'}</p>
              </div>
                {application.assigned_to && (
                  <div>
                    <Label className="text-gray-500">Assigned To</Label>
                    <p className="font-medium text-gray-800">{application.assigned_to}</p>
                  </div>
                )}
                {application.deadline && (
                  <div>
                    <Label className="text-gray-500">Deadline</Label>
                    <p className="font-medium text-gray-800">{application.deadline ? format(new Date(application.deadline), "PPP") : 'N/A'}</p>
                </div>
                )}
              </CardContent>
            </Card>

            {/* Status & Notes Update Card */}
            <Card className="shadow-lg bg-white">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Update Status & Notes</CardTitle>
            </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="status" className="mb-1">Application Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus} disabled={!canUpdateStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="deferred">Deferred</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="mb-1">Application Priority</Label>
                    <Select 
                      value={application.priority || "normal"} 
                      onValueChange={(value) => setApplication({ ...application, priority: value })}
                      disabled={!canUpdateStatus}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="notes" className="mb-1">Internal Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add internal notes about the application..."
                    rows={4}
                    className="min-h-[80px]"
                    disabled={!canUpdateStatus}
                  />
                </div>
                <Button 
                  onClick={updateApplicationStatusAndNotes} 
                  disabled={updating || !canUpdateStatus}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                  Save Changes
                </Button>
                {message && <Alert className="mt-4"><AlertDescription>{message}</AlertDescription></Alert>}
              </CardContent>
            </Card>

            {/* Document Upload & Viewer */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Application Documents</CardTitle>
                <CardDescription>Manage and view all supporting documents.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUpload
                  applicationId={application.id}
                  documents={documents || []}
                  onDocumentsUpdate={handleDocumentsUpdate}
                />
              </CardContent>
            </Card>

            {/* Application Comments */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Comments & Communication</CardTitle>
                <CardDescription>Internal comments and communication history.</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationComments applicationId={application.id} />
              </CardContent>
            </Card>

            {/* Interview Scheduling */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Interview Details</CardTitle>
                <CardDescription>Schedule and manage applicant interviews.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleUpdateInterviewDetails)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="interview_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Interview Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  field.value ? date < new Date(field.value) : date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interview_notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Add interview notes..." 
                              rows={4} 
                              className="min-h-[80px]"
                              {...field} 
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={updating} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                      {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                      Save Interview Details
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Application Analytics */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Application Analytics</CardTitle>
                <CardDescription>Key metrics and insights for this application.</CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleApplicationAnalytics applicationId={application.id} />
              </CardContent>
            </Card>

            {/* Enrollment Section */}
            {application && application.status === "approved" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" /> Student Enrollment
                  </CardTitle>
                  <CardDescription>
                    Enroll this applicant as a student in the system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleEnrollStudent}
                    disabled={showEnrollment || updating}
                    className="w-full"
                  >
                    {showEnrollment ? "Enrollment Wizard Active" : "Start Enrollment Wizard"}
                  </Button>

                  <Dialog open={showEnrollment} onOpenChange={setShowEnrollment}>
                    <DialogContent className="min-w-[90vw] md:min-w-[80vw] lg:min-w-[70vw] h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Enroll Student: {application.full_name}</DialogTitle>
                        <DialogDescription>
                          Complete the steps below to officially enroll {application.full_name} as a student.
                        </DialogDescription>
                      </DialogHeader>
                      {application && (
                        <EnhancedStudentEnrollmentWizard
                          applicationId={application.id}
                          applicationData={application}
                          onComplete={() => {
                            setShowEnrollment(false)
                            fetchApplication()
                          }}
                          onCancel={() => setShowEnrollment(false)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
                  </div>

          {/* Column 2: Additional Actions & History (Right Sidebar) */}
          <div className="space-y-6">
            {/* Application Status Tracker */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Application Progress</CardTitle>
                <CardDescription>Track the application's journey through the stages.</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationStatusTracker 
                  applicationStatus={application.status}
                  createdAt={application.created_at}
                  approvedAt={application.approved_at}
                  documents={application.documents || []}
                  emailSent={false} // Placeholder, need to determine actual email sent status
                />
              </CardContent>
            </Card>

            {/* Email Communication */}
            <Card className="shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Email Communication</CardTitle>
                <CardDescription>Send emails to the applicant.</CardDescription>
              </CardHeader>
              <CardContent>
                <EmailService
                  applicationId={application.id}
                  applicantName={application.full_name}
                  applicantEmail={application.email}
                  status={application.status as "approved" | "rejected" | "deferred"} // Cast for now, refine logic later
                />
              </CardContent>
            </Card>

            {/* Enterprise Specific - Test Accounts Info */}
            {userRole === "admin" && (
              <Card className="shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Test Account Actions</CardTitle>
                  <CardDescription>Manage test accounts for this application.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Assuming you might have a TestAccountsInfo component or similar */} 
                  <p className="text-sm text-gray-600">Test account functionalities can be added here.</p>
            </CardContent>
          </Card>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
