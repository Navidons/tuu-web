import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import TourFilters from "@/components/tours/tour-filters"
import TourGrid from "@/components/tours/tour-grid"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Uganda Tours & Safari Packages - Samba Tours",
  description:
    "Explore our comprehensive collection of Uganda tours including gorilla trekking, wildlife safaris, cultural experiences, and adventure tours.",
}

export default function ToursPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50">
        <div className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h1 className="heading-primary mb-6">Discover Uganda Tours</h1>
              <p className="text-xl text-earth-600 max-w-3xl mx-auto">
                From thrilling gorilla encounters to breathtaking safaris, explore our carefully crafted tour packages
                that showcase the best of Uganda's natural wonders and cultural heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <TourFilters />
              </div>
              <div className="lg:col-span-3">
                <Suspense fallback={<LoadingSpinner />}>
                  <TourGrid />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
