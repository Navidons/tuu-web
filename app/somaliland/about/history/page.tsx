"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building, Award, BookOpen, Globe, TrendingUp, Star, ChevronRight } from "lucide-react"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const timelineEvents = [
  {
    year: "2021",
    title: "Foundation and Vision",
    description: "Unity University was established in Hargeisa, Somaliland with the motto 'What begins here, transforms Africa'.",
    details: [
      "Founded with a vision to become a world-class university in leadership development in Africa",
      "Initial campus established at Jigjiga Yar Street near Masjid Jabir, Hargeisa",
      "First cohort of students enrolled across multiple faculties",
      "Established foundation programs and core academic offerings",
    ],
    milestone: "University Founded",
    icon: Building,
    color: "bg-green-100 text-green-800",
  },
  {
    year: "2022",
    title: "Academic Programs Launch",
    description: "Launch of comprehensive academic programs across five faculties with diverse offerings.",
    details: [
      "Established Faculty of Business and Management with multiple programs",
      "Launched Faculty of Computing & Information Technology programs", 
      "Founded Faculty of Allied Health Sciences programs",
      "Created Faculty of Social Sciences with various specializations",
      "Established Faculty of Education programs",
    ],
    milestone: "Academic Programs Launched",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    year: "2023",
    title: "Research and Innovation Growth",
    description: "Expansion of research capabilities and establishment of graduate programs.",
    details: [
      "Launched Master's programs across multiple faculties",
      "Established research initiatives in key areas",
      "Implemented innovative teaching methodologies",
      "Developed industry partnerships and collaborations",
    ],
    milestone: "Graduate Programs Established",
    icon: Award,
    color: "bg-purple-100 text-purple-800",
  },
  {
    year: "2024",
    title: "Pan-African Expansion",
    description: "Expanded operations with the establishment of Liberia campus, creating a Pan-African network.",
    details: [
      "Opened second campus in Monrovia, Liberia",
      "Extended reach across West and East Africa",
      "Strengthened international partnerships",
      "Enhanced student mobility and exchange programs",
    ],
    milestone: "Liberia Campus Opened",
    icon: Globe,
    color: "bg-red-100 text-red-800",
  },
  {
    year: "2025",
    title: "Continued Excellence",
    description: "Building on strong foundations to serve over 4,000 students across both campuses.",
    details: [
      "Serving 4,000+ students across Somaliland and Liberia campuses",
      "Expanding academic program offerings",
      "Strengthening research and community engagement",
      "Planning future growth and development initiatives",
    ],
    milestone: "Present Day",
    icon: TrendingUp,
    color: "bg-indigo-100 text-indigo-800",
  },
]

const achievements = [
  {
    title: "Students Enrolled",
    value: "4,000+",
    description: "Current students across both campuses",
    icon: Users,
  },
  {
    title: "Academic Programs",
    value: "37",
    description: "Undergraduate and graduate programs offered",
    icon: BookOpen,
  },
  {
    title: "Faculty Members",
    value: "150+",
    description: "Expert educators across all faculties",
    icon: Globe,
  },
  {
    title: "Years of Excellence",
    value: "4",
    description: "Since our founding in 2021",
    icon: Award,
  },
]

const foundingPrinciples = [
  {
    title: "Academic Excellence",
    description: "Commitment to the highest standards of education and research",
    icon: Star,
  },
  {
    title: "Cultural Heritage",
    description: "Preserving and promoting Somali culture while embracing global perspectives",
    icon: Globe,
  },
  {
    title: "Community Service",
    description: "Serving the people of Somaliland through education and outreach",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "Fostering creativity and entrepreneurship for societal development",
    icon: TrendingUp,
  },
]

export default function HistoryPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Our History</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                A journey of excellence, innovation, and service to Somaliland
              </p>
            </div>
          </div>
        </div>

        {/* Founding Story */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Founding Story</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Unity University was born from a vision to transform education in Somaliland and Africa. Founded in 2021 by dedicated educators and community leaders, our university emerged with the motto "What begins here, transforms Africa" and a mission to become a world-class university in leadership development. From our beginnings in Hargeisa, we have grown into a leading institution committed to integrating theory with practice to produce graduates with relevant knowledge, skills, and responsible citizenry.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our name "Unity" reflects our core belief in bringing together diverse perspectives, cultures, and knowledge systems to create a harmonious learning environment that serves not just Somaliland, but the entire African continent through our Pan-African approach with campuses in both Somaliland and Liberia.
              </p>
            </div>
          </div>
        </div>

        {/* Founding Principles */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Founding Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {foundingPrinciples.map((principle, index) => {
                const IconComponent = principle.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                      <p className="text-gray-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey Through Time</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-red-600"></div>

                {timelineEvents.map((event, index) => {
                  const IconComponent = event.icon
                  return (
                    <div key={index} className="relative flex items-start mb-12">
                      {/* Timeline dot */}
                      <div className="absolute left-6 w-4 h-4 bg-white border-4 border-green-600 rounded-full"></div>

                      {/* Content */}
                      <div className="ml-20 flex-1">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <IconComponent className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <Badge className="bg-green-600 text-white">{event.year}</Badge>
                                    <Badge className={event.color}>{event.milestone}</Badge>
                                  </div>
                                  <CardTitle className="text-xl">{event.title}</CardTitle>
                                </div>
                              </div>
                              <ChevronRight
                                className={`h-5 w-5 text-gray-400 transition-transform ${
                                  selectedEvent === index ? "rotate-90" : ""
                                }`}
                              />
                            </div>
                            <CardDescription className="text-gray-600 mt-2">{event.description}</CardDescription>
                          </CardHeader>
                          {selectedEvent === index && (
                            <CardContent>
                              <div className="border-t pt-4">
                                <h4 className="font-semibold mb-3">Key Achievements:</h4>
                                <ul className="space-y-2">
                                  {event.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="flex items-start gap-2">
                                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-700">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-2">{achievement.value}</div>
                      <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legacy and Future */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Legacy</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Over the past decade, Unity University has established itself as a cornerstone of higher education
                    in Somaliland. Our graduates have gone on to become leaders in government, business, healthcare,
                    education, and technology, contributing to the development and prosperity of our nation.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We have fostered a culture of innovation, critical thinking, and social responsibility that extends
                    far beyond our campus walls. Our research has informed policy decisions, our community programs have
                    improved lives, and our partnerships have strengthened Somaliland's position in the global academic
                    community.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Looking Forward</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    As we look to the future, Unity University remains committed to its founding vision while adapting
                    to the changing needs of our society. We are expanding our programs, strengthening our research
                    capabilities, and building new partnerships that will position us as the premier university in the
                    Horn of Africa.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our goal is not just to educate students, but to empower them to become agents of positive change in
                    their communities and the world. Together, we are building a brighter future for Somaliland and
                    beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Be Part of Our Story</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Unity University and become part of our continuing journey of excellence and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
