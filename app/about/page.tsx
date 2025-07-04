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
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900">
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
          <div className="text-center text-white">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                About Unity University
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Transforming
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Africa's Future
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Since our founding in 2021, Unity University has rapidly established itself as a leader in African higher education, with our motto "What begins here, transforms Africa" guiding our mission across our campuses in Somaliland and Liberia.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/about/history">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-bold">
                    Our History
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/about/leadership">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Foundation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built on principles of excellence, innovation, and global citizenship
              </p>
            </motion.div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                content:
                  "To contribute to the development and sustenance of the well-being of the people of Somaliland, Africa, and the world through the provision of flexible, innovative, entrepreneurial, inclusive programs of teaching, learning, research, and service.",
                color: "from-purple-500 to-blue-600",
                bgColor: "from-purple-50 to-blue-50",
              },
              {
                icon: Eye,
                title: "Our Vision",
                content:
                  "To become a world-class University in leadership development in Africa.",
                color: "from-blue-500 to-emerald-600",
                bgColor: "from-blue-50 to-emerald-50",
              },
              {
                icon: Heart,
                title: "Our Philosophy",
                content:
                  "The Unity University believes that sustainable national and global development can be achieved through nurturing an intellectual culture that integrates theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.",
                color: "from-emerald-500 to-purple-600",
                bgColor: "from-emerald-50 to-purple-50",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.bgColor} p-8 shadow-xl border border-gray-100`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 hover:opacity-5 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
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
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">By the Numbers</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our impact across Africa and beyond, measured in lives transformed and communities empowered
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Global Presence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Two dynamic campuses, one unified mission of educational excellence
              </p>
            </motion.div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Liberia Campus */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-blue-50 p-8 shadow-xl"
            >
              <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Liberia Campus" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                    <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                      <div className="h-1/3 bg-red-600"></div>
                      <div className="h-1/3 bg-white flex items-center justify-center">
                        <Star className="h-2 w-2 text-blue-600 fill-blue-600" />
                      </div>
                      <div className="h-1/3 bg-blue-600"></div>
                    </div>
                    <span className="text-white font-bold">Liberia Campus</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Monrovia, Liberia</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our newest campus in Monrovia extends Unity University's reach across West Africa. Established in 2024, it represents our commitment to Pan-African education and rapid expansion.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1,200+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">18+</div>
                  <div className="text-sm text-gray-600">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Year</div>
                </div>
              </div>
              <Link href="/liberia">
                <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700">
                  Explore Liberia Campus
                </Button>
              </Link>
            </motion.div>

            {/* Somaliland Campus */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-red-50 p-8 shadow-xl"
            >
              <div className="relative h-64 mb-8 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Somaliland Campus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                    <div className="h-6 w-8 relative overflow-hidden rounded-sm">
                      <div className="h-1/3 bg-emerald-600"></div>
                      <div className="h-1/3 bg-white flex items-center justify-center">
                        <Star className="h-2 w-2 text-emerald-600 fill-emerald-600" />
                      </div>
                      <div className="h-1/3 bg-red-600"></div>
                    </div>
                    <span className="text-white font-bold">Somaliland Campus</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Hargeisa, Somaliland</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our flagship campus in Hargeisa represents the birthplace of Unity University. Since 2021, it has been a beacon of educational excellence in the Horn of Africa, embodying our motto "What begins here, transforms Africa."
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">2,800+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">19+</div>
                  <div className="text-sm text-gray-600">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">4</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
              <Link href="/somaliland">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700">
                  Explore Somaliland Campus
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links to Other About Pages */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Learn More About Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the people, history, and network that make Unity University exceptional
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Our History",
                description: "From humble beginnings to educational excellence",
                href: "/about/history",
                icon: "📚",
                color: "from-purple-500 to-blue-600",
              },
              {
                title: "Leadership",
                description: "Meet the visionaries guiding our mission",
                href: "/about/leadership",
                icon: "👥",
                color: "from-blue-500 to-emerald-600",
              },
              {
                title: "Global Network",
                description: "Our partnerships and international connections",
                href: "/about/network",
                icon: "🌍",
                color: "from-emerald-500 to-purple-600",
              },
              {
                title: "Contact Us",
                description: "Get in touch with our team",
                href: "/about/contact",
                icon: "📞",
                color: "from-purple-500 to-red-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Link href={item.href}>
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 p-8 cursor-pointer h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10 text-center">
                      <div className="text-6xl mb-6">{item.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      <div className="flex items-center justify-center text-purple-600 font-medium">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Join Our Community?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Become part of a global network of scholars, innovators, and leaders who are shaping the future of Africa
              and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <EnhancedFooter />
    </div>
  )
}
