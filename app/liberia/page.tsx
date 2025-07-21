"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
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
import Head from "next/head"

// Optimized floating particles component with better performance
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: number;
  }>>([])

  useEffect(() => {
    // Generate particles after hydration to avoid SSR mismatch
    setParticles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 4,
        size: Math.random() * 2 + 1,
      }))
    )
  }, [])

  // Don't render anything until particles are generated (after hydration)
  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/15"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Optimized animated counter with better performance
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
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
        const easeOutQuart = 1 - Math.pow(1 - progress, 3)
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

// Optimized Liberia flag component
const LiberiaFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <svg
      className={cn(className, "rounded-sm shadow-sm border border-white/20")}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Liberia Flag"
    >
      {/* 11 stripes: 6 red, 5 white, starting and ending with red */}
      {[...Array(11)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={(40 / 11) * i}
          width="60"
          height={40 / 11}
          fill={i % 2 === 0 ? "#D21034" : "#fff"}
        />
      ))}
      {/* Blue canton */}
      <rect x="0" y="0" width={60 / 3} height={40 / 2} fill="#003893" />
      {/* White star in canton */}
      <g transform={`translate(${60 / 6},${40 / 4})`}>
        <polygon
          points="0,-7 2.05,-2.16 7, -2.16 3.09,0.83 4.18,5.67 0,2.8 -4.18,5.67 -3.09,0.83 -7,-2.16 -2.05,-2.16"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

// Simplified parallax section component
const ParallaxSection = ({ children, offset = 30 }: { children: React.ReactNode; offset?: number }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, offset])

  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

// Utility to get a random subset of images
// (No longer needed globally)

