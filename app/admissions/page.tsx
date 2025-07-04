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

  const programs = [
    {
      level: "Undergraduate",
      duration: "4 years",
      programs: ["Business Administration", "Computer Science", "Engineering", "Health Sciences", "Liberal Arts"],
      color: "from-purple-500 to-blue-600",
    },
    {
      level: "Graduate",
      duration: "2 years",
      programs: ["MBA", "Master of Engineering", "Master of Public Health", "Master of Education"],
      color: "from-blue-500 to-emerald-600",
    },
    {
      level: "Doctoral",
      duration: "3-5 years",
      programs: ["PhD in Engineering", "PhD in Business", "PhD in Education", "PhD in Health Sciences"],
      color: "from-emerald-500 to-purple-600",
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
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">Admissions</Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Your Journey
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Starts Here
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Join a global community of scholars at Unity University. Discover world-class education opportunities
                across our campuses in Liberia and Somaliland.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Apply Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/academics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Admission at a Glance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of students from around the world in pursuing excellence
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Application Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple, streamlined process designed to help you succeed
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Process Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform -translate-y-1/2"></div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
                >
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>

                  <div className="text-6xl mb-6 mt-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  <Badge className="bg-purple-100 text-purple-700">{step.timeline}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Academic Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive range of undergraduate, graduate, and doctoral programs
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {programs.map((program, index) => (
              <motion.div
                key={program.level}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-5`}></div>
                <div className="relative z-10 p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{program.level}</h3>
                    <p className="text-gray-600">Duration: {program.duration}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900">Available Programs:</h4>
                    {program.programs.map((prog, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700">{prog}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full bg-gradient-to-r ${program.color} text-white hover:opacity-90`}>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Admissions Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about joining Unity University
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      <div className="flex items-center justify-center text-purple-600 font-medium">
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

      {/* Important Dates */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Important Dates</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Key deadlines and dates for the upcoming academic year
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                date: "March 1, 2024",
                title: "Early Decision Deadline",
                description: "Submit your application for priority consideration",
                type: "Deadline",
              },
              {
                date: "May 15, 2024",
                title: "Regular Decision Deadline",
                description: "Final deadline for fall semester applications",
                type: "Deadline",
              },
              {
                date: "July 15, 2024",
                title: "International Student Deadline",
                description: "Final deadline for visa processing requirements",
                type: "International",
              },
              {
                date: "August 20, 2024",
                title: "Orientation Week",
                description: "Welcome activities and campus introduction",
                type: "Event",
              },
              {
                date: "August 27, 2024",
                title: "Classes Begin",
                description: "First day of fall semester classes",
                type: "Academic",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-purple-300" />
                  <Badge className="bg-purple-600 text-white">{item.type}</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-purple-300 font-semibold mb-3">{item.date}</p>
                <p className="text-gray-300">{item.description}</p>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of students who have chosen Unity University to transform their lives and shape the future
              of Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold"
                >
                  Start Application
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
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
