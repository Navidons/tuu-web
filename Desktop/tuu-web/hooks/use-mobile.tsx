"use client"

import * as React from "react"

export interface MobileDetection {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  orientation: 'portrait' | 'landscape'
}

export function useResponsive(): MobileDetection {
  const [detection, setDetection] = React.useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 0,
    orientation: 'portrait'
  })

  React.useEffect(() => {
    const updateScreenDetails = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const newDetection: MobileDetection = {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        orientation: width < height ? 'portrait' : 'landscape'
      }

      setDetection(newDetection)
    }

    // Initial call
    updateScreenDetails()

    // Add event listener
    window.addEventListener('resize', updateScreenDetails)

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenDetails)
  }, [])

  return detection
}

// Utility hook for specific mobile checks
export function useMobileCheck() {
  const { isMobile, isTablet, isDesktop, orientation } = useResponsive()

  return {
    isMobile,
    isTablet,
    isDesktop,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    
    // Responsive design utilities
    responsiveClass: (mobileClass: string, desktopClass: string) => 
      isMobile ? mobileClass : desktopClass,
    
    // Responsive rendering
    renderResponsive: (
      mobileComponent: React.ReactNode, 
      desktopComponent: React.ReactNode
    ) => isMobile ? mobileComponent : desktopComponent
  }
}

// Touch device detection
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  )
}
