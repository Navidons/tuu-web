import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Add New Tour - Samba Tours Admin",
  description: "Create a new tour package.",
}

export default function NewTour() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/tours">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tours
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-earth-900">Add New Tour</h1>
              <p className="text-earth-600">Create a new tour package</p>
            </div>
          </div>

          <form className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tour Title *</Label>
                    <Input id="title" placeholder="Enter tour title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wildlife">Wildlife</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="birding">Birding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" placeholder="Enter tour description" rows={4} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Input id="duration" placeholder="e.g., 3 Days" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input id="price" type="number" placeholder="1200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-guests">Max Guests</Label>
                    <Input id="max-guests" type="number" placeholder="8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                  <p className="text-sm text-gray-500">Support: JPG, PNG, WebP (Max 5MB each)</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Itinerary</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Day
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Day {day}</h4>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input placeholder="Day title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input placeholder="Location" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label>Activities</Label>
                      <Textarea placeholder="Describe the day's activities" rows={3} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Accommodation", "Meals", "Transportation", "Guide Services", "Park Fees", "Activities"].map(
                    (item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`include-${item}`} />
                        <Label htmlFor={`include-${item}`}>{item}</Label>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What's Excluded</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "International Flights",
                    "Visa Fees",
                    "Travel Insurance",
                    "Personal Expenses",
                    "Tips & Gratuities",
                    "Optional Activities",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={`exclude-${item}`} />
                      <Label htmlFor={`exclude-${item}`}>{item}</Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                Create Tour
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="button" variant="ghost" asChild>
                <Link href="/admin/tours">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
