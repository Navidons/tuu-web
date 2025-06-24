"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, MapPin, Clock, Users, Star, Search, Share2, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"

const wishlistItems = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    destination: "Bwindi Impenetrable Forest",
    duration: "4 days",
    groupSize: "2-8 people",
    price: 1200,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=300",
    category: "Wildlife",
    difficulty: "Moderate",
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Mount Elgon Adventure",
    destination: "Mount Elgon National Park",
    duration: "6 days",
    groupSize: "4-12 people",
    price: 800,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    category: "Adventure",
    difficulty: "Challenging",
    addedDate: "2024-01-20",
  },
  {
    id: 3,
    title: "Cultural Heritage Experience",
    destination: "Kampala & Jinja",
    duration: "3 days",
    groupSize: "2-15 people",
    price: 450,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    category: "Cultural",
    difficulty: "Easy",
    addedDate: "2024-02-01",
  },
  {
    id: 4,
    title: "Birding Paradise Tour",
    destination: "Multiple Locations",
    duration: "7 days",
    groupSize: "2-6 people",
    price: 950,
    rating: 4.8,
    reviews: 73,
    image: "/placeholder.svg?height=200&width=300",
    category: "Birding",
    difficulty: "Easy",
    addedDate: "2024-02-10",
  },
]

export default function WishlistContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState(wishlistItems)

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const removeFromWishlist = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const shareWishlist = () => {
    // Implement share functionality
    console.log("Sharing wishlist...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth-900">My Wishlist</h1>
          <p className="text-earth-600">{items.length} saved tours</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={shareWishlist}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
          <Button asChild>
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Wishlist Items */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-earth-900 mb-2">
              {searchQuery ? "No tours found" : "Your wishlist is empty"}
            </h3>
            <p className="text-earth-600 mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start exploring our tours and save your favorites here"}
            </p>
            <Button asChild>
              <Link href="/tours">Browse Tours</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-white/90 text-earth-900">{item.category}</Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-earth-900 mb-1">{item.title}</h3>
                    <div className="flex items-center text-earth-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-earth-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{item.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{item.rating}</span>
                      </div>
                      <span className="text-sm text-earth-600">({item.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <span className="text-2xl font-bold text-earth-900">${item.price}</span>
                      <span className="text-sm text-earth-600"> per person</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/tours/${item.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/tours/${item.id}?book=true`}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Now
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-earth-500">Added on {new Date(item.addedDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
