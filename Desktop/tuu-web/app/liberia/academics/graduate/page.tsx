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

const LiberiaFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-sm shadow-sm border border-white/20 animate-flag-wave")}>
      {/* Stripes */}
      <div className="liberian-flag-gradient w-full h-full" />

      {/* Blue canton with white star */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[10px] h-[10px] text-white fill-current drop-shadow-sm"
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

export default function GraduatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const programs = [
    // Faculty of Social Sciences Graduate Programs
    {
      id: "ma-international-relations",
      title: "Master of Arts in International Relations and Diplomatic Studies",
      category: "social",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Globe,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced program for professionals seeking expertise in international diplomacy, foreign policy analysis, and global governance for careers in diplomatic service and international organizations.",
      highlights: [
        "Advanced Diplomatic Theory",
        "International Law & Organizations",
        "Foreign Policy Analysis",
        "Conflict Resolution",
        "Global Governance",
      ],
      curriculum: [
        "Advanced International Relations Theory",
        "Diplomatic Practice and Protocol",
        "International Law and Organizations",
        "Foreign Policy Analysis",
        "Conflict Resolution and Peacebuilding",
        "Global Political Economy",
        "Research Methods in International Relations",
        "Thesis Project",
      ],
      careers: [
        "Senior Diplomat",
        "Foreign Policy Analyst",
        "International Development Specialist",
        "Conflict Resolution Specialist",
        "International NGO Director",
        "Embassy Official",
      ],
      requirements: {
        academic: "Bachelor's degree in related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Research proposal and academic references",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["West African Regional Integration", "Post-Conflict Development", "International Trade Policy"],
    },
    {
      id: "ma-public-administration",
      title: "Master of Arts in Public Administration and Management",
      category: "social",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Building,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced public administration program preparing leaders for senior positions in government, NGOs, and international development organizations.",
      highlights: [
        "Advanced Public Policy",
        "Government Administration",
        "Leadership Development",
        "Public Finance Management",
        "Governance and Ethics",
      ],
      curriculum: [
        "Advanced Public Administration Theory",
        "Public Policy Analysis and Evaluation",
        "Public Financial Management",
        "Leadership and Governance",
        "Public Sector Reform",
        "Development Administration",
        "Research Methods",
        "Capstone Project",
      ],
      careers: [
        "Senior Government Administrator",
        "Policy Director",
        "Public Sector Consultant",
        "International Development Manager",
        "NGO Executive Director",
        "Municipal Manager",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA and relevant work experience",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Professional experience and leadership potential",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Public Sector Reform", "Decentralization", "E-governance"],
    },
    {
      id: "ma-development-studies",
      title: "Master of Arts in Development Studies",
      category: "social",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Heart,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Interdisciplinary program examining development challenges and solutions, preparing leaders for international development organizations and policy-making roles.",
      highlights: [
        "Development Theory & Practice",
        "Project Management",
        "Policy Analysis",
        "Community Development",
        "Sustainable Development",
      ],
      curriculum: [
        "Development Theory and Practice",
        "Development Economics",
        "Project Planning and Management",
        "Development Policy Analysis",
        "Gender and Development",
        "Environmental Development",
        "Research Methodology",
        "Thesis Research",
      ],
      careers: [
        "Development Program Manager",
        "International Development Consultant",
        "Policy Analyst",
        "Research Coordinator",
        "NGO Program Director",
        "Development Finance Officer",
      ],
      requirements: {
        academic: "Bachelor's degree in social sciences or related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Development work experience preferred",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Rural Development", "Poverty Reduction", "Sustainable Development"],
    },

    // Faculty of Business and Management Graduate Programs
    {
      id: "mba",
      title: "Master of Business Administration (MBA)",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: TrendingUp,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced business leadership program designed for experienced professionals seeking executive roles in Liberia's dynamic business environment and international markets.",
      highlights: [
        "Executive Leadership Development",
        "Strategic Management Focus",
        "International Business Exposure",
        "Capstone Business Project",
        "Industry Mentorship Program",
      ],
      curriculum: [
        "Strategic Management",
        "Financial Analysis & Planning",
        "International Business Strategy",
        "Leadership & Organizational Behavior",
        "Marketing Management",
        "Operations & Supply Chain Management",
        "Business Ethics & Corporate Governance",
        "Entrepreneurship & Innovation",
      ],
      careers: [
        "Chief Executive Officer",
        "Business Development Director",
        "Strategic Consultant",
        "Investment Manager",
        "Operations Director",
        "International Business Manager",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA and 2+ years work experience",
        english: "TOEFL 90+ or IELTS 7.0+ (for international students)",
        additional: "GMAT/GRE scores, professional resume, and leadership essay",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Sustainable Business Practices", "African Market Development", "Digital Transformation"],
    },
    {
      id: "mhrm",
      title: "Master of Human Resources Management",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Users,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced HR management program focusing on strategic human resource development, organizational psychology, and leadership in modern organizations.",
      highlights: [
        "Strategic HR Management",
        "Organizational Development",
        "Leadership Psychology",
        "Talent Management",
        "International HR Practices",
      ],
      curriculum: [
        "Strategic Human Resource Management",
        "Advanced Organizational Behavior",
        "Talent Development and Management",
        "Compensation and Benefits Strategy",
        "Employment Law and Relations",
        "HR Analytics and Metrics",
        "Change Management",
        "Research Project",
      ],
      careers: [
        "HR Director",
        "Organizational Development Specialist",
        "Talent Management Manager",
        "HR Consultant",
        "Training and Development Director",
        "Chief People Officer",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "HR experience and professional references",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Employee Engagement", "Diversity & Inclusion", "HR Technology"],
    },
    {
      id: "maf",
      title: "Master of Accounting & Finance",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Calculator,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced accounting and finance program preparing professionals for senior financial management roles in both public and private sectors.",
      highlights: [
        "Advanced Financial Analysis",
        "International Accounting Standards",
        "Corporate Finance Strategy",
        "Risk Management",
        "Professional Certification Preparation",
      ],
      curriculum: [
        "Advanced Financial Accounting",
        "International Financial Reporting",
        "Corporate Finance Strategy",
        "Advanced Auditing",
        "Financial Risk Management",
        "Investment Analysis",
        "Research Methods in Finance",
        "Capstone Project",
      ],
      careers: [
        "Chief Financial Officer",
        "Financial Controller",
        "Investment Manager",
        "Risk Manager",
        "Financial Consultant",
        "Senior Auditor",
      ],
      requirements: {
        academic: "Bachelor's degree in accounting, finance, or related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Professional accounting/finance experience preferred",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Financial Markets Development", "Corporate Governance", "Islamic Finance"],
    },
    {
      id: "mpm",
      title: "Master of Project Planning and Management",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Building,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Specialized program focusing on advanced project management methodologies, strategic planning, and leadership for complex development projects.",
      highlights: [
        "Advanced Project Management",
        "Strategic Planning",
        "Risk Assessment",
        "Resource Optimization",
        "International Development Focus",
      ],
      curriculum: [
        "Advanced Project Management",
        "Strategic Planning and Analysis",
        "Project Risk Management",
        "Resource Mobilization",
        "Monitoring and Evaluation",
        "Leadership in Project Management",
        "Research Methods",
        "Capstone Project",
      ],
      careers: [
        "Senior Project Manager",
        "Program Director",
        "Development Consultant",
        "Portfolio Manager",
        "Strategic Planning Advisor",
        "Project Management Consultant",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Project management experience required",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Development Project Management", "Infrastructure Projects", "Technology Projects"],
    },
    {
      id: "mmm",
      title: "Master of Marketing Management",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: TrendingUp,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced marketing program focusing on strategic marketing management, digital marketing, and consumer behavior in emerging markets.",
      highlights: [
        "Strategic Marketing Leadership",
        "Digital Marketing Innovation",
        "Consumer Psychology",
        "Brand Strategy",
        "Market Research",
      ],
      curriculum: [
        "Strategic Marketing Management",
        "Advanced Consumer Behavior",
        "Digital Marketing Strategy",
        "Brand Management",
        "Marketing Research Methods",
        "International Marketing",
        "Marketing Analytics",
        "Marketing Strategy Project",
      ],
      careers: [
        "Marketing Director",
        "Brand Manager",
        "Digital Marketing Manager",
        "Marketing Research Manager",
        "Product Manager",
        "Marketing Consultant",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Marketing experience and portfolio",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Digital Marketing", "Consumer Behavior", "African Markets"],
    },
    {
      id: "mplscm",
      title: "Master of Procurement, Logistics and Supply Chain Management",
      category: "business",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Building,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced program focusing on strategic supply chain management, procurement optimization, and logistics coordination for modern organizations.",
      highlights: [
        "Strategic Supply Chain Management",
        "Advanced Procurement",
        "Logistics Optimization",
        "Vendor Management",
        "International Trade",
      ],
      curriculum: [
        "Strategic Supply Chain Management",
        "Advanced Procurement Systems",
        "Logistics and Distribution",
        "Supply Chain Analytics",
        "International Trade and Logistics",
        "Vendor Relationship Management",
        "Supply Chain Risk Management",
        "Research Project",
      ],
      careers: [
        "Supply Chain Director",
        "Procurement Manager",
        "Logistics Manager",
        "Operations Manager",
        "Supply Chain Consultant",
        "Vendor Relations Manager",
      ],
      requirements: {
        academic: "Bachelor's degree with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Supply chain or logistics experience preferred",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Supply Chain Optimization", "Sustainable Logistics", "Procurement Innovation"],
    },

    // Faculty of Allied Health Sciences Graduate Programs
    {
      id: "mph",
      title: "Master of Public Health",
      category: "health",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Stethoscope,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced public health program addressing critical health challenges in Liberia and West Africa, focusing on epidemiology, health policy, and community health leadership.",
      highlights: [
        "Advanced Epidemiology",
        "Health Policy Development",
        "Global Health Focus",
        "Community Health Leadership",
        "Research Excellence",
      ],
      curriculum: [
        "Advanced Epidemiology",
        "Health Policy and Systems",
        "Biostatistics",
        "Environmental Health Sciences",
        "Global Health",
        "Health Program Evaluation",
        "Research Methods",
        "Thesis Project",
      ],
      careers: [
        "Public Health Director",
        "Epidemiologist",
        "Health Policy Analyst",
        "Global Health Specialist",
        "Health Program Manager",
        "Health Research Coordinator",
      ],
      requirements: {
        academic: "Bachelor's degree in health sciences or related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Public health experience and commitment to service",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Infectious Disease Control", "Maternal Health", "Health Systems Strengthening"],
    },
    {
      id: "mnfs",
      title: "Master of Nutrition and Food Science",
      category: "health",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Heart,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced program focusing on nutrition science, food security, and public nutrition policies for improving community health outcomes.",
      highlights: [
        "Advanced Nutrition Science",
        "Food Security Analysis",
        "Nutritional Epidemiology",
        "Food Policy Development",
        "Community Nutrition",
      ],
      curriculum: [
        "Advanced Human Nutrition",
        "Nutritional Epidemiology",
        "Food Security and Policy",
        "Clinical Nutrition",
        "Food Science and Technology",
        "Community Nutrition",
        "Research Methods",
        "Thesis Project",
      ],
      careers: [
        "Senior Nutritionist",
        "Food Policy Analyst",
        "Public Health Nutritionist",
        "Nutrition Program Manager",
        "Food Security Specialist",
        "Nutrition Researcher",
      ],
      requirements: {
        academic: "Bachelor's degree in nutrition, food science, or related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "Nutrition or food science background",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Malnutrition Prevention", "Food Security", "Nutrition Education"],
    },

    // Faculty of Computing and Information Technology Graduate Programs
    {
      id: "msit",
      title: "Master of Science in Information Technology",
      category: "computing",
      duration: "2 Years",
      credits: "60 Credits",
      icon: Code,
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Advanced IT program focusing on emerging technologies, system administration, cybersecurity, and digital transformation for modern organizations.",
      highlights: [
        "Advanced System Administration",
        "Cybersecurity Specialization",
        "Cloud Computing",
        "Digital Transformation",
        "IT Leadership",
      ],
      curriculum: [
        "Advanced Information Systems",
        "Cybersecurity and Risk Management",
        "Cloud Computing and Virtualization",
        "Database Administration",
        "Network Security",
        "IT Project Management",
        "Research Methods",
        "Capstone Project",
      ],
      careers: [
        "IT Director",
        "Systems Architect",
        "Cybersecurity Manager",
        "Cloud Solutions Architect",
        "IT Consultant",
        "Technology Manager",
      ],
      requirements: {
        academic: "Bachelor's degree in IT, Computer Science, or related field with minimum 3.0 GPA",
        english: "TOEFL 85+ or IELTS 6.5+ (for international students)",
        additional: "IT experience and technical portfolio",
      },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
      researchAreas: ["Cybersecurity", "Cloud Computing", "Digital Innovation"],
    },
  ]

  const categories = [
    { value: "all", label: "All Programs", count: programs.length },
    { value: "social", label: "Social Sciences", count: programs.filter((p) => p.category === "social").length },
    { value: "business", label: "Business & Management", count: programs.filter((p) => p.category === "business").length },
    { value: "health", label: "Allied Health Sciences", count: programs.filter((p) => p.category === "health").length },
    { value: "computing", label: "Computing & Information Technology", count: programs.filter((p) => p.category === "computing").length },
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
              <LiberiaFlag className="h-8 w-12" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-bold">
                Advanced Graduate Education
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Graduate Programs</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Advance your career with our world-class graduate programs at Unity University Liberia. Designed for
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
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Graduate Program</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search graduate programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                <div className="md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="py-3 text-lg">
                      <Filter className="h-5 w-5 mr-2" />
                      <SelectValue placeholder="Filter by field" />
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
                        <Badge className="bg-red-600/90 text-white font-bold">Graduate</Badge>
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
              <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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

                        <TabsContent value="research" className="mt-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Research Areas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {program.researchAreas.map((area, idx) => (
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
              Why Choose Graduate School at Unity University?
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
            {[
              {
                icon: Brain,
                title: "Advanced Expertise",
                description:
                  "Develop deep, specialized knowledge in your field with cutting-edge curriculum and research opportunities.",
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description:
                  "Learn from distinguished professors and industry leaders who bring real-world experience to the classroom.",
              },
              {
                icon: TrendingUp,
                title: "Career Advancement",
                description:
                  "98% of our graduates report career advancement within two years of completing their degree.",
              },
              {
                icon: Globe,
                title: "Global Network",
                description:
                  "Join an international network of alumni and professionals across various industries and sectors.",
              },
              {
                icon: Microscope,
                title: "Research Excellence",
                description:
                  "Engage in groundbreaking research that addresses critical challenges in Liberia and Africa.",
              },
              {
                icon: Shield,
                title: "Flexible Learning",
                description: "Evening and weekend classes designed for working professionals with busy schedules.",
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
                                <LiberiaFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the next step in your professional journey with a graduate degree from Unity University Liberia. Join
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
