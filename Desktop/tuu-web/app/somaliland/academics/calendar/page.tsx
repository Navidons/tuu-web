"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle,
  Star,
  Download,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function CalendarPage() {
  const [selectedSemester, setSelectedSemester] = useState("fall2024")
  const [selectedEventType, setSelectedEventType] = useState("all")

  const academicYear = {
    fall2024: {
      title: "Fall Semester 2024",
      titleSo: "Semesterka Dayrta 2024",
      period: "September 15 - December 20, 2024",
      events: [
        {
          date: "2024-09-01",
          title: "Registration Opens",
          titleSo: "Diiwaan-gelinta Furmaan",
          type: "registration",
          description: "Online registration opens for all continuing students",
          time: "8:00 AM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2024-09-10",
          title: "New Student Orientation",
          titleSo: "Hagidda Ardayda Cusub",
          type: "orientation",
          description: "Welcome ceremony and campus tour for new students",
          time: "9:00 AM - 4:00 PM",
          location: "Main Campus Auditorium",
          priority: "high",
        },
        {
          date: "2024-09-15",
          title: "Classes Begin",
          titleSo: "Fasalladaha Bilaabmaan",
          type: "academic",
          description: "First day of classes for Fall 2024 semester",
          time: "8:00 AM",
          location: "All Campuses",
          priority: "critical",
        },
        {
          date: "2024-09-22",
          title: "Add/Drop Deadline",
          titleSo: "Xilliga Dhammaadka Ku-darista/Ka-bixinta",
          type: "deadline",
          description: "Last day to add or drop courses without penalty",
          time: "11:59 PM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2024-10-10",
          title: "Mid-term Exams Begin",
          titleSo: "Imtixaannada Dhexe Bilaabmaan",
          type: "exam",
          description: "Mid-semester examinations start",
          time: "8:00 AM",
          location: "Examination Halls",
          priority: "high",
        },
        {
          date: "2024-10-18",
          title: "Mid-term Exams End",
          titleSo: "Imtixaannada Dhexe Dhammaadaan",
          type: "exam",
          description: "Mid-semester examinations conclude",
          time: "6:00 PM",
          location: "Examination Halls",
          priority: "high",
        },
        {
          date: "2024-10-25",
          title: "Research Symposium",
          titleSo: "Shirka Cilmi-baadhista",
          type: "event",
          description: "Annual student and faculty research presentations",
          time: "9:00 AM - 5:00 PM",
          location: "Conference Center",
          priority: "medium",
        },
        {
          date: "2024-11-15",
          title: "Spring Registration Opens",
          titleSo: "Diiwaan-gelinta Gu'ga Furmaan",
          type: "registration",
          description: "Registration opens for Spring 2025 semester",
          time: "8:00 AM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2024-11-28",
          title: "Thanksgiving Break",
          titleSo: "Nasashada Mahadcelinta",
          type: "holiday",
          description: "University closed for Thanksgiving holiday",
          time: "All Day",
          location: "All Campuses",
          priority: "medium",
        },
        {
          date: "2024-12-10",
          title: "Final Exams Begin",
          titleSo: "Imtixaannada Dhammaadka Bilaabmaan",
          type: "exam",
          description: "Final examinations start",
          time: "8:00 AM",
          location: "Examination Halls",
          priority: "critical",
        },
        {
          date: "2024-12-20",
          title: "Final Exams End",
          titleSo: "Imtixaannada Dhammaadka Dhammaadaan",
          type: "exam",
          description: "Final examinations conclude",
          time: "6:00 PM",
          location: "Examination Halls",
          priority: "critical",
        },
        {
          date: "2024-12-22",
          title: "Grades Due",
          titleSo: "Calaamaduhu waa in la soo gudbiyo",
          type: "deadline",
          description: "Faculty deadline for submitting final grades",
          time: "11:59 PM",
          location: "Online System",
          priority: "high",
        },
      ],
    },
    spring2025: {
      title: "Spring Semester 2025",
      titleSo: "Semesterka Gu'ga 2025",
      period: "February 10 - May 25, 2025",
      events: [
        {
          date: "2025-01-15",
          title: "Registration Opens",
          titleSo: "Diiwaan-gelinta Furmaan",
          type: "registration",
          description: "Online registration opens for Spring 2025",
          time: "8:00 AM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2025-02-05",
          title: "New Student Orientation",
          titleSo: "Hagidda Ardayda Cusub",
          type: "orientation",
          description: "Orientation for new Spring semester students",
          time: "9:00 AM - 4:00 PM",
          location: "Main Campus Auditorium",
          priority: "high",
        },
        {
          date: "2025-02-10",
          title: "Classes Begin",
          titleSo: "Fasalladaha Bilaabmaan",
          type: "academic",
          description: "First day of classes for Spring 2025 semester",
          time: "8:00 AM",
          location: "All Campuses",
          priority: "critical",
        },
        {
          date: "2025-02-17",
          title: "Add/Drop Deadline",
          titleSo: "Xilliga Dhammaadka Ku-darista/Ka-bixinta",
          type: "deadline",
          description: "Last day to add or drop courses",
          time: "11:59 PM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2025-03-15",
          title: "Mid-term Exams",
          titleSo: "Imtixaannada Dhexe",
          type: "exam",
          description: "Mid-semester examinations",
          time: "8:00 AM - 6:00 PM",
          location: "Examination Halls",
          priority: "high",
        },
        {
          date: "2025-03-24",
          title: "Spring Break",
          titleSo: "Nasashada Gu'ga",
          type: "holiday",
          description: "Spring break - no classes",
          time: "All Week",
          location: "All Campuses",
          priority: "medium",
        },
        {
          date: "2025-04-15",
          title: "Research Conference",
          titleSo: "Shirka Cilmi-baadhista",
          type: "event",
          description: "Annual research conference and presentations",
          time: "9:00 AM - 6:00 PM",
          location: "Conference Center",
          priority: "medium",
        },
        {
          date: "2025-04-20",
          title: "Career Fair",
          titleSo: "Bandhigga Shaqooyinka",
          type: "event",
          description: "Annual career fair with local and international employers",
          time: "10:00 AM - 4:00 PM",
          location: "Sports Complex",
          priority: "medium",
        },
        {
          date: "2025-05-10",
          title: "Final Exams Begin",
          titleSo: "Imtixaannada Dhammaadka Bilaabmaan",
          type: "exam",
          description: "Final examinations start",
          time: "8:00 AM",
          location: "Examination Halls",
          priority: "critical",
        },
        {
          date: "2025-05-20",
          title: "Final Exams End",
          titleSo: "Imtixaannada Dhammaadka Dhammaadaan",
          type: "exam",
          description: "Final examinations conclude",
          time: "6:00 PM",
          location: "Examination Halls",
          priority: "critical",
        },
        {
          date: "2025-05-25",
          title: "Graduation Ceremony",
          titleSo: "Xaflada Qalin-jabinta",
          type: "graduation",
          description: "Commencement ceremony for graduating students",
          time: "10:00 AM",
          location: "Main Campus Stadium",
          priority: "critical",
        },
      ],
    },
    summer2025: {
      title: "Summer Programs 2025",
      titleSo: "Barnaamijyada Xagaaga 2025",
      period: "June 15 - August 30, 2025",
      events: [
        {
          date: "2025-06-01",
          title: "Summer Registration",
          titleSo: "Diiwaan-gelinta Xagaaga",
          type: "registration",
          description: "Registration for summer programs and courses",
          time: "8:00 AM",
          location: "Online Portal",
          priority: "high",
        },
        {
          date: "2025-06-15",
          title: "Summer Classes Begin",
          titleSo: "Fasalladaha Xagaaga Bilaabmaan",
          type: "academic",
          description: "Summer semester classes commence",
          time: "8:00 AM",
          location: "All Campuses",
          priority: "high",
        },
        {
          date: "2025-07-01",
          title: "Internship Program Starts",
          titleSo: "Barnaamijka Tababarka Bilaabmaa",
          type: "program",
          description: "Summer internship program begins",
          time: "9:00 AM",
          location: "Various Organizations",
          priority: "medium",
        },
        {
          date: "2025-07-15",
          title: "Mid-summer Assessment",
          titleSo: "Qiimaynta Badhtamaha Xagaaga",
          type: "exam",
          description: "Mid-summer evaluations and assessments",
          time: "8:00 AM - 5:00 PM",
          location: "Examination Halls",
          priority: "medium",
        },
        {
          date: "2025-08-15",
          title: "Research Projects Due",
          titleSo: "Mashaariicda Cilmi-baadhista la soo gudbiyo",
          type: "deadline",
          description: "Summer research project submissions",
          time: "11:59 PM",
          location: "Online Submission",
          priority: "high",
        },
        {
          date: "2025-08-25",
          title: "Summer Final Exams",
          titleSo: "Imtixaannada Dhammaadka Xagaaga",
          type: "exam",
          description: "Final examinations for summer courses",
          time: "8:00 AM - 6:00 PM",
          location: "Examination Halls",
          priority: "high",
        },
        {
          date: "2025-08-30",
          title: "Summer Graduation",
          titleSo: "Qalin-jabinta Xagaaga",
          type: "graduation",
          description: "Summer graduation ceremony",
          time: "4:00 PM",
          location: "Main Campus Auditorium",
          priority: "high",
        },
      ],
    },
  }

  const eventTypes = [
    { key: "all", label: "All Events", labelSo: "Dhammaan Dhacdooyinka", icon: Calendar, color: "gray" },
    { key: "academic", label: "Academic", labelSo: "Waxbarasho", icon: BookOpen, color: "blue" },
    { key: "exam", label: "Examinations", labelSo: "Imtixaanno", icon: Award, color: "red" },
    { key: "registration", label: "Registration", labelSo: "Diiwaan-gelin", icon: Users, color: "green" },
    { key: "event", label: "Events", labelSo: "Dhacdooyin", icon: Star, color: "purple" },
    { key: "deadline", label: "Deadlines", labelSo: "Xilliyo", icon: AlertCircle, color: "orange" },
    { key: "holiday", label: "Holidays", labelSo: "Fasax", icon: CheckCircle, color: "teal" },
    { key: "graduation", label: "Graduation", labelSo: "Qalin-jabin", icon: GraduationCap, color: "emerald" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 border-red-500 text-red-800"
      case "high":
        return "bg-orange-100 border-orange-500 text-orange-800"
      case "medium":
        return "bg-blue-100 border-blue-500 text-blue-800"
      default:
        return "bg-gray-100 border-gray-500 text-gray-800"
    }
  }

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find((et) => et.key === type)
    return eventType ? eventType.color : "gray"
  }

  const filteredEvents = academicYear[selectedSemester as keyof typeof academicYear].events.filter(
    (event) => selectedEventType === "all" || event.type === selectedEventType,
  )

  const upcomingEvents = filteredEvents.slice(0, 5)

  return (
    <div className="min-h-screen bg-white">
      <SomalilandNavbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Badge className="bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 text-lg font-bold">
                Academic Calendar
              </Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Academic <span className="text-emerald-300">Calendar</span>
            </h1>
            <h2 className="text-3xl font-semibold text-emerald-200 mb-8">Jadwalka Waxbarasho</h2>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Stay informed about important academic dates, deadlines, and events throughout the academic year. Plan
              your academic journey with our comprehensive calendar.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-bold">
                <Download className="mr-3 h-5 w-5" />
                Download Calendar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Bell className="mr-3 h-5 w-5" />
                Set Reminders
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Navigation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Academic{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-red-600 bg-clip-text text-transparent">Year</span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Sanadka Waxbarasho</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Navigate through our academic year to find important dates, deadlines, and events for each semester.
            </p>
          </motion.div>

          {/* Semester Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(academicYear).map(([key, semester]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedSemester(key)}
                className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                  selectedSemester === key
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="h-8 w-8 mx-auto mb-3" />
                <h4 className="text-lg font-bold mb-2">{semester.title}</h4>
                <p className="text-sm opacity-80">{semester.titleSo}</p>
                <p className="text-xs mt-2 opacity-70">{semester.period}</p>
              </motion.button>
            ))}
          </div>

          {/* Event Type Filter */}
          <div className="mb-12">
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Filter by Event Type</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.key}
                  onClick={() => setSelectedEventType(type.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedEventType === type.key
                      ? `bg-${type.color}-600 text-white shadow-lg`
                      : `bg-${type.color}-100 text-${type.color}-700 hover:bg-${type.color}-200`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <type.icon className="h-4 w-4" />
                  <span>{type.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Calendar Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Calendar */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-6 w-6 text-emerald-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-bold">
                          {academicYear[selectedSemester as keyof typeof academicYear].title}
                        </h3>
                        <p className="text-sm text-emerald-600">
                          {academicYear[selectedSemester as keyof typeof academicYear].titleSo}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">{filteredEvents.length} Events</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`p-4 rounded-xl border-l-4 ${getPriorityColor(event.priority)} hover:shadow-md transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge
                                className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800 text-xs`}
                              >
                                {event.type}
                              </Badge>
                              <span className="text-sm font-medium text-gray-600">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h4>
                            <p className="text-sm text-emerald-600 mb-2">{event.titleSo}</p>
                            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Badge
                              className={`${
                                event.priority === "critical"
                                  ? "bg-red-600"
                                  : event.priority === "high"
                                    ? "bg-orange-600"
                                    : "bg-blue-600"
                              } text-white text-xs`}
                            >
                              {event.priority}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 text-emerald-600 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-emerald-600">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <Badge className="text-xs" variant="secondary">
                            {event.type}
                          </Badge>
                        </div>
                        <h5 className="text-sm font-semibold text-gray-900">{event.title}</h5>
                        <p className="text-xs text-gray-600">{event.titleSo}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Calendar
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Subscribe to Updates
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Google Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Important Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    Important Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredEvents
                      .filter((event) => event.type === "deadline" || event.priority === "critical")
                      .slice(0, 4)
                      .map((event, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-red-600">
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <AlertCircle className="h-3 w-3 text-red-600" />
                          </div>
                          <h5 className="text-sm font-semibold text-gray-900">{event.title}</h5>
                          <p className="text-xs text-red-600">{event.titleSo}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-red-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Connected with Your Academic Journey</h2>
            <h3 className="text-2xl font-semibold text-emerald-200 mb-8">Safarka Waxbarashadaada la Xiriir</h3>

            <p className="text-xl leading-relaxed mb-12 opacity-95">
              Never miss an important date or deadline. Subscribe to our calendar updates and stay informed about all
              academic activities and events.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl"
                >
                  <Bell className="mr-3 h-5 w-5" />
                  Subscribe to Updates
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm bg-transparent"
                >
                  <Download className="mr-3 h-5 w-5" />
                  Download Full Calendar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SomalilandFooter />
    </div>
  )
}
