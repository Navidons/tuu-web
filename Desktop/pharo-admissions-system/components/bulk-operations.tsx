"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckSquare, Mail, FileText, Users } from "lucide-react"

interface BulkOperationsProps {
  selectedApplications: string[]
  onOperationComplete: () => void
}

export function BulkOperations({ selectedApplications, onOperationComplete }: BulkOperationsProps) {
  const { userRole } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [operation, setOperation] = useState<"status" | "email" | "export" | null>(null)
  const [bulkStatus, setBulkStatus] = useState<"approved" | "rejected" | "deferred" | "pending">("pending")
  const [bulkNotes, setBulkNotes] = useState("")

  const canPerformBulkOperations = userRole === "admin" || userRole === "principal"

  const handleBulkStatusUpdate = async () => {
    if (!canPerformBulkOperations || selectedApplications.length === 0) return

    setLoading(true)
    setMessage("")

    try {
      const { error } = await supabase
        .from("applications")
        .update({
          status: bulkStatus,
          notes: bulkNotes || null,
          approved_at: new Date().toISOString(),
        })
        .in("id", selectedApplications)

      if (error) throw error

      setMessage(`Successfully updated ${selectedApplications.length} applications to ${bulkStatus}`)
      onOperationComplete()
      setShowDialog(false)
    } catch (error: any) {
      setMessage(`Bulk update failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBulkEmail = async () => {
    setLoading(true)
    setMessage("")

    try {
      // Fetch applications to get email addresses
      const { data: applications, error } = await supabase
        .from("applications")
        .select("id, full_name, email, status")
        .in("id", selectedApplications)

      if (error) throw error

      // Simulate sending emails (replace with actual email service)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setMessage(`Bulk emails sent to ${applications?.length || 0} applicants`)
      onOperationComplete()
      setShowDialog(false)
    } catch (error: any) {
      setMessage(`Bulk email failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBulkExport = async () => {
    setLoading(true)
    setMessage("")

    try {
      const { data: applications, error } = await supabase
        .from("applications")
        .select("*")
        .in("id", selectedApplications)

      if (error) throw error

      // Create CSV content
      const headers = ["Name", "Email", "Phone", "Gender", "Status", "Applied Date", "Notes"]
      const csvContent = [
        headers.join(","),
        ...(applications?.map((app) =>
          [
            app.full_name,
            app.email,
            app.phone || "",
            app.gender || "",
            app.status,
            new Date(app.created_at).toLocaleDateString(),
            (app.notes || "").replace(/,/g, ";"),
          ].join(","),
        ) || []),
      ].join("\n")

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `selected-applications-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      setMessage(`Exported ${applications?.length || 0} applications to CSV`)
      setShowDialog(false)
    } catch (error: any) {
      setMessage(`Export failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const openDialog = (operationType: "status" | "email" | "export") => {
    setOperation(operationType)
    setShowDialog(true)
    setMessage("")
  }

  if (selectedApplications.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <CheckSquare className="mx-auto h-8 w-8 text-gray-300" />
            <p className="mt-2 text-sm">Select applications to perform bulk operations</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Bulk Operations ({selectedApplications.length} selected)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            {canPerformBulkOperations && (
              <Button variant="outline" onClick={() => openDialog("status")} className="justify-start">
                <CheckSquare className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            )}
            <Button variant="outline" onClick={() => openDialog("email")} className="justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Send Emails
            </Button>
            <Button variant="outline" onClick={() => openDialog("export")} className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {operation === "status" && "Bulk Status Update"}
              {operation === "email" && "Send Bulk Emails"}
              {operation === "export" && "Export Selected Applications"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {message && (
              <Alert
                className={
                  message.includes("failed") || message.includes("Failed") ? "border-red-200" : "border-green-200"
                }
              >
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {operation === "status" && (
              <>
                <div className="space-y-2">
                  <Label>New Status</Label>
                  <Select value={bulkStatus} onValueChange={(value: any) => setBulkStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="deferred">Deferred</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea
                    value={bulkNotes}
                    onChange={(e) => setBulkNotes(e.target.value)}
                    placeholder="Add notes for all selected applications..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleBulkStatusUpdate} disabled={loading} className="w-full">
                  {loading ? "Updating..." : `Update ${selectedApplications.length} Applications`}
                </Button>
              </>
            )}

            {operation === "email" && (
              <>
                <p className="text-sm text-gray-600">
                  Send status-appropriate emails to all {selectedApplications.length} selected applicants.
                </p>
                <Button onClick={handleBulkEmail} disabled={loading} className="w-full">
                  {loading ? "Sending..." : `Send Emails to ${selectedApplications.length} Applicants`}
                </Button>
              </>
            )}

            {operation === "export" && (
              <>
                <p className="text-sm text-gray-600">
                  Export {selectedApplications.length} selected applications to a CSV file for external analysis.
                </p>
                <Button onClick={handleBulkExport} disabled={loading} className="w-full">
                  {loading ? "Exporting..." : `Export ${selectedApplications.length} Applications`}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
