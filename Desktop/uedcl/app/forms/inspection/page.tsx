"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WrenchIcon, CheckIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from 'next/navigation'

export default function InspectionFormPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    transformerId: '',
    inspectionDate: date ? format(date, 'yyyy-MM-dd') : '',
    technicianId: '1',
    overallCondition: 'good',
    oilLevel: 'satisfactory',
    oilLeakage: 'none',
    silicaGelCondition: 'good',
    bushingsCondition: 'good',
    radiatorCondition: 'good',
    paintworkCondition: 'good',
    earthingCondition: 'good',
    temperatureReading: '',
    voltageReading: '',
    currentReading: '',
    recommendations: '',
    nextInspectionDate: '',
    status: 'Draft',
    // Form-specific fields
    substation: '',
    feeder: '',
    serial: '',
    rating: '',
    manufacturer: '',
    location: '',
    comments: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update date in formData when date changes
  useEffect(() => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        inspectionDate: format(date, 'yyyy-MM-dd')
      }))
    }
  }, [date])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (!formData.serial) {
      setError('Transformer Serial Number is required')
      setLoading(false)
      return
    }
    
    // Map form fields to API expected fields
    const apiData = {
      transformerId: formData.serial, // Use serial as transformer ID
      inspectionDate: formData.inspectionDate,
      technicianId: formData.technicianId,
      overallCondition: formData.overallCondition,
      oilLevel: formData.oilLevel,
      oilLeakage: formData.oilLeakage,
      silicaGelCondition: formData.silicaGelCondition,
      bushingsCondition: formData.bushingsCondition,
      radiatorCondition: formData.radiatorCondition,
      paintworkCondition: formData.paintworkCondition,
      earthingCondition: formData.earthingCondition,
      temperatureReading: formData.temperatureReading,
      voltageReading: formData.voltageReading,
      currentReading: formData.currentReading,
      recommendations: formData.comments,
      nextInspectionDate: formData.nextInspectionDate || format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'), // Default to 30 days in future
      status: 'Draft',
      // Include additional transformer info for creation if needed
      manufacturer: formData.manufacturer,
      rating: formData.rating,
      location: formData.location
    }
    
    console.log('Sending data to API:', apiData)
    
    try {
      const response = await fetch('/api/forms/inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      })
      
      const result = await response.json()
      console.log('API response:', result)
      
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error || 'Failed to submit form')
      }
    } catch (error) {
      setError('An error occurred while submitting the form')
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="container py-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Form Submitted</CardTitle>
            <CardDescription className="text-center">
              The inspection form has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>Your inspection report has been recorded in the system and is now available for review.</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/forms">View All Forms</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Distribution Transformer Inspection & Maintenance Form
          </h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            <CardHeader>
              <CardTitle>Inspection Details</CardTitle>
              <CardDescription>Fill out this form during routine inspection and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="substation">Substation Name</Label>
                  <Input 
                    id="substation" 
                    name="substation"
                    value={formData.substation}
                    onChange={handleChange}
                    placeholder="Enter substation name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feeder">Feeder Name</Label>
                  <Input 
                    id="feeder" 
                    name="feeder"
                    value={formData.feeder}
                    onChange={handleChange}
                    placeholder="Enter feeder name" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serial">Transformer Serial Number <span className="text-red-500">*</span></Label>
                  <Input 
                    id="serial" 
                    name="serial" 
                    placeholder="Enter transformer serial number" 
                    value={formData.serial} 
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Transformer Rating (kVA)</Label>
                  <Input 
                    id="rating" 
                    name="rating"
                    type="number" 
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Enter rating" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Transformer Manufacturer</Label>
                  <Input 
                    id="manufacturer" 
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Enter manufacturer" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date of Inspection</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Oil Level Status</Label>
                <RadioGroup 
                  defaultValue="satisfactory" 
                  value={formData.oilLevel}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, oilLevel: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="satisfactory" id="oil-satisfactory" />
                    <Label htmlFor="oil-satisfactory">Satisfactory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsatisfactory" id="oil-unsatisfactory" />
                    <Label htmlFor="oil-unsatisfactory">Unsatisfactory</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Oil Leakage Observed</Label>
                <RadioGroup 
                  defaultValue="no" 
                  value={formData.oilLeakage}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, oilLeakage: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="leakage-yes" />
                    <Label htmlFor="leakage-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="leakage-no" />
                    <Label htmlFor="leakage-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Silica Gel Condition</Label>
                <RadioGroup 
                  defaultValue="good" 
                  value={formData.silicaGelCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, silicaGelCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="silica-good" />
                    <Label htmlFor="silica-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bad" id="silica-bad" />
                    <Label htmlFor="silica-bad">Needs Replacement</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Bushings Condition</Label>
                <RadioGroup 
                  defaultValue="functional" 
                  value={formData.bushingsCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bushingsCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="functional" id="bushings-functional" />
                    <Label htmlFor="bushings-functional">Functional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-functional" id="bushings-non-functional" />
                    <Label htmlFor="bushings-non-functional">Non-functional</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Radiator Condition</Label>
                <RadioGroup 
                  defaultValue="good" 
                  value={formData.radiatorCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, radiatorCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="radiator-good" />
                    <Label htmlFor="radiator-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="needs-cleaning" id="radiator-needs-cleaning" />
                    <Label htmlFor="radiator-needs-cleaning">Needs Cleaning</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Paintwork Condition</Label>
                <RadioGroup 
                  defaultValue="good" 
                  value={formData.paintworkCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paintworkCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="paint-good" />
                    <Label htmlFor="paint-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deteriorating" id="paint-deteriorating" />
                    <Label htmlFor="paint-deteriorating">Deteriorating</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Earth Connection Status</Label>
                <RadioGroup 
                  defaultValue="secure" 
                  value={formData.earthingCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, earthingCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="secure" id="earth-secure" />
                    <Label htmlFor="earth-secure">Secure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="loose" id="earth-loose" />
                    <Label htmlFor="earth-loose">Loose</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentReading">Load Reading (Amps)</Label>
                  <Input 
                    id="currentReading" 
                    name="currentReading"
                    value={formData.currentReading}
                    onChange={handleChange}
                    placeholder="Enter load reading" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voltageReading">Voltage Readings (HV/LV)</Label>
                  <Input 
                    id="voltageReading" 
                    name="voltageReading"
                    value={formData.voltageReading}
                    onChange={handleChange}
                    placeholder="Enter voltage readings" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperatureReading">Temperature Readings</Label>
                  <Input 
                    id="temperatureReading" 
                    name="temperatureReading"
                    value={formData.temperatureReading}
                    onChange={handleChange}
                    placeholder="Enter temperature" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Overall Condition</Label>
                <RadioGroup 
                  defaultValue="good" 
                  value={formData.overallCondition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, overallCondition: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="overall-good" />
                    <Label htmlFor="overall-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="needs-maintenance" id="overall-needs-maintenance" />
                    <Label htmlFor="overall-needs-maintenance">Needs Maintenance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="overall-critical" />
                    <Label htmlFor="overall-critical">Critical</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="technicianId">Inspection Engineer ID</Label>
                  <Input 
                    id="technicianId" 
                    name="technicianId"
                    value={formData.technicianId}
                    onChange={handleChange}
                    placeholder="Enter your ID" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Remarks & Recommendations</Label>
                <Textarea 
                  id="comments" 
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Enter any remarks or recommendations" 
                  className="min-h-[100px]" 
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/forms">Cancel</Link>
              </Button>
              <Button type="submit">Submit Inspection Form</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

