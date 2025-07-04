"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  DollarSign,
  ChevronRight,
  Star,
  Calculator,
  Award,
  FileText,
  CheckCircle,
  ArrowRight,
  Heart,
  Users,
  GraduationCap,
  Clock,
  AlertCircle,
  Download,
  Phone,
  Mail,
  MapPin,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

// Enhanced Liberian flag component
const LiberianFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}>
      <div className="h-full w-full liberian-flag-gradient"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <Star className="h-2 w-2 text-white fill-white" />
      </div>
    </div>
  )
}

// Breadcrumb component
const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/admissions" className="hover:text-blue-600 transition-colors">
        Admissions
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">Financial Aid</span>
    </nav>
  )
}

// Financial Aid Calculator Component
const FinancialAidCalculator = () => {
  const [familyIncome, setFamilyIncome] = useState([25000])
  const [householdSize, setHouseholdSize] = useState("4")
  const [gpa, setGpa] = useState([3.0])
  const [programType, setProgramType] = useState("undergraduate")
  const [estimatedAid, setEstimatedAid] = useState(0)

  useEffect(() => {
    calculateAid()
  }, [familyIncome, householdSize, gpa, programType])

  const calculateAid = () => {
    let baseAid = 0
    const income = familyIncome[0]
    const studentGpa = gpa[0]

    // Income-based aid
    if (income < 15000) baseAid += 2000
    else if (income < 25000) baseAid += 1500
    else if (income < 35000) baseAid += 1000
    else if (income < 50000) baseAid += 500

    // Merit-based aid
    if (studentGpa >= 3.8) baseAid += 1000
    else if (studentGpa >= 3.5) baseAid += 750
    else if (studentGpa >= 3.0) baseAid += 500

    // Program type adjustment
    if (programType === "graduate") baseAid += 500

    setEstimatedAid(baseAid)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-red-50 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
          <Calculator className="h-6 w-6 mr-2 text-blue-600" />
          Financial Aid Calculator
        </CardTitle>
        <p className="text-gray-600">Get an estimate of your potential financial aid package</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Annual Family Income: ${familyIncome[0].toLocaleString()}
          </Label>
          <Slider
            value={familyIncome}
            onValueChange={setFamilyIncome}
            max={100000}
            min={5000}
            step={1000}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Household Size</Label>
          <Select value={householdSize} onValueChange={setHouseholdSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 person</SelectItem>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3">3 people</SelectItem>
              <SelectItem value="4">4 people</SelectItem>
              <SelectItem value="5">5 people</SelectItem>
              <SelectItem value="6+">6+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">GPA: {gpa[0].toFixed(1)}</Label>
          <Slider value={gpa} onValueChange={setGpa} max={4.0} min={2.0} step={0.1} className="w-full" />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Program Type</Label>
          <Select value={programType} onValueChange={setProgramType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Estimated Annual Aid</h3>
          <div className="text-3xl font-bold text-blue-600">${estimatedAid.toLocaleString()}</div>
          <p className="text-sm text-gray-600 mt-2">
            This is an estimate. Actual aid may vary based on complete financial information.
          </p>
        </div>

        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Apply for Financial Aid
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default function FinancialAidPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scholarships = [
    {
      id: "presidential",
      title: "Presidential Excellence Scholarship",
      amount: "$3,000/year",
      type: "Merit-based",
      requirements: ["GPA 3.8+", "Leadership experience", "Community service"],
      renewable: true,
      deadline: "March 15, 2024",
      description: "Our most prestigious scholarship for exceptional academic achievers and leaders.",
      icon: Award,
      color: "gold",
    },
    {
      id: "liberian-heritage",
      title: "Liberian Heritage Scholarship",
      amount: "$2,000/year",
      type: "Cultural",
      requirements: ["Liberian citizenship", "GPA 3.0+", "Cultural essay"],
      renewable: true,
      deadline: "April 1, 2024",
      description: "Supporting Liberian students in pursuing higher education excellence.",
      icon: Heart,
      color: "red",
    },
    {
      id: "need-based",
      title: "Unity Need-Based Grant",
      amount: "Up to $2,500/year",
      type: "Need-based",
      requirements: ["Financial need demonstration", "FAFSA completion", "GPA 2.5+"],
      renewable: true,
      deadline: "Rolling basis",
      description: "Financial assistance for students with demonstrated economic need.",
      icon: Users,
      color: "blue",
    },
    {
      id: "stem-excellence",
      title: "STEM Excellence Award",
      amount: "$1,500/year",
      type: "Academic",
      requirements: ["STEM major", "GPA 3.5+", "Research interest"],
      renewable: true,
      deadline: "February 28, 2024",
      description: "Encouraging excellence in Science, Technology, Engineering, and Mathematics.",
      icon: Target,
      color: "green",
    },
    {
      id: "first-generation",
      title: "First-Generation College Grant",
      amount: "$1,000/year",
      type: "Special Population",
      requirements: ["First in family to attend college", "Financial need", "GPA 2.8+"],
      renewable: true,
      deadline: "May 1, 2024",
      description: "Supporting first-generation college students in their educational journey.",
      icon: GraduationCap,
      color: "purple",
    },
    {
      id: "women-leadership",
      title: "Women in Leadership Scholarship",
      amount: "$1,200/year",
      type: "Gender-specific",
      requirements: ["Female student", "Leadership potential", "GPA 3.2+"],
      renewable: true,
      deadline: "March 30, 2024",
      description: "Empowering women leaders in Liberia through education.",
      icon: TrendingUp,
      color: "pink",
    },
  ]

  const aidTypes = [
    {
      title: "Grants",
      description: "Free money that doesn't need to be repaid",
      icon: Heart,
      color: "green",
      examples: ["Federal Pell Grant", "Unity Need-Based Grant", "State Grants"],
    },
    {
      title: "Scholarships",
      description: "Merit or need-based awards for academic achievement",
      icon: Award,
      color: "gold",
      examples: ["Presidential Scholarship", "Academic Merit Awards", "Cultural Scholarships"],
    },
    {
      title: "Work-Study",
      description: "Part-time employment opportunities on campus",
      icon: Users,
      color: "blue",
      examples: ["Library Assistant", "Research Assistant", "Administrative Support"],
    },
    {
      title: "Student Loans",
      description: "Low-interest loans to help cover educational costs",
      icon: DollarSign,
      color: "orange",
      examples: ["Federal Student Loans", "Private Education Loans", "Parent PLUS Loans"],
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Complete FAFSA",
      description: "Fill out the Free Application for Federal Student Aid",
      deadline: "Priority deadline: March 1",
      icon: FileText,
    },
    {
      step: 2,
      title: "Submit Unity Application",
      description: "Complete our institutional financial aid application",
      deadline: "Same as admission application",
      icon: GraduationCap,
    },
    {
      step: 3,
      title: "Provide Documentation",
      description: "Submit tax returns, bank statements, and other required documents",
      deadline: "Within 2 weeks of application",
      icon: Shield,
    },
    {
      step: 4,
      title: "Review Award Letter",
      description: "Receive and review your financial aid package",
      deadline: "Response required within 30 days",
      icon: CheckCircle,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb />
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <LiberianFlag className="h-8 w-12" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-bold">
                Making Education Affordable
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Financial Aid</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              At Unity University Liberia, we believe that financial circumstances should never be a barrier to quality
              education. Our comprehensive financial aid program helps make your educational dreams affordable and
              accessible.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#calculator">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Calculate Your Aid
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#apply">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Apply for Aid
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: DollarSign, number: "$2.5M+", label: "Aid Distributed", sublabel: "Annual Support" },
              { icon: Users, number: "85%", label: "Students Receive Aid", sublabel: "Financial Support" },
              { icon: Award, number: "50+", label: "Scholarship Programs", sublabel: "Various Options" },
              { icon: GraduationCap, number: "$1,800", label: "Average Award", sublabel: "Per Student" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-800 font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Financial Aid Calculator */}
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Estimate Your Financial Aid</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Use our calculator to get a personalized estimate of your potential financial aid package.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <FinancialAidCalculator />
          </div>
        </div>
      </section>

      {/* Types of Financial Aid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Types of Financial Aid</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer various forms of financial assistance to help make your education affordable.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {aidTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <type.icon className={`h-12 w-12 text-${type.color}-600 mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{type.title}</h3>
                <p className="text-gray-600 text-center mb-4">{type.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Scholarships</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive scholarship opportunities designed to recognize and reward excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r from-${scholarship.color}-400 to-${scholarship.color}-600`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <scholarship.icon className={`h-8 w-8 text-${scholarship.color}-600`} />
                    <Badge variant="secondary" className="text-xs">
                      {scholarship.type}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-3">{scholarship.amount}</div>
                  <p className="text-gray-600 mb-4">{scholarship.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {scholarship.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Deadline: {scholarship.deadline}
                      </span>
                      {scholarship.renewable && (
                        <Badge variant="outline" className="text-xs">
                          Renewable
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Apply for Financial Aid</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to apply for financial aid and scholarships at Unity University Liberia.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="space-y-8">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="flex items-start space-x-6 bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <step.icon className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="flex items-center text-sm text-orange-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {step.deadline}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-bold">
                    Start Your Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-bold border-2 bg-transparent">
                  Download FAFSA Guide
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Financial Aid Office */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <LiberianFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help with Financial Aid?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our Financial Aid Office is here to help you navigate the process and find the best funding options for
              your education. Don't let finances stand in the way of your dreams.
            </p>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  info: "+231 77 123 4567",
                  action: "tel:+23177123456",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  info: "financialaid@tuu.university",
                  action: "mailto:financialaid@tuu.university",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  info: "Student Services Building",
                  action: "/about/contact",
                },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.action}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <contact.icon className="h-8 w-8 mb-3" />
                  <h4 className="font-bold text-lg mb-2">{contact.title}</h4>
                  <p className="text-white/90">{contact.info}</p>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for Financial Aid
                    <Heart className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                >
                  Schedule Appointment
                  <Clock className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
