"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Users, Award, BookOpen, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import EnhancedFooter from "@/components/enhanced-footer"

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const timelineEvents = [
    {
      year: "2021",
      title: "Foundation in Hargeisa",
      description:
        "Unity University was established in Hargeisa, Somaliland, with the motto 'What begins here, transforms Africa' and a vision to become a world-class university in leadership development.",
      image: "/placeholder.svg?height=300&width=400",
      milestone: "University Founded",
      students: 200,
    },
    {
      year: "2022",
      title: "First Academic Programs",
      description:
        "Launched comprehensive academic programs across five faculties: Business & Management, Computing & IT, Allied Health Sciences, Social Sciences, and Education.",
      image: "/placeholder.svg?height=300&width=400",
      milestone: "Programs Established",
      students: 850,
    },
    {
      year: "2023",
      title: "Research & Innovation",
      description:
        "Established research centers and began implementing innovative teaching methods, integrating theory with practice to produce graduates with relevant knowledge and skills.",
      image: "/placeholder.svg?height=300&width=400",
      milestone: "Research Centers Opened",
      students: 1800,
    },
    {
      year: "2024",
      title: "Liberia Campus Expansion",
      description:
        "Opened second campus in Monrovia, Liberia, extending Unity University's reach across West Africa and establishing a truly Pan-African educational network.",
      image: "/placeholder.svg?height=300&width=400",
      milestone: "Liberia Campus Opened",
      students: 3500,
    },
    {
      year: "2025",
      title: "Continued Growth",
      description:
        "Today, Unity University serves over 4,000 students across both campuses, offering undergraduate and graduate programs with a commitment to holistic human development and leadership.",
      image: "/placeholder.svg?height=300&width=400",
      milestone: "Present Day",
      students: 4000,
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
                Our History
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                4 Years of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Educational Excellence
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Founded in 2021 in Hargeisa, Somaliland, Unity University has quickly established itself as a leading educational institution committed to transforming African higher education.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Journey Through Time</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones that shaped Unity University into the institution it is today
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-purple-600 text-white">{event.milestone}</Badge>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-3xl font-bold text-purple-600">{event.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Students Enrolled</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{event.students.toLocaleString()}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Year Badge */}
                <div className={`w-2/12 flex justify-center ${index % 2 === 0 ? "order-last" : "order-first"}`}>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    {event.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Story */}
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
                  The Founding
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Vision
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Unity University was born from a simple yet powerful vision: to create an institution that would
                  bridge the educational gap in Africa while maintaining the highest international standards.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Founded in 2021 in Hargeisa, Somaliland, Unity University emerged with the motto "What begins here, transforms Africa" and a mission to contribute to the development of Somaliland, Africa, and the world. In 2024, we expanded to Liberia, establishing our second campus in Monrovia, creating a truly Pan-African educational network committed to excellence and leadership development.
                </p>
                                  <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="text-3xl font-bold text-purple-600 mb-2">2021</div>
                    <div className="text-gray-600">Founded</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50">
                    <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                    <div className="text-gray-600">Campuses</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="University Founding"
                  width={800}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Impact */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Our Legacy</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                19 years of transforming lives and building the future of Africa
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Graduates", value: "12,000+", description: "Alumni worldwide" },
              { icon: Globe, label: "Countries", value: "45", description: "Student representation" },
              { icon: Award, label: "Awards", value: "50+", description: "International recognition" },
              { icon: BookOpen, label: "Research", value: "500+", description: "Published papers" },
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
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-purple-300 mb-2">{stat.label}</div>
                <div className="text-gray-300">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Be Part of Our Continuing Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of students who have chosen Unity University to shape their future and contribute to
              Africa's development.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-bold"
                >
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about/leadership">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
                >
                  Meet Our Leaders
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
