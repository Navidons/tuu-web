import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Calendar } from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    description:
      "Experience the thrill of meeting mountain gorillas in their natural habitat in Bwindi Impenetrable Forest.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "3 Days",
    groupSize: "8 People",
    rating: 4.9,
    reviewCount: 127,
    price: 1200,
    originalPrice: 1400,
    location: "Bwindi Forest",
    category: "Gorilla Trekking",
    difficulty: "Moderate",
    highlights: ["Mountain Gorillas", "Forest Hiking", "Local Communities"],
  },
  {
    id: 2,
    title: "Murchison Falls Safari",
    description: "Witness the power of the Nile at Murchison Falls and spot the Big Five on thrilling game drives.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "4 Days",
    groupSize: "12 People",
    rating: 4.8,
    reviewCount: 89,
    price: 800,
    originalPrice: 950,
    location: "Murchison Falls NP",
    category: "Wildlife Safari",
    difficulty: "Easy",
    highlights: ["Big Five", "Nile River", "Boat Safari"],
  },
  {
    id: 3,
    title: "Queen Elizabeth Wildlife Tour",
    description: "Explore diverse ecosystems and spot tree-climbing lions in Uganda's most popular national park.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "5 Days",
    groupSize: "10 People",
    rating: 4.7,
    reviewCount: 156,
    price: 950,
    originalPrice: 1100,
    location: "Queen Elizabeth NP",
    category: "Wildlife Safari",
    difficulty: "Easy",
    highlights: ["Tree-climbing Lions", "Kazinga Channel", "Crater Lakes"],
  },
  {
    id: 4,
    title: "Cultural Heritage Experience",
    description:
      "Immerse yourself in Uganda's rich cultural traditions with visits to local communities and cultural sites.",
    image: "/placeholder.svg?height=400&width=600",
    duration: "6 Days",
    groupSize: "15 People",
    rating: 4.6,
    reviewCount: 73,
    price: 650,
    originalPrice: 750,
    location: "Multiple Regions",
    category: "Cultural Tours",
    difficulty: "Easy",
    highlights: ["Traditional Dances", "Local Crafts", "Community Visits"],
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
    originalPrice: 1250,
    location: "Mount Elgon NP",
    category: "Adventure Tours",
    difficulty: "Challenging",
    highlights: ["Mountain Climbing", "Sipi Falls", "Cave Exploration"],
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
    originalPrice: 1500,
    location: "Multiple Parks",
    category: "Bird Watching",
    difficulty: "Easy",
    highlights: ["Shoebill Stork", "Endemic Species", "Forest Birds"],
  },
]

export default function TourGrid() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-earth-600">Showing {tours.length} tours</p>
        <select className="border border-earth-200 rounded-lg px-3 py-2 text-sm">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Duration: Shortest</option>
          <option>Duration: Longest</option>
          <option>Rating: Highest</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
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
                  <span className="text-xs text-earth-600">({tour.reviewCount})</span>
                </div>
              </div>
              {tour.originalPrice > tour.price && (
                <div className="absolute bottom-4 left-4">
                  <Badge variant="destructive">Save ${tour.originalPrice - tour.price}</Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="flex items-center text-sm text-earth-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{tour.location}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{tour.difficulty}</span>
              </div>

              <h3 className="font-playfair text-xl font-bold text-earth-900 mb-3 group-hover:text-forest-600 transition-colors">
                <Link href={`/tours/${tour.id}`}>{tour.title}</Link>
              </h3>

              <p className="text-earth-700 mb-4 line-clamp-2">{tour.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tour.highlights.slice(0, 3).map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-earth-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Max {tour.groupSize}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Daily</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-forest-600">${tour.price}</span>
                    {tour.originalPrice > tour.price && (
                      <span className="text-sm text-earth-500 line-through">${tour.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-earth-600 text-sm">per person</span>
                </div>
                <Button className="btn-primary" asChild>
                  <Link href={`/tours/${tour.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Tours
        </Button>
      </div>
    </div>
  )
}
