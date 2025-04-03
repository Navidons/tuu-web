"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WrenchIcon, ArrowLeftIcon, Loader2 } from "lucide-react"
import { PrintDocument } from "@/components/print-document"
import { PdfExport } from "@/components/pdf-export"

// Define the type for inspection form data
interface InspectionReport {
  id: number
  transformer_id: string
  date_inspected: string
  location: string
  inspector_id?: string
  oil_level?: string
  oil_leakage?: string
  buchholz_relay?: string
  cooling_system?: string
  hv_bushing?: string
  lv_bushing?: string
  earth_connection?: string
  load_reading?: string
  voltage_readings?: string
  temperature_readings?: string
  abnormal_noise?: string
  engineer?: string
  remarks?: string
  status: string
  created_at: string
  updated_at: string
}

export default function InspectionReportDetailPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<InspectionReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true)
        const response = await fetch(`/api/forms/inspection?id=${params.id}`)
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

  // Format dates for display
  const formattedInspectionDate = new Date(report.date_inspected).toLocaleDateString()
  const formattedCreationDate = new Date(report.created_at).toLocaleDateString()

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
              <h1 className="text-3xl font-bold tracking-tight">Inspection Report</h1>
              <Badge variant={report.status === "Satisfactory" ? "outline" : "secondary"}>{report.status}</Badge>
            </div>
            <div className="flex gap-2">
              <PrintDocument title="Transformer Inspection Report">
                <div className="section">
                  <h2>Transformer Information</h2>
                  <div className="grid">
                    <div className="label">Transformer ID:</div>
                    <div>{report.transformer_id}</div>
                    <div className="label">Date Inspected:</div>
                    <div>{formattedInspectionDate}</div>
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
                  <h2>Inspection Results</h2>
                  <div className="grid">
                    <div className="label">Oil Level Status:</div>
                    <div>{report.oil_level || "Not recorded"}</div>
                    <div className="label">Oil Leakage Observed:</div>
                    <div>{report.oil_leakage || "Not recorded"}</div>
                    <div className="label">Buchholz Relay Condition:</div>
                    <div>{report.buchholz_relay || "Not recorded"}</div>
                    <div className="label">Cooling System Condition:</div>
                    <div>{report.cooling_system || "Not recorded"}</div>
                    <div className="label">HV Bushing Condition:</div>
                    <div>{report.hv_bushing || "Not recorded"}</div>
                    <div className="label">LV Bushing Condition:</div>
                    <div>{report.lv_bushing || "Not recorded"}</div>
                    <div className="label">Earth Connection Status:</div>
                    <div>{report.earth_connection || "Not recorded"}</div>
                  </div>
                </div>
                <div className="section">
                  <h2>Readings</h2>
                  <div className="grid">
                    <div className="label">Load Reading:</div>
                    <div>{report.load_reading || "Not recorded"}</div>
                    <div className="label">Voltage Readings:</div>
                    <div>{report.voltage_readings || "Not recorded"}</div>
                    <div className="label">Temperature Readings:</div>
                    <div>{report.temperature_readings || "Not recorded"}</div>
                    <div className="label">Abnormal Noise:</div>
                    <div>{report.abnormal_noise || "Not recorded"}</div>
                  </div>
                </div>
                <div className="section">
                  <h2>Remarks & Recommendations</h2>
                  <p>{report.remarks || "No remarks provided"}</p>
                </div>
                <div className="section">
                  <h2>Inspection Engineer</h2>
                  <div className="grid">
                    <div className="label">Name:</div>
                    <div>{report.engineer || "Not recorded"}</div>
                    <div className="label">Report Date:</div>
                    <div>{formattedCreationDate}</div>
                  </div>
                </div>
              </PrintDocument>

              <PdfExport
                title="Transformer Inspection Report"
                filename={`inspection-report-${report.transformer_id}`}
                data={report}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribution Transformer Inspection & Maintenance Form</CardTitle>
              <CardDescription>Inspection details for transformer {report.transformer_id}</CardDescription>
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

                        <div className="text-sm font-medium">Date Inspected:</div>
                        <div className="text-sm">{formattedInspectionDate}</div>
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
                      <h3 className="text-lg font-medium">Inspection Results</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm font-medium">Oil Level Status:</div>
                        <div className="text-sm">{report.oil_level || "Not recorded"}</div>

                        <div className="text-sm font-medium">Oil Leakage Observed:</div>
                        <div className="text-sm">{report.oil_leakage || "Not recorded"}</div>

                        <div className="text-sm font-medium">Buchholz Relay Condition:</div>
                        <div className="text-sm">{report.buchholz_relay || "Not recorded"}</div>

                        <div className="text-sm font-medium">Cooling System Condition:</div>
                        <div className="text-sm">{report.cooling_system || "Not recorded"}</div>

                        <div className="text-sm font-medium">HV Bushing Condition:</div>
                        <div className="text-sm">{report.hv_bushing || "Not recorded"}</div>

                        <div className="text-sm font-medium">LV Bushing Condition:</div>
                        <div className="text-sm">{report.lv_bushing || "Not recorded"}</div>

                        <div className="text-sm font-medium">Earth Connection Status:</div>
                        <div className="text-sm">{report.earth_connection || "Not recorded"}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Readings</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm font-medium">Load Reading:</div>
                        <div className="text-sm">{report.load_reading || "Not recorded"}</div>

                        <div className="text-sm font-medium">Voltage Readings:</div>
                        <div className="text-sm">{report.voltage_readings || "Not recorded"}</div>

                        <div className="text-sm font-medium">Temperature Readings:</div>
                        <div className="text-sm">{report.temperature_readings || "Not recorded"}</div>

                        <div className="text-sm font-medium">Abnormal Noise:</div>
                        <div className="text-sm">{report.abnormal_noise || "Not recorded"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Remarks & Recommendations</h3>
                  <p className="mt-2 text-sm">{report.remarks || "No remarks provided"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Inspection Engineer</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-w-md">
                    <div className="text-sm font-medium">Name:</div>
                    <div className="text-sm">{report.engineer || "Not recorded"}</div>

                    <div className="text-sm font-medium">Report Date:</div>
                    <div className="text-sm">{formattedCreationDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="default" asChild>
                <Link href="/forms">Back to All Forms</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

