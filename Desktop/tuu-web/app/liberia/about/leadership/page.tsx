"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin } from "lucide-react"

const leaders = [
  {
    name: "Dr. Emmanuel Johnson",
    title: "Chancellor",
    bio: "Dr. Johnson has led Unity University Liberia since 2012, driving strategic growth and international partnerships.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Prof. Grace K. Doe",
    title: "Vice-Chancellor, Academic Affairs",
    bio: "Prof. Doe oversees all academic programs, ensuring quality and innovation across faculties.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Mr. Samuel Nyenkan",
    title: "Registrar",
    bio: "With 15 years of administrative experience, Mr. Nyenkan manages student services and records.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Dr. Linda Mensah",
    title: "Dean of Research & Innovation",
    bio: "Dr. Mensah spearheads research initiatives that address Liberia's socio-economic challenges.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
]

export default function LiberiaLeadershipPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <LiberiaNavbar />

      {/* Hero */}
      <section className="relative h-64 w-full bg-gradient-to-r from-blue-700 to-red-700 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Leadership Team</h1>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
          >
            Guiding Unity University's Vision & Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Meet the dedicated leaders who uphold our commitment to academic excellence, innovation, and societal impact
            across Liberia and beyond.
          </motion.p>
        </div>
      </section>

      {/* Leaders */}
      <section className="flex-1 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 w-full group">
                  <Image src={leader.img} alt={leader.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <a
                    href={leader.link}
                    className="absolute bottom-3 right-3 bg-blue-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{leader.title}</p>
                  <p className="text-gray-600 text-sm flex-1">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <LiberiaFooter />
    </div>
  )
} 