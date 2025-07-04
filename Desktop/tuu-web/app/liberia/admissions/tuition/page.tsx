"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Calculator,
  CreditCard,
  Award,
  BookOpen,
  Home,
  Utensils,
  Car,
  GraduationCap,
  CheckCircle,
  Calendar,
  PiggyBank,
  TrendingUp,
  FileText,
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

export default function TuitionPage() {
  const [selectedProgram, setSelectedProgram] = useState("undergraduate")
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("semester")
  const [calculatorData, setCalculatorData] = useState({
    program: "undergraduate",
    credits: 15,
    housing: "on-campus",
    mealPlan: "full",
    residency: "domestic",
  })

  const tuitionRates = {
    undergraduate: {
      domestic: { perCredit: 150, fullTime: 2250 },
      international: { perCredit: 200, fullTime: 3000 },
    },
    graduate: {
      domestic: { perCredit: 200, fullTime: 3000 },
      international: { perCredit: 250, fullTime: 3750 },
    },
    professional: {
      domestic: { perCredit: 100, fullTime: 1500 },
      international: { perCredit: 125, fullTime: 1875 },
    },
  }

  const additionalFees = {
    registration: 100,
    technology: 50,
    library: 25,
    student_activities: 75,
    health_services: 100,
    graduation: 150,
  }

  const housingCosts = {
    "on-campus": { semester: 1200, year: 2400 },
    "off-campus": { semester: 800, year: 1600 },
    commuter: { semester: 0, year: 0 },
  }

  const mealPlanCosts = {
    full: { semester: 800, year: 1600 },
    partial: { semester: 500, year: 1000 },
    none: { semester: 0, year: 0 },
  }

  const scholarships = [
    {
      name: "Academic Excellence Scholarship",
      amount: "$2,000",
      criteria: "GPA 3.5 or higher",
      renewable: true,
      deadline: "March 15",
    },
    {
      name: "Leadership Scholarship",
      amount: "$1,500",
      criteria: "Demonstrated leadership experience",
      renewable: true,
      deadline: "April 1",
    },
    {
      name: "Community Service Scholarship",
      amount: "$1,000",
      criteria: "100+ hours of community service",
      renewable: false,
      deadline: "May 1",
    },
    {
      name: "International Student Scholarship",
      amount: "$2,500",
      criteria: "International students with financial need",
      renewable: true,
      deadline: "February 15",
    },
    {
      name: "STEM Excellence Scholarship",
      amount: "$3,000",
      criteria: "STEM majors with GPA 3.7+",
      renewable: true,
      deadline: "March 1",
    },
    {
      name: "First Generation Scholarship",
      amount: "$1,200",
      criteria: "First in family to attend university",
      renewable: true,
      deadline: "April 15",
    },
  ]

  const paymentOptions = [
    {
      title: "Full Payment",
      description: "Pay entire semester/year upfront",
      discount: "5% discount",
      icon: DollarSign,
    },
    {
      title: "Semester Plan",
      description: "Pay at the beginning of each semester",
      discount: "No additional fees",
      icon: Calendar,
    },
    {
      title: "Monthly Plan",
      description: "Spread payments over 10 months",
      discount: "Small processing fee applies",
      icon: CreditCard,
    },
    {
      title: "Financial Aid",
      description: "Loans, grants, and work-study",
      discount: "Based on eligibility",
      icon: Award,
    },
  ]

  const calculateTotalCost = () => {
    const program = calculatorData.program
    const residency = calculatorData.residency
    const credits = calculatorData.credits

    const tuition = tuitionRates[program as keyof typeof tuitionRates][
      residency as "domestic" | "international"
    ].perCredit * credits

    const fees = Object.values(additionalFees).reduce((sum, fee) => sum + fee, 0)

    const housing =
      housingCosts[calculatorData.housing as keyof typeof housingCosts].semester

    const meals =
      mealPlanCosts[calculatorData.mealPlan as keyof typeof mealPlanCosts].semester

    return {
      tuition,
      fees,
      housing,
      meals,
      total: tuition + fees + housing + meals,
    }
  }

  const costs = calculateTotalCost()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Tuition & Financial Aid</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Invest in your future with affordable education and comprehensive financial support. We're committed to
              making quality education accessible to all students.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Award className="w-4 h-4 mr-2" />
                $2M+ in Scholarships
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <PiggyBank className="w-4 h-4 mr-2" />
                Flexible Payment Plans
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                95% Financial Aid Recipients
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Calculator */}
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
              Calculate Your Costs
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to estimate your total educational expenses
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Cost Calculator
                  </CardTitle>
                  <CardDescription>Customize your selections to get an accurate estimate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program Level</Label>
                    <Select
                      value={calculatorData.program}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, program: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="professional">Professional Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="residency">Residency Status</Label>
                    <Select
                      value={calculatorData.residency}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, residency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select residency status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic Student</SelectItem>
                        <SelectItem value="international">International Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credits">Credit Hours per Semester</Label>
                    <Select
                      value={calculatorData.credits.toString()}
                      onValueChange={(value) =>
                        setCalculatorData({ ...calculatorData, credits: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 Credits (Part-time)</SelectItem>
                        <SelectItem value="15">15 Credits (Full-time)</SelectItem>
                        <SelectItem value="18">18 Credits (Full-time+)</SelectItem>
                        <SelectItem value="21">21 Credits (Maximum)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="housing">Housing Option</Label>
                    <Select
                      value={calculatorData.housing}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, housing: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select housing option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-campus">On-Campus Housing</SelectItem>
                        <SelectItem value="off-campus">Off-Campus Housing</SelectItem>
                        <SelectItem value="commuter">Commuter (Live at Home)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mealPlan">Meal Plan</Label>
                    <Select
                      value={calculatorData.mealPlan}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, mealPlan: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Meal Plan</SelectItem>
                        <SelectItem value="partial">Partial Meal Plan</SelectItem>
                        <SelectItem value="none">No Meal Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Cost Breakdown (Per Semester)
                  </CardTitle>
                  <CardDescription>Estimated costs based on your selections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        Tuition ({calculatorData.credits} credits)
                      </span>
                      <span className="font-semibold">${costs.tuition.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        Fees & Services
                      </span>
                      <span className="font-semibold">${costs.fees.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-purple-500" />
                        Housing
                      </span>
                      <span className="font-semibold">${costs.housing.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-orange-500" />
                        Meal Plan
                      </span>
                      <span className="font-semibold">${costs.meals.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                      <span className="text-lg font-bold">Total per Semester</span>
                      <span className="text-2xl font-bold text-blue-600">${costs.total.toLocaleString()}</span>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-900">Annual Total (2 semesters)</span>
                        <span className="text-xl font-bold text-blue-600">${(costs.total * 2).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tuition Information */}
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
              Tuition & Fees Breakdown
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees
            </motion.p>
          </motion.div>

          <Tabs defaultValue="tuition-rates" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="tuition-rates">Tuition Rates</TabsTrigger>
              <TabsTrigger value="payment-plans">Payment Plans</TabsTrigger>
              <TabsTrigger value="additional-costs">Additional Costs</TabsTrigger>
            </TabsList>

            <TabsContent value="tuition-rates" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(tuitionRates).map(([level, rates]) => (
                  <motion.div
                    key={level}
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="capitalize text-xl">{level} Programs</CardTitle>
                        <CardDescription>Per semester rates for {level} students</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Domestic Students</span>
                            <div className="text-right">
                              <div className="font-semibold">${rates.domestic.fullTime}/semester</div>
                              <div className="text-sm text-gray-500">${rates.domestic.perCredit}/credit</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">International Students</span>
                            <div className="text-right">
                              <div className="font-semibold">${rates.international.fullTime}/semester</div>
                              <div className="text-sm text-gray-500">${rates.international.perCredit}/credit</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Mandatory Fees (Per Semester)</CardTitle>
                  <CardDescription>
                    These fees are required for all students and support campus services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(additionalFees).map(([fee, amount]) => (
                      <div key={fee} className="flex justify-between items-center py-2 border-b">
                        <span className="capitalize">{fee.replace("_", " ")} Fee</span>
                        <span className="font-semibold">${amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Mandatory Fees</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${Object.values(additionalFees).reduce((sum, fee) => sum + fee, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-plans" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <motion.div
                      key={option.title}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Icon className="w-5 h-5 text-blue-600" />
                            {option.title}
                          </CardTitle>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Badge variant="secondary" className="mb-4">
                            {option.discount}
                          </Badge>
                          <Button className="w-full">Choose This Plan</Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods Accepted</CardTitle>
                  <CardDescription>We accept various payment methods for your convenience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Credit/Debit Cards</h4>
                      <p className="text-sm text-gray-600">Visa, MasterCard, American Express</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Bank Transfer</h4>
                      <p className="text-sm text-gray-600">Direct bank transfers and wire payments</p>
                    </div>
                    <div className="text-center">
                      <PiggyBank className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold">Financial Aid</h4>
                      <p className="text-sm text-gray-600">Loans, grants, and scholarships</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional-costs" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Books & Supplies
                    </CardTitle>
                    <CardDescription>Estimated costs per semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Textbooks</span>
                        <span className="font-semibold">$300 - $500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Digital Resources</span>
                        <span className="font-semibold">$50 - $100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lab Supplies</span>
                        <span className="font-semibold">$25 - $75</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Estimate</span>
                        <span className="font-bold text-blue-600">$375 - $675</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      Transportation & Personal
                    </CardTitle>
                    <CardDescription>Monthly estimates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Transportation</span>
                        <span className="font-semibold">$50 - $150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Expenses</span>
                        <span className="font-semibold">$100 - $200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entertainment</span>
                        <span className="font-semibold">$50 - $100</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Estimate</span>
                        <span className="font-bold text-blue-600">$200 - $450</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cost-Saving Tips</CardTitle>
                  <CardDescription>Ways to reduce your educational expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Buy Used Textbooks</h4>
                          <p className="text-sm text-gray-600">Save 50-70% on textbook costs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Apply for Scholarships</h4>
                          <p className="text-sm text-gray-600">Multiple scholarships available</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Work-Study Programs</h4>
                          <p className="text-sm text-gray-600">Earn while you learn on campus</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Early Payment Discount</h4>
                          <p className="text-sm text-gray-600">5% discount for full payment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Digital Resources</h4>
                          <p className="text-sm text-gray-600">Access free online materials</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Shared Housing</h4>
                          <p className="text-sm text-gray-600">Reduce housing costs significantly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Scholarships Section */}
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
              Scholarships & Financial Aid
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer numerous scholarships and financial aid options to help make your education affordable
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.name}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-green-600">
                      {scholarship.amount}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-1">Criteria:</h4>
                      <p className="text-sm text-gray-600">{scholarship.criteria}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant={scholarship.renewable ? "default" : "secondary"}>
                        {scholarship.renewable ? "Renewable" : "One-time"}
                      </Badge>
                      <span className="text-sm text-gray-500">Due: {scholarship.deadline}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Financial Aid Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Students receive financial aid</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">$2.1M</div>
                    <div className="text-sm text-gray-600">Total scholarships awarded</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">$1,800</div>
                    <div className="text-sm text-gray-600">Average scholarship amount</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
