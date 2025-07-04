"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, Award, Users, Calculator, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"
import { useInView } from "react-intersection-observer"

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
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
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function FinancialAidPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scholarships = [
    {
      name: "Unity Excellence Scholarship",
      amount: "Full Tuition",
      criteria: "Academic excellence (GPA 3.8+), leadership experience",
      renewable: true,
      deadline: "March 1",
      recipients: 25,
      description:
        "Our most prestigious scholarship for exceptional students who demonstrate academic excellence and leadership potential.",
    },
    {
      name: "African Leadership Scholarship",
      amount: "$10,000",
      criteria: "African citizenship, community service, leadership potential",
      renewable: true,
      deadline: "April 15",
      recipients: 50,
      description:
        "Supporting future leaders from across Africa who are committed to positive change in their communities.",
    },
    {
      name: "STEM Innovation Scholarship",
      amount: "$8,000",
      criteria: "STEM major, innovative project or research experience",
      renewable: true,
      deadline: "May 1",
      recipients: 30,
      description: "Encouraging innovation in science, technology, engineering, and mathematics fields.",
    },
    {
      name: "First-Generation College Scholarship",
      amount: "$5,000",
      criteria: "First in family to attend university, financial need",
      renewable: true,
      deadline: "June 1",
      recipients: 40,
      description: "Supporting students who are the first in their families to pursue higher education.",
    },
    {
      name: "Women in Leadership Scholarship",
      amount: "$6,000",
      criteria: "Female students, leadership experience, academic merit",
      renewable: true,
      deadline: "April 30",
      recipients: 35,
      description: "Empowering women leaders across all fields of study.",
    },
    {
      name: "International Student Scholarship",
      amount: "$4,000",
      criteria: "International student status, academic merit",
      renewable: true,
      deadline: "March 15",
      recipients: 60,
      description: "Welcoming international students to our global community.",
    },
  ]

  const aidTypes = [
    {
      title: "Merit-Based Scholarships",
      description: "Awarded based on academic achievement, leadership, and special talents",
      icon: Award,
      amount: "Up to Full Tuition",
      color: "from-purple-500 to-blue-600",
    },
    {
      title: "Need-Based Grants",
      description: "Financial assistance based on demonstrated financial need",
      icon: DollarSign,
      amount: "Up to $8,000",
      color: "from-blue-500 to-emerald-600",
    },
    {
      title: "Work-Study Programs",
      description: "Part-time employment opportunities on campus",
      icon: Users,
      amount: "Up to $3,000",
      color: "from-emerald-500 to-purple-600",
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Complete FAFSA",
      description: "Submit the Free Application for Federal Student Aid",
      deadline: "Priority: March 1",
      icon: "📋",
    },
    {
      step: 2,
      title: "Submit Unity Aid Application",
      description: "Complete our institutional financial aid application",
      deadline: "Same as admission",
      icon: "📝",
    },
    {
      step: 3,
      title: "Provide Documentation",
      description: "Submit required financial documents and tax returns",
      deadline: "Within 2 weeks",
      icon: "📄",
    },
    {
      step: 4,
      title: "Review Award Letter",
      description: "Receive and review your financial aid package",
      deadline: "Response required",
      icon: "💌",
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
                Financial Aid
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Making Education
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Accessible
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Don't let financial barriers stop you from achieving your dreams. Unity University offers comprehensive
                financial aid to help make your education affordable.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Apply for Aid
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Calculate Aid
                  <Calculator className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Aid Statistics */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Financial Aid Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our financial aid programs are making education accessible to students across Africa
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Students Receiving Aid", value: 85, suffix: "%", description: "Of all enrolled students" },
              { label: "Total Aid Awarded", value: 12, prefix: "$", suffix: "M", description: "This academic year" },
              { label: "Average Scholarship", value: 6500, prefix: "$", suffix: "", description: "Per recipient" },
              { label: "Countries Represented", value: 45, suffix: "", description: "In aid recipients" },
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
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Financial Aid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Types of Financial Aid</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple pathways to make your education affordable
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {aidTypes.map((aid, index) => (
              <motion.div
                key={aid.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${aid.color} opacity-5`}></div>
                <div className="relative z-10 p-8">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${aid.color} flex items-center justify-center mb-6`}
                  >
                    <aid.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{aid.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{aid.description}</p>
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{aid.amount}</div>
                    <div className="text-gray-600">Maximum award</div>
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${aid.color} text-white hover:opacity-90`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Opportunities */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Scholarship Opportunities</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover scholarships designed to recognize and reward excellence in various areas
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{scholarship.name}</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{scholarship.amount}</div>
                  <Badge className="bg-purple-100 text-purple-700">{scholarship.recipients} recipients</Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Criteria:</h4>
                    <p className="text-gray-600 text-sm">{scholarship.criteria}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed">{scholarship.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-600">Deadline: {scholarship.deadline}</span>
                    </div>
                    {scholarship.renewable && (
                      <Badge variant="outline" className="text-xs">
                        Renewable
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  Apply Now
                </Button>
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
              <h2 className="text-5xl font-bold text-gray-900 mb-6">How to Apply for Financial Aid</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple step-by-step process to access financial assistance
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform -translate-y-1/2"></div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {applicationSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>

                    <div className="text-6xl mb-6 mt-4">{step.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                    <Badge className="bg-purple-100 text-purple-700 text-xs">{step.deadline}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Success Stories</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet students whose dreams became reality through financial aid
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Amina Kone",
                program: "Computer Science",
                scholarship: "Unity Excellence Scholarship",
                story:
                  "Financial aid made it possible for me to pursue my passion for technology and now I'm developing apps to help farmers in my community.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "David Mensah",
                program: "Business Administration",
                scholarship: "African Leadership Scholarship",
                story:
                  "The scholarship not only covered my tuition but also connected me with mentors who helped shape my entrepreneurial journey.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Fatima Al-Hassan",
                program: "Health Sciences",
                scholarship: "Women in Leadership Scholarship",
                story:
                  "Thanks to financial aid, I'm now studying to become a doctor and plan to return to serve my community in rural Somalia.",
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
                  <Badge className="bg-purple-600 text-white mt-2">{story.scholarship}</Badge>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Start Your Financial Aid Application</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Don't let financial concerns hold you back. Apply for financial aid today and take the first step towards
              your future at Unity University.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold"
                >
                  Apply for Financial Aid
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
                >
                  Contact Financial Aid Office
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
