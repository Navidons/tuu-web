"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Search,
  Heart,
  Trophy,
  Briefcase,
  Globe,
  Code,
  BookOpen,
  Palette,
  Gamepad2,
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
} from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

const organizations = [
  {
    id: 1,
    name: "International Student Association",
    category: "Cultural",
    members: 180,
    description: "Promoting cultural exchange and supporting international students across all campuses",
    activities: ["Cultural festivals", "Language exchange", "International nights"],
    meetingTime: "Wednesdays 6:00 PM",
    location: "Student Center Room 201",
    contact: "isa@unity.edu",
    featured: true,
    established: 2018,
  },
  {
    id: 2,
    name: "Unity Debate Society",
    category: "Academic",
    members: 45,
    description: "Developing critical thinking and public speaking skills through competitive debate",
    activities: ["Weekly debates", "Inter-university competitions", "Public speaking workshops"],
    meetingTime: "Fridays 4:00 PM",
    location: "Academic Hall 305",
    contact: "debate@unity.edu",
    established: 2019,
  },
  {
    id: 3,
    name: "Coding Club",
    category: "Technology",
    members: 120,
    description: "Building programming skills and working on innovative tech projects",
    activities: ["Hackathons", "Coding workshops", "Open source projects"],
    meetingTime: "Tuesdays 7:00 PM",
    location: "Computer Lab B",
    contact: "coding@unity.edu",
    featured: true,
    established: 2017,
  },
  {
    id: 4,
    name: "Environmental Action Group",
    category: "Service",
    members: 85,
    description: "Promoting sustainability and environmental awareness on campus",
    activities: ["Campus cleanups", "Sustainability workshops", "Tree planting"],
    meetingTime: "Mondays 5:30 PM",
    location: "Science Building 102",
    contact: "environment@unity.edu",
    established: 2020,
  },
  {
    id: 5,
    name: "Unity Photography Club",
    category: "Arts",
    members: 60,
    description: "Capturing campus life and developing photography skills",
    activities: ["Photo walks", "Exhibitions", "Photography workshops"],
    meetingTime: "Saturdays 2:00 PM",
    location: "Art Studio",
    contact: "photo@unity.edu",
    established: 2019,
  },
  {
    id: 6,
    name: "Business Innovation Society",
    category: "Professional",
    members: 95,
    description: "Connecting students with business opportunities and entrepreneurship",
    activities: ["Networking events", "Business plan competitions", "Guest speakers"],
    meetingTime: "Thursdays 6:30 PM",
    location: "Business Building 201",
    contact: "business@unity.edu",
    featured: true,
    established: 2018,
  },
  {
    id: 7,
    name: "Unity Gaming League",
    category: "Recreation",
    members: 110,
    description: "Competitive and casual gaming community for all skill levels",
    activities: ["Esports tournaments", "Game nights", "Streaming events"],
    meetingTime: "Daily 8:00 PM",
    location: "Student Lounge",
    contact: "gaming@unity.edu",
    established: 2021,
  },
  {
    id: 8,
    name: "Music Ensemble",
    category: "Arts",
    members: 40,
    description: "Performing diverse musical styles from around the world",
    activities: ["Concerts", "Music festivals", "Recording sessions"],
    meetingTime: "Wednesdays 7:30 PM",
    location: "Music Hall",
    contact: "music@unity.edu",
    established: 2017,
  },
]

const categories = [
  { name: "All", icon: Users, count: organizations.length },
  { name: "Cultural", icon: Globe, count: organizations.filter((o) => o.category === "Cultural").length },
  { name: "Academic", icon: BookOpen, count: organizations.filter((o) => o.category === "Academic").length },
  { name: "Technology", icon: Code, count: organizations.filter((o) => o.category === "Technology").length },
  { name: "Service", icon: Heart, count: organizations.filter((o) => o.category === "Service").length },
  { name: "Arts", icon: Palette, count: organizations.filter((o) => o.category === "Arts").length },
  { name: "Professional", icon: Briefcase, count: organizations.filter((o) => o.category === "Professional").length },
  { name: "Recreation", icon: Gamepad2, count: organizations.filter((o) => o.category === "Recreation").length },
]

const benefits = [
  {
    title: "Leadership Development",
    description: "Take on leadership roles and develop essential management skills",
    icon: Trophy,
  },
  {
    title: "Networking Opportunities",
    description: "Connect with like-minded peers and industry professionals",
    icon: Users,
  },
  {
    title: "Skill Building",
    description: "Develop both technical and soft skills through hands-on experience",
    icon: Star,
  },
  {
    title: "Global Perspective",
    description: "Engage with diverse cultures and international viewpoints",
    icon: Globe,
  },
]

export default function StudentOrganizationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrganizations = organizations.filter((org) => {
    const matchesCategory = selectedCategory === "All" || org.category === selectedCategory
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.activities.some((activity) => activity.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Student Organizations
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join one of our 150+ student organizations and clubs. Find your community, develop leadership skills, and
              make lasting connections across our global campuses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Organizations
              </Button>
              <Button size="lg" variant="outline">
                Start New Organization
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join Student Organizations?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Student organizations offer incredible opportunities for personal growth, skill development, and building
              lifelong friendships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center gap-2"
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Organizations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Organizations</h2>
            <p className="text-lg text-gray-600">
              Spotlight on some of our most active and impactful student organizations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {organizations
              .filter((org) => org.featured)
              .map((org, index) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Featured</Badge>
                        <Badge variant="secondary">{org.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{org.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {org.members} members
                        </div>
                        <div>Est. {org.established}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{org.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Activities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {org.activities.map((activity, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {org.meetingTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {org.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {org.contact}
                        </div>
                      </div>

                      <Button className="w-full">
                        Join Organization
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* All Organizations */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Organizations</h2>
            <p className="text-lg text-gray-600">Browse our complete directory of student organizations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{org.category}</Badge>
                      <div className="text-sm text-gray-500">Est. {org.established}</div>
                    </div>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {org.members} members
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{org.description}</p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {org.meetingTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {org.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No organizations found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchTerm("")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Involved?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join an existing organization or start your own. The possibilities are endless!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Join an Organization
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Start New Organization
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
