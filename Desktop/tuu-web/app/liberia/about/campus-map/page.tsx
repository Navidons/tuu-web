"use client"

import { useState } from "react"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Building, BookOpen, Microscope, Users, Utensils, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const buildings = [
  {
    id: 1,
    name: "Administration Building",
    icon: Building,
    description: "Central administration, registrar & finance offices.",
    coords: { x: 22, y: 28 },
    color: "bg-red-600",
  },
  {
    id: 2,
    name: "Science Lab Complex",
    icon: Microscope,
    description: "Modern laboratories for medical & natural sciences.",
    coords: { x: 45, y: 35 },
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "Main Library",
    icon: BookOpen,
    description: "Extensive collections, digital resources & study rooms.",
    coords: { x: 65, y: 52 },
    color: "bg-indigo-600",
  },
  {
    id: 4,
    name: "Student Center",
    icon: Users,
    description: "Dining, clubs, health clinic & recreation.",
    coords: { x: 30, y: 65 },
    color: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Cafeteria",
    icon: Utensils,
    description: "Affordable meals & coffee for students and staff.",
    coords: { x: 80, y: 40 },
    color: "bg-green-500",
  },
]

export default function LiberiaCampusMapPage() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LiberiaNavbar />

      {/* Hero */}
      <section className="relative h-60 w-full bg-gradient-to-r from-red-700 to-blue-700 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Campus Map</h1>
      </section>

      {/* Map Section */}
      <section className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image src="/placeholder.svg?height=600&width=800" alt="Campus Map" fill className="object-cover" />
            {buildings.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveId(b.id)}
                style={{ left: `${b.coords.x}%`, top: `${b.coords.y}%` }}
                className={`${b.color} absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md border-2 border-white hover:scale-125 transition-transform`}
                aria-label={b.name}
              />
            ))}
          </div>

          {/* Info Panel */}
          <div className="order-1 lg:order-2">
            {activeId ? (
              buildings
                .filter((b) => b.id === activeId)
                .map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                  >
                    <div className="flex items-center mb-4">
                      <b.icon className={`h-8 w-8 text-white p-1 rounded-md mr-3 ${b.color}`} />
                      <h2 className="text-2xl font-bold text-gray-900">{b.name}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{b.description}</p>
                    <Badge className="bg-gray-100 text-gray-700" variant="secondary">
                      Tap marker on the map to explore others
                    </Badge>
                  </motion.div>
                ))
            ) : (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Explore Our Campus</CardTitle>
                  <CardContent>
                    <p className="text-gray-600">
                      Click on markers in the map to learn more about key buildings and facilities across Unity University
                      Liberia.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
} 