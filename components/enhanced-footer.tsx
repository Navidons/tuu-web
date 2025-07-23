"use client"

import Link from "next/link"
import { Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EnhancedFooter() {
  return (
    <>
      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#f5f7fa] to-[#faf9f7] text-gray-800 border-t-4 border-emerald-600 font-serif pt-16 pb-8 shadow-[0_-4px_16px_0_rgba(0,0,0,0.04)]">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center md:items-start mb-6">
                <img src="/tuu-logo/tuu-logo.png" alt="The Unity University Crest" className="h-12 w-12 object-contain mb-2" />
                <span className="text-xl font-extrabold text-emerald-800 tracking-widest uppercase">The Unity University</span>
                <div className="text-sm text-gray-500 mt-1">What begins here, transforms Africa</div>
              </div>
              <p className="text-gray-600 mb-6">
                Africa's pioneer accredited university. Growing every day since 2020.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/theunityuniversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-emerald-600 rounded-md flex items-center justify-center hover:bg-emerald-50 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-emerald-700" />
                </a>
                <a
                  href="https://www.instagram.com/explore/locations/104837471861628/the-unity-university/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-red-600 rounded-md flex items-center justify-center hover:bg-red-50 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-red-700" />
                </a>
                <a
                  href="https://so.linkedin.com/company/the-unity-university"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-gray-400 rounded-md flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-700" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-extrabold mb-6 text-emerald-800 border-b-2 border-emerald-600 inline-block pb-1 tracking-widest uppercase">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Academics", href: "/academics" },
                  { name: "Admissions", href: "/admissions" },
                  { name: "Alumni", href: "/about/network" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-extrabold mb-6 text-emerald-800 border-b-2 border-emerald-600 inline-block pb-1 tracking-widest uppercase">Our Campuses</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-emerald-800 mb-1 uppercase tracking-wide flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Somaliland.svg/1200px-Flag_of_Somaliland.svg.png" alt="Somaliland Flag" className="h-4 w-6 object-cover rounded-sm shadow-sm border border-white/20" />
                    Somaliland Campus
                  </h4>
                  <p className="text-gray-700 text-sm">Hargeisa, Somaliland</p>
                  <p className="text-gray-500 text-sm">Est. 2020 • +252 634 210013</p>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-1 uppercase tracking-wide">Liberia Campus</h4>
                  <p className="text-gray-700 text-sm">Monrovia, Montserrado County</p>
                  <p className="text-gray-500 text-sm">Est. mid-2024 • Rapid Expansion</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-extrabold mb-6 text-emerald-800 border-b-2 border-emerald-600 inline-block pb-1 tracking-widest uppercase">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-emerald-700" />
                  <span className="text-gray-700">theunityuniversity@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-700" />
                  <span className="text-gray-700">+252 634 210013</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-emerald-700" />
                  <span className="text-gray-700">www.tuu.university</span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <div className="bg-gradient-to-br from-white to-[#f5f7fa] border-2 border-emerald-600 rounded-md p-4 shadow-sm">
                  <h4 className="font-semibold text-emerald-800 mb-2 uppercase tracking-wide">Subscribe to our Newsletter</h4>
                  <p className="text-sm text-gray-700 mb-4">Get the latest news, events and updates straight to your inbox.</p>
                  <form className="space-y-3 sm:space-y-0 sm:flex sm:space-x-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 bg-white border border-emerald-200 text-gray-700 placeholder-gray-400 focus:border-emerald-400"
                    />
                    <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 w-full sm:w-auto text-white font-serif">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-emerald-600 mt-12 pt-8 text-center relative">
            <p className="text-gray-600">
              © 2020-2025 The Unity University. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <a
              href="#top"
              className="absolute right-0 top-0 mt-2 mr-4 flex items-center text-emerald-700 hover:text-red-700 transition-colors font-bold text-xs uppercase tracking-widest"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4 mr-1" /> Back to Top
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}