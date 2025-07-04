"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  Calendar,
  ChevronRight,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  AlertCircle,
  Download,
  Filter,
  Search,
  MapPin,
  Bell,
  CalendarDays,
  Timer,
  Star,
  CheckCircle,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"

const LiberiaFlag = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-md shadow-lg border border-white/30 animate-flag-wave")}>
      {/* Stripes */}
      <div className="liberian-flag-gradient w-full h-full" />

      {/* Blue canton with white star */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[12px] h-[12px] text-white fill-current drop-shadow-sm"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

// Breadcrumb component
const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-white/80 mb-8">
      <Link href="/liberia" className="hover:text-white transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/liberia/academics" className="hover:text-white transition-colors">
        Academics
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-white font-medium">Academic Calendar</span>
    </nav>
  )
}

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("timeline")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const academicEvents = [
    // First Semester 2025 (Dry Season)
    {
      id: "first-semester-registration",
      title: "First Semester Registration Opens",
      date: "2025-01-08",
      endDate: "2025-01-15",
      semester: "first",
      year: "2025",
      type: "registration",
      description: "Online registration for First Semester 2025 courses (Dry Season)",
      important: true,
    },
    {
      id: "first-semester-classes-begin",
      title: "First Semester Classes Begin",
      date: "2025-01-22",
      semester: "first",
      year: "2025",
      type: "academic",
      description: "First day of classes for First Semester 2025 (Dry Season)",
      important: true,
    },
    {
      id: "add-drop-deadline",
      title: "Add/Drop Deadline",
      date: "2025-02-05",
      semester: "first",
      year: "2025",
      type: "deadline",
      description: "Last day to add or drop courses without penalty",
      important: true,
    },
    {
      id: "armed-forces-day",
      title: "Armed Forces Day Holiday",
      date: "2025-02-11",
      semester: "first",
      year: "2025",
      type: "holiday",
      description: "Armed Forces Day - University closed",
    },
    {
      id: "midterm-exams",
      title: "Midterm Examinations",
      date: "2025-03-11",
      endDate: "2025-03-15",
      semester: "first",
      year: "2025",
      type: "exam",
      description: "Midterm examination period for all courses",
    },
    {
      id: "first-semester-finals",
      title: "Final Examinations",
      date: "2025-05-06",
      endDate: "2025-05-10",
      semester: "first",
      year: "2025",
      type: "exam",
      description: "Final examination period for First Semester (Dry Season)",
      important: true,
    },
    {
      id: "first-semester-graduation",
      title: "First Semester Commencement Ceremony",
      date: "2025-05-18",
      semester: "first",
      year: "2025",
      type: "ceremony",
      description: "Graduation ceremony for First Semester 2025 graduates",
      important: true,
    },

    // Summer Session 2025 (Rainy Season Transition)
    {
      id: "summer-registration",
      title: "Summer Session Registration",
      date: "2025-04-15",
      endDate: "2025-04-22",
      semester: "summer",
      year: "2025",
      type: "registration",
      description: "Registration for Summer 2025 intensive courses",
    },
    {
      id: "summer-classes-begin",
      title: "Summer Session Begins",
      date: "2025-06-03",
      semester: "summer",
      year: "2025",
      type: "academic",
      description: "First day of Summer 2025 intensive courses",
    },
    {
      id: "summer-finals",
      title: "Summer Session Finals",
      date: "2025-07-26",
      endDate: "2025-07-29",
      semester: "summer",
      year: "2025",
      type: "exam",
      description: "Final examinations for Summer session",
    },

    // Second Semester 2025 (Rainy Season)
    {
      id: "second-semester-registration",
      title: "Second Semester Registration Opens",
      date: "2025-07-15",
      endDate: "2025-07-22",
      semester: "second",
      year: "2025",
      type: "registration",
      description: "Online registration for Second Semester 2025 courses (Rainy Season)",
      important: true,
    },
    {
      id: "orientation",
      title: "New Student Orientation",
      date: "2025-08-19",
      endDate: "2025-08-21",
      semester: "second",
      year: "2025",
      type: "orientation",
      description: "Orientation program for new undergraduate and graduate students",
      important: true,
    },
    {
      id: "second-semester-classes-begin",
      title: "Second Semester Classes Begin",
      date: "2025-08-26",
      semester: "second",
      year: "2025",
      type: "academic",
      description: "First day of classes for Second Semester 2025 (Rainy Season)",
      important: true,
    },
    {
      id: "independence-day",
      title: "Independence Day Holiday",
      date: "2025-07-26",
      semester: "second",
      year: "2025",
      type: "holiday",
      description: "Liberian Independence Day - University closed",
    },
    {
      id: "second-semester-midterms",
      title: "Second Semester Midterm Examinations",
      date: "2025-10-14",
      endDate: "2025-10-18",
      semester: "second",
      year: "2025",
      type: "exam",
      description: "Midterm examination period for Second Semester",
    },
    {
      id: "thanksgiving-day",
      title: "National Thanksgiving Day",
      date: "2025-11-07",
      semester: "second",
      year: "2025",
      type: "holiday",
      description: "Liberian National Thanksgiving Day - University closed",
    },
    {
      id: "second-semester-finals",
      title: "Second Semester Final Examinations",
      date: "2025-12-09",
      endDate: "2025-12-13",
      semester: "second",
      year: "2025",
      type: "exam",
      description: "Final examination period for Second Semester (Rainy Season)",
      important: true,
    },
    {
      id: "dry-season-break",
      title: "Dry Season Break Begins",
      date: "2025-12-16",
      semester: "second",
      year: "2025",
      type: "break",
      description: "Dry season break begins - classes resume in January 2026",
    },
  ]

  const eventTypes = [
    { value: "all", label: "All Events", color: "gray", icon: CalendarDays },
    { value: "registration", label: "Registration", color: "blue", icon: BookOpen },
    { value: "academic", label: "Academic", color: "green", icon: GraduationCap },
    { value: "exam", label: "Examinations", color: "red", icon: AlertCircle },
    { value: "deadline", label: "Deadlines", color: "orange", icon: Timer },
    { value: "ceremony", label: "Ceremonies", color: "purple", icon: Star },
    { value: "break", label: "Breaks", color: "yellow", icon: Clock },
    { value: "holiday", label: "Holidays", color: "pink", icon: MapPin },
    { value: "orientation", label: "Orientation", color: "indigo", icon: Users },
  ]

  const semesters = [
    { value: "all", label: "All Semesters" },
    { value: "first", label: "First Semester 2025 (Dry Season)" },
    { value: "summer", label: "Summer Session 2025" },
    { value: "second", label: "Second Semester 2025 (Rainy Season)" },
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

  const getEventTypeIcon = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType?.icon || CalendarDays
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

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long" })
  }

  const getDay = (dateString: string) => {
    const date = new Date(dateString)
    return date.getDate()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <LiberiaNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 via-red-800 to-blue-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb />
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <LiberiaFlag className="h-10 w-16" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 text-base font-bold border border-white/30">
                Academic Year 2025-2026
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Academic Calendar
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto">
              Stay on track with your academic journey at Unity University Liberia. 
              Our comprehensive calendar keeps you informed of all important dates, 
              deadlines, and events throughout the year.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Calendar
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-bold bg-transparent backdrop-blur-sm"
                  >
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Apply Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Year Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              2025-2026 Academic Year
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our academic calendar is designed around Liberia's natural seasons, 
              optimizing learning during the dry and rainy seasons.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { 
                icon: BookOpen, 
                title: "First Semester", 
                subtitle: "Jan 22 - May 18", 
                season: "Dry Season",
                color: "emerald",
                description: "Perfect weather for intensive learning"
              },
              { 
                icon: Clock, 
                title: "Summer Session", 
                subtitle: "Jun 3 - Jul 29", 
                season: "Transition Period",
                color: "amber",
                description: "Intensive courses and workshops"
              },
              { 
                icon: GraduationCap, 
                title: "Second Semester", 
                subtitle: "Aug 26 - Dec 13", 
                season: "Rainy Season",
                color: "blue",
                description: "Indoor focused academic activities"
              },
              { 
                icon: Users, 
                title: "Orientation", 
                subtitle: "Aug 19 - 21", 
                season: "New Student Welcome",
                color: "purple",
                description: "Welcome and integration programs"
              },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 font-medium mb-1">{item.subtitle}</p>
                    <p className={`text-sm text-${item.color}-600 font-medium mb-3`}>{item.season}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Find Academic Events</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search events, dates, or descriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger className="py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg">
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

                <div className="mt-6 flex flex-wrap gap-2">
                  {eventTypes.slice(1).map((type) => {
                    const Icon = type.icon
                    return (
                      <Badge
                        key={type.value}
                        variant="secondary"
                        className={`bg-${type.color}-100 text-${type.color}-800 hover:bg-${type.color}-200 cursor-pointer transition-colors`}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {type.label}
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="timeline" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Eye className="h-4 w-4 mr-2" />
                Timeline View
              </TabsTrigger>
              <TabsTrigger value="semester" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <CalendarDays className="h-4 w-4 mr-2" />
                By Semester
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {filteredEvents.map((event, index) => {
                  const EventIcon = getEventTypeIcon(event.type)
                  return (
                    <motion.div key={event.id} variants={itemVariants}>
                      <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${event.important ? "ring-2 ring-red-200" : ""}`}>
                        <CardContent className="p-0">
                          <div className="flex">
                            {/* Date Column */}
                            <div className={`w-24 bg-${getEventTypeColor(event.type)}-50 flex flex-col items-center justify-center py-6 border-r-4 border-${getEventTypeColor(event.type)}-200`}>
                              <div className="text-2xl font-bold text-gray-900">
                                {getDay(event.date)}
                              </div>
                              <div className="text-xs text-gray-600 uppercase font-medium">
                                {getMonthName(event.date)}
                              </div>
                            </div>

                            {/* Content Column */}
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-3">
                                    <div className={`p-2 bg-${getEventTypeColor(event.type)}-100 rounded-lg`}>
                                      <EventIcon className={`h-5 w-5 text-${getEventTypeColor(event.type)}-600`} />
                                    </div>
                                    <Badge
                                      variant="secondary"
                                      className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800 font-medium`}
                                    >
                                      {eventTypes.find((t) => t.value === event.type)?.label}
                                    </Badge>
                                    {event.important && (
                                      <Badge variant="destructive" className="bg-red-100 text-red-800 font-medium">
                                        <Bell className="h-3 w-3 mr-1" />
                                        Important
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                                  
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span className="font-medium">{formatDate(event.date)}</span>
                                    {event.endDate && (
                                      <span className="mx-2">→</span>
                                    )}
                                    {event.endDate && (
                                      <span className="font-medium">{formatDate(event.endDate)}</span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="text-right ml-6">
                                  <div className="text-sm text-gray-500 capitalize mb-1">
                                    {event.semester === "first" ? "First Semester" : event.semester === "second" ? "Second Semester" : "Summer Session"}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {event.year}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}

                {filteredEvents.length === 0 && (
                  <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">No events found</h3>
                    <p className="text-gray-600 text-lg">Try adjusting your search terms or filters to find more events.</p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="semester">
              <div className="space-y-16">
                {["first", "summer", "second"].map((semester) => {
                  const semesterEvents = filteredEvents.filter((event) => event.semester === semester)
                  if (semesterEvents.length === 0) return null

                  const semesterTitle = semester === "first" ? "First Semester 2025 (Dry Season)" : 
                                      semester === "second" ? "Second Semester 2025 (Rainy Season)" : 
                                      "Summer Session 2025"

                  return (
                    <motion.div
                      key={semester}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{semesterTitle}</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {semesterEvents.map((event) => {
                          const EventIcon = getEventTypeIcon(event.type)
                          return (
                            <Card
                              key={event.id}
                              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 group hover:-translate-y-1"
                            >
                              <CardHeader className={`bg-${getEventTypeColor(event.type)}-50 pb-4`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <EventIcon className={`h-5 w-5 text-${getEventTypeColor(event.type)}-600`} />
                                    <Badge
                                      variant="secondary"
                                      className={`bg-${getEventTypeColor(event.type)}-100 text-${getEventTypeColor(event.type)}-800`}
                                    >
                                      {eventTypes.find((t) => t.value === event.type)?.label}
                                    </Badge>
                                  </div>
                                  {event.important && (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                  )}
                                </div>
                                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                  {event.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span className="font-medium">{formatDateShort(event.date)}</span>
                                  {event.endDate && (
                                    <>
                                      <span className="mx-2">-</span>
                                      <span className="font-medium">{formatDateShort(event.endDate)}</span>
                                    </>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <LiberiaFlag className="h-12 w-20 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join Unity University Liberia and become part of our growing community of scholars and leaders.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Apply for Admission
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-bold bg-transparent"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Calendar
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
