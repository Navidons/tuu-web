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
                International Students
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Global Unity
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Join students from over 45 countries at Unity University. We provide comprehensive support to help
                international students thrive academically and culturally.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Start Application
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Download Guide
                  <FileText className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Student Statistics */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Global Community</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unity University is home to a diverse international community
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Application Requirements */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Application Requirements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about applying as an international student
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
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
      </section>

      {/* Student Support Services */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Student Support Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support from arrival to graduation
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center"
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Application Timeline</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plan your application journey with our recommended timeline
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>

              {timeline.map((period, index) => (
                <motion.div
                  key={period.month}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
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
                  </div>

                  {/* Month Badge */}
                  <div className={`w-2/12 flex justify-center ${index % 2 === 0 ? "order-last" : "order-first"}`}>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg text-center">
                      Step {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Represented */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Countries Represented</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our top international student populations by country
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="text-lg font-bold text-white mb-2">{country.name}</h3>
                <div className="text-2xl font-bold text-purple-300 mb-1">
                  <AnimatedCounter end={country.students} />
                </div>
                <div className="text-gray-300 text-sm">students</div>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Ready to Join Our Global Community?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Take the first step towards your international education journey at Unity University. We're here to
              support you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold"
                >
                  Start Your Application
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
                >
                  Contact International Office
                  <Globe className="ml-3 h-6 w-6" />
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
