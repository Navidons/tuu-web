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
            Tracing the journey of The Unity University from its founding in 2021 in Somaliland to the establishment of our Liberia campus in 2024, expanding our Pan-African mission across the continent.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {[
            {
              year: "2021",
              title: "The Unity University Founded",
              description:
                "The Unity University was established in Hargeisa, Somaliland, with the motto 'What begins here, transforms Africa' and a vision to become a world-class university in leadership development.",
            },
            {
              year: "2022",
              title: "Academic Programs Launched",
              description:
                "Comprehensive academic programs established across five faculties: Business & Management, Computing & IT, Allied Health Sciences, Social Sciences, and Education.",
            },
            {
              year: "2023",
              title: "Research & Graduate Programs",
              description:
                "Master's programs launched across multiple faculties, establishing The Unity University as a growing center for higher education and research in the Horn of Africa.",
            },
            {
              year: "2024",
              title: "Liberia Campus Established",
              description:
                "The Unity University expanded to West Africa with the opening of our Liberia campus in Monrovia, creating a truly Pan-African educational network serving both East and West Africa.",
            },
            {
              year: "2025",
              title: "Growing Excellence",
              description:
                "Continuing our mission with over 4,000 students across both campuses, The Unity University remains committed to transforming Africa through quality education and leadership development.",
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