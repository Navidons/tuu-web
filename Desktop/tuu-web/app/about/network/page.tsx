"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Users, BookOpen, Award, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"

export default function NetworkPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const partnerships = [
    {
      name: "Oxford University",
      country: "United Kingdom",
      type: "Research Partnership",
      description:
        "Joint research initiatives in African development studies and sustainable agriculture, benefiting both the main campus and the Somaliland campus through shared resources and collaborative projects.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2020",
      programs: ["Student Exchange", "Joint Research", "Faculty Development"],
    },
    {
      name: "Harvard University",
      country: "United States",
      type: "Academic Collaboration",
      description:
        "Collaborative programs in public health and educational leadership, with specific initiatives aimed at improving healthcare access and education quality in Somaliland.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2019",
      programs: ["Online Courses", "Research Grants", "Scholarship Programs"],
    },
    {
      name: "University of Cape Town",
      country: "South Africa",
      type: "Regional Partnership",
      description:
        "Pan-African educational initiatives and student mobility programs, fostering academic exchange and research opportunities for students and faculty from Somaliland.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2018",
      programs: ["Student Exchange", "Joint Degrees", "Research Collaboration"],
    },
    {
      name: "Sorbonne University",
      country: "France",
      type: "Cultural Exchange",
      description:
        "Language programs and cultural exchange initiatives, promoting cross-cultural understanding and providing opportunities for Somaliland students to study abroad.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2021",
      programs: ["Language Studies", "Cultural Exchange", "Faculty Exchange"],
    },
    {
      name: "University of Tokyo",
      country: "Japan",
      type: "Technology Partnership",
      description:
        "Innovation in educational technology and digital learning platforms, enhancing the learning experience for students at both the main campus and the Somaliland campus.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2022",
      programs: ["Technology Transfer", "Digital Innovation", "STEM Programs"],
    },
    {
      name: "Australian National University",
      country: "Australia",
      type: "Research Collaboration",
      description:
        "Climate change research and environmental sustainability programs, addressing critical environmental challenges and providing research opportunities for students from Somaliland.",
      image: "/placeholder.svg?height=200&width=300",
      established: "2020",
      programs: ["Environmental Research", "Climate Studies", "Sustainability"],
    },
  ]

  const organizations = [
    {
      name: "African Union",
      type: "Continental Organization",
      description: "Supporting AU's education initiatives across Africa",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "UNESCO",
      type: "UN Agency",
      description: "Advancing education for sustainable development",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "World Bank",
      type: "International Finance",
      description: "Educational development and capacity building projects",
      logo: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "African Development Bank",
      type: "Regional Bank",
      description: "Financing higher education infrastructure",
      logo: "/placeholder.svg?height=100&width=100",
    },
  ]

  const alumni = [
    {
      name: "Dr. Fatima Al-Zahra",
      position: "Minister of Health, Somalia",
      year: "Class of 2015",
      achievement: "Leading healthcare reform in the Horn of Africa",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "James Koroma",
      position: "CEO, West Africa Tech Hub",
      year: "Class of 2018",
      achievement: "Pioneering fintech solutions across West Africa",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Dr. Amina Hassan",
      position: "Research Director, WHO Africa",
      year: "Class of 2016",
      achievement: "Leading public health initiatives across Africa",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Mohamed Ali",
      position: "Founder, Green Energy Solutions",
      year: "Class of 2017",
      achievement: "Renewable energy projects in 15 African countries",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Aisha Ibrahim",
      position: "Director, Somaliland Education Initiative",
      year: "Class of 2019",
      achievement: "Improving access to quality education in Somaliland",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Abdi Rahman",
      position: "CEO, Hargeisa Tech Startup",
      year: "Class of 2020",
      achievement: "Driving technological innovation in Somaliland",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

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
                Global Network
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Connected
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Worldwide
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Our global network spans continents, connecting students, faculty, and institutions in a shared mission
                of educational excellence and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Statistics */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Global Reach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building bridges across continents through education and collaboration
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, label: "Partner Universities", value: "25+", description: "Across 6 continents" },
              { icon: Users, label: "International Students", value: "1,200+", description: "From 45 countries" },
              { icon: BookOpen, label: "Exchange Programs", value: "15", description: "Active partnerships" },
              { icon: Award, label: "Joint Degrees", value: "8", description: "Collaborative programs" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partnerships */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">University Partnerships</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Collaborating with world-renowned institutions to provide exceptional educational opportunities
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={partner.image || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">{partner.type}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{partner.country}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Established: {partner.established}</div>
                    <div className="flex flex-wrap gap-2">
                      {partner.programs.map((program, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-purple-50 group-hover:border-purple-600 group-hover:text-purple-600"
                  >
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Organizations */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">International Organizations</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Partnering with global organizations to advance education and development
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {organizations.map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <Image
                    src={org.logo || "/placeholder.svg"}
                    alt={org.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{org.name}</h3>
                <p className="text-purple-300 font-medium mb-3">{org.type}</p>
                <p className="text-gray-300 text-sm">{org.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Network */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Global Alumni Network</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our graduates are making a difference across industries and continents, with a strong presence in the
                Horn of Africa.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {alumni.map((alum, index) => (
              <motion.div
                key={alum.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={alum.image || "/placeholder.svg"}
                    alt={alum.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{alum.name}</h3>
                <p className="text-purple-600 font-medium mb-2">{alum.position}</p>
                <p className="text-sm text-gray-500 mb-3">{alum.year}</p>
                <p className="text-gray-600 text-sm">{alum.achievement}</p>
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
            <h2 className="text-5xl font-bold text-white mb-8">Join Our Global Network</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Become part of a worldwide community of scholars, innovators, and leaders who are shaping the future.
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
    </div>
  )
}
