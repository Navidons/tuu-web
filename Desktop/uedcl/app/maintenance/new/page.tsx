"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { WrenchIcon, CalendarIcon, CheckIcon, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

interface FormData {
  transformer_id: string
  maintenance_type: string
  maintenance_date: string
  technician_id: string
  actions_taken: string
  notes: string | null
}

interface Transformer {
  id: number
  serial_number: string
  manufacturer: string
  location?: string
  capacity_kva: number
  status: string
}

interface Technician {
  id: string
  name: string
  role: string
  team: string
}

export default function NewMaintenancePage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [transformers, setTransformers] = useState<Transformer[]>([])
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    transformer_id: "",
    maintenance_type: "",
    maintenance_date: date ? format(date, 'yyyy-MM-dd') : "",
    technician_id: "",
    actions_taken: "",
    notes: null
  })

  // Fetch transformers and technicians data
  useEffect(() => {
    async function fetchData() {
      setLoadingData(true)
      try {
        // Fetch transformers
        const transformersResponse = await fetch('/api/transformers')
        if (!transformersResponse.ok) {
          throw new Error('Failed to fetch transformers')
        }
        const transformersData = await transformersResponse.json()
        
        // Fetch technicians
        const techniciansResponse = await fetch('/api/technicians')
        if (!techniciansResponse.ok) {
          throw new Error('Failed to fetch technicians')
        }
        const techniciansData = await techniciansResponse.json()
        
        setTransformers(transformersData.transformers || [])
        setTechnicians(techniciansData.technicians || [])
      } catch (error) {
        console.error('Error fetching form data:', error)
        setLoadingError(error instanceof Error ? error.message : 'Failed to load required data')
      } finally {
        setLoadingData(false)
      }
    }
    
    fetchData()
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate) {
      handleInputChange('maintenance_date', format(newDate, 'yyyy-MM-dd'))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.transformer_id || !formData.maintenance_type || !formData.maintenance_date || !formData.technician_id) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Extract maintenance type from the dropdown value if it contains a prefix
      const actualMaintenanceType = formData.maintenance_type.includes(":") 
        ? formData.maintenance_type.split(":")[0] 
        : formData.maintenance_type
      
      // Prepare data for API
      const maintenanceData = {
        ...formData,
        maintenance_type: actualMaintenanceType,
        status: "Scheduled", // Default status for new maintenance
        maintenance_date: formData.maintenance_date // Map maintenance_date to maintenance_date for API
      }
      
      // Send data to API
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maintenanceData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to schedule maintenance')
      }
      
      // If successful, redirect to maintenance page
      setSubmitted(true)
      setLoading(false)
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        router.push('/maintenance')
      }, 1500)
      
    } catch (error) {
      console.error('Error scheduling maintenance:', error)
      setError(error instanceof Error ? error.message : 'Failed to schedule maintenance')
      setLoading(false)
    }
  }

  const getMaintenanceTypeLabel = (type: string): string => {
    const maintenanceTypes = {
      'Preventive': 'Preventive Maintenance',
      'Corrective': 'Corrective Maintenance',
      'Emergency': 'Emergency Maintenance'
    };
    return maintenanceTypes[type as keyof typeof maintenanceTypes] || type;
  };

  if (submitted) {
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
        <main className="flex-1 container py-6 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">Maintenance Scheduled</CardTitle>
              <CardDescription className="text-center">
                The maintenance task has been successfully scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>Your maintenance task has been added to the schedule and assigned to the selected team.</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/maintenance">View Schedule</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  if (loadingData) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Schedule New Maintenance</h1>
            </div>
            
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold">Loading Required Data</h2>
                <p className="text-muted-foreground mt-2">Fetching transformers and technicians...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Schedule New Maintenance</h1>
          </div>

          {loadingError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Data</AlertTitle>
              <AlertDescription>{loadingError}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Maintenance Details</CardTitle>
                <CardDescription>Enter the details for the new maintenance task</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transformer">Transformer ID</Label>
                    <Select 
                      required
                      onValueChange={(value) => handleInputChange('transformer_id', value)}
                      value={formData.transformer_id}
                      disabled={transformers.length === 0}
                    >
                      <SelectTrigger id="transformer">
                        <SelectValue placeholder={transformers.length ? "Select transformer" : "No transformers available"} />
                      </SelectTrigger>
                      <SelectContent>
                        {transformers.map((transformer) => (
                          <SelectItem key={transformer.id} value={transformer.serial_number}>
                            {transformer.serial_number} - {transformer.location || 'Unknown location'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {transformers.length === 0 && !loadingError && (
                      <p className="text-sm text-muted-foreground mt-1">
                        No transformers found. Please add transformers first.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-type">Maintenance Type</Label>
                    <Select 
                      required
                      onValueChange={(value) => {
                        // Extract the actual maintenance type from the value (format: "type:label")
                        const maintenanceType = value.split(':')[0];
                        handleInputChange('maintenance_type', maintenanceType);
                      }}
                      value={formData.maintenance_type ? `${formData.maintenance_type}:${getMaintenanceTypeLabel(formData.maintenance_type)}` : ""}
                    >
                      <SelectTrigger id="maintenance-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Preventive:routine">Routine Inspection</SelectItem>
                        <SelectItem value="Preventive:maintenance">Preventive Maintenance</SelectItem>
                        <SelectItem value="Preventive:oil">Oil Testing</SelectItem>
                        <SelectItem value="Preventive:thermal">Thermal Imaging</SelectItem>
                        <SelectItem value="Corrective:overhaul">Annual Overhaul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Scheduled Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technician">Technician</Label>
                    <Select
                      required
                      onValueChange={(value) => handleInputChange('technician_id', value)}
                      value={formData.technician_id}
                      disabled={technicians.length === 0}
                    >
                      <SelectTrigger id="technician">
                        <SelectValue placeholder={technicians.length ? "Select technician" : "No technicians available"} />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((technician) => (
                          <SelectItem key={technician.id} value={technician.id}>
                            {technician.name} - {technician.team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {technicians.length === 0 && !loadingError && (
                      <p className="text-sm text-muted-foreground mt-1">
                        No technicians found. Please contact administrator.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actions">Actions to be Taken</Label>
                  <Textarea
                    id="actions"
                    value={formData.actions_taken}
                    onChange={(e) => handleInputChange('actions_taken', e.target.value)}
                    placeholder="Describe the maintenance actions to be performed"
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes & Instructions</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any specific instructions or notes for the maintenance team"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/maintenance">Cancel</Link>
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || transformers.length === 0 || technicians.length === 0}
                >
                  {loading ? "Scheduling..." : "Schedule Maintenance"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

