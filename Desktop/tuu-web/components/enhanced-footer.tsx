"use client"

import Link from "next/link"
import { Mail, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EnhancedFooter() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src="/tuu-logo/tuu-logo.png" alt="Unity University Logo" className="h-10 w-10 object-contain mr-2" />
                <div>
                  <span className="text-xl font-bold">Unity University</span>
                  <div className="text-sm text-gray-400">What begins here, transforms Africa</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Africa's pioneer accredited university. Growing every day since 2021.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Academics", href: "/academics" },
                  { name: "Admissions", href: "/admissions" },
                  { name: "Research", href: "/research" },
                  { name: "Student Life", href: "/student-life" },
                  { name: "Alumni", href: "/about/network" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Our Campuses</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1">Somaliland Campus</h4>
                  <p className="text-gray-400 text-sm">Hargeisa, Somaliland</p>
                  <p className="text-gray-400 text-sm">Est. 2021 • +252 634 210013</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Liberia Campus</h4>
                  <p className="text-gray-400 text-sm">Monrovia, Montserrado County</p>
                  <p className="text-gray-400 text-sm">Est. mid-2024 • Rapid Expansion</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">theunityuniversity@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">+252 634 210013</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">www.tuu.university</span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Subscribe to our Newsletter</h4>
                  <p className="text-sm text-gray-400 mb-4">Get the latest news, events and updates straight to your inbox.</p>
                  <form className="space-y-3 sm:space-y-0 sm:flex sm:space-x-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                    />
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2021-2025 Unity University. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}