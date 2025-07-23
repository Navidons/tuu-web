"use client"

import React from 'react'
import { useResponsive, useMobileCheck } from '@/hooks/use-mobile'
import { useMobilePerformance } from '@/hooks/use-mobile-performance'

interface MobileResponsiveProps {
  mobileView?: React.ReactNode
  desktopView?: React.ReactNode
  mobileProps?: Record<string, any>
  desktopProps?: Record<string, any>
}

export function withMobileResponsive<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function MobileResponsiveWrapper(props: P & MobileResponsiveProps) {
    const { 
      mobileView, 
      desktopView, 
      mobileProps = {}, 
      desktopProps = {},
      ...restProps 
    } = props

    const { isMobile, isTablet, isDesktop } = useMobileCheck()
    const { 
      isLowPerformance, 
      shouldReduceMotion, 
      networkQuality 
    } = useMobilePerformance()

    // Render logic
    if (mobileView && isMobile) {
      const extraProps = {
        ...(mobileProps || {}),
        ...{'data-mobile': true, 'data-performance': networkQuality, 'data-motion': shouldReduceMotion ? 'reduced' : 'normal'},
      }
      return React.isValidElement(mobileView)
        ? React.cloneElement(mobileView, extraProps)
        : mobileView
    }

    if (desktopView && (isTablet || isDesktop)) {
      const extraProps = {
        ...(desktopProps || {}),
        ...{'data-desktop': true, 'data-performance': networkQuality, 'data-motion': shouldReduceMotion ? 'reduced' : 'normal'},
      }
      return React.isValidElement(desktopView)
        ? React.cloneElement(desktopView, extraProps)
        : desktopView
    }

    // Default to wrapped component with additional props
    return (
      <WrappedComponent 
        {...restProps as P} 
        data-mobile={isMobile}
        data-tablet={isTablet}
        data-desktop={isDesktop}
        data-performance={networkQuality}
        data-motion={shouldReduceMotion ? 'reduced' : 'normal'}
      />
    )
  }
}

// Responsive Render Utility
export function ResponsiveRender({
  mobile,
  desktop,
  tablet
}: {
  mobile: React.ReactNode
  desktop: React.ReactNode
  tablet?: React.ReactNode
}) {
  const { isMobile, isTablet, isDesktop } = useMobileCheck()

  if (isMobile) return mobile
  if (isTablet) return tablet || desktop
  return desktop
}

// Performance-aware Image Component
export function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  alt,
  ...props
}: {
  mobileSrc: string
  desktopSrc: string
  alt: string
}) {
  const { isMobile } = useMobileCheck()

  return (
    <img 
      src={isMobile ? mobileSrc : desktopSrc} 
      alt={alt}
      loading="lazy"
      {...props}
    />
  )
}

// Mobile Performance Wrapper
export function MobilePerformanceWrapper({
  children,
  lowPerformanceRender
}: {
  children: React.ReactNode
  lowPerformanceRender?: React.ReactNode
}) {
  const { isLowPerformance } = useMobilePerformance()

  if (isLowPerformance && lowPerformanceRender) {
    return <>{lowPerformanceRender}</>
  }

  return <>{children}</>
} 