"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"

const LiberiaFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-sm shadow-sm border border-white/20 animate-flag-wave")}
    >
      {/* Stripes */}
      <div className="liberian-flag-gradient w-full h-full" />

      {/* Blue canton with white star */}
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-[10px] h-[10px] text-white fill-current drop-shadow-sm"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

export default function LiberiaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isClient])

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const navLinks = [
    { name: "Home", href: "/liberia" },
    {
      name: "Academics",
      href: "/liberia/academics",
      dropdown: [
        { name: "Undergraduate Programs", href: "/liberia/academics/undergraduate" },
        { name: "Graduate Programs", href: "/liberia/academics/graduate" },
        { name: "Academic Calendar", href: "/liberia/academics/calendar" },
      ],
    },
    {
      name: "Admissions",
      href: "/liberia/admissions",
      dropdown: [
        { name: "Apply Now", href: "/admissions/apply" },
        { name: "International Students", href: "/liberia/admissions/international" },
      ],
    },
    {
      name: "About",
      href: "/liberia/about",
      dropdown: [
        { name: "Our History", href: "/liberia/about/history" },
        { name: "Leadership", href: "/liberia/about/leadership" },
        { name: "Contact Us", href: "/liberia/about/contact" },
        { name: "Network", href: "/liberia/about/network" },
      ],
    },
  ]

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const mobileMenuVariants: Variants = {
    hidden: {
      x: "100%",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <>
      {/* Enhanced top bar */}
      {isClient && (
        <motion.div
          className={cn(
            "hidden w-full bg-gradient-to-r from-red-600 to-blue-600 py-3 transition-all duration-500 lg:block",
            isScrolled ? "lg:hidden" : "",
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto flex items-center justify-between px-4">
            <motion.div
              className="flex items-center space-x-8 text-sm text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.a
                href="mailto:liberia@tuu.university"
                className="flex items-center hover:text-red-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="mr-2 h-4 w-4" />
                liberia@tuu.university
              </motion.a>
              <motion.a
                href="tel:+23177123456"
                className="flex items-center hover:text-red-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="mr-2 h-4 w-4" />
                +231 77 123 4567
              </motion.a>
              <span className="font-semibold">What begins here, Transforms Africa</span>
            </motion.div>
            <motion.div
              className="text-sm text-white font-bold flex items-center space-x-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <LiberiaFlag />
              <span>The Love of Liberty Brought Us Here</span>
            </motion.div>
          </div>
        </motion.div>
      )}

      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500",
          isScrolled ? "py-2 shadow-xl" : "py-4",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/liberia" className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05, rotate: 3 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/tuu-logo/tuu-logo.png"
                  alt="The Unity University Logo"
                  width={120}
                  height={120}
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-liberian-gradient">The Unity University</span>
                <div className="text-xs text-gray-500 font-medium">Liberia Campus</div>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Campus Indicator */}
          <motion.div
            className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-red-50 to-blue-50 px-4 py-2 rounded-full border border-red-200 shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Monrovia</span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
            </motion.div>
          </motion.div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {link.dropdown ? (
                    <div>
                      <motion.button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                          "text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                          activeDropdown === link.name ? "text-blue-700 bg-blue-50" : "",
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </motion.div>
                      </motion.button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            className="absolute left-0 mt-2 w-72 rounded-xl bg-white py-3 shadow-2xl ring-1 ring-black ring-opacity-5 border border-gray-100 backdrop-blur-md"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {link.dropdown.map((item, itemIndex) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05 }}
                              >
                                <Link
                                  href={item.href}
                                  {...(item.name === "Apply Now" && { target: "_blank", rel: "noopener noreferrer" })}
                                  className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50 hover:text-blue-700 transition-all duration-300 rounded-lg mx-2"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-blue-700 hover:bg-blue-50"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="hidden items-center space-x-4 lg:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg transition-all duration-300 hover:shadow-xl px-6 py-3 font-bold">
                  Apply Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.button
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="p-6 h-full overflow-y-auto">
                <motion.div
                  className="mb-8 flex flex-col space-y-4 border-b border-gray-100 pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 text-red-700 font-medium">
                    <MapPin className="h-5 w-5" />
                    <span>Monrovia, Liberia</span>
                    <LiberiaFlag />
                  </div>
                  <a
                    href="mailto:liberia@tuu.university"
                    className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    liberia@tuu.university
                  </a>
                  <a
                    href="tel:+23177123456"
                    className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    +231 77 123 4567
                  </a>
                  <div className="text-sm text-gray-500 font-medium italic">"The Love of Liberty Brought Us Here"</div>
                </motion.div>

                <nav>
                  <ul className="space-y-3">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        className="border-b border-gray-50 pb-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {link.dropdown ? (
                          <div>
                            <motion.button
                              onClick={() => toggleDropdown(link.name)}
                              className="flex w-full items-center justify-between text-lg font-semibold text-gray-800 py-3"
                              whileTap={{ scale: 0.95 }}
                            >
                              {link.name}
                              <motion.div
                                animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              </motion.div>
                            </motion.button>
                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.div
                                  className="mt-3 pl-6 space-y-3"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {link.dropdown.map((item, itemIndex) => (
                                    <motion.div
                                      key={item.name}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: itemIndex * 0.05 }}
                                    >
                                      <Link
                                        href={item.href}
                                        {...(item.name === "Apply Now" && { target: "_blank", rel: "noopener noreferrer" })}
                                        className="block py-2 text-gray-600 hover:text-blue-700 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {item.name}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Link
                              href={link.href}
                              className="block text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors py-3"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.name}
                            </Link>
                          </motion.div>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg py-4 text-lg font-bold">
                        Apply Now - 2024 Admission
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
