"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { PrinterIcon } from "lucide-react"

interface PrintDocumentProps {
  title: string
  children: React.ReactNode
}

export function PrintDocument({ title, children }: PrintDocumentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContent = contentRef.current?.innerHTML || ""
    const printWindow = window.open("", "_blank")

    if (printWindow) {
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
              h1, h2, h3 {
                color: #222;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .section {
                margin-bottom: 20px;
              }
              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
              }
              .label {
                font-weight: bold;
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
            </div>
            ${printContent}
            <script>
              window.onload = function() {
                window.print();
                window.onfocus = function() { window.close(); }
              }
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handlePrint}>
        <PrinterIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
      <div className="hidden">
        <div ref={contentRef}>{children}</div>
      </div>
    </>
  )
}

