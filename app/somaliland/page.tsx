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
import Head from "next/head"
import { Dialog, DialogContent, DialogTitle } from "@/components/somaliland/ui/dialog";

// SEO-optimized content constants
const SEO_CONTENT = {
  heroTitle: "The Unity University Somaliland - #1 Leading University in Hargeisa",
  heroSubtitle: "Best Higher Education Institution in Somaliland | World-Class Programs",
  heroDescription:
    "Discover excellence at The Unity University Somaliland, the premier higher education institution in Hargeisa. Offering accredited undergraduate, graduate, and professional programs in Business Administration, Information Technology, Engineering, Health Sciences, and Education. Modern facilities, expert faculty, 95% job placement rate.",

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

// Somaliland flag using Wikimedia SVG
const SomalilandFlag = ({ className = "h-6 w-8" }: { className?: string }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Somaliland.svg"
    alt="Flag of Somaliland"
    className={`${className} rounded-sm shadow-md border border-white/20 object-cover`}
    loading="lazy"
    decoding="async"
    draggable={false}
    style={{ display: 'inline-block' }}
  />
)

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [adSlide, setAdSlide] = useState(0);

  useEffect(() => {
    setIsClient(true)
    setModalOpen(true);
  }, [])

  // Auto-slide for modal ads
  useEffect(() => {
    if (!modalOpen) return;
    const interval = setInterval(() => {
      setAdSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [modalOpen]);

  // Modal ad slides data (Somaliland colors)
  const adSlides = [
    {
      image: "/strips/apply-now-at-the-unity-university.jpg",
      imageClass: "w-full h-48 md:h-64 object-cover rounded-t-lg",
      title: "𝗔𝗱𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗜𝘀 𝗡𝗼𝘄 𝗢𝗽𝗲𝗻",
      text: (
        <>
          <div className="text-base md:text-lg font-semibold mb-2">Waxaa Socda diwaangalinta 𝐌𝐚𝐬𝐭𝐞𝐫 program 𝗛𝗮𝗹𝗳 𝗦𝗰𝗵𝗼𝗹𝗮𝗿𝘀𝗵𝗶𝗽 Xarunta jamacadda Naguso boqo Wll Saad Macluumad dheriya u hesho</div>
          <div className="italic text-sm md:text-base mb-2">𝑯𝒂𝒍𝒌𝒂 𝑨𝒒𝒐𝒐𝒏𝒕𝒂, 𝑾𝒂𝒂𝒚𝒐-𝑨𝒓𝒂𝒈𝒏𝒊𝒎𝒂𝒅𝒂,𝒊𝒚𝒐 𝑴𝒖𝒔𝒕𝒂𝒒𝒃𝒂𝒍𝒌𝒖 𝒂𝒚 𝒌𝒖 𝒎𝒊𝒅𝒂𝒚𝒔𝒂𝒏 𝒚𝒊𝒉𝒊𝒊𝒏.</div>
          <div className="font-bold text-emerald-700 mb-2">𝑾𝒉𝒂𝒕 𝑩𝒆𝒈𝒊𝒏𝒔 𝑯𝒆𝒓𝒆 𝑻𝒓𝒂𝒏𝒔𝒇𝒐𝒓𝒎𝒔 𝑨𝒇𝒓𝒊𝒄𝒂.</div>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm mb-1 text-gray-600">
            <span>Somaliland Campus, Hargeisa, Somaliland</span>
            <span className="mx-2">|</span>
            <span>Liberia Campus, Monrovia, Montserrado County</span>
          </div>
        </>
      ),
    },
    {
      image: "/strips/the_unity_university_cover.jpeg",
      imageClass: "w-full h-48 md:h-64 object-cover rounded-t-lg",
      title: "𝗔𝗱𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗜𝘀 𝗡𝗼𝘄 𝗢𝗽𝗲𝗻",
      text: (
        <>
          <div className="text-base md:text-lg font-semibold mb-2">Waxaa Socda diwaangalinta 𝐝𝐞𝐠𝐫𝐞𝐞 𝐢𝐲𝐨 𝐌𝐚𝐬𝐭𝐞𝐫 program 𝗛𝗮𝗹𝗳 𝗦𝗰𝗵𝗼𝗹𝗮𝗿𝘀𝗵𝗶𝗽 wixii faahfahin dheerada Nagusooboqo Xarunta Jamacadda naguso boqo wll saad macluumad dheriya u hesho</div>
          <div className="font-semibold text-emerald-800 mb-2">𝐖𝐚𝐚 𝐗𝐢𝐥𝐢𝐠𝐢𝐢 𝐚𝐚𝐝 𝐝𝐨𝐨𝐫𝐚𝐧 𝐥𝐚𝐡𝐚𝐲𝐝 𝐣𝐚𝐚𝐦𝐚𝐜𝐝𝐝𝐚 𝐭𝐡𝐞 𝐔𝐧𝐢𝐭𝐲 𝐔𝐧𝐢𝐯𝐞𝐫𝐬𝐢𝐭𝐲</div>
          <div className="font-bold text-emerald-700 mb-2">What Begins Here Transforms Africa.</div>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm mb-1 text-gray-600">
            <span>Somaliland Campus, Hargeisa, Somaliland</span>
            <span className="mx-2">|</span>
            <span>Liberia Campus, Monrovia, Montserrado County</span>
          </div>
        </>
      ),
    },
    {
      image: "/strips/bachelor-of-software-enginnering.jpg",
      imageClass: "w-40 h-40 md:w-64 md:h-64 object-cover rounded-full mx-auto mt-4",
      title: "Bachelor of Science in Software Engineering",
      text: (
        <>
          <div className="text-base md:text-lg font-semibold mb-2">"HOME OF IT & ENGINEERING"</div>
          <div className="font-bold text-emerald-700 mb-2">What Begins Here Transforms Africa.</div>
          <div className="text-xs md:text-sm mb-1">info@tuu.university | www.tuu.university</div>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm mb-2 text-gray-600">
            <span>Somaliland Campus, Hargeisa, Somaliland</span>
            <span className="mx-2">|</span>
            <span>Liberia Campus, Monrovia, Montserrado County</span>
          </div>
        </>
      ),
    },
  ];

  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -200])
  const campusExcellenceRef = useRef(null)
  const campusExcellenceInView = useInView(campusExcellenceRef, { once: true })

  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isClient])

  const heroSlides = [
    {
      image: "/hero-section/all-on-graduation-pic.jpg",
      title: "Unity University Somaliland - Leading University in Hargeisa",
      subtitle: "What Begins Here, Transforms Africa",
      description: "Founded in 2020, Unity University is the premier higher education institution in Hargeisa, Somaliland. With our motto 'What Begins Here, Transforms Africa', we offer world-class undergraduate and graduate programs across five faculties: Business & Management, Computing & IT, Allied Health Sciences, Social Sciences, and Education.",
      cta: "Apply Now",
      keywords: "leading university hargeisa, best education somaliland, top university horn africa",
    },
    {
      image: "/hero-section/global-perspective.jpg",
      title: "Transforming African Education Since 2020",
      subtitle: "5 Years of Excellence | Modern Facilities | Expert Faculty",
      description:
        "Experience transformative education at Unity University Somaliland. Our 37+ academic programs across five faculties prepare you for leadership roles. Located at Jigjiga Yar Street near Masjid Jabir, Hargeisa, we serve 2,800+ students with cutting-edge facilities and Pan-African vision.",
      cta: "Explore Programs",
      keywords: "academic programs somaliland, modern facilities hargeisa, research university",
    },
    {
      image: "/hero-section/graduation-master-0.jpg",
      title: "Join the Pan-African Educational Revolution",
      subtitle: "37+ Programs | 2,800+ Students | 150+ Faculty | Pan-African Network",
      description:
        "Be part of Unity University's mission to become a world-class university in leadership development in Africa. With campuses in Somaliland and Liberia, we integrate theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.",
      cta: "Join Our Community",
      keywords: "pan-african university, leadership development, international standards",
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
    <>
      <Head>
        <title>The Unity University Somaliland | Accredited University in Hargeisa, East Africa</title>
        <meta name="description" content="The Unity University Somaliland campus in Hargeisa offers world-class, tuition-free, accredited education for East Africa and the Horn of Africa. Join a leading Pan-African university dedicated to leadership and innovation." />
        <meta property="og:title" content="The Unity University Somaliland | Accredited University in Hargeisa, East Africa" />
        <meta property="og:description" content="Tuition-free, accredited university in Hargeisa, Somaliland. Empowering leaders for East Africa and the Horn of Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tuu.university/somaliland" />
        <meta property="og:image" content="https://tuu.university/hero-section/hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Unity University Somaliland | Accredited University in Hargeisa, East Africa" />
        <meta name="twitter:description" content="Tuition-free, accredited university in Hargeisa, Somaliland. Empowering leaders for East Africa and the Horn of Africa." />
        <meta name="twitter:image" content="https://tuu.university/hero-section/hero.png" />
        <link rel="canonical" href="https://tuu.university/somaliland" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="SO" />
        <meta name="geo.placename" content="Hargeisa, Somaliland, East Africa, Horn of Africa" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          "name": "The Unity University Somaliland",
          "url": "https://tuu.university/somaliland",
          "logo": "https://tuu.university/hero-section/hero.png",
          "description": "The Unity University Somaliland campus in Hargeisa offers world-class, tuition-free, accredited education for East Africa and the Horn of Africa. Join a leading Pan-African university dedicated to leadership and innovation.",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hargeisa Campus, Main Road",
            "addressLocality": "Hargeisa",
            "addressRegion": "Somaliland",
            "addressCountry": "SO"
          },
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+252 63 1234567",
            "contactType": "admissions",
            "areaServed": ["SO", "KE", "ET", "East Africa", "Horn of Africa"]
          }],
          "sameAs": [
            "https://www.facebook.com/theunityuniversity",
            "https://twitter.com/theunityuniv",
            "https://www.linkedin.com/company/the-unity-university/"
          ]
        }` }} />
      </Head>
      <div className="min-h-screen bg-white">
        {/* SEO-optimized hidden content for search engines */}
        <div className="sr-only">
          <h1>The Unity University Somaliland - Leading Higher Education Institution in Hargeisa</h1>
          <p>
            Best university in Somaliland offering undergraduate, graduate, and professional programs. Located in Hargeisa
            with modern facilities, expert faculty, and international accreditation. Programs include Business
            Administration, Information Technology, Engineering, Public Health, Education, and Agriculture. Apply now for
            2025-2026 admission.
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
              </motion.div>

              {/* SEO-optimized description */}
              <motion.p variants={itemVariants} className="mb-12 text-lg text-white/95 max-w-4xl leading-relaxed">
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons with tracking */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
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
                  <Link href="/somaliland/academics">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                      data-program="academics"
                    >
                      Apply Now
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
                    title: "37+ Academic Programs",
                    keywords: "academic programs somaliland",
                  },
                  {
                    icon: Users,
                    title: "2,800+ Students",
                    keywords: "student success hargeisa",
                  },
                  {
                    icon: Award,
                    title: "5 Years Excellence",
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-6">Exciting Campus Activities</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore our dynamic campus life with cutting-edge coding classes, thrilling football tournaments, 
                and state-of-the-art science laboratories. We provide students with opportunities to develop 
                technical skills, engage in sports, and conduct innovative scientific research.
              </p>

              {/* SEO keywords for campus activities */}
              <div className="sr-only">
                <p>
                  Coding classes Somaliland, football tournaments university, science labs Hargeisa, 
                  technical skills development, sports activities campus, research opportunities
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Coding Classes - Tech Innovation Hub",
                  location: "Modern Tech Learning Center, Hargeisa",
                  description:
                    "Cutting-edge coding programs for students to develop advanced programming skills. State-of-the-art computer labs, expert instructors, and hands-on projects in various programming languages and technologies.",
                  image: "/placeholder.svg?height=400&width=600",
                  stats: { students: "500+", programs: "10+", facilities: "15+" },
                  color: "emerald",
                  textColor: "text-emerald-900",
                  titleColor: "text-emerald-900",
                  bgColor: "bg-emerald-50",
                  locationBadgeColor: "bg-emerald-600/90",
                  keywords: "coding classes somaliland, tech education hargeisa",
                },
                {
                  title: "Football Tournaments - Sports Excellence",
                  location: "University Sports Complex, Hargeisa",
                  description:
                    "Vibrant football program with regular tournaments, professional coaching, and inter-university competitions. Developing teamwork, leadership, and athletic skills for students across different programs.",
                  image: "/placeholder.svg?height=400&width=600",
                  stats: { teams: "20+", tournaments: "8+", participants: "300+" },
                  color: "orange",
                  textColor: "text-orange-900",
                  titleColor: "text-orange-900",
                  bgColor: "bg-orange-50",
                  locationBadgeColor: "bg-orange-600/90",
                  keywords: "football tournaments university, sports activities somaliland",
                },
                {
                  title: "Science Laboratories - Research Innovation",
                  location: "Advanced Science Research Center, Hargeisa",
                  description:
                    "Comprehensive science laboratory program offering cutting-edge research facilities for students. Professional-grade equipment, expert guidance, and interdisciplinary research opportunities across multiple scientific domains.",
                  image: "/placeholder.svg?height=400&width=600",
                  stats: { students: "100+", labs: "12+", projects: "50+" },
                  color: "blue",
                  textColor: "text-blue-900",
                  titleColor: "text-blue-900",
                  bgColor: "bg-blue-50",
                  locationBadgeColor: "bg-blue-600/90",
                  keywords: "science labs hargeisa, research facilities somaliland",
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
                  <Card className={`h-full overflow-hidden ${campus.bgColor} shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-500`}>
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
                        <h4 className={`text-xl font-bold mb-1 ${campus.titleColor}`}>{campus.title}</h4>
                        <Badge className={`mt-2 ${campus.locationBadgeColor} text-white text-xs`}>{campus.location}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className={`${campus.textColor} leading-relaxed mb-6`}>{campus.description}</p>

                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(campus.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className={`text-2xl font-bold ${campus.textColor}`}>{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Removed CardFooter and Explore Campus button */}
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
                Our achievements demonstrate The Unity University Somaliland's commitment to academic excellence, student
                success, and community impact across the Horn of Africa. These numbers reflect our position as the leading
                higher education institution in Somaliland.
              </p>

              {/* SEO content for statistics */}
              <div className="sr-only">
                <p>
                  The Unity University Somaliland statistics: 2800+ students enrolled, 95+ expert faculty, 25+ academic
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
                  icon: Users,
                  suffix: "+",
                  keywords: "student enrollment somaliland",
                },
                {
                  number: 95,
                  label: "Expert Faculty Members",
                  icon: Award,
                  suffix: "+",
                  keywords: "expert faculty hargeisa",
                },
                {
                  number: 25,
                  label: "Accredited Academic Programs",
                  icon: BookOpen,
                  suffix: "+",
                  keywords: "accredited programs somaliland",
                },
                {
                  number: 15,
                  label: "Years of Educational Excellence",
                  icon: TrendingUp,
                  suffix: "",
                  keywords: "educational excellence somaliland",
                },
                {
                  number: 85,
                  label: "Graduate Employment Rate",
                  icon: Target,
                  suffix: "%",
                  keywords: "job placement rate somaliland",
                },
                {
                  number: 50,
                  label: "Active Research Projects",
                  icon: Lightbulb,
                  suffix: "+",
                  keywords: "research projects hargeisa",
                },
                {
                  number: 12,
                  label: "International Partnerships",
                  icon: Globe,
                  suffix: "+",
                  keywords: "international partnerships university",
                },
                {
                  number: 98,
                  label: "Student Satisfaction Rate",
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
                Choose from The Unity University Somaliland's comprehensive range of internationally accredited academic
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
                  level: "Undergraduate & Graduate Programs",
                  description:
                    "Premier business education program in Somaliland preparing future entrepreneurs and business leaders. Comprehensive curriculum covering entrepreneurship, finance, marketing, and management with focus on Somaliland's growing economy and regional business opportunities.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: [
                    "Entrepreneurship Development",
                    "Industry Partnerships",
                    "Practical Training",
                    "Career Placement",
                  ],
                  gradient: "from-emerald-600 to-emerald-800",
                  duration: "3 Years Bachelor / 2 Years Master",
                  keywords: "business administration somaliland, entrepreneurship hargeisa, business degree",
                },
                {
                  title: "Information Technology - Advanced IT Education in Horn of Africa",
                  level: "Undergraduate & Graduate Programs",
                  description:
                    "Cutting-edge Information Technology programs covering software development, cybersecurity, data science, and digital innovation. State-of-the-art computer labs, industry certifications, and partnerships with leading tech companies prepare students for the digital economy.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Modern Curriculum", "Industry Certifications", "Innovation Labs", "Tech Partnerships"],
                  gradient: "from-blue-600 to-blue-800",
                  duration: "3 Years Bachelor / 2 Years Master",
                  keywords: "information technology hargeisa, IT courses somaliland, computer science degree",
                },
                {
                  title: "Public Health - Community Health Leadership in Somaliland",
                  level: "Undergraduate & Graduate Programs",
                  description:
                    "Comprehensive public health education addressing community health challenges in Somaliland and the Horn of Africa. Focus on preventive care, health promotion, epidemiology, and health systems management with clinical training opportunities.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Community Focus", "Clinical Training", "Research Opportunities", "Health Policy"],
                  gradient: "from-red-600 to-red-800",
                  duration: "3 Years Bachelor / 2 Years Master",
                  keywords: "public health somaliland, healthcare education hargeisa, medical programs",
                },
                {
                  title: "Engineering - Infrastructure Development Excellence",
                  level: "Undergraduate Programs",
                  description:
                    "Comprehensive engineering education in civil, electrical, and mechanical engineering supporting Somaliland's infrastructure development. Hands-on learning with modern equipment, industry projects, and sustainable design principles.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Hands-on Learning", "Modern Equipment", "Industry Projects", "Sustainable Design"],
                  gradient: "from-teal-600 to-teal-800",
                  duration: "3 Years Bachelor",
                  keywords: "engineering programs somaliland, civil engineering hargeisa, infrastructure development",
                },
                {
                  title: "Education - Teacher Training Excellence in Somaliland",
                  level: "Undergraduate & Graduate Programs",
                  description:
                    "Premier teacher training programs preparing qualified educators to transform Somaliland's education sector. Modern teaching methodologies, educational technology integration, and practical classroom experience.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: [
                    "Teaching Practice",
                    "Educational Technology",
                    "Curriculum Development",
                    "Leadership Training",
                  ],
                  gradient: "from-purple-600 to-purple-800",
                  duration: "3 Years Bachelor / 2 Years Master",
                  keywords: "teacher training somaliland, education degree hargeisa, teaching programs",
                },
                {
                  title: "Agriculture & Environment - Sustainable Development Focus",
                  level: "Undergraduate Programs",
                  description:
                    "Innovative agriculture and environmental management programs addressing food security and climate challenges in Somaliland. Sustainable farming practices, environmental conservation, and modern agricultural techniques.",
                  image: "/placeholder.svg?height=300&width=400",
                  features: ["Sustainable Practices", "Field Research", "Climate Adaptation", "Modern Farming"],
                  gradient: "from-green-600 to-green-800",
                  duration: "3 Years Bachelor",
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
                        alt={`${program.title} - The Unity University Somaliland`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient}/90 to-transparent`} />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs">{program.duration}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-lg font-bold mb-1">{program.title}</h4>
                        <p className="text-white/90 text-sm">{program.level}</p>
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
                      <Link href="/somaliland/academics" className="w-full">
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
              <Link href="/somaliland/academics">
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
                Join The Unity University Somaliland and become part of a community dedicated to excellence, innovation, and
                positive impact. Your journey to success starts here in Hargeisa, at the leading higher education
                institution in the Horn of Africa. Apply now for 2025-2026 admission and transform your future.
              </p>

              {/* SEO content for CTA section */}
              <div className="sr-only">
                <p>
                  Apply now The Unity University Somaliland 2025-2026 admission, best university Hargeisa application, leading
                  higher education Somaliland enrollment, premier university Horn of Africa admission process,
                  scholarships available qualified students, career success guaranteed graduates
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-12">
                {[
                  {
                    icon: Phone,
                    title: "Call Us - Admissions Hotline",
                    info: "+252 63 4210013",
                    action: "tel:+25263421013",
                    keywords: "university contact hargeisa",
                  },
                  {
                    icon: Mail,
                    title: "Email Us - Quick Response",
                    info: "somaliland@tuu.university",
                    action: "mailto:somaliland@tuu.university",
                    keywords: "university email somaliland",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us - Campus Tour Available",
                    info: "New Generation Campus, Hargeisa",
                    action: "/somaliland/about/contact",
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
                    <p className="text-sm opacity-95 text-center leading-relaxed">{contact.info}</p>
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                      data-program="application-cta"
                    >
                      Apply Now - 2025-2026 Admission Open
                      <Heart className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/somaliland/about/contact">
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

        {/* Modal Popup for Admissions Ads */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-xl w-full p-0 overflow-hidden border-2 border-emerald-700">
            <style jsx global>{`
              .popup-x-close {
                top: 1rem !important;
                right: 1rem !important;
                background: rgba(255,255,255,0.85) !important;
                color: #065f46 !important;
                border-radius: 9999px !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                width: 2.5rem !important;
                height: 2.5rem !important;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                border: 2px solid #d1fae5;
                transition: background 0.2s, color 0.2s;
              }
              .popup-x-close:hover, .popup-x-close:focus {
                background: #059669 !important;
                color: #fff !important;
                border-color: #059669;
              }
              .popup-x-close svg {
                width: 1.5rem !important;
                height: 1.5rem !important;
              }
            `}</style>
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg">
              {/* X Close Button override (Radix UI Close) */}
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="popup-x-close absolute"
                style={{ top: 16, right: 16 }}
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="14" y2="14" /><line x1="14" y1="6" x2="6" y2="14" /></svg>
              </button>
              {/* Image as link */}
              <a href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Image
                  src={adSlides[adSlide].image}
                  alt={adSlides[adSlide].title}
                  width={adSlide === 2 ? 256 : 600}
                  height={adSlide === 2 ? 256 : 192}
                  className={adSlides[adSlide].imageClass + " cursor-pointer"}
                  priority
                />
              </a>
              {/* Content */}
              <div className="p-4 md:p-6 w-full text-center">
                <DialogTitle className="text-xl md:text-2xl font-bold text-emerald-800 mb-2">{adSlides[adSlide].title}</DialogTitle>
                <div className="mb-4 text-gray-700">{adSlides[adSlide].text}</div>
                <Button
                  className="w-full bg-emerald-700 text-white hover:bg-emerald-800 font-bold text-lg py-3 rounded-md mb-2"
                  onClick={() => {
                    setModalOpen(false);
                    window.open("/admissions/apply", "_blank");
                  }}
                >
                  Apply Now
                </Button>
                {/* Slide indicators */}
                <div className="flex justify-center gap-2 mt-2">
                  {adSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`h-2 w-6 rounded-full transition-all duration-300 ${adSlide === idx ? "bg-emerald-700" : "bg-emerald-200"}`}
                      onClick={() => setAdSlide(idx)}
                      aria-label={`Go to ad slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <SomalilandFooter />
      </div>
    </>
  )
}
