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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"
import Head from "next/head"

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
      { title: "Bachelor of International Relations and Diplomatic Studies", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Diplomacy", "Global Perspective"], description: "Global politics, diplomacy, and international cooperation." },
      { title: "Bachelor of Arts in Public Administration and Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Policy", "Leadership"], description: "Governance, public policy, and administrative leadership." },
      { title: "Bachelor of Arts in Social Works and Social Administration", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Community", "Advocacy"], description: "Community development, welfare services, and advocacy." },
      { title: "Bachelor of Project Planning and Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Project Lifecycle", "PM Tools"], description: "Project lifecycle, monitoring, and evaluation." },
      { title: "Bachelor of Arts in Public Relations and Media Management", faculty: "Social Sciences", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Media", "Brand Management"], description: "Strategic communication and reputation management." },

      // Faculty of Business and Management
      { title: "Bachelor of Accounting and Finance", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Accounting", "Finance"], description: "Financial reporting, auditing, and investment analysis." },
      { title: "Bachelor of Human Resource Management", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["HR", "Recruitment"], description: "Talent acquisition, development, and employee relations." },
      { title: "Bachelor of Business Administration", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Management", "Entrepreneurship"], description: "Comprehensive business studies across management, marketing, and finance." },
      { title: "Bachelor of Banking and Finance", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Banking", "Risk Management"], description: "Bank operations, risk management, and investment banking." },
      { title: "Bachelor of Procurement, Logistics and Supplies Chain Management", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Supply Chain", "Logistics"], description: "End-to-end supply chain optimisation and logistics strategy." },
      { title: "Bachelor of Marketing", faculty: "Business and Management", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Branding", "Digital Marketing"], description: "Consumer behaviour, brand management, and digital marketing." },

      // Faculty of Allied Health Science
      { title: "Bachelor of Public Health", faculty: "Allied Health Science", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Epidemiology", "Health Promotion"], description: "Community health, disease prevention, and health promotion." },
      { title: "Bachelor of Nutrition and Food Science", faculty: "Allied Health Science", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Dietetics", "Food Safety"], description: "Human nutrition, dietetics, and food safety." },
      { title: "Bachelor of Science in Health Service & Management", faculty: "Allied Health Science", duration: "3 Years", credits: "120 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Health Policy", "Administration"], description: "Healthcare systems, policy, and administration." },

      // Faculty of Computing & IT
      { title: "Bachelor of Science in Software Engineering", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Software Dev", "DevOps"], description: "Software development lifecycle, DevOps, and quality assurance." },
      { title: "Bachelor of Science in Computer Science", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Algorithms", "Data Structures"], description: "Algorithms, data structures, and emerging technologies." },
      { title: "Bachelor of Science in Information Technology", faculty: "Computing & IT", duration: "3 Years", credits: "128 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Networking", "Cybersecurity"], description: "Network administration, cybersecurity, and IT project management." },
    ],
    graduate: [
      // Faculty of Social Sciences
      { title: "Master of Arts in International Relations and Diplomatic Studies", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Diplomacy", "Global Policy"], description: "Advanced study of international relations, diplomacy, and global policy." },
      { title: "Master of Arts in Public Administration and Management", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Public Policy", "Leadership"], description: "Governance, public policy, and administrative leadership at the graduate level." },
      { title: "Master of Arts in Development Studies", faculty: "Social Sciences", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Development", "Research"], description: "Development theory, research, and policy for social progress." },

      // Faculty of Business and Management
      { title: "Master of Human Resources Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["HR Strategy", "Talent Management"], description: "Advanced HR management, talent development, and organizational leadership." },
      { title: "Master of Accounting & Finance", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Accounting", "Finance"], description: "Advanced accounting, auditing, and financial management." },
      { title: "Master of Business Administration", faculty: "Business and Management", duration: "2 Years", credits: "60 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Leadership", "Strategy"], description: "Executive business education for future leaders." },
      { title: "Master of Project Planning and Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Project Management", "Planning"], description: "Project lifecycle, monitoring, and evaluation at the graduate level." },
      { title: "Master of Marketing Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Marketing", "Brand Management"], description: "Advanced marketing, branding, and digital strategy." },
      { title: "Master of Procurement, Logistics and Supplies Chain Management", faculty: "Business and Management", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Supply Chain", "Logistics"], description: "Advanced supply chain, procurement, and logistics management." },

      // Faculty of Allied Health Sciences
      { title: "Master of Public Health", faculty: "Allied Health Sciences", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Epidemiology", "Health Policy"], description: "Advanced public health, epidemiology, and health policy." },
      { title: "Master of Nutrition and Food Science", faculty: "Allied Health Sciences", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Nutrition", "Food Science"], description: "Advanced nutrition, food safety, and dietetics." },

      // Faculty of Education
      { title: "Master of Education in Policy, Planning & Management", faculty: "Education", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Policy", "Planning"], description: "Education policy, planning, and management at the graduate level." },
      { title: "Master of Education in Leadership and Management", faculty: "Education", duration: "2 Years", credits: "48 Credits", image: "/placeholder.svg?height=300&width=400", features: ["Leadership", "Management"], description: "Educational leadership and management for school administrators." },

      // Faculty of Computing and Information Technology
      { title: "Master of Science in Information Technology", faculty: "Computing & IT", duration: "2 Years", credits: "54 Credits", image: "/placeholder.svg?height=300&width=400", features: ["IT Management", "Cybersecurity"], description: "Advanced IT, cybersecurity, and information systems management." },
    ],
  }

  const academicStats = [
    { number: 37, label: "Academic Programs", labelSo: "Barnaamijyada Waxbarasho", icon: BookOpen },
    { number: 150, label: "Expert Faculty", labelSo: "Macallimiinta Khibradda leh", icon: Users },
    { number: 2800, label: "Students Enrolled", labelSo: "Ardayda Diiwaan-gashan", icon: GraduationCap },
    { number: 95, label: "Employment Rate", labelSo: "Heerka Shaqo-helida", icon: TrendingUp, suffix: "%" },
  ]

  const facilities = [
    {
      title: "Modern Lecture Halls",
      titleSo: "Qolalka Casriga ah ee Casharka",
      description: "State-of-the-art lecture halls equipped with modern audio-visual technology.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "50-200 students",
    },
    {
      title: "Research Laboratories",
      titleSo: "Makhadyada Cilmi-baadhista",
      description: "Fully equipped laboratories for scientific research and practical learning.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "20-30 students",
    },
    {
      title: "Digital Library",
      titleSo: "Maktabadda Dijital-ka",
      description: "Comprehensive digital and physical library with extensive academic resources.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "500+ students",
    },
    {
      title: "Innovation Hub",
      titleSo: "Xarunta Hal-abuurka",
      description: "Collaborative spaces for innovation, entrepreneurship, and project development.",
      image: "/placeholder.svg?height=300&width=400",
      capacity: "100+ students",
    },
  ]

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Bachelor of International Relations and Diplomatic Studies",
              "description": "Global politics, diplomacy, and international cooperation.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University Somaliland",
                "url": "https://tuu.university/somaliland"
              },
              "occupationalCategory": "Social Sciences",
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/international-relations.jpg",
              "location": {
                "@type": "Place",
                "name": "Hargeisa Campus",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Bachelor of Arts in Public Administration and Management",
              "description": "Governance, public policy, and administrative leadership.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University Somaliland",
                "url": "https://tuu.university/somaliland"
              },
              "occupationalCategory": "Social Sciences",
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/business-class.jpg",
              "location": {
                "@type": "Place",
                "name": "Hargeisa Campus",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Bachelor of Arts in Social Works and Social Administration",
              "description": "Community development, welfare services, and advocacy.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University Somaliland",
                "url": "https://tuu.university/somaliland"
              },
              "occupationalCategory": "Social Sciences",
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/community-outreaches/health-community-outreach-01.jpg",
              "location": {
                "@type": "Place",
                "name": "Hargeisa Campus",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Bachelor of Project Planning and Management",
              "description": "Project lifecycle, monitoring, and evaluation.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University Somaliland",
                "url": "https://tuu.university/somaliland"
              },
              "occupationalCategory": "Social Sciences",
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/business-class.jpg",
              "location": {
                "@type": "Place",
                "name": "Hargeisa Campus",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Bachelor of Arts in Public Relations and Media Management",
              "description": "Strategic communication and reputation management.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University Somaliland",
                "url": "https://tuu.university/somaliland"
              },
              "occupationalCategory": "Social Sciences",
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/public-speaking.jpg",
              "location": {
                "@type": "Place",
                "name": "Hargeisa Campus",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland"
                }
              }
            }
          ]
        }` }} />
      </Head>
      <SomalilandNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Badge className="bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 text-lg font-bold">
                Academic Excellence
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Academic <span className="text-emerald-300">Programs</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Barnaamijyada Waxbarasho</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Discover world-class academic programs designed to prepare you for success in today's global economy. Our
              comprehensive curriculum combines theoretical knowledge with practical application.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
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
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix || "+"} />
                </div>
                <div className="space-y-1">
                  <div className="text-gray-800 font-bold text-sm">{stat.label}</div>
                  <div className="text-emerald-600 font-medium text-xs">{stat.labelSo}</div>
                </div>
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Barnaamijyadaenna</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of academic programs designed to meet your career goals and
              aspirations.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-gray-100 p-2 rounded-xl">
              <TabsTrigger
                value="undergraduate"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Undergraduate
              </TabsTrigger>
              <TabsTrigger
                value="graduate"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Graduate
              </TabsTrigger>
            </TabsList>

            {Object.entries(academicPrograms).map(([category, programs]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
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
                            <Badge className="bg-emerald-600/90 text-white text-xs">{program.duration}</Badge>
                            <Badge className="bg-red-600/90 text-white text-xs">{program.credits}</Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="text-lg font-bold mb-1">{program.title}</h4>
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
                                    <CheckCircle className="h-3 w-3 text-emerald-600" />
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
                          <Link href={`/academics/${category}`}>
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 bg-transparent"
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
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              World-Class{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Facilities
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Agabka Heer Caalami ah</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art facilities provide the perfect environment for learning, research, and innovation.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
                      <p className="text-white/90 text-sm">{facility.titleSo}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-600/90 text-white text-xs">{facility.capacity}</Badge>
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
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-red-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Academic Journey?</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">
              Diyaar ma u tahay inaad Safarka Waxbarashadaada Bilowdo?
            </h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Take the first step towards your future. Explore our programs, meet our faculty, and discover how Unity
              University Somaliland can help you achieve your goals.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                  >
                    Apply Now
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about/contact">
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

      <SomalilandFooter />
    </>
  )
}
