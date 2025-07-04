"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Search,
  Users,
  BookOpen,
  Award,
  Globe,
  Microscope,
  Cpu,
  Heart,
  Leaf,
  Building,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react"

import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const researchCenters = [
  {
    id: 1,
    name: "Horn of Africa Studies Institute",
    category: "Social Sciences",
    description:
      "Leading research on regional politics, economics, and cultural heritage of the Horn of Africa region.",
    director: "Dr. Amina Hassan Mohamed",
    established: "2018",
    staff: 15,
    projects: 8,
    funding: "$2.5M",
    focus: ["Regional Politics", "Economic Development", "Cultural Heritage", "Conflict Resolution"],
    achievements: [
      "Published 45+ peer-reviewed papers",
      "Advised 3 government policy initiatives",
      "Hosted 12 international conferences",
    ],
    contact: {
      email: "hoai@unity.edu.so",
      phone: "+252 63 123 4567",
      location: "Building A, Floor 3",
    },
  },
  {
    id: 2,
    name: "Center for Sustainable Development",
    category: "Environmental",
    description: "Advancing sustainable development practices and environmental conservation in Somaliland.",
    director: "Dr. Omar Jama Ali",
    established: "2019",
    staff: 12,
    projects: 6,
    funding: "$1.8M",
    focus: ["Climate Change", "Water Resources", "Renewable Energy", "Agricultural Innovation"],
    achievements: [
      "Developed 3 water conservation projects",
      "Trained 200+ farmers in sustainable practices",
      "Established solar energy pilot program",
    ],
    contact: {
      email: "csd@unity.edu.so",
      phone: "+252 63 234 5678",
      location: "Environmental Sciences Building",
    },
  },
  {
    id: 3,
    name: "Digital Innovation Lab",
    category: "Technology",
    description: "Pioneering digital solutions and technology innovation for local and regional challenges.",
    director: "Dr. Fatima Ahmed Hersi",
    established: "2020",
    staff: 18,
    projects: 12,
    funding: "$3.2M",
    focus: ["Mobile Technology", "E-Government", "Digital Health", "Fintech Solutions"],
    achievements: [
      "Launched 5 mobile applications",
      "Partnered with 8 tech companies",
      "Trained 500+ students in coding",
    ],
    contact: {
      email: "dilab@unity.edu.so",
      phone: "+252 63 345 6789",
      location: "Technology Center, Floor 2",
    },
  },
  {
    id: 4,
    name: "Public Health Research Center",
    category: "Health",
    description: "Conducting vital health research to improve healthcare outcomes in Somaliland and the region.",
    director: "Dr. Mohamed Yusuf Abdi",
    established: "2017",
    staff: 20,
    projects: 10,
    funding: "$4.1M",
    focus: ["Maternal Health", "Infectious Diseases", "Nutrition", "Health Systems"],
    achievements: [
      "Reduced maternal mortality by 15%",
      "Published 60+ medical research papers",
      "Trained 300+ healthcare workers",
    ],
    contact: {
      email: "phrc@unity.edu.so",
      phone: "+252 63 456 7890",
      location: "Medical Sciences Building",
    },
  },
  {
    id: 5,
    name: "Business Innovation Hub",
    category: "Business",
    description: "Supporting entrepreneurship and business development through research and incubation programs.",
    director: "Dr. Sahra Ibrahim Duale",
    established: "2021",
    staff: 10,
    projects: 15,
    funding: "$2.0M",
    focus: ["Entrepreneurship", "SME Development", "Market Research", "Financial Inclusion"],
    achievements: ["Incubated 25 startups", "Created 150+ jobs", "Secured $800K in startup funding"],
    contact: {
      email: "bih@unity.edu.so",
      phone: "+252 63 567 8901",
      location: "Business School, Floor 1",
    },
  },
  {
    id: 6,
    name: "Educational Research Institute",
    category: "Education",
    description: "Advancing educational methodologies and policies to improve learning outcomes across Somaliland.",
    director: "Dr. Ahmed Hassan Farah",
    established: "2019",
    staff: 14,
    projects: 7,
    funding: "$1.5M",
    focus: ["Curriculum Development", "Teacher Training", "Educational Technology", "Literacy Programs"],
    achievements: [
      "Developed new curriculum for 50+ schools",
      "Trained 400+ teachers",
      "Improved literacy rates by 20%",
    ],
    contact: {
      email: "eri@unity.edu.so",
      phone: "+252 63 678 9012",
      location: "Education Building, Floor 2",
    },
  },
]

const categoryIcons = {
  "Social Sciences": Globe,
  Environmental: Leaf,
  Technology: Cpu,
  Health: Heart,
  Business: Briefcase,
  Education: GraduationCap,
}

const categoryColors = {
  "Social Sciences": "bg-blue-100 text-blue-800",
  Environmental: "bg-green-100 text-green-800",
  Technology: "bg-purple-100 text-purple-800",
  Health: "bg-red-100 text-red-800",
  Business: "bg-orange-100 text-orange-800",
  Education: "bg-indigo-100 text-indigo-800",
}

export default function ResearchCentersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)

  const filteredCenters = researchCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.focus.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || center.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(researchCenters.map((c) => c.category)))]

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Research Centers</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Discover our world-class research institutes driving innovation and knowledge creation
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                <div className="text-gray-600">Research Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">89</div>
                <div className="text-gray-600">Research Staff</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">58</div>
                <div className="text-gray-600">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">$15.1M</div>
                <div className="text-gray-600">Total Funding</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search research centers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {category === "all" ? "All" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Research Centers Grid */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCenters.map((center) => {
                const IconComponent = categoryIcons[center.category as keyof typeof categoryIcons]
                return (
                  <Card key={center.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <Badge className={categoryColors[center.category as keyof typeof categoryColors]}>
                              {center.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                        {center.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{center.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{center.staff} Staff</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span>{center.projects} Projects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span>Est. {center.established}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Microscope className="h-4 w-4 text-gray-400" />
                            <span>{center.funding}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Research Focus:</h4>
                          <div className="flex flex-wrap gap-1">
                            {center.focus.slice(0, 3).map((focus, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {focus}
                              </Badge>
                            ))}
                            {center.focus.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{center.focus.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => setSelectedCenter(center.id)}
                          >
                            Learn More
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detailed View Modal */}
        {selectedCenter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const center = researchCenters.find((c) => c.id === selectedCenter)!
                const IconComponent = categoryIcons[center.category as keyof typeof categoryIcons]
                return (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <IconComponent className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{center.name}</h2>
                          <Badge className={categoryColors[center.category as keyof typeof categoryColors]}>
                            {center.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => setSelectedCenter(null)}>
                        ×
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">About</h3>
                          <p className="text-gray-600">{center.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Research Focus Areas</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {center.focus.map((focus, index) => (
                              <Badge key={index} variant="outline">
                                {focus}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Achievements</h3>
                          <ul className="space-y-2">
                            {center.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Award className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Center Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Director</div>
                                <div className="text-gray-600">{center.director}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Building className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Established</div>
                                <div className="text-gray-600">{center.established}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Research Staff</div>
                                <div className="text-gray-600">{center.staff} members</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Active Projects</div>
                                <div className="text-gray-600">{center.projects} ongoing</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Award className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">Total Funding</div>
                                <div className="text-gray-600">{center.funding}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-gray-400" />
                              <a href={`mailto:${center.contact.email}`} className="text-green-600 hover:underline">
                                {center.contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-600">{center.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-600">{center.contact.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Visit Center Website
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
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
            <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Collaborate with leading researchers and contribute to groundbreaking discoveries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Research Opportunities
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Research Office
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
