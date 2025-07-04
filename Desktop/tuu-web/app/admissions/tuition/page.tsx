"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, Calculator, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"

export default function TuitionPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("undergraduate")
  const [selectedCampus, setSelectedCampus] = useState("liberia")

  useEffect(() => {
    setMounted(true)
  }, [])

  const tuitionRates = {
    undergraduate: {
      liberia: {
        tuition: 8000,
        fees: 1200,
        housing: 2400,
        meals: 1800,
        books: 600,
        personal: 1000,
      },
      somaliland: {
        tuition: 7500,
        fees: 1100,
        housing: 2200,
        meals: 1600,
        books: 550,
        personal: 900,
      },
    },
    graduate: {
      liberia: {
        tuition: 12000,
        fees: 1500,
        housing: 2400,
        meals: 1800,
        books: 800,
        personal: 1200,
      },
      somaliland: {
        tuition: 11500,
        fees: 1400,
        housing: 2200,
        meals: 1600,
        books: 750,
        personal: 1100,
      },
    },
    doctoral: {
      liberia: {
        tuition: 15000,
        fees: 2000,
        housing: 2400,
        meals: 1800,
        books: 1000,
        personal: 1500,
      },
      somaliland: {
        tuition: 14500,
        fees: 1900,
        housing: 2200,
        meals: 1600,
        books: 950,
        personal: 1400,
      },
    },
  }

  const getCurrentRates = () => {
    return tuitionRates[selectedProgram as keyof typeof tuitionRates][
      selectedCampus as keyof typeof tuitionRates.undergraduate
    ]
  }

  const getTotalCost = () => {
    const rates = getCurrentRates()
    return Object.values(rates).reduce((sum, cost) => sum + cost, 0)
  }

  const paymentPlans = [
    {
      name: "Full Payment",
      description: "Pay the entire academic year upfront",
      discount: "5% discount",
      dueDate: "Before semester starts",
      benefits: ["5% tuition discount", "No payment processing fees", "Priority registration"],
    },
    {
      name: "Semester Plan",
      description: "Pay twice per academic year",
      discount: "2% discount",
      dueDate: "Beginning of each semester",
      benefits: ["2% tuition discount", "Flexible payment schedule", "No interest charges"],
    },
    {
      name: "Monthly Plan",
      description: "Spread payments over 10 months",
      discount: "No discount",
      dueDate: "Monthly installments",
      benefits: ["Budget-friendly", "Automatic payments available", "No large upfront cost"],
    },
  ]

  const additionalFees = [
    { name: "Application Fee", amount: 100, description: "One-time, non-refundable" },
    { name: "Technology Fee", amount: 200, description: "Per semester" },
    { name: "Student Activities Fee", amount: 150, description: "Per semester" },
    { name: "Health Services Fee", amount: 300, description: "Per academic year" },
    { name: "Graduation Fee", amount: 250, description: "Final semester only" },
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
                Tuition & Fees
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Affordable
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Excellence
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Invest in your future with competitive tuition rates and flexible payment options designed to make
                quality education accessible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tuition Calculator */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Tuition Calculator</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your estimated costs based on your program and campus choice
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Calculator Controls */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <Calculator className="h-8 w-8 text-purple-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Cost Calculator</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Program Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["undergraduate", "graduate", "doctoral"].map((program) => (
                        <button
                          key={program}
                          onClick={() => setSelectedProgram(program)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedProgram === program
                              ? "border-purple-600 bg-purple-50 text-purple-700"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="font-semibold capitalize">{program}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Campus</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["liberia", "somaliland"].map((campus) => (
                        <button
                          key={campus}
                          onClick={() => setSelectedCampus(campus)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedCampus === campus
                              ? "border-purple-600 bg-purple-50 text-purple-700"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="font-semibold capitalize">{campus} Campus</div>
                          <div className="text-sm text-gray-600">
                            {campus === "liberia" ? "Monrovia, Liberia" : "Hargeisa, Somaliland"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Estimated Annual Cost</h4>
                    <div className="text-4xl font-bold text-purple-600 mb-2">${getTotalCost().toLocaleString()}</div>
                    <p className="text-gray-600">
                      For {selectedProgram} program at {selectedCampus} campus
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cost Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Cost Breakdown</h3>

                <div className="space-y-4">
                  {Object.entries(getCurrentRates()).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div>
                        <div className="font-semibold text-gray-900 capitalize">
                          {category === "meals" ? "Meal Plan" : category}
                        </div>
                        <div className="text-sm text-gray-600">
                          {category === "tuition" && "Academic instruction"}
                          {category === "fees" && "Administrative and facility fees"}
                          {category === "housing" && "On-campus accommodation"}
                          {category === "meals" && "Dining plan (optional)"}
                          {category === "books" && "Textbooks and supplies"}
                          {category === "personal" && "Personal expenses estimate"}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-purple-600">${amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">Total Annual Cost</div>
                    <div className="text-3xl font-bold text-purple-600">${getTotalCost().toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/admissions/financial-aid">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                      Explore Financial Aid
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Payment Plans</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose a payment plan that works best for your financial situation
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {paymentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <Badge className="bg-purple-100 text-purple-700 text-lg px-4 py-2">{plan.discount}</Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Due: {plan.dueDate}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  Choose This Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Additional Fees</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Other fees that may apply during your academic journey
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h3 className="text-2xl font-bold">Fee Schedule</h3>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {additionalFees.map((fee, index) => (
                    <motion.div
                      key={fee.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{fee.name}</div>
                        <div className="text-sm text-gray-600">{fee.description}</div>
                      </div>
                      <div className="text-xl font-bold text-purple-600">${fee.amount}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Aid CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-8">Need Financial Assistance?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Don't let cost be a barrier to your education. We offer various financial aid options including
                scholarships, grants, and work-study programs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/admissions/financial-aid">
                  <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Explore Financial Aid
                    <DollarSign className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/about/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                  >
                    Contact Financial Aid Office
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8"
            >
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-8 w-8 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4">Important Information</h3>
                  <ul className="space-y-3 text-yellow-700">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Tuition rates are subject to annual review and may increase for subsequent academic years.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Housing and meal plan costs are estimates and may vary based on specific accommodations chosen.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        International students may have additional fees for visa processing and international student
                        services.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Refund policies apply for withdrawals. Please consult the student handbook for detailed
                        information.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
