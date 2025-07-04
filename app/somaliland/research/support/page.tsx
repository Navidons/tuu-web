"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Database,
  Settings,
  Shield,
} from "lucide-react"

import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const supportServices = [
  {
    id: 1,
    title: "Research Funding Support",
    category: "Funding",
    description:
      "Comprehensive support for identifying, applying for, and managing research grants and funding opportunities.",
    services: [
      "Grant opportunity identification",
      "Proposal writing assistance",
      "Budget development support",
      "Application review and feedback",
      "Post-award management",
      "Compliance monitoring",
    ],
    contact: {
      email: "funding@unity.edu.so",
      phone: "+252 63 123 4567",
      office: "Research Office, Building A",
    },
    availability: "Monday - Friday, 8:00 AM - 5:00 PM",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Research Ethics & Compliance",
    category: "Ethics",
    description: "Ensuring all research activities meet ethical standards and regulatory compliance requirements.",
    services: [
      "IRB application support",
      "Ethics training workshops",
      "Compliance monitoring",
      "Risk assessment",
      "Data protection guidance",
      "International standards alignment",
    ],
    contact: {
      email: "ethics@unity.edu.so",
      phone: "+252 63 234 5678",
      office: "Ethics Committee Office, Building B",
    },
    availability: "Monday - Thursday, 9:00 AM - 4:00 PM",
    icon: Shield,
  },
  {
    id: 3,
    title: "Research Data Management",
    category: "Data",
    description:
      "Support for managing, storing, and sharing research data in compliance with best practices and regulations.",
    services: [
      "Data management planning",
      "Secure data storage solutions",
      "Data backup and recovery",
      "Data sharing protocols",
      "Statistical analysis support",
      "Database design consultation",
    ],
    contact: {
      email: "datamanagement@unity.edu.so",
      phone: "+252 63 345 6789",
      office: "IT Research Support, Building C",
    },
    availability: "Monday - Friday, 8:30 AM - 5:30 PM",
    icon: Database,
  },
  {
    id: 4,
    title: "Publication & Dissemination",
    category: "Publication",
    description: "Support for publishing research findings and disseminating results to academic and public audiences.",
    services: [
      "Journal selection guidance",
      "Manuscript preparation support",
      "Peer review coordination",
      "Open access publishing",
      "Conference presentation support",
      "Media and outreach assistance",
    ],
    contact: {
      email: "publications@unity.edu.so",
      phone: "+252 63 456 7890",
      office: "Academic Publishing Office, Building D",
    },
    availability: "Monday - Friday, 9:00 AM - 4:00 PM",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Research Training & Development",
    category: "Training",
    description: "Professional development programs and training opportunities for researchers at all career stages.",
    services: [
      "Research methodology workshops",
      "Statistical analysis training",
      "Academic writing courses",
      "Grant writing seminars",
      "Leadership development",
      "Mentorship programs",
    ],
    contact: {
      email: "training@unity.edu.so",
      phone: "+252 63 567 8901",
      office: "Professional Development Center, Building E",
    },
    availability: "Monday - Friday, 8:00 AM - 6:00 PM",
    icon: Users,
  },
  {
    id: 6,
    title: "Research Infrastructure",
    category: "Infrastructure",
    description:
      "Access to research facilities, equipment, and technical support for conducting high-quality research.",
    services: [
      "Laboratory access and booking",
      "Equipment training and support",
      "Technical maintenance",
      "Specialized software licensing",
      "Computing resources",
      "Field research coordination",
    ],
    contact: {
      email: "infrastructure@unity.edu.so",
      phone: "+252 63 678 9012",
      office: "Research Facilities Office, Building F",
    },
    availability: "24/7 access with advance booking",
    icon: Settings,
  },
]

const quickLinks = [
  {
    title: "Research Proposal Template",
    description: "Standard template for research proposals",
    type: "Document",
    link: "#",
  },
  {
    title: "Ethics Application Form",
    description: "IRB application form and guidelines",
    type: "Form",
    link: "#",
  },
  {
    title: "Data Management Plan Template",
    description: "Template for creating data management plans",
    type: "Document",
    link: "#",
  },
  {
    title: "Publication Guidelines",
    description: "Guidelines for academic publishing",
    type: "Guide",
    link: "#",
  },
  {
    title: "Funding Opportunities Database",
    description: "Current funding opportunities",
    type: "Database",
    link: "#",
  },
  {
    title: "Research Calendar",
    description: "Important dates and deadlines",
    type: "Calendar",
    link: "#",
  },
]

const upcomingEvents = [
  {
    title: "Grant Writing Workshop",
    date: "March 15, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Room A",
    type: "Workshop",
  },
  {
    title: "Research Ethics Seminar",
    date: "March 22, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Auditorium",
    type: "Seminar",
  },
  {
    title: "Data Analysis Training",
    date: "March 28, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Computer Lab 1",
    type: "Training",
  },
  {
    title: "Publication Strategy Session",
    date: "April 5, 2024",
    time: "1:00 PM - 3:00 PM",
    location: "Library Meeting Room",
    type: "Session",
  },
]

export default function ResearchSupportPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const categories = ["all", ...Array.from(new Set(supportServices.map((s) => s.category)))]

  const filteredServices = supportServices.filter(
    (service) => selectedCategory === "all" || service.category === selectedCategory,
  )

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Research Support</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Comprehensive support services to advance your research excellence
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">Researchers Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$12.5M</div>
                <div className="text-gray-600">Grants Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full max-w-4xl mx-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category === "all" ? "All Services" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Support Services Grid */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Services Offered:</h4>
                          <ul className="space-y-1">
                            {service.services.slice(0, 3).map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                            {service.services.length > 3 && (
                              <li className="text-sm text-gray-500">+{service.services.length - 3} more services</li>
                            )}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => setSelectedService(service.id)}
                          >
                            Learn More
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{link.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {link.type}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Service Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const service = supportServices.find((s) => s.id === selectedService)!
                const IconComponent = service.icon
                return (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <IconComponent className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{service.title}</h2>
                          <Badge variant="outline">{service.category}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => setSelectedService(null)}>
                        ×
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">About This Service</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
                          <ul className="space-y-2">
                            {service.services.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-gray-400" />
                              <a href={`mailto:${service.contact.email}`} className="text-green-600 hover:underline">
                                {service.contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-600">{service.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-600">{service.contact.office}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-600">{service.availability}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-green-600 hover:bg-green-700 mb-3">
                            Contact Service
                            <Mail className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Schedule Consultation
                            <Calendar className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Research Support?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our dedicated research support team is here to help you succeed in your research endeavors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Contact Research Office
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
