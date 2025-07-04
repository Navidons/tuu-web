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
                duration: 6 + (i % 4),
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
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Unity University",
      subtitle: "Global Education Network",
      description: "Transforming lives through excellence in education across Africa and beyond.",
      cta: "Discover Our Campuses",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Innovation & Excellence",
      subtitle: "Leading the Future",
      description: "Pioneering research and development initiatives that shape tomorrow's leaders.",
      cta: "Explore Programs",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Global Impact",
      subtitle: "Local Roots, Global Reach",
      description: "Building bridges between cultures while maintaining strong community connections.",
      cta: "Join Our Community",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-purple-900/80"
          suppressHydrationWarning
        >
          {mounted && (
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(88, 28, 135, 0.8), rgba(30, 64, 175, 0.6), rgba(88, 28, 135, 0.8))",
                  "linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(88, 28, 135, 0.6), rgba(30, 64, 175, 0.8))",
                  "linear-gradient(45deg, rgba(88, 28, 135, 0.8), rgba(30, 64, 175, 0.6), rgba(88, 28, 135, 0.8))",
                ],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="absolute inset-0" suppressHydrationWarning>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />

          <div className="container relative z-10 mx-auto flex h-full items-center px-4">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center space-x-4">
                <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl">
                  {heroSlides[currentSlide].subtitle}
                </Badge>
                <div className="h-8 w-8 text-white drop-shadow-2xl">
                  {mounted ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Globe className="h-8 w-8" />
                    </motion.div>
                  ) : (
                    <Globe className="h-8 w-8" />
                  )}
                </div>
              </div>

              <h1 className="text-5xl font-bold text-white md:text-7xl leading-tight mb-6">
                {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                  <span key={`${currentSlide}-${index}`} className="inline-block mr-4">
                    {word}
                  </span>
                ))}
              </h1>

              <p className="mb-10 text-xl text-white/95 max-w-3xl leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>

              <div className="flex flex-wrap gap-6">
                <Button
                  size="lg"
                  className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-bold shadow-2xl"
                >
                  {heroSlides[currentSlide].cta}
                  <div className="ml-3">
                    {mounted ? (
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <ArrowRight className="h-6 w-6" />
                    )}
                  </div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-white text-white hover:bg-white/15 px-8 py-4 text-lg font-bold backdrop-blur-sm"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -1000 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 35 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                <motion.div
                  className="max-w-4xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                >
                  <motion.div
                    className="mb-6 flex items-center space-x-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <motion.h1
                      className="text-5xl font-bold text-white md:text-7xl leading-tight mb-6"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                    >
                      {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                        <motion.span
                          key={`motion-${currentSlide}-${index}`}
                          className="inline-block mr-4"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center" suppressHydrationWarning>
          <div className="flex space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-12 rounded-full transition-all duration-500 ${
                  currentSlide === index ? "bg-white shadow-2xl" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Campus Showcase Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Campuses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                      src="/placeholder.svg?height=600&width=800"
                      alt="Liberia Campus"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-blue-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                          <div className="h-1/3 bg-red-600"></div>
                          <div className="h-1/3 bg-white flex items-center justify-center">
                            <Star className="h-2 w-2 text-blue-600 fill-blue-600" />
                          </div>
                          <div className="h-1/3 bg-blue-600"></div>
                        </div>
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
                        Our flagship campus in Monrovia combines Liberian heritage with global academic excellence.
                        Established in 2005, we have been leading higher education in West Africa.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={2500} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={20} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={18} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/liberia">
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
                      src="/placeholder.svg?height=600&width=800"
                      alt="Liberia Campus"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-blue-900/80" />
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                        <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                          <div className="h-1/3 bg-red-600"></div>
                          <div className="h-1/3 bg-white flex items-center justify-center">
                            <Star className="h-2 w-2 text-blue-600 fill-blue-600" />
                          </div>
                          <div className="h-1/3 bg-blue-600"></div>
                        </div>
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
                        Our flagship campus in Monrovia combines Liberian heritage with global academic excellence.
                        Established in 2005, we have been leading higher education in West Africa.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={2500} />+
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          <AnimatedCounter end={20} />+
                        </div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={18} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/liberia">
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
                      src="/placeholder.svg?height=600&width=800"
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
                        Halkan wax ka bilaabmaan, Afrika way beddelaan
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Where dreams begin and Africa transforms. Our Hargeisa campus embodies the spirit of Somaliland
                        - innovation, resilience, and academic excellence since 2008.
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
                          <AnimatedCounter end={15} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/somaliland">
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
                      src="/placeholder.svg?height=600&width=800"
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
                        Halkan wax ka bilaabmaan, Afrika way beddelaan
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Where dreams begin and Africa transforms. Our Hargeisa campus embodies the spirit of Somaliland
                        - innovation, resilience, and academic excellence since 2008.
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
                          <AnimatedCounter end={15} />
                        </div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>

                    <Link href="/somaliland">
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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-8 leading-tight">
                  Shaping Tomorrow's
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Global Leaders
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  At Unity University, we believe education transcends borders. Our mission is to cultivate innovative
                  minds that will drive positive change across Africa and beyond.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold mb-3 text-purple-300">Our Mission</h3>
                    <p className="text-gray-300">
                      To provide world-class education that empowers students to become leaders, innovators, and
                      change-makers in their communities.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold mb-3 text-blue-300">Our Vision</h3>
                    <p className="text-gray-300">
                      To be the premier educational institution connecting Africa to global opportunities through
                      excellence and innovation.
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Students collaborating"
                    width={800}
                    height={600}
                    className="relative rounded-3xl shadow-2xl"
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        <AnimatedCounter end={95} />%
                      </div>
                      <div className="text-sm text-gray-600">Graduate Success Rate</div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Academic Excellence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of programs designed to prepare you for success in the global
                marketplace.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Business & Management",
                icon: "💼",
                programs: ["MBA", "International Business", "Entrepreneurship", "Finance"],
                color: "from-blue-500 to-purple-600",
                students: 850,
              },
              {
                title: "Engineering & Technology",
                icon: "⚙️",
                programs: ["Computer Science", "Civil Engineering", "Electrical Engineering", "Software Development"],
                color: "from-emerald-500 to-teal-600",
                students: 720,
              },
              {
                title: "Health Sciences",
                icon: "🏥",
                programs: ["Medicine", "Nursing", "Public Health", "Pharmacy"],
                color: "from-red-500 to-pink-600",
                students: 640,
              },
              {
                title: "Liberal Arts",
                icon: "📚",
                programs: ["Literature", "History", "Philosophy", "Languages"],
                color: "from-orange-500 to-yellow-600",
                students: 480,
              },
              {
                title: "Social Sciences",
                icon: "🌍",
                programs: ["International Relations", "Psychology", "Sociology", "Political Science"],
                color: "from-purple-500 to-indigo-600",
                students: 560,
              },
              {
                title: "Agriculture & Environment",
                icon: "🌱",
                programs: ["Sustainable Agriculture", "Environmental Science", "Forestry", "Climate Studies"],
                color: "from-green-500 to-emerald-600",
                students: 380,
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        {prog}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">Students Enrolled</div>
                    <div className="text-2xl font-bold text-purple-600">
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
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Vibrant Student Life</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience a rich campus culture that celebrates diversity, fosters growth, and creates lifelong
                connections.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Student Organizations",
                count: "50+",
                description: "Active clubs and societies",
                icon: "👥",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Cultural Events",
                count: "100+",
                description: "Annual celebrations",
                icon: "🎭",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Sports Teams",
                count: "25+",
                description: "Competitive athletics",
                icon: "🏆",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Research Projects",
                count: "200+",
                description: "Student-led initiatives",
                icon: "🔬",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold text-gray-900 mb-8">
                  Research &
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Innovation Hub
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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
                      transition={{ duration: 0.6, delay: index * 0.1 }}
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

      {/* News & Events Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Latest News & Events</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest happenings, achievements, and upcoming events across our global campuses.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "International Research Symposium 2024",
                date: "March 15-17, 2024",
                category: "Research",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "Join leading researchers from around the world as they present groundbreaking findings...",
              },
              {
                title: "New Partnership with Oxford University",
                date: "February 28, 2024",
                category: "Partnership",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "Unity University announces strategic partnership for student exchange programs...",
              },
              {
                title: "Student Innovation Challenge Winners",
                date: "February 20, 2024",
                category: "Achievement",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "Celebrating our students' innovative solutions to real-world problems...",
              },
              {
                title: "Campus Sustainability Initiative Launch",
                date: "February 10, 2024",
                category: "Sustainability",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "New green campus initiatives aim to reduce carbon footprint by 50%...",
              },
              {
                title: "Alumni Success Story: Tech Entrepreneur",
                date: "January 25, 2024",
                category: "Alumni",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "Graduate launches successful fintech startup serving African markets...",
              },
              {
                title: "Cultural Festival 2024 Announcement",
                date: "January 15, 2024",
                category: "Culture",
                image: "/placeholder.svg?height=250&width=400",
                excerpt: "Annual celebration of diversity featuring performances from both campuses...",
              },
            ].map((news, index) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">{news.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <div className="flex items-center text-purple-600 font-medium">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Alumni Success Stories</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our graduates are making a difference across industries and continents, leading change and innovation
                worldwide.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Amina Hassan",
                title: "Chief Medical Officer",
                company: "WHO Africa",
                year: "Class of 2015",
                image: "/placeholder.svg?height=300&width=300",
                quote: "Unity University gave me the foundation to serve communities across Africa.",
                achievement: "Leading COVID-19 response initiatives",
              },
              {
                name: "James Koroma",
                title: "Tech Entrepreneur",
                company: "Founder, EduTech Solutions",
                year: "Class of 2018",
                image: "/placeholder.svg?height=300&width=300",
                quote: "The global perspective I gained here shaped my vision for African education technology.",
                achievement: "Serving 2M+ students across 15 countries",
              },
              {
                name: "Fatima Al-Rashid",
                title: "Environmental Scientist",
                company: "UN Climate Change",
                year: "Class of 2016",
                image: "/placeholder.svg?height=300&width=300",
                quote: "My research on sustainable agriculture started in Unity's labs.",
                achievement: "Published 25+ research papers",
              },
            ].map((alumni, index) => (
              <motion.div
                key={alumni.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              >
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={alumni.image || "/placeholder.svg"}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Global Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our reach extends far beyond our campuses, creating positive change in communities worldwide.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="grid gap-8 sm:grid-cols-2">
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
                    transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Global Impact Map"
                    width={600}
                    height={500}
                    className="relative rounded-3xl shadow-2xl"
                  />
                  {/* Animated dots for global presence */}
                  <motion.div
                    className="absolute top-1/4 left-1/3 w-4 h-4 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
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
