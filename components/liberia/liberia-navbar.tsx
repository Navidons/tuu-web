"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Optimized flag component - removed unnecessary animations
const LiberiaFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <svg
      className={cn(className, "rounded-sm shadow-sm border border-white/20")}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Liberia Flag"
    >
      {/* 11 stripes: 6 red, 5 white, starting and ending with red */}
      {[...Array(11)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={(40 / 11) * i}
          width="60"
          height={40 / 11}
          fill={i % 2 === 0 ? "#D21034" : "#fff"}
        />
      ))}
      {/* Blue canton */}
      <rect x="0" y="0" width={60 / 3} height={40 / 2} fill="#003893" />
      {/* White star in canton */}
      <g transform={`translate(${60 / 6},${40 / 4})`}>
        <polygon
          points="0,-7 2.05,-2.16 7, -2.16 3.09,0.83 4.18,5.67 0,2.8 -4.18,5.67 -3.09,0.83 -7,-2.16 -2.05,-2.16"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

// Throttle function to limit scroll event frequency
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export default function LiberiaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 10)
    }, 100),
    []
  )

  useEffect(() => {
    // Check initial scroll position
    setIsScrolled(window.scrollY > 10)
    
    window.addEventListener("scroll", throttledScrollHandler, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler)
    }
  }, [throttledScrollHandler])

  const toggleDropdown = useCallback((name: string) => {
    setActiveDropdown(prev => prev === name ? null : name)
  }, [])

  // Memoize navigation links to prevent unnecessary re-renders
  const navLinks = useMemo(() => [
    { name: "Home", href: "/liberia" },
    {
      name: "Academics",
      href: "/liberia/academics",
      dropdown: [
        { name: "Undergraduate Programs", href: "/liberia/academics/undergraduate" },
        { name: "Graduate Programs", href: "/liberia/academics/graduate" },
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
  ], [])

  // Simplified dropdown variants
  const dropdownVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15 },
    },
  }), [])

  return (
    <>
      {/* Simplified top bar */}
      <div
        className={cn(
          "hidden w-full bg-gradient-to-r from-red-600 to-blue-600 py-3 transition-all duration-300 lg:block",
          isScrolled ? "lg:hidden" : "",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-8 text-sm text-white">
            <a
              href="mailto:liberia@tuu.university"
              className="flex items-center hover:text-red-100 transition-colors duration-200"
            >
              <Mail className="mr-2 h-4 w-4" />
              liberia@tuu.university
            </a>
            <a
              href="tel:+23177123456"
              className="flex items-center hover:text-red-100 transition-colors duration-200"
            >
              <Phone className="mr-2 h-4 w-4" />
              +231 77 123 4567
            </a>
            <span className="font-semibold">What begins here, Transforms Africa</span>
          </div>
          <div className="text-sm text-white font-bold flex items-center space-x-2">
            <LiberiaFlag className="h-4 w-6" />
            <span>The Love of Liberty Brought Us Here</span>
          </div>
        </div>
      </div>

      {/* Simplified header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300",
          isScrolled ? "py-2 shadow-xl" : "py-4",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <Link href="/liberia" className="flex items-center space-x-3">
              <div>
                <Image
                  src="/tuu-logo/tuu-logo.png"
                  alt="The Unity University Logo"
                  width={120}
                  height={120}
                  className="h-16 w-16 object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <div>
                <span className="text-xl font-bold text-liberian-gradient">The Unity University</span>
                <div className="text-xs text-gray-500 font-medium">Liberia Campus</div>
              </div>
            </Link>
          </div>

          {/* Simplified campus indicator - removed continuous animations */}
          <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-red-50 to-blue-50 px-4 py-2 rounded-full border border-red-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <MapPin className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Monrovia</span>
            <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
          </div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",
                          "text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                          activeDropdown === link.name ? "text-blue-700 bg-blue-50" : "",
                        )}
                      >
                        {link.name}
                        <ChevronDown 
                          className={cn(
                            "ml-1 h-4 w-4 transition-transform duration-200", 
                            activeDropdown === link.name ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            className="absolute left-0 mt-2 w-72 rounded-xl bg-white py-3 shadow-2xl ring-1 ring-black ring-opacity-5 border border-gray-100"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                {...(item.name === "Apply Now" && { target: "_blank", rel: "noopener noreferrer" })}
                                className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mx-2"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center space-x-4 lg:flex">
            <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg transition-all duration-200 hover:shadow-xl px-6 py-3 font-bold">
                Apply Now
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {/* Simplified mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 h-full overflow-y-auto">
                <div className="mb-8 flex flex-col space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex items-center space-x-3 text-red-700 font-medium">
                    <MapPin className="h-5 w-5" />
                    <span>Monrovia, Liberia</span>
                    <LiberiaFlag className="h-4 w-6" />
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
                </div>

                <nav>
                  <ul className="space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.name} className="border-b border-gray-50 pb-3">
                        {link.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(link.name)}
                              className="flex w-full items-center justify-between text-lg font-semibold text-gray-800 py-3"
                            >
                              {link.name}
                              <ChevronDown 
                                className={cn(
                                  "h-5 w-5 text-gray-400 transition-transform duration-200",
                                  activeDropdown === link.name ? "rotate-180" : ""
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.div
                                  className="mt-3 pl-6 space-y-3"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      {...(item.name === "Apply Now" && { target: "_blank", rel: "noopener noreferrer" })}
                                      className="block py-2 text-gray-600 hover:text-blue-700 transition-colors"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className="block text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors py-3"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8">
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-lg py-4 text-lg font-bold">
                      Apply Now - 2024 Admission
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
