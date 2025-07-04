"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    campus: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const campusInfo = [
    {
      name: "Somaliland Campus",
      address: "Jigjiga Yar Street near Masjid Jabir, Hargeisa, Somaliland",
      phone: "+252 634 210013",
      email: "theunityuniversity@gmail.com",
      hours: "Sunday - Thursday: 8:00 AM - 6:00 PM (GMT+3)",
      image: "/placeholder.svg?height=300&width=400",
      flag: "🏴",
    },
    {
      name: "Liberia Campus",
      address: "Unity University Drive, Monrovia, Montserrado County, Liberia",
      phone: "+231 777 123 456",
      email: "liberia@tuu.university",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM",
      image: "/placeholder.svg?height=300&width=400",
      flag: "🇱🇷",
    },
  ]

  const departments = [
    {
      name: "Admissions Office",
      email: "theunityuniversity@gmail.com",
      phone: "+252 634 210013",
      description: "Application process, requirements, and enrollment",
    },
    {
      name: "Student Affairs",
      email: "students@tuu.university",
      phone: "+252 637 235142",
      description: "Student support, housing, and campus life",
    },
    {
      name: "Academic Affairs",
      email: "academics@tuu.university",
      phone: "+252 637 235143",
      description: "Curriculum, programs, and academic policies",
    },
    {
      name: "International Office",
      email: "info@tuu.university",
      phone: "+252 634 679325",
      description: "Exchange programs and international partnerships",
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
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">Contact Us</Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Get in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Touch
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                We're here to help you on your educational journey. Reach out to us with any questions or to learn more
                about Unity University.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="campus" className="text-gray-700 font-medium">
                        Campus of Interest
                      </Label>
                      <select
                        id="campus"
                        name="campus"
                        value={formData.campus}
                        onChange={handleInputChange}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value="">Select a campus</option>
                        <option value="liberia">Liberia Campus</option>
                        <option value="somaliland">Somaliland Campus</option>
                        <option value="both">Both Campuses</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-gray-700 font-medium">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="What is this about?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2"
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3 text-lg font-bold"
                  >
                    Send Message
                    <Send className="ml-3 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you with any questions about Unity University. Choose the best way to reach us
                  below.
                </p>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">General Inquiries</div>
                      <div className="text-gray-600">theunityuniversity@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Main Office</div>
                      <div className="text-gray-600">+252 634 210013</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Office Hours</div>
                      <div className="text-gray-600">Mon-Fri: 8:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Department Contacts</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={dept.name} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="font-semibold text-gray-900">{dept.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{dept.description}</div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-purple-600">{dept.email}</span>
                        <span className="text-blue-600">{dept.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Campus Locations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit us at either of our beautiful campuses across Africa
              </p>
            </motion.div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {campusInfo.map((campus, index) => (
              <motion.div
                key={campus.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="relative h-64">
                  <Image src={campus.image || "/placeholder.svg"} alt={campus.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{campus.flag}</span>
                      <h3 className="text-2xl font-bold text-white">{campus.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Address</div>
                        <div className="text-gray-600">{campus.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Phone</div>
                        <div className="text-gray-600">{campus.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Email</div>
                        <div className="text-gray-600">{campus.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Office Hours</div>
                        <div className="text-gray-600">{campus.hours}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                      Get Directions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about Unity University
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "How do I apply to Unity University?",
                  answer:
                    "You can apply online through our admissions portal. Visit our Admissions page for detailed requirements and deadlines.",
                },
                {
                  question: "What are the tuition fees?",
                  answer:
                    "Tuition varies by program and campus. Please contact our Admissions Office for current fee structures and financial aid options.",
                },
                {
                  question: "Do you offer scholarships?",
                  answer:
                    "Yes, we offer various merit-based and need-based scholarships. Check our Financial Aid section for more information.",
                },
                {
                  question: "Can international students apply?",
                  answer:
                    "We welcome students from around the world. Our International Office can help with visa and accommodation arrangements.",
                },
                {
                  question: "What languages are courses taught in?",
                  answer:
                    "Courses are primarily taught in English, with some programs offering instruction in French and Arabic.",
                },
                {
                  question: "Is housing available on campus?",
                  answer:
                    "Yes, both campuses offer modern dormitory facilities. Housing applications are processed through Student Services.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Take the first step towards your future at Unity University. We're here to support you every step of the
              way.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admissions/apply">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/academics">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                >
                  Explore Programs
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
