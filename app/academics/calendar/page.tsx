"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen bg-white">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-red-900 to-slate-900">
          {mounted && (
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('/placeholder.svg?height=1200&width=1920')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center text-white">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Badge className="bg-red-600 text-white px-6 py-3 text-lg font-bold shadow-2xl mb-8">
                Academic Calendar
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">Academic Calendar</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter & Events Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Semester Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
            {semesters.map((sem) => (
              <Button
                key={sem.id}
                variant={selectedSemester === sem.id ? "default" : "outline"}
                className="px-4 py-2 text-sm md:px-5 md:py-2"
                onClick={() => setSelectedSemester(sem.id)}
              >
                {sem.name}
              </Button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "secondary" : "outline"}
                className="text-xs md:text-sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
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
                  className={`bg-white rounded-xl border-l-4 p-5 shadow ${getCategoryColor(event.category)}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </div>
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
  )
}
