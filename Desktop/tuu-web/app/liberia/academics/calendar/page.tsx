"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  Calendar,
  ChevronRight,
  Star,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  AlertCircle,
  Download,
  Filter,
  Search,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

// Enhanced Liberian flag component
const LiberianFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}>
      <div className="h-full w-full liberian-flag-gradient"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <Star className="h-2 w-2 text-white fill-white" />
      </div>
    </div>
  )
}

// Breadcrumb component
const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/academics" className="hover:text-blue-600 transition-colors">
        Academics
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">Academic Calendar</span>
    </nav>
  )
}

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const academicEvents = [
    // Spring 2024
    {
      id: "spring-registration",
      title: "Spring Semester Registration Opens",
      date: "2024-01-08",
      endDate: "2024-01-15",
      semester: "spring",
      year: "2024",
      type: "registration",
      description: "Online registration for Spring 2024 semester courses",
      important: true,
    },
    {
      id: "spring-classes-begin",
      title: "Spring Semester Classes Begin",
      date: "2024-01-22",
      semester: "spring",
      year: "2024",
      type: "academic",
      description: "First day of classes for Spring 2024 semester",
      important: true,
    },
    {
      id: "add-drop-deadline",
      title: "Add/Drop Deadline",
      date: "2024-02-05",
      semester: "spring",
      year: "2024",
      type: "deadline",
      description: "Last day to add or drop courses without penalty",
      important: true,
    },
    {
      id: "midterm-exams",
      title: "Midterm Examinations",
      date: "2024-03-11",
      endDate: "2024-03-15",
      semester: "spring",
      year: "2024",
      type: "exam",
      description: "Midterm examination period for all courses",
    },
    {
      id: "spring-break",
      title: "Spring Break",
      date: "2024-03-25",
      endDate: "2024-03-29",
      semester: "spring",
      year: "2024",
      type: "break",
      description: "Spring break - no classes",
    },
    {
      id: "spring-finals",
      title: "Final Examinations",
      date: "2024-05-06",
      endDate: "2024-05-10",
      semester: "spring",
      year: "2024",
      type: "exam",
      description: "Final examination period for Spring semester",
      important: true,
    },
    {
      id: "spring-graduation",
      title: "Spring Commencement Ceremony",
      date: "2024-05-18",
      semester: "spring",
      year: "2024",
      type: "ceremony",
      description: "Graduation ceremony for Spring 2024 graduates",
      important: true,
    },

    // Summer 2024
    {
      id: "summer-registration",
      title: "Summer Session Registration",
      date: "2024-04-15",
      endDate: "2024-04-22",
      semester: "summer",
      year: "2024",
      type: "registration",
      description: "Registration for Summer 2024 intensive courses",
    },
    {
      id: "summer-classes-begin",
      title: "Summer Session Begins",
      date: "2024-06-03",
      semester: "summer",
      year: "2024",
      type: "academic",
      description: "First day of Summer 2024 intensive courses",
    },
    {
      id: "summer-finals",
      title: "Summer Session Finals",
      date: "2024-07-26",
      endDate: "2024-07-29",
      semester: "summer",
      year: "2024",
      type: "exam",
      description: "Final examinations for Summer session",
    },

    // Fall 2024
    {
      id: "fall-registration",
      title: "Fall Semester Registration Opens",
      date: "2024-07-15",
      endDate: "2024-07-22",
      semester: "fall",
      year: "2024",
      type: "registration",
      description: "Online registration for Fall 2024 semester courses",
      important: true,
    },
    {
      id: "orientation",
      title: "New Student Orientation",
      date: "2024-08-19",
      endDate: "2024-08-21",
      semester: "fall",
      year: "2024",
      type: "orientation",
      description: "Orientation program for new undergraduate and graduate students",
      important: true,
    },
    {
      id: "fall-classes-begin",
      title: "Fall Semester Classes Begin",
      date: "2024-08-26",
      semester: "fall",
      year: "2024",
      type: "academic",
      description: "First day of classes for Fall 2024 semester",
      important: true,
    },
    {
      id: "independence-day",
      title: "Independence Day Holiday",
      date: "2024-07-26",
      semester: "fall",
      year: "2024",
      type: "holiday",
      description: "Liberian Independence Day - University closed",
    },
    {
      id: "fall-midterms",
      title: "Fall Midterm Examinations",
      date: "2024-10-14",
      endDate: "2024-10-18",
      semester: "fall",
      year: "2024",
      type: "exam",
      description: "Midterm examination period for Fall semester",
    },
    {
      id: "thanksgiving-break",
      title: "Thanksgiving Break",
      date: "2024-11-28",
      endDate: "2024-11-29",
      semester: "fall",
      year: "2024",
      type: "break",
      description: "Thanksgiving holiday break",
    },
    {
      id: "fall-finals",
      title: "Fall Final Examinations",
      date: "2024-12-09",
      endDate: "2024-12-13",
      semester: "fall",
      year: "2024",
      type: "exam",
      description: "Final examination period for Fall semester",
      important: true,
    },
    {
      id: "winter-break",
      title: "Winter Break Begins",
      date: "2024-12-16",
      semester: "fall",
      year: "2024",
      type: "break",
      description: "Winter break begins - classes resume in January",
    },
  ]

  const eventTypes = [
    { value: "all", label: "All Events", color: "gray" },
    { value: "registration", label: "Registration", color: "blue" },
    { value: "academic", label: "Academic", color: "green" },
    { value: "exam", label: "Examinations", color: "red" },
    { value: "deadline", label: "Deadlines", color: "orange" },
    { value: "ceremony", label: "Ceremonies", color: "purple" },
    { value: "break", label: "Breaks", color: "yellow" },
    { value: "holiday", label: "Holidays", color: "pink" },
    { value: "orientation", label: "Orientation", color: "indigo" },
  ]

  const semesters = [
    { value: "all", label: "All Semesters" },
    { value: "spring", label: "Spring 2024" },
    { value: "summer", label: "Summer 2024" },
    { value: "fall", label: "Fall 2024" },
  ]

  const filteredEvents = academicEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "all" || event.semester === selectedSemester
    const matchesYear = event.year === selectedYear
    return matchesSearch && matchesSemester && matchesYear
  })

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType?.color || "gray"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb />
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <LiberianFlag className="h-8 w-12" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-bold">
                Academic Year 2024
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Academic Calendar</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Stay informed with important dates, deadlines, and events throughout the academic year at Unity University
              Liberia. Plan your academic journey with our comprehensive calendar of key dates and milestones.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                  Download PDF Calendar
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    Apply Now
                    <GraduationCap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: BookOpen, title: "Spring 2024", subtitle: "Jan 22 - May 18", color: "green" },
              { icon: Clock, title: "Summer 2024", subtitle: "Jun 3 - Jul 29", color: "yellow" },
              { icon: GraduationCap, title: "Fall 2024", subtitle: "Aug 26 - Dec 13", color: "blue" },
              { icon: Users, title: "Orientation", subtitle: "Aug 19 - 21", color: "purple" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <item.icon className={`h-8 w-8 text-${item.color}-600 mx-auto mb-4`} />
                <div className="text-xl font-bold text-gray-900 mb-2">{item.title}</div>
                <div className="text-gray-600">{item.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Academic Events</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                <div className="md:w-48">
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="py-3 text-lg">
                      <Filter className="h-5 w-5 mr-2" />
                      <SelectValue placeholder="Filter by semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.value} value={semester.value}>
                          {semester.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="semester">By Semester</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {filteredEvents.map((event, index) => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <Card
                      className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${event.important ? "border-l-4 border-l-red-500" : ""}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge
                                variant="secondary"
                                className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800`}
                              >
                                {eventTypes.find((t) => t.value === event.type)?.label}
                              </Badge>
                              {event.important && (
                                <Badge variant="destructive" className="bg-red-100 text-red-800">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Important
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(event.date)}
                              {event.endDate && ` - ${formatDate(event.endDate)}`}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6 text-right">
                            <div className="text-2xl font-bold text-blue-600">{formatDateShort(event.date)}</div>
                            <div className="text-sm text-gray-500 capitalize">
                              {event.semester} {event.year}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {filteredEvents.length === 0 && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or filters.</p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="semester">
              <div className="space-y-12">
                {["spring", "summer", "fall"].map((semester) => {
                  const semesterEvents = filteredEvents.filter((event) => event.semester === semester)
                  if (semesterEvents.length === 0) return null

                  return (
                    <motion.div
                      key={semester}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize">{semester} 2024 Semester</h2>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {semesterEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <CardHeader className={`bg-${getEventTypeColor(event.type)}-50 pb-4`}>
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="secondary"
                                  className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800`}
                                >
                                  {eventTypes.find((t) => t.value === event.type)?.label}
                                </Badge>
                                {event.important && <AlertCircle className="h-5 w-5 text-red-500" />}
                              </div>
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <p className="text-gray-600 mb-4">{event.description}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDateShort(event.date)}
                                {event.endDate && ` - ${formatDateShort(event.endDate)}`}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Important Reminders */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Important Reminders</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay on track with these essential academic guidelines and deadlines.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                icon: AlertCircle,
                title: "Registration Deadlines",
                description:
                  "Register early to secure your preferred courses. Late registration may incur additional fees.",
                color: "red",
              },
              {
                icon: Clock,
                title: "Add/Drop Period",
                description: "You have until the add/drop deadline to modify your course schedule without penalty.",
                color: "orange",
              },
              {
                icon: GraduationCap,
                title: "Graduation Requirements",
                description: "Ensure you meet all degree requirements before the graduation application deadline.",
                color: "green",
              },
              {
                icon: BookOpen,
                title: "Academic Standing",
                description: "Maintain good academic standing to remain eligible for financial aid and enrollment.",
                color: "blue",
              },
              {
                icon: Users,
                title: "Orientation Attendance",
                description: "New students must attend orientation sessions before classes begin.",
                color: "purple",
              },
              {
                icon: MapPin,
                title: "Campus Resources",
                description: "Take advantage of academic support services, library resources, and student services.",
                color: "indigo",
              },
            ].map((reminder, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <reminder.icon className={`h-12 w-12 text-${reminder.color}-600 mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reminder.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reminder.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-800 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <LiberianFlag className="h-12 w-20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Academic Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't miss important deadlines! Stay informed with our academic calendar and take the next step toward
              your educational goals at Unity University Liberia.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    Apply for Admission
                    <GraduationCap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold bg-transparent"
                >
                  Download Full Calendar
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
}
