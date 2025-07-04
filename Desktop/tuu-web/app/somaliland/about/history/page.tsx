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
    year: "2015",
    title: "Foundation and Vision",
    description: "Unity University was established with a vision to provide world-class education in Somaliland.",
    details: [
      "Founded by a consortium of Somaliland educators and international partners",
      "Initial campus established in Hargeisa with 3 buildings",
      "First cohort of 150 students enrolled across 4 programs",
      "Partnership agreements signed with 3 international universities",
    ],
    milestone: "University Founded",
    icon: Building,
    color: "bg-green-100 text-green-800",
  },
  {
    year: "2016",
    title: "Academic Excellence Begins",
    description: "Launch of comprehensive academic programs and establishment of research initiatives.",
    details: [
      "Introduced 8 undergraduate programs across 3 faculties",
      "Established the first research center - Horn of Africa Studies Institute",
      "Recruited 45 faculty members from 12 countries",
      "Launched the first community outreach programs",
    ],
    milestone: "Academic Programs Launched",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    year: "2017",
    title: "Research and Innovation",
    description: "Expansion of research capabilities and establishment of innovation centers.",
    details: [
      "Opened the Public Health Research Center",
      "Secured first major research grant ($1.2M from WHO)",
      "Launched the Innovation and Entrepreneurship Hub",
      "Established partnerships with 5 regional universities",
    ],
    milestone: "Research Centers Established",
    icon: Award,
    color: "bg-purple-100 text-purple-800",
  },
  {
    year: "2018",
    title: "International Recognition",
    description: "Gained international accreditation and expanded global partnerships.",
    details: [
      "Received accreditation from East African University Council",
      "Signed MOU with University of Oxford for collaborative research",
      "Launched first graduate programs (Masters in Public Health and Business)",
      "Student enrollment reached 800 across all programs",
    ],
    milestone: "International Accreditation",
    icon: Globe,
    color: "bg-red-100 text-red-800",
  },
  {
    year: "2019",
    title: "Campus Expansion",
    description: "Major infrastructure development and facility expansion.",
    details: [
      "Completed construction of the Medical Sciences Building",
      "Opened the state-of-the-art library with 50,000 volumes",
      "Established the Digital Innovation Lab",
      "Launched distance learning programs for rural communities",
    ],
    milestone: "Campus Expansion",
    icon: Building,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Adaptation to digital learning and technological advancement during global challenges.",
    details: [
      "Implemented comprehensive online learning platform",
      "Launched virtual laboratory simulations",
      "Established 24/7 digital student support services",
      "Maintained 95% student retention during pandemic",
    ],
    milestone: "Digital Innovation",
    icon: TrendingUp,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    year: "2021",
    title: "Community Impact",
    description: "Strengthened community engagement and social impact initiatives.",
    details: [
      "Launched the Business Innovation Hub",
      "Established free healthcare clinic serving 10,000+ patients annually",
      "Created 200+ jobs through graduate entrepreneurship programs",
      "Partnered with USAID for $8.5M development initiative",
    ],
    milestone: "Community Engagement",
    icon: Users,
    color: "bg-green-100 text-green-800",
  },
  {
    year: "2022",
    title: "Research Excellence",
    description: "Achieved significant research milestones and international collaborations.",
    details: [
      "Published 45+ peer-reviewed research papers",
      "Secured $5.2M in research funding from international donors",
      "Established partnerships with Microsoft Africa and other tech companies",
      "Launched the Center for Sustainable Development",
    ],
    milestone: "Research Milestones",
    icon: Star,
    color: "bg-blue-100 text-blue-800",
  },
  {
    year: "2023",
    title: "Academic Growth",
    description: "Continued expansion of academic offerings and student success.",
    details: [
      "Introduced 5 new undergraduate programs",
      "Launched PhD programs in 3 disciplines",
      "Achieved 90% graduate employment rate",
      "Opened satellite campus in Berbera",
    ],
    milestone: "Academic Expansion",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800",
  },
  {
    year: "2024",
    title: "Future Vision",
    description: "Continuing to build towards becoming the premier university in the Horn of Africa.",
    details: [
      "Planning new Engineering and Technology Faculty",
      "Developing partnerships with Silicon Valley tech companies",
      "Launching Africa's first Climate Change Research Institute",
      "Targeting 3,000 students by 2025",
    ],
    milestone: "Future Planning",
    icon: TrendingUp,
    color: "bg-red-100 text-red-800",
  },
]

const achievements = [
  {
    title: "Students Graduated",
    value: "2,500+",
    description: "Successful graduates contributing to society",
    icon: Users,
  },
  {
    title: "Research Publications",
    value: "156",
    description: "Peer-reviewed academic publications",
    icon: BookOpen,
  },
  {
    title: "International Partnerships",
    value: "24",
    description: "Collaborations across 15 countries",
    icon: Globe,
  },
  {
    title: "Research Funding",
    value: "$18.7M",
    description: "Total research grants secured",
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
                Unity University was born from a vision to transform education in Somaliland. Founded in 2015 by a
                dedicated group of educators, community leaders, and international partners, our university emerged as a
                beacon of hope and progress in the Horn of Africa. From humble beginnings with 150 students, we have
                grown into a leading institution of higher learning, committed to academic excellence, research
                innovation, and community service.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our name "Unity" reflects our core belief in bringing together diverse perspectives, cultures, and
                knowledge systems to create a harmonious learning environment that serves not just Somaliland, but the
                entire region and beyond.
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
