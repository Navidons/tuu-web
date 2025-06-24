"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, Search, User, ShoppingBag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Tours",
    href: "/tours",
    submenu: [
      { name: "All Tours", href: "/tours", description: "Browse all available tours" },
      {
        name: "Gorilla Trekking",
        href: "/tours?category=gorilla-trekking",
        description: "Mountain gorilla experiences",
      },
      { name: "Wildlife Safari", href: "/tours?category=wildlife-safari", description: "Safari adventures" },
      { name: "Cultural Tours", href: "/tours?category=cultural", description: "Cultural experiences" },
      { name: "Adventure Tours", href: "/tours?category=adventure", description: "Thrilling adventures" },
      { name: "Bird Watching", href: "/tours?category=birding", description: "Birding expeditions" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  {
    name: "Blog",
    href: "/blog",
    submenu: [
      { name: "All Articles", href: "/blog", description: "Latest travel articles" },
      { name: "Travel Planning", href: "/blog/category/travel-planning", description: "Planning your trip" },
      { name: "Wildlife", href: "/blog/category/wildlife", description: "Wildlife stories" },
      { name: "Culture", href: "/blog/category/culture", description: "Cultural insights" },
      { name: "Photography", href: "/blog/category/photography", description: "Photography tips" },
      { name: "Conservation", href: "/blog/category/conservation", description: "Conservation efforts" },
    ],
  },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileAccountOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-lg",
      )}
    >
      {/* Top bar */}
      <div className="bg-forest-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+256 700 123 456</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@sambatours.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <span>Follow your dreams, we'll handle the journey</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ST</span>
              </div>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-earth-900">Samba Tours</h1>
                <p className="text-sm text-earth-600">& Travel</p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.submenu ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "font-medium transition-colors hover:text-forest-600 bg-transparent",
                          isActive(item.href) ? "text-forest-600" : "text-earth-700",
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "font-medium transition-colors hover:text-forest-600 px-4 py-2",
                          isActive(item.href) ? "text-forest-600" : "text-earth-700",
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search tours, destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* User Account - Direct Link */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart/Bookings */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                <span className="ml-1 text-sm">2</span>
              </Link>
            </Button>

            {/* CTA Buttons */}
            <Button variant="outline" asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
            <Button asChild className="bg-forest-600 hover:bg-forest-700 text-white">
              <Link href="/tours">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search tours, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg max-h-screen overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {/* Main Navigation */}
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <Link
                      href={item.href}
                      className={cn(
                        "block font-medium py-2 transition-colors",
                        isActive(item.href) ? "text-forest-600 font-semibold" : "text-earth-700 hover:text-forest-600",
                      )}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                    <div className="ml-4 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-sm text-earth-600 hover:text-forest-600 py-1"
                          onClick={closeMobileMenu}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block font-medium py-2 transition-colors",
                      isActive(item.href) ? "text-forest-600 font-semibold" : "text-earth-700 hover:text-forest-600",
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Account Section */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
                className="flex items-center justify-between w-full py-2 text-left font-medium text-earth-700 hover:text-forest-600"
              >
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileAccountOpen && "rotate-180")} />
              </button>

              {mobileAccountOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link
                    href="/account"
                    className="flex items-center py-2 text-sm text-earth-600 hover:text-forest-600"
                    onClick={closeMobileMenu}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Account
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center py-2 text-sm text-earth-600 hover:text-forest-600"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    My Bookings
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center py-2 text-sm text-earth-600 hover:text-forest-600"
                    onClick={closeMobileMenu}
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center py-2 text-sm text-earth-600 hover:text-forest-600"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Cart (2)
                  </Link>
                </div>
              )}
            </div>

            {/* Authentication Section */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Link
                href="/signin"
                className="block py-2 text-earth-700 hover:text-forest-600"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block py-2 text-earth-700 hover:text-forest-600"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact" onClick={closeMobileMenu}>
                  Get Quote
                </Link>
              </Button>
              <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white" asChild>
                <Link href="/tours" onClick={closeMobileMenu}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
