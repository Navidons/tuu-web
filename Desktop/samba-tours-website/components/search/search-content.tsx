"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase"
import { getAllTours } from "@/lib/tours"
import type { Tour } from "@/lib/tours"
import LoadingSpinner from "@/components/ui/loading-spinner"

interface SearchContentProps {
  searchParams: { q?: string; category?: string; location?: string }
}

export default function SearchContent({ searchParams }: SearchContentProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams.q || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "All")
  const [selectedLocation, setSelectedLocation] = useState(searchParams.location || "All Locations")
  const [allTours, setAllTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])

  // Load all tours from Supabase
  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const tours = await getAllTours(supabase)
        setAllTours(tours)
        
        // Extract unique categories and locations
        const uniqueCategories = Array.from(new Set(tours.map(tour => 
          typeof tour.category === 'object' ? tour.category?.name : tour.category
        ).filter((cat): cat is string => Boolean(cat))))
        const uniqueLocations = Array.from(new Set(tours.map(tour => tour.location).filter((loc): loc is string => Boolean(loc))))
        
        setCategories(['All', ...uniqueCategories])
        setLocations(['All Locations', ...uniqueLocations])
      } catch (error) {
        console.error('Error loading tours:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadTours()
  }, [])

  // Filter tours based on search criteria
  useEffect(() => {
    let filtered = [...allTours]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tour.short_description && tour.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (tour.highlights && tour.highlights.some((highlight: { highlight: string }) => 
            highlight.highlight.toLowerCase().includes(searchQuery.toLowerCase())
          ))
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((tour) => {
        const tourCategory = typeof tour.category === 'object' ? tour.category?.name : tour.category
        return tourCategory === selectedCategory
      })
    }

    // Filter by location
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter((tour) => 
        tour.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    setFilteredTours(filtered)
  }, [searchQuery, selectedCategory, selectedLocation, allTours])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-earth-900">Search Tours & Experiences</h1>
        <p className="text-lg text-earth-600 max-w-2xl mx-auto">Discover amazing tours and experiences across Uganda</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tours, destinations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-earth-900">
            {filteredTours.length} {filteredTours.length === 1 ? "Result" : "Results"} Found
          </h2>
          {searchQuery && <p className="text-earth-600">Showing results for "{searchQuery}"</p>}
        </div>

        {filteredTours.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tours found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse our featured tours</p>
              <Button asChild>
                <Link href="/tours">Browse All Tours</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={tour.featured_image || "/placeholder.svg?height=200&width=300"}
                    alt={tour.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-forest-600">
                    {typeof tour.category === 'object' ? tour.category?.name : tour.category || 'Tour'}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-earth-900 mb-1">{tour.title}</h3>
                      <div className="flex items-center text-sm text-earth-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {tour.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-earth-500" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {tour.rating} ({tour.review_count})
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {tour.highlights && tour.highlights.slice(0, 2).map((highlight: { highlight: string }, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight.highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-2xl font-bold text-forest-600">${tour.price}</span>
                        <span className="text-sm text-earth-600 ml-1">per person</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/tours/${tour.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
