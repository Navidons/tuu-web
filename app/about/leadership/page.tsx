"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Linkedin, Award, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"
import Link from "next/link"
import Head from "next/head"

export default function LeadershipPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const facultyDeans = [
    {
      name: "Ganja Martin",
      title: "Dean, Faculty of Education",
      description: "Leading educational innovation and teacher development programs",
      image: "/leadership/ganja-martin.jpg",
    },
    {
      name: "Lutaaya Daniel",
      title: "Dean, Faculty of Social Sciences",
      description: "Advancing social research and community development initiatives",
      image: "/leadership/Mr.Lutaaya-Daniel-Dean-Social-Sciences.jpg",
    },
    {
      name: "Samson Kiggundu",
      title: "Dean, Faculty of Allied Health Sciences",
      description: "Promoting health education and community wellness programs",
      image: "/leadership/samson-kiggundu.jpg",
    },
    {
      name: "Jackson Kisuule",
      title: "Dean, Faculty of Computing & Information Technology",
      description: "Driving technological innovation and digital transformation",
      image: "/leadership/Jackson-Kisuule(Dean IT).jpg",
    },
  ]

  // Directors section below main leadership
  const directors = [
    {
      name: "Kirinya Robert",
      title: "Director, Quality Assurance",
      description: "Maintaining academic excellence and institutional standards",
      image: "/leadership/kirinya-robert.jpg",
    },
    {
      name: "Semakalu Ronald",
      title: "Foundation City Campus",
      description: "Ensuring academic preparedness and foundational skills development",
      image: "/leadership/semakalu-ronald.jpg",
    },
    {
      name: "Ganja Martin",
      title: "Foundation Main Campus",
      description: "Leading educational innovation and teacher development programs",
      image: "/leadership/ganja-martin.jpg",
    },
  ]

  const boardMembers = [
    {
      name: "Prof. PLO Lumumba",
      title: "Vice-Chancellor",
      description: "Leading The Unity University's mission across Africa",
      image: "/leadership/plo-lumumba.jpeg",
    },
    {
      name: "Dr. Katerega David",
      title: "Deputy Vice-Chancellor",
      description: "Academic excellence and strategic development",
      image: "/leadership/dr.katerega-dvc-graduation.jpg",
    },
    {
      name: "Dr. Zakaria",
      title: "Project Manager",
      description: "Strategic initiatives and institutional growth",
      image: "/lecturers/dr.ndimbo-micheal-balonzi-head-of-research.jpg",
    },
    {
      name: "Kaggwa Robert Abubaker",
      title: "Dean of Student Affairs",
      description: "Student welfare and holistic development",
      image: "/leadership/Mr.Kaggwa-Robert-Dean-of-Students.jpg",
    },
  ]

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "name": "Prof. PLO Lumumba",
              "jobTitle": "Founder & Chancellor",
              "image": "https://tuu.university/leadership/plof.PLO-lumumba.jpg",
              "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "description": "Prof. PLO Lumumba is the distinguished Founder and Chancellor of The Unity University, renowned Pan-African thought leader and anti-corruption advocate."
            },
            {
              "@type": "Person",
              "name": "Dr. Katerega",
              "jobTitle": "Vice Chancellor",
              "image": "https://tuu.university/leadership/dr.katerega-dvc-graduation.jpg",
              "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "description": "Dr. Katerega is the Vice Chancellor of The Unity University, providing visionary leadership and academic excellence."
            },
            {
              "@type": "Person",
              "name": "Kavuma Yusuf Musa",
              "jobTitle": "Campus Director",
              "image": "https://tuu.university/leadership/kavuma-yusuf-musa-campas-director.png",
              "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "The Unity University",
                "url": "https://tuu.university/"
              },
              "description": "Kavuma Yusuf Musa is the Campus Director, leading campus operations and student engagement at The Unity University."
            }
          ]
        }` }} />
      </Head>
      <div className="min-h-screen bg-white">
        <EnhancedNavbar />

        {/* Hero Section */}
        <section className="relative w-full h-[32rem] md:h-[40rem] overflow-hidden flex items-center justify-center">
          <Image
            src="/hero-section/Prof.PLO-Lumumba-officially-opens-The-Unity-University-(TUU).jpg"
            alt="Prof. PLO Lumumba officially opens The Unity University"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center drop-shadow-lg bg-black bg-opacity-30 px-6 py-2 rounded">
              Our Leadership
            </h1>
          </div>
          {/* Prof. PLO Lumumba Circular Image on the right */}
          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20">
            <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
              <Image
                src="/hero-section/plo-africa.jpg"
                alt="Portrait of Prof. PLO Lumumba, Founder & Chancellor of The Unity University"
                width={256}
                height={256}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Executive Leadership */}
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
                        alt={`Portrait of ${leader.name}, ${leader.title} at The Unity University`}
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

        {/* Directors */}
        <section className="py-16 md:py-24 bg-white border-b-4 border-emerald-600 font-serif">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Directors</h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Key directors supporting quality, foundation, and campus operations
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {directors.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-white border-2 border-gray-100 rounded-md shadow-md flex flex-col items-center overflow-hidden p-0"
                >
                  <div className="relative w-full h-56 sm:h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`Portrait of ${member.name}, ${member.title} at The Unity University`}
                      fill
                      className="object-cover w-full h-full border-b-2 border-emerald-100"
                    />
                  </div>
                  <div className="p-5 sm:p-6 w-full text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 uppercase tracking-wide">{member.name}</h3>
                    <p className="text-emerald-700 font-semibold mb-1.5 text-xs sm:text-sm">{member.title}</p>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Deans */}
        <section className="py-16 md:py-24 bg-[#faf9f7] border-b-4 border-emerald-600 font-serif">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Faculty Deans</h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Academic leaders driving excellence across our diverse faculties and programs
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {facultyDeans.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-white border-2 border-gray-100 rounded-md shadow-md flex flex-col items-center overflow-hidden p-0"
                >
                  <div className="relative w-full h-56 sm:h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`Portrait of ${member.name}, ${member.title} at The Unity University`}
                      fill
                      className="object-cover w-full h-full border-b-2 border-emerald-100"
                    />
                  </div>
                  <div className="p-5 sm:p-6 w-full text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 uppercase tracking-wide">{member.name}</h3>
                    <p className="text-emerald-700 font-semibold mb-1.5 text-xs sm:text-sm">{member.title}</p>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section className="py-16 md:py-24 bg-[#faf9f7] border-b-4 border-emerald-600 font-serif">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Our Leadership Philosophy</h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                The principles that guide our approach to education and institutional excellence
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: "Collaborative Leadership",
                  description:
                    "We believe in shared governance and collective decision-making that involves all stakeholders in our educational community.",
                  color: "emerald",
                },
                {
                  icon: BookOpen,
                  title: "Academic Excellence",
                  description:
                    "Our leaders are committed to maintaining the highest standards of education while fostering innovation and critical thinking.",
                  color: "gray",
                },
                {
                  icon: Award,
                  title: "Ethical Integrity",
                  description:
                    "We lead by example, demonstrating transparency, accountability, and ethical behavior in all our institutional practices.",
                  color: "red",
                },
              ].map((principle, index) => (
                <div
                  key={principle.title}
                  className={`text-center p-8 rounded-md border-2 shadow-sm bg-white ${principle.color === "emerald" ? "border-emerald-600" : principle.color === "red" ? "border-red-600" : "border-gray-300"}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ${principle.color === "emerald" ? "bg-emerald-50" : principle.color === "red" ? "bg-red-50" : "bg-gray-100"}`}>
                    <principle.icon className={`h-8 w-8 ${principle.color === "emerald" ? "text-emerald-700" : principle.color === "red" ? "text-red-700" : "text-gray-700"}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${principle.color === "emerald" ? "text-emerald-700" : principle.color === "red" ? "text-red-700" : "text-gray-900"}`}>{principle.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-width Strip Image */}
        <a
          href="/admissions/apply"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
          aria-label="Apply to The Unity University"
        >
          <Image
            src="/strips/the_unity_university_cover.jpeg"
            alt="The Unity University Cover"
            width={1920}
            height={200}
            className="w-full h-32 md:h-48 object-cover object-center"
            priority
          />
        </a>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-white border-b-4 border-emerald-600 font-serif">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8 border-b-4 border-emerald-600 inline-block pb-2 uppercase tracking-wide">Join Our Leadership Journey</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              Be part of an institution led by visionaries who are committed to transforming education and empowering the next generation of African leaders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-10 py-4 text-lg font-bold shadow-md font-serif transition-all duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-3 h-6 w-6 text-white" />
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-full px-10 py-4 text-lg font-bold font-serif transition-all duration-200"
                >
                  Contact Leadership
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <EnhancedFooter />
      </div>
    </>
  )
}
