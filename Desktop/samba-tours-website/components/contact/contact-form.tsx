"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Send, Upload, X, CheckCircle } from "lucide-react"

const tourTypes = [
  "Safari Tours",
  "Gorilla Trekking",
  "Cultural Tours",
  "Adventure Activities",
  "Bird Watching",
  "Custom Itinerary",
  "Group Booking",
  "Honeymoon Package",
]

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "Over $10,000",
  "I need help determining budget",
]

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [formStep, setFormStep] = useState(1)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    // Add attachments to form data
    attachments.forEach((file, index) => {
      formData.append(`attachment_${index}`, file)
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 2 hours during business hours.",
        })
        e.currentTarget.reset()
        setAttachments([])
        setFormStep(1)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024) // 10MB limit

    if (validFiles.length !== files.length) {
      toast({
        title: "File Size Warning",
        description: "Some files were too large (max 10MB each) and were not added.",
        variant: "destructive",
      })
    }

    setAttachments((prev) => [...prev, ...validFiles].slice(0, 5)) // Max 5 files
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card id="contact-form">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Send className="h-6 w-6 text-forest-600" />
          Send us a Detailed Message
        </CardTitle>
        <p className="text-earth-600">
          Tell us about your dream Uganda adventure and we'll create the perfect itinerary for you
        </p>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              formStep >= 1 ? "bg-forest-600 text-white" : "bg-earth-200 text-earth-600"
            }`}
          >
            {formStep > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
          </div>
          <div className={`flex-1 h-1 rounded ${formStep > 1 ? "bg-forest-600" : "bg-earth-200"}`} />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              formStep >= 2 ? "bg-forest-600 text-white" : "bg-earth-200 text-earth-600"
            }`}
          >
            2
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formStep === 1 && (
            <>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-earth-700 mb-2">
                    Full Name *
                  </label>
                  <Input id="name" name="name" type="text" required placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-2">
                    Email Address *
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-earth-700 mb-2">
                    Phone Number
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="+256 700 123 456" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-earth-700 mb-2">
                    Country/Region
                  </label>
                  <Input id="country" name="country" type="text" placeholder="Your country" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-earth-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="tour-inquiry">Tour Inquiry</option>
                    <option value="booking">Booking Request</option>
                    <option value="custom-tour">Custom Tour Planning</option>
                    <option value="group-booking">Group Booking</option>
                    <option value="general">General Question</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-earth-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <Button type="button" onClick={() => setFormStep(2)} className="w-full btn-primary">
                Continue to Travel Details
              </Button>
            </>
          )}

          {formStep === 2 && (
            <>
              {/* Travel Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tour-type" className="block text-sm font-medium text-earth-700 mb-2">
                    Tour Interest
                  </label>
                  <select
                    id="tour-type"
                    name="tour-type"
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="">Select tour type</option>
                    {tourTypes.map((type, index) => (
                      <option key={index} value={type.toLowerCase().replace(/\s+/g, "-")}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-earth-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-3 py-2 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range.toLowerCase().replace(/\s+/g, "-")}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="travel-date" className="block text-sm font-medium text-earth-700 mb-2">
                    Preferred Travel Date
                  </label>
                  <Input id="travel-date" name="travel-date" type="date" min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-earth-700 mb-2">
                    Duration (Days)
                  </label>
                  <Input id="duration" name="duration" type="number" min="1" max="30" placeholder="e.g., 7" />
                </div>
                <div>
                  <label htmlFor="group-size" className="block text-sm font-medium text-earth-700 mb-2">
                    Group Size
                  </label>
                  <Input
                    id="group-size"
                    name="group-size"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Number of travelers"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-earth-700 mb-2">
                  Detailed Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your travel plans, specific interests, dietary requirements, accessibility needs, or any other details that will help us create the perfect experience for you..."
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-earth-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-earth-400 mx-auto mb-2" />
                  <p className="text-sm text-earth-600 mb-2">
                    Upload travel documents, inspiration photos, or itinerary drafts
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-earth-500 mt-2">Max 5 files, 10MB each. Supported: PDF, DOC, JPG, PNG</p>
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-earth-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 text-earth-600" />
                          <span className="text-sm text-earth-700">{file.name}</span>
                          <span className="text-xs text-earth-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Communication Preferences */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-3">Preferred Communication Method</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Email", "Phone", "WhatsApp", "Video Call"].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="communication"
                        value={method.toLowerCase()}
                        className="rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                      />
                      <span className="text-sm text-earth-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-forest-50 p-4 rounded-lg">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    value="yes"
                    className="mt-1 rounded border-earth-300 text-forest-600 focus:ring-forest-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-forest-900">Subscribe to our newsletter</span>
                    <p className="text-xs text-forest-700 mt-1">
                      Get travel tips, exclusive offers, and Uganda adventure stories delivered to your inbox
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setFormStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 btn-primary">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  Send Message
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
