"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Filter, X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface FilterState {
  search: string
  status: string
  gender: string
  nationality: string
  dateFrom: Date | undefined
  dateTo: Date | undefined
  ageMin: string
  ageMax: string
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function AdvancedFilters({ onFiltersChange, onClearFilters }: AdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    gender: "all",
    nationality: "",
    dateFrom: undefined,
    dateTo: undefined,
    ageMin: "",
    ageMax: "",
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      status: "all",
      gender: "all",
      nationality: "",
      dateFrom: undefined,
      dateTo: undefined,
      ageMin: "",
      ageMax: "",
    }
    setFilters(clearedFilters)
    onClearFilters()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.status !== "all") count++
    if (filters.gender !== "all") count++
    if (filters.nationality) count++
    if (filters.dateFrom || filters.dateTo) count++
    if (filters.ageMin || filters.ageMax) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <X className="mr-1 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Name, email, phone..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                placeholder="Enter nationality..."
                value={filters.nationality}
                onChange={(e) => updateFilter("nationality", e.target.value)}
              />
            </div>

            {/* Date From */}
            <div className="space-y-2">
              <Label>Application Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) => updateFilter("dateFrom", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <Label>Application Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) => updateFilter("dateTo", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-2">
            <Label>Age Range</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Min age"
                type="number"
                value={filters.ageMin}
                onChange={(e) => updateFilter("ageMin", e.target.value)}
                className="w-24"
              />
              <span className="flex items-center">to</span>
              <Input
                placeholder="Max age"
                type="number"
                value={filters.ageMax}
                onChange={(e) => updateFilter("ageMax", e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="pt-4 border-t">
              <Label className="text-sm font-medium">Active Filters:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.search && (
                  <Badge variant="secondary">
                    Search: {filters.search}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter("search", "")} />
                  </Badge>
                )}
                {filters.status !== "all" && (
                  <Badge variant="secondary">
                    Status: {filters.status}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter("status", "all")} />
                  </Badge>
                )}
                {filters.gender !== "all" && (
                  <Badge variant="secondary">
                    Gender: {filters.gender}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter("gender", "all")} />
                  </Badge>
                )}
                {filters.nationality && (
                  <Badge variant="secondary">
                    Nationality: {filters.nationality}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilter("nationality", "")} />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
