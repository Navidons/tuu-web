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
      name: "Faculty of Business and Management",
      programs: [
        {
          name: "Accounting and Finance",
          duration: "3 years",
          credits: 120,
          description: "Comprehensive study of accounting principles, financial reporting, and corporate finance.",
          careers: ["Accountant", "Financial Analyst", "Auditor", "Finance Manager"],
        },
        {
          name: "Human Resource Management",
          duration: "3 years",
          credits: 120,
          description: "Strategic HR planning, talent acquisition, and employee development.",
          careers: ["HR Manager", "Recruitment Specialist", "Training Coordinator"],
        },
        {
          name: "Business Administration",
          duration: "3 years",
          credits: 120,
          description: "Broad-based business education covering management, marketing, and operations.",
          careers: ["Business Manager", "Entrepreneur", "Project Manager"],
        },
        {
          name: "Banking and Finance",
          duration: "3 years",
          credits: 120,
          description: "Banking operations, risk management, and investment strategies.",
          careers: ["Bank Officer", "Risk Analyst", "Investment Banker"],
        },
        {
          name: "Procurement, Logistics and Supply Chain Management",
          duration: "3 years",
          credits: 120,
          description: "End-to-end supply chain optimisation and logistics strategy.",
          careers: ["Supply Chain Analyst", "Logistics Manager", "Procurement Officer"],
        },
        {
          name: "Marketing",
          duration: "3 years",
          credits: 120,
          description: "Consumer behaviour, brand management, and digital marketing techniques.",
          careers: ["Marketing Manager", "Brand Strategist", "Digital Marketer"],
        },
      ],
    },
    social: {
      name: "Faculty of Social Sciences",
      programs: [
        {
          name: "International Relations and Diplomatic Studies",
          duration: "3 years",
          credits: 120,
          description: "Global politics, diplomacy, and conflict resolution.",
          careers: ["Diplomat", "Policy Analyst", "NGO Coordinator"],
        },
        {
          name: "Public Administration and Management",
          duration: "3 years",
          credits: 120,
          description: "Public sector governance, policy formulation, and administrative law.",
          careers: ["Public Administrator", "Policy Advisor", "City Manager"],
        },
        {
          name: "Social Work and Social Administration",
          duration: "3 years",
          credits: 120,
          description: "Community development, social welfare, and advocacy.",
          careers: ["Social Worker", "Community Organizer", "Case Manager"],
        },
        {
          name: "Project Planning and Management",
          duration: "3 years",
          credits: 120,
          description: "Project lifecycle management, monitoring, and evaluation.",
          careers: ["Project Manager", "Program Coordinator", "Operations Analyst"],
        },
        {
          name: "Public Relations and Media Management",
          duration: "3 years",
          credits: 120,
          description: "Strategic communication, media relations, and reputation management.",
          careers: ["PR Specialist", "Communications Manager", "Media Planner"],
        },
      ],
    },
    health: {
      name: "Faculty of Allied Health Science",
      programs: [
        {
          name: "Public Health",
          duration: "3 years",
          credits: 120,
          description: "Epidemiology, health promotion, and disease prevention.",
          careers: ["Public Health Officer", "Health Educator", "Epidemiologist"],
        },
        {
          name: "Nutrition and Food Science",
          duration: "3 years",
          credits: 120,
          description: "Human nutrition, dietetics, and food safety.",
          careers: ["Nutritionist", "Dietician", "Food Safety Inspector"],
        },
        {
          name: "Health Service & Management",
          duration: "3 years",
          credits: 120,
          description: "Healthcare systems, policy, and administration.",
          careers: ["Health Services Manager", "Hospital Administrator", "Health Policy Analyst"],
        },
      ],
    },
    computing: {
      name: "Faculty of Computing & Information Technology",
      programs: [
        {
          name: "Software Engineering",
          duration: "3 years",
          credits: 128,
          description: "Software development lifecycle, DevOps, and quality assurance.",
          careers: ["Software Engineer", "DevOps Engineer", "QA Analyst"],
        },
        {
          name: "Computer Science",
          duration: "3 years",
          credits: 128,
          description: "Algorithms, data structures, and emerging technologies.",
          careers: ["Systems Analyst", "Data Scientist", "Research Engineer"],
        },
        {
          name: "Information Technology",
          duration: "3 years",
          credits: 128,
          description: "Network administration, cybersecurity, and IT project management.",
          careers: ["IT Manager", "Network Administrator", "Security Analyst"],
        },
      ],
    },
  }

  const schools = [
    { id: "business", name: "Business & Management", icon: "💼", students: 1200 },
    { id: "social", name: "Social Sciences", icon: "🌍", students: 800 },
    { id: "health", name: "Allied Health Science", icon: "🏥", students: 650 },
    { id: "computing", name: "Computing & IT", icon: "💻", students: 900 },
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
      <section className="relative py-24 md:py-32 overflow-hidden">
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
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight">
                Bachelor's
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Degrees
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
                Build a strong foundation for your career with our comprehensive undergraduate programs designed to
                prepare you for success in the global marketplace.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Undergraduate Excellence</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our undergraduate programs provide the foundation for lifelong success
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Undergraduate Programs", value: 17, suffix: "+", description: "Across 4 faculties" },
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Choose Your Faculty</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore undergraduate programs across our four specialized faculties
              </p>
            </motion.div>
          </div>

          {/* School Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full border-2 transition-all ${selectedSchool === school.id
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300 text-gray-700"
                  }`}
              >
                <span className="text-xl">{school.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-sm">{school.name}</div>
                  <div className="text-xs text-gray-500">{school.students} students</div>
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
            className="max-w-6xl mx-auto px-4"
          >
            <div className="text-center mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {programs[selectedSchool as keyof typeof programs].name}
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
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
                    <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="flex-1">
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Why Choose Our Undergraduate Programs</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Distinctive features that prepare you for career success
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Student Success Stories</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Meet our graduates who are making a difference in their fields
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Mensah",
                program: "Computer Science '23",
                achievement: "Software Engineer at Google",
                story: "The hands-on projects and mentorship at The Unity University prepared me for the tech industry.",
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
                story: "The Unity University's global perspective and internship opportunities opened doors to international careers.",
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Ready to Start Your Undergraduate Journey?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of students who have chosen The Unity University for their undergraduate education. Your future
              starts here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
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
