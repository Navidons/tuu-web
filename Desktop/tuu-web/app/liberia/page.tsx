"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence, Variants } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Users,
  BookOpen,
  Globe,
  GraduationCap,
  Building,
  Heart,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

// Enhanced floating particles component with better performance
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
    size: Math.random() * 3 + 1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced animated counter with better performance
const AnimatedCounter = ({ end, duration = 2.5, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration, hasStarted])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

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

// Parallax section component with improved performance
const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, offset])

  return (
    <motion.div style={{ y }} className="relative will-change-transform">
      {children}
    </motion.div>
  )
}

export default function LiberiaHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Ensure client-side rendering consistency
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isClient])

  const base = "/liberia"

  const heroSlides = [
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Unity University Liberia",
      subtitle: "What Begins Here, Transforms Africa",
      description:
        "A dynamic, vision-driven university founded on Pan-Africanism and committed to pioneering excellence at the cutting edge of learning. We are raising a new generation of leaders for the African continent through holistic human development.",
      cta: "Transform Your Future",
      keywords: "premier university liberia, monrovia education, west africa",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "The Love of Liberty Brought Us Here",
      subtitle: "Pioneering Excellence Since 2024",
      description:
        "Offering transformational educational experiences that develop you in ways you might not yet have dreamed of. We are one of the strongest universities in West Africa, making history every day through innovation and excellence.",
      cta: "Join Our Legacy",
      keywords: "liberian education, transformational learning, west africa university",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Building Leaders for Africa",
      subtitle: "University of Pan-African Excellence",
      description:
        "Our unique approach equips graduates with the skills, acuity and vision needed to succeed as ethical, entrepreneurial leaders. Our vibrant, Pan-African community promises life-long friendship and inspiration.",
      cta: "Become a Leader",
      keywords: "african leadership, pan-african education, ethical leaders",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    },
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <LiberiaNavbar />

      {/* Enhanced Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <FloatingParticles />

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-900/85 via-blue-900/70 to-red-900/85"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(220, 38, 38, 0.85), rgba(37, 99, 235, 0.7), rgba(220, 38, 38, 0.85))",
              "linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(220, 38, 38, 0.7), rgba(37, 99, 235, 0.85))",
              "linear-gradient(45deg, rgba(220, 38, 38, 0.85), rgba(37, 99, 235, 0.7), rgba(220, 38, 38, 0.85))",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* SEO-optimized hidden content */}
        <div className="sr-only">
          <h1>Unity University Liberia - Premier Higher Education Institution in Monrovia</h1>
          <p>
            Leading university in Liberia offering world-class education in Business Administration, Information
            Technology, Engineering, and Public Health. Located in Monrovia with modern facilities and expert faculty.
            The Love of Liberty Brought Us Here - Apply now for 2025-2026 admission.
          </p>
        </div>

        {isClient ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
              }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
              />

              <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                <motion.div
                  className="max-w-5xl"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                >
                  {/* University Badge */}
                  <motion.div
                    className="mb-8 flex items-center space-x-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <Badge className="bg-blue-600/90 backdrop-blur-sm text-white px-8 py-4 text-lg font-bold shadow-xl border border-blue-500/30">
                      {heroSlides[currentSlide].subtitle}
                    </Badge>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <LiberiaFlag className="h-10 w-16" />
                    </motion.div>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Star className="h-8 w-8 text-white fill-white drop-shadow-lg liberian-star-glow" />
                    </motion.div>
                  </motion.div>

                  {/* Main Headlines */}
                  <motion.h1
                    className="mb-8 text-5xl font-bold text-white md:text-7xl leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  >
                    {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                      <motion.span
                        key={`${currentSlide}-${index}`}
                        className="inline-block mr-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    className="mb-12 text-xl text-white/95 max-w-4xl leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                  >
                    <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                      <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                        <Button
                          size="lg"
                          className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-lg font-bold shadow-2xl border border-blue-500/30"
                        >
                          {heroSlides[currentSlide].cta}
                          <motion.div
                            className="ml-3"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="h-6 w-6" />
                          </motion.div>
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                      <Link href={`${base}/academics`}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-bold backdrop-blur-sm bg-transparent"
                        >
                          Explore Programs
                          <GraduationCap className="ml-3 h-6 w-6" />
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Key Features */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    {[
                      {
                        icon: GraduationCap,
                        title: "28 Programs",
                        subtitle: "Across 4 Faculties",
                        keywords: "academic programs liberia",
                      },
                      {
                        icon: Users,
                        title: "1,500+ Students",
                        subtitle: "Thriving Community",
                        keywords: "student community liberia",
                      },
                      {
                        icon: Award,
                        title: "19 Years Excellence",
                        subtitle: "Proven Track Record",
                        keywords: "educational excellence liberia",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 card-hover-effect"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                        data-keywords={feature.keywords}
                      >
                        <feature.icon className="h-10 w-10 text-blue-300" />
                        <div>
                          <div className="text-white font-bold text-lg">{feature.title}</div>
                          <div className="text-blue-200 text-sm">{feature.subtitle}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Static version for SSR
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSlides[0].image})` }}
            />
            <div className="container relative z-10 mx-auto flex h-full items-center px-4">
              <div className="max-w-5xl">
                <div className="mb-8 flex items-center space-x-6">
                  <Badge className="bg-blue-600 text-white px-8 py-4 text-lg font-bold">{heroSlides[0].subtitle}</Badge>
                  <LiberiaFlag className="h-10 w-16" />
                  <Star className="h-8 w-8 text-white fill-white" />
                </div>
                <h1 className="mb-8 text-5xl font-bold text-white md:text-7xl leading-tight">{heroSlides[0].title}</h1>
                <p className="mb-12 text-xl text-white/95 max-w-4xl leading-relaxed">{heroSlides[0].description}</p>
                <div className="flex flex-wrap gap-6">
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-lg font-bold">
                      {heroSlides[0].cta}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-bold bg-transparent"
                  >
                    Explore Programs
                    <GraduationCap className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced slide indicators */}
        {isClient && (
          <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center">
            <div className="flex space-x-4 bg-black/30 backdrop-blur-md rounded-full px-8 py-4">
              {heroSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-16 rounded-full transition-all duration-500 ${
                    currentSlide === index ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {isClient && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            suppressHydrationWarning
          >
            <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center mb-2">
              <motion.div
                className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <p className="text-white/70 text-sm font-medium">Discover Excellence</p>
          </motion.div>
        )}
      </section>

      {/* Enhanced About Section with Parallax */}
      <ParallaxSection offset={100}>
        <section className="py-32 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-red-50/50"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(239, 68, 68, 0.1))",
                "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(239, 68, 68, 0.1))",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid gap-16 md:grid-cols-2 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <motion.h2
                  className="text-sm font-semibold uppercase tracking-wider text-blue-700"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Unity University - Liberia Campus
                </motion.h2>

                <motion.h3
                  className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Excellence in{" "}
                  <motion.span
                    className="text-liberian-gradient"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Liberian Higher Education
                  </motion.span>
                </motion.h3>

                <motion.div className="space-y-6 text-lg text-gray-600 leading-relaxed" variants={containerVariants}>
                  <motion.p variants={itemVariants}>
                    Since establishing our Liberia campus in mid-2024, Unity University has been at the forefront of
                    educational excellence in West Africa. Our institution embodies the spirit of Liberia - a nation
                    founded on the principles of freedom, democracy, and opportunity for all.
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    Located in the vibrant capital city of Monrovia, we offer comprehensive programs designed to meet
                    Liberia's development needs while preparing our students to compete globally in an interconnected
                    world. Our commitment to academic excellence and community service reflects our motto: "The Love of
                    Liberty Brought Us Here."
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    With state-of-the-art facilities, expert faculty, and strong industry partnerships, we provide
                    students with the knowledge, skills, and values needed to become leaders in their chosen fields and
                    contributors to Liberia's continued growth and prosperity.
                  </motion.p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`${base}/about/history`}>
                      <Button className="group bg-blue-700 text-white hover:bg-blue-800 px-8 py-4 text-lg font-semibold shadow-xl">
                        Learn More About Us
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.div>
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`${base}/about/contact`}>
                      <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 bg-transparent">
                        Visit Campus
                        <MapPin className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotateY: 5 }} className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl opacity-20 blur-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=1200&width=800"
                    alt="Unity University Liberia Campus in Monrovia"
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-8 text-white"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <h4 className="text-2xl font-bold mb-2">Monrovia Campus</h4>
                    <p className="text-white/90 text-lg">Modern facilities in the heart of Liberia</p>
                    <div className="mt-3 flex items-center space-x-2">
                      <LiberiaFlag className="h-6 w-10" />
                      <span className="text-sm font-medium">The Love of Liberty Brought Us Here</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Enhanced Stats Section with Animated Counters */}
      <motion.section
        className="py-20 bg-gradient-to-r from-red-700 via-white to-blue-700 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Excellence in Numbers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our achievements demonstrate Unity University Liberia's commitment to academic excellence and community
              impact.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-12 md:grid-cols-4" variants={containerVariants}>
            {[
              {
                number: 1500,
                label: "Students Enrolled",
                sublabel: "Active Learners",
                icon: Users,
                keywords: "student enrollment liberia",
              },
              {
                number: 85,
                label: "Faculty & Staff",
                sublabel: "Expert Educators",
                icon: Award,
                keywords: "faculty staff liberia",
              },
              {
                number: 28,
                label: "Academic Programs",
                sublabel: "Diverse Offerings",
                icon: BookOpen,
                keywords: "academic programs liberia",
              },
              {
                number: 1,
                label: "Year of Excellence",
                sublabel: "Growing Strong",
                icon: Globe,
                keywords: "educational excellence liberia",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl card-hover-effect"
                data-keywords={stat.keywords}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-3 text-gray-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <AnimatedCounter end={stat.number} />
                  <span>{stat.number !== 1 ? "+" : ""}</span>
                </motion.div>
                <motion.div
                  className="text-gray-800 font-bold text-lg mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                >
                  {stat.label}
                </motion.div>
                <motion.div
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                >
                  {stat.sublabel}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Programs Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-700"
              variants={itemVariants}
            >
              Academic Excellence
            </motion.h2>
            <motion.h3 className="mb-8 text-4xl md:text-5xl font-bold text-gray-900" variants={itemVariants}>
              Our <span className="text-liberian-gradient">Programs</span>
            </motion.h3>
            <motion.p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed" variants={itemVariants}>
              Discover our comprehensive programs designed to meet Liberia's development needs and prepare students for
              global success in an interconnected world.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-10 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Business Administration",
                description:
                  "Developing business leaders for Liberia's growing economy and regional markets. Comprehensive curriculum covering entrepreneurship, finance, marketing, and management.",
                image: "/placeholder.svg?height=400&width=600",
                color: "blue",
                gradient: "from-blue-600 to-blue-800",
                features: ["Entrepreneurship Focus", "Industry Partnerships", "Practical Training"],
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "business administration liberia, entrepreneurship monrovia",
              },
              {
                title: "Information Technology",
                description:
                  "Building digital skills and technological solutions for Liberia's digital transformation. Cutting-edge curriculum in software development, cybersecurity, and data science.",
                image: "/placeholder.svg?height=400&width=600",
                color: "red",
                gradient: "from-red-600 to-red-800",
                features: ["Modern Curriculum", "Industry Certifications", "Innovation Labs"],
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "information technology liberia, IT courses monrovia",
              },
              {
                title: "Public Health",
                description:
                  "Training healthcare professionals to serve Liberian communities with excellence. Focus on preventive care, health promotion, and community health management.",
                image: "/placeholder.svg?height=400&width=600",
                color: "purple",
                gradient: "from-blue-600 to-purple-600",
                features: ["Community Focus", "Clinical Training", "Research Opportunities"],
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "public health liberia, healthcare education monrovia",
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -20,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                className="group"
                data-keywords={program.keywords}
              >
                <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl card-hover-effect">
                  <div className="relative h-64 w-full overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={`${program.title} - Unity University Liberia`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${program.gradient}/80 to-transparent`}
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 0.9 }}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs">{program.duration}</Badge>
                    </div>
                    <motion.div
                      className="absolute bottom-6 left-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h4 className="text-xl font-bold">{program.title}</h4>
                    </motion.div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">{program.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 text-sm">Key Features:</h5>
                      <div className="flex flex-wrap gap-2">
                        {program.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link href={`${base}/academics`}>
                        <Button
                          variant="outline"
                          className="w-full group border-2 hover:bg-gray-50 py-3 text-lg font-semibold bg-transparent"
                        >
                          Learn More
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </motion.div>
                        </Button>
                      </Link>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href={`${base}/academics`}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 px-10 py-4 text-lg font-bold shadow-xl"
              >
                Explore All Programs
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Heritage Section */}
      <ParallaxSection offset={100}>
        <section className="py-32 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-blue-900/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(220, 38, 38, 0.05), rgba(37, 99, 235, 0.05))",
                "linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(220, 38, 38, 0.05))",
                "linear-gradient(45deg, rgba(220, 38, 38, 0.05), rgba(37, 99, 235, 0.05))",
              ],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid gap-16 md:grid-cols-2 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotateY: -5 }} className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl opacity-20 blur-xl"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=1000&width=800"
                    alt="Liberian Heritage and Culture"
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-8 text-white"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <h4 className="text-2xl font-bold mb-2">Liberian Heritage</h4>
                    <p className="text-white/90 text-lg mb-3">Celebrating our rich cultural legacy</p>
                    <div className="flex items-center space-x-2">
                      <LiberiaFlag className="h-6 w-10" />
                      <span className="text-sm font-medium">The Love of Liberty Brought Us Here</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-8">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Honoring Our Heritage,{" "}
                  <motion.span
                    className="text-liberian-gradient"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Building Our Future
                  </motion.span>
                </motion.h2>

                <motion.div className="space-y-6" variants={containerVariants}>
                  {[
                    {
                      title: "Cultural Preservation",
                      description:
                        "Celebrating and preserving Liberia's rich cultural traditions, languages, and heritage while fostering academic excellence.",
                      color: "red",
                      icon: Heart,
                    },
                    {
                      title: "Democratic Values",
                      description:
                        "Upholding the democratic principles that make Liberia Africa's oldest republic, promoting freedom and equality in education.",
                      color: "white",
                      border: "blue",
                      icon: Shield,
                    },
                    {
                      title: "Community Service",
                      description:
                        "Fostering a spirit of service and giving back to Liberian communities through education, research, and outreach programs.",
                      color: "blue",
                      icon: Users,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start space-x-6 p-6 rounded-xl hover:bg-white/50 transition-all duration-300 card-hover-effect"
                    >
                      <motion.div
                        className={`mt-1 h-12 w-12 rounded-full flex items-center justify-center ${
                          item.color === "red"
                            ? "bg-red-600"
                            : item.color === "blue"
                              ? "bg-blue-600"
                              : "bg-white border-4 border-blue-600"
                        }`}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className={`h-6 w-6 ${item.color === "white" ? "text-blue-600" : "text-white"}`} />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h4>
                        <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`${base}/about/history`}>
                      <Button className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold shadow-xl">
                        Our History
                        <Heart className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`${base}/about/leadership`}>
                      <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 bg-transparent">
                        Leadership
                        <Shield className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Enhanced Contact Section */}
      <motion.section
        className="bg-gradient-to-r from-red-800 to-blue-800 py-32 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FloatingParticles />

        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="mx-auto max-w-4xl text-center text-white" variants={containerVariants}>
            <motion.div className="mb-8 flex justify-center" variants={itemVariants}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <LiberiaFlag className="h-16 w-24" />
              </motion.div>
            </motion.div>

            <motion.h2 className="mb-8 text-4xl md:text-5xl font-bold" variants={itemVariants}>
              Ready to Shape Your Future?
            </motion.h2>
            <motion.p className="mb-12 text-xl leading-relaxed opacity-95" variants={itemVariants}>
              Join the Unity University Liberia family and become part of a community dedicated to excellence,
              innovation, and positive impact. Your journey to success starts here in Monrovia, where "The Love of
              Liberty Brought Us Here."
            </motion.p>

            <motion.div className="grid gap-8 md:grid-cols-3 mb-12" variants={containerVariants}>
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  info: "+231 77 123 4567",
                  action: "tel:+23177123456",
                  keywords: "contact university liberia phone",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  info: "liberia@tuu.university",
                  action: "mailto:liberia@tuu.university",
                  keywords: "contact university liberia email",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  info: "Monrovia, Liberia",
                  action: `${base}/about/contact`,
                  keywords: "visit campus monrovia liberia",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.action}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-hover-effect"
                  data-keywords={contact.keywords}
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <contact.icon className="h-12 w-12 mb-4" />
                  </motion.div>
                  <h4 className="font-bold text-xl mb-2">{contact.title}</h4>
                  <p className="text-lg opacity-90">{contact.info}</p>
                </motion.a>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-6" variants={containerVariants}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-6 text-lg font-bold shadow-2xl"
                  >
                    Apply Now - 2025-2026 Admission
                    <GraduationCap className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link href={`${base}/about/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-bold backdrop-blur-sm bg-transparent"
                  >
                    Schedule Campus Visit
                    <MapPin className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <LiberiaFooter />
    </div>
  )
}
