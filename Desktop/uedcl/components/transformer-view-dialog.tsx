"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileTextIcon, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton" 

interface Transformer {
  id: number;
  serial_number: string;
  manufacturer: string;
  capacity_kva: number;
  manufacturing_date: string | null;
  installation_date: string | null;
  location: string | null;
  gps_coordinates: string | null;
  status: string;
  last_maintenance_date: string | null;
  created_at: string;
}

interface MaintenanceRecord {
  id: number;
  transformer_id: string;
  maintenance_date: string;
  maintenance_type: string;
  technician_id: string;
  actions_taken: string;
  parts_replaced: string | null;
  oil_changed: boolean;
  oil_quantity_added: number | null;
  duration_hours: number | null;
  next_maintenance_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface FaultRecord {
  id: number;
  transformer_id: string;
  report_date: string;
  reporter_id: string;
  fault_type: string;
  fault_description: string;
  fault_date: string | null;
  impact: string;
  status: string;
  assigned_to: number | null;
  resolution_description: string | null;
  resolution_date: string | null;
  approved_by: number | null;
  approval_date: string | null;
  created_at: string;
  updated_at: string;
}

interface TransformerViewDialogProps {
  transformerId: string
}

export function TransformerViewDialog({ transformerId }: TransformerViewDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [transformer, setTransformer] = useState<Transformer | null>(null)
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([])
  const [issues, setIssues] = useState<FaultRecord[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch data when dialog is open
    if (open && loading) {
      fetchTransformerData()
    }
  }, [open, transformerId])

  const fetchTransformerData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/transformers/${transformerId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch transformer details: ${response.statusText}`)
      }
      
      const data = await response.json()
      setTransformer(data.transformer)
      setMaintenance(data.maintenance || [])
      setIssues(data.issues || [])
    } catch (err) {
      console.error('Error fetching transformer details:', err)
      setError(err instanceof Error ? err.message : 'Failed to load transformer data')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    // Reset loading state when dialog is opened
    if (newOpen) {
      setLoading(true)
    }
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => handleOpenChange(true)}>
        <FileTextIcon className="mr-2 h-4 w-4" />
        Quick View
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {loading ? (
                <Skeleton className="h-6 w-40" />
              ) : transformer ? (
                <>
                  Transformer {transformer.id}
              <Badge
                variant={
                      transformer.status === "Active"
                      ? "default"
                        : transformer.status === "Under Maintenance"
                        ? "secondary"
                          : transformer.status === "Inactive"
                            ? "destructive"
                            : "outline"
                }
              >
                {transformer.status}
              </Badge>
                </>
              ) : (
                <>Transformer Information</>
              )}
            </DialogTitle>
            <DialogDescription>Quick view of transformer details and maintenance history</DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-[200px]" />
                <Skeleton className="h-[200px]" />
              </div>
              <Skeleton className="h-[200px]" />
            </div>
          ) : error ? (
            <div className="py-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          ) : transformer ? (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Transformer Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Rating:</div>
                    <div className="text-sm">{transformer.capacity_kva} kVA</div>

                <div className="text-sm font-medium">Manufacturer:</div>
                <div className="text-sm">{transformer.manufacturer}</div>

                <div className="text-sm font-medium">Serial Number:</div>
                    <div className="text-sm">{transformer.serial_number}</div>

                <div className="text-sm font-medium">Installation Date:</div>
                    <div className="text-sm">{formatDate(transformer.installation_date)}</div>
              </div>
            </div>

            <div>
                  <h3 className="text-lg font-medium mb-2">Location & Status</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Location:</div>
                    <div className="text-sm">{transformer.location || 'N/A'}</div>

                <div className="text-sm font-medium">GPS Coordinates:</div>
                    <div className="text-sm">{transformer.gps_coordinates || 'N/A'}</div>

                    <div className="text-sm font-medium">Status:</div>
                    <div className="text-sm">{transformer.status}</div>

                <div className="text-sm font-medium">Last Maintenance:</div>
                    <div className="text-sm">{formatDate(transformer.last_maintenance_date)}</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Maintenance History</TabsTrigger>
              <TabsTrigger value="issues">Issues & Repairs</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4">
                  {maintenance.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No maintenance records found
                    </div>
                  ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Findings</TableHead>
                          <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                        {maintenance.slice(0, 3).map((record) => (
                    <TableRow key={record.id}>
                            <TableCell>{formatDate(record.maintenance_date)}</TableCell>
                            <TableCell>{record.maintenance_type}</TableCell>
                            <TableCell>{record.actions_taken}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  record.status === "Completed"
                                    ? "default"
                                    : record.status === "In Progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                  )}
            </TabsContent>

            <TabsContent value="issues" className="mt-4">
                  {issues.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No issues or repairs recorded
                    </div>
                  ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                        {issues.slice(0, 3).map((issue) => (
                    <TableRow key={issue.id}>
                            <TableCell>{formatDate(issue.report_date)}</TableCell>
                            <TableCell>{issue.fault_type}</TableCell>
                            <TableCell>{issue.fault_description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                                  issue.status === "Resolved" || issue.status === "Closed"
                                ? "default"
                                    : issue.status === "In Progress" || issue.status === "Under Investigation"
                                      ? "secondary"
                                      : "outline"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                  )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" asChild>
                  <Link href={`/maintenance/new?transformer=${transformer.serial_number}`}>Schedule Maintenance</Link>
            </Button>
            <Button asChild>
                  <Link href={`/transformers/${transformer.id}`}>View Full Details</Link>
            </Button>
          </div>
            </>
          ) : (
            <div className="py-4 text-center">
              <p>No transformer data available</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

