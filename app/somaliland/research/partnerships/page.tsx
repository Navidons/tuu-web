"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Users,
  Building,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Handshake,
  BookOpen,
  Microscope,
  Heart,
  Leaf,
  Cpu,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react"

import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const partnerships = [
  {
    id: 1,
    name: "University of Oxford",
    country: "United Kingdom",
    type: "Academic Partnership",
    category: "International University",
    established: "2022",
    status: "Active",
    duration: "5 years",
    focus: ["Public Health", "Development Studies", "Environmental Science"],
    description:
      "Collaborative research program focusing on sustainable development and public health initiatives in the Horn of Africa.",
    projects: [
      "Maternal Health Improvement Program",
      "Climate Change Adaptation Strategies",
      "Educational Technology Integration",
    ],
    outcomes: ["15 joint publications", "25 student exchanges", "3 joint research grants ($2.1M)"],
    contact: "partnerships@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 2,
    name: "African Development Bank",
    country: "Côte d'Ivoire",
    type: "Development Partnership",
    category: "International Organization",
    established: "2021",
    status: "Active",
    duration: "7 years",
    focus: ["Economic Development", "Infrastructure", "Financial Inclusion"],
    description: "Strategic partnership for economic research and development projects across East Africa.",
    projects: ["SME Development Initiative", "Digital Financial Services Research", "Infrastructure Impact Assessment"],
    outcomes: ["$5.2M in development funding", "12 policy recommendations adopted", "200+ entrepreneurs trained"],
    contact: "adb-partnership@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 3,
    name: "World Health Organization",
    country: "Switzerland",
    type: "Research Partnership",
    category: "International Organization",
    established: "2020",
    status: "Active",
    duration: "Ongoing",
    focus: ["Public Health", "Disease Prevention", "Health Systems"],
    description: "Collaborative health research and capacity building partnership for improved healthcare delivery.",
    projects: ["Infectious Disease Surveillance", "Healthcare Worker Training", "Community Health Programs"],
    outcomes: [
      "30% reduction in preventable diseases",
      "500+ healthcare workers trained",
      "8 health facilities upgraded",
    ],
    contact: "who-partnership@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 4,
    name: "University of Nairobi",
    country: "Kenya",
    type: "Academic Partnership",
    category: "Regional University",
    established: "2019",
    status: "Active",
    duration: "10 years",
    focus: ["Agriculture", "Veterinary Science", "Environmental Studies"],
    description: "Regional academic collaboration for agricultural research and sustainable farming practices.",
    projects: [
      "Drought-Resistant Crop Development",
      "Livestock Disease Prevention",
      "Sustainable Agriculture Training",
    ],
    outcomes: ["20 new crop varieties developed", "150 farmers trained annually", "5 joint degree programs"],
    contact: "nairobi-partnership@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 5,
    name: "Microsoft Africa",
    country: "South Africa",
    type: "Technology Partnership",
    category: "Private Sector",
    established: "2023",
    status: "Active",
    duration: "3 years",
    focus: ["Digital Innovation", "AI Research", "Technology Education"],
    description:
      "Technology partnership for digital innovation and AI research applications in education and development.",
    projects: ["AI for Education Platform", "Digital Skills Training", "Cloud Computing Research"],
    outcomes: ["1,000+ students trained in AI", "5 AI applications developed", "$500K in technology grants"],
    contact: "microsoft-partnership@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 6,
    name: "USAID",
    country: "United States",
    type: "Development Partnership",
    category: "Government Agency",
    established: "2018",
    status: "Active",
    duration: "8 years",
    focus: ["Education", "Governance", "Economic Growth"],
    description: "Long-term development partnership focusing on education, governance, and economic empowerment.",
    projects: ["Higher Education Capacity Building", "Democratic Governance Research", "Women's Economic Empowerment"],
    outcomes: ["$8.5M in development funding", "2,000+ students benefited", "15 governance studies completed"],
    contact: "usaid-partnership@unity.edu.so",
    logo: "/placeholder.svg?height=60&width=120",
  },
]

