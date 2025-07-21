"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin } from "lucide-react"

const leaders = [
  {
    name: "Prof. PLO Lumumba",
    title: "Vice-Chancellor",
    bio: "Prof. PLO Lumumba is the distinguished Vice-Chancellor of The Unity University, providing overall leadership across both Somaliland and Liberia campuses. A renowned Pan-African thought leader and former Director of Kenya Anti-Corruption Commission.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Dr. Katerega David",
    title: "Deputy Vice-Chancellor",
    bio: "Dr. Katerega David oversees academic operations and strategic development across both campuses, ensuring The Unity University maintains its commitment to academic excellence.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Dr. Zakaria",
    title: "Project Manager",
    bio: "Dr. Zakaria leads strategic projects and initiatives including the establishment and development of the Liberia campus, driving The Unity University's Pan-African expansion.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Kaggwa Robert Abubaker",
    title: "Dean of Student Affairs",
    bio: "Kaggwa Robert Abubaker oversees student life, welfare, and development programs across The Unity University's campuses, ensuring holistic student development.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Kavuma Yusuf Musa",
    title: "Campus Director",
    bio: "Kavuma Yusuf Musa oversees campus operations and strategic development, ensuring smooth functioning and growth of The Unity University facilities and services.",
    img: "/placeholder-user.jpg",
    link: "#",
  },
  {
    name: "Kirinya Robert",
    title: "Director, Quality Assurance",
    bio: "Kirinya Robert ensures the maintenance of academic excellence and institutional standards across all The Unity University programs and campuses.",
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
            Leading The Unity University's Pan-African Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Meet the dedicated leaders who guide The Unity University's mission "What begins here, transforms Africa" across our Somaliland and Liberia campuses, driving academic excellence, innovation, and leadership development throughout Africa.
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