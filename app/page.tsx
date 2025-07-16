"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Globe, ExternalLink, Mail, Phone } from "lucide-react"
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
    },
    {
      image: "/hero-section/global-perspective.jpg",
      title: "Pan-African Excellence",
      subtitle: "5 Years of Growth & Innovation",
      description: "From our founding in 2020 to today, we've been pioneering excellence at the cutting edge of learning through holistic, human development and integrated learning curriculum.",
      cta: "Explore Academics",
    },
    {
      image: "/hero-section/graduation-day.jpg",
      title: "Transform Your Future",
      subtitle: "50% Scholarships Available",
      description: "Excellent education within reach of all passionate and driven students. Join our rapidly growing community with comprehensive scholarship opportunities.",
      cta: "Apply for Scholarship",
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

          {/* Right: Optional - Animated Globe or Illustration */}
          <div className="hidden md:flex w-1/2 justify-center items-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }} // Reduced from 20
              className="rounded-full bg-white/10 p-8 shadow-2xl"
            >
              <Globe className="h-32 w-32 text-white" />
            </motion.div>
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
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Global Campuses</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Excellence in education across two dynamic locations, each with its unique culture and opportunities.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Liberia Campus Card */}
            <div
              className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl border-0"
              suppressHydrationWarning
            >
              {mounted && (
                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }} className="h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/graduation/master-of-education.jpg"
                      alt="Liberia Campus"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-blue-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <LiberiaFlag className="h-6 w-8" />
                        <span className="text-white font-bold text-sm">Liberia</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Liberia Campus</h3>
                      <p className="text-white/90">Monrovia, Montserrado County</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">The Love of Liberty Brought Us Here</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our newest campus expansion in Monrovia combines Liberian heritage with global academic excellence.
                        Established in mid-2024, we are rapidly growing and expanding our presence in West Africa.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={1200} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={15} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={1} />
                        </div>
                        <div className="text-sm text-gray-600">Year</div>
                      </div>
                    </div>

                    <Link href="/liberia" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg group">
                        Visit Liberia Campus
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
              {!mounted && (
                <div className="h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/hero-section/hero.png"
                      alt="Liberia Campus"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-blue-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <LiberiaFlag className="h-6 w-8" />
                        <span className="text-white font-bold text-sm">Liberia</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Liberia Campus</h3>
                      <p className="text-white/90">Monrovia, Montserrado County</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">The Love of Liberty Brought Us Here</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our newest campus expansion in Monrovia combines Liberian heritage with global academic excellence.
                        Established in mid-2024, we are rapidly growing and expanding our presence in West Africa.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={1200} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={15} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={1} />
                        </div>
                        <div className="text-sm text-gray-600">Year</div>
                      </div>
                    </div>

                    <Link href="/liberia" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg group">
                        Visit Liberia Campus
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Somaliland Campus Card */}
            <div
              className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl border-0"
              suppressHydrationWarning
            >
              {mounted && (
                <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }} className="h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/hero-section/hero.png"
                      alt="Somaliland Campus"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-red-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                          <div className="h-1/3 bg-emerald-600"></div>
                          <div className="h-1/3 bg-white flex items-center justify-center">
                            <Star className="h-2 w-2 text-emerald-600 fill-emerald-600" />
                          </div>
                          <div className="h-1/3 bg-red-600"></div>
                        </div>
                        <span className="text-white font-bold text-sm">Somaliland</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Somaliland Campus</h3>
                      <p className="text-white/90">Hargeisa, Somaliland</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        What begins here, transforms Africa
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Founded in 2020, our Hargeisa campus has been here for 5 years, merging the best in the Horn of Africa. Our rapidly growing campus embodies the spirit of Somaliland – innovation, resilience, and academic excellence.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          <AnimatedCounter end={2800} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={25} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          <AnimatedCounter end={5} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/somaliland" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700 shadow-lg group">
                        Visit Somaliland Campus
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
              {!mounted && (
                <div className="h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/hero-section/hero.png"
                      alt="Somaliland Campus"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-red-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                          <div className="h-1/3 bg-emerald-600"></div>
                          <div className="h-1/3 bg-white flex items-center justify-center">
                            <Star className="h-2 w-2 text-emerald-600 fill-emerald-600" />
                          </div>
                          <div className="h-1/3 bg-red-600"></div>
                        </div>
                        <span className="text-white font-bold text-sm">Somaliland</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Somaliland Campus</h3>
                      <p className="text-white/90">Hargeisa, Somaliland</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        What begins here, transforms Africa
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Founded in 2020, our Hargeisa campus has been here for 5 years, merging the best in the Horn of Africa. Our rapidly growing campus embodies the spirit of Somaliland – innovation, resilience, and academic excellence.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          <AnimatedCounter end={2800} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={25} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          <AnimatedCounter end={5} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/somaliland" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700 shadow-lg group">
                        Visit Somaliland Campus
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
          {mounted && (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('/hero-section/hero.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }} // Reduced from 20
            />
          )}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }} // Reduced from 0.8
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                  Transforming Africa Through
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">
                    Excellence in Education
                  </span>
                </h2>
                <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  Since our founding in 2020, The Unity University has been growing every day, believing that sustainable national and global development can be achieved through nurturing an intellectual culture that integrates theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.
                </p>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-emerald-300">Our Mission</h3>
                    <p className="text-sm md:text-base text-gray-300">
                      To contribute to the development and sustenance of the well-being of the people of Somaliland, Africa, and the world through the provision of flexible, innovative, entrepreneurial, inclusive programs of teaching, learning, research, and service.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-red-300">Our Vision</h3>
                    <p className="text-sm md:text-base text-gray-300">
                      To become a world-class University in leadership development in Africa.
                    </p>
                  </div>
                </div>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-red-500/30 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/graduation/male-graduation.jpg"
                    alt="Graduation Ceremony"
                    width={800}
                    height={600}
                    className="relative rounded-3xl shadow-2xl"
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }} // Reduced from 3
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">
                        <AnimatedCounter end={98} />%
                      </div>
                      <div className="text-sm text-gray-600">Graduate Employability</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Reduced from 0.8
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Academic Excellence</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of programs designed to prepare you for leadership roles in Africa and beyond.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Business & Management",
                icon: "💼",
                programs: ["Business Administration", "Accounting & Finance", "Human Resources", "Marketing Management", "Project Management"],
                color: "from-blue-500 to-emerald-600",
                students: 850,
              },
              {
                title: "Computing & IT",
                icon: "💻",
                programs: ["Computer Science", "Software Engineering", "Information Technology", "Web Development"],
                color: "from-emerald-500 to-teal-600",
                students: 720,
              },
              {
                title: "Health Sciences",
                icon: "🏥",
                programs: ["Public Health", "Nutrition & Food Science", "Health Service Management"],
                color: "from-red-500 to-pink-600",
                students: 640,
              },
              {
                title: "Social Sciences",
                icon: "🌍",
                programs: ["International Relations", "Public Administration", "Development Studies", "Social Work"],
                color: "from-purple-500 to-indigo-600",
                students: 560,
              },
              {
                title: "Education",
                icon: "📚",
                programs: ["Educational Leadership", "Policy Planning & Management", "Curriculum Development"],
                color: "from-orange-500 to-yellow-600",
                students: 480,
              },
              {
                title: "Media & Communications",
                icon: "📺",
                programs: ["Public Relations", "Media Management", "Digital Communications"],
                color: "from-green-500 to-emerald-600",
                students: 380,
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced from 0.6, delay from 0.1
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border-0 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="p-8">
                  <div className="text-6xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <div className="space-y-2 mb-6">
                    {program.programs.map((prog) => (
                      <div key={prog} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                        {prog}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">Students Enrolled</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      <AnimatedCounter end={program.students} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Reduced from 0.8
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Vibrant Student Life</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Experience a rich campus culture that celebrates diversity, fosters growth, and creates lifelong
                connections.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Community Outreaches",
                count: "50+",
                description: "Impactful service and outreach programs",
                icon: "🤝",
                image: "/community-outreaches/health-community-outreach-01.jpg",
              },
              {
                title: "Student Lecturers Talk",
                count: "100+",
                description: "Inspiring talks and knowledge sharing by students and lecturers",
                icon: "🎤",
                image: "/student-life/student-lecturer-talks.jpg",
              },
              {
                title: "Sports Teams",
                count: "25+",
                description: "Competitive athletics and team spirit",
                icon: "🏆",
                image: "/sports/sports.png",
              },
              {
                title: "Research Projects",
                count: "200+",
                description: "Student-led research and innovation initiatives",
                icon: "🔬",
                image: "/research/research-students.jpg",
              },
              {
                title: "Events",
                count: "30+",
                description: "Annual celebrations, independence day, and campus events",
                icon: "🎉",
                image: "/events/the-unity-university-indipendence-day-somaliland-0.jpg",
              },
              {
                title: "Labs",
                count: "10+",
                description: "Modern science and technology labs for hands-on learning",
                icon: "🧪",
                image: "/labs/health-science-student-in-lab.jpg",
              },
              {
                title: "Student Life",
                count: "1000+",
                description: "A vibrant, diverse, and inclusive student community",
                icon: "🎓",
                image: "/student-life/smart-studentss.jpg",
              },
              {
                title: "Health Awareness Campaigns",
                count: "20+",
                description: "Student-led health education and awareness drives in the community.",
                icon: "🩺",
                image: "/community-outreaches/health-science-family.JPG",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced from 0.6, delay from 0.1
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/hero-section/hero.png"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-3xl font-bold">{item.count}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Innovation Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-2 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }} // Reduced from 0.8
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
                  Research &
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Innovation Hub
                  </span>
                </h2>
                <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Our cutting-edge research facilities and partnerships with global institutions drive innovation that
                  addresses real-world challenges across Africa and beyond.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 mb-8">
                  {[
                    { label: "Research Centers", value: 12, suffix: "" },
                    { label: "Published Papers", value: 450, suffix: "+" },
                    { label: "Patents Filed", value: 28, suffix: "" },
                    { label: "Industry Partners", value: 85, suffix: "+" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced from 0.6, delay from 0.1
                      viewport={{ once: true }}
                      className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                    >
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        <AnimatedCounter end={stat.value} />
                        {stat.suffix}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold shadow-lg">
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
                  transition={{ duration: 0.8 }} // Reduced from 1
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="grid gap-4 grid-cols-2 lg:grid-cols-2">
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }} // Reduced from 4
                      className="space-y-4"
                    >
                      <Image
                        src="/labs/in-the-lab.jpg"
                        alt="Research Lab 1"
                        width={300}
                        height={250}
                        className="rounded-2xl shadow-lg w-full h-auto"
                      />
                      <Image
                        src="/labs/in-the-lab-01.jpg"
                        alt="Research Lab 2"
                        width={300}
                        height={200}
                        className="rounded-2xl shadow-lg w-full h-auto"
                      />
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }} // Reduced from 4, delay from 2
                      className="space-y-4 mt-8"
                    >
                      <Image
                        src="/research/on-the-podium-0.jpg"
                        alt="Research Podium 1"
                        width={300}
                        height={200}
                        className="rounded-2xl shadow-lg w-full h-auto"
                      />
                      <Image
                        src="/research/on-the-podium-01.jpg"
                        alt="Research Podium 2"
                        width={300}
                        height={250}
                        className="rounded-2xl shadow-lg w-full h-auto"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Success Stories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Reduced from 0.8
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Alumni Success Stories</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Our graduates are making a difference across industries and continents, leading change and innovation
                worldwide.
              </p>
            </motion.div>
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
              <motion.div
                key={alumni.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced from 0.6, delay from 0.1
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              >
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={alumni.image || "/hero-section/hero.png"}
                      alt={alumni.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{alumni.name}</h3>
                  <p className="text-purple-300 font-medium">{alumni.title}</p>
                  <p className="text-gray-300">{alumni.company}</p>
                  <p className="text-sm text-gray-400 mt-2">{alumni.year}</p>
                </div>
                <blockquote className="text-gray-300 italic mb-4 text-center">"{alumni.quote}"</blockquote>
                <div className="text-center">
                  <Badge className="bg-purple-600 text-white">{alumni.achievement}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} // Reduced from 0.8
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Global Impact</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our reach extends far beyond our campuses, creating positive change in communities worldwide.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                {[
                  { label: "Countries Reached", value: 45, icon: "🌍" },
                  { label: "Community Projects", value: 120, icon: "🤝" },
                  { label: "Scholarships Awarded", value: 850, icon: "🎓" },
                  { label: "Research Collaborations", value: 200, icon: "🔬" },
                ].map((impact, index) => (
                  <motion.div
                    key={impact.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced from 0.6, delay from 0.1
                    viewport={{ once: true }}
                    className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                  >
                    <div className="text-5xl mb-4">{impact.icon}</div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      <AnimatedCounter end={impact.value} /> {"+"}
                    </div>
                    <div className="text-gray-600 font-medium">{impact.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }} // Reduced from 1
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/community-outreaches/health-science-faculty-community-out-reach-2.JPG"
                    alt="Health Science Faculty Community Outreach"
                    width={600}
                    height={500}
                    className="relative rounded-3xl shadow-2xl"
                  />
                  {/* Animated dots for global presence */}
                  <motion.div
                    className="absolute top-1/4 left-1/3 w-4 h-4 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }} // Reduced from 2
                  />
                  <motion.div
                    className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.25 }} // Reduced from 2, delay from 0.5
                  />
                  <motion.div
                    className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }} // Reduced from 2, delay from 1
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
