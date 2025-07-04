"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Award,
  ChevronRight,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Heart,
  Briefcase,
  Code,
  Stethoscope,
  Calculator,
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
      <span className="text-gray-900 font-medium">Undergraduate Programs</span>
    </nav>
  )
}

export default function UndergraduatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const programs = [
    {
      id: "business-admin",
      title: "Bachelor of Business Administration (BBA)",
      category: "business",
      duration: "4 Years",
      credits: "120 Credits",
      tuition: "$2,400/year",
      icon: Briefcase,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Comprehensive business education preparing students for leadership roles in Liberia's growing economy and international markets.",
      highlights: [
        "Entrepreneurship & Innovation Focus",
        "Industry Partnerships & Internships",
        "Real-world Case Studies",
        "Leadership Development Program",
      ],
      curriculum: [
        "Business Fundamentals",
        "Financial Management",
        "Marketing Strategy",
        "Operations Management",
        "International Business",
        "Business Ethics & Law",
      ],
      careers: [
        "Business Manager",
        "Entrepreneur",
        "Financial Analyst",
        "Marketing Specialist",
        "Operations Coordinator",
        "Business Consultant",
      ],
      requirements: {
        academic: "High School Diploma with minimum 2.5 GPA",
        english: "TOEFL 80+ or IELTS 6.0+ (for international students)",
        additional: "Personal statement and two recommendation letters",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "computer-science",
      title: "Bachelor of Science in Computer Science (BSc CS)",
      category: "technology",
      duration: "4 Years",
      credits: "128 Credits",
      tuition: "$2,600/year",
      icon: Code,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Cutting-edge computer science program designed to meet Liberia's digital transformation needs and global technology demands.",
      highlights: [
        "Modern Programming Languages",
        "AI & Machine Learning",
        "Software Development Projects",
        "Industry Certifications",
      ],
      curriculum: [
        "Programming Fundamentals",
        "Data Structures & Algorithms",
        "Database Systems",
        "Web Development",
        "Mobile App Development",
        "Cybersecurity Basics",
      ],
      careers: [
        "Software Developer",
        "Systems Analyst",
        "Database Administrator",
        "Web Developer",
        "IT Consultant",
        "Cybersecurity Specialist",
      ],
      requirements: {
        academic: "High School Diploma with strong mathematics background",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Basic computer literacy and logical reasoning test",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "public-health",
      title: "Bachelor of Science in Public Health (BSc PH)",
      category: "health",
      duration: "4 Years",
      credits: "124 Credits",
      tuition: "$2,800/year",
      icon: Stethoscope,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Comprehensive public health program focusing on community health, disease prevention, and health promotion in Liberian communities.",
      highlights: [
        "Community Health Focus",
        "Epidemiology & Biostatistics",
        "Field Experience Programs",
        "Global Health Perspectives",
      ],
      curriculum: [
        "Health Promotion",
        "Epidemiology",
        "Biostatistics",
        "Environmental Health",
        "Health Policy & Management",
        "Community Health Assessment",
      ],
      careers: [
        "Public Health Officer",
        "Health Educator",
        "Epidemiologist",
        "Community Health Worker",
        "Health Program Coordinator",
        "NGO Health Specialist",
      ],
      requirements: {
        academic: "High School Diploma with science background preferred",
        english: "TOEFL 80+ or IELTS 6.0+ (for international students)",
        additional: "Commitment to community service and health advocacy",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "accounting",
      title: "Bachelor of Science in Accounting (BSc Accounting)",
      category: "business",
      duration: "4 Years",
      credits: "120 Credits",
      tuition: "$2,400/year",
      icon: Calculator,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Professional accounting program preparing students for careers in financial management, auditing, and business advisory services.",
      highlights: [
        "CPA Exam Preparation",
        "Financial Analysis Skills",
        "Audit & Assurance Training",
        "Tax Planning & Compliance",
      ],
      curriculum: [
        "Financial Accounting",
        "Management Accounting",
        "Auditing Principles",
        "Taxation",
        "Financial Analysis",
        "Business Law",
      ],
      careers: [
        "Certified Public Accountant",
        "Financial Analyst",
        "Auditor",
        "Tax Consultant",
        "Budget Analyst",
        "Financial Controller",
      ],
      requirements: {
        academic: "High School Diploma with strong mathematics skills",
        english: "TOEFL 80+ or IELTS 6.0+ (for international students)",
        additional: "Analytical thinking and attention to detail",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "civil-engineering",
      title: "Bachelor of Science in Civil Engineering (BSc CE)",
      category: "engineering",
      duration: "5 Years",
      credits: "160 Credits",
      tuition: "$3,200/year",
      icon: Building,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Comprehensive civil engineering program focusing on infrastructure development and sustainable construction practices for Liberia's growth.",
      highlights: [
        "Infrastructure Development Focus",
        "Sustainable Design Principles",
        "Hands-on Laboratory Experience",
        "Professional Engineering Preparation",
      ],
      curriculum: [
        "Engineering Mathematics",
        "Structural Analysis",
        "Geotechnical Engineering",
        "Transportation Engineering",
        "Water Resources Engineering",
        "Construction Management",
      ],
      careers: [
        "Civil Engineer",
        "Structural Engineer",
        "Construction Manager",
        "Project Engineer",
        "Infrastructure Planner",
        "Environmental Engineer",
      ],
      requirements: {
        academic: "High School Diploma with excellent mathematics and physics",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Strong analytical and problem-solving skills",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "mass-communication",
      title: "Bachelor of Arts in Mass Communication (BA MC)",
      category: "arts",
      duration: "4 Years",
      credits: "120 Credits",
      tuition: "$2,200/year",
      icon: Globe,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Dynamic mass communication program preparing students for careers in journalism, broadcasting, and digital media in Liberia and beyond.",
      highlights: [
        "Digital Media Production",
        "Broadcast Journalism",
        "Public Relations Training",
        "Media Ethics & Law",
      ],
      curriculum: [
        "Media Writing",
        "Broadcast Production",
        "Digital Journalism",
        "Public Relations",
        "Media Law & Ethics",
        "Communication Research",
      ],
      careers: [
        "Journalist",
        "News Anchor",
        "Public Relations Officer",
        "Media Producer",
        "Content Creator",
        "Communications Specialist",
      ],
      requirements: {
        academic: "High School Diploma with good English language skills",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Portfolio of writing samples or media work",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
  ]

  const categories = [
    { value: "all", label: "All Programs", count: programs.length },
    { value: "business", label: "Business", count: programs.filter((p) => p.category === "business").length },
    { value: "technology", label: "Technology", count: programs.filter((p) => p.category === "technology").length },
    { value: "health", label: "Health Sciences", count: programs.filter((p) => p.category === "health").length },
    { value: "engineering", label: "Engineering", count: programs.filter((p) => p.category === "engineering").length },
    { value: "arts", label: "Arts & Humanities", count: programs.filter((p) => p.category === "arts").length },
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
                Undergraduate Excellence
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Undergraduate Programs</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Launch your career with world-class undergraduate education at Unity University Liberia. Our comprehensive
              programs combine academic excellence with practical experience, preparing you for success in Liberia's
              growing economy and the global marketplace.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/financial-aid">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Financial Aid
                    <DollarSign className="ml-2 h-5 w-5" />
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
              { icon: BookOpen, number: "15+", label: "Degree Programs", sublabel: "Diverse Options" },
              { icon: Users, number: "2,800+", label: "Students Enrolled", sublabel: "Active Learners" },
              { icon: Award, number: "95%", label: "Employment Rate", sublabel: "Graduate Success" },
              { icon: Clock, number: "4-5", label: "Years Duration", sublabel: "Flexible Timeline" },
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect Program</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search programs..."
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
                          {program.credits}
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
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.credits}</Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.tuition}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                          <TabsTrigger value="careers">Careers</TabsTrigger>
                          <TabsTrigger value="admission">Admission</TabsTrigger>
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

                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Accreditation</h3>
                              <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{program.accreditation}</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Core Curriculum</h3>
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

                        <TabsContent value="careers" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Career Opportunities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.careers.map((career, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <Briefcase className="h-5 w-5 text-green-600" />
                                  <span className="text-gray-800 font-medium">{career}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="admission" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">Admission Requirements</h3>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Academic Requirements</h4>
                                  <p className="text-gray-600">{program.requirements.academic}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">English Proficiency</h4>
                                  <p className="text-gray-600">{program.requirements.english}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Additional Requirements</h4>
                                  <p className="text-gray-600">{program.requirements.additional}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <Link href="/admissions/apply">
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                  Apply Now
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href="/admissions/financial-aid">
                                <Button variant="outline">
                                  Financial Aid
                                  <DollarSign className="ml-2 h-4 w-4" />
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

      {/* Why Choose Unity University */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Unity University Liberia?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience world-class education with a distinctly Liberian perspective, preparing you for success in both
              local and global markets.
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
                icon: Award,
                title: "Academic Excellence",
                description:
                  "Rigorous academic programs designed to meet international standards while addressing local needs.",
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Learn from experienced professors and industry professionals committed to your success.",
              },
              {
                icon: Globe,
                title: "Global Perspective",
                description: "Gain international exposure while staying rooted in Liberian values and culture.",
              },
              {
                icon: Briefcase,
                title: "Career Readiness",
                description: "Graduate with practical skills and industry connections for immediate career success.",
              },
              {
                icon: Heart,
                title: "Community Impact",
                description: "Develop leadership skills to make a positive impact in Liberian communities.",
              },
              {
                icon: Building,
                title: "Modern Facilities",
                description: "State-of-the-art classrooms, labs, and technology to enhance your learning experience.",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful graduates who started their careers at Unity University Liberia. Your future
              begins here, where "The Love of Liberty Brought Us Here."
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for 2024 Admission
                    <GraduationCap className="ml-2 h-5 w-5" />
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
                    Schedule Campus Visit
                    <MapPin className="ml-2 h-5 w-5" />
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
