"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, User, Users, Heart, GraduationCap, DollarSign, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface EnrollmentWizardProps {
  applicationId: string
  applicationData: any
  onComplete: () => void
  onCancel: () => void
}

interface StudentData {
  // Basic Information
  class_admitted: string
  enrolled_date: string

  // Guardian Information
  guardian_name: string
  guardian_phone: string
  guardian_email: string
  guardian_relationship: string
  guardian_occupation: string
  guardian_address: string

  // Emergency Contact
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string

  // Medical Information
  medical_conditions: string
  allergies: string
  medications: string
  blood_type: string
  doctor_name: string
  doctor_phone: string

  // Academic History
  previous_school: string
  previous_school_address: string
  last_grade_completed: string
  academic_achievements: string

  // Special Needs
  special_needs: string
  learning_disabilities: string
  behavioral_notes: string

  // Additional Information
  transportation_method: string
  lunch_program: boolean
  extracurricular_interests: string

  // Fee Information
  fee_plan: string
  scholarship_applied: boolean
  financial_aid_needed: boolean
}

const ENROLLMENT_STEPS = [
  { id: 1, title: "Basic Information", icon: User, description: "Class and enrollment details" },
  { id: 2, title: "Guardian Details", icon: Users, description: "Primary guardian information" },
  { id: 3, title: "Emergency Contact", icon: AlertCircle, description: "Emergency contact person" },
  { id: 4, title: "Medical Information", icon: Heart, description: "Health and medical details" },
  { id: 5, title: "Academic History", icon: GraduationCap, description: "Previous education background" },
  { id: 6, title: "Special Requirements", icon: FileText, description: "Special needs and accommodations" },
  { id: 7, title: "Fees & Final Review", icon: DollarSign, description: "Fee structure and confirmation" },
]

