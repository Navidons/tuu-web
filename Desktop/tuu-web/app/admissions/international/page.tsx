"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Plane, FileText, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

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

export default function InternationalPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const requirements = [
    {
      title: "Academic Transcripts",
      description: "Official transcripts from all previously attended institutions, translated to English if necessary",
      required: true,
      icon: FileText,
    },
    {
      title: "English Proficiency",
      description: "TOEFL (minimum 80) or IELTS (minimum 6.5) scores for non-native English speakers",
      required: true,
      icon: Globe,
    },
    {
      title: "Passport Copy",
      description: "Valid passport with at least 2 years remaining validity",
      required: true,
      icon: FileText,
    },
    {
      title: "Financial Documentation",
      description: "Bank statements or sponsor letters proving ability to cover expenses",
      required: true,
      icon: FileText,
    },
    {
      title: "Health Certificate",
      description: "Medical examination and vaccination records",
      required: true,
      icon: CheckCircle,
    },
    {
      title: "Visa Application",
      description: "Student visa application after admission confirmation",
      required: true,
      icon: Plane,
    },
  ]

  const services = [
    {
      title: "Pre-Arrival Support",
      description: "Guidance on visa applications, travel arrangements, and pre-departure orientation",
      icon: "✈️",
      features: [
        "Visa application assistance",
        "Travel booking help",
        "Pre-departure checklist",
        "Cultural orientation",
      ],
    },
    {
      title: "Airport Pickup",
      description: "Complimentary airport pickup service for new international students",
      icon: "🚗",
      features: ["Free pickup service", "Direct to campus transport", "Welcome package", "Initial campus tour"],
    },
    {
      title: "Housing Assistance",
      description: "Help finding suitable accommodation on or off campus",
      icon: "🏠",
      features: ["On-campus housing priority", "Off-campus options", "Roommate matching", "Housing contracts help"],
    },
    {
      title: "Academic Integration",
      description: "Support for academic success and cultural adaptation",
      icon: "📚",
      features: ["Academic advising", "Study skills workshops", "Tutoring services", "Language support"],
    },
  ]

  const timeline = [
    {
      month: "January - March",
      title: "Application Period",
      tasks: ["Submit application", "Prepare documents", "Take English proficiency tests"],
      deadline: "March 15",
    },
    {
      month: "April - May",
      title: "Admission Review",
      tasks: ["Application review", "Interview process", "Admission decisions"],
      deadline: "May 30",
    },
    {
      month: "June - July",
      title: "Visa Processing",
      tasks: ["Apply for student visa", "Submit financial documents", "Medical examinations"],
      deadline: "July 31",
    },
    {
      month: "August",
      title: "Pre-Departure",
      tasks: ["Book flights", "Attend orientation", "Final preparations"],
      deadline: "August 20",
    },
  ]

  const countries = [
    { name: "Nigeria", students: 450, flag: "🇳🇬" },
    { name: "Ghana", students: 380, flag: "🇬🇭" },
    { name: "Kenya", students: 320, flag: "🇰🇪" },
    { name: "Ethiopia", students: 280, flag: "🇪🇹" },
    { name: "South Africa", students: 250, flag: "🇿🇦" },
    { name: "Tanzania", students: 220, flag: "🇹🇿" },
    { name: "Uganda", students: 200, flag: "🇺🇬" },
    { name: "Rwanda", students: 180, flag: "🇷🇼" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
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
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm md:text-lg font-bold shadow-2xl mb-4 md:mb-8">
                International Students
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Global Unity
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-12">
                Join students from over 45 countries at The Unity University. We provide comprehensive support to help
                international students thrive academically and culturally.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-6 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold">
                    Start Application
                    <ArrowRight className="ml-2 md:ml-3 h-4 md:h-6 w-4 md:w-6" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-6 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold"
                >
                  Download Guide
                  <FileText className="ml-2 md:ml-3 h-4 md:h-6 w-4 md:w-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Student Statistics */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Our Global Community</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                The Unity University is home to a diverse international community
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "International Students", value: 1200, suffix: "+", description: "From around the world" },
              { label: "Countries Represented", value: 45, suffix: "", description: "Diverse backgrounds" },
              { label: "Graduation Rate", value: 94, suffix: "%", description: "International students" },
              { label: "Employment Rate", value: 92, suffix: "%", description: "Within 6 months" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 md:p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
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

      {/* Application Requirements */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">International Requirements</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Essential documents and criteria for international student applications
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <req.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{req.title}</h3>
                      {req.required && <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{req.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Support Services */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">International Student Services</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support to help you succeed from day one
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6 text-center"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Application Timeline</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Key dates and milestones for international student applications
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((period, index) => (
              <motion.div
                key={period.month}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <Badge className="bg-purple-600 text-white">{period.deadline}</Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{period.title}</h3>
                <p className="text-purple-600 font-semibold mb-4">{period.month}</p>
                <ul className="space-y-2">
                  {period.tasks.map((task, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Represented */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Our International Representation</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Students from across the African continent and beyond
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-3 md:p-6 text-center"
              >
                <div className="text-4xl md:text-5xl mb-2 md:mb-4">{country.flag}</div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">{country.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{country.students} Students</p>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Your Global Journey Starts Here</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12">
              Join our diverse community of international students and transform your academic future at The Unity University.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
              <Link href="/admissions/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-6 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold"
                >
                  Start Application
                  <ArrowRight className="ml-2 md:ml-3 h-4 md:h-6 w-4 md:w-6" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold"
              >
                Contact Admissions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
