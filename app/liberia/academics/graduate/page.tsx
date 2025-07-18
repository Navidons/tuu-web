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
  Calendar,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
  Briefcase,
  Code,
  Stethoscope,
  Calculator,
  Microscope,
  Brain,
  TrendingUp,
  Shield,
  Heart,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { useInView } from "react-intersection-observer"

const LiberiaFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-md shadow-lg border border-white/30 animate-flag-wave")}>
      {/* Stripes */}
      <div className="liberian-flag-gradient w-full h-full" />

      {/* Blue canton with white star */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[12px] h-[12px] text-white fill-current drop-shadow-sm"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
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
      <span className="text-gray-900 font-medium">Graduate Programs</span>
    </nav>
  )
}

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [ref, isInView] = useInView({
    triggerOnce: true,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [mounted, isInView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Program Card component for reusability
const ProgramCard = ({ program, onClick }: { program: any; onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl transition-all duration-300 hover:shadow-2xl">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={program.image || "/placeholder.svg"}
            alt={program.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-gray-900 font-bold">{program.duration}</Badge>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-600/90 text-white font-bold">Graduate</Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            {program.icon ? (
              <program.icon className="h-8 w-8 text-white" />
            ) : (
              <GraduationCap className="h-8 w-8 text-white" />
            )}
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {program.name}
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {program.credits}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Key Highlights:</h4>
            <div className="flex flex-wrap gap-1">
              {program.specializations.slice(0, 2).map((highlight: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {program.specializations.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{program.specializations.length - 2} more
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
  )
}

export default function GraduatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setIsClient(true)
    setMounted(true)
  }, [])

  const programs = [
    {
      name: "Master of Business Administration (MBA)",
      school: "Business & Management",
      duration: "2 years",
      credits: 60,
      format: "Full-time / Part-time",
      description: "Executive business education preparing senior leaders for Liberia's private and public sectors",
      specializations: ["Strategic Management", "Finance", "Marketing", "Operations", "International Business"],
      careers: ["CEO", "VP Operations", "Management Consultant", "Investment Manager"],
      requirements: ["Bachelor's degree", "3+ years work experience", "Letters of recommendation"],
      image: "/courses/business-class.jpg",
      accreditation: "AACSB International Accredited",
      curriculum: ["Strategic Management", "Financial Management", "Marketing Strategy", "Operations Management", "Leadership Development", "International Business"],
      researchAreas: ["Strategic Management", "Organizational Leadership", "Financial Markets", "Marketing Innovation"],
      icon: Briefcase,
    },
    {
      name: "Master of Human Resources Management",
      school: "Business & Management",
      duration: "2 years",
      credits: 48,
      format: "Full-time / Part-time",
      description: "Advanced HR management for senior leadership positions in Liberian businesses and organizations",
      specializations: ["HR Strategy", "Talent Management", "Organizational Development", "Employment Law"],
      careers: ["HR Director", "Talent Manager", "Organizational Consultant", "Training Manager"],
      requirements: ["Bachelor's degree", "HR experience preferred", "Letters of recommendation"],
      image: "/courses/human-resources.jpg",
      accreditation: "CIPD Recognized",
      curriculum: ["HR Strategy", "Talent Management", "Organizational Development", "Employment Law", "Performance Management", "Leadership Development"],
      researchAreas: ["HR Strategy", "Talent Management", "Organizational Behavior", "Employment Relations"],
      icon: Users,
    },
    {
      name: "Master of Accounting and Finance",
      school: "Business & Management",
      duration: "2 years",
      credits: 48,
      format: "Full-time",
      description: "Advanced accounting and finance education for senior financial management and consulting roles",
      specializations: ["Financial Accounting", "Management Accounting", "Auditing", "Tax Planning"],
      careers: ["Finance Director", "Chief Financial Officer", "Senior Accountant", "Financial Analyst"],
      requirements: ["Bachelor's degree in related field", "Accounting experience preferred", "Letters of recommendation"],
      image: "/courses/accounts.jpg",
      accreditation: "ACCA Recognized",
      curriculum: ["Financial Accounting", "Management Accounting", "Auditing", "Tax Planning", "Financial Analysis", "Corporate Finance"],
      researchAreas: ["Financial Accounting", "Management Accounting", "Auditing", "Financial Analysis"],
      icon: Calculator,
    },
    {
      name: "Master of Marketing Management",
      school: "Business & Management",
      duration: "2 years",
      credits: 48,
      format: "Full-time / Part-time",
      description: "Advanced marketing for senior marketing roles in Liberian businesses and regional markets",
      specializations: ["Digital Marketing", "Brand Management", "Consumer Behavior", "Market Research"],
      careers: ["Marketing Director", "Brand Manager", "Digital Marketing Manager", "Market Research Analyst"],
      requirements: ["Bachelor's degree", "Marketing experience preferred", "Letters of recommendation"],
      image: "/courses/business-class.jpg",
      accreditation: "CIM Recognized",
      curriculum: ["Digital Marketing", "Brand Management", "Consumer Behavior", "Market Research", "Marketing Strategy", "Marketing Analytics"],
      researchAreas: ["Digital Marketing", "Brand Management", "Consumer Behavior", "Marketing Innovation"],
      icon: TrendingUp,
    },
    {
      name: "Master of Project Planning and Management",
      school: "Business & Management",
      duration: "2 years",
      credits: 48,
      format: "Full-time / Part-time",
      description: "Advanced project management for leading major development and infrastructure projects in Liberia",
      specializations: ["Project Management", "Program Management", "Risk Management", "Quality Management"],
      careers: ["Project Director", "Program Manager", "PMO Lead", "Operations Manager"],
      requirements: ["Bachelor's degree", "Project management experience", "Letters of recommendation"],
      image: "/courses/business-class.jpg",
      accreditation: "PMI Recognized",
      curriculum: ["Project Management", "Program Management", "Risk Management", "Quality Management", "Project Leadership", "Project Finance"],
      researchAreas: ["Project Management", "Program Management", "Risk Management", "Quality Management"],
      icon: Building,
    },
    {
      name: "Master of Procurement, Logistics and Supply Chain Management",
      school: "Business & Management",
      duration: "2 years",
      credits: 48,
      format: "Full-time",
      description: "Advanced supply chain management for senior logistics and procurement positions in Liberian economy",
      specializations: ["Supply Chain Strategy", "Procurement", "Logistics", "Operations Management"],
      careers: ["Supply Chain Director", "Procurement Manager", "Logistics Manager", "Operations Director"],
      requirements: ["Bachelor's degree", "Supply chain experience preferred", "Letters of recommendation"],
      image: "/courses/business-class.jpg",
      accreditation: "CIPS Recognized",
      curriculum: ["Supply Chain Strategy", "Procurement", "Logistics", "Operations Management", "Supply Chain Finance", "Global Sourcing"],
      researchAreas: ["Supply Chain Strategy", "Procurement", "Logistics", "Operations Management"],
      icon: Globe,
    },
    {
      name: "Master of Public Health (MPH)",
      school: "Allied Health Sciences",
      duration: "2 years",
      credits: 48,
      format: "Full-time / Part-time",
      description: "Advanced public health training for senior health leadership and policy positions in Liberia",
      specializations: ["Epidemiology", "Health Policy", "Global Health", "Environmental Health"],
      careers: ["Public Health Director", "Epidemiologist", "Health Policy Analyst", "WHO Officer"],
      requirements: ["Bachelor's degree", "Healthcare experience preferred", "Statement of purpose"],
      image: "/courses/health-sciences.jpg",
      accreditation: "CEPH Accredited",
      curriculum: ["Epidemiology", "Health Policy", "Global Health", "Environmental Health", "Biostatistics", "Health Economics"],
      researchAreas: ["Epidemiology", "Health Policy", "Global Health", "Environmental Health"],
      icon: Heart,
    },
    {
      name: "Master of Nutrition and Food Science",
      school: "Allied Health Sciences",
      duration: "2 years",
      credits: 48,
      format: "Full-time",
      description: "Advanced nutrition science for addressing food security and nutrition challenges in Liberia",
      specializations: ["Clinical Nutrition", "Community Nutrition", "Food Safety", "Nutritional Science"],
      careers: ["Clinical Nutritionist", "Public Health Nutritionist", "Food Safety Manager", "Research Scientist"],
      requirements: ["Bachelor's degree in related field", "Nutrition background preferred", "Statement of purpose"],
      image: "/courses/food-nutrition.png",
      accreditation: "CDR Recognized",
      curriculum: ["Clinical Nutrition", "Community Nutrition", "Food Safety", "Nutritional Science", "Nutrition Research", "Food Policy"],
      researchAreas: ["Clinical Nutrition", "Community Nutrition", "Food Safety", "Nutritional Science"],
      icon: Stethoscope,
    },
    {
      name: "Master of Arts in International Relations and Diplomatic Studies",
      school: "Social Sciences",
      duration: "2 years",
      credits: 48,
      format: "Full-time",
      description: "Advanced study preparing diplomatic corps and international relations experts for Liberia's global engagement",
      specializations: ["Diplomacy", "International Security", "Development Studies", "Regional Studies"],
      careers: ["Diplomat", "International Analyst", "NGO Director", "Policy Advisor"],
      requirements: ["Bachelor's degree", "Language proficiency", "Research proposal"],
      image: "/courses/international-relations.jpg",
      accreditation: "Diplomatically Recognized",
      curriculum: ["Diplomacy", "International Security", "Development Studies", "Regional Studies", "International Law", "Global Governance"],
      researchAreas: ["Diplomacy", "International Security", "Development Studies", "Regional Studies"],
      icon: Globe,
    },
    {
      name: "Master of Arts in Public Administration and Management",
      school: "Social Sciences",
      duration: "2 years",
      credits: 48,
      format: "Full-time / Part-time",
      description: "Advanced public administration training for senior government positions and public sector leadership",
      specializations: ["Public Policy", "Governance", "Public Finance", "Administrative Leadership"],
      careers: ["Government Official", "Public Policy Analyst", "Civil Service Manager", "NGO Administrator"],
      requirements: ["Bachelor's degree", "Public sector experience preferred", "Statement of purpose"],
      image: "/courses/leadership-skills.jpg",
      accreditation: "NASPAA Recognized",
      curriculum: ["Public Policy", "Governance", "Public Finance", "Administrative Leadership", "Public Ethics", "Policy Analysis"],
      researchAreas: ["Public Policy", "Governance", "Public Finance", "Administrative Leadership"],
      icon: Shield,
    },
    {
      name: "Master of Arts in Development Studies",
      school: "Social Sciences",
      duration: "2 years",
      credits: 48,
      format: "Full-time",
      description: "Comprehensive development studies focusing on sustainable development strategies for Liberia and West Africa",
      specializations: ["International Development", "Community Development", "Development Policy", "Social Research"],
      careers: ["Development Officer", "Program Manager", "Research Analyst", "Policy Consultant"],
      requirements: ["Bachelor's degree", "Development experience preferred", "Research proposal"],
      image: "/research/research-students.jpg",
      accreditation: "DSA Recognized",
      curriculum: ["International Development", "Community Development", "Development Policy", "Social Research", "Development Economics", "Sustainable Development"],
      researchAreas: ["International Development", "Community Development", "Development Policy", "Social Research"],
      icon: TrendingUp,
    },
    {
      name: "Master of Science in Information Technology",
      school: "Computing & IT",
      duration: "2 years",
      credits: 54,
      format: "Full-time",
      description: "Advanced IT education for senior technology leadership in Liberia's digital transformation initiatives",
      specializations: ["Cybersecurity", "Data Science", "Cloud Computing", "IT Management"],
      careers: ["IT Director", "Cybersecurity Specialist", "Data Scientist", "Systems Architect"],
      requirements: ["Bachelor's degree in IT/related field", "Programming experience", "Technical portfolio"],
      image: "/courses/technology.jpg",
      accreditation: "ABET Accredited",
      curriculum: ["Cybersecurity", "Data Science", "Cloud Computing", "IT Management", "Software Engineering", "Database Management"],
      researchAreas: ["Cybersecurity", "Data Science", "Cloud Computing", "IT Management"],
      icon: Code,
    },
  ]

  const categories = [
    { value: "all", label: "All Programs", count: programs.length },
    { value: "business", label: "Business & Management", count: 6 },
    { value: "health", label: "Allied Health Sciences", count: 2 },
    { value: "social", label: "Social Sciences", count: 3 },
    { value: "technology", label: "Computing & IT", count: 1 },
  ]

  const getCategoryFromSchool = (school: string) => {
    switch (school) {
      case "Business & Management":
        return "business"
      case "Allied Health Sciences":
        return "health"
      case "Social Sciences":
        return "social"
      case "Computing & IT":
        return "technology"
      default:
        return "all"
    }
  }

  const filteredPrograms = programs.filter((program: any) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || getCategoryFromSchool(program.school) === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const features = [
    {
      title: "Research Excellence",
      description: "Access to cutting-edge research facilities and renowned faculty mentors in Monrovia",
      icon: Microscope,
      stat: "8 Research Centers",
    },
    {
      title: "Small Cohorts",
      description: "Intimate learning environment with personalized attention from expert faculty",
      icon: Users,
      stat: "15:1 Ratio",
    },
    {
      title: "Industry Partnerships",
      description: "Collaboration with leading Liberian organizations and international institutions",
      icon: Award,
      stat: "25+ Partners",
    },
    {
      title: "Career Advancement",
      description: "High placement rates in leadership positions across Liberia's economy",
      icon: Star,
      stat: "94% Success Rate",
    },
  ]

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
        <div className="absolute inset-0">
          <Image
            src="/graduation/master-of-education-and-planning.jpg"
            alt="Graduate Excellence at Unity University Liberia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
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
              <LiberiaFlag className="h-8 w-12" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-bold">
                Advanced Graduate Education
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Graduate Programs</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Advance your career with our world-class graduate programs at The Unity University Liberia. Designed for
              working professionals and recent graduates, our master's programs combine rigorous academics with
              practical application, preparing you for leadership roles in your field.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for Graduate School
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/research">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Research Opportunities
                    <Microscope className="ml-2 h-5 w-5" />
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
              { icon: GraduationCap, number: "12", label: "Master's Programs", sublabel: "Specialized Degrees" },
              { icon: Users, number: "300+", label: "Graduate Students", sublabel: "Advanced Learners" },
              { icon: Brain, number: "95%", label: "Career Advancement", sublabel: "Graduate Success" },
              { icon: Clock, number: "24", label: "Months Duration", sublabel: "Standard Program" },
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
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Graduate Program</h2>
              
              {/* Search Input */}
              <div className="flex justify-center mb-8">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search graduate programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
              </div>

              {/* Tabs for Program Categories */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <span>All Programs</span>
                    <Badge variant="secondary" className="text-xs">12</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="business" className="flex items-center gap-2">
                    <span>Business</span>
                    <Badge variant="secondary" className="text-xs">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="health" className="flex items-center gap-2">
                    <span>Health</span>
                    <Badge variant="secondary" className="text-xs">2</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <span>Social Sciences</span>
                    <Badge variant="secondary" className="text-xs">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="technology" className="flex items-center gap-2">
                    <span>Technology</span>
                    <Badge variant="secondary" className="text-xs">1</Badge>
                  </TabsTrigger>
                </TabsList>

                {/* All Programs Tab */}
                <TabsContent value="all">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      program.description.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((program, index) => (
                      <ProgramCard key={program.name} program={program} onClick={() => setSelectedProgram(program.name)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Business Programs Tab */}
                <TabsContent value="business">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.school === "Business & Management" &&
                      (program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program, index) => (
                      <ProgramCard key={program.name} program={program} onClick={() => setSelectedProgram(program.name)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Health Programs Tab */}
                <TabsContent value="health">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.school === "Allied Health Sciences" &&
                      (program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program, index) => (
                      <ProgramCard key={program.name} program={program} onClick={() => setSelectedProgram(program.name)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Social Sciences Programs Tab */}
                <TabsContent value="social">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.school === "Social Sciences" &&
                      (program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program, index) => (
                      <ProgramCard key={program.name} program={program} onClick={() => setSelectedProgram(program.name)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Technology Programs Tab */}
                <TabsContent value="technology">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.school === "Computing & IT" &&
                      (program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program, index) => (
                      <ProgramCard key={program.name} program={program} onClick={() => setSelectedProgram(program.name)} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
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
                const program = programs.find((p) => p.name === selectedProgram)
                if (!program) return null

                return (
                  <div>
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.name}
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
                        <h2 className="text-3xl font-bold mb-2">{program.name}</h2>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.duration}</Badge>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white">{program.credits}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                          <TabsTrigger value="research">Research</TabsTrigger>
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
                                {program.specializations.map((highlight, idx) => (
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
                              {program.curriculum?.map((course: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <BookOpen className="h-5 w-5 text-blue-600" />
                                  <span className="text-gray-800 font-medium">{course}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="research" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Research Areas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.researchAreas?.map((area: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <Microscope className="h-5 w-5 text-purple-600" />
                                  <span className="text-gray-800 font-medium">{area}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-900 mb-2">Research Opportunities</h4>
                              <p className="text-blue-800 text-sm">
                                Graduate students have access to cutting-edge research facilities and work closely with
                                faculty on projects that address real-world challenges in Liberia and West Africa.
                              </p>
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
                            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-green-900 mb-2">Career Support</h4>
                              <p className="text-green-800 text-sm">
                                Our Career Services team provides personalized career counseling, networking
                                opportunities, and job placement assistance to help you achieve your professional goals.
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="admission" className="mt-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">Admission Requirements</h3>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                                  <div className="space-y-2">
                                    {program.requirements.map((req: string, idx: number) => (
                                      <div key={idx} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-600">{req}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                  Apply Now
                                  <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Graduate School Advantages */}
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
              Why Choose Graduate School at The Unity University?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our graduate programs are designed for ambitious professionals ready to take their careers to the next
              level with advanced knowledge, research skills, and leadership capabilities.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
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
              <LiberiaFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the next step in your professional journey with a graduate degree from The Unity University Liberia. Join
              our community of leaders, innovators, and change-makers who are shaping the future of Liberia and Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for Graduate School
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
                    Schedule Information Session
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
