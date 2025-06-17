"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, X, Download, Eye } from "lucide-react"
import { format } from "date-fns"

interface Document {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploaded_at: string
}

interface DocumentUploadProps {
  applicationId: string
  documents: Document[]
  onDocumentsUpdate: (documents: Document[]) => void
  readonly?: boolean
}

export function DocumentUpload({ applicationId, documents, onDocumentsUpdate, readonly = false }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (readonly) return

      setUploading(true)
      setMessage("")

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const fileExt = file.name.split(".").pop()
          const fileName = `${applicationId}/${Date.now()}-${file.name}`

          const { data, error } = await supabase.storage.from("documents").upload(fileName, file)

          if (error) throw error

          const {
            data: { publicUrl },
          } = supabase.storage.from("documents").getPublicUrl(fileName)

          return {
            id: Date.now().toString() + Math.random().toString(),
            name: file.name,
            url: publicUrl,
            size: file.size,
            type: file.type,
            uploaded_at: new Date().toISOString(),
          }
        })

        const uploadedDocs = await Promise.all(uploadPromises)
        const updatedDocuments = [...documents, ...uploadedDocs]

        // Update application with new documents
        const { error } = await supabase
          .from("applications")
          .update({ documents: updatedDocuments })
          .eq("id", applicationId)

        if (error) throw error

        onDocumentsUpdate(updatedDocuments)
        setMessage(`Successfully uploaded ${uploadedDocs.length} document(s)`)
      } catch (error: any) {
        setMessage(`Upload failed: ${error.message}`)
      } finally {
        setUploading(false)
      }
    },
    [applicationId, documents, onDocumentsUpdate, readonly],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: readonly || uploading,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeDocument = async (docIndex: number) => {
    if (readonly) return

    try {
      const updatedDocuments = documents.filter((_, index) => index !== docIndex)

      const { error } = await supabase
        .from("applications")
        .update({ documents: updatedDocuments })
        .eq("id", applicationId)

      if (error) throw error

      onDocumentsUpdate(updatedDocuments)
      setMessage("Document removed successfully")
    } catch (error: any) {
      setMessage(`Failed to remove document: ${error.message}`)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄"
    if (type.includes("image")) return "🖼️"
    if (type.includes("word")) return "📝"
    return "📎"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <File className="mr-2 h-5 w-5" />
          Documents ({documents.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert
            className={message.includes("failed") || message.includes("Failed") ? "border-red-200" : "border-green-200"}
          >
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {!readonly && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive ? "Drop files here..." : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, Images, Word documents (max 10MB each)</p>
            {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
          </div>
        )}

        {documents.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Documents</h4>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>{format(new Date(doc.uploaded_at), "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, "_blank")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, "_blank")}>
                    <Download className="h-4 w-4" />
                  </Button>
                  {!readonly && (
                    <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {documents.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <File className="mx-auto h-8 w-8 text-gray-300" />
            <p className="mt-2 text-sm">No documents uploaded yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
