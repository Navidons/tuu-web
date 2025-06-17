"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, User, GraduationCap, FileText } from "lucide-react"

interface StudentEnrollmentWizardProps {
  applicationId: string
  applicantName: string
  applicantEmail: string
  onEnrollmentComplete: () => void
}

interface EnrollmentData {
  studentId: string
  classAdmitted: string
  enrollmentDate: string
  guardianName: string
  guardianPhone: string
  guardianEmail: string
  emergencyContact: string
  emergencyPhone: string
  medicalInfo: string
  previousSchool: string
  transportMode: string
  feesPaid: boolean
  uniformSize: string
  specialNeeds: string
}

export function StudentEnrollmentWizard({
  applicationId,
  applicantName,
  applicantEmail,
  onEnrollmentComplete,
}: StudentEnrollmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>({
    studentId: `PSS${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    classAdmitted: "Grade 9",
    enrollmentDate: new Date().toISOString().split("T")[0],
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalInfo: "",
    previousSchool: "",
    transportMode: "walking",
    feesPaid: false,
    uniformSize: "M",
    specialNeeds: "",
  })

  const steps = [
    { id: 1, title: "Basic Info", icon: User },
    { id: 2, title: "Guardian Details", icon: User },
    { id: 3, title: "Academic Info", icon: GraduationCap },
    { id: 4, title: "Additional Info", icon: FileText },
    { id: 5, title: "Review & Complete", icon: CheckCircle },
  ]

  const updateField = (field: keyof EnrollmentData, value: any) => {
    setEnrollmentData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeEnrollment = async () => {
    setLoading(true)
    setMessage("")

    try {
      // Create student record
      const { error: studentError } = await supabase.from("students").insert({
        application_id: applicationId,
        student_id: enrollmentData.studentId,
        class_admitted: enrollmentData.classAdmitted,
        enrolled_date: enrollmentData.enrollmentDate,
        guardian_name: enrollmentData.guardianName,
        guardian_phone: enrollmentData.guardianPhone,
        guardian_email: enrollmentData.guardianEmail,
        emergency_contact: enrollmentData.emergencyContact,
        emergency_phone: enrollmentData.emergencyPhone,
        medical_info: enrollmentData.medicalInfo,
        previous_school: enrollmentData.previousSchool,
        transport_mode: enrollmentData.transportMode,
        uniform_size: enrollmentData.uniformSize,
        special_needs: enrollmentData.specialNeeds,
      })

      if (studentError) throw studentError

      // Create fee record
      const { error: feeError } = await supabase.from("student_fees").insert({
        student_id: enrollmentData.studentId,
        academic_year: new Date().getFullYear().toString(),
        total_amount: 50000, // Default fee amount
        paid_amount: enrollmentData.feesPaid ? 50000 : 0,
        status: enrollmentData.feesPaid ? "paid" : "pending",
      })

      if (feeError) throw feeError

      // Update application status to enrolled
      const { error: appError } = await supabase
        .from("applications")
        .update({ status: "enrolled" })
        .eq("id", applicationId)

      if (appError) throw appError

      setMessage("Student enrollment completed successfully!")
      setTimeout(() => {
        onEnrollmentComplete()
      }, 2000)
    } catch (error: any) {
      setMessage(`Enrollment failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={enrollmentData.studentId}
                  onChange={(e) => updateField("studentId", e.target.value)}
                  placeholder="Auto-generated"
                />
              </div>
              <div>
                <Label htmlFor="classAdmitted">Class Admitted</Label>
                <Select
                  value={enrollmentData.classAdmitted}
                  onValueChange={(value) => updateField("classAdmitted", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 9">Grade 9</SelectItem>
                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                    <SelectItem value="Grade 11">Grade 11</SelectItem>
                    <SelectItem value="Grade 12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={enrollmentData.enrollmentDate}
                onChange={(e) => updateField("enrollmentDate", e.target.value)}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input
                  id="guardianName"
                  value={enrollmentData.guardianName}
                  onChange={(e) => updateField("guardianName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                <Input
                  id="guardianPhone"
                  value={enrollmentData.guardianPhone}
                  onChange={(e) => updateField("guardianPhone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input
                id="guardianEmail"
                type="email"
                value={enrollmentData.guardianEmail}
                onChange={(e) => updateField("guardianEmail", e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={enrollmentData.emergencyContact}
                  onChange={(e) => updateField("emergencyContact", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={enrollmentData.emergencyPhone}
                  onChange={(e) => updateField("emergencyPhone", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="previousSchool">Previous School</Label>
              <Input
                id="previousSchool"
                value={enrollmentData.previousSchool}
                onChange={(e) => updateField("previousSchool", e.target.value)}
                placeholder="Name of previous school attended"
              />
            </div>
            <div>
              <Label htmlFor="medicalInfo">Medical Information</Label>
              <Textarea
                id="medicalInfo"
                value={enrollmentData.medicalInfo}
                onChange={(e) => updateField("medicalInfo", e.target.value)}
                placeholder="Any medical conditions, allergies, or special requirements..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="specialNeeds">Special Educational Needs</Label>
              <Textarea
                id="specialNeeds"
                value={enrollmentData.specialNeeds}
                onChange={(e) => updateField("specialNeeds", e.target.value)}
                placeholder="Any learning disabilities or special accommodations needed..."
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="transportMode">Transport Mode</Label>
                <Select
                  value={enrollmentData.transportMode}
                  onValueChange={(value) => updateField("transportMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="public_transport">Public Transport</SelectItem>
                    <SelectItem value="private_car">Private Car</SelectItem>
                    <SelectItem value="school_bus">School Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="uniformSize">Uniform Size</Label>
                <Select value={enrollmentData.uniformSize} onValueChange={(value) => updateField("uniformSize", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">Extra Small</SelectItem>
                    <SelectItem value="S">Small</SelectItem>
                    <SelectItem value="M">Medium</SelectItem>
                    <SelectItem value="L">Large</SelectItem>
                    <SelectItem value="XL">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="feesPaid"
                checked={enrollmentData.feesPaid}
                onChange={(e) => updateField("feesPaid", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="feesPaid">Initial fees have been paid</Label>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Enrollment Details</h3>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <strong>Student ID:</strong> {enrollmentData.studentId}
              </div>
              <div>
                <strong>Class:</strong> {enrollmentData.classAdmitted}
              </div>
              <div>
                <strong>Guardian:</strong> {enrollmentData.guardianName}
              </div>
              <div>
                <strong>Guardian Phone:</strong> {enrollmentData.guardianPhone}
              </div>
              <div>
                <strong>Transport:</strong> {enrollmentData.transportMode}
              </div>
              <div>
                <strong>Fees Status:</strong>{" "}
                <Badge variant={enrollmentData.feesPaid ? "default" : "secondary"}>
                  {enrollmentData.feesPaid ? "Paid" : "Pending"}
                </Badge>
              </div>
            </div>
            {enrollmentData.medicalInfo && (
              <div>
                <strong>Medical Info:</strong>
                <p className="text-sm text-gray-600 mt-1">{enrollmentData.medicalInfo}</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Student Enrollment - {applicantName}
        </CardTitle>
        <div className="flex space-x-2">
          {steps.map((step) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                  step.id === currentStep
                    ? "bg-blue-100 text-blue-800"
                    : step.id < currentStep
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{step.title}</span>
              </div>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert className={message.includes("failed") ? "border-red-200" : "border-green-200"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {renderStep()}

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                disabled={currentStep === 2 && (!enrollmentData.guardianName || !enrollmentData.guardianPhone)}
              >
                Next
              </Button>
            ) : (
              <Button onClick={completeEnrollment} disabled={loading}>
                {loading ? "Enrolling..." : "Complete Enrollment"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
