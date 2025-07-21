"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Globe, ExternalLink, Mail, Phone, Users, Mic, Trophy, FlaskConical, BookOpen, Calendar, HeartPulse, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import EnhancedFooter from "@/components/enhanced-footer"
import { cn } from "@/lib/utils"

// Liberia Flag component (copied from navbar)
const LiberiaFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-sm shadow-sm border border-white/20 animate-flag-wave")}
    >
      {/* Stripes */}
      <div className="liberian-flag-gradient w-full h-full" />

      {/* Blue canton with white star */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[10px] h-[10px] text-white fill-current drop-shadow-sm"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

// Static particle positions to ensure consistent SSR/CSR rendering
const PARTICLE_POSITIONS = [
  { x: 100, y: 200, delay: 0 },
  { x: 300, y: 150, delay: 0.5 },
  { x: 500, y: 300, delay: 1 },
  { x: 700, y: 100, delay: 1.5 },
  { x: 900, y: 250, delay: 2 },
  { x: 200, y: 400, delay: 2.5 },
  { x: 600, y: 350, delay: 3 },
  { x: 800, y: 180, delay: 3.5 },
  { x: 400, y: 120, delay: 4 },
  { x: 1000, y: 280, delay: 4.5 },
  { x: 150, y: 320, delay: 5 },
  { x: 750, y: 220, delay: 5.5 },
]

// Floating particles component with hydration-safe rendering
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {PARTICLE_POSITIONS.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 rounded-full ${
            i % 3 === 0 ? "bg-emerald-300/20" : i % 3 === 1 ? "bg-red-300/20" : "bg-white/30"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
      {mounted && (
        <>
          {PARTICLE_POSITIONS.map((particle, i) => (
            <motion.div
              key={`particle-motion-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? "bg-emerald-300/20" : i % 3 === 1 ? "bg-red-300/20" : "bg-white/30"
              }`}
              style={{
                left: particle.x,
                top: particle.y,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, i % 2 === 0 ? 30 : -30, 0],
                opacity: [0, 0.6, 0],
                scale: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + (i % 2), // Reduced from 6 + (i % 4)
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

// Animated counter component with hydration safety
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

export default function UnityUniversityHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 8000)

    return () => clearInterval(interval)
  }, [mounted])

  const heroSlides = [
    {
      image: "/hero-section/all-on-graduation-pic.jpg",
      title: "The Unity University",
      subtitle: "What begins here, transforms Africa",
      description: "Africa's pioneer, non-profit, tuition-free accredited university dedicated to raising a new generation of leaders for the African continent. Growing every day since 2020.",
      cta: "Discover Our Programs",
      foundationCaption: "Empowering Africa's future, inspired by the vision of Prof. PLO Lumumba and the PLO Lumumba Foundation.",
      circleImage: "/hero-section/all-on-graduation-pic.jpg", // Graduation image
    },
    {
      image: "/hero-section/global-perspective.jpg",
      title: "Pan-African Excellence",
      subtitle: "5 Years of Growth & Innovation",
      description: "From our founding in 2020 to today, we've been pioneering excellence at the cutting edge of learning through holistic, human development and integrated learning curriculum.",
      cta: "Explore Academics",
      foundationCaption: "A mission for free, quality education across Africa, led by the PLO Lumumba Foundation.",
      circleImage: "/lecturers/plo-lumumba.jpeg", // Lumumba Foundation image
    },
    {
      image: "/hero-section/graduation-day.jpg",
      title: "Transform Your Future",
      subtitle: "50% Scholarships Available",
      description: "Excellent education within reach of all passionate and driven students. Join our rapidly growing community with comprehensive scholarship opportunities.",
      cta: "Apply for Scholarship",
      foundationCaption: "Graduation day: a testament to the Foundation's commitment to accessible education for all.",
      circleImage: "/hero-section/graduation-day.jpg", // Another graduation image
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden overflow-x-hidden">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:h-[80vh] flex items-center bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-purple-900/80 overflow-hidden max-w-full">
        {/* Hero Image with overlay */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.image} // Use image path as a stable key
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: currentSlide === index ? 1 : 0 }}
              priority={index === 0} // Only prioritize the first image
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full flex flex-col md:flex-row items-center h-full pb-16">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <Badge className="bg-purple-600 text-white px-6 py-2 text-base font-semibold shadow-lg mb-2">
              {heroSlides[currentSlide].subtitle}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="relative w-20 h-20 md:w-28 md:h-28 mr-4">
                <Image
                  src="/lecturers/plo-lumumba.jpeg"
                  alt="Prof. PLO Lumumba"
                  fill
                  className="rounded-full border-4 border-emerald-500 shadow-xl object-cover"
                  style={{ objectPosition: 'top' }}
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">Founder & Chancellor</span>
              </div>
              <div className="text-left">
                <span className="block text-emerald-200 font-semibold text-sm md:text-base">
                  {heroSlides[currentSlide].foundationCaption}
                </span>
                <span className="block text-emerald-100 text-xs mt-1">PLO Lumumba Foundation</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-bold shadow-xl"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-900 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all duration-300"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Large Circular Image that changes with slides */}
          <div className="hidden md:flex w-1/2 justify-center items-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white/30 bg-white/10 flex items-center justify-center">
              <Image
                src={heroSlides[currentSlide].circleImage}
                alt="Slide Visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-8 rounded-full transition-all duration-500 ${
                  currentSlide === index ? "bg-white shadow-lg" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Campus Showcase Section */}
      <section className="py-16 md:py-20 bg-white border-y-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-2 tracking-wide uppercase border-b-4 border-emerald-600 inline-block pb-2">Our Global Campuses</h2>
            <div className="text-xs text-red-600 mt-1 mb-2 font-semibold">Excellence in Education Across Africa</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic">
              Excellence in education across two dynamic locations, each with its unique culture and opportunities.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Liberia Campus Card */}
            <div className="block border-2 border-red-500 bg-white shadow-sm p-0">
              <Link href="/liberia" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 w-full border-b-2 border-emerald-600 bg-gray-50">
                  <Image
                    src="/graduation/master-of-education.jpg"
                    alt="Liberia Campus"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2 shadow-sm rounded-md bg-opacity-90">
                    <LiberiaFlag className="h-6 w-8" />
                    <span className="text-red-700 font-bold text-sm">Liberia</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 rounded-md px-4 py-2 shadow-sm">
                    <h3 className="text-2xl font-bold text-red-700 mb-1 border-b-2 border-emerald-600 inline-block">Liberia Campus</h3>
                    <p className="text-gray-700">Monrovia, Montserrado County</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-red-700 mb-2">The Love of Liberty Brought Us Here</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Our newest campus expansion in Monrovia combines Liberian heritage with global academic excellence. We are rapidly growing and expanding our presence in West Africa.
                    </p>
                  </div>
                  {/* Removed numbers grid */}
                  <Button 
                    className="w-full bg-red-700 text-white hover:bg-red-800 shadow-md font-serif text-base rounded-full py-4 px-8 mt-2 transition-all duration-200 text-lg font-bold tracking-wide"
                    onClick={() => window.open('/liberia', '_blank')}
                  >
                    Visit Liberia Campus
                    <ExternalLink className="ml-2 h-5 w-5 text-white" />
                  </Button>
                </div>
              </Link>
            </div>

            {/* Somaliland Campus Card */}
            <div className="block border-2 border-emerald-600 bg-white shadow-sm p-0">
              <Link href="/somaliland" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 w-full border-b-2 border-red-500 bg-gray-50">
                  <Image
                    src="/hero-section/hero.png"
                    alt="Somaliland Campus"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2 shadow-sm rounded-md bg-opacity-90">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Somaliland.svg/1200px-Flag_of_Somaliland.svg.png"
                      alt="Somaliland Flag"
                      className="h-6 w-8 object-cover rounded-sm border border-gray-300"
                    />
                    <span className="text-emerald-800 font-bold text-sm">Somaliland</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 rounded-md px-4 py-2 shadow-sm">
                    <h3 className="text-2xl font-bold text-emerald-800 mb-1 border-b-2 border-red-500 inline-block">Somaliland Campus</h3>
                    <p className="text-gray-700">Hargeisa, Somaliland</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-emerald-800 mb-2">What begins here, transforms Africa</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Founded in 2020. Our rapidly growing campus embodies the spirit of Somaliland – innovation, resilience, and academic excellence.
                    </p>
                  </div>
                  {/* Removed numbers grid */}
                  <Button 
                    className="w-full bg-emerald-700 text-white hover:bg-emerald-800 shadow-md font-serif text-base rounded-full py-4 px-8 mt-2 transition-all duration-200 text-lg font-bold tracking-wide"
                    onClick={() => window.open('/somaliland', '_blank')}
                  >
                    Visit Somaliland Campus
                    <ExternalLink className="ml-2 h-5 w-5 text-white" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-32 bg-[#faf9f7] border-y-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 mb-6 md:mb-8 leading-tight border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Mission & Vision</h2>
              <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                Since our founding in 2020, The Unity University has been growing every day, believing that sustainable national and global development can be achieved through nurturing an intellectual culture that integrates theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.
              </p>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                <div className="bg-white border-l-4 border-emerald-600 p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-emerald-800 uppercase tracking-wide">Our Mission</h3>
                  <p className="text-sm md:text-base text-gray-700">
                    To contribute to the development and sustenance of the well-being of the people of Somaliland, Africa, and the world through the provision of flexible, innovative, entrepreneurial, inclusive programs of teaching, learning, research, and service.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-red-600 p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-red-700 uppercase tracking-wide">Our Vision</h3>
                  <p className="text-sm md:text-base text-gray-700">
                    To become a world-class University in leadership development in Africa.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/graduation/male-graduation.jpg"
                  alt="Graduation Ceremony"
                  width={800}
                  height={600}
                  className="w-full h-auto border-4 border-emerald-600 shadow-md"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white border border-emerald-600 rounded-md p-4 shadow-md w-64 text-center">
                  <div className="text-3xl font-bold text-emerald-700">
                    <AnimatedCounter end={98} />%
                  </div>
                  <div className="text-sm text-gray-700">Graduate Employability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-16 md:py-24 bg-[repeating-linear-gradient(135deg,_#f8f8f8_0px,_#f8f8f8_20px,_#f3f3f3_21px,_#f3f3f3_40px)] border-y border-gray-300 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-wide uppercase border-b-2 border-black inline-block pb-2">Academic Excellence</h2>
            <div className="text-xs text-gray-500 mt-1 mb-2">Published: {new Date().getFullYear()}</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic relative">
              <span className="float-left text-4xl font-extrabold text-gray-400 leading-none mr-2 not-italic select-none" style={{fontFamily:'serif'}}>
                E
              </span>
              xplore our diverse academic divisions, each dedicated to rigorous scholarship and real-world impact. Our programs are designed to equip students with timeless knowledge and practical skills for a changing world.
            </p>
          </div>

          <div className="grid gap-x-12 gap-y-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-b border-gray-300 divide-y md:divide-y-0 md:divide-x divide-gray-300 bg-transparent">
            {/* Business & Management */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Business & Management</span>
                      </div>
              <p className="text-gray-700 text-sm mb-2">
                Develop leadership, entrepreneurship, and analytical skills for the modern business world. Programs include Business Administration, Accounting, HR, Marketing, and Project Management.
              </p>
                  </div>
            {/* Computing & IT */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Computing & IT</span>
                    </div>
              <p className="text-gray-700 text-sm mb-2">
                Master the foundations of computer science, software engineering, and digital innovation. Courses cover programming, cybersecurity, IT management, and web development.
              </p>
                  </div>
            {/* Health Sciences */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 10c0-3.314-2.686-6-6-6s-6 2.686-6 6c0 4.418 6 10 6 10s6-5.582 6-10z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Health Sciences</span>
                </div>
              <p className="text-gray-700 text-sm mb-2">
                Prepare for careers in public health, nutrition, and healthcare management. Programs emphasize community health, research, and practical experience.
              </p>
            </div>
            {/* Social Sciences */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0v4m0 8v4m4-4h4m-8 0H4"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Social Sciences</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Study society, governance, and development. Courses include international relations, public administration, development studies, and social work.
              </p>
            </div>
            {/* Education */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16M4 15h16M4 11h16M4 7h16"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Education</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Train as an educator and leader. Our education division focuses on leadership, policy, curriculum development, and classroom practice.
              </p>
            </div>
            {/* Media & Communications */}
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center mb-3">
                <svg className="h-6 w-6 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V3h8v4"/><path d="M8 21h8"/></svg>
                <span className="text-xl font-bold text-gray-900 uppercase tracking-wide">Media & Communications</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Learn the art and science of communication in the digital age. Programs include public relations, media management, and digital communications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y border-gray-300 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-wide uppercase border-b-2 border-black inline-block pb-2">Vibrant Student Life</h2>
            <div className="text-xs text-gray-500 mt-1 mb-2">Campus Life Highlights</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic">
              Experience a rich campus culture that celebrates diversity, fosters growth, and creates lifelong connections.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-transparent">
            {/* Community Outreaches */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                  <Image
                  src="/community-outreaches/health-community-outreach-01.jpg"
                  alt="Community Outreaches"
                    fill
                  className="object-cover"
                  />
                  </div>
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Community Outreaches</span>
                </div>
              <p className="text-gray-700 text-sm mb-1">Impactful service and outreach programs</p>
              <div className="text-xs text-gray-500">50+ programs</div>
                </div>
            {/* Student Lecturers Talk */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/student-life/student-lecturer-talks.jpg"
                  alt="Student Lecturers Talk"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <Mic className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Student Lecturers Talk</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Inspiring talks and knowledge sharing by students and lecturers</p>
              <div className="text-xs text-gray-500">100+ sessions</div>
            </div>
            {/* Sports Teams */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/sports/sports.png"
                  alt="Sports Teams"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <Trophy className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Sports Teams</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Competitive athletics and team spirit</p>
              <div className="text-xs text-gray-500">25+ teams</div>
            </div>
            {/* Research Projects */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/research/research-students.jpg"
                  alt="Research Projects"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Research Projects</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Student-led research and innovation initiatives</p>
              <div className="text-xs text-gray-500">200+ projects</div>
            </div>
            {/* Events */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/events/the-unity-university-indipendence-day-somaliland-0.jpg"
                  alt="Events"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Events</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Annual celebrations, independence day, and campus events</p>
              <div className="text-xs text-gray-500">30+ events</div>
            </div>
            {/* Labs */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/labs/health-science-student-in-lab.jpg"
                  alt="Labs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <FlaskConical className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Labs</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Modern science and technology labs for hands-on learning</p>
              <div className="text-xs text-gray-500">10+ labs</div>
            </div>
            {/* Student Life */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/student-life/smart-studentss.jpg"
                  alt="Student Life"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Student Life</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">A vibrant, diverse, and inclusive student community</p>
              <div className="text-xs text-gray-500">1000+ students</div>
            </div>
            {/* Health Awareness Campaigns */}
            <div className="flex flex-col h-full p-6">
              <div className="relative h-40 w-full mb-4 border border-gray-200 shadow-sm bg-white">
                <Image
                  src="/community-outreaches/health-science-family.JPG"
                  alt="Health Awareness Campaigns"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center mb-2">
                <HeartPulse className="h-5 w-5 text-gray-700 mr-2" />
                <span className="text-lg font-bold text-gray-900">Health Awareness Campaigns</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">Student-led health education and awareness drives in the community.</p>
              <div className="text-xs text-gray-500">20+ campaigns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 mb-6 md:mb-8 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Research & Innovation Hub</h2>
              <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                Our cutting-edge research facilities and partnerships with global institutions drive innovation that addresses real-world challenges across Africa and beyond.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 mb-8">
                {[
                  { label: "Research Centers", value: 12, suffix: "", color: "emerald" },
                  { label: "Published Papers", value: 450, suffix: "+", color: "red" },
                  { label: "Patents Filed", value: 28, suffix: "", color: "emerald" },
                  { label: "Industry Partners", value: 85, suffix: "+", color: "red" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`text-center p-6 border-2 rounded-md shadow-sm bg-white ${stat.color === "emerald" ? "border-emerald-600" : "border-red-600"}`}
                  >
                    <div className={`text-4xl font-bold mb-2 ${stat.color === "emerald" ? "text-emerald-700" : "text-red-700"}`}>
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-gray-700 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button className="bg-emerald-800 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold shadow-none border border-emerald-600 font-serif">
                Explore Research Opportunities
                <ArrowRight className="ml-3 h-6 w-6 text-red-600" />
              </Button>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-2">
                <div className="space-y-4">
                  <Image
                    src="/labs/in-the-lab.jpg"
                    alt="Research Lab 1"
                    width={300}
                    height={250}
                    className="rounded-md border-2 border-emerald-600 shadow-md w-full h-auto"
                  />
                  <Image
                    src="/labs/in-the-lab-01.jpg"
                    alt="Research Lab 2"
                    width={300}
                    height={200}
                    className="rounded-md border-2 border-red-600 shadow-md w-full h-auto"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <Image
                    src="/research/on-the-podium-0.jpg"
                    alt="Research Podium 1"
                    width={300}
                    height={200}
                    className="rounded-md border-2 border-emerald-600 shadow-md w-full h-auto"
                  />
                  <Image
                    src="/research/on-the-podium-01.jpg"
                    alt="Research Podium 2"
                    width={300}
                    height={250}
                    className="rounded-md border-2 border-red-600 shadow-md w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Success Stories Section */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 mb-2 tracking-wide uppercase border-b-4 border-emerald-600 inline-block pb-2">Alumni Success Stories</h2>
            <div className="text-xs text-red-600 mt-1 mb-2 font-semibold">Leading Change Across Africa & Beyond</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic">
              Our graduates are making a difference across industries and continents, leading change and innovation worldwide.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Amina Hassan",
                title: "Chief Medical Officer",
                company: "WHO Africa",
                year: "Class of 2020",
                image: "/alumni/alumni-01.jpg",
                quote: "The Unity University gave me the foundation to serve communities across Africa.",
                achievement: "Leading COVID-19 response initiatives",
              },
              {
                name: "James Koroma",
                title: "Tech Entrepreneur",
                company: "Founder, EduTech Solutions",
                year: "Class of 2020",
                image: "/alumni/alumni-02.jpg",
                quote: "The global perspective I gained here shaped my vision for African education technology.",
                achievement: "Serving 2M+ students across 15 countries",
              },
              {
                name: "Fatima Al-Rashid",
                title: "Environmental Scientist",
                company: "UN Climate Change",
                year: "Class of 2020",
                image: "/alumni/alumni-03.jpg",
                quote: "My research on sustainable agriculture started in Unity's labs.",
                achievement: "Published 25+ research papers",
              },
            ].map((alumni, index) => (
              <div
                key={alumni.name}
                className="bg-white border-2 border-emerald-600 rounded-md p-8 shadow-sm flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={alumni.image || "/hero-section/hero.png"}
                      alt={alumni.name}
                      fill
                      className="rounded-full object-cover border-4 border-emerald-600 shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-1">{alumni.name}</h3>
                  <p className="text-red-700 font-medium">{alumni.title}</p>
                  <p className="text-gray-700">{alumni.company}</p>
                  <p className="text-sm text-gray-500 mt-2">{alumni.year}</p>
                </div>
                <blockquote className="text-gray-700 italic mb-4 text-center border-l-4 border-emerald-600 pl-4">"{alumni.quote}"</blockquote>
                <div className="text-center">
                  <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-600 rounded px-3 py-1 text-xs font-semibold">{alumni.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-y-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 mb-2 tracking-wide uppercase border-b-4 border-emerald-600 inline-block pb-2">Global Impact</h2>
            <div className="text-xs text-red-600 mt-1 mb-2 font-semibold">Reaching Communities Worldwide</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic">
              Our reach extends far beyond our campuses, creating positive change in communities worldwide.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                {[
                  { label: "Countries Reached", value: 45, icon: <Globe className='h-8 w-8 text-emerald-700 mx-auto' />, color: "emerald" },
                  { label: "Community Projects", value: 120, icon: <Users className='h-8 w-8 text-red-700 mx-auto' />, color: "red" },
                  { label: "Scholarships Awarded", value: 850, icon: <GraduationCap className='h-8 w-8 text-emerald-700 mx-auto' />, color: "emerald" },
                  { label: "Research Collaborations", value: 200, icon: <BookOpen className='h-8 w-8 text-red-700 mx-auto' />, color: "red" },
                ].map((impact, index) => (
                  <div
                    key={impact.label}
                    className={`text-center p-8 border-2 rounded-md shadow-sm bg-white ${impact.color === "emerald" ? "border-emerald-600" : "border-red-600"}`}
                  >
                    <div className="mb-2">{impact.icon}</div>
                    <div className={`text-4xl font-bold mb-2 ${impact.color === "emerald" ? "text-emerald-700" : "text-red-700"}`}>
                      <AnimatedCounter end={impact.value} />
                      {"+"}
                    </div>
                    <div className="text-gray-700 font-medium">{impact.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/community-outreaches/health-science-faculty-community-out-reach-2.JPG"
                  alt="Health Science Faculty Community Outreach"
                  width={600}
                  height={500}
                  className="w-full h-auto border-4 border-emerald-600 shadow-md rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
