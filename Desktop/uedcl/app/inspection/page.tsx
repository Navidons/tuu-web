"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WrenchIcon, ClipboardCheckIcon } from "lucide-react"

export default function InspectionPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the data
    setSubmitted(true)
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
              <Link href="/inspection">Inspection</Link>
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
            <h1 className="text-3xl font-bold tracking-tight">Transformer Inspection Form</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Inspection Checklist</CardTitle>
                <CardDescription>Complete this form during transformer inspection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transformer">Transformer ID</Label>
                    <Select required>
                      <SelectTrigger id="transformer">
                        <SelectValue placeholder="Select transformer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TX-453721">TX-453721</SelectItem>
                        <SelectItem value="TX-287654">TX-287654</SelectItem>
                        <SelectItem value="TX-198342">TX-198342</SelectItem>
                        <SelectItem value="TX-765432">TX-765432</SelectItem>
                        <SelectItem value="TX-675432">TX-675432</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspector">Inspector Name</Label>
                    <Input id="inspector" placeholder="Enter your name" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Visual Inspection</h3>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="oil-leaks" />
                      <Label htmlFor="oil-leaks">Check for oil leaks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="physical-damage" />
                      <Label htmlFor="physical-damage">Check for physical damage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="corrosion" />
                      <Label htmlFor="corrosion">Check for corrosion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bushings" />
                      <Label htmlFor="bushings">Inspect bushings for cracks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="connections" />
                      <Label htmlFor="connections">Check all connections</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Oil Condition</h3>

                  <div className="space-y-2">
                    <Label>Oil Level</Label>
                    <RadioGroup defaultValue="normal">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="oil-low" />
                        <Label htmlFor="oil-low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="oil-normal" />
                        <Label htmlFor="oil-normal">Normal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="oil-high" />
                        <Label htmlFor="oil-high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Oil Color</Label>
                    <RadioGroup defaultValue="clear">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="clear" id="oil-clear" />
                        <Label htmlFor="oil-clear">Clear</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="amber" id="oil-amber" />
                        <Label htmlFor="oil-amber">Amber</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="oil-dark" />
                        <Label htmlFor="oil-dark">Dark</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Measurements</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <Input id="temperature" type="number" placeholder="Enter temperature" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="load">Load (%)</Label>
                      <Input id="load" type="number" placeholder="Enter load percentage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voltage-primary">Primary Voltage (kV)</Label>
                      <Input id="voltage-primary" type="number" placeholder="Enter primary voltage" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voltage-secondary">Secondary Voltage (kV)</Label>
                      <Input id="voltage-secondary" type="number" placeholder="Enter secondary voltage" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="findings">Findings & Observations</Label>
                  <Textarea id="findings" placeholder="Enter any findings or observations" className="min-h-[100px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Enter any recommendations for maintenance or repairs"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit">
                  <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                  Submit Inspection
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

