"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface EnhancedCardProps {
  title: string
  description?: string
  badge?: string
  badgeColor?: string
  image?: string
  children?: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  hoverEffect?: boolean
  delay?: number
}

export default function EnhancedCard({
  title,
  description,
  badge,
  badgeColor = "bg-green-100 text-green-800",
  image,
  children,
  onClick,
  href,
  className = "",
  hoverEffect = true,
  delay = 0,
}: EnhancedCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const hoverVariants = hoverEffect
    ? {
        hover: {
          y: -5,
          scale: 1.02,
          transition: { duration: 0.2 },
        },
      }
    : {}

  const CardComponent = motion(Card)

  return (
    <CardComponent
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className={`cursor-pointer group overflow-hidden ${className}`}
      onClick={onClick}
      {...hoverVariants}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {badge && <Badge className={`absolute top-4 right-4 ${badgeColor}`}>{badge}</Badge>}
        </div>
      )}

      <CardHeader>
        {badge && !image && <Badge className={`w-fit mb-2 ${badgeColor}`}>{badge}</Badge>}
        <CardTitle className="group-hover:text-green-600 transition-colors duration-300">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      {children && <CardContent>{children}</CardContent>}

      {(onClick || href) && (
        <div className="p-6 pt-0">
          <Button
            variant="outline"
            className="w-full group-hover:bg-green-50 transition-colors duration-300 bg-transparent"
          >
            Learn More
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}
    </CardComponent>
  )
}
