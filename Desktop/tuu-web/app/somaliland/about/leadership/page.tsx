"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Award, GraduationCap, Briefcase, ExternalLink } from "lucide-react"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const leadership = [
  {
    id: 1,
    name: "Dr. Ahmed Hassan Mohamed",
    position: "President & Vice-Chancellor",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Ahmed Hassan Mohamed brings over 25 years of experience in higher education leadership and international development. He holds a PhD in Educational Leadership from Oxford University and has served in various academic and administrative roles across Africa and Europe.",
    education: [
      "PhD in Educational Leadership, University of Oxford",
      "MSc in Development Studies, London School of Economics",
      "BA in Political Science, University of Nairobi",
    ],
    experience: [
      "President, Unity University (2015-Present)",
      "Vice-Rector, University of Hargeisa (2010-2015)",
      "Director of Academic Affairs, African Development Bank (2005-2010)",
      "Senior Lecturer, University of Nairobi (2000-2005)",
    ],
    achievements: [
      "Led Unity University to international accreditation",
      "Secured over $20M in research funding",
      "Published 45+ peer-reviewed articles",
      "Recipient of African Education Leadership Award 2023",
    ],
    contact: {
      email: "president@unity.edu.so",
      phone: "+252 63 100 0001",
      office: "Presidential Suite, Administration Building",
    },
    specializations: ["Higher Education Leadership", "Development Studies", "Policy Development"],
  },
  {
    id: 2,
    name: "Prof. Fatima Ahmed Hersi",
    position: "Vice-President for Academic Affairs",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Prof. Fatima Ahmed Hersi is a distinguished academic leader with expertise in curriculum development and quality assurance. She has been instrumental in establishing Unity University's academic excellence standards and international partnerships.",
    education: [
      "PhD in Curriculum and Instruction, University of Toronto",
      "MEd in Educational Psychology, McGill University",
      "BSc in Mathematics, Addis Ababa University",
    ],
    experience: [
      "Vice-President for Academic Affairs, Unity University (2016-Present)",
      "Dean of Education, University of Hargeisa (2012-2016)",
      "Associate Professor, Addis Ababa University (2008-2012)",
      "Curriculum Specialist, UNESCO (2005-2008)",
    ],
    achievements: [
      "Developed 15+ innovative academic programs",
      "Led accreditation processes for all university programs",
      "Established partnerships with 12 international universities",
      "Published 35+ research papers in education",
    ],
    contact: {
      email: "vpacademic@unity.edu.so",
      phone: "+252 63 100 0002",
      office: "Academic Affairs Office, Administration Building",
    },
    specializations: ["Curriculum Development", "Quality Assurance", "Educational Technology"],
  },
  {
    id: 3,
    name: "Dr. Omar Jama Ali",
    position: "Vice-President for Research & Innovation",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Omar Jama Ali leads Unity University's research initiatives and innovation programs. With a background in environmental science and sustainable development, he has been pivotal in establishing the university's research centers and securing international funding.",
    education: [
      "PhD in Environmental Science, University of Cambridge",
      "MSc in Sustainable Development, Imperial College London",
      "BSc in Environmental Engineering, University of Nairobi",
    ],
    experience: [
      "Vice-President for Research & Innovation, Unity University (2017-Present)",
      "Director, Center for Sustainable Development (2015-2017)",
      "Senior Research Fellow, International Institute for Environment (2010-2015)",
      "Environmental Consultant, World Bank (2007-2010)",
    ],
    achievements: [
      "Secured $15M+ in research grants",
      "Established 6 research centers",
      "Published 60+ peer-reviewed papers",
      "Led climate change adaptation projects across East Africa",
    ],
    contact: {
      email: "vpresearch@unity.edu.so",
      phone: "+252 63 100 0003",
      office: "Research Office, Science Building",
    },
    specializations: ["Environmental Science", "Climate Change", "Sustainable Development"],
  },
  {
    id: 4,
    name: "Dr. Sahra Ibrahim Duale",
    position: "Dean of Business School",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Sahra Ibrahim Duale is a renowned business educator and entrepreneur who has transformed business education at Unity University. She brings extensive experience from both academia and the private sector.",
    education: [
      "PhD in Business Administration, INSEAD",
      "MBA in Finance, London Business School",
      "BCom in Accounting, University of Cape Town",
    ],
    experience: [
      "Dean of Business School, Unity University (2018-Present)",
      "Associate Professor of Finance, American University of Beirut (2014-2018)",
      "Senior Manager, McKinsey & Company (2010-2014)",
      "Financial Analyst, Standard Bank (2007-2010)",
    ],
    achievements: [
      "Launched Business Innovation Hub",
      "Established partnerships with 8 multinational corporations",
      "Mentored 50+ successful startups",
      "Published 25+ articles in top business journals",
    ],
    contact: {
      email: "dean.business@unity.edu.so",
      phone: "+252 63 200 0001",
      office: "Dean's Office, Business School Building",
    },
    specializations: ["Entrepreneurship", "Finance", "Strategic Management"],
  },
  {
    id: 5,
    name: "Dr. Mohamed Yusuf Abdi",
    position: "Dean of Medical Sciences",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Mohamed Yusuf Abdi is a distinguished physician and medical educator who has been instrumental in establishing Unity University's medical programs and public health initiatives.",
    education: [
      "MD, Harvard Medical School",
      "MPH in Epidemiology, Johns Hopkins University",
      "BSc in Biology, University of California, Berkeley",
    ],
    experience: [
      "Dean of Medical Sciences, Unity University (2017-Present)",
      "Chief Medical Officer, Hargeisa General Hospital (2012-2017)",
      "Senior Physician, Médecins Sans Frontières (2008-2012)",
      "Resident Physician, Massachusetts General Hospital (2005-2008)",
    ],
    achievements: [
      "Established medical school with 95% USMLE pass rate",
      "Led COVID-19 response for Somaliland",
      "Reduced maternal mortality by 30% in target regions",
      "Published 40+ medical research papers",
    ],
    contact: {
      email: "dean.medical@unity.edu.so",
      phone: "+252 63 200 0002",
      office: "Dean's Office, Medical Sciences Building",
    },
    specializations: ["Public Health", "Epidemiology", "Healthcare Management"],
  },
  {
    id: 6,
    name: "Prof. Amina Hassan Mohamed",
    position: "Dean of Social Sciences",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Prof. Amina Hassan Mohamed is a leading scholar in African studies and political science. She directs the Horn of Africa Studies Institute and has been influential in policy development across the region.",
    education: [
      "PhD in Political Science, University of Oxford",
      "MA in African Studies, School of Oriental and African Studies (SOAS)",
      "BA in History, University of Nairobi",
    ],
    experience: [
      "Dean of Social Sciences, Unity University (2016-Present)",
      "Director, Horn of Africa Studies Institute (2015-Present)",
      "Associate Professor, University of Nairobi (2010-2016)",
      "Research Fellow, Institute for Security Studies (2007-2010)",
    ],
    achievements: [
      "Advised 5 African governments on policy development",
      "Published 3 books on Horn of Africa politics",
      "Led 12 international research projects",
      "Recipient of African Scholar Award 2022",
    ],
    contact: {
      email: "dean.social@unity.edu.so",
      phone: "+252 63 200 0003",
      office: "Dean's Office, Social Sciences Building",
    },
    specializations: ["Political Science", "African Studies", "Conflict Resolution"],
  },
  {
    id: 7,
    name: "Dr. Hassan Ali Farah",
    position: "Registrar",
    category: "Administration",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Hassan Ali Farah oversees all academic records, student services, and administrative operations. His efficient management has been crucial to the university's smooth operations and student satisfaction.",
    education: [
      "PhD in Educational Administration, University of Edinburgh",
      "MSc in Management, University of Manchester",
      "BA in Public Administration, Makerere University",
    ],
    experience: [
      "Registrar, Unity University (2015-Present)",
      "Deputy Registrar, University of Hargeisa (2010-2015)",
      "Administrative Officer, Ministry of Education (2005-2010)",
      "Program Coordinator, UNICEF Somalia (2002-2005)",
    ],
    achievements: [
      "Implemented digital student information system",
      "Achieved 98% student satisfaction rate",
      "Streamlined admission processes",
      "Established alumni network of 2,500+ graduates",
    ],
    contact: {
      email: "registrar@unity.edu.so",
      phone: "+252 63 300 0001",
      office: "Registrar's Office, Administration Building",
    },
    specializations: ["Educational Administration", "Student Services", "Quality Management"],
  },
  {
    id: 8,
    name: "Ms. Khadija Omar Said",
    position: "Director of Finance",
    category: "Administration",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ms. Khadija Omar Said brings extensive financial management experience to Unity University. She has been instrumental in securing funding and maintaining the university's financial stability.",
    education: [
      "MBA in Finance, University of Cape Town",
      "CPA Certification, Institute of Certified Public Accountants",
      "BCom in Accounting, University of Nairobi",
    ],
    experience: [
      "Director of Finance, Unity University (2016-Present)",
      "Senior Financial Manager, African Development Bank (2012-2016)",
      "Finance Manager, World Vision Somalia (2008-2012)",
      "Senior Accountant, PricewaterhouseCoopers (2005-2008)",
    ],
    achievements: [
      "Managed $50M+ in university finances",
      "Secured $20M in development funding",
      "Implemented transparent financial reporting systems",
      "Achieved clean audit reports for 8 consecutive years",
    ],
    contact: {
      email: "finance@unity.edu.so",
      phone: "+252 63 300 0002",
      office: "Finance Office, Administration Building",
    },
    specializations: ["Financial Management", "Budget Planning", "Grant Management"],
  },
]

