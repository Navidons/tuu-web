"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { jsPDF } from "jspdf"
// Import the jspdf-autotable module and augment the jsPDF type
import 'jspdf-autotable'
// Add proper type declaration for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PdfExportProps {
  title: string
  filename: string
  data: Record<string, any>
}

export function PdfExport({ title, filename, data }: PdfExportProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const generatePdf = async () => {
    setIsGenerating(true)
    setErrorMessage(null)

    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(18)
      doc.text(title, 105, 15, { align: "center" })

      // Add UEDCL header
      doc.setFontSize(12)
      doc.text("Uganda Electricity Distribution Company Limited", 105, 25, { align: "center" })
      doc.text("Transformer Maintenance System", 105, 30, { align: "center" })

      // Add date
      doc.setFontSize(10)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" })

      // Add horizontal line
      doc.line(20, 45, 190, 45)

      // Convert data to table format
      const tableData = Object.entries(data)
        .filter(([key]) => !key.startsWith('_')) // Ignore React internal properties
        .map(([key, value]) => {
          // Format the key for better readability
          const formattedKey = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/Id$/, "ID")

          // Format the value based on its type
          let formattedValue = value
          if (value === null || value === undefined) {
            formattedValue = "Not available"
          } else if (typeof value === 'object' && value instanceof Date) {
            formattedValue = value.toLocaleDateString()
          } else if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
            // Handle ISO date strings
            formattedValue = new Date(value).toLocaleDateString()
          } else if (Array.isArray(value)) {
            try {
              formattedValue = value.join(", ")
            } catch (e) {
              formattedValue = String(value)
            }
          } else if (typeof value === 'object') {
            try {
              formattedValue = JSON.stringify(value)
            } catch (e) {
              formattedValue = String(value)
            }
          }

          return [formattedKey, String(formattedValue)]
        })

      // Add table
      doc.autoTable({
        startY: 50,
        head: [["Field", "Value"]],
        body: tableData,
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 50 },
      })

      // Save the PDF
      doc.save(`${filename}.pdf`)
      setShowDialog(true)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={generatePdf} disabled={isGenerating}>
        <DownloadIcon className="mr-2 h-4 w-4" />
        {isGenerating ? "Generating..." : "Export PDF"}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{errorMessage ? "Error Generating PDF" : "PDF Generated Successfully"}</DialogTitle>
            <DialogDescription>
              {errorMessage 
                ? `An error occurred: ${errorMessage}. Please try again.`
                : "Your PDF has been generated and downloaded successfully."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

