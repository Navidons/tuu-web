"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  GraduationCap,
  CreditCard,
  Send,
  ArrowRight,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState({
    personalInfo: {},
    academicInfo: {},
    programSelection: {},
    documents: {},
    payment: {},
  })

  const steps = [
    { number: 1, title: "Personal Information", titleSo: "Macluumaadka Shakhsiga", icon: User },
    { number: 2, title: "Academic Background", titleSo: "Asalka Waxbarasho", icon: GraduationCap },
    { number: 3, title: "Program Selection", titleSo: "Doorashada Barnaamijka", icon: FileText },
    { number: 4, title: "Documents Upload", titleSo: "Soo Gelinta Dukumentiyada", icon: Upload },
    { number: 5, title: "Review & Submit", titleSo: "Dib u eeg & Gudbi", icon: Send },
  ]

  const programs = {
    undergraduate: [
      { id: "business", name: "Business Administration", nameSo: "Maamulka Ganacsiga" },
      { id: "it", name: "Information Technology", nameSo: "Tignoolajiyada Macluumaadka" },
      { id: "health", name: "Public Health", nameSo: "Caafimaadka Dadweynaha" },
      { id: "engineering", name: "Civil Engineering", nameSo: "Injineerinta Dhismaha" },
      { id: "education", name: "Education", nameSo: "Waxbarashada" },
      { id: "agriculture", name: "Agriculture & Environment", nameSo: "Beeraha & Deegaanka" },
    ],
    graduate: [
      {
        id: "mba",
        name: "Master of Business Administration",
        nameSo: "Shahaadada Sare ee Maamulka Ganacsiga",
      },
      {
        id: "mph",
        name: "Master of Public Health",
        nameSo: "Shahaadada Sare ee Caafimaadka Dadweynaha",
      },
      { id: "med", name: "Master of Education", nameSo: "Shahaadada Sare ee Waxbarashada" },
      {
        id: "meng",
        name: "Master of Engineering Management",
        nameSo: "Shahaadada Sare ee Maamulka Injineerinta",
      },
    ],
    professional: [
      {
        id: "digital-marketing",
        name: "Digital Marketing Certificate",
        nameSo: "Shahaadada Suuq-geynta Dijital-ka",
      },
      {
        id: "project-management",
        name: "Project Management Professional",
        nameSo: "Maamulka Mashaariicda Xirfadeed",
      },
      {
        id: "cybersecurity",
        name: "Cybersecurity Fundamentals",
        nameSo: "Aasaaska Amniga Cyber-ka",
      },
    ],
  }



  const requiredDocuments = {
    undergraduate: [
      "High School Diploma/Certificate",
      "Official Transcripts",
      "English Proficiency Test Results",
      "Personal Statement",
      "Two Letters of Recommendation",
      "Copy of National ID/Passport",
      "Passport-sized Photographs (2)",
    ],
    graduate: [
      "Bachelor's Degree Certificate",
      "Official University Transcripts",
      "GRE/GMAT Scores (if required)",
      "English Proficiency Test Results",
      "Statement of Purpose",
      "Three Letters of Recommendation",
      "Resume/CV",
      "Copy of National ID/Passport",
      "Passport-sized Photographs (2)",
    ],
    professional: [
      "High School Diploma or Higher",
      "Professional Experience Certificate",
      "English Proficiency (Basic)",
      "Copy of National ID/Passport",
      "Passport-sized Photographs (2)",
    ],
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
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
                Apply Now
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Start Your <span className="text-emerald-300">Journey</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Safarkaaga Bilow</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Take the first step towards your future at The Unity University Somaliland. Our streamlined application
              process makes it easy to apply for your desired program.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                Start Application
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
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
              Application{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Habka Codsiga</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow our simple 6-step application process to join The Unity University Somaliland.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="h-5 w-5" />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-16 mx-2 transition-all duration-300 ${
                        currentStep > step.number ? "bg-emerald-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{steps[currentStep - 1].title}</h3>
              <p className="text-emerald-600 font-semibold">{steps[currentStep - 1].titleSo}</p>
            </div>
          </div>

          {/* Application Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white mr-3">
                      {currentStep}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{steps[currentStep - 1].title}</h3>
                      <p className="text-sm text-emerald-600">{steps[currentStep - 1].titleSo}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    Step {currentStep} of {steps.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter your first name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter your last name" className="mt-2" />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" placeholder="+252 XX XXX XXXX" className="mt-2" />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input id="dateOfBirth" type="date" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea id="address" placeholder="Enter your full address" className="mt-2" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Enter your city" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="somaliland">Somaliland</SelectItem>
                            <SelectItem value="somalia">Somalia</SelectItem>
                            <SelectItem value="ethiopia">Ethiopia</SelectItem>
                            <SelectItem value="djibouti">Djibouti</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Background */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="lastSchool">Last School/Institution Attended *</Label>
                      <Input id="lastSchool" placeholder="Name of your last educational institution" className="mt-2" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year *</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
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
                      <div>
                        <Label htmlFor="gpa">GPA/Grade *</Label>
                        <Input id="gpa" placeholder="Enter your GPA or grade" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subjects">Major Subjects/Specialization</Label>
                      <Textarea
                        id="subjects"
                        placeholder="List your major subjects or area of specialization"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="englishProficiency">English Language Proficiency</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="native">Native Speaker</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="test-required">Will take proficiency test</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="workExperience">Work Experience (if any)</Label>
                      <Textarea
                        id="workExperience"
                        placeholder="Describe any relevant work experience"
                        className="mt-2"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Program Selection */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label>Program Level *</Label>
                      <RadioGroup className="mt-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="undergraduate" id="undergraduate" />
                          <Label htmlFor="undergraduate">Undergraduate Programs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="graduate" id="graduate" />
                          <Label htmlFor="graduate">Graduate Programs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional" id="professional" />
                          <Label htmlFor="professional">Professional Certificates</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Tabs defaultValue="undergraduate" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
                        <TabsTrigger value="graduate">Graduate</TabsTrigger>
                        <TabsTrigger value="professional">Professional</TabsTrigger>
                      </TabsList>

                      {Object.entries(programs).map(([level, programList]) => (
                        <TabsContent key={level} value={level} className="mt-6">
                          <div className="grid gap-4">
                            {programList.map((program) => (
                              <div key={program.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                              <div className="flex items-center space-x-3">
                                <Checkbox id={program.id} />
                                <div>
                                  <Label htmlFor={program.id} className="text-base font-semibold cursor-pointer">
                                    {program.name}
                                  </Label>
                                  <p className="text-sm text-emerald-600">{program.nameSo}</p>
                                </div>
                              </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>

                    <div>
                      <Label htmlFor="startDate">Preferred Start Date *</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fall2024">Fall 2024 (September)</SelectItem>
                          <SelectItem value="spring2025">Spring 2025 (February)</SelectItem>
                          <SelectItem value="summer2025">Summer 2025 (June)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="personalStatement">Personal Statement *</Label>
                      <Textarea
                        id="personalStatement"
                        placeholder="Tell us why you want to study at The Unity University and your career goals (500-1000 words)"
                        className="mt-2 min-h-[150px]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Documents Upload */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Document Requirements</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Please upload clear, legible copies of all required documents. Accepted formats: PDF, JPG,
                            PNG (Max 5MB each)
                          </p>
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="undergraduate" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
                        <TabsTrigger value="graduate">Graduate</TabsTrigger>
                        <TabsTrigger value="professional">Professional</TabsTrigger>
                      </TabsList>

                      {Object.entries(requiredDocuments).map(([level, documents]) => (
                        <TabsContent key={level} value={level} className="mt-6">
                          <div className="space-y-4">
                            {documents.map((document, index) => (
                              <div key={index} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium">{document}</span>
                                  </div>
                                  <Badge variant="outline">Required</Badge>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload File
                                  </Button>
                                  <span className="text-sm text-gray-500">No file selected</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </motion.div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-emerald-50 p-6 rounded-lg">
                      <h4 className="font-bold text-emerald-900 mb-4">Application Summary</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h5 className="font-semibold mb-2">Personal Information</h5>
                          <p className="text-sm text-gray-600">John Doe</p>
                          <p className="text-sm text-gray-600">john.doe@email.com</p>
                          <p className="text-sm text-gray-600">+252 XX XXX XXXX</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Program Selection</h5>
                          <p className="text-sm text-gray-600">Business Administration</p>
                          <p className="text-sm text-gray-600">Undergraduate</p>
                          <p className="text-sm text-gray-600">Fall 2024</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-emerald-600 hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-emerald-600 hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="accuracy" />
                        <Label htmlFor="accuracy" className="text-sm">
                          I certify that all information provided is accurate and complete
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="updates" />
                        <Label htmlFor="updates" className="text-sm">
                          I agree to receive updates about my application via email and SMS
                        </Label>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">What happens next?</h4>
                          <ul className="text-sm text-blue-700 mt-2 space-y-1">
                            <li>• You will receive a confirmation email with your application ID</li>
                            <li>• Our admissions team will review your application within 5-7 business days</li>
                            <li>• You will be notified of the admission decision via email</li>
                            <li>• If accepted, you will receive enrollment instructions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center bg-transparent"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button onClick={nextStep} className="bg-emerald-600 text-white hover:bg-emerald-700">
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Application
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
