"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  Heart,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const contactInfo = {
  main: {
    address: "Jigjiga Yar Street near Masjid Jabir, Hargeisa, Somaliland",
    phone: "+252 63 4210013",
    email: "info@tuu.university",
    website: "www.tuu.university",
    hours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
  },
  emergency: {
    security: "+252 637 235142",
    medical: "+252 637 235143",
    maintenance: "+252 634 679325",
  },
}

const departments = [
  {
    name: "Admissions Office",
    description: "Application process, requirements, and enrollment information",
    contact: {
      email: "info@tuu.university",
      phone: "+252 63 4210013",
      office: "Administration Building, Ground Floor",
    },
    hours: "Sunday - Thursday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM",
    icon: GraduationCap,
  },
  {
    name: "Student Affairs",
    description: "Academic support, counseling, and student life activities",
    contact: {
      email: "students@tuu.university",
      phone: "+252 637 235142",
      office: "Student Center, First Floor",
    },
    hours: "Sunday - Thursday: 8:00 AM - 6:00 PM",
    icon: Users,
  },
  {
    name: "Academic Affairs",
    description: "Curriculum, faculty, and academic program information",
    contact: {
      email: "academics@tuu.university",
      phone: "+252 637 235143",
      office: "Administration Building, Second Floor",
    },
    hours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
    icon: Building,
  },
  {
    name: "Research Office",
    description: "Research opportunities, grants, and collaboration",
    contact: {
      email: "research@tuu.university",
      phone: "+252 634 679325",
      office: "Research Centers Building",
    },
    hours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
    icon: Globe,
  },
  {
    name: "Student Services",
    description: "Student welfare, accommodation, and campus life support",
    contact: {
      email: "info@tuu.university",
      phone: "+252 637 707788",
      office: "Student Center, Information Desk",
    },
    hours: "Sunday - Thursday: 8:00 AM - 6:00 PM",
    icon: Briefcase,
  },
  {
    name: "Health Services",
    description: "Medical care, health programs, and wellness initiatives",
    contact: {
      email: "health@tuu.university",
      phone: "+252 63 4210013",
      office: "Student Center, Health Clinic",
    },
    hours: "Sunday - Thursday: 8:00 AM - 6:00 PM, Emergency: 24/7",
    icon: Heart,
  },
]

const socialMedia = [
  { name: "Facebook", handle: "@theunityuniversity", url: "https://www.facebook.com/theunityuniversity/" },
  { name: "Twitter", handle: "@ProfPLOLumumba", url: "https://x.com/ProfPLOLumumba/status/1605872680317616128?lang=en" },
  { name: "LinkedIn", handle: "The Unity University", url: "https://www.linkedin.com/company/the-unity-university/?originalSubdomain=so" },
  { name: "Instagram", handle: "@theunityuniversity", url: "https://www.instagram.com/p/Cmd3K5Oj1D1/?img_index=1" },
  { name: "YouTube", handle: "Unity University", url: "https://www.youtube.com/watch?v=8vBnxHefYZs" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        department: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Contact Us</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Get in touch with Unity University - we're here to help with all your questions
              </p>
            </div>
          </div>
        </div>

        {/* Main Contact Information */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.main.address}</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.main.phone}</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.main.email}</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Hours</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.main.hours}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact Form and Departments */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                        <p className="text-gray-600">Thank you for contacting us. We'll respond within 24 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <Input
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Your full name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <Input
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+252 XX XXX XXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Department</label>
                            <Select
                              value={formData.department}
                              onValueChange={(value) => handleInputChange("department", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="admissions">Admissions</SelectItem>
                                <SelectItem value="academic">Academic Affairs</SelectItem>
                                <SelectItem value="research">Research</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="student">Student Services</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Subject *</label>
                          <Input
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            placeholder="Brief subject of your message"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Message *</label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Please provide details about your inquiry..."
                            rows={5}
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Department Contacts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Department Contacts</h2>
                <div className="space-y-4">
                  {departments.map((dept, index) => {
                    const IconComponent = dept.icon
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{dept.name}</h3>
                              <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <a href={`mailto:${dept.contact.email}`} className="text-green-600 hover:underline">
                                    {dept.contact.email}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-600">{dept.contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-600">{dept.contact.office}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-600">{dept.hours}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Campus Security</h3>
                  <p className="text-gray-600 text-sm mb-2">24/7 Emergency Response</p>
                  <p className="font-mono text-lg">{contactInfo.emergency.security}</p>
                </CardContent>
              </Card>
              <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Medical Emergency</h3>
                  <p className="text-gray-600 text-sm mb-2">Health Services Emergency</p>
                  <p className="font-mono text-lg">{contactInfo.emergency.medical}</p>
                </CardContent>
              </Card>
              <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Building className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">Maintenance</h3>
                  <p className="text-gray-600 text-sm mb-2">Facilities Emergency</p>
                  <p className="font-mono text-lg">{contactInfo.emergency.maintenance}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Social Media and Additional Info */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                <p className="text-gray-600 mb-6">
                  Stay connected with Unity University through our social media channels for the latest news, events,
                  and updates.
                </p>
                <div className="space-y-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:bg-green-50"
                    >
                      <Globe className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">{social.name}</span>
                        <span className="text-gray-600 ml-2">{social.handle}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Visit Us</h2>
                <div className="bg-white p-6 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Campus Tours</h3>
                      <p className="text-gray-600 text-sm">
                        Schedule a guided tour of our campus to see our facilities and meet our community.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Information Sessions</h3>
                      <p className="text-gray-600 text-sm">
                        Join our regular information sessions to learn about our programs and admission process.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Open Days</h3>
                      <p className="text-gray-600 text-sm">
                        Attend our open days to experience campus life and meet faculty and current students.
                      </p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">Schedule a Visit</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Unity University?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Take the next step in your educational journey with us</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Request Information
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