const partnershipStats = {
  totalPartners: 24,
  activeProjects: 45,
  totalFunding: "$18.7M",
  countries: 15,
  studentExchanges: 156,
  jointPublications: 89,
}

const categoryIcons = {
  "International University": GraduationCap,
  "Regional University": BookOpen,
  "International Organization": Globe,
  "Government Agency": Building,
  "Private Sector": Briefcase,
}

const focusIcons = {
  "Public Health": Heart,
  "Environmental Science": Leaf,
  "Digital Innovation": Cpu,
  "Economic Development": TrendingUp,
  Education: GraduationCap,
  Agriculture: Leaf,
  "Technology Education": Cpu,
}

export default function PartnershipsPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null)

  const types = ["all", ...Array.from(new Set(partnerships.map((p) => p.type)))]

  const filteredPartners = partnerships.filter((partner) => selectedType === "all" || partner.type === selectedType)

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Research Partnerships</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Building bridges for collaborative research and global impact
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Statistics */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Partnership Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{partnershipStats.totalPartners}</div>
                <div className="text-gray-600 text-sm">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{partnershipStats.activeProjects}</div>
                <div className="text-gray-600 text-sm">Joint Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{partnershipStats.totalFunding}</div>
                <div className="text-gray-600 text-sm">Total Funding</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{partnershipStats.countries}</div>
                <div className="text-gray-600 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{partnershipStats.studentExchanges}</div>
                <div className="text-gray-600 text-sm">Student Exchanges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{partnershipStats.jointPublications}</div>
                <div className="text-gray-600 text-sm">Joint Publications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Types Filter */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full max-w-4xl mx-auto">
                {types.map((type) => (
                  <TabsTrigger key={type} value={type} className="text-xs">
                    {type === "all" ? "All Partners" : type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Partnerships Grid */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPartners.map((partner) => {
                const CategoryIcon = categoryIcons[partner.category as keyof typeof categoryIcons]
                return (
                  <Card key={partner.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            className="w-12 h-12 object-contain"
                          />
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {partner.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{partner.country}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={
                            partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {partner.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                        {partner.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{partner.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Est. {partner.established}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span>{partner.duration}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Focus Areas:</h4>
                          <div className="flex flex-wrap gap-1">
                            {partner.focus.slice(0, 3).map((focus, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {focus}
                              </Badge>
                            ))}
                            {partner.focus.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{partner.focus.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => setSelectedPartner(partner.id)}
                          >
                            View Details
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

        {/* Detailed Partnership Modal */}
        {selectedPartner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const partner = partnerships.find((p) => p.id === selectedPartner)!
                return (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <h2 className="text-2xl font-bold">{partner.name}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{partner.type}</Badge>
                            <Badge
                              className={
                                partner.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {partner.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" onClick={() => setSelectedPartner(null)}>
                        ×
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Partnership Overview</h3>
                          <p className="text-gray-600 mb-4">{partner.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Established:</span>
                              <div className="text-gray-600">{partner.established}</div>
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span>
                              <div className="text-gray-600">{partner.duration}</div>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <div className="text-gray-600">{partner.country}</div>
                            </div>
                            <div>
                              <span className="font-medium">Status:</span>
                              <div className="text-gray-600">{partner.status}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Focus Areas</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {partner.focus.map((focus, index) => (
                              <Badge key={index} variant="outline">
                                {focus}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Active Projects</h3>
                          <ul className="space-y-2">
                            {partner.projects.map((project, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Microscope className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Outcomes</h3>
                          <ul className="space-y-2">
                            {partner.outcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">Partnership Office</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${partner.contact}`} className="text-green-600 hover:underline">
                                {partner.contact}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Handshake className="mr-2 h-4 w-4" />
                            Explore Collaboration
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

        {/* Partnership Benefits */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Global Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access to international networks and collaborative opportunities across 15 countries.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    Research Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Enhanced research capacity and increased citation impact through collaborative publications.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Funding Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access to joint funding opportunities and shared resources for large-scale projects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our global network of research partners and create meaningful impact together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Partnership Opportunities
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Partnership Office
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
