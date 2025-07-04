"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Heart, Globe, Code2, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const orgs = [
  {
    title: "Community Service Club",
    icon: Heart,
    desc: "Volunteering and outreach projects that impact local communities.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "International Students Association",
    icon: Globe,
    desc: "Fostering cultural exchange and support for global students.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Tech Innovators Society",
    icon: Code2,
    desc: "Hackathons, coding workshops and tech entrepreneurship.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Public Speaking & Debate",
    icon: Mic,
    desc: "Enhance oratory skills through debates and speech contests.",
    img: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Peer Mentorship Program",
    icon: Users,
    desc: "Supporting freshmen through guidance and academic mentoring.",
    img: "/placeholder.svg?height=250&width=400",
  },
]

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LiberiaNavbar />
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-red-700 py-20 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Student Organizations</h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto">
          Connect, collaborate and lead. Explore diverse student organizations at Unity University Liberia.
        </p>
      </section>

      {/* Orgs Grid */}
      <section className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {orgs.map((org, idx) => (
            <motion.div
              key={org.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={org.img} alt={org.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <org.icon className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{org.title}</h3>
                  <p className="text-gray-600 text-sm">{org.desc}</p>
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