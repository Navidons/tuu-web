"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  FileText,
  Users,
  Award,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Mail,
  Download,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Globe,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

export default function ResearchSupportPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fundingOpportunities = [
    {
      title: "Early Career Researcher Grant",
      amount: "$25,000 - $50,000",
      duration: "1-2 years",
      deadline: "March 15, 2024",
      status: "Open",
      category: "Internal Funding",
      description: "Supporting emerging researchers in establishing their research programs",
      eligibility: [
        "PhD holders within 5 years of graduation",
        "Current faculty or research staff",
        "Novel research proposals",
        "Clear methodology and timeline",
      ],
      requirements: [
        "Research proposal (max 10 pages)",
        "Budget justification",
        "CV and publication list",
        "Two letters of recommendation",
      ],
    },
    {
      title: "Collaborative Research Initiative",
      amount: "$100,000 - $250,000",
      duration: "2-3 years",
      deadline: "June 30, 2024",
      status: "Open",
      category: "Partnership Funding",
      description: "Multi-institutional research projects addressing global challenges",
      eligibility: [
        "Partnerships with external institutions",
        "Interdisciplinary research teams",
        "Clear societal impact",
        "International collaboration preferred",
      ],
      requirements: [
        "Joint proposal from all partners",
        "Detailed budget breakdown",
        "Letters of commitment",
        "Impact assessment plan",
      ],
    },
    {
      title: "Innovation and Technology Transfer",
      amount: "$50,000 - $150,000",
      duration: "1-3 years",
      deadline: "September 1, 2024",
      status: "Open",
      category: "Innovation Funding",
      description: "Commercialization of research discoveries and technology development",
      eligibility: [
        "Proof of concept completed",
        "Commercial potential demonstrated",
        "Industry partnership preferred",
        "Intellectual property considerations",
      ],
      requirements: ["Technology description", "Market analysis", "Commercialization plan", "Financial projections"],
    },
    {
      title: "Student Research Fellowship",
      amount: "$5,000 - $15,000",
      duration: "6-12 months",
      deadline: "Rolling basis",
      status: "Open",
      category: "Student Support",
      description: "Supporting undergraduate and graduate student research projects",
      eligibility: [
        "Current enrolled students",
        "Faculty supervisor required",
        "Original research project",
        "Academic merit demonstrated",
      ],
      requirements: [
        "Research proposal (max 5 pages)",
        "Faculty endorsement letter",
        "Academic transcripts",
        "Project timeline",
      ],
    },
  ]

  const supportServices = [
    {
      title: "Grant Writing Support",
      description: "Professional assistance with proposal development and submission",
      icon: FileText,
      services: [
        "Proposal review and editing",
        "Budget development assistance",
        "Compliance checking",
        "Submission support",
      ],
      contact: "grants@tuu.university",
    },
    {
      title: "Research Ethics Review",
      description: "Institutional Review Board services for ethical research conduct",
      icon: CheckCircle,
      services: [
        "Ethics protocol review",
        "Human subjects protection",
        "Animal research oversight",
        "Compliance monitoring",
      ],
      contact: "ethics@tuu.university",
    },
    {
      title: "Technology Transfer Office",
      description: "Commercialization and intellectual property management",
      icon: Lightbulb,
      services: ["Patent application support", "Licensing negotiations", "Startup incubation", "Industry partnerships"],
      contact: "tech-transfer@tuu.university",
    },
    {
      title: "Research Data Management",
      description: "Data storage, analysis, and sharing infrastructure",
      icon: Globe,
      services: [
        "Secure data storage",
        "Statistical analysis support",
        "Data visualization tools",
        "Open data publishing",
      ],
      contact: "data@tuu.university",
    },
  ]

  const applicationProcess = [
    {
      step: 1,
      title: "Identify Opportunity",
      description: "Browse available funding opportunities and select the most suitable option",
      icon: Target,
      timeframe: "Ongoing",
    },
    {
      step: 2,
      title: "Prepare Application",
      description: "Develop your research proposal with support from our grant writing team",
      icon: FileText,
      timeframe: "2-4 weeks",
    },
    {
      step: 3,
      title: "Submit Proposal",
      description: "Submit your complete application through our online portal",
      icon: Upload,
      timeframe: "1 day",
    },
    {
      step: 4,
      title: "Review Process",
      description: "Expert panel reviews and evaluates all submitted proposals",
      icon: Users,
      timeframe: "4-6 weeks",
    },
    {
      step: 5,
      title: "Award Decision",
      description: "Notification of funding decisions and award disbursement",
      icon: Award,
      timeframe: "1-2 weeks",
    },
  ]

  const researchResources = [
    {
      title: "Research Databases",
      description: "Access to academic journals and research databases",
      icon: BookOpen,
      count: "50+ Databases",
    },
    {
      title: "Laboratory Facilities",
      description: "State-of-the-art research laboratories and equipment",
      icon: Target,
      count: "25+ Labs",
    },
    {
      title: "Computing Resources",
      description: "High-performance computing and data analysis tools",
      icon: TrendingUp,
      count: "24/7 Access",
    },
    {
      title: "Library Services",
      description: "Research support and information literacy services",
      icon: BookOpen,
      count: "Expert Staff",
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
              <DollarSign className="h-16 w-16 text-green-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Research Support
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Comprehensive funding opportunities and support services to advance your research and innovation goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                View Funding Opportunities
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Apply for Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Statistics */}
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
              { label: "Total Funding", value: "$5.8M", icon: DollarSign },
              { label: "Active Grants", value: "85", icon: FileText },
              { label: "Researchers Supported", value: "200+", icon: Users },
              { label: "Success Rate", value: "78%", icon: Award },
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

      {/* Funding Opportunities */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Funding Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of funding programs designed to support research at every stage
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {fundingOpportunities.map((opportunity, index) => (
              <motion.div key={opportunity.title} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                {opportunity.category}
                              </Badge>
                              <Badge
                                className={
                                  opportunity.status === "Open"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {opportunity.status}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{opportunity.title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">{opportunity.description}</p>
                          </div>
                        </div>

                        <Tabs defaultValue="eligibility" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                          </TabsList>

                          <TabsContent value="eligibility" className="mt-4">
                            <div className="space-y-2">
                              {opportunity.eligibility.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="requirements" className="mt-4">
                            <div className="space-y-2">
                              {opportunity.requirements.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <FileText className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-gray-900">Funding Amount</span>
                          </div>
                          <p className="text-green-700 font-bold text-lg">{opportunity.amount}</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">Duration</span>
                          </div>
                          <p className="text-blue-700 font-bold">{opportunity.duration}</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            <span className="font-semibold text-gray-900">Deadline</span>
                          </div>
                          <p className="text-orange-700 font-bold">{opportunity.deadline}</p>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Support Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services to help you succeed in your research endeavors
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {supportServices.map((service, index) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                        <service.icon className="h-8 w-8 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      {service.services.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${service.contact}`} className="hover:underline">
                        {service.contact}
                      </a>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our streamlined application process to secure funding for your research
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {applicationProcess.map((step, index) => (
              <motion.div key={step.step} variants={itemVariants}>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <Badge variant="outline">{step.timeframe}</Badge>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Research Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access world-class facilities and resources to support your research activities
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {researchResources.map((resource, index) => (
              <motion.div key={resource.title} variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                        <resource.icon className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 mb-3">{resource.title}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4">{resource.description}</CardDescription>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">{resource.count}</Badge>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Research Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Take the first step towards securing funding and support for your research project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about/contact">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                  Apply for Funding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Guidelines
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
