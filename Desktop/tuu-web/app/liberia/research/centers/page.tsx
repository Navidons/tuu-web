"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Microscope,
  Cpu,
  Heart,
  Leaf,
  Building,
  Users,
  BookOpen,
  Award,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp,
  Lightbulb,
  Globe,
  Database,
} from "lucide-react"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ResearchCentersPage() {
  const researchCenters = [
    {
      name: "Center for Health Innovation",
      description: "Advancing healthcare solutions through interdisciplinary research and community partnerships.",
      focus: ["Public Health", "Medical Technology", "Health Policy", "Community Health"],
      director: "Dr. Sarah Johnson",
      established: "2018",
      funding: "$2.5M",
      projects: 15,
      publications: 45,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      name: "Technology & Innovation Hub",
      description: "Driving technological advancement and digital transformation in West Africa.",
      focus: ["Artificial Intelligence", "Software Development", "Cybersecurity", "Digital Infrastructure"],
      director: "Dr. Michael Chen",
      established: "2019",
      funding: "$3.2M",
      projects: 22,
      publications: 38,
      icon: Cpu,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Sustainable Development Research Center",
      description: "Promoting environmental sustainability and economic development in Liberia.",
      focus: ["Environmental Science", "Renewable Energy", "Climate Change", "Sustainable Agriculture"],
      director: "Dr. Fatima Al-Rashid",
      established: "2017",
      funding: "$1.8M",
      projects: 18,
      publications: 52,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      name: "Business & Economic Research Institute",
      description: "Analyzing economic trends and developing business solutions for emerging markets.",
      focus: ["Market Analysis", "Economic Policy", "Entrepreneurship", "Financial Systems"],
      director: "Dr. James Williams",
      established: "2020",
      funding: "$2.1M",
      projects: 12,
      publications: 28,
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      name: "Social Sciences Research Lab",
      description: "Understanding social dynamics and cultural patterns in West African societies.",
      focus: ["Sociology", "Anthropology", "Political Science", "Cultural Studies"],
      director: "Dr. Amina Kone",
      established: "2019",
      funding: "$1.4M",
      projects: 10,
      publications: 35,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      name: "Educational Research Center",
      description: "Improving educational outcomes through evidence-based research and innovation.",
      focus: ["Pedagogy", "Educational Technology", "Curriculum Development", "Learning Analytics"],
      director: "Dr. Rebecca Thompson",
      established: "2018",
      funding: "$1.6M",
      projects: 14,
      publications: 41,
      icon: BookOpen,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ]

  const facilities = [
    {
      name: "Advanced Computing Laboratory",
      description: "High-performance computing cluster for data analysis and modeling",
      equipment: ["GPU Cluster", "Cloud Computing Access", "Data Storage Systems"],
      capacity: "50 researchers",
    },
    {
      name: "Biotechnology Laboratory",
      description: "State-of-the-art facility for biological and medical research",
      equipment: ["PCR Machines", "Microscopy Suite", "Cell Culture Facilities"],
      capacity: "25 researchers",
    },
    {
      name: "Environmental Testing Center",
      description: "Comprehensive environmental analysis and monitoring capabilities",
      equipment: ["Spectrometers", "Water Quality Analyzers", "Air Quality Monitors"],
      capacity: "30 researchers",
    },
    {
      name: "Innovation Makerspace",
      description: "Collaborative space for prototyping and product development",
      equipment: ["3D Printers", "Electronics Lab", "Workshop Tools"],
      capacity: "40 researchers",
    },
  ]

  const achievements = [
    {
      title: "International Recognition",
      description: "Unity University research centers ranked among top 100 in Africa",
      year: "2023",
      icon: Award,
    },
    {
      title: "Patent Portfolio",
      description: "15 patents filed in technology and healthcare innovations",
      year: "2023",
      icon: Lightbulb,
    },
    {
      title: "Global Partnerships",
      description: "Collaborations with 25+ international research institutions",
      year: "2023",
      icon: Globe,
    },
    {
      title: "Research Database",
      description: "Over 500 research publications in peer-reviewed journals",
      year: "2023",
      icon: Database,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Research Centers</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover our world-class research facilities and centers of excellence, driving innovation and advancing
              knowledge across multiple disciplines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Microscope className="w-4 h-4 mr-2" />6 Research Centers
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                200+ Researchers
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                $12M+ in Funding
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Centers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Our Research Centers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each center represents a hub of innovation and discovery, addressing critical challenges and opportunities
              in their respective fields
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {researchCenters.map((center, index) => {
              const Icon = center.icon
              return (
                <motion.div
                  key={center.name}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${center.borderColor} border-2 hover:shadow-lg transition-shadow`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 ${center.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-8 h-8 ${center.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{center.name}</CardTitle>
                          <CardDescription className="text-base">{center.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Research Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {center.focus.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{center.projects}</div>
                          <div className="text-sm text-gray-600">Active Projects</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{center.publications}</div>
                          <div className="text-sm text-gray-600">Publications</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Director:</span>
                          <span className="font-medium">{center.director}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Established:</span>
                          <span className="font-medium">{center.established}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Funding:</span>
                          <span className="font-medium text-green-600">{center.funding}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          Learn More
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Research Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Research Facilities
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities equipped with cutting-edge technology to support groundbreaking research
              across all disciplines
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                    <CardDescription>{facility.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Equipment</h4>
                      <ul className="space-y-1">
                        {facility.equipment.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">Capacity:</span>
                      <Badge variant="secondary">{facility.capacity}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Achievements & Recognition
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our research centers have gained international recognition for their contributions to science, technology,
              and society
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.title}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge variant="outline" className="mx-auto">
                        {achievement.year}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact & Collaboration */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Collaborate with Us
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interested in partnering with our research centers? We welcome collaborations with academic institutions,
              industry partners, and government agencies.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Office</h3>
              <p className="text-gray-600 mb-2">Speak with our research coordinators</p>
              <p className="text-blue-600 font-medium">+231-77-123-4567</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Email</h3>
              <p className="text-gray-600 mb-2">Get detailed information via email</p>
              <p className="text-green-600 font-medium">research@unity.edu.lr</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Our Centers</h3>
              <p className="text-gray-600 mb-2">Schedule a facility tour</p>
              <p className="text-purple-600 font-medium">Monrovia Campus</p>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Button size="lg" className="px-8">
              Schedule a Visit
            </Button>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
