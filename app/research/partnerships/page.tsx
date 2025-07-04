"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Globe,
  Building,
  Award,
  Handshake,
  Target,
  TrendingUp,
  MapPin,
  Calendar,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

export default function PartnershipsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const partnershipTypes = [
    {
      title: "Academic Partnerships",
      description: "Collaborations with universities and research institutions worldwide",
      icon: Building,
      count: 25,
      color: "from-blue-500 to-cyan-600",
      benefits: [
        "Student exchange programs",
        "Joint research projects",
        "Faculty collaboration",
        "Shared resources and facilities",
      ],
    },
    {
      title: "Industry Partnerships",
      description: "Strategic alliances with leading companies and organizations",
      icon: Handshake,
      count: 18,
      color: "from-green-500 to-emerald-600",
      benefits: ["Technology transfer", "Internship opportunities", "Research funding", "Real-world problem solving"],
    },
    {
      title: "Government Partnerships",
      description: "Collaborations with government agencies and policy makers",
      icon: Award,
      count: 12,
      color: "from-purple-500 to-indigo-600",
      benefits: ["Policy research", "Public service projects", "Community development", "Capacity building"],
    },
    {
      title: "NGO Partnerships",
      description: "Working with non-profit organizations for social impact",
      icon: Target,
      count: 15,
      color: "from-orange-500 to-red-600",
      benefits: ["Community outreach", "Social research", "Development projects", "Humanitarian initiatives"],
    },
  ]

  const featuredPartners = [
    {
      name: "Harvard University",
      type: "Academic",
      location: "Cambridge, USA",
      established: "2018",
      focus: "Public Health Research",
      description: "Joint research on healthcare delivery systems in developing countries",
      projects: 5,
      students: 25,
      logo: "🏛️",
      status: "Active",
      achievements: [
        "Published 12 joint research papers",
        "Trained 50+ healthcare workers",
        "Established telemedicine network",
      ],
    },
    {
      name: "World Health Organization",
      type: "International Organization",
      location: "Geneva, Switzerland",
      established: "2019",
      focus: "Global Health Initiatives",
      description: "Collaborative programs for disease prevention and health promotion",
      projects: 8,
      students: 40,
      logo: "🌍",
      status: "Active",
      achievements: [
        "Implemented vaccination programs",
        "Developed health monitoring systems",
        "Trained 200+ health professionals",
      ],
    },
    {
      name: "Microsoft Africa",
      type: "Industry",
      location: "Lagos, Nigeria",
      established: "2020",
      focus: "Digital Innovation",
      description: "Technology partnerships for educational and healthcare solutions",
      projects: 6,
      students: 35,
      logo: "💻",
      status: "Active",
      achievements: [
        "Launched AI education platform",
        "Provided cloud infrastructure",
        "Trained 300+ students in tech skills",
      ],
    },
    {
      name: "African Development Bank",
      type: "Financial Institution",
      location: "Abidjan, Côte d'Ivoire",
      established: "2017",
      focus: "Economic Development",
      description: "Research and development projects for sustainable economic growth",
      projects: 4,
      students: 20,
      logo: "🏦",
      status: "Active",
      achievements: [
        "Funded $2M in research projects",
        "Supported 50+ entrepreneurs",
        "Created economic development framework",
      ],
    },
    {
      name: "UNICEF West Africa",
      type: "NGO",
      location: "Dakar, Senegal",
      established: "2021",
      focus: "Child Development",
      description: "Programs focused on education and child welfare initiatives",
      projects: 3,
      students: 15,
      logo: "🧒",
      status: "Active",
      achievements: ["Improved literacy rates by 25%", "Established 10 community centers", "Reached 5,000+ children"],
    },
    {
      name: "University of Cape Town",
      type: "Academic",
      location: "Cape Town, South Africa",
      established: "2016",
      focus: "Sustainable Development",
      description: "Joint research on climate change and environmental sustainability",
      projects: 7,
      students: 30,
      logo: "🏔️",
      status: "Active",
      achievements: [
        "Developed climate adaptation models",
        "Published 15 research papers",
        "Trained 100+ environmental scientists",
      ],
    },
  ]

  const partnershipBenefits = [
    {
      title: "Global Research Network",
      description: "Access to international expertise and resources",
      icon: Globe,
      stats: "50+ Countries",
    },
    {
      title: "Funding Opportunities",
      description: "Joint grant applications and shared funding",
      icon: TrendingUp,
      stats: "$15M+ Secured",
    },
    {
      title: "Student Mobility",
      description: "Exchange programs and international experiences",
      icon: Users,
      stats: "500+ Students",
    },
    {
      title: "Knowledge Transfer",
      description: "Sharing of best practices and innovations",
      icon: Award,
      stats: "200+ Projects",
    },
  ]

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
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Handshake className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Partnerships
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Building bridges across continents through strategic collaborations that advance research, education, and
              global impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                Explore Partnerships
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Become a Partner
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Global Partners", value: "70+", icon: Globe },
              { label: "Countries", value: "25", icon: MapPin },
              { label: "Joint Projects", value: "150+", icon: Target },
              { label: "Student Exchanges", value: "500+", icon: Users },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Partnership Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with diverse organizations to create meaningful impact across multiple sectors
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {partnershipTypes.map((type, index) => (
              <motion.div key={type.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${type.color}`}>
                        <type.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{type.title}</CardTitle>
                        <Badge className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          {type.count} Partners
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                      {type.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                      {type.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Highlighting some of our most impactful and long-standing partnerships
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {featuredPartners.map((partner, index) => (
              <motion.div key={partner.name} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="text-4xl">{partner.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                          <Badge
                            className={
                              partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {partner.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{partner.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Since {partner.established}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-3">
                          {partner.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Focus Area: {partner.focus}</h4>
                      <p className="text-gray-600 leading-relaxed">{partner.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{partner.projects}</div>
                        <div className="text-sm text-gray-600">Joint Projects</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{partner.students}</div>
                        <div className="text-sm text-gray-600">Students Involved</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                      <div className="space-y-2">
                        {partner.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Partnership Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the mutual benefits and impact of our collaborative relationships
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {partnershipBenefits.map((benefit, index) => (
              <motion.div key={benefit.title} variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                        <benefit.icon className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 mb-3">{benefit.title}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4">{benefit.description}</CardDescription>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">{benefit.stats}</Badge>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Partner With Unity University</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our global network of partners and create lasting impact through collaborative research and
              innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about/contact">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                  Start a Partnership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/research/support">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Partnership Opportunities
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
