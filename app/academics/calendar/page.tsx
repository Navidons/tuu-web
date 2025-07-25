"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function AcademicCalendarPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("semester1")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get current year dynamically
  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  useEffect(() => {
    setMounted(true)
  }, [])

  const semesters = [
    { id: "semester1", name: "First Semester", period: `September - December ${currentYear}` },
    { id: "semester2", name: "Second Semester", period: `January - May ${nextYear}` },
    { id: "semester3", name: "Third Semester", period: `June - August ${nextYear}` },
  ]

  const categories = [
    { id: "all", name: "All Events", color: "gray" },
    { id: "registration", name: "Registration", color: "blue" },
    { id: "classes", name: "Classes", color: "green" },
    { id: "exams", name: "Exams", color: "red" },
    { id: "holidays", name: "Holidays", color: "purple" },
    { id: "graduation", name: "Graduation", color: "yellow" },
  ]

  const events = {
    semester1: [
      {
        date: `August 15-30, ${currentYear}`,
        title: "First Semester Registration",
        category: "registration",
        description: `Registration period for all First Semester ${currentYear} courses`,
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: `September 2, ${currentYear}`,
        title: "First Semester Begins",
        category: "classes",
        description: `First day of First Semester ${currentYear} classes`,
        location: "All Campuses",
        type: "event",
      },
      {
        date: `September 16, ${currentYear}`,
        title: "Independence Day Holiday",
        category: "holidays",
        description: "University closed - Somaliland Independence Day",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: `October 14-18, ${currentYear}`,
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-semester examinations for all courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `November 15, ${currentYear}`,
        title: "Eid al-Fitr Holiday",
        category: "holidays",
        description: "University closed - Islamic Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: `December 9-20, ${currentYear}`,
        title: "Final Examinations",
        category: "exams",
        description: `Final examinations for First Semester ${currentYear}`,
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `December 21, ${currentYear}`,
        title: "First Semester Graduation Ceremony",
        category: "graduation",
        description: `Commencement ceremony for First Semester ${currentYear} graduates`,
        location: "Unity Arena",
        type: "event",
      },
    ],
    semester2: [
      {
        date: `December 1-15, ${currentYear}`,
        title: "Second Semester Registration",
        category: "registration",
        description: `Registration period for all Second Semester ${nextYear} courses`,
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: `January 13, ${nextYear}`,
        title: "Second Semester Begins",
        category: "classes",
        description: `First day of Second Semester ${nextYear} classes`,
        location: "All Campuses",
        type: "event",
      },
      {
        date: `February 14, ${nextYear}`,
        title: "Ramadan Break",
        category: "holidays",
        description: "University break for Ramadan observance",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: `March 24-28, ${nextYear}`,
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-semester examinations for all courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `April 22, ${nextYear}`,
        title: "Eid al-Adha Holiday",
        category: "holidays",
        description: "University closed - Islamic Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: `May 5-16, ${nextYear}`,
        title: "Final Examinations",
        category: "exams",
        description: `Final examinations for Second Semester ${nextYear}`,
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `May 24, ${nextYear}`,
        title: "Second Semester Graduation Ceremony",
        category: "graduation",
        description: `Commencement ceremony for Second Semester ${nextYear} graduates`,
        location: "Unity Arena",
        type: "event",
      },
    ],
    semester3: [
      {
        date: `April 15-30, ${nextYear}`,
        title: "Third Semester Registration",
        category: "registration",
        description: `Registration period for Third Semester ${nextYear} courses`,
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: `June 2, ${nextYear}`,
        title: "Third Semester Begins",
        category: "classes",
        description: `First day of Third Semester ${nextYear} classes`,
        location: "All Campuses",
        type: "event",
      },
      {
        date: `June 26, ${nextYear}`,
        title: "Unity Day Holiday",
        category: "holidays",
        description: "University closed - Somaliland Unity Day",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: `July 14-18, ${nextYear}`,
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-semester examinations for third semester courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `August 18-22, ${nextYear}`,
        title: "Final Examinations",
        category: "exams",
        description: `Final examinations for Third Semester ${nextYear}`,
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: `August 30, ${nextYear}`,
        title: "Third Semester Graduation Ceremony",
        category: "graduation",
        description: `Commencement ceremony for Third Semester ${nextYear} graduates`,
        location: "Unity Arena",
        type: "event",
      },
    ],
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      registration: "bg-blue-100 text-blue-700 border-blue-200",
      classes: "bg-green-100 text-green-700 border-green-200",
      exams: "bg-red-100 text-red-700 border-red-200",
      holidays: "bg-purple-100 text-purple-700 border-purple-200",
      graduation: "bg-yellow-100 text-yellow-700 border-yellow-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return Clock
      case "exam":
        return Users
      case "holiday":
        return Calendar
      default:
        return Calendar
    }
  }

  const filteredEvents = events[selectedSemester as keyof typeof events].filter(
    (event) => selectedCategory === "all" || event.category === selectedCategory
  )

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Event",
              "name": "Semester 1 Registration",
              "description": "Registration period for the first semester.",
              "startDate": "2024-09-01",
              "endDate": "2024-09-10",
              "location": {
                "@type": "Place",
                "name": "The Unity University Campuses"
              },
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "First Semester Classes Begin",
              "description": "Start of classes for the first semester.",
              "startDate": "2024-09-15",
              "location": {
                "@type": "Place",
                "name": "The Unity University Campuses"
              },
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "Midterm Exams",
              "description": "Midterm examinations for all programs.",
              "startDate": "2024-11-01",
              "endDate": "2024-11-05",
              "location": {
                "@type": "Place",
                "name": "The Unity University Campuses"
              },
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            },
            {
              "@type": "Event",
              "name": "Graduation Ceremony",
              "description": "Annual graduation ceremony for all graduating students.",
              "startDate": "2025-07-20",
              "location": {
                "@type": "Place",
                "name": "Main Auditorium, The Unity University"
              },
              "organizer": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              }
            }
          ]
        }` }} />
      </Head>
      <div className="min-h-screen bg-white">
        <EnhancedNavbar />

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-[#faf9f7] border-b border-gray-200 font-serif overflow-hidden">
          {/* Full-width background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-section/hero.png"
              alt="Unity University campus"
              className="object-cover w-full h-full absolute inset-0"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0">
            {/* Left: Textual content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left md:pr-12 bg-white/90 rounded-2xl p-8 md:p-12 shadow-lg">
              <Badge className="bg-emerald-700 text-white px-6 py-2 text-base font-semibold shadow mb-4 font-serif">
                Academic Calendar
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 font-serif">
                Academic Calendar {currentYear}-{nextYear}
              </h1>
              <div className="w-12 h-1 bg-emerald-700 rounded-full mb-4" />
              <p className="text-lg md:text-xl text-gray-700 mb-6 font-sans">
                Stay up to date with key academic dates, deadlines, and events for the {currentYear}-{nextYear} academic year.
              </p>
            </div>
            {/* Right: Calendar image or illustration */}
            <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
                <img
                  src="/hero-section/hero.png"
                  alt="Academic Calendar Illustration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Events Section */}
        <section className="py-12 md:py-16 bg-[#faf9f7] border-y border-gray-200 font-serif">
          <div className="container mx-auto px-4">
            {/* Semester Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
              {semesters.map((sem) => (
                <button
                  key={sem.id}
                  className={`px-4 py-2 text-sm md:px-5 md:py-2 rounded-full border font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700
                    ${selectedSemester === sem.id ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-300'}`}
                  onClick={() => setSelectedSemester(sem.id)}
                >
                  {sem.name}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-4 py-1 text-xs md:text-sm rounded-full border font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700
                    ${selectedCategory === cat.id ? 'border-pink-600 bg-pink-50 text-pink-800' : 'border-gray-300 bg-white text-gray-700 hover:border-pink-300'}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-5 max-w-3xl mx-auto">
              {filteredEvents.map((event, idx) => {
                const Icon = getEventIcon(event.type)
                return (
                  <motion.div
                    key={`${event.title}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white rounded-xl border border-gray-300 p-5 shadow-sm flex items-start gap-3"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 mr-3">
                      <Icon className="h-5 w-5 text-gray-500" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1 font-serif">{event.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 font-sans">{event.description}</p>
                      <div className="text-xs text-gray-500 flex items-center gap-2 font-sans">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {filteredEvents.length === 0 && (
                <p className="text-center text-gray-500">No events found for the selected filters.</p>
              )}
            </div>
          </div>
        </section>

        {/* Site Footer */}
        <EnhancedFooter />
      </div>
    </>
  )
}
