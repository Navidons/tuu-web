"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WrenchIcon, ArrowLeftIcon, Loader2 } from "lucide-react"
import { PrintDocument } from "@/components/print-document"
import { PdfExport } from "@/components/pdf-export"

// Define the type for commissioning form data
interface CommissioningReport {
  id: number
  transformer_id: string
  date_commissioned: string
  location: string
  technician_id: string
  voltage_reading?: string
  current_reading?: string
  oil_level?: string
  silica_gel_condition?: string
  earthing_status?: string
  installation_quality?: string
  notes?: string
  status: string
  created_at: string
  updated_at: string
}

export default function CommissioningReportDetailPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<CommissioningReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true)
        const response = await fetch(`/api/forms/commissioning?id=${params.id}`)
        const data = await response.json()
        
        if (data.success && data.data && data.data.length > 0) {
          setReport(data.data[0])
        } else {
          setError("Report not found or failed to load")
        }
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Error loading report. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-lg">Loading report...</p>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Report</h2>
          <p className="mb-6">{error || "Report not found"}</p>
          <Button asChild>
            <Link href="/forms">Back to Forms</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Format date strings for display
  const formattedDate = new Date(report.date_commissioned).toLocaleDateString()
  const createdDate = new Date(report.created_at).toLocaleDateString()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center gap-2">
            <WrenchIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">UEDCL Transformer Maintenance System</span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/transformers">Transformers</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/maintenance">Maintenance</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/teams">Teams</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/forms">Forms</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/reports">Reports</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/forms">
                  <ArrowLeftIcon className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Commissioning Report</h1>
              <Badge variant="outline">{report.status}</Badge>
            </div>
            <div className="flex gap-2">
              <PrintDocument title="Transformer Commissioning Report">
                <div className="section">
                  <h2>Transformer Information</h2>
                  <div className="grid">
                    <div className="label">Transformer ID:</div>
                    <div>{report.transformer_id}</div>
                    <div className="label">Date Commissioned:</div>
                    <div>{formattedDate}</div>
                  </div>
                </div>
                <div className="section">
                  <h2>Location Information</h2>
                  <div className="grid">
                    <div className="label">Location:</div>
                    <div>{report.location}</div>
                  </div>
                </div>
                <div className="section">
                  <h2>Test Results</h2>
                  <div className="grid">
                    <div className="label">Oil Level:</div>
                    <div>{report.oil_level || 'Not recorded'}</div>
                    <div className="label">Voltage Reading:</div>
                    <div>{report.voltage_reading || 'Not recorded'}</div>
                    <div className="label">Current Reading:</div>
                    <div>{report.current_reading || 'Not recorded'}</div>
                    <div className="label">Earthing Status:</div>
                    <div>{report.earthing_status || 'Not recorded'}</div>
                    <div className="label">Silica Gel Condition:</div>
                    <div>{report.silica_gel_condition || 'Not recorded'}</div>
                    <div className="label">Installation Quality:</div>
                    <div>{report.installation_quality || 'Not recorded'}</div>
                  </div>
                </div>
                <div className="section">
                  <h2>Notes</h2>
                  <p>{report.notes || 'No notes provided'}</p>
                </div>
                <div className="section">
                  <h2>Commissioning Engineer</h2>
                  <div className="grid">
                    <div className="label">ID:</div>
                    <div>{report.technician_id}</div>
                    <div className="label">Date:</div>
                    <div>{formattedDate}</div>
                  </div>
                </div>
              </PrintDocument>

              <PdfExport
                title="Transformer Commissioning Report"
                filename={`commissioning-report-${report.transformer_id}`}
                data={report}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transformer Commissioning Report</CardTitle>
              <CardDescription>
                Details of the commissioning process for transformer {report.transformer_id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Transformer Information</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm font-medium">Transformer ID:</div>
                        <div className="text-sm">{report.transformer_id}</div>

                        <div className="text-sm font-medium">Date Commissioned:</div>
                        <div className="text-sm">{formattedDate}</div>
                        
                        <div className="text-sm font-medium">Technician ID:</div>
                        <div className="text-sm">{report.technician_id}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Location Information</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm font-medium">Location:</div>
                        <div className="text-sm">{report.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Test Results</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm font-medium">Oil Level:</div>
                        <div className="text-sm">{report.oil_level || 'Not recorded'}</div>

                        <div className="text-sm font-medium">Voltage Reading:</div>
                        <div className="text-sm">{report.voltage_reading || 'Not recorded'}</div>

                        <div className="text-sm font-medium">Current Reading:</div>
                        <div className="text-sm">{report.current_reading || 'Not recorded'}</div>

                        <div className="text-sm font-medium">Silica Gel Condition:</div>
                        <div className="text-sm">{report.silica_gel_condition || 'Not recorded'}</div>

                        <div className="text-sm font-medium">Earthing Status:</div>
                        <div className="text-sm">{report.earthing_status || 'Not recorded'}</div>

                        <div className="text-sm font-medium">Installation Quality:</div>
                        <div className="text-sm">{report.installation_quality || 'Not recorded'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Notes</h3>
                  <p className="mt-2 text-sm">{report.notes || 'No notes provided'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium">Status Information</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-sm font-medium">Status:</div>
                      <div className="text-sm">{report.status}</div>

                      <div className="text-sm font-medium">Created At:</div>
                      <div className="text-sm">{createdDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/forms">Back to Forms</Link>
              </Button>
              <Button asChild>
                <Link href={`/transformers/${report.transformer_id}`}>View Transformer</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

