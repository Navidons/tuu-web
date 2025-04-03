"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WrenchIcon, ArrowLeftIcon, CalendarIcon, UsersIcon, Loader2, AlertCircle } from "lucide-react"
import { PrintDocument } from "@/components/print-document"
import { BrowserPdfExport } from "@/components/browser-pdf-export"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface MaintenanceRecord {
  id: number
  transformer_id: string
  serial_number?: string
  maintenance_date: string
  maintenance_type: string
  technician_id: string
  actions_taken: string
  parts_replaced: string | null
  oil_changed: boolean
  oil_quantity_added: number | null
  duration_hours: number | null
  next_maintenance_date: string | null
  status: string
  notes: string | null
  created_at: string
  updated_at: string
  transformer_status?: string
  location?: string
  manufacturer?: string
  capacity_kva?: number
}

export default function MaintenanceDetailPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use() to follow Next.js recommendations
  const unwrappedParams = React.use(params);
  const maintenanceId = unwrappedParams.id;
  
  const [maintenance, setMaintenance] = useState<MaintenanceRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMaintenanceDetails() {
      try {
        setLoading(true)
        const response = await fetch(`/api/maintenance/${maintenanceId}`)
        
        if (response.status === 404) {
          setError('Maintenance record not found')
          return
        }
        
        if (!response.ok) {
          throw new Error('Failed to load maintenance details')
        }
        
        const data = await response.json()
        setMaintenance(data.maintenance)
      } catch (err) {
        console.error('Error loading maintenance details:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchMaintenanceDetails()
  }, [maintenanceId])

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Loading maintenance details...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  if (error || !maintenance) {
    return (
      <div className="container py-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Maintenance Not Found</CardTitle>
            <CardDescription>The maintenance record you're looking for could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error || 'Maintenance record not available'}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/maintenance">Back to Maintenance</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const isCompleted = maintenance.status === "Completed"
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/maintenance">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Details</h1>
            <Badge
              variant={
                maintenance.status === "Scheduled"
                  ? "secondary"
                  : maintenance.status === "Completed"
                    ? "outline"
                    : "default"
              }
            >
              {maintenance.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <PrintDocument>
              <h1 className="text-2xl font-bold mb-4">
                Maintenance {isCompleted ? "Report" : "Schedule"} #{maintenance.id}
              </h1>

              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Transformer Details</h2>
                <table className="w-full mb-4">
                  <tbody>
                    <tr>
                      <td className="font-semibold pr-4">Transformer ID:</td>
                      <td>{maintenance.transformer_id}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Location:</td>
                      <td>{maintenance.location || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Date:</td>
                      <td>{formatDate(maintenance.maintenance_date)}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Type:</td>
                      <td>{maintenance.maintenance_type}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4">Status:</td>
                      <td>{maintenance.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Actions Taken</h2>
                <p>{maintenance.actions_taken}</p>
              </div>

              {maintenance.parts_replaced && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Parts Replaced</h2>
                  <p>{maintenance.parts_replaced}</p>
                </div>
              )}

              {maintenance.oil_changed && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Oil Change</h2>
                  <p>
                    Oil changed: Yes
                    {maintenance.oil_quantity_added && (
                      <>, Quantity added: {maintenance.oil_quantity_added} liters</>
                    )}
                  </p>
                </div>
              )}

              {maintenance.notes && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Notes</h2>
                  <p>{maintenance.notes}</p>
                </div>
              )}

              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Technician</h2>
                <p>ID: {maintenance.technician_id}</p>
              </div>
            </PrintDocument>

            <BrowserPdfExport
              title={`Maintenance ${isCompleted ? "Report" : "Schedule"}`}
              filename={`maintenance-${maintenance.id}-${maintenance.transformer_id}`}
              data={maintenance}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Information</CardTitle>
              <CardDescription>Details about the maintenance activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm font-medium">Transformer ID:</div>
                    <div className="text-sm">{maintenance.transformer_id}</div>

                    <div className="text-sm font-medium">Type:</div>
                    <div className="text-sm">{maintenance.maintenance_type}</div>

                    <div className="text-sm font-medium">Date:</div>
                    <div className="text-sm">{formatDate(maintenance.maintenance_date)}</div>

                    <div className="text-sm font-medium">Status:</div>
                    <div className="text-sm">
                      <Badge
                        variant={
                          maintenance.status === "Scheduled"
                            ? "secondary"
                            : maintenance.status === "In Progress"
                              ? "default"
                              : maintenance.status === "Completed"
                                ? "outline"
                                : "secondary"
                        }
                      >
                        {maintenance.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Transformer Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm font-medium">Location:</div>
                    <div className="text-sm">{maintenance.location || 'N/A'}</div>

                    <div className="text-sm font-medium">Manufacturer:</div>
                    <div className="text-sm">{maintenance.manufacturer || 'N/A'}</div>

                    <div className="text-sm font-medium">Capacity:</div>
                    <div className="text-sm">{maintenance.capacity_kva ? `${maintenance.capacity_kva} kVA` : 'N/A'}</div>

                    <div className="text-sm font-medium">Transformer Status:</div>
                    <div className="text-sm">
                      <Badge
                        variant={
                          maintenance.transformer_status === "Active"
                            ? "default"
                            : maintenance.transformer_status === "Under Maintenance"
                              ? "secondary"
                              : maintenance.transformer_status === "Inactive"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {maintenance.transformer_status || 'N/A'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Details</CardTitle>
              <CardDescription>Actions taken and findings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Actions Taken</h3>
                <p className="mt-2 text-sm">{maintenance.actions_taken}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {maintenance.parts_replaced && (
                  <div>
                    <h3 className="text-lg font-medium">Parts Replaced</h3>
                    <p className="mt-2 text-sm">{maintenance.parts_replaced}</p>
                  </div>
                )}

                {maintenance.oil_changed && (
                  <div>
                    <h3 className="text-lg font-medium">Oil Change</h3>
                    <p className="mt-2 text-sm">
                      Oil changed: Yes
                      {maintenance.oil_quantity_added && (
                        <>, Quantity: {maintenance.oil_quantity_added} liters</>
                      )}
                    </p>
                  </div>
                )}

                {maintenance.duration_hours && (
                  <div>
                    <h3 className="text-lg font-medium">Duration</h3>
                    <p className="mt-2 text-sm">{maintenance.duration_hours} hours</p>
                  </div>
                )}

                {maintenance.next_maintenance_date && (
                  <div>
                    <h3 className="text-lg font-medium">Next Maintenance</h3>
                    <p className="mt-2 text-sm">{formatDate(maintenance.next_maintenance_date)}</p>
                  </div>
                )}
              </div>

              {maintenance.notes && (
                <div>
                  <h3 className="text-lg font-medium">Notes</h3>
                  <p className="mt-2 text-sm">{maintenance.notes}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium">Technician Information</h3>
                <div className="flex items-center gap-2 p-2 border rounded-md mt-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span>ID: {maintenance.technician_id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" asChild>
            <Link href="/maintenance">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Maintenance
            </Link>
          </Button>

          {maintenance.status !== "Completed" && (
            <Button asChild>
              <Link href={`/maintenance/edit/${maintenance.id}`}>
                <WrenchIcon className="mr-2 h-4 w-4" />
                Update Maintenance
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

