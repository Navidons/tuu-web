"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Book,
  Shield,
  MapPin,
  Star,
  ArrowRight,
  Check,
  Phone,
  Mail,
} from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

const universityServices = [
  {
    id: 1,
    name: "High-Speed WiFi",
    category: "Technology",
    campus: "All Campuses",
    availability: "24/7",
    description:
      "Reliable high-speed internet access throughout all university facilities including dormitories, classrooms, libraries, and common areas",
    features: ["Fiber optic connection", "99.9% uptime", "Technical support", "Guest network available"],
    icon: Wifi,
    featured: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "24/7 Security Services",
    category: "Safety",
    campus: "All Campuses",
    availability: "24/7",
    description:
      "Comprehensive security services ensuring student safety with trained personnel and modern surveillance systems",
    features: ["CCTV monitoring", "Access control systems", "Emergency response", "Security escorts"],
    icon: Shield,
    featured: true,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Car Parking Facilities",
    category: "Transportation",
    campus: "All Campuses",
    availability: "24/7",
    description: "Secure parking facilities for students, faculty, and visitors with covered and open parking options",
    features: ["Covered parking", "Security cameras", "Student permits", "Visitor parking"],
    icon: Car,
    featured: true,
    rating: 4.5,
  },
  {
    id: 4,
    name: "University Cafeteria",
    category: "Dining",
    campus: "All Campuses",
    availability: "6:00 AM - 10:00 PM",
    description:
      "Multiple dining options serving international cuisine with halal, vegetarian, and special dietary accommodations",
    features: ["Halal certified", "International cuisine", "Healthy options", "Meal plans available"],
    icon: Utensils,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Computer Labs",
    category: "Technology",
    campus: "All Campuses",
    availability: "6:00 AM - 12:00 AM",
    description:
      "State-of-the-art computer laboratories with latest software and hardware for academic and research purposes",
    features: ["Latest software", "High-performance PCs", "Printing services", "Technical support"],
    icon: Book,
    featured: true,
    rating: 4.7,
  },
  {
    id: 6,
    name: "University Library",
    category: "Academic",
    campus: "All Campuses",
    availability: "24/7 (Study areas)",
    description:
      "Comprehensive library services with extensive collections, digital resources, and collaborative study spaces",
    features: ["Digital databases", "Study rooms", "Research assistance", "Inter-library loans"],
    icon: Book,
    featured: true,
    rating: 4.8,
  },
  {
    id: 7,
    name: "Fitness Center",
    category: "Recreation",
    campus: "All Campuses",
    availability: "5:00 AM - 11:00 PM",
    description:
      "Modern fitness facilities with cardio equipment, weight training, group classes, and personal training services",
    features: ["Modern equipment", "Group classes", "Personal training", "Locker rooms"],
    icon: Dumbbell,
    rating: 4.4,
  },
  {
    id: 8,
    name: "Medical Center",
    category: "Health",
    campus: "All Campuses",
    availability: "8:00 AM - 6:00 PM",
    description:
      "On-campus medical services providing primary healthcare, emergency care, and wellness programs for students",
    features: ["Primary care", "Emergency services", "Mental health support", "Health education"],
    icon: Shield,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Student Support Services",
    category: "Support",
    campus: "All Campuses",
    availability: "8:00 AM - 5:00 PM",
    description:
      "Comprehensive student support including academic advising, career counseling, and personal development programs",
    features: ["Academic advising", "Career counseling", "Tutoring services", "Disability support"],
    icon: Users,
    rating: 4.5,
  },
  {
    id: 10,
    name: "Transportation Services",
    category: "Transportation",
    campus: "Main Campus",
    availability: "6:00 AM - 10:00 PM",
    description: "Campus shuttle services connecting different buildings and nearby transportation hubs",
    features: ["Campus shuttles", "Route scheduling", "Mobile tracking", "Accessibility features"],
    icon: Car,
    rating: 4.3,
  },
]

const serviceCategories = [
  { name: "Technology", icon: Wifi, description: "Digital infrastructure and IT services" },
  { name: "Safety", icon: Shield, description: "Security and emergency services" },
  { name: "Academic", icon: Book, description: "Learning and research facilities" },
  { name: "Dining", icon: Utensils, description: "Food and beverage services" },
  { name: "Recreation", icon: Dumbbell, description: "Sports and wellness facilities" },
  { name: "Transportation", icon: Car, description: "Parking and shuttle services" },
  { name: "Health", icon: Shield, description: "Medical and wellness services" },
  { name: "Support", icon: Users, description: "Student assistance and guidance" },
]

const applicationSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete the online housing application with your preferences",
  },
  {
    step: 2,
    title: "Pay Deposit",
    description: "Submit your housing deposit to secure your spot",
  },
  {
    step: 3,
    title: "Room Assignment",
    description: "Receive your room assignment and roommate information",
  },
  {
    step: 4,
    title: "Move-In",
    description: "Attend orientation and move into your new home",
  },
]

export default function HousingPage() {
  const [selectedCampus, setSelectedCampus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const campuses = ["All", "Main Campus", "Somalia Campus", "UAE Campus"]
  const categories = [
    "All",
    "Technology",
    "Safety",
    "Academic",
    "Dining",
    "Recreation",
    "Transportation",
    "Health",
    "Support",
  ]

  const filteredServices = universityServices.filter((service) => {
    const matchesCampus =
      selectedCampus === "All" || service.campus === selectedCampus || service.campus === "All Campuses"
    const matchesCategory = selectedType === "All" || service.category === selectedType
    return matchesCampus && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              University Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover the comprehensive range of services and facilities available to Unity University students across
              all our campuses. From technology infrastructure to wellness programs, we provide everything you need for
              academic success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Services
              </Button>
              <Button size="lg" variant="outline">
                Virtual Tour
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities Overview */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive services are organized into categories to help you find exactly what you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 flex items-center">Campus:</span>
              {campuses.map((campus) => (
                <Button
                  key={campus}
                  variant={selectedCampus === campus ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCampus(campus)}
                >
                  {campus}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 flex items-center">Category:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedType === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Housing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-lg text-gray-600">Essential services available across all campuses</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {universityServices
              .filter((service) => service.featured)
              .map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                    <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 relative flex items-center justify-center">
                      <service.icon className="w-16 h-16 text-white" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-gray-900">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{service.category}</Badge>
                        <div className="text-sm text-gray-600">{service.campus}</div>
                      </div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {service.campus}
                        </div>
                        <div className="text-green-600 font-medium">{service.availability}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{service.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                          {service.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-500" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* All Housing Options */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All University Services</h2>
            <p className="text-lg text-gray-600">Complete list of services and facilities available to students</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{service.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{service.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <service.icon className="w-5 h-5" />
                      {service.name}
                    </CardTitle>
                    <div className="text-sm text-gray-600">{service.campus}</div>
                    <div className="text-sm text-green-600 font-medium">{service.availability}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting housing at Unity University is simple. Follow these four easy steps to secure your spot.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-0 bg-white hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Application
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with Services?</h2>
              <p className="text-xl mb-6 opacity-90">
                Our student services team is here to help you access and utilize all university facilities and services.
                Contact us for assistance or more information.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>housing@unity.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Student Services Building, Room 150</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-lg">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 10:00 AM - 4:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
                <Button size="lg" variant="secondary" className="mt-6">
                  Schedule Visit
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
