"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  Reply,
  Archive,
  Trash2,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react"

// Mock data
const contactStats = [
  { title: "Total Messages", value: "1,247", icon: MessageSquare, change: "+12%" },
  { title: "Pending Replies", value: "23", icon: Clock, change: "-5%" },
  { title: "Resolved Today", value: "45", icon: CheckCircle, change: "+18%" },
  { title: "Response Time", value: "2.4h", icon: Reply, change: "-15%" },
]

const contactMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+256 700 123 456",
    subject: "Gorilla Trekking Inquiry",
    message:
      "I'm interested in booking a 3-day gorilla trekking tour for my family of 4. Could you provide more details about the packages available?",
    status: "pending",
    priority: "high",
    date: "2024-01-15",
    time: "10:30 AM",
    source: "website",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+256 700 234 567",
    subject: "Safari Package Question",
    message: "What's included in the 5-day wildlife safari package? Are meals and accommodation included?",
    status: "replied",
    priority: "medium",
    date: "2024-01-15",
    time: "09:15 AM",
    source: "email",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+256 700 345 678",
    subject: "Group Booking Discount",
    message: "We're a group of 15 people looking to book a cultural tour. Do you offer group discounts?",
    status: "resolved",
    priority: "low",
    date: "2024-01-14",
    time: "03:45 PM",
    source: "phone",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "replied":
      return "bg-blue-100 text-blue-800"
    case "resolved":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-orange-100 text-orange-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ContactManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-earth-900">Contact Management</h1>
        <p className="text-earth-600 mt-2">Manage customer inquiries and communications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-earth-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-earth-900">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-forest-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-forest-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-earth-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-earth-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Customer inquiries and contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.name}</div>
                          <div className="text-sm text-earth-500">{message.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{message.subject}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{message.date}</div>
                          <div className="text-xs text-earth-500">{message.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{message.source}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedMessage(message)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              Mark Important
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Analytics</CardTitle>
              <CardDescription>Insights into customer communication patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Message Sources</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Website Form</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Response Times</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Response</span>
                      <span className="font-medium">2.4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fastest Response</span>
                      <span className="font-medium">15 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution Rate</span>
                      <span className="font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
              <CardDescription>Configure contact form and communication preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Auto-Reply Settings</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-reply message</label>
                  <Textarea
                    placeholder="Thank you for contacting Samba Tours. We'll get back to you within 24 hours..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Notification Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Email notifications for new messages</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">SMS notifications for urgent messages</span>
                  </label>
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                From {selectedMessage.name} • {selectedMessage.date} at {selectedMessage.time}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Email:</span> {selectedMessage.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {selectedMessage.phone}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <Badge className={getStatusColor(selectedMessage.status)}>{selectedMessage.status}</Badge>
                </div>
                <div>
                  <span className="font-medium">Priority:</span>{" "}
                  <Badge className={getPriorityColor(selectedMessage.priority)}>{selectedMessage.priority}</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Message:</h4>
                <p className="text-sm text-earth-600 bg-gray-50 p-3 rounded-lg">{selectedMessage.message}</p>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Mark Important
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
