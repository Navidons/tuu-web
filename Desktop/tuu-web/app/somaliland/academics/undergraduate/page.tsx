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
  const [selectedProgram, setSelectedProgram] = useState("business")

  const undergraduatePrograms = {
    business: {
      title: "Bachelor of Business Administration",
      titleSo: "Shahaadada Koowaad ee Maamulka Ganacsiga",
      duration: "4 Years",
      credits: "120 Credits",
      tuition: "$2,500/year",
      description:
        "Comprehensive business education preparing future leaders and entrepreneurs for Somaliland's growing economy. Our program combines theoretical knowledge with practical application through internships, case studies, and real-world projects.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Develop strong leadership and management skills",
        "Understand global business practices and local market dynamics",
        "Master financial analysis and strategic planning",
        "Build entrepreneurial mindset and innovation capabilities",
      ],
      curriculum: {
        "Year 1": [
          "Introduction to Business",
          "Principles of Economics",
          "Business Mathematics",
          "Communication Skills",
          "Computer Applications",
          "Somali Business Culture",
        ],
        "Year 2": [
          "Financial Accounting",
          "Marketing Principles",
          "Organizational Behavior",
          "Business Statistics",
          "Business Law",
          "Microeconomics",
        ],
        "Year 3": [
          "Strategic Management",
          "International Business",
          "Financial Management",
          "Operations Management",
          "Human Resource Management",
          "Business Ethics",
        ],
        "Year 4": [
          "Entrepreneurship",
          "Project Management",
          "Business Research Methods",
          "Capstone Project",
          "Internship",
          "Graduation Thesis",
        ],
      },
      careers: [
        "Business Manager",
        "Entrepreneur",
        "Financial Analyst",
        "Marketing Specialist",
        "Operations Manager",
        "Business Consultant",
      ],
      requirements: [
        "High School Diploma with minimum GPA of 3.0",
        "English Language Proficiency Test",
        "Mathematics Placement Test",
        "Personal Statement",
        "Two Letters of Recommendation",
      ],
      facilities: [
        "Modern Business Simulation Lab",
        "Bloomberg Terminal Access",
        "Entrepreneurship Incubator",
        "Case Study Discussion Rooms",
      ],
    },
    technology: {
      title: "Bachelor of Information Technology",
      titleSo: "Shahaadada Koowaad ee Tignoolajiyada Macluumaadka",
      duration: "4 Years",
      credits: "128 Credits",
      tuition: "$2,800/year",
      description:
        "Cutting-edge technology education covering software development, cybersecurity, and digital innovation. Our program prepares students for the rapidly evolving tech industry with hands-on experience and industry partnerships.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Master programming languages and software development",
        "Understand cybersecurity principles and practices",
        "Develop skills in database management and system analysis",
        "Build expertise in emerging technologies like AI and IoT",
      ],
      curriculum: {
        "Year 1": [
          "Introduction to Computing",
          "Programming Fundamentals",
          "Computer Mathematics",
          "Digital Logic Design",
          "Web Development Basics",
          "IT Ethics",
        ],
        "Year 2": [
          "Object-Oriented Programming",
          "Database Systems",
          "Computer Networks",
          "Data Structures",
          "Operating Systems",
          "Software Engineering",
        ],
        "Year 3": [
          "Cybersecurity Fundamentals",
          "Mobile App Development",
          "Artificial Intelligence",
          "Cloud Computing",
          "System Administration",
          "IT Project Management",
        ],
        "Year 4": [
          "Advanced Cybersecurity",
          "Machine Learning",
          "Capstone Project",
          "Industry Internship",
          "Emerging Technologies",
          "Professional Certification Prep",
        ],
      },
      careers: [
        "Software Developer",
        "IT Consultant",
        "Cybersecurity Analyst",
        "Systems Administrator",
        "Database Administrator",
        "Mobile App Developer",
      ],
      requirements: [
        "High School Diploma with strong mathematics background",
        "Basic Computer Skills Assessment",
        "English Language Proficiency",
        "Logical Reasoning Test",
        "Personal Statement",
      ],
      facilities: [
        "State-of-the-art Computer Labs",
        "Cybersecurity Training Center",
        "Mobile Development Studio",
        "Cloud Computing Infrastructure",
      ],
    },
    health: {
      title: "Bachelor of Public Health",
      titleSo: "Shahaadada Koowaad ee Caafimaadka Dadweynaha",
      duration: "4 Years",
      credits: "130 Credits",
      tuition: "$3,000/year",
      description:
        "Comprehensive public health education focusing on community health, disease prevention, and health promotion. Our program addresses the unique health challenges facing Somaliland and the broader Horn of Africa region.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Understand epidemiology and disease prevention strategies",
        "Develop community health assessment and intervention skills",
        "Master health policy analysis and program evaluation",
        "Build cultural competency in health service delivery",
      ],
      curriculum: {
        "Year 1": [
          "Introduction to Public Health",
          "Human Anatomy & Physiology",
          "Health Communication",
          "Biostatistics",
          "Environmental Health",
          "Community Health Basics",
        ],
        "Year 2": [
          "Epidemiology",
          "Health Behavior",
          "Maternal & Child Health",
          "Nutrition",
          "Health Education Methods",
          "Research Methods",
        ],
        "Year 3": [
          "Health Policy & Management",
          "Global Health",
          "Infectious Disease Control",
          "Health Program Planning",
          "Field Epidemiology",
          "Health Economics",
        ],
        "Year 4": [
          "Advanced Epidemiology",
          "Health Systems Management",
          "Capstone Project",
          "Field Practicum",
          "Health Emergency Preparedness",
          "Professional Ethics",
        ],
      },
      careers: [
        "Public Health Officer",
        "Health Educator",
        "Epidemiologist",
        "Community Health Worker",
        "Health Program Manager",
        "Health Policy Analyst",
      ],
      requirements: [
        "High School Diploma with science background",
        "Biology and Chemistry prerequisites",
        "English Language Proficiency",
        "Health Service Volunteer Experience (preferred)",
        "Personal Statement",
      ],
      facilities: [
        "Public Health Laboratory",
        "Community Health Training Center",
        "Epidemiology Research Lab",
        "Health Simulation Center",
      ],
    },
    engineering: {
      title: "Bachelor of Civil Engineering",
      titleSo: "Shahaadada Koowaad ee Injineerinta Dhismaha",
      duration: "4 Years",
      credits: "135 Credits",
      tuition: "$3,200/year",
      description:
        "Comprehensive engineering education focusing on infrastructure development and construction management. Our program addresses Somaliland's growing infrastructure needs with emphasis on sustainable and resilient design.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Master structural analysis and design principles",
        "Understand construction management and project planning",
        "Develop expertise in sustainable engineering practices",
        "Build skills in modern engineering software and tools",
      ],
      curriculum: {
        "Year 1": [
          "Engineering Mathematics I",
          "Physics for Engineers",
          "Engineering Drawing",
          "Introduction to Civil Engineering",
          "Chemistry for Engineers",
          "Computer Programming",
        ],
        "Year 2": [
          "Engineering Mathematics II",
          "Mechanics of Materials",
          "Fluid Mechanics",
          "Surveying",
          "Engineering Geology",
          "Construction Materials",
        ],
        "Year 3": [
          "Structural Analysis",
          "Concrete Design",
          "Steel Design",
          "Geotechnical Engineering",
          "Transportation Engineering",
          "Water Resources Engineering",
        ],
        "Year 4": [
          "Advanced Structural Design",
          "Construction Management",
          "Environmental Engineering",
          "Capstone Design Project",
          "Professional Practice",
          "Engineering Internship",
        ],
      },
      careers: [
        "Civil Engineer",
        "Project Manager",
        "Construction Supervisor",
        "Infrastructure Planner",
        "Structural Designer",
        "Construction Consultant",
      ],
      requirements: [
        "High School Diploma with strong mathematics and physics",
        "Mathematics Placement Test (Advanced Level)",
        "Physics Proficiency Test",
        "English Language Proficiency",
        "Spatial Reasoning Assessment",
      ],
      facilities: [
        "Structural Engineering Laboratory",
        "Materials Testing Lab",
        "Surveying Equipment Center",
        "CAD Design Studio",
      ],
    },
    education: {
      title: "Bachelor of Education",
      titleSo: "Shahaadada Koowaad ee Waxbarashada",
      duration: "4 Years",
      credits: "125 Credits",
      tuition: "$2,200/year",
      description:
        "Comprehensive teacher preparation program designed to develop qualified educators for Somaliland's schools. Our program combines pedagogical theory with extensive practical teaching experience.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Master effective teaching methodologies and strategies",
        "Understand child development and learning psychology",
        "Develop classroom management and assessment skills",
        "Build cultural competency and inclusive education practices",
      ],
      curriculum: {
        "Year 1": [
          "Introduction to Education",
          "Child Development",
          "Educational Psychology",
          "Somali Language & Literature",
          "Mathematics for Teachers",
          "Communication Skills",
        ],
        "Year 2": [
          "Curriculum Development",
          "Teaching Methods",
          "Classroom Management",
          "Educational Technology",
          "Assessment & Evaluation",
          "Special Needs Education",
        ],
        "Year 3": [
          "Subject Specialization",
          "Practicum I",
          "Educational Research",
          "School Administration",
          "Multicultural Education",
          "Educational Philosophy",
        ],
        "Year 4": [
          "Advanced Teaching Methods",
          "Practicum II",
          "Action Research Project",
          "Professional Ethics",
          "Educational Leadership",
          "Student Teaching",
        ],
      },
      careers: [
        "Primary School Teacher",
        "Secondary School Teacher",
        "Education Administrator",
        "Curriculum Specialist",
        "Educational Consultant",
        "Training Coordinator",
      ],
      requirements: [
        "High School Diploma with good academic standing",
        "Subject area specialization preference",
        "English and Somali language proficiency",
        "Teaching aptitude assessment",
        "Character reference letters",
      ],
      facilities: [
        "Teaching Practice Schools",
        "Educational Technology Lab",
        "Curriculum Resource Center",
        "Microteaching Studios",
      ],
    },
    agriculture: {
      title: "Bachelor of Agriculture & Environmental Science",
      titleSo: "Shahaadada Koowaad ee Beeraha & Sayniska Deegaanka",
      duration: "4 Years",
      credits: "132 Credits",
      tuition: "$2,600/year",
      description:
        "Comprehensive program addressing sustainable agriculture and environmental management. Our curriculum focuses on food security, climate adaptation, and sustainable farming practices relevant to Somaliland's arid and semi-arid conditions.",
      image: "/placeholder.svg?height=400&width=600",
      objectives: [
        "Master sustainable agriculture and farming techniques",
        "Understand environmental conservation and management",
        "Develop expertise in crop and livestock production",
        "Build skills in agricultural technology and innovation",
      ],
      curriculum: {
        "Year 1": [
          "Introduction to Agriculture",
          "Plant Biology",
          "Animal Science",
          "Soil Science",
          "Agricultural Chemistry",
          "Environmental Science Basics",
        ],
        "Year 2": [
          "Crop Production",
          "Livestock Management",
          "Agricultural Economics",
          "Plant Pathology",
          "Water Management",
          "Agricultural Statistics",
        ],
        "Year 3": [
          "Sustainable Agriculture",
          "Climate Change Adaptation",
          "Agricultural Technology",
          "Food Science",
          "Range Management",
          "Agricultural Extension",
        ],
        "Year 4": [
          "Advanced Crop Management",
          "Agricultural Research Methods",
          "Agribusiness Management",
          "Capstone Project",
          "Field Practicum",
          "Agricultural Policy",
        ],
      },
      careers: [
        "Agricultural Specialist",
        "Environmental Consultant",
        "Farm Manager",
        "Agricultural Extension Officer",
        "Research Scientist",
        "Agribusiness Manager",
      ],
      requirements: [
        "High School Diploma with science background",
        "Biology and Chemistry prerequisites",
        "Interest in agriculture and environment",
        "Physical fitness for field work",
        "English Language Proficiency",
      ],
      facilities: ["Experimental Farm", "Greenhouse Complex", "Soil & Plant Analysis Lab", "Livestock Research Center"],
    },
  }

  const programKeys = Object.keys(undergraduatePrograms) as Array<keyof typeof undergraduatePrograms>

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
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tuition:</span>
                              <span className="font-semibold">{program.tuition}</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Journey Today</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">Safarkaaga Maanta Bilow</h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Join thousands of successful graduates who started their careers at Unity University Somaliland. Your
              future begins with the right education.
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
