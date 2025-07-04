"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Globe,
  BadgeIcon as Certificate,
  Briefcase,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function ProfessionalPage() {
  const [selectedCategory, setSelectedCategory] = useState("business")

  const professionalPrograms = {
    business: [
      {
        title: "Digital Marketing Certificate",
        titleSo: "Shahaadada Suuq-geynta Dijital-ka",
        duration: "6 Months",
        credits: "18 Credits",
        tuition: "$800",
        format: "Evening & Weekend",
        description:
          "Comprehensive digital marketing program covering social media marketing, SEO/SEM, content strategy, and analytics. Perfect for professionals looking to enhance their marketing skills in the digital age.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Digital Marketing Fundamentals",
          "Social Media Marketing",
          "Search Engine Optimization",
          "Content Marketing Strategy",
          "Email Marketing",
          "Analytics & Measurement",
        ],
        skills: ["Google Ads", "Facebook Marketing", "SEO Tools", "Content Creation", "Analytics"],
        careers: ["Digital Marketing Manager", "Social Media Specialist", "Content Creator", "Marketing Analyst"],
        certification: "Unity University Digital Marketing Certificate",
        prerequisites: ["High School Diploma", "Basic Computer Skills", "English Proficiency"],
      },
      {
        title: "Project Management Professional",
        titleSo: "Maamulka Mashaariicda Xirfadeed",
        duration: "4 Months",
        credits: "12 Credits",
        tuition: "$1,200",
        format: "Hybrid",
        description:
          "Intensive project management certification program aligned with PMI standards. Includes PMP exam preparation and practical project experience.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Project Management Fundamentals",
          "Project Planning & Scheduling",
          "Risk Management",
          "Quality Management",
          "Stakeholder Management",
          "PMP Exam Preparation",
        ],
        skills: ["MS Project", "Agile Methodologies", "Risk Assessment", "Team Leadership", "Budget Management"],
        careers: ["Project Manager", "Program Coordinator", "Operations Manager", "Business Analyst"],
        certification: "Unity University Project Management Certificate + PMP Eligibility",
        prerequisites: ["Bachelor's Degree", "Work Experience", "Professional Interest"],
      },
      {
        title: "Financial Management Certificate",
        titleSo: "Shahaadada Maamulka Maaliyadeed",
        duration: "8 Months",
        credits: "24 Credits",
        tuition: "$1,500",
        format: "Evening",
        description:
          "Comprehensive financial management training covering financial analysis, investment planning, and corporate finance for business professionals.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Financial Analysis",
          "Investment Planning",
          "Corporate Finance",
          "Risk Management",
          "Financial Modeling",
          "Portfolio Management",
        ],
        skills: ["Excel Financial Modeling", "Financial Analysis", "Investment Evaluation", "Risk Assessment"],
        careers: ["Financial Manager", "Investment Advisor", "Budget Analyst", "Financial Consultant"],
        certification: "Unity University Financial Management Certificate",
        prerequisites: ["Bachelor's Degree", "Mathematics Background", "Professional Experience"],
      },
    ],
    technology: [
      {
        title: "Cybersecurity Fundamentals",
        titleSo: "Aasaaska Amniga Cyber-ka",
        duration: "5 Months",
        credits: "15 Credits",
        tuition: "$1,100",
        format: "Online & Lab",
        description:
          "Essential cybersecurity training covering network security, ethical hacking, and incident response. Includes hands-on lab experience and industry certifications.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Network Security",
          "Ethical Hacking",
          "Incident Response",
          "Security Policies",
          "Penetration Testing",
          "Security Auditing",
        ],
        skills: ["Network Security", "Penetration Testing", "Security Tools", "Risk Assessment", "Compliance"],
        careers: ["Cybersecurity Analyst", "Security Consultant", "IT Security Manager", "Penetration Tester"],
        certification: "Unity University Cybersecurity Certificate + CompTIA Security+",
        prerequisites: ["IT Background", "Basic Networking Knowledge", "English Proficiency"],
      },
      {
        title: "Web Development Bootcamp",
        titleSo: "Tababarka Horumarinta Websaydhka",
        duration: "3 Months",
        credits: "12 Credits",
        tuition: "$900",
        format: "Intensive",
        description:
          "Intensive web development program covering modern frameworks and technologies. From HTML/CSS to full-stack development with React and Node.js.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "HTML/CSS/JavaScript",
          "React.js Development",
          "Node.js & Express",
          "Database Management",
          "API Development",
          "Deployment & DevOps",
        ],
        skills: ["React", "Node.js", "JavaScript", "Database Design", "API Development", "Git/GitHub"],
        careers: ["Web Developer", "Frontend Developer", "Full-Stack Developer", "Software Engineer"],
        certification: "Unity University Web Development Certificate",
        prerequisites: ["Basic Computer Skills", "Logical Thinking", "Commitment to Intensive Learning"],
      },
      {
        title: "Data Analytics Certificate",
        titleSo: "Shahaadada Falanqaynta Xogta",
        duration: "6 Months",
        credits: "18 Credits",
        tuition: "$1,300",
        format: "Evening & Weekend",
        description:
          "Comprehensive data analytics program covering statistical analysis, data visualization, and machine learning basics using Python and R.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Statistics for Data Analysis",
          "Python Programming",
          "Data Visualization",
          "SQL & Databases",
          "Machine Learning Basics",
          "Business Intelligence",
        ],
        skills: ["Python", "R", "SQL", "Tableau", "Statistical Analysis", "Data Visualization"],
        careers: ["Data Analyst", "Business Intelligence Analyst", "Research Analyst", "Data Scientist"],
        certification: "Unity University Data Analytics Certificate",
        prerequisites: ["Mathematics Background", "Basic Programming", "Analytical Thinking"],
      },
    ],
    health: [
      {
        title: "Healthcare Management Certificate",
        titleSo: "Shahaadada Maamulka Caafimaadka",
        duration: "7 Months",
        credits: "21 Credits",
        tuition: "$1,400",
        format: "Weekend",
        description:
          "Specialized program for healthcare professionals seeking management roles. Covers healthcare systems, policy, and leadership in medical settings.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Healthcare Systems Management",
          "Health Policy & Regulation",
          "Quality Improvement",
          "Healthcare Finance",
          "Leadership in Healthcare",
          "Health Information Systems",
        ],
        skills: ["Healthcare Management", "Policy Analysis", "Quality Improvement", "Leadership", "Finance"],
        careers: ["Healthcare Administrator", "Hospital Manager", "Health Program Director", "Policy Analyst"],
        certification: "Unity University Healthcare Management Certificate",
        prerequisites: ["Healthcare Background", "Professional Experience", "English Proficiency"],
      },
      {
        title: "Public Health Emergency Preparedness",
        titleSo: "Diyaargarowga Xaaladaha Degdegga ah ee Caafimaadka",
        duration: "4 Months",
        credits: "12 Credits",
        tuition: "$1,000",
        format: "Intensive",
        description:
          "Specialized training in emergency preparedness and response for public health professionals. Covers disaster management and epidemic response.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Emergency Preparedness Planning",
          "Epidemic Response",
          "Disaster Management",
          "Risk Communication",
          "Community Resilience",
          "International Health Regulations",
        ],
        skills: ["Emergency Planning", "Risk Assessment", "Crisis Communication", "Coordination", "Leadership"],
        careers: ["Emergency Coordinator", "Public Health Officer", "Disaster Response Manager", "WHO Consultant"],
        certification: "Unity University Emergency Preparedness Certificate",
        prerequisites: ["Health Background", "Professional Experience", "Crisis Management Interest"],
      },
    ],
    education: [
      {
        title: "Educational Technology Integration",
        titleSo: "Isku-dhafka Tignoolajiyada Waxbarashada",
        duration: "5 Months",
        credits: "15 Credits",
        tuition: "$950",
        format: "Online & Workshop",
        description:
          "Modern educational technology training for teachers and educators. Learn to integrate digital tools and platforms into teaching practice.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Digital Learning Platforms",
          "Interactive Teaching Tools",
          "Online Assessment Methods",
          "Educational Apps & Software",
          "Virtual Classroom Management",
          "Technology Integration Strategies",
        ],
        skills: ["LMS Management", "Digital Tools", "Online Teaching", "Assessment Technology", "Tech Integration"],
        careers: ["Educational Technology Specialist", "Online Instructor", "Curriculum Developer", "Training Manager"],
        certification: "Unity University Educational Technology Certificate",
        prerequisites: ["Teaching Experience", "Basic Computer Skills", "Education Background"],
      },
      {
        title: "Adult Education & Training",
        titleSo: "Waxbarashada Dadka Waaweyn & Tababarka",
        duration: "6 Months",
        credits: "18 Credits",
        tuition: "$1,100",
        format: "Evening",
        description:
          "Specialized program for professionals working with adult learners. Covers adult learning principles, training design, and program evaluation.",
        image: "/placeholder.svg?height=300&width=400",
        modules: [
          "Adult Learning Principles",
          "Training Design & Development",
          "Facilitation Skills",
          "Program Evaluation",
          "Workplace Learning",
          "Professional Development Planning",
        ],
        skills: ["Training Design", "Facilitation", "Adult Learning", "Program Evaluation", "Workplace Training"],
        careers: [
          "Training Manager",
          "Corporate Trainer",
          "Adult Education Coordinator",
          "Professional Development Specialist",
        ],
        certification: "Unity University Adult Education Certificate",
        prerequisites: ["Education/Training Experience", "Communication Skills", "Professional Interest"],
      },
    ],
  }

  const categoryStats = {
    business: { programs: 3, graduates: 450, employment: 94 },
    technology: { programs: 3, graduates: 320, employment: 96 },
    health: { programs: 2, graduates: 180, employment: 92 },
    education: { programs: 2, graduates: 240, employment: 89 },
  }

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
                Professional Development
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional <span className="text-emerald-300">Certificates</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Shahaadooyinka Xirfadeed</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Advance your career with our industry-focused professional development programs. Designed for working
              professionals, our certificates provide practical skills and recognized credentials.
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
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
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
              Professional{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Qaybaha Xirfadeed</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our diverse range of professional development programs across multiple industries and
              specializations.
            </p>
          </motion.div>

          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { key: "business", title: "Business & Management", icon: Briefcase, color: "emerald" },
              { key: "technology", title: "Technology & IT", icon: Zap, color: "blue" },
              { key: "health", title: "Healthcare", icon: Award, color: "red" },
              { key: "education", title: "Education & Training", icon: BookOpen, color: "purple" },
            ].map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                  selectedCategory === category.key
                    ? `bg-${category.color}-600 text-white shadow-lg`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="h-8 w-8 mx-auto mb-3" />
                <div className="text-sm font-semibold">{category.title}</div>
                <div className="text-xs mt-2 opacity-80">
                  {categoryStats[category.key as keyof typeof categoryStats].programs} Programs
                </div>
              </motion.button>
            ))}
          </div>

          {/* Category Stats */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                label: "Programs",
                value: categoryStats[selectedCategory as keyof typeof categoryStats].programs,
                icon: Certificate,
              },
              {
                label: "Graduates",
                value: categoryStats[selectedCategory as keyof typeof categoryStats].graduates,
                icon: Users,
              },
              {
                label: "Employment Rate",
                value: categoryStats[selectedCategory as keyof typeof categoryStats].employment,
                suffix: "%",
                icon: TrendingUp,
              },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-xl p-6">
                <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.suffix || ""}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Programs Grid */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {professionalPrograms[selectedCategory as keyof typeof professionalPrograms].map((program, index) => (
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
                      <Badge className="bg-red-600/90 text-white text-xs">{program.tuition}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{program.title}</h4>
                      <p className="text-white/90 text-sm">{program.titleSo}</p>
                      <Badge className="mt-2 bg-white/20 backdrop-blur-sm text-white text-xs">{program.format}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">{program.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 text-sm mb-2">Key Skills:</h5>
                        <div className="flex flex-wrap gap-2">
                          {program.skills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {program.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-600">{program.credits}</div>
                          <div className="text-xs text-gray-500">Credits</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{program.duration}</div>
                          <div className="text-xs text-gray-500">Duration</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 bg-transparent"
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Programs?
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Maxay Barnaamijyadaenna u Doorataa?</h3>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Clock,
                title: "Flexible Scheduling",
                titleSo: "Jadwal Dabacsan",
                description: "Evening, weekend, and online options designed for working professionals.",
              },
              {
                icon: Award,
                title: "Industry Recognition",
                titleSo: "Aqoonsiga Warshadaha",
                description: "Certificates recognized by leading employers and professional organizations.",
              },
              {
                icon: Users,
                title: "Expert Instructors",
                titleSo: "Macallimiinta Khibradda leh",
                description: "Learn from industry professionals with real-world experience.",
              },
              {
                icon: Target,
                title: "Career Advancement",
                titleSo: "Horumarinta Shaqada",
                description: "94% of graduates report career advancement within 6 months.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <benefit.icon className="h-12 w-12 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <h5 className="text-sm font-semibold text-emerald-600 mb-3">{benefit.titleSo}</h5>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Invest in Your Professional Growth</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">Kobcinta Xirfaddaada ku Maalgeli</h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Take the next step in your career with our professional development programs. Join thousands of
              professionals who have advanced their careers through our certificates.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                  >
                    Enroll Now
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
                    Get Information
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
