"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Clock, Award, Star, GraduationCap, Microscope } from "lucide-react"
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

export default function GraduatePage() {
  const [mounted, setMounted] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState("masters")

  useEffect(() => {
    setMounted(true)
  }, [])

  const programs = {
    masters: [
      {
        name: "Master of Business Administration (MBA)",
        school: "Business & Management",
        duration: "2 years",
        credits: 60,
        format: "Full-time / Part-time",
        description: "Advanced business leadership and strategic management for senior executive roles",
        specializations: ["Strategic Management", "Finance", "Marketing", "Operations", "International Business"],
        careers: ["CEO", "VP Operations", "Management Consultant", "Investment Manager"],
        requirements: ["Bachelor's degree", "3+ years work experience", "Letters of recommendation"],
      },
      {
        name: "Master of Human Resources Management",
        school: "Business & Management",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Advanced HR management, talent development, and organizational leadership",
        specializations: ["HR Strategy", "Talent Management", "Organizational Development", "Employment Law"],
        careers: ["HR Director", "Talent Manager", "Organizational Consultant", "Training Manager"],
        requirements: ["Bachelor's degree", "HR experience preferred", "Letters of recommendation"],
      },
      {
        name: "Master of Accounting & Finance",
        school: "Business & Management",
        duration: "2 years",
        credits: 48,
        format: "Full-time",
        description: "Advanced accounting, auditing, and financial management",
        specializations: ["Financial Accounting", "Management Accounting", "Auditing", "Tax Planning"],
        careers: ["Finance Director", "Chief Financial Officer", "Senior Accountant", "Financial Analyst"],
        requirements: ["Bachelor's degree in related field", "Accounting experience preferred", "Letters of recommendation"],
      },
      {
        name: "Master of Marketing Management",
        school: "Business & Management",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Advanced marketing, branding, and digital strategy",
        specializations: ["Digital Marketing", "Brand Management", "Consumer Behavior", "Market Research"],
        careers: ["Marketing Director", "Brand Manager", "Digital Marketing Manager", "Market Research Analyst"],
        requirements: ["Bachelor's degree", "Marketing experience preferred", "Letters of recommendation"],
      },
      {
        name: "Master of Project Planning and Management",
        school: "Business & Management",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Project lifecycle, monitoring, and evaluation at the graduate level",
        specializations: ["Project Management", "Program Management", "Risk Management", "Quality Management"],
        careers: ["Project Director", "Program Manager", "PMO Lead", "Operations Manager"],
        requirements: ["Bachelor's degree", "Project management experience", "Letters of recommendation"],
      },
      {
        name: "Master of Procurement, Logistics and Supply Chain Management",
        school: "Business & Management",
        duration: "2 years",
        credits: 48,
        format: "Full-time",
        description: "Advanced supply chain, procurement, and logistics management",
        specializations: ["Supply Chain Strategy", "Procurement", "Logistics", "Operations Management"],
        careers: ["Supply Chain Director", "Procurement Manager", "Logistics Manager", "Operations Director"],
        requirements: ["Bachelor's degree", "Supply chain experience preferred", "Letters of recommendation"],
      },
      {
        name: "Master of Public Health (MPH)",
        school: "Allied Health Sciences",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Advanced public health, epidemiology, and health policy",
        specializations: ["Epidemiology", "Health Policy", "Global Health", "Environmental Health"],
        careers: ["Public Health Director", "Epidemiologist", "Health Policy Analyst", "WHO Officer"],
        requirements: ["Bachelor's degree", "Healthcare experience preferred", "Statement of purpose"],
      },
      {
        name: "Master of Nutrition and Food Science",
        school: "Allied Health Sciences",
        duration: "2 years",
        credits: 48,
        format: "Full-time",
        description: "Advanced nutrition, food safety, and dietetics",
        specializations: ["Clinical Nutrition", "Community Nutrition", "Food Safety", "Nutritional Science"],
        careers: ["Clinical Nutritionist", "Public Health Nutritionist", "Food Safety Manager", "Research Scientist"],
        requirements: ["Bachelor's degree in related field", "Nutrition background preferred", "Statement of purpose"],
      },
      {
        name: "Master of Arts in International Relations and Diplomatic Studies",
        school: "Social Sciences",
        duration: "2 years",
        credits: 48,
        format: "Full-time",
        description: "Advanced study of international relations, diplomacy, and global policy",
        specializations: ["Diplomacy", "International Security", "Development Studies", "Regional Studies"],
        careers: ["Diplomat", "International Analyst", "NGO Director", "Policy Advisor"],
        requirements: ["Bachelor's degree", "Language proficiency", "Research proposal"],
      },
      {
        name: "Master of Arts in Public Administration and Management",
        school: "Social Sciences",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Governance, public policy, and administrative leadership at the graduate level",
        specializations: ["Public Policy", "Governance", "Public Finance", "Administrative Leadership"],
        careers: ["Government Official", "Public Policy Analyst", "Civil Service Manager", "NGO Administrator"],
        requirements: ["Bachelor's degree", "Public sector experience preferred", "Statement of purpose"],
      },
      {
        name: "Master of Arts in Development Studies",
        school: "Social Sciences",
        duration: "2 years",
        credits: 48,
        format: "Full-time",
        description: "Development theory, research, and policy for social progress",
        specializations: ["International Development", "Community Development", "Development Policy", "Social Research"],
        careers: ["Development Officer", "Program Manager", "Research Analyst", "Policy Consultant"],
        requirements: ["Bachelor's degree", "Development experience preferred", "Research proposal"],
      },
      {
        name: "Master of Education in Policy, Planning & Management",
        school: "Education",
        duration: "2 years",
        credits: 48,
        format: "Full-time / Part-time",
        description: "Education policy, planning, and management at the graduate level",
        specializations: ["Education Policy", "Educational Planning", "Curriculum Development", "Education Management"],
        careers: ["Education Administrator", "Policy Analyst", "Curriculum Specialist", "Educational Consultant"],
        requirements: ["Bachelor's degree", "Teaching experience preferred", "Statement of purpose"],
      },
      {
        name: "Master of Education in Leadership and Management",
        school: "Education",
        duration: "2 years",
        credits: 48,
        format: "Part-time",
        description: "Educational leadership and management for school administrators",
        specializations: ["Educational Leadership", "School Management", "Educational Innovation", "Change Management"],
        careers: ["School Principal", "Education Director", "Academic Dean", "Educational Leader"],
        requirements: ["Bachelor's degree", "Educational leadership experience", "Letters of recommendation"],
      },
      {
        name: "Master of Science in Information Technology",
        school: "Computing & IT",
        duration: "2 years",
        credits: 54,
        format: "Full-time",
        description: "Advanced IT, cybersecurity, and information systems management",
        specializations: ["Cybersecurity", "Data Science", "Cloud Computing", "IT Management"],
        careers: ["IT Director", "Cybersecurity Specialist", "Data Scientist", "Systems Architect"],
        requirements: ["Bachelor's degree in IT/related field", "Programming experience", "Technical portfolio"],
      },
    ],
  }

  const degreeTypes = [
    { id: "masters", name: "Master's Programs", icon: GraduationCap, count: 14 },
  ]

  const features = [
    {
      title: "Research Excellence",
      description: "Access to cutting-edge research facilities and renowned faculty mentors",
      icon: Microscope,
      stat: "15 Research Centers",
    },
    {
      title: "Small Cohorts",
      description: "Intimate learning environment with personalized attention",
      icon: Users,
      stat: "12:1 Ratio",
    },
    {
      title: "Industry Partnerships",
      description: "Collaboration with leading organizations and research institutions",
      icon: Award,
      stat: "50+ Partners",
    },
    {
      title: "Career Advancement",
      description: "High placement rates in leadership and research positions",
      icon: Star,
      stat: "98% Success Rate",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
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
              <Badge className="bg-blue-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                Graduate Programs
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight">
                Advanced
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Degrees
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
                Pursue advanced study and research opportunities that will position you as a leader in your field.
                Master's programs designed for academic and professional excellence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-bold">
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
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Graduate Excellence</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our graduate programs prepare leaders and researchers for tomorrow's challenges
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Master's Programs", value: 14, suffix: "", description: "Across 5 faculties" },
              { label: "Graduate Students", value: 1800, suffix: "+", description: "Currently enrolled" },
              { label: "Research Publications", value: 180, suffix: "+", description: "Annual output" },
              { label: "Faculty-Student Ratio", value: 12, suffix: ":1", description: "Personalized attention" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Degree Type Selection */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Choose Your Path</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive graduate degree offerings
              </p>
            </motion.div>
          </div>

          {/* Degree Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 md:mb-16">
            {degreeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedDegree(type.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 transition-all ${selectedDegree === type.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 text-gray-700"
                  }`}
              >
                <type.icon className="h-7 w-7" />
                <div className="text-left">
                  <div className="font-bold text-base">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.count} programs</div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Programs */}
          <motion.div
            key={selectedDegree}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4"
          >
            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
              {programs[selectedDegree as keyof typeof programs].map((program, index) => (
                <motion.div
                  key={program.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{program.name}</h4>
                      <Badge className="bg-blue-100 text-blue-700">{program.school}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{program.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{program.credits}</div>
                      <div className="text-sm text-gray-600">Credits</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <Users className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{program.format}</div>
                      <div className="text-sm text-gray-600">Format</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Specializations:</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.specializations.map((spec, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Career Opportunities:</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {program.careers.map((career, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Requirements:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {program.requirements.map((req, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
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
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Why Choose Our Graduate Programs</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Distinctive features that set our graduate education apart
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
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-lg font-bold text-blue-600">{feature.stat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Opportunities */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-2 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                  Research
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Opportunities
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  Join cutting-edge research projects that address real-world challenges and contribute to advancing
                  knowledge in your field.
                </p>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
                  {[
                    { label: "Active Research Projects", value: 85 },
                    { label: "Research Funding", value: 2.5, suffix: "M", prefix: "$" },
                    { label: "Graduate Researchers", value: 320 },
                    { label: "Publications per Year", value: 180 },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                    >
                      <div className="text-3xl font-bold text-blue-300 mb-2">
                        {stat.prefix}
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <Button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Explore Research Areas
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
                        alt="Graduate Research"
                        width={300}
                        height={250}
                        className="rounded-2xl shadow-lg"
                      />
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Lab Work"
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
                        alt="Conference Presentation"
                        width={300}
                        height={200}
                        className="rounded-2xl shadow-lg"
                      />
                      <Image
                        src="/placeholder.svg?height=250&width=300"
                        alt="Research Collaboration"
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

      {/* Graduate Success Stories */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Graduate Success Stories</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Meet our alumni who are leading innovation and research in their fields
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Amara Okafor",
                program: "MSc Information Technology '23",
                achievement: "Lead AI Researcher at Microsoft",
                story:
                  "The research opportunities and mentorship at The Unity University prepared me to lead groundbreaking AI projects.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Maria Santos",
                program: "MBA '22",
                achievement: "CEO of Sustainable Energy Corp",
                story:
                  "The MBA program's focus on sustainable business practices shaped my vision for renewable energy solutions.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "James Kwame",
                program: "MPH '24",
                achievement: "WHO Regional Director",
                story:
                  "The Unity University's global health perspective and research training prepared me for leadership in international health.",
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
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-blue-600 font-medium">{story.program}</p>
                  <Badge className="bg-blue-100 text-blue-700 mt-2">{story.achievement}</Badge>
                </div>
                <blockquote className="text-gray-600 italic text-center">"{story.story}"</blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Advance Your Career?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join our community of graduate scholars and researchers. Take the next step in your academic and
              professional journey.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Apply for Graduate School
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Contact Graduate Admissions
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
