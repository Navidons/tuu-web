"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  Users,
  Calendar,
  ExternalLink,
  Download,
  Eye,
  Quote,
  TrendingUp,
  FileText,
  Globe,
  BarChart3,
} from "lucide-react"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const publications = [
  {
    id: 1,
    title: "Sustainable Water Management in Arid Regions: A Case Study of Somaliland",
    authors: ["Dr. Omar Jama Ali", "Dr. Fatima Ahmed", "Prof. Hassan Mohamed"],
    journal: "Journal of Environmental Management",
    year: 2024,
    type: "Journal Article",
    category: "Environmental Science",
    citations: 23,
    downloads: 456,
    impact: "High",
    abstract:
      "This study examines innovative water conservation techniques implemented in Somaliland's arid regions, demonstrating a 40% improvement in water efficiency through community-based management systems.",
    keywords: ["Water Management", "Sustainability", "Arid Regions", "Community Development"],
    doi: "10.1016/j.jenvman.2024.001234",
    openAccess: true,
  },
  {
    id: 2,
    title: "Digital Financial Inclusion in East Africa: Mobile Money Adoption Patterns",
    authors: ["Dr. Sahra Ibrahim Duale", "Dr. Ahmed Hassan"],
    journal: "African Journal of Economics",
    year: 2024,
    type: "Journal Article",
    category: "Economics",
    citations: 18,
    downloads: 342,
    impact: "Medium",
    abstract:
      "Analysis of mobile money adoption across East African countries, with particular focus on Somaliland's unique regulatory environment and its impact on financial inclusion rates.",
    keywords: ["Mobile Money", "Financial Inclusion", "East Africa", "Digital Economy"],
    doi: "10.1080/aje.2024.567890",
    openAccess: false,
  },
  {
    id: 3,
    title: "Traditional Medicine Integration in Modern Healthcare Systems",
    authors: ["Dr. Mohamed Yusuf Abdi", "Dr. Amina Hassan", "Dr. Khadija Omar"],
    journal: "International Journal of Health Sciences",
    year: 2023,
    type: "Journal Article",
    category: "Health Sciences",
    citations: 31,
    downloads: 678,
    impact: "High",
    abstract:
      "Comprehensive study on integrating traditional Somali medicine practices with modern healthcare, showing improved patient outcomes and cultural acceptance.",
    keywords: ["Traditional Medicine", "Healthcare Integration", "Cultural Medicine", "Patient Outcomes"],
    doi: "10.1177/ijhs.2023.789012",
    openAccess: true,
  },
  {
    id: 4,
    title: "Educational Technology Adoption in Post-Conflict Societies",
    authors: ["Dr. Ahmed Hassan Farah", "Prof. Maryam Ali"],
    journal: "Educational Technology Research",
    year: 2023,
    type: "Journal Article",
    category: "Education",
    citations: 15,
    downloads: 234,
    impact: "Medium",
    abstract:
      "Examination of how educational technology can accelerate learning recovery in post-conflict environments, with case studies from Somaliland schools.",
    keywords: ["Educational Technology", "Post-Conflict", "Learning Recovery", "Digital Education"],
    doi: "10.1080/etr.2023.345678",
    openAccess: true,
  },
  {
    id: 5,
    title: "Renewable Energy Potential in the Horn of Africa",
    authors: ["Dr. Omar Jama Ali", "Dr. Fatima Ahmed Hersi", "Prof. Ibrahim Duale"],
    journal: "Renewable Energy Journal",
    year: 2023,
    type: "Journal Article",
    category: "Energy",
    citations: 27,
    downloads: 512,
    impact: "High",
    abstract:
      "Comprehensive assessment of solar and wind energy potential across the Horn of Africa, with detailed feasibility studies for Somaliland's energy transition.",
    keywords: ["Renewable Energy", "Solar Power", "Wind Energy", "Energy Transition"],
    doi: "10.1016/j.renene.2023.456789",
    openAccess: false,
  },
  {
    id: 6,
    title: "Conflict Resolution Mechanisms in Somali Society",
    authors: ["Dr. Amina Hassan Mohamed", "Prof. Hassan Ali"],
    journal: "Journal of Peace Studies",
    year: 2024,
    type: "Book Chapter",
    category: "Social Sciences",
    citations: 12,
    downloads: 189,
    impact: "Medium",
    abstract:
      "Analysis of traditional Somali conflict resolution mechanisms and their relevance in contemporary peacebuilding efforts.",
    keywords: ["Conflict Resolution", "Traditional Governance", "Peacebuilding", "Somali Culture"],
    doi: "10.1007/978-3-030-12345-6_8",
    openAccess: true,
  },
]

