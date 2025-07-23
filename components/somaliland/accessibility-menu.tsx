"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accessibility, Plus, Minus, Eye, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const adjustFontSize = (change: number) => {
    const newSize = Math.max(75, Math.min(150, fontSize + change))
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle("high-contrast", !highContrast)
  }

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion)
    document.documentElement.classList.toggle("reduce-motion", !reducedMotion)
  }

  const resetSettings = () => {
    setFontSize(100)
    setHighContrast(false)
    setReducedMotion(false)
    document.documentElement.style.fontSize = "100%"
    document.documentElement.classList.remove("high-contrast", "reduce-motion")
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-green-600 hover:bg-green-700 rounded-full w-12 h-12 p-0 shadow-lg"
        aria-label="Accessibility Menu"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 left-4 z-50"
          >
            <Card className="w-80 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-green-600" />
                  Accessibility Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => adjustFontSize(-10)} disabled={fontSize <= 75}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-12 text-center">{fontSize}%</span>
                    <Button variant="outline" size="sm" onClick={() => adjustFontSize(10)} disabled={fontSize >= 150}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">High Contrast</label>
                  <Button variant={highContrast ? "default" : "outline"} size="sm" onClick={toggleHighContrast}>
                    <Palette className="h-3 w-3 mr-1" />
                    {highContrast ? "On" : "Off"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Reduced Motion</label>
                  <Button variant={reducedMotion ? "default" : "outline"} size="sm" onClick={toggleReducedMotion}>
                    <Eye className="h-3 w-3 mr-1" />
                    {reducedMotion ? "On" : "Off"}
                  </Button>
                </div>

                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={resetSettings} className="w-full bg-transparent">
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
