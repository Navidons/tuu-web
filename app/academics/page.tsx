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
import Head from "next/head"

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
      level: "Foundation",
      description: "Preparatory programs to build core academic skills and knowledge",
      duration: "1 year",
      programs: 5,
      students: 600,
      href: "/academics/foundation",
      icon: Award,
      color: "from-emerald-500 to-purple-600",
      bgColor: "from-emerald-50 to-purple-50",
    },
    {
      level: "Undergraduate",
      description: "Bachelor's degree programs designed to provide comprehensive foundation knowledge",
      duration: "3 years",
      programs: 18,
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
      programs: 14,
      students: 1800,
      href: "/academics/graduate",
      icon: GraduationCap,
      color: "from-blue-500 to-emerald-600",
      bgColor: "from-blue-50 to-emerald-50",
    },
  ]

  const schools = [
    {
      name: "Faculty of Business & Management",
      dean: "Mugabi Dainel",
      programs: ["Business Administration", "Accounting & Finance", "Human Resource Management", "Banking & Finance", "Marketing", "Procurement & Supply Chain"],
      students: 280,
      faculty: 35,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Faculty of Computing & Information Technology",
      dean: "Jackson Kisuule",
      programs: ["Computer Science", "Software Engineering", "Information Technology"],
      students: 250,
      faculty: 28,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-emerald-500 to-blue-600",
    },
    {
      name: "Faculty of Allied Health Sciences",
      dean: "Samsom Kiggundu",
      programs: ["Public Health", "Nutrition and Food Science", "Health Service & Management"],
      students: 220,
      faculty: 32,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Faculty of Social Sciences",
      dean: "Lutaaya Daniel",
      programs: ["International Relations", "Public Administration", "Development Studies", "Social Work", "Public Relations & Media"],
      students: 290,
      faculty: 40,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Faculty of Education",
      dean: "Ganja Martin",
      programs: ["Education Policy & Planning", "Education Leadership & Management"],
      students: 180,
      faculty: 18,
      image: "/placeholder.svg?height=300&width=400",
      color: "from-orange-500 to-yellow-600",
    },
  ]

  const features = [
    {
      title: "World-Class Faculty",
      description: "Learn from distinguished professors and industry experts",
      icon: Users,
      stat: "5+ Faculty",
    },
    {
      title: "Research Excellence",
      description: "Cutting-edge research facilities and opportunities",
      icon: Microscope,
      stat: "5 Research Centers",
    },
    {
      title: "Global Perspective",
      description: "International partnerships and exchange programs",
      icon: Globe,
      stat: "15+ Partner Universities",
    },
    {
      title: "Career Success",
      description: "High employment rates and career advancement",
      icon: Award,
      stat: "95% Employment Rate",
    },
  ]

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Business Administration",
              "description": "Comprehensive study of management, marketing, and operations for future business leaders.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "occupationalCategory": "Business & Management",
              "hasCourse": ["Accounting & Finance", "Human Resource Management", "Banking & Finance", "Marketing", "Procurement & Supply Chain"],
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/business-class.jpg",
              "location": {
                "@type": "Place",
                "name": "Somaliland & Liberia Campuses",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland & Monrovia, Liberia"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Computer Science",
              "description": "Foundations of computer science, software engineering, and digital innovation.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "occupationalCategory": "Computing & IT",
              "hasCourse": ["Software Engineering", "Information Technology"],
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/computer-science.jpg",
              "location": {
                "@type": "Place",
                "name": "Somaliland & Liberia Campuses",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland & Monrovia, Liberia"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Health Sciences",
              "description": "Programs in public health, nutrition, and healthcare management.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "occupationalCategory": "Health Sciences",
              "hasCourse": ["Public Health", "Nutrition and Food Science", "Health Service & Management"],
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/health-sciences.jpg",
              "location": {
                "@type": "Place",
                "name": "Somaliland & Liberia Campuses",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland & Monrovia, Liberia"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Social Sciences",
              "description": "International relations, public administration, development studies, and social work.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "occupationalCategory": "Social Sciences",
              "hasCourse": ["International Relations", "Public Administration", "Development Studies", "Social Work", "Public Relations & Media"],
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/international-relations.jpg",
              "location": {
                "@type": "Place",
                "name": "Somaliland & Liberia Campuses",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland & Monrovia, Liberia"
                }
              }
            },
            {
              "@type": "EducationalOccupationalProgram",
              "name": "Education",
              "description": "Education policy, leadership, and classroom practice.",
              "provider": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "occupationalCategory": "Education",
              "hasCourse": ["Education Policy & Planning", "Education Leadership & Management"],
              "programPrerequisites": "High School Diploma or equivalent",
              "educationalCredentialAwarded": "Bachelor's Degree",
              "image": "https://tuu.university/courses/library.jpg",
              "location": {
                "@type": "Place",
                "name": "Somaliland & Liberia Campuses",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Hargeisa, Somaliland & Monrovia, Liberia"
                }
              }
            }
          ]
        }` }} />
      </Head>
      <div className="min-h-screen bg-[#faf9f7]">
      <EnhancedNavbar />

        {/* Hero Section - Old Newspaper Style with Background Image */}
        <section className="relative py-14 md:py-20 bg-white border-b border-gray-200 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-section/graduation-day.jpg"
              alt="Graduation Day"
              className="w-full h-full object-cover object-center"
              style={{filter:'brightness(0.7)'}}
            />
            <div className="absolute inset-0 bg-white/70" />
        </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <Badge className="bg-emerald-700 text-white px-6 py-2 text-base font-semibold mb-6">Academics</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-gray-900 mb-6 md:mb-8 leading-tight">Academic Excellence</h1>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 font-serif">
                Discover world-class academic programs designed to prepare you for success in an interconnected global economy. Excellence in education, innovation in learning.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link href="/academics/undergraduate">
                  <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 px-8 py-4 text-lg font-bold">
                    Explore Programs
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/academics/calendar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-bold"
                  >
                    Academic Calendar
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Academic Statistics */}
        <section className="py-14 md:py-20 bg-[#faf9f7] border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">Academic Excellence by Numbers</h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">
                Our commitment to quality education reflected in our achievements
              </p>
          </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Academic Programs", value: 37, suffix: "+", description: "Across all levels" },
              { label: "Faculty Members", value: 153, suffix: "+", description: "Expert educators" },
              { label: "Research Projects", value: 85, suffix: "+", description: "Active research" },
              { label: "Graduate Success Rate", value: 95, suffix: "%", description: "Career placement" },
            ].map((stat, index) => (
                <div
                key={stat.label}
                  className="text-center p-8 rounded-md bg-white border border-gray-200 shadow-sm font-serif"
                >
                  <div className="text-4xl font-bold text-purple-700 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-700 text-sm">{stat.description}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

        {/* Academic Programs Overview - Home Page Style */}
        <section className="py-14 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">Academic Programs</h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">
                Comprehensive educational pathways from undergraduate to professional development
              </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
              {academicPrograms.map((program) => (
                <Link key={program.level} href={program.href} className="block h-full">
                  <div className="bg-white border-2 border-emerald-600 rounded-xl p-8 shadow-sm flex flex-col h-full">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 border-2 border-emerald-600">
                      <program.icon className="h-8 w-8 text-emerald-700" />
                      </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{program.level}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-serif">{program.description}</p>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                        <div className="text-xl font-bold text-emerald-700">{program.programs}</div>
                        <div className="text-xs text-gray-600">Programs</div>
                        </div>
                        <div className="text-center">
                        <div className="text-xl font-bold text-blue-700">{program.students}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-700">{program.duration}</div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                      <span className="inline-block bg-emerald-700 text-white px-4 py-2 rounded font-semibold text-sm">Explore {program.level}</span>
                      <ArrowRight className="ml-2 h-4 w-4 text-emerald-700" />
                    </div>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schools and Colleges */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Schools & Colleges</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized schools offering focused education in diverse fields of study
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <Link
                key={school.name}
                  href="/admissions/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full cursor-pointer hover:border-emerald-700 transition">
                <div className="relative h-48">
                  <Image
                    src={school.image || "/placeholder.svg"}
                        alt={`${school.name} campus`}
                    fill
                        className="object-cover"
                  />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-serif font-bold text-white mb-1">{school.name}</h3>
                        <p className="text-white/90 text-sm font-serif">Dean: {school.dean}</p>
                </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 font-serif">Programs Offered:</h4>
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
                    </div>
                </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

        {/* Academic Features - Home Page Style */}
        <section className="py-14 md:py-20 bg-[#faf9f7] border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">Why Choose The Unity University</h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">
                Distinctive features that set our academic programs apart
              </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center p-8 rounded-xl bg-white border-2 border-emerald-600 shadow-sm font-serif flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-600">
                    <feature.icon className="h-8 w-8 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed font-serif">{feature.description}</p>
                  <div className="text-lg font-bold text-emerald-700">{feature.stat}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

        {/* Research & Innovation Hub - Enhanced Newspaper Style */}
        <section className="py-16 md:py-24 bg-[#faf9f7] border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 mb-2">Research & Innovation Hub</h2>
              <div className="flex justify-center mb-4">
                <hr className="w-24 border-t-2 border-emerald-700" />
              </div>
              <p className="italic text-gray-600 max-w-xl mx-auto mb-4 font-serif text-base md:text-lg">“Advancing knowledge, fostering discovery, and driving innovation for Africa and the world.”</p>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">Our commitment to research excellence drives innovation and creates solutions for real-world challenges across Africa and beyond.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                { label: "Research Centers", value: 15, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M8 12l2 2 4-4'/></svg> },
                { label: "Active Projects", value: 150, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2'/><path d='M9 9h6v6H9z'/></svg> },
                { label: "Publications", value: 450, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M20 22V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5V22'/></svg> },
                { label: "Patents Filed", value: 28, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg> },
              ].map((stat) => (
                <div key={stat.label} className="relative text-center p-8 rounded-xl bg-white border border-gray-200 border-b-4 border-b-emerald-700 shadow-md font-serif flex flex-col items-center" style={{backgroundImage:'repeating-linear-gradient(135deg,rgba(16,185,129,0.03)_0px,rgba(16,185,129,0.03)_2px,transparent_2px,transparent_8px)'}}>
                  <div className="mb-3">{stat.icon}</div>
                  <div className="text-4xl font-extrabold text-emerald-700 mb-1" style={{fontFamily:'serif', fontVariant:'small-caps'}}>
                    <span className="text-5xl align-top" style={{fontWeight:700}}><AnimatedCounter end={stat.value} suffix="+" /></span>
                      </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button className="bg-emerald-800 text-white hover:bg-emerald-700 px-10 py-4 text-lg font-bold border border-emerald-600 w-full sm:w-auto mx-auto text-center rounded-full flex items-center gap-2">
                <svg className="h-5 w-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                Explore Research Opportunities
                <ArrowRight className="ml-3 h-6 w-6 text-white" />
              </Button>
          </div>
        </div>
      </section>

        {/* Academic Resources - Editorial Style with Pink/Red & Green */}
        <section className="py-14 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">Academic Resources</h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">Everything you need to succeed in your academic journey</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Foundation Programs",
                description: "Preparatory programs to build core academic skills",
                href: "/academics/foundation",
                  icon: <svg className="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M6 20V14"/><path d="M18 20V16"/><path d="M2 20h20"/><path d="M12 4v2"/><path d="M12 8v2"/></svg>,
                  border: "border-emerald-600",
              },
              {
                title: "Undergraduate Programs",
                description: "Bachelor's degree programs across multiple disciplines",
                href: "/academics/undergraduate",
                  icon: <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l9.5 7-9.5 7-9.5-7z"/><path d="M3 10v6a9 9 0 0 0 18 0v-6"/></svg>,
                  border: "border-red-600",
              },
              {
                title: "Graduate Programs",
                description: "Advanced master's and doctoral degree programs",
                href: "/academics/graduate",
                  icon: <svg className="h-10 w-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l9.5 7-9.5 7-9.5-7z"/><path d="M12 21v-4"/></svg>,
                  border: "border-emerald-600",
              },
              {
                title: "Academic Calendar",
                description: "Important dates, deadlines, and academic schedule",
                href: "/academics/calendar",
                  icon: <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
                  border: "border-red-600",
                },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="block h-full">
                  <div className={`bg-white border-2 ${item.border} rounded-xl p-8 shadow-sm flex flex-col items-center text-center h-full`}>
                    <div className="mb-6">{item.icon}</div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-serif">{item.description}</p>
                    <span className={`inline-block px-4 py-2 rounded font-semibold text-sm ${item.border === 'border-emerald-600' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>Learn More</span>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

        {/* Call to Action - Old Newspaper Style */}
        <section className="py-20 bg-[#faf9f7] border-t border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 mb-8">Ready to Begin Your Academic Journey?</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 font-serif">
              Join thousands of students who have chosen The Unity University for their academic excellence and global perspective.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 px-10 py-4 text-lg font-bold rounded-full flex items-center gap-2">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6 text-white" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-700 text-emerald-700 bg-white hover:bg-emerald-700 hover:text-white px-10 py-4 text-lg font-bold rounded-full flex items-center gap-2"
                >
                  <svg className="h-5 w-5 text-emerald-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M21 10.5l-9 5.5-9-5.5"/><path d="M17 17v5"/><path d="M17 22l2-2 2 2"/></svg>
                  Contact Academic Affairs
                </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
    </>
  )
}
