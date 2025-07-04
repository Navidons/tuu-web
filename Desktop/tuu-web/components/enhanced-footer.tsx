"use client"

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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                  <svg viewBox="0 0 200 200" className="h-6 w-6 text-white">
                    <path
                      fill="currentColor"
                      d="M102.5,10c-50.7,0-91.7,41-91.7,91.7s41,91.7,91.7,91.7s91.7-41,91.7-91.7S153.2,10,102.5,10z M159.7,148.5
                        c-14.4,21.5-38.9,35.7-66.8,35.7c-44.3,0-80.2-35.9-80.2-80.2c0-44.3,35.9-80.2,80.2-80.2c27.9,0,52.4,14.2,66.8,35.7
                        c-9.3-4.5-19.8-7-30.8-7c-39.5,0-71.5,32-71.5,71.5s32,71.5,71.5,71.5C139.9,155.5,150.4,153,159.7,148.5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold">Unity University</span>
                  <div className="text-sm text-gray-400">Global Education Network</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Transforming lives through excellence in education across Africa and beyond.
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
                {["About Us", "Academics", "Admissions", "Research", "Student Life", "Alumni"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Our Campuses</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1">Liberia Campus</h4>
                  <p className="text-gray-400 text-sm">Monrovia, Montserrado County</p>
                  <p className="text-gray-400 text-sm">+231 123 456 789</p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Somaliland Campus</h4>
                  <p className="text-gray-400 text-sm">Hargeisa, Somaliland</p>
                  <p className="text-gray-400 text-sm">+252 123 456 789</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">info@tuu.university</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">+1 234 567 890</span>
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
              © 2024 Unity University. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}