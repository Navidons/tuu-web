"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Award, Globe, GraduationCap, Microscope } from "lucide-react"
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

export default function AcademicsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const academicPrograms = [
    {
      level: "Undergraduate",
      description: "Bachelor's degree programs designed to provide comprehensive foundation knowledge",
      duration: "4 years",
      programs: 25,
      students: 3200,
      href: "/academics/undergraduate",
      icon: BookOpen,
      color: "from-purple-500 to-blue-600",
      bgColor: "from-purple-50 to-blue-50",
    },
    {
      level: "Graduate",
      description: "Master's degree programs for advanced study and specialization",
      duration: "2 years",
      programs: 18,
      students: 1800,
      href: "/academics/graduate",
      icon: GraduationCap,
      color: "from-blue-500 to-emerald-600",
      bgColor: "from-blue-50 to-emerald-50",
    },
    {
      level: "Professional Development",
      description: "Continuing education and professional certification programs",
      duration: "Flexible",
      programs: 12,
      students: 800,
      href: "/academics/professional",
      icon: Award,
      color: "from-emerald-500 to-purple-600",
      bgColor: "from-emerald-50 to-purple-50",
    },
  ]

  const schools = [
    {
      name: "School of Business & Management",
      dean: "Dr. Sarah Johnson",
      programs: ["Business Administration", "International Business", "Entrepreneurship", "Finance", "Marketing"],
      students: 1200,
      faculty: 45,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "School of Engineering & Technology",
      dean: "Prof. Ahmed Hassan",
      programs: ["Computer Science", "Civil Engineering", "Electrical Engineering", "Software Development"],
      students: 980,
      faculty: 38,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-emerald-500 to-blue-600",
    },
    {
      name: "School of Health Sciences",
      dean: "Dr. Amina Kone",
      programs: ["Medicine", "Nursing", "Public Health", "Pharmacy", "Medical Technology"],
      students: 850,
      faculty: 42,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "School of Liberal Arts",
      dean: "Prof. Michael Osei",
      programs: ["Literature", "History", "Philosophy", "Languages", "Cultural Studies"],
      students: 720,
      faculty: 35,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-orange-500 to-yellow-600",
    },
    {
      name: "School of Social Sciences",
      dean: "Dr. Fatima Al-Rashid",
      programs: ["International Relations", "Psychology", "Sociology", "Political Science", "Economics"],
      students: 680,
      faculty: 32,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "School of Agriculture & Environment",
      dean: "Prof. James Koroma",
      programs: ["Sustainable Agriculture", "Environmental Science", "Forestry", "Climate Studies"],
      students: 570,
      faculty: 28,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-green-500 to-emerald-600",
    },
  ]

  const features = [
    {
      title: "World-Class Faculty",
      description: "Learn from distinguished professors and industry experts",
      icon: Users,
      stat: "220+ Faculty",
    },
    {
      title: "Research Excellence",
      description: "Cutting-edge research facilities and opportunities",
      icon: Microscope,
      stat: "15 Research Centers",
    },
    {
      title: "Global Perspective",
      description: "International partnerships and exchange programs",
      icon: Globe,
      stat: "25+ Partner Universities",
    },
    {
      title: "Career Success",
      description: "High employment rates and career advancement",
      icon: Award,
      stat: "95% Employment Rate",
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
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">Academics</Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Academic
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Excellence
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Discover world-class academic programs designed to prepare you for success in an interconnected global
                economy. Excellence in education, innovation in learning.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/academics/undergraduate">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Explore Programs
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/academics/calendar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                  >
                    Academic Calendar
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Statistics */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Academic Excellence by Numbers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to quality education reflected in our achievements
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Academic Programs", value: 55, suffix: "+", description: "Across all levels" },
              { label: "Faculty Members", value: 220, suffix: "+", description: "Expert educators" },
              { label: "Research Projects", value: 150, suffix: "+", description: "Active research" },
              { label: "Graduate Success Rate", value: 95, suffix: "%", description: "Career placement" },
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

      {/* Academic Programs Overview */}
      <section className="py-24 bg-white">
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
                Comprehensive educational pathways from undergraduate to professional development
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {academicPrograms.map((program, index) => (
              <motion.div
                key={program.level}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group"
              >
                <Link href={program.href}>
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${program.bgColor} p-8 shadow-xl border border-gray-100 cursor-pointer h-full`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <program.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{program.level}</h3>
                      <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{program.programs}</div>
                          <div className="text-sm text-gray-600">Programs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{program.students}</div>
                          <div className="text-sm text-gray-600">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">{program.duration}</div>
                          <div className="text-sm text-gray-600">Duration</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                        Explore {program.level}
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

      {/* Schools and Colleges */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Schools & Colleges</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized schools offering focused education in diverse fields of study
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {schools.map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={school.image || "/placeholder.svg"}
                    alt={school.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1">{school.name}</h3>
                    <p className="text-white/90 text-sm">Dean: {school.dean}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{school.students}</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{school.faculty}</div>
                      <div className="text-sm text-gray-600">Faculty</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Programs Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {school.programs.slice(0, 3).map((program, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {school.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{school.programs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${school.color} text-white hover:opacity-90`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Unity University</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinctive features that set our academic programs apart
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
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
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

      {/* Research & Innovation */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-8 leading-tight">
                  Research &
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Innovation Hub
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our commitment to research excellence drives innovation and creates solutions for real-world
                  challenges across Africa and beyond.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  {[
                    { label: "Research Centers", value: 15 },
                    { label: "Active Projects", value: 150 },
                    { label: "Publications", value: 450 },
                    { label: "Patents Filed", value: 28 },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    >
                      <div className="text-3xl font-bold text-purple-300 mb-2">
                        <AnimatedCounter end={stat.value} suffix="+" />
                      </div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Explore Research Opportunities
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </div>

            <div className="relative">
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="grid gap-4 grid-cols-2">
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                      className="space-y-4"
                    >
                      <Image
                        src="/placeholder.svg?height=250&width=300"
                        alt="Research Lab"
                        width={300}
                        height={250}
                        className="rounded-2xl shadow-lg"
                      />
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Innovation Center"
                        width={300}
                        height={200}
                        className="rounded-2xl shadow-lg"
                      />
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                      className="space-y-4 mt-8"
                    >
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Student Research"
                        width={300}
                        height={200}
                        className="rounded-2xl shadow-lg"
                      />
                      <Image
                        src="/placeholder.svg?height=250&width=300"
                        alt="Technology Lab"
                        width={300}
                        height={250}
                        className="rounded-2xl shadow-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Academic Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to succeed in your academic journey
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Undergraduate Programs",
                description: "Bachelor's degree programs across multiple disciplines",
                href: "/academics/undergraduate",
                icon: "🎓",
                color: "from-purple-500 to-blue-600",
              },
              {
                title: "Graduate Programs",
                description: "Advanced master's and doctoral degree programs",
                href: "/academics/graduate",
                icon: "📚",
                color: "from-blue-500 to-emerald-600",
              },
              {
                title: "Professional Development",
                description: "Continuing education and certification programs",
                href: "/academics/professional",
                icon: "💼",
                color: "from-emerald-500 to-purple-600",
              },
              {
                title: "Academic Calendar",
                description: "Important dates, deadlines, and academic schedule",
                href: "/academics/calendar",
                icon: "📅",
                color: "from-purple-500 to-red-600",
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
                <Link href={item.href}>
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

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Begin Your Academic Journey?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of students who have chosen Unity University for their academic excellence and global
              perspective.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Contact Academic Affairs
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
