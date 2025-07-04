"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Linkedin, Award, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"

export default function LeadershipPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const leadership = [
    {
      name: "Dr. Amara Konneh",
      title: "Chancellor & Founder",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Dr. Konneh is a visionary educator with over 30 years of experience in higher education. She founded Unity University with the mission to provide world-class education across Africa.",
      education: "PhD in Educational Leadership, Harvard University",
      achievements: [
        "Founded Unity University in 2005",
        "Former Minister of Education, Liberia",
        "Author of 'Education for African Development'",
        "Recipient of UNESCO Education Prize 2020",
      ],
      quote: "Education is the most powerful weapon we can use to change Africa and the world.",
    },
    {
      name: "Prof. Ahmed Hassan",
      title: "Vice-Chancellor, Somaliland Campus",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Prof. Hassan leads our Somaliland operations with expertise in international development and cross-cultural education. He has been instrumental in expanding our reach across the Horn of Africa.",
      education: "PhD in International Development, Oxford University",
      achievements: [
        "Established Somaliland Campus in 2008",
        "Former UN Education Advisor for Horn of Africa",
        "Published 50+ research papers on African development",
        "Expert in sustainable development and cross-cultural education",
        "Pioneer in educational innovation in Somaliland",
      ],
      quote:
        "Unity in diversity is our strength, and education is our bridge to a prosperous future for all of Africa.",
    },
    {
      name: "Dr. Sarah Johnson",
      title: "Vice-Chancellor, Liberia Campus",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Dr. Johnson brings extensive experience in academic administration and curriculum development. She has led the transformation of our Liberia campus into a center of excellence.",
      education: "PhD in Curriculum and Instruction, Stanford University",
      achievements: [
        "20+ years in academic leadership",
        "Pioneered online learning initiatives",
        "Champion of women in STEM",
        "International education consultant",
      ],
      quote: "Every student has the potential to change the world; our job is to unlock that potential.",
    },
    {
      name: "Dr. Michael Osei",
      title: "Provost & Chief Academic Officer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Dr. Osei oversees all academic programs across both campuses, ensuring the highest standards of education and research excellence.",
      education: "PhD in Higher Education Administration, Cambridge University",
      achievements: [
        "Developed 25+ academic programs",
        "Former Dean at University of Ghana",
        "Expert in quality assurance",
        "Published author on African education",
      ],
      quote: "Academic excellence is not a destination but a continuous journey of improvement.",
    },
  ]

  const boardMembers = [
    {
      name: "Hon. Ellen Johnson Sirleaf",
      title: "Board Chair",
      description: "Former President of Liberia, Nobel Peace Prize Laureate",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Akinwumi Adesina",
      title: "Board Member",
      description: "President, African Development Bank",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Prof. Wangari Maathai",
      title: "Board Member",
      description: "Environmental Activist, Nobel Peace Prize Laureate",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Mo Ibrahim",
      title: "Board Member",
      description: "Founder, Mo Ibrahim Foundation",
      image: "/placeholder.svg?height=300&width=300",
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
                Our Leadership
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Visionary
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Leaders
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Meet the exceptional individuals who guide Unity University's mission to transform education across
                Africa and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Executive Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The visionary leaders who shape our academic excellence and global impact
              </p>
            </motion.div>
          </div>

          <div className="space-y-16">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid gap-12 lg:grid-cols-2 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={500}
                      height={600}
                      className="relative rounded-3xl shadow-2xl"
                    />
                  </motion.div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-xl text-purple-600 font-semibold mb-4">{leader.title}</p>
                      <p className="text-gray-600 leading-relaxed mb-6">{leader.bio}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Education</h4>
                      <p className="text-gray-700">{leader.education}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Key Achievements</h4>
                      <ul className="space-y-2">
                        {leader.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <Award className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <blockquote className="border-l-4 border-purple-600 pl-6 italic text-gray-700 text-lg">
                      "{leader.quote}"
                    </blockquote>

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Board of Directors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Distinguished leaders from across Africa and the world who provide strategic guidance
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">Our Leadership Philosophy</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide our approach to education and institutional excellence
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Collaborative Leadership",
                description:
                  "We believe in shared governance and collective decision-making that involves all stakeholders in our educational community.",
              },
              {
                icon: BookOpen,
                title: "Academic Excellence",
                description:
                  "Our leaders are committed to maintaining the highest standards of education while fostering innovation and critical thinking.",
              },
              {
                icon: Award,
                title: "Ethical Integrity",
                description:
                  "We lead by example, demonstrating transparency, accountability, and ethical behavior in all our institutional practices.",
              },
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <principle.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{principle.title}</h3>
                <p className="text-gray-300 leading-relaxed">{principle.description}</p>
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
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Join Our Leadership Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Be part of an institution led by visionaries who are committed to transforming education and empowering
              the next generation of African leaders.
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
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-bold"
                >
                  Contact Leadership
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
