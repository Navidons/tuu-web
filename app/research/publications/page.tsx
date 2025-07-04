"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Search, Download, ExternalLink, Calendar, User, Quote } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

export default function PublicationsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  const publications = [
    {
      id: 1,
      title: "Sustainable Water Purification Systems for Rural African Communities",
      authors: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Grace Okafor"],
      journal: "Journal of Environmental Engineering",
      year: 2024,
      category: "Environmental Science",
      type: "Research Article",
      citations: 45,
      downloads: 1250,
      abstract:
        "This study presents a novel approach to water purification using locally sourced materials and solar energy, specifically designed for rural communities in sub-Saharan Africa.",
      doi: "10.1016/j.jenveng.2024.001",
      keywords: ["water purification", "sustainability", "rural development", "solar energy"],
      impact: "High",
      openAccess: true,
    },
    {
      id: 2,
      title: "Digital Health Platforms: Bridging Healthcare Gaps in Remote Areas",
      authors: ["Dr. Amina Hassan", "Dr. Robert Kim", "Dr. James Wilson"],
      journal: "Digital Health Innovation",
      year: 2024,
      category: "Healthcare Technology",
      type: "Review Article",
      citations: 32,
      downloads: 890,
      abstract:
        "A comprehensive review of digital health platforms and their effectiveness in providing healthcare services to underserved populations.",
      doi: "10.1177/dhi.2024.002",
      keywords: ["telemedicine", "digital health", "healthcare access", "remote care"],
      impact: "Medium",
      openAccess: true,
    },
    {
      id: 3,
      title: "AI-Powered Educational Tools for Primary Education in Developing Countries",
      authors: ["Dr. Grace Okafor", "Dr. Michael Chen"],
      journal: "Educational Technology Research",
      year: 2023,
      category: "Educational Technology",
      type: "Research Article",
      citations: 67,
      downloads: 1580,
      abstract:
        "Development and evaluation of artificial intelligence tools designed to enhance primary education outcomes in resource-constrained environments.",
      doi: "10.1080/etr.2023.003",
      keywords: ["artificial intelligence", "education", "primary school", "developing countries"],
      impact: "High",
      openAccess: false,
    },
    {
      id: 4,
      title: "Microfinance and Entrepreneurship: Economic Development in West Africa",
      authors: ["Dr. Grace Okafor", "Dr. Sarah Johnson"],
      journal: "African Economic Review",
      year: 2023,
      category: "Economics",
      type: "Research Article",
      citations: 28,
      downloads: 720,
      abstract:
        "Analysis of microfinance programs and their impact on entrepreneurship and economic development in West African countries.",
      doi: "10.1016/aer.2023.004",
      keywords: ["microfinance", "entrepreneurship", "economic development", "West Africa"],
      impact: "Medium",
      openAccess: true,
    },
    {
      id: 5,
      title: "Climate Adaptation Strategies for Agricultural Communities",
      authors: ["Dr. Sarah Johnson", "Dr. Amina Hassan"],
      journal: "Climate Change and Agriculture",
      year: 2023,
      category: "Environmental Science",
      type: "Research Article",
      citations: 41,
      downloads: 950,
      abstract:
        "Comprehensive study of climate adaptation strategies implemented by agricultural communities across East and West Africa.",
      doi: "10.1007/cca.2023.005",
      keywords: ["climate change", "agriculture", "adaptation", "food security"],
      impact: "High",
      openAccess: true,
    },
    {
      id: 6,
      title: "Teacher Training in Digital Pedagogy: A Cross-Cultural Study",
      authors: ["Dr. James Wilson", "Dr. Michael Chen"],
      journal: "International Journal of Teacher Education",
      year: 2022,
      category: "Education",
      type: "Research Article",
      citations: 55,
      downloads: 1100,
      abstract:
        "Comparative analysis of digital pedagogy training programs across different cultural contexts in Africa.",
      doi: "10.1080/ijte.2022.006",
      keywords: ["teacher training", "digital pedagogy", "cross-cultural", "education"],
      impact: "Medium",
      openAccess: false,
    },
  ]

  const categories = [
    "all",
    "Environmental Science",
    "Healthcare Technology",
    "Educational Technology",
    "Economics",
    "Education",
  ]
  const years = ["all", "2024", "2023", "2022", "2021", "2020"]

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory
    const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear

    return matchesSearch && matchesCategory && matchesYear
  })

  const publicationStats = {
    total: publications.length,
    thisYear: publications.filter((p) => p.year === 2024).length,
    totalCitations: publications.reduce((sum, p) => sum + p.citations, 0),
    totalDownloads: publications.reduce((sum, p) => sum + p.downloads, 0),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <FileText className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Publications
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover our latest research contributions and scholarly publications advancing knowledge across multiple
              disciplines
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                Browse Publications
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Submit Research
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Publication Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Total Publications", value: publicationStats.total.toString(), icon: FileText },
              { label: "This Year", value: publicationStats.thisYear.toString(), icon: Calendar },
              { label: "Total Citations", value: publicationStats.totalCitations.toString(), icon: Quote },
              { label: "Downloads", value: `${(publicationStats.totalDownloads / 1000).toFixed(1)}K`, icon: Download },
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search publications, authors, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
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
              </div>
              <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Research Publications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? "s" : ""} found
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {filteredPublications.map((publication, index) => (
              <motion.div key={publication.id} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge
                                className={`${publication.impact === "High" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {publication.impact} Impact
                              </Badge>
                              <Badge variant="outline">{publication.type}</Badge>
                              {publication.openAccess && (
                                <Badge className="bg-orange-100 text-orange-800">Open Access</Badge>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{publication.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{publication.authors.join(", ")}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{publication.year}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{publication.abstract}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {publication.keywords.map((keyword, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="mb-1">
                                <strong>Journal:</strong> {publication.journal}
                              </p>
                              <p>
                                <strong>DOI:</strong> {publication.doi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 mb-1">{publication.citations}</div>
                              <div className="text-sm text-gray-600">Citations</div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 mb-1">{publication.downloads}</div>
                              <div className="text-sm text-gray-600">Downloads</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </Button>
                            <Button variant="outline" className="w-full">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Publish With Us</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our research community and share your discoveries with the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/research/support">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50 font-semibold">
                  Submit Research
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Editorial Team
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
