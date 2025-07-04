"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Clock, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import EnhancedFooter from "@/components/enhanced-footer"

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

export default function UndergraduatePage() {
  const [mounted, setMounted] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState("business")

  useEffect(() => {
    setMounted(true)
  }, [])

  const programs = {
    business: {
      name: "School of Business & Management",
      programs: [
        {
          name: "Business Administration",
          duration: "4 years",
          credits: 120,
          description: "Comprehensive business education covering management, finance, marketing, and operations",
          careers: ["Business Manager", "Consultant", "Entrepreneur", "Project Manager"],
          tuition: "$8,000",
        },
        {
          name: "International Business",
          duration: "4 years",
          credits: 120,
          description: "Global business practices with focus on cross-cultural management and international trade",
          careers: ["International Trade Specialist", "Global Business Analyst", "Export Manager"],
          tuition: "$8,000",
        },
        {
          name: "Entrepreneurship",
          duration: "4 years",
          credits: 120,
          description: "Innovation and startup development with practical business creation experience",
          careers: ["Startup Founder", "Business Development Manager", "Innovation Consultant"],
          tuition: "$8,000",
        },
        {
          name: "Finance",
          duration: "4 years",
          credits: 120,
          description: "Financial analysis, investment management, and corporate finance principles",
          careers: ["Financial Analyst", "Investment Banker", "Financial Planner", "Risk Manager"],
          tuition: "$8,000",
        },
      ],
    },
    engineering: {
      name: "School of Engineering & Technology",
      programs: [
        {
          name: "Computer Science",
          duration: "4 years",
          credits: 128,
          description: "Software development, algorithms, data structures, and emerging technologies",
          careers: ["Software Engineer", "Data Scientist", "Systems Analyst", "Tech Lead"],
          tuition: "$8,500",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          credits: 132,
          description: "Infrastructure design, construction management, and sustainable development",
          careers: ["Civil Engineer", "Project Manager", "Urban Planner", "Construction Manager"],
          tuition: "$8,500",
        },
        {
          name: "Electrical Engineering",
          duration: "4 years",
          credits: 130,
          description: "Power systems, electronics, telecommunications, and renewable energy",
          careers: ["Electrical Engineer", "Power Systems Engineer", "Electronics Designer"],
          tuition: "$8,500",
        },
        {
          name: "Software Engineering",
          duration: "4 years",
          credits: 128,
          description: "Large-scale software systems design, development, and maintenance",
          careers: ["Software Architect", "DevOps Engineer", "Quality Assurance Engineer"],
          tuition: "$8,500",
        },
      ],
    },
    health: {
      name: "School of Health Sciences",
      programs: [
        {
          name: "Nursing",
          duration: "4 years",
          credits: 125,
          description: "Patient care, health promotion, and clinical practice in diverse healthcare settings",
          careers: ["Registered Nurse", "Nurse Practitioner", "Healthcare Administrator"],
          tuition: "$9,000",
        },
        {
          name: "Public Health",
          duration: "4 years",
          credits: 120,
          description: "Community health, epidemiology, and health policy for population wellness",
          careers: ["Public Health Specialist", "Health Educator", "Epidemiologist"],
          tuition: "$8,500",
        },
        {
          name: "Medical Technology",
          duration: "4 years",
          credits: 128,
          description: "Laboratory sciences, diagnostic procedures, and medical equipment operation",
          careers: ["Medical Technologist", "Lab Manager", "Clinical Research Associate"],
          tuition: "$9,000",
        },
        {
          name: "Health Administration",
          duration: "4 years",
          credits: 120,
          description: "Healthcare management, policy, and organizational leadership",
          careers: ["Healthcare Administrator", "Hospital Manager", "Health Policy Analyst"],
          tuition: "$8,500",
        },
      ],
    },
    liberal: {
      name: "School of Liberal Arts",
      programs: [
        {
          name: "English Literature",
          duration: "4 years",
          credits: 120,
          description: "Literary analysis, creative writing, and communication skills development",
          careers: ["Writer", "Editor", "Teacher", "Communications Specialist"],
          tuition: "$7,500",
        },
        {
          name: "History",
          duration: "4 years",
          credits: 120,
          description: "Historical research, analysis, and understanding of global civilizations",
          careers: ["Historian", "Museum Curator", "Archivist", "Research Analyst"],
          tuition: "$7,500",
        },
        {
          name: "Philosophy",
          duration: "4 years",
          credits: 120,
          description: "Critical thinking, ethics, and logical reasoning across cultures",
          careers: ["Philosophy Professor", "Ethics Consultant", "Policy Analyst"],
          tuition: "$7,500",
        },
        {
          name: "Modern Languages",
          duration: "4 years",
          credits: 120,
          description: "Multilingual communication and cross-cultural understanding",
          careers: ["Translator", "International Relations Specialist", "Language Teacher"],
          tuition: "$7,500",
        },
      ],
    },
    social: {
      name: "School of Social Sciences",
      programs: [
        {
          name: "International Relations",
          duration: "4 years",
          credits: 120,
          description: "Global politics, diplomacy, and international cooperation",
          careers: ["Diplomat", "International Analyst", "NGO Coordinator", "Policy Advisor"],
          tuition: "$8,000",
        },
        {
          name: "Psychology",
          duration: "4 years",
          credits: 120,
          description: "Human behavior, mental health, and psychological research methods",
          careers: ["Psychologist", "Counselor", "Research Scientist", "HR Specialist"],
          tuition: "$8,000",
        },
        {
          name: "Sociology",
          duration: "4 years",
          credits: 120,
          description: "Social structures, cultural dynamics, and community development",
          careers: ["Social Worker", "Community Organizer", "Research Analyst"],
          tuition: "$7,500",
        },
        {
          name: "Economics",
          duration: "4 years",
          credits: 120,
          description: "Economic theory, policy analysis, and market dynamics",
          careers: ["Economist", "Financial Analyst", "Policy Researcher", "Business Analyst"],
          tuition: "$8,000",
        },
      ],
    },
    agriculture: {
      name: "School of Agriculture & Environment",
      programs: [
        {
          name: "Sustainable Agriculture",
          duration: "4 years",
          credits: 125,
          description: "Modern farming techniques, crop science, and sustainable food production",
          careers: ["Agricultural Scientist", "Farm Manager", "Agricultural Consultant"],
          tuition: "$8,000",
        },
        {
          name: "Environmental Science",
          duration: "4 years",
          credits: 128,
          description: "Environmental protection, conservation, and sustainability practices",
          careers: ["Environmental Scientist", "Conservation Specialist", "Environmental Consultant"],
          tuition: "$8,000",
        },
        {
          name: "Forestry",
          duration: "4 years",
          credits: 125,
          description: "Forest management, conservation, and sustainable resource utilization",
          careers: ["Forester", "Conservation Officer", "Environmental Manager"],
          tuition: "$8,000",
        },
        {
          name: "Climate Studies",
          duration: "4 years",
          credits: 120,
          description: "Climate science, environmental policy, and adaptation strategies",
          careers: ["Climate Scientist", "Environmental Policy Analyst", "Sustainability Coordinator"],
          tuition: "$8,000",
        },
      ],
    },
  }

  const schools = [
    { id: "business", name: "Business & Management", icon: "💼", students: 1200 },
    { id: "engineering", name: "Engineering & Technology", icon: "⚙️", students: 980 },
    { id: "health", name: "Health Sciences", icon: "🏥", students: 850 },
    { id: "liberal", name: "Liberal Arts", icon: "📚", students: 720 },
    { id: "social", name: "Social Sciences", icon: "🌍", students: 680 },
    { id: "agriculture", name: "Agriculture & Environment", icon: "🌱", students: 570 },
  ]

  const features = [
    {
      title: "Small Class Sizes",
      description: "Average 20:1 student-to-faculty ratio for personalized attention",
      icon: Users,
      stat: "20:1 Ratio",
    },
    {
      title: "Hands-On Learning",
      description: "Practical experience through labs, internships, and projects",
      icon: BookOpen,
      stat: "100% Practical",
    },
    {
      title: "Industry Connections",
      description: "Strong partnerships with leading companies and organizations",
      icon: Award,
      stat: "200+ Partners",
    },
    {
      title: "Career Support",
      description: "Comprehensive career services and job placement assistance",
      icon: Star,
      stat: "95% Placement",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900">
          {mounted && (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('/placeholder.svg?height=1200&width=1920')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center text-white">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                Undergraduate Programs
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Bachelor's
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Degrees
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Build a strong foundation for your career with our comprehensive undergraduate programs designed to
                prepare you for success in the global marketplace.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Apply Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Download Brochure
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Undergraduate Excellence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our undergraduate programs provide the foundation for lifelong success
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Undergraduate Programs", value: 25, suffix: "+", description: "Across 6 schools" },
              { label: "Undergraduate Students", value: 3200, suffix: "+", description: "Currently enrolled" },
              { label: "Graduate Employment Rate", value: 95, suffix: "%", description: "Within 6 months" },
              { label: "Average Class Size", value: 20, suffix: "", description: "Students per class" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Selection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Choose Your School</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore undergraduate programs across our six specialized schools
              </p>
            </motion.div>
          </div>

          {/* School Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full border-2 transition-all ${selectedSchool === school.id
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300 text-gray-700"
                  }`}
              >
                <span className="text-2xl">{school.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{school.name}</div>
                  <div className="text-sm text-gray-500">{school.students} students</div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected School Programs */}
          <motion.div
            key={selectedSchool}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {programs[selectedSchool as keyof typeof programs].name}
              </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {programs[selectedSchool as keyof typeof programs].programs.map((program, index) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold text-gray-900">{program.name}</h4>
                    <Badge className="bg-purple-100 text-purple-700">{program.tuition}/year</Badge>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{program.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{program.credits}</div>
                      <div className="text-sm text-gray-600">Credits</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Career Opportunities:</h5>
                    <div className="flex flex-wrap gap-2">
                      {program.careers.map((career, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link href="/admissions/apply" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                        Apply Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Our Undergraduate Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinctive features that prepare you for career success
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-lg font-bold text-purple-600">{feature.stat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Student Success Stories</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet our graduates who are making a difference in their fields
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Mensah",
                program: "Computer Science '23",
                achievement: "Software Engineer at Google",
                story: "The hands-on projects and mentorship at Unity University prepared me for the tech industry.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Ahmed Hassan",
                program: "Business Administration '22",
                achievement: "Founder of AgriTech Startup",
                story:
                  "The entrepreneurship program gave me the skills to start my own agricultural technology company.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Fatima Kone",
                program: "International Relations '23",
                achievement: "UN Development Programme",
                story: "Unity's global perspective and internship opportunities opened doors to international careers.",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
              >
                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                  <p className="text-purple-300 font-medium">{story.program}</p>
                  <Badge className="bg-purple-600 text-white mt-2">{story.achievement}</Badge>
                </div>
                <blockquote className="text-gray-300 italic text-center">"{story.story}"</blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Ready to Start Your Undergraduate Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of students who have chosen Unity University for their undergraduate education. Your future
              starts here.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold"
                >
                  Apply for Undergraduate
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
                >
                  Contact Academic Advisor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
