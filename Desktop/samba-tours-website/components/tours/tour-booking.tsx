"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Clock, Star, Shield, Phone, Mail } from "lucide-react"

interface Tour {
  id: number
  title: string
  price: number
  originalPrice?: number
  duration: string
  groupSize: string
  rating: number
  reviewCount: number
}

interface TourBookingProps {
  tour: Tour
}

export default function TourBooking({ tour }: TourBookingProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [travelers, setTravelers] = useState(2)

  const totalPrice = tour.price * travelers
  const savings = tour.originalPrice ? (tour.originalPrice - tour.price) * travelers : 0

  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <Card className="border-forest-200">
        <CardHeader className="bg-forest-50">
          <CardTitle className="flex items-center justify-between">
            <span>Book This Tour</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{tour.rating}</span>
              <span className="text-sm text-earth-600">({tour.reviewCount})</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Price */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-forest-600">${tour.price}</span>
                {tour.originalPrice && (
                  <span className="text-lg text-earth-500 line-through">${tour.originalPrice}</span>
                )}
              </div>
              <p className="text-earth-600">per person</p>
              {savings > 0 && <Badge className="bg-red-100 text-red-800 mt-2">Save ${savings} total</Badge>}
            </div>

            {/* Tour Details */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-forest-600" />
                  <span className="text-sm">Duration</span>
                </div>
                <span className="text-sm font-semibold">{tour.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-forest-600" />
                  <span className="text-sm">Group Size</span>
                </div>
                <span className="text-sm font-semibold">Max {tour.groupSize}</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Select Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">Number of Travelers</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    disabled={travelers <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{travelers}</span>
                  <Button variant="outline" size="sm" onClick={() => setTravelers(travelers + 1)}>
                    +
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-earth-700">Subtotal ({travelers} travelers)</span>
                  <span className="font-semibold">${totalPrice.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-700">Total Savings</span>
                    <span className="font-semibold text-green-700">-${savings}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-bold border-t border-forest-200 pt-2">
                  <span>Total</span>
                  <span className="text-forest-600">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full btn-primary" size="lg" disabled={!selectedDate}>
                <DollarSign className="h-5 w-5 mr-2" />
                Book Now
              </Button>

              <p className="text-xs text-earth-600 text-center">Free cancellation up to 24 hours before departure</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-forest-600" />
            <span>Need Help?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-earth-700">
              Our travel experts are here to help you plan the perfect Uganda adventure.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-forest-600" />
                <div>
                  <p className="text-sm font-semibold">Call Us</p>
                  <p className="text-sm text-earth-600">+256 700 123 456</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-forest-600" />
                <div>
                  <p className="text-sm font-semibold">Email Us</p>
                  <p className="text-sm text-earth-600">info@sambatours.com</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              Get Custom Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-earth-700">Secure booking & payment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-earth-700">4.9/5 customer rating</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-forest-600" />
              <span className="text-earth-700">500+ happy travelers</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
