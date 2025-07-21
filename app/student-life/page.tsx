"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Clock, Users, Trophy, Palette, Gamepad2, Heart, Search, ArrowRight } from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Head from "next/head"
import Image from "next/image"

type Event = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Unity Football Championship",
    category: "Sports",
    date: "March 25, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Sports Complex",
    participants: 120,
    description: "Inter-campus football (soccer) tournament with teams from all The Unity University locations",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Sports", "Football", "Competition", "Inter-campus"],
    featured: true,
  },
  {
    id: 2,
    title: "Global Innovation Summit",
    category: "Academic",
    date: "September 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "University Conference Center",
    participants: 250,
    description: "Annual gathering of students, researchers, and industry leaders to showcase innovative projects",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Innovation", "Research", "Networking", "Technology"],
  },
  {
    id: 3,
    title: "Cultural Diversity Week",
    category: "Community",
    date: "November 10-16, 2024",
    time: "All Day",
    location: "Campus-wide",
    participants: 500,
    description: "A week-long celebration of cultural diversity, featuring performances, workshops, and exhibitions",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Culture", "Diversity", "Community", "Inclusion"],
  },
  {
    id: 4,
    title: "Annual Research Symposium",
    category: "Academic",
    date: "February 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Research Hall",
    participants: 180,
    description: "Showcase of student and faculty research across various disciplines",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Research", "Academic", "Presentation", "Innovation"],
  }
]

const categories = [
  { name: "All", icon: Calendar, count: events.length },
  { name: "Cultural", icon: Heart, count: events.filter((a) => a.category === "Cultural").length },
  { name: "Sports", icon: Trophy, count: events.filter((a) => a.category === "Sports").length },
  { name: "Academic", icon: Users, count: events.filter((a) => a.category === "Academic").length },
  { name: "Arts", icon: Palette, count: events.filter((a) => a.category === "Arts").length },
  { name: "Service", icon: Heart, count: events.filter((a) => a.category === "Service").length },
]

const upcomingHighlights = [
  {
    title: "Model United Nations",
    date: "Next Week",
    description: "Diplomatic simulation with international focus",
    icon: Users,
  },
  {
    title: "Gaming Tournament",
    date: "This Weekend",
    description: "Esports competition across multiple games",
    icon: Gamepad2,
  },
  {
    title: "Art Workshop Series",
    date: "Ongoing",
    description: "Weekly creative workshops for all skill levels",
    icon: Palette,
  },
]

export default function CampusActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActivities = events.filter((activity) => {
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Event",
              "name": "Unity Football Championship",
              "description": "Inter-campus football (soccer) tournament with teams from all The Unity University locations.",
              "startDate": "2024-03-25T14:00:00+03:00",
              "endDate": "2024-03-25T18:00:00+03:00",
              "location": {
                "@type": "Place",
                "name": "Sports Complex"
              },
              "image": "https://tuu.university/placeholder.jpg",
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "Global Innovation Summit",
              "description": "Annual gathering of students, researchers, and industry leaders to showcase innovative projects.",
              "startDate": "2024-09-15T09:00:00+03:00",
              "endDate": "2024-09-15T17:00:00+03:00",
              "location": {
                "@type": "Place",
                "name": "University Conference Center"
              },
              "image": "https://tuu.university/placeholder.jpg",
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "Cultural Diversity Week",
              "description": "A week-long celebration of cultural diversity, featuring performances, workshops, and exhibitions.",
              "startDate": "2024-11-10",
              "endDate": "2024-11-16",
              "location": {
                "@type": "Place",
                "name": "Campus-wide"
              },
              "image": "https://tuu.university/placeholder.jpg",
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "Annual Research Symposium",
              "description": "Showcase of student and faculty research across various disciplines.",
              "startDate": "2025-02-20T10:00:00+03:00",
              "endDate": "2025-02-20T16:00:00+03:00",
              "location": {
                "@type": "Place",
                "name": "Research Hall"
              },
              "image": "https://tuu.university/placeholder.jpg",
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            }
          ]
        }` }} />
      </Head>
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                Campus Activities
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Discover exciting events, competitions, and activities happening across all The Unity University campuses. Get
                involved, make connections, and create unforgettable memories.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-6 sm:py-8 bg-white/50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 sm:mb-8">
              <div className="relative flex-1 max-w-full sm:max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div className="flex gap-2 flex-nowrap overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm px-3 sm:px-4"
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

        {/* Featured Activities */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Featured Activities</h2>
              <p className="text-base sm:text-lg text-gray-600">Don't miss these highlighted events and activities</p>
            </motion.div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2 mb-10 sm:mb-16">
              {events
                .filter((activity) => activity.featured)
                .map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 relative">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white text-gray-900">Featured</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{activity.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {activity.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                          <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                            <MapPin className="w-4 h-4" />
                            {activity.location}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                            <Users className="w-4 h-4" />
                            {activity.participants} participants
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">{activity.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
                          {activity.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full text-xs sm:text-base py-2 sm:py-3">
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* All Activities */}
        <section className="py-10 sm:py-16 bg-white/50">
          <div className="container mx-auto px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">All Activities</h2>
              <p className="text-base sm:text-lg text-gray-600">Browse all upcoming activities and events</p>
            </motion.div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                    <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 relative">
                      <div className="absolute top-4 left-4">
                        <Badge className="text-xs sm:text-sm">{activity.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-xl">{activity.title}</CardTitle>
                      <div className="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {activity.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {activity.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">{activity.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
                        {activity.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {activity.participants}
                        </div>
                        <Button size="sm" className="text-xs sm:text-base py-1 sm:py-2">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No activities found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchTerm("")
                  }}
                  className="mt-4 text-xs sm:text-base py-2 sm:py-3"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Highlights */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Coming Up Soon</h2>
              <p className="text-base sm:text-lg text-gray-600">Quick highlights of activities starting soon</p>
            </motion.div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
              {upcomingHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                    <CardHeader>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                        <highlight.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-xl">{highlight.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs sm:text-sm">{highlight.date}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-xs sm:text-base">{highlight.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-2 sm:px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Want to Organize an Activity?</h2>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
                Have an idea for a campus event? We'd love to help you make it happen!
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Button size="lg" variant="secondary" className="text-xs sm:text-base py-2 sm:py-3">
                  Submit Proposal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 text-xs sm:text-base py-2 sm:py-3"
                >
                  Contact Student Life
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Site Footer */}
        <EnhancedFooter />
      </div>
    </>
  )
} 