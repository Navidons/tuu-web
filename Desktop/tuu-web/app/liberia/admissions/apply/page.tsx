"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  GraduationCap,
  Globe,
  Users,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
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

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    academicInfo: {},
    programSelection: {},
    documents: {},
  })

  const steps = [
    { id: 1, title: "Personal Information", icon: Users },
    { id: 2, title: "Academic Background", icon: BookOpen },
    { id: 3, title: "Program Selection", icon: GraduationCap },
    { id: 4, title: "Documents Upload", icon: Upload },
    { id: 5, title: "Review & Submit", icon: CheckCircle },
  ]

  const programs = [
    {
      level: "Undergraduate",
      programs: [
        "Bachelor of Business Administration",
        "Bachelor of Computer Science",
        "Bachelor of Engineering",
        "Bachelor of Public Health",
        "Bachelor of Education",
      ],
    },
    {
      level: "Graduate",
      programs: [
        "Master of Business Administration",
        "Master of Public Administration",
        "Master of Computer Science",
        "Master of Engineering",
        "Master of Public Health",
      ],
    },
    {
      level: "Professional",
      programs: [
        "Certificate in Project Management",
        "Certificate in Digital Marketing",
        "Certificate in Data Analytics",
        "Certificate in Leadership",
      ],
    },
  ]

  const applicationRequirements = [
    {
      category: "Academic Documents",
      items: [
        "High School Diploma/Transcript (for undergraduate)",
        "Bachelor's Degree/Transcript (for graduate)",
        "Official transcripts from all institutions attended",
        "English proficiency test scores (if applicable)",
      ],
    },
    {
      category: "Personal Documents",
      items: [
        "Valid passport or national ID",
        "Birth certificate",
        "Two passport-sized photographs",
        "Medical certificate",
      ],
    },
    {
      category: "Supporting Documents",
      items: [
        "Personal statement/Essay",
        "Letters of recommendation (2-3)",
        "Resume/CV",
        "Portfolio (for specific programs)",
      ],
    },
  ]

  const applicationDeadlines = [
    { semester: "Fall 2024", deadline: "August 15, 2024", status: "Open" },
    { semester: "Spring 2025", deadline: "December 15, 2024", status: "Open" },
    { semester: "Summer 2025", deadline: "April 15, 2025", status: "Coming Soon" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Apply to Unity University</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start your journey towards academic excellence and professional success. Join our diverse community of
              scholars and innovators.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Rolling Admissions
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                International Students Welcome
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Award className="w-4 h-4 mr-2" />
                Scholarships Available
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
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
              Application Process
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined application process makes it easy to apply and track your progress
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="online-application" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                <TabsTrigger value="online-application">Online Application</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
              </TabsList>

              <TabsContent value="online-application" className="space-y-8">
                {/* Progress Bar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Application Progress
                    </CardTitle>
                    <CardDescription>Complete all steps to submit your application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <Progress value={(currentStep / steps.length) * 100} className="w-full" />
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {steps.map((step, index) => {
                          const Icon = step.icon
                          const isCompleted = currentStep > step.id
                          const isCurrent = currentStep === step.id

                          return (
                            <div
                              key={step.id}
                              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                                isCompleted
                                  ? "border-green-500 bg-green-50"
                                  : isCurrent
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                  isCompleted
                                    ? "bg-green-500 text-white"
                                    : isCurrent
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-300 text-gray-600"
                                }`}
                              >
                                {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                              </div>
                              <span className="text-sm font-medium text-center">{step.title}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Step {currentStep}: {steps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription>Please fill out all required fields to continue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Enter your last name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input id="dateOfBirth" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your nationality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="liberian">Liberian</SelectItem>
                              <SelectItem value="american">American</SelectItem>
                              <SelectItem value="ghanaian">Ghanaian</SelectItem>
                              <SelectItem value="nigerian">Nigerian</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea id="address" placeholder="Enter your full address" />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="highSchool">High School/Secondary School *</Label>
                            <Input id="highSchool" placeholder="Name of your high school" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="graduationYear">Graduation Year *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gpa">GPA/Grade Average</Label>
                            <Input id="gpa" placeholder="Enter your GPA or grade average" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="testScores">Standardized Test Scores</Label>
                            <Input id="testScores" placeholder="SAT, ACT, or equivalent scores" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="academicAchievements">Academic Achievements</Label>
                          <Textarea
                            id="academicAchievements"
                            placeholder="List any academic honors, awards, or achievements"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="programLevel">Program Level *</Label>
                            <Select>
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
                            <Label htmlFor="program">Preferred Program *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your program" />
                              </SelectTrigger>
                              <SelectContent>
                                {programs.map((level) =>
                                  level.programs.map((program) => (
                                    <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                                      {program}
                                    </SelectItem>
                                  )),
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="startTerm">Preferred Start Term *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select start term" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fall-2024">Fall 2024</SelectItem>
                                <SelectItem value="spring-2025">Spring 2025</SelectItem>
                                <SelectItem value="summer-2025">Summer 2025</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="studyMode">Study Mode *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select study mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="personalStatement">Personal Statement *</Label>
                          <Textarea
                            id="personalStatement"
                            placeholder="Tell us about your goals, interests, and why you want to study at Unity University"
                            rows={6}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                        disabled={currentStep === steps.length}
                      >
                        {currentStep === steps.length ? "Submit Application" : "Next"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {applicationRequirements.map((category, index) => (
                    <motion.div
                      key={category.category}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Important Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Document Authentication</h4>
                            <p className="text-sm text-gray-600">
                              All academic documents must be officially certified or notarized.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">English Proficiency</h4>
                            <p className="text-sm text-gray-600">
                              International students may need TOEFL/IELTS scores if English is not their first language.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Application Fee</h4>
                            <p className="text-sm text-gray-600">
                              A non-refundable application fee of $50 USD is required for all applications.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Processing Time</h4>
                            <p className="text-sm text-gray-600">
                              Applications are typically processed within 2-4 weeks of submission.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deadlines" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {applicationDeadlines.map((deadline, index) => (
                    <motion.div
                      key={deadline.semester}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="text-center">
                        <CardHeader>
                          <CardTitle className="text-xl">{deadline.semester}</CardTitle>
                          <CardDescription>Application Deadline</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-2xl font-bold text-blue-600">{deadline.deadline}</div>
                            <Badge variant={deadline.status === "Open" ? "default" : "secondary"} className="px-4 py-1">
                              {deadline.status}
                            </Badge>
                            <Button className="w-full" disabled={deadline.status !== "Open"}>
                              {deadline.status === "Open" ? "Apply Now" : "Coming Soon"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Important Dates</CardTitle>
                    <CardDescription>Key dates to remember throughout the application process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Fall 2024 Timeline</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>Application Deadline</span>
                              <span className="font-medium">August 15, 2024</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Decision Notification</span>
                              <span className="font-medium">September 1, 2024</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Enrollment Confirmation</span>
                              <span className="font-medium">September 15, 2024</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Classes Begin</span>
                              <span className="font-medium">October 1, 2024</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Spring 2025 Timeline</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>Application Deadline</span>
                              <span className="font-medium">December 15, 2024</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Decision Notification</span>
                              <span className="font-medium">January 5, 2025</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Enrollment Confirmation</span>
                              <span className="font-medium">January 20, 2025</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Classes Begin</span>
                              <span className="font-medium">February 1, 2025</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Contact Support */}
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
              Need Help with Your Application?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our admissions team is here to support you throughout the application process
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Speak with an admissions counselor</p>
              <p className="text-blue-600 font-medium">+231-77-123-4567</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">Get detailed information via email</p>
              <p className="text-green-600 font-medium">admissions@unity.edu.lr</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Schedule an in-person meeting</p>
              <p className="text-purple-600 font-medium">Monrovia Campus</p>
            </motion.div>
          </div>
        </div>
      </section>
      <LiberiaFooter />
    </div>
  )
}