export default function EnhancedStudentEnrollmentWizard({
  applicationId,
  applicationData,
  onComplete,
  onCancel,
}: EnrollmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const [studentData, setStudentData] = useState<StudentData>({
    class_admitted: "Grade 9",
    enrolled_date: new Date().toISOString().split("T")[0],
    guardian_name: "",
    guardian_phone: "",
    guardian_email: "",
    guardian_relationship: "Parent",
    guardian_occupation: "",
    guardian_address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relationship: "",
    medical_conditions: "",
    allergies: "",
    medications: "",
    blood_type: "",
    doctor_name: "",
    doctor_phone: "",
    previous_school: "",
    previous_school_address: "",
    last_grade_completed: "",
    academic_achievements: "",
    special_needs: "",
    learning_disabilities: "",
    behavioral_notes: "",
    transportation_method: "Parent Drop-off",
    lunch_program: false,
    extracurricular_interests: "",
    fee_plan: "Full Payment",
    scholarship_applied: false,
    financial_aid_needed: false,
  })

  useEffect(() => {
    if (applicationData) {
      setStudentData(prevData => ({
        ...prevData,
        guardian_name: applicationData.full_name || prevData.guardian_name,
        guardian_email: applicationData.email || prevData.guardian_email,
        guardian_phone: applicationData.phone || prevData.guardian_phone,
      }))
    }
  }, [applicationData])

  const updateStudentData = (field: keyof StudentData, value: any) => {
    setStudentData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!studentData.class_admitted) newErrors.class_admitted = "Class is required"
        if (!studentData.enrolled_date) newErrors.enrolled_date = "Enrollment date is required"
        break
      case 2:
        if (!studentData.guardian_name) newErrors.guardian_name = "Guardian name is required"
        if (!studentData.guardian_phone) newErrors.guardian_phone = "Guardian phone is required"
        if (!studentData.guardian_email) newErrors.guardian_email = "Guardian email is required"
        if (!studentData.guardian_address) newErrors.guardian_address = "Guardian address is required"
        break
      case 3:
        if (!studentData.emergency_contact_name) newErrors.emergency_contact_name = "Emergency contact name is required"
        if (!studentData.emergency_contact_phone)
          newErrors.emergency_contact_phone = "Emergency contact phone is required"
        if (!studentData.emergency_contact_relationship)
          newErrors.emergency_contact_relationship = "Relationship is required"
        break
      case 4:
        // Medical information is optional but we can validate format
        break
      case 5:
        if (!studentData.previous_school) newErrors.previous_school = "Previous school is required"
        if (!studentData.last_grade_completed) newErrors.last_grade_completed = "Last grade completed is required"
        break
      case 6:
        // Special requirements are optional
        break
      case 7:
        if (!studentData.fee_plan) newErrors.fee_plan = "Fee plan selection is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, ENROLLMENT_STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      // Call the enrollment function
      const { data, error } = await supabase.rpc("enroll_student_from_application", {
        app_id: applicationId,
        student_data: studentData,
      })

      if (error) throw error

      toast({
        title: "Enrollment Successful!",
        description: `Student has been successfully enrolled. Student ID: ${data}`,
      })

      onComplete()
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Failed to enroll student. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class_admitted">Class to be Admitted *</Label>
                <Select
                  value={studentData.class_admitted}
                  onValueChange={(value) => updateStudentData("class_admitted", value)}
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
                {errors.class_admitted && <p className="text-sm text-red-500 mt-1">{errors.class_admitted}</p>}
              </div>

              <div>
                <Label htmlFor="enrolled_date">Enrollment Date *</Label>
                <Input
                  id="enrolled_date"
                  type="date"
                  value={studentData.enrolled_date}
                  onChange={(e) => updateStudentData("enrolled_date", e.target.value)}
                />
                {errors.enrolled_date && <p className="text-sm text-red-500 mt-1">{errors.enrolled_date}</p>}
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Student will be enrolled in <strong>{studentData.class_admitted}</strong> starting from{" "}
                <strong>{new Date(studentData.enrolled_date).toLocaleDateString()}</strong>
              </AlertDescription>
            </Alert>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guardian_name">Guardian Full Name *</Label>
                <Input
                  id="guardian_name"
                  value={studentData.guardian_name}
                  onChange={(e) => updateStudentData("guardian_name", e.target.value)}
                  placeholder="Enter guardian's full name"
                />
                {errors.guardian_name && <p className="text-sm text-red-500 mt-1">{errors.guardian_name}</p>}
              </div>

              <div>
                <Label htmlFor="guardian_relationship">Relationship *</Label>
                <Select
                  value={studentData.guardian_relationship}
                  onValueChange={(value) => updateStudentData("guardian_relationship", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Grandparent">Grandparent</SelectItem>
                    <SelectItem value="Uncle/Aunt">Uncle/Aunt</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guardian_phone">Guardian Phone *</Label>
                <Input
                  id="guardian_phone"
                  value={studentData.guardian_phone}
                  onChange={(e) => updateStudentData("guardian_phone", e.target.value)}
                  placeholder="+1234567890"
                />
                {errors.guardian_phone && <p className="text-sm text-red-500 mt-1">{errors.guardian_phone}</p>}
              </div>

              <div>
                <Label htmlFor="guardian_email">Guardian Email *</Label>
                <Input
                  id="guardian_email"
                  type="email"
                  value={studentData.guardian_email}
                  onChange={(e) => updateStudentData("guardian_email", e.target.value)}
                  placeholder="guardian@email.com"
                />
                {errors.guardian_email && <p className="text-sm text-red-500 mt-1">{errors.guardian_email}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="guardian_occupation">Guardian Occupation</Label>
              <Input
                id="guardian_occupation"
                value={studentData.guardian_occupation}
                onChange={(e) => updateStudentData("guardian_occupation", e.target.value)}
                placeholder="Enter occupation"
              />
            </div>

            <div>
              <Label htmlFor="guardian_address">Guardian Address *</Label>
              <Textarea
                id="guardian_address"
                value={studentData.guardian_address}
                onChange={(e) => updateStudentData("guardian_address", e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
              {errors.guardian_address && <p className="text-sm text-red-500 mt-1">{errors.guardian_address}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please provide an emergency contact person who can be reached if the guardian is unavailable.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency_contact_name">Emergency Contact Name *</Label>
                <Input
                  id="emergency_contact_name"
                  value={studentData.emergency_contact_name}
                  onChange={(e) => updateStudentData("emergency_contact_name", e.target.value)}
                  placeholder="Enter emergency contact name"
                />
                {errors.emergency_contact_name && (
                  <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="emergency_contact_phone">Emergency Contact Phone *</Label>
                <Input
                  id="emergency_contact_phone"
                  value={studentData.emergency_contact_phone}
                  onChange={(e) => updateStudentData("emergency_contact_phone", e.target.value)}
                  placeholder="+1234567890"
                />
                {errors.emergency_contact_phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_phone}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="emergency_contact_relationship">Relationship to Student *</Label>
              <Select
                value={studentData.emergency_contact_relationship}
                onValueChange={(value) => updateStudentData("emergency_contact_relationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grandparent">Grandparent</SelectItem>
                  <SelectItem value="Uncle/Aunt">Uncle/Aunt</SelectItem>
                  <SelectItem value="Family Friend">Family Friend</SelectItem>
                  <SelectItem value="Neighbor">Neighbor</SelectItem>
                  <SelectItem value="Other Relative">Other Relative</SelectItem>
                </SelectContent>
              </Select>
              {errors.emergency_contact_relationship && (
                <p className="text-sm text-red-500 mt-1">{errors.emergency_contact_relationship}</p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="blood_type">Blood Type</Label>
                <Select
                  value={studentData.blood_type}
                  onValueChange={(value) => updateStudentData("blood_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="doctor_name">Family Doctor Name</Label>
                <Input
                  id="doctor_name"
                  value={studentData.doctor_name}
                  onChange={(e) => updateStudentData("doctor_name", e.target.value)}
                  placeholder="Dr. Smith"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="doctor_phone">Doctor Phone Number</Label>
              <Input
                id="doctor_phone"
                value={studentData.doctor_phone}
                onChange={(e) => updateStudentData("doctor_phone", e.target.value)}
                placeholder="+1234567890"
              />
            </div>

            <div>
              <Label htmlFor="medical_conditions">Medical Conditions</Label>
              <Textarea
                id="medical_conditions"
                value={studentData.medical_conditions}
                onChange={(e) => updateStudentData("medical_conditions", e.target.value)}
                placeholder="List any chronic conditions, disabilities, or ongoing medical issues"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={studentData.allergies}
                onChange={(e) => updateStudentData("allergies", e.target.value)}
                placeholder="List any food, drug, or environmental allergies"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={studentData.medications}
                onChange={(e) => updateStudentData("medications", e.target.value)}
                placeholder="List any medications the student is currently taking"
                rows={2}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="previous_school">Previous School *</Label>
              <Input
                id="previous_school"
                value={studentData.previous_school}
                onChange={(e) => updateStudentData("previous_school", e.target.value)}
                placeholder="Name of previous school"
              />
              {errors.previous_school && <p className="text-sm text-red-500 mt-1">{errors.previous_school}</p>}
            </div>

            <div>
              <Label htmlFor="previous_school_address">Previous School Address</Label>
              <Textarea
                id="previous_school_address"
                value={studentData.previous_school_address}
                onChange={(e) => updateStudentData("previous_school_address", e.target.value)}
                placeholder="Address of previous school"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="last_grade_completed">Last Grade Completed *</Label>
              <Select
                value={studentData.last_grade_completed}
                onValueChange={(value) => updateStudentData("last_grade_completed", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select last grade completed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                </SelectContent>
              </Select>
              {errors.last_grade_completed && (
                <p className="text-sm text-red-500 mt-1">{errors.last_grade_completed}</p>
              )}
            </div>

            <div>
              <Label htmlFor="academic_achievements">Academic Achievements</Label>
              <Textarea
                id="academic_achievements"
                value={studentData.academic_achievements}
                onChange={(e) => updateStudentData("academic_achievements", e.target.value)}
                placeholder="List any awards, honors, or notable academic achievements"
                rows={3}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="special_needs">Special Educational Needs</Label>
              <Textarea
                id="special_needs"
                value={studentData.special_needs}
                onChange={(e) => updateStudentData("special_needs", e.target.value)}
                placeholder="Describe any special educational needs or accommodations required"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="learning_disabilities">Learning Disabilities</Label>
              <Textarea
                id="learning_disabilities"
                value={studentData.learning_disabilities}
                onChange={(e) => updateStudentData("learning_disabilities", e.target.value)}
                placeholder="List any diagnosed learning disabilities"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="behavioral_notes">Behavioral Notes</Label>
              <Textarea
                id="behavioral_notes"
                value={studentData.behavioral_notes}
                onChange={(e) => updateStudentData("behavioral_notes", e.target.value)}
                placeholder="Any behavioral considerations or support needs"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="transportation_method">Transportation Method</Label>
              <Select
                value={studentData.transportation_method}
                onValueChange={(value) => updateStudentData("transportation_method", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parent Drop-off">Parent Drop-off</SelectItem>
                  <SelectItem value="School Bus">School Bus</SelectItem>
                  <SelectItem value="Public Transport">Public Transport</SelectItem>
                  <SelectItem value="Walking">Walking</SelectItem>
                  <SelectItem value="Bicycle">Bicycle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lunch_program"
                checked={studentData.lunch_program}
                onCheckedChange={(checked) => updateStudentData("lunch_program", checked)}
              />
              <Label htmlFor="lunch_program">Enroll in School Lunch Program</Label>
            </div>

            <div>
              <Label htmlFor="extracurricular_interests">Extracurricular Interests</Label>
              <Textarea
                id="extracurricular_interests"
                value={studentData.extracurricular_interests}
                onChange={(e) => updateStudentData("extracurricular_interests", e.target.value)}
                placeholder="List sports, clubs, or activities the student is interested in"
                rows={2}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="fee_plan">Fee Payment Plan *</Label>
              <Select value={studentData.fee_plan} onValueChange={(value) => updateStudentData("fee_plan", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Payment">Full Payment (5% discount)</SelectItem>
                  <SelectItem value="Semester Payment">Semester Payment</SelectItem>
                  <SelectItem value="Monthly Payment">Monthly Payment</SelectItem>
                  <SelectItem value="Quarterly Payment">Quarterly Payment</SelectItem>
                </SelectContent>
              </Select>
              {errors.fee_plan && <p className="text-sm text-red-500 mt-1">{errors.fee_plan}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="scholarship_applied"
                checked={studentData.scholarship_applied}
                onCheckedChange={(checked) => updateStudentData("scholarship_applied", checked)}
              />
              <Label htmlFor="scholarship_applied">Applied for Scholarship</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="financial_aid_needed"
                checked={studentData.financial_aid_needed}
                onCheckedChange={(checked) => updateStudentData("financial_aid_needed", checked)}
              />
              <Label htmlFor="financial_aid_needed">Financial Aid Required</Label>
            </div>

            <Separator />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Enrollment Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Student:</strong> {applicationData.full_name}
                  </p>
                  <p>
                    <strong>Class:</strong> {studentData.class_admitted}
                  </p>
                  <p>
                    <strong>Enrollment Date:</strong> {new Date(studentData.enrolled_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Guardian:</strong> {studentData.guardian_name}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Emergency Contact:</strong> {studentData.emergency_contact_name}
                  </p>
                  <p>
                    <strong>Transportation:</strong> {studentData.transportation_method}
                  </p>
                  <p>
                    <strong>Fee Plan:</strong> {studentData.fee_plan}
                  </p>
                  <p>
                    <strong>Lunch Program:</strong> {studentData.lunch_program ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Please review all information carefully. Once submitted, the student will be officially enrolled in the
                system.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  const progress = (currentStep / ENROLLMENT_STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Student Enrollment Wizard
          </CardTitle>
          <CardDescription>
            Enrolling: <strong>{applicationData.full_name}</strong>
          </CardDescription>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent>
          {/* Step Navigation */}
          <div className="flex justify-between mb-8 overflow-x-auto">
            {ENROLLMENT_STEPS.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center min-w-0 flex-1 ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isActive
                        ? "bg-blue-100 border-2 border-blue-600"
                        : isCompleted
                          ? "bg-green-100 border-2 border-green-600"
                          : "bg-gray-100 border-2 border-gray-300"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium">{step.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Step {currentStep}: {ENROLLMENT_STEPS[currentStep - 1].title}
            </h2>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>

              {currentStep < ENROLLMENT_STEPS.length ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Enrolling..." : "Complete Enrollment"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
