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

interface BrowserPdfExportProps {
  title: string
  filename: string
  data: Record<string, any>
}

export function BrowserPdfExport({ title, filename, data }: BrowserPdfExportProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const generatePdf = async () => {
    setIsGenerating(true)

    try {
      // Create a new window for the PDF content
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        alert("Please allow popups for this website to generate PDF")
        setIsGenerating(false)
        return
      }

      // Format the data for display
      const formattedData = Object.entries(data).map(([key, value]) => {
        // Format the key for better readability
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/Id$/, "ID")

        // Format the value based on its type
        let formattedValue = value
        if (value instanceof Date) {
          formattedValue = value.toLocaleDateString()
        } else if (Array.isArray(value)) {
          formattedValue = value.join(", ")
        }

        return { key: formattedKey, value: formattedValue }
      })

      // Write the HTML content to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 10px;
                border-bottom: 2px solid #2563eb;
              }
              h1 {
                color: #1e40af;
                margin-bottom: 5px;
              }
              .company {
                font-size: 16px;
                color: #666;
              }
              .date {
                font-size: 14px;
                color: #666;
                margin-top: 10px;
              }
              .content {
                margin-bottom: 30px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                background-color: #f8fafc;
                font-weight: bold;
              }
              tr:nth-child(even) {
                background-color: #f8fafc;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #ddd;
                padding-top: 10px;
              }
              @media print {
                body {
                  padding: 0;
                }
                button {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${title}</h1>
              <div class="company">Uganda Electricity Distribution Company Limited</div>
              <div class="company">Transformer Maintenance System</div>
              <div class="date">Generated on: ${new Date().toLocaleDateString()}</div>
            </div>
            
            <div class="content">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${formattedData
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.key}</td>
                      <td>${item.value}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            
            <div class="footer">
              <p>This is an automatically generated document from the UEDCL Transformer Maintenance System.</p>
            </div>
            
            <script>
              // Auto-print and prompt for save
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  // After printing dialog is closed, this will execute
                  setTimeout(() => {
                    // Prompt to save as PDF (most browsers will do this automatically)
                    // If not, the user can still use the browser's "Save as PDF" option
                  }, 1000);
                }, 500);
              }
            </script>
          </body>
        </html>
      `)

      printWindow.document.close()
      setShowDialog(true)
    } catch (error) {
      console.error("Error generating PDF:", error)
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
            <DialogTitle>PDF Generated Successfully</DialogTitle>
            <DialogDescription>
              Your PDF has been generated in a new tab. If you don't see the print dialog, please check your browser
              settings and try again.
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

