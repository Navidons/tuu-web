"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"

const categories = [
  { id: "all", label: "All", count: 2500 },
  { id: "gorillas", label: "Gorilla Trekking", count: 450 },
  { id: "wildlife", label: "Wildlife Safari", count: 680 },
  { id: "landscapes", label: "Landscapes", count: 520 },
  { id: "cultural", label: "Cultural", count: 380 },
  { id: "adventure", label: "Adventure", count: 290 },
  { id: "birds", label: "Bird Watching", count: 180 },
]

const locations = [
  { id: "all", label: "All Locations" },
  { id: "bwindi", label: "Bwindi Forest" },
  { id: "murchison", label: "Murchison Falls" },
  { id: "queen-elizabeth", label: "Queen Elizabeth NP" },
  { id: "kibale", label: "Kibale Forest" },
  { id: "lake-mburo", label: "Lake Mburo" },
  { id: "mount-elgon", label: "Mount Elgon" },
]

export default function GalleryFilters() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLocation, setActiveLocation] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-8">
      {/* Search and View Toggle */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-earth-400" />
          <Input
            placeholder="Search photos by location, activity, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex items-center bg-white rounded-lg border p-1">
            <Button
              variant={viewMode === "masonry" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("masonry")}
              className="h-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
        {/* Category Filters */}
        <div>
          <h3 className="font-semibold text-earth-900 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id ? "bg-forest-600 hover:bg-forest-700 text-white" : "hover:bg-forest-50"
                }`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Location Filters */}
        <div>
          <h3 className="font-semibold text-earth-900 mb-3">Locations</h3>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location.id}
                variant={activeLocation === location.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLocation(location.id)}
                className={`${
                  activeLocation === location.id ? "bg-forest-600 hover:bg-forest-700 text-white" : "hover:bg-forest-50"
                }`}
              >
                {location.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
