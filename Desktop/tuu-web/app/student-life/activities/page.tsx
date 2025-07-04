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

const activities = [
  {
    id: 1,
    title: "International Cultural Night",
    category: "Cultural",
    date: "March 20, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Main Campus Auditorium",
    participants: 250,
    description: "Celebrate diversity with performances, food, and traditions from around the world",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Cultural", "International", "Performance"],
    featured: true,
  },
  {
    id: 2,
    title: "Unity Basketball Championship",
    category: "Sports",
    date: "March 25, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Sports Complex",
    participants: 120,
    description: "Inter-campus basketball tournament with teams from all Unity University locations",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Sports", "Competition", "Inter-campus"],
  },
  {
    id: 3,
    title: "Tech Innovation Hackathon",
    category: "Academic",
    date: "April 2-3, 2024",
    time: "48 Hours",
    location: "Computer Science Building",
    participants: 80,
    description: "48-hour coding challenge to solve real-world problems with innovative solutions",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Technology", "Innovation", "Competition"],
  },
  {
    id: 4,
    title: "Spring Music Festival",
    category: "Arts",
    date: "April 10, 2024",
    time: "4:00 PM - 11:00 PM",
    location: "Campus Quad",
    participants: 500,
    description: "Outdoor music festival featuring student bands and guest artists",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Music", "Festival", "Outdoor"],
    featured: true,
  },
  {
    id: 5,
    title: "Community Service Day",
    category: "Service",
    date: "April 15, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Various Locations",
    participants: 300,
    description: "University-wide volunteer initiative supporting local community organizations",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Volunteer", "Community", "Service"],
  },
  {
    id: 6,
    title: "Photography Exhibition",
    category: "Arts",
    date: "April 20-30, 2024",
    time: "All Day",
    location: "Student Gallery",
    participants: 45,
    description: "Showcase of student photography capturing campus life and global perspectives",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Photography", "Exhibition", "Art"],
  },
]

const categories = [
  { name: "All", icon: Calendar, count: activities.length },
  { name: "Cultural", icon: Heart, count: activities.filter((a) => a.category === "Cultural").length },
  { name: "Sports", icon: Trophy, count: activities.filter((a) => a.category === "Sports").length },
  { name: "Academic", icon: Users, count: activities.filter((a) => a.category === "Academic").length },
  { name: "Arts", icon: Palette, count: activities.filter((a) => a.category === "Arts").length },
  { name: "Service", icon: Heart, count: activities.filter((a) => a.category === "Service").length },
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

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
              Campus Activities
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover exciting events, competitions, and activities happening across all Unity University campuses. Get
              involved, make connections, and create unforgettable memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search activities..."
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

      {/* Featured Activities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Activities</h2>
            <p className="text-lg text-gray-600">Don't miss these highlighted events and activities</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {activities
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
                        <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                        <div className="flex items-center gap-4 text-sm">
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
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {activity.location}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          {activity.participants} participants
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{activity.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full">
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
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Activities</h2>
            <p className="text-lg text-gray-600">Browse all upcoming activities and events</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Badge>{activity.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                    <div className="flex flex-col gap-2 text-sm text-gray-600">
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
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {activity.participants}
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No activities found matching your criteria.</p>
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

      {/* Quick Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Coming Up Soon</h2>
            <p className="text-lg text-gray-600">Quick highlights of activities starting soon</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
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
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{highlight.title}</CardTitle>
                    <Badge variant="secondary">{highlight.date}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Organize an Activity?</h2>
            <p className="text-xl mb-8 opacity-90">
              Have an idea for a campus event? We'd love to help you make it happen!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Submit Proposal
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
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
  )
}