const researchMetrics = {
  totalPublications: 156,
  totalCitations: 2847,
  hIndex: 28,
  totalDownloads: 45678,
  openAccessRate: 68,
  internationalCollaborations: 34,
}

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("year")

  const categories = ["all", ...Array.from(new Set(publications.map((p) => p.category)))]
  const years = [
    "all",
    ...Array.from(new Set(publications.map((p) => p.year.toString())))
      .sort()
      .reverse(),
  ]
  const types = ["all", ...Array.from(new Set(publications.map((p) => p.type)))]

  const filteredPublications = publications
    .filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory
      const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear
      const matchesType = selectedType === "all" || pub.type === selectedType
      return matchesSearch && matchesCategory && matchesYear && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year
        case "citations":
          return b.citations - a.citations
        case "downloads":
          return b.downloads - a.downloads
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const impactColors = {
    High: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-gray-100 text-gray-800",
  }

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Research Publications</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Discover our latest research contributions and scholarly achievements
              </p>
            </div>
          </div>
        </div>

        {/* Research Metrics */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Research Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{researchMetrics.totalPublications}</div>
                <div className="text-gray-600 text-sm">Total Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{researchMetrics.totalCitations}</div>
                <div className="text-gray-600 text-sm">Total Citations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{researchMetrics.hIndex}</div>
                <div className="text-gray-600 text-sm">H-Index</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {researchMetrics.totalDownloads.toLocaleString()}
                </div>
                <div className="text-gray-600 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{researchMetrics.openAccessRate}%</div>
                <div className="text-gray-600 text-sm">Open Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {researchMetrics.internationalCollaborations}
                </div>
                <div className="text-gray-600 text-sm">Int'l Collaborations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="citations">Citations</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Publications ({filteredPublications.length})</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export BibTeX
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredPublications.map((publication) => (
                <Card key={publication.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{publication.type}</Badge>
                          <Badge variant="outline">{publication.category}</Badge>
                          <Badge className={impactColors[publication.impact as keyof typeof impactColors]}>
                            {publication.impact} Impact
                          </Badge>
                          {publication.openAccess && <Badge className="bg-blue-100 text-blue-800">Open Access</Badge>}
                        </div>
                        <CardTitle className="text-xl mb-2 hover:text-green-600 cursor-pointer">
                          {publication.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{publication.authors.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{publication.year}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">{publication.journal}</span>
                          {publication.doi && <span className="ml-2">DOI: {publication.doi}</span>}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">{publication.abstract}</p>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Keywords:</h4>
                        <div className="flex flex-wrap gap-1">
                          {publication.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Quote className="h-4 w-4" />
                            <span>{publication.citations} citations</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>{publication.downloads} downloads</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {publication.openAccess && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Journal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPublications.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No publications found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Research Trends */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Research Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Publication Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">+45%</div>
                  <p className="text-gray-600">Increase in publications over the last 3 years</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-red-600" />
                    International Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-2">25</div>
                  <p className="text-gray-600">Countries with collaborative research</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Citation Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">2.8</div>
                  <p className="text-gray-600">Average citations per publication</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Publish With Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our research community and contribute to advancing knowledge in your field
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Submission Guidelines
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Contact Editorial Office
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
