"use client"

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
  Heart,
  GraduationCap,
  Lightbulb,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

// SEO-optimized content constants
const SEO_CONTENT = {
  heroTitle: "Unity University Somaliland - #1 Leading University in Hargeisa",
  heroSubtitle: "Best Higher Education Institution in Somaliland | World-Class Programs",
  heroDescription:
    "Discover excellence at Unity University Somaliland, the premier higher education institution in Hargeisa. Offering accredited undergraduate, graduate, and professional programs in Business Administration, Information Technology, Engineering, Health Sciences, and Education. Modern facilities, expert faculty, 95% job placement rate.",

  // Location-specific content
  locationKeywords:
    "Hargeisa University, Somaliland Higher Education, Horn of Africa Education, East Africa University",

  // Program-specific content
  programKeywords:
    "Business Administration Somaliland, IT Courses Hargeisa, Engineering Programs, Public Health Education, Teacher Training, Agriculture Studies",

  // Quality indicators
  qualityIndicators:
    "Accredited University, International Standards, Modern Facilities, Expert Faculty, Research Excellence, Career Success",
}

// Enhanced floating particles with better performance
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    direction: Math.random() > 0.5 ? 1 : -1,
  }))

  if (!isClient) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.direction * 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced animated counter
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && isInView && !hasStarted) {
      setHasStarted(true)
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
  }, [isClient, isInView, end, duration, hasStarted])

  return (
    <span ref={ref}>
      {hasStarted ? (
        <>
          {count}
          {suffix}
        </>
      ) : (
        <>0{suffix}</>
      )}
    </span>
  )
}

