"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Building,
  Car,
  Coffee,
  Utensils,
  BookOpen,
  Microscope,
  Users,
  Wifi,
  Shield,
  Clock,
  Phone,
  Navigation,
  Zap,
  Trees,
} from "lucide-react"
import SomalilandNavbar from "@/components/somaliland/somaliland-navbar"
import SomalilandFooter from "@/components/somaliland/somaliland-footer"

const buildings = [
  {
    id: 1,
    name: "Administration Building",
    category: "Administrative",
    description: "Main administrative offices, President's office, and student services",
    floors: 4,
    facilities: ["President's Office", "Registrar", "Finance Office", "Student Services", "Conference Rooms"],
    coordinates: { x: 30, y: 25 },
    color: "bg-red-500",
    icon: Building,
  },
  {
    id: 2,
    name: "Academic Block A",
    category: "Academic",
    description: "Lecture halls, classrooms, and faculty offices for humanities and social sciences",
    floors: 3,
    facilities: ["20 Lecture Halls", "Faculty Offices", "Student Lounge", "Computer Lab", "Seminar Rooms"],
    coordinates: { x: 15, y: 40 },
    color: "bg-blue-500",
    icon: BookOpen,
  },
  {
    id: 3,
    name: "Academic Block B",
    category: "Academic",
    description: "Classrooms and laboratories for business and economics programs",
    floors: 3,
    facilities: ["Business Simulation Lab", "Economics Research Center", "Case Study Rooms", "Faculty Offices"],
    coordinates: { x: 45, y: 40 },
    color: "bg-blue-500",
    icon: BookOpen,
  },
  {
    id: 4,
    name: "Medical Sciences Building",
    category: "Medical",
    description: "Medical school facilities, laboratories, and clinical training areas",
    floors: 5,
    facilities: ["Anatomy Lab", "Physiology Lab", "Clinical Skills Center", "Medical Library", "Research Labs"],
    coordinates: { x: 70, y: 30 },
    color: "bg-green-500",
    icon: Microscope,
  },
  {
    id: 5,
    name: "Science & Technology Center",
    category: "Science",
    description: "Laboratories, computer centers, and technology innovation spaces",
    floors: 4,
    facilities: ["Chemistry Labs", "Physics Labs", "Computer Centers", "Digital Innovation Lab", "Maker Space"],
    coordinates: { x: 25, y: 60 },
    color: "bg-purple-500",
    icon: Microscope,
  },
  {
    id: 6,
    name: "University Library",
    category: "Academic",
    description: "Central library with extensive collections and study spaces",
    floors: 3,
    facilities: ["50,000+ Books", "Digital Resources", "Study Rooms", "Research Commons", "24/7 Study Area"],
    coordinates: { x: 50, y: 55 },
    color: "bg-indigo-500",
    icon: BookOpen,
  },
  {
    id: 7,
    name: "Student Center",
    category: "Student Life",
    description: "Student activities, dining, and recreational facilities",
    floors: 2,
    facilities: ["Cafeteria", "Student Organizations", "Recreation Room", "Health Clinic", "Counseling Services"],
    coordinates: { x: 35, y: 75 },
    color: "bg-yellow-500",
    icon: Users,
  },
  {
    id: 8,
    name: "Sports Complex",
    category: "Recreation",
    description: "Indoor and outdoor sports facilities",
    floors: 2,
    facilities: ["Basketball Court", "Volleyball Court", "Fitness Center", "Outdoor Fields", "Changing Rooms"],
    coordinates: { x: 75, y: 70 },
    color: "bg-orange-500",
    icon: Users,
  },
  {
    id: 9,
    name: "Research Centers",
    category: "Research",
    description: "Specialized research institutes and laboratories",
    floors: 3,
    facilities: [
      "Horn of Africa Studies Institute",
      "Public Health Research Center",
      "Environmental Research Lab",
      "Business Innovation Hub",
    ],
    coordinates: { x: 60, y: 45 },
    color: "bg-teal-500",
    icon: Microscope,
  },
  {
    id: 10,
    name: "Dormitories",
    category: "Housing",
    description: "Student residential facilities",
    floors: 4,
    facilities: ["400 Student Rooms", "Common Areas", "Study Lounges", "Laundry Facilities", "24/7 Security"],
    coordinates: { x: 80, y: 55 },
    color: "bg-pink-500",
    icon: Building,
  },
]

const amenities = [
  {
    name: "Parking Areas",
    icon: Car,
    locations: [
      { x: 10, y: 20 },
      { x: 85, y: 25 },
      { x: 15, y: 80 },
    ],
  },
  {
    name: "Cafeterias",
    icon: Utensils,
    locations: [
      { x: 35, y: 75 },
      { x: 50, y: 30 },
    ],
  },
  {
    name: "Coffee Shops",
    icon: Coffee,
    locations: [
      { x: 25, y: 45 },
      { x: 65, y: 60 },
    ],
  },
  {
    name: "Security Posts",
    icon: Shield,
    locations: [
      { x: 5, y: 50 },
      { x: 95, y: 50 },
      { x: 50, y: 5 },
      { x: 50, y: 95 },
    ],
  },
]

const campusInfo = {
  totalArea: "45 hectares",
  buildings: 10,
  capacity: 3000,
  established: 2015,
  features: [
    "24/7 Security",
    "High-Speed WiFi",
    "Solar Power System",
    "Water Treatment Plant",
    "Green Spaces",
    "Accessible Design",
  ],
}

