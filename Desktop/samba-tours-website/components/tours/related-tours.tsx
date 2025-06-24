import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin } from "lucide-react"

interface Tour {
  category: string
  location: string
}

interface RelatedToursProps {
  currentTour: Tour
}

const relatedTours = [
  {
    id: 4,
    title: "Cultural Heritage Experience",
    description: "Immerse yourself in Uganda's rich cultural traditions with visits to local communities.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "6 Days",
    groupSize: "15 People",
    rating: 4.6,
    reviewCount: 73,
    price: 650,
    location: "Multiple Regions",
    category: "Cultural Tours",
  },
  {
    id: 5,
    title: "Mount Elgon Adventure",
    description: "Challenge yourself with a trek to the summit of Mount Elgon and explore its unique ecosystem.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "7 Days",
    groupSize: "8 People",
    rating: 4.5,
    reviewCount: 42,
    price: 1100,
    location: "Mount Elgon NP",
    category: "Adventure Tours",
  },
  {
    id: 6,
    title: "Birding Paradise Tour",
    description: "Discover Uganda's incredible bird diversity with expert guides in prime birding locations.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "8 Days",
    groupSize: "12 People",
    rating: 4.8,
    reviewCount: 34,
    price: 1350,
    location: "Multiple Parks",
    category: "Bird Watching",
  },
]

export default function RelatedTours({ currentTour }: RelatedToursProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="heading-secondary">You Might Also Like</h2>
          <p className="text-lg text-earth-600">Discover more amazing adventures in Uganda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedTours.map((tour) => (
            <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-forest-600 text-white">{tour.category}</Badge>
                </div>
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

                <h3 className="font-playfair text-xl font-bold text-earth-900 mb-3 group-hover:text-forest-600 transition-colors">
                  <Link href={`/tours/${tour.id}`}>{tour.title}</Link>
                </h3>

                <p className="text-earth-700 mb-4 line-clamp-2">{tour.description}</p>

                <div className="flex items-center justify-between text-sm text-earth-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Max {tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-forest-600">${tour.price}</span>
                    <span className="text-earth-600 text-sm">/person</span>
                  </div>
                  <Button className="btn-primary" asChild>
                    <Link href={`/tours/${tour.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
