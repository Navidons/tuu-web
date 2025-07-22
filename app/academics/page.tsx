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
      dean: "Mugabi Ezira",
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
              fill
              className="w-full h-full object-cover object-center"
              style={{filter:'brightness(0.7)'}}
            />
            <div className="absolute inset-0 bg-white/70" />
        </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-black mb-6 md:mb-8 leading-tight uppercase tracking-wide border-b-4 border-emerald-700 inline-block pb-2">Academic Excellence</h1>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 font-serif">
                Discover world-class academic programs designed to prepare you for success in an interconnected global economy. Excellence in education, innovation in learning.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link href="/academics/undergraduate">
                  <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 px-8 py-4 text-lg font-bold font-serif rounded-full">
                    Explore Programs
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/academics/calendar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-bold font-serif rounded-full"
                  >
                    Academic Calendar
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Academic Statistics */}
        <section className="py-14 md:py-20 bg-white border-b-4 border-emerald-700 font-serif">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 uppercase tracking-wide border-b-4 border-pink-600 inline-block pb-2 font-serif">Academic Excellence by Numbers</h2>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-serif mb-8">
                Our commitment to quality education reflected in our achievements
              </p>
          </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
                { label: "Academic Programs", value: 37, suffix: "+", description: "Across all levels", color: "green" },
                { label: "Faculty Members", value: 153, suffix: "+", description: "Expert educators", color: "pink" },
                { label: "Research Projects", value: 85, suffix: "+", description: "Active research", color: "green" },
                { label: "Graduate Success Rate", value: 95, suffix: "%", description: "Career placement", color: "pink" },
            ].map((stat, index) => (
                <div
                key={stat.label}
                  className={`text-center p-8 rounded-md bg-white border-2 font-serif shadow-sm ${stat.color === 'green' ? 'border-emerald-700' : 'border-pink-600'}`}
                >
                  <div className={`text-4xl font-extrabold mb-2 font-serif ${stat.color === 'green' ? 'text-emerald-700' : 'text-pink-600'}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold text-black mb-2 font-serif uppercase tracking-wide">{stat.label}</div>
                  <div className="text-gray-800 text-sm font-serif">{stat.description}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

        {/* Academic Programs Overview - Home Page Style */}
        <section className="py-14 md:py-20 bg-white border-b-4 border-pink-600 font-serif">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 uppercase tracking-wide border-b-4 border-emerald-700 inline-block pb-2 font-serif">Academic Programs</h2>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-serif mb-8">
                Comprehensive educational pathways from undergraduate to professional development
              </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
              {academicPrograms.map((program, idx) => {
                const borderColor = idx % 2 === 0 ? 'border-emerald-700' : 'border-pink-600';
                const iconColor = idx % 2 === 0 ? 'text-emerald-700' : 'text-pink-600';
                const statColor = idx % 2 === 0 ? 'text-emerald-700' : 'text-pink-600';
                // Subtle paper texture SVG
                const paperTexture = "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" fill=\"%23fff\"/><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"%23e5e5e5\"/><circle cx=\"80\" cy=\"60\" r=\"1\" fill=\"%23e5e5e5\"/><circle cx=\"50\" cy=\"80\" r=\"0.7\" fill=\"%23e5e5e5\"/><circle cx=\"70\" cy=\"30\" r=\"0.5\" fill=\"%23e5e5e5\"/><circle cx=\"30\" cy=\"70\" r=\"0.5\" fill=\"%23e5e5e5\"/></svg>')";
                return (
                <Link key={program.level} href={program.href} className="block h-full">
                    <div
                      className={`relative bg-white border-2 ${borderColor} rounded-xl p-8 shadow-lg flex flex-col h-full font-serif`}
                      style={{ backgroundImage: paperTexture, backgroundBlendMode: 'multiply' }}
                    >
                      {/* Thin header line */}
                      <div className={`absolute top-0 left-0 w-full h-2 rounded-t-xl ${borderColor} bg-opacity-20`} />
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 ${borderColor} bg-white z-10`}>
                        <program.icon className={`h-8 w-8 ${iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-black mb-4 uppercase tracking-wide z-10">{program.level}</h3>
                      <p className="text-gray-800 mb-6 leading-relaxed font-serif z-10">{program.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6 z-10">
                        <div className="text-center">
                          <div className={`text-xl font-bold ${statColor}`}>{program.programs}</div>
                        <div className="text-xs text-gray-600">Programs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-black">{program.duration}</div>
                          <div className="text-xs text-gray-600">Duration</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-auto z-10">
                        <span className={`inline-block ${borderColor === 'border-emerald-700' ? 'bg-emerald-700' : 'bg-pink-600'} text-white px-4 py-2 rounded font-semibold text-sm font-serif`}>Explore {program.level}</span>
                        <ArrowRight className={`ml-2 h-4 w-4 ${iconColor}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Schools and Colleges */}
      <section className="py-16 md:py-24 bg-white border-b-4 border-emerald-700 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-6 uppercase tracking-wide border-b-4 border-pink-600 inline-block pb-2 font-serif">Schools & Colleges</h2>
            <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto font-serif">
                Specialized schools offering focused education in diverse fields of study
              </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {schools.map((school, idx) => {
              const borderColor = idx % 2 === 0 ? 'border-emerald-700' : 'border-pink-600';
              const mastheadColor = idx % 2 === 0 ? 'bg-emerald-700' : 'bg-pink-600';
              const titleUnderline = idx % 2 === 0 ? 'border-emerald-700' : 'border-pink-600';
              const badgeColor = idx % 2 === 0 ? 'bg-emerald-700 text-white' : 'bg-pink-600 text-white';
              const paperTextureFixed = "url('data:image/svg+xml;utf8,<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='%23fff'/><circle cx='20' cy='20' r='1' fill='%23e5e5e5'/><circle cx='80' cy='60' r='1' fill='%23e5e5e5'/><circle cx='50' cy='80' r='0.7' fill='%23e5e5e5'/><circle cx='70' cy='30' r='0.5' fill='%23e5e5e5'/><circle cx='30' cy='70' r='0.5' fill='%23e5e5e5'/></svg>')";
              return (
                <Link
                key={school.name}
                  href="/admissions/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div
                    className={`relative bg-white border-2 ${borderColor} rounded-xl shadow-lg overflow-hidden flex flex-col h-full font-serif`}
                    style={{ backgroundImage: paperTextureFixed, backgroundBlendMode: 'multiply' }}
                  >
                    {/* Masthead bar */}
                    <div className={`absolute top-0 left-0 w-full h-4 ${mastheadColor} opacity-90 z-10`} />
                    {/* School image with overlay */}
                    <div className="relative h-48 w-full">
                  <Image
                    src={school.image || "/placeholder.svg"}
                        alt={`${school.name} campus`}
                    fill
                        className="object-cover"
                        style={{ zIndex: 1 }}
                      />
                      <div className="absolute inset-0 bg-black/30 z-10" />
                      {/* School name as masthead */}
                      <div className={`absolute top-2 left-0 w-full text-center z-20 pointer-events-none`}>
                        <span className="text-lg font-extrabold uppercase tracking-wide text-white drop-shadow font-serif" style={{letterSpacing:'0.08em'}}>{school.name}</span>
                </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Byline for dean */}
                      <div className="italic text-xs text-gray-500 mb-2 font-serif">By Dean: {school.dean}</div>
                      <h4 className={`text-xl font-extrabold text-black mb-3 font-serif uppercase tracking-wide border-b-2 pb-1 ${titleUnderline}`}>Programs Offered</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                      {school.programs.slice(0, 3).map((program, i) => (
                          <span
                            key={i}
                            className={`inline-block px-3 py-1 text-xs font-bold font-serif rounded-full shadow-sm ${badgeColor} rotate-[-2deg]`}
                            style={{boxShadow:'2px 2px 0 rgba(0,0,0,0.04)'}}
                          >
                          {program}
                          </span>
                        ))}
                        {school.programs.length > 3 ? (
                          <span className={`inline-block px-3 py-1 text-xs font-bold font-serif rounded-full shadow-sm ${badgeColor} rotate-[-2deg]`} style={{boxShadow:'2px 2px 0 rgba(0,0,0,0.04)'}}>+{school.programs.length - 3} more</span>
                        ) : null}
                    </div>
                      <div className="mt-auto flex justify-end">
                        <span className={`inline-block px-4 py-2 rounded font-semibold text-sm font-serif ${badgeColor} shadow-sm`}>Apply Now</span>
                  </div>
                    </div>
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

        {/* Academic Features - Home Page Style */}
        <section className="py-14 md:py-20 bg-white border-b-4 border-pink-600 font-serif">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 uppercase tracking-wide border-b-4 border-emerald-700 inline-block pb-2 font-serif">Why Choose The Unity University</h2>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-serif mb-8">
                Distinctive features that set our academic programs apart
              </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, idx) => {
                const borderColor = idx % 2 === 0 ? 'border-emerald-700' : 'border-pink-600';
                const iconColor = idx % 2 === 0 ? 'text-emerald-700' : 'text-pink-600';
                const statColor = idx % 2 === 0 ? 'text-emerald-700' : 'text-pink-600';
                const paperTexture = "url('data:image/svg+xml;utf8,<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='%23fff'/><circle cx='20' cy='20' r='1' fill='%23e5e5e5'/><circle cx='80' cy='60' r='1' fill='%23e5e5e5'/><circle cx='50' cy='80' r='0.7' fill='%23e5e5e5'/><circle cx='70' cy='30' r='0.5' fill='%23e5e5e5'/><circle cx='30' cy='70' r='0.5' fill='%23e5e5e5'/></svg>')";
                return (
                  <div key={feature.title} className={`text-center p-8 rounded-xl bg-white border-2 ${borderColor} shadow-lg font-serif flex flex-col items-center`} style={{ backgroundImage: paperTexture, backgroundBlendMode: 'multiply' }}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 ${borderColor} bg-white`}>
                      <feature.icon className={`h-8 w-8 ${iconColor}`} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-black mb-4 uppercase tracking-wide">{feature.title}</h3>
                    <p className="text-gray-800 mb-4 leading-relaxed font-serif">{feature.description}</p>
                    <div className={`text-lg font-bold ${statColor}`}>{feature.stat}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

        {/* Research & Innovation Hub - Enhanced Newspaper Style */}
        <section className="py-16 md:py-24 bg-white border-b-4 border-emerald-700 font-serif">
        <div className="container mx-auto px-4">
            <div className="text-center mb-14 md:mb-20">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-2 uppercase tracking-wide border-b-4 border-pink-600 inline-block pb-2 font-serif">Research & Innovation Hub</h2>
              <div className="flex justify-center mb-4">
                <hr className="w-24 border-t-2 border-emerald-700" />
              </div>
              <p className="italic text-black/70 max-w-xl mx-auto mb-4 font-serif text-base md:text-lg">“Advancing knowledge, fostering discovery, and driving innovation for Africa and the world.”</p>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-serif mb-8">Our commitment to research excellence drives innovation and creates solutions for real-world challenges across Africa and beyond.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                { label: "Research Centers", value: 15, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M8 12l2 2 4-4'/></svg>, color: 'emerald' },
                { label: "Active Projects", value: 150, icon: <svg className='h-7 w-7 text-pink-600' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2'/><path d='M9 9h6v6H9z'/></svg>, color: 'pink' },
                { label: "Publications", value: 450, icon: <svg className='h-7 w-7 text-emerald-700' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M20 22V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5V22'/></svg>, color: 'emerald' },
                { label: "Patents Filed", value: 28, icon: <svg className='h-7 w-7 text-pink-600' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10'/><path d='M12 8v4l3 3'/></svg>, color: 'pink' },
              ].map((stat, idx) => {
                const borderColor = stat.color === 'emerald' ? 'border-emerald-700' : 'border-pink-600';
                const statColor = stat.color === 'emerald' ? 'text-emerald-700' : 'text-pink-600';
                const paperTexture = "url('data:image/svg+xml;utf8,<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='%23fff'/><circle cx='20' cy='20' r='1' fill='%23e5e5e5'/><circle cx='80' cy='60' r='1' fill='%23e5e5e5'/><circle cx='50' cy='80' r='0.7' fill='%23e5e5e5'/><circle cx='70' cy='30' r='0.5' fill='%23e5e5e5'/><circle cx='30' cy='70' r='0.5' fill='%23e5e5e5'/></svg>')";
                return (
                  <div key={stat.label} className={`relative text-center p-8 rounded-xl bg-white border-2 ${borderColor} shadow-lg font-serif flex flex-col items-center`} style={{ backgroundImage: paperTexture, backgroundBlendMode: 'multiply' }}>
                  <div className="mb-3">{stat.icon}</div>
                    <div className={`text-4xl font-extrabold mb-1 font-serif ${statColor}`} style={{fontFamily:'serif', fontVariant:'small-caps'}}>
                    <span className="text-5xl align-top" style={{fontWeight:700}}><AnimatedCounter end={stat.value} suffix="+" /></span>
                      </div>
                    <div className="text-lg font-semibold text-black mb-2 font-serif uppercase tracking-wide">{stat.label}</div>
                </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800 px-10 py-4 text-lg font-bold border-2 border-emerald-700 w-full sm:w-auto mx-auto text-center rounded-full flex items-center gap-2 font-serif">
                <svg className="h-5 w-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                Explore Research Opportunities
                <ArrowRight className="ml-3 h-6 w-6 text-white" />
              </Button>
          </div>
        </div>
      </section>

        {/* Academic Resources - Editorial Style with Pink/Red & Green */}
        <section className="py-14 md:py-20 bg-white border-b-4 border-emerald-700 font-serif">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6 uppercase tracking-wide border-b-4 border-pink-600 inline-block pb-2 font-serif">Academic Resources</h2>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-serif mb-8">Everything you need to succeed in your academic journey</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Foundation Programs",
                description: "Preparatory programs to build core academic skills",
                href: "/academics/foundation",
                  icon: <svg className="h-10 w-10 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M6 20V14"/><path d="M18 20V16"/><path d="M2 20h20"/><path d="M12 4v2"/><path d="M12 8v2"/></svg>,
                  color: "emerald",
              },
              {
                title: "Undergraduate Programs",
                description: "Bachelor's degree programs across multiple disciplines",
                href: "/academics/undergraduate",
                  icon: <svg className="h-10 w-10 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l9.5 7-9.5 7-9.5-7z"/><path d="M3 10v6a9 9 0 0 0 18 0v-6"/></svg>,
                  color: "pink",
              },
              {
                title: "Graduate Programs",
                description: "Advanced master's and doctoral degree programs",
                href: "/academics/graduate",
                  icon: <svg className="h-10 w-10 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l9.5 7-9.5 7-9.5-7z"/><path d="M12 21v-4"/></svg>,
                  color: "emerald",
              },
              {
                title: "Academic Calendar",
                description: "Important dates, deadlines, and academic schedule",
                href: "/academics/calendar",
                  icon: <svg className="h-10 w-10 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
                  color: "pink",
                },
              ].map((item, idx) => {
                const borderColor = item.color === 'emerald' ? 'border-emerald-700' : 'border-pink-600';
                const badgeColor = item.color === 'emerald' ? 'bg-emerald-700 text-white' : 'bg-pink-600 text-white';
                const paperTexture = "url('data:image/svg+xml;utf8,<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='%23fff'/><circle cx='20' cy='20' r='1' fill='%23e5e5e5'/><circle cx='80' cy='60' r='1' fill='%23e5e5e5'/><circle cx='50' cy='80' r='0.7' fill='%23e5e5e5'/><circle cx='70' cy='30' r='0.5' fill='%23e5e5e5'/><circle cx='30' cy='70' r='0.5' fill='%23e5e5e5'/></svg>')";
                return (
                <Link key={item.title} href={item.href} className="block h-full">
                    <div className={`bg-white border-2 ${borderColor} rounded-xl p-8 shadow-lg flex flex-col items-center text-center h-full font-serif`} style={{ backgroundImage: paperTexture, backgroundBlendMode: 'multiply' }}>
                    <div className="mb-6">{item.icon}</div>
                      <h3 className="text-xl font-serif font-bold text-black mb-4 uppercase tracking-wide">{item.title}</h3>
                      <p className="text-gray-800 mb-6 leading-relaxed font-serif">{item.description}</p>
                      <span className={`inline-block px-4 py-2 rounded font-semibold text-sm font-serif ${badgeColor}`}>Learn More</span>
                  </div>
                </Link>
                );
              })}
            </div>
        </div>
      </section>

        {/* Call to Action - Old Newspaper Style */}
        <section className="py-20 bg-white border-t-4 border-pink-600 border-b-4 border-emerald-700 font-serif">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-8 uppercase tracking-wide border-b-4 border-emerald-700 inline-block pb-2 font-serif">Ready to Begin Your Academic Journey?</h2>
            <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-10 font-serif">
              Join thousands of students who have chosen The Unity University for their academic excellence and global perspective.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 border-2 border-emerald-700 px-10 py-4 text-lg font-bold font-serif rounded-full flex items-center gap-2">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6 text-white" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink-600 text-pink-600 bg-white hover:bg-pink-600 hover:text-white px-10 py-4 text-lg font-bold font-serif rounded-full flex items-center gap-2"
                >
                  <svg className="h-5 w-5 text-pink-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M21 10.5l-9 5.5-9-5.5"/><path d="M17 17v5"/><path d="M17 22l2-2 2 2"/></svg>
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
