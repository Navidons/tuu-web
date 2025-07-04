import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SomalilandFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center">
              <img src="/tuu-logo/tuu-logo.png" alt="Unity University Logo" className="h-12 w-12 object-contain mr-3" />
              <div>
                <span className="text-xl font-bold">Unity University</span>
                <div className="text-xs text-gray-400">Somaliland Campus</div>
              </div>
            </div>
            <p className="mb-6 text-gray-400">
              What begins here, transforms Africa. Leading through innovation and academic excellence in
              Somaliland since 2021.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-green-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-green-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-green-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-green-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-green-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Waxbarashada (Academics)</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/somaliland/academics/undergraduate" className="text-gray-400 transition-colors hover:text-white">
                  Barnaamijyada Koowaad
                </Link>
              </li>
              <li>
                <Link href="/somaliland/academics/graduate" className="text-gray-400 transition-colors hover:text-white">
                  Barnaamijyada Sare
                </Link>
              </li>
              <li>
                <Link href="/somaliland/academics/professional" className="text-gray-400 transition-colors hover:text-white">
                  Tababarka Xirfadeed
                </Link>
              </li>
              <li>
                <Link href="/somaliland/academics/calendar" className="text-gray-400 transition-colors hover:text-white">
                  Jadwalka Waxbarasho
                </Link>
              </li>
              <li>
                <Link href="/somaliland/research" className="text-gray-400 transition-colors hover:text-white">
                  Cilmi-baadhista
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Gelitaanka (Admissions)</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/somaliland/admissions" className="text-gray-400 transition-colors hover:text-white">
                  Gelitaanka Guud
                </Link>
              </li>
              <li>
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                  Hadda Codso
                </Link>
              </li>
              <li>
                <Link href="/somaliland/admissions/tuition" className="text-gray-400 transition-colors hover:text-white">
                  Kharashka Waxbarasho
                </Link>
              </li>
              <li>
                <Link href="/somaliland/admissions/financial-aid" className="text-gray-400 transition-colors hover:text-white">
                  Caawimada Maaliyadeed
                </Link>
              </li>
              <li>
                <Link href="/somaliland/admissions/international" className="text-gray-400 transition-colors hover:text-white">
                  Ardayda Dibadda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Xiriirka & Macluumaadka</h3>
            <ul className="mb-6 space-y-4">
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <span className="text-gray-400">Jigjiga Yar Street near Masjid Jabir</span>
                  <div className="text-sm text-gray-500">Hargeisa, Somaliland</div>
                </div>
              </li>
              <li className="flex">
                <Phone className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-gray-400">+252 634 210013</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-gray-400">theunityuniversity@gmail.com</span>
              </li>
            </ul>
            <div>
              <h4 className="mb-2 font-semibold">Warbaahinta (Newsletter)</h4>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Emailkaaga geli"
                  className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                />
                <Button className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white hover:from-green-700 hover:to-red-700">
                  Isdiiwaangeli
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2021-{new Date().getFullYear()} Unity University Somaliland Campus. Xuquuqda oo dhan way dhowran yihiin.
            </p>
            <div className="flex space-x-6">
              <Link href="/somaliland/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
                Siyaasadda Qarsoodi-waaga
              </Link>
              <Link href="/somaliland/terms" className="text-sm text-gray-400 transition-colors hover:text-white">
                Shuruudaha Adeegga
              </Link>
              <Link href="/somaliland/accessibility" className="text-sm text-gray-400 transition-colors hover:text-white">
                Helitaanka
              </Link>
              <Link href="/somaliland/about/contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                Nala Soo Xiriir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
