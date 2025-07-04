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
  const [selectedSemester, setSelectedSemester] = useState("fall2024")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  const semesters = [
    { id: "fall2024", name: "Fall 2024", period: "September - December 2024" },
    { id: "spring2025", name: "Spring 2025", period: "January - May 2025" },
    { id: "summer2025", name: "Summer 2025", period: "June - August 2025" },
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
    fall2024: [
      {
        date: "August 15-30, 2024",
        title: "Fall Semester Registration",
        category: "registration",
        description: "Registration period for all Fall 2024 courses",
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: "September 2, 2024",
        title: "Fall Semester Begins",
        category: "classes",
        description: "First day of Fall 2024 classes",
        location: "All Campuses",
        type: "event",
      },
      {
        date: "September 16, 2024",
        title: "Independence Day Holiday",
        category: "holidays",
        description: "University closed - National Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "October 14-18, 2024",
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-semester examinations for all courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "November 11, 2024",
        title: "Veterans Day Holiday",
        category: "holidays",
        description: "University closed - National Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "November 25-29, 2024",
        title: "Thanksgiving Break",
        category: "holidays",
        description: "Thanksgiving holiday break",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "December 9-20, 2024",
        title: "Final Examinations",
        category: "exams",
        description: "Final examinations for Fall 2024 semester",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "December 21, 2024",
        title: "Fall Graduation Ceremony",
        category: "graduation",
        description: "Commencement ceremony for Fall 2024 graduates",
        location: "Unity Arena",
        type: "event",
      },
    ],
    spring2025: [
      {
        date: "December 1-15, 2024",
        title: "Spring Semester Registration",
        category: "registration",
        description: "Registration period for all Spring 2025 courses",
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: "January 13, 2025",
        title: "Spring Semester Begins",
        category: "classes",
        description: "First day of Spring 2025 classes",
        location: "All Campuses",
        type: "event",
      },
      {
        date: "January 20, 2025",
        title: "Martin Luther King Jr. Day",
        category: "holidays",
        description: "University closed - National Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "March 10-14, 2025",
        title: "Spring Break",
        category: "holidays",
        description: "Spring break holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "March 24-28, 2025",
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-semester examinations for all courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "May 5-16, 2025",
        title: "Final Examinations",
        category: "exams",
        description: "Final examinations for Spring 2025 semester",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "May 24, 2025",
        title: "Spring Graduation Ceremony",
        category: "graduation",
        description: "Commencement ceremony for Spring 2025 graduates",
        location: "Unity Arena",
        type: "event",
      },
    ],
    summer2025: [
      {
        date: "April 15-30, 2025",
        title: "Summer Session Registration",
        category: "registration",
        description: "Registration period for Summer 2025 courses",
        location: "Online Portal",
        type: "deadline",
      },
      {
        date: "June 2, 2025",
        title: "Summer Session Begins",
        category: "classes",
        description: "First day of Summer 2025 classes",
        location: "All Campuses",
        type: "event",
      },
      {
        date: "July 4, 2025",
        title: "Independence Day Holiday",
        category: "holidays",
        description: "University closed - National Holiday",
        location: "All Campuses",
        type: "holiday",
      },
      {
        date: "July 14-18, 2025",
        title: "Mid-term Examinations",
        category: "exams",
        description: "Mid-session examinations for summer courses",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "August 18-22, 2025",
        title: "Final Examinations",
        category: "exams",
        description: "Final examinations for Summer 2025 session",
        location: "Examination Halls",
        type: "exam",
      },
      {
        date: "August 30, 2025",
        title: "Summer Graduation Ceremony",
        category: "graduation",
        description: "Commencement ceremony for Summer 2025 graduates",
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
      <section className="relative py-32 overflow-hidden">
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
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">Academic Calendar</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter & Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Semester Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {semesters.map((sem) => (
              <Button
                key={sem.id}
                variant={selectedSemester === sem.id ? "default" : "outline"}
                className="px-5 py-2"
                onClick={() => setSelectedSemester(sem.id)}
              >
                {sem.name}
              </Button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "secondary" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {filteredEvents.map((event, idx) => {
              const Icon = getEventIcon(event.type)
              return (
                <motion.div
                  key={`${event.title}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`bg-white rounded-xl border-l-4 p-6 shadow ${getCategoryColor(event.category)}`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="h-6 w-6 shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {event.date}
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
