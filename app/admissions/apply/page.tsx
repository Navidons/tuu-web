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
import { useRef } from "react"

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
    consent: false,
  })
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  const [recommendationFile, setRecommendationFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const notificationRef = useRef<HTMLDivElement | null>(null)

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

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTranscriptFile(e.target.files[0])
    }
  }
  const handleRecommendationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRecommendationFile(e.target.files[0])
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setNotification(null)
    try {
      const fd = new FormData()
      fd.append('firstName', formData.firstName)
      fd.append('lastName', formData.lastName)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('dateOfBirth', formData.dateOfBirth)
      fd.append('nationality', formData.nationality)
      fd.append('gender', formData.gender)
      fd.append('previousEducation', formData.previousEducation)
      fd.append('gpa', formData.gpa)
      fd.append('graduationYear', formData.graduationYear)
      fd.append('programChoice', formData.programChoice)
      fd.append('campusChoice', formData.campusChoice)
      fd.append('personalStatement', formData.personalStatement)
      if (transcriptFile) fd.append('transcript', transcriptFile)
      if (recommendationFile) fd.append('recommendation', recommendationFile)
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        setNotification({ type: 'success', message: 'Your application has been submitted! Please check your email for confirmation.' })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          nationality: "",
          gender: "",
          previousEducation: "",
          gpa: "",
          graduationYear: "",
          programChoice: "",
          campusChoice: "",
          transcript: null,
          recommendation: null,
          personalStatement: "",
          consent: false,
        })
        setTranscriptFile(null)
        setRecommendationFile(null)
        setCurrentStep(1)
      } else {
        const data = await res.json()
        setNotification({ type: 'error', message: data.error || 'Failed to submit application. Please try again.' })
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
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

  // Focus notification when shown
  useEffect(() => {
    if (notification && notificationRef.current) {
      notificationRef.current.focus()
    }
  }, [notification])

  // Prevent navigation away while submitting
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (submitting) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [submitting])

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-[#faf9f7] border-b border-gray-200 font-serif overflow-hidden">
        {/* Full-width background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-section/hero.png"
            alt="Unity University campus"
            className="object-cover w-full h-full absolute inset-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0">
          {/* Left: Textual content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pr-12 bg-white/90 rounded-2xl p-8 md:p-12 shadow-lg">
            <Badge className="bg-emerald-700 text-white px-6 py-2 text-base font-semibold shadow mb-4 font-serif">
              Apply Now
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 font-serif">
              Start Your Application
            </h1>
            <div className="w-12 h-1 bg-emerald-700 rounded-full mb-4" />
            <p className="text-lg md:text-xl text-gray-700 mb-6 font-sans">
              Take the first step towards your future at The Unity University. Our streamlined application process makes it easy to apply.
            </p>
          </div>
          {/* Right: Application image or illustration */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
              <img
                src="/strips/apply-now-at-the-unity-university.jpg"
                alt="Apply Now Illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="py-12 md:py-24 bg-white border-y-4 border-green-700 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-2 tracking-wide uppercase border-b-4 border-pink-600 inline-block pb-2">Application Requirements</h2>
            <div className="text-xs text-pink-600 mt-1 mb-2 font-semibold">Admissions Requirements</div>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mt-4 italic">
              Make sure you have all the required documents before starting your application
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
              {requirements.map((req, index) => (
                <div
                  key={req.title}
                  className={`bg-white rounded-2xl shadow-lg border-2 p-4 md:p-6 ${req.required ? 'border-pink-600' : 'border-green-700'}`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                        req.required ? "bg-pink-100" : "bg-green-100"
                      }`}
                    >
                      {req.required ? (
                        <AlertCircle className="h-4 w-4 text-pink-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-700" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black mb-2 font-serif uppercase tracking-wide">{req.title}</h3>
                      <p className="text-gray-800 font-serif">{req.description}</p>
                      <Badge
                        className={`mt-2 px-3 py-1 rounded-full font-bold text-xs border ${req.required ? "bg-pink-100 text-pink-700 border-pink-600" : "bg-green-100 text-green-700 border-green-700"}`}
                      >
                        {req.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-24 bg-white border-y-4 border-green-700 font-serif">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center font-bold border-2 font-serif text-lg transition-colors duration-300 ${
                        currentStep > step.number
                          ? "bg-green-700 text-white border-green-700"
                          : currentStep === step.number
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white text-black border-green-700"
                      }`}
                    >
                      {currentStep > step.number ? <CheckCircle className="h-4 md:h-6 w-4 md:w-6" /> : step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 md:w-24 h-1 mx-2 md:mx-4 rounded-full transition-colors duration-300 ${
                          currentStep > step.number ? "bg-green-700" : currentStep === step.number ? "bg-pink-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-1 md:mb-2 font-serif uppercase tracking-wide border-b-2 border-pink-600 inline-block pb-1">Step {currentStep}: {steps[currentStep - 1].title}</h3>
                <p className="text-sm md:text-base text-gray-800 font-serif">Complete all fields to continue</p>
              </div>
            </div>

            {/* Form Content */}
            {notification && (
              <div
                ref={notificationRef}
                tabIndex={-1}
                className={`mb-6 p-4 rounded-md font-serif text-center text-lg font-bold shadow border-2 ${notification.type === 'success' ? 'bg-green-50 border-green-700 text-green-800' : 'bg-pink-50 border-pink-600 text-pink-700'}`}
                role="alert"
                aria-live="assertive"
              >
                {notification.message}
              </div>
            )}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-green-700 p-8 font-serif">
              <form onSubmit={handleSubmit} aria-busy={submitting}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName" className="text-black font-medium font-serif uppercase tracking-wide">First Name</Label>
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
                        <Label htmlFor="lastName" className="text-black font-medium font-serif uppercase tracking-wide">Last Name</Label>
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
                        <Label htmlFor="email" className="text-black font-medium font-serif uppercase tracking-wide">Email Address</Label>
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
                        <Label htmlFor="phone" className="text-black font-medium font-serif uppercase tracking-wide">Phone Number</Label>
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
                        <Label htmlFor="dateOfBirth" className="text-black font-medium font-serif uppercase tracking-wide">Date of Birth</Label>
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
                        <Label htmlFor="nationality" className="text-black font-medium font-serif uppercase tracking-wide">Nationality</Label>
                        <select
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-serif"
                          required
                        >
                          <option value="">Select nationality</option>
                          <option value="liberian">Liberian</option>
                          <option value="somali">Somali</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="gender" className="text-black font-medium font-serif uppercase tracking-wide">Gender</Label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-serif"
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
                      <Label htmlFor="previousEducation" className="text-black font-medium font-serif uppercase tracking-wide">Previous Education</Label>
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
                        <Label htmlFor="gpa" className="text-black font-medium font-serif uppercase tracking-wide">GPA / Grade Average</Label>
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
                        <Label htmlFor="graduationYear" className="text-black font-medium font-serif uppercase tracking-wide">Graduation Year</Label>
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
                        <Label htmlFor="programChoice" className="text-black font-medium font-serif uppercase tracking-wide">Program of Interest</Label>
                        <select
                          id="programChoice"
                          name="programChoice"
                          value={formData.programChoice}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-serif"
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
                        <Label htmlFor="campusChoice" className="text-black font-medium font-serif uppercase tracking-wide">Preferred Campus</Label>
                        <select
                          id="campusChoice"
                          name="campusChoice"
                          value={formData.campusChoice}
                          onChange={handleInputChange}
                          className="mt-2 w-full px-3 py-2 border border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-serif"
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
                      <Label className="text-black font-medium font-serif uppercase tracking-wide">Academic Transcripts</Label>
                      <div className="mt-2 border-2 border-dashed border-green-700 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-black font-serif mb-2">Upload your official transcripts</p>
                        <input
                          type="file"
                          name="transcript"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                          onChange={handleTranscriptChange}
                          disabled={submitting}
                          className="block mx-auto my-2"
                        />
                        {transcriptFile && (
                          <div className="text-green-700 text-sm mt-2">Selected: {transcriptFile.name}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-black font-medium font-serif uppercase tracking-wide">Letters of Recommendation</Label>
                      <div className="mt-2 border-2 border-dashed border-green-700 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-black font-serif mb-2">Upload recommendation letters</p>
                        <input
                          type="file"
                          name="recommendation"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                          onChange={handleRecommendationChange}
                          disabled={submitting}
                          className="block mx-auto my-2"
                        />
                        {recommendationFile && (
                          <div className="text-green-700 text-sm mt-2">Selected: {recommendationFile.name}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="personalStatement" className="text-black font-medium font-serif uppercase tracking-wide">Personal Statement</Label>
                      <Textarea
                        id="personalStatement"
                        name="personalStatement"
                        value={formData.personalStatement}
                        onChange={handleInputChange}
                        className="mt-2 font-serif"
                        rows={8}
                        placeholder="Write a 500-word essay about your goals, motivations, and why you want to study at The Unity University..."
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2 font-serif">{formData.personalStatement.length}/500 words</p>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-white border-2 border-green-700 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-green-700 mb-4 font-serif uppercase tracking-wide">Application Summary</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-black font-serif">Name</p>
                          <p className="font-semibold font-serif">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-black font-serif">Email</p>
                          <p className="font-semibold font-serif">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-black font-serif">Program</p>
                          <p className="font-semibold font-serif">{formData.programChoice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-black font-serif">Campus</p>
                          <p className="font-semibold font-serif">{formData.campusChoice}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked as boolean }))}
                          required
                        />
                        <Label htmlFor="consent" className="text-black font-serif">
                          I consent that I have provided accurate information
                        </Label>
                      </div>
                    </div>

                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 font-serif">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-pink-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-pink-800 font-serif">Before you submit</h4>
                          <p className="text-pink-700 text-sm font-serif">
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
                    disabled={currentStep === 1 || submitting}
                    className="px-6 py-2 border-green-700 text-green-700 font-serif"
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-green-700 text-white hover:bg-green-800 px-6 py-2 font-serif"
                      disabled={submitting}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!formData.consent || submitting}
                      className="bg-pink-600 text-white hover:bg-pink-700 px-8 py-2 font-bold font-serif flex items-center justify-center"
                    >
                      {submitting && (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      )}
                      Submit Application
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-white border-y-4 border-green-700 font-serif">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-black mb-8 uppercase tracking-wide border-b-4 border-pink-600 inline-block pb-2">Need Help?</h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto mb-12 font-serif italic">
            Our admissions team is here to support you throughout the application process.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about/contact">
              <Button size="lg" className="bg-green-700 text-white hover:bg-green-800 border-2 border-green-700 px-8 py-4 text-lg font-bold font-serif rounded-full">
                Contact Admissions
                <Mail className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
          <div className="mt-10 max-w-2xl mx-auto bg-pink-50 border-l-4 border-pink-600 p-6 rounded-md shadow font-serif text-left">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-pink-600 mr-2" />
              <span className="text-pink-700 font-bold uppercase tracking-wide">Quick Tip</span>
            </div>
            <p className="text-black">For the fastest response, email us or use the contact form. Our team replies within 24 hours on business days.</p>
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
