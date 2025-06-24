import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Eye, MessageSquare, Phone } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Booking Management - Samba Tours Admin",
  description: "Manage all tour bookings and reservations.",
}

const bookings = [
  {
    id: "BK001",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0123",
    tourName: "Gorilla Trekking Adventure",
    startDate: "2024-07-15",
    endDate: "2024-07-18",
    guests: 2,
    status: "confirmed",
    amount: "$2,400",
    paymentStatus: "paid",
    bookingDate: "2024-06-15",
  },
  {
    id: "BK002",
    customerName: "Michael Chen",
    email: "michael@example.com",
    phone: "+1-555-0124",
    tourName: "Murchison Falls Safari",
    startDate: "2024-07-20",
    endDate: "2024-07-24",
    guests: 4,
    status: "pending",
    amount: "$3,200",
    paymentStatus: "pending",
    bookingDate: "2024-06-18",
  },
  {
    id: "BK003",
    customerName: "Emma Thompson",
    email: "emma@example.com",
    phone: "+1-555-0125",
    tourName: "Queen Elizabeth Wildlife Tour",
    startDate: "2024-07-25",
    endDate: "2024-07-30",
    guests: 2,
    status: "confirmed",
    amount: "$1,900",
    paymentStatus: "paid",
    bookingDate: "2024-06-20",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "failed":
      return "bg-red-100 text-red-800"
    case "refunded":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BookingsManagement() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 mb-2">Booking Management</h1>
              <p className="text-earth-600">Manage all tour bookings and reservations</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search bookings..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-earth-900">{booking.customerName}</h3>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-earth-600">
                          <div>
                            <p className="font-medium">Tour</p>
                            <p>{booking.tourName}</p>
                          </div>
                          <div>
                            <p className="font-medium">Dates</p>
                            <p>
                              {booking.startDate} to {booking.endDate}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Guests</p>
                            <p>{booking.guests} guests</p>
                          </div>
                          <div>
                            <p className="font-medium">Contact</p>
                            <p>{booking.email}</p>
                            <p>{booking.phone}</p>
                          </div>
                          <div>
                            <p className="font-medium">Booking ID</p>
                            <p>{booking.id}</p>
                          </div>
                          <div>
                            <p className="font-medium">Amount</p>
                            <p className="text-lg font-semibold text-forest-600">{booking.amount}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-forest-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
