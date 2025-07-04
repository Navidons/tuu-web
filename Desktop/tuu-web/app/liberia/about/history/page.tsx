"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LiberiaHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <LiberiaNavbar />

      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-gradient-to-r from-red-700 to-blue-700 flex items-center justify-center">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Liberia Campus"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our History</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Tracing the journey of Unity University Liberia from humble beginnings in 2005 to a leading institution of
            higher learning in West Africa.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {[
            {
              year: "2005",
              title: "Founding Year",
              description:
                "Unity University Liberia opened its doors in Monrovia with a mission to provide accessible quality education.",
            },
            {
              year: "2008",
              title: "First Graduating Class",
              description:
                "Celebrated the graduation of our inaugural class, marking a milestone in our commitment to academic excellence.",
            },
            {
              year: "2015",
              title: "Campus Expansion",
              description:
                "Added new faculties and state-of-the-art facilities, supporting cutting-edge research and student life.",
            },
            {
              year: "2020",
              title: "Global Partnerships",
              description:
                "Forged strategic alliances with universities across Africa, Europe and North America to enhance research collaboration.",
            },
            {
              year: "2024",
              title: "18 Years of Excellence",
              description:
                "Celebrating nearly two decades of shaping leaders and innovators who drive positive change across Liberia and beyond.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-10 mb-12"
            >
              <div className="absolute left-0 top-0 h-full flex items-start">
                <div className="w-3 h-3 bg-red-600 rounded-full mt-1" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.year}</h3>
              <h4 className="text-lg font-semibold text-gray-700 mb-1">{item.title}</h4>
              <p className="text-gray-600 max-w-2xl">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <LiberiaFooter />
    </div>
  )
} 