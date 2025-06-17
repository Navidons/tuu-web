"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Search, Grid, List, Filter, Plus } from "lucide-react"
import { format } from "date-fns"
import { StudentProfileCard } from "@/components/student-profile-card"

interface Student {
  id: string
  student_id: string | null
  class_admitted: string | null
  enrolled_date: string
  academic_year?: string
  payment_status?: string
  guardian_name?: string
  guardian_phone?: string
  guardian_email?: string
  application: {
    id: string
    full_name: string
    email: string
    phone: string | null
    gender: string | null
    dob: string | null
    nationality: string | null
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showEnrollment, setShowEnrollment] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [students, searchTerm, classFilter, paymentFilter])

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select(`
          *,
          application:applications(
            id,
            full_name,
            email,
            phone,
            gender,
            dob,
            nationality
          )
        `)
        .order("enrolled_date", { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterStudents = () => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.application?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.application?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.guardian_name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (classFilter !== "all") {
      filtered = filtered.filter((student) => student.class_admitted === classFilter)
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter((student) => student.payment_status === paymentFilter)
    }

    setFilteredStudents(filtered)
  }

  const exportToCSV = () => {
    const headers = [
      "Student ID",
      "Name",
      "Email",
      "Phone",
      "Gender",
      "Class",
      "Enrolled Date",
      "Payment Status",
      "Guardian Name",
      "Guardian Phone",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredStudents.map((student) =>
        [
          student.student_id || "",
          student.application?.full_name || "",
          student.application?.email || "",
          student.application?.phone || "",
          student.application?.gender || "",
          student.class_admitted || "",
          format(new Date(student.enrolled_date), "yyyy-MM-dd"),
          student.payment_status || "",
          student.guardian_name || "",
          student.guardian_phone || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `students-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getUniqueClasses = () => {
    const classes = students
      .map((s) => s.class_admitted)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index)
    return classes
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading students...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">
            Enrolled students ({filteredStudents.length} of {students.length})
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowEnrollment(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Enrollment
          </Button>
          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters & Search
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {getUniqueClasses().map((className) => (
                  <SelectItem key={className} value={className!}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Status</SelectItem>
                <SelectItem value="paid">Fully Paid</SelectItem>
                <SelectItem value="partial">Partial Payment</SelectItem>
                <SelectItem value="pending">Payment Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setClassFilter("all")
                setPaymentFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Display */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <StudentProfileCard key={student.id} student={student} onViewDetails={() => setSelectedStudent(student)} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {student.application.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.application.full_name}</h3>
                        <p className="text-sm text-gray-500">{student.student_id || "ID Pending"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.class_admitted}</p>
                      <p className="text-xs text-gray-500">{format(new Date(student.enrolled_date), "MMM dd, yyyy")}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        </div>
      )}

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <StudentProfileCard
                student={selectedStudent}
                onEditProfile={() => {
                  // Handle edit profile
                  console.log("Edit profile for", selectedStudent.id)
                }}
              />

              {/* Additional student information can be added here */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Academic Year:</span>
                      <p className="font-medium">{selectedStudent.academic_year || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Class:</span>
                      <p className="font-medium">{selectedStudent.class_admitted || "Not assigned"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Enrollment Date:</span>
                      <p className="font-medium">{format(new Date(selectedStudent.enrolled_date), "PPP")}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Student Email:</span>
                      <p className="font-medium">{selectedStudent.application.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Student Phone:</span>
                      <p className="font-medium">{selectedStudent.application.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Guardian Email:</span>
                      <p className="font-medium">{selectedStudent.guardian_email || "Not provided"}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Enrollment Dialog */}
      <Dialog open={showEnrollment} onOpenChange={setShowEnrollment}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Student Enrollment</DialogTitle>
          </DialogHeader>
          {/* This would typically show approved applications ready for enrollment */}
          <div className="text-center py-8">
            <p className="text-gray-500">Select an approved application to begin the enrollment process.</p>
            <Button variant="outline" className="mt-4" onClick={() => setShowEnrollment(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
