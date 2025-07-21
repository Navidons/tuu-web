"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Users, BookOpen, Award, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import EnhancedFooter from "@/components/enhanced-footer"

export default function NetworkPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const partnerships = [
    {
      name: "University of Burao",
      country: "Somaliland",
      type: "Regional Partnership",
      description:
        "University of Burao is a public university located in Burao, Somaliland. Investing in knowledge and your future!",
      image: "/patternships/university-of-burao.png",
      established: "2022",
      programs: ["Student Exchange", "Joint Research", "Community Development"],
      website: "https://uob-edu.net"
    },
    {
      name: "Victoria University Kampala",
      country: "Uganda",
      type: "Academic Collaboration",
      description:
        "Victoria University, the home to limitless opportunities, is committed to academic excellence. Located at Victoria Towers, 1-13 Jinja Road, Kampala.",
      image: "/patternships/victoria_university_uganda_logo.jpeg",
      established: "2023",
      programs: ["Faculty Development", "Research Partnerships", "International Programs"],
      website: "https://vu.ac.ug"
    },
    {
      name: "UTAMU - Uganda Technology And Management University",
      country: "Uganda",
      type: "Academic Partnership",
      description:
        "UTAMU has opportunities for every individual interested in pursuing university education at Certificate, Bachelors, Postgraduate Diploma, Masters and PhD levels.",
      image: "/patternships/utamu-uganda-technology-and-management-university-logo-png_seeklogo-550348.png",
      established: "2012",
      programs: ["Certificate", "Bachelors", "Postgraduate Diploma", "Masters", "PhD"],
      website: "https://utamu.ac.ug"
    },
    {
      name: "Kesmonds International University",
      country: "International",
      type: "Entrepreneurial Education Partnership",
      description:
        "At Kesmonds International University, we offer a diverse range of academic programs across seven specialized schools. Whether you're passionate about health, business, or technology, there's a program for you.",
      image: "/patternships/kiu-kesmonds-international-university.jpeg",
      established: "2014",
      programs: ["Health Sciences", "Business", "Technology", "Entrepreneurship"],
      website: "https://kesmonds-edu.ac"
    },
  ]

  const organizations = [
    {
      name: "African Union",
      type: "Continental Organization",
      description: "Supporting AU's education initiatives across Africa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_the_African_Union.svg",
    },
    {
      name: "UNESCO",
      type: "UN Agency",
      description: "Advancing education for sustainable development",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_UNESCO.svg",
    },
    {
      name: "World Bank",
      type: "International Finance",
      description: "Educational development and capacity building projects",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/The_World_Bank_logo.svg",
    },
    {
      name: "African Development Bank",
      type: "Regional Bank",
      description: "Financing higher education infrastructure",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_Afrikanische_Entwicklungsbank.svg",
    },
  ]

  const alumni = [
    {
      name: "Abdi Rahman",
      position: "CEO, Hargeisa Tech Startup",
      year: "Class of 2020",
      achievement: "Driving technological innovation in Somaliland",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Zahra Ahmed",
      position: "Education Program Manager, NGO",
      year: "Class of 2021",
      achievement: "Expanding access to education in East Africa",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Mohamed Yusuf",
      position: "Lead Software Engineer, Fintech Africa",
      year: "Class of 2020",
      achievement: "Developed mobile banking solutions for rural communities",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Amina Warsame",
      position: "Public Health Specialist, WHO",
      year: "Class of 2021",
      achievement: "Coordinated vaccination campaigns in the Horn of Africa",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/strips/apply-now-at-the-unity-university.jpg" alt="Apply Now at The Unity University" className="w-full h-full object-cover object-center" style={{filter:'brightness(0.7)'}} />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-emerald-700 text-white px-8 py-3 text-lg font-extrabold shadow-lg mb-8 tracking-wide uppercase">Global Network</Badge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight drop-shadow-lg">Connected Worldwide</h1>
            <div className="flex justify-center mb-4">
              <hr className="w-24 border-t-2 border-emerald-700" />
            </div>
            <p className="text-lg md:text-xl italic text-emerald-800 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-10 font-serif font-medium">
              Our global network spans continents, connecting students, faculty, and institutions in a shared mission of educational excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Global Statistics */}
      <section className="py-14 md:py-20 bg-[#faf9f7] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">Our Global Reach</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">Building bridges across continents through education and collaboration</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, label: "Partner Universities", value: "4+", description: "Across Africa", color: "emerald" },
              { icon: Users, label: "International Students", value: "400+", description: "From 15 countries", color: "emerald" },
              { icon: BookOpen, label: "Exchange Programs", value: "2", description: "Active partnerships", color: "red" },
              { icon: Award, label: "Joint Programs", value: "2", description: "Collaborative initiatives", color: "red" },
            ].map((stat) => (
              <div key={stat.label} className={`text-center p-8 rounded-xl bg-white border-2 ${stat.color === 'emerald' ? 'border-emerald-600' : 'border-red-600'} shadow-sm font-serif flex flex-col items-center`}>
                <div className={`w-12 h-12 rounded-full ${stat.color === 'emerald' ? 'bg-emerald-100 border-2 border-emerald-600' : 'bg-red-100 border-2 border-red-600'} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-7 w-7 ${stat.color === 'emerald' ? 'text-emerald-700' : 'text-red-600'}`} />
                </div>
                <div className={`text-3xl font-extrabold ${stat.color === 'emerald' ? 'text-emerald-700' : 'text-red-600'} mb-2`} style={{fontFamily:'serif', fontVariant:'small-caps'}}>{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-700 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partnerships */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">University Partnerships</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Collaborating with world-renowned institutions to provide exceptional educational opportunities
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`group bg-white rounded-xl shadow-sm border-2 ${index % 2 === 0 ? 'border-emerald-600' : 'border-red-600'} overflow-hidden`}
              >
                <div className="relative flex items-center justify-center h-48 bg-white">
                  <Image
                    src={partner.image || "/placeholder.svg"}
                    alt={`${partner.name} logo, a partner organization of The Unity University`}
                    fill
                    className="object-contain p-6"
                  />
                  {/* Removed dark overlay and gradient */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-700 text-white">{partner.type}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{partner.country}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {partner.programs.map((program, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {partner.website ? (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className={`w-full ${index % 2 === 0 ? 'border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-700' : 'border-red-600 text-red-700 hover:bg-red-50 hover:border-red-700 hover:text-red-700'}`}
                      >
                        Learn More
                        <ExternalLink className={`ml-2 h-4 w-4 ${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'}`} />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      className={`w-full ${index % 2 === 0 ? 'border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-700' : 'border-red-600 text-red-700 hover:bg-red-50 hover:border-red-700 hover:text-red-700'}`}
                    >
                      Learn More
                      <ExternalLink className={`ml-2 h-4 w-4 ${index % 2 === 0 ? 'text-emerald-700' : 'text-red-700'}`} />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Organizations */}
      <section className="py-14 md:py-20 bg-[#faf9f7] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 mb-6">International Organizations</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-serif mb-8">Partnering with global organizations to advance education and development</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {organizations.map((org) => (
              <div key={org.name} className="text-center p-8 rounded-xl bg-white border-2 border-emerald-600 shadow-sm font-serif flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-600">
                  <Image
                    src={org.logo}
                    alt={`Logo of ${org.name}, a partner organization of The Unity University`}
                    width={80}
                    height={80}
                    className="object-contain w-20 h-20 mx-auto mb-4"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{org.name}</h3>
                <p className="text-emerald-700 font-medium mb-3">{org.type}</p>
                <p className="text-gray-700 text-sm">{org.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-t border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Join Our Global Network</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Become part of a worldwide community of scholars, innovators, and leaders who are shaping the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link href="/admissions/apply">
                <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800 px-10 py-4 text-lg font-bold rounded-full flex items-center gap-2">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6 text-white" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-700 bg-white hover:bg-red-600 hover:text-white px-10 py-4 text-lg font-bold rounded-full flex items-center gap-2"
                >
                  <svg className="h-5 w-5 text-red-700 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M21 10.5l-9 5.5-9-5.5"/><path d="M17 17v5"/><path d="M17 22l2-2 2 2"/></svg>
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
