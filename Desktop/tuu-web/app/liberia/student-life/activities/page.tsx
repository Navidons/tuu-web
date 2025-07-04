"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Music, Dumbbell, Palette, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const activities = [
  {
    title: "Student Government",
    icon: Users,
    desc: "Lead, represent and make a difference in campus life.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Music & Choir",
    icon: Music,
    desc: "Showcase your talent and spread joy through music.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Sports & Fitness",
    icon: Dumbbell,
    desc: "Join competitive teams or stay fit with friends.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Art & Culture Club",
    icon: Palette,
    desc: "Celebrate Liberian culture through art and events.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Debate Society",
    icon: BookOpen,
    desc: "Sharpen critical thinking and public-speaking skills.",
    img: "/placeholder.svg?height=250&width=400",
  },
]

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LiberiaNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-700 to-blue-700 py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Student Activities</h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto">
          Engage, explore and excel beyond the classroom. Discover vibrant extracurricular opportunities at Unity
          University Liberia.
        </p>
      </section>

      {/* Activities Grid */}
      <section className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((act, idx) => (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={act.img} alt={act.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <act.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{act.title}</h3>
                  <p className="text-gray-600 text-sm">{act.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
} 