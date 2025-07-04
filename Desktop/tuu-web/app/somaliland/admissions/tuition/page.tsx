"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  Calculator,
  CreditCard,
  Calendar,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Download,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function TuitionPage() {
  const [selectedProgram, setSelectedProgram] = useState("undergraduate")
  const [calculatorData, setCalculatorData] = useState({
    program: "",
    duration: "",
    housing: "",
    mealPlan: "",
  })

  const tuitionRates = {
    undergraduate: {
      title: "Undergraduate Programs",
      titleSo: "Barnaamijyada Koowaad",
      programs: [
        {
          name: "Business Administration",
          nameSo: "Maamulka Ganacsiga",
          tuition: 2500,
          fees: 300,
          total: 2800,
          duration: "4 years",
        },
        {
          name: "Information Technology",
          nameSo: "Tignoolajiyada Macluumaadka",
          tuition: 2800,
          fees: 350,
          total: 3150,
          duration: "4 years",
        },
        {
          name: "Public Health",
          nameSo: "Caafimaadka Dadweynaha",
          tuition: 3000,
          fees: 400,
          total: 3400,
          duration: "4 years",
        },
        {
          name: "Civil Engineering",
          nameSo: "Injineerinta Dhismaha",
          tuition: 3200,
          fees: 450,
          total: 3650,
          duration: "4 years",
        },
        {
          name: "Education",
          nameSo: "Waxbarashada",
          tuition: 2200,
          fees: 250,
          total: 2450,
          duration: "4 years",
        },
        {
          name: "Agriculture & Environment",
          nameSo: "Beeraha & Deegaanka",
          tuition: 2600,
          fees: 300,
          total: 2900,
          duration: "4 years",
        },
      ],
    },
    graduate: {
      title: "Graduate Programs",
      titleSo: "Barnaamijyada Sare",
      programs: [
        {
          name: "Master of Business Administration (MBA)",
          nameSo: "Shahaadada Sare ee Maamulka Ganacsiga",
          tuition: 4500,
          fees: 500,
          total: 5000,
          duration: "2 years",
        },
        {
          name: "Master of Public Health (MPH)",
          nameSo: "Shahaadada Sare ee Caafimaadka Dadweynaha",
          tuition: 4200,
          fees: 450,
          total: 4650,
          duration: "2 years",
        },
        {
          name: "Master of Education (M.Ed)",
          nameSo: "Shahaadada Sare ee Waxbarashada",
          tuition: 3800,
          fees: 400,
          total: 4200,
          duration: "2 years",
        },
        {
          name: "Master of Engineering Management",
          nameSo: "Shahaadada Sare ee Maamulka Injineerinta",
          tuition: 4800,
          fees: 550,
          total: 5350,
          duration: "2 years",
        },
      ],
    },
    professional: {
      title: "Professional Certificates",
      titleSo: "Shahaadooyinka Xirfadeed",
      programs: [
        {
          name: "Digital Marketing Certificate",
          nameSo: "Shahaadada Suuq-geynta Dijital-ka",
          tuition: 800,
          fees: 50,
          total: 850,
          duration: "6 months",
        },
        {
          name: "Project Management Professional",
          nameSo: "Maamulka Mashaariicda Xirfadeed",
          tuition: 1200,
          fees: 75,
          total: 1275,
          duration: "4 months",
        },
        {
          name: "Cybersecurity Fundamentals",
          nameSo: "Aasaaska Amniga Cyber-ka",
          tuition: 1100,
          fees: 70,
          total: 1170,
          duration: "5 months",
        },
        {
          name: "Financial Management Certificate",
          nameSo: "Shahaadada Maamulka Maaliyadeed",
          tuition: 1500,
          fees: 100,
          total: 1600,
          duration: "8 months",
        },
      ],
    },
  }

  const additionalCosts = {
    housing: [
      { type: "Shared Dormitory", typeSo: "Qolka la Wadaago", cost: 1200, period: "per year" },
      { type: "Private Dormitory", typeSo: "Qolka Gaarka ah", cost: 1800, period: "per year" },
      { type: "Off-Campus Apartment", typeSo: "Guriga Dibadda", cost: 2400, period: "per year" },
    ],
    meals: [
      { type: "Basic Meal Plan", typeSo: "Qorshaha Cuntada Aasaasiga ah", cost: 800, period: "per year" },
      { type: "Standard Meal Plan", typeSo: "Qorshaha Cuntada Caadiga ah", cost: 1200, period: "per year" },
      { type: "Premium Meal Plan", typeSo: "Qorshaha Cuntada Heerka Sare", cost: 1600, period: "per year" },
    ],
    other: [
      { type: "Books & Supplies", typeSo: "Buugaag & Qalabka", cost: 400, period: "per year" },
      { type: "Transportation", typeSo: "Gaadiidka", cost: 300, period: "per year" },
      { type: "Personal Expenses", typeSo: "Kharashka Shakhsiga", cost: 600, period: "per year" },
      { type: "Health Insurance", typeSo: "Caymiska Caafimaadka", cost: 200, period: "per year" },
    ],
  }

  const paymentOptions = [
    {
      title: "Full Payment",
      titleSo: "Bixinta Buuxa",
      description: "Pay the full amount at the beginning of the academic year",
      descriptionSo: "Lacagta oo dhan bixi bilowga sanadka waxbarasho",
      discount: "5% discount",
      icon: CreditCard,
    },
    {
      title: "Semester Payment",
      titleSo: "Bixinta Semester-ka",
      description: "Pay per semester (2 payments per year)",
      descriptionSo: "Semester kasta bixi (2 jeer sanadkii)",
      discount: "2% discount",
      icon: Calendar,
    },
    {
      title: "Monthly Payment",
      titleSo: "Bixinta Bishii",
      description: "Pay monthly installments (10 payments per year)",
      descriptionSo: "Bil walba bixi (10 jeer sanadkii)",
      discount: "No discount",
      icon: DollarSign,
    },
  ]

  const scholarships = [
    {
      name: "Academic Excellence Scholarship",
      nameSo: "Deeqda Fiicanta Waxbarasho",
      amount: "Up to 50%",
      criteria: "GPA 3.5+ and outstanding academic performance",
      criteriaSo: "GPA 3.5+ iyo waxqabad waxbarasho oo heer sare ah",
    },
    {
      name: "Need-Based Financial Aid",
      nameSo: "Caawimada Maaliyadeed ee Baahida ku salaysan",
      amount: "Up to 75%",
      criteria: "Demonstrated financial need and good academic standing",
      criteriaSo: "Baahi maaliyadeed la muujiyay iyo heer waxbarasho oo wanaagsan",
    },
    {
      name: "Community Leadership Award",
      nameSo: "Abaalmarinta Hogaaminta Bulshada",
      amount: "Up to 30%",
      criteria: "Active community involvement and leadership experience",
      criteriaSo: "Ka-qaybgal firfircoon bulshada iyo khibrad hoggaamin",
    },
    {
      name: "International Student Grant",
      nameSo: "Deeqda Ardayda Dibadda",
      amount: "Up to 25%",
      criteria: "International students with good academic records",
      criteriaSo: "Ardayda dibadda oo leh rikoor waxbarasho oo wanaagsan",
    },
  ]

  const calculateTotal = () => {
    let total = 0
    const program = tuitionRates[selectedProgram as keyof typeof tuitionRates]?.programs.find(
      (p) => p.name === calculatorData.program,
    )
    if (program) total += program.total

    const housing = additionalCosts.housing.find((h) => h.type === calculatorData.housing)
    if (housing) total += housing.cost

    const meal = additionalCosts.meals.find((m) => m.type === calculatorData.mealPlan)
    if (meal) total += meal.cost

    // Add other costs
    additionalCosts.other.forEach((cost) => {
      total += cost.cost
    })

    return total
  }

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
                Tuition & Fees
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tuition & <span className="text-emerald-300">Fees</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Kharashka Waxbarasho & Lacagaha</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Transparent and affordable tuition rates designed to make quality education accessible. Explore our
              comprehensive fee structure and payment options.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                <Calculator className="mr-3 h-5 w-5" />
                Calculate Costs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Fee Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tuition Rates */}
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
              Tuition{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Rates</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Qiimaha Kharashka Waxbarasho</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our competitive tuition rates are designed to provide excellent value for world-class education. All fees
              are listed in US Dollars per academic year.
            </p>
          </motion.div>

          <Tabs value={selectedProgram} onValueChange={setSelectedProgram} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-2 rounded-xl">
              <TabsTrigger
                value="undergraduate"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Undergraduate
              </TabsTrigger>
              <TabsTrigger
                value="graduate"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Graduate
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Professional
              </TabsTrigger>
            </TabsList>

            {Object.entries(tuitionRates).map(([category, data]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {data.programs.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                        <CardHeader className="bg-gradient-to-r from-emerald-50 to-red-50 rounded-t-2xl">
                          <CardTitle className="text-center">
                            <div className="flex justify-center mb-3">
                              <GraduationCap className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h4>
                            <p className="text-sm text-emerald-600 font-semibold">{program.nameSo}</p>
                            <Badge className="mt-2 bg-emerald-100 text-emerald-800">{program.duration}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Tuition:</span>
                              <span className="font-semibold">${program.tuition.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Fees:</span>
                              <span className="font-semibold">${program.fees.toLocaleString()}</span>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total per year:</span>
                                <span className="text-2xl font-bold text-emerald-600">
                                  ${program.total.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-center pt-4">
                              <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                                Calculate Total Cost
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Cost Calculator */}
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
              Cost{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Calculator
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Xisaabiyaha Kharashka</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to estimate your total cost of attendance including tuition, housing,
              meals, and other expenses.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Calculator Form */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-6 w-6 text-emerald-600 mr-3" />
                    Calculate Your Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="programLevel">Program Level</Label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select program level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="program">Program</Label>
                    <Select
                      value={calculatorData.program}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, program: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {tuitionRates[selectedProgram as keyof typeof tuitionRates]?.programs.map((program) => (
                          <SelectItem key={program.name} value={program.name}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="housing">Housing Option</Label>
                    <Select
                      value={calculatorData.housing}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, housing: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select housing option" />
                      </SelectTrigger>
                      <SelectContent>
                        {additionalCosts.housing.map((option) => (
                          <SelectItem key={option.type} value={option.type}>
                            {option.type} - ${option.cost}/year
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mealPlan">Meal Plan</Label>
                    <Select
                      value={calculatorData.mealPlan}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, mealPlan: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {additionalCosts.meals.map((option) => (
                          <SelectItem key={option.type} value={option.type}>
                            {option.type} - ${option.cost}/year
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-6 w-6 text-emerald-600 mr-3" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Program Cost */}
                    {calculatorData.program && (
                      <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                        <span className="font-medium">Program Tuition & Fees</span>
                        <span className="font-bold text-emerald-600">
                          $
                          {tuitionRates[selectedProgram as keyof typeof tuitionRates]?.programs
                            .find((p) => p.name === calculatorData.program)
                            ?.total.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Housing Cost */}
                    {calculatorData.housing && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Housing</span>
                        <span className="font-bold text-blue-600">
                          $
                          {additionalCosts.housing
                            .find((h) => h.type === calculatorData.housing)
                            ?.cost.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Meal Plan Cost */}
                    {calculatorData.mealPlan && (
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">Meal Plan</span>
                        <span className="font-bold text-purple-600">
                          $
                          {additionalCosts.meals.find((m) => m.type === calculatorData.mealPlan)?.cost.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Other Costs */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Other Estimated Costs:</h4>
                      {additionalCosts.other.map((cost, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{cost.type}</span>
                          <span className="text-sm font-semibold">${cost.cost.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 to-red-100 rounded-lg">
                        <span className="text-xl font-bold text-gray-900">Estimated Total per Year:</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          ${calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
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
              Payment{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Options
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Doorashada Bixinta</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer flexible payment options to make your education more affordable and manageable.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {paymentOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-emerald-100 rounded-full">
                        <option.icon className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">{option.title}</CardTitle>
                    <p className="text-emerald-600 font-semibold">{option.titleSo}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <p className="text-sm text-emerald-600 mb-6">{option.descriptionSo}</p>
                    <Badge
                      className={`${
                        option.discount !== "No discount"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {option.discount}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 bg-blue-50 p-6 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Payment Methods Accepted</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-800">Bank Transfer (Local & International)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-800">Credit/Debit Cards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-800">Mobile Money (Zaad/eDahab)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-800">Cash Payments (at campus)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scholarships Preview */}
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
              Financial{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Aid</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Caawimada Maaliyadeed</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't let financial constraints limit your dreams. Explore our scholarship and financial aid
              opportunities.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Eligibility Criteria:</h5>
                        <p className="text-gray-600 text-sm">{scholarship.criteria}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-emerald-600 mb-1">Shuruudaha Helitaanka:</h5>
                        <p className="text-emerald-600 text-sm">{scholarship.criteriaSo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
              Learn More About Financial Aid
            </Button>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help with Tuition Planning?</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">
              Ma u baahan tahay caawimo qorshaynta kharashka?
            </h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Our financial aid counselors are here to help you understand your options and create a payment plan that
              works for your situation.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
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
                  <p className="text-emerald-200">finance@tuu.university</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                Apply for Financial Aid
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
