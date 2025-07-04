"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Building,
  MapPin,
  Users,
  Award,
  Microscope,
  Cpu,
  Leaf,
  Heart,
  BookOpen,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

export default function ResearchCentersPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const researchCenters = [
    {
      id: "sustainable-development",
      name: "Center for Sustainable Development",
      location: "Liberia Campus",
      established: "2006",
      director: "Dr. Sarah Johnson",
      focus: "Environmental sustainability, renewable energy, and climate adaptation",
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
      staff: 25,
      projects: 15,
      funding: "$2.3M",
      facilities: [
        "Environmental Testing Laboratory",
        "Renewable Energy Research Lab",
        "Climate Simulation Center",
        "Sustainable Materials Workshop",
      ],
      achievements: [
        "Developed solar water purification system",
        "Published 45 peer-reviewed papers",
        "Trained 200+ sustainability professionals",
        "Partnered with 15 international organizations",
      ],
      contact: {
        email: "csd@tuu.university",
        phone: "+231-555-0123",
      },
    },
    {
      id: "health-innovation",
      name: "Center for Health Innovation",
      location: "Somaliland Campus",
      established: "2008",
      director: "Dr. Amina Hassan",
      focus: "Digital health, telemedicine, and community health solutions",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      staff: 20,
      projects: 12,
      funding: "$1.8M",
      facilities: [
        "Digital Health Laboratory",
        "Telemedicine Simulation Center",
        "Medical Device Prototyping Lab",
        "Community Health Research Unit",
      ],
      achievements: [
        "Launched mobile health platform",
        "Served 10,000+ patients remotely",
        "Developed low-cost diagnostic tools",
        "Established 8 community health partnerships",
      ],
      contact: {
        email: "chi@tuu.university",
        phone: "+252-555-0456",
      },
    },
    {
      id: "technology-innovation",
      name: "Center for Technology Innovation",
      location: "Both Campuses",
      established: "2010",
      director: "Dr. Michael Chen",
      focus: "AI, machine learning, and educational technology",
      icon: Cpu,
      color: "from-blue-500 to-cyan-600",
      staff: 30,
      projects: 18,
      funding: "$2.1M",
      facilities: [
        "AI Research Laboratory",
        "High-Performance Computing Center",
        "EdTech Development Studio",
        "Robotics Workshop",
      ],
      achievements: [
        "Developed AI-powered learning platform",
        "Created 12 educational apps",
        "Trained 500+ students in tech skills",
        "Filed 8 technology patents",
      ],
      contact: {
        email: "cti@tuu.university",
        phone: "+1-555-0789",
      },
    },
    {
      id: "economic-development",
      name: "Center for Economic Development",
      location: "Liberia Campus",
      established: "2012",
      director: "Dr. Grace Okafor",
      focus: "Entrepreneurship, microfinance, and economic policy research",
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      staff: 18,
      projects: 10,
      funding: "$1.5M",
      facilities: [
        "Economic Research Laboratory",
        "Entrepreneurship Incubator",
        "Policy Analysis Center",
        "Market Research Unit",
      ],
      achievements: [
        "Supported 150+ startups",
        "Created 500+ jobs",
        "Influenced 5 policy changes",
        "Secured $3M in startup funding",
      ],
      contact: {
        email: "ced@tuu.university",
        phone: "+231-555-0321",
      },
    },
    {
      id: "education-research",
      name: "Center for Education Research",
      location: "Somaliland Campus",
      established: "2014",
      director: "Dr. James Wilson",
      focus: "Pedagogy, curriculum development, and educational assessment",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-600",
      staff: 22,
      projects: 14,
      funding: "$1.2M",
      facilities: [
        "Learning Sciences Laboratory",
        "Curriculum Development Center",
        "Assessment Research Unit",
        "Teacher Training Facility",
      ],
      achievements: [
        "Developed new curriculum frameworks",
        "Trained 1,000+ teachers",
        "Improved learning outcomes by 30%",
        "Published 35 educational research papers",
      ],
      contact: {
        email: "cer@tuu.university",
        phone: "+252-555-0654",
      },
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Building className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Research Centers
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              State-of-the-art facilities driving innovation and discovery across our global campuses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                Explore Centers
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Visit Our Facilities
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Centers Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { label: "Research Centers", value: "5", icon: Building },
              { label: "Research Staff", value: "115+", icon: Users },
              { label: "Active Projects", value: "69", icon: Microscope },
              { label: "Total Funding", value: "$9.9M", icon: Award },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Centers Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Research Centers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each center represents a hub of innovation, bringing together world-class researchers and cutting-edge
              facilities
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {researchCenters.map((center, index) => (
              <motion.div key={center.id} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-3">
                      {/* Center Header */}
                      <div className={`lg:col-span-1 p-8 bg-gradient-to-br ${center.color} text-white`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-3 bg-white/20 rounded-xl">
                            <center.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{center.name}</h3>
                            <div className="flex items-center space-x-2 mt-2">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{center.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-white/90 mb-6 leading-relaxed">{center.focus}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Director:</span>
                            <span className="font-semibold">{center.director}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Established:</span>
                            <span className="font-semibold">{center.established}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Staff:</span>
                            <span className="font-semibold">{center.staff} researchers</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Projects:</span>
                            <span className="font-semibold">{center.projects} active</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Funding:</span>
                            <span className="font-semibold">{center.funding}</span>
                          </div>
                        </div>

                        <div className="mt-6 space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${center.contact.email}`} className="hover:underline">
                              {center.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>{center.contact.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center Details */}
                      <div className="lg:col-span-2 p-8">
                        <Tabs defaultValue="facilities" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="facilities">Facilities</TabsTrigger>
                            <TabsTrigger value="achievements">Achievements</TabsTrigger>
                          </TabsList>

                          <TabsContent value="facilities" className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Facilities</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {center.facilities.map((facility, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="p-2 bg-purple-100 rounded-lg">
                                    <Building className="h-4 w-4 text-purple-600" />
                                  </div>
                                  <span className="text-gray-700 font-medium">{facility}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="achievements" className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
                            <div className="space-y-3">
                              {center.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                  <div className="p-1 bg-green-100 rounded-full mt-1">
                                    <Award className="h-3 w-3 text-green-600" />
                                  </div>
                                  <span className="text-gray-700">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Visit Our Research Centers</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Schedule a visit to see our world-class facilities and meet our research teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about/contact">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                  Schedule a Visit
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/research/partnerships">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Research Partnerships
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
