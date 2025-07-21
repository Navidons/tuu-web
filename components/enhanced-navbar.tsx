"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, Star, Globe, ExternalLink, Facebook, Twitter, Instagram, Linkedin, Search, User, Calendar, BookOpen, GraduationCap, Award, Info, Clock, Network, Users } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { usePathname } from "next/navigation"

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
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Somaliland.svg/1200px-Flag_of_Somaliland.svg.png"
      alt="Somaliland Flag"
      className={cn(className, "object-cover rounded-sm shadow-sm border border-white/20")}
    />
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
  icon?: React.ComponentType<{ className?: string }>
}

type CampusItem = {
  name: string
  href: string
  description: string
  motto: string
  established: string
  flag: ({ className }: { className?: string }) => React.ReactElement
  external: boolean
  icon?: React.ComponentType<{ className?: string }>
}

type NavLink = {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  dropdown?: (DropdownItem | CampusItem)[]
}

export default function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

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

  // Prevent background scrolling when the mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const navLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Star },
    {
      name: "Campuses",
      href: "/campuses",
      dropdown: [
        {
          name: "Somaliland Campus",
          href: "/somaliland",
          description: "Hargeisa, Somaliland",
          motto: "What begins here, transforms Africa",
          established: "2020",
          flag: SomalilandFlag,
          external: true,
        },
        {
          name: "Liberia Campus",
          href: "/liberia",
          description: "Monrovia, Montserrado County",
          motto: "The Love of Liberty Brought Us Here",
          established: "mid-2024",
          flag: LiberiaFlag,
          external: true,
        },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      dropdown: [
        { name: "All Programs", href: "/academics", icon: BookOpen },
        { name: "Undergraduate Programs", href: "/academics/undergraduate", icon: GraduationCap },
        { name: "Graduate Programs", href: "/academics/graduate", icon: Award },
        { name: "Academic Calendar", href: "/academics/calendar", icon: Calendar },
      ] as DropdownItem[],
    },
    {
      name: "Admissions",
      href: "/admissions",
      dropdown: [
        { name: "Overview", href: "/admissions", icon: Info },
        { name: "Apply Now", href: "/admissions/apply", icon: ExternalLink, external: true },
        { name: "International Students", href: "/admissions/international", icon: Globe },
      ],
    },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "Overview", href: "/about", icon: Info },
        { name: "Our History", href: "/about/history", icon: Clock },
        { name: "Leadership", href: "/about/leadership", icon: Users },
        { name: "Global Network", href: "/about/network", icon: Network },
        { name: "Contact Us", href: "/about/contact", icon: Mail },
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
        staggerChildren: 0.05,
      },
    },
  }

  const dropdownItemVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
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
      <motion.div
        className={cn(
          "hidden w-full bg-gradient-to-r from-purple-600 to-blue-600 py-2 transition-all duration-500 lg:block",
          isScrolled ? "lg:hidden" : "",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        suppressHydrationWarning
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div 
            className="flex items-center space-x-6 text-xs text-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.a
              href="mailto:theunityuniversity@gmail.com"
              className="flex items-center hover:text-purple-100 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="mr-1 h-3 w-3" />
              theunityuniversity@gmail.com
            </motion.a>
            <motion.a
              href="tel:+252634210013"
              className="flex items-center hover:text-purple-100 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="mr-1 h-3 w-3" />
              +252 634 210013
            </motion.a>
          </motion.div>
          <motion.div 
            className="text-xs text-white font-bold flex items-center space-x-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
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
            <div className="flex items-center space-x-2">
              <a
                href="https://www.facebook.com/theunityuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-3 w-3" />
              </a>
              <a
                href="https://www.instagram.com/explore/locations/104837471861628/the-unity-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-3 w-3" />
              </a>
              <a
                href="https://so.linkedin.com/company/the-unity-university"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3 w-3" />
              </a>
            </div>
            <Globe className="h-3 w-3" />
          </motion.div>
        </div>
      </motion.div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500",
          isScrolled ? "py-1 shadow-xl" : "py-3",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image src="/tuu-logo/tuu-logo.png" alt="The Unity University Logo" width={120} height={120} className="h-12 w-12 lg:h-16 lg:w-16 object-contain drop-shadow-lg" />
              </motion.div>
              <div>
                <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent group-hover:from-purple-800 group-hover:to-blue-800 transition-all duration-300">
                  The Unity University
                </span>
                <div className="text-xs text-gray-500 font-medium">What begins here, Transforms Africa</div>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Campus Indicator */}
          <motion.div 
            className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1 rounded-full border border-purple-200 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
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
          </motion.div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
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
                        {link.icon && <link.icon className="mr-1 h-3 w-3" />}
                        {link.name}
                        <ChevronDown className={cn(
                          "ml-1 h-3 w-3 transition-transform duration-200",
                          activeDropdown === link.name ? "rotate-180" : ""
                        )} />
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
                            {link.dropdown.map((item, itemIndex) => (
                              <motion.div key={item.name} variants={dropdownItemVariants}>
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
                                        {'flag' in item && item.flag && <item.flag className="h-6 w-8" />}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                          {item.external && (
                                            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                          )}
                                        </div>
                                        {'description' in item && <p className="text-xs text-gray-600 mb-1">{item.description}</p>}
                                        {'established' in item && <p className="text-xs text-purple-600 font-medium mb-1">
                                          Est. {item.established}
                                        </p>}
                                        {'motto' in item && <p className="text-xs text-gray-500 italic leading-tight">{item.motto}</p>}
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  // Regular Dropdown Items
                                  <Link
                                    href={item.href}
                                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-300 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      {'icon' in item && item.icon && <item.icon className="h-3 w-3" />}
                                      <span>{item.name}</span>
                                    </div>
                                  </Link>
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                        "text-gray-700 hover:text-purple-700 hover:bg-purple-50",
                        pathname.startsWith(link.href) ? "text-purple-700 bg-purple-50" : ""
                      )}
                    >
                      <div className="flex items-center space-x-1">
                        {link.icon && <link.icon className="h-3 w-3" />}
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div 
            className="hidden items-center space-x-3 lg:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-purple-50"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md transition-all duration-300 hover:shadow-lg px-3 py-1 font-semibold text-xs">
                Apply Now
              </Button>
            </Link>
          </motion.div>

          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
          </motion.button>
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
              className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-xl"
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
                    href="mailto:theunityuniversity@gmail.com"
                    className="flex items-center text-gray-600 hover:text-purple-700 transition-colors text-xs"
                  >
                    <Mail className="mr-2 h-3 w-3" />
                    theunityuniversity@gmail.com
                  </a>
                  <a
                    href="tel:+252634210013"
                    className="flex items-center text-gray-600 hover:text-purple-700 transition-colors text-xs"
                  >
                    <Phone className="mr-2 h-3 w-3" />
                    +252 634 210013
                  </a>
                </div>

                <nav>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.name} className="border-b border-gray-50 pb-3">
                        {link.dropdown ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(link.name)}
                              className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 py-2"
                            >
                              <div className="flex items-center space-x-2">
                                {link.icon && <link.icon className="h-4 w-4" />}
                                <span>{link.name}</span>
                              </div>
                              <ChevronDown className={cn(
                                "h-4 w-4 text-gray-400 transition-transform duration-200",
                                activeDropdown === link.name ? "rotate-180" : ""
                              )} />
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
                                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                        className={cn(
                                          "block py-1 text-gray-600 hover:text-purple-700 transition-colors text-xs pl-2",
                                          pathname.startsWith(item.href) ? "text-purple-700 font-semibold" : ""
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="flex items-center space-x-2">
                                          {'icon' in item && item.icon && <item.icon className="h-3 w-3" />}
                                          <span>{item.name}</span>
                                        </div>
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
                            className={cn(
                              "block text-sm font-semibold text-gray-800 hover:text-purple-700 transition-colors py-2",
                              pathname.startsWith(link.href) ? "text-purple-700" : ""
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              {link.icon && <link.icon className="h-4 w-4" />}
                              <span>{link.name}</span>
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6">
                  <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
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
