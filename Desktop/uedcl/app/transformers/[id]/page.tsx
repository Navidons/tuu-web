"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { WrenchIcon, ClipboardCheckIcon, HistoryIcon, AlertTriangleIcon, CalendarIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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

export default function TransformerDetailPage({ params }: { params: { id: string } }) {
  const [transformer, setTransformer] = useState<Transformer | null>(null);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
  const [issues, setIssues] = useState<FaultRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransformerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/transformers/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Transformer with ID ${params.id} not found`);
          }
          throw new Error(`Failed to fetch transformer details: ${response.statusText}`);
        }
        
        const data = await response.json();
        setTransformer(data.transformer);
        setMaintenance(data.maintenance || []);
        setIssues(data.issues || []);
      } catch (err) {
        console.error('Error fetching transformer details:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTransformerDetails();
  }, [params.id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/4" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-[300px] md:col-span-2" />
            <Skeleton className="h-[300px]" />
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href="/transformers">Back to Transformers</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!transformer) {
    return (
      <div className="container py-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Transformer Not Found</AlertTitle>
          <AlertDescription>The requested transformer could not be found.</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href="/transformers">Back to Transformers</Link>
          </Button>
        </div>
      </div>
    );
  }

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
              <Link href="/reports">Reports</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Transformer {transformer.id}</h1>
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
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/transformers">
                <HistoryIcon className="mr-2 h-4 w-4" />
                  Back to List
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/maintenance/new?transformer=${transformer.serial_number}`}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Maintenance
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Transformer Details</CardTitle>
                <CardDescription>Technical specifications and location information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">ID:</span>
                      <span>{transformer.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Serial Number:</span>
                      <span>{transformer.serial_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Rating:</span>
                      <span>{transformer.capacity_kva} kVA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Manufacturer:</span>
                      <span>{transformer.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Manufacturing Date:</span>
                      <span>{formatDate(transformer.manufacturing_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Installation Date:</span>
                      <span>{formatDate(transformer.installation_date)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{transformer.location || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">GPS Coordinates:</span>
                      <span>{transformer.gps_coordinates || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span>{transformer.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last Maintenance:</span>
                      <span>{formatDate(transformer.last_maintenance_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created At:</span>
                      <span>{formatDate(transformer.created_at)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Summary</CardTitle>
                <CardDescription>Overview of maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Last Maintenance</h4>
                    <p>{formatDate(transformer.last_maintenance_date)}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Maintenance Count</h4>
                    <div className="text-2xl font-bold">{maintenance.length}</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Issues Count</h4>
                    <div className="text-2xl font-bold">{issues.length}</div>
                      </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/maintenance/new?transformer=${transformer.serial_number}`}>
                        Schedule New Maintenance
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">
                <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                Maintenance History
              </TabsTrigger>
              <TabsTrigger value="issues">
                <AlertTriangleIcon className="mr-2 h-4 w-4" />
                Issues & Repairs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance History</CardTitle>
                  <CardDescription>Record of all maintenance activities performed on this transformer</CardDescription>
                </CardHeader>
                <CardContent>
                  {maintenance.length === 0 ? (
                    <div className="text-center py-4">
                      <p>No maintenance records found for this transformer.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Actions Taken</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {maintenance.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{formatDate(record.maintenance_date)}</TableCell>
                            <TableCell>{record.maintenance_type}</TableCell>
                            <TableCell>{record.actions_taken}</TableCell>
                            <TableCell>{record.technician_id}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  record.status === "Completed"
                                    ? "default"
                                    : record.status === "In Progress"
                                      ? "secondary"
                                      : record.status === "Scheduled"
                                        ? "outline"
                                        : "destructive"
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="issues">
              <Card>
                <CardHeader>
                  <CardTitle>Issues & Repairs</CardTitle>
                  <CardDescription>Record of problems and their resolutions</CardDescription>
                </CardHeader>
                <CardContent>
                  {issues.length === 0 ? (
                    <div className="text-center py-4">
                      <p>No issues or repairs recorded for this transformer.</p>
                    </div>
                  ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Issue Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Impact</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell>{formatDate(issue.report_date)}</TableCell>
                            <TableCell>{issue.fault_type}</TableCell>
                            <TableCell>{issue.fault_description}</TableCell>
                            <TableCell>{issue.impact}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                  issue.status === "Resolved" || issue.status === "Closed"
                                    ? "default"
                                    : issue.status === "In Progress" || issue.status === "Under Investigation"
                                      ? "secondary"
                                      : issue.status === "Reported" || issue.status === "Scheduled"
                                        ? "outline"
                                    : "destructive"
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

