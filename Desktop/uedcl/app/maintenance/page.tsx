"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, CalendarIcon, ClipboardCheckIcon, ClockIcon, AlertCircle } from "lucide-react"
import { MaintenanceCalendar } from "@/components/maintenance-calendar"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
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
  location?: string
}

export default function MaintenancePage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Schedule</h1>
          <Button asChild>
            <Link href="/maintenance/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Schedule New Maintenance
            </Link>
          </Button>
        </div>

        <MaintenanceTabs />
      </div>
    </div>
  )
}

// Separate client component to handle URL params
function MaintenanceTabs() {
  const searchParams = useSearchParams()
  const tab = searchParams?.get("tab") || "schedule"
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMaintenanceRecords() {
      try {
        setLoading(true)
        const response = await fetch('/api/maintenance')
        
        if (!response.ok) {
          throw new Error('Failed to load maintenance records')
        }
        
        const data = await response.json()
        setMaintenance(data.maintenance || [])
      } catch (err) {
        console.error('Error loading maintenance records:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchMaintenanceRecords()
  }, [])

  // Filter records based on status
  const scheduledMaintenance = maintenance.filter(record => 
    ['Scheduled', 'In Progress', 'Postponed'].includes(record.status)
  )
  
  const completedMaintenance = maintenance.filter(record => 
    ['Completed', 'Cancelled'].includes(record.status)
  )

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Tabs defaultValue={tab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="schedule">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule
        </TabsTrigger>
        <TabsTrigger value="completed">
          <ClipboardCheckIcon className="mr-2 h-4 w-4" />
          Completed
        </TabsTrigger>
        <TabsTrigger value="calendar">
          <ClockIcon className="mr-2 h-4 w-4" />
          Calendar View
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Maintenance</CardTitle>
            <CardDescription>View and manage upcoming maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : scheduledMaintenance.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No scheduled maintenance activities found.</p>
                <Button className="mt-4" asChild variant="outline">
                  <Link href="/maintenance/new">Schedule Maintenance</Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transformer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Technician</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledMaintenance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.transformer_id}</TableCell>
                        <TableCell>{record.maintenance_type}</TableCell>
                        <TableCell className="hidden md:table-cell">{record.location || 'N/A'}</TableCell>
                        <TableCell>{formatDate(record.maintenance_date)}</TableCell>
                        <TableCell className="hidden md:table-cell">{record.technician_id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "Scheduled"
                                ? "secondary"
                                : record.status === "In Progress"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/maintenance/details/${record.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="completed">
        <Card>
          <CardHeader>
            <CardTitle>Completed Maintenance</CardTitle>
            <CardDescription>View records of completed maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : completedMaintenance.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed maintenance records found.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transformer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Technician</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedMaintenance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.transformer_id}</TableCell>
                        <TableCell>{record.maintenance_type}</TableCell>
                        <TableCell className="hidden md:table-cell">{record.location || 'N/A'}</TableCell>
                        <TableCell>{formatDate(record.maintenance_date)}</TableCell>
                        <TableCell className="hidden md:table-cell">{record.technician_id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "Completed"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/maintenance/details/${record.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="calendar">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Calendar</CardTitle>
            <CardDescription>View scheduled maintenance in calendar format</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : (
              <MaintenanceCalendar maintenance={maintenance} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