// Enhanced Somaliland flag component
const SomalilandFlag = ({ className = "h-6 w-8" }: { className?: string }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}>
        <div className="h-1/3 bg-emerald-600"></div>
        <div className="h-1/3 bg-white flex items-center justify-center">
          <Star className="h-2 w-2 text-emerald-600 fill-emerald-600" />
        </div>
        <div className="h-1/3 bg-red-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}
      whileHover={{ scale: 1.05 }}
      animate={{
        boxShadow: ["0 0 0 rgba(34, 197, 94, 0.3)", "0 0 20px rgba(34, 197, 94, 0.6)", "0 0 0 rgba(34, 197, 94, 0.3)"],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      suppressHydrationWarning
    >
      <div className="h-1/3 bg-emerald-600"></div>
      <div className="h-1/3 bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Star className="h-2 w-2 text-emerald-600 fill-emerald-600" />
        </motion.div>
      </div>
      <div className="h-1/3 bg-red-600"></div>
    </motion.div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -200])
  const campusExcellenceRef = useRef(null)
  const campusExcellenceInView = useInView(campusExcellenceRef, { once: true })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isClient])

  const heroSlides = [
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Unity University Somaliland - #1 Leading University in Hargeisa",
      titleSo: "Jaamacadda Unity Somaliland - Jaamacadda Ugu Horeysa Hargeisa",
      subtitle: "Best Higher Education Institution in Somaliland | Halkan wax ka bilaabmaan, Afrika way beddelaan",
      description: SEO_CONTENT.heroDescription,
      cta: "Discover Excellence - Apply Now",
      ctaSo: "Fiicanta Baadh - Hadda Codso",
      keywords: "leading university hargeisa, best education somaliland, top university horn africa",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "World-Class Programs & Research Excellence in Somaliland",
      titleSo: "Barnaamijyo Heer Caalami ah & Fiican Cilmi-baadhis Somaliland",
      subtitle: "Accredited Degrees | Modern Facilities | Expert Faculty | 95% Job Placement",
      description:
        "Experience cutting-edge education at Unity University Somaliland. Our internationally accredited programs in Business, IT, Engineering, and Health Sciences prepare you for global career success. State-of-the-art facilities, research opportunities, and industry partnerships in the heart of Hargeisa.",
      cta: "Explore Programs",
      ctaSo: "Barnaamijyada Baadh",
      keywords: "accredited programs somaliland, modern facilities hargeisa, research university",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920",
      title: "Transform Your Future at Somaliland's Premier University",
      titleSo: "Mustaqbalkaaga Bedel Jaamacadda Ugu Fiican Somaliland",
      subtitle: "25+ Programs | 2,800+ Students | International Standards | Local Impact",
      description:
        "Join 2,800+ students at Unity University Somaliland, where global academic standards meet local cultural values. Our graduates lead in business, government, and civil society across Somaliland and the Horn of Africa. Scholarships available for qualified students.",
      cta: "Join Our Community",
      ctaSo: "Bulshadeenna Ku Biir",
      keywords: "premier university somaliland, international standards, scholarships available",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO-optimized hidden content for search engines */}
      <div className="sr-only">
        <h1>Unity University Somaliland - Leading Higher Education Institution in Hargeisa</h1>
        <p>
          Best university in Somaliland offering undergraduate, graduate, and professional programs. Located in Hargeisa
          with modern facilities, expert faculty, and international accreditation. Programs include Business
          Administration, Information Technology, Engineering, Public Health, Education, and Agriculture. Apply now for
          2024 admission.
        </p>
        <div>
          <span>
            Keywords: {SEO_CONTENT.locationKeywords}, {SEO_CONTENT.programKeywords}, {SEO_CONTENT.qualityIndicators}
          </span>
        </div>
      </div>

      <SomalilandNavbar />

      {/* Enhanced Hero Section with SEO optimization */}
      <section className="relative h-screen overflow-hidden">
        <FloatingParticles />

        {/* Dynamic background with parallax */}
        {isClient ? (
          <motion.div style={{ y: heroParallax }} className="absolute inset-0" suppressHydrationWarning>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50, scale: 1.2 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-black/60 to-red-900/90" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSlides[0].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-black/60 to-red-900/90" />
          </div>
        )}

        {/* Hero Content with SEO-optimized structure */}
        <div className="container relative z-10 mx-auto flex h-full items-center px-4">
          <motion.div className="max-w-5xl" variants={containerVariants} initial="hidden" animate="visible">
            {/* University Badge with location keywords */}
            <motion.div variants={itemVariants} className="mb-8 flex items-center space-x-4">
              <Badge className="bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 text-base font-bold shadow-xl border border-emerald-500/30">
                {heroSlides[currentSlide].subtitle}
              </Badge>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <SomalilandFlag className="h-8 w-12" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              >
                <Star className="h-6 w-6 text-white fill-white drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Main Headlines with SEO keywords */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                  <motion.span
                    key={`${currentSlide}-${index}`}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <h2 className="text-xl md:text-2xl font-semibold text-emerald-200">{heroSlides[currentSlide].titleSo}</h2>
            </motion.div>

            {/* SEO-optimized description */}
            <motion.p variants={itemVariants} className="mb-12 text-lg text-white/95 max-w-4xl leading-relaxed">
              {heroSlides[currentSlide].description}
            </motion.p>

            {/* CTA Buttons with tracking */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button
                    size="lg"
                    className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold shadow-2xl border border-emerald-500/30"
                    data-program="application"
                  >
                    {heroSlides[currentSlide].cta}
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/academics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                    data-program="academics"
                  >
                    {heroSlides[currentSlide].ctaSo}
                    <Play className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Key Features with SEO keywords */}
            <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "25+ Accredited Programs",
                  titleSo: "25+ Barnaamij Aqoonsi leh",
                  keywords: "accredited programs somaliland",
                },
                {
                  icon: Users,
                  title: "2,800+ Successful Students",
                  titleSo: "2,800+ Arday Guulaysan",
                  keywords: "student success hargeisa",
                },
                {
                  icon: Award,
                  title: "15 Years Excellence",
                  titleSo: "15 Sano Fiican",
                  keywords: "educational excellence somaliland",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  data-program={feature.keywords}
                >
                  <feature.icon className="h-8 w-8 text-emerald-300" />
                  <div>
                    <div className="text-white font-bold">{feature.title}</div>
                    <div className="text-emerald-200 text-sm">{feature.titleSo}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
          <div className="flex space-x-3 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-12 rounded-full transition-all duration-500 ${
                  currentSlide === index ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        {isClient && (
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            suppressHydrationWarning
          >
            <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center mb-2">
              <motion.div
                className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <p className="text-white/70 text-sm font-medium">Explore Our Campus</p>
          </motion.div>
        )}
      </section>

      {/* SEO-optimized Campus Excellence Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-red-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            ref={campusExcellenceRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={campusExcellenceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              World-Class Campus{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Excellence in Hargeisa
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Fiican Campus-ka Hargeisa</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience state-of-the-art educational facilities at Unity University Somaliland's campuses in Hargeisa
              and Berbera. Our modern infrastructure, advanced laboratories, and innovative learning spaces provide the
              perfect environment for academic excellence and research innovation in the Horn of Africa.
            </p>

            {/* SEO keywords for campus facilities */}
            <div className="sr-only">
              <p>
                Modern university facilities Hargeisa, state-of-the-art campus Somaliland, advanced laboratories Horn of
                Africa, research facilities Berbera, innovation centers Somaliland, educational infrastructure Hargeisa
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Main Campus Hargeisa - Premier Educational Hub",
                titleSo: "Campus Weyn Hargeisa - Xarunta Waxbarashada",
                location: "New Generation Campus, Hargeisa",
                description:
                  "Our flagship 50-acre campus in Hargeisa features modern lecture halls, advanced research laboratories, digital library, student amenities, and sports facilities. Home to 2,200+ students across 20+ undergraduate and graduate programs.",
                image: "/placeholder.svg?height=400&width=600",
                stats: { students: "2,200+", programs: "20+", facilities: "15+" },
                color: "emerald",
                keywords: "main campus hargeisa, flagship university somaliland, modern facilities",
              },
              {
                title: "Berbera Innovation Hub - Maritime & Technology Center",
                titleSo: "Xarunta Hal-abuurka Berbera - Xarunta Badda & Tignoolajiyada",
                location: "Coastal Innovation Center, Berbera",
                description:
                  "Specialized 25-acre campus focusing on maritime studies, information technology, and coastal development. Strategic location near Berbera Port with industry partnerships and internship opportunities.",
                image: "/placeholder.svg?height=400&width=600",
                stats: { students: "600+", programs: "8+", facilities: "10+" },
                color: "red",
                keywords: "berbera campus, maritime studies, technology center somaliland",
              },
              {
                title: "Research & Development Complex - Innovation Excellence",
                titleSo: "Xarunta Cilmi-baadhista & Horumarinta - Fiican Hal-abuur",
                location: "Advanced Research Facility, Hargeisa",
                description:
                  "Cutting-edge 15-acre research complex with specialized laboratories, innovation incubators, and collaboration spaces. Supporting 50+ research projects and partnerships with international institutions.",
                image: "/placeholder.svg?height=400&width=600",
                stats: { projects: "50+", labs: "12+", partnerships: "25+" },
                color: "teal",
                keywords: "research facilities hargeisa, innovation complex somaliland, advanced laboratories",
              },
            ].map((campus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
                data-program={campus.keywords}
              >
                <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={campus.image || "/placeholder.svg"}
                      alt={`${campus.title} - Unity University Somaliland`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-${campus.color}-900/80 to-transparent`} />
                    <div className="absolute top-4 right-4">
                      <SomalilandFlag className="h-6 w-8" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-xl font-bold mb-1">{campus.title}</h4>
                      <p className="text-white/90 text-sm">{campus.titleSo}</p>
                      <Badge className={`mt-2 bg-${campus.color}-600/90 text-white text-xs`}>{campus.location}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-6">{campus.description}</p>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(campus.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className={`text-2xl font-bold text-${campus.color}-600`}>{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Link href="/about/campus-map" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-gray-50 transition-colors duration-300 bg-transparent"
                      >
                        Explore Campus
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section with SEO keywords */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 via-emerald-800 to-red-700 relative overflow-hidden">
        <FloatingParticles />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Excellence in Numbers - Proven Success</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-6">Tirooyinka Fiicanta - Guul La Hubay</h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Our achievements demonstrate Unity University Somaliland's commitment to academic excellence, student
              success, and community impact across the Horn of Africa. These numbers reflect our position as the leading
              higher education institution in Somaliland.
            </p>

            {/* SEO content for statistics */}
            <div className="sr-only">
              <p>
                Unity University Somaliland statistics: 2800+ students enrolled, 95+ expert faculty, 25+ academic
                programs, 15 years of educational excellence, 85% graduate employment rate, 50+ research projects, 12+
                international partnerships, 98% student satisfaction rate. Best university performance metrics
                Somaliland.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: 2800,
                label: "Students Enrolled Successfully",
                labelSo: "Ardayda Diiwaan-gashan oo Guulaysan",
                icon: Users,
                suffix: "+",
                keywords: "student enrollment somaliland",
              },
              {
                number: 95,
                label: "Expert Faculty Members",
                labelSo: "Macallimiinta Khibradda leh",
                icon: Award,
                suffix: "+",
                keywords: "expert faculty hargeisa",
              },
              {
                number: 25,
                label: "Accredited Academic Programs",
                labelSo: "Barnaamijyada Waxbarasho ee Aqoonsi leh",
                icon: BookOpen,
                suffix: "+",
                keywords: "accredited programs somaliland",
              },
              {
                number: 15,
                label: "Years of Educational Excellence",
                labelSo: "Sanno Fiican Waxbarasho",
                icon: TrendingUp,
                suffix: "",
                keywords: "educational excellence somaliland",
              },
              {
                number: 85,
                label: "Graduate Employment Rate",
                labelSo: "Heerka Shaqo-helida Qalinjirayaasha",
                icon: Target,
                suffix: "%",
                keywords: "job placement rate somaliland",
              },
              {
                number: 50,
                label: "Active Research Projects",
                labelSo: "Mashaariicda Cilmi-baadhista ee Firfircoon",
                icon: Lightbulb,
                suffix: "+",
                keywords: "research projects hargeisa",
              },
              {
                number: 12,
                label: "International Partnerships",
                labelSo: "Iskaashiga Caalamiga ah",
                icon: Globe,
                suffix: "+",
                keywords: "international partnerships university",
              },
              {
                number: 98,
                label: "Student Satisfaction Rate",
                labelSo: "Heerka Qanacsanaanta Ardayda",
                icon: Heart,
                suffix: "%",
                keywords: "student satisfaction somaliland",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                data-program={stat.keywords}
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-emerald-300" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-3 text-white">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-sm leading-tight">{stat.label}</div>
                  <div className="text-emerald-200 font-medium text-xs leading-tight">{stat.labelSo}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-optimized Academic Programs Preview */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top-Ranked Academic{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Programs in Somaliland
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Barnaamijyada Waxbarasho ee Ugu Fiican Somaliland
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose from Unity University Somaliland's comprehensive range of internationally accredited academic
              programs. Our curriculum combines global best practices with local relevance, preparing graduates for
              successful careers in Somaliland, the Horn of Africa, and beyond. All programs feature modern facilities,
              expert faculty, and strong industry connections.
            </p>

            {/* SEO content for academic programs */}
            <div className="sr-only">
              <p>
                Best academic programs Somaliland: Business Administration degree Hargeisa, Information Technology
                courses Somaliland, Engineering programs Horn of Africa, Public Health education Hargeisa, Teacher
                training Somaliland, Agriculture studies sustainable farming. Accredited undergraduate graduate
                professional development programs.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Business Administration - Leading Business Education in Somaliland",
                titleSo: "Maamulka Ganacsiga - Waxbarashada Ganacsiga ee Hogaaminta Somaliland",
                level: "Undergraduate & Graduate Programs",
                levelSo: "Barnaamijyo Koowaad & Sare",
                description:
                  "Premier business education program in Somaliland preparing future entrepreneurs and business leaders. Comprehensive curriculum covering entrepreneurship, finance, marketing, and management with focus on Somaliland's growing economy and regional business opportunities.",
                image: "/placeholder.svg?height=300&width=400",
                features: [
                  "Entrepreneurship Development",
                  "Industry Partnerships",
                  "Practical Training",
                  "Career Placement",
                ],
                featuresSo: [
                  "Horumarinta Ganacsiga",
                  "Iskaashiga Warshadaha",
                  "Tababar Ficil ah",
                  "Meel-marinta Shaqada",
                ],
                gradient: "from-emerald-600 to-emerald-800",
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "business administration somaliland, entrepreneurship hargeisa, business degree",
              },
              {
                title: "Information Technology - Advanced IT Education in Horn of Africa",
                titleSo: "Tignoolajiyada Macluumaadka - Waxbarasho Horumarsan IT Geeska Afrika",
                level: "Undergraduate & Graduate Programs",
                levelSo: "Barnaamijyo Koowaad & Sare",
                description:
                  "Cutting-edge Information Technology programs covering software development, cybersecurity, data science, and digital innovation. State-of-the-art computer labs, industry certifications, and partnerships with leading tech companies prepare students for the digital economy.",
                image: "/placeholder.svg?height=300&width=400",
                features: ["Modern Curriculum", "Industry Certifications", "Innovation Labs", "Tech Partnerships"],
                featuresSo: [
                  "Manhaj Casri ah",
                  "Shahaadooyinka Warshadaha",
                  "Makhadyada Hal-abuurka",
                  "Iskaashiga Tignoolajiyada",
                ],
                gradient: "from-blue-600 to-blue-800",
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "information technology hargeisa, IT courses somaliland, computer science degree",
              },
              {
                title: "Public Health - Community Health Leadership in Somaliland",
                titleSo: "Caafimaadka Dadweynaha - Hogaaminta Caafimaadka Bulshada Somaliland",
                level: "Undergraduate & Graduate Programs",
                levelSo: "Barnaamijyo Koowaad & Sare",
                description:
                  "Comprehensive public health education addressing community health challenges in Somaliland and the Horn of Africa. Focus on preventive care, health promotion, epidemiology, and health systems management with clinical training opportunities.",
                image: "/placeholder.svg?height=300&width=400",
                features: ["Community Focus", "Clinical Training", "Research Opportunities", "Health Policy"],
                featuresSo: [
                  "Diiradda Bulshada",
                  "Tababarka Bukaan-socodka",
                  "Fursadaha Cilmi-baadhista",
                  "Siyaasadda Caafimaadka",
                ],
                gradient: "from-red-600 to-red-800",
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "public health somaliland, healthcare education hargeisa, medical programs",
              },
              {
                title: "Engineering - Infrastructure Development Excellence",
                titleSo: "Injineerinta - Fiican Horumarinta Kaabayaasha",
                level: "Undergraduate Programs",
                levelSo: "Barnaamijyo Koowaad",
                description:
                  "Comprehensive engineering education in civil, electrical, and mechanical engineering supporting Somaliland's infrastructure development. Hands-on learning with modern equipment, industry projects, and sustainable design principles.",
                image: "/placeholder.svg?height=300&width=400",
                features: ["Hands-on Learning", "Modern Equipment", "Industry Projects", "Sustainable Design"],
                featuresSo: [
                  "Barashada Gacanta",
                  "Qalabka Casriga ah",
                  "Mashaariicda Warshadaha",
                  "Naqshadaynta Joogta ah",
                ],
                gradient: "from-teal-600 to-teal-800",
                duration: "4 Years Bachelor",
                keywords: "engineering programs somaliland, civil engineering hargeisa, infrastructure development",
              },
              {
                title: "Education - Teacher Training Excellence in Somaliland",
                titleSo: "Waxbarashada - Fiican Tababarka Macallimiinta Somaliland",
                level: "Undergraduate & Graduate Programs",
                levelSo: "Barnaamijyo Koowaad & Sare",
                description:
                  "Premier teacher training programs preparing qualified educators to transform Somaliland's education sector. Modern teaching methodologies, educational technology integration, and practical classroom experience.",
                image: "/placeholder.svg?height=300&width=400",
                features: [
                  "Teaching Practice",
                  "Educational Technology",
                  "Curriculum Development",
                  "Leadership Training",
                ],
                featuresSo: [
                  "Ku-celcelinta Waxbarashada",
                  "Tignoolajiyada Waxbarashada",
                  "Horumarinta Manhajka",
                  "Tababarka Hogaaminta",
                ],
                gradient: "from-purple-600 to-purple-800",
                duration: "4 Years Bachelor / 2 Years Master",
                keywords: "teacher training somaliland, education degree hargeisa, teaching programs",
              },
              {
                title: "Agriculture & Environment - Sustainable Development Focus",
                titleSo: "Beeraha & Deegaanka - Diiradda Horumarinta Joogta ah",
                level: "Undergraduate Programs",
                levelSo: "Barnaamijyo Koowaad",
                description:
                  "Innovative agriculture and environmental management programs addressing food security and climate challenges in Somaliland. Sustainable farming practices, environmental conservation, and modern agricultural techniques.",
                image: "/placeholder.svg?height=300&width=400",
                features: ["Sustainable Practices", "Field Research", "Climate Adaptation", "Modern Farming"],
                featuresSo: [
                  "Hab-maamuusyada Joogta ah",
                  "Cilmi-baadhista Beerta",
                  "La-qabsiga Cimilada",
                  "Beeraha Casriga ah",
                ],
                gradient: "from-green-600 to-green-800",
                duration: "4 Years Bachelor",
                keywords: "agriculture programs somaliland, environmental studies hargeisa, sustainable farming",
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                data-program={program.keywords}
              >
                <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={`${program.title} - Unity University Somaliland`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient}/90 to-transparent`} />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs">{program.duration}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{program.title}</h4>
                      <p className="text-white/90 text-sm">{program.titleSo}</p>
                      <p className="text-white/80 text-xs mt-1">{program.level}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">{program.description}</p>

                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 text-sm">Key Features:</h5>
                      <div className="grid grid-cols-1 gap-2">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Link href="/academics" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-gray-50 transition-colors duration-300 bg-transparent"
                      >
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/academics">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700 px-8 py-4 text-lg font-bold shadow-xl"
                data-program="all-programs"
              >
                Explore All Programs
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action Section with SEO optimization */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 via-emerald-900 to-red-800 relative overflow-hidden">
        <FloatingParticles />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <SomalilandFlag className="h-12 w-16" />
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Shape Your Future at Somaliland's #1 University?
            </h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">
              Diyaar ma u tahay inaad Mustaqbalkaaga Qurxiso Jaamacadda Ugu Fiican Somaliland?
            </h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Join Unity University Somaliland and become part of a community dedicated to excellence, innovation, and
              positive impact. Your journey to success starts here in Hargeisa, at the leading higher education
              institution in the Horn of Africa. Apply now for 2024 admission and transform your future.
            </p>

            {/* SEO content for CTA section */}
            <div className="sr-only">
              <p>
                Apply now Unity University Somaliland 2024 admission, best university Hargeisa application, leading
                higher education Somaliland enrollment, premier university Horn of Africa admission process,
                scholarships available qualified students, career success guaranteed graduates
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              {[
                {
                  icon: Phone,
                  title: "Call Us - Admissions Hotline",
                  titleSo: "Noo Soo Wac - Khadka Gelitaanka",
                  info: "+252 63 4210013",
                  action: "tel:+25263421013",
                  keywords: "university contact hargeisa",
                },
                {
                  icon: Mail,
                  title: "Email Us - Quick Response",
                  titleSo: "Iimeel Noo Dir - Jawaab Degdeg ah",
                  info: "somaliland@tuu.university",
                  action: "mailto:somaliland@tuu.university",
                  keywords: "university email somaliland",
                },
                {
                  icon: MapPin,
                  title: "Visit Us - Campus Tour Available",
                  titleSo: "Noo Yimaada - Booqasho Campus Diyaar",
                  info: "New Generation Campus, Hargeisa",
                  action: "/about/contact",
                  keywords: "campus visit hargeisa",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.action}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-program={contact.keywords}
                >
                  <contact.icon className="h-10 w-10 mb-4 text-emerald-300" />
                  <h4 className="font-bold text-lg mb-1">{contact.title}</h4>
                  <h5 className="font-semibold text-sm mb-3 text-emerald-200">{contact.titleSo}</h5>
                  <p className="text-sm opacity-95 text-center leading-relaxed">{contact.info}</p>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                    data-program="application-cta"
                  >
                    Apply Now - 2024 Admission Open
                    <Heart className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                    data-program="campus-visit"
                  >
                    Schedule Campus Visit
                    <Calendar className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
