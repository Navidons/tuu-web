import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import GalleryHero from "@/components/gallery/gallery-hero"
import GalleryFilters from "@/components/gallery/gallery-filters"
import GalleryGrid from "@/components/gallery/gallery-grid"
import VideoGallery from "@/components/gallery/video-gallery"
import GalleryStats from "@/components/gallery/gallery-stats"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Photo & Video Gallery - Uganda Tours | Samba Tours & Travel",
  description:
    "Explore stunning photos and videos from our Uganda tours. See gorilla trekking, wildlife safaris, cultural experiences, and breathtaking landscapes captured by our travelers.",
  keywords:
    "Uganda photos, safari gallery, gorilla trekking images, wildlife photography, Uganda landscapes, travel videos",
  openGraph: {
    title: "Photo & Video Gallery - Uganda Tours | Samba Tours & Travel",
    description: "Explore stunning photos and videos from our Uganda tours and adventures.",
    images: ["/images/gallery-hero.jpg"],
  },
}

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50">
        <GalleryHero />

        <GalleryStats />

        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-secondary">Explore Our Adventures</h2>
              <p className="text-xl text-earth-600 max-w-3xl mx-auto">
                Every image tells a story of incredible encounters, breathtaking landscapes, and unforgettable moments.
                Browse through our collection of photos and videos captured during real tours with our travelers.
              </p>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
              <GalleryFilters />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <GalleryGrid />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<LoadingSpinner />}>
          <VideoGallery />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
