"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Upload, CheckCircle, AlertCircle, FileText, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import EnhancedFooter from "@/components/enhanced-footer"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"

export default function ApplyPage() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    gender: "",

    // Academic Information
    previousEducation: "",
    gpa: "",
    graduationYear: "",
    programChoice: "",
    campusChoice: "",

    // Documents
    transcript: null,
    recommendation: null,
    personalStatement: "",

    // Additional
    terms: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    // Handle form submission
  }

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Academic Background", icon: FileText },
    { number: 3, title: "Documents & Essays", icon: Upload },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
  ]

  const requirements = [
    {
      title: "Academic Transcripts",
      description: "Official transcripts from all previously attended institutions",
      required: true,
    },
    {
      title: "Letters of Recommendation",
      description: "Two letters from academic or professional references",
      required: true,
    },
    {
      title: "Personal Statement",
      description: "500-word essay describing your goals and motivations",
      required: true,
    },
    {
      title: "English Proficiency",
      description: "TOEFL/IELTS scores for non-native English speakers",
      required: false,
    },
    {
      title: "Passport Copy",
      description: "Valid passport for international students",
      required: false,
    },
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
              <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">Apply Now</Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Start Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Application
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Take the first step towards your future at Unity University. Our streamlined application process makes
                it easy to apply.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Application Requirements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make sure you have all the required documents before starting your application
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                        req.required ? "bg-red-100" : "bg-blue-100"
                      }`}
                    >
                      {req.required ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{req.title}</h3>
                      <p className="text-gray-600">{req.description}</p>
                      <Badge
                        className={`mt-2 ${req.required ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {req.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        currentStep >= step.number
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStep > step.number ? <CheckCircle className="h-6 w-6" /> : step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-24 h-1 mx-4 ${
                          currentStep > step.number ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </h3>
                <p className="text-gray-600">Complete all fields to continue</p>
              </div>
            </div>

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 font-medium">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 font-medium">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      <div>
                        <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">
                          Date of Birth
                        </Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality" className="text-gray-700 font-medium">
                          Nationality
                        </Label>
                        <select
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select nationality</option>
                          <option value="liberian">Liberian</option>
                          <option value="somali">Somali</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="gender" className="text-gray-700 font-medium">
                          Gender
                        </Label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Background */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="previousEducation" className="text-gray-700 font-medium">
                        Previous Education
                      </Label>
                      <Input
                        id="previousEducation"
                        name="previousEducation"
                        value={formData.previousEducation}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="Name of your previous institution"
                        required
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="gpa" className="text-gray-700 font-medium">
                          GPA / Grade Average
                        </Label>
                        <Input
                          id="gpa"
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="e.g., 3.8 or 85%"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="graduationYear" className="text-gray-700 font-medium">
                          Graduation Year
                        </Label>
                        <Input
                          id="graduationYear"
                          name="graduationYear"
                          type="number"
                          value={formData.graduationYear}
                          onChange={handleInputChange}
                          className="mt-2"
                          placeholder="2024"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="programChoice" className="text-gray-700 font-medium">
                          Program of Interest
                        </Label>
                        <select
                          id="programChoice"
                          name="programChoice"
                          value={formData.programChoice}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select a program</option>
                          <option value="business">Business Administration</option>
                          <option value="computer-science">Computer Science</option>
                          <option value="engineering">Engineering</option>
                          <option value="health-sciences">Health Sciences</option>
                          <option value="liberal-arts">Liberal Arts</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="campusChoice" className="text-gray-700 font-medium">
                          Preferred Campus
                        </Label>
                        <select
                          id="campusChoice"
                          name="campusChoice"
                          value={formData.campusChoice}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select a campus</option>
                          <option value="liberia">Liberia Campus</option>
                          <option value="somaliland">Somaliland Campus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents & Essays */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gray-700 font-medium">Academic Transcripts</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload your official transcripts</p>
                        <Button variant="outline" type="button">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-700 font-medium">Letters of Recommendation</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload recommendation letters</p>
                        <Button variant="outline" type="button">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="personalStatement" className="text-gray-700 font-medium">
                        Personal Statement
                      </Label>
                      <Textarea
                        id="personalStatement"
                        name="personalStatement"
                        value={formData.personalStatement}
                        onChange={handleInputChange}
                        className="mt-2"
                        rows={8}
                        placeholder="Write a 500-word essay about your goals, motivations, and why you want to study at Unity University..."
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2">{formData.personalStatement.length}/500 words</p>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Application Summary</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-semibold">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Program</p>
                          <p className="font-semibold">{formData.programChoice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Campus</p>
                          <p className="font-semibold">{formData.campusChoice}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.terms}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked as boolean }))}
                          required
                        />
                        <Label htmlFor="terms" className="text-gray-700">
                          I agree to the{" "}
                          <Link href="/terms" className="text-purple-600 hover:underline">
                            Terms and Conditions
                          </Link>{" "}
                          and
                          <Link href="/privacy" className="text-purple-600 hover:underline ml-1">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Before you submit</h4>
                          <p className="text-yellow-700 text-sm">
                            Please review all information carefully. Once submitted, you cannot edit your application.
                            You will receive a confirmation email with your application ID.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-6 py-2"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!formData.terms}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8 py-2 font-bold"
                    >
                      Submit Application
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">Need Help?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Our admissions team is here to support you throughout the application process.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/about/contact">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Contact Admissions
                  <Mail className="ml-3 h-6 w-6" />
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
