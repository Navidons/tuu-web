"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Microscope,
  BookOpen,
  Users,
  TrendingUp,
  Globe,
  Lightbulb,
  Target,
  ArrowRight,
  ExternalLink,
  Calendar,
  DollarSign,
  FileText,
  Building,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

export default function ResearchPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const researchAreas = [
    {
      title: "Sustainable Development",
      description: "Advancing solutions for environmental and social challenges across Africa",
      icon: Globe,
      projects: 15,
      funding: "$2.3M",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Healthcare Innovation",
      description: "Developing accessible healthcare technologies for underserved communities",
      icon: Microscope,
      projects: 12,
      funding: "$1.8M",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Educational Technology",
      description: "Creating digital learning solutions for African educational systems",
      icon: BookOpen,
      projects: 8,
      funding: "$1.2M",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Economic Development",
      description: "Research on entrepreneurship and economic growth in emerging markets",
      icon: TrendingUp,
      projects: 10,
      funding: "$1.5M",
      color: "from-orange-500 to-red-600",
    },
  ]

  const researchHighlights = [
    {
      title: "Research Centers",
      description: "State-of-the-art facilities across our global campuses",
      icon: Building,
      link: "/research/centers",
      stats: "5 Centers",
    },
    {
      title: "Publications",
      description: "Peer-reviewed research and academic contributions",
      icon: FileText,
      link: "/research/publications",
      stats: "200+ Papers",
    },
    {
      title: "Partnerships",
      description: "Collaborations with leading institutions worldwide",
      icon: Users,
      link: "/research/partnerships",
      stats: "50+ Partners",
    },
    {
      title: "Research Support",
      description: "Funding opportunities and resources for researchers",
      icon: DollarSign,
      link: "/research/support",
      stats: "$5M+ Funding",
    },
  ]

  const featuredProjects = [
    {
      title: "Clean Water Initiative",
      description: "Developing low-cost water purification systems for rural communities",
      category: "Sustainable Development",
      status: "Active",
      duration: "2023-2025",
      funding: "$450K",
      team: "Dr. Sarah Johnson, Dr. Michael Chen",
      impact: "Serving 10,000+ people",
    },
    {
      title: "Mobile Health Platform",
      description: "Telemedicine solutions for remote healthcare delivery",
      category: "Healthcare Innovation",
      status: "Active",
      duration: "2024-2026",
      funding: "$380K",
      team: "Dr. Amina Hassan, Dr. Robert Kim",
      impact: "5 pilot communities",
    },
    {
      title: "Digital Literacy Program",
      description: "AI-powered educational tools for primary education",
      category: "Educational Technology",
      status: "Planning",
      duration: "2024-2027",
      funding: "$520K",
      team: "Dr. Grace Okafor, Dr. James Wilson",
      impact: "50 schools targeted",
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
              <Lightbulb className="h-16 w-16 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Research & Innovation
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Advancing knowledge and creating solutions for Africa's most pressing challenges through cutting-edge
              research and global collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                Explore Research Areas
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Publications
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Active Projects", value: "45+", icon: Target },
              { label: "Research Funding", value: "$5.8M", icon: DollarSign },
              { label: "Publications", value: "200+", icon: FileText },
              { label: "Global Partners", value: "50+", icon: Globe },
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

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Research Focus Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our research spans multiple disciplines, addressing critical challenges and opportunities across Africa
              and beyond
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {researchAreas.map((area, index) => (
              <motion.div key={area.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${area.color}`}>
                        <area.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{area.title}</CardTitle>
                        <div className="flex space-x-4 mt-2">
                          <Badge variant="secondary">{area.projects} Projects</Badge>
                          <Badge variant="outline">{area.funding} Funding</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Research Infrastructure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive research ecosystem designed to support innovation and discovery
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {researchHighlights.map((highlight, index) => (
              <motion.div key={highlight.title} variants={itemVariants}>
                <Link href={highlight.link}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                          <highlight.icon className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                        {highlight.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{highlight.description}</CardDescription>
                      <div className="mt-4">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          {highlight.stats}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Research Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our current flagship research initiatives making real-world impact
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                            {project.category}
                          </Badge>
                          <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">{project.description}</p>
                        <div className="text-sm text-gray-500">
                          <p className="mb-1">
                            <strong>Research Team:</strong> {project.team}
                          </p>
                          <p>
                            <strong>Impact:</strong> {project.impact}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-700">Duration</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{project.duration}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Funding</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{project.funding}</p>
                        </div>
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
            <h2 className="text-4xl font-bold mb-6">Join Our Research Community</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Whether you're a researcher, student, or industry partner, discover opportunities to collaborate and
              contribute to meaningful research
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/research/support">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                  Research Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/research/partnerships">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Partner With Us
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
