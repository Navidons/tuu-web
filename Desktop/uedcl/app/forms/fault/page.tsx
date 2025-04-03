"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { WrenchIcon, CheckIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function FaultReportPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    transformerId: '',
    reportDate: date ? format(date, 'yyyy-MM-dd') : '',
    reporterId: '1',
    faultType: 'Other',
    faultDescription: '',
    faultDate: date ? format(date, 'yyyy-MM-dd') : '',
    impact: 'Critical',
    status: 'Reported',
    // Form-specific fields
    substation: '',
    feeder: '',
    serial: '',
    rating: '',
    manufacturer: '',
    location: '',
    findings: '',
    testResults: '',
    loadReadings: '',
    voltageReadings: '',
    protectionStatus: 'functional',
    actions: '',
    recommendations: '',
    engineer: '',
    fault: {
      oilLeakage: false,
      bushingFailure: false,
      windingFault: false,
      overheating: false,
      noise: false,
      other: false
    },
    otherFaultSpecify: ''
  })

  // Update date in formData when date changes
  useState(() => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        reportDate: format(date, 'yyyy-MM-dd'),
        faultDate: format(date, 'yyyy-MM-dd')
      }))
    }
  }, [date])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      fault: {
        ...prev.fault,
        [name]: checked
      }
    }))
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

    if (!formData.findings) {
      setError('Site Inspection Findings are required')
      setLoading(false)
      return
    }
    
    // Determine fault type based on checkboxes
    let faultType = 'Other'
    if (formData.fault.oilLeakage) faultType = 'Oil Leakage'
    else if (formData.fault.bushingFailure) faultType = 'Bushing Failure'
    else if (formData.fault.windingFault) faultType = 'Winding Fault'
    else if (formData.fault.overheating) faultType = 'Overheating'
    else if (formData.fault.noise) faultType = 'Noise Issues'
    else if (formData.fault.other) faultType = formData.otherFaultSpecify || 'Other'
    
    // Map form fields to API expected fields
    const apiData = {
      transformerId: formData.serial, // Use serial as transformer ID
      reportDate: formData.reportDate,
      reporterId: formData.engineer || formData.reporterId,
      faultType: faultType,
      faultDescription: formData.findings,
      faultDate: formData.faultDate,
      impact: formData.impact,
      status: 'Reported',
      // Include additional transformer info for creation if needed
      manufacturer: formData.manufacturer,
      rating: formData.rating,
      location: formData.location
    }
    
    console.log('Sending data to API:', apiData)
    
    try {
      const response = await fetch('/api/forms/fault', {
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
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Form Submitted</CardTitle>
            <CardDescription className="text-center">
              The fault report has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>Your fault report has been recorded in the system and is now available for review.</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Technical Report on Faulty Transformer</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Fault Details</CardTitle>
              <CardDescription>Fill out this form when reporting a transformer fault</CardDescription>
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
                    value={formData.serial}
                    onChange={handleChange}
                    placeholder="Enter serial number" 
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
                  <Label htmlFor="date">Date of Fault Report</Label>
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

              <div className="space-y-4">
                <Label>Nature of Fault</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-oil" 
                      checked={formData.fault.oilLeakage}
                      onCheckedChange={(checked) => handleCheckboxChange('oilLeakage', checked)}
                    />
                    <Label htmlFor="fault-oil">Oil Leakage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-bushing"
                      checked={formData.fault.bushingFailure}
                      onCheckedChange={(checked) => handleCheckboxChange('bushingFailure', checked)} 
                    />
                    <Label htmlFor="fault-bushing">HV/LV Bushing Failure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-winding"
                      checked={formData.fault.windingFault}
                      onCheckedChange={(checked) => handleCheckboxChange('windingFault', checked)} 
                    />
                    <Label htmlFor="fault-winding">Winding Fault</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-overheating"
                      checked={formData.fault.overheating}
                      onCheckedChange={(checked) => handleCheckboxChange('overheating', checked)} 
                    />
                    <Label htmlFor="fault-overheating">Overheating</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-noise"
                      checked={formData.fault.noise}
                      onCheckedChange={(checked) => handleCheckboxChange('noise', checked)} 
                    />
                    <Label htmlFor="fault-noise">Noise Issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fault-other"
                      checked={formData.fault.other}
                      onCheckedChange={(checked) => handleCheckboxChange('other', checked)} 
                    />
                    <Label htmlFor="fault-other">Other</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherFaultSpecify">Specify Other Fault</Label>
                  <Input 
                    id="otherFaultSpecify" 
                    name="otherFaultSpecify"
                    value={formData.otherFaultSpecify}
                    onChange={handleChange}
                    placeholder="Specify if 'Other' is selected" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="findings">Site Inspection Findings <span className="text-red-500">*</span></Label>
                <Textarea
                  id="findings"
                  name="findings"
                  value={formData.findings}
                  onChange={handleChange}
                  placeholder="Enter site inspection findings"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testResults">Preliminary Test Results</Label>
                <Textarea
                  id="testResults"
                  name="testResults"
                  value={formData.testResults}
                  onChange={handleChange}
                  placeholder="Enter preliminary test results"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loadReadings">Load Readings Before Failure</Label>
                  <Input 
                    id="loadReadings" 
                    name="loadReadings"
                    value={formData.loadReadings}
                    onChange={handleChange}
                    placeholder="Enter load readings" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voltageReadings">Voltage Readings Before Failure</Label>
                  <Input 
                    id="voltageReadings" 
                    name="voltageReadings"
                    value={formData.voltageReadings}
                    onChange={handleChange}
                    placeholder="Enter voltage readings" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transformer Protection System Status</Label>
                <RadioGroup 
                  value={formData.protectionStatus} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, protectionStatus: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="functional" id="protection-functional" />
                    <Label htmlFor="protection-functional">Functional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="malfunctioning" id="protection-malfunctioning" />
                    <Label htmlFor="protection-malfunctioning">Malfunctioning</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actions">Actions Taken</Label>
                <Textarea
                  id="actions"
                  name="actions"
                  value={formData.actions}
                  onChange={handleChange}
                  placeholder="Enter actions taken to address the fault"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={handleChange}
                  placeholder="Enter recommendations for repair or replacement"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="engineer">Inspection Engineer Name</Label>
                  <Input 
                    id="engineer" 
                    name="engineer"
                    value={formData.engineer}
                    onChange={handleChange}
                    placeholder="Enter your name" 
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Fault Report'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}


