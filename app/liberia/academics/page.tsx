"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  Users,
  ChevronRight,
  Calendar,
  CheckCircle,
  ArrowRight,
  MapPin,
  TrendingUp,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

// Liberian Flag Component
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

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && isInView) {
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
  }, [isClient, isInView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const academicPrograms = {
    undergraduate: [
      // Faculty of Social Sciences
      { title: "Bachelor of International Relations and Diplomatic Studies", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/international-relations.jpg", features: ["Diplomacy", "Global Politics", "Conflict Resolution"], description: "Comprehensive study of international relations, diplomacy, and global governance for Liberia's role in West Africa and beyond." },
      { title: "Bachelor of Arts in Public Administration and Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/leadership-skills.jpg", features: ["Governance", "Policy Analysis", "Public Service"], description: "Training future public servants and administrators to serve Liberian communities with excellence and integrity." },
      { title: "Bachelor of Arts in Social Work and Social Administration", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/community-outreaches/health-community-outreach-01.jpg", features: ["Community Development", "Social Welfare", "Advocacy"], description: "Empowering graduates to address social challenges and promote community development across Liberia." },
      { title: "Bachelor of Project Planning and Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/business-class.jpg", features: ["Project Lifecycle", "Risk Management", "Stakeholder Engagement"], description: "Developing project management experts for Liberia's development initiatives and infrastructure projects." },
      { title: "Bachelor of Arts in Public Relations and Media Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/public-speaking.jpg", features: ["Strategic Communication", "Brand Management", "Digital Media"], description: "Training communication professionals for Liberia's growing media and corporate sectors." },

      // Faculty of Business and Management
      { title: "Bachelor of Accounting and Finance", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/accounts.jpg", features: ["Financial Reporting", "Auditing", "Investment Analysis"], description: "Comprehensive accounting and finance education aligned with international standards and Liberian business practices." },
      { title: "Bachelor of Human Resource Management", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/human-resources.jpg", features: ["Talent Acquisition", "Employee Relations", "Organizational Development"], description: "Developing HR professionals to support Liberia's growing business sector and public institutions." },
      { title: "Bachelor of Business Administration", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/business-class.jpg", features: ["Management", "Entrepreneurship", "Strategic Planning"], description: "Comprehensive business education preparing entrepreneurs and business leaders for Liberia's economy." },
      { title: "Bachelor of Banking and Finance", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/finance.jpg", features: ["Banking Operations", "Risk Management", "Financial Markets"], description: "Specialized banking education for Liberia's financial sector development and regional integration." },
      { title: "Bachelor of Procurement, Logistics and Supply Chain Management", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/business-class.jpg", features: ["Supply Chain Optimization", "Logistics Strategy", "Vendor Management"], description: "Training supply chain professionals for Liberia's import-dependent economy and regional trade." },
      { title: "Bachelor of Marketing", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/courses/business-class.jpg", features: ["Consumer Behavior", "Brand Management", "Digital Marketing"], description: "Modern marketing education focusing on Liberian consumer markets and regional business opportunities." },

      // Faculty of Allied Health Sciences
      { title: "Bachelor of Public Health", faculty: "Allied Health Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/health-sciences.jpg", features: ["Epidemiology", "Health Promotion", "Community Health"], description: "Addressing Liberia's public health challenges through evidence-based prevention and health promotion strategies." },
      { title: "Bachelor of Nutrition and Food Science", faculty: "Allied Health Sciences", duration: "3 Years", credits: "120 Credits", image: "/courses/food-nutrition.png", features: ["Clinical Nutrition", "Food Safety", "Dietetics"], description: "Combating malnutrition and promoting food security in Liberian communities through nutrition science." },
      { title: "Bachelor of Science in Health Service and Management", faculty: "Allied Health Sciences", duration: "3 Years", credits: "120 Credits", image: "/labs/health-science-student-in-lab.jpg", features: ["Health Systems", "Healthcare Administration", "Policy"], description: "Strengthening Liberia's healthcare system through effective management and administration." },

      // Faculty of Computing & IT
      { title: "Bachelor of Science in Software Engineering", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/courses/software-engineering.jpg", features: ["Software Development", "DevOps", "Agile Methodologies"], description: "Building software engineering capacity for Liberia's digital transformation and technology sector growth." },
      { title: "Bachelor of Science in Computer Science", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/courses/computer-science.jpg", features: ["Algorithms", "Data Structures", "AI/ML"], description: "Comprehensive computer science education preparing graduates for the global technology economy." },
      { title: "Bachelor of Science in Information Technology", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/courses/technology.jpg", features: ["Network Administration", "Cybersecurity", "IT Support"], description: "Practical IT education supporting Liberia's digital infrastructure development and cybersecurity needs." },
    ],
    graduate: [
      // Faculty of Social Sciences
      { title: "Master of Arts in International Relations and Diplomatic Studies", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/courses/international-relations.jpg", features: ["Advanced Diplomacy", "Regional Integration", "Conflict Resolution"], description: "Advanced study preparing diplomatic corps and international relations experts for Liberia's global engagement." },
      { title: "Master of Arts in Public Administration and Management", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/courses/leadership-skills.jpg", features: ["Policy Analysis", "Public Leadership", "Governance"], description: "Advanced public administration training for senior government positions and public sector leadership." },
      { title: "Master of Arts in Development Studies", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/research/research-students.jpg", features: ["Development Theory", "Research Methods", "Policy Design"], description: "Comprehensive development studies focusing on sustainable development strategies for Liberia and West Africa." },

      // Faculty of Business and Management
      { title: "Master of Human Resources Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/courses/human-resources.jpg", features: ["HR Strategy", "Organizational Leadership", "Talent Management"], description: "Advanced HR management for senior leadership positions in Liberian businesses and organizations." },
      { title: "Master of Accounting and Finance", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/courses/accounts.jpg", features: ["Advanced Accounting", "Financial Strategy", "Auditing"], description: "Advanced accounting and finance education for senior financial management and consulting roles." },
      { title: "Master of Business Administration", faculty: "Business and Management", duration: "2 Years", credits: "60 Credits", image: "/courses/business-class.jpg", features: ["Executive Leadership", "Strategic Management", "Innovation"], description: "Executive business education preparing senior leaders for Liberia's private and public sectors." },
      { title: "Master of Project Planning and Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/courses/business-class.jpg", features: ["Advanced Project Management", "Program Management", "Portfolio Management"], description: "Advanced project management for leading major development and infrastructure projects in Liberia." },
      { title: "Master of Marketing Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/courses/business-class.jpg", features: ["Strategic Marketing", "Brand Strategy", "Market Research"], description: "Advanced marketing for senior marketing roles in Liberian businesses and regional markets." },
      { title: "Master of Procurement, Logistics and Supply Chain Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/courses/business-class.jpg", features: ["Supply Chain Strategy", "Global Logistics", "Procurement Management"], description: "Advanced supply chain management for senior logistics and procurement positions in Liberian economy." },

      // Faculty of Allied Health Sciences
      { title: "Master of Public Health", faculty: "Allied Health Sciences", duration: "2 Years", credits: "48 Credits", image: "/courses/health-sciences.jpg", features: ["Advanced Epidemiology", "Health Policy", "Global Health"], description: "Advanced public health training for senior health leadership and policy positions in Liberia." },
      { title: "Master of Nutrition and Food Science", faculty: "Allied Health Sciences", duration: "2 Years", credits: "48 Credits", image: "/courses/food-nutrition.png", features: ["Advanced Nutrition", "Food Policy", "Research"], description: "Advanced nutrition science for addressing food security and nutrition challenges in Liberia." },

      // Faculty of Computing and Information Technology
      { title: "Master of Science in Information Technology", faculty: "Computing & IT", duration: "2 Years", credits: "54 Credits", image: "/courses/technology.jpg", features: ["IT Strategy", "Cybersecurity", "Digital Transformation"], description: "Advanced IT education for senior technology leadership in Liberia's digital transformation initiatives." },
    ],
  }

  const academicStats = [
    { number: 28, label: "Academic Programs", icon: BookOpen },
    { number: 85, label: "Expert Faculty", icon: Users },
    { number: 1500, label: "Students Enrolled", icon: GraduationCap },
    { number: 92, label: "Employment Rate", icon: TrendingUp, suffix: "%" },
  ]

  const facilities = [
    {
      title: "Modern Lecture Halls",
      description: "State-of-the-art lecture halls equipped with modern audio-visual technology for enhanced learning.",
      image: "/in-class/masters/in-class-04.jpg",
      capacity: "50-200 students",
    },
    {
      title: "Research Laboratories",
      description: "Fully equipped laboratories for scientific research and practical learning across all disciplines.",
      image: "/labs/in-the-lab-0.jpg",
      capacity: "20-30 students",
    },
    {
      title: "Digital Library",
      description: "Comprehensive digital and physical library with extensive academic resources and research materials.",
      image: "/courses/library.jpg",
      capacity: "500+ students",
    },
    {
      title: "Innovation Hub",
      description: "Collaborative spaces for innovation, entrepreneurship, and project development initiatives.",
      image: "/courses/inovation-hub.jpg",
      capacity: "100+ students",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-800 via-blue-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-section/graduation-day.jpg"
            alt="Academic Excellence at Unity University Liberia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center items-center space-x-4 mb-6">
              <LiberiaFlag className="h-12 w-20" />
              <Badge className="bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 text-lg font-bold">
                Academic Excellence
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Academic <span className="text-blue-300">Programs</span>
            </h1>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Discover world-class academic programs designed to prepare you for success in Liberia's growing economy 
              and the global marketplace. Our comprehensive curriculum combines theoretical knowledge with practical application.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-bold">
                Explore Programs
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {academicStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix || "+"} />
                </div>
                <div className="text-gray-800 font-bold text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of academic programs designed to meet your career goals and 
              support Liberia's development priorities.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="flex w-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                <TabsTrigger
                  value="undergraduate"
                  className="text-lg font-semibold px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-colors"
                >
                  Undergraduate
                </TabsTrigger>
                <TabsTrigger
                  value="graduate"
                  className="text-lg font-semibold px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-colors"
                >
                  Graduate
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(academicPrograms).map(([category, programs]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={program.image || "/placeholder.svg"}
                            alt={program.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <Badge className="bg-blue-600/90 text-white text-xs">{program.duration}</Badge>
                            <Badge className="bg-red-600/90 text-white text-xs">{program.credits}</Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="text-lg font-bold mb-1">{program.title}</h4>
                            <p className="text-white/90 text-sm">{program.faculty}</p>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <p className="text-gray-600 leading-relaxed mb-4 text-sm">{program.description}</p>

                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h5>
                              <div className="grid grid-cols-1 gap-1">
                                {program.features.slice(0, 3).map((feature, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <CheckCircle className="h-3 w-3 text-blue-600" />
                                    <span className="text-xs text-gray-600">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-center items-center pt-2 border-t border-gray-100">
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{program.duration}</div>
                                <div className="text-xs text-gray-500">Duration</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>

                        <div className="p-6 pt-0">
                          <Link href={`/liberia/academics/${category}`}>
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-blue-50 group-hover:border-blue-600 group-hover:text-blue-700 transition-colors duration-300 bg-transparent"
                            >
                              Learn More
                              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Academic Facilities */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              World-Class{" "}
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Facilities
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art facilities provide the perfect environment for learning, research, and innovation 
              in the heart of Monrovia.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full overflow-hidden bg-white shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{facility.title}</h4>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600/90 text-white text-xs">{facility.capacity}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 leading-relaxed text-sm">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-blue-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <LiberiaFlag className="h-12 w-20" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Academic Journey?</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Take the first step towards your future in Liberia. Explore our programs, meet our faculty, and discover 
              how Unity University Liberia can help you achieve your goals and contribute to Liberia's development.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                  >
                    Apply Now
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/liberia/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                  >
                    Schedule Campus Visit
                    <MapPin className="ml-3 h-5 w-5" />
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
