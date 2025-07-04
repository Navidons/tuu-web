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
    name: "Prof. PLO Lumumba",
    position: "Vice-Chancellor",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Prof. PLO Lumumba is the distinguished Vice-Chancellor of Unity University, bringing decades of experience in education, law, and African development. A renowned Pan-African thought leader and former Director of Kenya Anti-Corruption Commission.",
    education: [
      "LLB, University of Nairobi",
      "LLM, University of Nairobi", 
      "PhD in Law, University of Nairobi",
    ],
    experience: [
      "Vice-Chancellor, Unity University (2021-Present)",
      "Former Director, Kenya Anti-Corruption Commission",
      "Renowned Pan-African thought leader and speaker",
      "Author and international legal expert",
    ],
    achievements: [
      "Led Unity University from founding to international recognition",
      "Expert in constitutional law and governance",
      "Author of numerous publications on African development",
      "Recipient of multiple Pan-African leadership awards",
    ],
    contact: {
      email: "vc@tuu.university",
      phone: "+252 63 4210013",
      office: "Vice-Chancellor's Office, Administration Building",
    },
    specializations: ["Constitutional Law", "Pan-African Development", "Educational Leadership"],
  },
  {
    id: 2,
    name: "Dr. Katerega David",
    position: "Deputy Vice-Chancellor",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Katerega David serves as the Deputy Vice-Chancellor, overseeing academic operations and strategic development across both campuses. He brings extensive experience in higher education leadership and Pan-African education.",
    education: [
      "PhD in Educational Administration",
      "Master's in Higher Education Management",
      "Bachelor's in Education",
    ],
    experience: [
      "Deputy Vice-Chancellor, Unity University (2021-Present)",
      "20+ years in higher education leadership",
      "Expert in academic quality assurance",
      "Champion of Pan-African education initiatives",
    ],
    achievements: [
      "Oversees academic operations across both campuses",
      "Expert in academic quality assurance systems",
      "Led strategic planning and institutional development",
      "Advocate for Pan-African educational collaboration",
    ],
    contact: {
      email: "dvc@tuu.university",
      phone: "+252 637 235142",
      office: "Deputy VC Office, Administration Building",
    },
    specializations: ["Educational Administration", "Quality Assurance", "Strategic Planning"],
  },
  {
    id: 3,
    name: "Dr. Zakaria",
    position: "Project Manager",
    category: "Executive",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Dr. Zakaria leads strategic projects and initiatives that drive Unity University's growth and impact across the continent. He oversees major development projects and institutional partnerships.",
    education: [
      "PhD in Project Management",
      "Master's in Development Studies",
      "Bachelor's in Management",
    ],
    experience: [
      "Project Manager, Unity University (2021-Present)",
      "Expert in institutional project management",
      "Led major campus development initiatives",
      "International development consultant",
    ],
    achievements: [
      "Managed establishment of Liberia campus expansion",
      "Led major infrastructure development projects",
      "Coordinated international partnership agreements",
      "Expert in strategic project implementation",
    ],
    contact: {
      email: "projects@tuu.university",
      phone: "+252 637 235143",
      office: "Project Management Office, Administration Building",
    },
    specializations: ["Project Management", "Strategic Development", "International Partnerships"],
  },
  {
    id: 4,
    name: "Kaggwa Robert Abubaker",
    position: "Dean of Student Affairs",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Kaggwa Robert Abubaker oversees student life, welfare, and development programs across Unity University's campuses. He is dedicated to holistic student development and community engagement.",
    education: [
      "Master's in Student Affairs Administration",
      "Bachelor's in Social Sciences",
      "Diploma in Youth Development",
    ],
    experience: [
      "Dean of Student Affairs, Unity University (2021-Present)",
      "Champion of student welfare and development",
      "Expert in student leadership programs",
      "Community engagement specialist",
    ],
    achievements: [
      "Developed comprehensive student support programs",
      "Established student leadership development initiatives",
      "Led community engagement and outreach programs",
      "Advocate for holistic student development",
    ],
    contact: {
      email: "studentaffairs@tuu.university", 
      phone: "+252 63 4210013",
      office: "Student Affairs Office, Student Center",
    },
    specializations: ["Student Affairs", "Leadership Development", "Community Engagement"],
  },
  {
    id: 5,
    name: "Ganja Martin",
    position: "Dean, Faculty of Education",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ganja Martin leads the Faculty of Education, focusing on innovative teacher preparation and educational leadership programs that serve the educational needs of Somaliland and the region.",
    education: [
      "PhD in Education",
      "Master's in Educational Leadership",
      "Bachelor's in Education",
    ],
    experience: [
      "Dean, Faculty of Education, Unity University (2021-Present)",
      "Expert in teacher preparation and development",
      "Educational innovation specialist",
      "Community education advocate",
    ],
    achievements: [
      "Established comprehensive education programs",
      "Led teacher training and development initiatives",
      "Developed community education outreach programs",
      "Expert in educational innovation and reform",
    ],
    contact: {
      email: "education@tuu.university",
      phone: "+252 63 4210013",
      office: "Education Faculty Office, Academic Building",
    },
    specializations: ["Educational Leadership", "Teacher Development", "Educational Innovation"],
  },
  {
    id: 6,
    name: "Lutaaya Daniel",
    position: "Dean, Faculty of Social Sciences",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Lutaaya Daniel leads the Faculty of Social Sciences, advancing social research and community development initiatives that address critical challenges in Somaliland and the Horn of Africa.",
    education: [
      "PhD in Social Sciences",
      "Master's in Development Studies",
      "Bachelor's in Social Work",
    ],
    experience: [
      "Dean, Faculty of Social Sciences, Unity University (2021-Present)",
      "Expert in social research and development",
      "Community development specialist",
      "Policy research and analysis expert",
    ],
    achievements: [
      "Developed comprehensive social sciences programs",
      "Led community development research initiatives",
      "Established partnerships with local organizations",
      "Expert in social policy and development",
    ],
    contact: {
      email: "socialsciences@tuu.university",
      phone: "+252 637 707788",
      office: "Social Sciences Faculty Office, Academic Building",
    },
    specializations: ["Social Sciences", "Community Development", "Policy Research"],
  },
  {
    id: 7,
    name: "Samson Kigozi",
    position: "Dean, Faculty of Allied Health Sciences",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Samson Kigozi leads the Faculty of Allied Health Sciences, promoting health education and community wellness programs that address critical health challenges in the region.",
    education: [
      "PhD in Public Health",
      "Master's in Health Sciences",
      "Bachelor's in Health Sciences",
    ],
    experience: [
      "Dean, Faculty of Allied Health Sciences, Unity University (2021-Present)",
      "Expert in public health and community wellness",
      "Health education specialist",
      "Community health advocate",
    ],
    achievements: [
      "Established comprehensive health sciences programs",
      "Led community health outreach initiatives",
      "Developed partnerships with health organizations",
      "Expert in public health and nutrition programs",
    ],
    contact: {
      email: "healthsciences@tuu.university",
      phone: "+252 63 4210013",
      office: "Health Sciences Faculty Office, Medical Building",
    },
    specializations: ["Public Health", "Community Wellness", "Health Education"],
  },
  {
    id: 8,
    name: "Leo Wamala",
    position: "Dean, Faculty of Computing & Information Technology",
    category: "Academic",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Leo Wamala leads the Faculty of Computing & Information Technology, driving technological innovation and digital transformation initiatives that position Unity University at the forefront of technology education.",
    education: [
      "PhD in Computer Science",
      "Master's in Information Technology",
      "Bachelor's in Computer Engineering",
    ],
    experience: [
      "Dean, Faculty of Computing & IT, Unity University (2021-Present)",
      "Expert in technological innovation and development",
      "Digital transformation specialist",
      "Technology education advocate",
    ],
    achievements: [
      "Established cutting-edge computing programs",
      "Led digital innovation and transformation initiatives",
      "Developed partnerships with technology companies",
      "Expert in software engineering and IT systems",
    ],
    contact: {
      email: "computing@tuu.university",
      phone: "+252 637 235142",
      office: "Computing Faculty Office, Technology Building",
    },
    specializations: ["Computer Science", "Digital Innovation", "Technology Education"],
  },
  {
    id: 9,
    name: "Semakalu Ronald",
    position: "Director, Foundation Programmes",
    category: "Administration",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Semakalu Ronald directs the Foundation Programmes at Unity University, ensuring academic preparedness and foundational skills development for incoming students across all faculties.",
    education: [
      "Master's in Educational Development",
      "Bachelor's in Education",
      "Diploma in Academic Support",
    ],
    experience: [
      "Director, Foundation Programmes, Unity University (2021-Present)",
      "Academic preparedness specialist",
      "Foundational skills development expert",
      "Student success advocate",
    ],
    achievements: [
      "Developed comprehensive foundation programs",
      "Established academic preparedness standards",
      "Led student success and retention initiatives",
      "Expert in foundational skills assessment",
    ],
    contact: {
      email: "foundation@tuu.university",
      phone: "+252 63 4210013",
      office: "Foundation Programmes Office, Academic Building",
    },
    specializations: ["Foundation Education", "Academic Preparedness", "Student Success"],
  },
  {
    id: 10,
    name: "Kirinya Robert",
    position: "Director, Quality Assurance",
    category: "Administration",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Kirinya Robert oversees quality assurance processes at Unity University, ensuring the maintenance of academic excellence and institutional standards across all programs and campuses.",
    education: [
      "PhD in Quality Management",
      "Master's in Educational Assessment",
      "Bachelor's in Management",
    ],
    experience: [
      "Director, Quality Assurance, Unity University (2021-Present)",
      "Expert in academic quality standards",
      "Institutional assessment specialist",
      "Continuous improvement advocate",
    ],
    achievements: [
      "Implemented comprehensive quality assurance systems",
      "Led institutional accreditation processes",
      "Established continuous improvement protocols",
      "Expert in academic standards compliance",
    ],
    contact: {
      email: "quality@tuu.university",
      phone: "+252 637 235142",
      office: "Quality Assurance Office, Administration Building",
    },
    specializations: ["Quality Assurance", "Academic Standards", "Institutional Assessment"],
  },
  {
    id: 11,
    name: "Kavuma Yusuf Musa",
    position: "Campus Director",
    category: "Administration",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Kavuma Yusuf Musa serves as Campus Director, overseeing campus operations and strategic development to ensure smooth functioning and growth of Unity University facilities and services.",
    education: [
      "Master's in Campus Management",
      "Bachelor's in Administration",
      "Diploma in Facilities Management",
    ],
    experience: [
      "Campus Director, Unity University (2021-Present)",
      "Campus operations specialist",
      "Strategic development expert",
      "Facilities management professional",
    ],
    achievements: [
      "Managed campus operations and development",
      "Led infrastructure improvement projects",
      "Established efficient campus service systems",
      "Expert in strategic campus planning",
    ],
    contact: {
      email: "campus@tuu.university",
      phone: "+252 637 707788",
      office: "Campus Director's Office, Administration Building",
    },
    specializations: ["Campus Management", "Strategic Development", "Operations Management"],
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
