"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
