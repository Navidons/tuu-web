import { useState, useEffect } from 'react'

interface MobilePerformance {
  isLowPerformance: boolean
  shouldReduceMotion: boolean
  networkQuality: 'slow' | 'moderate' | 'fast'
}

export function useMobilePerformance(): MobilePerformance {
  const [performance, setPerformance] = useState<MobilePerformance>({
    isLowPerformance: false,
    shouldReduceMotion: false,
    networkQuality: 'moderate'
  })

  useEffect(() => {
    const checkPerformance = () => {
      // Check device performance
      const deviceMemory = navigator.deviceMemory || 4
      const isLowPerformance = deviceMemory < 4

      // Check motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Check network quality
      const connection = (navigator as any).connection || {}
      const effectiveType = connection.effectiveType || 'unknown'
      
      let networkQuality: MobilePerformance['networkQuality'] = 'moderate'
      if (effectiveType === '4g') networkQuality = 'fast'
      if (effectiveType === '2g' || effectiveType === 'slow-2g') networkQuality = 'slow'

      setPerformance({
        isLowPerformance,
        shouldReduceMotion: prefersReducedMotion,
        networkQuality
      })
    }

    // Initial check
    checkPerformance()

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkPerformance)

    return () => {
      mediaQuery.removeEventListener('change', checkPerformance)
    }
  }, [])

  return performance
}

// Utility for conditionally rendering based on performance
export function usePerformanceRendering() {
  const { isLowPerformance, shouldReduceMotion, networkQuality } = useMobilePerformance()

  return {
    shouldRenderAnimation: !isLowPerformance && !shouldReduceMotion,
    shouldLoadHighResImages: networkQuality !== 'slow',
    performanceClass: (
      lowPerformanceClass: string, 
      normalClass: string
    ) => isLowPerformance ? lowPerformanceClass : normalClass
  }
} 