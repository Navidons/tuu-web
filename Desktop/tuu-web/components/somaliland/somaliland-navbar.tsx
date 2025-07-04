"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"

// Enhanced waving Somaliland flag component (matches latest design)
const SomalilandFlag = ({ className = "h-4 w-6" }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "relative overflow-hidden rounded-sm border border-white/20 animate-flag-wave drop-shadow-sm",
      )}
    >
      <div className="somaliland-flag-gradient w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-[6px] h-[6px] text-black fill-current">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

export default function SomalilandNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const base = "/somaliland"

  const navLinks = [
    { name: "Home", nameSo: "Guriga", href: `${base}` },
    {
      name: "Academics",
      nameSo: "Waxbarashada",
      href: `${base}/academics`,
      dropdown: [
        { name: "Undergraduate Programs", nameSo: "Barnaamijyada Koowaad", href: `${base}/academics/undergraduate` },
        { name: "Graduate Programs", nameSo: "Barnaamijyada Sare", href: `${base}/academics/graduate` },
        { name: "Professional Development", nameSo: "Tababarka Xirfadeed", href: `${base}/academics/professional` },
        { name: "Academic Calendar", nameSo: "Jadwalka Waxbarasho", href: `${base}/academics/calendar` },
      ],
    },
    {
      name: "Admissions",
      nameSo: "Gelitaanka",
      href: `${base}/admissions`,
      dropdown: [
        { name: "Apply Now", nameSo: "Hadda Codso", href: `${base}/admissions/apply` },
        { name: "Tuition & Fees", nameSo: "Kharashka Waxbarasho", href: `${base}/admissions/tuition` },
        { name: "Financial Aid", nameSo: "Caawimada Maaliyadeed", href: `${base}/admissions/financial-aid` },
        { name: "International Students", nameSo: "Ardayda Dibadda", href: `${base}/admissions/international` },
      ],
    },
    {
      name: "Research",
      nameSo: "Cilmi-baadhista",
      href: `${base}/research`,
      dropdown: [
        { name: "Research Centers", nameSo: "Xarumaha Cilmi-baadhista", href: `${base}/research/centers` },
        { name: "Publications", nameSo: "Daabacaadaha", href: `${base}/research/publications` },
        { name: "Partnerships", nameSo: "Iskaashiga", href: `${base}/research/partnerships` },
        { name: "Research Support", nameSo: "Taageerada Cilmi-baadhista", href: `${base}/research/support` },
      ],
    },
    {
      name: "About",
      nameSo: "Naga",
      href: `${base}/about`,
      dropdown: [
        { name: "Our History", nameSo: "Taariikheenna", href: `${base}/about/history` },
        { name: "Leadership", nameSo: "Hogaamiyayaasha", href: `${base}/about/leadership` },
        { name: "Campus Map", nameSo: "Khariidadda Campus", href: `${base}/about/campus-map` },
        { name: "Contact Us", nameSo: "Nala Soo Xiriir", href: `${base}/about/contact` },
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
            "hidden w-full bg-gradient-to-r from-emerald-600 to-red-600 py-2 transition-all duration-500 lg:block",
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
                href="mailto:somaliland@tuu.university"
                className="flex items-center hover:text-emerald-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="mr-1 h-3 w-3" />
                somaliland@tuu.university
              </motion.a>
              <motion.a
                href="tel:+25263421013"
                className="flex items-center hover:text-emerald-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="mr-1 h-3 w-3" />
                +252 63 4210013
              </motion.a>
              <span className="font-semibold">What begins here, Transforms Africa</span>
            </motion.div>
            <motion.div
              className="text-xs text-white font-bold flex items-center space-x-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <SomalilandFlag className="h-3 w-5" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {!isClient && (
        <div className="hidden w-full bg-gradient-to-r from-emerald-600 to-red-600 py-2 lg:block">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex items-center space-x-6 text-xs text-white">
              <a href="mailto:somaliland@tuu.university" className="flex items-center">
                <Mail className="mr-1 h-3 w-3" />
                somaliland@tuu.university
              </a>
              <a href="tel:+25263421013" className="flex items-center">
                <Phone className="mr-1 h-3 w-3" />
                +252 63 4210013
              </a>
            </div>
            <div className="text-xs text-white font-bold flex items-center space-x-2">
              <SomalilandFlag className="h-3 w-5" />
            </div>
          </div>
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500",
          isScrolled ? "py-1 shadow-xl" : "py-3",
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/tuu-logo/tuu-logo.png"
                alt="The Unity University Logo"
                width={120}
                height={120}
                className="h-16 w-16 object-contain drop-shadow-lg"
              />
              <div>
                <span className="text-base font-bold bg-gradient-to-r from-emerald-700 to-red-700 bg-clip-text text-transparent">
                  The Unity University
                </span>
                <div className="text-xs text-gray-500 font-medium">Somaliland Campus</div>
              </div>
            </Link>
          </div>

          {/* Compact Campus Indicator */}
          <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-red-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
            <MapPin className="h-3 w-3 text-emerald-600" />
            <span className="text-xs font-medium text-gray-700">Hargeisa</span>
            <SomalilandFlag className="h-3 w-5" />
          </div>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => toggleDropdown(link.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                          "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50",
                          activeDropdown === link.name ? "text-emerald-700 bg-emerald-50" : "",
                        )}
                      >
                        <div className="text-center">
                          <div>{link.name}</div>
                          <div className="text-xs text-emerald-600">{link.nameSo}</div>
                        </div>
                        <ChevronDown className="ml-1 h-3 w-3" />
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
                              {link.dropdown.map((item, itemIndex) => (
                                <motion.div key={item.name} variants={dropdownItemVariants}>
                                  <Link
                                    href={item.href}
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-red-50 hover:text-emerald-700 transition-all duration-300 rounded-lg mx-2"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-emerald-600">{item.nameSo}</div>
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
                      className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      <div className="text-center">
                        <div>{link.name}</div>
                        <div className="text-xs text-emerald-600">{link.nameSo}</div>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center space-x-3 lg:flex">
            <Link href="somaliland/admissions/apply">
              <Button className="bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700 shadow-md transition-all duration-300 hover:shadow-lg px-3 py-1 font-semibold text-xs">
                Hadda Codso
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
                    <div className="flex items-center space-x-2 text-emerald-700 font-medium text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Hargeisa, Somaliland</span>
                      <SomalilandFlag className="h-3 w-5" />
                    </div>
                    <a
                      href="mailto:somaliland@tuu.university"
                      className="flex items-center text-gray-600 hover:text-emerald-700 transition-colors text-xs"
                    >
                      <Mail className="mr-2 h-3 w-3" />
                      somaliland@tuu.university
                    </a>
                    <a
                      href="tel:+25263421013"
                      className="flex items-center text-gray-600 hover:text-emerald-700 transition-colors text-xs"
                    >
                      <Phone className="mr-2 h-3 w-3" />
                      +252 63 4210013
                    </a>
                  </div>

                  <nav>
                    <ul className="space-y-2">
                      {navLinks.map((link, index) => (
                        <li key={link.name} className="border-b border-gray-50 pb-2">
                          {link.dropdown ? (
                            <div
                              onMouseEnter={() => toggleDropdown(link.name)}
                              onMouseLeave={() => setActiveDropdown(null)}
                            >
                              <div
                                className={cn(
                                  "flex items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300",
                                  "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50",
                                  activeDropdown === link.name ? "text-emerald-700 bg-emerald-50" : "",
                                )}
                              >
                                <div className="text-center">
                                  <div>{link.name}</div>
                                  <div className="text-xs text-emerald-600">{link.nameSo}</div>
                                </div>
                                <ChevronDown className="ml-1 h-3 w-3" />
                              </div>
                              {activeDropdown === link.name && (
                                <div className="mt-2 pl-4 space-y-2">
                                  {link.dropdown.map((item, itemIndex) => (
                                    <div key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="block py-1 text-gray-600 hover:text-emerald-700 transition-colors text-xs"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-emerald-600">{item.nameSo}</div>
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={link.href}
                              className="block text-sm font-semibold text-gray-800 hover:text-emerald-700 transition-colors py-2"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>{link.name}</span>
                              <div className="text-xs text-emerald-600 font-normal">{link.nameSo}</div>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-6">
                    <Link href="somaliland/admissions/apply">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-red-600 text-white hover:from-emerald-700 hover:to-red-700 shadow-md py-2 text-sm font-bold">
                        Hadda Codso - Apply Now
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
