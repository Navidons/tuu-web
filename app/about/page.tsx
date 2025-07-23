"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Users, Globe, Award, BookOpen, Heart, Target, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import EnhancedFooter from "@/components/enhanced-footer"

// Animated counter component
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

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white border-b border-gray-200">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Badge className="bg-gray-900 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                About The Unity University
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight text-gray-900">
                Transforming
                <span className="block text-gray-700">
                  Africa's Future
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
                Since our founding in 2020, The Unity University has rapidly established itself as a leader in African higher education, with our motto "What begins here, transforms Africa" guiding our mission across our campuses in Somaliland and Liberia.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link href="/about/history">
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 px-8 py-4 text-lg font-bold text-white">
                    Our History
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/about/leadership">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-900 text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
                  >
                    Meet Our Leaders
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Foundation</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Built on principles of excellence, innovation, and global citizenship
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                content:
                  "To contribute to the development and sustenance of the well-being of the people of Somaliland, Africa, and the world through the provision of flexible, innovative, entrepreneurial, inclusive programs of teaching, learning, research, and service.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                content:
                  "To become a world-class University in leadership development in Africa.",
              },
              {
                icon: Heart,
                title: "Our Philosophy",
                content:
                  "The Unity University believes that sustainable national and global development can be achieved through nurturing an intellectual culture that integrates theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white p-8 shadow border border-gray-200"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6 shadow">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Statistics */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">By the Numbers</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our impact across Africa and beyond, measured in lives transformed and communities empowered
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Students Enrolled", value: 4000, suffix: "+", icon: Users },
              { label: "Countries Represented", value: 25, suffix: "", icon: Globe },
              { label: "Academic Programs", value: 37, suffix: "+", icon: BookOpen },
              { label: "Years of Excellence", value: 4, suffix: "", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-200"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-gray-900" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-wide uppercase border-b-4 border-gray-900 inline-block pb-2">Our Global Campuses</h2>
            <div className="text-xs text-gray-500 mt-1 mb-2 font-semibold">Excellence in Education Across Africa</div>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mt-4 italic">
              Excellence in education across two dynamic locations, each with its unique culture and opportunities.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Liberia Campus Card */}
            <div className="block border-2 border-gray-200 bg-white shadow-sm p-0">
              <Link href="/liberia" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 w-full border-b-2 border-gray-900 bg-gray-50">
                  <Image
                    src="/graduation/master-of-education.jpg"
                    alt="Graduates at The Unity University Liberia campus in Monrovia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2 shadow-sm rounded-md bg-opacity-90">
                    {/* Liberia Flag */}
                    <span className="text-lg">🇱🇷</span>
                    <span className="text-gray-900 font-bold text-sm">Liberia</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 rounded-md px-4 py-2 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-gray-900 inline-block">Liberia Campus</h3>
                    <p className="text-gray-700">Monrovia, Montserrado County</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">The Love of Liberty Brought Us Here</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Our newest campus expansion in Monrovia combines Liberian heritage with global academic excellence. We are rapidly growing and expanding our presence in West Africa.
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-md font-serif text-base rounded-full py-4 px-8 mt-2 transition-all duration-200 text-lg font-bold tracking-wide"
                    onClick={e => { e.preventDefault(); window.open('/liberia', '_blank'); }}
                  >
                    Visit Liberia Campus
                    <span className="ml-2">↗</span>
                  </Button>
                </div>
              </Link>
            </div>

            {/* Somaliland Campus Card */}
            <div className="block border-2 border-gray-200 bg-white shadow-sm p-0">
              <Link href="/somaliland" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-64 w-full border-b-2 border-gray-900 bg-gray-50">
                  <Image
                    src="/hero-section/hero.png"
                    alt="The Unity University Somaliland campus in Hargeisa"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center space-x-3 bg-white border border-gray-200 px-4 py-2 shadow-sm rounded-md bg-opacity-90">
                    {/* Somaliland Flag */}
                    <span className="text-lg">🇸🇴</span>
                    <span className="text-gray-900 font-bold text-sm">Somaliland</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 rounded-md px-4 py-2 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-gray-900 inline-block">Somaliland Campus</h3>
                    <p className="text-gray-700">Hargeisa, Somaliland</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">What begins here, transforms Africa</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Founded in 2020. Our rapidly growing campus embodies the spirit of Somaliland – innovation, resilience, and academic excellence.
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-md font-serif text-base rounded-full py-4 px-8 mt-2 transition-all duration-200 text-lg font-bold tracking-wide"
                    onClick={e => { e.preventDefault(); window.open('/somaliland', '_blank'); }}
                  >
                    Visit Somaliland Campus
                    <span className="ml-2">↗</span>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links to Other About Pages */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-wide uppercase border-b-2 border-gray-900 inline-block pb-2 font-serif" style={{letterSpacing:'0.1em'}}>Learn More About Us</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto italic mt-2 mb-4 font-serif">Discover the people, history, and network that make The Unity University exceptional</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-transparent">
            {[
              {
                title: "Our History",
                description: "From humble beginnings to educational excellence.",
                href: "/about/history",
              },
              {
                title: "Leadership",
                description: "Meet the visionaries guiding our mission.",
                href: "/about/leadership",
              },
              {
                title: "Global Network",
                description: "Our partnerships and international connections.",
                href: "/about/network",
              },
              {
                title: "Contact Us",
                description: "Get in touch with our team.",
                href: "/about/contact",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col h-full p-8 bg-white border border-gray-200 rounded-xl shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md items-center text-center"
                style={{ fontFamily: 'Merriweather, serif', minHeight: '220px' }}
              >
                <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 mt-2">{item.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-6 font-serif flex-1">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <Link href={item.href} legacyBehavior>
                    <a className="text-gray-900 underline underline-offset-2 hover:text-gray-700 font-serif text-base tracking-wide transition-colors duration-200">Learn More &rarr;</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200 font-serif">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            {/* Full-width strip image above CTA */}
            <div className="w-full mb-8">
              <img
                src="/strips/apply-now-at-the-unity-university.jpg"
                alt="Apply Now at The Unity University"
                className="w-full h-40 md:h-56 object-cover object-center rounded-md shadow border border-gray-200"
                style={{ maxHeight: '220px' }}
              />
            </div>
            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-xl shadow-md px-8 py-10 flex flex-col items-center newspaper-cta">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-widest uppercase border-b-4 border-gray-300 inline-block pb-2 font-serif" style={{letterSpacing:'0.08em'}}>Ready to Join Our Community?</h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8 font-serif italic">
                Become part of a global network of scholars, innovators, and leaders who are shaping the future of Africa and beyond.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full">
                <Link href="/admissions/apply" legacyBehavior>
                  <a className="block w-full sm:w-auto border border-gray-900 text-gray-900 font-serif font-bold px-8 py-4 text-lg rounded-full transition-all duration-200 hover:underline hover:border-gray-700 bg-white shadow-sm text-center" target="_blank" rel="noopener noreferrer">
                    Apply Now &rarr;
                  </a>
                </Link>
                <Link href="/about/contact" legacyBehavior>
                  <a className="block w-full sm:w-auto border border-gray-900 text-gray-900 font-serif font-bold px-8 py-4 text-lg rounded-full transition-all duration-200 hover:underline hover:border-gray-700 bg-white shadow-sm text-center">
                    Contact Us
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EnhancedFooter />
    </div>
  )
}
