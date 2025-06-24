"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Calendar, Heart, Settings, CreditCard, MapPin, Bell, Shield, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/account", icon: User },
  { name: "My Bookings", href: "/bookings", icon: Calendar },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Payment Methods", href: "/account/payments", icon: CreditCard },
  { name: "Travel Preferences", href: "/account/preferences", icon: MapPin },
  { name: "Notifications", href: "/account/notifications", icon: Bell },
  { name: "Security", href: "/account/security", icon: Shield },
  { name: "Settings", href: "/account/settings", icon: Settings },
]

export default function AccountSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === "/account"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden mb-4 px-4">
        <Button variant="outline" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-full justify-between">
          Account Menu
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar Content - Mobile overlay, Desktop static */}
      <div
        className={`
        lg:static lg:w-full lg:h-full lg:bg-transparent
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-earth-900">John Doe</h3>
              <p className="text-sm text-earth-600">john.doe@email.com</p>
              <Badge variant="secondary" className="mt-1">
                Premium Member
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-forest-50 text-forest-700 border-l-4 border-forest-600"
                        : "text-earth-600 hover:bg-gray-50 hover:text-earth-900"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
