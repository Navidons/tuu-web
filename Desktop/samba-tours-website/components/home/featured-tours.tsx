import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star, MapPin } from "lucide-react"

const featuredTours = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    description:
      "Experience the thrill of meeting mountain gorillas in their natural habitat in Bwindi Impenetrable Forest.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "3 Days",
    groupSize: "8 People",
    rating: 4.9,
    price: 1200,
    location: "Bwindi Forest",
  },
  {
    id: 2,
    title: "Murchison Falls Safari",
    description: "Witness the power of the Nile at Murchison Falls and spot the Big Five on thrilling game drives.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "4 Days",
    groupSize: "12 People",
    rating: 4.8,
    price: 800,
    location: "Murchison Falls",
  },
  {
    id: 3,
    title: "Queen Elizabeth Wildlife Tour",
    description: "Explore diverse ecosystems and spot tree-climbing lions in Uganda's most popular national park.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "5 Days",
    groupSize: "10 People",
    rating: 4.7,
    price: 950,
    location: "Queen Elizabeth NP",
  },
]

export default function FeaturedTours() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="heading-secondary">Featured Tours</h2>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            Discover our most popular adventures that showcase the best of Uganda's natural wonders and wildlife.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{tour.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-earth-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{tour.location}</span>
                </div>

                <h3 className="font-playfair text-xl font-bold text-earth-900 mb-3">{tour.title}</h3>

                <p className="text-earth-700 mb-4 line-clamp-3">{tour.description}</p>

                <div className="flex items-center justify-between text-sm text-earth-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-forest-600">${tour.price}</span>
                    <span className="text-earth-600 text-sm">/person</span>
                  </div>
                  <Button className="btn-primary" asChild>
                    <Link href={`/tours/${tour.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
