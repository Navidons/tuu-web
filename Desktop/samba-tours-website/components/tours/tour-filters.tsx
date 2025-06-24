"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "safari", label: "Wildlife Safari", count: 12 },
  { id: "gorilla", label: "Gorilla Trekking", count: 8 },
  { id: "cultural", label: "Cultural Tours", count: 15 },
  { id: "adventure", label: "Adventure Tours", count: 10 },
  { id: "birding", label: "Bird Watching", count: 6 },
]

const durations = [
  { id: "1-3", label: "1-3 Days", count: 18 },
  { id: "4-7", label: "4-7 Days", count: 25 },
  { id: "8-14", label: "8-14 Days", count: 12 },
  { id: "15+", label: "15+ Days", count: 6 },
]

export default function TourFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleDurationChange = (durationId: string, checked: boolean) => {
    if (checked) {
      setSelectedDurations([...selectedDurations, durationId])
    } else {
      setSelectedDurations(selectedDurations.filter((id) => id !== durationId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDurations([])
    setPriceRange([0, 2000])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Tours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="px-2">
              <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={50} className="mb-2" />
              <div className="flex justify-between text-sm text-earth-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Tour Type</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                    {category.label}
                  </label>
                  <span className="text-xs text-earth-500">({category.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="font-semibold mb-3">Duration</h3>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div key={duration.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={duration.id}
                    checked={selectedDurations.includes(duration.id)}
                    onCheckedChange={(checked) => handleDurationChange(duration.id, checked as boolean)}
                  />
                  <label htmlFor={duration.id} className="text-sm flex-1 cursor-pointer">
                    {duration.label}
                  </label>
                  <span className="text-xs text-earth-500">({duration.count})</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
