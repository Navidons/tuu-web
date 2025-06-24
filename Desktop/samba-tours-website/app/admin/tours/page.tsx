import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Tour Management - Samba Tours Admin",
  description: "Manage all tour packages and itineraries.",
}

const tours = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    category: "Wildlife",
    duration: "3 Days",
    price: "$1,200",
    status: "active",
    bookings: 45,
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Murchison Falls Safari",
    category: "Safari",
    duration: "4 Days",
    price: "$800",
    status: "active",
    bookings: 32,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    title: "Queen Elizabeth Wildlife Tour",
    category: "Wildlife",
    duration: "5 Days",
    price: "$950",
    status: "draft",
    bookings: 0,
    rating: 0,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    title: "Cultural Heritage Experience",
    category: "Cultural",
    duration: "2 Days",
    price: "$650",
    status: "active",
    bookings: 28,
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ToursManagement() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 mb-2">Tour Management</h1>
              <p className="text-earth-600">Manage your tour packages and itineraries</p>
            </div>
            <Button asChild className="bg-forest-600 hover:bg-forest-700">
              <Link href="/admin/tours/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Tour
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search tours..." className="pl-10" />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tours Grid */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 right-3 ${getStatusColor(tour.status)}`}>{tour.status}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-earth-900 mb-2">{tour.title}</h3>
                      <div className="flex items-center justify-between text-sm text-earth-600 mb-2">
                        <span>{tour.category}</span>
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-forest-600">{tour.price}</span>
                        <div className="text-sm text-earth-600">
                          {tour.bookings} bookings • ⭐ {tour.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}
