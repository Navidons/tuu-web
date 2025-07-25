"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Users, Award, BookOpen, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Link from "next/link"
import EnhancedFooter from "@/components/enhanced-footer"

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const timelineEvents = [
    {
      year: "2020",
      title: "Foundation in Hargeisa",
      description:
        "The Unity University was established in Hargeisa, Somaliland, with the motto 'What begins here, transforms Africa' and a vision to become a world-class university in leadership development.",
      image: "/hero-section/hero.png",
      milestone: "University Founded",
      students: 200,
    },
    {
      year: "2021",
      title: "First Academic Programs",
      description:
        "Launched comprehensive academic programs across five faculties: Business & Management, Computing & IT, Allied Health Sciences, Social Sciences, and Education.",
      image: "/graduation/all-on-graduation-pic.jpg",
      milestone: "Programs Established",
      students: 850,
    },
    {
      year: "2022",
      title: "Research & Innovation",
      description:
        "Established research centers and began implementing innovative teaching methods, integrating theory with practice to produce graduates with relevant knowledge and skills.",
      image: "/research/research-students.jpg",
      milestone: "Research Centers Opened",
      students: 1800,
    },
    {
      year: "Mid 2024",
      title: "Liberia Campus Expansion",
      description:
        "Opened second campus in Monrovia, Liberia, extending The Unity University's reach across West Africa and establishing a truly Pan-African educational network.",
      image: "/side-show/the-unity-university-glow.jpg",
      milestone: "Liberia Campus Opened",
      students: 3500,
    },
    {
      year: "2024-2025",
      title: "Continued Growth",
      description:
        "Today, The Unity University serves over 4,000 students across both campuses, offering undergraduate and graduate programs with a commitment to holistic human development and leadership.",
      image: "/student-life/good-student-line-up.jpg",
      milestone: "Present Day",
      students: 4000,
    },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f7] font-serif">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 border-b-4 border-emerald-600 bg-white">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-emerald-700 text-white px-6 py-3 text-lg font-bold shadow mb-8 uppercase tracking-widest">
              Our History
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 mb-6 md:mb-8 leading-tight uppercase tracking-wide border-b-4 border-emerald-600 inline-block pb-2">
              The Unity University
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
              Founded in 2020 in Hargeisa, Somaliland, The Unity University has quickly established itself as a leading educational institution committed to transforming African higher education.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-b-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Our Journey Through Time</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Key milestones that shaped The Unity University into the institution it is today
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-emerald-200 rounded-full -translate-x-1/2 z-0"></div>
            <div className="flex flex-col gap-16">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className="relative flex md:items-center">
                  {/* Desktop: alternate left/right, Mobile: always center */}
                  <div className={`flex-1 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} md:pr-8 md:pl-8`}> 
                    <div className={`w-full max-w-md ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} md:text-right text-center`}>
                      <div className="inline-block bg-white rounded-md shadow border-2 border-gray-100 overflow-hidden text-left align-top">
                        <div className="relative h-40 sm:h-48">
                          <Image src={event.image || "/events/the-unity-university-indipendence-day-somaliland-01.jpg"} alt={
                            event.title === 'Foundation in Hargeisa'
                              ? 'Historic photo of The Unity University founding'
                              : event.title === 'First Academic Programs'
                              ? 'Unity University students at first graduation ceremony'
                              : event.title === 'Research & Innovation'
                              ? 'Unity University receives accreditation milestone'
                              : event.title
                          } fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-100/60 to-transparent"></div>
                          <div className="absolute bottom-3 left-3">
                            <Badge className={`text-white text-xs sm:text-sm uppercase tracking-wide ${index === 0 ? 'bg-emerald-700' : index === 3 ? 'bg-red-700' : 'bg-gray-800'}`}>{event.milestone}</Badge>
                          </div>
                        </div>
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center space-x-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                            <Calendar className="h-4 w-4 text-gray-900" />
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{event.year}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">{event.title}</h3>
                          <p className="text-sm sm:text-base text-gray-700 mb-5 leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Dot and Year (center) */}
                  <div className="hidden md:flex flex-col items-center z-10 w-16">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow mb-2"></div>
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-base shadow mb-2">{event.year}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile: show dots and years above each card */}
            <div className="md:hidden flex flex-col gap-16 absolute left-0 right-0 top-0 pointer-events-none">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className="flex flex-col items-center mb-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow mb-2"></div>
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-base shadow mb-2">{event.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-16 md:py-24 bg-white border-b-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">
                The Founding Vision
              </h2>
              <p className="text-base md:text-xl text-gray-700 mb-6 leading-relaxed">
                The Unity University was born from a simple yet powerful vision: to create an institution that would bridge the educational gap in Africa while maintaining the highest international standards.
              </p>
              <p className="text-sm md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                Founded in 2020 in Hargeisa, Somaliland, The Unity University emerged with the motto "What begins here, transforms Africa" and a mission to contribute to the development of Somaliland, Africa, and the world. In 2024, we expanded to Liberia, establishing our second campus in Monrovia, creating a truly Pan-African educational network committed to excellence and leadership development.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-5 rounded-md border-2 border-emerald-100 bg-white">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-2">2020</div>
                  <div className="text-sm sm:text-base text-gray-700">Founded</div>
                </div>
                <div className="text-center p-5 rounded-md border-2 border-red-100 bg-white">
                  <div className="text-2xl sm:text-3xl font-bold text-red-700 mb-2">2</div>
                  <div className="text-sm sm:text-base text-gray-700">Campuses</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <Image
                  src="/hero-section/hero.png"
                  alt="Unity University campus historic photo"
                  width={800}
                  height={600}
                  className="rounded-md border-2 border-emerald-100 shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Impact */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-b-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Our Legacy</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Transforming lives and building the future of Africa
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Graduates", value: "12,000+", description: "Alumni worldwide", color: "emerald", image: "/alumni/alumni-09.jpg" },
              { icon: Globe, label: "Countries", value: "45", description: "Student representation", color: "red", image: "/student-life/school-talk.jpg" },
              { icon: Award, label: "Awards", value: "50+", description: "International recognition", color: "gray", image: "/events/the-unity-university-indipendence-day-somaliland-01.jpg" },
              { icon: BookOpen, label: "Research", value: "500+", description: "Published papers", color: "gray", image: "/research/on-the-podium-05.jpg" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-8 rounded-md border-2 shadow-sm bg-white ${stat.color === "emerald" ? "border-emerald-600" : stat.color === "red" ? "border-red-600" : "border-gray-300"}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${stat.color === "emerald" ? "bg-emerald-50" : stat.color === "red" ? "bg-red-50" : "bg-gray-100"}`}>
                  <stat.icon className={`h-8 w-8 ${stat.color === "emerald" ? "text-emerald-700" : stat.color === "red" ? "text-red-700" : "text-gray-700"}`} />
                </div>
                <div className={`text-4xl font-bold mb-2 ${stat.color === "emerald" ? "text-emerald-700" : stat.color === "red" ? "text-red-700" : "text-gray-900"}`}>{stat.value}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Be Part of Our Continuing Story</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 md:mb-12">
            Join thousands of students who have chosen The Unity University to shape their future and contribute to Africa's development.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/admissions/apply">
              <Button
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-10 py-4 text-lg font-bold shadow-md font-serif transition-all duration-200"
              >
                Apply Now
                <ArrowRight className="ml-3 h-6 w-6 text-white" />
              </Button>
            </Link>
            <Link href="/about/leadership">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-full px-10 py-4 text-lg font-bold font-serif transition-all duration-200"
              >
                Meet Our Leaders
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <EnhancedFooter />
    </div>
  )
}
