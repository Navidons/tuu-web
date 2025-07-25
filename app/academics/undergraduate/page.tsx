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
      <section className="relative py-20 md:py-32 bg-[#faf9f7] border-b border-gray-200 font-serif overflow-hidden">
        {/* Full-width background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/university-banner.jpg"
            alt="Unity University campus architecture"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0">
          {/* Left: Square image */}
          <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
              <Image
                src="/graduation/all-on-graduation-pic.jpg"
                alt="Unity University undergraduate students at graduation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Center: Textual content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pr-12 bg-white/80 rounded-2xl p-8 md:p-12 shadow-lg">
            <Badge className="bg-emerald-700 text-white px-6 py-2 text-base font-semibold shadow mb-4 font-serif">
              Undergraduate Programs
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 font-serif">
              Bachelor's Degrees
            </h1>
            <div className="w-12 h-1 bg-emerald-700 rounded-full mb-4" />
            <p className="text-lg md:text-xl text-gray-700 mb-6 font-sans">
              Build a strong foundation for your career with our comprehensive undergraduate programs designed to prepare you for success in the global marketplace.
            </p>
            <p className="text-base text-gray-500 mb-8 font-sans italic">
              "Empowering future leaders through academic excellence and real-world experience."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 text-lg font-bold font-serif shadow-md">
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-gray-800 hover:bg-gray-100 px-8 py-4 text-lg font-bold font-serif"
              >
                Download Brochure
              </Button>
            </div>
          </div>
          {/* Right: Empty for balance on desktop */}
          <div className="hidden md:block w-1/6" />
        </div>
      </section>

      {/* Program Statistics */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 font-serif">Undergraduate Excellence</h2>
              {/* Dual-color underline, no gradient */}
              <div className="mx-auto mb-6 flex w-16 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans">
                Our undergraduate programs provide the foundation for lifelong success
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Undergraduate Programs", value: 17, suffix: "+", description: "Across 4 faculties", accent: "emerald" },
              { label: "Undergraduate Students", value: 3200, suffix: "+", description: "Currently enrolled", accent: "pink" },
              { label: "Graduate Employment Rate", value: 95, suffix: "%", description: "Within 6 months", accent: "emerald" },
              { label: "Average Class Size", value: 20, suffix: "", description: "Students per class", accent: "pink" },
            ].map((stat, index) => {
              const accentColor = stat.accent === 'emerald' ? 'text-emerald-700 border-emerald-700' : 'text-pink-700 border-pink-600';
              const dotColor = stat.accent === 'emerald' ? 'bg-emerald-700' : 'bg-pink-600';
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="relative text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-200 font-sans flex flex-col items-center"
                >
                  {/* Accent dot */}
                  <span className={`absolute -left-3 top-8 w-4 h-4 rounded-full ${dotColor} hidden lg:block`} />
                  <div className={`text-4xl font-extrabold mb-2 font-serif ${accentColor}`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-2 font-serif">{stat.label}</div>
                  <div className="text-gray-600 font-sans">{stat.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schools Selection */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 font-serif">Our Faculties</h2>
              <div className="mx-auto mb-6 flex w-16 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans">
                Explore undergraduate programs across our four specialized faculties
              </p>
            </motion.div>
          </div>

          {/* School Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
            {schools.map((school) => {
              const accentMap = {
                business: 'bg-emerald-700',
                social: 'bg-pink-600',
                health: 'bg-gray-500',
                computing: 'bg-black',
              };
              const iconMap = {
                business: '💼',
                social: '🌍',
                health: '🏥',
                computing: '💻',
              };
              return (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchool(school.id)}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-full border font-sans font-semibold transition-all duration-200 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-700
                    ${selectedSchool === school.id ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700' : 'border-gray-300 bg-white'}
                  `}
                >
                  <span className={`w-3 h-3 rounded-full ${accentMap[school.id as keyof typeof accentMap]} inline-block mr-2`} />
                  <span className="text-xl">{iconMap[school.id as keyof typeof iconMap]}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm font-serif">{school.name}</div>
                    <div className="text-xs text-gray-500 font-sans">{school.students} students</div>
                  </div>
                </button>
              );
            })}
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
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 font-serif">
                {programs[selectedSchool as keyof typeof programs].name}
              </h3>
              <div className="mx-auto mb-4 flex w-12 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
              {programs[selectedSchool as keyof typeof programs].programs.map((program, index) => {
                // Alternate accent color for each card
                const accent = index % 2 === 0 ? 'emerald' : 'pink';
                const accentBar = accent === 'emerald' ? 'bg-emerald-700' : 'bg-pink-600';
                const icon = selectedSchool === 'business' ? '💼' :
                  selectedSchool === 'social' ? '🌍' :
                  selectedSchool === 'health' ? '🏥' :
                  '💻';
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 font-sans flex flex-col min-h-[340px]"
                  >
                    {/* Accent bar */}
                    <div className={`absolute top-0 left-0 w-full h-2 rounded-t-2xl ${accentBar}`} />
                    <div className="flex items-center mb-4 mt-2">
                      <span className="text-2xl mr-3">{icon}</span>
                      <h4 className="text-xl font-extrabold text-gray-900 font-serif">{program.name}</h4>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed font-sans">{program.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 rounded-lg bg-[#faf9f7] border border-gray-200">
                        <Clock className={`h-6 w-6 ${accent === 'emerald' ? 'text-emerald-700' : 'text-pink-600'} mx-auto mb-2`} />
                        <div className="font-semibold text-gray-900 font-sans">{program.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-[#faf9f7] border border-gray-200">
                        <BookOpen className={`h-6 w-6 ${accent === 'emerald' ? 'text-emerald-700' : 'text-pink-600'} mx-auto mb-2`} />
                        <div className="font-semibold text-gray-900 font-sans">{program.credits}</div>
                        <div className="text-sm text-gray-600">Credits</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3 font-serif">Career Opportunities:</h5>
                      <div className="flex flex-wrap gap-2">
                        {program.careers.map((career, i) => (
                          <Badge key={i} variant="outline" className={`text-xs font-sans border-gray-300 text-gray-700 bg-white`}>
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex mt-auto">
                      <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className={`w-full bg-emerald-700 text-white hover:bg-emerald-800 font-serif`}>
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Features */}
      <section className="relative py-12 md:py-20 bg-[#faf9f7] border-y border-gray-200 font-serif overflow-hidden">
        {/* Subtle watermark background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-end items-end select-none z-0">
          <img src="/tuu-logo/tuu-logo.png" alt="University Crest Watermark" className="w-1/2 max-w-lg mr-8 mb-8 hidden md:block" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 font-serif">Why Choose Our Undergraduate Programs</h2>
              <div className="mx-auto mb-3 flex w-12 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans mb-1">
                Distinctive features that prepare you for career success
              </p>
            </motion.div>
          </div>

          {/* Minimal, compact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Card 1: Vibrant Campus Life */}
            <div className="relative bg-white rounded-xl shadow border border-gray-200 p-4 font-sans flex flex-col min-h-[160px]">
              <div className="absolute top-0 left-0 h-full w-1 bg-emerald-700 rounded-l-xl" />
              <div className="flex items-center mb-2 mt-1">
                <Users className="h-7 w-7 text-emerald-700 mr-2" />
                <h3 className="text-base font-bold text-gray-900 font-serif">Vibrant Campus Life</h3>
              </div>
              <p className="text-gray-700 text-sm leading-snug font-sans flex-1">Clubs, events, and a welcoming, diverse community.</p>
            </div>

            {/* Card 2: Affordable & Accessible */}
            <div className="relative bg-white rounded-xl shadow border border-gray-200 p-4 font-sans flex flex-col min-h-[160px]">
              <div className="absolute top-0 left-0 h-full w-1 bg-pink-600 rounded-l-xl" />
              <div className="flex items-center mb-2 mt-1">
                <Award className="h-7 w-7 text-pink-600 mr-2" />
                <h3 className="text-base font-bold text-gray-900 font-serif">Affordable & Accessible</h3>
              </div>
              <p className="text-gray-700 text-sm leading-snug font-sans flex-1">Scholarships, flexible payment, and support.</p>
            </div>

            {/* Card 3: Practical, Skills-Based Learning */}
            <div className="relative bg-white rounded-xl shadow border border-gray-200 p-4 font-sans flex flex-col min-h-[160px]">
              <div className="absolute top-0 left-0 h-full w-1 bg-emerald-700 rounded-l-xl" />
              <div className="flex items-center mb-2 mt-1">
                <BookOpen className="h-7 w-7 text-emerald-700 mr-2" />
                <h3 className="text-base font-bold text-gray-900 font-serif">Practical, Skills-Based</h3>
              </div>
              <p className="text-gray-700 text-sm leading-snug font-sans flex-1">Hands-on courses, real-world projects, internships.</p>
            </div>

            {/* Card 4: Accredited & Recognized */}
            <div className="relative bg-white rounded-xl shadow border border-gray-200 p-4 font-sans flex flex-col min-h-[160px]">
              <div className="absolute top-0 left-0 h-full w-1 bg-pink-600 rounded-l-xl" />
              <div className="flex items-center mb-2 mt-1">
                <Star className="h-7 w-7 text-pink-600 mr-2" />
                <h3 className="text-base font-bold text-gray-900 font-serif">Accredited & Recognized</h3>
              </div>
              <p className="text-gray-700 text-sm leading-snug font-sans flex-1">Fully accredited, respected faculty, global recognition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-12 md:py-20 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 font-serif">Student Success Stories</h2>
              <div className="mx-auto mb-3 flex w-12 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans mb-1">
                Meet our graduates who are making a difference in their fields
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Mensah",
                program: "Computer Science '23",
                achievement: "Software Engineer at Google",
                story: "The hands-on projects and mentorship at The Unity University prepared me for the tech industry.",
                image: "/alumni/alumni-01.jpg",
                accent: "emerald",
              },
              {
                name: "Ahmed Hassan",
                program: "Business Administration '22",
                achievement: "Founder of AgriTech Startup",
                story:
                  "The entrepreneurship program gave me the skills to start my own agricultural technology company.",
                image: "/alumni/alumni-02.jpg",
                accent: "pink",
              },
              {
                name: "Fatima Kone",
                program: "International Relations '23",
                achievement: "UN Development Programme",
                story: "The Unity University's global perspective and internship opportunities opened doors to international careers.",
                image: "/alumni/alumni-08.jpg",
                accent: "emerald",
              },
            ].map((story, index) => {
              const dotColor = story.accent === 'emerald' ? 'bg-emerald-700' : 'bg-pink-600';
              return (
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white rounded-xl shadow border border-gray-200 p-4 font-sans flex flex-col items-center min-h-[220px]"
                >
                  {/* Accent dot */}
                  <span className={`absolute top-3 left-3 w-3 h-3 rounded-full ${dotColor}`} />
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-gray-200 bg-gray-100 flex items-center justify-center" style={{ marginTop: '200px' }}>
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      fill
                      className="object-cover"
                      style={{ aspectRatio: '1 / 1', objectPosition: 'center 40%' }}
                    />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1 font-serif text-center">{story.name}</h3>
                  <div className="text-xs text-gray-500 font-sans mb-1 text-center">{story.program}</div>
                  <div className="text-xs font-bold text-emerald-700 font-sans mb-2 text-center">{story.achievement}</div>
                  <blockquote className="text-gray-700 italic text-xs text-center font-sans">"{story.story}"</blockquote>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-10 md:py-14 bg-[#faf9f7] border-y border-gray-200 font-serif overflow-hidden">
        {/* Subtle watermark background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex justify-end items-end select-none z-0">
          <img src="/tuu-logo/tuu-logo.png" alt="University Crest Watermark" className="w-1/3 max-w-xs mr-4 mb-4" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 font-serif">Ready to Start?</h2>
            <div className="w-10 h-1 bg-emerald-700 mx-auto mb-4 rounded-full" />
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-2 font-sans">
              Your future starts here. Take the next step.
            </p>
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-6 font-sans">
              Apply now or contact an academic advisor to begin your journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-emerald-700 text-white hover:bg-emerald-800 px-8 py-3 text-base font-bold font-serif shadow-md"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-400 text-gray-800 hover:bg-gray-100 px-8 py-3 text-base font-bold font-serif flex items-center justify-center"
                >
                  <span className="mr-2">Contact Advisor</span>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-emerald-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 10.5a8.38 8.38 0 01-1.9.82 3.48 3.48 0 00-6.6 1.18v.5A8.5 8.5 0 013 6.5v-.5a3.5 3.5 0 013.5-3.5h.5A8.5 8.5 0 0121 10.5z' /></svg>
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
