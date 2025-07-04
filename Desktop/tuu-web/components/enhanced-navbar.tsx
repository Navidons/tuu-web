"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, Star, Globe, ExternalLink } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"

// Flag components for visual campus identification (realistic designs)

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

const SomalilandFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <div className={cn(className, "relative overflow-hidden rounded-sm shadow-sm border border-white/20 animate-flag-wave")}
    >
      <div className="somaliland-flag-gradient w-full h-full" />
      {/* Center star */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] text-black fill-current">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

type DropdownItem = {
  name: string
  href: string
  description?: string
  motto?: string
  established?: string
  flag?: ({ className }: { className?: string }) => React.ReactElement
  external?: boolean
}

export default function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Campuses",
      href: "/campuses",
      dropdown: [
        {
          name: "Liberia Campus",
          href: "/liberia",
          description: "Monrovia, Montserrado County",
          motto: "The Love of Liberty Brought Us Here",
          established: "2005",
          flag: LiberiaFlag,
          external: true,
        },
        {
          name: "Somaliland Campus",
          href: "/somaliland",
          description: "Hargeisa, Maroodi Jeex Region",
          motto: "Halkan wax ka bilaabmaan, Afrika way beddelaan",
          established: "2008",
          flag: SomalilandFlag,
          external: true,
        },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      dropdown: [
        { name: "Undergraduate Programs", href: "/academics/undergraduate" },
        { name: "Graduate Programs", href: "/academics/graduate" },
        { name: "Professional Development", href: "/academics/professional" },
        { name: "Academic Calendar", href: "/academics/calendar" },
      ] as DropdownItem[],
    },
    {
      name: "Admissions",
      href: "/admissions",
      dropdown: [
        { name: "Apply Now", href: "/admissions/apply" },
        { name: "Tuition & Fees", href: "/admissions/tuition" },
        { name: "Financial Aid", href: "/admissions/financial-aid" },
        { name: "International Students", href: "/admissions/international" },
      ],
    },
    {
      name: "Research",
      href: "/research",
      dropdown: [
        { name: "Research Centers", href: "/research/centers" },
        { name: "Publications", href: "/research/publications" },
        { name: "Partnerships", href: "/research/partnerships" },
        { name: "Research Support", href: "/research/support" },
      ],
    },
    {
      name: "Student Life",
      href: "/student-life",
      dropdown: [
        { name: "Campus Activities", href: "/student-life/activities" },
        { name: "Student Organizations", href: "/student-life/organizations" },
        { name: "Housing", href: "/student-life/housing" },
        { name: "Dining", href: "/student-life/dining" },
      ],
    },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "Our History", href: "/about/history" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "Global Network", href: "/about/network" },
        { name: "Contact Us", href: "/about/contact" },
      ],
    },
  ]

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const mobileMenuVariants: Variants = {
    hidden: {
      x: "100%",
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
    visible: {
      x: 0,
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <>
      {/* Enhanced Top bar with Global Network messaging */}
      <div
        className={cn(
          "hidden w-full bg-gradient-to-r from-purple-600 to-blue-600 py-2 transition-all duration-500 lg:block",
          isScrolled ? "lg:hidden" : "",
        )}
        suppressHydrationWarning
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-6 text-xs text-white">
            <a
              href="mailto:info@tuu.university"
              className="flex items-center hover:text-purple-100 transition-colors duration-300"
            >
              <Mail className="mr-1 h-3 w-3" />
              info@tuu.university
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-purple-100 transition-colors duration-300"
            >
              <Phone className="mr-1 h-3 w-3" />
              +1 234 567 890
            </a>
          </div>
          <div className="text-xs text-white font-bold flex items-center space-x-3">
            <span>What Begins Here Transforms Africa</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs">2 Campuses</span>
              <Link
                href="/liberia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Liberia Campus"
              >
                <LiberiaFlag className="h-4 w-6" />
              </Link>
              <Link
                href="/somaliland"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Somaliland Campus"
              >
                <SomalilandFlag className="h-4 w-6" />
              </Link>
            </div>
            <Globe className="h-3 w-3" />
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500",
          isScrolled ? "py-1 shadow-xl" : "py-3",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/tuu-logo/tuu-logo.png" alt="The Unity University Logo" width={120} height={120} className="h-16 w-16 object-contain drop-shadow-lg" />
              <div>
                <span className="text-base font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                  The Unity University
                </span>
                <div className="text-xs text-gray-500 font-medium">What begins here, Transforms Africa</div>
              </div>
            </Link>
          </div>

          {/* Enhanced Campus Indicator */}
          <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1 rounded-full border border-purple-200 shadow-sm">
            <Globe className="h-3 w-3 text-purple-600" />
            <span className="text-xs font-medium text-gray-700">2 Campuses</span>
            <Link
              href="/liberia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liberia Campus"
            >
              <LiberiaFlag className="h-4 w-6" />
            </Link>
            <Link
              href="/somaliland"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Somaliland Campus"
            >
              <SomalilandFlag className="h-4 w-6" />
            </Link>
          </div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                          "text-gray-700 hover:text-purple-700 hover:bg-purple-50",
                          activeDropdown === link.name ? "text-purple-700 bg-purple-50" : "",
                        )}
                      >
                        {link.name}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && mounted && (
                          <motion.div
                            className={cn(
                              "absolute left-0 mt-1 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-100 backdrop-blur-md",
                              link.name === "Campuses" ? "w-96" : "w-56",
                            )}
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {link.dropdown.map((item, index) => (
                              <div key={item.name}>
                                {link.name === "Campuses" ? (
                                  // Enhanced Campus Cards in Dropdown
                                  <Link
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mx-2 mb-2 p-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="mt-1">
                                        {item.flag && <item.flag className="h-6 w-8" />}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                          {item.external && (
                                            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                                        <p className="text-xs text-purple-600 font-medium mb-1">
                                          Est. {item.established}
                                        </p>
                                        <p className="text-xs text-gray-500 italic leading-tight">{item.motto}</p>
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  // Regular Dropdown Items
                                  <Link
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-300 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:text-purple-700 hover:bg-purple-50"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center space-x-3 lg:flex">
            <Link href="/admissions/apply">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md transition-all duration-300 hover:shadow-lg px-3 py-1 font-semibold text-xs">
                Apply Now
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Enhanced Mobile Menu with Campus Cards */}
      <AnimatePresence>
        {mobileMenuOpen && mounted && (
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
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="p-4 h-full overflow-y-auto">
                <div className="mb-6 flex flex-col space-y-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2 text-purple-700 font-medium text-sm">
                    <Globe className="h-4 w-4" />
                    <span>What Begins Here Transforms Africa</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-xs">
                    <span>2 Campuses:</span>
                    <Link
                      href="/liberia"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Liberia Campus"
                    >
                      <LiberiaFlag className="h-4 w-6" />
                    </Link>
                    <Link
                      href="/somaliland"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Somaliland Campus"
                    >
                      <SomalilandFlag className="h-4 w-6" />
                    </Link>
                  </div>
                  <a
                    href="mailto:info@tuu.university"
                    className="flex items-center text-gray-600 hover:text-purple-700 transition-colors text-xs"
                  >
                    <Mail className="mr-2 h-3 w-3" />
                    info@tuu.university
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center text-gray-600 hover:text-purple-700 transition-colors text-xs"
                  >
                    <Phone className="mr-2 h-3 w-3" />
                    +1 234 567 890
                  </a>
                </div>

                <nav>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.name} className="border-b border-gray-50 pb-2">
                        {link.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(link.name)}
                              className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 py-2"
                            >
                              {link.name}
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                            {activeDropdown === link.name && (
                              <div className="mt-2 pl-2 space-y-2">
                                {link.dropdown.map((item) => (
                                  <div key={item.name}>
                                    {link.name === "Campuses" ? (
                                      // Enhanced Campus Cards for Mobile
                                      <Link
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors group"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="flex items-start space-x-3">
                                          <div className="mt-1">
                                            {item.flag && <item.flag className="h-5 w-6 mt-0.5" />}
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-1 mb-1">
                                              <h4 className="font-bold text-xs text-gray-900">{item.name}</h4>
                                              {item.external && (
                                                <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                              )}
                                            </div>
                                            <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                                            <p className="text-xs text-purple-600 font-medium">
                                              Est. {item.established}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    ) : (
                                      // Regular Mobile Menu Items
                                      <Link
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block py-1 text-gray-600 hover:text-purple-700 transition-colors text-xs pl-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className="block text-sm font-semibold text-gray-800 hover:text-purple-700 transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6">
                  <Link href="/admissions/apply">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md py-2 text-sm font-bold">
                      Apply Now
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