export default function LiberiaHome() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Hero section images pool
  const heroImages = [
    "/hero-section/hero.png",
    "/hero-section/global-perspective.jpg",
    "/hero-section/male-graduation.jpg",
    "/hero-section/graduation-day.jpg",
    "/hero-section/all-on-graduation-pic.jpg",
    "/hero-section/master-of-education-and-planning.jpg",
    "/graduation/bachelor-of-information-technology.jpg",
    "/graduation/big-men-graduation-master-0.jpg",
    "/graduation/master-of-accounting.jpg",
    "/graduation/master-of-education-and-planning.jpg",
    "/graduation/master-of-education.jpg",
    "/graduation/master-of-human-resource.jpg",
    "/graduation/all-on-graduation-pic.jpg",
    "/graduation/graduation-day.jpg",
  ];

  // State for random hero images (client only)
  const [randomHeroImages, setRandomHeroImages] = useState<string[]>([]);

  useEffect(() => {
    function getRandomImages(images: string[], count: number): string[] {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    setRandomHeroImages(getRandomImages(heroImages, 3));
  }, []);

  // Use random images if available, otherwise fallback to first 3 for SSR
  const heroSlides = useMemo(() => {
    const images = randomHeroImages.length === 3 ? randomHeroImages : heroImages.slice(0, 3);
    return [
      {
        image: images[0],
        title: "The Unity University Liberia",
        subtitle: "What Begins Here, Transforms Africa",
        description:
          "A dynamic, vision-driven university founded on Pan-Africanism and committed to pioneering excellence at the cutting edge of learning. We are raising a new generation of leaders for the African continent through holistic human development.",
        cta: "Transform Your Future",
        keywords: "premier university liberia, monrovia education, west africa",
      },
      {
        image: images[1],
        title: "The Love of Liberty Brought Us Here",
        subtitle: "Pioneering Excellence Since 2024",
        description:
          "Offering transformational educational experiences that develop you in ways you might not yet have dreamed of. We are one of the strongest universities in West Africa, making history every day through innovation and excellence.",
        cta: "Join Our Legacy",
        keywords: "liberian education, transformational learning, west africa university",
      },
      {
        image: images[2],
        title: "Building Leaders for Africa",
        subtitle: "University of Pan-African Excellence",
        description:
          "Our unique approach equips graduates with the skills, acuity and vision needed to succeed as ethical, entrepreneurial leaders. Our vibrant, Pan-African community promises life-long friendship and inspiration.",
        cta: "Become a Leader",
        keywords: "african leadership, pan-african education, ethical leaders",
      },
    ];
  }, [randomHeroImages]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const base = "/liberia"

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  }), [])

  // Simplified slide variants
  const slideVariants = useMemo(() => ({
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  }), [])

  return (
    <>
      <Head>
        <title>The Unity University Liberia | Accredited University in Monrovia, West Africa</title>
        <meta name="description" content="The Unity University Liberia campus in Monrovia offers world-class, tuition-free, accredited education for West Africa. Join a leading Pan-African university dedicated to leadership and innovation." />
        <meta property="og:title" content="The Unity University Liberia | Accredited University in Monrovia, West Africa" />
        <meta property="og:description" content="Tuition-free, accredited university in Monrovia, Liberia. Empowering leaders for West Africa and the African continent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tuu.university/liberia" />
        <meta property="og:image" content="https://tuu.university/hero-section/hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Unity University Liberia | Accredited University in Monrovia, West Africa" />
        <meta name="twitter:description" content="Tuition-free, accredited university in Monrovia, Liberia. Empowering leaders for West Africa and the African continent." />
        <meta name="twitter:image" content="https://tuu.university/hero-section/hero.png" />
        <link rel="canonical" href="https://tuu.university/liberia" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="LR" />
        <meta name="geo.placename" content="Monrovia, Liberia, West Africa" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          "name": "The Unity University Liberia",
          "url": "https://tuu.university/liberia",
          "logo": "https://tuu.university/hero-section/hero.png",
          "description": "The Unity University Liberia campus in Monrovia offers world-class, tuition-free, accredited education for West Africa. Join a leading Pan-African university dedicated to leadership and innovation.",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Monrovia Campus, Main Road",
            "addressLocality": "Monrovia",
            "addressRegion": "Montserrado",
            "addressCountry": "LR"
          },
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+231 77 1234567",
            "contactType": "admissions",
            "areaServed": ["LR", "West Africa"]
          }],
          "sameAs": [
            "https://www.facebook.com/theunityuniversity",
            "https://twitter.com/theunityuniv",
            "https://www.linkedin.com/company/the-unity-university/"
          ]
        }` }} />
      </Head>
      <LiberiaNavbar />

      {/* Optimized Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <FloatingParticles />

        {/* Simplified animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-blue-900/70 to-red-900/80" />

        {/* SEO-optimized hidden content */}
        <div className="sr-only">
          <h1>The Unity University Liberia - Premier Higher Education Institution in Monrovia</h1>
          <p>
            Leading university in Liberia offering world-class education in Business Administration, Information
            Technology, Engineering, and Public Health. Located in Monrovia with modern facilities and expert faculty.
            The Love of Liberty Brought Us Here - Apply now for 2025-2026 admission.
          </p>
        </div>

        {/* Simplified hero content */}
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />

          <div className="container relative z-10 mx-auto flex h-full items-center px-4">
            <div className="max-w-5xl">
              {/* University Badge */}
              <div className="mb-6 flex items-center space-x-4">
                <Badge className="bg-blue-600/90 backdrop-blur-sm text-white px-6 py-3 text-lg font-bold shadow-xl border border-blue-500/30">
                  {heroSlides[currentSlide].subtitle}
                </Badge>
                <LiberiaFlag className="h-8 w-12" />
                <Star className="h-6 w-6 text-white fill-white drop-shadow-lg" />
              </div>

              {/* Main Headlines */}
              <motion.h1
                className="mb-6 text-4xl font-bold text-white md:text-6xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mb-8 text-lg text-white/95 max-w-4xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-bold shadow-2xl border border-blue-500/30"
                    >
                      {heroSlides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={`${base}/academics`}>
                    <Button
                      size="lg"
                      variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                    >
                      Explore Programs
                    <GraduationCap className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
              </motion.div>

              {/* Key Features */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
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
                    title: "1+ Years Excellence",
                    subtitle: "Proven Track Record",
                    keywords: "educational excellence liberia",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                    data-keywords={feature.keywords}
                  >
                    <feature.icon className="h-8 w-8 text-blue-300" />
                    <div>
                      <div className="text-white font-bold">{feature.title}</div>
                      <div className="text-blue-200 text-sm">{feature.subtitle}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Simplified slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
          <div className="flex space-x-3 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
              {heroSlides.map((_, index) => (
              <button
                  key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-2 w-12 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        {/* Simplified scroll indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center mb-2">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2" />
            </div>
            <p className="text-white/70 text-sm font-medium">Discover Excellence</p>
        </div>
      </section>

      {/* Simplified About Section */}
      <ParallaxSection offset={50}>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-red-50/50" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid gap-12 md:grid-cols-2 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                  The Unity University - Liberia Campus
                </h2>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Excellence in{" "}
                  <span className="text-liberian-gradient">
                    Liberian Higher Education
                  </span>
                </h3>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Since establishing our Liberia campus in mid-2024, The Unity University has been at the forefront of
                    educational excellence in West Africa. Our institution embodies the spirit of Liberia - a nation
                    founded on the principles of freedom, democracy, and opportunity for all.
                  </p>
                  <p>
                    Located in the vibrant capital city of Monrovia, we offer comprehensive programs designed to meet
                    Liberia's development needs while preparing our students to compete globally in an interconnected
                    world.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link href={`${base}/about/history`}>
                    <Button className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 font-semibold shadow-xl">
                        Learn More About Us
                      <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`${base}/about/contact`}>
                    <Button variant="outline" className="px-6 py-3 font-semibold border-2 bg-transparent">
                        Visit Campus
                      <MapPin className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/graduation/master-of-education-and-planning.jpg"
                    alt="The Unity University Liberia Campus in Monrovia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-xl font-bold mb-2">Monrovia Campus</h4>
                    <p className="text-white/90">Modern facilities in the heart of Liberia</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <LiberiaFlag className="h-5 w-8" />
                      <span className="text-sm font-medium">The Love of Liberty Brought Us Here</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Rest of the sections remain the same but with simplified animations... */}
      {/* I'll continue with the rest of the optimizations */}

      {/* Simplified Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-700 via-white to-blue-700 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>Excellence in Numbers</motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
              Our achievements demonstrate The Unity University Liberia's commitment to academic excellence and community impact.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-8 md:grid-cols-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { number: 1500, label: "Students Enrolled", sublabel: "Active Learners", icon: Users },
              { number: 85, label: "Faculty & Staff", sublabel: "Expert Educators", icon: Award },
              { number: 28, label: "Academic Programs", sublabel: "Diverse Offerings", icon: BookOpen },
              { number: 1, label: "Year of Excellence", sublabel: "Growing Strong", icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                  <AnimatedCounter end={stat.number} />
                  <span>{stat.number !== 1 ? "+" : ""}</span>
                </div>
                <div className="text-gray-800 font-bold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Simplified Programs Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700" variants={itemVariants}>
              Academic Excellence
            </motion.h2>
            <motion.h3 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900" variants={itemVariants}>
              Our <span className="text-liberian-gradient">Programs</span>
            </motion.h3>
            <motion.p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed" variants={itemVariants}>
              Discover our comprehensive programs designed to meet Liberia's development needs and prepare students for
              global success.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Business Administration",
                description: "Developing business leaders for Liberia's growing economy and regional markets.",
                image: "/courses/business-class.jpg",
                features: ["Entrepreneurship Focus", "Industry Partnerships", "Practical Training"],
                duration: "3 Years Bachelor / 2 Years Master",
              },
              {
                title: "Information Technology",
                description: "Building digital skills and technological solutions for Liberia's digital transformation.",
                image: "/courses/technology.jpg",
                features: ["Modern Curriculum", "Industry Certifications", "Innovation Labs"],
                duration: "3 Years Bachelor / 2 Years Master",
              },
              {
                title: "Public Health",
                description: "Training healthcare professionals to serve Liberian communities with excellence.",
                image: "/courses/health-sciences.jpg",
                features: ["Community Focus", "Clinical Training", "Research Opportunities"],
                duration: "3 Years Bachelor / 2 Years Master",
              },
            ].map((program, index) => (
              <motion.div key={`program-${program.title.replace(/\s+/g, '-').toLowerCase()}`} variants={itemVariants} className="group">
                <Card className="h-full overflow-hidden bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-48 w-full overflow-hidden">
                      <Image
                      src={program.image}
                        alt={`${program.title} - The Unity University Liberia`}
                        fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs">{program.duration}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-gray-900">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-gray-600 leading-relaxed mb-4">{program.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 text-sm">Key Features:</h5>
                      <div className="flex flex-wrap gap-2">
                        {program.features.map((feature) => (
                          <Badge key={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}`} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`${base}/academics`} className="w-full">
                      <Button variant="outline" className="w-full group border-2 hover:bg-gray-50 py-3 font-semibold bg-transparent">
                          Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href={`${base}/academics`}>
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 px-8 py-4 font-bold shadow-xl">
                Explore All Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Simplified Heritage Section */}
      <ParallaxSection offset={40}>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-blue-900/5" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid gap-12 md:grid-cols-2 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="relative">
                <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://diplomaticwatch.com/wp-content/uploads/2024/07/Liberia-cultural-performance.jpg"
                    alt="Liberian Heritage and Culture"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-xl font-bold mb-2">Liberian Heritage</h4>
                    <p className="text-white/90 mb-2">Celebrating our rich cultural legacy</p>
                    <div className="flex items-center space-x-2">
                      <LiberiaFlag className="h-5 w-8" />
                      <span className="text-sm font-medium">The Love of Liberty Brought Us Here</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Honoring Our Heritage,{" "}
                  <span className="text-liberian-gradient">
                    Building Our Future
                  </span>
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "Cultural Preservation",
                      description: "Celebrating and preserving Liberia's rich cultural traditions, languages, and heritage while fostering academic excellence.",
                      icon: Heart,
                    },
                    {
                      title: "Democratic Values",
                      description: "Upholding the democratic principles that make Liberia Africa's oldest republic, promoting freedom and equality in education.",
                      icon: Shield,
                    },
                    {
                      title: "Community Service",
                      description: "Fostering a spirit of service and giving back to Liberian communities through education, research, and outreach programs.",
                      icon: Users,
                    },
                  ].map((item) => (
                    <div key={`heritage-${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200">
                      <div className="mt-1 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link href={`${base}/about/history`}>
                    <Button className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 font-semibold shadow-xl">
                        Our History
                      <Heart className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`${base}/about/leadership`}>
                    <Button variant="outline" className="px-6 py-3 font-semibold border-2 bg-transparent">
                        Leadership
                      <Shield className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Simplified Contact Section */}
      <section className="bg-gradient-to-r from-red-800 to-blue-800 py-20 relative overflow-hidden">
        <FloatingParticles />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="mx-auto max-w-4xl text-center text-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
              <LiberiaFlag className="h-12 w-20" />
            </motion.div>

            <motion.h2 className="mb-6 text-3xl md:text-4xl font-bold" variants={itemVariants}>
              Ready to Shape Your Future?
            </motion.h2>
            <motion.p className="mb-8 text-lg leading-relaxed opacity-95" variants={itemVariants}>
              Join The Unity University Liberia family and become part of a community dedicated to excellence,
              innovation, and positive impact. Your journey to success starts here in Monrovia.
            </motion.p>

            <motion.div className="grid gap-6 md:grid-cols-3 mb-8" variants={containerVariants}>
              {[
                { icon: Phone, title: "Call Us", info: "+231 77 123 4567", action: "tel:+23177123456" },
                { icon: Mail, title: "Email Us", info: "liberia@tuu.university", action: "mailto:liberia@tuu.university" },
                { icon: MapPin, title: "Visit Us", info: "Monrovia, Liberia", action: `${base}/about/contact` },
              ].map((contact) => (
                <motion.a
                  key={`contact-${contact.title.replace(/\s+/g, '-').toLowerCase()}`}
                  href={contact.action}
                  variants={itemVariants}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-200"
                >
                  <contact.icon className="h-10 w-10 mb-3" />
                  <h4 className="font-bold text-lg mb-2">{contact.title}</h4>
                  <p className="opacity-90">{contact.info}</p>
                </motion.a>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 font-bold shadow-2xl">
                    Apply Now - 2025-2026 Admission
                    <GraduationCap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href={`${base}/about/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 font-bold backdrop-blur-sm bg-transparent"
                  >
                    Schedule Campus Visit
                    <MapPin className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </>
  )
}
