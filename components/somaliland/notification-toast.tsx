"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  message?: string
  duration?: number
}

interface NotificationToastProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export default function NotificationToast({ toasts, onRemove }: NotificationToastProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const iconColors = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
  }

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(toast.id)
        }, toast.duration || 5000)

        return () => clearTimeout(timer)
      }
    })
  }, [toasts, onRemove])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${colors[toast.type]}`}
            >
              <div className="flex items-start">
                <Icon className={`h-5 w-5 mt-0.5 mr-3 ${iconColors[toast.type]}`} />
                <div className="flex-1">
                  <h4 className="font-semibold">{toast.title}</h4>
                  {toast.message && <p className="text-sm mt-1 opacity-90">{toast.message}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(toast.id)}
                  className="ml-2 h-6 w-6 p-0 hover:bg-black/10"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (title: string, message?: string) => {
    addToast({ type: "success", title, message })
  }

  const error = (title: string, message?: string) => {
    addToast({ type: "error", title, message })
  }

  const info = (title: string, message?: string) => {
    addToast({ type: "info", title, message })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  }
}
