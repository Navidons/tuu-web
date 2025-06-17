"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Send, CheckCircle } from "lucide-react"

interface EmailServiceProps {
  applicationId: string
  applicantName: string
  applicantEmail: string
  status: "approved" | "rejected" | "deferred"
  onEmailSent?: () => void
}

export function EmailService({ applicationId, applicantName, applicantEmail, status, onEmailSent }: EmailServiceProps) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState("")

  const sendEmail = async () => {
    setSending(true)
    setMessage("")

    try {
      // Simulate email sending - replace with actual email service integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would integrate with your email service (Resend, SendGrid, etc.)
      const emailData = {
        to: applicantEmail,
        subject: getEmailSubject(status),
        html: getEmailTemplate(applicantName, status),
      }

      console.log("Sending email:", emailData)

      setSent(true)
      setMessage(`${status.charAt(0).toUpperCase() + status.slice(1)} letter sent successfully to ${applicantEmail}`)
      onEmailSent?.()
    } catch (error) {
      setMessage("Failed to send email. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const getEmailSubject = (status: string) => {
    switch (status) {
      case "approved":
        return "Congratulations! Your Application to Pharo Secondary School has been Approved"
      case "rejected":
        return "Update on Your Application to Pharo Secondary School"
      case "deferred":
        return "Your Application to Pharo Secondary School - Status Update"
      default:
        return "Application Status Update"
    }
  }

  const getEmailTemplate = (name: string, status: string) => {
    const templates = {
      approved: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Congratulations!</h1>
          <p>Dear ${name},</p>
          <p>We are pleased to inform you that your application to Pharo Secondary School has been <strong>approved</strong>.</p>
          <p>You have been admitted for the upcoming academic year.</p>
          <h3>Next Steps:</h3>
          <ul>
            <li>Complete your enrollment by visiting our school office</li>
            <li>Bring all required documents</li>
            <li>Pay the required fees</li>
          </ul>
          <p>We look forward to welcoming you to our school community.</p>
          <p>Best regards,<br>
          Pharo Secondary School<br>
          Admissions Office</p>
        </div>
      `,
      rejected: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Application Update</h1>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in Pharo Secondary School. After careful consideration, we regret to inform you that we are unable to offer you admission at this time.</p>
          <p>This decision was difficult due to the high number of qualified applicants and limited spaces available.</p>
          <p>We encourage you to apply again in the future and wish you success in your educational journey.</p>
          <p>Best regards,<br>
          Pharo Secondary School<br>
          Admissions Office</p>
        </div>
      `,
      deferred: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Application Status Update</h1>
          <p>Dear ${name},</p>
          <p>Thank you for your application to Pharo Secondary School. We are writing to inform you that your application has been deferred for further review.</p>
          <p>This means we need additional time to make a final decision on your application. We will contact you with a final decision soon.</p>
          <p>Thank you for your patience during this process.</p>
          <p>Best regards,<br>
          Pharo Secondary School<br>
          Admissions Office</p>
        </div>
      `,
    }

    return templates[status as keyof typeof templates] || templates.approved
  }

  if (sent) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">{message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Send {status.charAt(0).toUpperCase() + status.slice(1)} Letter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>
            <strong>To:</strong> {applicantEmail}
          </p>
          <p>
            <strong>Subject:</strong> {getEmailSubject(status)}
          </p>
        </div>

        {message && (
          <Alert className={message.includes("Failed") ? "border-red-200" : "border-green-200"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Button onClick={sendEmail} disabled={sending} className="w-full">
          <Send className="mr-2 h-4 w-4" />
          {sending ? "Sending..." : `Send ${status.charAt(0).toUpperCase() + status.slice(1)} Letter`}
        </Button>
      </CardContent>
    </Card>
  )
}
