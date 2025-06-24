"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, Calendar, Users, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
  id: number
  title: string
  location: string
  duration: string
  price: number
  quantity: number
  date: string
  guests: number
  image: string
  category: string
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    location: "Bwindi Impenetrable Forest",
    duration: "3 Days",
    price: 1200,
    quantity: 2,
    date: "2024-03-15",
    guests: 2,
    image: "/placeholder.svg?height=150&width=200",
    category: "Wildlife",
  },
  {
    id: 3,
    title: "Cultural Heritage Experience",
    location: "Kampala & Jinja",
    duration: "2 Days",
    price: 450,
    quantity: 1,
    date: "2024-03-20",
    guests: 1,
    image: "/placeholder.svg?height=150&width=200",
    category: "Cultural",
  },
]

export default function CartContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-earth-900 mb-4">Your cart is empty</h2>
          <p className="text-earth-600 mb-8">Discover amazing tours and experiences to add to your cart</p>
          <Button asChild className="btn-primary">
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-earth-900">Shopping Cart</h1>
        <p className="text-lg text-earth-600">Review your selected tours and proceed to booking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={200}
                      height={150}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-forest-600">{item.category}</Badge>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-earth-900">{item.title}</h3>
                      <div className="flex items-center text-sm text-earth-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-earth-500" />
                        {item.duration}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-earth-500" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-earth-500" />
                        {item.guests} {item.guests === 1 ? "Guest" : "Guests"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-forest-600">${item.price * item.quantity}</div>
                          <div className="text-sm text-earth-600">${item.price} per person</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-forest-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full btn-primary" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tours">Continue Shopping</Link>
                </Button>
              </div>

              <div className="pt-4 text-sm text-earth-600">
                <p className="mb-2">✓ Free cancellation up to 24 hours before</p>
                <p className="mb-2">✓ Secure payment processing</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
