"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  MapPin,
  Target,
  Lightbulb,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function UndergraduatePage() {
  const undergraduatePrograms = {
    // Faculty of Social Sciences
    international_relations: {
      title: "Bachelor of International Relations and Diplomatic Studies",
      titleSo: "Shahaadada Koowaad ee Xiriirka Caalamiga ah iyo Daraasaadka Dibloomaasiyadda",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Global politics, diplomacy, and international cooperation.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Diplomacy skills", "Global perspective"],
      curriculum: {
        "Year 1": ["Introduction to International Relations", "Political Science Basics", "Academic Writing", "African History"],
        "Year 2": ["Diplomatic Practice", "Comparative Politics", "International Law", "Research Methods"],
        "Year 3": ["Foreign Policy Analysis", "International Organizations", "Conflict Resolution", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    public_admin: {
      title: "Bachelor of Arts in Public Administration and Management",
      titleSo: "Shahaadada Koowaad ee Maamulka iyo Maareynta Dadweynaha",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Governance, public policy, and administrative leadership.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Policy design", "Leadership"],
      curriculum: {
        "Year 1": ["Introduction to Public Administration", "Political Science", "Microeconomics", "Communication Skills"],
        "Year 2": ["Public Policy", "Organizational Behavior", "Public Finance", "Research Methods"],
        "Year 3": ["Administrative Law", "Project Management", "Leadership in Public Sector", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    social_work: {
      title: "Bachelor of Arts in Social Works and Social Administration",
      titleSo: "Shahaadada Koowaad ee Shaqada Bulshada iyo Maamulka Bulshada",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Community development, welfare services, and advocacy.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Community engagement", "Advocacy"],
      curriculum: {
        "Year 1": ["Introduction to Social Work", "Sociology", "Psychology", "Community Development"],
        "Year 2": ["Social Policy", "Counseling Skills", "Human Rights", "Research Methods"],
        "Year 3": ["Social Work Practice", "Field Work", "Advocacy", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    project_planning: {
      title: "Bachelor of Project Planning and Management",
      titleSo: "Shahaadada Koowaad ee Qorsheynta iyo Maareynta Mashaariicda",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Project lifecycle, monitoring, and evaluation.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Project lifecycle", "PM tools"],
      curriculum: {
        "Year 1": ["Introduction to Project Management", "Statistics", "Economics", "ICT for Projects"],
        "Year 2": ["Project Planning", "Monitoring & Evaluation", "Financial Management", "Research Methods"],
        "Year 3": ["Risk Management", "Project Implementation", "Leadership", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    public_relations: {
      title: "Bachelor of Arts in Public Relations and Media Management",
      titleSo: "Shahaadada Koowaad ee Xiriirka Dadweynaha iyo Maareynta Warbaahinta",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Strategic communication and reputation management.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Media strategy", "Brand management"],
      curriculum: {
        "Year 1": ["Introduction to Public Relations", "Media Studies", "Writing for Media", "Communication Skills"],
        "Year 2": ["Media Law", "Crisis Communication", "Brand Management", "Research Methods"],
        "Year 3": ["Strategic Communication", "Digital Media", "Campaign Planning", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    // Faculty of Business and Management
    accounting_finance: {
      title: "Bachelor of Accounting and Finance",
      titleSo: "Shahaadada Koowaad ee Xisaabaadka iyo Maaliyadda",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Financial reporting, auditing, and investment analysis.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Accounting", "Finance"],
      curriculum: {
        "Year 1": ["Principles of Accounting", "Business Mathematics", "Microeconomics", "Business Communication"],
        "Year 2": ["Financial Accounting", "Corporate Finance", "Taxation", "Auditing"],
        "Year 3": ["Management Accounting", "Investment Analysis", "Financial Reporting", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    hr_management: {
      title: "Bachelor of Human Resource Management",
      titleSo: "Shahaadada Koowaad ee Maareynta Kheyraadka Aadanaha",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Talent acquisition, development, and employee relations.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["HR", "Recruitment"],
      curriculum: {
        "Year 1": ["Introduction to HRM", "Organizational Behavior", "Business Law", "Communication Skills"],
        "Year 2": ["Recruitment & Selection", "Training & Development", "Labor Relations", "Research Methods"],
        "Year 3": ["Performance Management", "Compensation Management", "Strategic HRM", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    business_admin: {
      title: "Bachelor of Business Administration",
      titleSo: "Shahaadada Koowaad ee Maamulka Ganacsiga",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Comprehensive business studies across management, marketing, and finance.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Management", "Entrepreneurship"],
      curriculum: {
        "Year 1": ["Introduction to Business", "Principles of Management", "Business Mathematics", "Microeconomics"],
        "Year 2": ["Marketing Principles", "Financial Accounting", "Business Law", "Organizational Behavior"],
        "Year 3": ["Operations Management", "Entrepreneurship", "Strategic Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    banking_finance: {
      title: "Bachelor of Banking and Finance",
      titleSo: "Shahaadada Koowaad ee Bangiyada iyo Maaliyadda",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Bank operations, risk management, and investment banking.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Banking", "Risk management"],
      curriculum: {
        "Year 1": ["Introduction to Banking", "Principles of Finance", "Business Mathematics", "Microeconomics"],
        "Year 2": ["Bank Operations", "Risk Management", "Financial Markets", "Research Methods"],
        "Year 3": ["Investment Banking", "Corporate Finance", "Bank Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    procurement_supply: {
      title: "Bachelor of Procurement, Logistics and Supplies Chain Management",
      titleSo: "Shahaadada Koowaad ee Iibsiga, Saadka iyo Maareynta Silsiladda Sahaminta",
      duration: "3 Years",
      credits: "120 Credits",
      description: "End-to-end supply chain optimisation and logistics strategy.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Supply chain", "Logistics"],
      curriculum: {
        "Year 1": ["Introduction to Procurement", "Logistics Basics", "Business Mathematics", "Microeconomics"],
        "Year 2": ["Supply Chain Management", "Inventory Management", "Purchasing", "Research Methods"],
        "Year 3": ["Logistics Strategy", "Procurement Law", "Contract Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    marketing: {
      title: "Bachelor of Marketing",
      titleSo: "Shahaadada Koowaad ee Suuqgeynta",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Consumer behaviour, brand management, and digital marketing.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Branding", "Digital marketing"],
      curriculum: {
        "Year 1": ["Principles of Marketing", "Consumer Behavior", "Business Communication", "Microeconomics"],
        "Year 2": ["Brand Management", "Digital Marketing", "Market Research", "Advertising"],
        "Year 3": ["Sales Management", "Strategic Marketing", "Retail Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    // Faculty of Allied Health Science
    public_health: {
      title: "Bachelor of Public Health",
      titleSo: "Shahaadada Koowaad ee Caafimaadka Dadweynaha",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Community health, disease prevention, and health promotion.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Epidemiology", "Health promotion"],
      curriculum: {
        "Year 1": ["Introduction to Public Health", "Biology", "Chemistry", "Health Communication"],
        "Year 2": ["Epidemiology", "Biostatistics", "Community Health", "Nutrition"],
        "Year 3": ["Health Policy", "Environmental Health", "Disease Prevention", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    nutrition_food: {
      title: "Bachelor of Nutrition and Food Science",
      titleSo: "Shahaadada Koowaad ee Nafaqada iyo Cilmiga Cuntada",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Human nutrition, dietetics, and food safety.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Dietetics", "Food safety"],
      curriculum: {
        "Year 1": ["Introduction to Nutrition", "Biology", "Chemistry", "Food Science"],
        "Year 2": ["Dietetics", "Food Safety", "Community Nutrition", "Research Methods"],
        "Year 3": ["Clinical Nutrition", "Public Health Nutrition", "Food Microbiology", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    health_service_mgmt: {
      title: "Bachelor of Science in Health Service & Management",
      titleSo: "Shahaadada Koowaad ee Maamulka Adeegyada Caafimaadka",
      duration: "3 Years",
      credits: "120 Credits",
      description: "Healthcare systems, policy, and administration.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Health policy", "Administration"],
      curriculum: {
        "Year 1": ["Introduction to Health Services", "Biology", "Chemistry", "Health Communication"],
        "Year 2": ["Health Policy", "Hospital Management", "Epidemiology", "Research Methods"],
        "Year 3": ["Healthcare Administration", "Health Economics", "Quality Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    // Faculty of Computing & IT
    software_engineering: {
      title: "Bachelor of Science in Software Engineering",
      titleSo: "Shahaadada Koowaad ee Injineerinka Software-ka",
      duration: "3 Years",
      credits: "128 Credits",
      description: "Software development lifecycle, DevOps, and quality assurance.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Software development", "DevOps"],
      curriculum: {
        "Year 1": ["Introduction to Programming", "Mathematics for Computing", "Computer Science Basics", "Web Development"],
        "Year 2": ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
        "Year 3": ["Software Testing", "DevOps", "Project Management", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    computer_science: {
      title: "Bachelor of Science in Computer Science",
      titleSo: "Shahaadada Koowaad ee Cilmiga Kombiyuutarka",
      duration: "3 Years",
      credits: "128 Credits",
      description: "Algorithms, data structures, and emerging technologies.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Algorithms", "Data structures"],
      curriculum: {
        "Year 1": ["Introduction to Computer Science", "Mathematics for Computing", "Programming Fundamentals", "Web Development"],
        "Year 2": ["Data Structures", "Algorithms", "Operating Systems", "Database Systems"],
        "Year 3": ["Artificial Intelligence", "Networks", "Software Engineering", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
    information_technology: {
      title: "Bachelor of Science in Information Technology",
      titleSo: "Shahaadada Koowaad ee Tignoolajiyada Macluumaadka",
      duration: "3 Years",
      credits: "128 Credits",
      description: "Network administration, cybersecurity, and IT project management.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: ["Networking", "Cybersecurity"],
      curriculum: {
        "Year 1": ["Introduction to IT", "Mathematics for IT", "Programming Fundamentals", "Web Development"],
        "Year 2": ["Networking", "Cybersecurity", "Database Systems", "Operating Systems"],
        "Year 3": ["IT Project Management", "Cloud Computing", "System Administration", "Capstone Project"]
      },
      careers: [],
      requirements: [],
      facilities: [],
    },
  }

  const programKeys = Object.keys(undergraduatePrograms) as Array<keyof typeof undergraduatePrograms>
  const [selectedProgram, setSelectedProgram] = useState(programKeys[0])

  return (
    <div className="min-h-screen bg-white">
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
                Undergraduate Programs
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bachelor's <span className="text-emerald-300">Degrees</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Shahaadooyinka Koowaad</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Launch your career with our comprehensive undergraduate programs designed to provide you with the
              knowledge, skills, and experience needed for success in today's competitive job market.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                Explore Programs
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Selection */}
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
              Choose Your{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Path</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Jidkaaga Dooro</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select a program below to explore detailed curriculum, career opportunities, and admission requirements.
            </p>
          </motion.div>

          {/* Program Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {programKeys.map((key) => {
              const program = undergraduatePrograms[key]
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedProgram(key)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedProgram === key
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-sm font-semibold">{program.title.split(" ").slice(-2).join(" ")}</div>
                </motion.button>
              )
            })}
          </div>

          {/* Selected Program Details */}
          <motion.div
            key={selectedProgram}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {(() => {
              const program = undergraduatePrograms[selectedProgram as keyof typeof undergraduatePrograms]
              if (!program) return null
              return (
                <>
                  {/* Program Header */}
                  <div className="relative h-64 bg-gradient-to-r from-emerald-600 to-red-600">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      fill
                      className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-red-900/80" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{program.title}</h3>
                      <p className="text-xl text-emerald-200">{program.titleSo}</p>
                      <div className="flex space-x-4 mt-4">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white">
                          <Clock className="h-4 w-4 mr-2" />
                          {program.duration}
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {program.credits}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Program Content */}
                  <div className="p-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h4>
                          <p className="text-gray-600 leading-relaxed">{program.description}</p>
                        </div>

                        {/* Learning Objectives */}
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h4>
                          <div className="grid gap-3">
                            {program.objectives.map((objective, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{objective}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Curriculum */}
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">Curriculum Structure</h4>
                          <Tabs defaultValue="Year 1" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              {Object.keys(program.curriculum).map((year) => (
                                <TabsTrigger key={year} value={year} className="text-sm">
                                  {year}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {Object.entries(program.curriculum).map(([year, courses]) => (
                              <TabsContent key={year} value={year} className="mt-4">
                                <div className="grid gap-3 md:grid-cols-2">
                                  {courses.map((course, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                      <BookOpen className="h-4 w-4 text-emerald-600" />
                                      <span className="text-sm text-gray-700">{course}</span>
                                    </div>
                                  ))}
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Quick Facts */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Star className="h-5 w-5 text-emerald-600 mr-2" />
                              Quick Facts
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-semibold">{program.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Credits:</span>
                              <span className="font-semibold">{program.credits}</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Career Opportunities */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Target className="h-5 w-5 text-emerald-600 mr-2" />
                              Career Opportunities
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {program.careers.map((career, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <ChevronRight className="h-4 w-4 text-emerald-600" />
                                  <span className="text-sm text-gray-700">{career}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Admission Requirements */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                              Admission Requirements
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {program.requirements.map((requirement, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{requirement}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Facilities */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Building className="h-5 w-5 text-emerald-600 mr-2" />
                              Program Facilities
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {program.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Lightbulb className="h-4 w-4 text-emerald-600" />
                                  <span className="text-sm text-gray-700">{facility}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Apply Now */}
                        <Card className="bg-gradient-to-r from-emerald-50 to-red-50 border-emerald-200">
                          <CardContent className="p-6 text-center">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Apply?</h4>
                            <p className="text-sm text-gray-600 mb-4">
                              Start your application today and take the first step towards your future.
                            </p>
                            <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                                Apply Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Journey Today</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">Safarkaaga Maanta Bilow</h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Join thousands of successful graduates who started their careers at Unity University Somaliland. Your
              future begins with the right education.
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
    </div>
  )
}
