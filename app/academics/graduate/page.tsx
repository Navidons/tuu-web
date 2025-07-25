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
  const [selectedSchool, setSelectedSchool] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

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

  // Extract unique schools from all programs
  const allPrograms = programs.masters
  const schools = [
    "All",
    ...Array.from(new Set(allPrograms.map((p) => p.school)))
  ]

  // Filter programs by selected school and search term
  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSchool = selectedSchool === "All" || program.school === selectedSchool
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      program.name.toLowerCase().includes(search) ||
      program.description.toLowerCase().includes(search) ||
      program.specializations.some((s) => s.toLowerCase().includes(search)) ||
      program.careers.some((c) => c.toLowerCase().includes(search))
    return matchesSchool && matchesSearch
  })

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
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0">
          {/* Left: Textual content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pr-12 bg-white/90 rounded-2xl p-8 md:p-12 shadow-lg">
            <Badge className="bg-emerald-700 text-white px-6 py-2 text-base font-semibold shadow mb-4 font-serif">
              Graduate Programs
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 font-serif">
              Advanced Graduate Degrees
            </h1>
            <div className="w-12 h-1 bg-emerald-700 rounded-full mb-4" />
            <p className="text-lg md:text-xl text-gray-700 mb-6 font-sans">
              Pursue advanced study and research opportunities that will position you as a leader in your field.
            </p>
            <p className="text-base text-gray-500 mb-8 font-sans italic">
              "Shape the future with world-class research, innovation, and leadership."
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
          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
              <Image
                src="/graduation/master-of-education-and-planning.jpg"
                alt="Unity University graduate students at graduation"
                fill
                className="object-cover"
                priority
              />
            </div>
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

          {/* Search input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search master's programs..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-base"
            />
          </div>

          {/* School/Faculty Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {schools.map((school) => (
              <button
                key={school}
                onClick={() => setSelectedSchool(school)}
                className={`px-5 py-2 rounded-full border text-sm font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700
                  ${selectedSchool === school ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'}`}
              >
                {school}
              </button>
            ))}
          </div>

          {/* Filtered Programs */}
          <motion.div
            key={selectedDegree + selectedSchool + searchTerm}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4"
          >
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {filteredPrograms.length === 0 && (
                <div className="col-span-2 text-center text-gray-500 py-12 text-lg">No programs found.</div>
              )}
              {filteredPrograms.map((program, index) => {
                const isEmerald = index % 2 === 0;
                const outlineColor = isEmerald ? 'border-emerald-700' : 'border-pink-600';
                const hoverBg = isEmerald ? 'hover:bg-emerald-700' : 'hover:bg-pink-600';
                const hoverText = 'hover:text-white';
                return (
                  <motion.div
                    key={program.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`relative bg-white rounded-xl shadow-sm border border-gray-300 p-6 font-sans flex flex-col min-h-[320px]`}
                  >
                    {/* No accent bar */}
                    <div className="flex items-center mb-2 mt-1">
                      <h4 className="text-lg font-extrabold text-gray-900 font-serif mr-2">{program.name}</h4>
                      <Badge className="border border-gray-300 bg-white text-gray-700 ml-auto text-xs font-bold px-3 py-1 rounded-full">{program.school}</Badge>
                    </div>
                    <p className="text-gray-700 text-sm leading-snug font-sans mb-3">{program.description}</p>
                    <div className="flex gap-3 mb-3">
                      <div className="flex items-center text-xs text-gray-700 bg-white border border-gray-200 rounded px-2 py-1">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />{program.duration}
                      </div>
                      <div className="flex items-center text-xs text-gray-700 bg-white border border-gray-200 rounded px-2 py-1">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-500" />{program.credits} credits
                      </div>
                      <div className="flex items-center text-xs text-gray-700 bg-white border border-gray-200 rounded px-2 py-1">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />{program.format}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs text-gray-500 font-semibold mb-1">Specializations:</div>
                      <div className="flex flex-wrap gap-1">
                        {program.specializations.map((spec, i) => (
                          <Badge key={i} variant="outline" className="text-xs px-2 py-0.5 border border-gray-300 text-gray-700 bg-white font-sans">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs text-gray-500 font-semibold mb-1">Careers:</div>
                      <div className="flex flex-wrap gap-1">
                        {program.careers.map((career, i) => (
                          <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5 border border-gray-300 text-gray-700 bg-white font-sans">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 font-semibold mb-1">Requirements:</div>
                      <div className="flex flex-wrap gap-1">
                        {program.requirements.map((req, i) => (
                          <Badge key={i} variant="outline" className="text-xs px-2 py-0.5 border border-gray-300 text-gray-700 bg-white font-sans">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex mt-auto">
                      <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button
                          size="lg"
                          variant="outline"
                          className={`w-full ${outlineColor} text-gray-800 bg-white ${hoverBg} ${hoverText} font-serif transition-colors duration-200`}
                        >
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
      <section className="py-12 md:py-20 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 font-serif">Why Choose Our Graduate Programs</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans mb-1">
                Distinctive features that set our graduate education apart
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="text-center p-6 rounded-xl bg-white shadow-sm border border-gray-300 font-sans"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <feature.icon className="h-7 w-7 text-gray-500" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 font-serif">{feature.title}</h3>
                <p className="text-gray-700 mb-2 text-sm leading-snug font-sans">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Opportunities */}
      <section className="py-12 md:py-20 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:gap-16 lg:grid-cols-2 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 font-serif">Research Opportunities</h2>
                <p className="text-base md:text-lg text-gray-700 mb-6 font-sans">
                  Join cutting-edge research projects that address real-world challenges and contribute to advancing knowledge in your field.
                </p>

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 mb-6">
                  {[
                    { label: "Active Research Projects", value: 85 },
                    { label: "Research Funding", value: 2.5, suffix: "M", prefix: "$" },
                    { label: "Graduate Researchers", value: 320 },
                    { label: "Publications per Year", value: 180 },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded-xl bg-white border border-gray-300 shadow-sm font-sans"
                    >
                      <div className="text-xl font-bold text-gray-900 mb-1 font-serif">
                        {stat.prefix}
                        <span>{stat.value}{stat.suffix}</span>
                      </div>
                      <div className="text-gray-600 text-sm font-sans">{stat.label}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

            <div className="relative">
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-4">
                      <Image
                        src="/research/research-students.jpg"
                        alt="Graduate Research"
                        width={300}
                        height={250}
                        className="rounded-xl shadow border border-gray-200 w-full h-auto object-cover"
                      />
                      <Image
                        src="/labs/in-the-lab-01.jpg"
                        alt="Lab Work"
                        width={300}
                        height={200}
                        className="rounded-xl shadow border border-gray-200 w-full h-auto object-cover"
                      />
                    </div>
                    <div className="space-y-4 mt-6">
                      <Image
                        src="/research/on-the-podium-05.jpg"
                        alt="Conference Presentation"
                        width={300}
                        height={200}
                        className="rounded-xl shadow border border-gray-200 w-full h-auto object-cover"
                      />
                      <Image
                        src="/research/on-the-podium.jpg"
                        alt="Research Collaboration"
                        width={300}
                        height={250}
                        className="rounded-xl shadow border border-gray-200 w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Success Stories */}
      <section className="py-12 md:py-20 bg-[#faf9f7] border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 font-serif">Graduate Success Stories</h2>
              <div className="mx-auto mb-3 flex w-12 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-emerald-700" />
                <div className="w-1/2 h-full bg-pink-600" />
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-sans mb-1">
                Meet our alumni who are leading innovation and research in their fields
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Amara Okafor",
                program: "MSc Information Technology '23",
                achievement: "Lead AI Researcher at Microsoft",
                story:
                  "The research opportunities and mentorship at The Unity University prepared me to lead groundbreaking AI projects.",
                image: "/alumni/alumni-09.jpg",
                accent: "emerald",
              },
              {
                name: "Maria Santos",
                program: "MBA '22",
                achievement: "CEO of Sustainable Energy Corp",
                story:
                  "The MBA program's focus on sustainable business practices shaped my vision for renewable energy solutions.",
                image: "/alumni/alumni-02.jpg",
                accent: "pink",
              },
              {
                name: "James Kwame",
                program: "MPH '24",
                achievement: "WHO Regional Director",
                story:
                  "The Unity University's global health perspective and research training prepared me for leadership in international health.",
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
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-gray-200 bg-gray-100 flex items-center justify-center" style={{ marginTop: '56px' }}>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 font-serif">Ready to Advance Your Career?</h2>
            <div className="w-10 h-1 bg-emerald-700 mx-auto mb-4 rounded-full" />
            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-6 font-sans">
              Apply now or contact graduate admissions to take the next step.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-emerald-700 text-gray-800 bg-white hover:bg-emerald-700 hover:text-white font-serif transition-colors duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-pink-600 text-gray-800 bg-white hover:bg-pink-600 hover:text-white font-serif transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Contact Graduate Admissions</span>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-pink-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 10.5a8.38 8.38 0 01-1.9.82 3.48 3.48 0 00-6.6 1.18v.5A8.5 8.5 0 013 6.5v-.5a3.5 3.5 0 013.5-3.5h.5A8.5 8.5 0 0121 10.5z' /></svg>
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