const boardMembers = [
  {
    name: "Hon. Edna Adan Ismail",
    position: "Chairperson, Board of Trustees",
    background: "Former Foreign Minister of Somaliland, Founder of Edna Adan Hospital",
  },
  {
    name: "Dr. Jama Musse Jama",
    position: "Vice-Chairperson",
    background: "Founder of Redsea Cultural Foundation, Cultural Heritage Expert",
  },
  {
    name: "Mr. Saad Ali Shire",
    position: "Board Member",
    background: "Former Minister of Finance, Economic Development Expert",
  },
  {
    name: "Prof. Ahmed Ismail Samatar",
    position: "Board Member",
    background: "Professor Emeritus, Macalester College, Political Scientist",
  },
  {
    name: "Dr. Shukri Haji Ismail",
    position: "Board Member",
    background: "Former Minister of Health, Public Health Expert",
  },
]

export default function LeadershipPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null)

  const categories = ["all", ...Array.from(new Set(leadership.map((l) => l.category)))]

  const filteredLeadership = leadership.filter(
    (leader) => selectedCategory === "all" || leader.category === selectedCategory,
  )

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Leadership</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Meet the visionary leaders driving Unity University's mission of excellence
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Categories */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-sm">
                    {category === "all" ? "All Leaders" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLeadership.map((leader) => (
                <Card key={leader.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <Badge className="mb-2 bg-green-100 text-green-800">{leader.category}</Badge>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                      {leader.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium">{leader.position}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 text-sm line-clamp-3">{leader.bio}</p>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-1">
                          {leader.specializations.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {leader.specializations.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{leader.specializations.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => setSelectedLeader(leader.id)}
                        >
                          View Profile
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Board of Trustees */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Board of Trustees</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 text-center mb-8">
                Our distinguished Board of Trustees provides strategic guidance and oversight, ensuring Unity University
                maintains its commitment to excellence and serves the needs of Somaliland and the region.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {boardMembers.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                      <p className="text-green-600 font-medium mb-3">{member.position}</p>
                      <p className="text-gray-600 text-sm">{member.background}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Leader Modal */}
        {selectedLeader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const leader = leadership.find((l) => l.id === selectedLeader)!
                return (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={leader.image || "/placeholder.svg"}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-1">{leader.name}</h2>
                          <p className="text-lg text-green-600 font-medium mb-2">{leader.position}</p>
                          <Badge className="bg-green-100 text-green-800">{leader.category}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => setSelectedLeader(null)}>
                        ×
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Biography</h3>
                          <p className="text-gray-700 leading-relaxed">{leader.bio}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Education</h3>
                          <ul className="space-y-2">
                            {leader.education.map((edu, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <GraduationCap className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                          <div className="flex flex-wrap gap-2">
                            {leader.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Professional Experience</h3>
                          <ul className="space-y-2">
                            {leader.experience.map((exp, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Briefcase className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{exp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Achievements</h3>
                          <ul className="space-y-2">
                            {leader.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Award className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${leader.contact.email}`} className="text-green-600 hover:underline">
                                {leader.contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{leader.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{leader.contact.office}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Leadership Team</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Unity University is always seeking exceptional leaders to join our mission of educational excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Career Opportunities
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Leadership
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
