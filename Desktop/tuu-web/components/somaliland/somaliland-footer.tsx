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
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-red-600">
                <svg viewBox="0 0 200 200" className="h-6 w-6 text-white">
                  <path
                    fill="currentColor"
                    d="M102.5,10c-50.7,0-91.7,41-91.7,91.7s41,91.7,91.7,91.7s91.7-41,91.7-91.7S153.2,10,102.5,10z M159.7,148.5
                    c-14.4,21.5-38.9,35.7-66.8,35.7c-44.3,0-80.2-35.9-80.2-80.2c0-44.3,35.9-80.2,80.2-80.2c27.9,0,52.4,14.2,66.8,35.7
                    c-9.3-4.5-19.8-7-30.8-7c-39.5,0-71.5,32-71.5,71.5s32,71.5,71.5,71.5C139.9,155.5,150.4,153,159.7,148.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M102.5,40.5c-33.9,0-61.3,27.4-61.3,61.3s27.4,61.3,61.3,61.3s61.3-27.4,61.3-61.3S136.4,40.5,102.5,40.5z
                    M125.6,125.6c-6.3,6.3-14.6,9.8-23.5,9.8c-18.3,0-33.2-14.9-33.2-33.2c0-18.3,14.9-33.2,33.2-33.2c8.9,0,17.2,3.5,23.5,9.8
                    c-3.8-1.9-8.2-2.9-12.8-2.9c-16.3,0-29.6,13.2-29.6,29.6s13.2,29.6,29.6,29.6C117.4,128.5,121.7,127.5,125.6,125.6z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold">Unity University</span>
                <div className="text-xs text-gray-400">Somaliland Campus</div>
              </div>
            </div>
            <p className="mb-6 text-gray-400">
              Halkan wax ka bilaabmaan, Afrika way beddelaan. Leading through innovation and academic excellence in
              Somaliland since 2008.
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
                <Link href="/somaliland/admissions/apply" className="text-gray-400 transition-colors hover:text-white">
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
                  <span className="text-gray-400">New Generation Campus</span>
                  <div className="text-sm text-gray-500">Hargeisa, Somaliland</div>
                </div>
              </li>
              <li className="flex">
                <Phone className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-gray-400">+252 63 4210013</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-gray-400">somaliland@tuu.university</span>
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
              &copy; {new Date().getFullYear()} Unity University Somaliland Campus. Xuquuqda oo dhan way dhowran yihiin.
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
