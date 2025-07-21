import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const LiberiaFlag = ({ className = "h-4 w-6", uniqueId = "" }: { className?: string, uniqueId?: string }) => {
  return (
    <svg
      className={cn(className, "rounded-sm shadow-sm border border-white/20")}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Liberia Flag"
    >
      {[...Array(11)].map((_, i) => (
        <rect
          key={`${uniqueId}-stripe-${i}`}
          x="0"
          y={(40 / 11) * i}
          width="60"
          height={40 / 11}
          fill={i % 2 === 0 ? "#D21034" : "#fff"}
        />
      ))}
      <rect x="0" y="0" width={60 / 3} height={40 / 2} fill="#003893" />
      <g transform={`translate(${60 / 6},${40 / 4})`}>
        <polygon
          points="0,-7 2.05,-2.16 7, -2.16 3.09,0.83 4.18,5.67 0,2.8 -4.18,5.67 -3.09,0.83 -7,-2.16 -2.05,-2.16"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

export default function LiberiaFooter() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* University Info */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6 flex items-center">
              <img 
                src="/tuu-logo/tuu-logo.png" 
                alt="The Unity University Logo" 
                className="h-12 w-12 object-contain mr-3" 
              />
              <div>
                <span className="text-xl font-bold">The Unity University</span>
                <div className="text-xs text-gray-400 flex items-center space-x-2">
                  <span>Liberia Campus</span>
                  <LiberiaFlag className="h-4 w-6" uniqueId="header-flag" />
                </div>
              </div>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              What begins here, transforms Africa. The Unity University Liberia is a dynamic, vision-driven institution founded on Pan-Africanism and committed to pioneering excellence at the cutting edge of learning. Established in mid-2024 as part of our expansion across Africa.
            </p>
            <div className="mb-6">
              <Badge className="bg-red-600/20 text-red-300 border border-red-600/30 mb-2">Established 2024</Badge>
              <Badge className="bg-blue-600/20 text-blue-300 border border-blue-600/30 ml-2">
                Pan-African Excellence
              </Badge>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {[
                { icon: Facebook, href: "https://www.facebook.com/people/The-Unity-University-Liberia/61574316394828/", name: "Facebook" },
                { icon: Twitter, href: "#", name: "Twitter" },
                { icon: Instagram, href: "https://www.instagram.com/explore/locations/104837471861628/the-unity-university/", name: "Instagram" },
                { icon: Linkedin, href: "https://so.linkedin.com/company/the-unity-university", name: "Linkedin" },
                { icon: Youtube, href: "#", name: "Youtube" }
              ].map(({ icon: Icon, href, name }) => (
                <Link
                  key={`social-${name}`}
                  href={href}
                  {...(href !== "#" && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{name}</span>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Academics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Academics
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Undergraduate Programs", href: "/liberia/academics/undergraduate", category: "academics" },
                { name: "Graduate Programs", href: "/liberia/academics/graduate", category: "academics" }
              ].map(({ name, href, category }) => (
                <li key={`${category}-${name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <Link
                    href={href}
                    className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Admissions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Admissions
            </h3>
            <ul className="space-y-3">
              {[
                { name: "General Admissions", href: "/liberia/admissions", category: "admissions" },
                { name: "Apply Now", href: "/admissions/apply", external: true, category: "admissions" }
              ].map(({ name, href, external, category }) => (
                <li key={`${category}-${name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <Link
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200 flex items-center"
                  >
                    {name}
                    {external && <Heart className="h-3 w-3 ml-1 text-red-400" />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Contact & Connect
            </h3>
            <ul className="mb-8 space-y-4">
              {[
                { 
                  icon: MapPin, 
                  title: "Main Campus", 
                  details: ["Monrovia, Montserrado County", "Republic of Liberia, West Africa"] 
                },
                { 
                  icon: Phone, 
                  title: "Phone", 
                  details: ["+231 777 123 456"] 
                },
                { 
                  icon: Mail, 
                  title: "Email", 
                  details: ["liberia@tuu.university"] 
                }
              ].map(({ icon: Icon, title, details }) => (
                <li key={title} className="flex items-start">
                  <Icon className={`mr-3 h-5 w-5 text-red-400 mt-0.5 flex-shrink-0`} />
                  <div>
                    <span className="text-gray-300 font-medium">{title}</span>
                    {details.map((detail, index) => (
                      <div 
                        key={`${title}-${index}`} 
                        className={cn(
                          "text-sm text-gray-500", 
                          index === 0 ? "" : "text-xs text-gray-600"
                        )}
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
            >
              <h4 className="mb-3 font-bold text-white">Stay Connected</h4>
              <p className="text-sm text-gray-400 mb-4">Get updates on admissions, events, and university news.</p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:border-red-500"
                />
                <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 font-semibold">
                  Subscribe to Updates
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-2">
                &copy; mid-2024-{new Date().getFullYear()} The Unity University Liberia Campus. All rights reserved.
              </p>
              <div className="text-xs text-gray-500 italic flex items-center justify-center md:justify-start">
                <LiberiaFlag className="h-4 w-6 mr-2" uniqueId="footer-flag" />
                "The Love of Liberty Brought Us Here"
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {/* Footer links removed as requested */}
            </div>
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="mt-6 pt-6 border-t border-gray-800/50 text-center"
          >
            <p className="text-xs text-gray-500">
              The Unity University Liberia is committed to providing equal educational opportunities and fostering
              diversity, inclusion, and academic excellence in higher education across West Africa.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
