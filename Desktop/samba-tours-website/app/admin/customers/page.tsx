import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Eye, MessageSquare, Mail } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Customer Management - Samba Tours Admin",
  description: "Manage customer accounts and profiles.",
}

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0123",
    country: "United States",
    totalBookings: 3,
    totalSpent: "$4,200",
    lastBooking: "2024-06-15",
    status: "active",
    joinDate: "2023-08-15",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1-555-0124",
    country: "Canada",
    totalBookings: 2,
    totalSpent: "$2,800",
    lastBooking: "2024-06-18",
    status: "active",
    joinDate: "2023-11-22",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "+44-20-1234-5678",
    country: "United Kingdom",
    totalBookings: 1,
    totalSpent: "$1,900",
    lastBooking: "2024-06-20",
    status: "active",
    joinDate: "2024-01-10",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+61-2-1234-5678",
    country: "Australia",
    totalBookings: 0,
    totalSpent: "$0",
    lastBooking: "Never",
    status: "inactive",
    joinDate: "2024-03-05",
    avatar: "/placeholder-user.jpg",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    case "blocked":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function CustomersManagement() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 mb-2">Customer Management</h1>
              <p className="text-earth-600">Manage customer accounts and profiles</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Customers
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-earth-900">1,234</div>
                <p className="text-sm text-earth-600">Total Customers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">1,180</div>
                <p className="text-sm text-earth-600">Active Customers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-forest-600">$125,430</div>
                <p className="text-sm text-earth-600">Total Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">$101.50</div>
                <p className="text-sm text-earth-600">Avg. Order Value</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search customers..." className="pl-10" />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customers List */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-4">
              {customers.map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-earth-900">{customer.name}</h3>
                            <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-earth-600">
                            <div>
                              <p className="font-medium">Contact</p>
                              <p>{customer.email}</p>
                              <p>{customer.phone}</p>
                            </div>
                            <div>
                              <p className="font-medium">Location</p>
                              <p>{customer.country}</p>
                            </div>
                            <div>
                              <p className="font-medium">Bookings</p>
                              <p>{customer.totalBookings} total</p>
                              <p>Last: {customer.lastBooking}</p>
                            </div>
                            <div>
                              <p className="font-medium">Total Spent</p>
                              <p className="text-lg font-semibold text-forest-600">{customer.totalSpent}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
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
