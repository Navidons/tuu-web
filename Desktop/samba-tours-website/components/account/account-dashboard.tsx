"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Star, Users, Camera, Award, Plane, Heart } from "lucide-react"
import Link from "next/link"

const recentBookings = [
  {
    id: "BK001",
    tour: "Gorilla Trekking Adventure",
    date: "2024-02-15",
    status: "confirmed",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "BK002",
    tour: "Murchison Falls Safari",
    date: "2024-03-20",
    status: "pending",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const achievements = [
  { name: "First Booking", icon: Award, earned: true },
  { name: "Adventure Seeker", icon: MapPin, earned: true },
  { name: "Wildlife Expert", icon: Camera, earned: false },
  { name: "Cultural Explorer", icon: Users, earned: false },
]

export default function AccountDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-forest-100 mb-4">
          Ready for your next adventure? Explore our latest tours and destinations.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/tours">Browse Tours</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-forest-600" />
              <div>
                <p className="text-sm text-earth-600">Total Bookings</p>
                <p className="text-2xl font-bold text-earth-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-forest-600" />
              <div>
                <p className="text-sm text-earth-600">Countries Visited</p>
                <p className="text-2xl font-bold text-earth-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-forest-600" />
              <div>
                <p className="text-sm text-earth-600">Loyalty Points</p>
                <p className="text-2xl font-bold text-earth-900">2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-forest-600" />
              <div>
                <p className="text-sm text-earth-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-earth-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Bookings
              <Button variant="outline" size="sm" asChild>
                <Link href="/bookings">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <img
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.tour}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-earth-900">{booking.tour}</h4>
                    <p className="text-sm text-earth-600">{booking.date}</p>
                  </div>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Explorer Level</span>
                  <span>Level 3</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-earth-600 mt-1">350 points to next level</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.name}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        achievement.earned ? "bg-forest-50 text-forest-700" : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{achievement.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/tours">
                <Plane className="h-6 w-6" />
                <span>Book Tour</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/bookings">
                <Calendar className="h-6 w-6" />
                <span>View Bookings</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/wishlist">
                <Heart className="h-6 w-6" />
                <span>Wishlist</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/contact">
                <Users className="h-6 w-6" />
                <span>Get Help</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
