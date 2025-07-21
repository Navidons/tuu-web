"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, CheckCircle, Users, Globe, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

// Animated counter component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
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

  return <span ref={ref}>{count}</span>
}

export default function AdmissionsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const admissionSteps = [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete our online application form with all required documents",
      icon: "📝",
      timeline: "Rolling Admissions",
    },
    {
      step: 2,
      title: "Document Review",
      description: "Our admissions team reviews your academic credentials and supporting materials",
      icon: "🔍",
      timeline: "2-3 weeks",
    },
    {
      step: 3,
      title: "Interview Process",
      description: "Selected candidates participate in virtual or in-person interviews",
      icon: "💬",
      timeline: "1-2 weeks",
    },
    {
      step: 4,
      title: "Admission Decision",
      description: "Receive your admission decision and enrollment information",
      icon: "🎉",
      timeline: "1 week",
    },
  ]

  const programLevels = [
    {
      level: "Undergraduate",
      duration: "3-4 years",
      programs: [
        "Bachelor of Science in Computer Science",
        "Bachelor of Business Administration",
        "Bachelor of Arts in International Relations",
        "Bachelor of Science in Health Sciences",
        "Bachelor of Education"
      ],
      color: "from-blue-500 to-green-600",
    },
    {
      level: "Graduate",
      duration: "1-2 years",
      programs: [
        "Master of Business Administration",
        "Master of Science in Computer Science",
        "Master of Public Health",
        "Master of Education",
        "Master of Arts in International Relations"
      ],
      color: "from-purple-500 to-pink-600",
    },
    // Doctoral section removed
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-emerald-900">
        <div className="absolute inset-0">
          <img src="/hero-section/all-on-graduation-pic.jpg" alt="Admissions Hero" className="w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center text-white">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Badge className="bg-emerald-700 text-white px-4 py-2 text-sm md:text-lg font-bold shadow-2xl mb-4 md:mb-8">Admissions</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
                Your Journey
                <span className="block text-emerald-200">Starts Here</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-12">
                Join a global community of scholars at The Unity University. Discover world-class education opportunities
                across our campuses in Liberia and Somaliland.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mt-6">
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-5 text-xl font-extrabold shadow-xl transition-all duration-200 focus:ring-4 focus:ring-emerald-300 focus:outline-none flex items-center gap-3"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-7 w-7" />
                  </Button>
                </Link>
                <Link href="/academics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-emerald-700 text-emerald-700 bg-white hover:bg-emerald-50 px-10 py-5 text-xl font-extrabold shadow-md transition-all duration-200 focus:ring-4 focus:ring-emerald-200 focus:outline-none flex items-center gap-3"
                  >
                    View Programs
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Statistics */}
      <section className="py-12 md:py-24 bg-[#faf9f7] border-y-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Admission at a Glance</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of students from around the world in pursuing excellence
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Applications Received", value: 8500, suffix: "+", description: "This year" },
              {
                icon: CheckCircle,
                label: "Acceptance Rate",
                value: 65,
                suffix: "%",
                description: "Competitive yet accessible",
              },
              {
                icon: Globe,
                label: "Countries Represented",
                value: 45,
                suffix: "",
                description: "Diverse student body",
              },
              {
                icon: GraduationCap,
                label: "Graduate Success Rate",
                value: 95,
                suffix: "%",
                description: "Career placement",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`text-center p-8 rounded-md bg-white border-2 ${index % 2 === 0 ? 'border-emerald-600' : 'border-red-600'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${index % 2 === 0 ? 'bg-emerald-700' : 'bg-red-700'}`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl font-bold mb-2 ${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'}`}> 
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 md:py-24 bg-white border-b-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Application Process</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                A simple, streamlined process designed to help you succeed
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Process Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-red-600 rounded-full transform -translate-y-1/2"></div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }} // Adjusted delay for a quicker staggered effect
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center"
                >
                  {/* Step Number */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-emerald-700 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg">
                    {step.step}
                  </div>

                  <div className="text-5xl mb-5 mt-2">{step.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">{step.description}</p>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">{step.timeline}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-12 md:py-24 bg-[#faf9f7] border-y-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Academic Programs</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive range of undergraduate, graduate, and doctoral programs
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3">
            {programLevels.map((program, index) => (
              <motion.div
                key={program.level}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }} // Adjusted delay for a quicker staggered effect
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100"
              >
                <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-emerald-100/40' : 'bg-red-100/40'}`}></div>
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">{program.level}</h3>
                    <p className="text-sm sm:text-base text-gray-600">Duration: {program.duration}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">Available Programs:</h4>
                    {program.programs.map((prog, i) => (
                      <div key={i} className="flex items-center space-x-2.5 sm:space-x-3">
                        <CheckCircle className={`h-4 w-4 sm:h-5 sm:w-5 ${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'} flex-shrink-0`} />
                        <span className="text-sm sm:text-base text-gray-700">{prog}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full ${index % 2 === 0 ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-red-700 hover:bg-red-800'} text-white py-2.5`}>
                      Apply for {program.level}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-24 bg-white border-b-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Admissions Resources</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about joining The Unity University
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Apply Now",
                description: "Start your application today",
                href: "/admissions/apply",
                icon: "📝",
                color: "from-purple-500 to-blue-600",
              },
              {
                title: "Tuition & Fees",
                description: "Understand the costs and payment options",
                href: "/admissions/tuition",
                icon: "💰",
                color: "from-blue-500 to-emerald-600",
              },
              {
                title: "Financial Aid",
                description: "Explore scholarships and funding opportunities",
                href: "/admissions/financial-aid",
                icon: "🎓",
                color: "from-emerald-500 to-purple-600",
              },
              {
                title: "International Students",
                description: "Special resources for international applicants",
                href: "/admissions/international",
                icon: "🌍",
                color: "from-purple-500 to-red-600",
              },
              {
                title: "Academic Programs",
                description: "Explore our comprehensive degree offerings",
                href: "/academics",
                icon: "🎯",
                color: "from-blue-500 to-emerald-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Link href={item.href} target={item.title === "Apply Now" ? "_blank" : undefined} rel={item.title === "Apply Now" ? "noopener noreferrer" : undefined}>
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 p-8 cursor-pointer h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10 text-center">
                      <div className="text-6xl mb-6">{item.icon}</div>
                      <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'} transition-colors`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      <div className={`flex items-center justify-center font-medium ${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-t-4 border-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Ready to Begin Your Journey?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12">
              Join thousands of students who have chosen The Unity University to transform their lives and shape the future
              of Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 text-lg font-bold"
                >
                  Start Application
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-4 text-lg font-bold"
                >
                  Contact Admissions
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
