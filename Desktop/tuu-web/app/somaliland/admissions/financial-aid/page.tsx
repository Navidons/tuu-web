"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  Calculator,
  Calendar,
  Phone,
  Mail,
  Download,
  ArrowRight,
  Star,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function FinancialAidPage() {
  const [selectedAidType, setSelectedAidType] = useState("scholarships")
  const [applicationStep, setApplicationStep] = useState(1)

  const scholarshipPrograms = [
    {
      name: "Academic Excellence Scholarship",
      nameSo: "Deeqda Fiicanta Waxbarasho",
      amount: "Up to 50%",
      amountValue: 50,
      description:
        "Awarded to students with outstanding academic performance and leadership potential. Renewable annually based on academic performance.",
      descriptionSo:
        "Waxaa la siiyaa ardayda leh waxqabad waxbarasho oo heer sare ah iyo awood hoggaamin. Waa la cusboonaysiin karaa sanad walba iyadoo ku saleysan waxqabadka waxbarasho.",
      eligibility: [
        "Minimum GPA of 3.5 or equivalent",
        "Demonstrated leadership experience",
        "Strong academic record",
        "Community involvement",
      ],
      eligibilitySo: [
        "Ugu yaraan GPA 3.5 ama u dhigma",
        "Khibrad hoggaamin la muujiyay",
        "Rikoor waxbarasho oo xoog leh",
        "Ka-qaybgalka bulshada",
      ],
      requirements: [
        "Completed application form",
        "Official transcripts",
        "Two letters of recommendation",
        "Personal essay",
      ],
      deadline: "March 15, 2024",
      renewable: true,
      icon: Award,
      color: "emerald",
    },
    {
      name: "Need-Based Financial Aid",
      nameSo: "Caawimada Maaliyadeed ee Baahida ku salaysan",
      amount: "Up to 75%",
      amountValue: 75,
      description:
        "Comprehensive financial assistance for students demonstrating significant financial need while maintaining good academic standing.",
      descriptionSo:
        "Caawimaad maaliyadeed oo dhamaystiran ardayda muujinaya baahi maaliyadeed oo weyn halka ay hayaan heer waxbarasho oo wanaagsan.",
      eligibility: [
        "Demonstrated financial need",
        "Minimum GPA of 2.5",
        "Somaliland citizenship or residency",
        "Full-time enrollment",
      ],
      eligibilitySo: [
        "Baahi maaliyadeed la muujiyay",
        "Ugu yaraan GPA 2.5",
        "Muwaadiniinta Somaliland ama deganaansho",
        "Diiwaan-gelin buuxa",
      ],
      requirements: [
        "FAFSA or financial aid application",
        "Family income documentation",
        "Tax returns or income statements",
        "Bank statements",
      ],
      deadline: "April 30, 2024",
      renewable: true,
      icon: Heart,
      color: "red",
    },
    {
      name: "Community Leadership Award",
      nameSo: "Abaalmarinta Hogaaminta Bulshada",
      amount: "Up to 30%",
      amountValue: 30,
      description:
        "Recognizes students who have made significant contributions to their communities through volunteer work and leadership initiatives.",
      descriptionSo:
        "Waxay aqoonsataa ardayda ku biiriyay wax weyn bulshaddooda iyagoo ka shaqeeya tabaruc iyo hindisayaal hoggaamin.",
      eligibility: [
        "Minimum 100 hours of community service",
        "Leadership role in community organization",
        "Good academic standing",
        "Strong character references",
      ],
      eligibilitySo: [
        "Ugu yaraan 100 saacadood adeegga bulshada",
        "Door hoggaamin ah urur bulsheed",
        "Heer waxbarasho oo wanaagsan",
        "Tixraac dabeecad oo xoog leh",
      ],
      requirements: [
        "Community service documentation",
        "Leadership portfolio",
        "Character reference letters",
        "Impact statement essay",
      ],
      deadline: "February 28, 2024",
      renewable: false,
      icon: Users,
      color: "blue",
    },
    {
      name: "International Student Grant",
      nameSo: "Deeqda Ardayda Dibadda",
      amount: "Up to 25%",
      amountValue: 25,
      description:
        "Special grant program for international students from East Africa and beyond, promoting cultural diversity and academic exchange.",
      descriptionSo:
        "Barnaamij deeq gaar ah ardayda dibadda ee ka yimid Bariga Afrika iyo meel ka fog, kor u qaadida kala duwanaanta dhaqanka iyo is-dhaafsiga waxbarasho.",
      eligibility: [
        "International student status",
        "Good academic record from home country",
        "English proficiency",
        "Cultural contribution potential",
      ],
      eligibilitySo: [
        "Heerka ardayga dibadda",
        "Rikoor waxbarasho oo wanaagsan dalka hooyo",
        "Awood Ingiriis",
        "Awood wax ku biirin dhaqan",
      ],
      requirements: [
        "International student application",
        "Passport and visa documentation",
        "Translated academic records",
        "English proficiency test scores",
      ],
      deadline: "May 15, 2024",
      renewable: true,
      icon: Star,
      color: "purple",
    },
    {
      name: "Women in STEM Scholarship",
      nameSo: "Deeqda Haweenka STEM-ka",
      amount: "Up to 40%",
      amountValue: 40,
      description:
        "Encouraging women to pursue careers in Science, Technology, Engineering, and Mathematics through targeted financial support.",
      descriptionSo:
        "Dhiirigelinta haweenka inay raacaan shaqooyin Sayniska, Tignoolajiyada, Injineerinta, iyo Xisaabta iyagoo la taageerayo maaliyan.",
      eligibility: ["Female student", "Enrolled in STEM program", "Minimum GPA of 3.0", "Commitment to STEM career"],
      eligibilitySo: [
        "Arday haween ah",
        "Ku diiwaan gashan barnaamij STEM",
        "Ugu yaraan GPA 3.0",
        "Ballan qaadis shaqo STEM",
      ],
      requirements: [
        "STEM program enrollment proof",
        "Academic transcripts",
        "Career goals statement",
        "Faculty recommendation",
      ],
      deadline: "January 31, 2024",
      renewable: true,
      icon: Target,
      color: "pink",
    },
    {
      name: "Entrepreneurship Excellence Award",
      nameSo: "Abaalmarinta Fiicanta Ganacsiga",
      amount: "Up to 35%",
      amountValue: 35,
      description:
        "Supporting future entrepreneurs and business leaders who demonstrate innovation, creativity, and business acumen.",
      descriptionSo:
        "Taageerada ganacsatada mustaqbalka iyo hogaamiyayaasha ganacsiga ee muujinaya hal-abuur, abuur, iyo aqoon ganacsi.",
      eligibility: [
        "Business or entrepreneurship program enrollment",
        "Business plan or startup idea",
        "Innovation potential",
        "Leadership qualities",
      ],
      eligibilitySo: [
        "Ku diiwaan gashan barnaamij ganacsi ama ganacsato",
        "Qorshe ganacsi ama fikrad bilow ah",
        "Awood hal-abuur",
        "Sifooyinka hoggaaminta",
      ],
      requirements: [
        "Business plan submission",
        "Innovation portfolio",
        "Entrepreneurship essay",
        "Mentor recommendation",
      ],
      deadline: "March 31, 2024",
      renewable: false,
      icon: TrendingUp,
      color: "orange",
    },
  ]

  const workStudyPrograms = [
    {
      title: "Campus Research Assistant",
      titleSo: "Kaaliyaha Cilmi-baadhista Campus-ka",
      department: "Research & Development",
      hours: "10-15 hours/week",
      pay: "$8-12/hour",
      description: "Assist faculty with research projects, data collection, and analysis.",
      requirements: ["Good academic standing", "Research interest", "Basic computer skills"],
    },
    {
      title: "Library Assistant",
      titleSo: "Kaaliyaha Maktabadda",
      department: "Academic Library",
      hours: "8-12 hours/week",
      pay: "$7-10/hour",
      description: "Help students with library resources, organize materials, and maintain facilities.",
      requirements: ["Customer service skills", "Organizational abilities", "Flexible schedule"],
    },
    {
      title: "IT Support Technician",
      titleSo: "Takhasuska Taageerada IT",
      department: "Information Technology",
      hours: "12-20 hours/week",
      pay: "$10-15/hour",
      description: "Provide technical support to students and staff, maintain computer labs.",
      requirements: ["IT background", "Problem-solving skills", "Technical certification preferred"],
    },
    {
      title: "Student Mentor",
      titleSo: "La-taliyaha Ardayda",
      department: "Student Affairs",
      hours: "6-10 hours/week",
      pay: "$9-12/hour",
      description: "Guide new students, provide academic support, and facilitate orientation programs.",
      requirements: ["Leadership experience", "Good communication", "Minimum 2nd year student"],
    },
  ]

  const loanPrograms = [
    {
      name: "Federal Student Loan Program",
      nameSo: "Barnaamijka Amaahda Ardayda Federaalka",
      type: "Government Loan",
      interestRate: "3.5% - 5.5%",
      maxAmount: "$15,000/year",
      description: "Low-interest government-backed loans for eligible students.",
      features: ["Flexible repayment", "Grace period", "Income-based options"],
    },
    {
      name: "Unity University Emergency Fund",
      nameSo: "Sanduuqa Degdegga ah ee Jaamacadda Unity",
      type: "Emergency Assistance",
      interestRate: "0% - 2%",
      maxAmount: "$2,500",
      description: "Short-term financial assistance for unexpected emergencies.",
      features: ["Quick approval", "Low/no interest", "Flexible terms"],
    },
    {
      name: "Private Education Loan",
      nameSo: "Amaahda Waxbarasho ee Gaarka ah",
      type: "Private Loan",
      interestRate: "6% - 12%",
      maxAmount: "$25,000/year",
      description: "Private loans from partner financial institutions.",
      features: ["Higher limits", "Competitive rates", "Co-signer options"],
    },
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Complete FAFSA",
      titleSo: "Dhamaystir FAFSA",
      description: "Fill out the Free Application for Federal Student Aid",
      icon: FileText,
    },
    {
      step: 2,
      title: "Submit Documents",
      titleSo: "Gudbi Dukumentiyada",
      description: "Provide required financial and academic documents",
      icon: Upload,
    },
    {
      step: 3,
      title: "Review & Award",
      titleSo: "Dib u eeg & Abaalmarid",
      description: "Financial aid office reviews and determines aid package",
      icon: CheckCircle,
    },
    {
      step: 4,
      title: "Accept Aid",
      titleSo: "Aqbal Caawimada",
      description: "Review and accept your financial aid offer",
      icon: Award,
    },
  ]

  const aidStats = [
    { number: 85, label: "Students Receive Aid", labelSo: "Ardayda Helaya Caawimaad", suffix: "%" },
    { number: 2.5, label: "Million in Aid", labelSo: "Milyan Caawimaad", suffix: "M", prefix: "$" },
    { number: 450, label: "Scholarship Recipients", labelSo: "Helayaasha Deeqda" },
    { number: 95, label: "Aid Satisfaction Rate", labelSo: "Heerka Qanacsanaanta Caawimada", suffix: "%" },
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
                Financial Aid
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Financial <span className="text-emerald-300">Aid</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Caawimada Maaliyadeed</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Don't let financial barriers prevent you from achieving your educational dreams. Explore our comprehensive
              financial aid programs designed to make quality education accessible to all deserving students.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                <Calculator className="mr-3 h-5 w-5" />
                Calculate Aid
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Forms
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aid Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aidStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-emerald-600">
                  {stat.prefix}
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

      {/* Financial Aid Types */}
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
              Types of{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Financial Aid
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Noocyada Caawimada Maaliyadeed</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer various types of financial assistance to help make your education affordable and accessible.
            </p>
          </motion.div>

          <Tabs value={selectedAidType} onValueChange={setSelectedAidType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-2 rounded-xl">
              <TabsTrigger
                value="scholarships"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Scholarships
              </TabsTrigger>
              <TabsTrigger
                value="work-study"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Work-Study
              </TabsTrigger>
              <TabsTrigger
                value="loans"
                className="text-lg font-semibold py-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Loans
              </TabsTrigger>
            </TabsList>

            {/* Scholarships Tab */}
            <TabsContent value="scholarships" className="mt-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {scholarshipPrograms.map((scholarship, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                      <CardHeader className={`bg-gradient-to-r from-${scholarship.color}-50 to-white rounded-t-2xl`}>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 bg-${scholarship.color}-100 rounded-lg mr-3`}>
                              <scholarship.icon className={`h-6 w-6 text-${scholarship.color}-600`} />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{scholarship.name}</h4>
                              <p className="text-sm text-emerald-600 font-semibold">{scholarship.nameSo}</p>
                            </div>
                          </div>
                          <Badge className={`bg-${scholarship.color}-600 text-white text-lg px-3 py-1`}>
                            {scholarship.amount}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <Progress value={scholarship.amountValue} className="mb-2" />
                            <p className="text-sm text-gray-600">{scholarship.description}</p>
                          </div>

                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Eligibility:</h5>
                            <ul className="space-y-1">
                              {scholarship.eligibility.slice(0, 3).map((criteria, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{criteria}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">Deadline</div>
                              <div className="text-xs text-gray-600">{scholarship.deadline}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">Renewable</div>
                              <div className="text-xs text-gray-600">{scholarship.renewable ? "Yes" : "No"}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Work-Study Tab */}
            <TabsContent value="work-study" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2">
                {workStudyPrograms.map((program, index) => (
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
                            <h4 className="text-lg font-bold text-gray-900">{program.title}</h4>
                            <p className="text-sm text-emerald-600 font-semibold">{program.titleSo}</p>
                            <p className="text-sm text-gray-600">{program.department}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-100 text-emerald-800 mb-1">{program.hours}</Badge>
                            <div className="text-lg font-bold text-emerald-600">{program.pay}</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-gray-600">{program.description}</p>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Requirements:</h5>
                            <ul className="space-y-1">
                              {program.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                            Apply for Position
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans" className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                {loanPrograms.map((loan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                      <CardHeader>
                        <CardTitle>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{loan.name}</h4>
                          <p className="text-sm text-emerald-600 font-semibold">{loan.nameSo}</p>
                          <Badge className="mt-2 bg-blue-100 text-blue-800">{loan.type}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">Interest Rate</div>
                              <div className="text-lg font-bold text-blue-600">{loan.interestRate}</div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">Max Amount</div>
                              <div className="text-lg font-bold text-blue-600">{loan.maxAmount}</div>
                            </div>
                          </div>
                          <p className="text-gray-600">{loan.description}</p>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Features:</h5>
                            <ul className="space-y-1">
                              {loan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Learn More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
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
              Application{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Habka Codsiga</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to apply for financial aid and start your journey toward affordable education.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {applicationSteps.map((step, index) => (
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
                    {index < applicationSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300">
                        <ArrowRight className="absolute -top-2 right-4 h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-emerald-600 font-semibold mb-3">{step.titleSo}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
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
                Start Your Application
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
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
              Important{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Dates</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Taariikhaha Muhiimka ah</h3>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-6 w-6 text-emerald-600 mr-3" />
                    Priority Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium">FAFSA Priority Deadline</span>
                      <Badge className="bg-emerald-600 text-white">March 1, 2024</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Scholarship Applications</span>
                      <Badge className="bg-blue-600 text-white">February 15, 2024</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Work-Study Applications</span>
                      <Badge className="bg-purple-600 text-white">April 1, 2024</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                    Final Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Final FAFSA Deadline</span>
                      <Badge className="bg-red-600 text-white">June 30, 2024</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Late Scholarship Review</span>
                      <Badge className="bg-orange-600 text-white">May 15, 2024</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Aid Acceptance Deadline</span>
                      <Badge className="bg-gray-600 text-white">July 15, 2024</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help with Financial Aid?</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">
              Ma u baahan tahay caawimaad caawimada maaliyadeed?
            </h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Our financial aid counselors are here to guide you through the process and help you find the best funding
              options for your education.
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
                  <p className="text-emerald-200">aid@tuu.university</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <Calendar className="h-8 w-8 text-emerald-300" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Office Hours</h4>
                  <p className="text-emerald-200">Mon-Fri 8AM-5PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                Schedule Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                Apply Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
