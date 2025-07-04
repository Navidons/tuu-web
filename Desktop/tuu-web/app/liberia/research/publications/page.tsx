"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  Filter,
  Download,
  ExternalLink,
  Users,
  Award,
  FileText,
  Quote,
  Eye,
  Star,
  BarChart3,
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

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const publications = [
    {
      title: "Sustainable Healthcare Delivery in Rural Liberia: A Community-Based Approach",
      authors: ["Dr. Sarah Johnson", "Dr. Michael Kpakpo", "Prof. Mary Williams"],
      journal: "International Journal of Public Health",
      year: 2023,
      category: "Health Sciences",
      type: "Research Article",
      citations: 45,
      downloads: 1250,
      impact_factor: 4.2,
      abstract:
        "This study examines innovative approaches to healthcare delivery in rural Liberian communities, focusing on community health worker programs and telemedicine integration.",
      keywords: ["Healthcare", "Rural Medicine", "Community Health", "Telemedicine"],
      doi: "10.1016/j.ijph.2023.05.012",
      open_access: true,
    },
    {
      title: "Machine Learning Applications in West African Agricultural Systems",
      authors: ["Dr. Michael Chen", "Dr. Fatima Al-Rashid", "James Cooper"],
      journal: "Agricultural Technology Review",
      year: 2023,
      category: "Technology",
      type: "Research Article",
      citations: 32,
      downloads: 890,
      impact_factor: 3.8,
      abstract:
        "An exploration of how machine learning algorithms can optimize crop yields and resource management in West African agricultural contexts.",
      keywords: ["Machine Learning", "Agriculture", "Optimization", "West Africa"],
      doi: "10.1080/atr.2023.08.024",
      open_access: false,
    },
    {
      title: "Economic Impact of Digital Financial Services in Liberia",
      authors: ["Dr. James Williams", "Prof. Rebecca Thompson", "Dr. Amina Kone"],
      journal: "African Economic Review",
      year: 2023,
      category: "Economics",
      type: "Research Article",
      citations: 28,
      downloads: 675,
      impact_factor: 3.5,
      abstract:
        "Analysis of how mobile money and digital banking services are transforming the Liberian economy and improving financial inclusion.",
      keywords: ["Digital Finance", "Economic Development", "Financial Inclusion", "Mobile Money"],
      doi: "10.1007/s12345-023-0156-8",
      open_access: true,
    },
    {
      title: "Climate Change Adaptation Strategies for Coastal Communities",
      authors: ["Dr. Fatima Al-Rashid", "Dr. Sarah Johnson", "Prof. David Miller"],
      journal: "Environmental Science & Policy",
      year: 2022,
      category: "Environmental Science",
      type: "Review Article",
      citations: 67,
      downloads: 1450,
      impact_factor: 5.1,
      abstract:
        "Comprehensive review of climate adaptation strategies implemented by coastal communities in West Africa, with focus on sustainable solutions.",
      keywords: ["Climate Change", "Adaptation", "Coastal Management", "Sustainability"],
      doi: "10.1016/j.envsci.2022.11.003",
      open_access: true,
    },
    {
      title: "Educational Technology Integration in Post-Conflict Societies",
      authors: ["Prof. Rebecca Thompson", "Dr. Michael Chen", "Dr. Amina Kone"],
      journal: "Educational Technology Research",
      year: 2022,
      category: "Education",
      type: "Case Study",
      citations: 41,
      downloads: 920,
      impact_factor: 2.9,
      abstract:
        "Case study examining the challenges and opportunities of integrating educational technology in post-conflict educational systems.",
      keywords: ["Educational Technology", "Post-Conflict", "Digital Learning", "Capacity Building"],
      doi: "10.1080/etr.2022.07.015",
      open_access: false,
    },
    {
      title: "Social Entrepreneurship and Community Development in West Africa",
      authors: ["Dr. Amina Kone", "Dr. James Williams", "Prof. Mary Williams"],
      journal: "Social Innovation Quarterly",
      year: 2022,
      category: "Social Sciences",
      type: "Research Article",
      citations: 35,
      downloads: 780,
      impact_factor: 3.2,
      abstract:
        "Investigation of social entrepreneurship models and their impact on community development across West African contexts.",
      keywords: ["Social Entrepreneurship", "Community Development", "Innovation", "West Africa"],
      doi: "10.1177/siq.2022.04.008",
      open_access: true,
    },
  ]

  const researchMetrics = {
    totalPublications: 156,
    totalCitations: 2847,
    hIndex: 28,
    averageImpactFactor: 3.7,
    openAccessPercentage: 65,
    internationalCollaborations: 42,
  }

  const topJournals = [
    { name: "International Journal of Public Health", publications: 12, impact_factor: 4.2 },
    { name: "Environmental Science & Policy", publications: 8, impact_factor: 5.1 },
    { name: "African Economic Review", publications: 10, impact_factor: 3.5 },
    { name: "Educational Technology Research", publications: 6, impact_factor: 2.9 },
    { name: "Social Innovation Quarterly", publications: 7, impact_factor: 3.2 },
  ]

  const categories = [
    "all",
    "Health Sciences",
    "Technology",
    "Economics",
    "Environmental Science",
    "Education",
    "Social Sciences",
  ]
  const years = ["all", "2023", "2022", "2021", "2020"]

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory
    const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear

    return matchesSearch && matchesCategory && matchesYear
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Research Publications</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore our comprehensive collection of peer-reviewed research publications, contributing to global
              knowledge and addressing local challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                156+ Publications
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Quote className="w-4 h-4 mr-2" />
                2,847 Citations
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Award className="w-4 h-4 mr-2" />
                H-Index: 28
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Metrics */}
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
              Research Impact
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our research metrics demonstrate the quality and impact of our scholarly contributions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-blue-600">
                    {researchMetrics.totalPublications}
                  </CardTitle>
                  <CardDescription>Total Publications</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Quote className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-green-600">
                    {researchMetrics.totalCitations.toLocaleString()}
                  </CardTitle>
                  <CardDescription>Total Citations</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-purple-600">{researchMetrics.hIndex}</CardTitle>
                  <CardDescription>H-Index</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-orange-600">
                    {researchMetrics.averageImpactFactor}
                  </CardTitle>
                  <CardDescription>Avg. Impact Factor</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-red-600">
                    {researchMetrics.openAccessPercentage}%
                  </CardTitle>
                  <CardDescription>Open Access</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-indigo-600">
                    {researchMetrics.internationalCollaborations}
                  </CardTitle>
                  <CardDescription>Int'l Collaborations</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publications Search & Filter */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
              Browse Publications
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search and filter through our extensive collection of research publications
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Search and Filter Controls */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search & Filter Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      placeholder="Search by title, author, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
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
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {filteredPublications.length} of {publications.length} publications
                  </p>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Publications List */}
            <div className="space-y-6">
              {filteredPublications.map((publication, index) => (
                <motion.div
                  key={publication.title}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 leading-tight">{publication.title}</CardTitle>
                          <CardDescription className="text-base mb-3">{publication.authors.join(", ")}</CardDescription>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{publication.category}</Badge>
                            <Badge variant="outline">{publication.type}</Badge>
                            <Badge variant="outline">{publication.year}</Badge>
                            {publication.open_access && (
                              <Badge className="bg-green-100 text-green-800">Open Access</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-sm text-gray-600">
                            Impact Factor: <span className="font-semibold">{publication.impact_factor}</span>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Quote className="w-3 h-3" />
                              {publication.citations}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {publication.downloads}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{publication.abstract}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Keywords</h4>
                          <div className="flex flex-wrap gap-1">
                            {publication.keywords.map((keyword) => (
                              <Badge key={keyword} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{publication.journal}</span> • DOI: {publication.doi}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPublications.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No publications found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Top Journals */}
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
              Top Publishing Journals
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our researchers publish in high-impact, peer-reviewed journals across various disciplines
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Most Published Journals
                </CardTitle>
                <CardDescription>Journals where Unity University researchers most frequently publish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topJournals.map((journal, index) => (
                    <motion.div
                      key={journal.name}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{journal.name}</h4>
                        <p className="text-sm text-gray-600">Impact Factor: {journal.impact_factor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{journal.publications}</div>
                        <div className="text-sm text-gray-600">Publications</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
