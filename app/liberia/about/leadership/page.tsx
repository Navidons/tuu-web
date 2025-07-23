"use client"

import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Mail, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

// Leadership data copied from /about/leadership/page.tsx
const leadership = [
  {
    name: "Prof. PLO Lumumba",
    title: "Chancellor, Founder",
    image: "/leadership/plof.PLO-lumumba.jpg",
    bio: "Prof. PLO Lumumba is the Chancellor and Founder of The Unity University, bringing decades of experience in education, law, and African development. He is also part of the Lumumba Foundation, which pushes the vision of spreading free education to Africa.",
    education: "LLB, LLM (Thesis: National Security And Fundamental Rights), PhD - University of Nairobi; PhD in Laws of the Sea - University of Ghent, Belgium",
    achievements: [
      "Chancellor and Founder of The Unity University",
      "Part of the Lumumba Foundation, championing free education across Africa",
      "Former Director, Kenya Anti-Corruption Commission",
      "Renowned Pan-African thought leader",
      "Author and international speaker",
      "Expert in constitutional law and governance",
    ],
    quote: "Discipline is the heart of who you are. No matter how educated you are; no matter how rich you are; if you do not have the gift of discipline, then you are a danger to the society.",
  },
  {
    name: "Dr. Katerega David",
    title: "Vice-Chancellor",
    image: "/leadership/dr.katerega-dvc-graduation.jpg",
    bio: "Dr. Katerega David serves as the Vice-Chancellor, overseeing academic operations and strategic development across both campuses.",
    education: "PhD in Educational Administration",
    achievements: [
      "20+ years in higher education leadership",
      "Expert in academic quality assurance",
      "Champion of Pan-African education",
      "Strategic planning and institutional development",
    ],
    quote: "Education is the foundation upon which we build the future of Africa.",
  },
  {
    name: "Kavuma Yusuf Musa",
    title: "Campus Director",
    image: "/leadership/kavuma-yusuf-musa-campas-director.png",
    bio: "Kavuma Yusuf Musa has been an integral part of The Unity University since its founding, overseeing campus operations, strategic development, and supporting every major milestone in the university's journey. His leadership and dedication have been instrumental in the university's growth and success.",
    education: "MBA in Management, BSc in Administration",
    achievements: [
      "Founding team member of The Unity University",
      "Instrumental in campus growth and infrastructure development",
      "Consistent leadership and operational excellence since inception",
      "Key contributor to student success and campus life initiatives",
      "Supportive presence in all major university achievements and milestones",
    ],
    quote: "Success is built on teamwork, dedication, and a shared vision for excellence.",
  },
  {
    name: "Kaggwa Robert Abubaker",
    title: "Dean of Student Affairs",
    image: "/leadership/Mr.Kaggwa-Robert-Dean-of-Students.jpg",
    bio: "Kaggwa Robert Abubaker oversees student life, welfare, and development programs across The Unity University's campuses.",
    education: "Master's in Student Affairs Administration",
    achievements: [
      "Champion of student welfare and development",
      "Expert in student leadership programs",
      "Community engagement specialist",
      "Holistic student development advocate",
    ],
    quote: "Students are at the heart of everything we do at The Unity University.",
  },
]

export default function LiberiaLeadershipPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <LiberiaNavbar />

      {/* Hero */}
      <section className="relative w-full h-[28rem] md:h-[36rem] overflow-hidden flex items-center justify-center">
        <Image
          src="/hero-section/Prof.PLO-Lumumba-officially-opens-The-Unity-University-(TUU).jpg"
          alt="The Unity University Hero"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg bg-black bg-opacity-30 px-6 py-2 rounded">
            Our Leadership
          </h1>
        </div>
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

      {/* Leaders - match /about/leadership style and order */}
      <section className="py-16 md:py-24 bg-[#faf9f7] border-b-4 border-emerald-600 font-serif">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Executive Leadership</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              The visionary leaders who shape our academic excellence and global impact
            </p>
          </div>

          <div className="space-y-16 md:space-y-20">
            {leadership.map((leader, index) => (
              <div
                key={leader.name}
                className={`grid gap-8 sm:grid-cols-1 lg:grid-cols-2 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative w-full max-w-md mx-auto">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={500}
                      height={600}
                      className="rounded-md border-2 border-emerald-100 shadow-md w-full h-auto"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 uppercase tracking-wide">{leader.name}</h3>
                      <p className="text-lg sm:text-xl text-emerald-700 font-semibold mb-3 sm:mb-4">{leader.title}</p>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{leader.bio}</p>
                    </div>

                    <div className="bg-white border-2 border-emerald-100 rounded-md p-5 sm:p-6">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Education</h4>
                      <p className="text-sm sm:text-base text-gray-700">{leader.education}</p>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Key Achievements</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {leader.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-2 sm:space-x-3">
                            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <blockquote className="border-l-4 border-emerald-600 pl-4 sm:pl-6 italic text-gray-700 text-base sm:text-lg">
                      "{leader.quote}"
                    </blockquote>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-full py-2 px-6 font-serif font-bold transition-all duration-200"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto border-2 border-red-600 text-red-700 hover:bg-red-50 rounded-full py-2 px-6 font-serif font-bold transition-all duration-200"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <LiberiaFooter />
    </div>
  )
} 