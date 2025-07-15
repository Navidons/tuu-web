"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Plane,
  GraduationCap,
  Users,
  Heart,
  FileText,
  CheckCircle,
  Phone,
  Mail,
  Download,
  ArrowRight,
  Shield,
  Home,
  Utensils,
  Car,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function InternationalStudentsPage() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [applicationStep, setApplicationStep] = useState(1)

  const internationalStats = [
    { number: 45, label: "Countries Represented", labelSo: "Wadamada la Matalo", suffix: "+" },
    { number: 1200, label: "International Students", labelSo: "Ardayda Dibadda" },
    { number: 95, label: "Visa Success Rate", labelSo: "Heerka Guusha Visa-da", suffix: "%" },
    { number: 24, label: "Support Services", labelSo: "Adeegyada Taageerada", suffix: "/7" },
  ]

  const admissionRequirements = [
    {
      category: "Academic Requirements",
      categorySo: "Shuruudaha Waxbarasho",
      requirements: [
        {
          title: "High School Diploma",
          titleSo: "Shahaadada Dugsiga Sare",
          description: "Completed secondary education equivalent to 12 years of schooling",
          required: true,
        },
        {
          title: "Academic Transcripts",
          titleSo: "Natiijada Waxbarasho",
          description: "Official transcripts from all previously attended institutions",
          required: true,
        },
        {
          title: "Minimum GPA",
          titleSo: "Ugu yaraan GPA",
          description: "2.5 GPA or equivalent for undergraduate programs",
          required: true,
        },
        {
          title: "Prerequisite Courses",
          titleSo: "Maadooyinka loo baahan yahay",
          description: "Specific subject requirements based on chosen program",
          required: false,
        },
      ],
    },
    {
      category: "English Proficiency",
      categorySo: "Awooda Luuqadda Ingiriisiga",
      requirements: [
        {
          title: "TOEFL iBT",
          titleSo: "Imtixaanka TOEFL",
          description: "Minimum score of 70 (undergraduate) or 80 (graduate)",
          required: true,
        },
        {
          title: "IELTS Academic",
          titleSo: "Imtixaanka IELTS",
          description: "Minimum overall band score of 6.0 (undergraduate) or 6.5 (graduate)",
          required: true,
        },
        {
          title: "English Waiver",
          titleSo: "Ka-dhaafka Ingiriisiga",
          description: "Available for students from English-speaking countries",
          required: false,
        },
        {
          title: "Preparatory English",
          titleSo: "Ingiriisiga Diyaarinta",
          description: "Intensive English program for students needing language support",
          required: false,
        },
      ],
    },
    {
      category: "Documentation",
      categorySo: "Dukumentiyada",
      requirements: [
        {
          title: "Valid Passport",
          titleSo: "Baasaboor Sax ah",
          description: "Passport valid for at least 2 years from entry date",
          required: true,
        },
        {
          title: "Financial Proof",
          titleSo: "Caddaynta Maaliyadeed",
          description: "Bank statements showing sufficient funds for tuition and living expenses",
          required: true,
        },
        {
          title: "Health Certificate",
          titleSo: "Shahaadada Caafimaadka",
          description: "Medical examination and vaccination records",
          required: true,
        },
        {
          title: "Character References",
          titleSo: "Tixraacyada Dabeecadda",
          description: "Letters of recommendation from teachers or employers",
          required: false,
        },
      ],
    },
  ]

  const visaProcess = [
    {
      step: 1,
      title: "Admission Acceptance",
      titleSo: "Aqbalka Gelitaanka",
      description: "Receive official acceptance letter from The Unity University",
      icon: GraduationCap,
      duration: "2-4 weeks",
    },
    {
      step: 2,
      title: "Document Preparation",
      titleSo: "Diyaarinta Dukumentiyada",
      description: "Gather all required documents for visa application",
      icon: FileText,
      duration: "1-2 weeks",
    },
    {
      step: 3,
      title: "Visa Application",
      titleSo: "Codsiga Visa-da",
      description: "Submit visa application to Somaliland embassy or consulate",
      icon: Plane,
      duration: "2-6 weeks",
    },
    {
      step: 4,
      title: "Arrival & Registration",
      titleSo: "Imaatinka & Diiwaan-gelinta",
      description: "Arrive in Somaliland and complete university registration",
      icon: CheckCircle,
      duration: "1 week",
    },
  ]

  const supportServices = [
    {
      title: "Airport Pickup Service",
      titleSo: "Adeegga Qaadista Garoonka",
      description: "Free transportation from airport to campus for new international students",
      icon: Plane,
      available: "24/7",
      cost: "Free",
    },
    {
      title: "Orientation Program",
      titleSo: "Barnaamijka Hordhaca",
      description: "Comprehensive orientation covering academics, culture, and campus life",
      icon: Users,
      available: "Start of semester",
      cost: "Included",
    },
    {
      title: "Housing Assistance",
      titleSo: "Caawimada Guriga",
      description: "Help finding suitable accommodation on or off campus",
      icon: Home,
      available: "Year-round",
      cost: "Free consultation",
    },
    {
      title: "Academic Advising",
      titleSo: "La-talinta Waxbarasho",
      description: "Personalized academic guidance and course selection support",
      icon: BookOpen,
      available: "Semester",
      cost: "Included",
    },
    {
      title: "Cultural Integration",
      titleSo: "Isku-dhafka Dhaqanka",
      description: "Programs to help international students adapt to local culture",
      icon: Heart,
      available: "Ongoing",
      cost: "Free",
    },
    {
      title: "Emergency Support",
      titleSo: "Taageerada Degdegga",
      description: "24/7 emergency assistance for international students",
      icon: Shield,
      available: "24/7",
      cost: "Free",
    },
  ]

  const livingCosts = {
    accommodation: [
      { type: "On-Campus Dormitory (Shared)", typeSo: "Qolka Campus-ka (la wadaago)", cost: 100, period: "per month" },
      { type: "On-Campus Dormitory (Private)", typeSo: "Qolka Campus-ka (gaar)", cost: 150, period: "per month" },
      { type: "Off-Campus Apartment (Shared)", typeSo: "Guriga dibadda (la wadaago)", cost: 200, period: "per month" },
      { type: "Off-Campus Apartment (Private)", typeSo: "Guriga dibadda (gaar)", cost: 350, period: "per month" },
    ],
    meals: [
      { type: "Campus Meal Plan", typeSo: "Qorshaha Cuntada Campus-ka", cost: 80, period: "per month" },
      { type: "Self-Cooking", typeSo: "Karinta Nafta", cost: 120, period: "per month" },
      { type: "Local Restaurants", typeSo: "Maqaayada Maxalliga", cost: 150, period: "per month" },
    ],
    other: [
      { type: "Transportation", typeSo: "Gaadiidka", cost: 30, period: "per month" },
      { type: "Books & Supplies", typeSo: "Buugaag & Qalabka", cost: 40, period: "per month" },
      { type: "Personal Expenses", typeSo: "Kharashka Shakhsiga", cost: 100, period: "per month" },
      { type: "Health Insurance", typeSo: "Caymiska Caafimaadka", cost: 25, period: "per month" },
    ],
  }

  const scholarships = [
    {
      name: "International Excellence Scholarship",
      nameSo: "Deeqda Fiicanta Caalamiga ah",
      amount: "Up to 50%",
      description: "Merit-based scholarship for outstanding international students",
      eligibility: "GPA 3.5+, Leadership experience, Community involvement",
    },
    {
      name: "Regional Partnership Grant",
      nameSo: "Deeqda Iskaashiga Gobolka",
      amount: "Up to 30%",
      description: "Special grants for students from East African countries",
      eligibility: "East African citizenship, Good academic standing",
    },
    {
      name: "Cultural Ambassador Award",
      nameSo: "Abaalmarinta Safiirada Dhaqanka",
      amount: "Up to 25%",
      description: "For students who promote cultural exchange and diversity",
      eligibility: "Cultural activities participation, Language skills",
    },
  ]

  const countries = [
    { name: "Ethiopia", flag: "🇪🇹", students: 180 },
    { name: "Kenya", flag: "🇰🇪", students: 150 },
    { name: "Uganda", flag: "🇺🇬", students: 120 },
    { name: "Tanzania", flag: "🇹🇿", students: 95 },
    { name: "Rwanda", flag: "🇷🇼", students: 80 },
    { name: "Djibouti", flag: "🇩🇯", students: 75 },
    { name: "Sudan", flag: "🇸🇩", students: 65 },
    { name: "South Sudan", flag: "🇸🇸", students: 45 },
    { name: "Eritrea", flag: "🇪🇷", students: 40 },
    { name: "Other Countries", flag: "🌍", students: 350 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <SomalilandNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Badge className="bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 text-lg font-bold">
                International Students
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              International <span className="text-emerald-300">Students</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Ardayda Dibadda</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Join our diverse global community at The Unity University. We welcome students from around the world to
              experience quality education in the heart of Somaliland while building lifelong connections.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                <Globe className="mr-3 h-5 w-5" />
                Start Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {internationalStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-emerald-600">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="space-y-1">
                  <div className="text-gray-800 font-bold text-sm">{stat.label}</div>
                  <div className="text-emerald-600 font-medium text-xs">{stat.labelSo}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Countries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Global{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Bulshadeenna Caalamiga ah</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from over 45 countries choose The Unity University for their higher education journey.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{country.flag}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{country.name}</h4>
                    <div className="text-2xl font-bold text-emerald-600">{country.students}</div>
                    <div className="text-sm text-gray-600">students</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Admission{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Requirements
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Shuruudaha Gelitaanka</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review the requirements for international students to ensure a smooth application process.
            </p>
          </motion.div>

          <div className="space-y-8">
            {admissionRequirements.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {category.category}
                      <span className="block text-lg text-emerald-600 font-semibold mt-1">{category.categorySo}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.requirements.map((req, reqIndex) => (
                        <div
                          key={reqIndex}
                          className={`p-4 rounded-lg border-2 ${
                            req.required ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{req.title}</h4>
                            <Badge className={req.required ? "bg-emerald-600 text-white" : "bg-gray-400 text-white"}>
                              {req.required ? "Required" : "Optional"}
                            </Badge>
                          </div>
                          <p className="text-emerald-600 font-semibold text-sm mb-2">{req.titleSo}</p>
                          <p className="text-gray-600 text-sm">{req.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Visa{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Habka Visa-da</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these steps to obtain your student visa for studying in Somaliland.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {visaProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    {index < visaProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300">
                        <ArrowRight className="absolute -top-2 right-4 h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-emerald-600 font-semibold mb-3">{step.titleSo}</p>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <Badge className="bg-blue-100 text-blue-800">{step.duration}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Student{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Support
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Taageerada Ardayda</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services to help international students succeed academically and personally.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                        <service.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{service.title}</h4>
                        <p className="text-sm text-emerald-600 font-semibold">{service.titleSo}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Available</div>
                        <div className="text-xs text-gray-600">{service.available}</div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800">{service.cost}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Living Costs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Living{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Costs</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Kharashka Noloshada</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Affordable living costs make Somaliland an attractive destination for international students.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-6 w-6 text-emerald-600 mr-3" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {livingCosts.accommodation.map((option, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{option.type}</div>
                        <div className="text-xs text-emerald-600">{option.typeSo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">${option.cost}</div>
                        <div className="text-xs text-gray-600">{option.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="h-6 w-6 text-blue-600 mr-3" />
                  Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {livingCosts.meals.map((option, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{option.type}</div>
                        <div className="text-xs text-blue-600">{option.typeSo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">${option.cost}</div>
                        <div className="text-xs text-gray-600">{option.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-6 w-6 text-purple-600 mr-3" />
                  Other Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {livingCosts.other.map((option, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{option.type}</div>
                        <div className="text-xs text-purple-600">{option.typeSo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">${option.cost}</div>
                        <div className="text-xs text-gray-600">{option.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <motion.div
            className="mt-12 bg-gradient-to-r from-emerald-100 to-red-100 p-6 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Estimated Monthly Budget</h4>
              <p className="text-emerald-600 font-semibold mb-4">Qiimeynta Miisaaniyada Bishii</p>
              <div className="text-4xl font-bold text-emerald-600 mb-2">$400 - $800</div>
              <p className="text-gray-600">Total estimated monthly living expenses for international students</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scholarships for International Students */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              International{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Scholarships
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Deeqaha Ardayda Dibadda</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Special scholarship opportunities designed specifically for international students.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{scholarship.name}</h4>
                        <p className="text-sm text-emerald-600 font-semibold">{scholarship.nameSo}</p>
                      </div>
                      <Badge className="bg-emerald-600 text-white text-lg px-3 py-1">{scholarship.amount}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{scholarship.description}</p>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Eligibility:</h5>
                        <p className="text-sm text-gray-600">{scholarship.eligibility}</p>
                      </div>
                      <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-red-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Global Community?</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">
              Diyaar u tahay inaad ku biirto bulshadeenna caalamiga ah?
            </h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Our international student services team is here to guide you through every step of your journey to Unity
              University.
            </p>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <Phone className="h-8 w-8 text-emerald-300" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-emerald-200">+252 63 4210013</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <Mail className="h-8 w-8 text-emerald-300" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Email Us</h4>
                  <p className="text-emerald-200">international@tuu.university</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <Globe className="h-8 w-8 text-emerald-300" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Visit Us</h4>
                  <p className="text-emerald-200">Hargeisa, Somaliland</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                Start Your Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
