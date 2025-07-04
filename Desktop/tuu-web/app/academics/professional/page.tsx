"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Users, Clock, Award, Star, Briefcase, BadgeIcon as Certificate } from "lucide-react"
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

export default function ProfessionalPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("certificates")

  useEffect(() => {
    setMounted(true)
  }, [])

  const programs = {
    certificates: [
      {
        name: "Digital Marketing Certificate",
        duration: "6 months",
        format: "Online / Evening",
        description: "Comprehensive digital marketing strategies for modern businesses",
        modules: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & ROI"],
        careers: ["Digital Marketing Manager", "SEO Specialist", "Social Media Manager"],
        cost: "$2,500",
        schedule: "Evenings & Weekends",
      },
      {
        name: "Project Management Certificate",
        duration: "4 months",
        format: "Hybrid",
        description: "Professional project management methodologies and tools",
        modules: ["Agile & Scrum", "Risk Management", "Leadership", "PMP Preparation"],
        careers: ["Project Manager", "Scrum Master", "Program Coordinator"],
        cost: "$3,000",
        schedule: "Flexible",
      },
      {
        name: "Data Analytics Certificate",
        duration: "8 months",
        format: "Online",
        description: "Data analysis, visualization, and business intelligence",
        modules: ["Python/R Programming", "SQL", "Tableau", "Machine Learning Basics"],
        careers: ["Data Analyst", "Business Intelligence Analyst", "Data Scientist"],
        cost: "$3,500",
        schedule: "Self-paced",
      },
      {
        name: "Cybersecurity Certificate",
        duration: "6 months",
        format: "Online",
        description: "Information security and cyber threat management",
        modules: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance"],
        careers: ["Cybersecurity Analyst", "Security Consultant", "IT Security Manager"],
        cost: "$4,000",
        schedule: "Evenings",
      },
    ],
    executive: [
      {
        name: "Executive Leadership Program",
        duration: "3 months",
        format: "In-person",
        description: "Advanced leadership skills for senior executives",
        modules: ["Strategic Thinking", "Change Management", "Executive Communication", "Global Leadership"],
        careers: ["CEO", "VP", "Executive Director", "Senior Manager"],
        cost: "$8,000",
        schedule: "Monthly Intensives",
      },
      {
        name: "Digital Transformation for Leaders",
        duration: "2 months",
        format: "Hybrid",
        description: "Leading digital transformation initiatives",
        modules: ["Digital Strategy", "Innovation Management", "Technology Leadership", "Change Leadership"],
        careers: ["Chief Digital Officer", "Innovation Director", "Technology VP"],
        cost: "$6,500",
        schedule: "Bi-weekly Sessions",
      },
      {
        name: "Financial Management for Non-Financial Managers",
        duration: "6 weeks",
        format: "Online",
        description: "Financial literacy for business leaders",
        modules: ["Financial Analysis", "Budgeting", "Investment Decisions", "Risk Management"],
        careers: ["General Manager", "Department Head", "Team Leader"],
        cost: "$3,500",
        schedule: "Weekly Sessions",
      },
    ],
    continuing: [
      {
        name: "Sustainable Business Practices",
        duration: "4 weeks",
        format: "Online",
        description: "Environmental and social responsibility in business",
        modules: ["ESG Frameworks", "Sustainable Supply Chain", "Green Finance", "Impact Measurement"],
        careers: ["Sustainability Manager", "CSR Director", "Environmental Consultant"],
        cost: "$1,500",
        schedule: "Self-paced",
      },
      {
        name: "Artificial Intelligence for Business",
        duration: "8 weeks",
        format: "Hybrid",
        description: "AI applications and strategy for business leaders",
        modules: ["AI Fundamentals", "Machine Learning Applications", "AI Ethics", "Implementation Strategy"],
        careers: ["AI Strategy Manager", "Technology Consultant", "Innovation Manager"],
        cost: "$2,800",
        schedule: "Weekly Sessions",
      },
      {
        name: "Cross-Cultural Communication",
        duration: "6 weeks",
        format: "Online",
        description: "Effective communication in global business environments",
        modules: ["Cultural Intelligence", "Global Negotiation", "Virtual Team Management", "International Etiquette"],
        careers: ["International Manager", "Global Team Leader", "Cultural Liaison"],
        cost: "$1,800",
        schedule: "Bi-weekly Sessions",
      },
    ],
  }

  const categories = [
    { id: "certificates", name: "Professional Certificates", icon: Certificate, count: 4 },
    { id: "executive", name: "Executive Education", icon: Briefcase, count: 3 },
    { id: "continuing", name: "Continuing Education", icon: BookOpen, count: 3 },
  ]

  const features = [
    {
      title: "Flexible Scheduling",
      description: "Evening, weekend, and online options for working professionals",
      icon: Clock,
      stat: "24/7 Access",
    },
    {
      title: "Industry Experts",
      description: "Learn from practicing professionals and industry leaders",
      icon: Users,
      stat: "50+ Instructors",
    },
    {
      title: "Career Advancement",
      description: "Skills and credentials that advance your career",
      icon: Award,
      stat: "85% Promotion Rate",
    },
    {
      title: "Networking",
      description: "Connect with professionals across industries",
      icon: Star,
      stat: "2000+ Alumni",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-purple-900 to-slate-900">
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
              <Badge className="bg-emerald-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                Professional Development
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Advance Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                  Career
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Enhance your skills and advance your career with our flexible professional development programs designed
                for working professionals.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                  Explore Programs
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Download Catalog
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
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Professional Development Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering professionals to achieve their career goals
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Professional Programs", value: 12, suffix: "+", description: "Certificates & Courses" },
              { label: "Working Professionals", value: 800, suffix: "+", description: "Currently enrolled" },
              { label: "Career Advancement", value: 85, suffix: "%", description: "Promotion rate" },
              { label: "Industry Partners", value: 50, suffix: "+", description: "Employer partnerships" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-purple-50 border border-emerald-100"
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Choose Your Path</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible learning options designed for your schedule and career goals
              </p>
            </motion.div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-4 px-8 py-4 rounded-2xl border-2 transition-all ${selectedCategory === category.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 hover:border-emerald-300 text-gray-700"
                  }`}
              >
                <category.icon className="h-8 w-8" />
                <div className="text-left">
                  <div className="font-bold text-lg">{category.name}</div>
                  <div className="text-sm text-gray-500">{category.count} programs</div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Programs */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              {programs[selectedCategory as keyof typeof programs].map((program, index) => (
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
                      <div className="flex gap-2">
                        <Badge className="bg-emerald-100 text-emerald-700">{program.duration}</Badge>
                        <Badge className="bg-purple-100 text-purple-700">{program.format}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700">{program.cost}</Badge>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Course Modules:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {program.modules.map((module, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                          {module}
                        </div>
                      ))}
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

                  <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule: {program.schedule}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-purple-600 text-white hover:from-emerald-700 hover:to-purple-700">
                      Enroll Now
                    </Button>
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
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Our Professional Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed for working professionals who want to advance their careers
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
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-lg font-bold text-emerald-600">{feature.stat}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-r from-emerald-900 via-purple-900 to-emerald-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Professional Success Stories</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">See how our programs have transformed careers</p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jennifer Chen",
                program: "Digital Marketing Certificate",
                achievement: "Promoted to Marketing Director",
                story: "The digital marketing program gave me the skills to lead our company's digital transformation.",
                image: "/placeholder.svg?height=200&width=200",
                company: "Tech Solutions Inc.",
              },
              {
                name: "Robert Osei",
                program: "Executive Leadership Program",
                achievement: "Appointed as Regional VP",
                story: "The leadership program prepared me for executive responsibilities and strategic thinking.",
                image: "/placeholder.svg?height=200&width=200",
                company: "Global Finance Corp",
              },
              {
                name: "Lisa Nakamura",
                program: "Data Analytics Certificate",
                achievement: "Career Change to Data Science",
                story:
                  "I successfully transitioned from finance to data science thanks to the comprehensive curriculum.",
                image: "/placeholder.svg?height=200&width=200",
                company: "Analytics Pro",
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
                  <p className="text-emerald-300 font-medium">{story.program}</p>
                  <Badge className="bg-emerald-600 text-white mt-2">{story.achievement}</Badge>
                  <p className="text-gray-300 text-sm mt-1">{story.company}</p>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Ready to Advance Your Career?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of professionals who have enhanced their skills and advanced their careers with Unity
              University's professional development programs.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white hover:from-emerald-700 hover:to-purple-700 px-8 py-4 text-lg font-bold"
              >
                Explore All Programs
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-bold"
                >
                  Contact Program Advisor
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