export default function CampusMapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(buildings.map((b) => b.category)))]

  const filteredBuildings = buildings.filter(
    (building) => selectedCategory === "all" || building.category === selectedCategory,
  )

  return (
    <>
      <SomalilandNavbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-white to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">Campus Map</h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Explore our modern campus facilities and discover everything Unity University has to offer
              </p>
            </div>
          </div>
        </div>

        {/* Campus Overview */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{campusInfo.totalArea}</div>
                <div className="text-gray-600">Campus Area</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">{campusInfo.buildings}</div>
                <div className="text-gray-600">Buildings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{campusInfo.capacity.toLocaleString()}</div>
                <div className="text-gray-600">Student Capacity</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">{campusInfo.established}</div>
                <div className="text-gray-600">Established</div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Categories */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-4xl mx-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category === "all" ? "All Buildings" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Interactive Campus Map */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map Area */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Interactive Campus Map
                    </CardTitle>
                    <CardDescription>Click on buildings to view detailed information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-green-100 rounded-lg p-4 h-96 overflow-hidden">
                      {/* Campus Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300 opacity-50"></div>

                      {/* Roads */}
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400 transform -translate-x-1/2"></div>

                      {/* Buildings */}
                      {filteredBuildings.map((building) => {
                        const IconComponent = building.icon
                        return (
                          <div
                            key={building.id}
                            className={`absolute w-8 h-8 ${building.color} rounded-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform flex items-center justify-center shadow-lg ${
                              selectedBuilding === building.id ? "ring-4 ring-yellow-400" : ""
                            }`}
                            style={{
                              left: `${building.coordinates.x}%`,
                              top: `${building.coordinates.y}%`,
                            }}
                            onClick={() => setSelectedBuilding(building.id)}
                          >
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                        )
                      })}

                      {/* Amenities */}
                      {amenities.map((amenity) =>
                        amenity.locations.map((location, index) => {
                          const IconComponent = amenity.icon
                          return (
                            <div
                              key={`${amenity.name}-${index}`}
                              className="absolute w-4 h-4 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                              style={{
                                left: `${location.x}%`,
                                top: `${location.y}%`,
                              }}
                            >
                              <IconComponent className="h-2 w-2 text-white" />
                            </div>
                          )
                        }),
                      )}

                      {/* Campus Gates */}
                      <div className="absolute top-0 left-1/2 w-6 h-3 bg-yellow-500 transform -translate-x-1/2 rounded-b-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold">N</span>
                      </div>
                      <div className="absolute bottom-0 left-1/2 w-6 h-3 bg-yellow-500 transform -translate-x-1/2 rounded-t-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold">S</span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                      {Array.from(new Set(buildings.map((b) => b.category))).map((category) => {
                        const building = buildings.find((b) => b.category === category)!
                        return (
                          <div key={category} className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${building.color} rounded`}></div>
                            <span>{category}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Building Information */}
              <div className="space-y-6">
                {selectedBuilding ? (
                  (() => {
                    const building = buildings.find((b) => b.id === selectedBuilding)!
                    const IconComponent = building.icon
                    return (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 ${building.color} rounded-lg`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{building.name}</CardTitle>
                              <Badge variant="outline">{building.category}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-gray-700">{building.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                <span>{building.floors} floors</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Facilities:</h4>
                              <ul className="space-y-1">
                                {building.facilities.map((facility, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span>{facility}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })()
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Building</h3>
                      <p className="text-gray-500">Click on any building on the map to view detailed information</p>
                    </CardContent>
                  </Card>
                )}

                {/* Campus Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trees className="h-5 w-5 text-green-600" />
                      Campus Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {campusInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-green-600" />
                      Quick Navigation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setSelectedBuilding(1)}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Administration
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setSelectedBuilding(6)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Library
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setSelectedBuilding(7)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Student Center
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => setSelectedBuilding(4)}
                      >
                        <Microscope className="h-4 w-4 mr-2" />
                        Medical Sciences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Services */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Campus Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Wifi className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">High-Speed WiFi</h3>
                  <p className="text-gray-600 text-sm">Campus-wide internet connectivity with 1Gbps speeds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">24/7 Security</h3>
                  <p className="text-gray-600 text-sm">Round-the-clock security with CCTV monitoring</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Solar Power</h3>
                  <p className="text-gray-600 text-sm">Sustainable energy with backup power systems</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Extended Hours</h3>
                  <p className="text-gray-600 text-sm">Library and study areas open 24/7 during exams</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Directions and Contact */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Getting to Campus</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">
                        Unity University Campus
                        <br />
                        Ahmed Gurey Street
                        <br />
                        Hargeisa, Somaliland
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">By Car</h3>
                      <p className="text-gray-600">
                        Free parking available at multiple locations on campus. Main entrance is on Ahmed Gurey Street.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Public Transport</h3>
                      <p className="text-gray-600">
                        Regular bus service from downtown Hargeisa. University shuttle available for students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Campus Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Campus Security</h3>
                      <p className="text-gray-600">+252 63 999 0000 (24/7 Emergency)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Campus Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 6:00 AM - 10:00 PM
                        <br />
                        Saturday - Sunday: 8:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Visitor Information</h3>
                      <p className="text-gray-600">
                        All visitors must register at the main gate. Campus tours available by appointment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience Unity University firsthand with a guided campus tour
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule a Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Download Campus Map
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SomalilandFooter />
    </>
  )
}
