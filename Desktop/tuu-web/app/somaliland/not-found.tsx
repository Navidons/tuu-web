import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

export default function NotFound() {
  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-red-50 p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-6">
              <div className="text-8xl font-bold text-green-600 mb-4">404</div>
              <div className="flex justify-center mb-4">
                <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-red-600 rounded-full"></div>
              </div>
            </div>
            <CardTitle className="text-3xl text-gray-900 mb-2">Page Not Found</CardTitle>
            <p className="text-xl text-gray-600">Bogga lama helin</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist or has been moved.</p>
              <p className="text-gray-500 text-sm">Bogga aad raadinayso ma jiro ama waa la wareejiyay.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/academics">
                <Button variant="outline" className="w-full bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Academics
                </Button>
              </Link>
              <Link href="/about/contact">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Popular Pages</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link href="/admissions/apply" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                  Apply Now
                </Link>
                <Link href="/research" className="text-green-600 hover:underline">
                  Research
                </Link>
                <Link href="/academics/undergraduate" className="text-green-600 hover:underline">
                  Programs
                </Link>
                <Link href="/about/campus-map" className="text-green-600 hover:underline">
                  Campus Map
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SomalilandFooter />
    </>
  )
}
