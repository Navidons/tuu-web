"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Home, Utensils, Trophy, MapPin, Clock, Star, ArrowRight, Globe, Zap } from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const campusHighlights = [
  {
    title: "Cultural Diversity",
    description: "Students from 45+ countries creating a vibrant global community",
    icon: Globe,
    stat: "45+ Countries",
  },
  {
    title: "Active Organizations",
    description: "Over 150 student clubs and organizations across all campuses",
    icon: Users,
    stat: "150+ Clubs",
  },
  {
    title: "Campus Events",
    description: "300+ events annually including cultural festivals and academic conferences",
    icon: Calendar,
    stat: "300+ Events",
  },
  {
    title: "Leadership Opportunities",
    description: "Multiple pathways for student leadership and personal development",
    icon: Trophy,
    stat: "50+ Positions",
  },
]

const quickLinks = [
  {
    title: "Campus Activities",
    description: "Explore events, sports, and recreational activities",
    icon: Zap,
    href: "/student-life/activities",
    color: "bg-blue-500",
  },
  {
    title: "Student Organizations",
    description: "Join clubs and societies that match your interests",
    icon: Users,
    href: "/student-life/organizations",
    color: "bg-green-500",
  },
  {
    title: "Housing & Residence",
    description: "Find your home away from home on campus",
    icon: Home,
    href: "/student-life/housing",
    color: "bg-purple-500",
  },
  {
    title: "Dining Services",
    description: "Discover diverse culinary options across campuses",
    icon: Utensils,
    href: "/student-life/dining",
    color: "bg-orange-500",
  },
]

const upcomingEvents = [
  {
    title: "International Cultural Festival",
    date: "March 15-17, 2024",
    location: "Main Campus Quad",
    type: "Cultural",
    description: "Celebrate diversity with food, music, and performances from around the world",
  },
  {
    title: "Spring Career Fair",
    date: "March 22, 2024",
    location: "Student Center",
    type: "Career",
    description: "Connect with top employers and explore internship opportunities",
  },
  {
    title: "Research Symposium",
    date: "April 5, 2024",
    location: "Academic Hall",
    type: "Academic",
    description: "Showcase of outstanding undergraduate and graduate research projects",
  },
  {
    title: "Unity Games",
    date: "April 12-14, 2024",
    location: "Sports Complex",
    type: "Sports",
    description: "Inter-campus sports competition featuring multiple disciplines",
  },
]

const testimonials = [
  {
    name: "Amina Hassan",
    program: "Computer Science, Somalia Campus",
    quote:
      "The diversity at Unity University has broadened my perspective immensely. Working with students from different backgrounds has prepared me for the global tech industry.",
    rating: 5,
  },
  {
    name: "David Chen",
    program: "International Business, Main Campus",
    quote:
      "The leadership opportunities here are incredible. Being student body president has taught me skills I'll use throughout my career.",
    rating: 5,
  },
  {
    name: "Sarah Al-Rashid",
    program: "Environmental Science, UAE Campus",
    quote:
      "From research clubs to cultural organizations, there's something for everyone. I've found my passion for sustainability through campus activities.",
    rating: 5,
  },
]

export default function StudentLifePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Student Life at Unity University
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience a vibrant campus community where academic excellence meets cultural diversity, personal growth,
              and lifelong friendships across our global network.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Campus Life
              </Button>
              <Button size="lg" variant="outline">
                Virtual Campus Tour
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Life at Unity University</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our campuses offer a rich tapestry of experiences that foster personal growth, academic achievement, and
              global citizenship.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {campusHighlights.map((highlight, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{highlight.stat}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Student Life</h2>
            <p className="text-lg text-gray-600">
              Discover the many ways to get involved and make the most of your university experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">{link.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{link.description}</p>
                      <div className="flex items-center text-blue-600 group-hover:translate-x-2 transition-transform">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">Stay connected with the latest happenings across our campuses</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Voices</h2>
            <p className="text-lg text-gray-600">Hear from our students about their Unity University experience</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.program}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Take the first step towards an extraordinary university experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Schedule a Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
