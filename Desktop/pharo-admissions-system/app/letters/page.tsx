"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit } from "lucide-react"
import { format } from "date-fns"

interface LetterTemplate {
  id: string
  name: string
  type: "acceptance" | "rejection" | "deferral"
  subject: string
  content: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function LettersPage() {
  const [templates, setTemplates] = useState<LetterTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<LetterTemplate | null>(null)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    type: "acceptance" as "acceptance" | "rejection" | "deferral",
    subject: "",
    content: "",
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from("letter_templates")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error("Error fetching templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from("letter_templates")
          .update({
            name: formData.name,
            type: formData.type,
            subject: formData.subject,
            content: formData.content,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingTemplate.id)

        if (error) throw error
        setMessage("Template updated successfully!")
      } else {
        const { error } = await supabase.from("letter_templates").insert({
          name: formData.name,
          type: formData.type,
          subject: formData.subject,
          content: formData.content,
        })

        if (error) throw error
        setMessage("Template created successfully!")
      }

      resetForm()
      fetchTemplates()
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "acceptance",
      subject: "",
      content: "",
    })
    setEditingTemplate(null)
    setShowForm(false)
  }

  const editTemplate = (template: LetterTemplate) => {
    setFormData({
      name: template.name,
      type: template.type,
      subject: template.subject,
      content: template.content,
    })
    setEditingTemplate(template)
    setShowForm(true)
  }

  const toggleTemplateStatus = async (template: LetterTemplate) => {
    try {
      const { error } = await supabase
        .from("letter_templates")
        .update({ is_active: !template.is_active })
        .eq("id", template.id)

      if (error) throw error
      fetchTemplates()
    } catch (error) {
      console.error("Error updating template status:", error)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "acceptance":
        return "bg-green-100 text-green-800"
      case "rejection":
        return "bg-red-100 text-red-800"
      case "deferral":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading && templates.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading templates...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Letter Templates</h1>
          <p className="text-gray-600">Manage email templates for admissions letters</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      {message && (
        <Alert className={message.includes("Error") ? "border-red-200" : "border-green-200"}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Template Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "acceptance" | "rejection" | "deferral") =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acceptance">Acceptance</SelectItem>
                      <SelectItem value="rejection">Rejection</SelectItem>
                      <SelectItem value="deferral">Deferral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  required
                  placeholder="Enter email subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  required
                  placeholder="Enter email content (HTML supported)"
                  rows={10}
                />
                <p className="text-sm text-gray-500">
                  Use placeholders like {"{{full_name}}"}, {"{{class_admitted}}"} for dynamic content
                </p>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingTemplate ? "Update Template" : "Create Template"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                  <TableCell>
                    <Badge variant={template.is_active ? "default" : "secondary"}>
                      {template.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(template.updated_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => editTemplate(template)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleTemplateStatus(template)}>
                        {template.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {templates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No templates found. Create your first template to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
