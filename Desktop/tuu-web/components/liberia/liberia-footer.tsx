import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Enhanced Liberian flag component for footer
const LiberianFlagFooter = ({ className = "h-6 w-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded-sm shadow-md border border-white/20`}>
      <div className="h-full w-full liberian-flag-gradient"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-600 flex items-center justify-center">
        <Star className="h-2 w-2 text-white fill-white" />
      </div>
    </div>
  )
}

export default function LiberiaFooter() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* University Info */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center">
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-blue-600 shadow-lg">
                <svg viewBox="0 0 200 200" className="h-7 w-7 text-white">
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
                <div className="text-xs text-gray-400 flex items-center space-x-2">
                  <span>Liberia Campus</span>
                  <LiberianFlagFooter className="h-4 w-6" />
                </div>
              </div>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              The Love of Liberty Brought Us Here. Leading through innovation and academic excellence in Liberia since
              2005. Building tomorrow's leaders in the heart of West Africa.
            </p>
            <div className="mb-6">
              <Badge className="bg-red-600/20 text-red-300 border border-red-600/30 mb-2">Premier Institution</Badge>
              <Badge className="bg-blue-600/20 text-blue-300 border border-blue-600/30 ml-2">
                18+ Years Excellence
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-red-400 hover:scale-110 transform duration-200"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Academics */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Academics
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/liberia/academics/undergraduate"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Undergraduate Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/academics/graduate"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Graduate Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/academics/professional"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Professional Development
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/academics/calendar"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/research"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Research Excellence
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Admissions
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/liberia/admissions"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  General Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/admissions/apply"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200 flex items-center"
                >
                  Apply Now
                  <Heart className="h-3 w-3 ml-1 text-red-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/admissions/tuition"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Tuition & Fees
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/admissions/financial-aid"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  Financial Aid
                </Link>
              </li>
              <li>
                <Link
                  href="/liberia/admissions/international"
                  className="text-gray-400 transition-colors hover:text-white hover:pl-2 duration-200"
                >
                  International Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-blue-600 rounded-full mr-3"></div>
              Contact & Connect
            </h3>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-300 font-medium">Main Campus</span>
                  <div className="text-sm text-gray-500">Monrovia, Montserrado County</div>
                  <div className="text-xs text-gray-600">Republic of Liberia, West Africa</div>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-red-400 flex-shrink-0" />
                <a href="tel:+23177123456" className="text-gray-400 hover:text-white transition-colors">
                  +231 77 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-red-400 flex-shrink-0" />
                <a href="mailto:liberia@tuu.university" className="text-gray-400 hover:text-white transition-colors">
                  liberia@tuu.university
                </a>
              </li>
            </ul>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h4 className="mb-3 font-bold text-white">Stay Connected</h4>
              <p className="text-sm text-gray-400 mb-4">Get updates on admissions, events, and university news.</p>
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:border-red-500"
                />
                <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 font-semibold">
                  Subscribe to Updates
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-2">
                &copy; {new Date().getFullYear()} Unity University Liberia Campus. All rights reserved.
              </p>
              <div className="text-xs text-gray-500 italic flex items-center justify-center md:justify-start">
                <LiberianFlagFooter className="h-4 w-6 mr-2" />
                "The Love of Liberty Brought Us Here"
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/liberia/privacy" className="text-gray-400 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/liberia/terms" className="text-gray-400 transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link href="/liberia/accessibility" className="text-gray-400 transition-colors hover:text-white">
                Accessibility
              </Link>
              <Link href="/liberia/about/contact" className="text-gray-400 transition-colors hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-500">
              Unity University Liberia is committed to providing equal educational opportunities and fostering
              diversity, inclusion, and academic excellence in higher education across West Africa.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
