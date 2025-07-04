"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function GraduatePage() {
  const [selectedProgram, setSelectedProgram] = useState("mba")

  const graduatePrograms = {
    mba: {
      title: "Master of Business Administration (MBA)",
      titleSo: "Shahaadada Sare ee Maamulka Ganacsiga",
      duration: "2 Years",
      credits: "60 Credits",
      tuition: "$4,500/year",
      description:
        "Our MBA program is designed for experienced professionals seeking to advance their careers in leadership and management. The curriculum combines advanced business theory with practical application, preparing graduates for executive roles in the rapidly growing East African economy.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Develop strategic thinking and leadership capabilities",
        "Master advanced financial analysis and decision-making",
        "Build expertise in global business and emerging markets",
        "Enhance entrepreneurial and innovation skills",
        "Understand digital transformation and technology management",
      ],
      curriculum: {
        "Semester 1": [
          "Strategic Management",
          "Advanced Financial Management",
          "Organizational Leadership",
          "Marketing Strategy",
          "Operations Management",
          "Business Research Methods",
        ],
        "Semester 2": [
          "International Business",
          "Entrepreneurship & Innovation",
          "Digital Business Transformation",
          "Corporate Finance",
          "Supply Chain Management",
          "Business Ethics & Governance",
        ],
        "Semester 3": [
          "Advanced Strategic Planning",
          "Investment Analysis",
          "Change Management",
          "Negotiation & Conflict Resolution",
          "Project Management",
          "Elective Course I",
        ],
        "Semester 4": [
          "Capstone Project",
          "Business Consulting Practicum",
          "Executive Leadership Seminar",
          "Elective Course II",
          "Thesis Research",
          "Professional Development",
        ],
      },
      specializations: [
        "Strategic Management",
        "Financial Management",
        "International Business",
        "Entrepreneurship",
        "Digital Innovation",
        "Healthcare Management",
      ],
      careers: [
        "Chief Executive Officer",
        "Business Development Director",
        "Strategic Planning Manager",
        "Investment Manager",
        "Management Consultant",
        "Operations Director",
      ],
      requirements: [
        "Bachelor's degree from accredited institution",
        "Minimum 3 years professional work experience",
        "GMAT score of 500+ or equivalent",
        "English language proficiency (TOEFL/IELTS)",
        "Two professional references",
        "Statement of purpose",
        "Resume/CV",
      ],
      facilities: [
        "Executive Education Center",
        "Bloomberg Terminal Lab",
        "Case Study Discussion Rooms",
        "Business Simulation Center",
        "Executive Library",
      ],
      admissionDeadlines: {
        "Fall 2024": "August 15, 2024",
        "Spring 2025": "December 15, 2024",
      },
    },
    mph: {
      title: "Master of Public Health (MPH)",
      titleSo: "Shahaadada Sare ee Caafimaadka Dadweynaha",
      duration: "2 Years",
      credits: "48 Credits",
      tuition: "$4,200/year",
      description:
        "Our MPH program addresses the critical public health challenges facing Somaliland and the Horn of Africa. Students develop expertise in epidemiology, health policy, and community health interventions while gaining practical experience through field placements and research projects.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Master epidemiological methods and disease surveillance",
        "Develop health policy analysis and program evaluation skills",
        "Build expertise in community health assessment and intervention",
        "Understand global health systems and international cooperation",
        "Advance research capabilities in public health",
      ],
      curriculum: {
        "Semester 1": [
          "Advanced Epidemiology",
          "Biostatistics",
          "Health Policy & Management",
          "Environmental Health",
          "Social & Behavioral Health",
          "Research Methods in Public Health",
        ],
        "Semester 2": [
          "Global Health",
          "Health Economics",
          "Program Planning & Evaluation",
          "Infectious Disease Control",
          "Health Communication",
          "Maternal & Child Health",
        ],
        "Semester 3": [
          "Advanced Biostatistics",
          "Health Systems Strengthening",
          "Emergency Preparedness",
          "Specialization Course I",
          "Field Practicum",
          "Thesis Proposal",
        ],
        "Semester 4": [
          "Capstone Project",
          "Advanced Field Experience",
          "Health Leadership",
          "Specialization Course II",
          "Thesis Research",
          "Professional Seminar",
        ],
      },
      specializations: [
        "Epidemiology",
        "Health Policy & Management",
        "Global Health",
        "Environmental Health",
        "Maternal & Child Health",
        "Health Education & Promotion",
      ],
      careers: [
        "Public Health Director",
        "Epidemiologist",
        "Health Policy Analyst",
        "Program Manager (NGO/WHO)",
        "Research Scientist",
        "Health Consultant",
      ],
      requirements: [
        "Bachelor's degree in health-related field",
        "Minimum 2 years health sector experience",
        "GRE score (recommended)",
        "English language proficiency",
        "Two academic/professional references",
        "Personal statement",
        "Health service experience (preferred)",
      ],
      facilities: [
        "Public Health Research Lab",
        "Epidemiology Training Center",
        "Community Health Clinic",
        "Health Data Analysis Lab",
        "Field Research Stations",
      ],
      admissionDeadlines: {
        "Fall 2024": "July 30, 2024",
        "Spring 2025": "November 30, 2024",
      },
    },
    med: {
      title: "Master of Education (M.Ed)",
      titleSo: "Shahaadada Sare ee Waxbarashada",
      duration: "2 Years",
      credits: "45 Credits",
      tuition: "$3,800/year",
      description:
        "Our M.Ed program prepares educational leaders and advanced practitioners for the evolving needs of Somaliland's education system. The program emphasizes research-based practice, educational innovation, and leadership development for sustainable educational improvement.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Develop advanced pedagogical knowledge and skills",
        "Master educational research and evaluation methods",
        "Build leadership capabilities for educational institutions",
        "Understand curriculum development and instructional design",
        "Advance expertise in educational technology and innovation",
      ],
      curriculum: {
        "Semester 1": [
          "Advanced Educational Psychology",
          "Curriculum Theory & Development",
          "Educational Research Methods",
          "Leadership in Education",
          "Assessment & Evaluation",
          "Educational Technology",
        ],
        "Semester 2": [
          "Educational Policy & Reform",
          "Instructional Design",
          "Multicultural Education",
          "Special Needs Education",
          "School Administration",
          "Quantitative Research Methods",
        ],
        "Semester 3": [
          "Advanced Teaching Methods",
          "Educational Innovation",
          "Community Engagement",
          "Specialization Course I",
          "Action Research Project",
          "Thesis Proposal",
        ],
        "Semester 4": [
          "Educational Leadership Practicum",
          "Capstone Project",
          "Professional Development",
          "Specialization Course II",
          "Thesis Research",
          "Portfolio Development",
        ],
      },
      specializations: [
        "Educational Leadership",
        "Curriculum & Instruction",
        "Educational Technology",
        "Special Education",
        "Adult Education",
        "Educational Psychology",
      ],
      careers: [
        "School Principal/Administrator",
        "Education Director",
        "Curriculum Coordinator",
        "Educational Consultant",
        "Training Manager",
        "Education Policy Analyst",
      ],
      requirements: [
        "Bachelor's degree in Education or related field",
        "Teaching license or equivalent certification",
        "Minimum 3 years teaching experience",
        "English and Somali language proficiency",
        "Two professional references",
        "Teaching portfolio",
        "Statement of educational philosophy",
      ],
      facilities: [
        "Education Research Center",
        "Teaching Practice Labs",
        "Educational Technology Studio",
        "Curriculum Resource Library",
        "Student Assessment Center",
      ],
      admissionDeadlines: {
        "Fall 2024": "August 1, 2024",
        "Spring 2025": "December 1, 2024",
      },
    },
    meng: {
      title: "Master of Engineering Management",
      titleSo: "Shahaadada Sare ee Maamulka Injineerinta",
      duration: "2 Years",
      credits: "54 Credits",
      tuition: "$4,800/year",
      description:
        "This program bridges engineering and management, preparing technical professionals for leadership roles in engineering organizations. Students develop skills in project management, technology innovation, and strategic planning while maintaining technical expertise.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Integrate engineering principles with management practices",
        "Develop project and program management expertise",
        "Master technology innovation and commercialization",
        "Build leadership skills for technical organizations",
        "Understand systems thinking and optimization",
      ],
      curriculum: {
        "Semester 1": [
          "Engineering Management Principles",
          "Project Management",
          "Financial Management for Engineers",
          "Operations Research",
          "Quality Management",
          "Technical Communication",
        ],
        "Semester 2": [
          "Technology Innovation",
          "Supply Chain Management",
          "Risk Management",
          "Human Resources in Technical Organizations",
          "Engineering Economics",
          "Research Methods",
        ],
        "Semester 3": [
          "Strategic Technology Management",
          "Advanced Project Management",
          "Entrepreneurship for Engineers",
          "Specialization Course I",
          "Industry Practicum",
          "Thesis Proposal",
        ],
        "Semester 4": [
          "Capstone Design Project",
          "Technology Commercialization",
          "Leadership in Engineering",
          "Specialization Course II",
          "Thesis Research",
          "Professional Development",
        ],
      },
      specializations: [
        "Construction Management",
        "Technology Innovation",
        "Infrastructure Development",
        "Renewable Energy Systems",
        "Water Resources Management",
        "Transportation Systems",
      ],
      careers: [
        "Engineering Manager",
        "Project Director",
        "Technology Consultant",
        "Operations Manager",
        "R&D Manager",
        "Infrastructure Planner",
      ],
      requirements: [
        "Bachelor's degree in Engineering",
        "Professional engineering experience (2+ years)",
        "GRE score (recommended)",
        "English language proficiency",
        "Two professional references",
        "Statement of purpose",
        "Professional portfolio",
      ],
      facilities: [
        "Engineering Management Lab",
        "Project Simulation Center",
        "Technology Innovation Hub",
        "CAD/CAM Laboratory",
        "Materials Testing Facility",
      ],
      admissionDeadlines: {
        "Fall 2024": "July 15, 2024",
        "Spring 2025": "November 15, 2024",
      },
    },
  }

  const programKeys = Object.keys(graduatePrograms) as Array<keyof typeof graduatePrograms>

  const graduateStats = [
    { number: 4, label: "Graduate Programs", labelSo: "Barnaamijyada Sare", icon: GraduationCap },
    { number: 45, label: "Graduate Faculty", labelSo: "Macallimiinta Sare", icon: Users },
    { number: 320, label: "Graduate Students", labelSo: "Ardayda Sare", icon: BookOpen },
    { number: 92, label: "Employment Rate", labelSo: "Heerka Shaqo-helida", icon: TrendingUp, suffix: "%" },
  ]

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
                Graduate Programs
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master's <span className="text-emerald-300">Degrees</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Shahaadooyinka Sare</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Advance your career with our comprehensive graduate programs designed for working professionals and
              emerging leaders. Our master's degrees combine rigorous academics with practical application.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                Explore Programs
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Link href="/admissions/apply">
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

      {/* Graduate Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {graduateStats.map((stat, index) => (
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
                  {stat.number}
                  {stat.suffix || "+"}
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
              Advanced{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Degrees
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Shahaadooyinka Horumarsan</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our prestigious graduate programs designed for experienced professionals seeking to advance
              their careers and make greater impact.
            </p>
          </motion.div>

          {/* Program Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {programKeys.map((key) => {
              const program = graduatePrograms[key]
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
                  <div className="text-sm font-semibold">
                    {program.title.includes("MBA")
                      ? "MBA"
                      : program.title.includes("MPH")
                        ? "MPH"
                        : program.title.includes("M.Ed")
                          ? "M.Ed"
                          : "M.Eng"}
                  </div>
                  <div className="text-xs mt-1 opacity-80">
                    {program.title.includes("MBA")
                      ? "Business"
                      : program.title.includes("MPH")
                        ? "Public Health"
                        : program.title.includes("M.Ed")
                          ? "Education"
                          : "Engineering"}
                  </div>
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
              const program = graduatePrograms[selectedProgram as keyof typeof graduatePrograms]
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
                        <Badge className="bg-white/20 backdrop-blur-sm text-white">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {program.tuition}
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
                          <Tabs defaultValue="Semester 1" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              {Object.keys(program.curriculum).map((semester) => (
                                <TabsTrigger key={semester} value={semester} className="text-sm">
                                  {semester}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {Object.entries(program.curriculum).map(([semester, courses]) => (
                              <TabsContent key={semester} value={semester} className="mt-4">
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

                        {/* Specializations */}
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">Specialization Areas</h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            {program.specializations.map((specialization, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                                <Star className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-gray-700">{specialization}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Quick Facts */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Award className="h-5 w-5 text-emerald-600 mr-2" />
                              Program Details
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
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tuition:</span>
                              <span className="font-semibold">{program.tuition}</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Admission Deadlines */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                              Application Deadlines
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {Object.entries(program.admissionDeadlines).map(([term, deadline]) => (
                                <div key={term} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="text-sm font-medium text-gray-700">{term}</span>
                                  <span className="text-sm text-emerald-600 font-semibold">{deadline}</span>
                                </div>
                              ))}
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

                        {/* Apply Now */}
                        <Card className="bg-gradient-to-r from-emerald-50 to-red-50 border-emerald-200">
                          <CardContent className="p-6 text-center">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Apply?</h4>
                            <p className="text-sm text-gray-600 mb-4">
                              Take the next step in your career with our graduate programs.
                            </p>
                            <Link href="/admissions/apply">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Advance Your Career Today</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">Shaqadaada Maanta Horumarinee</h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Join our community of graduate students and alumni who are making significant contributions to their
              fields and communities across East Africa and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
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
                    Schedule Consultation
                    <Globe className="ml-3 h-5 w-5" />
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
