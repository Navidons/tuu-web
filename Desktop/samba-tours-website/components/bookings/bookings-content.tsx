"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Download,
  MessageCircle,
  Star,
  Search,
  Filter,
  Eye,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

const bookings = [
  {
    id: "BK001",
    tour: "Gorilla Trekking Adventure",
    destination: "Bwindi Impenetrable Forest",
    date: "2024-02-15",
    endDate: "2024-02-18",
    status: "confirmed",
    guests: 2,
    amount: 2400,
    image: "/placeholder.svg?height=80&width=120",
    bookingDate: "2024-01-10",
    guide: "Samuel Mukasa",
  },
  {
    id: "BK002",
    tour: "Murchison Falls Safari",
    destination: "Murchison Falls National Park",
    date: "2024-03-20",
    endDate: "2024-03-23",
    status: "pending",
    guests: 4,
    amount: 3200,
    image: "/placeholder.svg?height=80&width=120",
    bookingDate: "2024-02-05",
    guide: "Grace Nakato",
  },
  {
    id: "BK003",
    tour: "Queen Elizabeth Wildlife Tour",
    destination: "Queen Elizabeth National Park",
    date: "2024-01-10",
    endDate: "2024-01-13",
    status: "completed",
    guests: 2,
    amount: 1800,
    image: "/placeholder.svg?height=80&width=120",
    bookingDate: "2023-12-15",
    guide: "David Ssemakula",
    rating: 5,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BookingsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && booking.status === activeTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth-900">My Bookings</h1>
          <p className="text-earth-600">Manage and track your tour bookings</p>
        </div>
        <Button asChild>
          <Link href="/tours">Book New Tour</Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Booking Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-earth-900 mb-2">No bookings found</h3>
                <p className="text-earth-600 mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "You haven't made any bookings yet"}
                </p>
                <Button asChild>
                  <Link href="/tours">Browse Tours</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-48 h-48 lg:h-auto">
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.tour}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-earth-900 mb-1">{booking.tour}</h3>
                              <div className="flex items-center text-earth-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{booking.destination}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-earth-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Start Date</p>
                                <p>{booking.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">End Date</p>
                                <p>{booking.endDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Guests</p>
                                <p>{booking.guests} people</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Total</p>
                                <p className="font-semibold">${booking.amount}</p>
                              </div>
                            </div>
                          </div>

                          {booking.guide && (
                            <p className="text-sm text-earth-600 mb-4">
                              <span className="font-medium">Guide:</span> {booking.guide}
                            </p>
                          )}

                          {booking.status === "completed" && booking.rating && (
                            <div className="flex items-center mb-4">
                              <span className="text-sm font-medium mr-2">Your Rating:</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 lg:w-48">
                          <Button size="sm" asChild>
                            <Link href={`/bookings/${booking.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>

                          {booking.status === "confirmed" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download Voucher
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Contact Guide
                              </Button>
                            </>
                          )}

                          {booking.status === "completed" && !booking.rating && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              Rate Tour
                            </Button>
                          )}

                          {booking.status === "pending" && (
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Complete Payment
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
