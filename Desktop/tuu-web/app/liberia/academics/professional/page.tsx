"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  BookOpen,
  Users,
  Clock,
  Award,
  ChevronRight,
  Search,
  Filter,
  Star,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  ArrowRight,
  Building,
  Calculator,
  Brain,
  TrendingUp,
  Target,
  Zap,
  Trophy,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

// Enhanced Liberian flag component
const LiberianFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}>
      <div className="h-full w-full liberian-flag-gradient"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <Star className="h-2 w-2 text-white fill-white" />
      </div>
    </div>
  )
}

// Breadcrumb component
const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/academics" className="hover:text-blue-600 transition-colors">
        Academics
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">Professional Development</span>
    </nav>
  )
}

export default function ProfessionalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const programs = [
    {
      id: "executive-leadership",
      title: "Executive Leadership Certificate",
      category: "leadership",
      duration: "6 Months",
      format: "Weekend Classes",
      tuition: "$1,800",
      icon: Trophy,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Intensive leadership development program for senior executives and managers in Liberia's public and private sectors, focusing on strategic thinking, decision-making, and organizational transformation.",
      highlights: [
        "Strategic Leadership Skills",
        "Executive Coaching Sessions",
        "Case Study Analysis",
        "Peer Learning Network",
        "Capstone Leadership Project",
      ],
      curriculum: [
        "Strategic Leadership & Vision",
        "Change Management",
        "Executive Decision Making",
        "Team Building & Motivation",
        "Crisis Leadership",
        "Ethical Leadership",
      ],
      outcomes: [
        "Enhanced Leadership Capabilities",
        "Strategic Thinking Skills",
        "Improved Team Performance",
        "Better Decision-Making",
        "Increased Executive Presence",
        "Professional Network Expansion",
      ],
      requirements: {
        experience: "5+ years in management or leadership role",
        education: "Bachelor's degree or equivalent professional experience",
        commitment: "Weekend attendance and project completion",
      },
      schedule: "Saturdays 9 AM - 5 PM",
      nextStart: "March 2024",
    },
    {
      id: "digital-transformation",
      title: "Digital Transformation for Business",
      category: "technology",
      duration: "4 Months",
      format: "Evening Classes",
      tuition: "$1,200",
      icon: Zap,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Comprehensive program designed to help business leaders understand and implement digital transformation strategies in their organizations, with focus on Liberian market dynamics.",
      highlights: [
        "Digital Strategy Development",
        "Technology Implementation",
        "Data-Driven Decision Making",
        "Digital Marketing Strategies",
        "Cybersecurity Awareness",
      ],
      curriculum: [
        "Digital Strategy & Planning",
        "Cloud Computing Basics",
        "Data Analytics for Business",
        "Digital Marketing & E-commerce",
        "Cybersecurity Fundamentals",
        "Implementation Project",
      ],
      outcomes: [
        "Digital Strategy Skills",
        "Technology Literacy",
        "Data Analysis Capabilities",
        "Digital Marketing Knowledge",
        "Cybersecurity Awareness",
        "Implementation Experience",
      ],
      requirements: {
        experience: "2+ years in business or management",
        education: "High school diploma minimum",
        commitment: "Evening classes and practical projects",
      },
      schedule: "Tuesdays & Thursdays 6 PM - 9 PM",
      nextStart: "February 2024",
    },
    {
      id: "project-management",
      title: "Project Management Professional (PMP) Prep",
      category: "management",
      duration: "3 Months",
      format: "Hybrid Learning",
      tuition: "$1,500",
      icon: Target,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Intensive preparation course for the Project Management Professional (PMP) certification, covering all knowledge areas and process groups with practical application in Liberian context.",
      highlights: [
        "PMP Exam Preparation",
        "Project Management Framework",
        "Risk Management Strategies",
        "Stakeholder Engagement",
        "Practice Exams & Simulations",
      ],
      curriculum: [
        "Project Integration Management",
        "Scope, Time & Cost Management",
        "Quality & Resource Management",
        "Communications Management",
        "Risk & Procurement Management",
        "Stakeholder Management",
      ],
      outcomes: [
        "PMP Certification Readiness",
        "Project Management Skills",
        "Risk Assessment Abilities",
        "Leadership Competencies",
        "Professional Certification",
        "Career Advancement",
      ],
      requirements: {
        experience: "3+ years project management experience",
        education: "Bachelor's degree or equivalent",
        commitment: "Study time and exam preparation",
      },
      schedule: "Flexible online + weekend workshops",
      nextStart: "January 2024",
    },
    {
      id: "financial-management",
      title: "Financial Management for Non-Financial Managers",
      category: "finance",
      duration: "5 Weeks",
      format: "Intensive Workshop",
      tuition: "$800",
      icon: Calculator,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Essential financial management skills for managers and executives who need to understand financial statements, budgeting, and financial decision-making in their roles.",
      highlights: [
        "Financial Statement Analysis",
        "Budgeting & Forecasting",
        "Cost Management",
        "Investment Evaluation",
        "Financial Decision Making",
      ],
      curriculum: [
        "Understanding Financial Statements",
        "Budgeting & Financial Planning",
        "Cost Analysis & Control",
        "Capital Investment Decisions",
        "Financial Performance Metrics",
        "Cash Flow Management",
      ],
      outcomes: [
        "Financial Literacy",
        "Budget Management Skills",
        "Cost Control Abilities",
        "Investment Analysis Skills",
        "Better Business Decisions",
        "Improved Performance",
      ],
      requirements: {
        experience: "Management or supervisory role",
        education: "No specific requirements",
        commitment: "Full attendance required",
      },
      schedule: "Mondays & Wednesdays 6 PM - 9 PM",
      nextStart: "April 2024",
    },
    {
      id: "public-speaking",
      title: "Executive Communication & Public Speaking",
      category: "communication",
      duration: "8 Weeks",
      format: "Interactive Workshops",
      tuition: "$600",
      icon: Lightbulb,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Develop confident public speaking and executive communication skills essential for leadership roles, with emphasis on Liberian cultural context and professional settings.",
      highlights: [
        "Confident Public Speaking",
        "Executive Presentation Skills",
        "Media Interview Training",
        "Cross-Cultural Communication",
        "Personal Brand Development",
      ],
      curriculum: [
        "Overcoming Speaking Anxiety",
        "Structuring Effective Presentations",
        "Voice & Body Language",
        "Audience Engagement Techniques",
        "Media Relations & Interviews",
        "Personal Branding",
      ],
      outcomes: [
        "Confident Public Speaking",
        "Improved Presentation Skills",
        "Better Communication",
        "Enhanced Leadership Presence",
        "Media Readiness",
        "Professional Credibility",
      ],
      requirements: {
        experience: "Professional or leadership role",
        education: "No specific requirements",
        commitment: "Active participation in exercises",
      },
      schedule: "Saturdays 10 AM - 2 PM",
      nextStart: "February 2024",
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship & Small Business Development",
      category: "business",
      duration: "10 Weeks",
      format: "Evening Program",
      tuition: "$1,000",
      icon: Lightbulb,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Comprehensive program for aspiring entrepreneurs and small business owners, covering business planning, financing, marketing, and operations in the Liberian market context.",
      highlights: [
        "Business Plan Development",
        "Funding & Investment Strategies",
        "Marketing & Customer Acquisition",
        "Operations Management",
        "Legal & Regulatory Compliance",
      ],
      curriculum: [
        "Entrepreneurial Mindset",
        "Market Research & Validation",
        "Business Model Development",
        "Financial Planning & Funding",
        "Marketing & Sales Strategies",
        "Legal & Regulatory Framework",
      ],
      outcomes: [
        "Complete Business Plan",
        "Market Analysis Skills",
        "Financial Planning Abilities",
        "Marketing Strategies",
        "Legal Compliance Knowledge",
        "Network of Entrepreneurs",
      ],
      requirements: {
        experience: "Business idea or existing small business",
        education: "High school diploma minimum",
        commitment: "Business plan development",
      },
      schedule: "Mondays & Wednesdays 7 PM - 9 PM",
      nextStart: "March 2024",
    },
  ]

  const categories = [
    { value: "all", label: "All Programs", count: programs.length },
    { value: "leadership", label: "Leadership", count: programs.filter((p) => p.category === "leadership").length },
    { value: "technology", label: "Technology", count: programs.filter((p) => p.category === "technology").length },
    { value: "management", label: "Management", count: programs.filter((p) => p.category === "management").length },
    { value: "finance", label: "Finance", count: programs.filter((p) => p.category === "finance").length },
    {
      value: "communication",
      label: "Communication",
      count: programs.filter((p) => p.category === "communication").length,
    },
    { value: "business", label: "Business", count: programs.filter((p) => p.category === "business").length },
  ]

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb />
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <LiberianFlag className="h-8 w-12" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-bold">
                Professional Excellence
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Professional Development</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Advance your career with our comprehensive professional development programs at Unity University Liberia.
              Designed for working professionals, our certificate programs and workshops provide practical skills and
              knowledge to excel in today's competitive business environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#programs">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Explore Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Schedule Consultation
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: Award, number: "15+", label: "Certificate Programs", sublabel: "Specialized Training" },
              { icon: Users, number: "500+", label: "Professionals Trained", sublabel: "Annual Enrollment" },
              { icon: TrendingUp, number: "92%", label: "Career Advancement", sublabel: "Graduate Success" },
              { icon: Clock, number: "3-10", label: "Weeks Duration", sublabel: "Flexible Timeline" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-800 font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="programs" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Find Your Professional Development Program
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search professional programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                <div className="md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="py-3 text-lg">
                      <Filter className="h-5 w-5 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <AnimatePresence>
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProgram(program.id)}
                >
                  <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl transition-all duration-300 hover:shadow-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-900 font-bold">{program.duration}</Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600/90 text-white font-bold">Professional</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <program.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {program.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {program.format}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {program.tuition}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 text-sm">Key Highlights:</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.highlights.slice(0, 2).map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                          {program.highlights.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{program.highlights.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-800">
                          <strong>Next Start:</strong> {program.nextStart}
                        </div>
                        <div className="text-sm text-blue-700">
                          <strong>Schedule:</strong> {program.schedule}
                        </div>
                      </div>
                    </CardContent>

                    <div className="px-6 pb-6">
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPrograms.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const program = programs.find((p) => p.id === selectedProgram)
                if (!program) return null

                return (
                  <div>
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        onClick={() => setSelectedProgram(null)}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">{program.title}</h2>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.duration}</Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.format}</Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.tuition}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Program Description</h3>
                              <p className="text-gray-600 leading-relaxed">{program.description}</p>
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Highlights</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {program.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span className="text-gray-700">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Schedule</h4>
                                <p className="text-blue-800 text-sm">{program.schedule}</p>
                              </div>
                              <div className="p-4 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Next Start Date</h4>
                                <p className="text-green-800 text-sm">{program.nextStart}</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.curriculum.map((course, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <BookOpen className="h-5 w-5 text-blue-600" />
                                  <span className="text-gray-800 font-medium">{course}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="outcomes" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Outcomes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <Target className="h-5 w-5 text-green-600" />
                                  <span className="text-gray-800 font-medium">{outcome}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                              <h4 className="font-semibold text-yellow-900 mb-2">Professional Impact</h4>
                              <p className="text-yellow-800 text-sm">
                                Graduates of this program typically see immediate application of skills in their current
                                roles, with many reporting promotions or new career opportunities within 6 months of
                                completion.
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="enrollment" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">Enrollment Requirements</h3>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Professional Experience</h4>
                                  <p className="text-gray-600">{program.requirements.experience}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Educational Background</h4>
                                  <p className="text-gray-600">{program.requirements.education}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Commitment</h4>
                                  <p className="text-gray-600">{program.requirements.commitment}</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Enrollment Process</h4>
                              <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                                <li>Submit online application</li>
                                <li>Provide professional references</li>
                                <li>Complete brief interview (if required)</li>
                                <li>Confirm enrollment and payment</li>
                              </ol>
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <Link href="/admissions/apply">
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                  Enroll Now
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href="/about/contact">
                                <Button variant="outline">
                                  Contact Advisor
                                  <Calendar className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why Choose Professional Development */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Invest in Professional Development?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In today's rapidly changing business environment, continuous learning is essential for career success. Our
              professional development programs provide the skills and knowledge you need to stay competitive.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                icon: TrendingUp,
                title: "Career Advancement",
                description: "92% of our graduates report career advancement within 12 months of program completion.",
              },
              {
                icon: Brain,
                title: "Practical Skills",
                description: "Learn immediately applicable skills that you can implement in your current role.",
              },
              {
                icon: Users,
                title: "Professional Network",
                description: "Connect with like-minded professionals and expand your professional network.",
              },
              {
                icon: Clock,
                title: "Flexible Learning",
                description: "Evening and weekend programs designed for working professionals with busy schedules.",
              },
              {
                icon: Award,
                title: "Industry Recognition",
                description:
                  "Earn certificates and credentials recognized by employers across Liberia and West Africa.",
              },
              {
                icon: Target,
                title: "Focused Content",
                description: "Curriculum designed specifically for the Liberian business environment and market needs.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Corporate Training Solutions</h2>
            <p className="text-lg text-gray-600 mb-8">
              Looking to upskill your entire team? We offer customized corporate training programs tailored to your
              organization's specific needs and delivered at your location or our campus.
            </p>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: Building,
                  title: "On-Site Training",
                  description:
                    "We bring our expert instructors to your workplace for convenient, focused training sessions.",
                },
                {
                  icon: Users,
                  title: "Team Building",
                  description:
                    "Strengthen team dynamics while developing professional skills through collaborative learning.",
                },
                {
                  icon: Target,
                  title: "Customized Content",
                  description: "Programs tailored to your industry, company culture, and specific business challenges.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about/contact">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-bold">
                    Request Corporate Training
                    <Building className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-bold border-2 bg-transparent">
                  Download Brochure
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <LiberianFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't let your career stagnate. Invest in yourself with professional development programs that deliver
              real results. Join hundreds of professionals who have advanced their careers with Unity University
              Liberia.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Enroll in a Program
                    <Trophy className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Speak with an Advisor
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
