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

export default function CommissioningForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    transformerId: '',
    dateCommissioned: date ? format(date, 'yyyy-MM-dd') : '',
    location: '',
    technicianId: '1', // Default to ID 1 for now
    voltage: '',
    current: '',
    oilLevel: 'satisfactory',
    silicaGelCondition: 'good',
    earthingStatus: 'good',
    installationQuality: 'good',
    notes: '',
    substation: '',
    feeder: '',
    serial: '',
    rating: '',
    manufacturer: '',
    gps: '',
    oilLevelCheck: 'satisfactory',
    insulation: '',
    polarity: '',
    noLoad: '',
    loadLoss: '',
    operationalTests: 'passed',
    comments: ''  // Add this field to match the reference in handleSubmit
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update date in formData when date changes
  useEffect(() => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        dateCommissioned: format(date, 'yyyy-MM-dd')
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
    
    // Map form fields to API expected fields
    const apiData = {
      transformerId: formData.serial, // Use serial as transformer ID
      dateCommissioned: formData.dateCommissioned,
      location: `${formData.substation}, ${formData.location}`,
      technicianId: formData.technicianId,
      voltageReading: formData.voltage,
      currentReading: formData.current || formData.loadLoss,
      oilLevel: formData.oilLevelCheck || formData.oilLevel,
      silicaGelCondition: formData.silicaGelCondition || 'good',
      earthingStatus: formData.earthingStatus || 'good',
      installationQuality: formData.operationalTests === 'passed' ? 'good' : 'poor',
      notes: formData.comments || formData.notes || '',
      status: 'Draft'
    }
    
    console.log('Sending data to API:', apiData)
    
    try {
      const response = await fetch('/api/forms/commissioning', {
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
              The commissioning report has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>Your commissioning report has been recorded in the system and is now available for review.</p>
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
      <h1 className="text-2xl font-bold mb-6">Transformer Commissioning Form</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Commissioning Details</CardTitle>
            <CardDescription>Fill out this form when commissioning a new transformer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="substation">Substation Name</Label>
                <Input id="substation" placeholder="Enter substation name" required name="substation" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feeder">Feeder Name</Label>
                <Input id="feeder" placeholder="Enter feeder name" required name="feeder" onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="serial">Transformer Serial Number</Label>
                <Input id="serial" placeholder="Enter serial number" required name="serial" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Transformer Rating (kVA)</Label>
                <Input id="rating" type="number" placeholder="Enter rating" required name="rating" onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Transformer Manufacturer</Label>
                <Input id="manufacturer" placeholder="Enter manufacturer" required name="manufacturer" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date of Commissioning</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location Details</Label>
                <Input id="location" placeholder="Enter location details" required name="location" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gps">GPS Coordinates (X, Y)</Label>
                <Input id="gps" placeholder="Enter GPS coordinates" required name="gps" onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Oil Level Check</Label>
              <RadioGroup defaultValue="satisfactory" name="oilLevelCheck" onChange={handleChange}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="insulation">Insulation Resistance Test Results</Label>
                <Input id="insulation" placeholder="Enter test results" required name="insulation" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voltage">Voltage Ratio Test Results</Label>
                <Input id="voltage" placeholder="Enter test results" required name="voltage" onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="polarity">Polarity and Phase Relationship Test</Label>
                <Input id="polarity" placeholder="Enter test results" required name="polarity" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="no-load">No-Load Loss Measurement</Label>
                <Input id="no-load" placeholder="Enter measurement" required name="noLoad" onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="load-loss">Load Loss Measurement</Label>
                <Input id="load-loss" placeholder="Enter measurement" required name="loadLoss" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Operational Tests</Label>
                <RadioGroup defaultValue="passed" name="operationalTests" onChange={handleChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passed" id="tests-passed" />
                    <Label htmlFor="tests-passed">Passed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="failed" id="tests-failed" />
                    <Label htmlFor="tests-failed">Failed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Enter any comments or additional information"
                className="min-h-[100px]"
                name="comments"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="engineer">Inspection Engineer Name</Label>
                <Input id="engineer" placeholder="Enter your name" required name="engineer" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <Input id="signature" placeholder="Digital signature or ID" required name="signature" onChange={handleChange} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/forms">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Commissioning Report'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

