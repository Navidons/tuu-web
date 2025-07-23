"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Star, Facebook, Instagram, Linkedin, Search, BookOpen, GraduationCap, Award, Info, Globe, Clock, Users, Network } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { usePathname } from "next/navigation"

const LiberiaFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
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
          key={i}
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

type DropdownItem = {
  name: string
  href: string
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

type NavLink = {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  dropdown?: DropdownItem[]
}

export default function LiberiaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const base = "/liberia"

  const navLinks: NavLink[] = useMemo(() => [
    { name: "Home", href: `${base}`, icon: Star },
    {
      name: "Academics",
      href: `${base}/academics`,
      icon: BookOpen,
      dropdown: [
        { name: "Undergraduate Programs", href: `${base}/academics/undergraduate`, icon: GraduationCap },
        { name: "Graduate Programs", href: `${base}/academics/graduate`, icon: Award },
      ],
    },
    {
      name: "Admissions",
      href: `${base}/admissions`,
      icon: Info,
      dropdown: [
        { name: "Apply Now", href: "/admissions/apply", external: true, icon: Globe },
      ],
    },
    {
      name: "About",
      href: `${base}/about`,
      icon: Users,
      dropdown: [
        { name: "Our History", href: `${base}/about/history`, icon: Clock },
        { name: "Leadership", href: `${base}/about/leadership`, icon: Users },
        { name: "Contact Us", href: `${base}/about/contact`, icon: Mail },
      ],
    },
  ], [base])

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
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  }

  const dropdownItemVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  }

  const mobileMenuVariants: Variants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <>
      {/* Compact Top bar */}
      {isClient && !isLoading && (
        <motion.div
          className={cn(
            "hidden w-full bg-gradient-to-r from-red-600 to-blue-600 py-2 transition-all duration-500 lg:block",
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
                href="mailto:liberia@tuu.university"
                className="flex items-center hover:text-red-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="mr-1 h-3 w-3" />
                liberia@tuu.university
              </motion.a>
              <motion.a
                href="tel:+231777123456"
                className="flex items-center hover:text-red-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="mr-1 h-3 w-3" />
                +231 777 123 456
              </motion.a>
              <span className="font-semibold">The Love of Liberty Brought Us Here</span>
            </motion.div>
            <motion.div
              className="text-xs text-white font-bold flex items-center space-x-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <a
                  href="https://www.facebook.com/people/The-Unity-University-Liberia/61574316394828/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-100 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-3 w-3" />
                </a>
                <a
                  href="https://www.instagram.com/explore/locations/104837471861628/the-unity-university/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-100 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3 w-3" />
                </a>
                <a
                  href="https://so.linkedin.com/company/the-unity-university"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-3 w-3" />
                </a>
              </div>
              <LiberiaFlag className="h-3 w-5" />
            </motion.div>
          </div>
        </motion.div>
      )}

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
            <Link href="/liberia" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/tuu-logo/tuu-logo.png"
                  alt="The Unity University Logo"
                  width={120}
                  height={120}
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
              </motion.div>
              <div>
                <span className="text-base font-bold bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent group-hover:from-red-800 group-hover:to-blue-800 transition-all duration-300">
                  The Unity University
                </span>
                <div className="text-xs text-gray-500 font-medium">Liberia Campus</div>
              </div>
            </Link>
          </motion.div>

          {/* Compact Campus Indicator */}
          <motion.div 
            className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-red-50 to-blue-50 px-3 py-1 rounded-full border border-red-200 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <MapPin className="h-3 w-3 text-red-600" />
            <span className="text-xs font-medium text-gray-700">Monrovia</span>
            <Star className="h-3 w-3 text-blue-600 fill-blue-600" />
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
                >
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => toggleDropdown(link.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                          "text-gray-700 hover:text-red-700 hover:bg-red-50",
                          activeDropdown === link.name ? "text-red-700 bg-red-50" : "",
                        )}
                      >
                        {link.icon && <link.icon className="mr-1 h-3 w-3" />}
                        {link.name}
                        <ChevronDown className={cn(
                          "ml-1 h-3 w-3 transition-transform duration-200",
                          activeDropdown === link.name ? "rotate-180" : ""
                        )} />
                      </div>
                      {isClient && (
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              ref={dropdownRef}
                              className="absolute left-0 mt-1 w-72 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-100 backdrop-blur-md"
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              suppressHydrationWarning
                            >
                              {link.dropdown.map((item) => (
                                <motion.div key={item.name} variants={dropdownItemVariants}>
                                  <Link
                                    href={item.href}
                                    {...('external' in item && item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50 hover:text-red-700 transition-all duration-300 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      {item.icon && <item.icon className="h-3 w-3" />}
                                      <span>{item.name}</span>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:text-red-700 hover:bg-red-50",
                        pathname.startsWith(link.href) ? "text-red-700 bg-red-50" : ""
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
              className="p-2 hover:bg-red-50"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-md transition-all duration-300 hover:shadow-lg px-3 py-1 font-semibold text-xs">
                Apply Now
              </Button>
            </Link>
          </motion.div>

          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
          </motion.button>
        </div>
      </header>

      {/* Compact Mobile Menu */}
      {isClient && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              suppressHydrationWarning
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-4 h-full overflow-y-auto">
                  <div className="mb-6 flex flex-col space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-2 text-red-700 font-medium text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Monrovia, Liberia</span>
                      <LiberiaFlag className="h-3 w-5" />
                    </div>
                    <a
                      href="mailto:liberia@tuu.university"
                      className="flex items-center text-gray-600 hover:text-red-700 transition-colors text-xs"
                    >
                      <Mail className="mr-2 h-3 w-3" />
                      liberia@tuu.university
                    </a>
                    <a
                      href="tel:+231777123456"
                      className="flex items-center text-gray-600 hover:text-red-700 transition-colors text-xs"
                    >
                      <Phone className="mr-2 h-3 w-3" />
                      +231 777 123 456
                    </a>
                  </div>

                  <nav>
                    <ul className="space-y-2">
                      {navLinks.map((link) => (
                        <li key={link.name} className="border-b border-gray-50 pb-2">
                          {link.dropdown ? (
                            <div>
                              <div
                                className={cn(
                                  "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                                  "text-gray-700 hover:text-red-700 hover:bg-red-50",
                                  activeDropdown === link.name ? "text-red-700 bg-red-50" : "",
                                )}
                                onClick={() => toggleDropdown(link.name)}
                              >
                                <div className="flex items-center space-x-2">
                                  {link.icon && <link.icon className="h-4 w-4" />}
                                  <span>{link.name}</span>
                                </div>
                                <ChevronDown 
                                  className={cn(
                                    "ml-1 h-3 w-3 transition-transform duration-200",
                                    activeDropdown === link.name ? "rotate-180" : ""
                                  )}
                                />
                              </div>
                              {activeDropdown === link.name && (
                                <div className="mt-2 pl-4 space-y-2">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      {...('external' in item && item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                      className="block py-1 text-gray-600 hover:text-red-700 transition-colors text-xs"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        {item.icon && <item.icon className="h-3 w-3" />}
                                        <span>{item.name}</span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={link.href}
                              className={cn(
                                "block text-sm font-semibold text-gray-800 hover:text-red-700 transition-colors py-2",
                                pathname.startsWith(link.href) ? "text-red-700" : ""
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
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 shadow-md py-2 text-sm font-bold">
                        Apply Now - 2024 Admission
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
