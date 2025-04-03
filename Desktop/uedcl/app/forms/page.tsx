"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, ClipboardIcon, AlertTriangleIcon, FileTextIcon, Loader2 } from "lucide-react"

export default function FormsPage() {
  const [commissioningReports, setCommissioningReports] = useState([])
  const [inspectionReports, setInspectionReports] = useState([])
  const [faultReports, setFaultReports] = useState([])
  const [loading, setLoading] = useState({
    commissioning: true,
    inspection: true,
    fault: true
  })
  const [error, setError] = useState({
    commissioning: null,
    inspection: null,
    fault: null
  })

  useEffect(() => {
    // Fetch commissioning reports
    fetch('/api/forms/commissioning')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCommissioningReports(data.data || [])
        } else {
          setError(prev => ({ ...prev, commissioning: data.error || 'Failed to fetch commissioning reports' }))
        }
      })
      .catch(err => {
        console.error('Error fetching commissioning reports:', err)
        setError(prev => ({ ...prev, commissioning: 'Error fetching commissioning reports' }))
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, commissioning: false }))
      })

    // Fetch inspection reports
    fetch('/api/forms/inspection')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setInspectionReports(data.data || [])
        } else {
          setError(prev => ({ ...prev, inspection: data.error || 'Failed to fetch inspection reports' }))
        }
      })
      .catch(err => {
        console.error('Error fetching inspection reports:', err)
        setError(prev => ({ ...prev, inspection: 'Error fetching inspection reports' }))
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, inspection: false }))
      })

    // Fetch fault reports
    fetch('/api/forms/fault')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFaultReports(data.data || [])
        } else {
          setError(prev => ({ ...prev, fault: data.error || 'Failed to fetch fault reports' }))
        }
      })
      .catch(err => {
        console.error('Error fetching fault reports:', err)
        setError(prev => ({ ...prev, fault: 'Error fetching fault reports' }))
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, fault: false }))
      })
  }, [])

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Field Data Collection Forms</h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/forms/commissioning">
                <PlusIcon className="mr-2 h-4 w-4" />
                New Commissioning
              </Link>
            </Button>
            <Button asChild>
              <Link href="/forms/inspection">
                <ClipboardIcon className="mr-2 h-4 w-4" />
                New Inspection
              </Link>
            </Button>
            <Button asChild>
              <Link href="/forms/fault">
                <AlertTriangleIcon className="mr-2 h-4 w-4" />
                Report Fault
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Submissions</CardTitle>
            <CardDescription>View and manage all form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="commissioning">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="commissioning">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Commissioning Reports
                </TabsTrigger>
                <TabsTrigger value="inspection">
                  <ClipboardIcon className="mr-2 h-4 w-4" />
                  Inspection Reports
                </TabsTrigger>
                <TabsTrigger value="fault">
                  <AlertTriangleIcon className="mr-2 h-4 w-4" />
                  Fault Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="commissioning" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transformer ID</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Engineer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading.commissioning ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex justify-center items-center">
                              <Loader2 className="h-6 w-6 animate-spin mr-2" />
                              <span>Loading reports...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : error.commissioning ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-red-500">
                            {error.commissioning}
                          </TableCell>
                        </TableRow>
                      ) : commissioningReports.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No commissioning reports found
                          </TableCell>
                        </TableRow>
                      ) : (
                        commissioningReports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.transformer_id}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.location}</TableCell>
                            <TableCell>{new Date(report.date_commissioned).toLocaleDateString()}</TableCell>
                            <TableCell className="hidden lg:table-cell">{report.technician_id}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/forms/commissioning/${report.id}`}>
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="inspection" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transformer ID</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead className="hidden lg:table-cell">Engineer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading.inspection ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex justify-center items-center">
                              <Loader2 className="h-6 w-6 animate-spin mr-2" />
                              <span>Loading reports...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : error.inspection ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-red-500">
                            {error.inspection}
                          </TableCell>
                        </TableRow>
                      ) : inspectionReports.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No inspection reports found
                          </TableCell>
                        </TableRow>
                      ) : (
                        inspectionReports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.transformer_id}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(report.inspection_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{report.overall_condition || 'Unknown'}</TableCell>
                            <TableCell className="hidden lg:table-cell">{report.technician_id}</TableCell>
                          <TableCell>
                              <Badge variant={report.status === "Draft" ? "secondary" : "outline"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/forms/inspection/${report.id}`}>
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="fault" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transformer ID</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Fault Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Impact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading.fault ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex justify-center items-center">
                              <Loader2 className="h-6 w-6 animate-spin mr-2" />
                              <span>Loading reports...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : error.fault ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-red-500">
                            {error.fault}
                          </TableCell>
                        </TableRow>
                      ) : faultReports.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No fault reports found
                          </TableCell>
                        </TableRow>
                      ) : (
                        faultReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.transformer_id}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(report.report_date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{report.fault_type}</TableCell>
                            <TableCell className="hidden lg:table-cell">{report.impact}</TableCell>
                          <TableCell>
                              <Badge 
                                variant={report.status === "Reported" ? "secondary" : 
                                        report.status === "Resolved" ? "outline" : "default"}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/forms/fault/${report.id}`}>
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

