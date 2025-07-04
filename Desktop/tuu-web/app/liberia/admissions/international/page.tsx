"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  Globe,
  ChevronRight,
  Star,
  Plane,
  FileText,
  CheckCircle,
  ArrowRight,
  Users,
  GraduationCap,
  Clock,
  Download,
  Phone,
  Mail,
  MapPin,
  Shield,
  Heart,
  BookOpen,
  Home,
  DollarSign,
  Calendar,
  Award,
  Languages,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
      <span className="text-gray-900 font-medium">International Students</span>
    </nav>
  )
}

export default function InternationalPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const admissionRequirements = [
    {
      category: "Academic Requirements",
      icon: BookOpen,
      requirements: [
        "Completed secondary education equivalent to Liberian high school",
        "Official transcripts with English translation",
        "Minimum GPA of 2.5 (or equivalent)",
        "Standardized test scores (SAT/ACT) if available",
      ],
    },
    {
      category: "English Proficiency",
      icon: Languages,
      requirements: [
        "TOEFL iBT: Minimum score of 80",
        "IELTS Academic: Minimum score of 6.0",
        "Duolingo English Test: Minimum score of 105",
        "Cambridge English: B2 First or higher",
      ],
    },
    {
      category: "Documentation",
      icon: FileText,
      requirements: [
        "Valid passport",
        "Completed application form",
        "Personal statement/essay",
        "Two letters of recommendation",
        "Financial support documentation",
        "Health insurance proof",
      ],
    },
    {
      category: "Financial Requirements",
      icon: DollarSign,
      requirements: [
        "Bank statements showing sufficient funds",
        "Scholarship award letters (if applicable)",
        "Sponsor affidavit of support",
        "Estimated annual expenses: $8,000-$12,000",
      ],
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Submit Online Application",
      description: "Complete our international student application form",
      timeline: "3-4 months before semester start",
      icon: Globe,
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Provide all required academic and personal documents",
      timeline: "2-3 months before semester start",
      icon: FileText,
    },
    {
      step: 3,
      title: "English Proficiency Test",
      description: "Take and submit TOEFL, IELTS, or equivalent test scores",
      timeline: "2-3 months before semester start",
      icon: Languages,
    },
    {
      step: 4,
      title: "Financial Documentation",
      description: "Submit proof of financial support and resources",
      timeline: "2 months before semester start",
      icon: DollarSign,
    },
    {
      step: 5,
      title: "Admission Decision",
      description: "Receive admission decision and I-20 form (if applicable)",
      timeline: "4-6 weeks after complete application",
      icon: CheckCircle,
    },
    {
      step: 6,
      title: "Visa Application",
      description: "Apply for student visa at nearest embassy/consulate",
      timeline: "1-2 months before semester start",
      icon: Shield,
    },
  ]

  const supportServices = [
    {
      title: "Pre-Arrival Support",
      icon: Plane,
      services: [
        "Visa application guidance",
        "Travel arrangements assistance",
        "Airport pickup coordination",
        "Pre-departure orientation materials",
      ],
    },
    {
      title: "Orientation Program",
      icon: Users,
      services: [
        "Campus tour and facilities introduction",
        "Academic system overview",
        "Cultural adaptation workshops",
        "Registration and enrollment assistance",
      ],
    },
    {
      title: "Academic Support",
      icon: BookOpen,
      services: [
        "English language support programs",
        "Academic advising and counseling",
        "Tutoring and study groups",
        "Research and library orientation",
      ],
    },
    {
      title: "Living Support",
      icon: Home,
      services: [
        "Housing assistance and placement",
        "Banking and financial services setup",
        "Healthcare and insurance guidance",
        "Local transportation information",
      ],
    },
    {
      title: "Cultural Integration",
      icon: Heart,
      services: [
        "International student community events",
        "Cultural exchange programs",
        "Local community engagement opportunities",
        "Holiday and celebration activities",
      ],
    },
    {
      title: "Career Services",
      icon: Award,
      services: [
        "Career counseling and planning",
        "Internship and job placement assistance",
        "Professional development workshops",
        "Alumni networking opportunities",
      ],
    },
  ]

  const countries = [
    { name: "Nigeria", students: 45, flag: "🇳🇬" },
    { name: "Ghana", students: 38, flag: "🇬🇭" },
    { name: "Sierra Leone", students: 32, flag: "🇸🇱" },
    { name: "Guinea", students: 28, flag: "🇬🇳" },
    { name: "Ivory Coast", students: 25, flag: "🇨🇮" },
    { name: "Mali", students: 18, flag: "🇲🇱" },
    { name: "Burkina Faso", students: 15, flag: "🇧🇫" },
    { name: "Senegal", students: 12, flag: "🇸🇳" },
    { name: "United States", students: 8, flag: "🇺🇸" },
    { name: "Other Countries", students: 22, flag: "🌍" },
  ]

  const faqs = [
    {
      question: "Do I need a student visa to study at Unity University Liberia?",
      answer:
        "International students from most countries will need a student visa. We provide guidance and support throughout the visa application process, including providing necessary documentation like the I-20 form.",
    },
    {
      question: "What are the English language requirements?",
      answer:
        "We require TOEFL iBT score of 80+, IELTS Academic score of 6.0+, or equivalent. Students who don't meet these requirements can enroll in our English Language Program before beginning their degree studies.",
    },
    {
      question: "Can international students work while studying?",
      answer:
        "International students may be eligible for on-campus employment opportunities. Off-campus work requires special authorization. We provide guidance on work regulations and opportunities.",
    },
    {
      question: "What is the cost of living in Monrovia for international students?",
      answer:
        "The estimated cost of living ranges from $400-$600 per month, including accommodation, food, transportation, and personal expenses. This is significantly lower than many other international study destinations.",
    },
    {
      question: "Is housing provided for international students?",
      answer:
        "We offer on-campus housing options and assist with off-campus housing arrangements. Our International Student Services team helps with housing placement and roommate matching.",
    },
    {
      question: "Are scholarships available for international students?",
      answer:
        "Yes, we offer several scholarship opportunities for international students based on academic merit, financial need, and special talents. Early application is recommended for scholarship consideration.",
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
                Global Education Hub
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">International Students</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Welcome to Unity University Liberia! Join our diverse international community and experience world-class
              education in the heart of West Africa. We're committed to supporting your academic journey from
              application to graduation.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Start Your Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                >
                  Download Guide
                  <Download className="ml-2 h-5 w-5" />
                </Button>
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
              { icon: Globe, number: "25+", label: "Countries Represented", sublabel: "Diverse Community" },
              { icon: Users, number: "243", label: "International Students", sublabel: "Current Enrollment" },
              { icon: GraduationCap, number: "95%", label: "Graduation Rate", sublabel: "Student Success" },
              { icon: Award, number: "15+", label: "Scholarship Programs", sublabel: "Financial Support" },
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

      {/* International Community */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Global Community</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from across Africa and beyond choose Unity University Liberia for quality education and cultural
              exchange.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gray-50 rounded-xl p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-2">{country.flag}</div>
                <h3 className="font-bold text-gray-900 mb-1">{country.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">{country.students}</div>
                <div className="text-sm text-gray-600">students</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admission Requirements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review the requirements for international student admission to Unity University Liberia.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {admissionRequirements.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <category.icon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.requirements.map((requirement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section id="apply" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow our step-by-step guide to successfully apply as an international student.
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
                  className="flex items-start space-x-6 bg-gray-50 rounded-xl p-6"
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
                      <Clock className="h-4 w-4 mr-1" />
                      Timeline: {step.timeline}
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
                    Start Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-bold border-2 bg-transparent">
                  Download Checklist
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">International Student Support</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support services to ensure your success and well-being throughout your academic
              journey.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {supportServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about studying at Unity University Liberia as an international student.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact International Office */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Global Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our International Student Services team is here to guide you through every step of your journey. From
              application to graduation, we're committed to your success.
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
                  info: "international@tuu.university",
                  action: "mailto:international@tuu.university",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  info: "International Student Services",
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
                    Apply Now
                    <Globe className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                >
                  Schedule Consultation
                  <Calendar className="ml-2 h-5 w-5" />
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
