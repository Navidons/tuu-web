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
  TrendingUp,
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
      <span className="text-gray-900 font-medium">Undergraduate Programs</span>
    </nav>
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
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Key Highlights:</h4>
            <div className="flex flex-wrap gap-1">
              {program.highlights.slice(0, 2).map((highlight: string, idx: number) => (
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

  // -----------------------------------------------------------------------------------
  // Updated Programs: ONLY the four requested faculties & their courses (all 3-year)
  // -----------------------------------------------------------------------------------
  const programs = [
    // Faculty of Social Sciences
    {
      id: "intl-relations",
      title: "Bachelor of International Relations and Diplomatic Studies",
      category: "social",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Globe,
      image: "/courses/international-relations.jpg",
      description: "Comprehensive program focusing on global politics, international diplomacy, and diplomatic studies. Students develop understanding of international law, foreign policy, and global governance structures.",
      highlights: ["International Law & Diplomacy", "Foreign Policy Analysis", "Global Governance", "Diplomatic Protocol", "International Organizations"],
      curriculum: ["Introduction to International Relations", "International Law", "Foreign Policy Analysis", "Diplomatic Protocol", "Comparative Politics", "International Organizations", "Global Security Studies", "Research Methods"],
      careers: ["Diplomat", "Foreign Service Officer", "Policy Analyst", "International Relations Specialist", "NGO Program Manager", "Political Analyst"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "public-admin",
      title: "Bachelor of Arts in Public Administration and Management",
      category: "social",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Globe,
      image: "/courses/leadership-skills.jpg",
      description: "Designed to prepare students for leadership roles in public sector organizations, focusing on governance, public policy development, and administrative management.",
      highlights: ["Public Policy Development", "Government Administration", "Leadership Skills", "Organizational Management", "Policy Analysis"],
      curriculum: ["Principles of Public Administration", "Public Policy Analysis", "Government Finance", "Organizational Behavior", "Administrative Law", "Leadership and Management", "Public Sector Economics", "Research Methods"],
      careers: ["Public Administrator", "Government Policy Advisor", "Civil Service Manager", "Program Coordinator", "Policy Analyst", "Municipal Administrator"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "social-work",
      title: "Bachelor of Arts in Social Works and Social Administration",
      category: "social",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Globe,
      image: "/community-outreaches/health-community-outreach-01.jpg",
      description: "Comprehensive program preparing students for professional social work practice, community development, and social service administration in various settings.",
      highlights: ["Community Development", "Social Service Delivery", "Counseling Skills", "Advocacy and Social Justice", "Case Management"],
      curriculum: ["Introduction to Social Sciences", "Community Development", "Guidance and Counselling", "Human Growth and Development", "Social Service Ethics", "Community Organization", "Research Methods", "Field Practice"],
      careers: ["Social Worker", "Community Development Officer", "Case Manager", "Social Service Administrator", "NGO Program Manager", "Community Organizer"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement and commitment to community service" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "project-mgmt",
      title: "Bachelor of Project Planning and Management",
      category: "social",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Globe,
      image: "/courses/business-class.jpg",
      description: "Specialized program focusing on project lifecycle management, monitoring and evaluation, and strategic planning for development projects.",
      highlights: ["Project Lifecycle Management", "Monitoring & Evaluation", "Resource Mobilization", "Strategic Planning", "Risk Management"],
      curriculum: ["Project Planning Fundamentals", "Resource Mobilization", "Monitoring and Evaluation", "Risk Management", "Grant Writing", "Development Finance", "Research Methods", "Capstone Project"],
      careers: ["Project Manager", "Program Coordinator", "Development Officer", "Monitoring & Evaluation Specialist", "Grant Writer", "Consultant"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement and basic computer skills" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "public-relations",
      title: "Bachelor of Arts in Public Relations and Media Management",
      category: "social",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Globe,
      image: "/courses/public-speaking.jpg",
      description: "Comprehensive program combining public relations theory with practical media management skills for modern communication challenges.",
      highlights: ["Strategic Communication", "Media Production", "Digital Media Management", "Crisis Communication", "Brand Management"],
      curriculum: ["Introduction to Public Relations", "Media Writing", "Digital Media Management", "Crisis Communication", "Media Production", "Public Relations Campaigns", "Media Law and Ethics", "Research Project"],
      careers: ["Public Relations Officer", "Media Manager", "Communications Specialist", "Digital Marketing Manager", "Corporate Communications Manager", "Social Media Manager"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Portfolio of written work and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },

    // Faculty of Business and Management
    {
      id: "accounting-finance",
      title: "Bachelor of Accounting and Finance",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Calculator,
      image: "/courses/accounts.jpg",
      description: "Comprehensive program covering financial accounting, management accounting, auditing, and financial management principles for professional accounting practice.",
      highlights: ["Financial Accounting", "Management Accounting", "Auditing", "Taxation", "Financial Analysis"],
      curriculum: ["Fundamentals of Accounting", "Intermediate Accounting", "Cost Accounting", "Financial Management", "Auditing I & II", "Taxation I & II", "Investment Analysis", "Computerized Accounting"],
      careers: ["Accountant", "Financial Analyst", "Auditor", "Tax Consultant", "Financial Manager", "Budget Analyst"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Strong mathematics background" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "hr-management",
      title: "Bachelor of Human Resource Management",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Users,
      image: "/courses/human-resources.jpg",
      description: "Specialized program focusing on human resource development, organizational behavior, and strategic human resource management in modern organizations.",
      highlights: ["Talent Management", "Organizational Behavior", "HR Strategy", "Training & Development", "Employment Law"],
      curriculum: ["Principles of Management", "Organizational Behavior", "Human Resource Strategy", "Training and Development", "Employment Law", "Performance Management", "Compensation Management", "Research Methods"],
      careers: ["HR Manager", "Recruitment Specialist", "Training Coordinator", "HR Generalist", "Compensation Analyst", "Employee Relations Specialist"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "business-admin",
      title: "Bachelor of Business Administration",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Briefcase,
      image: "/courses/business-class.jpg",
      description: "Broad-based business program covering all major business functions including management, marketing, finance, and entrepreneurship for versatile business leadership.",
      highlights: ["Strategic Management", "Entrepreneurship", "Business Ethics", "International Business", "Leadership Development"],
      curriculum: ["Principles of Management", "Marketing Principles", "Entrepreneurship Development", "Strategic Management", "Business Ethics", "International Business", "Operations Management", "Business Research"],
      careers: ["Business Manager", "Entrepreneur", "Management Trainee", "Business Analyst", "Operations Manager", "General Manager"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Personal statement" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "banking-finance",
      title: "Bachelor of Banking and Finance",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Calculator,
      image: "/courses/finance.jpg",
      description: "Specialized program focusing on banking operations, financial markets, and financial institution management for careers in the financial services sector.",
      highlights: ["Banking Operations", "Financial Markets", "Risk Management", "Investment Banking", "Financial Regulation"],
      curriculum: ["Principles of Banking", "Financial Markets", "Monetary Economics", "Bank Management", "Risk Management", "Investment Analysis", "Banking Law", "Financial Research"],
      careers: ["Bank Officer", "Credit Analyst", "Investment Advisor", "Risk Manager", "Financial Consultant", "Branch Manager"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Strong quantitative skills" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "procurement-supply",
      title: "Bachelor of Procurement, Logistics and Supply Chain Management",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Building,
      image: "/courses/business-class.jpg",
      description: "Comprehensive program covering procurement processes, logistics management, and supply chain optimization for modern business operations.",
      highlights: ["Supply Chain Management", "Procurement Processes", "Logistics Planning", "Inventory Management", "Vendor Management"],
      curriculum: ["Procurement Fundamentals", "Supply Chain Management", "Logistics Planning", "Inventory Management", "Purchasing Management", "Transportation Management", "Quality Management", "Research Project"],
      careers: ["Supply Chain Analyst", "Procurement Officer", "Logistics Coordinator", "Inventory Manager", "Purchasing Manager", "Operations Analyst"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Basic computer skills" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "marketing",
      title: "Bachelor of Marketing",
      category: "business",
      duration: "3 Years",
      credits: "120 Credits",
      icon: TrendingUp,
      image: "/courses/business-class.jpg",
      description: "Specialized marketing program focusing on consumer behavior, digital marketing, brand management, and strategic marketing for modern markets.",
      highlights: ["Digital Marketing", "Brand Management", "Consumer Psychology", "Market Research", "Strategic Marketing"],
      curriculum: ["Principles of Marketing", "Consumer Behavior", "Digital Marketing", "Brand Management", "Market Research", "Advertising and Promotion", "Strategic Marketing", "Marketing Analytics"],
      careers: ["Marketing Manager", "Digital Marketing Specialist", "Brand Manager", "Market Research Analyst", "Advertising Executive", "Sales Manager"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Creativity portfolio and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },

    // Faculty of Allied Health Science
    {
      id: "public-health",
      title: "Bachelor of Public Health",
      category: "health",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Stethoscope,
      image: "/courses/health-sciences.jpg",
      description: "Comprehensive public health program focusing on disease prevention, health promotion, epidemiology, and community health management.",
      highlights: ["Epidemiology", "Health Promotion", "Community Health", "Health Policy", "Disease Prevention"],
      curriculum: ["Understanding Public Health", "Epidemiology", "Environmental Health", "Health Education", "Health Policy Planning", "Maternal and Child Health", "Community Health Ethics", "Research Methods"],
      careers: ["Public Health Officer", "Epidemiologist", "Health Educator", "Community Health Worker", "Health Program Manager", "Disease Surveillance Officer"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA and science background", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Commitment to public service" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "nutrition-food",
      title: "Bachelor of Nutrition and Food Science",
      category: "health",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Heart,
      image: "/courses/food-nutrition.png",
      description: "Specialized program focusing on human nutrition, food science, dietetics, and food safety for improving community health and nutrition.",
      highlights: ["Clinical Nutrition", "Food Science", "Dietetics", "Food Safety", "Nutritional Assessment"],
      curriculum: ["Food, Nutrition, and Health", "Clinical Nutrition", "Food Microbiology", "Food Service Management", "Nutrition Education", "Community Nutrition", "Food Quality Control", "Research Methods"],
      careers: ["Nutritionist", "Dietician", "Food Safety Inspector", "Nutrition Educator", "Food Service Manager", "Public Health Nutritionist"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA and science background", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Interest in health and nutrition" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "health-service-mgmt",
      title: "Bachelor of Science in Health Service & Management",
      category: "health",
      duration: "3 Years",
      credits: "120 Credits",
      icon: Building,
      image: "/labs/health-science-student-in-lab.jpg",
      description: "Healthcare management program focusing on health systems administration, healthcare policy, and management of health service organizations.",
      highlights: ["Health Systems Management", "Healthcare Policy", "Hospital Administration", "Health Economics", "Quality Management"],
      curriculum: ["Health Service Management", "Health Policy Planning", "Health Economics", "Hospital Management", "Quality Systems", "Health Informatics", "Healthcare Leadership", "Research Methods"],
      careers: ["Health Services Manager", "Hospital Administrator", "Healthcare Policy Analyst", "Health Program Coordinator", "Quality Assurance Manager", "Healthcare Consultant"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Leadership potential and interview" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },

    // Faculty of Computing & Information Technology
    {
      id: "software-engineering",
      title: "Bachelor of Science in Software Engineering",
      category: "computing",
      duration: "3 Years",
      credits: "128 Credits",
      icon: Code,
      image: "/courses/software-engineering.jpg",
      description: "Comprehensive software engineering program focusing on software development lifecycle, programming methodologies, and modern software engineering practices.",
      highlights: ["Software Development", "Programming Languages", "Software Architecture", "Mobile App Development", "Project Management"],
      curriculum: ["Programming in C", "Object-Oriented Programming (Java)", "Web Programming", "Software Engineering Principles", "Mobile App Development", "Software Project Management", "Human Computer Interaction", "Research Project"],
      careers: ["Software Engineer", "Mobile App Developer", "Web Developer", "Software Architect", "Systems Analyst", "IT Project Manager"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA and mathematics background", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Logical thinking and problem-solving skills" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "computer-science",
      title: "Bachelor of Science in Computer Science",
      category: "computing",
      duration: "3 Years",
      credits: "128 Credits",
      icon: Code,
      image: "/courses/computer-science.jpg",
      description: "Comprehensive computer science program covering algorithms, data structures, artificial intelligence, and advanced computing concepts.",
      highlights: ["Data Structures & Algorithms", "Artificial Intelligence", "Computer Architecture", "Software Simulation", "Cybersecurity"],
      curriculum: ["Computer Fundamentals", "Programming Methodology", "Data Structures & Algorithms", "Operating Systems", "Artificial Intelligence", "Information Security", "Software Simulation", "Research Project"],
      careers: ["Software Developer", "Systems Analyst", "Data Scientist", "AI Specialist", "Research Scientist", "Computer Systems Analyst"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA and strong mathematics background", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Analytical thinking and mathematical aptitude" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
    },
    {
      id: "information-technology",
      title: "Bachelor of Science in Information Technology",
      category: "computing",
      duration: "3 Years",
      credits: "128 Credits",
      icon: Globe,
      image: "/courses/technology.jpg",
      description: "Practical IT program focusing on network administration, system management, cybersecurity, and enterprise technology solutions.",
      highlights: ["Network Administration", "Cybersecurity", "Cloud Computing", "IT Project Management", "System Administration"],
      curriculum: ["Computer Applications", "Database Applications", "Data Communication & Networking", "Information Systems", "Cloud Computing", "Information Security", "IT Project Management", "Research Project"],
      careers: ["Network Administrator", "IT Support Specialist", "Systems Administrator", "Cybersecurity Analyst", "IT Project Manager", "Database Administrator"],
      requirements: { academic: "High School Diploma with minimum 2.5 GPA", english: "TOEFL 80+ or IELTS 6.0+ (for international students)", additional: "Interest in technology and problem-solving" },
      accreditation: "Accredited by Liberia National Commission on Higher Education",
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
        <div className="absolute inset-0">
          <Image
            src="/in-class/masters/in-class-04.jpg"
            alt="Undergraduate Excellence at Unity University Liberia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
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
                Undergraduate Excellence
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Undergraduate Programs</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Launch your career with world-class undergraduate education at The Unity University Liberia. Our comprehensive
              programs combine academic excellence with practical experience, preparing you for success in Liberia's
              growing economy and the global marketplace.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/liberia/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Visit Campus
                    <MapPin className="ml-2 h-5 w-5" />
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
              { icon: BookOpen, number: "16", label: "Degree Programs", sublabel: "Across 4 Faculties" },
              { icon: Users, number: "1,200+", label: "Students Enrolled", sublabel: "Active Learners" },
              { icon: Award, number: "92%", label: "Employment Rate", sublabel: "Graduate Success" },
              { icon: Clock, number: "3", label: "Years Duration", sublabel: "Standard Program" },
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

      {/* Programs Section with Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect Program</h2>
              
              {/* Search Input */}
              <div className="flex justify-center mb-8">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search programs..."
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
                    <Badge variant="secondary" className="text-xs">16</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <span>Social Sciences</span>
                    <Badge variant="secondary" className="text-xs">5</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="business" className="flex items-center gap-2">
                    <span>Business</span>
                    <Badge variant="secondary" className="text-xs">6</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="health" className="flex items-center gap-2">
                    <span>Health Sciences</span>
                    <Badge variant="secondary" className="text-xs">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="computing" className="flex items-center gap-2">
                    <span>Computing & IT</span>
                    <Badge variant="secondary" className="text-xs">3</Badge>
                  </TabsTrigger>
                </TabsList>

                {/* All Programs Tab */}
                <TabsContent value="all">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      program.description.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program.id)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Social Sciences Programs Tab */}
                <TabsContent value="social">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.category === "social" &&
                      (program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program.id)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Business Programs Tab */}
                <TabsContent value="business">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.category === "business" &&
                      (program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program.id)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Health Sciences Programs Tab */}
                <TabsContent value="health">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.category === "health" &&
                      (program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program.id)} />
                    ))}
                  </div>
                </TabsContent>

                {/* Computing & IT Programs Tab */}
                <TabsContent value="computing">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.filter(program => 
                      program.category === "computing" &&
                      (program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map((program) => (
                      <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program.id)} />
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

      {/* Why Choose The Unity University */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose The Unity University Liberia?</h2>
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
                                <LiberiaFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful graduates who started their careers at The Unity University Liberia. Your future
              begins here, where "The Love of Liberty Brought Us Here."
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for 2025 - 2026 Admission
                    <GraduationCap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/liberia/about/contact">
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
