"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: Record<string, any>[]
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics 4
    const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with actual GA4 ID

    // Load Google Analytics
    const script1 = document.createElement("script")
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'university_section',
          'custom_parameter_2': 'user_type'
        }
      });
    `
    document.head.appendChild(script2)

    // Track page views
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      })
    }

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Track custom events for university-specific actions
    const trackUniversityEvents = () => {
      // Track program interest
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement
        if (target.closest("[data-program]")) {
          const program = target.closest("[data-program]")?.getAttribute("data-program")
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", "program_interest", {
              event_category: "Academic Programs",
              event_label: program,
              custom_parameter_1: "academics",
              custom_parameter_2: "prospective_student",
            })
          }
        }

        // Track application clicks
        if (target.closest('[href*="apply"]')) {
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", "application_start", {
              event_category: "Admissions",
              event_label: "Apply Now Button",
              custom_parameter_1: "admissions",
              custom_parameter_2: "prospective_student",
            })
          }
        }

        // Track contact attempts
        if (target.closest('[href^="tel:"], [href^="mailto:"]')) {
          const contactType = target.closest('[href^="tel:"]') ? "phone" : "email"
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", "contact_attempt", {
              event_category: "Contact",
              event_label: contactType,
              custom_parameter_1: "contact",
              custom_parameter_2: "interested_visitor",
            })
          }
        }
      })
    }

    trackUniversityEvents()
  }, [])

  return null
}
